import React, { useState, useEffect } from 'react';
import { Terminal, Globe } from 'lucide-react';
import { Link } from 'react-scroll';

const Navbar = ({ active, setActive, openTerminal, language, setLanguage }) => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenu, setLangMenu] = useState(false);

  const languages = [
    { code: 'pt-BR', label: '🇧🇷 Português' },
    { code: 'en-US', label: '🇺🇸 English' },
    { code: 'zh-CN', label: '🇨🇳 中文' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: language === 'pt-BR' ? 'Início' : language === 'zh-CN' ? '首页' : 'Home' },
    { id: 'about', label: language === 'pt-BR' ? 'Sobre' : language === 'zh-CN' ? '关于' : 'About' },
    { id: 'projetos', label: language === 'pt-BR' ? 'Projetos' : language === 'zh-CN' ? '项目' : 'Projects' },
    { id: 'experiência', label: language === 'pt-BR' ? 'Experiência' : language === 'zh-CN' ? '经验' : 'Experience' },
    { id: 'roadmap', label: language === 'pt-BR' ? 'Trajetória' : language === 'zh-CN' ? '路线图' : 'Roadmap' },
    { id: 'contato', label: language === 'pt-BR' ? 'Contato' : language === 'zh-CN' ? '联系' : 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled ? "bg-gray-900/80 backdrop-blur-sm py-2" : "py-4"
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold cursor-pointer group"
            onClick={openTerminal}
          >
            <Terminal className="inline-block mr-2 group-hover:text-emerald-400 transition-colors" />
            <span className="group-hover:text-emerald-400 transition-colors">Davi Rezende</span>
          </div>
          
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.id}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setActive(item.id)}
                className={`capitalize cursor-pointer ${
                  active === item.id
                    ? 'text-emerald-400'
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language selector */}
            <div className="relative ml-6">
              <button
                onClick={() => setLangMenu(!langMenu)}
                className="flex items-center bg-gray-800 p-2 rounded-lg border border-emerald-500/20 hover:border-emerald-500/50 transition-colors"
              >
                <Globe className="w-5 h-5 mr-2 text-emerald-400" />
                <span className="text-sm">
                  {language === 'pt-BR' ? '🇧🇷' : language === 'zh-CN' ? '🇨🇳' : '🇺🇸'}
                </span>
              </button>
              
              {langMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg py-1 border border-emerald-500/20 z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-700 flex items-center"
                    >
                      <span className={`${language === lang.code ? 'text-emerald-400' : 'text-gray-300'}`}>
                        {lang.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? "✕" : "☰"}
            </button>
          </div>
        </div>
        
        {toggle && (
          <div className="mt-4 md:hidden">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.id}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => {
                  setActive(item.id);
                  setToggle(false);
                }}
                className={`block w-full text-left py-2 capitalize ${
                  active === item.id
                    ? 'text-emerald-400'
                    : 'text-gray-300 hover:text-white'
                } transition-colors`}
              >
                {item.label}
              </Link>
            ))}
            <div className="py-2 mt-2 border-t border-gray-700">
              <div className="flex flex-wrap gap-2 mt-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setToggle(false);
                    }}
                    className={`px-3 py-2 rounded ${
                      language === lang.code 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-gray-800 text-gray-300'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
