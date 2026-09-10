import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Cpu, Compass, Server, Sparkles, Quote, CornerDownRight } from 'lucide-react';
import { pick, profile } from '../data';
import { historia } from '../data/projetos';

/* ---------------------------------------------------------------------------
 * HistoriaSection — o arco de carreira contado como narrativa.
 *
 * Os capítulos vêm de `historia`, em src/data/projetos.js, que é a fonte
 * canônica: { id, ano, titulo, texto, marco }. Nada de conteúdo de trajetória
 * é redigido aqui — divergir da fonte é justamente o erro que este site existe
 * para não cometer.
 *
 * O que este arquivo acrescenta é o enquadramento que a fonte não carrega e que
 * é presentacional por natureza:
 *   - ARCO: as cinco fases do percurso (mecânica → automação → firmware RTK →
 *     software de produto → IA generativa), que dão a leitura de conjunto antes
 *     do detalhe cronológico;
 *   - METODO: as três leis e as três provas do rigor de medição.
 * Ambos foram escritos contra job_safe/recon/BANCO-DE-EVIDENCIAS.md e
 * job_safe/assets/cv-pt.md. Sem número arredondado, sem métrica de produto.
 *
 * Animação: nada entra com opacidade zero esperando scroll. Só o trilho da
 * linha do tempo desenha na montagem, e ele é decorativo — o texto está legível
 * com a página parada e com JavaScript de animação desligado.
 * ------------------------------------------------------------------------- */

const t3 = (ptBR, enUS, zhCN) => ({
  'pt-BR': ptBR,
  'en-US': enUS,
  'zh-CN': zhCN === undefined ? enUS : zhCN,
});

const CABECALHO = {
  kicker: t3('A história', 'The story'),
  titulo: t3(
    'Engenharia mecânica virou IA em produção — e a régua veio junto.',
    'Mechanical engineering became AI in production — and the ruler came along.'
  ),
  lede: t3(
    'Cerca de 5 anos de estrada e ~2.900 commits de autoria em nove sistemas reais. O caminho não foi linear, mas segue uma linha só: cada fase somou um instrumento de medida, e a IA generativa foi o vetor que fundiu as duas engenharias que eu já carregava.',
    'About five years in and ~2,900 authored commits across nine real systems. The path was not linear, but it follows a single line: each phase added an instrument of measurement, and generative AI was the vector that fused the two kinds of engineering I already carried.'
  ),
  marcoRotulo: t3('O que ficou', 'What stuck'),
};

// As cinco fases do arco. A última é destacada porque é onde as duas frentes
// se encontram — é a leitura que o próprio Davi faz da própria trajetória.
const ARCO = [
  {
    id: 'mecanica',
    icone: Ruler,
    rotulo: t3('Engenharia mecânica', 'Mechanical engineering'),
    nota: t3('de onde veio a régua', 'where the ruler came from'),
  },
  {
    id: 'automacao',
    icone: Cpu,
    rotulo: t3('Automação industrial', 'Industrial automation'),
    nota: t3('sistema que não pode falhar', 'systems that cannot fail'),
  },
  {
    id: 'navegacao',
    icone: Compass,
    rotulo: t3('Firmware de navegação RTK', 'RTK navigation firmware'),
    nota: t3('Kalman, sinal e ruído', 'Kalman, signal and noise'),
  },
  {
    id: 'produto',
    icone: Server,
    rotulo: t3('Software de produto', 'Product software'),
    nota: t3('escala, time e contrato', 'scale, team and contract'),
  },
  {
    id: 'ia',
    icone: Sparkles,
    rotulo: t3('IA generativa em produção', 'Generative AI in production'),
    nota: t3('o vetor que fundiu as duas', 'the vector that fused both'),
    destaque: true,
  },
];

const METODO = {
  titulo: t3('O método, em três linhas', 'The method, in three lines'),

  leis: [
    t3(
      'Todo número responde a uma pergunta antes de virar resultado: isso mede o objeto ou mede o instrumento?',
      'Every number answers one question before it becomes a result: is this measuring the object, or the instrument?'
    ),
    t3(
      '"Não deu para medir" não é "mediu e deu zero". Inconclusivo nunca passa como verde.',
      '"Could not measure" is not "measured and got zero". Inconclusive never ships as green.'
    ),
    t3(
      'Retratar faz parte do resultado. Quando a auditoria derruba a minha manchete, a retratação sai com o mesmo destaque.',
      'Retracting is part of the result. When an audit takes down my own headline, the retraction gets the same prominence.'
    ),
  ],

  provas: [
    {
      rotulo: t3('A retratação', 'The retraction'),
      texto: t3(
        'Num projeto autoral de análise de traço manuscrito, rodei uma auditoria adversarial de 37 agentes em 4 lentes independentes: 46 achados, 22 verificados de forma cruzada — e um deles derrubou a manchete que eu mesmo tinha publicado. O resultado media o operador de derivada segunda, não a assinatura. Publiquei a retratação com o mesmo destaque do original.',
        'In a personal project analysing handwritten strokes, I ran an adversarial audit of 37 agents across 4 independent lenses: 46 findings, 22 cross-verified — and one of them took down the headline I had published myself. The result was measuring the second-derivative operator, not the signature. I published the retraction with the same prominence as the original.'
      ),
    },
    {
      rotulo: t3('O harness que se acusa', 'The harness that reports itself'),
      texto: t3(
        'No supervisório industrial, o laboratório de longevidade tem 7 cenários de caos e dois códigos de saída distintos: 1 quando o produto reprova, 2 quando o harness não conseguiu medir. Falha de produto e falha de medição não podem sair pela mesma porta.',
        'In the industrial supervisory system, the longevity lab runs 7 chaos scenarios with two distinct exit codes: 1 when the product fails, 2 when the harness could not measure. A product failure and a measurement failure must not leave through the same door.'
      ),
    },
    {
      rotulo: t3('A limitação declarada', 'The declared limitation'),
      texto: t3(
        'No classificador de churn que publiquei com artigo, a acurácia estava inflada por vazamento de rótulo. A limitação hoje é declarada junto ao projeto, e é essa a versão do resultado que eu defendo — não a que dava o número mais bonito.',
        'In the churn classifier I published with an article, the accuracy was inflated by label leakage. The limitation is now declared alongside the project, and that is the version of the result I stand behind — not the one with the prettier number.'
      ),
    },
  ],
};

const HistoriaSection = ({ language = 'pt-BR', capitulos = historia }) => {
  const p = (valor) => pick(valor, language);
  const lista = Array.isArray(capitulos) ? capitulos : [];

  return (
    <section id="historia" className="relative overflow-hidden py-24">
      {/* Fundo da mesma família espacial do resto do site, sem competir com o texto */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-900/40 via-emerald-950/20 to-gray-900/40" />
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-32 h-96 w-96 rounded-full bg-emerald-400/5 blur-3xl" />

      <div className="container relative mx-auto px-6">
        {/* ---------------- Cabeçalho ---------------- */}
        <header className="max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-emerald-400/80">
            {p(CABECALHO.kicker)}
          </p>
          <h2 className="mt-5 text-3xl font-bold leading-[1.15] text-white sm:text-4xl lg:text-[2.75rem]">
            {p(CABECALHO.titulo)}
          </h2>
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-emerald-400 to-transparent" />
          <p className="mt-6 text-base leading-relaxed text-gray-300/90 sm:text-lg">
            {p(CABECALHO.lede)}
          </p>
        </header>

        {/* ---------------- O arco, em cinco tempos ---------------- */}
        <ol className="mt-14 grid gap-px border border-emerald-500/15 bg-emerald-500/10 sm:grid-cols-2 lg:grid-cols-5">
          {ARCO.map((fase, i) => {
            const Icone = fase.icone;
            return (
              <motion.li
                key={fase.id}
                whileHover={{ backgroundColor: 'rgba(6, 32, 26, 1)' }}
                transition={{ duration: 0.2 }}
                className={`relative flex flex-col gap-3 p-5 ${
                  fase.destaque ? 'bg-[#062018]' : 'bg-[#07131a]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-[11px] tracking-[0.2em] ${
                      fase.destaque ? 'text-emerald-300' : 'text-gray-500'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <Icone
                    size={18}
                    className={fase.destaque ? 'text-emerald-300' : 'text-emerald-500/50'}
                    aria-hidden="true"
                  />
                </div>
                <h3
                  className={`text-sm font-semibold leading-snug ${
                    fase.destaque ? 'text-emerald-200' : 'text-gray-100'
                  }`}
                >
                  {p(fase.rotulo)}
                </h3>
                <p className="font-mono text-[11px] leading-relaxed text-gray-500">
                  {p(fase.nota)}
                </p>
                {fase.destaque && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-emerald-400 via-emerald-400/40 to-transparent"
                  />
                )}
              </motion.li>
            );
          })}
        </ol>

        {/* ---------------- O método ---------------- */}
        <div className="mt-16 border-l-2 border-emerald-500/60 bg-gray-900/40 backdrop-blur-sm">
          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-14">
              {/* Como ele mesmo descreve o próprio jeito de trabalhar */}
              <div className="lg:w-[38%]">
                <Quote size={22} className="text-emerald-500/50" aria-hidden="true" />
                <p className="mt-4 text-lg leading-relaxed text-gray-200 sm:text-xl">
                  {pick(profile.workingStyle, language)}
                </p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400/70">
                  {profile.shortName}
                </p>
              </div>

              {/* Três leis */}
              <div className="lg:flex-1">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400/80">
                  {p(METODO.titulo)}
                </h3>
                <ol className="mt-5 space-y-4">
                  {METODO.leis.map((lei, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="mt-0.5 shrink-0 font-mono text-sm text-emerald-500/70">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[15px] leading-relaxed text-gray-200">{p(lei)}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Três provas de que a lei é praticada, não declarada */}
            <div className="mt-10 grid gap-px border-t border-emerald-500/15 bg-emerald-500/10 pt-px lg:grid-cols-3">
              {METODO.provas.map((prova, i) => (
                <div key={i} className="bg-gray-900/60 px-5 py-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/70">
                    {p(prova.rotulo)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">{p(prova.texto)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- Linha do tempo ---------------- */}
        <ol className="relative mt-20">
          {lista.map((cap, i) => {
            const ultimo = i === lista.length - 1;
            return (
              <li key={cap.id || i} className="relative pb-14 pl-9 last:pb-0 sm:pl-12">
                {/* Trilho — desenhado em CSS puro e sempre visível: ele é o que
                    liga os capítulos, então não pode depender de JavaScript. */}
                {!ultimo && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-[7px] top-4 w-px bg-gradient-to-b from-emerald-500/45 to-emerald-500/10 sm:left-[9px]"
                  />
                )}

                {/* Nó — o último fica aberto, porque a trajetória não terminou */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center border sm:h-[19px] sm:w-[19px] ${
                    ultimo ? 'border-emerald-400 bg-emerald-400/15' : 'border-emerald-500/50 bg-gray-900'
                  }`}
                  style={{ borderRadius: 2 }}
                >
                  <span
                    className={`block h-[5px] w-[5px] ${
                      ultimo ? 'animate-pulse bg-emerald-300' : 'bg-emerald-500/70'
                    }`}
                    style={{ borderRadius: 1 }}
                  />
                </span>

                {/* Conteúdo */}
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-400/70">
                  {p(cap.ano || cap.periodo)}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {p(cap.titulo)}
                </h3>
                <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-gray-300/85">
                  {p(cap.texto)}
                </p>

                {cap.marco && (
                  <div className="mt-5 flex max-w-3xl gap-3 border-l border-emerald-500/30 bg-emerald-500/[0.05] py-3 pl-4 pr-4">
                    <CornerDownRight
                      size={15}
                      className="mt-[3px] shrink-0 text-emerald-400/70"
                      aria-hidden="true"
                    />
                    <p className="text-[14px] leading-relaxed text-emerald-100/85">
                      <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400/70">
                        {p(CABECALHO.marcoRotulo)}
                      </span>
                      {p(cap.marco)}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default HistoriaSection;
