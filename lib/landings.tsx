import type { ReactNode } from "react";

// Conteudo das landing pages de servico. A estrutura visual fica em components/ServiceLanding.tsx.

export type LandingImage = { src: string; width: number; height: number; alt: string };

export type LandingField =
  | { kind: "phone"; label: string; name: string }
  | { kind: "text"; label: string; name: string; placeholder: string; autoComplete: string; maxLength: number }
  | { kind: "select"; label: string; name: string; placeholder: string; options: string[] };

export type LandingTrustAside =
  | { kind: "quote"; quote: string; author: string; role: string }
  | { kind: "proof"; value: string; unit: string; label: string; note: string }
  | { kind: "panel"; title: ReactNode; items: { title: string; text: string }[] };

export type Landing = {
  slug: string;
  /** Mesmo valor usado no campo "servico" do formulario da home. */
  servico: string;
  metaTitle: string;
  metaDescription: string;
  whatsappIntro: string;
  floatingLabel: string;
  hero: {
    title: ReactNode;
    intro: string;
    image: LandingImage;
    captionTag: string;
    captionLead: string;
    captionStrong: string;
  };
  form: { title: ReactNode; submit: string; fields: LandingField[] };
  band: string[];
  benefits: {
    title: ReactNode;
    text: string;
    items: { icon: ReactNode; title: string; text: string }[];
    cta: string;
  };
  trust: { title: ReactNode; description?: string; cta: string; aside: LandingTrustAside };
  about: {
    title: ReactNode;
    image: LandingImage;
    paragraphs: string[];
    facts: { value: string; label: ReactNode }[];
  };
  closing: { title: ReactNode; text: string; cta: string };
};

export const landings: Landing[] = [
  {
    slug: "rastreamento-veicular",
    servico: "Rastreamento veicular",
    metaTitle: "Rastreamento Veicular | Grupo Plata Serviços",
    metaDescription: "Rastreamento veicular e gestão de frotas empresariais no Ceará. Localização, rotas, alertas e videotelemetria com IA. Solicite uma proposta.",
    whatsappIntro: "Olá! Gostaria de uma proposta de rastreamento veicular e gestão de frotas.",
    floatingLabel: "Solicitar proposta de rastreamento veicular",
    hero: {
      title: <>Saiba onde sua frota está, como ela está sendo utilizada e <em>onde sua operação pode estar perdendo dinheiro.</em></>,
      intro: "Mais controle sobre veículos, motoristas, rotas, combustível e ocorrências em uma única operação.",
      image: { src: "/images/lp/rastreamento-veicular-hero.webp", width: 1536, height: 1024, alt: "Cena ilustrativa de acompanhamento de frota por mapa em celular e computador" },
      captionTag: "RASTREAMENTO VEICULAR",
      captionLead: "Sua frota em movimento.",
      captionStrong: "Sua gestão no controle.",
    },
    form: {
      title: <>Solicite uma proposta<br />para sua frota<span>.</span></>,
      submit: "QUERO UMA PROPOSTA PARA MINHA FROTA",
      fields: [
        { kind: "text", label: "Nome", name: "Nome", placeholder: "Como podemos chamar você?", autoComplete: "name", maxLength: 100 },
        { kind: "phone", label: "WhatsApp", name: "WhatsApp" },
        { kind: "text", label: "Cidade", name: "Cidade", placeholder: "Informe sua cidade", autoComplete: "address-level2", maxLength: 100 },
      ],
    },
    band: ["RASTREAMENTO", "GESTÃO DE FROTAS", "RASTREAMENTO VEICULAR", "VIDEOTELEMETRIA"],
    benefits: {
      title: <>Mais informação para tomar <em>decisões melhores sobre sua frota.</em></>,
      text: "Acompanhe o que acontece fora da empresa com informação clara para decidir melhor e agir mais rápido.",
      items: [
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 29s10-10 10-17a10 10 0 00-20 0c0 7 10 17 10 17z" /><circle cx="16" cy="12" r="3" /></svg>, title: "Rastreamento em tempo real", text: "Acompanhe a localização e movimentação dos veículos da operação." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 28V5M4 28h25M9 22v-7M16 22V9M23 22V4" /></svg>, title: "Gestão de custos", text: "Tenha mais visibilidade sobre combustível, multas e utilização da frota." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="7" width="18" height="18" rx="3" /><path d="M21 13l8-5v16l-8-5M8 12l7 4-7 4z" /></svg>, title: "Videotelemetria e IA", text: "Acompanhe comportamentos de risco e obtenha mais informações sobre o que acontece na operação." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="8" r="5" /><path d="M5 29v-5a11 11 0 0122 0v5M12 24h8" /></svg>, title: "Controle dos motoristas", text: "Mais dados para acompanhar direção, utilização dos veículos e padrões da operação." },
      ],
      cta: "Quero mais controle da minha frota",
    },
    trust: {
      title: <>Experiência acompanhando<br /><em>operações de frotas.</em></>,
      description: "Tecnologia, dados e acompanhamento para dar mais visibilidade à rotina dos seus veículos.",
      cta: "Solicitar uma análise da minha frota",
      aside: { kind: "proof", value: "~2.000", unit: "placas monitoradas", label: "pela Plata Serviços.", note: "Mais informação para acompanhar sua operação." },
    },
    about: {
      title: <>Tecnologia aplicada à <em>realidade da sua operação.</em></>,
      image: { src: "/images/lp/rastreamento-veicular-sobre.webp", width: 1536, height: 1024, alt: "Cena ilustrativa de instalação de um rastreador GPS em veículo" },
      paragraphs: ["Há mais de 8 anos, a Plata Serviços desenvolve soluções para empresas que precisam de mais controle, segurança e eficiência.", "Na gestão de frotas, combinamos rastreamento, dados e acompanhamento para ajudar gestores a enxergar melhor o que acontece diariamente com seus veículos."],
      facts: [{ value: "02", label: <>Bases em<br />Fortaleza e Sobral</> }, { value: "CE", label: <>Atendimento em<br />todo o Ceará</> }, { value: "~2 mil", label: <>Placas<br />monitoradas</> }],
    },
    closing: {
      title: <>Sua frota já gera dados todos os dias.<br /><em>Comece a utilizá-los para ter<br />mais controle da operação.</em></>,
      text: "Converse com a Plata e receba uma proposta de rastreamento e gestão para sua frota.",
      cta: "SOLICITAR UMA PROPOSTA",
    },
  },
  {
    slug: "seguranca-eletronica",
    servico: "Segurança eletrônica",
    metaTitle: "Segurança Eletrônica | Grupo Plata Serviços",
    metaDescription: "Segurança eletrônica para empresas e condomínios no Ceará. Monitoramento 24h, controle de acesso e atendimento próximo. Solicite sua proposta.",
    whatsappIntro: "Olá! Gostaria de uma proposta de segurança eletrônica para minha operação.",
    floatingLabel: "Solicitar proposta de segurança",
    hero: {
      title: <>Proteja seu patrimônio com <em>monitoramento 24h</em> e mais controle sobre a sua operação.</>,
      intro: "Tecnologia, controle de acesso e acompanhamento contínuo para aumentar a segurança da sua empresa ou condomínio.",
      image: { src: "/images/lp/seguranca-eletronica-hero.jpg", width: 1690, height: 955, alt: "Câmeras de segurança eletrônica no exterior de um edifício" },
      captionTag: "MONITORAMENTO 24H",
      captionLead: "Tecnologia e presença.",
      captionStrong: "Proteção que acompanha sua rotina.",
    },
    form: {
      title: <>Solicite uma proposta<br />para sua operação<span>.</span></>,
      submit: "QUERO RECEBER UMA PROPOSTA",
      fields: [
        { kind: "text", label: "Nome", name: "Nome", placeholder: "Como podemos chamar você?", autoComplete: "name", maxLength: 100 },
        { kind: "phone", label: "WhatsApp", name: "WhatsApp" },
        { kind: "text", label: "Empresa ou condomínio", name: "Empresa ou condomínio", placeholder: "Nome da empresa ou condomínio", autoComplete: "organization", maxLength: 150 },
        { kind: "text", label: "Cidade", name: "Cidade", placeholder: "Informe sua cidade", autoComplete: "address-level2", maxLength: 100 },
      ],
    },
    band: ["TECNOLOGIA", "CONTROLE DE ACESSO", "MONITORAMENTO 24H", "PROTEÇÃO"],
    benefits: {
      title: <>Segurança que acompanha<br />sua operação <em>24 horas por dia.</em></>,
      text: "Mais do que instalar tecnologia, a Plata estrutura uma solução de segurança adequada à realidade da sua empresa ou condomínio.",
      items: [
        { icon: "◷", title: "Monitoramento 24h", text: "Sua operação acompanhada continuamente para aumentar a proteção do patrimônio." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="3" width="18" height="26" rx="2" /><path d="M12 29V8h8v21M16 17h1" /></svg>, title: "Controle de acesso", text: "Mais controle sobre a entrada e saída de pessoas na sua empresa ou condomínio." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3l11 4v8c0 7-11 14-11 14S5 22 5 15V7zM11 15l4 4 7-8" /></svg>, title: "Solução para sua realidade", text: "A Plata entende os riscos e necessidades da operação antes de desenhar a solução." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 19v-4a11 11 0 0122 0v4M7 15H4v9h5v-9zM25 15h3v9h-5v-9zM25 24c0 4-5 5-9 5" /></svg>, title: "Atendimento próximo", text: "Equipe com atuação local e estrutura para acompanhar sua operação de perto." },
      ],
      cta: "Quero proteger minha empresa",
    },
    trust: {
      title: <>Confiança construída<br />na rotina de<br /><em>nossos clientes.</em></>,
            cta: "Fale com um especialista",
      aside: { kind: "quote", quote: "“A Plata entendeu os riscos da nossa empresa e montou uma solução compatível com a operação, sem complicar o que precisava ser simples.”", author: "Rafael S.", role: "Empresário" },
    },
    about: {
      title: <>Segurança com experiência, tecnologia e <em>presença local.</em></>,
      image: { src: "/images/lp/seguranca-eletronica-sobre.jpg", width: 1400, height: 933, alt: "Controle eletrônico de acesso por fechadura inteligente" },
      paragraphs: ["A Plata Serviços atua há mais de 8 anos, desenvolvendo soluções para empresas e condomínios que precisam de mais segurança, controle e tranquilidade em sua operação.", "Com bases em Fortaleza e Sobral, reunimos tecnologia, equipe capacitada e atendimento próximo para desenvolver soluções de acordo com a realidade de cada cliente."],
      facts: [{ value: "02", label: <>Bases em<br />Fortaleza e Sobral</> }, { value: "CE", label: <>Atendimento em<br />todo o Ceará</> }, { value: "24h", label: <>Monitoramento<br />contínuo</> }],
    },
    closing: {
      title: <>Sua empresa não precisa esperar<br />um problema acontecer para<br /><em>começar a se proteger.</em></>,
      text: "Conte o seu desafio e receba uma proposta de segurança eletrônica para sua operação.",
      cta: "SOLICITAR MINHA PROPOSTA",
    },
  },
  {
    slug: "administracao-de-condominios",
    servico: "Administração condominial",
    metaTitle: "Administração de Condomínios | Grupo Plata Serviços",
    metaDescription: "Administração profissional de condomínios no Ceará. Mais organização, transparência e controle. Solicite uma proposta à Plata.",
    whatsappIntro: "Olá! Gostaria de uma proposta de administração condominial para meu condomínio.",
    floatingLabel: "Solicitar proposta de administração condominial",
    hero: {
      title: <>Menos sobrecarga para o síndico. <em>Mais organização, transparência e controle</em> para o condomínio.</>,
      intro: "Conte com uma equipe especializada para apoiar a rotina administrativa, financeira e operacional do seu condomínio.",
      image: { src: "/images/lp/administracao-de-condominios-hero.jpg", width: 1400, height: 933, alt: "Edifícios residenciais em um condomínio" },
      captionTag: "GESTÃO CONDOMINIAL",
      captionLead: "Organização e transparência.",
      captionStrong: "Mais apoio na rotina do síndico.",
    },
    form: {
      title: <>Solicite uma proposta de<br />administração condominial<span>.</span></>,
      submit: "QUERO RECEBER UMA PROPOSTA",
      fields: [
        { kind: "text", label: "Nome", name: "Nome", placeholder: "Como podemos chamar você?", autoComplete: "name", maxLength: 100 },
        { kind: "phone", label: "WhatsApp", name: "WhatsApp" },
        { kind: "text", label: "Nome do condomínio", name: "Condomínio", placeholder: "Nome do seu condomínio", autoComplete: "organization", maxLength: 150 },
        { kind: "select", label: "Cargo da pessoa", name: "Cargo", placeholder: "Selecione seu cargo", options: ["Síndico(a)", "Síndico(a) profissional", "Conselheiro(a)", "Administrador(a)", "Representante de incorporadora / construtora", "Outro"] },
        { kind: "text", label: "Cidade", name: "Cidade", placeholder: "Informe sua cidade", autoComplete: "address-level2", maxLength: 100 },
      ],
    },
    band: ["TRANSPARÊNCIA", "APOIO AO SÍNDICO", "GESTÃO CONDOMINIAL", "ORGANIZAÇÃO"],
    benefits: {
      title: <>Uma gestão mais simples para o síndico e <em>mais transparente para os moradores.</em></>,
      text: "Uma equipe especializada para apoiar a gestão e trazer mais clareza à rotina do seu condomínio.",
      items: [
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 3h12l5 5v21H8zM20 3v6h5M12 14h9M12 19h9M12 24h6" /></svg>, title: "Prestação de contas", text: "Mais organização e clareza sobre receitas, despesas e movimentações do condomínio." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="9" r="4" /><circle cx="6" cy="12" r="3" /><circle cx="26" cy="12" r="3" /><path d="M8 29v-6a8 8 0 0116 0v6M2 25v-5a4 4 0 014-4M30 25v-5a4 4 0 00-4-4" /></svg>, title: "Suporte em assembleias", text: "Apoio na preparação, organização e condução das principais demandas administrativas." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="7" width="26" height="20" rx="3" /><path d="M3 13h26M8 21h6M8 3v4M24 3v4" /></svg>, title: "Gestão de arrecadação e despesas", text: "Mais controle sobre cobranças, pagamentos e compromissos financeiros." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 19v-4a11 11 0 0122 0v4M7 15H4v9h5v-9zM25 15h3v9h-5v-9zM25 24c0 4-5 5-9 5" /></svg>, title: "Apoio ao síndico", text: "Uma equipe para dividir responsabilidades e reduzir a sobrecarga da rotina condominial." },
      ],
      cta: "Quero melhorar a gestão do meu condomínio",
    },
    trust: {
      title: <>Experiência na rotina<br /><em>de condomínios.</em></>,
      description: "Organização, proximidade e apoio para quem cuida do condomínio todos os dias.",
      cta: "Falar com a equipe da Plata",
      aside: { kind: "proof", value: "50", unit: " condomínios", label: "atendidos pela Plata Serviços.", note: "Mais experiência para apoiar a sua gestão." },
    },
    about: {
      title: <>Experiência e proximidade para cuidar da <em>rotina do seu condomínio.</em></>,
      image: { src: "/images/lp/administracao-de-condominios-sobre.jpg", width: 1200, height: 801, alt: "Profissionais analisando documentos e planejamento financeiro" },
      paragraphs: ["A Plata Serviços atua há mais de 8 anos, oferecendo soluções para condomínios e empresas no Ceará.", "Nossa equipe combina experiência administrativa, tecnologia e atendimento próximo para apoiar síndicos na gestão financeira, administrativa e operacional do condomínio."],
      facts: [{ value: "02", label: <>Bases em<br />Fortaleza e Sobral</> }, { value: "CE", label: <>Atendimento em<br />todo o Ceará</> }, { value: "50", label: <>Condomínios<br />atendidos</> }],
    },
    closing: {
      title: <>Seu condomínio merece uma<br /><em>gestão mais organizada.</em><br />E você não precisa cuidar de tudo sozinho.</>,
      text: "Conte com a Plata para apoiar a gestão do seu condomínio.",
      cta: "SOLICITAR UMA PROPOSTA",
    },
  },
  {
    slug: "seguranca-patrimonial",
    servico: "Segurança patrimonial",
    metaTitle: "Segurança Patrimonial | Grupo Plata Serviços",
    metaDescription: "Segurança patrimonial para empresas e condomínios no Ceará. Profissionais capacitados e estrutura planejada para sua operação. Solicite uma proposta.",
    whatsappIntro: "Olá! Gostaria de uma proposta de segurança patrimonial para minha operação.",
    floatingLabel: "Solicitar proposta de segurança patrimonial",
    hero: {
      title: <>Proteja pessoas, patrimônio e operação com uma <em>estrutura de segurança profissional.</em></>,
      intro: "Equipe capacitada e solução planejada de acordo com as necessidades e riscos da sua operação.",
      image: { src: "/images/lp/seguranca-patrimonial-hero.webp", width: 1536, height: 1208, alt: "Profissionais da segurança patrimonial da Plata em campo" },
      captionTag: "SEGURANÇA PATRIMONIAL",
      captionLead: "Pessoas, processos e proteção.",
      captionStrong: "Presença profissional na sua operação.",
    },
    form: {
      title: <>Solicite uma proposta de<br />segurança patrimonial<span>.</span></>,
      submit: "QUERO RECEBER UMA PROPOSTA",
      fields: [
        { kind: "text", label: "Nome", name: "Nome", placeholder: "Como podemos chamar você?", autoComplete: "name", maxLength: 100 },
        { kind: "phone", label: "WhatsApp", name: "WhatsApp" },
        { kind: "text", label: "Cidade", name: "Cidade", placeholder: "Informe sua cidade", autoComplete: "address-level2", maxLength: 100 },
      ],
    },
    band: ["PROTEÇÃO DO PATRIMÔNIO", "PROFISSIONAIS CAPACITADOS", "SEGURANÇA PATRIMONIAL", "CONTROLE DE ACESSO"],
    benefits: {
      title: <>Segurança estruturada para a <em>realidade da sua operação.</em></>,
      text: "Profissionais, procedimentos e uma estrutura dimensionada para o porte, a rotina e os riscos do seu negócio.",
      items: [
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 3h12l5 5v21H8zM20 3v6h5M12 14h9M12 19h9M12 24h6" /></svg>, title: "Profissionais capacitados", text: "Equipe preparada para atuar de acordo com os procedimentos definidos para cada operação." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="9" r="4" /><circle cx="6" cy="12" r="3" /><circle cx="26" cy="12" r="3" /><path d="M8 29v-6a8 8 0 0116 0v6M2 25v-5a4 4 0 014-4M30 25v-5a4 4 0 00-4-4" /></svg>, title: "Proteção do patrimônio", text: "Presença profissional para reduzir vulnerabilidades e aumentar a segurança do ambiente." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="3" y="7" width="26" height="20" rx="3" /><path d="M3 13h26M8 21h6M8 3v4M24 3v4" /></svg>, title: "Controle de acesso", text: "Mais controle sobre movimentações de pessoas e áreas da empresa ou condomínio." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 19v-4a11 11 0 0122 0v4M7 15H4v9h5v-9zM25 15h3v9h-5v-9zM25 24c0 4-5 5-9 5" /></svg>, title: "Solução personalizada", text: "A estrutura de segurança é planejada de acordo com porte, rotina e riscos do local." },
      ],
      cta: "Quero avaliar a segurança da minha operação",
    },
    trust: {
      title: <>Segurança exige<br /><em>confiança.</em></>,
      description: "Profissionais treinados e capacitados para proteger empresas e condomínios. Uma solução construída a partir da realidade de cada operação.",
      cta: "Falar com um especialista",
      aside: { kind: "panel", title: <>Presença para proteger.<br />Estrutura para acompanhar.</>, items: [{ title: "Vigilância armada e desarmada", text: "Conforme a necessidade de cada operação." }, { title: "Pessoas e procedimentos", text: "Profissionais preparados e rotinas definidas." }, { title: "Atuação próxima no Ceará", text: "Bases em Fortaleza e Sobral." }] },
    },
    about: {
      title: <>Experiência para proteger <em>operações que não podem parar.</em></>,
      image: { src: "/images/lp/seguranca-patrimonial-sobre.webp", width: 1050, height: 1400, alt: "Equipe de segurança patrimonial da Plata" },
      paragraphs: ["A Plata Serviços atua há mais de 8 anos oferecendo soluções empresariais no Ceará.", "Nossa atuação combina pessoas, processos e tecnologia para estruturar operações de segurança adequadas à realidade de cada cliente."],
      facts: [{ value: "02", label: <>Bases em<br />Fortaleza e Sobral</> }, { value: "CE", label: <>Atendimento em<br />todo o Ceará</> }, { value: "8+", label: <>Anos de<br />experiência</> }],
    },
    closing: {
      title: <>Segurança patrimonial começa<br />entendendo os <em>riscos da sua operação.</em></>,
      text: "Converse com nossa equipe e descubra qual estrutura faz sentido para sua empresa ou condomínio.",
      cta: "SOLICITAR UMA PROPOSTA",
    },
  },
  {
    slug: "facilities",
    servico: "Facilities",
    metaTitle: "Facilities e Terceirização | Grupo Plata Serviços",
    metaDescription: "Facilities e terceirização para empresas e condomínios no Ceará. Equipes de limpeza, portaria, zeladoria e apoio operacional. Solicite uma proposta.",
    whatsappIntro: "Olá! Gostaria de uma proposta de facilities e terceirização.",
    floatingLabel: "Solicitar proposta de facilities",
    hero: {
      title: <>Sua empresa cuida do negócio. <em>A Plata cuida da operação.</em></>,
      intro: "Terceirize equipes de apoio com mais organização, acompanhamento e previsibilidade para sua rotina.",
      image: { src: "/images/lp/facilities-hero.webp", width: 1800, height: 1200, alt: "Profissional de facilities da Plata em uma operação de limpeza" },
      captionTag: "FACILITIES E TERCEIRIZAÇÃO",
      captionLead: "Pessoas preparadas.",
      captionStrong: "Sua operação no ritmo certo.",
    },
    form: {
      title: <>Solicite uma proposta<br />de facilities<span>.</span></>,
      submit: "QUERO RECEBER UMA PROPOSTA",
      fields: [
        { kind: "text", label: "Nome", name: "Nome", placeholder: "Como podemos chamar você?", autoComplete: "name", maxLength: 100 },
        { kind: "phone", label: "WhatsApp", name: "WhatsApp" },
        { kind: "text", label: "Cidade", name: "Cidade", placeholder: "Informe sua cidade", autoComplete: "address-level2", maxLength: 100 },
      ],
    },
    band: ["LIMPEZA", "PORTARIA", "ZELADORIA", "SERVIÇOS GERAIS"],
    benefits: {
      title: <>Menos complexidade <em>operacional para sua empresa.</em></>,
      text: "Equipes de apoio dimensionadas para sua rotina, com organização e acompanhamento próximo.",
      items: [
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="8" r="5" /><path d="M5 29v-5a11 11 0 0122 0v5M12 24h8" /></svg>, title: "Gestão da equipe", text: "A Plata acompanha a operação para que sua empresa não precise administrar cada detalhe da rotina terceirizada." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="4" width="20" height="25" rx="2" /><path d="M12 11h10M12 17h10M12 23h7" /></svg>, title: "Mais padronização", text: "Processos e profissionais alinhados às necessidades da operação." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="12" /><path d="M16 8v9l6 3" /></svg>, title: "Redução da sobrecarga interna", text: "Seu RH e sua gestão deixam de concentrar tempo em escalas, faltas e demandas operacionais." },
        { icon: <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 10h24M4 22h24M10 4v12M22 16v12" /><circle cx="10" cy="20" r="4" /><circle cx="22" cy="10" r="4" /></svg>, title: "Solução de acordo com sua necessidade", text: "Estrutura de equipe dimensionada conforme o tipo e tamanho da operação." },
      ],
      cta: "Quero avaliar a terceirização da minha operação",
    },
    trust: {
      title: <>Experiência em operações<br />que precisam funcionar<br /><em>todos os dias.</em></>,
      description: "Equipes qualificadas em limpeza, portaria e zeladoria para manter sua operação no ritmo.",
      cta: "Solicitar uma proposta",
      aside: { kind: "proof", value: "69", unit: "contratos de facilities", label: "atendidos pela Plata Serviços.", note: "Organização e presença na rotina dos clientes." },
    },
    about: {
      title: <>Uma estrutura preparada para cuidar da <em>operação da sua empresa.</em></>,
      image: { src: "/images/lp/facilities-sobre.webp", width: 1400, height: 1305, alt: "Equipe da Plata com equipamentos de limpeza profissional" },
      paragraphs: ["Há mais de 8 anos, a Plata Serviços atende empresas e condomínios com soluções de terceirização, segurança e gestão.", "Nossa equipe atua de forma próxima para entender a necessidade de cada operação e estruturar equipes adequadas à rotina do cliente."],
      facts: [{ value: "02", label: <>Bases em<br />Fortaleza e Sobral</> }, { value: "CE", label: <>Atendimento em<br />todo o Ceará</> }, { value: "69", label: <>Contratos de<br />facilities</> }],
    },
    closing: {
      title: <>Sua equipe interna não precisa<br />carregar sozinha <em>toda a operação.</em></>,
      text: "Conte com a Plata para estruturar uma solução de facilities de acordo com a necessidade da sua empresa.",
      cta: "SOLICITAR UMA PROPOSTA",
    },
  },
];

export const getLanding = (slug: string) => landings.find((landing) => landing.slug === slug);
