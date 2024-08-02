import React from 'react';
import styled, { keyframes } from 'styled-components';

const HeadlineContainer = styled.div`
  position: relative;
  background-color: #171023;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 96px 112px;
  box-sizing: border-box;
  gap: 136px;
  text-align: left;
  font-size: 40px;
  color: #f5f6f6;
  font-family: Heebo;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 48px 24px;
  }
`;

const Container = styled.div`
  width: 592px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 32px;

  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
  }
`;

const typing = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const HiImLina = styled.div`
  position: relative;
  line-height: 56px;
  font-family: Kalam;
  background: linear-gradient(90deg, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${typing} 6s steps(30, end); /* Animação de digitação */

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;

const Text = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  font-size: 24px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const FullStackDeveloperAnd = styled.div`
  align-self: stretch;
  position: relative;
  line-height: 32px;
  font-weight: 500;
`;

const Over4Years = styled.div`
  align-self: stretch;
  position: relative;
  font-size: 16px;
  line-height: 24px;
  color: #cdd0d4;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const Cta = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  text-align: center;
  font-size: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const Button = styled.a`
  border-radius: 8px;
  background-color: #413a4f;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  box-sizing: border-box;
  gap: 8px;
  min-width: 112px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

const Button1 = styled.a`
  border-radius: 8px;
  background-color: #8a42db;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  box-sizing: border-box;
  gap: 8px;
  min-width: 112px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

const Label = styled.div`
  flex: 1;
  position: relative;
  line-height: 24px;
  font-weight: 500;
`;

const ReadcvlogoIcon = styled.img`
  width: 24px;
  position: relative;
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
  }
`;

const CodeTypingbroIcon = styled.img`
  width: 488px;
  position: relative;
  height: 417px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const Headline = () => {
  return (
    <HeadlineContainer>
      <Container>
        <HiImLina>Hi! 👋  </HiImLina>
        <Text>
          <FullStackDeveloperAnd>I'm Full-stack developer and innovation enthusiast</FullStackDeveloperAnd>
          <Over4Years>With 3 years of experience in Web development for the Fundação de Amparo a Pesquisa (FAPES) using Php, Laravel, Bootstrap, ViteJs as the main Stacks and I currently work as a specialist in API development and Online Casino Setup.
          I also develop and configure chatbots for companies through my CNPJ (Fiscal Address) like EIM.</Over4Years>
        </Text>
        <Cta>
          <Button href="/images/CV Dai Rezende Software Engineer En_us.pdf" download>
            <ReadcvlogoIcon alt="Read CV" src="/images/ReadCvLogo.svg" />
            <Label>My resume</Label>
          </Button>
          <Button1 href="https://wa.me/5527997602355" target="_blank" rel="noopener noreferrer">
            <Label>Get in touch</Label>
            <ReadcvlogoIcon alt="Arrow Right" src="/images/ArrowRight.svg" />
          </Button1>
        </Cta>
      </Container>
      <CodeTypingbroIcon alt="Code Typing" src="/images/Code_typing_bro.svg" />
    </HeadlineContainer>
  );
};

export default Headline;
