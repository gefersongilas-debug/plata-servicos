"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Camera,
  Check,
  ChevronDown,
  CircleCheck,
  Clock3,
  Eye,
  Gauge,
  Headphones,
  MapPin,
  Menu,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
  X,
  Zap,
} from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/558898620015?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20proposta%20da%20Plata%20Servi%C3%A7os.";

const services = [
  {
    number: "01",
    title: "Rastreamento veicular",
    text: "Visibilidade de trajetos, paradas e manutenção para uma frota mais segura e eficiente.",
    icon: Route,
    accent: true,
  },
  {
    number: "02",
    title: "Segurança eletrônica",
    text: "Tecnologia, controle de acesso e monitoramento 24 horas para proteger o seu patrimônio.",
    icon: Camera,
  },
  {
    number: "03",
    title: "Administração condominial",
    text: "Gestão completa, transparente e próxima para simplificar a rotina do condomínio.",
    icon: Building2,
  },
  {
    number: "04",
    title: "Segurança patrimonial",
    text: "Profissionais treinados e preparados para operações que exigem confiança e presença.",
    icon: ShieldCheck,
  },
  {
    number: "05",
    title: "Facilities",
    text: "Equipes qualificadas em portaria, limpeza e zeladoria para manter sua operação no ritmo.",
    icon: Users,
  },
];

const solutions = {
  frota: {
    eyebrow: "Gestão de frotas",
    title: "Sua frota em movimento. Sua gestão no controle.",
    text: "Acompanhe o que acontece fora da empresa com informação clara para decidir melhor e agir mais rápido.",
    image: "/images/frota-app.png",
    imageAlt: "Gestor acompanhando a rota da frota pelo celular",
    points: [
      { icon: Route, title: "Histórico de trajetos", text: "Paradas e quilômetros rodados por dia." },
      { icon: Gauge, title: "Alertas inteligentes", text: "Ignição, velocidade e cerca virtual." },
      { icon: Camera, title: "Videotelemetria com IA", text: "Eventos críticos enviados em vídeo." },
      { icon: Clock3, title: "Gestão de manutenção", text: "Programação por data ou hodômetro." },
    ],
  },
  seguranca: {
    eyebrow: "Segurança eletrônica",
    title: "Sua empresa fecha. A proteção continua.",
    text: "Um projeto de segurança conectado à realidade da sua operação, com tecnologia e acompanhamento contínuo.",
    image: "/images/central-24h.png",
    imageAlt: "Profissional acompanhando câmeras em uma central de monitoramento",
    points: [
      { icon: Eye, title: "Monitoramento 24h", text: "Atenção contínua sobre pontos críticos." },
      { icon: ShieldCheck, title: "Proteção patrimonial", text: "Tecnologia aplicada ao seu projeto." },
      { icon: Zap, title: "Resposta mais ágil", text: "Mais informação para uma ação coordenada." },
      { icon: Building2, title: "Múltiplas unidades", text: "Soluções para operações de diferentes portes." },
    ],
  },
};

type SolutionKey = keyof typeof solutions;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSolution, setActiveSolution] = useState<SolutionKey>("frota");
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState("Rastreamento veicular");
  const heroRef = useRef<HTMLElement>(null);

  const active = useMemo(() => solutions[activeSolution], [activeSolution]);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px" },
    );
    revealItems.forEach((item) => observer.observe(item));

    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      if (heroRef.current) {
        const shift = Math.min(window.scrollY * 0.12, 80);
        heroRef.current.style.setProperty("--hero-shift", `${shift}px`);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.toString().trim();
    const company = form.get("company")?.toString().trim();
    const message = `Olá, sou ${name || "um potencial cliente"}${company ? ` da ${company}` : ""}. Gostaria de uma proposta para ${selectedService}.`;
    window.open(`https://wa.me/558898620015?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a href="#inicio" className="brand" aria-label="Plata Serviços — início" onClick={closeMenu}>
          <Image src="/images/plata-logo.png" width={219} height={73} alt="Grupo Plata Serviços" priority unoptimized />
        </a>

        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={menuOpen ? "is-open" : ""} aria-label="Navegação principal">
          <a href="#servicos" onClick={closeMenu}>Serviços</a>
          <a href="#solucoes" onClick={closeMenu}>Soluções</a>
          <a href="#plata" onClick={closeMenu}>A Plata</a>
          <a href="#contato" onClick={closeMenu}>Contato</a>
        </nav>

        <a className="header-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Solicitar proposta <ArrowDownRight size={17} />
        </a>
      </header>

      <section className="hero" id="inicio" ref={heroRef}>
        <div className="hero-grain" />
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <div className="hero-content">
          <div className="hero-copy">
            <div className="hero-kicker hero-enter delay-1">
              <span className="live-dot" /> Soluções integradas no Ceará
            </div>
            <h1 className="hero-enter delay-2">
              Sua operação<br />
              protegida. <em>Sua</em><br />
              gestão no controle.
            </h1>
            <p className="hero-enter delay-3">
              Tecnologia, pessoas e gestão em um único grupo para cuidar do seu patrimônio, da sua frota e da rotina do seu negócio.
            </p>
            <div className="hero-actions hero-enter delay-4">
              <a className="button button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Falar com um especialista <ArrowRight size={18} />
              </a>
              <a className="text-link" href="#servicos">Explorar soluções <ChevronDown size={17} /></a>
            </div>
          </div>

          <div className="hero-visual hero-enter delay-3">
            <div className="hero-image-wrap">
              <Image src="/images/videotelemetria.png" alt="Câmera inteligente instalada em veículo de frota" fill priority sizes="(max-width: 900px) 100vw, 48vw" unoptimized />
            </div>
            <div className="floating-card card-monitoring">
              <div className="floating-icon"><Eye size={18} /></div>
              <div><strong>Monitoramento ativo</strong><span>Acompanhamento 24 horas</span></div>
              <span className="status-pill">ON</span>
            </div>
            <div className="floating-card card-alert">
              <span className="pulse-ring"><ShieldCheck size={21} /></span>
              <div><span>Operação conectada</span><strong>Proteção + controle</strong></div>
            </div>
            <div className="visual-index">01 <span>/ 05</span></div>
          </div>
        </div>

        <div className="hero-bottom">
          <span>Fortaleza</span><i /> <span>Sobral</span><i /> <span>Atendimento em todo o Ceará</span>
          <a href="#servicos" aria-label="Ir para serviços"><ArrowDownRight size={20} /></a>
        </div>
      </section>

      <section className="trust-strip" aria-label="Áreas atendidas">
        <div className="trust-track">
          {["SEGURANÇA", "RASTREAMENTO", "GESTÃO", "FACILITIES", "TECNOLOGIA", "SEGURANÇA", "RASTREAMENTO", "GESTÃO", "FACILITIES", "TECNOLOGIA"].map((item, index) => (
            <span key={`${item}-${index}`}>{item}<Sparkles size={15} /></span>
          ))}
        </div>
      </section>

      <section className="section services" id="servicos">
        <div className="section-heading">
          <Reveal><p className="eyebrow"><span>01</span> Soluções completas</p></Reveal>
          <Reveal delay={80}><h2>Um só grupo.<br /><em>Mais controle</em> para avançar.</h2></Reveal>
          <Reveal delay={140}><p className="heading-copy">Serviços que conversam entre si para reduzir complexidade, proteger sua operação e liberar seu time para o que realmente importa.</p></Reveal>
        </div>

        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.number} delay={index * 70} className={`service-card-wrap ${index === 0 ? "service-featured-wrap" : ""}`}>
                <article className={`service-card ${service.accent ? "featured" : ""}`}>
                  {index === 0 && <span className="popular-label">Solução em destaque</span>}
                  <div className="service-card-top"><span>{service.number}</span><Icon size={24} strokeWidth={1.7} /></div>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <a href="#contato" onClick={() => setSelectedService(service.title)} aria-label={`Conhecer ${service.title}`}>
                    Conhecer solução <ArrowDownRight size={19} />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section solution-showcase" id="solucoes">
        <div className="showcase-top">
          <Reveal><p className="eyebrow light"><span>02</span> Tecnologia na prática</p></Reveal>
          <Reveal delay={80}><h2>Informação que vira<br /><em>ação.</em></h2></Reveal>
          <div className="solution-tabs" role="tablist" aria-label="Soluções em destaque">
            <button className={activeSolution === "frota" ? "active" : ""} onClick={() => setActiveSolution("frota")} role="tab" aria-selected={activeSolution === "frota"}>Frotas</button>
            <button className={activeSolution === "seguranca" ? "active" : ""} onClick={() => setActiveSolution("seguranca")} role="tab" aria-selected={activeSolution === "seguranca"}>Segurança</button>
          </div>
        </div>

        <div className="showcase-grid" key={activeSolution}>
          <div className="showcase-image">
            <Image src={active.image} alt={active.imageAlt} fill sizes="(max-width: 900px) 100vw, 51vw" unoptimized />
            <div className="image-badge"><span><CircleCheck size={17} /></span> Tecnologia Plata</div>
          </div>
          <div className="showcase-copy">
            <p className="showcase-eyebrow">{active.eyebrow}</p>
            <h3>{active.title}</h3>
            <p className="showcase-lead">{active.text}</p>
            <div className="feature-list">
              {active.points.map((point) => {
                const Icon = point.icon;
                return (
                  <div className="feature-item" key={point.title}>
                    <Icon size={22} />
                    <div><strong>{point.title}</strong><span>{point.text}</span></div>
                  </div>
                );
              })}
            </div>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="button button-outline-light">Quero conhecer <ArrowRight size={18} /></a>
          </div>
        </div>
      </section>

      <section className="numbers" aria-label="Números da Plata">
        <Reveal className="numbers-intro">
          <p className="eyebrow"><span>03</span> Presença que protege</p>
          <h2>Proximidade local.<br />Estrutura para <em>ir além.</em></h2>
        </Reveal>
        <div className="number-grid">
          <Reveal delay={80} className="number-card"><strong>6+</strong><span>anos construindo<br />relações de confiança</span></Reveal>
          <Reveal delay={150} className="number-card"><strong>02</strong><span>bases estratégicas:<br />Fortaleza e Sobral</span></Reveal>
          <Reveal delay={220} className="number-card orange"><strong>24h</strong><span>de monitoramento<br />para sua operação</span></Reveal>
        </div>
      </section>

      <section className="section about" id="plata">
        <div className="about-images">
          <Reveal className="about-image-main"><Image src="/images/seguranca-estoque.png" alt="Ambiente empresarial protegido pela Plata" fill sizes="(max-width: 900px) 90vw, 45vw" unoptimized /></Reveal>
          <Reveal delay={150} className="about-image-small"><Image src="/images/controle-acesso.png" alt="Controle de acesso e câmera de segurança" fill sizes="280px" unoptimized /></Reveal>
          <span className="about-stamp">GRUPO PLATA • CEARÁ •</span>
        </div>
        <div className="about-copy">
          <Reveal><p className="eyebrow"><span>04</span> Quem é a Plata</p></Reveal>
          <Reveal delay={80}><h2>A confiança de quem<br />entende a sua <em>rotina.</em></h2></Reveal>
          <Reveal delay={140}><p>Com escritórios em Fortaleza e Sobral, a Plata combina experiência local, tecnologia e uma equipe capacitada para entregar soluções conectadas às necessidades de cada operação.</p></Reveal>
          <Reveal delay={180}>
            <ul>
              <li><Check size={17} /> Atendimento próximo e consultivo</li>
              <li><Check size={17} /> Soluções desenhadas para cada realidade</li>
              <li><Check size={17} /> Tecnologia, segurança e gestão integradas</li>
            </ul>
          </Reveal>
          <Reveal delay={220}><a href="#contato" className="text-link dark">Conheça nossa estrutura <ArrowDownRight size={18} /></a></Reveal>
        </div>
      </section>

      <section className="process-section">
        <div className="process-heading">
          <Reveal><p className="eyebrow light"><span>05</span> Do desafio à solução</p></Reveal>
          <Reveal delay={80}><h2>Simples para você.<br /><em>Cuidadoso</em> em cada etapa.</h2></Reveal>
        </div>
        <div className="process-list">
          {[
            ["01", "Entendemos", "Ouvimos sua operação, seus riscos e prioridades."],
            ["02", "Desenhamos", "Criamos uma solução compatível com a sua realidade."],
            ["03", "Implementamos", "Organizamos pessoas e tecnologia para colocar o plano em prática."],
            ["04", "Acompanhamos", "Seguimos próximos para manter a operação segura e eficiente."],
          ].map(([number, title, text], index) => (
            <Reveal className="process-row" delay={index * 70} key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p><ArrowDownRight size={22} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-copy">
          <Reveal><p className="eyebrow light"><span>06</span> Vamos conversar?</p></Reveal>
          <Reveal delay={80}><h2>Conte o seu desafio.<br /><em>A Plata cuida</em> do próximo passo.</h2></Reveal>
          <Reveal delay={140}><p>Preencha os dados e continue a conversa com um especialista pelo WhatsApp.</p></Reveal>
          <Reveal delay={200} className="contact-details">
            <div><MapPin size={20} /><span><strong>Fortaleza</strong>Rua Carlos Vasconcelos, 819 — Meireles</span></div>
            <div><MapPin size={20} /><span><strong>Sobral</strong>Rua Maestro José Pedro, 407 — Centro</span></div>
          </Reveal>
        </div>

        <Reveal delay={120} className="form-wrap">
          <form onSubmit={handleSubmit}>
            <label>Seu nome<input name="name" type="text" placeholder="Como podemos chamar você?" required /></label>
            <label>Empresa<input name="company" type="text" placeholder="Nome da sua empresa" /></label>
            <label>Telefone<input name="phone" type="tel" placeholder="(00) 00000-0000" required /></label>
            <label>Qual solução você procura?
              <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                {services.map((service) => <option key={service.title}>{service.title}</option>)}
              </select>
            </label>
            <button type="submit" className="button button-primary">Solicitar proposta <ArrowRight size={18} /></button>
            <small><ShieldCheck size={14} /> Seus dados serão usados apenas para este atendimento.</small>
          </form>
        </Reveal>
      </section>

      <footer>
        <div className="footer-top">
          <Image src="/images/plata-logo.png" width={219} height={73} alt="Grupo Plata Serviços" unoptimized />
          <p>Tecnologia para proteger.<br />Confiança para seguir em frente.</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">(88) 9862-0015 <ArrowDownRight size={18} /></a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Grupo Plata Serviços</span>
          <span>Fortaleza • Sobral • Ceará</span>
          <a href="mailto:contato@plataservicos.com.br">contato@plataservicos.com.br</a>
        </div>
      </footer>

      <a className="whatsapp-float" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Falar com a Plata pelo WhatsApp">
        <Headphones size={21} /><span>Fale com a Plata</span>
      </a>
    </main>
  );
}
