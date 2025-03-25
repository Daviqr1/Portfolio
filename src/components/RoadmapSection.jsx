import React, { useState, useEffect, useRef } from 'react';
import { Map, Award, Rocket, Book, Cpu, Code, Briefcase, GraduationCap, Zap, 
         GitBranch, Server, Globe, Sparkles, Laptop, Terminal, ChevronRight } from 'lucide-react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const RoadmapSection = ({ language = 'pt-BR' }) => {
  const [activeNode, setActiveNode] = useState(null);
  const [animateMap, setAnimateMap] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const containerRef = useRef(null);
  const nodeControls = useAnimation();

  useEffect(() => {
    // Verificar se está em dispositivo móvel
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Iniciar animações
    const timer = setTimeout(() => {
      setAnimateMap(true);
    }, 500);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Helper function para obter texto traduzido
  const getLocalizedText = (ptText, enText, zhText) => {
    if (language === 'pt-BR') return ptText;
    if (language === 'zh-CN') return zhText;
    return enText; // default to English
  };

  const journey = [
    {
      id: "education",
      year: "2017-2021",
      title: getLocalizedText("Engenharia UFES", "UFES Engineering", "UFES 工程学"),
      icon: <GraduationCap size={28} />,
      description: getLocalizedText(
        "Formação em Engenharia na Universidade Federal do Espírito Santo, onde tive meu primeiro contato formal com programação e desenvolvimento de software.",
        "Engineering degree at Federal University of Espírito Santo, where I had my first formal contact with programming and software development.",
        "在埃斯皮里托桑托联邦大学获得工程学学位，在那里我首次正式接触编程和软件开发。"
      ),
      details: [
        { 
          label: getLocalizedText("Curso", "Course", "课程"), 
          value: getLocalizedText("Engenharia", "Engineering", "工程学") 
        },
        { label: getLocalizedText("Instituição", "Institution", "机构"), value: "UFES" },
        { 
          label: getLocalizedText("Conhecimentos", "Knowledge", "知识"), 
          value: "C++, Java, Algoritmos" 
        }
      ],
      color: "from-blue-500 to-indigo-600",
      borderColor: "border-blue-500",
      bgColor: "bg-blue-500",
      lightColor: "rgba(59, 130, 246, 0.5)",
      position: { x: "20%", y: "15%" }
    },
    {
      id: "first-job",
      year: "2022",
      title: getLocalizedText("Primeiro Trabalho na FAPES", "First Job at FAPES", "FAPES 的第一份工作"),
      icon: <Briefcase size={28} />,
      description: getLocalizedText(
        "Minha entrada no mercado como desenvolvedor web PHP na FAPES, tabalhando como desenvolvedor web significativas.",
        "My entry into the market as a PHP web developer at FAPES, working with legacy systems and implementing significant improvements.",
        "作为PHP网站开发者在FAPES进入市场，负责处理遗留系统并实施重要改进。"
      ),
      details: [
        { label: getLocalizedText("Empresa", "Company", "公司"), value: "FAPES" },
        { 
          label: getLocalizedText("Tecnologias", "Technologies", "技术"), 
          value: "PHP, jQuery, MySQL" 
        },
        { 
          label: getLocalizedText("Conquista", "Achievement", "成就"), 
          value: getLocalizedText("Modernização de sistemas legados", "Legacy system modernization", "遗留系统现代化") 
        }
      ],
      color: "from-amber-500 to-orange-600",
      borderColor: "border-amber-500",
      bgColor: "bg-amber-500",
      lightColor: "rgba(245, 158, 11, 0.5)",
      position: { x: "35%", y: "25%" }
    },
    {
      id: "certifications",
      year: "2022",
      title: getLocalizedText("Certificações & Backend", "Certifications & Backend", "认证与后端开发"),
      icon: <Award size={28} />,
      description: getLocalizedText(
        "Período de intenso aprendizado onde conquistei certificações importantes em desenvolvimento backend e todas as certificações de engenheriro de software e principais linguagens no hackerhank.com.",
        "Period of intense learning where I earned important backend development certifications and worked with scalable architectures at BButton.",
        "在BButton学习的高强度阶段，获得重要的后端开发认证并使用可扩展架构工作。"
      ),
      details: [
        { 
          label: getLocalizedText("Certificações", "Certifications", "认证"), 
          value: "AWS, Docker, Laravel" 
        },
        { label: getLocalizedText("Empresa", "Company", "公司"), value: "BButton Ventures" },
        { 
          label: getLocalizedText("Projetos", "Projects", "项目"), 
          value: getLocalizedText("APIs e Microsserviços", "APIs and Microservices", "API和微服务") 
        }
      ],
      color: "from-purple-500 to-violet-600",
      borderColor: "border-purple-500",
      bgColor: "bg-purple-500",
      lightColor: "rgba(168, 85, 247, 0.5)",
      position: { x: "55%", y: "15%" }
    },
    {
      id: "freelance",
      year: "2022-2024",
      title: getLocalizedText("Era Freelancer", "Freelance Era", "自由职业时期"),
      icon: <Globe size={28} />,
      description: getLocalizedText(
        "Explorei o mundo dos projetos freelance, desenvolvendo soluções personalizadas para diversos clientes e adquirindo experiência em múltiplas frentes.",
        "Explored the world of freelance projects, developing custom solutions for various clients and gaining experience on multiple fronts.",
        "探索自由职业项目的世界，为各种客户开发定制解决方案，在多个方面获得经验。"
      ),
      details: [
        { label: getLocalizedText("Projetos", "Projects", "项目"), value: "15+" },
        { 
          label: getLocalizedText("Clientes", "Clients", "客户"), 
          value: getLocalizedText("Pequenas e médias empresas", "Small and medium businesses", "中小型企业") 
        },
        { 
          label: getLocalizedText("Tecnologias", "Technologies", "技术"), 
          value: "React, Node.js, PHP" 
        }
      ],
      color: "from-green-500 to-emerald-600",
      borderColor: "border-green-500",
      bgColor: "bg-green-500",
      lightColor: "rgba(16, 185, 129, 0.5)",
      position: { x: "25%", y: "45%" }
    },
    {
      id: "saas",
      year: "2024",
      title: getLocalizedText("Sociedade em SaaS", "SaaS Partnership", "SaaS合作伙伴关系"),
      icon: <Server size={28} />,
      description: getLocalizedText(
        "Formei sociedade para desenvolvimento de soluções SaaS, criando produtos escaláveis e ganhando experiência em gestão de produto e negócios.",
        "Formed partnerships for SaaS solutions development, creating scalable products and gaining experience in product and business management.",
        "建立SaaS解决方案开发合作伙伴关系，创建可扩展产品并获得产品和业务管理经验。"
      ),
      details: [
        { label: getLocalizedText("Modelo", "Model", "模式"), value: "SaaS" },
        { label: getLocalizedText("Stack", "Stack", "技术栈"), value: "LAMP, React, AWS" },
        { 
          label: getLocalizedText("Foco", "Focus", "重点"), 
          value: getLocalizedText("Soluções B2B", "B2B Solutions", "B2B解决方案") 
        }
      ],
      color: "from-cyan-500 to-blue-600",
      borderColor: "border-cyan-500",
      bgColor: "bg-cyan-500",
      lightColor: "rgba(6, 182, 212, 0.5)",
      position: { x: "65%", y: "40%" }
    },
    {
      id: "mobile-dev",
      year: "2024-2025",
      title: getLocalizedText("Desenvolvimento Mobile", "Mobile Development", "移动应用开发"),
      icon: <Laptop size={28} />,
      description: getLocalizedText(
        "Transição para desenvolvimento mobile com foco em React Native, criando aplicativos para diversas plataformas e integrando com APIs backend.",
        "Transition to mobile development focusing on React Native, creating applications for various platforms and integrating with backend APIs.",
        "转向专注于React Native的移动开发，为各种平台创建应用程序并与后端API集成。"
      ),
      details: [
        { label: getLocalizedText("Plataformas", "Platforms", "平台"), value: "iOS, Android" },
        { label: getLocalizedText("Framework", "Framework", "框架"), value: "React Native" },
        { 
          label: getLocalizedText("Projetos", "Projects", "项目"), 
          value: getLocalizedText("Aplicativos corporativos e de consumo", "Corporate and consumer apps", "企业和消费者应用") 
        }
      ],
      color: "from-rose-500 to-pink-600",
      borderColor: "border-rose-500",
      bgColor: "bg-rose-500",
      lightColor: "rgba(244, 63, 94, 0.5)",
      position: { x: "45%", y: "55%" }
    },
    {
      id: "iot-projects",
      year: "2024-2025",
      title: getLocalizedText("Soluções IoT & Emflora", "IoT Solutions & Emflora", "物联网解决方案与Emflora"),
      icon: <Cpu size={28} />,
      description: getLocalizedText(
        "Liderança no desenvolvimento de soluções tecnológicas para agricultura de precisão na Emflora, combinando IoT, mobile e backend.",
        "Leading the development of technological solutions for precision agriculture at Emflora, combining IoT, mobile and backend.",
        "在Emflora领导精准农业技术解决方案的开发，结合物联网、移动和后端技术。"
      ),
      details: [
        { label: getLocalizedText("Empresa", "Company", "公司"), value: "Organização Emflora" },
        { 
          label: getLocalizedText("Tecnologias", "Technologies", "技术"), 
          value: "ESP32, React Native, Node.js" 
        },
        { 
          label: getLocalizedText("Impacto", "Impact", "影响"), 
          value: getLocalizedText("Redução de 30% em custos operacionais", "30% reduction in operational costs", "运营成本降低30%") 
        }
      ],
      color: "from-emerald-500 to-green-600",
      borderColor: "border-emerald-500",
      bgColor: "bg-emerald-500",
      lightColor: "rgba(16, 185, 129, 0.5)",
      position: { x: "75%", y: "65%" }
    },
    {
      id: "future",
      year: "2025+",
      title: getLocalizedText("Próximos Passos", "Next Steps", "下一步"),
      icon: <Rocket size={28} />,
      description: getLocalizedText(
        "Busca por oportunidades internacionais e desenvolvimento de habilidades em IA e sistemas distribuídos, com foco em criar impacto global.",
        "Seeking international opportunities and developing skills in AI and distributed systems, focusing on creating global impact.",
        "寻求国际机会并发展人工智能和分布式系统技能，专注于创造全球影响力。"
      ),
      details: [
        { 
          label: getLocalizedText("Objetivos", "Goals", "目标"), 
          value: getLocalizedText("Relocalização internacional", "International relocation", "国际重新定位") 
        },
        { 
          label: getLocalizedText("Aprendizado", "Learning", "学习"), 
          value: "AI/ML, Cloud Native" 
        },
        { 
          label: getLocalizedText("Visão", "Vision", "愿景"), 
          value: getLocalizedText("Criar soluções de impacto global", "Create solutions with global impact", "创造具有全球影响力的解决方案") 
        }
      ],
      color: "from-indigo-500 to-purple-600",
      borderColor: "border-indigo-500",
      bgColor: "bg-indigo-500",
      lightColor: "rgba(79, 70, 229, 0.5)",
      position: { x: "50%", y: "85%" }
    }
  ];

  return (
    <section id="roadmap" className="py-20 bg-gray-900/80 relative overflow-hidden min-h-screen">
      {/* Efeitos de background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent)]" />
      
      {/* Substituímos a string SVG complexa por um estilo CSS simples */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ 
        backgroundImage: "radial-gradient(circle at 3px 3px, rgba(16, 185, 129, 0.1) 3px, transparent 0)",
        backgroundSize: "200px 200px"
      }} />
      
      <div className="absolute top-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 mb-4"
          >
            <Map className="mr-2 text-emerald-400" />
            <span className="text-sm text-emerald-400 font-medium">
              {language === 'pt-BR' ? 'Cronologia Profissional' : 'Professional Timeline'}
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500 mb-6"
          >
            {language === 'pt-BR' ? 'Minha Jornada na Tecnologia' : 'My Tech Journey'}
          </motion.h2>
          
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl text-center"
          >
            <p className="text-lg text-gray-300/90">
              {language === 'pt-BR' 
                ? "Da universidade ao desenvolvimento de soluções de impacto global, cada etapa dessa jornada representa um capítulo importante na minha evolução como desenvolvedor."
                : "From university to developing global impact solutions, each stage of this journey represents an important chapter in my evolution as a developer."}
            </p>
          </motion.div>
        </div>
        
        {isMobile ? (
          // Versão mobile - Timeline Futurística Aprimorada
          <div className="relative mb-10">
            {/* Linha do tempo central com gradiente */}
            <div className="absolute left-7 top-0 bottom-0 w-3 bg-gradient-to-b from-blue-500/70 via-emerald-500/70 to-indigo-500/70 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              <motion.div
                className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-blue-400 via-emerald-400 to-indigo-400 rounded-full"
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
            </div>
            
            {/* Partículas em movimento ao longo da linha */}
            <div className="absolute left-[0.7rem] top-0 bottom-0 w-2">
              <motion.div
                className="absolute w-5 h-5 rounded-full bg-white shadow-[0_0_15px_5px_rgba(255,255,255,0.5)]"
                initial={{ top: "0%" }}
                animate={{ 
                  top: ["0%", "100%", "0%"],
                  opacity: [0.8, 0.2, 0.8]
                }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-emerald-300 shadow-[0_0_10px_4px_rgba(16,185,129,0.5)]"
                initial={{ top: "30%" }}
                animate={{ 
                  top: ["30%", "90%", "30%"],
                  opacity: [0.7, 0.3, 0.7]
                }}
                transition={{ 
                  duration: 12, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_10px_4px_rgba(59,130,246,0.5)]"
                initial={{ top: "70%" }}
                animate={{ 
                  top: ["70%", "10%", "70%"],
                  opacity: [0.6, 0.4, 0.6]
                }}
                transition={{ 
                  duration: 18, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
            
            <div className="space-y-20 pl-20">
              {journey.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="relative"
                >
                  {/* Nó na timeline - Com ícones maiores e prévia visível */}
                  <div
                    className="absolute left-[-64px] top-8 w-28 h-28 rounded-full flex items-center justify-center cursor-pointer transform transition-all duration-500 hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(17, 24, 39, 0.7))`,
                      boxShadow: activeNode === node.id 
                        ? `0 0 0 2px ${node.bgColor.replace('bg-', '')}, 0 0 30px 0 ${node.lightColor}`
                        : `0 0 0 2px rgba(31, 41, 55, 0.8), 0 0 15px 0 rgba(31, 41, 55, 0.5)`
                    }}
                    onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                  >
                    {/* Círculo interno colorido */}
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center z-10 transition-all duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${node.bgColor.replace('bg-', '')}, ${node.bgColor.replace('bg-', '')}99)`,
                        boxShadow: `0 0 20px 0 ${node.lightColor}`
                      }}
                    >
                      <div className="text-white text-3xl">
                        {node.icon}
                      </div>
                    </div>
                    
                    {/* Efeito de pulso */}
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      animate={{ 
                        boxShadow: activeNode === node.id 
                          ? [`0 0 0 3px ${node.bgColor.replace('bg-', '')}, 0 0 20px 0 ${node.lightColor}`, 
                             `0 0 0 4px ${node.bgColor.replace('bg-', '')}, 0 0 40px 5px ${node.lightColor}`, 
                             `0 0 0 3px ${node.bgColor.replace('bg-', '')}, 0 0 20px 0 ${node.lightColor}`] 
                          : [`0 0 0 1px ${node.bgColor.replace('bg-', '')}, 0 0 8px 0 ${node.lightColor}`, 
                             `0 0 0 2px ${node.bgColor.replace('bg-', '')}, 0 0 15px 2px ${node.lightColor}`, 
                             `0 0 0 1px ${node.bgColor.replace('bg-', '')}, 0 0 8px 0 ${node.lightColor}`]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                  
                  {/* Ano com faixa futurística */}
                  <div className="absolute left-[-140px] top-8 transform -translate-y-1/2">
                    <div className="bg-gray-900/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-700/60 shadow-lg">
                      <span className="text-sm font-mono text-emerald-400 font-bold tracking-wider">{node.year}</span>
                    </div>
                  </div>
                  
                  {/* Linha horizontal ligando o nó ao card com gradiente e animação */}
                  <div className="absolute left-[-35px] top-8 w-[35px] h-1">
                    <motion.div 
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${node.bgColor.replace('bg-', '')}, rgba(31, 41, 55, 0.7))` 
                      }}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 0.2 * index }}
                    />
                  </div>
                  
                  {/* Card de conteúdo aprimorado */}
                  <motion.div
                    layout
                    className="bg-gray-900/80 backdrop-blur-md rounded-xl overflow-hidden border-l-4 shadow-lg"
                    style={{
                      borderColor: activeNode === node.id ? node.bgColor.replace('bg-', '') : 'rgba(31, 41, 55, 0.5)',
                      boxShadow: activeNode === node.id ? `0 10px 30px -10px ${node.lightColor}` : '0 10px 30px -15px rgba(0, 0, 0, 0.3)'
                    }}
                  >
                    <div className="p-6 relative">
                      {/* Elemento decorativo no topo do card */}
                      <div 
                        className="absolute top-0 left-0 h-1 w-full"
                        style={{ 
                          background: `linear-gradient(to right, ${node.bgColor.replace('bg-', '')}, rgba(31, 41, 55, 0.1))` 
                        }}
                      />
                      
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <span className="mr-3 text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{index + 1}.</span>
                        {node.title}
                      </h3>
                      
                      <p className="text-gray-300 my-3">{node.description}</p>
                      
                      <AnimatePresence>
                        {activeNode === node.id && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-700/50"
                          >
                            <div className="space-y-3 text-sm">
                              {node.details.map((detail, i) => (
                                <div key={i} className="flex justify-between">
                                  <span className="text-gray-400 font-medium">{detail.label}:</span>
                                  <span className="text-emerald-300 font-medium">{detail.value}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <button 
                        className="flex items-center text-emerald-400 text-sm font-medium mt-4 group" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveNode(activeNode === node.id ? null : node.id);
                        }}
                      >
                        <span>{activeNode === node.id ? 'Ver menos' : 'Ver mais'}</span>
                        <ChevronRight className={`w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 ${activeNode === node.id ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          // Versão desktop - Mapa interativo futurístico
          <div className="relative h-[800px] w-full mb-16 overflow-hidden rounded-3xl border border-emerald-500/20 shadow-2xl" ref={containerRef}>
            {/* Fundo estilizado com grid e gradientes */}
            <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.07),transparent_70%)]"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              
              {/* Grid de fundo */}
              <div className="absolute inset-0" style={{ 
                backgroundImage: "linear-gradient(to right, rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.03) 1px, transparent 1px)",
                backgroundSize: "60px 60px"
              }}></div>
              
              {/* Linha de conexão animada entre os nós */}
              <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                <defs>
                  <linearGradient id="roadmap-line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                <motion.path 
                  d={`M ${journey[0].position.x} ${journey[0].position.y} 
                      Q ${parseInt(journey[1].position.x) - 5}% ${parseInt(journey[0].position.y) + 10}%, 
                        ${journey[1].position.x} ${journey[1].position.y}
                      Q ${parseInt(journey[2].position.x) - 10}% ${parseInt(journey[1].position.y) + 15}%,
                        ${journey[2].position.x} ${journey[2].position.y}
                      Q ${parseInt(journey[2].position.x) + 5}% ${parseInt(journey[3].position.y) - 15}%,
                        ${journey[3].position.x} ${journey[3].position.y}
                      Q ${parseInt(journey[4].position.x) - 10}% ${parseInt(journey[3].position.y) + 5}%,
                        ${journey[4].position.x} ${journey[4].position.y}
                      Q ${parseInt(journey[5].position.x) - 15}% ${parseInt(journey[4].position.y) + 10}%,
                        ${journey[5].position.x} ${journey[5].position.y}
                      Q ${parseInt(journey[6].position.x) + 5}% ${parseInt(journey[5].position.y) + 15}%,
                        ${journey[6].position.x} ${journey[6].position.y}
                      Q ${parseInt(journey[7].position.x) - 5}% ${parseInt(journey[6].position.y) + 10}%,
                        ${journey[7].position.x} ${journey[7].position.y}`}
                  fill="none"
                  strokeWidth="2"
                  stroke="url(#roadmap-line-gradient)"
                  filter="url(#glow)"
                  strokeDasharray="12,8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                />
                
                {/* Partículas animadas ao longo do caminho */}
                <motion.circle 
                  r="6" 
                  fill="#10b981" 
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.8, 0.2, 0.8],
                    offsetDistance: ["0%", "100%"]
                  }}
                  style={{ offsetPath: `path('${`M ${journey[0].position.x} ${journey[0].position.y} 
                                          Q ${parseInt(journey[1].position.x) - 5}% ${parseInt(journey[0].position.y) + 10}%, 
                                          ${journey[1].position.x} ${journey[1].position.y}
                                          Q ${parseInt(journey[2].position.x) - 10}% ${parseInt(journey[1].position.y) + 15}%,
                                          ${journey[2].position.x} ${journey[2].position.y}
                                          Q ${parseInt(journey[2].position.x) + 5}% ${parseInt(journey[3].position.y) - 15}%,
                                          ${journey[3].position.x} ${journey[3].position.y}
                                          Q ${parseInt(journey[4].position.x) - 10}% ${parseInt(journey[3].position.y) + 5}%,
                                          ${journey[4].position.x} ${journey[4].position.y}
                                          Q ${parseInt(journey[5].position.x) - 15}% ${parseInt(journey[4].position.y) + 10}%,
                                          ${journey[5].position.x} ${journey[5].position.y}
                                          Q ${parseInt(journey[6].position.x) + 5}% ${parseInt(journey[5].position.y) + 15}%,
                                          ${journey[6].position.x} ${journey[6].position.y}
                                          Q ${parseInt(journey[7].position.x) - 5}% ${parseInt(journey[6].position.y) + 10}%,
                                          ${journey[7].position.x} ${journey[7].position.y}`}')` }}
                  transition={{ 
                    duration: 15, 
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <motion.circle 
                  r="4" 
                  fill="#3b82f6" 
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.7, 0.3, 0.7],
                    offsetDistance: ["25%", "75%", "25%"]
                  }}
                  style={{ offsetPath: `path('${`M ${journey[0].position.x} ${journey[0].position.y} 
                                          Q ${parseInt(journey[1].position.x) - 5}% ${parseInt(journey[0].position.y) + 10}%, 
                                          ${journey[1].position.x} ${journey[1].position.y}
                                          Q ${parseInt(journey[2].position.x) - 10}% ${parseInt(journey[1].position.y) + 15}%,
                                          ${journey[2].position.x} ${journey[2].position.y}
                                          Q ${parseInt(journey[2].position.x) + 5}% ${parseInt(journey[3].position.y) - 15}%,
                                          ${journey[3].position.x} ${journey[3].position.y}
                                          Q ${parseInt(journey[4].position.x) - 10}% ${parseInt(journey[3].position.y) + 5}%,
                                          ${journey[4].position.x} ${journey[4].position.y}
                                          Q ${parseInt(journey[5].position.x) - 15}% ${parseInt(journey[4].position.y) + 10}%,
                                          ${journey[5].position.x} ${journey[5].position.y}
                                          Q ${parseInt(journey[6].position.x) + 5}% ${parseInt(journey[5].position.y) + 15}%,
                                          ${journey[6].position.x} ${journey[6].position.y}
                                          Q ${parseInt(journey[7].position.x) - 5}% ${parseInt(journey[6].position.y) + 10}%,
                                          ${journey[7].position.x} ${journey[7].position.y}`}')` }}
                  transition={{ 
                    duration: 18, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                />
              </svg>
              
              {/* Renderizar os nós do roadmap */}
              {journey.map((node, index) => (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{ 
                    left: node.position.x, 
                    top: node.position.y, 
                    transform: 'translate(-50%, -50%)'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Círculo do nó com pulso */}
                  <div 
                    className="relative flex items-center justify-center cursor-pointer group"
                    onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Círculo externo com efeito de pulso */}
                    <motion.div 
                      className="absolute w-[120px] h-[120px] rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${node.bgColor.replace('bg-', '')}30 0%, ${node.bgColor.replace('bg-', '')}10 70%, transparent 100%)`
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.2, 0.7]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    
                    {/* Círculo do nó */}
                    <div
                      className="w-24 h-24 rounded-full bg-gray-900/90 backdrop-blur-md border-2 flex items-center justify-center z-10 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      style={{
                        borderColor: node.bgColor.replace('bg-', ''),
                        boxShadow: (activeNode === node.id || hoveredNode === node.id)
                          ? `0 0 0 3px ${node.bgColor.replace('bg-', '')}50, 0 0 30px 0 ${node.lightColor}`
                          : `0 0 15px 0 ${node.lightColor}50`
                      }}
                    >
                      {/* Ícone dentro do círculo */}
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ 
                          background: `linear-gradient(135deg, ${node.bgColor.replace('bg-', '')}90, ${node.bgColor.replace('bg-', '')}40)`,
                          boxShadow: `inset 0 0 10px ${node.lightColor}` 
                        }}
                      >
                        <div className="text-white text-3xl">
                          {node.icon}
                        </div>
                      </div>
                    </div>
                    
                    {/* Ano em etiqueta acima */}
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-md border border-gray-700/60">
                      <span className="text-sm font-mono font-bold text-emerald-400">{node.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Camada de Balões de Informação */}
      <div className="pointer-events-none">
        <AnimatePresence>
          {!isMobile && journey.map((node) => (
            (activeNode === node.id || hoveredNode === node.id) && (
              <motion.div
                key={`tooltip-${node.id}`}
                className="fixed z-[9999] pointer-events-auto"
                style={{
                  top: containerRef.current ? 
                    containerRef.current.getBoundingClientRect().top + parseInt(node.position.y) / 100 * containerRef.current.offsetHeight : 0,
                  left: containerRef.current ? 
                    containerRef.current.getBoundingClientRect().left + parseInt(node.position.x) / 100 * containerRef.current.offsetWidth + 60 : 0,
                  width: '300px',
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    borderLeft: `4px solid ${node.bgColor.replace('bg-', '')}`,
                    boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 20px 0 ${node.lightColor}30`
                  }}
                >
                  <div className="p-5">
                    <h3 className="text-white text-lg font-bold">{node.title}</h3>
                    <p className="text-gray-300 text-sm mt-2">{node.description}</p>
                    
                    <div className="mt-4 pt-3 border-t border-gray-700/50">
                      <div className="space-y-2">
                        {node.details.map((detail, i) => (
                          <div key={i} className="flex justify-between text-xs">
                            <span className="text-gray-400">{detail.label}:</span>
                            <span className="text-emerald-300 font-medium">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RoadmapSection;