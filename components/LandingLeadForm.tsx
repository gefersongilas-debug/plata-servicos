"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import {
  WEBHOOK_URL,
  captureTracking,
  maskPhone,
  pushToDataLayer,
  readElementText,
  trackingToPayload,
} from "@/lib/lead-tracking";
import type { Landing } from "@/lib/landings";

const WHATSAPP_BASE_URL = "https://wa.me/5585958548973";

type LandingLeadFormProps = {
  fields: Landing["form"]["fields"];
  submit: string;
  servico: string;
  whatsappIntro: string;
};

export function LandingLeadForm({ fields, submit, servico, whatsappIntro }: LandingLeadFormProps) {
  const [phone, setPhone] = useState("");
  const sendingRef = useRef(false);

  useEffect(() => {
    captureTracking();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sendingRef.current) return;

    const form = event.currentTarget;
    const phoneInput = form.elements.namedItem("WhatsApp") as HTMLInputElement;
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      phoneInput.setCustomValidity("Informe um WhatsApp com DDD.");
      phoneInput.reportValidity();
      return;
    }

    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const summary = Array.from(data, ([name, answer]) => `${name}: ${answer}`).join("\n");

    // Abre antes de qualquer resposta assincrona: fora do clique o navegador bloqueia o pop-up.
    window.open(
      `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(`${whatsappIntro}\n\n${summary}`)}`,
      "_blank",
      "noopener,noreferrer",
    );

    sendingRef.current = true;
    const tracking = trackingToPayload(captureTracking());

    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: value("Nome"),
        email: "",
        empresa: value("Empresa ou condomínio") || value("Condomínio"),
        cargo: value("Cargo"),
        cidade: value("Cidade"),
        telefone: phone,
        telefone_e164: `+55${phoneDigits}`,
        servico,
        origem: "LP Plata Serviços",
        pagina: window.location.href,
        enviado_em: new Date().toISOString(),
        ...tracking,
      }),
      keepalive: true,
    })
      .catch(() => undefined)
      .finally(() => {
        sendingRef.current = false;
      });

    pushToDataLayer({
      event: "generate_lead",
      form_name: "contato_lp",
      servico,
      elementText: readElementText(form.querySelector('button[type="submit"]')),
      ...tracking,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="lp-fields">
        {fields.map((field) => {
          if (field.kind === "phone") {
            return (
              <label key={field.name}>
                {field.label}
                <input
                  name={field.name}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(00) 00000-0000"
                  value={phone}
                  onChange={(event) => {
                    event.target.setCustomValidity("");
                    setPhone(maskPhone(event.target.value));
                  }}
                  required
                  minLength={14}
                  maxLength={15}
                />
              </label>
            );
          }

          if (field.kind === "select") {
            return (
              <label key={field.name}>
                {field.label}
                <select name={field.name} defaultValue="" required>
                  <option value="" disabled>{field.placeholder}</option>
                  {field.options.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            );
          }

          return (
            <label key={field.name}>
              {field.label}
              <input
                name={field.name}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                maxLength={field.maxLength}
                required
              />
            </label>
          );
        })}
      </div>
      <button className="lp-button lp-submit" type="submit">{submit} <span>↗</span></button>
      <p className="lp-privacy">
        Seus dados serão usados apenas para este atendimento.<br />
        Ao continuar, sua solicitação será aberta no WhatsApp da Plata.
      </p>
    </form>
  );
}
