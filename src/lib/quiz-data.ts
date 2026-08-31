export type QuizQuestion = {
  id: string;
  title: string;
  help?: string;
  type: "choice" | "text";
  options?: string[];
  placeholder?: string;
};

export const INITIAL_QUIZ: QuizQuestion[] = [
  {
    id: "vende_hoje",
    title: "Você já vende algo hoje?",
    help: "Não tem problema se a resposta for não. A gente começa do seu ponto.",
    type: "choice",
    options: [
      "Ainda não vendo nada",
      "Já vendi algumas vezes",
      "Vendo com alguma frequência",
      "Já tenho um negócio rodando",
    ],
  },
  {
    id: "area",
    title: "Qual sua área de interesse?",
    type: "choice",
    options: [
      "Produtos digitais e infoprodutos",
      "Serviços e prestação local",
      "Loja / produtos físicos",
      "Ainda estou decidindo",
    ],
  },
  {
    id: "conhecimento",
    title: "Como está seu conhecimento em marketing digital?",
    type: "choice",
    options: [
      "Começando do zero",
      "Sei o básico, mas me perco",
      "Já testei anúncios e conteúdo",
      "Tenho experiência prática",
    ],
  },
  {
    id: "desafio",
    title: "Qual seu maior desafio agora?",
    type: "choice",
    options: [
      "Não sei por onde começar",
      "Não sei o que vender",
      "Não consigo atrair clientes",
      "Gasto dinheiro e não vejo retorno",
    ],
  },
  {
    id: "ideia",
    title: "Conte em poucas palavras sua ideia ou o que você quer vender",
    help: "Se ainda não tiver clareza, escreva o que vier à cabeça.",
    type: "text",
    placeholder: "Ex: quero vender consultoria de organização para mães...",
  },
];

export const DEEP_QUIZ: QuizQuestion[] = [
  {
    id: "ideia",
    title: "Descreva sua ideia de negócio com detalhes",
    help: "Quanto mais contexto, mais personalizado fica seu guia.",
    type: "text",
    placeholder: "O que você vende ou pretende vender, e para quem...",
  },
  {
    id: "publico",
    title: "Quem é a pessoa que você quer atender?",
    type: "text",
    placeholder: "Ex: mulheres de 30 a 45 anos que trabalham fora...",
  },
  {
    id: "problema",
    title: "Que problema você resolve para essa pessoa?",
    type: "text",
    placeholder: "O incômodo real que ela sente hoje...",
  },
  {
    id: "conhecimento",
    title: "Qual seu nível de conhecimento hoje?",
    type: "choice",
    options: [
      "Começando do zero",
      "Sei o básico, mas me perco",
      "Já testei anúncios e conteúdo",
      "Tenho experiência prática",
    ],
  },
  {
    id: "tempo",
    title: "Quanto tempo por semana você consegue dedicar?",
    type: "choice",
    options: ["Até 5 horas", "De 5 a 10 horas", "De 10 a 20 horas", "Dedicação integral"],
  },
  {
    id: "investimento",
    title: "Quanto você consegue investir por mês no começo?",
    type: "choice",
    options: [
      "Nada por enquanto",
      "Um valor bem pequeno",
      "Um valor moderado",
      "Tenho caixa para acelerar",
    ],
  },
  {
    id: "canais",
    title: "Onde você já tem alguma presença?",
    type: "choice",
    options: [
      "Nenhum canal ainda",
      "Instagram",
      "TikTok ou YouTube",
      "WhatsApp e indicações",
      "Mais de um canal",
    ],
  },
  {
    id: "objetivo",
    title: "Qual seu objetivo de prazo?",
    type: "choice",
    options: [
      "Primeira venda em 30 dias",
      "Renda extra em 90 dias",
      "Substituir minha renda em 6 meses",
      "Construir um negócio sólido no ano",
    ],
  },
  {
    id: "bloqueio",
    title: "O que mais te trava hoje?",
    type: "text",
    placeholder: "Ex: medo de gravar vídeo, não saber precificar...",
  },
];

export const GENERATION_MESSAGES = [
  "Analisando sua ideia...",
  "Entendendo seu público...",
  "Montando sua oferta...",
  "Escrevendo suas copies...",
  "Definindo sua estratégia de tráfego...",
  "Organizando seu guia...",
];
