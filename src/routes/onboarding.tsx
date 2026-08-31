import { createFileRoute, Link } from "@tanstack/react-router"; import { Compass } from "lucide-react";
export const Route = createFileRoute("/onboarding")({ component: Onboarding });
function Onboarding() { return <main className="center-page"><Compass className="state-icon" /><p className="eyebrow">BEM-VINDO(A)</p><h1>O DigitalOS começa pelo seu contexto.</h1><p className="muted">Quando estiver pronto(a), vamos aprofundar sua ideia e preparar a sua primeira Guia.</p><Link className="button" to="/dashboard">Conhecer meu painel</Link></main> }
