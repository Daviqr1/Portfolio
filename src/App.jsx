import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Hero, Navbar } from './components';
import ProjectsSection from './components/ProjectSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import RoadmapSection from './components/RoadmapSection';
import Terminal from './components/Terminal';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollContainer, setScrollContainer] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [hasSeenTerminal, setHasSeenTerminal] = useState(false);
  const [language, setLanguage] = useState('pt-BR');
  const [showTerminal, setShowTerminal] = useState(false);

  // Ref para o container de scroll
  const containerRef = React.useRef(null);
  
  // Abrir terminal automaticamente na primeira visita
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited && !hasSeenTerminal) {
      // Pequeno delay para dar tempo da página carregar
      const timer = setTimeout(() => {
        setTerminalOpen(true);
        setHasSeenTerminal(true);
        sessionStorage.setItem('hasVisitedBefore', 'true');
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasSeenTerminal]);
  
  useEffect(() => {
    setScrollContainer(containerRef);
    
    // Parallax effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Abre o terminal automaticamente quando o site carrega
    // Com um pequeno atraso para garantir que tudo esteja carregado
    const timer = setTimeout(() => {
      setShowTerminal(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-x-hidden">
        {/* Animated Background */}
        <div 
          className="fixed inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(52, 211, 153, 0.2) 0%, transparent 50%)`
          }}
        />
        
        {/* Terminal Component */}
        {terminalOpen && (
          <Terminal onClose={() => setTerminalOpen(false)} autoClose={true} language={language} />
        )}

        {showTerminal && (
          <Terminal onClose={() => setShowTerminal(false)} autoClose={true} />
        )}

        {/* Navigation */}
        <Navbar 
          active={activeSection} 
          setActive={setActiveSection} 
          openTerminal={() => setTerminalOpen(true)}
          language={language}
          setLanguage={setLanguage}
        />
        
        {/* Main Content */}
        <main ref={containerRef} className="relative z-10">
          <Hero 
            scrollContainer={containerRef} 
            mousePosition={mousePosition} 
            language={language} 
          />
          <AboutSection language={language} />
          <ProjectsSection language={language} />
          <ExperienceSection language={language} />
          <RoadmapSection language={language} />
          <ContactSection language={language} />
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900/80 py-8 backdrop-blur-sm">
          <div className="container mx-auto px-6 text-center text-gray-400">
            <p>© 2024 Davi Rezende • {language === 'pt-BR' ? 'Desenvolvedor Full Stack' : 
               language === 'zh-CN' ? '全栈开发者' : 
               'Full Stack Developer'}</p>
            <p className="mt-2 text-sm">
              {language === 'pt-BR' ? 'Pressione ' : 
               language === 'zh-CN' ? '按 ' : 
               'Press '}
              <kbd className="px-2 py-1 bg-gray-800 rounded">Ctrl</kbd> + 
              <kbd className="px-2 py-1 bg-gray-800 rounded">`</kbd>
              {language === 'pt-BR' ? ' para abrir o terminal' : 
               language === 'zh-CN' ? ' 打开终端' : 
               ' to open terminal'}
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
