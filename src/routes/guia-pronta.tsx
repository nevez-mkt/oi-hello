import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Sparkles } from "lucide-react";
export const Route = createFileRoute("/guia-pronta")({ component: Ready });
function Ready() { return <main className="center-page"><div className="celebrate"><CheckCircle2 /><Sparkles /></div><p className="eyebrow">PRONTO PARA O PRÓXIMO PASSO</p><h1>Sua Guia está pronta para ganhar forma.</h1><p className="muted">Encontramos um ponto de partida para a sua ideia. Escolha seu acesso para ver a Guia completa.</p><Link className="button" to="/planos">Ver meu Plano</Link></main> }
