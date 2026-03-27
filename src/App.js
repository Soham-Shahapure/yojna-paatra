import { useState, useEffect } from "react";
import { App as CapacitorApp } from '@capacitor/app'; // 👈 1. Import Capacitor App plugin

import schemes from "./data/schemes";
import { getEligibleSchemes } from "./utils/filterLogic";

import HomeView    from "./components/HomeView";
import FormView    from "./components/FormView";
import ResultsView from "./components/ResultsView";
import DetailsView from "./components/DetailsView";

const VIEWS = { HOME: "HOME", FORM: "FORM", RESULTS: "RESULTS", DETAILS: "DETAILS" };
const INITIAL_USER_DATA = { age: "", income: "", land: "" };

export default function App() {
  const [currentView, setCurrentView]     = useState(VIEWS.HOME);
  const [userData, setUserData]           = useState(INITIAL_USER_DATA);
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme]   = useState(null);
  const [language, setLanguage]           = useState("mr");

  // 👈 2. Hardware Back Button Interceptor
  useEffect(() => {
    let listener = null;

    const setupBackButton = async () => {
      listener = await CapacitorApp.addListener('backButton', () => {
        // We use the 'prev' callback inside setCurrentView to guarantee 
        // we always have the exact, current state of the screen
        setCurrentView(prevView => {
          if (prevView === VIEWS.HOME) {
            // If they are on the Home screen, let the phone exit the app safely
            CapacitorApp.exitApp();
            return prevView; 
          }
          if (prevView === VIEWS.FORM) return VIEWS.HOME;
          if (prevView === VIEWS.RESULTS) return VIEWS.FORM;
          if (prevView === VIEWS.DETAILS) return VIEWS.RESULTS;
          
          return prevView;
        });
      });
    };

    setupBackButton();

    // Cleanup the listener if the component unmounts
    return () => {
      if (listener) listener.remove();
    };
  }, []);

  const handleFormChange = (field, value) =>
    setUserData(prev => ({ ...prev, [field]: value }));

  const handleFormSubmit = () => {
    const results = getEligibleSchemes({ ...userData, age: Number(userData.age) }, schemes);
    setEligibleSchemes(results);
    setCurrentView(VIEWS.RESULTS);
  };

  const handleViewDetails = (scheme) => {
    setSelectedScheme(scheme);
    setCurrentView(VIEWS.DETAILS);
  };

  const handleBack = () => {
    const backMap = {
      [VIEWS.FORM]:    VIEWS.HOME,
      [VIEWS.RESULTS]: VIEWS.FORM,
      [VIEWS.DETAILS]: VIEWS.RESULTS,
    };
    const dest = backMap[currentView];
    if (dest) setCurrentView(dest);
  };

  const handleReset = () => {
    // 1. Removed setUserData to keep their previous inputs intact
    setEligibleSchemes([]);
    setSelectedScheme(null);
    // 2. Changed destination from HOME to FORM
    setCurrentView(VIEWS.FORM); 
  };

  return (
    <div className="app-root" data-view={currentView} style={{ background: "#f0fdf4", minHeight: "100vh" }}>
      {/* 👇 CHANGES MADE HERE: Removed py-4 and added the env() safe-area style 👇 */}
      <header 
        className="app-header bg-card shadow-sm px-6 flex items-center justify-between"
        style={{ 
          paddingTop: "calc(16px + env(safe-area-inset-top, 24px))", 
          paddingBottom: "16px" 
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-bold" style={{ color: "var(--primary)" }}>Yojna-Paatra</span>
        </div>
        {currentView !== VIEWS.HOME && (
          <button
            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleBack}
          >
            {language === "mr" ? "← मागे" : "← Back"}
          </button>
        )}
      </header>

      <main className="app-main">
        {currentView === VIEWS.HOME && (
          <HomeView
            onStart={() => setCurrentView(VIEWS.FORM)}
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