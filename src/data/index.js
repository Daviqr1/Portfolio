// ---------------------------------------------------------------------------
// src/data/index.js — fonte única de conteúdo do portfólio de Davi Rezende.
//
// REGRA DESTE ARQUIVO: todo número aqui é MEDIDO (git, schema, contagem de
// arquivo). Nada é estimado, arredondado para cima ou "sentido". Se um dado não
// existe, o campo não existe — nunca fica NaN, nunca fica placeholder.
//
// Consistência obrigatória com job_safe/assets/cv-pt.md e cv-en.md: mesmas
// datas, mesmos cargos, mesmos números. Divergência entre canais é o que mais
// queima candidato.
//
// Idiomas: "pt-BR" e "en-US" são conteúdo próprio. "zh-CN" hoje REPLICA o
// en-US (ver PLANO.md, item 9) — o helper t3() torna isso explícito: quando o
// terceiro argumento é omitido, zh-CN recebe o texto em inglês.
// ---------------------------------------------------------------------------

// Únicas imagens rasterizadas usadas: capturas reais do app de telemetria da
// EMFLORA, feitas por Davi. Os demais cards usam capa gerada em CSS (sem
// arquivo, sem licença de terceiro, sem peso). Ver PLANO.md, itens 8 e 9.
import fleetTelemetry from "../assets/harvester-dashboard.jpg";
import fleetRefuel from "../assets/harvester-hardware.jpg";
import fleetChecklist from "../assets/harvester-mobile.jpg";

// ---------------------------------------------------------------------------
// i18n
// ---------------------------------------------------------------------------

export const LANGUAGES = ["pt-BR", "en-US", "zh-CN"];
export const DEFAULT_LANGUAGE = "pt-BR";

/**
 * Monta um campo traduzível. Omitir `zhCN` faz zh-CN cair no texto em inglês —
 * decisão consciente, documentada no PLANO.md.
 */
const t3 = (ptBR, enUS, zhCN) => ({
  "pt-BR": ptBR,
  "en-US": enUS,
  "zh-CN": zhCN === undefined ? enUS : zhCN,
});

/**
 * Resolve qualquer campo traduzível (objeto, string, número ou array deles).
 * Uso nos componentes: pick(project.highlight, language)
 */
export const pick = (value, language = DEFAULT_LANGUAGE) => {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return value;
  if (Array.isArray(value)) return value.map((item) => pick(item, language));
  return (
    value[language] ??
    value["en-US"] ??
    value[DEFAULT_LANGUAGE] ??
    ""
  );
};

// ---------------------------------------------------------------------------
// Perfil
// ---------------------------------------------------------------------------

export const profile = {
  name: "Davi Barros de Rezende",
  shortName: "Davi Rezende",
  pronouns: "He/Him",

  headline: t3(
    "Engenheiro de Software Sênior — IA generativa em produção e sistemas críticos",
    "Senior Software Engineer — Generative AI in production and mission-critical systems"
  ),

  location: t3(
    "Vitória, Espírito Santo — Brasil · UTC−3",
    "Vitória, Espírito Santo — Brazil · UTC−3"
  ),

  workMode: t3("Remoto (Brasil e internacional)", "Remote (Brazil and international)"),

  // "~5 anos": a conta do GitHub é de 16/05/2021 e ancora o início.
  experienceYears: t3("~5 anos de experiência", "~5 years of experience"),

  summary: t3(
    "Engenheiro de software com cerca de 5 anos de experiência e ~2.900 commits de autoria em nove sistemas reais. Construo a camada que faz LLM sobreviver em produção — gateway com orçamento de tempo, guardrail determinístico e bancada de evals — com o rigor de medição de quem também entregou, sozinho, um supervisório SCADA industrial e o firmware de navegação RTK de uma máquina agrícola.",
    "Software engineer with about five years of experience and ~2,900 authored commits across nine real systems. I build the layer that makes LLMs survive production — gateways with time budgets, deterministic guardrails and eval benches — with the measurement discipline of someone who also shipped, alone, an industrial SCADA system and the RTK navigation firmware of an agricultural machine."
  ),

  // Comportamento descrito, sem citar instrumento nem alegar laudo.
  workingStyle: t3(
    "Lidero decisão técnica e sustento a decisão com dado: escrevo o trade-off antes do código e meço o custo depois. Vim da engenharia, e é de lá que veio a mania de perguntar como o número foi medido.",
    "I lead technical decisions and back them with data: the trade-off gets written before the code and the cost gets measured after. I came from engineering, and that is where the habit of asking how a number was measured came from."
  ),

  links: {
    github: "https://github.com/Daviqr1",
    linkedin: "https://www.linkedin.com/in/davi-rezende-09540b222/",
    email: "davidbecam006@gmail.com",
    liveProject: "https://ooinfo.org",
  },
};

// Rotação do subtítulo do Hero. Shape consumido por Position.jsx: um array de
// strings por idioma.
export const positions = {
  "pt-BR": [
    "Engenheiro de Software Sênior",
    "IA generativa em produção",
    "PostgreSQL como arquitetura",
    "Sistemas que não podem mentir",
  ],
  "en-US": [
    "Senior Software Engineer",
    "Generative AI in production",
    "PostgreSQL as architecture",
    "Systems that cannot lie",
  ],
  "zh-CN": [
    "Senior Software Engineer",
    "Generative AI in production",
    "PostgreSQL as architecture",
    "Systems that cannot lie",
  ],
};

// ---------------------------------------------------------------------------
// Navegação — ids batem com os id= reais das <section> em App.jsx
// ---------------------------------------------------------------------------

export const navLinks = [
  { id: "home", title: "Home", label: t3("Início", "Home", "首页") },
  { id: "about", title: "About", label: t3("Sobre", "About", "关于") },
  { id: "projetos", title: "Projects", label: t3("Projetos", "Projects", "项目") },
  { id: "experiência", title: "Experience", label: t3("Experiência", "Experience", "经验") },
  { id: "roadmap", title: "Roadmap", label: t3("Trajetória", "Roadmap", "路线图") },
  { id: "contato", title: "Contact", label: t3("Contato", "Contact", "联系") },
];

// ---------------------------------------------------------------------------
// Stack — texto, sem depender de ícone existir em public/assets
// ---------------------------------------------------------------------------

export const stack = [
  {
    id: "languages",
    group: t3("Linguagens", "Languages"),
    items: ["TypeScript", "JavaScript", "Python 3", "SQL / PL-pgSQL", "C++ (ESP32)", "Bash"],
  },
  {
    id: "ai",
    group: t3("IA generativa e LLM", "Generative AI & LLM"),
    items: [
      "LLM em produção (OpenAI, Anthropic, DeepSeek, OpenRouter, Gemini)",
      "Model Context Protocol (MCP) com OAuth 2.1 e escopos",
      "Agentes e tool calling",
      "Sistemas multiagente",
      "Gateway provider-agnostic com cascata de fallback",
      "Structured output / JSON Schema",
      "Streaming SSE com parser incremental",
      "LLM-as-a-Judge e bancada de evals",
      "Gate determinístico anti-alucinação",
      "Custo por token e teto de gasto por tenant",
      "ONNX Runtime",
      "scikit-learn",
    ],
  },
  {
    id: "backend",
    group: t3("Backend, APIs e tempo real", "Backend, APIs & real-time"),
    items: [
      "Node.js 20/22",
      "NestJS 10",
      "Fastify",
      "Express",
      "Next.js 16 (App Router, Server Actions, RSC)",
      "FastAPI",
      "Django REST Framework",
      "REST e OpenAPI 3.0",
      "JSON-RPC",
      "Webhooks com idempotência",
      "Monolito modular",
      "BullMQ",
      "Fila de jobs em Postgres",
      "pg_notify + LISTEN + SSE",
      "WebSocket / Socket.IO",
      "MQTT",
    ],
  },
  {
    id: "frontend",
    group: t3("Frontend", "Frontend"),
    items: [
      "React 18/19",
      "React Native + Expo",
      "Vite",
      "TanStack Query / Table",
      "Zustand",
      "TailwindCSS",
      "shadcn/ui",
      "React Hook Form + Zod",
      "Recharts",
      "i18n",
      "Acessibilidade (ARIA, alto contraste)",
      "Tauri",
    ],
  },
  {
    id: "data",
    group: t3("Dados e persistência", "Data & persistence"),
    items: [
      "PostgreSQL 16",
      "Prisma",
      "TypeORM",
      "MongoDB",
      "SQLite",
      "Redis",
      "InfluxDB",
      "Row-Level Security",
      "Funções e triggers PL/pgSQL",
      "Migrations versionadas e idempotentes",
      "Full-text search (tsvector, pg_trgm, unaccent, GIN)",
      "Paginação keyset",
      "FOR UPDATE SKIP LOCKED",
      "EAV com projeção materializada",
    ],
  },
  {
    id: "infra",
    group: t3("Infra, CI/CD e qualidade", "Infra, CI/CD & quality"),
    items: [
      "Docker e Docker Compose",
      "GitHub Actions",
      "GHCR e deploy pull-based",
      "Coolify",
      "Nginx / Caddy com TLS automático",
      "Linux VPS, systemd, PM2",
      "Ambientes lab / homologação / produção com portão de promoção",
      "Trivy",
      "Deploy on-premise e air-gapped",
      "AWS S3 / MinIO",
      "Jest, Vitest, Cypress, Playwright, pytest",
      "Teste de integração contra banco real no CI",
      "Chaos e soak testing",
      "ADR e spec antes do código",
    ],
  },
  {
    id: "security",
    group: t3("Segurança e autorização", "Security & authorization"),
    items: [
      "OAuth 2.0 / 2.1",
      "Authorization Code + PKCE",
      "Dynamic Client Registration",
      "OpenID Connect e SSO Keycloak",
      "JWT e refresh token",
      "RBAC e ACL por linha",
      "Isolamento multi-tenant defendido no banco",
      "Teste automatizado de IDOR cross-tenant",
      "bcrypt e SHA-256",
      "AES-256-GCM",
      "Rate limiting",
      "Zod",
      "Trilha de auditoria",
      "Threat modeling",
      "LGPD",
    ],
  },
  {
    id: "payments",
    group: t3("Pagamentos e domínio financeiro", "Payments & financial domain"),
    items: [
      "Verificação de assinatura de webhook Stripe implementada do zero",
      "Mercado Pago / Pix",
      "Idempotência de cobrança (X-Idempotency-Key)",
      "Webhook que re-consulta o provedor antes de confirmar",
      "Reserva atômica sob concorrência",
      "Modelagem de churn e health score",
    ],
  },
  {
    id: "critical",
    group: t3("Sistemas críticos e embarcados (diferencial)", "Critical & embedded (differentiator)"),
    items: [
      "SCADA / HMI",
      "CLP Siemens S7-1500",
      "S7Comm sobre ISO-on-TCP",
      "Engenharia reversa de protocolo binário e mapa de memória",
      "Design fail-safe e watchdog em processo isolado",
      "GNSS-RTK, NTRIP, RTCM3",
      "u-blox ZED-F9P",
      "Fusão de sensores",
      "Filtro de Kalman Estendido",
      "Otimização bayesiana (Gaussian Process)",
      "Processamento de sinais (DCT-II)",
      "Geoespacial (GDAL, KML)",
    ],
  },
];

// Grade de ícones do AboutSection. Só aponta para SVG que EXISTE hoje em
// public/assets — nada aqui dá 404. Ver PLANO.md item 10 para os ícones que
// faltam (TypeScript, PostgreSQL, NestJS, Next.js, Prisma, Docker).
export const technologies = [
  { name: "React", icon: "assets/React.svg" },
  { name: "Node.js", icon: "assets/Node.js.svg" },
  { name: "JavaScript", icon: "assets/JavaScript.svg" },
  { name: "Python", icon: "assets/Python.svg" },
  { name: "Tailwind", icon: "assets/Tailwind.svg" },
  { name: "Vite", icon: "assets/Vitejs.svg" },
  { name: "FastAPI", icon: "assets/Fastapi.svg" },
  { name: "Laravel", icon: "assets/Laravel.svg" },
];

// ---------------------------------------------------------------------------
// Cartão "about.js" do AboutSection
// ---------------------------------------------------------------------------

export const aboutCard = {
  constName: t3("engenheiro", "engineer"),
  fields: [
    { key: t3("nome", "name"), value: "Davi Barros de Rezende" },
    {
      key: t3("cargo", "role"),
      value: t3("Engenheiro de Software Sênior", "Senior Software Engineer"),
    },
    { key: t3("base", "based"), value: "Vitória / ES · Brasil · UTC−3" },
    {
      key: t3("foco", "focus"),
      value: t3(
        "IA generativa em produção · PostgreSQL · sistemas críticos",
        "generative AI in production · PostgreSQL · mission-critical systems"
      ),
    },
    {
      key: t3("procurando", "seeking"),
      value: t3(
        "vaga sênior remota em fintech, banco ou produto",
        "senior remote role in fintech, banking or product"
      ),
    },
    { key: t3("commits", "commits"), value: "~2.900" },
  ],
  consoleLog: t3(
    "Todo número deste site foi medido no repositório, não digitado. Se você abrir o git log, ele bate.",
    "Every number on this site was measured in the repository, not typed. Open the git log and it checks out."
  ),
  beyondCoding: [
    t3("Café, e não é força de expressão", "Coffee, and not as a figure of speech"),
    t3("Musculação, ciclismo e corrida", "Weight training, cycling and running"),
    t3("Rock e rap enquanto o teste roda", "Rock and rap while the test suite runs"),
    t3("Conversa aberta com quem quer trocar arquitetura", "Always up for an architecture conversation"),
  ],
};

// ---------------------------------------------------------------------------
// Formação — nunca alegar diploma concluído
// ---------------------------------------------------------------------------

export const education = [
  {
    course: t3("Análise e Desenvolvimento de Sistemas", "Analysis and Systems Development"),
    status: t3("Em curso", "In progress"),
  },
  {
    course: t3("Ciência da Computação", "Computer Science"),
    status: t3("Em curso", "In progress"),
  },
  {
    course: t3(
      "Engenharia Mecânica — IFES (Instituto Federal do Espírito Santo)",
      "Mechanical Engineering — IFES (Federal Institute of Espírito Santo)"
    ),
    status: t3("Cursada, não concluída", "Attended, not completed"),
  },
];

export const languagesSpoken = [
  { name: t3("Português", "Portuguese"), level: t3("Nativo", "Native") },
  {
    name: t3("Inglês", "English"),
    level: t3(
      "Leitura e escrita técnica avançada (arquitetura, ADR, spec, relatório)",
      "Advanced technical reading and writing (architecture, ADRs, specs, reports)"
    ),
  },
];

// ---------------------------------------------------------------------------
// Projetos
//
// `icon` e `cover.icon` são CHAVES de string; o componente mapeia para o
// componente lucide-react (ver PLANO.md, item 6). Assim os dados ficam
// serializáveis e sem JSX.
//
// `image: null` = card usa capa gerada em CSS a partir de `cover`. Nenhum
// caminho de imagem inexistente entra aqui.
// ---------------------------------------------------------------------------

export const projects = [
  {
    id: "ooinfo",
    title: "OOInfo — servidor MCP e camada de IA generativa",
    icon: "brain",
    role: t3("Tech Lead / Owner", "Tech Lead / Owner"),
    period: t3("01/2026 – atual", "01/2026 – Present"),
    image: null,
    cover: { icon: "brain", accent: "emerald", label: "MCP · OAuth 2.1 · SSE" },
    tech: [
      "TypeScript",
      "NestJS 10",
      "React 18",
      "PostgreSQL 16",
      "Prisma",
      "Redis",
      "BullMQ",
      "MCP",
      "OAuth 2.1",
      "SSE",
    ],
    links: [
      {
        label: t3("Ver a plataforma no ar", "See the live platform"),
        url: "https://ooinfo.org",
        kind: "live",
      },
    ],
    stats: [
      { label: t3("Commits de autoria", "Authored commits"), value: "1.531 / 2.853", icon: "git" },
      { label: t3("Endpoints REST", "REST endpoints"), value: "495", icon: "server" },
      { label: t3("Ferramentas MCP", "MCP tools"), value: "15", icon: "wrench" },
    ],
    description: t3(
      "Plataforma colaborativa de dados estruturados no ar em ooinfo.org. Sou Tech Lead/Owner registrado no CONTRIBUTING.md, com 1.531 dos 2.853 commits entre 18 autores — incluindo o commit fundador.",
      "Collaborative structured-data platform, live at ooinfo.org. I am the Tech Lead/Owner recorded in the repository's CONTRIBUTING.md, with 1,531 of its 2,853 commits across 18 authors — including the founding one."
    ),
    extendedDescription: t3(
      "NestJS 10 + React 18 + PostgreSQL 16/Prisma + Redis/BullMQ: 495 endpoints REST, 76 tabelas, 131 migrations versionadas, 13 filas assíncronas e 4 gateways WebSocket.\n\nProjetei e implementei sozinho o servidor MCP que abre a plataforma a agentes LLM externos (33 de 37 commits do módulo): 15 ferramentas JSON-RPC, OAuth 2.1 com Dynamic Client Registration e tela de consentimento, tokens pessoais guardados apenas como SHA-256 sob um prefixo escolhido para que secret scanners reconheçam o vazamento, e 4 escopos que só ESTREITAM o controle de acesso existente — nunca ampliam. A documentação das ferramentas é gerada do catálogo real e reprova no CI quando fica defasada.\n\nSou o autor dominante da camada de IA generativa (132 de 226 commits do módulo, ~16,6 mil linhas): gateway multi-provedor DeepSeek/OpenRouter/OpenAI com cascata de 3 tentativas sob orçamento de tempo GLOBAL — para não somar três timeouts na frente do usuário —, streaming SSE com parser incremental de JSON, loop agêntico de ferramentas, cota auditada e 6 modos de falha de upstream modelados como tipos de domínio. Sem framework de orquestração: a orquestração é de autoria própria.\n\nReescrevi também o caminho de leitura de listas com 1.010.025 registros, que gastava 6,6 s por página e estourava timeout de 60 s na busca textual: troquei varredura EAV por colunas materializadas (tsvector ponderado A–D, documento JSONB de busca, coluna GIN pg_trgm com unaccent), paginação keyset e cache versionado em Redis. Uma medição posterior conduzida por um colega, sobre 3 milhões de registros, registrou o filtro textual em 288–380 ms.",
      "NestJS 10 + React 18 + PostgreSQL 16/Prisma + Redis/BullMQ: 495 REST endpoints, 76 tables, 131 versioned migrations, 13 async queues and 4 WebSocket gateways.\n\nI designed and shipped the MCP server single-handedly (33 of the module's 37 commits): 15 JSON-RPC tools, OAuth 2.1 with Dynamic Client Registration and a consent screen, personal tokens stored only as SHA-256 under a prefix chosen so secret scanners recognise a leak, and 4 scopes that can only NARROW the existing access-control layer — never widen it. Tool documentation is generated from the live catalogue and fails CI when it drifts.\n\nI am the dominant author of the generative-AI layer (132 of the module's 226 commits, ~16.6k lines): a multi-provider DeepSeek/OpenRouter/OpenAI gateway with a 3-step fallback cascade under a GLOBAL time budget, so three upstream timeouts never stack up in front of the user; SSE streaming with an incremental JSON parser; an agentic tool loop; audited quota; and six upstream failure modes modelled as domain types. No orchestration framework — the orchestration is hand-rolled.\n\nI also rebuilt the read path for lists holding 1,010,025 records, previously 6.6 s per page with a 60 s search timeout: EAV scans replaced by materialized columns (A–D weighted tsvector, a JSONB search document, a GIN pg_trgm column with unaccent), keyset pagination and version-scoped Redis caching. A later benchmark run by a colleague over 3 million records measured text filtering at 288–380 ms."
    ),
    highlight: t3(
      "4 escopos de MCP que só estreitam o controle de acesso existente — nunca ampliam",
      "4 MCP scopes that can only narrow the existing access-control layer — never widen it"
    ),
    impact: t3(
      "Tech Lead/Owner registrado no CONTRIBUTING.md: 1.531 de 2.853 commits entre 18 autores",
      "Tech Lead/Owner recorded in CONTRIBUTING.md: 1,531 of 2,853 commits across 18 authors"
    ),
  },

  {
    id: "orbya",
    title: "Orbya — SaaS B2B multi-tenant com isolamento no banco",
    icon: "database",
    role: t3("Lead / Founding Engineer", "Lead / Founding Engineer"),
    period: "04/2026 – 07/2026",
    image: null,
    cover: { icon: "database", accent: "cyan", label: "RLS · pg_notify · evals" },
    tech: [
      "Next.js 16",
      "TypeScript",
      "PostgreSQL 16",
      "Row-Level Security",
      "PL/pgSQL",
      "Server Actions",
      "SSE",
      "Vitest",
      "Playwright",
      "Docker",
    ],
    links: [],
    stats: [
      { label: t3("Commits de autoria", "Authored commits"), value: "398 / 428", icon: "git" },
      { label: t3("Tabelas com RLS", "Tables under RLS"), value: "18", icon: "shield" },
      { label: t3("Casos de teste Vitest", "Vitest cases"), value: "1.026", icon: "check" },
    ],
    description: t3(
      "Plataforma B2B multi-tenant de customer intelligence, arquitetada por mim como autor principal: 398 de 428 commits (93%), ~100 mil linhas de código de produção em 3,5 meses.",
      "Multi-tenant B2B customer-intelligence platform, architected by me as primary author: 398 of 428 commits (93%), ~100k lines of production code in 3.5 months."
    ),
    extendedDescription: t3(
      "Três coisas que resolvi dentro do Postgres em vez de somar infraestrutura.\n\n1) Isolamento por tenant defendido na camada de banco: Row-Level Security em 18 tabelas, 6 funções PL/pgSQL e 2 triggers, com a role da aplicação sem BYPASSRLS. Esquecer o escopo devolve ZERO linhas em vez de vazar tenant — falha alto, não em silêncio. Provei o isolamento com um teste automatizado de invasão IDOR cross-tenant rodando no CI contra Postgres real a cada pull request.\n\n2) Fila de análise dentro do próprio banco: claim atômico, prioridade, debounce por notBefore e dedup por índice único PARCIAL. Notificação em tempo real por pg_notify + LISTEN + Server-Sent Events. Resultado: Redis e WebSocket saíram do stack.\n\n3) Gate determinístico anti-alucinação: cada número que o LLM escreve é extraído e casado contra um índice dos valores realmente presentes no contexto que o modelo recebeu, como pré-condição dura para publicar o insight. Ao lado dele, uma bancada de evals LLM-as-judge (4 dimensões, golden set de 8 fixtures reais, score composto calculado em código e nunca pedido ao juiz) que elege o modelo de produção por qualidade-por-dólar: o candidato mais barato que ainda passa a linha de base.\n\nO pipeline de análise roda 3 agentes especialistas em paralelo mais um coordenador, sobre camada LLM provider-agnostic com roteamento de modelo por papel, saída restrita a JSON Schema, custo por token rastreado e teto mensal de gasto por tenant. 36 models Prisma, 34 migrations idempotentes, 108 Server Actions, 37 telas. 1.026 blocos de teste Vitest em 92 arquivos contra Postgres real no CI e 29 testes E2E Playwright. Deploy em Docker Compose migrado de push por SSH para pull-based via GHCR.",
      "Three things I solved inside Postgres instead of adding infrastructure.\n\n1) Tenant isolation enforced at the database layer: Row-Level Security across 18 tables, 6 PL/pgSQL functions and 2 triggers, with the application role holding no BYPASSRLS. Forget the scope and you get ZERO rows instead of another tenant's data — it fails loud, not silently. I proved the isolation with an automated cross-tenant IDOR exploit test running in CI against a real Postgres on every pull request.\n\n2) The analysis queue inside the database itself: atomic claim, priority, notBefore debounce and partial-unique-index deduplication. Real-time notification through pg_notify + LISTEN + Server-Sent Events. Result: Redis and WebSockets left the stack.\n\n3) A deterministic anti-hallucination gate: every number the LLM writes is extracted and matched against an index of values actually present in the context it received, as a hard precondition for publishing an insight. Next to it, an LLM-as-a-judge eval bench (4 dimensions, an 8-fixture golden set, composite score computed in code and never asked of the judge) that elects the production model on quality-per-dollar: the cheapest candidate that still clears the baseline.\n\nThe analysis pipeline runs 3 specialist agents in parallel plus a coordinator, on a provider-agnostic LLM layer with per-role model routing, JSON-Schema-constrained output, per-token cost accounting and a per-tenant monthly spend cap. 36 Prisma models, 34 idempotent migrations, 108 Server Actions, 37 screens. 1,026 Vitest blocks across 92 files against real Postgres in CI, plus 29 Playwright E2E tests. Docker Compose deployment moved from SSH push to pull-based releases via GHCR."
    ),
    highlight: t3(
      "Role da aplicação sem BYPASSRLS: esquecer o escopo devolve zero linhas, não o tenant do vizinho",
      "Application role without BYPASSRLS: forget the scope and you get zero rows, not the neighbour's tenant"
    ),
    impact: t3(
      "Teste de invasão IDOR cross-tenant rodando no CI contra Postgres real a cada pull request",
      "Cross-tenant IDOR exploit test running in CI against real Postgres on every pull request"
    ),
  },

  {
    id: "brametal",
    title: "Brametal — supervisório SCADA de ensaio de torres",
    icon: "cpu",
    role: t3("Engenheiro de software (contrato)", "Software engineer (contract)"),
    period: t3("12/2025 – atual", "12/2025 – Present"),
    image: null,
    cover: { icon: "cpu", accent: "amber", label: "S7Comm · fail-safe · on-premise" },
    tech: [
      "TypeScript",
      "React 19",
      "Node.js",
      "Express",
      "WebSocket",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "InfluxDB",
      "Tauri",
      "S7Comm",
    ],
    links: [],
    proprietary: true,
    stats: [
      { label: t3("Commits de autoria", "Authored commits"), value: "368 / 368", icon: "git" },
      { label: t3("Inversores comandados", "Drives commanded"), value: "52", icon: "zap" },
      { label: t3("Células de carga lidas", "Load cells read"), value: "56", icon: "activity" },
    ],
    description: t3(
      "Supervisório on-premise que comanda 52 inversores de frequência e lê 56 células de carga em ensaios destrutivos de torres de transmissão de 80 metros. 368 de 368 commits — do primeiro commit ao instalador assinado, em 9 meses.",
      "On-premise supervisory system driving 52 variable-frequency drives and reading 56 load cells during destructive testing of 80-metre transmission towers. 368 of 368 commits — from the first commit to the signed installer, in nine months."
    ),
    extendedDescription: t3(
      "~100 mil linhas de TypeScript (React 19 + Node/Express + WebSocket, 100 endpoints, 26 tabelas) falando S7Comm direto com um CLP Siemens S7-1500, sobre PostgreSQL/Prisma, Redis e InfluxDB, entregue ao cliente industrial como executável Windows assinado (Tauri) para 3 monitores de operação. Zero cloud, zero internet em runtime.\n\nMapeei byte a byte o contrato de memória de 15 KB do CLP a partir dos fontes SCL e dos chunks zlib do projeto TIA Portal de terceiros, provando cada UDT por OffsetCRC em vez de semelhança de nome, e implementei o cliente S7Comm com mutex de serialização, chunking por PDU e represa de reconexão. Um teste parseia o export do engenheiro de controle e reprova qualquer offset divergente — guarda que barrou um erro de endereço que teria derrubado o heartbeat de segurança em ensaio real.\n\nProjetei a fronteira fail-safe entre supervisório e CLP: heartbeat rodando em processo Node separado, com socket S7 próprio, alternando 1 bit a cada 100 ms. Se o backend morre, o CLP corta a tração sozinho. Somei a isso um detector de ruptura que separa colapso estrutural de cabo rompido e a geração automática do documento de auditoria forense.\n\nCriei um laboratório de longevidade com 7 cenários de caos (soak, queda de Postgres/Redis/CLP, latência injetada, vazamento de slot S7, backpressure, disco cheio, integridade da auditoria no SIGTERM) que reprova o build com exit code e separa deliberadamente 'o produto reprovou' (exit 1) de 'o harness não mediu' (exit 2) — porque se os dois derem o mesmo código, alguém marca o portão como instável e o desliga. No CI junto de 100 arquivos de teste (1.724 casos declarados), 13 specs Playwright e assinatura Authenticode.\n\nAlém do software: fiz a arquitetura, o monitoramento, a instalação em campo e o treinamento dos operadores. O programa do CLP em TIA Portal é do engenheiro de automação — o que eu fiz foi mapear e consumir esse contrato. Documentei aderência a 7 normas com rastreabilidade arquivo:linha e um teste que rejeita declaração sem evidência.\n\nCódigo sob licença proprietária: aqui vão arquitetura e decisões, nunca o código nem o mapa de memória.",
      "~100k lines of TypeScript (React 19 + Node/Express + WebSocket, 100 endpoints, 26 tables) speaking S7Comm directly to a Siemens S7-1500 PLC, over PostgreSQL/Prisma, Redis and InfluxDB, delivered to the industrial client as an Authenticode-signed Windows executable (Tauri) driving three operator monitors. Zero cloud, zero internet at runtime.\n\nI reverse-engineered the PLC's 15 KB memory contract byte by byte from third-party TIA Portal SCL exports and inflated zlib project chunks, proving each UDT by OffsetCRC rather than by name resemblance, and implemented the S7Comm client with an operation mutex, PDU-aware chunking and reconnect damping. A test parses the controls engineer's own export and fails on any offset drift — a guard that caught an addressing error which would have killed the safety heartbeat during a live test.\n\nI designed the fail-safe boundary between supervisory software and PLC: a liveness heartbeat running in an isolated Node child process with its own S7 socket, toggling one bit every 100 ms. If the backend dies, the PLC cuts traction on its own. Alongside it, a rupture detector that separates full structural collapse from a single snapped cable, and automatic forensic audit-report generation.\n\nI built a longevity lab with 7 chaos scenarios (soak, Postgres/Redis/PLC flapping, injected latency, S7 connection-slot leak, backpressure, disk growth, audit-trail integrity across SIGTERM) that fails the build with an exit code and deliberately separates 'the product failed' (exit 1) from 'the harness did not measure' (exit 2) — because if both return the same code, someone marks the gate as flaky and turns it off. Wired into CI alongside 100 test files (1,724 declared cases), 13 Playwright specs and Authenticode signing.\n\nBeyond the software: I did the architecture, the monitoring, the on-site installation and the operator training. The TIA Portal PLC program belongs to the automation engineer — what I did was map and consume that contract. I documented adherence to 7 industrial standards with file:line traceability and a test that rejects any claim without evidence.\n\nProprietary licence: architecture and decisions here, never the code nor the memory map."
    ),
    highlight: t3(
      "Heartbeat em processo isolado: se o backend morre, o CLP corta a tração sozinho",
      "Heartbeat in an isolated process: if the backend dies, the PLC cuts traction on its own"
    ),
    impact: t3(
      "Entregue como executável Windows assinado, on-premise — com instalação em campo e treinamento dos operadores",
      "Delivered as a signed on-premise Windows executable — including field installation and operator training"
    ),
  },

  {
    id: "signfy",
    title: "Signfy — SaaS solo, Stripe do zero e uma retratação pública",
    icon: "pen",
    role: t3("Autor solo", "Sole author"),
    period: "07/2026 – 08/2026",
    image: null,
    cover: { icon: "pen", accent: "violet", label: "Stripe · DCT-II · evals" },
    tech: [
      "Node.js",
      "TypeScript",
      "Fastify",
      "Next.js 15",
      "SQLite",
      "Vitest",
      "Stripe",
      "Docker",
      "Caddy",
    ],
    links: [],
    stats: [
      { label: t3("Commits de autoria", "Authored commits"), value: "413 / 418", icon: "git" },
      { label: t3("Endpoints Fastify", "Fastify endpoints"), value: "81", icon: "server" },
      { label: t3("Casos de teste", "Test cases"), value: "455", icon: "check" },
    ],
    description: t3(
      "SaaS construído e colocado no ar sozinho: 413 de 418 commits (98,8%), 81 endpoints Fastify, 26 tabelas SQLite com 14 migrations, 455 casos de teste, em Docker Compose atrás de Caddy.",
      "SaaS built and shipped alone: 413 of 418 commits (98.8%), 81 Fastify endpoints, 26 SQLite tables with 14 migrations, 455 test cases, on Docker Compose behind Caddy."
    ),
    extendedDescription: t3(
      "A parte que interessa a quem contrata para fintech: implementei a verificação de assinatura de webhook do Stripe DO ZERO, sem SDK. HMAC-SHA256 sobre {timestamp}.{corpo cru}, comparação timing-safe contra todas as assinaturas v1 do cabeçalho — para sobreviver a rotação de segredo — e janela de tolerância de 300 s contra replay. Não é 'integrei Stripe': é entender por que a verificação funciona, e conseguir defender cada linha dela numa revisão de segurança.\n\nA parte que interessa a quem contrata para engenharia: tratei um traço manuscrito como função matemática — curvatura κ(s) reparametrizada por comprimento de arco, decomposta em DCT-II ortonormal, com o teorema fundamental das curvas planas usado como TESTE DE FALSIFICAÇÃO e não como feature. Provei convergência de segunda ordem e reduzi o erro de reconstrução entre 500× e 2000× depois de descobrir que o meu próprio teste passava por acidente: a onda de teste começava num ponto de inflexão, exatamente onde o erro da estimativa por corda se anula.\n\nDepois rodei uma auditoria adversarial de 37 agentes em 4 lentes independentes: 46 achados, 22 sobreviveram à verificação cruzada, e um deles derrubou a manchete que eu mesmo já tinha publicado — o número media o operador de derivada segunda, não a assinatura. Publiquei a retratação com o mesmo destaque do resultado original.\n\nÉ o projeto que eu mais gosto de mostrar, porque o que ele prova não é que eu acerto: é que eu ataco o meu próprio resultado antes que outra pessoa precise atacar.",
      "The part that matters to a fintech hirer: I implemented Stripe webhook signature verification FROM SCRATCH, without the SDK. HMAC-SHA256 over {timestamp}.{raw_body}, timing-safe comparison against every v1 signature in the header — so secret rotation survives — and a 300 s tolerance window against replay. This is not 'I integrated Stripe': it is understanding why the verification works, and being able to defend every line of it in a security review.\n\nThe part that matters to an engineering hirer: I treated a handwritten stroke as a mathematical function — curvature κ(s) reparametrised by arc length, decomposed through an orthonormal DCT-II, with the fundamental theorem of plane curves used as a FALSIFICATION TEST rather than as a feature. I proved second-order convergence and cut reconstruction error by 500× to 2000× after discovering that my own test was passing by accident: the test wave started at an inflection point, exactly where the chord-estimate error vanishes.\n\nThen I ran a 37-agent adversarial audit across 4 independent lenses: 46 findings, 22 survived cross-verification, and one of them killed a headline I had already published — the number was measuring the second-derivative operator, not the signature. I published the retraction with the same prominence as the original result.\n\nIt is the project I most like to show, because what it proves is not that I get things right: it is that I attack my own result before anyone else has to."
    ),
    highlight: t3(
      "Assinatura de webhook Stripe verificada do zero: HMAC-SHA256, timing-safe, janela de 300 s contra replay",
      "Stripe webhook signatures verified from scratch: HMAC-SHA256, timing-safe, 300 s replay window"
    ),
    impact: t3(
      "Auditoria adversarial de 37 agentes que me levou a retratar publicamente a minha própria manchete",
      "A 37-agent adversarial audit that led me to publicly retract my own headline"
    ),
  },

  {
    id: "emf-rover",
    title: "emf_rover — navegação RTK com Filtro de Kalman Estendido",
    icon: "compass",
    role: t3("Autor solo", "Sole author"),
    period: "11/2024 – 07/2026",
    image: fleetTelemetry,
    imageAlt: t3(
      "Tela de telemetria do app de frota rodando no tablet da cabine",
      "Fleet-app telemetry screen running on the in-cab tablet"
    ),
    cover: { icon: "compass", accent: "green", label: "EKF · GNSS-RTK · NTRIP" },
    tech: [
      "Python 3",
      "Raspberry Pi",
      "Extended Kalman Filter",
      "GNSS-RTK",
      "NTRIP",
      "RTCM3",
      "u-blox ZED-F9P",
      "ESP32",
      "React Native",
      "Expo",
      "Fastify",
    ],
    links: [
      {
        label: t3("Estação-base RTK (repositório público)", "RTK base station (public repository)"),
        url: "https://github.com/Daviqr1/FULL_RTK_BASE_ANY_SENSOR",
        kind: "code",
      },
    ],
    gallery: [
      {
        src: fleetTelemetry,
        alt: t3("Telemetria do trator no tablet da cabine", "Tractor telemetry on the in-cab tablet"),
      },
      {
        src: fleetChecklist,
        alt: t3(
          "Checklist de manutenção do app offline-first, com a rede caída",
          "Maintenance checklist in the offline-first app, with the network down"
        ),
      },
      {
        src: fleetRefuel,
        alt: t3("Fluxo de abastecimento com descoberta de dispositivo", "Refuelling flow with device discovery"),
      },
    ],
    stats: [
      { label: t3("Commits de autoria", "Authored commits"), value: "364 / 364", icon: "git" },
      { label: t3("Linhas de Python", "Lines of Python"), value: "41.292", icon: "code" },
      { label: t3("Erro médio de heading", "Mean heading error"), value: "3,1°", icon: "compass" },
    ],
    description: t3(
      "Firmware de navegação de precisão de uma motocoveadora agrícola em Raspberry Pi Zero 2W: fusão GNSS/IMU com Filtro de Kalman Estendido de 15 estados. 364 de 364 commits, 41.292 linhas de Python.",
      "Precision-navigation firmware for an agricultural post-hole digger on a Raspberry Pi Zero 2W: GNSS/IMU fusion through a 15-state Extended Kalman Filter. 364 of 364 commits, 41,292 lines of Python."
    ),
    extendedDescription: t3(
      "EKF de 15 estados com estimação online de bias, mais uma variante leve de 6 estados em float32 dimensionada para o orçamento de CPU do Pi, ZUPT e restrições não-holonômicas, parsers próprios de UBX/NMEA/RTCM3 e cliente NTRIP com seleção de mountpoint por Haversine e failover multi-servidor.\n\nO case não é o hardware, é o método. Uma falha de heading magnético bloqueava a operação havia 2 meses e já tinha resistido a 6 alterações cegas de offset de montagem. Parei de chutar e construí um laboratório de calibração de 7 scripts: corrigi a conversão quaternion→heading, calibrei o offset de montagem contra 4 referências cardeais e apliquei declinação WMM2025. Erro médio final: 3,1°.\n\nDepois montei um framework de otimização dos parâmetros do filtro com Grid Search, Random Search e Otimização Bayesiana (Gaussian Process) sobre um simulador alimentado por datasets de campo reais, elevando o score de navegação de 64,7 para 88,6 no cenário mais difícil, com cross-validation entre três trajetórias.\n\nEm volta disso, a infraestrutura RTK inteira: estação-base ESP32 + u-blox ZED-F9P publicando RTCM3 por NTRIP, caster asyncio próprio em VPS (1 base para N rovers, autenticação bcrypt, rate limit por consumidor), backend Fastify/Prisma/PostgreSQL convertendo planejamentos KML em waypoints via GDAL, e app React Native/Expo offline-first rodando em tablet de cabine com 13 tabelas SQLite.\n\nPipeline de RTK Fixed implementado e configurado; o que foi validado em campo é RTK Float, com hAcc na casa de 30 cm.",
      "A 15-state EKF with online bias estimation, plus a lightweight 6-state float32 variant sized to the Pi's CPU budget, ZUPT and non-holonomic constraints, hand-rolled UBX/NMEA/RTCM3 parsers, and an NTRIP client with Haversine mountpoint selection and multi-server failover.\n\nThe case is not the hardware, it is the method. A magnetic-heading defect had blocked field operation for two months and had already survived six blind changes to the mount offset. I stopped guessing and built a 7-script calibration lab: corrected the quaternion-to-heading conversion, calibrated the mount offset against four cardinal references and applied WMM2025 declination. Final mean error: 3.1°.\n\nThen I built a filter-tuning framework spanning grid search, random search and Bayesian optimisation (Gaussian Process) over a simulator driven by real field datasets, lifting the navigation score from 64.7 to 88.6 on the hardest scenario, with cross-validation across three trajectories.\n\nAround it, the whole RTK infrastructure: an ESP32 + u-blox ZED-F9P base station streaming RTCM3 over NTRIP, a purpose-built asyncio caster on a VPS (one base to N rovers, bcrypt auth, per-consumer rate limiting), a Fastify/Prisma/PostgreSQL backend turning KML field plans into waypoints via GDAL, and an offline-first React Native/Expo tablet app running in the cab with 13 SQLite tables.\n\nThe RTK Fixed pipeline is implemented and configured; what was validated in the field is RTK Float, with hAcc around 30 cm."
    ),
    highlight: t3(
      "Duas semanas de bússola resolvidas por medição, não por tentativa e erro",
      "Two weeks of compass debugging solved by measurement, not by trial and error"
    ),
    impact: t3(
      "Score de navegação de 64,7 para 88,6 por otimização bayesiana, com cross-validation em três trajetórias",
      "Navigation score from 64.7 to 88.6 through Bayesian optimisation, cross-validated over three trajectories"
    ),
  },

  {
    id: "lowcodejs",
    title: "LowCodeJS — contrato de autorização por linha, mergeado no upstream",
    icon: "git",
    role: t3("Contribuidor de subsistema", "Subsystem contributor"),
    period: t3("05/2026 – atual", "05/2026 – Present"),
    image: null,
    cover: { icon: "git", accent: "indigo", label: "RowAccessGuard · PR #182" },
    tech: ["TypeScript", "NestJS", "MongoDB", "Mongoose", "JSON Schema", "MCP"],
    links: [
      {
        label: t3("Plataforma", "Platform"),
        url: "https://lowcodejs.org",
        kind: "live",
      },
      {
        label: t3("Meu fork", "My fork"),
        url: "https://github.com/Daviqr1/lowcodejs",
        kind: "code",
      },
    ],
    stats: [
      { label: t3("PR mergeado no upstream", "PR merged upstream"), value: "#182", icon: "git" },
      { label: t3("Métodos do contrato", "Contract methods"), value: "6", icon: "wrench" },
      { label: t3("Commits na main do upstream", "Commits on upstream main"), value: "23", icon: "check" },
    ],
    description: t3(
      "Plataforma low-code open source de outra pessoa. Projetei o contrato de plugin de autorização por linha da plataforma e entreguei por fork + pull request #182, mergeado no upstream de uma base de 3.152 arquivos e 12 autores.",
      "Someone else's open-source low-code platform. I designed the platform's row-level authorization plugin contract and delivered it through a fork and pull request #182, merged upstream into a 3,152-file codebase with 12 contributors."
    ),
    extendedDescription: t3(
      "RowAccessGuard: 6 métodos, decisão de três valores allow/deny/abstain composta entre guards independentes — com 'abstain = permitir' documentado como decisão consciente, não como omissão — e pushdown do filtro de ACL para DENTRO da query do MongoDB, para que paginação e contagem não quebrem. Implementei 4 guards sobre o contrato e um anti-lockout que garante bypass de MASTER independentemente da matriz configurada.\n\nA interface que eu desenhei segue viva na main do upstream hoje, e é o motivo de este case valer mais do que o tamanho da contribuição sugere: é o único projeto do conjunto que prova trabalho em codebase de terceiro, com PR revisado por outra pessoa. Também é onde revisei a segurança do meu PRÓPRIO commit já mergeado e achei duas falhas — escrita arbitrária em campo nativo e bypass de guard de autorização — que eu mesmo fechei.\n\nConstruí ainda um servidor MCP que expõe quadros Kanban a agentes de IA: credencial com escopo e expiração, token guardado apenas como hash SHA-256, catálogo de 8 ferramentas em JSON Schema e checagem de permissão por chamada contra o mesmo serviço que autoriza as rotas REST. Esse módulo vive numa branch empurrada ao upstream, ainda não mergeada na main.",
      "RowAccessGuard: 6 methods, a three-valued allow/deny/abstain decision composed across independent guards — with 'abstain = allow' documented as a deliberate decision rather than an omission — and ACL filter pushdown INTO the MongoDB query, so pagination and counts don't break. I implemented 4 guards on top of the contract plus an anti-lockout that guarantees MASTER bypass regardless of the configured matrix.\n\nThe interface I designed is still on upstream main today, and it is why this case is worth more than the size of the contribution suggests: it is the only project in the set that proves work inside someone else's codebase, with a PR reviewed by another person. It is also where I security-reviewed my OWN already-merged commit and found two flaws — an arbitrary write into a native field and an authorization-guard bypass — which I then closed myself.\n\nI also built an MCP server that exposes Kanban boards to AI agents: scoped, expiring credentials, tokens stored only as SHA-256 hashes, a catalogue of 8 JSON Schema tools and a per-call permission check against the same service that authorizes the REST routes. That module lives on a branch pushed to upstream, not yet merged into main."
    ),
    highlight: t3(
      "Álgebra de três valores allow/deny/abstain composta entre guards independentes",
      "A three-valued allow/deny/abstain algebra composed across independent guards"
    ),
    impact: t3(
      "Interface desenhada por mim, ainda de pé na main do upstream depois do refactor de outra pessoa",
      "An interface I designed, still standing on upstream main after someone else's refactor"
    ),
  },
];

// ---------------------------------------------------------------------------
// Experiência — datas idênticas às do cv-pt.md / cv-en.md
//
// `durationPct` substitui a comparação por string mágica que existia no
// componente (exp.duration === "1 ano+" ? '100%' : '75%'). Escala relativa ao
// vínculo mais longo (FAPES, 25 meses).
// ---------------------------------------------------------------------------

export const experience = [
  {
    id: "labic",
    company: "LABIC — Laboratório de Informação e Comunicação (UFG)",
    shortName: "LABIC / UFG",
    role: t3(
      "Engenheiro de Software Sênior — arquitetura, infraestrutura e escala",
      "Senior Software Engineer — architecture, infrastructure and scale"
    ),
    period: t3("01/2026 – atual", "01/2026 – Present"),
    location: t3("Goiás · Remoto · meio período", "Goiás · Remote · part-time"),
    duration: t3("8 meses · em curso", "8 months · ongoing"),
    durationPct: 32,
    current: true,
    icon: "building",
    color: "from-emerald-500 to-green-600",
    description: t3(
      "Cargo por nomeação do Prof. Dr. Marcel Ferrante, contrato de 2 anos. Respondo por arquitetura, infraestrutura e escala das plataformas do laboratório.",
      "Appointed by Prof. Dr. Marcel Ferrante on a two-year term. I own architecture, infrastructure and scale across the laboratory's platforms."
    ),
    achievements: [
      t3(
        "Lidero tecnicamente o OOInfo (ooinfo.org, em produção): 1.531 dos 2.853 commits entre 18 autores, incluindo o commit fundador, com o papel de Tech Lead/Owner registrado no CONTRIBUTING.md",
        "Technical lead on OOInfo (ooinfo.org, live): 1,531 of 2,853 commits across 18 authors including the founding one, with the Tech Lead/Owner role recorded in CONTRIBUTING.md"
      ),
      t3(
        "Projetei e implementei sozinho o servidor MCP que abre a plataforma a agentes LLM externos: 15 ferramentas JSON-RPC, OAuth 2.1 com Dynamic Client Registration e 4 escopos que só estreitam o controle de acesso existente",
        "Designed and shipped the MCP server single-handedly: 15 JSON-RPC tools, OAuth 2.1 with Dynamic Client Registration, and 4 scopes that can only narrow the existing access-control layer"
      ),
      t3(
        "Construí a camada de IA generativa (132 de 226 commits do módulo): gateway multi-provedor com cascata de 3 tentativas sob orçamento de tempo global, streaming SSE com parser incremental e loop agêntico de ferramentas",
        "Built the generative-AI layer (132 of the module's 226 commits): a multi-provider gateway with a 3-step fallback cascade under a global time budget, SSE streaming with an incremental parser and an agentic tool loop"
      ),
      t3(
        "Reescrevi o caminho de leitura de listas com 1.010.025 registros trocando varredura EAV por colunas materializadas, paginação keyset e cache versionado em Redis",
        "Rebuilt the read path for lists holding 1,010,025 records, replacing EAV scans with materialized columns, keyset pagination and version-scoped Redis caching"
      ),
      t3(
        "Montei o CI/CD de três ambientes em GitHub Actions + Coolify, com portão de promoção implementado em git que recusa publicar commit da main ausente da release",
        "Built the three-environment CI/CD pipeline on GitHub Actions and Coolify, with a promotion gate implemented in git that refuses to ship any commit present on main but missing from the release"
      ),
      t3(
        "No portal de autoatendimento da companhia estadual de saneamento de Goiás, via laboratório da UFG, num time de 5 a 6 pessoas: dono dos módulos de serviços, laudo de aferição e privacidade e do empacotamento mobile — 7 fluxos de abertura de protocolo em React 19 sobre 5 APIs corporativas, com SSO Keycloak e reCAPTCHA Enterprise",
        "On the citizen self-service portal of Goiás state's water utility, through the UFG laboratory, on a team of five to six: owner of the service-request, meter-inspection and privacy modules and of the mobile packaging — 7 request workflows in React 19 over 5 corporate APIs, on Keycloak SSO with reCAPTCHA Enterprise"
      ),
    ],
    tech: ["TypeScript", "NestJS", "React 19", "PostgreSQL", "Prisma", "Redis", "BullMQ", "MCP", "Docker", "GitHub Actions"],
  },

  {
    id: "brametal",
    company: "Brametal / SAUPE Engenharia",
    shortName: "Brametal",
    role: t3(
      "Engenheiro de software (contrato) — supervisório SCADA",
      "Software engineer (contract) — industrial SCADA"
    ),
    period: t3("12/2025 – atual", "12/2025 – Present"),
    location: t3("Remoto · desenvolvimento sob encomenda", "Remote · commissioned development"),
    duration: t3("9 meses · em curso", "9 months · ongoing"),
    durationPct: 36,
    current: true,
    icon: "cpu",
    color: "from-amber-500 to-orange-600",
    description: t3(
      "Supervisório on-premise para ensaio de carga em torres de transmissão de alta tensão, do primeiro commit ao instalador assinado.",
      "On-premise supervisory system for load testing of high-voltage transmission towers, from the first commit to the signed installer."
    ),
    achievements: [
      t3(
        "368 de 368 commits em 9 meses: ~100 mil linhas de TypeScript comandando 52 inversores de frequência e lendo 56 células de carga em ensaios de torres de 80 metros",
        "368 of 368 commits over 9 months: ~100k lines of TypeScript driving 52 variable-frequency drives and reading 56 load cells during tests of 80-metre towers"
      ),
      t3(
        "Mapeei byte a byte o contrato de memória de 15 KB do CLP, provando cada UDT por OffsetCRC, com teste que reprova offset divergente — guarda que barrou um erro de endereço que teria derrubado o heartbeat de segurança em ensaio real",
        "Reverse-engineered the PLC's 15 KB memory contract byte by byte, proving each UDT by OffsetCRC, guarded by a test that fails on offset drift — it caught an addressing error that would have killed the safety heartbeat mid-test"
      ),
      t3(
        "Projetei a fronteira fail-safe entre supervisório e CLP: heartbeat em processo Node isolado alternando 1 bit a cada 100 ms, para o CLP cortar a tração sozinho se o backend morrer",
        "Designed the fail-safe boundary between supervisory software and PLC: a heartbeat in an isolated Node process toggling one bit every 100 ms, so the PLC cuts traction on its own if the backend dies"
      ),
      t3(
        "Laboratório de longevidade com 7 cenários de caos que reprova o build com exit code e separa 'o produto reprovou' de 'o harness não mediu'",
        "A longevity lab with 7 chaos scenarios that fails the build with an exit code and separates 'the product failed' from 'the harness did not measure'"
      ),
      t3(
        "Além do código: arquitetura, monitoramento, instalação em campo e treinamento dos operadores",
        "Beyond the code: architecture, monitoring, on-site installation and operator training"
      ),
    ],
    tech: ["TypeScript", "React 19", "Node.js", "WebSocket", "PostgreSQL", "InfluxDB", "Redis", "Tauri", "S7Comm"],
  },

  {
    id: "orbya",
    company: "Orbya",
    shortName: "Orbya",
    role: t3("Lead / Founding Engineer", "Lead / Founding Engineer"),
    period: "04/2026 – 07/2026",
    location: t3("Remoto", "Remote"),
    duration: t3("3,5 meses", "3.5 months"),
    durationPct: 14,
    current: false,
    icon: "rocket",
    color: "from-cyan-500 to-blue-600",
    description: t3(
      "Plataforma B2B multi-tenant de customer intelligence e orquestração de receita, construída como autor principal e arquiteto.",
      "Multi-tenant B2B customer-intelligence and revenue-orchestration platform, built as primary author and architect."
    ),
    achievements: [
      t3(
        "398 de 428 commits (93%): ~100 mil linhas de produção, 36 models, 34 migrations idempotentes, 108 Server Actions e 37 telas em 3,5 meses",
        "398 of 428 commits (93%): ~100k lines of production code, 36 models, 34 idempotent migrations, 108 Server Actions and 37 screens in 3.5 months"
      ),
      t3(
        "Isolei os dados por tenant no banco com Row-Level Security em 18 tabelas, 6 funções PL/pgSQL e 2 triggers, com a role da aplicação sem BYPASSRLS, e provei o isolamento com teste de invasão IDOR cross-tenant no CI",
        "Isolated tenant data in the database with Row-Level Security across 18 tables, 6 PL/pgSQL functions and 2 triggers, with the application role holding no BYPASSRLS, proven by a cross-tenant IDOR exploit test in CI"
      ),
      t3(
        "Projetei o pipeline de IA: 3 agentes especialistas em paralelo mais um coordenador, com roteamento de modelo por papel, saída restrita a JSON Schema e teto mensal de gasto por tenant",
        "Designed the AI pipeline: 3 specialist agents in parallel plus a coordinator, with per-role model routing, JSON-Schema-constrained output and a per-tenant monthly spend cap"
      ),
      t3(
        "Criei um gate determinístico anti-alucinação que casa cada número escrito pelo LLM contra o contexto recebido, com bancada de evals LLM-as-judge que elege o modelo por qualidade-por-dólar",
        "Built a deterministic anti-hallucination gate matching every number the LLM writes against the context it received, with an LLM-as-a-judge eval bench that elects the model on quality-per-dollar"
      ),
      t3(
        "Eliminei Redis e WebSocket do stack com pg_notify + LISTEN + SSE e fila de análise no próprio Postgres, com claim atômico e dedup por índice único parcial",
        "Removed Redis and WebSockets from the stack with pg_notify + LISTEN + SSE and an analysis queue inside Postgres, with atomic claim and partial-unique-index deduplication"
      ),
    ],
    tech: ["Next.js 16", "TypeScript", "PostgreSQL 16", "Row-Level Security", "PL/pgSQL", "Vitest", "Playwright", "Docker", "GHCR"],
  },

  {
    id: "emflora",
    company: "EMFLORA — Empreendimentos Florestais",
    shortName: "EMFLORA",
    role: t3(
      "Analista de Automação — Pleno 08/2025–07/2026 · Júnior 01/2025–07/2025 · Estagiário 11/2024–01/2025",
      "Automation Analyst — Mid-level 08/2025–07/2026 · Junior 01/2025–07/2025 · Intern 11/2024–01/2025"
    ),
    period: "11/2024 – 07/2026",
    location: t3("São Mateus, ES · Híbrido · CLT", "São Mateus, ES · Hybrid · full-time"),
    duration: t3("1 ano e 8 meses", "1 year and 8 months"),
    durationPct: 80,
    current: false,
    icon: "compass",
    color: "from-green-500 to-emerald-600",
    description: t3(
      "Automação e navegação de precisão para maquinário agrícola. Desligamento por corte de quadro.",
      "Automation and precision navigation for agricultural machinery. Left through a headcount reduction."
    ),
    achievements: [
      t3(
        "Firmware de navegação de uma motocoveadora em Raspberry Pi Zero 2W, sozinho: 364 de 364 commits, 41.292 linhas de Python, fusão GNSS/IMU com Filtro de Kalman Estendido de 15 estados",
        "Precision-navigation firmware for a post-hole digger on a Raspberry Pi Zero 2W, single-handedly: 364 of 364 commits, 41,292 lines of Python, GNSS/IMU fusion through a 15-state Extended Kalman Filter"
      ),
      t3(
        "Eliminei uma falha de heading magnético que bloqueava a operação havia 2 meses construindo um laboratório de calibração de 7 scripts e derivando os parâmetros por medição: erro médio final de 3,1°",
        "Cleared a magnetic-heading defect that had blocked field operation for two months by building a 7-script calibration lab and deriving the parameters from measurement: 3.1° final mean error"
      ),
      t3(
        "Framework de otimização dos parâmetros do filtro com Grid Search, Random Search e Otimização Bayesiana, elevando o score de navegação de 64,7 para 88,6 no cenário mais difícil",
        "A filter-tuning framework spanning grid search, random search and Bayesian optimisation, lifting the navigation score from 64.7 to 88.6 on the hardest scenario"
      ),
      t3(
        "Infraestrutura RTK end-to-end: estação-base ESP32 + ZED-F9P por NTRIP, caster asyncio próprio em VPS, backend Fastify/Prisma convertendo KML em waypoints via GDAL e app React Native offline-first para tablet de cabine",
        "End-to-end RTK infrastructure: an ESP32 + ZED-F9P base station over NTRIP, a purpose-built asyncio caster on a VPS, a Fastify/Prisma backend turning KML into waypoints via GDAL, and an offline-first React Native tablet app for the cab"
      ),
    ],
    tech: ["Python 3", "Raspberry Pi", "ESP32", "C++", "React Native", "Expo", "Fastify", "Prisma", "PostgreSQL", "SQLite"],
  },

  {
    id: "fapes",
    company: "FAPES — Fundação de Amparo à Pesquisa e Inovação do ES",
    shortName: "FAPES",
    role: t3("Desenvolvedor Web Júnior", "Junior Web Developer"),
    period: "01/2023 – 02/2025",
    location: t3("Remoto · meio período", "Remote · part-time"),
    duration: t3("2 anos e 1 mês", "2 years and 1 month"),
    durationPct: 100,
    current: false,
    icon: "award",
    color: "from-violet-500 to-purple-600",
    description: t3(
      "Desenvolvimento e manutenção das aplicações web da fundação estadual de fomento à pesquisa e inovação — meu primeiro contato profissional com ambiente público e regulado.",
      "Development and maintenance of the web applications of the state research and innovation funding foundation — my first professional contact with a public, regulated environment."
    ),
    achievements: [
      t3(
        "Aplicações web em PHP e Laravel para uma fundação estadual, com o ritmo e a burocracia de homologação que ambiente público exige",
        "Web applications in PHP and Laravel for a state foundation, at the pace and with the sign-off bureaucracy a public environment requires"
      ),
      t3(
        "Dado de cidadão, trilha do que foi alterado e prazo institucional: é daqui que vem o meu conforto com ambiente regulado",
        "Citizen data, a trail of what changed, institutional deadlines: this is where my comfort with regulated environments comes from"
      ),
    ],
    tech: ["PHP", "Laravel", "MySQL", "jQuery", "Bootstrap"],
  },

  {
    id: "freelance",
    company: "Autônomo / Freelance",
    shortName: "Freelance",
    role: t3("Desenvolvedor Web", "Web Developer"),
    period: "2021 – 2023",
    location: t3("Remoto", "Remote"),
    duration: t3("~2 anos", "~2 years"),
    durationPct: 96,
    current: false,
    icon: "globe",
    color: "from-slate-500 to-slate-600",
    description: t3(
      "Desenvolvimento web sob demanda para clientes diretos, do levantamento de requisitos ao deploy. Onde a conta de ~5 anos começa.",
      "On-demand web development for direct clients, from requirements to deployment. Where the ~5-year count starts."
    ),
    achievements: [
      t3(
        "Ciclo completo com o cliente na frente: requisito, entrega, correção e deploy, sem time entre mim e o problema",
        "The full cycle with the client in front of me: requirements, delivery, fixes and deployment, with no team between me and the problem"
      ),
      t3(
        "Primeiro commit público em 16/05/2021 — é essa a âncora da minha contagem de tempo de experiência",
        "First public commit on 16 May 2021 — that is the anchor for my experience count"
      ),
    ],
    tech: ["JavaScript", "PHP", "MySQL", "HTML/CSS"],
  },
];

// ---------------------------------------------------------------------------
// Trajetória (RoadmapSection)
// ---------------------------------------------------------------------------

export const journey = [
  {
    id: "start",
    year: "2021",
    title: t3("Primeiro commit", "First commit"),
    icon: "git",
    description: t3(
      "Conta no GitHub criada em 16/05/2021 e os primeiros trabalhos web sob demanda. É desta data que sai a conta de ~5 anos de experiência — não de uma estimativa.",
      "GitHub account created on 16 May 2021, and the first on-demand web work. This is where the ~5-year count comes from — not from an estimate."
    ),
    details: [
      { label: t3("Como", "How"), value: t3("Freelance, cliente direto", "Freelance, direct clients") },
      { label: t3("Stack", "Stack"), value: "JavaScript, PHP, MySQL" },
    ],
    color: "from-slate-500 to-slate-600",
    borderColor: "border-slate-500",
    bgColor: "bg-slate-500",
    lightColor: "rgba(100, 116, 139, 0.5)",
    position: { x: "18%", y: "8%" },
  },
  {
    id: "fapes",
    year: "2023 – 2025",
    title: t3("FAPES — setor público", "FAPES — public sector"),
    icon: "award",
    description: t3(
      "Desenvolvedor web júnior numa fundação estadual de fomento à pesquisa. Primeiro contato profissional com dado de cidadão, homologação e prazo institucional.",
      "Junior web developer at a state research-funding foundation. First professional contact with citizen data, sign-off processes and institutional deadlines."
    ),
    details: [
      { label: t3("Empresa", "Organization"), value: "FAPES" },
      { label: t3("Stack", "Stack"), value: "PHP, Laravel, MySQL" },
      {
        label: t3("O que ficou", "What stuck"),
        value: t3("Conforto com ambiente regulado", "Comfort in regulated environments"),
      },
    ],
    color: "from-violet-500 to-purple-600",
    borderColor: "border-violet-500",
    bgColor: "bg-violet-500",
    lightColor: "rgba(139, 92, 246, 0.5)",
    position: { x: "40%", y: "20%" },
  },
  {
    id: "ml",
    year: "2024",
    title: t3("Primeiro trabalho com ML", "First ML work"),
    icon: "brain",
    description: t3(
      "Classificador de churn de clientes de cartão de crédito em scikit-learn, publicado com artigo. Documentei depois que a acurácia publicada estava inflada por vazamento de rótulo — e é essa a versão do resultado que eu defendo.",
      "A credit-card customer churn classifier in scikit-learn, published with an article. I later documented that the published accuracy was inflated by label leakage — and that is the version of the result I stand behind."
    ),
    details: [
      { label: t3("Stack", "Stack"), value: "Python, scikit-learn, pandas" },
      { label: t3("Base", "Dataset"), value: t3("Pública, 5.063 registros", "Public, 5,063 records") },
      {
        label: t3("Lição", "Lesson"),
        value: t3("Número bonito com feature vazada não é resultado", "A pretty number with a leaked feature is not a result"),
      },
    ],
    color: "from-rose-500 to-pink-600",
    borderColor: "border-rose-500",
    bgColor: "bg-rose-500",
    lightColor: "rgba(244, 63, 94, 0.5)",
    position: { x: "62%", y: "12%" },
  },
  {
    id: "emflora",
    year: "2024 – 2026",
    title: t3("EMFLORA — automação e embarcados", "EMFLORA — automation and embedded"),
    icon: "compass",
    description: t3(
      "Estagiário a analista pleno. Firmware de navegação RTK com Filtro de Kalman Estendido de 15 estados, sozinho, em 364 commits e 41.292 linhas de Python.",
      "From intern to mid-level analyst. RTK navigation firmware with a 15-state Extended Kalman Filter, single-handedly, across 364 commits and 41,292 lines of Python."
    ),
    details: [
      { label: t3("Tecnologias", "Technologies"), value: "Python, Raspberry Pi, ESP32, RTK" },
      { label: t3("Resultado medido", "Measured result"), value: t3("Heading a 3,1° de erro médio", "3.1° mean heading error") },
      {
        label: t3("Método", "Method"),
        value: t3("Medição em vez de tentativa e erro", "Measurement instead of trial and error"),
      },
    ],
    color: "from-green-500 to-emerald-600",
    borderColor: "border-green-500",
    bgColor: "bg-green-500",
    lightColor: "rgba(16, 185, 129, 0.5)",
    position: { x: "26%", y: "40%" },
  },
  {
    id: "brametal",
    year: t3("2025 – atual", "2025 – Present"),
    title: t3("Brametal — sistema que não pode falhar", "Brametal — a system that cannot fail"),
    icon: "cpu",
    description: t3(
      "Supervisório SCADA de ensaio de torres de 80 metros, do primeiro commit ao instalador assinado, incluindo instalação em campo e treinamento dos operadores.",
      "SCADA supervisory system for testing 80-metre towers, from the first commit to the signed installer, including field installation and operator training."
    ),
    details: [
      { label: t3("Autoria", "Authorship"), value: "368 / 368 commits" },
      { label: t3("Escala física", "Physical scale"), value: t3("52 inversores, 56 células", "52 drives, 56 load cells") },
      {
        label: t3("Decisão-chave", "Key decision"),
        value: t3("Watchdog em processo isolado", "Watchdog in an isolated process"),
      },
    ],
    color: "from-amber-500 to-orange-600",
    borderColor: "border-amber-500",
    bgColor: "bg-amber-500",
    lightColor: "rgba(245, 158, 11, 0.5)",
    position: { x: "70%", y: "38%" },
  },
  {
    id: "labic",
    year: t3("2026 – atual", "2026 – Present"),
    title: t3("LABIC / UFG — arquitetura e escala", "LABIC / UFG — architecture and scale"),
    icon: "building",
    description: t3(
      "Cargo por nomeação, contrato de 2 anos. Tech Lead/Owner do OOInfo, servidor MCP, camada de IA generativa e o portal de saneamento do estado de Goiás.",
      "An appointed, two-year role. Tech Lead/Owner of OOInfo, the MCP server, the generative-AI layer and the Goiás state water-utility portal."
    ),
    details: [
      { label: t3("Autoria", "Authorship"), value: "1.531 / 2.853 commits" },
      { label: t3("Plataforma", "Platform"), value: "ooinfo.org" },
      { label: t3("Domínio", "Domain"), value: t3("Govtech e dado de cidadão", "Govtech and citizen data") },
    ],
    color: "from-emerald-500 to-green-600",
    borderColor: "border-emerald-500",
    bgColor: "bg-emerald-500",
    lightColor: "rgba(16, 185, 129, 0.5)",
    position: { x: "48%", y: "58%" },
  },
  {
    id: "orbya",
    year: "2026",
    title: t3("Orbya — Lead / Founding Engineer", "Orbya — Lead / Founding Engineer"),
    icon: "rocket",
    description: t3(
      "SaaS B2B multi-tenant do zero: 398 de 428 commits em 3,5 meses, com isolamento defendido no banco e gate determinístico contra alucinação de LLM.",
      "A multi-tenant B2B SaaS from scratch: 398 of 428 commits in 3.5 months, with isolation enforced in the database and a deterministic gate against LLM hallucination."
    ),
    details: [
      { label: t3("Autoria", "Authorship"), value: "398 / 428 (93%)" },
      { label: t3("Arquitetura", "Architecture"), value: "RLS, pg_notify + SSE, fila no Postgres" },
      { label: t3("IA", "AI"), value: t3("3 agentes + coordenador, evals", "3 agents + coordinator, evals") },
    ],
    color: "from-cyan-500 to-blue-600",
    borderColor: "border-cyan-500",
    bgColor: "bg-cyan-500",
    lightColor: "rgba(6, 182, 212, 0.5)",
    position: { x: "22%", y: "72%" },
  },
  {
    id: "next",
    year: "2026 →",
    title: t3("O que estou construindo agora", "What I am building now"),
    icon: "sparkles",
    description: t3(
      "Busca híbrida sobre o corpus que já existe — o léxico que eu já tenho (tsvector, pg_trgm) somado a um caminho vetorial — medindo recall@k dos dois lados antes de afirmar qualquer coisa sobre o ganho. E procurando vaga sênior remota em fintech, banco ou produto.",
      "Hybrid search over the corpus that already exists — the lexical path I already have (tsvector, pg_trgm) plus a vector path — measuring recall@k on both sides before claiming anything about the gain. And looking for a senior remote role in fintech, banking or product."
    ),
    details: [
      { label: t3("Em construção", "In progress"), value: t3("Busca híbrida medida", "Measured hybrid search") },
      { label: t3("Disponibilidade", "Availability"), value: t3("Remoto, UTC−3", "Remote, UTC−3") },
      { label: t3("Alvo", "Target"), value: t3("Sênior · fintech, banco, produto", "Senior · fintech, banking, product") },
    ],
    color: "from-indigo-500 to-violet-600",
    borderColor: "border-indigo-500",
    bgColor: "bg-indigo-500",
    lightColor: "rgba(99, 102, 241, 0.5)",
    position: { x: "62%", y: "86%" },
  },
];

// ---------------------------------------------------------------------------
// Terminal — conteúdo real, sem CPU/memória aleatórias e sem
// "bypassing_security_protocols" (péssima leitura para recrutador de banco).
// ---------------------------------------------------------------------------

export const terminal = {
  banner: [
    "██████╗  █████╗ ██╗   ██╗██╗ ██████╗ ██████╗  ██╗",
    "██╔══██╗██╔══██╗██║   ██║██║██╔═══██╗██╔══██╗███║",
    "██║  ██║███████║██║   ██║██║██║   ██║██████╔╝╚██║",
    "██║  ██║██╔══██║╚██╗ ██╔╝██║██║▄▄ ██║██╔══██╗ ██║",
    "██████╔╝██║  ██║ ╚████╔╝ ██║╚██████╔╝██║  ██║ ██║",
    "╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚══▀▀═╝ ╚═╝  ╚═╝ ╚═╝",
  ],
  // `tone` substitui a detecção por palavra-chave que existia no componente.
  sequence: [
    { text: "whoami", tone: "prompt", delay: 260 },
    { text: "davi_rezende · senior software engineer · vitoria/br · utc-3", tone: "ok", delay: 420 },
    { text: "git log --author=davi --oneline | wc -l", tone: "prompt", delay: 260 },
    { text: "~2900 commits · 9 sistemas reais · 1531 deles no ooinfo", tone: "ok", delay: 420 },
    { text: "cat foco.txt", tone: "prompt", delay: 260 },
    { text: "ia generativa em producao · postgres como arquitetura · sistemas que nao podem mentir", tone: "info", delay: 460 },
    { text: "systemctl status portfolio.service", tone: "prompt", delay: 260 },
    { text: "active (running)", tone: "ok", delay: 320 },
  ],
  closing: t3(
    "Todo número deste site foi medido no repositório, não digitado.",
    "Every number on this site was measured in the repository, not typed."
  ),
  // Painel lateral: fatos, não Math.random().
  facts: [
    { label: t3("Commits de autoria", "Authored commits"), value: "~2.900" },
    { label: t3("Sistemas reais", "Production systems"), value: "9" },
    { label: t3("Experiência", "Experience"), value: t3("~5 anos", "~5 years") },
    { label: t3("Fuso", "Timezone"), value: "UTC−3" },
  ],
};

// ---------------------------------------------------------------------------
// Contato
//
// Caminhos de arquivo são RELATIVOS de propósito: o componente resolve com
// getPublicUrl() (src/utils), o que corrige o 404 dos PDFs em GitHub Pages.
// ---------------------------------------------------------------------------

export const contact = {
  email: "davidbecam006@gmail.com",
  github: "https://github.com/Daviqr1",
  linkedin: "https://www.linkedin.com/in/davi-rezende-09540b222/",
  liveProject: "https://ooinfo.org",

  resumes: [
    {
      id: "pt",
      language: "pt-BR",
      label: t3("Currículo (português)", "Résumé (Portuguese)"),
      file: "cv/davi-rezende-cv-pt.pdf",
    },
    {
      id: "en",
      language: "en-US",
      label: t3("Currículo (inglês)", "Résumé (English)"),
      file: "cv/davi-rezende-cv-en.pdf",
    },
  ],

  availability: [
    t3("Aberto a vaga sênior remota", "Open to senior remote roles"),
    t3("Fintech, banco, mercado financeiro ou produto", "Fintech, banking, financial markets or product"),
    t3("UTC−3 — dia inteiro de sobreposição com times nos EUA", "UTC−3 — a full working-day overlap with US teams"),
    t3("CLT, PJ ou Employer of Record", "Employment, contractor or Employer of Record"),
  ],

  // Preenchido por variável de ambiente no build (.env, prefixo VITE_).
  // A public key do EmailJS é pública por design; o que NÃO pode existir aqui
  // é private key. Ver PLANO.md, item 2.
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
    get isConfigured() {
      return Boolean(this.serviceId && this.templateId && this.publicKey);
    },
  },
};

// ---------------------------------------------------------------------------
// Créditos e licenças de terceiros (o site usa obra de terceiro e precisa
// creditar — ver PLANO.md, item 7).
// ---------------------------------------------------------------------------

export const credits = [
  {
    work: "Tenhun Falling Spaceman Fanart (spaceman.glb)",
    author: "wallmasterr",
    license: "CC BY 4.0",
    url: "https://sketchfab.com/3d-models/tenhun-falling-spaceman-fanart-9fd80b6a259f41fd99e6f56eee686dc5",
  },
  {
    work: t3("Estrutura 3D original deste site", "Original 3D site scaffold"),
    author: "ForrestKnight",
    license: "MIT",
    url: "https://github.com/ForrestKnight/3dfolio",
  },
  {
    work: t3("Animação de cargos rotativos", "Rotating position animation"),
    author: "Teshank",
    license: "",
    url: "https://github.com/teshank2137/portfolio",
  },
];

// ---------------------------------------------------------------------------
// COMPATIBILIDADE — exports antigos, mesmos nomes e mesmo shape de antes.
// Continuam alimentando src/components/Experience.jsx e Portfolio.jsx.
// Derivados dos dados acima para não existir segunda fonte de verdade.
// ---------------------------------------------------------------------------

const em = (text) => `<span style='color: white;'>${text}</span>`;

const experiences = [
  {
    title: "Engenheiro de Software Sênior",
    company_name: "LABIC — UFG",
    date: "01/2026 – atual",
    details: [
      `Tech Lead/Owner do OOInfo (ooinfo.org, no ar): ${em("1.531 dos 2.853 commits")} entre 18 autores, incluindo o commit fundador.`,
      `Projetei e implementei sozinho o ${em("servidor MCP")} que abre a plataforma a agentes LLM: 15 ferramentas JSON-RPC sob OAuth 2.1 e 4 escopos que só estreitam o controle de acesso existente.`,
      `Autor dominante da ${em("camada de IA generativa")}: gateway multi-provedor com cascata de 3 tentativas sob orçamento de tempo global, streaming SSE e loop agêntico de ferramentas.`,
    ],
  },
  {
    title: "Engenheiro de software (contrato)",
    company_name: "Brametal / SAUPE",
    date: "12/2025 – atual",
    details: [
      `${em("368 de 368 commits")} em 9 meses: supervisório SCADA que comanda 52 inversores e lê 56 células de carga em ensaios de torres de 80 metros.`,
      `Fronteira ${em("fail-safe")} entre supervisório e CLP: heartbeat em processo isolado, 1 bit a cada 100 ms — se o backend morre, o CLP corta a tração sozinho.`,
      `Além do código: ${em("arquitetura, instalação em campo e treinamento dos operadores")}.`,
    ],
  },
  {
    title: "Lead / Founding Engineer",
    company_name: "Orbya",
    date: "04/2026 – 07/2026",
    details: [
      `${em("398 de 428 commits (93%)")}: ~100 mil linhas de produção em 3,5 meses.`,
      `Isolamento multi-tenant defendido no banco com ${em("Row-Level Security em 18 tabelas")}, provado por teste de invasão IDOR cross-tenant no CI.`,
      `${em("Gate determinístico anti-alucinação")}: número que o LLM escreve só publica se casar com o contexto recebido.`,
    ],
  },
  {
    title: "Analista de Automação",
    company_name: "EMFLORA",
    date: "11/2024 – 07/2026",
    details: [
      `${em("364 de 364 commits")}, 41.292 linhas de Python: firmware de navegação com Filtro de Kalman Estendido de 15 estados.`,
      `Falha de heading que travava a operação havia 2 meses resolvida por ${em("medição, não por tentativa e erro")}: erro médio final de 3,1°.`,
      `Otimização bayesiana levou o score de navegação de ${em("64,7 para 88,6")} no cenário mais difícil.`,
    ],
  },
  {
    title: "Desenvolvedor Web Júnior",
    company_name: "FAPES",
    date: "01/2023 – 02/2025",
    details: [
      `Aplicações web em ${em("PHP e Laravel")} para a fundação estadual de fomento à pesquisa e inovação do Espírito Santo.`,
      `Meio período, remoto: primeiro contato profissional com ${em("ambiente público e regulado")}.`,
    ],
  },
  {
    title: "Desenvolvedor Web",
    company_name: "Autônomo / Freelance",
    date: "2021 – 2023",
    details: [
      `Desenvolvimento web sob demanda para clientes diretos, do levantamento de requisitos ao ${em("deploy")}.`,
      `Primeiro commit público em ${em("16/05/2021")} — é essa a âncora da contagem de ~5 anos de experiência.`,
    ],
  },
];

// Só entram aqui itens cuja imagem é uma captura REAL do próprio item — por
// isso os três são faces do mesmo sistema da EMFLORA, que é o único conjunto de
// screenshots autorais que o repositório tem hoje. Os outros projetos aparecem
// em `projects`, com capa gerada em CSS. Ver PLANO.md, item 8.
const portfolio = [
  {
    name: "emf_rover — telemetria em cabine",
    description:
      "Navegação de precisão de uma motocoveadora agrícola em Raspberry Pi Zero 2W: 364 de 364 commits e 41.292 linhas de Python, com fusão GNSS/IMU por Filtro de Kalman Estendido de 15 estados e heading corrigido para 3,1° de erro médio.",
    image: fleetTelemetry,
  },
  {
    name: "App de frota offline-first",
    description:
      "React Native/Expo rodando em tablet de cabine sobre 13 tabelas SQLite: o checklist de manutenção continua funcionando com a rede caída e sincroniza quando ela volta.",
    image: fleetChecklist,
  },
  {
    name: "Infraestrutura RTK end-to-end",
    description:
      "Estação-base ESP32 + u-blox ZED-F9P publicando RTCM3 por NTRIP, caster asyncio próprio em VPS (1 base para N rovers, autenticação bcrypt, rate limit por consumidor) e backend Fastify/Prisma que converte planejamentos KML em waypoints via GDAL.",
    image: fleetRefuel,
  },
];

export { experiences, portfolio };
