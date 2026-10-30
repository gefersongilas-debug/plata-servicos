export const WEBHOOK_URL = "https://hook.us1.make.celonis.com/vxs7dufd4l2vydoibl2uqnno1h4zgat5";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const readElementText = (element: Element | null) =>
  element ? ((element as HTMLElement).innerText || element.textContent || "").replace(/\s+/g, " ").trim() : "";

export const pushToDataLayer = (payload: Record<string, unknown>) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
};

export const TRACKING_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "ttclid",
] as const;

type TrackingKey = (typeof TRACKING_PARAMS)[number];
export type Tracking = Partial<Record<TrackingKey | "referrer" | "landing_page", string>>;

const TRACKING_STORAGE_KEY = "plata_tracking";

const readStoredTracking = (): Tracking => {
  try {
    const raw = window.sessionStorage.getItem(TRACKING_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Tracking) : null;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

// Le os parametros da URL de entrada e guarda na sessao, para que o lead continue
// atribuido mesmo depois de navegar pela pagina ou perder a query string.
export const captureTracking = (): Tracking => {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Tracking = {};
  TRACKING_PARAMS.forEach((key) => {
    const value = params.get(key)?.trim();
    if (value) fromUrl[key] = value.slice(0, 200);
  });

  const stored = readStoredTracking();
  if (!Object.keys(fromUrl).length && Object.keys(stored).length) return stored;

  const tracking: Tracking = {
    ...fromUrl,
    landing_page: window.location.href,
    referrer: document.referrer || "",
  };

  try {
    window.sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(tracking));
  } catch {
    // sessionStorage indisponivel (aba anonima/bloqueio): segue so com os dados em memoria.
  }

  return tracking;
};

export const trackingToPayload = (tracking: Tracking) => {
  const payload: Record<string, string> = {};
  [...TRACKING_PARAMS, "referrer", "landing_page"].forEach((key) => {
    payload[key] = tracking[key as keyof Tracking] ?? "";
  });
  return payload;
};

export const maskPhone = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/^(\d{0,2})/, "($1");
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d{0,4})/, "($1) $2");
  if (digits.length <= 10) return digits.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  return digits.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
};
