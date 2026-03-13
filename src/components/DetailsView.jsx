"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle2, Play, FileText, Video, PenLine, ExternalLink } from "lucide-react"

export default function DetailsView({ scheme, onBack, language }) {
  const [activeTab, setActiveTab] = useState("documents")
  const isMarathi = language === "mr"

  const TABS = [
    { key: "documents", label: isMarathi ? "कागदपत्रे" : "Documents", icon: FileText },
    { key: "video", label: isMarathi ? "मार्गदर्शन" : "Video Guide", icon: Video },
    { key: "apply", label: isMarathi ? "अर्ज करा" : "Apply", icon: PenLine },
  ]

  const APPLY_STEPS = [
    {
      step: "1",
      title: isMarathi ? "अधिकृत वेबसाईटला भेट द्या" : "Visit Official Website",
      description: isMarathi ? "खालील बटणावर क्लिक करून अधिकृत पोर्टलवर जा." : "Click the button below to go to the official portal.",
    },
    {
      step: "2",
      title: isMarathi ? "नोंदणी करा" : "Register",
      description: isMarathi ? "तुमचा आधार क्रमांक आणि मोबाइल नंबर वापरून नोंदणी करा." : "Register using your Aadhaar number and mobile number.",
    },
    {
      step: "3",
      title: isMarathi ? "अर्ज भरा आणि सबमिट करा" : "Fill and Submit Application",
      description: isMarathi ? "सर्व आवश्यक माहिती भरा, कागदपत्रे अपलोड करा आणि अर्ज सबमिट करा." : "Fill all required details, upload documents, and submit the application.",
    },
  ]

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Top Header */}
      <header className="flex items-center gap-3 px-4 pt-6 pb-4">
        <button
          onClick={onBack}
          aria-label={isMarathi ? "मागे जा" : "Go back"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card shadow-sm transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1
          className="text-xl font-bold leading-snug tracking-tight text-balance"
          style={{ color: "var(--primary)" }}
        >
          {scheme?.name?.[language]}
        </h1>
      </header>

      {/* Hero Benefit Box */}
      <div className="px-5 pb-4">
        <div
          className="rounded-2xl px-6 py-5 text-center shadow-md"
          style={{ backgroundColor: "#fff5eb" }}
        >
          <p className="mb-1 text-sm font-medium text-muted-foreground">
            {isMarathi ? "मुख्य लाभ" : "Main Benefit"}
          </p>
          <p className="text-3xl font-extrabold tracking-tight" style={{ color: "var(--accent)" }}>
            {scheme?.benefitAmount?.[language]}
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="px-5 pb-2">
        <div className="flex gap-2 rounded-2xl bg-muted p-1.5">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key
            const Icon = tab.icon
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl py-3 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive ? "bg-card shadow-sm" : "text-muted-foreground"
                }`}
                style={isActive ? { color: "var(--primary)" } : undefined}
                role="tab"
                aria-selected={isActive}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex flex-1 flex-col px-5 pt-2 pb-28">
        {/* Documents Tab (NOW BILINGUAL) */}
        {activeTab === "documents" && (
          <div className="flex flex-col gap-3" role="tabpanel">
            <p className="mb-1 text-base font-semibold text-foreground">
              {isMarathi ? "आवश्यक कागदपत्रे" : "Required Documents"}
            </p>
            {scheme?.checklist?.[language]?.map((item, index) => (
              <div key={index} className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0"
                  style={{ color: "var(--primary)" }}
                  aria-hidden="true"
                />
                <span className="text-base leading-relaxed text-card-foreground">{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* Video Tab */}
        {activeTab === "video" && (
          <div role="tabpanel">
            <a
              href={scheme?.youtubeLink || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl bg-card shadow-md transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div
                className="flex aspect-video w-full items-center justify-center"
                style={{ backgroundColor: "#1a2e1a" }}
              >
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: "var(--accent)",
                      color: "var(--accent-foreground)",
                    }}
                  >
                    <Play className="h-8 w-8 translate-x-0.5" fill="currentColor" />
                  </div>
                  <span className="text-sm font-semibold" style={{ color: "#ffffff" }}>
                    {isMarathi ? "व्हिडिओ पहा" : "Watch Video"}
                  </span>
                </div>
              </div>
              <div className="px-5 py-4">
                <p className="text-lg font-bold" style={{ color: "var(--primary)" }}>
                  {isMarathi ? "योजना कशी लागू करावी" : "How to Apply"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {isMarathi ? "या व्हिडिओमध्ये अर्ज प्रक्रिया स्टेप-बाय-स्टेप समजावून सांगितली आहे." : "This video explains the application process step-by-step."}
                </p>
              </div>
            </a>
          </div>
        )}

        {/* Apply Tab */}
        {activeTab === "apply" && (
          <div className="flex flex-col gap-4" role="tabpanel">
            <p className="text-base font-semibold text-foreground">
              {isMarathi ? "ऑनलाइन अर्ज करण्याची प्रक्रिया" : "Online Application Process"}
            </p>
            {APPLY_STEPS.map((item) => (
              <div key={item.step} className="flex items-start gap-4 rounded-xl bg-card p-4 shadow-sm">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-extrabold"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  {isMarathi ? (item.step === "1" ? "१" : item.step === "2" ? "२" : "३") : item.step}
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-bold text-card-foreground">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background px-5 pb-6 pt-3">
        <a
          href={scheme?.officialLink || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-2xl py-5 text-xl font-bold tracking-wide shadow-lg transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-foreground)",
          }}
        >
          {isMarathi ? "अधिकृत वेबसाईटवर अर्ज करा" : "Apply on Official Website"}
          <ExternalLink className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}