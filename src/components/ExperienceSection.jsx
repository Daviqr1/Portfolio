import React, { useState } from 'react';
import { Briefcase, Zap, ChevronRight, Calendar, Building2, Code, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ExperienceSection = ({ language = 'pt-BR' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'card'

  // Ícones específicos para cada empresa
  const companyIcons = {
    "Organização Emflora": <Building2 className="text-green-400" />,
    "BButton Ventures": <Code className="text-blue-400" />,
    "FAPES": <Award className="text-amber-400" />
  };

  // Tags de tecnologias para cada experiência
  const techTags = {
    "Organização Emflora": ["React", "Node.js", "IoT", "AWS", "MongoDB"],
    "BButton Ventures": ["PHP", "Laravel", "Docker", "MySQL", "Redis"],
    "FAPES": ["PHP", "jQuery", "MySQL", "Bootstrap"]
  };

  const experiences = [
    {
      company: "Organização Emflora",
      role: "Desenvolvedor Full Stack",
      period: "2023 - Atual",
      duration: "1 ano+",
      description: "Liderando o desenvolvimento de soluções tecnológicas inovadoras para agricultura de precisão.",
      achievements: [
        "Implementação de sistema IoT para monitoramento de cultivos",
        "Redução de 30% em custos operacionais",
        "Arquitetura de microsserviços escalável"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      company: "BButton Ventures",
      role: "Desenvolvedor Backend",
      period: "2022 - 2023",
      duration: "1 ano",
      description: "Desenvolvimento de infraestrutura para startups em estágio inicial.",
      achievements: [
        "Pipeline de automação para análise de startups",
        "APIs RESTful para integração de serviços",
        "Mentoria técnica para startups do portfólio"
      ],
      color: "from-blue-500 to-indigo-500"
    },
    {
      company: "FAPES",
      role: "Desenvolvedor Web PHP",
      period: "2021 - 2022",
      duration: "1 ano",
      description: "Modernização de sistemas para gestão de projetos de pesquisa.",
      achievements: [
        "Refatoração completa do sistema legado",
        "Implementação de workflow automatizado",
        "Redução de 50% no tempo de aprovação de projetos"
      ],
      color: "from-amber-500 to-orange-500"
    }
  ];

  const getLabel = (key) => {
    const translations = {
      title: {
        'pt-BR': 'Jornada Profissional',
        'en-US': 'Professional Journey',
        'zh-CN': '职业旅程'
      },
      viewTimeline: {
        'pt-BR': 'Visualizar como Timeline',
        'en-US': 'View as Timeline',
        'zh-CN': '时间线视图'
      },
      viewCards: {
        'pt-BR': 'Visualizar como Cards',
        'en-US': 'View as Cards',
        'zh-CN': '卡片视图'
      },
      duration: {
        'pt-BR': 'Duração',
        'en-US': 'Duration',
        'zh-CN': '持续时间'
      },
      highlights: {
        'pt-BR': 'Destaques',
        'en-US': 'Highlights',
        'zh-CN': '亮点'
      },
      techStack: {
        'pt-BR': 'Stack Tecnológico',
        'en-US': 'Tech Stack',
        'zh-CN': '技术栈'
      }
    };
    
    return translations[key][language] || translations[key]['en-US'];
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % experiences.length);
  };

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <section id="experiência" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 via-transparent to-emerald-900/10" />
      
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 right-20 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold flex items-center">
            <Briefcase className="mr-2 text-emerald-400" />
            {getLabel('title')}
            <div className="hidden sm:block ml-4 h-px w-20 bg-gradient-to-r from-emerald-400/50 to-transparent" />
          </h2>
          
          {/* View toggle buttons */}
          <div className="flex space-x-2 bg-gray-800/50 rounded-lg p-1">
            <button 
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-1 rounded ${viewMode === 'timeline' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {getLabel('viewTimeline')}
            </button>
            <button 
              onClick={() => setViewMode('card')}
              className={`px-3 py-1 rounded ${viewMode === 'card' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {getLabel('viewCards')}
            </button>
          </div>
        </div>

        {viewMode === 'timeline' ? (
          /* Timeline View */
          <div className="relative">
            {/* Visual timeline line */}
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-emerald-500 via-emerald-400 to-emerald-300 rounded-full" />
            
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-10 md:pl-16"
                >
                  {/* Timeline node */}
                  <div className="absolute left-[-10px] top-0 flex items-center justify-center">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${exp.color} shadow-lg`} />
                    <div className={`absolute w-5 h-5 rounded-full bg-gradient-to-r ${exp.color} animate-ping opacity-30`} />
                  </div>
                  
                  {/* Experience card with glassmorphism */}
                  <div className="bg-gray-900/50 rounded-xl backdrop-blur-sm border border-l-4 border-emerald-500/20 border-l-emerald-500 overflow-hidden shadow-lg group hover:shadow-emerald-500/10 transition-all">
                    <div className="p-6">
                      {/* Company and role info */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold flex items-center text-emerald-400">
                            {companyIcons[exp.company] && <span className="mr-2">{companyIcons[exp.company]}</span>}
                            {exp.company}
                          </h3>
                          <div className="text-gray-300">
                            <span className="font-semibold">{exp.role}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                      
                      {/* Duration indicator */}
                      <div className="flex items-center mb-4">
                        <div className="text-xs uppercase tracking-wider text-gray-500">{getLabel('duration')}</div>
                        <div className="ml-2 h-2 bg-gray-700 rounded-full flex-grow">
                          <div 
                            className={`h-2 rounded-full bg-gradient-to-r ${exp.color}`} 
                            style={{width: exp.duration === "1 ano+" ? '100%' : '75%'}}
                          ></div>
                        </div>
                        <div className="ml-2 text-sm font-medium text-emerald-400">{exp.duration}</div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-300 mb-5 leading-relaxed">{exp.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Achievements */}
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">{getLabel('highlights')}</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start text-gray-300 group">
                                <Zap className="w-4 h-4 mr-2 text-emerald-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Tech stack */}
                        <div>
                          <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-3">{getLabel('techStack')}</h4>
                          <div className="flex flex-wrap gap-2">
                            {techTags[exp.company]?.map((tech, i) => (
                              <span
                                key={i}
                                className="bg-gray-800/70 text-gray-300 px-3 py-1 rounded-full text-sm border border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Card Carousel View */
          <div className="relative py-10">
            <div className="flex justify-between items-center absolute top-0 left-0 right-0">
              <button 
                onClick={handlePrev}
                className="bg-gray-800/70 hover:bg-gray-800 text-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <div className="flex space-x-2">
                {experiences.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeIndex === idx ? 'bg-emerald-500 w-6' : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
              
              <button 
                onClick={handleNext}
                className="bg-gray-800/70 hover:bg-gray-800 text-white rounded-full p-2 shadow-lg transform hover:scale-110 transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mt-10">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: activeIndex === idx ? 1 : 0,
                    scale: activeIndex === idx ? 1 : 0.9,
                    display: activeIndex === idx ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={`bg-gradient-to-b from-gray-900/80 to-gray-800/80 rounded-2xl backdrop-blur-sm overflow-hidden border border-emerald-500/20 shadow-lg`}>
                    <div className={`h-2 w-full bg-gradient-to-r ${exp.color}`}></div>
                    <div className="p-8">
                      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                        <div className="mb-4 md:mb-0">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-gray-800 mr-4">
                              {companyIcons[exp.company]}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-1">{exp.company}</h3>
                              <div className="text-emerald-400 font-medium">{exp.role}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center bg-gray-800/70 px-4 py-2 rounded-lg">
                          <Calendar className="w-5 h-5 mr-2 text-emerald-400" />
                          <span>{exp.period}</span>
                          <span className="mx-2">•</span>
                          <span className="text-emerald-400 font-medium">{exp.duration}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-8 text-lg leading-relaxed">{exp.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="flex items-center text-xl font-semibold mb-4 text-white">
                            <Award className="w-5 h-5 mr-2 text-emerald-400" />
                            {getLabel('highlights')}
                          </h4>
                          <ul className="space-y-3">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start bg-gray-800/40 p-3 rounded-lg">
                                <ChevronRight className="w-5 h-5 mr-2 text-emerald-400 flex-shrink-0" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="flex items-center text-xl font-semibold mb-4 text-white">
                            <Code className="w-5 h-5 mr-2 text-emerald-400" />
                            {getLabel('techStack')}
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {techTags[exp.company]?.map((tech, i) => (
                              <div
                                key={i}
                                className="bg-gray-800/70 text-center text-gray-300 px-2 py-3 rounded-lg border border-gray-700 hover:border-emerald-500/30 transition-colors"
                              >
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;