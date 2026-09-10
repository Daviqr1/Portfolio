// ---------------------------------------------------------------------------
// src/data/projetos.js — os projetos REAIS de Davi Rezende, a história de
// carreira e os links públicos que valem clique imediato.
//
// REGRA DESTE ARQUIVO, sem exceção:
// 1. Todo número aqui foi MEDIDO — contagem de git, contagem de tabela,
//    contagem de arquivo, leitura de schema. Nada é estimado, arredondado para
//    cima ou "sentido". Se não deu para medir, não entra.
// 2. Todo caminho de imagem foi conferido com `ls` antes de ser escrito. Só
//    existem três capturas reais no repositório (as do Harvester). Todo o
//    resto é `imagem: null` e o card gera a capa em CSS a partir de `capa`.
// 3. Link de repositório privado NÃO tem url. O card mostra "código privado"
//    em vez de mandar o visitante para um 404 ou uma tela de login.
// 4. Zero emoji, no arquivo inteiro.
//
// Fontes de verdade (leia antes de editar qualquer linha de conteúdo):
//   job_safe/REGRAS-DE-ESCRITA.md            — as 17 regras de escrita
//   job_safe/recon/BANCO-DE-EVIDENCIAS.md    — a lista negra de alegações
//   job_safe/recon/DOSSIE-FATOS-VERIFICADOS.md
//   job_safe/recon/FICHAS-PROJETOS.md        — medições por projeto
//   job_safe/recon/OBSERVABILIDADE-O-QUE-PODE-AFIRMAR.md
//   job_safe/assets/cv-pt.md                 — o site não pode divergir do CV
//
// Três regras de compliance que valem mais que qualquer ganho de texto:
//   R5  — a plataforma B2B NUNCA é nomeada. Há disputa de marca em curso.
//   R17 — o supervisório SCADA foi prestação de serviço da empresa dele para
//         um cliente industrial. Nunca escrever nem sugerir vínculo de
//         emprego com a contratante ou com a operadora da bancada.
//   R4  — a fração de autoria exata, sempre. "Sozinho" só onde é 368/368 ou
//         364/364.
// ---------------------------------------------------------------------------

// Únicas capturas de tela autorais do repositório. Conferidas em
// src/assets/ antes de escrever este import.
import harvesterDashboard from "../assets/harvester-dashboard.jpg";
import harvesterMobile from "../assets/harvester-mobile.jpg";
import harvesterHardware from "../assets/harvester-hardware.jpg";

/**
 * Campo traduzível, no mesmo shape que `pick()` de src/data/index.js resolve.
 * Omitir `zhCN` faz o chinês cair no inglês — decisão consciente: não existe
 * conteúdo próprio em zh-CN e traduzir por máquina seria pior que reusar.
 */
const t = (ptBR, enUS, zhCN) => ({
  "pt-BR": ptBR,
  "en-US": enUS,
  "zh-CN": zhCN === undefined ? enUS : zhCN,
});

// Rótulos reutilizados nos links, para não repetir tradução solta.
const LINK_PRIVADO = t("Código privado", "Private code");
const LINK_REPO = t("Repositório público", "Public repository");

// ---------------------------------------------------------------------------
// PROJETOS
//
// Shape de cada item:
//   id          string, estável, usado como key e âncora
//   titulo      traduzível — o nome, curto
//   subtitulo   traduzível — uma linha do que é
//   papel       traduzível — o papel dele, honesto
//   autoria     string — a fração de commits medida, ou null
//   periodo     traduzível — string curta
//   resumo      traduzível — 2 a 3 frases: o que é e por que é difícil
//   destaques   array traduzível — 2 a 4 bullets, cada um com número medido
//   stack       array de strings — tecnologia real, sem tradução
//   links       array de { rotulo (traduzível), url?, tipo }
//               tipo: 'repo' | 'site' | 'artigo' | 'privado'
//               tipo 'privado' NUNCA tem url
//   imagem      caminho importado de arquivo que EXISTE, ou null
//   imagemAlt   traduzível, obrigatório quando imagem !== null
//   galeria     array de { src, alt } — só quando há captura real
//   capa        { icone, acento, etiqueta } — insumo da capa gerada em CSS
//               quando imagem === null. `icone` é chave de string; o
//               componente mapeia para lucide-react.
//   destaque    boolean — true nos três mais fortes
// ---------------------------------------------------------------------------

export const projetos = [
  // -------------------------------------------------------------------------
  {
    id: "ooinfo",
    titulo: t("OOInfo", "OOInfo"),
    subtitulo: t(
      "Plataforma colaborativa de dados no ar, com servidor MCP sob OAuth 2.1 e camada de IA generativa",
      "Collaborative data platform in production, with an OAuth 2.1 MCP server and a generative-AI layer"
    ),
    papel: t("Tech Lead / Owner", "Tech Lead / Owner"),
    autoria: "1.531 / 2.853 commits",
    periodo: t("01/2026 – atual", "01/2026 – present"),
    resumo: t(
      "Plataforma colaborativa de dados estruturados do laboratório da UFG, no ar em ooinfo.org. Sou o Tech Lead/Owner registrado no CONTRIBUTING.md e escrevi 1.531 dos 2.853 commits do repositório, entre 18 autores, incluindo o commit fundador. O difícil não é o CRUD: é abrir a base a agentes de LLM externos sem afrouxar um milímetro do controle de acesso que já existia.",
      "The UFG laboratory's collaborative structured-data platform, live at ooinfo.org. I am the Tech Lead/Owner recorded in CONTRIBUTING.md and wrote 1,531 of the repository's 2,853 commits across 18 authors, including the founding one. The hard part is not the CRUD: it is opening the database to external LLM agents without loosening the access control that was already there by a single millimetre."
    ),
    destaques: [
      t(
        "1.531 de 2.853 commits (53%) entre 18 autores, incluindo o commit fundador",
        "1,531 of 2,853 commits (53%) across 18 authors, including the founding one"
      ),
      t(
        "495 endpoints REST, 76 tabelas, 131 migrations versionadas e 13 filas assíncronas em NestJS 10 sobre PostgreSQL 16",
        "495 REST endpoints, 76 tables, 131 versioned migrations and 13 async queues on NestJS 10 over PostgreSQL 16"
      ),
      t(
        "Servidor MCP construído sozinho, 33 dos 37 commits do módulo: 15 ferramentas JSON-RPC sob OAuth 2.1, com 4 escopos que só estreitam o controle de acesso existente — nunca ampliam",
        "MCP server built single-handedly, 33 of the module's 37 commits: 15 JSON-RPC tools under OAuth 2.1, with 4 scopes that can only narrow the existing access control — never widen it"
      ),
      t(
        "Autor dominante da camada de IA generativa, 132 de 226 commits: gateway de 3 provedores com cascata de fallback sob um único orçamento de tempo global",
        "Dominant author of the generative-AI layer, 132 of 226 commits: a 3-provider gateway with a fallback cascade under one global time budget"
      ),
    ],
    stack: [
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
        rotulo: t("Abrir ooinfo.org", "Open ooinfo.org"),
        url: "https://ooinfo.org",
        tipo: "site",
      },
    ],
    imagem: null,
    capa: { icone: "brain", acento: "emerald", etiqueta: "MCP · OAuth 2.1 · SSE" },
    destaque: true,
  },

  // -------------------------------------------------------------------------
  // R17: prestação de serviço, nunca vínculo. A contratante e a operadora da
  // bancada não aparecem — nem como empregador, nem por nome. "Cliente
  // industrial" diz tudo o que o recrutador precisa e não cria exposição.
  {
    id: "scada-torres",
    titulo: t(
      "Supervisório SCADA de ensaio de torres",
      "Transmission-tower test SCADA"
    ),
    subtitulo: t(
      "Bancada de ensaio de carga em torres de transmissão de 80 metros, entregue como prestador para cliente industrial",
      "Load-test bench for 80-metre transmission towers, delivered as a contractor to an industrial client"
    ),
    papel: t(
      "Prestador de serviço — engenheiro de software",
      "Contractor — software engineer"
    ),
    autoria: "368 / 368 commits",
    periodo: t("12/2025 – atual", "12/2025 – present"),
    resumo: t(
      "Supervisório on-premise que comanda 52 inversores de frequência e lê 56 células de carga durante o ensaio de carga de torres de transmissão de 80 metros, falando S7Comm direto com um CLP Siemens S7-1500. Entregue como prestação de serviço a um cliente industrial, do primeiro commit ao instalador Windows assinado: 368 de 368 commits em 9 meses. Fiz a arquitetura, o comissionamento em campo e o treinamento dos operadores da bancada — zero cloud, zero internet em runtime.",
      "An on-premise supervisory system driving 52 variable-frequency drives and reading 56 load cells during the load testing of 80-metre transmission towers, speaking S7Comm directly to a Siemens S7-1500 PLC. Delivered as contracted work for an industrial client, from the first commit to the signed Windows installer: 368 of 368 commits in nine months. I did the architecture, the on-site commissioning and the operator training — zero cloud, zero internet at runtime."
    ),
    destaques: [
      t(
        "368 de 368 commits em 9 meses, autor único, do primeiro commit ao instalador assinado",
        "368 of 368 commits over 9 months, sole author, from the first commit to the signed installer"
      ),
      t(
        "52 inversores de frequência comandados e 56 células de carga lidas em torres de 80 metros",
        "52 variable-frequency drives commanded and 56 load cells read on 80-metre towers"
      ),
      t(
        "Contrato de memória de 15 KB do CLP mapeado byte a byte, com teste que reprova offset divergente — barrou um erro de endereço que teria derrubado o heartbeat de segurança em ensaio real",
        "The PLC's 15 KB memory contract mapped byte by byte, guarded by a test that fails on offset drift — it caught an addressing error that would have killed the safety heartbeat during a live test"
      ),
      t(
        "Heartbeat de segurança em processo Node isolado, 1 bit a cada 100 ms: se o backend morre, o CLP corta a tração sozinho",
        "Safety heartbeat in an isolated Node process, one bit every 100 ms: if the backend dies, the PLC cuts traction on its own"
      ),
    ],
    stack: [
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
    links: [
      {
        rotulo: t(
          "Código privado, sob licença proprietária",
          "Private code, proprietary licence"
        ),
        tipo: "privado",
      },
    ],
    imagem: null,
    capa: { icone: "cpu", acento: "amber", etiqueta: "S7Comm · fail-safe · on-premise" },
    destaque: true,
  },

  // -------------------------------------------------------------------------
  {
    id: "observability-demo",
    titulo: t("Observability Demo", "Observability Demo"),
    subtitulo: t(
      "Serviço NestJS instrumentado de ponta a ponta com OpenTelemetry, público e reproduzível em um comando",
      "A NestJS service instrumented end to end with OpenTelemetry, public and reproducible in one command"
    ),
    papel: t("Autor solo", "Sole author"),
    autoria: null,
    periodo: "09/2026",
    resumo: t(
      "Serviço NestJS instrumentado de ponta a ponta para provar uma coisa só: que o contexto de trace sobrevive à fila. Uma requisição atravessa a API REST, um serviço HTTP externo e um worker BullMQ e chega ao Grafana como um trace único de 25 spans, com as linhas de log dos três processos carregando o mesmo trace_id. O README declara também o que o projeto NÃO faz — sem alerting, sem SLO, nunca rodado em escala — porque limite declarado é parte da engenharia.",
      "A NestJS service instrumented end to end to prove one thing: that trace context survives the queue. A single request crosses the REST API, an external HTTP service and a BullMQ worker, and reaches Grafana as one trace of 25 spans, with the log lines of all three processes carrying the same trace_id. The README also states what the project does NOT do — no alerting, no SLOs, never run at scale — because a declared limit is part of the engineering."
    ),
    destaques: [
      t(
        "Trace único de 25 spans atravessando 3 processos, inclusive a fila BullMQ no Redis",
        "One trace of 25 spans crossing 3 processes, including the BullMQ queue on Redis"
      ),
      t(
        "Índice do Loki mantido em 3 rótulos apenas; tudo de alta cardinalidade vai para structured metadata em vez de virar série nova",
        "The Loki index kept to 3 labels only; everything high-cardinality goes to structured metadata instead of spawning new series"
      ),
      t(
        "Redação de dado sensível por allowlist em 2 camadas independentes, aplicação e OTel Collector: o identificador pessoal vira pseudônimo SHA-256 e o valor cru não existe na telemetria",
        "Allowlist-based redaction of sensitive data in 2 independent layers, application and OTel Collector: a personal identifier becomes a SHA-256 pseudonym and the raw value never exists in the telemetry"
      ),
      t(
        "Um docker compose up sobe os 10 contêineres da stack, e um script de verificação cria um pedido real e falha com código diferente de zero se qualquer perna da correlação quebrar",
        "A single docker compose up brings up the stack's 10 containers, and a verification script creates a real order and exits non-zero if any leg of the correlation breaks"
      ),
    ],
    stack: [
      "NestJS",
      "TypeScript",
      "OpenTelemetry",
      "OTel Collector",
      "Prometheus",
      "Grafana Tempo",
      "Grafana Loki",
      "BullMQ",
      "Redis",
      "PostgreSQL",
      "Prisma",
      "Docker Compose",
    ],
    links: [
      {
        rotulo: LINK_REPO,
        url: "https://github.com/Daviqr1/observability-demo",
        tipo: "repo",
      },
    ],
    imagem: null,
    capa: { icone: "activity", acento: "sky", etiqueta: "OpenTelemetry · Tempo · Loki" },
    destaque: true,
  },

  // -------------------------------------------------------------------------
  // R5: esta plataforma NUNCA é nomeada. Há disputa de marca em curso e o
  // nome no portfólio pode ser usado como prova de vínculo com a marca da
  // contraparte. A substância técnica fica toda; o nome, nunca.
  {
    id: "customer-intelligence",
    titulo: t(
      "Plataforma B2B de Customer Intelligence",
      "B2B Customer Intelligence platform"
    ),
    subtitulo: t(
      "SaaS multi-tenant com o isolamento defendido dentro do PostgreSQL e um gate determinístico contra alucinação de LLM",
      "Multi-tenant SaaS with isolation enforced inside PostgreSQL and a deterministic gate against LLM hallucination"
    ),
    papel: t("Autor principal e arquiteto", "Primary author and architect"),
    autoria: "398 / 428 commits (93%)",
    periodo: t("04/2026 – 07/2026", "04/2026 – 07/2026"),
    resumo: t(
      "Plataforma B2B multi-tenant de customer intelligence, projeto autoral: 398 de 428 commits (93%) em Next.js 16 sobre PostgreSQL 16. Resolvi dentro do banco três coisas que normalmente viram infraestrutura nova — isolamento por tenant, fila de análise e notificação em tempo real —, e com isso Redis e WebSocket saíram do stack. Em cima disso roda um swarm de 3 agentes especialistas em paralelo mais um coordenador, com um gate determinístico que só deixa publicar o insight se cada número escrito pelo modelo casar com o contexto que ele recebeu.",
      "A multi-tenant B2B customer-intelligence platform, my own project: 398 of 428 commits (93%) on Next.js 16 over PostgreSQL 16. I solved three things inside the database that usually become new infrastructure — tenant isolation, the analysis queue and real-time notification — which took Redis and WebSockets out of the stack. On top of that runs a swarm of 3 specialist agents in parallel plus a coordinator, behind a deterministic gate that only lets an insight publish if every number the model wrote matches the context it was given."
    ),
    destaques: [
      t(
        "398 de 428 commits (93%) como autor principal, em 3 meses e meio",
        "398 of 428 commits (93%) as primary author, in three and a half months"
      ),
      t(
        "Row-Level Security em 18 tabelas com a role da aplicação sem BYPASSRLS: esquecer o escopo devolve zero linhas, não o tenant do vizinho",
        "Row-Level Security across 18 tables with the application role holding no BYPASSRLS: forget the scope and you get zero rows, not the neighbour's tenant"
      ),
      t(
        "Teste de invasão IDOR cross-tenant rodando no CI contra PostgreSQL real a cada pull request, entre 1.026 blocos de teste Vitest",
        "A cross-tenant IDOR exploit test running in CI against real PostgreSQL on every pull request, among 1,026 Vitest blocks"
      ),
      t(
        "Swarm de 3 agentes especialistas em paralelo mais um coordenador, com saída restrita a JSON Schema e teto mensal de gasto por tenant",
        "A swarm of 3 specialist agents in parallel plus a coordinator, with JSON-Schema-constrained output and a per-tenant monthly spend cap"
      ),
    ],
    stack: [
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
    links: [{ rotulo: LINK_PRIVADO, tipo: "privado" }],
    imagem: null,
    capa: { icone: "database", acento: "cyan", etiqueta: "RLS · pg_notify · evals" },
    destaque: false,
  },

  // -------------------------------------------------------------------------
  {
    id: "emf-rover",
    titulo: t("emf_rover — navegação RTK", "emf_rover — RTK navigation"),
    subtitulo: t(
      "Firmware de navegação de precisão de uma motocoveadora agrícola em Raspberry Pi",
      "Precision-navigation firmware for an agricultural post-hole digger on a Raspberry Pi"
    ),
    papel: t("Autor solo", "Sole author"),
    autoria: "364 / 364 commits",
    periodo: t("11/2024 – 07/2026", "11/2024 – 07/2026"),
    resumo: t(
      "Firmware de navegação de precisão de uma motocoveadora agrícola: fusão GNSS/IMU com Filtro de Kalman Estendido de 15 estados rodando em Raspberry Pi, com 364 de 364 commits e 41.292 linhas de Python. O caso não é o hardware, é o método: uma falha de heading magnético bloqueava a operação havia 2 meses e já tinha resistido a 6 alterações cegas de offset de montagem. Parei de chutar, construí um laboratório de calibração de 7 scripts e derivei os parâmetros por medição.",
      "Precision-navigation firmware for an agricultural post-hole digger: GNSS/IMU fusion through a 15-state Extended Kalman Filter on a Raspberry Pi, across 364 of 364 commits and 41,292 lines of Python. The case is not the hardware, it is the method: a magnetic-heading defect had blocked field operation for two months and had already survived six blind changes to the mount offset. I stopped guessing, built a 7-script calibration lab and derived the parameters from measurement."
    ),
    destaques: [
      t(
        "364 de 364 commits e 41.292 linhas de Python, autor único",
        "364 of 364 commits and 41,292 lines of Python, sole author"
      ),
      t(
        "Filtro de Kalman Estendido de 15 estados com estimação online de bias, sobre parsers próprios de UBX, NMEA e RTCM3",
        "A 15-state Extended Kalman Filter with online bias estimation, on hand-rolled UBX, NMEA and RTCM3 parsers"
      ),
      t(
        "Erro médio de heading de 3,1° depois da calibração por medição, contra 6 tentativas anteriores por tentativa e erro que não resolveram nada",
        "3.1° mean heading error after measurement-driven calibration, against six previous trial-and-error attempts that fixed nothing"
      ),
      t(
        "Score de navegação de 64,7 para 88,6 no cenário mais difícil, por otimização bayesiana com cross-validation em 3 trajetórias",
        "Navigation score from 64.7 to 88.6 on the hardest scenario, through Bayesian optimisation cross-validated over 3 trajectories"
      ),
    ],
    stack: [
      "Python 3",
      "Raspberry Pi",
      "Filtro de Kalman Estendido",
      "GNSS-RTK",
      "NTRIP",
      "RTCM3",
      "u-blox ZED-F9P",
      "ESP32",
      "C++",
      "FastAPI",
      "Docker",
    ],
    links: [
      {
        rotulo: t(
          "Estação-base RTK (repositório público)",
          "RTK base station (public repository)"
        ),
        url: "https://github.com/Daviqr1/FULL_RTK_BASE_ANY_SENSOR",
        tipo: "repo",
      },
      {
        rotulo: t(
          "Firmware do rover: código privado",
          "Rover firmware: private code"
        ),
        tipo: "privado",
      },
    ],
    imagem: null,
    capa: { icone: "compass", acento: "green", etiqueta: "EKF de 15 estados · RTK · NTRIP" },
    destaque: false,
  },

  // -------------------------------------------------------------------------
  // Único projeto com captura de tela autoral. As três imagens foram
  // conferidas em src/assets/ antes deste bloco existir.
  {
    id: "harvester",
    titulo: t("Harvester", "Harvester"),
    subtitulo: t(
      "App de telemetria de frota que continua funcionando com a rede caída, dentro da cabine do trator",
      "A fleet-telemetry app that keeps working with the network down, inside the tractor cab"
    ),
    papel: t(
      "Autor principal, com uma coautora",
      "Primary author, with one co-author"
    ),
    autoria: "45 / 55 commits (82%)",
    periodo: t("11/2024 – 05/2026", "11/2024 – 05/2026"),
    resumo: t(
      "App de telemetria e apontamento de frota rodando em tablet dentro da cabine do trator, falando WebSocket direto com o access point do ESP32 da máquina — sem internet no talhão. Offline-first de verdade: 13 tabelas SQLite locais guardam checklist, paradas, turnos e operações, e a sincronização acontece quando a rede volta. São 45 dos 55 commits meus, incluindo toda a camada de dados, os contexts, os hooks e os serviços.",
      "A fleet telemetry and shift-logging app running on a tablet inside the tractor cab, speaking WebSocket directly to the machine's ESP32 access point — no internet out in the field. Offline-first for real: 13 local SQLite tables hold checklists, stoppages, shifts and operations, and syncing happens when the network comes back. 45 of the 55 commits are mine, including the whole data layer, the contexts, the hooks and the services."
    ),
    destaques: [
      t(
        "13 tabelas SQLite offline-first no dispositivo, mais 12 chaves de cache com encoding colunar",
        "13 offline-first SQLite tables on the device, plus 12 cache keys with columnar encoding"
      ),
      t(
        "45 de 55 commits (82%): 66 arquivos próprios, 14.219 linhas, 12 telas e 16 componentes de UI",
        "45 of 55 commits (82%): 66 own files, 14,219 lines, 12 screens and 16 UI components"
      ),
      t(
        "3 React Contexts, 9 hooks e 7 serviços sustentam a camada de dados, com WebSocket direto para o ESP32 da máquina e reconexão automática por backoff",
        "3 React Contexts, 9 hooks and 7 services carry the data layer, with a direct WebSocket link to the machine's ESP32 and automatic reconnection with backoff"
      ),
    ],
    stack: [
      "React Native 0.76",
      "Expo SDK 52",
      "JavaScript",
      "expo-sqlite",
      "WebSocket",
      "socket.io-client",
      "react-native-maps",
      "ESP32",
      "C++",
    ],
    links: [{ rotulo: LINK_PRIVADO, tipo: "privado" }],
    imagem: harvesterDashboard,
    imagemAlt: t(
      "Tela de telemetria do app rodando no tablet da cabine",
      "Telemetry screen of the app running on the in-cab tablet"
    ),
    galeria: [
      {
        src: harvesterDashboard,
        alt: t(
          "Painel de telemetria do trator no tablet da cabine",
          "Tractor telemetry dashboard on the in-cab tablet"
        ),
      },
      {
        src: harvesterMobile,
        alt: t(
          "Checklist de manutenção do app offline-first, com a rede caída",
          "Maintenance checklist in the offline-first app, with the network down"
        ),
      },
      {
        src: harvesterHardware,
        alt: t(
          "Módulo ESP32 embarcado na máquina, com a antena de telemetria",
          "The ESP32 module mounted on the machine, with the telemetry antenna"
        ),
      },
    ],
    capa: { icone: "radio", acento: "lime", etiqueta: "offline-first · ESP32 · SQLite" },
    destaque: false,
  },

  // -------------------------------------------------------------------------
  {
    id: "lowcodejs",
    titulo: t("LowCodeJS", "LowCodeJS"),
    subtitulo: t(
      "Contrato de autorização por linha desenhado por mim e mergeado no upstream de uma plataforma open source de terceiro",
      "A row-level authorization contract I designed, merged upstream into someone else's open-source platform"
    ),
    papel: t("Contribuidor de subsistema", "Subsystem contributor"),
    autoria: t(
      "23 commits na main do upstream",
      "23 commits on upstream main"
    ),
    periodo: t("05/2026 – atual", "05/2026 – present"),
    resumo: t(
      "Plataforma low-code open source criada por outra pessoa. Desenhei o contrato de plugin de autorização por linha da plataforma, o RowAccessGuard, e entreguei por fork e pull request #182, mergeado no upstream de uma base de 3.152 arquivos e 12 autores. É o único projeto do conjunto que prova trabalho dentro do código de terceiro com PR revisado por outra pessoa, e a interface que desenhei segue de pé na main do upstream depois do refactor de outro autor.",
      "An open-source low-code platform created by someone else. I designed the platform's row-level authorization plugin contract, RowAccessGuard, and delivered it through a fork and pull request #182, merged upstream into a codebase of 3,152 files and 12 contributors. It is the only project in the set that proves work inside someone else's code with a PR reviewed by another person, and the interface I designed is still standing on upstream main after another author's refactor."
    ),
    destaques: [
      t(
        "Pull request #182 mergeado no upstream de uma base de 3.152 arquivos e 12 autores; 23 commits meus na main do upstream",
        "Pull request #182 merged upstream into a codebase of 3,152 files and 12 contributors; 23 of my commits on upstream main"
      ),
      t(
        "RowAccessGuard: 6 métodos e decisão de três valores allow/deny/abstain composta entre guards independentes, com 'abstain = permitir' documentado como decisão consciente, não como omissão",
        "RowAccessGuard: 6 methods and a three-valued allow/deny/abstain decision composed across independent guards, with 'abstain equals allow' documented as a deliberate decision, not an omission"
      ),
      t(
        "Pushdown do filtro de ACL para dentro da query do MongoDB, para paginação e contagem não quebrarem, com 4 guards implementados sobre o contrato",
        "ACL filter pushdown into the MongoDB query, so pagination and counts do not break, with 4 guards implemented on top of the contract"
      ),
      t(
        "Revisei a segurança do meu próprio commit já mergeado e fechei 2 falhas: escrita arbitrária em campo nativo e bypass de guard de autorização",
        "I security-reviewed my own already-merged commit and closed 2 flaws: an arbitrary write into a native field and an authorization-guard bypass"
      ),
    ],
    stack: ["TypeScript", "NestJS", "MongoDB", "Mongoose", "JSON Schema", "MCP"],
    links: [
      {
        rotulo: t("Plataforma", "Platform"),
        url: "https://lowcodejs.org",
        tipo: "site",
      },
      {
        rotulo: t("Meu fork no GitHub", "My fork on GitHub"),
        url: "https://github.com/Daviqr1/lowcodejs",
        tipo: "repo",
      },
    ],
    imagem: null,
    capa: { icone: "git-merge", acento: "indigo", etiqueta: "RowAccessGuard · PR #182" },
    destaque: false,
  },

  // -------------------------------------------------------------------------
  // A lista negra EXIGE que a limitação de vazamento de rótulo apareça junto
  // do número. Ela não é uma ressalva: é o ponto do case.
  {
    id: "churn-bancario",
    titulo: t(
      "Classificação de churn bancário",
      "Bank customer churn classification"
    ),
    subtitulo: t(
      "RandomForestClassifier sobre base pública de clientes de cartão de crédito — e a limitação que eu documentei depois",
      "RandomForestClassifier over a public credit-card customer dataset — and the limitation I documented afterwards"
    ),
    papel: t("Autor solo", "Sole author"),
    autoria: null,
    periodo: "04/2024",
    resumo: t(
      "Classificador de risco de churn em scikit-learn sobre base pública de 5.063 clientes de cartão de crédito, com 14 features comportamentais e de limite: limpeza em pandas, rotulagem em 3 classes de risco, split 80/20 e escoragem em lote de uma segunda base nunca vista no treino. O estudo virou artigo publicado. Numa revisão posterior identifiquei vazamento de rótulo — a coluna que gera o rótulo estava dentro das features de treino —, então a acurácia publicada de 99,80% mede a regra de rotulagem, não a previsão de cancelamento. Publico o projeto com essa limitação escrita junto, porque número sem a régua ao lado não é resultado.",
      "A churn-risk classifier in scikit-learn over a public dataset of 5,063 credit-card customers with 14 behavioural and credit-limit features: pandas cleaning, three-class risk labelling, an 80/20 split and batch scoring of a second dataset never seen in training. The study became a published article. In a later review I found label leakage — the column that generates the label sat inside the training features — so the published 99.80% accuracy measures the labelling rule, not the prediction of cancellation. I publish the project with that limitation written next to it, because a number without its ruler beside it is not a result."
    ),
    destaques: [
      t(
        "Base pública de 5.063 clientes e 14 features, rotulada em 3 classes de risco, com split 80/20",
        "A public dataset of 5,063 customers and 14 features, labelled into 3 risk classes, with an 80/20 split"
      ),
      t(
        "1.013 registros no conjunto de teste, mais a escoragem em lote de uma segunda base nunca vista no treino e exportada para planilha — separação real entre treino e inferência",
        "1,013 records in the test set, plus batch scoring of a second dataset never seen in training and exported to a spreadsheet — a real separation between training and inference"
      ),
      t(
        "Acurácia publicada de 99,80% retratada por mim: a coluna que gera o rótulo estava dentro das features de treino, então o número mede a regra, não o cancelamento",
        "The published 99.80% accuracy retracted by me: the column that generates the label sat inside the training features, so the number measures the rule, not the cancellation"
      ),
    ],
    stack: [
      "Python 3.11",
      "scikit-learn",
      "RandomForestClassifier",
      "pandas",
      "matplotlib",
      "seaborn",
      "Jupyter",
    ],
    links: [
      {
        rotulo: LINK_REPO,
        url: "https://github.com/Daviqr1/Classificando-Clientes-e-prevenindo-Chunk-Utilizando-Random-Forest-Classifier",
        tipo: "repo",
      },
    ],
    imagem: null,
    capa: { icone: "chart", acento: "rose", etiqueta: "scikit-learn · 5.063 registros" },
    destaque: false,
  },
];

// ---------------------------------------------------------------------------
// HISTÓRIA — o arco, em 7 marcos
//
// Engenharia mecânica (IFES, cursada e não concluída) → automação industrial
// → firmware de navegação → software de produto → IA generativa em produção.
// A IA foi o vetor que fundiu as duas frentes.
//
// Shape: { id, ano, titulo, texto, marco }
//   texto — 2 a 3 linhas do que aconteceu
//   marco — uma frase do que mudou ali
//
// Nunca "6+ anos" (são ~5, ancorados em 16/05/2021).
// Nunca alegar diploma concluído.
// ---------------------------------------------------------------------------

export const historia = [
  {
    id: "2021-primeiro-commit",
    ano: "2021",
    titulo: t("O primeiro commit", "The first commit"),
    texto: t(
      "Vim da engenharia mecânica no IFES, cursada e não concluída. A conta do GitHub é de 16 de maio de 2021, e é dela que sai o primeiro trabalho web sob demanda, com o cliente do outro lado da mesa e ninguém entre mim e o problema.",
      "I came from mechanical engineering at IFES, attended and not completed. The GitHub account dates from 16 May 2021, and that is where the first on-demand web work starts, with the client on the other side of the table and nobody between me and the problem."
    ),
    marco: t(
      "É desta data que sai a conta de ~5 anos de experiência — não de uma estimativa.",
      "This is where the ~5-year experience count comes from — not from an estimate."
    ),
  },
  {
    id: "2023-fapes",
    ano: "2023 – 2025",
    titulo: t("FAPES: dado de cidadão", "FAPES: citizen data"),
    texto: t(
      "Desenvolvedor web júnior na fundação estadual de fomento à pesquisa e inovação do Espírito Santo, em PHP e Laravel. Primeiro contato profissional com dado de cidadão, homologação e prazo institucional.",
      "Junior web developer at the Espírito Santo state research and innovation funding foundation, in PHP and Laravel. First professional contact with citizen data, formal sign-off and institutional deadlines."
    ),
    marco: t(
      "Aprendi a trabalhar onde errar tem consequência institucional, não só um rollback.",
      "I learned to work where a mistake has an institutional consequence, not just a rollback."
    ),
  },
  {
    id: "2024-primeiro-modelo",
    ano: "2024",
    titulo: t(
      "O primeiro modelo, e a primeira retratação",
      "The first model, and the first retraction"
    ),
    texto: t(
      "Classificador de risco de churn em RandomForestClassifier sobre base pública de 5.063 clientes, publicado com artigo. Depois descobri que a coluna que gerava o rótulo estava dentro das features de treino: a acurácia de 99,80% media a minha própria regra de rotulagem.",
      "A churn-risk classifier using RandomForestClassifier over a public dataset of 5,063 customers, published with an article. I later found that the column generating the label sat inside the training features: the 99.80% accuracy was measuring my own labelling rule."
    ),
    marco: t(
      "Aqui nasceu o hábito que virou identidade: perguntar se o número mede o objeto ou o instrumento.",
      "This is where the habit that became an identity was born: asking whether a number measures the object or the instrument."
    ),
  },
  {
    id: "2024-emflora",
    ano: "2024 – 2026",
    titulo: t(
      "EMFLORA: automação, e depois firmware",
      "EMFLORA: automation, then firmware"
    ),
    texto: t(
      "Estagiário em 11/2024, júnior em 01/2025, pleno em 08/2025. No meio disso, o firmware de navegação de uma motocoveadora agrícola escrito sozinho: 364 de 364 commits, 41.292 linhas de Python e um Filtro de Kalman Estendido de 15 estados rodando em Raspberry Pi.",
      "Intern in 11/2024, junior in 01/2025, mid-level in 08/2025. In the middle of it, the navigation firmware of an agricultural post-hole digger written single-handedly: 364 of 364 commits, 41,292 lines of Python and a 15-state Extended Kalman Filter running on a Raspberry Pi."
    ),
    marco: t(
      "Duas semanas de bússola resolvidas por medição depois de 6 tentativas cegas: o método deixou de ser preferência e virou disciplina.",
      "Two weeks of compass debugging solved by measurement after six blind attempts: the method stopped being a preference and became a discipline."
    ),
  },
  {
    id: "2025-scada",
    ano: t("2025 – atual", "2025 – present"),
    titulo: t(
      "O sistema que não pode falhar",
      "The system that cannot fail"
    ),
    texto: t(
      "Supervisório SCADA de uma bancada de ensaio de carga em torres de transmissão de 80 metros, entregue como prestação de serviço a um cliente industrial: 368 de 368 commits em 9 meses, do primeiro commit ao instalador assinado, mais o comissionamento em campo e o treinamento dos operadores.",
      "The SCADA supervisory system of a load-test bench for 80-metre transmission towers, delivered as contracted work for an industrial client: 368 of 368 commits in nine months, from the first commit to the signed installer, plus the on-site commissioning and the operator training."
    ),
    marco: t(
      "Aprendi a projetar o modo de falha antes do caminho feliz: se o backend morre, o CLP corta a tração sozinho.",
      "I learned to design the failure mode before the happy path: if the backend dies, the PLC cuts traction on its own."
    ),
  },
  {
    id: "2026-ia",
    ano: t("2026 – atual", "2026 – present"),
    titulo: t(
      "LABIC / UFG: IA generativa em produção",
      "LABIC / UFG: generative AI in production"
    ),
    texto: t(
      "Cargo por nomeação, contrato de 2 anos. Tech Lead/Owner do OOInfo, com 1.531 dos 2.853 commits: servidor MCP sob OAuth 2.1 construído sozinho e a camada de IA generativa que faz LLM sobreviver em produção — orçamento de tempo global, cascata de fallback e cota auditada.",
      "An appointed, two-year role. Tech Lead/Owner of OOInfo, with 1,531 of its 2,853 commits: an OAuth 2.1 MCP server built single-handedly and the generative-AI layer that makes LLMs survive production — a global time budget, a fallback cascade and audited quota."
    ),
    marco: t(
      "A IA foi o vetor que fundiu as duas frentes: a engenharia que mede e a computação que entrega.",
      "AI was the vector that fused the two sides: the engineering that measures and the computing that ships."
    ),
  },
  {
    id: "2026-agora",
    ano: "2026 →",
    titulo: t("O que estou construindo agora", "What I am building now"),
    texto: t(
      "Busca híbrida sobre o corpus que já existe, medindo recall@k dos dois lados antes de afirmar qualquer ganho. E observabilidade publicada como projeto aberto: um trace único de 25 spans atravessando 3 processos, com o README declarando o que o projeto não faz.",
      "Hybrid search over the corpus that already exists, measuring recall@k on both sides before claiming any gain. And observability published as an open project: one trace of 25 spans crossing 3 processes, with the README stating what the project does not do."
    ),
    marco: t(
      "A régua vem antes da manchete. Já retratei publicamente um resultado meu quando a auditoria mostrou que a régua estava errada.",
      "The ruler comes before the headline. I have publicly retracted a result of my own when an audit showed the ruler was wrong."
    ),
  },
];

// ---------------------------------------------------------------------------
// LINKS RÁPIDOS — só endereço público que vale clique imediato.
//
// `interno: true` marca arquivo servido pelo próprio site: o componente deve
// resolver com getPublicUrl() de src/utils, porque o site vive sob a base
// /Portfolio/ no GitHub Pages e caminho absoluto quebra em dev.
// Os dois PDFs foram conferidos em Portfolio/public/ antes de entrarem aqui.
// ---------------------------------------------------------------------------

export const linksRapidos = [
  {
    id: "github",
    rotulo: "GitHub",
    descricao: t("Todo o código público", "All the public code"),
    url: "https://github.com/Daviqr1",
    tipo: "repo",
    icone: "github",
  },
  {
    id: "linkedin",
    rotulo: "LinkedIn",
    descricao: t("Perfil e contato", "Profile and contact"),
    url: "https://www.linkedin.com/in/davi-rezende-09540b222/",
    tipo: "site",
    icone: "linkedin",
  },
  {
    id: "ooinfo",
    rotulo: "ooinfo.org",
    descricao: t(
      "A plataforma que lidero, no ar",
      "The platform I lead, live"
    ),
    url: "https://ooinfo.org",
    tipo: "site",
    icone: "globe",
  },
  {
    id: "lowcodejs",
    rotulo: "lowcodejs.org",
    descricao: t(
      "Open source com PR meu mergeado no upstream",
      "Open source with a PR of mine merged upstream"
    ),
    url: "https://lowcodejs.org",
    tipo: "site",
    icone: "globe",
  },
  {
    id: "observability-demo",
    rotulo: "observability-demo",
    descricao: t(
      "OpenTelemetry ponta a ponta, roda com um comando",
      "End-to-end OpenTelemetry, runs with one command"
    ),
    url: "https://github.com/Daviqr1/observability-demo",
    tipo: "repo",
    icone: "activity",
  },
  {
    id: "rtk-base",
    rotulo: "FULL_RTK_BASE_ANY_SENSOR",
    descricao: t(
      "Estação-base RTK, código aberto",
      "RTK base station, open source"
    ),
    url: "https://github.com/Daviqr1/FULL_RTK_BASE_ANY_SENSOR",
    tipo: "repo",
    icone: "compass",
  },
  {
    id: "cv-pt",
    rotulo: t("Currículo (PT-BR)", "Résumé (PT-BR)"),
    descricao: t("PDF, uma página", "PDF, one page"),
    url: "cv_daviqr1_pt.pdf",
    interno: true,
    tipo: "arquivo",
    icone: "file",
  },
  {
    id: "cv-en",
    rotulo: t("Currículo (EN-US)", "Résumé (EN-US)"),
    descricao: t("PDF, uma página", "PDF, one page"),
    url: "cv_daviqr1_en.pdf",
    interno: true,
    tipo: "arquivo",
    icone: "file",
  },
];

// Conveniência para o card em destaque da seção de projetos.
export const projetosDestaque = projetos.filter((p) => p.destaque);

export default projetos;
