import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Wifi, Cpu, MemoryStick, Calendar, Clock, ChevronRight, X, Maximize, Minimize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Terminal = ({ onClose, autoClose = true }) => {
  const [visibleText, setVisibleText] = useState('');
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const terminalRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Comandos mais interessantes com respostas (reduzidos)
  const terminalSequence = [
    { command: 'initializing_system.exe', delay: 500 },
    { command: 'loading_neural_interface.dll', delay: 600 },
    { command: 'bypassing_security_protocols...', delay: 700 },
    { command: 'access_granted: welcome_to_daviqr1_terminal', delay: 800 },
    { command: 'profile_loaded_successfully', delay: 400 },
  ];
  
  // Estatísticas falsas para o painel
  const stats = {
    cpu: Math.floor(Math.random() * 30) + 30,
    memory: Math.floor(Math.random() * 40) + 40,
    network: ['192.168.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255), 
              'connected', Math.floor(Math.random() * 90) + 10 + 'ms'],
  };

  // Efeito para atualizar o relógio
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Efeito de glitch aleatório
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 150);
    }, Math.random() * 5000 + 3000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Efeito de digitação
  useEffect(() => {
    if (currentCommandIndex >= terminalSequence.length) {
      setTypingComplete(true);
      
      if (autoClose) {
        const timer = setTimeout(() => {
          onClose();
        }, 3000); // Reduzido para 3 segundos
        return () => clearTimeout(timer);
      }
      return;
    }

    const currentCommand = terminalSequence[currentCommandIndex].command;
    // Velocidade de digitação aumentada
    const typingSpeed = Math.floor(Math.random() * 20) + 15; 

    if (currentCharIndex < currentCommand.length) {
      const timer = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
        setVisibleText(prev => prev + currentCommand[currentCharIndex]);
        
        // Scroll para o final do terminal
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else {
      const advanceTimer = setTimeout(() => {
        setVisibleText(prev => prev + '\n');
        setCurrentCommandIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, terminalSequence[currentCommandIndex].delay);
      
      return () => clearTimeout(advanceTimer);
    }
  }, [currentCommandIndex, currentCharIndex, autoClose, onClose]);

  // Formatação do texto para adicionar cores e estilos
  const formattedText = visibleText.split('\n').map((line, index) => {
    if (line.includes('error') || line.includes('failed')) {
      return <span key={index} className="text-red-500">{line}</span>;
    } else if (line.includes('success') || line.includes('granted') || line.includes('loaded_successfully')) {
      return <span key={index} className="text-emerald-400">{line}</span>;
    } else if (line.includes('scanning') || line.includes('loading') || line.includes('connecting')) {
      return <span key={index} className="text-amber-400">{line}</span>;
    } else if (line.includes('bypassing') || line.includes('neural')) {
      return <span key={index} className="text-purple-400">{line}</span>;
    } else {
      return <span key={index} className="text-blue-300">{line}</span>;
    }
  });

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
        initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
        animate={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
        exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="w-full max-w-3xl h-[60vh] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-lg overflow-hidden border border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, type: 'spring' }}
        >
          {/* Barra de título */}
          <div className="bg-gray-900 text-white p-2 border-b border-emerald-500/30 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex items-center font-mono text-xs">
              <TerminalIcon size={14} className="mr-2 text-emerald-400" />
              <span className="text-emerald-400">SYSTEM</span>
              <span className="mx-1 text-gray-600">//</span>
              <span className="text-blue-400">TERMINAL</span>
            </div>
            <div className="flex space-x-3">
              <X 
                size={14} 
                className="text-gray-400 hover:text-red-400 cursor-pointer" 
                onClick={onClose}
              />
            </div>
          </div>
          
          {/* Layout do terminal com grid */}
          <div className="grid grid-cols-4 h-[calc(60vh-32px)]">
            {/* Painel de estatísticas */}
            <div className="col-span-1 border-r border-emerald-500/20 bg-gray-900/50 p-3 flex flex-col text-xs">
              <h3 className="text-emerald-400 font-bold uppercase mb-2 pb-2 border-b border-emerald-500/20">
                Status
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <Cpu size={14} className="mr-2 text-emerald-400" />
                      <span className="text-gray-300">CPU</span>
                    </div>
                    <span className="text-emerald-400">{stats.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <motion.div 
                      className="bg-emerald-500 h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.cpu}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <MemoryStick size={14} className="mr-2 text-blue-400" />
                      <span className="text-gray-300">Memory</span>
                    </div>
                    <span className="text-blue-400">{stats.memory}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <motion.div 
                      className="bg-blue-500 h-1.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.memory}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                
                <div className="pt-2 border-t border-emerald-500/10">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2 text-amber-400" />
                      <span className="text-gray-400">
                        {currentTime.toLocaleTimeString('pt-BR')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terminal principal */}
            <div 
              ref={terminalRef}
              className="col-span-3 bg-gray-950 p-4 font-mono text-sm overflow-auto relative"
              style={{
                backgroundImage: 'linear-gradient(0deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
              }}
            >
              {/* Efeito de scanlines */}
              <div className="absolute inset-0 pointer-events-none" 
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 1px, transparent 1px, transparent 2px)',
                  backgroundSize: '100% 2px'
                }}
              />
              
              {/* Texto do terminal */}
              <div className={`relative ${glitchText ? 'animate-pulse' : ''}`}>
                <div className="text-emerald-500 mb-3">
                  <pre className="whitespace-pre-wrap text-sm">
{`
██████╗  █████╗ ██╗   ██╗██╗ ██████╗ ██████╗  ██╗
██╔══██╗██╔══██╗██║   ██║██║██╔═══██╗██╔══██╗███║
██║  ██║███████║██║   ██║██║██║   ██║██████╔╝╚██║
██║  ██║██╔══██║╚██╗ ██╔╝██║██║▄▄ ██║██╔══██╗ ██║
██████╔╝██║  ██║ ╚████╔╝ ██║╚██████╔╝██║  ██║ ██║
╚═════╝ ╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚══▀▀═╝ ╚═╝  ╚═╝ ╚═╝
`}</pre>
                </div>
                
                <div className="space-y-1">
                  {formattedText.map((line, index) => (
                    <div key={index} className="flex">
                      <span className="text-emerald-400 mr-2">
                        <ChevronRight size={14} />
                      </span>
                      {line}
                    </div>
                  ))}
                </div>
                
                {/* Cursor piscante */}
                {!typingComplete && (
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-pulse" />
                )}

                {/* Mensagem de fechamento */}
                {typingComplete && autoClose && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 py-1 px-4 border border-emerald-500/30 rounded bg-gray-900/70"
                  >
                    <div className="flex items-center">
                      <div className="animate-spin mr-3">
                        <div className="h-3 w-3 border-2 border-emerald-500 border-r-transparent rounded-full" />
                      </div>
                      <span className="text-emerald-400 text-sm">
                        Sistema inicializado. Bem-vindo...
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Terminal;