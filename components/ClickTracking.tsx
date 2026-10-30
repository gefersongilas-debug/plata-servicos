"use client";

import { useEffect } from "react";
import { pushToDataLayer, readElementText } from "@/lib/lead-tracking";

export function ClickTracking() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = (event.target as Element | null)?.closest('a, button, [role="button"]');
      if (!element) return;

      const elementText = readElementText(element);
      const href = element instanceof HTMLAnchorElement ? element.href : "";

      pushToDataLayer({
        event: "click_element",
        elementText,
        elementId: element.id || undefined,
        elementClasses: element.getAttribute("class") || undefined,
        elementUrl: href || undefined,
        elementTag: element.tagName.toLowerCase(),
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
