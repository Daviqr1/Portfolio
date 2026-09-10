import React from 'react';
import { Ruler, Cpu, Compass, Server, Sparkles, ShieldCheck } from 'lucide-react';
import { pick } from '../data';

/* ---------------------------------------------------------------------------
 * RoadmapSection — reescrita.
 *
 * A versão anterior contava uma trajetória genérica e em parte não sustentada
 * por evidência (empresa que não aparece em nenhum repositório, "modernização
 * de sistemas legados", anos sem lastro). Essa narrativa passou a viver em
 * HistoriaSection, contada com data, fração de autoria e número medido.
 *
 * Para não haver duas versões da mesma história no mesmo site, esta seção passa
 * a responder outra pergunta: NÃO "o que aconteceu", mas "o que cada fase somou
 * à caixa de ferramentas". É o inventário de competências, ancorado nas mesmas
 * fases do arco narrado acima — de modo que as duas seções se completam em vez
 * de competir.
 *
 * O id "roadmap" é preservado: navLinks em src/data/index.js aponta para ele.
 *
 * Fontes: job_safe/assets/cv-pt.md (seção COMPETÊNCIAS, auditada) e
 * job_safe/recon/BANCO-DE-EVIDENCIAS.md. Nenhum item aqui é aspiracional —
 * todos existem em repositório do Davi.
 * ------------------------------------------------------------------------- */

const t3 = (ptBR, enUS, zhCN) => ({
  'pt-BR': ptBR,
  'en-US': enUS,
  'zh-CN': zhCN === undefined ? enUS : zhCN,
});

const FASES = [
  {
    id: 'engenharia',
    icone: Ruler,
    nome: t3('Engenharia', 'Engineering'),
    periodo: t3('a base', 'the base'),
    resumo: t3(
      'O hábito de perguntar como o número foi medido, e de escrever a incerteza junto com o resultado.',
      'The habit of asking how a number was measured, and of writing the uncertainty next to the result.'
    ),
    competencias: [
      t3('Método experimental', 'Experimental method'),
      t3('Incerteza declarada', 'Stated uncertainty'),
      t3('Falsificação de hipótese', 'Hypothesis falsification'),
      t3('Álgebra linear e sinais', 'Linear algebra and signals'),
      t3('Trade-off escrito antes do código', 'Trade-off written before the code'),
      'ADR',
    ],
  },
  {
    id: 'industrial',
    icone: Cpu,
    nome: t3('Automação industrial', 'Industrial automation'),
    periodo: t3('sistemas críticos', 'mission-critical systems'),
    resumo: t3(
      'Software que roda sem rede de resgate: on-premise, sem internet em runtime, com fronteira fail-safe desenhada.',
      'Software that runs with no safety net: on-premise, no internet at runtime, with a fail-safe boundary by design.'
    ),
    competencias: [
      'SCADA',
      t3('CLP Siemens S7-1500', 'Siemens S7-1500 PLC'),
      'S7Comm',
      t3('Engenharia reversa de protocolo binário', 'Binary protocol reverse engineering'),
      t3('Design fail-safe', 'Fail-safe design'),
      t3('Watchdog em processo isolado', 'Watchdog in an isolated process'),
      'Chaos testing',
      'Soak testing',
      t3('Deploy on-premise e air-gapped', 'On-premise and air-gapped deployment'),
    ],
  },
  {
    id: 'navegacao',
    icone: Compass,
    nome: t3('Navegação e sinais', 'Navigation and signals'),
    periodo: t3('embarcados', 'embedded'),
    resumo: t3(
      'Sensor mente. O filtro é o que separa sinal de ruído — e a calibração é medida, nunca chutada.',
      'Sensors lie. The filter is what separates signal from noise — and calibration is measured, never guessed.'
    ),
    competencias: [
      'GNSS-RTK',
      'NTRIP',
      'RTCM3',
      'UBX / NMEA',
      'u-blox ZED-F9P',
      t3('Fusão de sensores', 'Sensor fusion'),
      t3('Filtro de Kalman Estendido', 'Extended Kalman Filter'),
      t3('Otimização bayesiana', 'Bayesian optimization'),
      'Raspberry Pi',
      'ESP32',
      t3('Geoespacial (GDAL, KML)', 'Geospatial (GDAL, KML)'),
    ],
  },
  {
    id: 'produto',
    icone: Server,
    nome: t3('Software de produto', 'Product software'),
    periodo: t3('escala e time', 'scale and team'),
    resumo: t3(
      'PostgreSQL como ferramenta de arquitetura, não como lugar onde o dado dorme: isolamento, fila e busca resolvidos dentro do banco em vez de somar infraestrutura.',
      'PostgreSQL as an architecture tool, not as the place where data sleeps: isolation, queueing and search solved inside the database instead of adding infrastructure.'
    ),
    competencias: [
      'TypeScript',
      'Node.js',
      'NestJS',
      'Next.js (App Router, Server Actions)',
      'Fastify',
      t3('React 18 e 19', 'React 18 and 19'),
      'React Native',
      'PostgreSQL 16',
      'Prisma',
      'Row-Level Security',
      t3('Filas dentro do Postgres', 'Queues inside Postgres'),
      'Full-text: tsvector, pg_trgm, unaccent',
      t3('Paginação keyset', 'Keyset pagination'),
      'Redis · BullMQ',
      'Docker · GitHub Actions',
      'Vitest · Cypress · Playwright',
      t3('Teste de IDOR no CI', 'IDOR test in CI'),
    ],
  },
  {
    id: 'ia',
    icone: Sparkles,
    nome: t3('IA generativa em produção', 'Generative AI in production'),
    periodo: t3('onde as duas se fundem', 'where both converge'),
    resumo: t3(
      'A camada que faz LLM sobreviver em produção: orçamento de tempo, guardrail determinístico e bancada de evals. É aqui que o rigor de medição da engenharia vira produto.',
      'The layer that makes an LLM survive production: time budgets, a deterministic guardrail and an eval bench. This is where engineering measurement discipline turns into product.'
    ),
    competencias: [
      t3(
        'LLM em produção: OpenAI, Anthropic, DeepSeek, OpenRouter, Gemini',
        'LLMs in production: OpenAI, Anthropic, DeepSeek, OpenRouter, Gemini'
      ),
      'Model Context Protocol (MCP)',
      'OAuth 2.1',
      'Tool calling',
      t3('Sistemas multiagente', 'Multi-agent systems'),
      t3('Gateway multiprovedor com cascata de fallback', 'Multi-provider gateway with fallback cascade'),
      t3('Streaming SSE', 'SSE streaming'),
      t3('Structured output com JSON Schema', 'Structured output with JSON Schema'),
      'LLM as a Judge',
      'Evals',
      t3('Mitigação de alucinação', 'Hallucination mitigation'),
      t3('Controle de custo por token', 'Per-token cost control'),
      'ONNX Runtime',
      'scikit-learn',
    ],
    destaque: true,
  },
];

const PRECISAO = {
  titulo: t3('Precisão sobre o rótulo', 'Precision over the label'),
  itens: [
    t3(
      'A orquestração de agentes é autoral, escrita do zero. Não é LangChain, LangGraph nem CrewAI — e escrever o loop na mão é o motivo de eu saber exatamente onde ele quebra.',
      'The agent orchestration is my own, written from scratch. It is not LangChain, LangGraph or CrewAI — and writing the loop by hand is exactly why I know where it breaks.'
    ),
    t3(
      'A busca que está em produção é 100% léxica: tsvector, pg_trgm e unaccent. O caminho vetorial está em construção e só vira afirmação quando o recall@k dos dois lados estiver medido.',
      'The search running in production is 100% lexical: tsvector, pg_trgm and unaccent. The vector path is under construction and only becomes a claim once recall@k has been measured on both sides.'
    ),
  ],
};

const CABECALHO = {
  kicker: t3('Competências por fase', 'Capabilities by phase'),
  titulo: t3(
    'O que cada fase somou à caixa de ferramentas',
    'What each phase added to the toolbox'
  ),
  lede: t3(
    'A trajetória está contada acima. Aqui é o inventário: cada fase deixou um instrumento, nenhum deles foi descartado, e a barra de acúmulo mostra o que já estava na mochila quando a fase começou.',
    'The trajectory is told above. This is the inventory: each phase left an instrument behind, none of them was discarded, and the accumulation bar shows what was already in the bag when the phase started.'
  ),
};

const RoadmapSection = ({ language = 'pt-BR' }) => {
  const p = (valor) => pick(valor, language);

  return (
    <section id="roadmap" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-900/50 via-emerald-950/15 to-gray-900/40" />
      <div className="pointer-events-none absolute left-1/3 top-10 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="container relative mx-auto px-6">
        <header className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-emerald-400/80">
            {p(CABECALHO.kicker)}
          </p>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
            {p(CABECALHO.titulo)}
          </h2>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-emerald-400 to-transparent" />
          <p className="mt-6 text-base leading-relaxed text-gray-300/85">{p(CABECALHO.lede)}</p>
        </header>

        <div className="mt-14 border-t border-white/10">
          {FASES.map((fase, i) => {
            const Icone = fase.icone;
            return (
              <div
                key={fase.id}
                className={`grid gap-6 border-b border-white/10 px-1 py-8 lg:grid-cols-[17rem_1fr] lg:gap-12 ${
                  fase.destaque ? 'bg-emerald-500/[0.04]' : ''
                }`}
              >
                {/* Coluna esquerda: identidade da fase */}
                <div className="lg:pr-6">
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 items-center justify-center border ${
                        fase.destaque
                          ? 'border-emerald-400/50 bg-emerald-400/10 text-emerald-300'
                          : 'border-white/10 bg-white/[0.03] text-emerald-500/70'
                      }`}
                      style={{ borderRadius: 2 }}
                      aria-hidden="true"
                    >
                      <Icone size={17} />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.25em] text-gray-600">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3
                    className={`mt-4 text-lg font-semibold leading-snug ${
                      fase.destaque ? 'text-emerald-200' : 'text-white'
                    }`}
                  >
                    {p(fase.nome)}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-gray-500">
                    {p(fase.periodo)}
                  </p>

                  {/* Barra de acúmulo: o que já estava na mochila quando a fase começou */}
                  <div
                    className="mt-4 flex gap-1"
                    role="img"
                    aria-label={`${i + 1} / ${FASES.length}`}
                  >
                    {FASES.map((_, j) => (
                      <span
                        key={j}
                        className={`h-[3px] w-6 ${
                          j <= i
                            ? fase.destaque
                              ? 'bg-emerald-400'
                              : 'bg-emerald-500/60'
                            : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="mt-4 text-[13px] leading-relaxed text-gray-400">{p(fase.resumo)}</p>
                </div>

                {/* Coluna direita: o inventário */}
                <ul className="flex flex-wrap content-start gap-2">
                  {fase.competencias.map((comp, j) => (
                    <li
                      key={j}
                      className={`border px-2.5 py-1 font-mono text-[11px] leading-relaxed transition-colors ${
                        fase.destaque
                          ? 'border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-100/90 hover:border-emerald-400/50'
                          : 'border-white/10 bg-white/[0.02] text-gray-300 hover:border-emerald-500/30 hover:text-emerald-200'
                      }`}
                      style={{ borderRadius: 2 }}
                    >
                      {p(comp)}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Precisão sobre o rótulo — o que ele deliberadamente NÃO chama pelo nome errado */}
        <div className="mt-12 border-l-2 border-emerald-500/60 bg-gray-900/40 px-6 py-7 backdrop-blur-sm sm:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck size={17} className="text-emerald-400" aria-hidden="true" />
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400/80">
              {p(PRECISAO.titulo)}
            </h3>
          </div>
          <ul className="mt-5 grid gap-5 lg:grid-cols-2">
            {PRECISAO.itens.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-gray-300/85">
                <span className="mt-[7px] h-1 w-1 shrink-0 bg-emerald-400" aria-hidden="true" />
                <span>{p(item)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
