import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

import {
  ActionButton,
  GlassCard,
  Logo,
  ProgressSteps,
  TextAreaField,
} from "@/components/digitalos/ui-kit";
import { INITIAL_QUIZ } from "@/lib/quiz-data";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz inicial — DigitalOS" },
      {
        name: "description",
        content:
          "Responda algumas perguntas rápidas sobre sua ideia e receba a base do seu guia personalizado.",
      },
      { property: "og:title", content: "Quiz inicial — DigitalOS" },
      {
        property: "og:description",
        content: "Poucas perguntas simples para o DigitalOS entender o seu ponto de partida.",
      },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const question = INITIAL_QUIZ[step]!;
  const value = answers[question.id] ?? "";

  const save = (answer: string) => setAnswers((prev) => ({ ...prev, [question.id]: answer }));

  const advance = () => {
    if (step + 1 < INITIAL_QUIZ.length) {
      setStep(step + 1);
      return;
    }
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("digitalos:quiz-inicial", JSON.stringify(answers));
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
          <Logo />
        </div>
        <main className="mx-auto flex w-full max-w-2xl flex-1 items-center px-4 pb-16 sm:px-6">
          <GlassCard className="w-full animate-rise-in text-center">
            <span className="mx-auto flex h-16 w-16 animate-pop-check items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-8 w-8" aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-2xl font-bold text-foreground">Sua Guia está pronta!</h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Já entendemos seu ponto de partida. Escolha seu plano para desbloquear o guia completo
              e gerar novos sempre que quiser.
            </p>
            <div className="mt-6 flex justify-center">
              <ActionButton
                variant="accent"
                className="px-7"
                onClick={() => void navigate({ to: "/planos" })}
              >
                Ver meu Plano
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ActionButton>
            </div>
          </GlassCard>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6">
        <Logo />
      </div>
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-16 sm:px-6">
        <ProgressSteps current={step} total={INITIAL_QUIZ.length} />

        <GlassCard key={question.id} className="mt-6 animate-step-in">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">{question.title}</h1>
          {question.help ? (
            <p className="mt-2 text-sm text-muted-foreground">{question.help}</p>
          ) : null}

          {question.type === "choice" ? (
            <div className="mt-6 space-y-2.5">
              {question.options?.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    save(option);
                  }}
                  className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200 ${
                    value === option
                      ? "border-primary bg-secondary text-secondary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted"
                  }`}
                >
                  {option}
                  {value === option ? <Check className="h-4 w-4 text-primary" /> : null}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-6">
              <TextAreaField
                id={question.id}
                label="Sua resposta"
                placeholder={question.placeholder}
                value={value}
                onChange={(e) => save(e.target.value)}
              />
            </div>
          )}
        </GlassCard>

        <div className="mt-6 flex items-center justify-between gap-3">
          <ActionButton
            variant="ghost"
            onClick={() => (step === 0 ? void navigate({ to: "/" }) : setStep(step - 1))}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Voltar
          </ActionButton>
          <ActionButton variant="accent" onClick={advance} disabled={value.trim().length === 0}>
            {step + 1 === INITIAL_QUIZ.length ? "Ver minha Guia" : "Próxima pergunta"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ActionButton>
        </div>
      </main>
    </div>
  );
}
