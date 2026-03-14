import { useState } from "react";
import schemes from "./data/schemes";
import { getEligibleSchemes } from "./utils/filterLogic";

import HomeView from "./components/HomeView";
import FormView from "./components/FormView";
import ResultsView from "./components/ResultsView";
import DetailsView from "./components/DetailsView";

const VIEWS = {
  HOME: "HOME",
  FORM: "FORM",
  RESULTS: "RESULTS",
  DETAILS: "DETAILS",
};

const INITIAL_USER_DATA = {
  age: "",
  income: "<1L",
  land: "None", 
};

export default function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME);
  const [userData, setUserData] = useState(INITIAL_USER_DATA);
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  
  // ─── NEW GLOBAL LANGUAGE STATE ──────────────────────────────
  const [language, setLanguage] = useState("mr");

  const handleStart = () => setCurrentView(VIEWS.FORM);

  const handleFormChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = () => {
    const normalizedData = { ...userData, age: Number(userData.age) };
    const results = getEligibleSchemes(normalizedData, schemes);
    setEligibleSchemes(results);
    setCurrentView(VIEWS.RESULTS);
  };

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setCurrentView(VIEWS.DETAILS);
  };

  const handleBack = () => {
    const backMap = {
      [VIEWS.FORM]: VIEWS.HOME,
      [VIEWS.RESULTS]: VIEWS.FORM,
      [VIEWS.DETAILS]: VIEWS.RESULTS,
    };
    const destination = backMap[currentView];
    if (destination) setCurrentView(destination);
  };

  const handleReset = () => {
    setUserData(INITIAL_USER_DATA);
    setEligibleSchemes([]);
    setSelectedScheme(null);
    setCurrentView(VIEWS.HOME);
  };

  return (
    <div className="app-root" data-view={currentView}>
      <header className="app-header bg-card shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="app-header__logo flex items-center gap-2">
          <span className="app-header__logo-icon text-2xl">🌾</span>
          <span className="app-header__logo-text font-bold text-primary" style={{ color: "var(--primary)" }}>
            Yojna-Paatra
          </span>
        </div>

        {currentView !== VIEWS.HOME && (
          <button
            className="app-header__back-btn text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            onClick={handleBack}
            aria-label="Go back"
          >
            {language === "mr" ? "← मागे" : "← Back"}
          </button>
        )}
      </header>

      <main className="app-main">
        {currentView === VIEWS.HOME && (
          <HomeView 
            onStart={handleStart} 
            language={language} 
            setLanguage={setLanguage} 
          />
        )}

        {currentView === VIEWS.FORM && (
          <FormView
            userData={userData}
            onFormChange={handleFormChange}
            onSubmit={handleFormSubmit}
            language={language}
          />
        )}

        {currentView === VIEWS.RESULTS && (
          <ResultsView
            eligibleSchemes={eligibleSchemes}
            onViewDetails={handleViewDetails}
            onReset={handleReset}
            language={language}
          />
        )}

        {currentView === VIEWS.DETAILS && (
          <DetailsView
            scheme={selectedScheme}
            onBack={handleBack}
            language={language}
          />
        )}
      </main>
    </div>
  );
}