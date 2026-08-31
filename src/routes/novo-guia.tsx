import { createFileRoute } from "@tanstack/react-router"; import { Quiz } from "../components/digitalos"; export const Route = createFileRoute("/novo-guia")({ component: () => <Quiz internal /> });
