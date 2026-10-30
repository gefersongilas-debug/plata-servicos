"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { serviceLinks } from "@/lib/services";

type SiteHeaderProps = {
  homeHref: string;
  links: { href: string; label: string }[];
  cta: React.ReactNode;
  currentSlug?: string;
  className?: string;
};

function ServicesMenu({ currentSlug, onNavigate }: { currentSlug?: string; onNavigate: () => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      className={`services-menu ${open ? "is-open" : ""}`}
      ref={rootRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="services-menu-toggle"
        aria-expanded={open}
        aria-controls="services-menu-list"
        onClick={() => setOpen((current) => !current)}
      >
        Serviços <ChevronDown size={15} />
      </button>
      <ul className="services-menu-list" id="services-menu-list">
        {serviceLinks.map((service) => (
          <li key={service.slug}>
            {/* Navegacao completa de proposito: o GTM dispara a pagina vista em cada LP. */}
            <a
              href={`/${service.slug}`}
              aria-current={service.slug === currentSlug ? "page" : undefined}
              onClick={onNavigate}
            >
              {service.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteHeader({ homeHref, links, cta, currentSlug, className = "" }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${className}`}>
      <a href={homeHref} className="brand" onClick={closeMenu}>
        <Image
          src={scrolled ? "/images/plata-logo.svg" : "/images/plata-logo-white.svg"}
          width={219}
          height={73}
          alt="Grupo Plata Serviços"
          priority
          unoptimized
        />
        <span className="sr-only">Logo Plata Serviços</span>
      </a>

      <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
        <span className="sr-only">{menuOpen ? "Fechar menu" : "Abrir menu"}</span>
      </button>

      <nav className={menuOpen ? "is-open" : ""} aria-label="Navegação principal">
        {currentSlug && <a href={homeHref} onClick={closeMenu}>Início</a>}
        <ServicesMenu currentSlug={currentSlug} onNavigate={closeMenu} />
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>
        ))}
      </nav>

      {cta}
    </header>
  );
}
