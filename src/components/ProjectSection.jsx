import React, { useState } from 'react';
import { Code2, Cpu, Database, MessageSquare, Zap, Award, ArrowRight, Github, ExternalLink, X, BarChart2, Clock, Users, Activity, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectsSection.module.css';

const ProjectsSection = ({ language }) => {
  const [expandedProject, setExpandedProject] = useState(null);

  const projects = [
    {
      title: "Harvester_v1",
      description: "Aplicativo de telemetria para tratores com integração ESP32, desenvolvido em JavaScript e C++ utilizando WebSocket para comunicação em tempo real.",
      extendedDescription: "Desenvolvido para otimizar operações agrícolas, o Harvester_v1 é uma solução IoT completa que coleta dados em tempo real de sensores instalados em tratores. A solução usa ESP32 como microcontrolador principal, conectando-se a um servidor WebSocket para transmissão contínua de dados críticos como posição GPS, consumo de combustível, temperatura do motor e status de implementos.",
      icon: <Cpu className="w-6 h-6" />,
      tech: ["JavaScript", "C++", "WebSocket", "ESP32"],
      highlight: "Monitoramento em tempo real de dados do trator",
      impact: "Aumento de 40% na eficiência operacional",
      image: "/images/harvester.jpg",
      github: "https://github.com/davirezende/harvester",
      live: "https://harvester-demo.vercel.app",
      stats: [
        { label: "Economia de Combustível", value: "15%", icon: <Activity /> },
        { label: "Sensores Integrados", value: "14", icon: <BarChart2 /> },
        { label: "Tempo de Resposta", value: "120ms", icon: <Clock /> }
      ],
      gallery: [
        "/images/harvester-dashboard.jpg",
        "/images/harvester-mobile.jpg",
        "/images/harvester-hardware.jpg"
      ]
    },
    {
      title: "Viper Casino Backend",
      description: "Colaboração no desenvolvimento da infraestrutura backend para plataforma de cassinos online.",
      extendedDescription: "Desenvolvimento completo da infraestrutura backend de alta disponibilidade para uma plataforma de cassino online. O sistema gerencia milhares de transações simultâneas, integração com gateways de pagamento, rotinas de verificação anti-fraude e painéis de administração para gestores. A arquitetura foi projetada para escalar horizontalmente conforme a demanda, usando microserviços em contêineres Docker orquestrados com Kubernetes.",
      icon: <Database className="w-6 h-6" />,
      tech: ["PHP", "Laravel", "Node.js", "Redis", "MongoDB", "Docker", "Kubernetes"],
      highlight: "Sistema de transações em tempo real",
      impact: "Processamento de +1M de transações/dia",
      image: "/images/casino.jpg",
      github: "https://github.com/davirezende/casino-backend",
      stats: [
        { label: "Disponibilidade", value: "99.99%", icon: <Activity /> },
        { label: "Transações/segundo", value: "5k+", icon: <BarChart2 /> },
        { label: "Usuários simultâneos", value: "25k+", icon: <Users /> }
      ],
      gallery: [
        "/images/casino-admin.jpg",
        "/images/casino-architecture.jpg",
        "/images/casino-monitoring.jpg"
      ]
    },
    {
      title: "Super Promos Bot",
      description: "Bot para Telegram que automatiza o disparo de promoções com links de afiliados.",
      extendedDescription: "Desenvolvido para otimizar campanhas de marketing de afiliados, o Super Promos Bot monitora automaticamente sites de e-commerce em busca de promoções, formatando e distribuindo-as para grupos de Telegram. O sistema utiliza web scraping avançado com rotação de proxies para evitar bloqueios, análise de dados para identificar as melhores ofertas e um algoritmo de NLP para gerar descrições atraentes para cada promoção.",
      icon: <MessageSquare className="w-6 h-6" />,
      tech: ["Python", "Telegram API", "BeautifulSoup", "NLTK", "Selenium"],
      highlight: "Automação inteligente de marketing",
      impact: "ROI de 300% em campanhas",
      image: "/images/telegram.jpg",
      github: "https://github.com/davirezende/super-promos-bot",
      live: "https://t.me/superpromosbot",
      stats: [
        { label: "Mensagens/dia", value: "2.5k", icon: <Activity /> },
        { label: "Acessos gerados", value: "15k/dia", icon: <Users /> },
        { label: "Taxa de conversão", value: "4.8%", icon: <BarChart2 /> }
      ],
      gallery: [
        "/images/telegram-dashboard.jpg",
        "/images/telegram-analytics.jpg",
        "/images/telegram-setup.jpg"
      ]
    }
  ];

  const handleCardClick = (index) => {
    if (expandedProject === index) {
      setExpandedProject(null);
    } else {
      setExpandedProject(index);
    }
  };

  return (
    <section id="projetos" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-emerald-900/10 to-gray-900/0" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-6 relative">
        <h2 className="text-4xl font-bold mb-16 flex items-center">
          <Code2 className="mr-2 text-emerald-400" />
          {language === 'pt-BR' ? 'Projetos em Destaque' : 
           language === 'zh-CN' ? '精选项目' : 
           'Featured Projects'}
          <div className="ml-4 h-px flex-grow bg-gradient-to-r from-emerald-400/50 to-transparent" />
        </h2>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: expandedProject === null || expandedProject === index ? 1 : 0.4,
                y: 0,
                scale: expandedProject === index ? 1 : 1
              }}
              transition={{ duration: 0.3 }}
              className={`group relative bg-gray-900/80 backdrop-blur-sm rounded-xl border border-emerald-500/10 hover:border-emerald-500/30 overflow-hidden ${
                expandedProject === index ? 'lg:col-span-3 lg:row-span-2' : ''
              }`}
            >
              {/* Regular Card Content */}
              <div 
                className={`relative ${expandedProject === index ? 'hidden' : 'block'}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-6">
                  <div className="relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg mb-6"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent rounded-lg" />
                  </div>
                  <div className="text-emerald-400 mb-4 flex items-center">
                    {project.icon}
                    <span className="ml-2 font-semibold">{project.title}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-emerald-400">
                      <Zap className="w-4 h-4 mr-2" />
                      <span className="text-sm">{project.highlight}</span>
                    </div>
                    <div className="flex items-center text-emerald-400">
                      <Award className="w-4 h-4 mr-2" />
                      <span className="text-sm">{project.impact}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-500/20"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-sm border border-emerald-500/20">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                  
                  {/* Call to action */}
                  <div className="mt-6 flex justify-center">
                    <button 
                      className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(index);
                      }}
                    >
                      <span className="mr-2">Ver detalhes</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Expanded Card Content */}
              <AnimatePresence>
                {expandedProject === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative p-6 lg:p-8"
                  >
                    <button 
                      className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/50 rounded-full p-2"
                      onClick={() => setExpandedProject(null)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    {/* Header with project title */}
                    <div className="flex items-center mb-6">
                      {project.icon}
                      <h3 className="text-2xl font-bold ml-2 text-emerald-400">{project.title}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main content */}
                      <div className="lg:col-span-2">
                        {/* Image gallery */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {project.gallery?.map((img, i) => (
                            <div key={i} className={`rounded-lg overflow-hidden ${i === 0 ? 'md:col-span-3' : ''}`}>
                              <img 
                                src={img} 
                                alt={`${project.title} screenshot ${i+1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                        
                        {/* Extended description */}
                        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                          <h4 className="text-lg font-semibold mb-3">Sobre o projeto</h4>
                          <p className="text-gray-300">{project.extendedDescription}</p>
                        </div>
                        
                        {/* Key metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {project.stats?.map((stat, i) => (
                            <div key={i} className="bg-gray-800/30 rounded-lg p-4 flex flex-col items-center justify-center text-center">
                              <div className="bg-emerald-500/20 p-3 rounded-full mb-2">
                                {stat.icon}
                              </div>
                              <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                              <div className="text-xs text-gray-400">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Sidebar */}
                      <div>
                        {/* Tech stack with visual indicators */}
                        <div className="bg-gray-800/50 rounded-lg p-6 mb-6">
                          <h4 className="flex items-center text-lg font-semibold mb-4">
                            <Code className="w-5 h-5 mr-2 text-emerald-400" />
                            Stack Tecnológico
                          </h4>
                          <div className="space-y-2">
                            {project.tech.map((tech, i) => (
                              <div key={i} className="flex items-center">
                                <div className="w-1 h-1 bg-emerald-400 rounded-full mr-2"></div>
                                <span>{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Action buttons */}
                        <div className="space-y-3">
                          {project.github && (
                            <a 
                              href={project.github}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-gray-800 hover:bg-gray-700 text-white rounded-lg py-3 px-4 flex items-center justify-center w-full transition-colors"
                            >
                              <Github className="mr-2" />
                              <span>Ver código-fonte</span>
                            </a>
                          )}
                          
                          {project.live && (
                            <a 
                              href={project.live}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-3 px-4 flex items-center justify-center w-full transition-colors"
                            >
                              <ExternalLink className="mr-2" />
                              <span>Ver projeto ao vivo</span>
                            </a>
                          )}
                        </div>
                        
                        {/* Key features list */}
                        <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
                          <h4 className="text-sm uppercase text-gray-400 mb-2">Destaques</h4>
                          <div className="space-y-2">
                            <div className="flex items-start">
                              <Zap className="w-4 h-4 mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{project.highlight}</span>
                            </div>
                            <div className="flex items-start">
                              <Award className="w-4 h-4 mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-gray-300">{project.impact}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
