import React from 'react';
import { FileCode, Code, Database, Terminal, Coffee, Download, Server, PenTool, Cat } from 'lucide-react';

const AboutSection = () => {
  const technologies = [
    { name: 'Laravel', icon: '/images/Laravel.svg' },
    { name: 'React', icon: '/images/React.svg' },
    { name: 'MySQL', icon: '/images/Mysql.svg' },
    { name: 'Tailwind', icon: '/images/Tailwind.svg' },
    { name: 'Python', icon: '/images/Python.svg' },
    { name: 'PHP', icon: '/images/Php.svg' },
    { name: 'Vite', icon: '/images/Vitejs.svg' }
  ];

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
          About Me
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
                  <span className="text-purple-400"> developer</span> 
                  <span className="text-white"> = {`{`}</span>
                </div>
                
                <div className="pl-4">
                  <span className="text-blue-300">name:</span> 
                  <span className="text-orange-300"> 'Davi Rezende'</span>,<br />
                  
                  <span className="text-blue-300">role:</span> 
                  <span className="text-orange-300"> 'Software Developer'</span>,<br />
                  
                  <span className="text-blue-300">location:</span> 
                  <span className="text-orange-300"> 'Brazil'</span>,<br />
                  
                  <span className="text-blue-300">seeking:</span> 
                  <span className="text-orange-300"> 'First international opportunity'</span>,<br />
                  
                  <span className="text-blue-300">interests:</span> [
                  <span className="text-orange-300">'Coffee'</span>, 
                  <span className="text-orange-300">'Cats'</span>, 
                  <span className="text-orange-300">'Art'</span>],<br />
                  
                  <span className="text-blue-300">goals:</span> 
                  <span className="text-orange-300"> 'Relocate to US or Europe'</span>,
                </div>
                
                <div className="text-white">{`}`};</div>
                
                <div className="mt-4">
                  <span className="text-emerald-400">console</span>.
                  <span className="text-yellow-300">log</span>(
                  <span className="text-orange-300">'Beyond coding, I\'m a coffee enthusiast, a cat lover, and a self-taught artist who enjoys spending my free time doodling.'</span>);
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
              <span>Download My Resume</span>
            </a>
          </div>
          
          {/* Right column - Tech stack and illustration */}
          <div>
            {/* Tech stack header */}
            <div className="flex items-center mb-6">
              <Server className="text-emerald-400 mr-2" />
              <h3 className="text-2xl font-bold">Tech Stack</h3>
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
                <h3 className="text-xl font-bold">Beyond Coding</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Coffee className="text-emerald-400 flex-shrink-0" />
                  <span>Coffee enthusiast with a passion for brewing methods</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Cat className="text-emerald-400 flex-shrink-0" />
                  <span>Cat lover and proud pet parent</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <PenTool className="text-emerald-400 flex-shrink-0" />
                  <span>Self-taught artist who enjoys doodling in free time</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <FileCode className="text-emerald-400 flex-shrink-0" />
                  <span>Excited about relocating for new tech challenges</span>
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
