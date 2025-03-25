import React, { useState } from 'react';
import { Code2, Cpu, Database, MessageSquare, Zap, Award, ArrowRight, Github, ExternalLink, X, BarChart2, Clock, Users, Activity, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectsSection.module.css';

const ProjectsSection = ({ language }) => {
  const [expandedProject, setExpandedProject] = useState(null);

  const translations = {
    'pt-BR': {
      featuredProjects: 'Projetos em Destaque',
      viewDetails: 'Ver detalhes',
      aboutProject: 'Sobre o projeto',
      techStack: 'Stack Tecnológico',
      viewSourceCode: 'Ver código-fonte',
      viewLiveProject: 'Ver projeto ao vivo',
      highlights: 'Destaques',
      numberOfUsers: 'Número de usuários',
      dataCollected: 'Dados coletados',
      chipsManufactured: 'Chips Fabricados',
      messagesPerDay: 'Mensagens/dia',
      accessesGenerated: 'Acessos gerados',
      conversionRate: 'Taxa de conversão'
    },
    'en-US': {
      featuredProjects: 'Featured Projects',
      viewDetails: 'View details',
      aboutProject: 'About the project',
      techStack: 'Tech Stack',
      viewSourceCode: 'View source code',
      viewLiveProject: 'View live project',
      highlights: 'Highlights',
      numberOfUsers: 'Number of users',
      dataCollected: 'Data collected',
      chipsManufactured: 'Chips Manufactured',
      messagesPerDay: 'Messages/day',
      accessesGenerated: 'Accesses generated',
      conversionRate: 'Conversion rate'
    },
    'zh-CN': {
      featuredProjects: '精选项目',
      viewDetails: '查看详情',
      aboutProject: '关于项目',
      techStack: '技术栈',
      viewSourceCode: '查看源代码',
      viewLiveProject: '查看实时项目',
      highlights: '亮点',
      numberOfUsers: '用户数量',
      dataCollected: '数据收集',
      chipsManufactured: '芯片制造',
      messagesPerDay: '消息/天',
      accessesGenerated: '访问生成',
      conversionRate: '转换率'
    }
  };

  const t = translations[language] || translations['pt-BR'];

  const projects = [
    {
      title: "Harvester_v1",
      description: "Aplicativo de telemetria para tratores com integração ESP32, desenvolvido em JavaScript e C++ utilizando WebSocket para comunicação em tempo real te telemetria e monitoramento de dados.",
      extendedDescription: "Desenvolvido para otimizar operações agrícolas, o Harvester_v1 é uma solução IoT completa que coleta dados em tempo real de sensores instalados em tratores. A solução usa ESP32 como microcontrolador principal, conectando-se a um servidor WebSocket para transmissão contínua de dados críticos como posição GPS, consumo de combustível, temperatura do motor e status de implementos.",
      icon: <Cpu className="w-6 h-6" />,
      tech: ["JavaScript", "C++", "API REST", "ESP32", "Expo", "React-native", "WebSocket"],
      highlight: "Monitoramento em tempo real de dados de Telemetria",
      impact: "Coleta de dados de +400 Tratores em operação, aumentando a eficiência e produtividade na agricultura de precisão.",
      image: "/images/harvester-dashboard.jpg",
      
      stats: [
        { label: t.numberOfUsers, value: "429", icon: <Activity /> },
        { label: t.dataCollected, value: "4M+", icon: <BarChart2 /> },
        { label: t.chipsManufactured, value: "500+", icon: <Clock /> }
      ],
      gallery: [
        "/images/harvester-dashboard.jpg",
        "/images/harvester-mobile.jpg",
        "/images/harvester-hardware.jpg"
      ],
      translations: {
        'pt-BR': {
          description: "Aplicativo de telemetria para tratores com integração ESP32, desenvolvido em JavaScript e C++ utilizando WebSocket para comunicação em tempo real te telemetria e monitoramento de dados.",
          extendedDescription: "Desenvolvido para otimizar operações agrícolas, o Harvester_v1 é uma solução IoT completa que coleta dados em tempo real de sensores instalados em tratores. A solução usa ESP32 como microcontrolador principal, conectando-se a um servidor WebSocket para transmissão contínua de dados críticos como posição GPS, consumo de combustível, temperatura do motor e status de implementos.",
          highlight: "Monitoramento em tempo real de dados de Telemetria",
          impact: "Coleta de dados de +400 Tratores em operação, aumentando a eficiência e produtividade na agricultura de precisão."
        },
        'en-US': {
          description: "Telemetry application for tractors with ESP32 integration, developed in JavaScript and C++ using WebSocket for real-time communication of telemetry and data monitoring.",
          extendedDescription: "Developed to optimize agricultural operations, Harvester_v1 is a complete IoT solution that collects real-time data from sensors installed on tractors. The solution uses ESP32 as the main microcontroller, connecting to a WebSocket server for continuous transmission of critical data such as GPS position, fuel consumption, engine temperature and implement status.",
          highlight: "Real-time monitoring of Telemetry data",
          impact: "Data collection from +400 Tractors in operation, increasing efficiency and productivity in precision agriculture."
        },
        'zh-CN': {
          description: "用于拖拉机的遥测应用程序，集成了ESP32，使用JavaScript和C++开发，使用WebSocket进行遥测和数据监控的实时通信。",
          extendedDescription: "Harvester_v1旨在优化农业运营，是一个完整的物联网解决方案，可从安装在拖拉机上的传感器收集实时数据。该解决方案使用ESP32作为主微控制器，连接到WebSocket服务器以连续传输关键数据，如GPS位置、燃料消耗、发动机温度和工具状态。",
          highlight: "遥测数据的实时监控",
          impact: "从+400台运行中的拖拉机收集数据，提高精准农业的效率和生产力。"
        }
      }
    },
    {
      title: "Viper Backend",
      description: "Colaboração no desenvolvimento da infraestrutura backend para plataforma de jogos online.",
      extendedDescription: "Viperpro é um projeto de código aberto desenvolvido em PHP utilizando o Framework Laravel 10 e Vue 3, com várias integrações com diferentes provedores de iGaming. Este projeto é destinado para fins de estudo. Use-o com responsabilidade e consciência, e não o utilize para fins fraudulentos.",
      icon: <Database className="w-6 h-6" />,
      tech: ["PHP", "Laravel", "Node.js", "Vue3", "Prisma", "Docker", "Kubernetes", "SQLite", "Redis"],
      highlight: "Sistema de transações em tempo real",
      impact: "Processamento de +1M de transações/dia",
      image: "/images/casino-architecture.jpeg",
      github: "https://github.com/Daviqr1",
      stats: [
        { label: "NaN", value: "NaN%", icon: <Activity /> },
        { label: "NaN", value: "NaN", icon: <BarChart2 /> },
        { label: "NaN", value: "NaNkk", icon: <Users /> }
      ],
      gallery: [
        "/images/casino-admin.jpeg",
        "/images/casino-architecture.jpeg",
        "/images/casino-monitoring.jpeg"
      ],
      translations: {
        'pt-BR': {
          description: "Colaboração no desenvolvimento da infraestrutura backend para plataforma de jogos online.",
          extendedDescription: "Viperpro é um projeto de código aberto desenvolvido em PHP utilizando o Framework Laravel 10 e Vue 3, com várias integrações com diferentes provedores de iGaming. Este projeto é destinado para fins de estudo. Use-o com responsabilidade e consciência, e não o utilize para fins fraudulentos.",
          highlight: "Sistema de transações em tempo real",
          impact: "Processamento de +1M de transações/dia"
        },
        'en-US': {
          description: "Collaboration in the development of the backend infrastructure for an online gaming platform.",
          extendedDescription: "Viperpro is an open-source project developed in PHP using the Laravel 10 and Vue 3 Framework, with several integrations with different iGaming providers. This project is intended for study purposes. Use it responsibly and consciously, and do not use it for fraudulent purposes.",
          highlight: "Real-time transaction system",
          impact: "Processing of +1M transactions/day"
        },
        'zh-CN': {
          description: "合作开发在线游戏平台的后端基础设施。",
          extendedDescription: "Viperpro是一个使用Laravel 10和Vue 3框架在PHP中开发的开源项目，与不同的iGaming提供商有多个集成。这个项目是为学习目的而设计的。负责任和有意识地使用它，不要将其用于欺诈目的。",
          highlight: "实时交易系统",
          impact: "处理超过100万次交易/天"
        }
      }
    },
    {
      title: "Super Promos Bot",
      description: "Bot para Telegram que automatiza o disparo de promoções com links de afiliados.",
      extendedDescription: "Desenvolvido para otimizar campanhas de marketing de afiliados, o Super Promos Bot monitora automaticamente sites de e-commerce em busca de promoções, formatando e distribuindo-as para grupos de Telegram. O sistema utiliza web scraping avançado com rotação de proxies para evitar bloqueios, análise de dados para identificar as melhores ofertas e um algoritmo de NLP para gerar descrições atraentes para cada promoção.",
      icon: <MessageSquare className="w-6 h-6" />,
      tech: ["Python", "Telegram API", "BeautifulSoup", "NLTK", "Selenium"],
      highlight: "Automação inteligente de marketing",
      impact: "ROI de 300% em campanhas",
      image: "/images/telegram-dashboard.png",
      github: "https://github.com/Daviqr1",
      live: "https://t.me/PromoCentralBr",
      stats: [
        { label: t.messagesPerDay, value: "2.5k", icon: <Activity /> },
        { label: t.accessesGenerated, value: "15k/dia", icon: <Users /> },
        { label: t.conversionRate, value: "4.8%", icon: <BarChart2 /> }
      ],
      gallery: [
        "/images/telegram-dashboard.png",
        "/images/telegram-analytics.jpeg",
        "/images/telegram-setup.jpeg"
      ],
      translations: {
        'pt-BR': {
          description: "Bot para Telegram que automatiza o disparo de promoções com links de afiliados.",
          extendedDescription: "Desenvolvido para otimizar campanhas de marketing de afiliados, o Super Promos Bot monitora automaticamente sites de e-commerce em busca de promoções, formatando e distribuindo-as para grupos de Telegram. O sistema utiliza web scraping avançado com rotação de proxies para evitar bloqueios, análise de dados para identificar as melhores ofertas e um algoritmo de NLP para gerar descrições atraentes para cada promoção.",
          highlight: "Automação inteligente de marketing",
          impact: "ROI de 300% em campanhas"
        },
        'en-US': {
          description: "Bot for Telegram that automates the sending of promotions with affiliate links.",
          extendedDescription: "Developed to optimize affiliate marketing campaigns, the Super Promos Bot automatically monitors e-commerce sites for promotions, formatting and distributing them to Telegram groups. The system uses advanced web scraping with proxy rotation to avoid blocking, data analysis to identify the best offers, and an NLP algorithm to generate attractive descriptions for each promotion.",
          highlight: "Intelligent marketing automation",
          impact: "ROI of 300% in campaigns"
        },
        'zh-CN': {
          description: "用于Telegram的Bot，可自动发送带有联盟链接的促销活动。",
          extendedDescription: "Super Promos Bot旨在优化联盟营销活动，自动监控电子商务网站的促销活动，格式化并将其分发到Telegram群组。该系统使用高级网络抓取与代理轮换，以避免阻止，数据分析以识别最佳优惠，以及NLP算法以为每个促销活动生成有吸引力的描述。",
          highlight: "智能营销自动化",
          impact: "活动投资回报率达300%"
        }
      }
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
          {t.featuredProjects}
          <div className="ml-4 h-px flex-grow bg-gradient-to-r from-emerald-400/50 to-transparent" />
        </h2>
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const localizedProject = project.translations[language] || project.translations['pt-BR'];

            return (
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
                    <p className="text-gray-300 mb-4">{localizedProject.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-emerald-400">
                        <Zap className="w-4 h-4 mr-2" />
                        <span className="text-sm">{localizedProject.highlight}</span>
                      </div>
                      <div className="flex items-center text-emerald-400">
                        <Award className="w-4 h-4 mr-2" />
                        <span className="text-sm">{localizedProject.impact}</span>
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
                        <span className="mr-2">{t.viewDetails}</span>
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
                            <h4 className="text-lg font-semibold mb-3">{t.aboutProject}</h4>
                            <p className="text-gray-300">{localizedProject.extendedDescription}</p>
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
                              {t.techStack}
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
                                <span>{t.viewSourceCode}</span>
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
                                <span>{t.viewLiveProject}</span>
                              </a>
                            )}
                          </div>
                          
                          {/* Key features list */}
                          <div className="mt-6 bg-gray-800/30 rounded-lg p-4">
                            <h4 className="text-sm uppercase text-gray-400 mb-2">{t.highlights}</h4>
                            <div className="space-y-2">
                              <div className="flex items-start">
                                <Zap className="w-4 h-4 mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-300">{localizedProject.highlight}</span>
                              </div>
                              <div className="flex items-start">
                                <Award className="w-4 h-4 mr-2 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-300">{localizedProject.impact}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;