import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Compass,
  HelpCircle,
  Sparkles,
  Target,
  TrendingDown,
  Wallet,
  FileText,
} from "lucide-react";

import {
  ActionLink,
  GlassCard,
  Logo,
  PlanCard,
  PLANS,
  PlainCard,
  type Plan,
} from "@/components/digitalos/ui-kit";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DigitalOS — Seu guia personalizado no marketing digital" },
      {
        name: "description",
        content:
          "Responda um quiz rápido e receba um guia passo a passo feito por IA para começar no digital com direção clara.",
      },
      { property: "og:title", content: "DigitalOS — Seu guia personalizado no marketing digital" },
      {
        property: "og:description",
        content:
          "Pare de se perder em informação solta. O DigitalOS monta seu caminho: oferta, copy, tráfego e pagamento.",
      },
    ],
  }),
  component: SalesPage,
});

const PAINS = [
  {
    icon: Compass,
    title: "Você não sabe por onde começar",
    text: "Cada vídeo fala uma coisa diferente e você trava antes do primeiro passo.",
  },
  {
    icon: Wallet,
    title: "Você gasta no lugar errado",
    text: "Curso, anúncio, ferramenta. O dinheiro sai e o resultado não chega.",
  },
  {
    icon: TrendingDown,
    title: "Você começa e para no meio",
    text: "Sem um plano na mão, qualquer dificuldade vira motivo pra desistir.",
  },
  {
    icon: HelpCircle,
    title: "Você se perde entre tanta informação",
    text: "Informação demais, direção de menos. Falta alguém organizar pra você.",
  },
];

const STEPS = [
  {
    icon: FileText,
    title: "1. Responda o quiz",
    text: "Perguntas simples sobre sua ideia, seu tempo e o que te trava hoje.",
  },
  {
    icon: Sparkles,
    title: "2. A IA analisa sua situação",
    text: "Ela cruza seu nível, seus recursos e seu objetivo de prazo.",
  },
  {
    icon: Target,
    title: "3. Receba seu guia completo",
    text: "Oferta, copy, criativos, campanha e pagamento — passo a passo.",
  },
];

const FAQ = [
  {
    q: "Preciso já ter um negócio para usar?",
    a: "Não. O quiz foi feito para quem está começando do zero e também para quem já vende e quer organizar o caminho.",
  },
  {
    q: "O guia é igual para todo mundo?",
    a: "Não. Ele é montado a partir das suas respostas: sua ideia, seu público, seu tempo e quanto você pode investir.",
  },
  {
    q: "Qual a diferença entre o plano Mensal e o Vitalício?",
    a: "O acesso e o conteúdo são exatamente os mesmos. Muda só a forma de pagar: mensalidade ou pagamento único.",
  },
  {
    q: "Existe limite de guias?",
    a: "Sim, os dois planos têm um limite de gerações por mês. Você vê o contador dentro da sua conta.",
  },
  {
    q: "Preciso saber mexer em ferramentas técnicas?",
    a: "Não. O guia é escrito em linguagem simples, com passos práticos e sem jargão.",
  },
  {
    q: "Posso voltar a ver meus guias depois?",
    a: "Sim. Todo guia gerado fica salvo no seu histórico dentro da sua conta.",
  },
];

function SalesPage() {
  const navigate = useNavigate();
  const goToPlan = (plan: Plan) => {
    void navigate({ to: "/checkout", search: { plano: plan.id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <ActionLink to="/quiz" variant="accent" className="hidden sm:inline-flex">
            Fazer minha Guia Agora
          </ActionLink>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Seu guia de marketing digital, feito para a sua realidade
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
              Perdido no digital? Você não precisa de mais um curso. Precisa de direção.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              O DigitalOS conversa com você, entende sua ideia e monta um guia passo a passo — do
              que vender até como anunciar e receber.
            </p>
            <div className="mt-8 flex justify-center">
              <ActionLink to="/quiz" variant="accent" className="px-7 text-base">
                Fazer minha Guia Agora
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ActionLink>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Leva menos de 3 minutos para responder.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Se você se reconhece aqui, o problema não é você
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {PAINS.map((pain) => (
              <PlainCard key={pain.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <pain.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold text-foreground">{pain.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{pain.text}</p>
                </div>
              </PlainCard>
            ))}
          </div>
        </section>

        <section className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
              Como o DigitalOS funciona
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
              Três passos simples até você ter um plano na mão.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {STEPS.map((step) => (
                <GlassCard key={step.title} className="animate-rise-in text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            O que dizem quem já usou
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {["[DEPOIMENTO_1]", "[DEPOIMENTO_2]", "[DEPOIMENTO_3]"].map((slot, i) => (
              <PlainCard key={slot}>
                <p className="text-sm text-muted-foreground">{slot}</p>
                <p className="mt-4 text-sm font-semibold text-foreground">
                  [NOME_CLIENTE_{i + 1}]
                </p>
                <p className="text-xs text-muted-foreground">[DESCRICAO_CLIENTE_{i + 1}]</p>
              </PlainCard>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            [NUMERO_USUARIOS] — substitua os campos acima pelos depoimentos reais.
          </p>
        </section>

        <section id="planos" className="bg-secondary/40 py-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
              Escolha como quer começar
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground">
              Os dois planos dão exatamente o mesmo acesso. Escolha o que cabe no seu bolso hoje.
            </p>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {PLANS.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onSelect={goToPlan}
                  highlight={plan.id === "vitalicio"}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Dúvidas frequentes
          </h2>
          <div className="mt-8 space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group cursor-pointer rounded-2xl border border-border bg-card p-5"
              >
                <summary className="cursor-pointer list-none font-semibold text-foreground">
                  {item.q}
                </summary>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
          <GlassCard className="text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Comece com um plano na mão hoje
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Responda o quiz e veja o caminho montado para a sua ideia.
            </p>
            <div className="mt-6 flex justify-center">
              <ActionLink to="/quiz" variant="accent" className="px-7 text-base">
                Fazer minha Guia Agora
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ActionLink>
            </div>
          </GlassCard>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center sm:px-6">
          <Logo />
          <p className="text-xs text-muted-foreground">
            DigitalOS — seu guia de marketing digital. [TEXTO_RODAPE_LEGAL]
          </p>
        </div>
      </footer>
    </div>
  );
}
