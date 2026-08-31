import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, Check, CircleAlert, Clock3, Compass, CreditCard,
  FileText, KeyRound, LayoutDashboard, Menu, Plus, Sparkles, X,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

export const plans = [
  { id: "mensal", name: "Plano Mensal", price: "[PREÇO_MENSAL]", detail: "Mesmo acesso e limite de gerações protegido." },
  { id: "vitalicio", name: "Plano Vitalício", price: "[PREÇO_VITALÍCIO]", detail: "Mesmo acesso e limite de gerações protegido." },
];

export function Brand() {
  return <Link to="/" className="brand" aria-label="DigitalOS, início"><span>D</span>DigitalOS</Link>;
}

export function PublicHeader() {
  return <header className="public-header"><Brand /><nav><a href="#como-funciona">Como funciona</a><a href="#planos">Planos</a><Link to="/entrar">Entrar</Link><Link className="button button-small" to="/quiz-inicial">Fazer minha Guia</Link></nav></header>;
}

export function PlanCards({ checkout = false }: { checkout?: boolean }) {
  return <div className="plan-grid">{plans.map((plan) => <article className="plan-card" key={plan.id}>
    <p className="eyebrow">{plan.name}</p><h3>{plan.price}</h3><p>{plan.detail}</p>
    <ul><li><Check />Acesso ao guia personalizado</li><li><Check />Histórico de guias</li><li><Check />[LIMITE_DE_GERAÇÕES_MENSAIS]</li></ul>
    <Link className="button button-block" to="/checkout" search={{ plano: plan.id }}>{checkout ? `Escolher ${plan.name}` : "Ver opções"}</Link>
  </article>)}</div>;
}

export function Progress({ current, total }: { current: number; total: number }) {
  return <div className="progress-wrap"><div className="progress-label">Etapa {current} de {total}</div><div className="progress"><i style={{ width: `${(current / total) * 100}%` }} /></div></div>;
}

type QuizQuestion = readonly [string, readonly string[]];
const initialQuestions: QuizQuestion[] = [
  ["Em que fase sua ideia está?", ["Ainda estou explorando", "Já tenho uma ideia", "Já vendo algo"]],
  ["Qual área mais combina com seu projeto?", ["Produtos digitais", "Serviços", "Produtos físicos", "Ainda não sei"]],
  ["Qual é seu maior desafio agora?", ["Escolher um caminho", "Criar uma oferta", "Encontrar clientes", "Organizar os próximos passos"]],
  ["Como você se sente no marketing digital?", ["Estou começando", "Tenho noções", "Já tentei antes"]],
  ["O que você quer destravar primeiro?", ["Clareza para agir", "Uma estratégia inicial", "Meu próximo passo"]],
] as const;

export function Quiz({ internal = false }: { internal?: boolean }) {
  const questions: QuizQuestion[] = internal ? [...initialQuestions, ["Quais recursos você pode dedicar agora?", ["Tempo para aprender", "Orçamento a definir", "Já tenho equipe ou apoio"]], ["Qual horizonte você considera para o projeto?", ["Começar com calma", "Avançar em breve", "Validar uma ideia"]]] : initialQuestions;
  const [step, setStep] = useState(0); const navigate = useNavigate(); const question = questions[step]!;
  function next() { if (step === questions.length - 1) navigate({ to: internal ? "/gerando" : "/guia-pronta" }); else setStep(step + 1); }
  return <main className="quiz-page"><div className="quiz-top"><Brand /><Link to={internal ? "/dashboard" : "/"}>Sair</Link></div><section className="quiz-card">
    <Progress current={step + 1} total={questions.length} /><p className="eyebrow">{internal ? "Construindo seu guia" : "Conhecendo sua ideia"}</p><h1>{question[0]}</h1><p className="muted">Escolha a opção que melhor representa seu momento.</p>
    <div className="choice-list">{question[1].map((choice) => <button key={choice} className="choice" onClick={next}>{choice}<ArrowRight /></button>)}</div>
    <button className="text-button" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft />Voltar</button>
  </section></main>;
}

export function AppLayout({ children, title, action }: { children: ReactNode; title: string; action?: ReactNode }) {
  const [open, setOpen] = useState(false); const links = [["/dashboard", LayoutDashboard, "Visão geral"], ["/novo-guia", Plus, "Gerar novo Guia"], ["/historico", Clock3, "Histórico"], ["/plano", CreditCard, "Meu plano"]] as const;
  return <div className="app-layout"><aside className={open ? "sidebar open" : "sidebar"}><Brand /><button className="sidebar-close" onClick={() => setOpen(false)}><X /></button><nav>{links.map(([to, Icon, label]) => <Link key={to} to={to} activeProps={{ className: "active" }}><Icon />{label}</Link>)}</nav><div className="sidebar-footer"><Link to="/perfil"><KeyRound />Conta e acesso</Link></div></aside><div className="app-content"><header className="app-header"><button className="menu-button" onClick={() => setOpen(true)}><Menu /></button><div><p className="eyebrow">DigitalOS</p><h1>{title}</h1></div>{action}</header>{children}</div></div>;
}

export function GenerationScreen() {
  const [message, setMessage] = useState("Analisando sua ideia..."); const navigate = useNavigate();
  useEffect(() => { const timer = setTimeout(() => setMessage("Montando sua estratégia..."), 1000); const done = setTimeout(() => navigate({ to: "/guias/exemplo" }), 2200); return () => { clearTimeout(timer); clearTimeout(done); }; }, [navigate]);
  return <main className="center-page"><Sparkles className="sparkle" /><p className="eyebrow">Sua Guia está sendo preparada</p><h1>{message}</h1><p className="muted">Estamos organizando os próximos passos da sua ideia.</p><div className="loader" /></main>;
}

export function CheckoutState({ state }: { state: "loading" | "success" | "error" }) {
  const values = { loading: [Clock3, "Estamos confirmando seu pagamento", "Aguarde um instante. Você verá o resultado aqui."], success: [Check, "Pagamento confirmado", "Seu acesso está pronto para ser criado."], error: [CircleAlert, "Não foi possível concluir o pagamento", "Nenhuma cobrança adicional deve ser feita. Revise os dados ou tente novamente."] } as const;
  const [Icon, title, description] = values[state];
  return <main className="center-page"><Icon className={state === "error" ? "state-icon error" : "state-icon"} /><p className="eyebrow">Checkout</p><h1>{title}</h1><p className="muted">{description}</p>{state === "loading" && <div className="loader" />}{state === "success" && <Link className="button" to="/criar-conta">Criar minha conta</Link>}{state === "error" && <Link className="button" to="/checkout">Tentar novamente</Link>}</main>;
}

export function GuideContent() { return <div className="guide-sections">{[["Oferta", "[GUIA_OFERTA]"], ["Mensagem e criativos", "[GUIA_COPY_E_CRIATIVOS]"], ["Estrutura de campanha", "[GUIA_ESTRUTURA_DE_CAMPANHA]"], ["Pagamento e operação", "[GUIA_PLATAFORMAS_DE_PAGAMENTO]"]].map(([title, value]) => <section className="guide-section" key={title}><h2>{title}</h2><p>{value}</p></section>)}</div>; }
