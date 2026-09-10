import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Hero, Navbar } from './components';
import ProjectsSection from './components/ProjectSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import RoadmapSection from './components/RoadmapSection';
import HistoriaSection from './components/HistoriaSection';
import LinksRapidos from './components/LinksRapidos';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollContainer, setScrollContainer] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [language, setLanguage] = useState('pt-BR');

  // Ref para o container de scroll
  const containerRef = React.useRef(null);

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

  return (
    <BrowserRouter basename="/Portfolio">
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-x-hidden">
        {/* Animated Background */}
        <div
          className="fixed inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(52, 211, 153, 0.2) 0%, transparent 50%)`
          }}
        />

        {/* Navigation */}
        <Navbar
          active={activeSection}
          setActive={setActiveSection}
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
          {/* Acesso imediato: quem abre o portfólio de um candidato quer clicar
              no código e no produto no ar antes de ler qualquer coisa. */}
          <LinksRapidos language={language} />
          <AboutSection language={language} />
          <ProjectsSection language={language} />
          <HistoriaSection language={language} />
          <ExperienceSection language={language} />
          <RoadmapSection language={language} />
          <ContactSection language={language} />
        </main>

        {/* Footer */}
        <footer className="bg-gray-900/80 py-8 backdrop-blur-sm">
          <div className="container mx-auto px-6 text-center text-gray-400">
            <p>© 2026 Davi Rezende • {language === 'pt-BR' ? 'Desenvolvedor Full Stack' :
               language === 'zh-CN' ? '全栈开发者' :
               'Full Stack Developer'}</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
