import React, { useState, useEffect } from 'react';

const produceSpans = (text, animation) => {
  return text.split('').map((letter, index) => (
    <span key={index} className={animation}>
      {letter}
    </span>
  ));
};

const Position = ({ language }) => {
  const [animationIndex, setAnimationIndex] = useState(0);
  
  const positions = {
    'pt-BR': [
      "Desenvolvedor FullStack",
      "Especialista em Backend",
      "Engenheiro de Software",
      "Solucionador de problemas"
    ],
    'en-US': [
      "FullStack Developer",
      "Backend Specialist",
      "Software Engineer",
      "Problem Solver"
    ],
    'zh-CN': [
      "全栈开发者",
      "后端专家",
      "软件工程师",
      "问题解决者"
    ]
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationIndex((prev) => 
        prev === positions[language].length - 1 ? 0 : prev + 1
      );
    }, 3000);
    
    return () => clearInterval(timer);
  }, [language]);
  
  return (
    <div className="relative h-[32px] sm:h-[40px] overflow-hidden my-2">
      {positions[language].map((position, index) => (
        <p 
          key={index}
          className={`absolute left-0 m-0 text-[16px] sm:text-[20px] font-normal text-gray-300 transition-transform duration-500 ${
            index === animationIndex ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {position}
        </p>
      ))}
    </div>
  );
};

export default Position;
