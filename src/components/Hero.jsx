import React, { useEffect, useRef } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { Link } from 'react-scroll';
import { SpacemanCanvas } from ".";
import Position from "./Position";
import { getPublicUrl } from '../utils';

const Hero = ({ scrollContainer, mousePosition, language }) => {
  const heroRef = useRef(null);

  // O parallax é feito em CSS puro com `animation-timeline: scroll()`. Onde o
  // navegador não implementa scroll-driven animations, a declaração é descartada
  // inteira: a animação nunca recebe timeline e as camadas ficam paradas, sem
  // erro e sem aviso. Este efeito é o plano B, e só ele — em quem tem suporte
  // nativo, nada é importado e o bundle não cresce.
  useEffect(() => {
    const temScrollTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline: scroll()');
    const movimentoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (temScrollTimeline || movimentoReduzido) return;

    let ctx;
    let cancelado = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelado) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.utils.toArray('.parallax__layer').forEach((el) => {
          const velocidade = parseFloat(
            getComputedStyle(el).getPropertyValue('--parallax-speed')
          ) || 0;
          if (!velocidade) return;
          gsap.to(el, {
            // mesma conta do keyframe CSS: velocidade * 1vh
            y: () => (velocidade * window.innerHeight) / 100,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      }, heroRef);
    })();

    // revert() desfaz os ScrollTrigger no unmount. Sem isso eles vazam e
    // continuam disparando sobre nós que já saíram do DOM.
    return () => { cancelado = true; ctx?.revert(); };
  }, []);

  // Mesmas strings de antes, só extraídas do JSX para o ternário triplo sair
  // de dentro do markup.
  const rotulos = {
    'pt-BR': { projetos: 'Ver Projetos', contato: 'Contato' },
    'zh-CN': { projetos: '查看项目', contato: '联系我' },
    'en-US': { projetos: 'See Projects', contato: 'Contact Me' },
  };
  const t = rotulos[language] || rotulos['en-US'];

  return (
    <section ref={heroRef} id="home" className="parallax min-h-screen relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping"
          style={{
            transform: `translate(${mousePosition.x / 1.5}px, ${mousePosition.y / 1.5}px)`,
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-300"
          style={{
            transform: `translate(${-mousePosition.x / 2}px, ${-mousePosition.y / 2}px)`,
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-700"
          style={{
            transform: `translate(${-mousePosition.x / 3}px, ${mousePosition.y / 3}px)`,
          }}
        />
      </div>

      {/* Texto. Uma coluna só, sempre à esquerda: antes o nome ficava na coluna
          esquerda e "Desenvolvedor FullStack" na direita — exatamente onde o
          astronauta é renderizado. Com o texto todo de um lado, sobra metade da
          tela livre para o 3D e a colisão deixa de existir por construção.
          O z-index vive no index.css (.parallax__content), não aqui, para não
          disputar especificidade com os utilitários do Tailwind. */}
      <div className='parallax__layer parallax__content absolute inset-x-0 top-[13%] sm:top-[15%] lg:top-[21%] container mx-auto px-6 pointer-events-none'>
        <div className="hero__copy relative w-full lg:max-w-[54%] pointer-events-auto">
          <div className="mb-5 flex items-center gap-3" aria-hidden="true">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-emerald-400/80 to-transparent" />
          </div>

          <h1 className="hero__name">Davi Rezende</h1>

          <div className="hero__role">
            <Position language={language} />
          </div>

          {/* Os CTAs saíram do `absolute bottom-20 left-1/2` e entraram na
              própria coluna de texto: assim eles acompanham o bloco em qualquer
              largura e nunca caem por baixo do astronauta. */}
          <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to="projetos"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="group inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3.5 font-medium text-gray-950 transition-colors hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 cursor-pointer"
            >
              <span>{t.projetos}</span>
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
            </Link>
            <Link
              to="contato"
              spy={true}
              smooth={true}
              offset={-80}
              duration={500}
              className="inline-flex items-center gap-2 rounded-md border border-emerald-400/60 bg-gray-950/40 px-6 py-3.5 font-medium text-emerald-200 backdrop-blur-sm transition-colors hover:border-emerald-300 hover:bg-emerald-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 cursor-pointer"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              <span>{t.contato}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Camadas do parallax. A classe .parallax__layer é o que faz cada uma
          descer — e só elas a recebem: os pontos e o canvas do astronauta ficam
          de fora de propósito, senão perdem o próprio transform. */}
      <img className="parallax__layer parallax__stars" src={getPublicUrl("parallax/1Stars.svg")} alt="" aria-hidden="true" />
      <img className="parallax__layer parallax__planets" src={getPublicUrl("parallax/2Planets.svg")} alt="" aria-hidden="true" />
      <img className="parallax__layer parallax__mountain1" src={getPublicUrl("parallax/3Mountain.svg")} alt="" aria-hidden="true" />
      <img className="parallax__layer parallax__mountain2" src={getPublicUrl("parallax/4Mountain.svg")} alt="" aria-hidden="true" />
      <img className="parallax__layer parallax__crater" src={getPublicUrl("parallax/5Crater.svg")} alt="" aria-hidden="true" />
      <img className="parallax__layer parallax__sun" src={getPublicUrl("parallax/6Sun.svg")} alt="" aria-hidden="true" />

      {/* O astronauta ganhou área própria. Em >=1024px ele ocupa só a metade
          direita, que é onde o texto não está; abaixo disso desce para a faixa
          inferior, depois do bloco de texto. pointer-events-none garante que o
          canvas nunca roube o clique dos CTAs nem a seleção do nome. */}
      <div className="hero__spaceman pointer-events-none absolute inset-x-0 top-[47%] bottom-[7%] lg:top-0 lg:bottom-0 lg:left-[51%]">
        <SpacemanCanvas scrollContainer={scrollContainer} />
      </div>
    </section>
  );
};

export default Hero;
