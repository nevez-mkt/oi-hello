import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Logo, PlanCard, PLANS, type Plan } from "@/components/digitalos/ui-kit";

export const Route = createFileRoute("/planos")({
  head: () => ({
    meta: [
      { title: "Planos — DigitalOS" },
      {
        name: "description",
        content:
          "Plano Mensal ou Vitalício: mesmo acesso ao guia personalizado por IA. Escolha o que cabe no seu bolso.",
      },
      { property: "og:title", content: "Planos — DigitalOS" },
      {
        property: "og:description",
        content: "Mesmo conteúdo nos dois planos. Só muda a forma de pagar.",
      },
    ],
  }),
  component: PlansPage,
});

function PlansPage() {
  const navigate = useNavigate();
  const choose = (plan: Plan) => {
    void navigate({ to: "/checkout", search: { plano: plan.id } });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <Logo />
      </div>
      <main className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6">
        <h1 className="text-center text-3xl font-bold text-foreground">
          Desbloqueie seu guia completo
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-center text-sm text-muted-foreground">
          Os dois planos liberam exatamente o mesmo acesso. Escolha o formato de pagamento.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelect={choose}
              highlight={plan.id === "vitalicio"}
              ctaLabel="Ver meu Plano"
            />
          ))}
        </div>
      </main>
    </div>
  );
}
