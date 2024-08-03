import { useEffect, useRef } from 'react';
import { BrowserRouter } from "react-router-dom";
import { ContactSection, Experience, Hero, Navbar, Portfolio,ProjectsSection } from "./components";
import Headline from './components/Headline';
import AboutSection from './components/AboutSection';




const App = () => {
  const wrapperRef = useRef(null);

  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <Navbar />
        <div className='wrapper' ref={wrapperRef}>
          <div id="hero" className='z-10'>
            <Hero scrollContainer={wrapperRef} />
          </div>
          <div id="portfolio" className='relative z-30 bg-primary mt-[-2px]'>
            <Headline />
          </div>
          <div id="portfolio" className='relative z-30 bg-primary'>
            <AboutSection/>
            </div>
          <div id="experience" className='relative z-30 bg-primary'>
            <ProjectsSection/>
          </div>
          <div id="contact" className='relative z-30 bg-primary'>
            <ContactSection/>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
