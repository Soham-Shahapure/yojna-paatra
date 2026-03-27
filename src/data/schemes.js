const schemes = [
  // --- BATCH 1 ---
  {
    id: "gopinath-munde-01",
    name: {
      mr: "गोपीनाथ मुंडे शेतकरी अपघात विमा योजना",
      en: "Gopinath Munde Shetkari Apghat Vima Yojana"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["None", "<5", ">5"] },
    benefitAmount: {
      mr: "₹२,००,००० पर्यंत भरपाई",
      en: "Up to ₹2,00,000 compensation"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "एफआईआर / पोलीस अहवाल", "रुग्णालय / मृत्यू प्रमाणपत्र", "बँक पासबुक"],
      en: ["Aadhaar Card", "7/12 Extract", "FIR / Accident Report", "Hospital / Death Certificate", "Bank Passbook"]
    },
    youtubeLink: "https://youtu.be/oVlU5O96_ow?si=z6tDcy3ZkYbtIFQe",
    officialLink: "https://krushi.maharashtra.gov.in"
  },
  {
    id: "magel-tyala-02",
    name: {
      mr: "मागेल त्याला शेततळे",
      en: "Magel Tyala Shettale"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "४०% ते १००% अनुदान",
      en: "40% to 100% Subsidy"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ आणि ८-अ उतारा", "रेशन कार्ड", "बँक पासबुक"],
      en: ["Aadhaar Card", "7/12 & 8-A Extract", "Ration Card", "Bank Passbook"]
    },
    youtubeLink: "https://youtu.be/uq8DpFrPELE",
    officialLink: "https://krushi.maharashtra.gov.in"
  },
  {
    id: "cm-solar-03",
    name: {
      mr: "मुख्यमंत्री सौर कृषी पंप योजना",
      en: "Chief Minister Solar Agriculture Pump Scheme"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "६०% ते ९५% पर्यंत अनुदान",
      en: "60% to 95% Subsidy"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "वीज बिल किंवा ना-हरकत प्रमाणपत्र", "संमती पत्र"],
      en: ["Aadhaar Card", "7/12 Extract", "Electricity Bill or NOC", "Consent Letter"]
    },
    youtubeLink: "https://youtu.be/uX5r5LtnyZQ",
    officialLink: "https://www.mahadiscom.in"
  },
  {
    id: "jalyukt-shivar-04",
    name: {
      mr: "जलयुक्त शिवार अभियान",
      en: "Jalyukt Shivar Abhiyan"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["None", "<5", ">5"] },
    benefitAmount: {
      mr: "जलसंधारणासाठी १००% खर्च",
      en: "100% cost for water conservation works"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "ग्रामसभा ठराव", "ग्रामपंचायत अर्ज"],
      en: ["Aadhaar Card", "7/12 Extract", "Gram Sabha Resolution", "Gram Panchayat Application"]
    },
    youtubeLink: "https://www.youtube.com/watch?v=Q22JdEKAtU8",
    officialLink: "https://www.maharashtra.gov.in"
  },
  {
    id: "micro-irrigation-05",
    name: {
      mr: "राज्य सूक्ष्म सिंचन अनुदान योजना",
      en: "State Micro-Irrigation Subsidy Scheme"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "५०% ते ७५% पर्यंत अनुदान",
      en: "50% to 75% Subsidy"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "जमिनीचा नकाशा", "वीज बिल"],
      en: ["Aadhaar Card", "7/12 Extract", "Land Map", "Electricity Bill"]
    },
    youtubeLink: "https://www.youtube.com/watch?v=opmOuCi6fyo",
    officialLink: "https://www.mahadbt.maharashtra.gov.in"
  },

  // --- BATCH 2 ---
  {
    id: "pmfby-06",
    name: {
      mr: "पंतप्रधान पीक विमा योजना (PMFBY)",
      en: "Pradhan Mantri Fasal Bima Yojana (PMFBY)"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "पिकांच्या नुकसानीवर विमा भरपाई",
      en: "Crop insurance coverage for damage"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "पीक पेरणी प्रमाणपत्र", "बँक पासबुक"],
      en: ["Aadhaar Card", "7/12 Extract", "Sowing Certificate", "Bank Passbook"]
    },
    youtubeLink: "https://youtu.be/JqZTe1czGW4",
    officialLink: "https://pmfby.gov.in"
  },
  {
    id: "pm-kisan-07",
    name: {
      mr: "पीएम किसान सन्मान निधी",
      en: "PM Kisan Samman Nidhi Yojana"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "₹६,००० प्रति वर्ष",
      en: "₹6,000 per year"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "बँक पासबुक"],
      en: ["Aadhaar Card", "7/12 Extract", "Bank Passbook"]
    },
    youtubeLink: "https://youtu.be/nmAWWOHlSKA?si=QYa2WnLl8zbdkZpc",
    officialLink: "https://pmkisan.gov.in"
  },
  {
    id: "karjmukti-08",
    name: {
      mr: "महात्मा जोतीराव फुले शेतकरी कर्जमुक्ती योजना",
      en: "Mahatma Jyotirao Phule Shetkari Karjmukti Yojana"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["None", "<5", ">5"] },
    benefitAmount: {
      mr: "₹२ लाख पर्यंत कर्जमाफी",
      en: "Loan Waiver up to ₹2 Lakh"
    },
    checklist: {
      mr: ["आधार कार्ड", "कर्ज खाते पासबुक", "रेशन कार्ड", "स्वयं-घोषणापत्र"],
      en: ["Aadhaar Card", "Bank Passbook (Loan Account)", "Ration Card", "Self-Declaration"]
    },
    youtubeLink: "https://youtu.be/2_ud6OE02Fo?si=KgnAGrsySiwnzH0e",
    officialLink: "https://mjpsky.maharashtra.gov.in"
  },
  {
    id: "namo-shetkari-09",
    name: {
      mr: "नमो शेतकरी महासन्मान निधी योजना",
      en: "Namo Shetkari Mahasanman Nidhi Yojana"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "अतिरिक्त ₹६,००० प्रति वर्ष",
      en: "Additional ₹6,000 per year"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "रहिवासी पुरावा", "बँक पासबुक"],
      en: ["Aadhaar Card", "7/12 Extract", "Residence Proof", "Bank Passbook"]
    },
    youtubeLink: "https://youtu.be/52ZX8klOHW4?si=iCMSq_06eCMaNQU3",
    officialLink: "https://www.mahadbt.maharashtra.gov.in"
  },
  {
    id: "kcc-10",
    name: {
      mr: "किसान क्रेडिट कार्ड (KCC)",
      en: "Kisan Credit Card (KCC) Scheme"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "स्वस्त दरात पीक कर्ज",
      en: "Short-term agricultural loans at low interest"
    },
    checklist: {
      mr: ["आधार कार्ड", "पॅन कार्ड", "७/१२ उतारा", "रहिवासी पुरावा"],
      en: ["Aadhaar Card", "PAN Card", "7/12 Extract", "Address Proof"]
    },
    youtubeLink: "https://youtu.be/k766_q17tOA?si=r1uZmos4ViYkg7nC",
    officialLink: "https://www.sbi.co.in/web/agri-rural/agriculture-banking/crop-loan/kisan-credit-card"
  },

  // --- BATCH 3 ---
  {
    id: "maandhan-11",
    name: {
      mr: "पंतप्रधान किसान मानधन योजना (पेन्शन)",
      en: "Pradhan Mantri Kisan Maandhan Yojana (Pension)"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5"] },
    benefitAmount: {
      mr: "₹३,०००/महिना पेन्शन (वयाच्या ६० नंतर)",
      en: "₹3,000/month Pension after age 60"
    },
    checklist: {
      mr: ["आधार कार्ड", "बँक पासबुक", "७/१२ उतारा", "वारसदार तपशील"],
      en: ["Aadhaar Card", "Bank Passbook", "7/12 Extract", "Nominee Details"]
    },
    youtubeLink: "https://youtu.be/xkKRb-xG8dc?si=wZ17TnMQJSvMAzyq",
    officialLink: "https://pmkmy.gov.in"
  },
  {
    id: "mechanization-12",
    name: {
      mr: "महाराष्ट्र कृषी यांत्रिकीकरण योजना",
      en: "Maharashtra Agriculture Mechanization Scheme"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "ट्रॅक्टर/अवजारांवर ४०-५०% अनुदान",
      en: "40% to 50% Subsidy on Tractors/Implements"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "अवजाराचे कोटेशन", "जातीचा दाखला (असल्यास)"],
      en: ["Aadhaar Card", "7/12 Extract", "Quotation of Implement", "Caste Certificate (If applicable)"]
    },
    youtubeLink: "https://www.youtube.com/watch?v=8Jx5W4xkuSg",
    officialLink: "https://mahadbt.maharashtra.gov.in"
  },
  {
    id: "nhm-13",
    name: {
      mr: "राष्ट्रीय फलोत्पादन अभियान (NHM)",
      en: "National Horticulture Mission / MIDH"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "फळबाग, हरितगृहांसाठी अनुदान",
      en: "Subsidy for fruit crops, polyhouses"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "लागवड तपशील", "बँक पासबुक"],
      en: ["Aadhaar Card", "7/12 Extract", "Plantation Details", "Bank Passbook"]
    },
    youtubeLink: "https://youtu.be/czYM7KoNbvo?si=PTy3t7LWVXUrywEK",
    officialLink: "https://nhm.gov.in"
  },
  {
    id: "onion-storage-14",
    name: {
      mr: "कांदा चाळ उभारणीसाठी अनुदान",
      en: "Subsidy for Onion Storage (Chavadi)"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "कांदा साठवणूक बांधकामासाठी अनुदान",
      en: "Capital subsidy for onion storage structures"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "बांधकाम अंदाजपत्रक", "बँक पासबुक"],
      en: ["Aadhaar Card", "7/12 Extract", "Construction Estimate", "Bank Passbook"]
    },
    youtubeLink: "https://youtu.be/r3nw5Z_2Lx0?si=yZUwlukwzCMDxu-x",
    officialLink: "https://www.mahadbt.maharashtra.gov.in/"
  },
  {
    id: "pm-kusum-15",
    name: {
      mr: "पीएम कुसुम योजना (सौर पंप)",
      en: "PM-KUSUM Yojana (Solar Pumps)"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "सौर पंपावर ९०-९५% अनुदान",
      en: "90-95% Subsidy on Solar Pumps"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "जातीचा दाखला", "बँक पासबुक"],
      en: ["Aadhaar Card", "7/12 Extract", "Caste Certificate", "Bank Passbook"]
    },
    youtubeLink: "https://youtu.be/IQJEfcmp-wI?si=gWpr8e5QIMo-ZDoD",
    officialLink: "https://kusum.mahaurja.com"
  },

  // --- BATCH 4 ---
  {
    id: "bhausaheb-fundkar-16",
    name: {
      mr: "भाऊसाहेब फुंडकर फळबाग लागवड योजना",
      en: "Bhausaheb Fundkar Falbag Lagwad Yojana"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["<5", ">5"] },
    benefitAmount: {
      mr: "३ वर्षांसाठी १००% अनुदान",
      en: "100% Subsidy for 3 years"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ आणि ८-अ उतारा", "हमीपत्र", "जातीचा दाखला"],
      en: ["Aadhaar Card", "7/12 & 8-A Extract", "Guarantee Letter", "Caste Certificate"]
    },
    youtubeLink: "https://youtu.be/HFLmzksImtc?si=pZyUCNPb7DyWyAW-",
    officialLink: "https://mahadbt.maharashtra.gov.in"
  },
  {
    id: "shc-17",
    name: {
      mr: "मृदा आरोग्य पत्रिका योजना (Soil Health Card)",
      en: "Soil Health Card (SHC) Scheme"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["None", "<5", ">5"] },
    benefitAmount: {
      mr: "मोफत माती परीक्षण व सल्ला",
      en: "Free soil testing & personalized advice"
    },
    checklist: {
      mr: ["आधार कार्ड", "७/१२ उतारा", "रहिवासी पुरावा", "बँक पासबुक"],
      en: ["Aadhaar Card", "Land Record", "Address Proof", "Bank Details"]
    },
    youtubeLink: "https://youtu.be/4CB2S52CdcQ?si=plj7Ymk_1QB-sYTO",
    officialLink: "https://www.soilhealth.dac.gov.in/"
  },
  {
    id: "atal-bamboo-18",
    name: {
      mr: "अटल बांबू समृद्धी योजना",
      en: "Maharashtra Atal Bamboo Samruddhi Yojana"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["None", "<5", ">5"] },
    benefitAmount: {
      mr: "बांबू लागवडीसाठी आर्थिक सहाय्य",
      en: "Support for bamboo cultivation & industry"
    },
    checklist: {
      mr: ["आधार कार्ड", "प्रकल्प अहवाल", "बँक पासबुक"],
      en: ["Aadhaar Card", "Project Plan", "Bank Details"]
    },
    youtubeLink: "https://youtu.be/eL4TUst1Kys?si=ZSm2xXz73Swz7m47",
    officialLink: "https://intranet.mahaforest.gov.in/forestportal/"
  },
  {
    id: "enam-19",
    name: {
      mr: "ई-नाम (e-NAM) राष्ट्रीय कृषी बाजार",
      en: "e-NAM (National Agriculture Market)"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["None", "<5", ">5"] },
    benefitAmount: {
      mr: "थेट बँक पेमेंट, चांगल्या किमती",
      en: "Online mandi selling, payment directly to bank"
    },
    checklist: {
      mr: ["आधार कार्ड", "बँक खाते", "मोबाईल नंबर"],
      en: ["Aadhaar Card", "Bank Account", "Mobile Number"]
    },
    youtubeLink: "https://youtu.be/Qkeo-OCX0Io?si=-cO0bF3vuYVTgroe",
    officialLink: "https://www.enam.gov.in"
  },
  {
    id: "sharad-pawar-20",
    name: {
      mr: "शरद पवार ग्रामसमृद्धी योजना",
      en: "Sharad Pawar Gram Samruddhi Yojana"
    },
    eligibility: { minAge: 18, maxIncomeLevel: "Any", landRequirement: ["None", "<5", ">5"] },
    benefitAmount: {
      mr: "गोठा, शेळीपालन शेडसाठी १००% अनुदान",
      en: "100% Subsidy for Sheds (Cow/Buffalo/Goat)"
    },
    checklist: {
      mr: ["आधार कार्ड", "MGNREGA जॉब कार्ड", "ग्रामपंचायत ठराव", "७/१२ आणि ८-अ उतारा"],
      en: ["Aadhaar Card", "MGNREGA Job Card", "Gram Panchayat Resolution", "7/12 & 8-A Extract"]
    },
    youtubeLink: "https://youtu.be/a5HDcr0T0FI",
    officialLink: "https://egs.mahaonline.gov.in"
  }
];

export default schemes;