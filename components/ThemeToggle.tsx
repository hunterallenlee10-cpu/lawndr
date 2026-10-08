"use client";

import { useEffect, useState } from "react";
import { Desktop, Moon, Sun } from "@phosphor-icons/react";

type Mode = "system" | "light" | "dark";

const options: { mode: Mode; label: string; Icon: typeof Sun }[] = [
  { mode: "light", label: "Light", Icon: Sun },
  { mode: "system", label: "System", Icon: Desktop },
  { mode: "dark", label: "Dark", Icon: Moon },
];

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ld-theme");
      if (saved === "light" || saved === "dark") setMode(saved);
    } catch {}
  }, []);

  const apply = (next: Mode) => {
    setMode(next);
    const root = document.documentElement;
    try {
      if (next === "system") {
        root.removeAttribute("data-theme");
        localStorage.removeItem("ld-theme");
      } else {
        root.setAttribute("data-theme", next);
        localStorage.setItem("ld-theme", next);
      }
    } catch {
      if (next !== "system") root.setAttribute("data-theme", next);
    }
  };

  return (
    <div role="radiogroup" aria-label="Color theme" className="inline-flex rounded-full border border-white/15 p-1">
      {options.map(({ mode: m, label, Icon }) => (
        <button
          key={m}
          type="button"
          role="radio"
          aria-checked={mode === m}
          aria-label={label}
          onClick={() => apply(m)}
          className={`grid size-8 place-items-center rounded-full transition-colors ${
            mode === m ? "bg-lime text-forest" : "text-on-forest-2 hover:text-on-forest"
          }`}
        >
          <Icon size={16} weight={mode === m ? "fill" : "regular"} />
        </button>
      ))}
    </div>
  );
}
