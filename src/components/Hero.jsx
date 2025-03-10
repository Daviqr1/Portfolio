import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-scroll';
import { SpacemanCanvas } from ".";
import Position from "./Position";

const Hero = ({ scrollContainer, mousePosition, language }) => {
  return (
    <section id="home" className="parallax min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping" 
          style={{
            transform: `translate(${mousePosition.x/1.5}px, ${mousePosition.y/1.5}px)`,
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-300"
          style={{
            transform: `translate(${-mousePosition.x/2}px, ${-mousePosition.y/2}px)`,
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-700"
          style={{
            transform: `translate(${-mousePosition.x/3}px, ${mousePosition.y/3}px)`,
          }}
        />
      </div>
      
      <div className='parallax__content absolute top-[10%] sm:top-[16%] lg:top-[24%] w-full mx-auto lg:pl-[38vh] lg:pr-[30vh] xl:pl-96 xl:pr-72 2xl:px-40 3xl:px-60 flex flex-col lg:flex-row items-start z-10'>
        <div className="flex-1 lg:mb-0">
          <Sparkles className="text-emerald-400 w-12 h-12 mb-6 animate-pulse" />
          <h1 className='font-medium text-[40px] xs:text-[50px] sm:text-[68px] md:text-[80px] lg:text-[100px] 2xl:text-[180px] leading-[110px] 2xl:leading-[160px] bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent'>
            Davi Rezende
          </h1>
          <Position language={language} />
        </div>
        <div className="flex-1 flex justify-start lg:justify-end mt-4 sm:mt-14 ml-8 xs:ml-[-4vh] sm:ml-[-17vh] md:ml-[-26vh] lg:mt-10 2xl:mt-0">
          <div className='font-bold text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[46px] sm:leading-[40px] md:leading-[50px] 2xl:leading-[60px] streaky-glow max-w-sm 2xl:max-w-lg text-white text-left'>
            {language === 'pt-BR' ? 'Desenvolvedor\nFullStack' : 
             language === 'zh-CN' ? '全栈\n开发者' : 
             'FullStack\nDeveloper'}
          </div>
        </div>
      </div>

      <div className="flex gap-4 absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <Link
          to="projetos"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-lg flex items-center transform hover:scale-105 transition-all cursor-pointer"
        >
          <span className="mr-2">🚀</span>
          <span>
            {language === 'pt-BR' ? 'Ver Projetos' : 
             language === 'zh-CN' ? '查看项目' : 
             'See Projects'}
          </span>
        </Link>
        <Link
          to="contato"
          spy={true}
          smooth={true}
          offset={-80}
          duration={500}
          className="border border-emerald-500 hover:bg-emerald-500/10 px-8 py-4 rounded-lg flex items-center transform hover:scale-105 transition-all cursor-pointer"
        >
          <span className="mr-2">💬</span>
          <span>
            {language === 'pt-BR' ? 'Contato' : 
             language === 'zh-CN' ? '联系我' : 
             'Contact Me'}
          </span>
        </Link>
      </div>

      {/* Parallax Images */}
      <img className="parallax__stars" src="/parallax/1Stars.svg" alt="" />
      <img className="parallax__planets" src="/parallax/2Planets.svg" alt="" />
      <img className="parallax__mountain1" src="/parallax/3Mountain.svg" alt="" />
      <img className="parallax__mountain2" src="/parallax/4Mountain.svg" alt="" />
      <img className="parallax__crater" src="/parallax/5Crater.svg" alt="" />
      <img className="parallax__sun" src="/parallax/6Sun.svg" alt="" />

      <SpacemanCanvas scrollContainer={scrollContainer} />
    </section>
  );
};

export default Hero;
