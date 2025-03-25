import React from 'react';
import { FileCode, Code, Database, Terminal, Coffee, Download, Server, PenTool,Dumbbell } from 'lucide-react';

const AboutSection = ({ language = 'pt-BR' }) => {
  const technologies = [
    { name: 'Laravel', icon: '/images/Laravel.svg' },
    { name: 'React', icon: '/images/React.svg' },
    { name: 'MySQL', icon: '/images/Mysql.svg' },
    { name: 'Tailwind', icon: '/images/Tailwind.svg' },
    { name: 'Python', icon: '/images/Python.svg' },
    { name: 'PHP', icon: '/images/Php.svg' },
    { name: 'Vite', icon: '/images/Vitejs.svg' }
  ];

  const translations = {
    'pt-BR': {
      aboutMe: 'About Me',
      developer: 'developer',
      name: 'Nome',
      role: 'Role',
      country: 'País',
      seeking: 'Seeking',
      interests: 'Interesses',
      objectives: 'Objetivos',
      consoleLog: 'Além de codar, Sou um amante de um bom café, amo os meus 3 cachorros e sou apaixonado em desafiar o meu corpo com o esporte, o meu Objetivo um dia é completar uma maratona!',
      downloadResume: 'Baixar Currículo',
      techStack: 'Tech Stack',
      beyondCoding: 'Além da programação',
      coffeeEnthusiast: 'Um verdadeiro Entusiasta de café',
      sportsLover: 'Amante de Esportes como Musculação, Ciclismo e Corrida',
      musicAppreciator: 'Apreciador de uma Boa musica de preferência um Rock ou Rap',
      networkingEnthusiast: 'Ansioso por buscar novas experiências e fazer networking'
    },
    'en-US': {
      aboutMe: 'About Me',
      developer: 'developer',
      name: 'Name',
      role: 'Role',
      country: 'Country',
      seeking: 'Seeking',
      interests: 'Interests',
      objectives: 'Objectives',
      consoleLog: 'Besides coding, I am a lover of good coffee, I love my 3 dogs and I am passionate about challenging my body with sports, my goal one day is to complete a marathon!',
      downloadResume: 'Download Resume',
      techStack: 'Tech Stack',
      beyondCoding: 'Beyond Coding',
      coffeeEnthusiast: 'A true coffee enthusiast',
      sportsLover: 'Lover of sports like weight training, cycling and running',
      musicAppreciator: 'Appreciator of good music, preferably Rock or Rap',
      networkingEnthusiast: 'Eager to seek new experiences and network'
    },
    'zh-CN': {
      aboutMe: '关于我',
      developer: '开发者',
      name: '姓名',
      role: '角色',
      country: '国家',
      seeking: '寻找',
      interests: '兴趣',
      objectives: '目标',
      consoleLog: '除了编码，我还是一个好咖啡的爱好者，我爱我的三只狗，并且热衷于通过运动挑战我的身体，我的目标有一天是完成一场马拉松！',
      downloadResume: '下载简历',
      techStack: '技术栈',
      beyondCoding: '编码之外',
      coffeeEnthusiast: '一个真正的咖啡爱好者',
      sportsLover: '热爱运动，如举重、骑自行车和跑步',
      musicAppreciator: '喜欢好的音乐，最好是摇滚或说唱',
      networkingEnthusiast: '渴望寻求新的经验和交流'
    }
  };

  const t = translations[language] || translations['pt-BR'];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-emerald-900/10 to-gray-900/30" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-20 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <h2 className="text-4xl font-bold mb-16 flex items-center">
          <Terminal className="mr-2 text-emerald-400" />
          {t.aboutMe}
          <div className="ml-4 h-px flex-grow bg-gradient-to-r from-emerald-400/50 to-transparent" />
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Code terminal with about text */}
          <div className="relative">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border border-emerald-500/20 overflow-hidden">
              {/* Terminal header */}
              <div className="bg-gray-800 px-4 py-2 flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <div className="flex-1 text-center text-xs text-gray-400">about.js</div>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 font-mono text-sm">
                <div className="mb-4">
                  <span className="text-emerald-400">const</span> 
                  <span className="text-purple-400"> {t.developer}</span> 
                  <span className="text-white"> = {`{`}</span>
                </div>
                
                <div className="pl-4">
                  <span className="text-blue-300">{t.name}:</span> 
                  <span className="text-orange-300"> 'Davi Rezende'</span>,<br />
                  
                  <span className="text-blue-300">{t.role}:</span> 
                  <span className="text-orange-300"> 'FullStack Developer'</span>,<br />
                  
                  <span className="text-blue-300">{t.country}:</span> 
                  <span className="text-orange-300"> 'Brasil'</span>,<br />
                  
                  <span className="text-blue-300">{t.seeking}:</span> 
                  <span className="text-orange-300"></span>,<br />
                  
                  <span className="text-blue-300">{t.interests}:</span> [
                  <span className="text-orange-300">'Cafeina'</span>, 
                  <span className="text-orange-300">'Esporte'</span>, 
                  <span className="text-orange-300">'Música'</span>],<br />
                  
                  <span className="text-blue-300">{t.objectives}:</span> 
                  <span className="text-orange-300"> 'Crescer Profissionalmente'</span>,
                </div>
                
                <div className="text-white">{`}`};</div>
                
                <div className="mt-4">
                  <span className="text-emerald-400">console</span>.
                  <span className="text-yellow-300">log</span>(
                  <span className="text-orange-300">{t.consoleLog}</span>);
                </div>
              </div>
            </div>
            
            {/* Download resume button */}
            <a 
              href="/images/CV Dai Rezende Software Engineer En_us.pdf" 
              download
              className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg flex items-center justify-center transform hover:scale-105 transition-all w-full"
            >
              <Download className="mr-2" />
              <span>{t.downloadResume}</span>
            </a>
          </div>
          
          {/* Right column - Tech stack and illustration */}
          <div>
            {/* Tech stack header */}
            <div className="flex items-center mb-6">
              <Server className="text-emerald-400 mr-2" />
              <h3 className="text-2xl font-bold">{t.techStack}</h3>
            </div>
            
            {/* Tech icons */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 mb-10">
              {technologies.map((tech, index) => (
                <div 
                  key={index} 
                  className="group flex flex-col items-center p-4 bg-gray-800/50 rounded-lg border border-emerald-500/10 hover:border-emerald-500/30 transition-all hover:transform hover:scale-105"
                >
                  <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-12 h-12 mb-2 transition-all group-hover:scale-110" 
                  />
                  <span className="text-sm text-gray-300 group-hover:text-emerald-300">{tech.name}</span>
                </div>
              ))}
            </div>
            
            {/* Interests */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/10">
              <div className="flex items-center mb-4">
                <PenTool className="text-emerald-400 mr-2" />
                <h3 className="text-xl font-bold">{t.beyondCoding}</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Coffee className="text-emerald-400 flex-shrink-0" />
                  <span>{t.coffeeEnthusiast}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Dumbbell className="text-emerald-400 flex-shrink-0" />
                  <span>{t.sportsLover}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <PenTool className="text-emerald-400 flex-shrink-0" />
                  <span>{t.musicAppreciator}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FileCode className="text-emerald-400 flex-shrink-0" />
                  <span>{t.networkingEnthusiast}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;