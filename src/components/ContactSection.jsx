import React, { useState } from 'react';
import { MessageSquare, Mail, Send, Linkedin, Phone, FileText, Calendar, Github, Globe, Bookmark, Clock, MapPin, Briefcase, Compass } from 'lucide-react';

const ContactSection = ({ language = 'pt-BR' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('quick'); // 'quick' ou 'form'
  
  // Traduções
  const translations = {
    'pt-BR': {
      connect: 'Vamos Conectar',
      openToOpportunities: 'Aberto a Novas Oportunidades',
      lookingFor: 'Sempre em busca de projetos desafiadores e oportunidades de crescimento profissional. Disponível para avaliar propostas que se alinhem com minha trajetória e ambições.',
      openToProposals: 'Aberto a Propostas Interessantes',
      internationalWork: 'Disponível para Trabalho Internacional',
      workModes: 'Remoto / Híbrido / Presencial',
      downloadCV: 'Download CV',
      quickContact: 'Contato Rápido',
      professionalProposals: 'Propostas Profissionais',
      contactChannels: 'Canais de Contato',
      professionalConnections: 'Conexões profissionais',
      preferred: 'Preferencial',
      professionalEmail: 'Email Profissional',
      urgentMatters: 'Para assuntos urgentes',
      scheduleCall: 'Agendar Conversa',
      availableSlots: 'Horários disponíveis',
      professionalInfo: 'Informações Profissionais',
      availability: 'Disponibilidade',
      legallyAvailable: 'Legalmente disponível para trabalho no exterior',
      flexibleWork: 'Flexível para trabalho remoto ou presencial',
      interviewAvailability: 'Entrevistas após horário comercial ou aos fins de semana',
      recruiterMaterial: 'Material para Recrutadores',
      updatedResume: 'Currículo Atualizado',
      detailedPortfolio: 'Portfólio Detalhado',
      professionalProfiles: 'Perfis Profissionais',
      algorithmsProfile: 'Perfil de Algoritmos',
      proposalReceived: 'Proposta recebida!',
      willAnalyze: 'Analisarei sua proposta com atenção e retornarei em breve.',
      name: 'Nome',
      yourName: 'Seu nome',
      email: 'Email',
      yourEmail: 'seu@email.com',
      company: 'Empresa',
      companyName: 'Nome da empresa',
      opportunityDetails: 'Detalhes da Oportunidade',
      positionDescription: 'Descrição da posição, localização, modalidade de trabalho, faixa salarial...',
      internationalOpportunity: 'Esta é uma oportunidade internacional',
      sendProposal: 'Enviar Proposta',
      sending: 'Enviando...',
      multiLanguageMaterial: 'Material em Múltiplos Idiomas',
      portuguese: 'Português',
      english: 'English',
      chinese: '中文 (Chinese)'
    },
    'en-US': {
      connect: 'Let\'s Connect',
      openToOpportunities: 'Open to New Opportunities',
      lookingFor: 'Always seeking challenging projects and professional growth opportunities. Available to evaluate proposals that align with my career path and ambitions.',
      openToProposals: 'Open to Interesting Proposals',
      internationalWork: 'Available for International Work',
      workModes: 'Remote / Hybrid / On-site',
      downloadCV: 'Download CV',
      quickContact: 'Quick Contact',
      professionalProposals: 'Professional Proposals',
      contactChannels: 'Contact Channels',
      professionalConnections: 'Professional connections',
      preferred: 'Preferred',
      professionalEmail: 'Professional Email',
      urgentMatters: 'For urgent matters',
      scheduleCall: 'Schedule a Call',
      availableSlots: 'Available slots',
      professionalInfo: 'Professional Information',
      availability: 'Availability',
      legallyAvailable: 'Legally available to work abroad',
      flexibleWork: 'Flexible for remote or on-site work',
      interviewAvailability: 'Interviews after business hours or on weekends',
      recruiterMaterial: 'Material for Recruiters',
      updatedResume: 'Updated Resume',
      detailedPortfolio: 'Detailed Portfolio',
      professionalProfiles: 'Professional Profiles',
      algorithmsProfile: 'Algorithms Profile',
      proposalReceived: 'Proposal received!',
      willAnalyze: 'I will carefully analyze your proposal and get back to you soon.',
      name: 'Name',
      yourName: 'Your name',
      email: 'Email',
      yourEmail: 'your@email.com',
      company: 'Company',
      companyName: 'Company name',
      opportunityDetails: 'Opportunity Details',
      positionDescription: 'Position description, location, work mode, salary range...',
      internationalOpportunity: 'This is an international opportunity',
      sendProposal: 'Send Proposal',
      sending: 'Sending...',
      multiLanguageMaterial: 'Material in Multiple Languages',
      portuguese: 'Portuguese',
      english: 'English',
      chinese: 'Chinese'
    },
    'zh-CN': {
      connect: '让我们联系',
      openToOpportunities: '开放新机会',
      lookingFor: '始终寻求具有挑战性的项目和专业成长机会。可以评估与我的职业道路和抱负相符的提案。',
      openToProposals: '对有趣的提案持开放态度',
      internationalWork: '可进行国际工作',
      workModes: '远程 / 混合 / 现场',
      downloadCV: '下载简历',
      quickContact: '快速联系',
      professionalProposals: '专业提案',
      contactChannels: '联系渠道',
      professionalConnections: '专业连接',
      preferred: '首选',
      professionalEmail: '专业邮箱',
      urgentMatters: '紧急事项',
      scheduleCall: '安排通话',
      availableSlots: '可用时段',
      professionalInfo: '专业信息',
      availability: '可用性',
      legallyAvailable: '可合法在国外工作',
      flexibleWork: '灵活的远程或现场工作',
      interviewAvailability: '工作时间后或周末进行面试',
      recruiterMaterial: '招聘人员资料',
      updatedResume: '更新的简历',
      detailedPortfolio: '详细作品集',
      professionalProfiles: '专业档案',
      algorithmsProfile: '算法档案',
      proposalReceived: '收到提案！',
      willAnalyze: '我将仔细分析您的提案并尽快回复。',
      name: '姓名',
      yourName: '您的姓名',
      email: '电子邮件',
      yourEmail: '您的邮箱地址',
      company: '公司',
      companyName: '公司名称',
      opportunityDetails: '机会详情',
      positionDescription: '职位描述、地点、工作模式、薪资范围...',
      internationalOpportunity: '这是一个国际机会',
      sendProposal: '发送提案',
      sending: '发送中...',
      multiLanguageMaterial: '多语言材料',
      portuguese: '葡萄牙语',
      english: '英语',
      chinese: '中文'
    }
  };
  
  const t = translations[language] || translations['pt-BR'];
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', company: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contato" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-emerald-900/5 to-gray-900/0" />
      
      {/* Background grid pattern */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: "linear-gradient(to right, rgba(16, 185, 129, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px"
      }} />
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center mb-14">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 mb-5">
            <MessageSquare className="mr-2 text-emerald-400 h-4 w-4" />
            <span className="text-sm text-emerald-400 font-medium">{t.connect}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">
            {t.openToOpportunities}
          </h2>
          
          <p className="text-gray-300 max-w-2xl text-center">
            {t.lookingFor}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Status bar - reformulado para perfil empregado mas aberto a propostas */}
          <div className="w-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm rounded-xl p-4 mb-8 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center">
              <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse mr-2"></div>
              <span className="text-blue-400 font-medium">{t.openToProposals}</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-sm text-gray-300">
                <Compass className="h-4 w-4 mr-1 text-blue-400" />
                <span>{t.internationalWork}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-1 text-blue-400" />
                <span>{t.workModes}</span>
              </div>
              
              <a 
                href="/cv_daviqr1.pdf" 
                target="_blank" 
                className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <FileText className="h-4 w-4 mr-1" />
                <span>{t.downloadCV}</span>
              </a>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
            {/* Tabs para escolher entre contato rápido e formulário */}
            <div className="flex border-b border-gray-700/50">
              <button 
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'quick' ? 'bg-blue-500/10 text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setActiveTab('quick')}
              >
                {t.quickContact}
              </button>
              <button 
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${activeTab === 'form' ? 'bg-blue-500/10 text-blue-400 border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-200'}`}
                onClick={() => setActiveTab('form')}
              >
                {t.professionalProposals}
              </button>
            </div>
            
            <div className="p-8">
              {activeTab === 'quick' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Canais de contato rápido - prioridade para recrutadores */}
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6">{t.contactChannels}</h3>
                    
                    <div className="space-y-6">
                      {/* LinkedIn - Canal preferido por recrutadores */}
                      <a 
                        href="https://linkedin.com/in/davirezende" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/20 rounded-lg transition-all group"
                      >
                        <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center mr-4">
                          <Linkedin className="h-6 w-6 text-blue-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">LinkedIn</h4>
                          <p className="text-sm text-gray-300">{t.professionalConnections}</p>
                        </div>
                        <div className="ml-auto bg-blue-600/30 rounded-full px-3 py-1 text-xs font-medium text-blue-300">
                          {t.preferred}
                        </div>
                      </a>
                      
                      {/* Email corporativo */}
                      <a 
                        href="mailto:davidbecam006@gmail.com" 
                        className="flex items-center p-4 bg-emerald-500/10 hover:bg-emerald-500/15 border border-emerald-500/20 rounded-lg transition-all group"
                      >
                        <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                          <Mail className="h-6 w-6 text-emerald-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{t.professionalEmail}</h4>
                          <p className="text-sm text-emerald-300">davidbecam006@gmail.com</p>
                        </div>
                      </a>

                      {/* WhatsApp Business */}
                      <a 
                        href="https://wa.me/5527997602355" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-green-600/10 hover:bg-green-600/15 border border-green-600/20 rounded-lg transition-all group"
                      >
                        <div className="h-12 w-12 rounded-full bg-green-600/20 flex items-center justify-center mr-4">
                          <Phone className="h-6 w-6 text-green-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">WhatsApp</h4>
                          <p className="text-sm text-gray-300">{t.urgentMatters}</p>
                        </div>
                      </a>
                      
                      {/* Agendamento automático */}
                      <a 
                        href="https://calendly.com/daviqr1" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-4 bg-purple-600/10 hover:bg-purple-600/15 border border-purple-600/20 rounded-lg transition-all group"
                      >
                        <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center mr-4">
                          <Calendar className="h-6 w-6 text-purple-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{t.scheduleCall}</h4>
                          <p className="text-sm text-gray-300">{t.availableSlots}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                  
                  {/* Perfis profissionais e recursos adicionais */}
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6">
                      <span className="flex items-center">
                        <Briefcase className="h-6 w-6 mr-2 text-blue-400" />
                        {t.professionalInfo}
                      </span>
                    </h3>
                    
                    {/* Nova seção de disponibilidade */}
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden mb-6">
                      <div className="p-5">
                        <h4 className="flex items-center text-lg font-medium text-white mb-3">
                          <Clock className="h-5 w-5 mr-2 text-blue-400" /> 
                          <span>{t.availability}</span>
                        </h4>
                        
                        <div className="space-y-3 text-sm text-gray-300">
                          <div className="flex items-center p-3 bg-gray-700/30 rounded-md">
                            <Globe className="h-5 w-5 mr-3 text-blue-400" />
                            <span>{t.legallyAvailable}</span>
                          </div>
                          
                          <div className="flex items-center p-3 bg-gray-700/30 rounded-md">
                            <MapPin className="h-5 w-5 mr-3 text-blue-400" />
                            <span>{t.flexibleWork}</span>
                          </div>
                          
                          <div className="flex items-center p-3 bg-gray-700/30 rounded-md">
                            <Calendar className="h-5 w-5 mr-3 text-blue-400" />
                            <span>{t.interviewAvailability}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Material em múltiplos idiomas */}
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden mb-6">
                      <div className="p-5">
                        <h4 className="flex items-center text-lg font-medium text-white mb-3">
                          <Globe className="h-5 w-5 mr-2 text-blue-400" /> 
                          <span>{t.multiLanguageMaterial}</span>
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <a 
                            href="/cv_daviqr1_pt.pdf" 
                            target="_blank" 
                            className="flex items-center p-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-md transition-colors"
                          >
                            <div className="mr-3 text-green-400">
                              <span className="font-bold">PT</span>
                            </div>
                            <span className="text-sm text-white">{t.portuguese}</span>
                          </a>
                          
                          <a 
                            href="/cv_daviqr1_en.pdf" 
                            target="_blank" 
                            className="flex items-center p-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-md transition-colors"
                          >
                            <div className="mr-3 text-blue-400">
                              <span className="font-bold">EN</span>
                            </div>
                            <span className="text-sm text-white">{t.english}</span>
                          </a>
                          
                          <a 
                            href="/cv_daviqr1_zh.pdf" 
                            target="_blank" 
                            className="flex items-center p-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-md transition-colors"
                          >
                            <div className="mr-3 text-red-400">
                              <span className="font-bold">中文</span>
                            </div>
                            <span className="text-sm text-white">{t.chinese}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Material para download */}
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden mb-6">
                      <div className="p-5">
                        <h4 className="flex items-center text-lg font-medium text-white mb-3">
                          <FileText className="h-5 w-5 mr-2 text-blue-400" /> 
                          <span>{t.recruiterMaterial}</span>
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <a 
                            href="/cv_daviqr1.pdf" 
                            target="_blank" 
                            className="flex items-center p-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-md transition-colors"
                          >
                            <div className="mr-3 text-blue-400">
                              <FileText className="h-5 w-5" />
                            </div>
                            <span className="text-sm text-white">{t.updatedResume}</span>
                          </a>
                          
                          <a 
                            href="/portfolio_daviqr1.pdf" 
                            target="_blank" 
                            className="flex items-center p-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-md transition-colors"
                          >
                            <div className="mr-3 text-blue-400">
                              <Bookmark className="h-5 w-5" />
                            </div>
                            <span className="text-sm text-white">{t.detailedPortfolio}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    {/* Links profissionais */}
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg overflow-hidden">
                      <div className="p-5">
                        <h4 className="flex items-center text-lg font-medium text-white mb-3">
                          <Globe className="h-5 w-5 mr-2 text-blue-400" /> 
                          <span>{t.professionalProfiles}</span>
                        </h4>
                        
                        <div className="space-y-3">
                          <a 
                            href="https://github.com/daviqr1" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-gray-700/50 hover:bg-gray-700/70 rounded-md transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="mr-3 text-white">
                                <Github className="h-5 w-5" />
                              </div>
                              <span className="text-sm text-white">GitHub</span>
                            </div>
                            <span className="text-xs text-gray-400">daviqr1</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-2xl mx-auto">
                  {submitted ? (
                    <div className="h-full flex items-center justify-center py-10">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <p className="text-xl font-medium text-blue-300">{t.proposalReceived}</p>
                        <p className="text-gray-400 mt-2">{t.willAnalyze}</p>
                      </div>
                    </div>
                  ) : (
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">{t.name}</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder={t.yourName}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">{t.email}</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder={t.yourEmail}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t.company}</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder={t.companyName}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">{t.opportunityDetails}</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                          placeholder={t.positionDescription}
                          rows="5"
                          required
                        ></textarea>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="international"
                          id="international"
                          className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-700 rounded"
                        />
                        <label htmlFor="international" className="ml-2 text-sm text-gray-300">{t.internationalOpportunity}</label>
                      </div>
                      <button
                        type="submit"
                        className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                        disabled={loading}
                      >
                        {loading ? t.sending : t.sendProposal}
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
