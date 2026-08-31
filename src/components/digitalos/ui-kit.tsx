import { Link } from "@tanstack/react-router";
import { Compass, Check } from "lucide-react";
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 rounded-md text-lg font-bold tracking-tight text-foreground",
        className,
      )}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Compass className="h-5 w-5" aria-hidden="true" />
      </span>
      DigitalOS
    </Link>
  );
}

type ActionVariant = "primary" | "accent" | "ghost" | "outline";

const variantClasses: Record<ActionVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-soft",
  accent: "bg-accent text-accent-foreground hover:brightness-110",
  outline: "border border-border bg-card text-foreground hover:bg-muted",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
};

const baseAction =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-60";

export function ActionButton({
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ActionVariant }) {
  return <button className={cn(baseAction, variantClasses[variant], className)} {...props} />;
}

export function ActionLink({
  variant = "primary",
  className,
  children,
  ...props
}: { variant?: ActionVariant; children: ReactNode } & Omit<
  React.ComponentProps<typeof Link>,
  "children"
>) {
  return (
    <Link className={cn(baseAction, variantClasses[variant], className)} {...props}>
      {children}
    </Link>
  );
}

export function GlassCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("glass-card rounded-2xl p-6", className)}>{children}</div>;
}

export function PlainCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-6", className)}>{children}</div>
  );
}

export function TextField({
  label,
  className,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-left" htmlFor={id}>
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        id={id}
        className={cn(
          "min-h-11 w-full rounded-xl border border-input bg-card px-4 py-2.5 text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary",
          className,
        )}
        {...props}
      />
    </label>
  );
}

export function TextAreaField({
  label,
  id,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block text-left" htmlFor={id}>
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <textarea
        id={id}
        rows={4}
        className={cn(
          "w-full rounded-xl border border-input bg-card px-4 py-3 text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-primary",
          className,
        )}
        {...props}
      />
    </label>
  );
}

export function ProgressSteps({ current, total }: { current: number; total: number }) {
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
        <span>
          Etapa {current + 1} de {total}
        </span>
        <span>{pct}%</span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso do quiz"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export type Plan = {
  id: "mensal" | "vitalicio";
  name: string;
  price: string;
  period: string;
  note: string;
  perks: string[];
};

export const PLANS: Plan[] = [
  {
    id: "mensal",
    name: "Plano Mensal",
    price: "[PRECO_MENSAL]",
    period: "por mês",
    note: "Cancele quando quiser.",
    perks: [
      "Guia personalizado gerado por IA",
      "Quiz completo sobre a sua ideia",
      "Histórico de guias salvo na sua conta",
      "[LIMITE_GERACOES] gerações por mês",
    ],
  },
  {
    id: "vitalicio",
    name: "Plano Vitalício",
    price: "[PRECO_VITALICIO]",
    period: "pagamento único",
    note: "Mesmo acesso, sem mensalidade.",
    perks: [
      "Guia personalizado gerado por IA",
      "Quiz completo sobre a sua ideia",
      "Histórico de guias salvo na sua conta",
      "[LIMITE_GERACOES] gerações por mês",
    ],
  },
];

export function PlanCard({
  plan,
  onSelect,
  highlight,
  ctaLabel = "Escolher este plano",
  loading,
}: {
  plan: Plan;
  onSelect: (plan: Plan) => void;
  highlight?: boolean;
  ctaLabel?: string;
  loading?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass-card flex flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-0.5",
        highlight && "ring-2 ring-primary",
      )}
    >
      {highlight ? (
        <span className="mb-3 w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          Mais escolhido
        </span>
      ) : null}
      <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
      <p className="mt-3 text-3xl font-bold text-foreground">{plan.price}</p>
      <p className="text-sm text-muted-foreground">{plan.period}</p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {perk}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted-foreground">{plan.note}</p>
      <ActionButton
        variant="accent"
        className="mt-4 w-full"
        onClick={() => onSelect(plan)}
        disabled={loading}
      >
        {loading ? "Abrindo checkout..." : ctaLabel}
      </ActionButton>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <PlainCard className="flex flex-col items-center gap-3 py-12 text-center">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      {action}
    </PlainCard>
  );
}

export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
    >
      {children}
    </p>
  );
}
