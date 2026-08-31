import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type GuideSection = { title: string; body: string; steps: string[] };

const SECTIONS = [
  "Sua oferta",
  "Sua mensagem e copy",
  "Conteúdo e criativos",
  "Estrutura de campanha e tráfego",
  "Plataforma de pagamento e entrega",
  "Seus primeiros 30 dias",
];

function currentPeriod() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}-01`;
}

export const getAccount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: subscription }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
      supabase.from("subscriptions").select("*").eq("user_id", userId).maybeSingle(),
    ]);

    let sub = subscription;
    if (sub && sub.period_start !== currentPeriod()) {
      const { data: reset } = await supabase
        .from("subscriptions")
        .update({ generations_used: 0, period_start: currentPeriod() })
        .eq("user_id", userId)
        .select()
        .maybeSingle();
      sub = reset ?? sub;
    }

    return { profile, subscription: sub };
  });

export const finishOnboarding = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await context.supabase
      .from("profiles")
      .update({ onboarded: true })
      .eq("id", context.userId);
    return { ok: true };
  });

export const listGuides = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("guides")
      .select("id, title, created_at")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error("Não conseguimos carregar seus guias agora.");
    return data ?? [];
  });

export const getGuide = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .middleware([requireSupabaseAuth])
  .handler(async ({ context, data }) => {
    const { data: guide, error } = await context.supabase
      .from("guides")
      .select("*")
      .eq("id", data.id)
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error("Não conseguimos abrir este guia agora.");
    return guide;
  });

export const generateGuide = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ answers: z.record(z.string(), z.string()) }).parse(data),
  )
  .middleware([requireSupabaseAuth])
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;

    const { data: sub } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (!sub || sub.status !== "active") {
      throw new Error("Seu plano não está ativo. Escolha um plano para gerar seu guia.");
    }

    const period = currentPeriod();
    const used = sub.period_start === period ? sub.generations_used : 0;
    if (used >= sub.monthly_limit) {
      throw new Error(
        "Você já usou todas as gerações deste mês. Seu limite volta no início do próximo mês.",
      );
    }

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("A geração está indisponível no momento. Tente de novo em instantes.");

    const prompt = `Você é um mentor de marketing digital para iniciantes brasileiros. Com base nas respostas abaixo, monte um guia prático, direto e acolhedor, sem jargão.

Respostas:
${Object.entries(data.answers)
  .map(([k, v]) => `- ${k}: ${v}`)
  .join("\n")}

Responda APENAS com JSON válido no formato:
{"title": "título curto do guia", "sections": [{"title": "...", "body": "2 a 4 frases", "steps": ["passo prático", "..."]}]}

Use exatamente estas seções, nesta ordem: ${SECTIONS.join(", ")}.
Nunca invente números, estatísticas, resultados ou depoimentos. Quando um valor for necessário, escreva um placeholder entre colchetes, como [SEU_PRECO].`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.5-flash",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (response.status === 429) {
      throw new Error("Muitas gerações ao mesmo tempo. Espere um minutinho e tente de novo.");
    }
    if (!response.ok) {
      throw new Error("A IA não respondeu agora. Tente gerar seu guia novamente.");
    }

    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = payload.choices?.[0]?.message?.content ?? "";
    const jsonText = raw.replace(/```json|```/g, "").trim();

    let parsed: { title?: string; sections?: GuideSection[] };
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      throw new Error("Recebemos uma resposta incompleta da IA. Tente gerar de novo.");
    }

    const sections = (parsed.sections ?? []).filter((s) => s && s.title);
    if (sections.length === 0) {
      throw new Error("Recebemos uma resposta incompleta da IA. Tente gerar de novo.");
    }

    const { data: guide, error } = await supabase
      .from("guides")
      .insert({
        user_id: userId,
        title: parsed.title?.slice(0, 120) || "Seu guia personalizado",
        answers: data.answers,
        sections,
      })
      .select("id")
      .single();

    if (error || !guide) throw new Error("Seu guia foi criado, mas não conseguimos salvar. Tente novamente.");

    await supabase
      .from("subscriptions")
      .update({ generations_used: used + 1, period_start: period })
      .eq("user_id", userId);

    return { id: guide.id };
  });
