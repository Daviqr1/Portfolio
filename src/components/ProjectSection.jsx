// ---------------------------------------------------------------------------
// ProjectsSection — a seção de projetos.
//
// O que mudou e por quê:
//
// * O array LOCAL de projetos foi APAGADO. Dois dos três projetos que ele
//   listava não eram do Davi, os números não vinham de medição (havia até
//   literal "NaN" na tela) e dois dos três caminhos de imagem não existiam no
//   repositório — os cards renderizavam o texto alternativo de uma imagem
//   quebrada. O conteúdo agora vem inteiro de `../data/projetos`, que é a
//   fonte auditada.
// * Este arquivo não afirma nada: ele apresenta. Todo número, nome, bullet e
//   link vem do dado. As únicas strings daqui são de interface ("ver
//   detalhes", "código privado"), que não fazem alegação alguma sobre a
//   carreira do Davi.
// * A leitura do dado tolera variação de nome de campo (pt e en) porque o
//   arquivo de dados é mantido por outra frente. Campo ausente some do card em
//   vez de virar placeholder ou número inventado.
// ---------------------------------------------------------------------------

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, FolderGit2 } from 'lucide-react';

import ProjectCard from './ProjectCard';
import * as projectData from '../data/projetos';

// ---------------------------------------------------------------------------
// Strings de interface. Nenhuma delas é conteúdo de currículo.
// ---------------------------------------------------------------------------

const UI = {
  'pt-BR': {
    heading: 'Projetos',
    count: (n) => `${n} ${n === 1 ? 'projeto' : 'projetos'}`,
    more: 'Outros projetos',
    viewDetails: 'Ver detalhes',
    hideDetails: 'Fechar',
    about: 'Sobre o projeto',
    measured: 'Números medidos',
    techStack: 'Stack',
    privateCode: 'Código privado',
    screenshots: 'capturas',
    kinds: {
      repo: 'Repositório',
      live: 'Ver no ar',
      article: 'Artigo',
      doc: 'Documentação',
      other: 'Abrir',
    },
  },
  'en-US': {
    heading: 'Projects',
    count: (n) => `${n} ${n === 1 ? 'project' : 'projects'}`,
    more: 'More projects',
    viewDetails: 'View details',
    hideDetails: 'Close',
    about: 'About the project',
    measured: 'Measured numbers',
    techStack: 'Stack',
    privateCode: 'private code',
    screenshots: 'screenshots',
    kinds: {
      repo: 'Repository',
      live: 'Live site',
      article: 'Article',
      doc: 'Docs',
      other: 'Open',
    },
  },
  'zh-CN': {
    heading: '项目',
    count: (n) => `${n} 个项目`,
    more: '其他项目',
    viewDetails: '查看详情',
    hideDetails: '关闭',
    about: '关于项目',
    measured: '实测数据',
    techStack: '技术栈',
    privateCode: '私有代码',
    screenshots: '截图',
    kinds: {
      repo: '代码仓库',
      live: '在线访问',
      article: '文章',
      doc: '文档',
      other: '打开',
    },
  },
};

const DEFAULT_LANGUAGE = 'pt-BR';

// ---------------------------------------------------------------------------
// Leitura tolerante do módulo de dados
// ---------------------------------------------------------------------------

const resolveProjectList = (mod) => {
  const candidates = [
    mod && mod.projetos,
    mod && mod.projects,
    mod && mod.default && mod.default.projetos,
    mod && mod.default && mod.default.projects,
    mod && mod.default,
  ];
  for (let i = 0; i < candidates.length; i += 1) {
    if (Array.isArray(candidates[i])) return candidates[i];
  }
  return [];
};

// Resolve campo traduzível: string, número ou { 'pt-BR': ..., 'en-US': ... }
const pick = (value, language) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map((item) => pick(item, language));
  if (typeof value === 'object') {
    if (value[language] !== undefined) return pick(value[language], language);
    if (value['pt-BR'] !== undefined) return pick(value['pt-BR'], language);
    if (value['en-US'] !== undefined) return pick(value['en-US'], language);
    return '';
  }
  return '';
};

// Primeiro campo definido entre vários apelidos possíveis.
const firstOf = (source, keys) => {
  for (let i = 0; i < keys.length; i += 1) {
    const value = source[keys[i]];
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return undefined;
};

const toArray = (value) => {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
};

// ---------------------------------------------------------------------------
// Links
//
// `tipo: 'privado'` nunca tem url — vira rótulo com cadeado, nunca um <a> que
// não leva a lugar nenhum. Era um dos pedidos explícitos.
// ---------------------------------------------------------------------------

const KIND_ALIASES = {
  repo: ['repo', 'repositorio', 'repositório', 'code', 'codigo', 'código', 'github', 'source', 'fonte', 'oss'],
  live: ['live', 'site', 'demo', 'app', 'producao', 'produção', 'platform', 'plataforma', 'online'],
  article: ['article', 'artigo', 'paper', 'post', 'blog', 'publicacao', 'publicação', 'writeup'],
  doc: ['doc', 'docs', 'documentacao', 'documentação', 'readme', 'arquivo'],
};

const PRIVATE_ALIASES = ['privado', 'private', 'proprietario', 'proprietário', 'proprietary', 'fechado'];

const kindOf = (rawKind, url = '') => {
  const key = String(rawKind || '').toLowerCase().trim();
  if (key) {
    const found = Object.keys(KIND_ALIASES).find(
      (name) => KIND_ALIASES[name].indexOf(key) !== -1
    );
    if (found) return found;
  }
  const href = String(url).toLowerCase();
  if (href.indexOf('github.com') !== -1 || href.indexOf('gitlab.com') !== -1) return 'repo';
  if (
    href.indexOf('medium.com') !== -1 ||
    href.indexOf('dev.to') !== -1 ||
    href.indexOf('/blog') !== -1 ||
    href.indexOf('/artigo') !== -1
  ) {
    return 'article';
  }
  if (href) return 'live';
  return 'other';
};

// Acima disto o rótulo do dado quebra a linha do card: mostra o rótulo curto e
// guarda o texto completo no title/aria-label e no painel de detalhe.
const SHORT_LABEL_MAX = 22;

const normalizeLinks = (raw, language, labels) => {
  const links = [];
  let privateNote = null;

  toArray(firstOf(raw, ['links', 'ligacoes', 'ligações'])).forEach((entry) => {
    if (!entry) return;

    if (typeof entry === 'string') {
      const kind = kindOf('', entry);
      links.push({
        url: entry,
        kind,
        label: labels.kinds[kind] || labels.kinds.other,
        title: labels.kinds[kind] || labels.kinds.other,
      });
      return;
    }

    const rawLabel = pick(
      firstOf(entry, ['rotulo', 'rótulo', 'label', 'texto', 'titulo', 'título', 'title']),
      language
    );
    const rawKind = String(
      firstOf(entry, ['tipo', 'kind', 'categoria', 'tipoLink']) || ''
    ).toLowerCase();
    const url = firstOf(entry, ['url', 'href', 'link', 'endereco', 'endereço']);

    if (PRIVATE_ALIASES.indexOf(rawKind) !== -1 || !url) {
      // Sem url não existe link: vira o rótulo "código privado".
      const full = rawLabel || labels.privateCode;
      privateNote = {
        full,
        short: full.length <= SHORT_LABEL_MAX ? full : labels.privateCode,
      };
      return;
    }

    const kind = kindOf(rawKind, url);
    const fallback = labels.kinds[kind] || labels.kinds.other;
    const full = rawLabel || fallback;
    links.push({
      url: String(url),
      kind,
      label: full.length <= SHORT_LABEL_MAX ? full : fallback,
      title: full,
    });
  });

  // Chaves diretas, caso o dado deixe de usar um array `links`.
  const singles = [
    { keys: ['repo', 'repositorio', 'repositório', 'github'], kind: 'repo' },
    { keys: ['site', 'live', 'demo', 'website'], kind: 'live' },
    { keys: ['artigo', 'article', 'paper', 'post'], kind: 'article' },
  ];
  singles.forEach((single) => {
    const value = firstOf(raw, single.keys);
    if (typeof value === 'string' && value.indexOf('http') === 0) {
      links.push({
        url: value,
        kind: single.kind,
        label: labels.kinds[single.kind],
        title: labels.kinds[single.kind],
      });
    }
  });

  const seen = {};
  const deduped = links.filter((link) => {
    if (seen[link.url]) return false;
    seen[link.url] = true;
    return true;
  });

  return { links: deduped, privateNote };
};

// ---------------------------------------------------------------------------
// Sigla da capa gerada
// ---------------------------------------------------------------------------

const STOPWORDS = [
  'de', 'da', 'do', 'das', 'dos', 'e', 'em', 'para', 'com', 'a', 'o', 'as', 'os',
  'of', 'the', 'and', 'for', 'in', 'to', 'on',
];

const monogramOf = (raw, title) => {
  const given = firstOf(raw, ['sigla', 'monograma', 'monogram']);
  if (typeof given === 'string' && given.length <= 18) return given.toUpperCase();

  const head = String(title || '')
    .split(/\s[—–-]\s|:/)[0]
    .trim();
  if (!head) return 'PROJ';
  if (head.length <= 18) return head.toUpperCase();

  const words = head.split(/\s+/);
  let out = words[0];
  if (
    words[1] &&
    STOPWORDS.indexOf(words[1].toLowerCase()) === -1 &&
    `${out} ${words[1]}`.length <= 18
  ) {
    out = `${out} ${words[1]}`;
  }
  return out.toUpperCase();
};

// ---------------------------------------------------------------------------
// Normalização de um projeto
// ---------------------------------------------------------------------------

const normalizeProject = (raw, index, language, labels) => {
  const title = pick(firstOf(raw, ['titulo', 'título', 'title', 'nome', 'name']), language);

  const coverCandidate = firstOf(raw, ['capa', 'cover']);
  const coverMeta = coverCandidate && typeof coverCandidate === 'object' ? coverCandidate : null;

  const imageSource = firstOf(raw, ['imagem', 'image', 'thumb', 'screenshot']);
  const image =
    typeof imageSource === 'string' && imageSource.length > 0
      ? {
          src: imageSource,
          alt:
            pick(firstOf(raw, ['imagemAlt', 'imageAlt', 'alt', 'altImagem']), language) ||
            `${title} — ${labels.screenshots}`,
        }
      : null;

  const gallery = toArray(
    firstOf(raw, ['galeria', 'gallery', 'capturas', 'screenshots', 'imagens'])
  )
    .map((shot, i) => {
      if (!shot) return null;
      if (typeof shot === 'string') {
        return { src: shot, alt: `${title} — ${labels.screenshots} ${i + 1}` };
      }
      const src = firstOf(shot, ['src', 'url', 'imagem', 'image']);
      if (typeof src !== 'string') return null;
      return {
        src,
        alt:
          pick(firstOf(shot, ['alt', 'altText', 'descricao', 'descrição', 'legenda']), language) ||
          `${title} — ${labels.screenshots} ${i + 1}`,
      };
    })
    .filter(Boolean);

  const stats = toArray(
    firstOf(raw, ['metricas', 'métricas', 'stats', 'numeros', 'números', 'indicadores'])
  )
    .map((stat) => {
      if (!stat || typeof stat !== 'object') return null;
      const value = pick(firstOf(stat, ['value', 'valor', 'numero', 'número']), language);
      if (!value) return null;
      return {
        value,
        label: pick(firstOf(stat, ['label', 'rotulo', 'rótulo', 'nome']), language),
        icon: firstOf(stat, ['icon', 'icone', 'ícone']) || 'activity',
      };
    })
    .filter(Boolean);

  const bullets = toArray(
    pick(toArray(firstOf(raw, ['destaques', 'bullets', 'pontos', 'highlights'])), language)
  )
    .map((item) => String(item).trim())
    .filter(Boolean);

  const description = pick(
    firstOf(raw, [
      'resumo',
      'descricao',
      'descrição',
      'description',
      'summary',
      'extendedDescription',
    ]),
    language
  );

  // `destaque` é booleano no dado atual. Se algum dia virar texto, ele deixa de
  // ser lido como sinalizador de hierarquia e passa a ser conteúdo.
  const destaque = raw.destaque;
  const featured =
    destaque === true || raw.featured === true || raw.principal === true;

  const highlightAliases = ['highlight', 'ponto', 'pontoChave', 'chave'];
  if (typeof destaque === 'string') highlightAliases.unshift('destaque');

  const { links, privateNote } = normalizeLinks(raw, language, labels);

  const tech = toArray(
    pick(toArray(firstOf(raw, ['stack', 'tech', 'tecnologias', 'techs'])), language)
  ).filter(Boolean);

  return {
    id: String(firstOf(raw, ['id', 'slug', 'chave']) || `projeto-${index}`),
    title,
    subtitle: pick(firstOf(raw, ['subtitulo', 'subtítulo', 'subtitle', 'linha']), language),
    role: pick(firstOf(raw, ['papel', 'role', 'cargo', 'funcao', 'função']), language),
    period: pick(firstOf(raw, ['periodo', 'período', 'period', 'data', 'ano']), language),
    authorship: pick(firstOf(raw, ['autoria', 'authorship', 'commits']), language),
    description,
    bullets,
    highlight: pick(firstOf(raw, highlightAliases), language),
    impact: pick(firstOf(raw, ['impacto', 'impact', 'resultado']), language),
    tech,
    links,
    privateNote,
    stats,
    gallery,
    image,
    featured,
    accent:
      (coverMeta && (coverMeta.acento || coverMeta.accent)) ||
      firstOf(raw, ['acento', 'accent', 'cor', 'color']) ||
      null,
    icon:
      (coverMeta && (coverMeta.icone || coverMeta.icon)) ||
      firstOf(raw, ['icone', 'ícone', 'icon']) ||
      null,
    coverLabel: pick(
      (coverMeta && (coverMeta.etiqueta || coverMeta.label)) ||
        firstOf(raw, ['etiqueta', 'coverLabel']),
      language
    ),
    monogram: monogramOf(raw, title),
  };
};

// ---------------------------------------------------------------------------
// Seção
// ---------------------------------------------------------------------------

const ProjectsSection = ({ language }) => {
  const lang = UI[language] ? language : DEFAULT_LANGUAGE;
  const labels = UI[lang];
  const [expandedId, setExpandedId] = useState(null);

  const projects = useMemo(() => {
    const list = resolveProjectList(projectData)
      .filter(Boolean)
      .map((raw, index) => normalizeProject(raw, index, lang, labels))
      .filter((project) => project.title);

    // Se o dado não marcar destaque em ninguém, os três primeiros assumem o
    // papel — a grade nunca cai numa fileira plana sem hierarquia.
    if (list.length > 0 && !list.some((project) => project.featured)) {
      return list.map((project, index) => ({ ...project, featured: index < 3 }));
    }
    return list;
  }, [lang, labels]);

  if (projects.length === 0) return null;

  const featured = projects.filter((project) => project.featured);
  const secondary = projects.filter((project) => !project.featured);

  const toggle = (id) => setExpandedId((current) => (current === id ? null : id));

  return (
    <section id="projetos" className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-emerald-900/10 to-gray-900/0" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-48 w-48 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/5 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-6">
        <header className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h2 className="flex items-center text-3xl font-bold text-gray-50 sm:text-4xl">
            <Code2 className="mr-3 h-7 w-7 text-emerald-400" strokeWidth={1.75} />
            {labels.heading}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-emerald-400/40 to-transparent" />
          <span className="inline-flex items-center gap-1.5 rounded-sm border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-300/90">
            <FolderGit2 className="h-3.5 w-3.5" strokeWidth={1.75} />
            {labels.count(projects.length)}
          </span>
        </header>

        {featured.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45 }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {featured.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="featured"
                index={index}
                expanded={expandedId === project.id}
                onToggle={() => toggle(project.id)}
                labels={labels}
              />
            ))}
          </motion.div>
        )}

        {secondary.length > 0 && (
          <>
            <div className="mb-5 mt-12 flex items-center gap-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gray-500">
                {labels.more}
              </span>
              <div className="h-px flex-1 bg-white/[0.07]" />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {secondary.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  variant="compact"
                  index={featured.length + index}
                  expanded={expandedId === project.id}
                  onToggle={() => toggle(project.id)}
                  labels={labels}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
