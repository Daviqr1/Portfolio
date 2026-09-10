// ---------------------------------------------------------------------------
// ProjectCard — apresentação pura de um projeto já normalizado.
//
// Regras que este arquivo respeita, e que motivaram a reescrita:
//
// 1. NENHUM <img> aponta para arquivo que pode não existir. Quando não há
//    captura real, a capa é gerada em CSS/SVG a partir do próprio projeto
//    (acento, sigla, etiqueta de stack). E mesmo quando há captura, um erro de
//    carregamento cai para a capa gerada — nunca sobra o retângulo com o texto
//    alternativo, que é exatamente o defeito reclamado.
// 2. Duas variantes com tratamento visual DIFERENTE: `featured` (capa larga,
//    raio maior, faixa de acento no topo, brilho no hover) e `compact` (sem
//    capa, selo quadrado, hairline sem sombra, stack em uma linha
//    monoespaçada). Hierarquia é estrutural, não é a mesma sombra em tudo.
// 3. Zero emoji. Todo ícone vem do lucide-react.
// 4. Só o botão de detalhes alterna o painel — nada de <div onClick> — com
//    aria-expanded/aria-controls e anel de foco visível no teclado.
// 5. O card não afirma nada por conta própria: título, número, bullet, link e
//    rótulo vêm inteiros de src/data/projetos.js.
// ---------------------------------------------------------------------------

import React, { useId, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Award,
  BarChart3,
  Brain,
  CheckCheck,
  ChevronDown,
  Clock,
  Code2,
  Compass,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Gauge,
  GitBranch,
  GitMerge,
  Github,
  Globe,
  Image as ImageIcon,
  Layers,
  Lock,
  Network,
  PenTool,
  Radio,
  Satellite,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Acentos
// ---------------------------------------------------------------------------

const ACCENTS = {
  emerald: [52, 211, 153],
  green: [74, 222, 128],
  teal: [45, 212, 191],
  lime: [163, 230, 53],
  cyan: [34, 211, 238],
  sky: [56, 189, 248],
  indigo: [129, 140, 248],
  violet: [167, 139, 250],
  amber: [251, 191, 36],
  rose: [251, 113, 133],
};

// Pool de fallback: só o que combina com o verde esmeralda do resto do site.
const FALLBACK_ACCENTS = ['emerald', 'teal', 'cyan', 'green', 'sky', 'indigo'];

export const rgba = (triplet, alpha) =>
  `rgba(${triplet[0]}, ${triplet[1]}, ${triplet[2]}, ${alpha})`;

export const hashString = (value = '') => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
};

export const accentOf = (name, seed = '') => {
  if (name && ACCENTS[name]) return ACCENTS[name];
  return ACCENTS[FALLBACK_ACCENTS[hashString(seed) % FALLBACK_ACCENTS.length]];
};

// ---------------------------------------------------------------------------
// Ícones por nome — os dados guardam string, não JSX, e continuam serializáveis
// ---------------------------------------------------------------------------

const ICONS = {
  activity: Activity,
  award: Award,
  brain: Brain,
  chart: BarChart3,
  check: CheckCheck,
  clock: Clock,
  code: Code2,
  compass: Compass,
  cpu: Cpu,
  database: Database,
  gauge: Gauge,
  git: GitBranch,
  'git-branch': GitBranch,
  'git-merge': GitMerge,
  globe: Globe,
  layers: Layers,
  lock: Lock,
  network: Network,
  pen: PenTool,
  radio: Radio,
  satellite: Satellite,
  server: Server,
  shield: ShieldCheck,
  sparkles: Sparkles,
  terminal: Terminal,
  users: Users,
  wrench: Wrench,
  zap: Zap,
};

export const iconFor = (name, fallback = Code2) => ICONS[name] || fallback;

// ---------------------------------------------------------------------------
// Utilitários
// ---------------------------------------------------------------------------

// Tailwind 3.2 não traz line-clamp no core (entrou no 3.3), então o clamp vai
// em style inline — funciona sem depender de plugin.
const clampLines = (lines) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});

const ghostFontSize = (text = '') => {
  const n = text.length;
  if (n <= 4) return '5rem';
  if (n <= 7) return '3.75rem';
  if (n <= 10) return '2.9rem';
  if (n <= 14) return '2.2rem';
  if (n <= 18) return '1.8rem';
  return '1.5rem';
};

const FOCUS_RING =
  'focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050a09]';

// ---------------------------------------------------------------------------
// Capa gerada — sem arquivo, sem 404, sem licença de terceiro.
// Grade de blueprint + anéis de órbita + constelação determinística + a sigla
// do projeto em marca-d'água. Cada projeto recebe um acento e uma etiqueta
// diferentes, então oito capas geradas não saem iguais.
// ---------------------------------------------------------------------------

export function GeneratedCover({
  accent,
  ghost = '',
  label = '',
  Icon,
  seed = '',
  dense = false,
  className = '',
}) {
  const rawId = useId();
  const gridId = `cover-grid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const h = hashString(seed || ghost);

  // Três pontos em posições estáveis por projeto — a mesma capa sempre.
  const dots = [
    { top: 12 + (h % 26), left: 58 + (h % 17) },
    { top: 34 + ((h >> 3) % 30), left: 74 + ((h >> 2) % 14) },
    { top: 60 + ((h >> 5) % 22), left: 46 + ((h >> 4) % 20) },
  ];

  return (
    <div
      aria-hidden="true"
      className={`relative isolate h-full w-full overflow-hidden ${className}`}
      style={{
        backgroundColor: '#050a09',
        backgroundImage: `radial-gradient(120% 110% at 18% 0%, ${rgba(
          accent,
          0.26
        )} 0%, rgba(5,10,9,0) 62%), linear-gradient(155deg, #06100e 0%, #04070a 100%)`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full" focusable="false">
        <defs>
          <pattern
            id={gridId}
            width={dense ? 12 : 26}
            height={dense ? 12 : 26}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={dense ? 'M12 0H0V12' : 'M26 0H0V26'}
              fill="none"
              stroke={rgba(accent, 0.14)}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>

      {!dense && (
        <>
          <span
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border transition-transform duration-700 group-hover:translate-x-2 group-hover:-translate-y-1"
            style={{ borderColor: rgba(accent, 0.18) }}
          />
          <span
            className="pointer-events-none absolute -right-6 top-8 h-28 w-28 rounded-full border transition-transform duration-700 group-hover:-translate-x-2"
            style={{ borderColor: rgba(accent, 0.12) }}
          />
          {dots.map((dot, i) => (
            <span
              key={i}
              className="pointer-events-none absolute rounded-full"
              style={{
                top: `${dot.top}%`,
                left: `${dot.left}%`,
                height: i === 0 ? 5 : 3,
                width: i === 0 ? 5 : 3,
                backgroundColor: rgba(accent, i === 0 ? 0.8 : 0.4),
              }}
            />
          ))}
        </>
      )}

      {dense ? (
        <span
          className="absolute inset-0 flex items-center justify-center font-black uppercase leading-none"
          style={{
            color: rgba(accent, 0.85),
            fontSize: '0.85rem',
            letterSpacing: '0.02em',
          }}
        >
          {/* O ícone do projeto lê melhor que três letras num quadrado de 64px;
              as letras ficam como reserva quando o dado não traz ícone. */}
          {Icon ? (
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            ghost.replace(/[^A-Za-z0-9]/g, '').slice(0, 3)
          )}
        </span>
      ) : (
        <span
          className="pointer-events-none absolute -bottom-1 left-3 right-3 truncate font-black uppercase leading-none"
          style={{
            color: rgba(accent, 0.3),
            fontSize: ghostFontSize(ghost),
            letterSpacing: '-0.03em',
          }}
        >
          {ghost}
        </span>
      )}

      {!dense && label && (
        <span
          className="absolute left-3 top-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 truncate rounded-sm border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
          style={{
            borderColor: rgba(accent, 0.3),
            color: rgba(accent, 0.95),
            backgroundColor: 'rgba(3, 7, 6, 0.6)',
          }}
        >
          {Icon && <Icon className="h-3 w-3 shrink-0" strokeWidth={1.75} />}
          <span className="truncate">{label}</span>
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Imagem com rede de segurança: erro de carregamento cai para a capa gerada.
// ---------------------------------------------------------------------------

function SafeImage({ src, alt, className, fallback, ...rest }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return fallback || null;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

// ---------------------------------------------------------------------------
// Links — sempre visíveis, ícone do lucide, rótulo curto e title completo.
// `privateNote` substitui o link morto por um rótulo honesto.
// ---------------------------------------------------------------------------

const LINK_ICONS = {
  repo: Github,
  live: ExternalLink,
  article: FileText,
  doc: FileText,
};

function ProjectLinks({ links, privateNote, labels, accent, size = 'md', full = false }) {
  const list = links || [];
  if (list.length === 0 && !privateNote) return null;

  const pad = size === 'sm' ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs';
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <div className="flex flex-wrap items-center gap-2">
      {list.map((link, i) => {
        const Icon = LINK_ICONS[link.kind] || ArrowUpRight;
        const primary = link.kind === 'live';
        return (
          <a
            key={`${link.url}-${i}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.title || link.label}
            title={link.title || link.label}
            className={`inline-flex items-center gap-1.5 rounded-sm border font-medium transition-colors ${pad} ${FOCUS_RING} ${
              primary
                ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20 hover:text-emerald-100'
                : 'border-white/10 bg-white/[0.03] text-gray-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white'
            }`}
            style={primary && accent ? { borderColor: rgba(accent, 0.45) } : undefined}
          >
            <Icon className={`${iconSize} shrink-0`} strokeWidth={1.75} />
            {full ? link.title || link.label : link.label}
          </a>
        );
      })}

      {privateNote && (
        <span
          className={`inline-flex items-center gap-1.5 rounded-sm border border-dashed border-white/10 font-medium text-gray-500 ${pad}`}
          title={privateNote.full}
        >
          <Lock className={`${iconSize} shrink-0`} strokeWidth={1.75} />
          {full ? privateNote.full : privateNote.short || labels.privateCode}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stack
// ---------------------------------------------------------------------------

function TechChips({ tech, max, accent }) {
  if (!tech || tech.length === 0) return null;
  const shown = max ? tech.slice(0, max) : tech;
  const rest = tech.length - shown.length;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <li
          key={item}
          className="rounded-sm border px-2 py-0.5 font-mono text-[11px] leading-5 text-gray-300"
          style={{
            borderColor: rgba(accent, 0.22),
            backgroundColor: rgba(accent, 0.06),
          }}
        >
          {item}
        </li>
      ))}
      {rest > 0 && (
        <li className="rounded-sm border border-white/10 px-2 py-0.5 font-mono text-[11px] leading-5 text-gray-500">
          +{rest}
        </li>
      )}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Bullets medidos — o conteúdo mais forte do card, então ele fica visível
// no card fechado, não escondido atrás do clique.
// ---------------------------------------------------------------------------

function BulletList({ items, accent, max, clamp }) {
  if (!items || items.length === 0) return null;
  const shown = max ? items.slice(0, max) : items;

  return (
    <ul className="space-y-2">
      {shown.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span
            className="mt-[7px] h-1 w-1 shrink-0 rounded-full"
            style={{ backgroundColor: rgba(accent, 0.9) }}
          />
          <span
            className="text-[13px] leading-relaxed text-gray-300"
            style={clamp ? clampLines(clamp) : undefined}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ---------------------------------------------------------------------------
// Autoria medida — badge, porque é o número que sustenta o card
// ---------------------------------------------------------------------------

function AuthorshipBadge({ value, accent }) {
  if (!value) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 self-start rounded-sm border px-2 py-1 font-mono text-[11px] tabular-nums"
      style={{
        borderColor: rgba(accent, 0.3),
        color: rgba(accent, 0.95),
        backgroundColor: rgba(accent, 0.07),
      }}
    >
      <GitBranch className="h-3 w-3 shrink-0" strokeWidth={1.75} />
      {value}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Métricas — só renderiza se o dado trouxer; hoje `projetos.js` não traz.
// ---------------------------------------------------------------------------

function StatStrip({ stats, accent }) {
  if (!stats || stats.length === 0) return null;
  const shown = stats.slice(0, 3);

  return (
    <dl
      className="grid divide-x divide-white/[0.06] overflow-hidden rounded-md border border-white/[0.07] bg-white/[0.02]"
      style={{ gridTemplateColumns: `repeat(${shown.length}, minmax(0, 1fr))` }}
    >
      {shown.map((stat, i) => {
        const Icon = iconFor(stat.icon, Activity);
        return (
          <div key={`${stat.label}-${i}`} className="px-3 py-2.5">
            <dt className="flex items-center gap-1.5 text-[10px] uppercase leading-4 tracking-[0.12em] text-gray-500">
              <Icon
                className="h-3 w-3 shrink-0"
                strokeWidth={1.75}
                style={{ color: rgba(accent, 0.9) }}
              />
              <span className="truncate">{stat.label}</span>
            </dt>
            <dd
              className="mt-1 font-mono text-sm font-semibold tabular-nums"
              style={{ color: rgba(accent, 1) }}
            >
              {stat.value}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

// ---------------------------------------------------------------------------
// Painel de detalhe — a prévia sem sair da página
// ---------------------------------------------------------------------------

function ProjectDetail({ project, labels, accent, detailId, variant }) {
  const gallery = project.gallery || [];

  return (
    <div id={detailId} className="border-t border-white/[0.07] px-5 pb-5 pt-5">
      {gallery.length > 0 && (
        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {gallery.map((shot, i) => (
            <figure
              key={`${shot.src}-${i}`}
              className={`overflow-hidden rounded-md border border-white/[0.08] bg-black/40 ${
                i === 0 ? 'col-span-2 sm:col-span-3' : ''
              }`}
            >
              <SafeImage
                src={shot.src}
                alt={shot.alt}
                className={`w-full object-cover ${i === 0 ? 'h-52 sm:h-72' : 'h-28 sm:h-36'}`}
                fallback={null}
              />
            </figure>
          ))}
        </div>
      )}

      {project.description && (
        <div className="mb-5">
          <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
            {labels.about}
          </h4>
          <div className="space-y-3">
            {project.description.split('\n\n').map((paragraph, i) => (
              <p key={i} className="max-w-3xl text-sm leading-relaxed text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      )}

      {project.bullets.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
            {labels.measured}
          </h4>
          <BulletList items={project.bullets} accent={accent} />
        </div>
      )}

      {(project.highlight || project.impact) && (
        <div className="mb-5 grid gap-2 sm:grid-cols-2">
          {project.highlight && (
            <div className="flex items-start gap-2.5 rounded-md border border-white/[0.07] bg-white/[0.02] p-3">
              <Zap
                className="mt-0.5 h-4 w-4 shrink-0"
                strokeWidth={1.75}
                style={{ color: rgba(accent, 0.95) }}
              />
              <span className="text-[13px] leading-relaxed text-gray-300">
                {project.highlight}
              </span>
            </div>
          )}
          {project.impact && (
            <div className="flex items-start gap-2.5 rounded-md border border-white/[0.07] bg-white/[0.02] p-3">
              <Award
                className="mt-0.5 h-4 w-4 shrink-0"
                strokeWidth={1.75}
                style={{ color: rgba(accent, 0.95) }}
              />
              <span className="text-[13px] leading-relaxed text-gray-300">
                {project.impact}
              </span>
            </div>
          )}
        </div>
      )}

      {/* O card de destaque já mostra a faixa de métricas no corpo; só o
          compacto precisa dela aqui, para não repetir o mesmo bloco. */}
      {variant === 'compact' && project.stats.length > 0 && (
        <div className="mb-5">
          <StatStrip stats={project.stats} accent={accent} />
        </div>
      )}

      {project.tech.length > 0 && (
        <div className="mb-5">
          <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-500">
            {labels.techStack}
          </h4>
          <TechChips tech={project.tech} accent={accent} />
        </div>
      )}

      {/* No detalhe os links usam o rótulo completo do dado; no card fechado
          usam o curto, para a linha não quebrar. */}
      <ProjectLinks
        links={project.links}
        privateNote={project.privateNote}
        labels={labels}
        accent={accent}
        full
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

export default function ProjectCard({
  project,
  variant = 'featured',
  index = 0,
  expanded = false,
  onToggle,
  labels,
}) {
  const reduceMotion = useReducedMotion();
  const accent = accentOf(project.accent, project.id || project.title);
  const Icon = iconFor(project.icon, variant === 'featured' ? Layers : Code2);
  const detailId = `project-detail-${project.id}`;
  const indexLabel = String(index + 1).padStart(2, '0');
  const shots = (project.gallery || []).length;

  const toggleButton = (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={detailId}
      className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-400/10 hover:text-emerald-200 ${FOCUS_RING}`}
    >
      {expanded ? labels.hideDetails : labels.viewDetails}
      <ChevronDown
        className={`h-3.5 w-3.5 transition-transform duration-300 ${
          expanded ? 'rotate-180' : ''
        }`}
        strokeWidth={2}
      />
    </button>
  );

  const detailPanel = (
    <AnimatePresence initial={false}>
      {expanded && (
        <motion.div
          key="detail"
          initial={reduceMotion ? false : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <ProjectDetail
            project={project}
            labels={labels}
            accent={accent}
            detailId={detailId}
            variant={variant}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  // -------------------------------------------------------------------------
  // Variante compacta — hairline, sem capa larga, sem sombra
  // -------------------------------------------------------------------------
  if (variant === 'compact') {
    return (
      <motion.article
        layout={!reduceMotion}
        className={`group relative flex flex-col rounded-md border border-white/[0.07] bg-white/[0.015] transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.035] focus-within:border-emerald-400/40 ${
          expanded ? 'md:col-span-2' : ''
        }`}
      >
        <div className="flex gap-4 p-4">
          {/* Com captura real o quadro é maior e em 3:2, porque um recorte de
              48px de um dashboard não mostra nada. Sem captura, o selo
              quadrado com o ícone do projeto. */}
          <div
            className={`relative shrink-0 overflow-hidden rounded border border-white/10 ${
              project.image ? 'h-16 w-24' : 'h-14 w-14'
            }`}
          >
            <SafeImage
              src={project.image ? project.image.src : null}
              alt={project.image ? project.image.alt : project.title}
              className="h-full w-full object-cover"
              fallback={
                <GeneratedCover
                  accent={accent}
                  ghost={project.monogram}
                  Icon={Icon}
                  seed={project.id}
                  dense
                />
              }
            />
            {shots > 0 && (
              <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-black/70 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-gray-300">
                <ImageIcon className="h-2.5 w-2.5" strokeWidth={1.75} />
                {shots}
              </span>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-semibold leading-snug text-gray-100">
                {project.title}
              </h3>
              <span className="mt-0.5 shrink-0 font-mono text-[10px] tracking-[0.14em] text-white/25">
                {indexLabel}
              </span>
            </div>

            {(project.role || project.period) && (
              <p
                className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ color: rgba(accent, 0.85) }}
              >
                {[project.role, project.period].filter(Boolean).join('  /  ')}
              </p>
            )}

            {project.subtitle && (
              <p
                className="mt-2 text-[13px] leading-relaxed text-gray-400"
                style={clampLines(2)}
              >
                {project.subtitle}
              </p>
            )}

            {project.authorship && (
              <p
                className="mt-2 font-mono text-[11px] tabular-nums"
                style={{ color: rgba(accent, 0.9) }}
              >
                {project.authorship}
              </p>
            )}

            {project.tech.length > 0 && (
              <p className="mt-1 truncate font-mono text-[11px] text-gray-500">
                {project.tech.slice(0, 4).join(' · ')}
                {project.tech.length > 4 ? ` · +${project.tech.length - 4}` : ''}
              </p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {!expanded && (
                <ProjectLinks
                  links={project.links}
                  privateNote={project.privateNote}
                  labels={labels}
                  accent={accent}
                  size="sm"
                />
              )}
              {toggleButton}
            </div>
          </div>
        </div>

        {detailPanel}
      </motion.article>
    );
  }

  // -------------------------------------------------------------------------
  // Variante de destaque
  // -------------------------------------------------------------------------
  return (
    <motion.article
      layout={!reduceMotion}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-emerald-400/10 bg-[#070d0c]/90 transition-colors duration-300 hover:border-emerald-400/30 hover:shadow-[0_0_0_1px_rgba(52,211,153,0.08),0_18px_40px_-24px_rgba(52,211,153,0.45)] focus-within:border-emerald-400/40 ${
        expanded ? 'md:col-span-2 xl:col-span-3' : ''
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${rgba(
            accent,
            0.75
          )} 50%, transparent 100%)`,
        }}
      />

      <div className="relative h-36 shrink-0 overflow-hidden sm:h-40">
        <SafeImage
          src={project.image ? project.image.src : null}
          alt={project.image ? project.image.alt : project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          fallback={
            <GeneratedCover
              accent={accent}
              ghost={project.monogram}
              label={project.coverLabel}
              Icon={Icon}
              seed={project.id}
            />
          }
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070d0c] via-[#070d0c]/25 to-transparent" />

        <span className="absolute right-3 top-3 font-mono text-[10px] tracking-[0.2em] text-white/35">
          {indexLabel}
        </span>

        {shots > 0 && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-sm border border-white/10 bg-black/60 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-300">
            <ImageIcon className="h-3 w-3" strokeWidth={1.75} />
            {shots} {labels.screenshots}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <header>
          {/* Fluxo inline (não flex) de propósito: com papel longo — "Prestador
              de serviço — engenheiro de software" — o flex jogava o ícone
              sozinho numa linha e quebrava o bloco em três. Inline, o ícone
              acompanha a primeira palavra e a quebra fica natural. */}
          <div className="font-mono text-[10px] uppercase leading-4 tracking-[0.16em]">
            <span style={{ color: rgba(accent, 0.95) }}>
              <Icon
                className="mr-1.5 inline h-3.5 w-3.5 align-[-3px]"
                strokeWidth={1.75}
              />
              {project.role}
            </span>
            {project.role && project.period && (
              <span className="mx-1.5 text-white/20">/</span>
            )}
            {project.period && <span className="text-gray-400">{project.period}</span>}
          </div>

          <h3 className="mt-2 text-xl font-semibold leading-tight text-gray-50">
            {project.title}
          </h3>

          {project.subtitle && (
            <p
              className="mt-1.5 text-sm leading-relaxed text-gray-400"
              style={expanded ? undefined : clampLines(3)}
            >
              {project.subtitle}
            </p>
          )}
        </header>

        <AuthorshipBadge value={project.authorship} accent={accent} />

        <StatStrip stats={project.stats} accent={accent} />

        {/* Aberto, os bullets completos vivem no painel de detalhe — aqui
            ficariam duplicados. */}
        <BulletList
          items={expanded ? [] : project.bullets}
          accent={accent}
          max={2}
          clamp={3}
        />

        <TechChips tech={project.tech} max={5} accent={accent} />

        {/* Aberto, o painel de detalhe repete os links com o rótulo completo:
            aqui eles sairiam duplicados na mesma tela. */}
        <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
          {!expanded && (
            <ProjectLinks
              links={project.links}
              privateNote={project.privateNote}
              labels={labels}
              accent={accent}
              size="sm"
            />
          )}
          <div className={expanded ? 'ml-auto' : ''}>{toggleButton}</div>
        </footer>
      </div>

      {detailPanel}
    </motion.article>
  );
}
