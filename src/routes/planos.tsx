import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Brand, PlanCards } from "../components/digitalos";
export const Route = createFileRoute("/planos")({ component: Plans });
function Plans() { return <main className="plans-page"><header className="simple-header"><Brand /><Link to="/guia-pronta"><ArrowLeft />Voltar</Link></header><section className="section"><p className="eyebrow">ESCOLHA SEU ACESSO</p><h1>Veja sua Guia completa e continue quando quiser.</h1><PlanCards checkout /></section></main> }
