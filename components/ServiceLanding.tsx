import Image from "next/image";
import { LandingLeadForm } from "@/components/LandingLeadForm";
import { SiteHeader } from "@/components/SiteHeader";
import type { Landing } from "@/lib/landings";

const PAGE_LINKS = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#confianca", label: "Confiança" },
  { href: "#plata", label: "A Plata" },
];

function TrustAside({ aside }: { aside: Landing["trust"]["aside"] }) {
  if (aside.kind === "quote") {
    return (
      <figure className="lp-quote">
        <div className="lp-quote-top">
          <span className="lp-stars" aria-label="5 estrelas">★★★★★</span>
          <span className="lp-quote-mark">“</span>
        </div>
        <blockquote>{aside.quote}</blockquote>
        <figcaption>
          <span className="lp-avatar">{aside.author.charAt(0)}</span>
          <span><strong>{aside.author}</strong><small>{aside.role}</small></span>
        </figcaption>
      </figure>
    );
  }

  if (aside.kind === "proof") {
    return (
      <div className="lp-condo-proof">
        <strong>{aside.value}<span>{aside.unit}</span></strong>
        <p>{aside.label}</p>
        <div className="lp-proof-line" />
        <span>{aside.note}</span>
      </div>
    );
  }

  return (
    <div className="lp-security-panel">
      <h3>{aside.title}</h3>
      <ul>
        {aside.items.map((item, index) => (
          <li key={item.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><strong>{item.title}</strong><p>{item.text}</p></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceLanding({ landing }: { landing: Landing }) {
  const { hero, form, band, benefits, trust, about, closing } = landing;

  return (
    <div className={`lp lp--${landing.slug}`}>
      <SiteHeader
        homeHref="/"
        links={PAGE_LINKS}
        currentSlug={landing.slug}
        className="site-header--lp"
        cta={<a className="header-cta" href="#proposta">Solicitar proposta <span aria-hidden="true">↗</span></a>}
      />

      <main>
        <section className="lp-hero" id="inicio">
          <div className="lp-wrap lp-hero-grid">
            <div className="lp-hero-content">
              <h1>{hero.title}</h1>
              <p className="lp-intro">{hero.intro}</p>
              <div className="lp-hero-photo">
                <Image src={hero.image.src} width={hero.image.width} height={hero.image.height} alt={hero.image.alt} priority unoptimized />
                <div className="lp-photo-caption">
                  <span className="lp-live"><i /> {hero.captionTag}</span>
                  <span>{hero.captionLead}<br /><b>{hero.captionStrong}</b></span>
                </div>
                <span className="lp-photo-corner">↗</span>
              </div>
              <div className="lp-local">FORTALEZA <b>•</b> SOBRAL <b>•</b> TODO O CEARÁ</div>
            </div>

            <div className="lp-form-card" id="proposta">
              <h2>{form.title}</h2>
              <p>Conte o que você precisa. Nossa equipe ajuda com o próximo passo.</p>
              <LandingLeadForm
                fields={form.fields}
                submit={form.submit}
                servico={landing.servico}
                whatsappIntro={landing.whatsappIntro}
              />
            </div>
          </div>
        </section>

        <div className="lp-service-band">
          <div className="lp-wrap">
            {band.flatMap((item, index) => [
              ...(index > 0 ? [<b key={`separator-${item}`}>✳</b>] : []),
              <span key={item}>{item}</span>,
            ])}
          </div>
        </div>

        <section className="lp-benefits lp-wrap lp-section" id="solucoes">
          <div className="lp-section-heading">
            <div><h2>{benefits.title}</h2></div>
            <p>{benefits.text}</p>
          </div>
          <div className="lp-benefit-grid">
            {benefits.items.map((item, index) => (
              <article key={item.title}>
                <div className="lp-icon">{item.icon}</div>
                <span className="lp-number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <a className="lp-button lp-benefit-cta" href="#proposta">{benefits.cta} <span>↗</span></a>
        </section>

        <section className="lp-trust" id="confianca">
          <div className="lp-wrap lp-trust-grid">
            <div>
              <h2>{trust.title}</h2>
              {trust.description && <p className="lp-trust-description">{trust.description}</p>}
              <a className="lp-button" href="#proposta">{trust.cta} <span>↗</span></a>
            </div>
            <TrustAside aside={trust.aside} />
          </div>
        </section>

        <section className="lp-wrap lp-section lp-about" id="plata">
          <div className="lp-about-image">
            <Image src={about.image.src} width={about.image.width} height={about.image.height} alt={about.image.alt} unoptimized />
            <div className="lp-experience">
              <strong>8<span>+</span></strong>
              <span>ANOS DE<br />EXPERIÊNCIA</span>
            </div>
          </div>
          <div className="lp-about-content">
            <h2>{about.title}</h2>
            {about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="lp-facts">
              {about.facts.map((fact) => (
                <div key={fact.value}><strong>{fact.value}</strong><span>{fact.label}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-closing">
          <div className="lp-wrap lp-closing-inner">
            <h2>{closing.title}</h2>
            <p>{closing.text}</p>
            <a className="lp-button" href="#proposta">{closing.cta} <span>↗</span></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="lp-wrap lp-footer-top">
          <Image className="lp-logo" src="/images/plata-logo-white.svg" width={219} height={73} alt="Grupo Plata Serviços" unoptimized />
          <p>Tecnologia para proteger.<br />Confiança para seguir em frente.</p>
          <a href="mailto:contato@plataservicos.com.br">contato@plataservicos.com.br ↗</a>
        </div>
        <div className="lp-wrap lp-footer-bottom">
          <span>© 2026 GRUPO PLATA SERVIÇOS</span>
          <span>FORTALEZA • SOBRAL • CEARÁ</span>
        </div>
      </footer>

      <a className="lp-floating" href="#proposta" aria-label={landing.floatingLabel}>↗ <span>Fale com a Plata</span></a>
    </div>
  );
}
