"use client"

import { User, IndianRupee, Map } from "lucide-react"

function InputCard({ icon, label, children }) {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-md">
      <div className="mb-3 flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          {icon}
        </div>
        <label className="text-lg font-semibold text-card-foreground">{label}</label>
      </div>
      {children}
    </div>
  )
}

// Notice we added the 'language' prop here!
export default function FormView({ userData, onFormChange, onSubmit, language }) {
  const isMarathi = language === "mr";

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      {/* Header */}
      <header className="px-6 pt-8 pb-4">
        <h1 className="text-center text-2xl font-bold tracking-tight" style={{ color: "var(--primary)" }}>
          {isMarathi ? "माहिती भरा" : "Fill Details"}
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          {isMarathi ? "तुमची माहिती भरा, योग्य योजना शोधा" : "Enter your details to find eligible schemes"}
        </p>
      </header>

      {/* Form Cards */}
      <div className="flex flex-1 flex-col gap-4 px-5 pb-28">
        {/* Age */}
        <InputCard icon={<User className="h-5 w-5" aria-hidden="true" />} label={isMarathi ? "तुमचे वय किती आहे?" : "What is your age?"}>
          <input
            type="number"
            inputMode="numeric"
            placeholder={isMarathi ? "उदा. 35" : "e.g. 35"}
            min={1}
            max={120}
            value={userData.age}
            onChange={(e) => onFormChange("age", e.target.value)}
            className="w-full rounded-xl border-2 border-input bg-background px-4 py-4 text-xl font-semibold text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />
        </InputCard>

        {/* Annual Income */}
        <InputCard icon={<IndianRupee className="h-5 w-5" aria-hidden="true" />} label={isMarathi ? "वार्षिक उत्पन्न" : "Annual Income"}>
          <select
            value={userData.income}
            onChange={(e) => onFormChange("income", e.target.value)}
            className="w-full appearance-none rounded-xl border-2 border-input bg-background px-4 py-4 text-lg font-medium text-foreground focus:border-primary focus:outline-none"
          >
            <option value="">{isMarathi ? "-- निवडा --" : "-- Select --"}</option>
            <option value="<1L">{isMarathi ? "१ लाखापेक्षा कमी" : "Less than 1 Lakh"}</option>
            <option value="1-2.5L">{isMarathi ? "१ ते २.५ लाख" : "1 to 2.5 Lakhs"}</option>
            <option value=">2.5L">{isMarathi ? "२.५ लाखापेक्षा जास्त" : "More than 2.5 Lakhs"}</option>
          </select>
        </InputCard>


        {/* Land Holding */}
        <InputCard icon={<Map className="h-5 w-5" aria-hidden="true" />} label={isMarathi ? "शेतजमीन किती आहे?" : "Land Holding"}>
          <select
            value={userData.land}
            onChange={(e) => onFormChange("land", e.target.value)}
            className="w-full appearance-none rounded-xl border-2 border-input bg-background px-4 py-4 text-lg font-medium text-foreground focus:border-primary focus:outline-none"
          >
            <option value="">{isMarathi ? "-- निवडा --" : "-- Select --"}</option>
            <option value="None">{isMarathi ? "जमीन नाही (Landless)" : "No Land"}</option>
            <option value="<2">{isMarathi ? "२ हेक्टरपेक्षा कमी (Marginal/Small)" : "Less than 2 Hectares"}</option>
            <option value=">2">{isMarathi ? "२ हेक्टरपेक्षा जास्त (Large)" : "More than 2 Hectares"}</option>
          </select>
        </InputCard>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background px-5 pb-6 pt-3">
        <button
          onClick={onSubmit}
          className="w-full rounded-2xl py-5 text-xl font-bold tracking-wide shadow-lg transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          {isMarathi ? "माझ्यासाठी योजना शोधा" : "Find Schemes for me"}
        </button>
      </div>
    </div>
  )
}