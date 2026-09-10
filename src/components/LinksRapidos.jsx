import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Globe,
  GitBranch,
  FileText,
  Download,
  ArrowUpRight,
  Copy,
  Check,
  Radio,
  Activity,
  Compass,
  Mail,
  Link as LinkIcon,
} from 'lucide-react';
import { pick, profile } from '../data';
import { linksRapidos } from '../data/projetos';
import { getPublicUrl } from '../utils';

/* ---------------------------------------------------------------------------
 * LinksRapidos — acesso imediato ao que é público.
 *
 * A lista vem de `linksRapidos`, em src/data/projetos.js, no formato
 * { id, rotulo, descricao, url, tipo, icone, interno? }. Nenhum endereço é
 * escrito aqui: o arquivo de dados é a fonte, e `interno: true` significa
 * arquivo servido pelo próprio site — resolvido por getPublicUrl(), porque o
 * site vive sob a base /Portfolio/ no GitHub Pages e caminho absoluto quebra
 * em desenvolvimento.
 *
 * A distinção pedida (site no ar × repositório × documento) é estrutural, não
 * só cromática: cada tipo vira um bloco próprio, com etiqueta, acento e ação
 * diferentes — documento ganha botão de download, site ganha indicador de "no
 * ar", repositório mostra o caminho do repo em monoespaçada.
 * ------------------------------------------------------------------------- */

const t3 = (ptBR, enUS, zhCN) => ({
  'pt-BR': ptBR,
  'en-US': enUS,
  'zh-CN': zhCN === undefined ? enUS : zhCN,
});

// Mapa string -> componente, porque a fonte de dados guarda o ícone por nome
// (ela não deve importar de lucide-react só para descrever um link).
const ICONES = {
  github: Github,
  linkedin: Linkedin,
  globe: Globe,
  activity: Activity,
  compass: Compass,
  file: FileText,
  mail: Mail,
  branch: GitBranch,
};

// A ordem aqui é a ordem de leitura da seção: primeiro o que está no ar,
// depois o que dá para ler, por último o que dá para baixar.
const GRUPOS = [
  {
    tipo: 'site',
    titulo: t3('No ar', 'Live'),
    etiqueta: t3('Site', 'Site'),
    iconePadrao: Globe,
    acento: 'text-emerald-300',
    barra: 'bg-emerald-400',
    borda: 'hover:border-emerald-400/50',
    aoVivo: true,
  },
  {
    tipo: 'repo',
    titulo: t3('Código aberto para ler', 'Open source to read'),
    etiqueta: t3('Repositório', 'Repository'),
    iconePadrao: GitBranch,
    acento: 'text-cyan-300',
    barra: 'bg-cyan-400',
    borda: 'hover:border-cyan-400/40',
  },
  {
    tipo: 'arquivo',
    titulo: t3('Currículo', 'Résumé'),
    etiqueta: 'PDF',
    iconePadrao: FileText,
    acento: 'text-amber-200',
    barra: 'bg-amber-400',
    borda: 'hover:border-amber-400/40',
    documento: true,
  },
];

const CABECALHO = {
  kicker: t3('Acesso rápido', 'Quick access'),
  titulo: t3('Tudo em um clique', 'Everything one click away'),
  lede: t3(
    'O que está no ar, o que é código aberto para ler e o currículo em PDF. Sem caça ao link, sem formulário no meio.',
    'What is live, what is open source to read, and the résumé as a PDF. No link hunting, no form in the way.'
  ),
  copiar: t3('Copiar endereço', 'Copy address'),
  copiado: t3('Copiado', 'Copied'),
  baixar: t3('Baixar', 'Download'),
  email: t3('E-mail direto', 'Direct email'),
};

// Deriva o caminho curto do repositório a partir da URL, para mostrar em mono.
const caminhoDoRepo = (url) => {
  const m = /github\.com\/(.+?)\/?$/.exec(url || '');
  return m ? m[1] : url;
};

const LinksRapidos = ({ language = 'pt-BR', links = linksRapidos }) => {
  const p = (valor) => pick(valor, language);
  const [copiado, setCopiado] = useState(null);
  const lista = Array.isArray(links) ? links : [];

  const copiar = async (chave, texto) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(chave);
      setTimeout(() => setCopiado(null), 1800);
    } catch (erro) {
      // Clipboard indisponível (contexto não seguro ou permissão negada).
      // O endereço continua visível e o mailto continua funcionando, então
      // não há estado de erro a mostrar aqui.
      setCopiado(null);
    }
  };

  const grupos = GRUPOS.map((g) => ({
    ...g,
    itens: lista.filter((item) => item.tipo === g.tipo),
  })).filter((g) => g.itens.length > 0);

  // Qualquer tipo novo que apareça na fonte de dados cai num bloco genérico em
  // vez de sumir da tela sem aviso.
  const tiposConhecidos = GRUPOS.map((g) => g.tipo);
  const sobras = lista.filter((item) => !tiposConhecidos.includes(item.tipo));
  if (sobras.length > 0) {
    grupos.push({
      tipo: 'outros',
      titulo: t3('Outros', 'Other'),
      etiqueta: t3('Link', 'Link'),
      iconePadrao: LinkIcon,
      acento: 'text-gray-300',
      barra: 'bg-gray-400',
      borda: 'hover:border-gray-400/40',
      itens: sobras,
    });
  }

  return (
    <section id="links" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-900/40 via-gray-900/10 to-gray-900/50" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-emerald-500/5 blur-3xl" />

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

        <div className="mt-14 space-y-12">
          {grupos.map((grupo) => (
            <div key={grupo.tipo}>
              {/* Cabeçalho do bloco: a etiqueta do tipo distingue site,
                  repositório e documento antes mesmo da cor entrar em cena. */}
              <div className="flex items-baseline gap-4">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-400">
                  {p(grupo.titulo)}
                </h3>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${grupo.acento}`}
                >
                  {p(grupo.etiqueta)}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                <span className="font-mono text-[11px] text-gray-600">
                  {String(grupo.itens.length).padStart(2, '0')}
                </span>
              </div>

              <ul className="mt-4 border-t border-white/5">
                {grupo.itens.map((item) => {
                  const Icone = ICONES[item.icone] || grupo.iconePadrao;
                  const href = item.interno ? getPublicUrl(item.url) : item.url;
                  const externo = !item.interno;
                  const meta = grupo.tipo === 'repo' ? caminhoDoRepo(item.url) : item.url;

                  return (
                    <li key={item.id} className="border-b border-white/5">
                      <div
                        className={`group relative flex flex-col gap-3 border-l-2 border-transparent px-4 py-5 transition-colors sm:flex-row sm:items-center sm:gap-6 ${grupo.borda} hover:bg-white/[0.03]`}
                      >
                        {/* Acento que acende no hover — a linha inteira reage,
                            em vez de a sombra do card mudar */}
                        <span
                          aria-hidden="true"
                          className={`absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 transition-transform duration-200 group-hover:scale-y-100 ${grupo.barra}`}
                        />

                        <span
                          aria-hidden="true"
                          className={`flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03] ${grupo.acento}`}
                          style={{ borderRadius: 2 }}
                        >
                          <Icone size={18} />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <a
                              href={href}
                              target={externo ? '_blank' : undefined}
                              rel={externo ? 'noreferrer noopener' : undefined}
                              className="text-[15px] font-semibold text-white outline-none transition-colors hover:text-emerald-300 focus-visible:text-emerald-300 focus-visible:underline"
                            >
                              {/* Estica a área clicável para a linha inteira */}
                              <span className="absolute inset-0" aria-hidden="true" />
                              {p(item.rotulo)}
                            </a>
                            {grupo.aoVivo && (
                              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                                <Radio size={11} className="animate-pulse" aria-hidden="true" />
                                {p(grupo.titulo)}
                              </span>
                            )}
                          </div>
                          <p
                            className={`mt-0.5 truncate font-mono text-[11px] opacity-70 ${grupo.acento}`}
                          >
                            {meta}
                          </p>
                          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-gray-400">
                            {p(item.descricao)}
                          </p>
                        </div>

                        {/* Ações — z-10 para ficarem acima da área clicável da linha */}
                        <div className="relative z-10 flex shrink-0 items-center gap-2 self-start sm:self-center">
                          {grupo.documento && (
                            <a
                              href={href}
                              download
                              aria-label={`${p(CABECALHO.baixar)} ${item.url}`}
                              title={`${p(CABECALHO.baixar)} ${item.url}`}
                              className="flex h-9 items-center gap-2 border border-amber-400/30 bg-amber-400/5 px-3 text-[12px] font-medium text-amber-200 transition-colors hover:border-amber-400/60 hover:bg-amber-400/10"
                              style={{ borderRadius: 2 }}
                            >
                              <Download size={14} aria-hidden="true" />
                              <span className="hidden sm:inline">{p(CABECALHO.baixar)}</span>
                            </a>
                          )}

                          <motion.span
                            aria-hidden="true"
                            className="flex h-9 w-9 items-center justify-center text-gray-600 transition-colors group-hover:text-emerald-300"
                            whileHover={{ x: 2, y: -2 }}
                          >
                            <ArrowUpRight size={18} />
                          </motion.span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* E-mail: o único endereço que se copia em vez de se abrir */}
        <div className="mt-12 flex flex-col gap-4 border-l-2 border-emerald-500/60 bg-gray-900/40 px-6 py-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 bg-white/[0.03] text-emerald-300"
              style={{ borderRadius: 2 }}
            >
              <Mail size={18} />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/70">
                {p(CABECALHO.email)}
              </p>
              <a
                href={`mailto:${profile.links.email}`}
                className="mt-1 block break-all text-[15px] font-semibold text-white transition-colors hover:text-emerald-300"
              >
                {profile.links.email}
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => copiar('email', profile.links.email)}
            className="flex h-9 shrink-0 items-center gap-2 self-start border border-white/10 px-3 text-[12px] font-medium text-gray-300 transition-colors hover:border-emerald-400/50 hover:text-emerald-200 sm:self-auto"
            style={{ borderRadius: 2 }}
          >
            {copiado === 'email' ? <Check size={14} /> : <Copy size={14} />}
            {copiado === 'email' ? p(CABECALHO.copiado) : p(CABECALHO.copiar)}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LinksRapidos;
