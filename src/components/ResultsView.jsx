"use client"

import { CheckCircle, Frown, RotateCcw } from "lucide-react"

export default function ResultsView({
  eligibleSchemes,
  onViewDetails,
  onReset,
  language
}) {
  const hasSchemes = eligibleSchemes.length > 0
  const isMarathi = language === "mr";

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Header */}
      <header className="px-6 pt-10 pb-6">
        {hasSchemes ? (
          <>
            <div className="mb-3 flex justify-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                <CheckCircle className="h-9 w-9" strokeWidth={1.8} aria-hidden="true" />
              </div>
            </div>
            <h1
              className="text-center text-2xl font-bold tracking-tight text-balance"
              style={{ color: "var(--primary)" }}
            >
              {isMarathi ? "अभिनंदन! तुमच्यासाठी " : "Congratulations! Found "}
              <span style={{ color: "var(--accent)" }}>
                {eligibleSchemes.length}
              </span>
              {isMarathi ? " योजना सापडल्या" : " schemes for you"}
            </h1>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              {isMarathi ? "खालील योजनांची माहिती पहा" : "View the details of the schemes below"}
            </p>
          </>
        ) : (
          <>
            <div className="mb-3 flex justify-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full bg-muted"
                style={{ color: "var(--muted-foreground)" }}
              >
                <Frown className="h-9 w-9" strokeWidth={1.8} aria-hidden="true" />
              </div>
            </div>
            <h1 className="text-center text-2xl font-bold tracking-tight text-muted-foreground">
              {isMarathi ? "सध्या कोणतीही योजना सापडली नाही" : "No schemes found currently"}
            </h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {isMarathi ? "कृपया तुमची माहिती तपासून पुन्हा प्रयत्न करा" : "Please check your details and try again"}
            </p>
          </>
        )}
      </header>

      {/* Scheme Cards List */}
      <div className="flex flex-1 flex-col gap-4 px-5 pb-28">
        {eligibleSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onViewDetails(scheme)}
            className="w-full cursor-pointer rounded-2xl bg-card p-5 text-left shadow-md transition-shadow hover:shadow-lg active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="flex items-start justify-between gap-3">
              {/* Left — name + benefit (NOW BILINGUAL) */}
              <div className="flex flex-1 flex-col gap-2">
                <h2 className="text-lg font-bold text-card-foreground leading-snug">
                  {scheme.name[language]}
                </h2>
                <p
                  className="text-xl font-extrabold"
                  style={{ color: "var(--accent)" }}
                >
                  {scheme.benefitAmount[language]}
                </p>
              </div>

              {/* Right — eligible badge */}
              <span
                className="mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-bold"
                style={{
                  backgroundColor: "#e6f4ec",
                  color: "var(--primary)",
                }}
              >
                <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                {isMarathi ? "पात्र" : "Eligible"}
              </span>
            </div>

            {/* Card footer */}
            <div className="mt-4 border-t border-border pt-3">
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--primary)" }}
              >
                {isMarathi ? "माहिती पहा ➔" : "View Details ➔"}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom Reset Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-background px-5 pb-6 pt-3">
        <button
          onClick={onReset}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-muted py-4 text-lg font-bold text-muted-foreground transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <RotateCcw className="h-5 w-5" aria-hidden="true" />
          {isMarathi ? "पुन्हा तपासा" : "Check Again"}
        </button>
      </div>
    </div>
  )
}