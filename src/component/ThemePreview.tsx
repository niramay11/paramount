"use client";

// Temporary palette preview badge — see themePreviewScript.ts.

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { THEMES } from "./themePreviewScript";

const LABELS: Record<string, string> = {
  current: "Current",
  "2": "Option 2",
  "5": "Option 5",
  "8": "Option 8",
  mix: "Mix",
};

export default function ThemePreviewBadge() {
  const pathname = usePathname();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setActive(document.documentElement.getAttribute("data-theme"));
  }, [pathname]);

  if (!active || pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex items-center gap-1 rounded-full bg-white/95 px-2 py-1.5 font-poppins text-[11px] shadow-lg ring-1 ring-black/10 backdrop-blur">
      <span className="px-1.5 font-semibold text-ink">Theme: {LABELS[active]}</span>
      {["current", ...THEMES].map((t) => (
        <a
          key={t}
          href={`${pathname}?theme=${t}`}
          className={`rounded-full px-2 py-0.5 transition-colors ${
            t === active ? "bg-brand text-white" : "text-body hover:bg-black/5"
          }`}
        >
          {LABELS[t]}
        </a>
      ))}
    </div>
  );
}
