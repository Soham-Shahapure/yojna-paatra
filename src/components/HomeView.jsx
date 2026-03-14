"use client"

import { Sprout } from "lucide-react"

// Notice how we are pulling language and setLanguage from props now!
export default function HomeView({ onStart, language, setLanguage }) {
  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Top Area — Illustration + Title */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 pt-12 pb-6">
        <div
          className="flex h-28 w-28 items-center justify-center rounded-full"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          <Sprout className="h-16 w-16" strokeWidth={1.6} aria-hidden="true" />
        </div>

        <h1
          className="text-center text-3xl font-bold tracking-tight text-balance"
          style={{ color: "var(--primary)" }}
        >
          Yojna-Paatra
        </h1>
        <p className="text-center text-base text-muted-foreground">
          {language === "mr"
            ? "शेतकऱ्यांसाठी सरकारी योजना शोधा"
            : "Find government schemes for farmers"}
        </p>
      </div>

      {/* Middle Area — Language Picker */}
      <div className="flex flex-col items-center gap-5 px-6 pb-8">
        <p className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
          {language === "mr" ? "तुमची भाषा निवडा" : "Choose your language"}
        </p>

        <div className="flex w-full max-w-xs gap-3" role="radiogroup" aria-label="Language selection">
          <button
            role="radio"
            aria-checked={language === "mr"}
            onClick={() => setLanguage("mr")}
            className="flex-1 rounded-xl border-2 py-4 text-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={
              language === "mr"
                ? {
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    borderColor: "var(--primary)",
                  }
                : {
                    backgroundColor: "var(--muted)",
                    color: "var(--muted-foreground)",
                    borderColor: "var(--border)",
                  }
            }
          >
            मराठी
          </button>

          <button
            role="radio"
            aria-checked={language === "en"}
            onClick={() => setLanguage("en")}
            className="flex-1 rounded-xl border-2 py-4 text-lg font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={
              language === "en"
                ? {
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                    borderColor: "var(--primary)",
                  }
                : {
                    backgroundColor: "var(--muted)",
                    color: "var(--muted-foreground)",
                    borderColor: "var(--border)",
                  }
            }
          >
            English
          </button>
        </div>
      </div>

      {/* Bottom Area — CTA Button */}
      <div className="sticky bottom-0 px-4 pb-6 pt-2">
        <button
          onClick={onStart}
          className="w-full rounded-2xl py-5 text-xl font-bold tracking-wide shadow-lg transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-foreground)",
          }}
        >
          {language === "mr" ? "योजना शोधा ➔" : "Find Schemes ➔"}
        </button>
      </div>
    </div>
  )
}