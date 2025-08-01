import React, { useState, useEffect, useCallback } from 'react';
import { Leaf, Upload, History, Sun, Languages, Bot, User, ChevronRight, BarChart2, AlertTriangle, Cloud, CloudRain, ArrowLeft, LogOut, LayoutDashboard, PlusCircle, ShieldCheck, ArrowRight, Camera, Heart, Twitter, Facebook, Instagram } from 'lucide-react';



// --- CONFIGURATION ---
const API_BASE_URL = 'https://agridoc-cr3g.onrender.com/api';

// --- TRANSLATIONS ---
const translations = {
  en: {
    title: "AgriDoc",
    nav: {
      dashboard: "Dashboard",
      diagnose: "Diagnose",
      history: "History",
      forecast: "Forecast",
      home: "Home",
      about: "About",
      contact: "Contact",
    },
    language: "Language",
    uploadTitle: "Diagnose Crop Disease",
    uploadSubtitle: "Upload a clear image of the affected plant leaf.",
    uploadButton: "Upload Image",
    analyzing: "Analyzing...",
    diagnosisResult: "Diagnosis Result",
    disease: "Disease",
    confidence: "Confidence",
    treatment: "Recommended Treatment",
    historyTitle: "Diagnosis History",
    noHistory: "No past diagnoses found.",
    loadingHistory: "Loading history...",
    error: "An error occurred",
    errorFetchHistory: "Could not fetch diagnosis history.",
    errorDiagnose: "Failed to get diagnosis. Please try again.",
    weatherTitle: "Weather-Based Forecast",
    weatherLocation: "Jabalpur, Madhya Pradesh",
    footer: "© 2025 AgriDoc. All Rights Reserved.",
    login: "Login",
    signUp: "Sign Up",
    logout: "Logout",
    riskTitle: "Disease Risk",
    backToHistory: "Back to History",
    email: "Email Address",
    password: "Password",
    loginTitle: "Welcome Back, Farmer!",
    loginSubtitle: "Sign in to access your dashboard.",
    noAccount: "Don't have an account?",
    register: "Register here",
    registerTitle: "Create a New Account",
    registerSubtitle: "Join our community of farmers.",
    fullName: "Full Name",
    alreadyAccount: "Already have an account?",
    loginHere: "Login here",
    dashboardWelcome: "Welcome to your Dashboard",
    totalDiagnoses: "Total Diagnoses",
    commonDisease: "Most Common Disease",
    recentActivity: "Recent Activity",
    diagnoseNew: "Diagnose New Crop",
    viewAll: "View All",
    weatherPreview: "Local Weather",
    landingTitle: "Smarter Farming, Healthier Crops.",
    landingSubtitle: "Leverage AI to instantly identify crop diseases, get treatment recommendations, and secure your harvest.",
    getStarted: "Get Started",
    getStartedFree: "Get Started Free",
    loginToAccess: "Please Login to Access This Feature",
    imagePreview: "Image preview will appear here",
    landingHeroTitle: "Detect and Treat Crop Diseases with AI",
    landingHeroSubtitle: "Upload an image of a plant leaf to get an instant diagnosis and treatment recommendations. AgriDoc helps you keep your crops healthy and productive.",
    howItWorks: "How AgriDoc Works",
    howItWorksSub: "Our platform uses advanced AI to analyze plant leaf images, providing accurate diagnoses and tailored treatment plans. We also offer weather forecasts and treatment logs to help you manage your crops effectively.",
    feature1Title: "Image Analysis",
    feature1Desc: "Upload an image of a plant leaf, and our AI will identify any diseases or issues.",
    feature2Title: "Personalized Recommendations",
    feature2Desc: "Receive customized treatment plans and recommendations for your specific crop and condition.",
    feature3Title: "Weather Integration",
    feature3Desc: "Get real-time weather forecasts to help you plan your treatments and protect your crops.",
    ctaTitle: "Ready to Protect Your Crops?",
    ctaSubtitle: "Sign up today and start using AgriDoc to keep your plants healthy and productive.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contactUs: "Contact Us",
  },
  hi: {
    title: "एग्रीडॉक्टर",
    nav: {
      dashboard: "डैशबोर्ड",
      diagnose: "रोग निदान",
      history: "इतिहास",
      forecast: "पूर्वानुमान",
      home: "होम",
      about: "हमारे बारे में",
      contact: "संपर्क करें",
    },
    language: "भाषा",
    uploadTitle: "फसल रोग का निदान करें",
    uploadSubtitle: "प्रभावित पौधे के पत्ते की एक स्पष्ट छवि अपलोड करें।",
    uploadButton: "छवि अपलोड करें",
    analyzing: "विश्लेषण हो रहा है...",
    diagnosisResult: "निदान परिणाम",
    disease: "रोग",
    confidence: "आत्मविश्वास",
    treatment: "अनुशंसित उपचार",
    historyTitle: "निदान इतिहास",
    noHistory: "कोई पिछला निदान नहीं मिला।",
    loadingHistory: "इतिहास लोड हो रहा है...",
    error: "एक त्रुटि हुई",
    errorFetchHistory: "निदान इतिहास प्राप्त नहीं किया जा सका।",
    errorDiagnose: "निदान प्राप्त करने में विफल। कृपया पुन: प्रयास करें।",
    weatherTitle: "मौसम आधारित पूर्वानुमान",
    weatherLocation: "जबलपुर, मध्य प्रदेश",
    footer: "© २०२५ एग्रीडॉक्टर। सर्वाधिकार सुरक्षित।",
    login: "लॉग इन करें",
    signUp: "साइन अप करें",
    logout: "लॉग आउट",
    riskTitle: "रोग का खतरा",
    backToHistory: "इतिहास पर वापस जाएं",
    email: "ईमेल पता",
    password: "पासवर्ड",
    loginTitle: "वापसी पर स्वागत है, किसान!",
    loginSubtitle: "अपने डैशबोर्ड तक पहुंचने के लिए साइन इन करें।",
    noAccount: "खाता नहीं है?",
    register: "यहां पंजीकरण करें",
    registerTitle: "एक नया खाता बनाएं",
    registerSubtitle: "हमारे किसानों के समुदाय में शामिल हों।",
    fullName: "पूरा नाम",
    alreadyAccount: "पहले से ही एक खाता है?",
    loginHere: "यहां लॉगिन करें",
    dashboardWelcome: "आपके डैशबोर्ड में आपका स्वागत है",
    totalDiagnoses: "कुल निदान",
    commonDisease: "सबसे आम बीमारी",
    recentActivity: "हाल की गतिविधि",
    diagnoseNew: "नई फसल का निदान करें",
    viewAll: "सभी देखें",
    weatherPreview: "स्थानीय मौसम",
    landingTitle: "स्मार्ट खेती, स्वस्थ फसलें।",
    landingSubtitle: "फसल रोगों की तुरंत पहचान करने, उपचार की सिफारिशें प्राप्त करने और अपनी फसल को सुरक्षित करने के लिए AI का लाभ उठाएं।",
    getStarted: "शुरू करें",
    getStartedFree: "मुफ्त में शुरू करें",
    loginToAccess: "इस सुविधा का उपयोग करने के लिए कृपया लॉगिन करें",
    imagePreview: "छवि पूर्वावलोकन यहां दिखाई देगा",
    landingHeroTitle: "AI से फसल रोगों का पता लगाएं और उनका इलाज करें",
    landingHeroSubtitle: "तत्काल निदान और उपचार की सिफारिशें प्राप्त करने के लिए पौधे के पत्ते की एक छवि अपलोड करें। एग्रीडॉक्टर आपको अपनी फसलों को स्वस्थ और उत्पादक रखने में मदद करता है।",
    howItWorks: "एग्रीडॉक्टर कैसे काम करता है",
    howItWorksSub: "हमारा प्लेटफ़ॉर्म पौधे की पत्ती की छवियों का विश्लेषण करने, सटीक निदान और अनुरूप उपचार योजनाएं प्रदान करने के लिए उन्नत AI का उपयोग करता है। हम आपकी फसलों को प्रभावी ढंग से प्रबंधित करने में आपकी सहायता के लिए मौसम पूर्वानुमान और उपचार लॉग भी प्रदान करते हैं।",
    feature1Title: "छवि विश्लेषण",
    feature1Desc: "पौधे के पत्ते की एक छवि अपलोड करें, और हमारा AI किसी भी बीमारी या समस्या की पहचान करेगा।",
    feature2Title: "व्यक्तिगत सिफारिशें",
    feature2Desc: "अपनी विशिष्ट फसल और स्थिति के लिए अनुकूलित उपचार योजनाएं और सिफारिशें प्राप्त करें।",
    feature3Title: "मौसम एकीकरण",
    feature3Desc: "अपने उपचार की योजना बनाने और अपनी फसलों की रक्षा करने में मदद के लिए वास्तविक समय में मौसम का पूर्वानुमान प्राप्त करें।",
    ctaTitle: "अपनी फसलों की रक्षा के लिए तैयार हैं?",
    ctaSubtitle: "आज ही साइन अप करें और अपने पौधों को स्वस्थ और उत्पादक बनाए रखने के लिए एग्रीडॉक्टर का उपयोग शुरू करें।",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    contactUs: "संपर्क करें",
  }
};

// --- API SERVICE (UPDATED) ---
const apiService = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || "Invalid credentials");
    }
    return response.json();
  },
  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData || 'Registration failed');
    }
    return response.json();
  },
  diagnose: async (imageFile, userId) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('userId', userId);
    const response = await fetch(`${API_BASE_URL}/diagnose`, { method: 'POST', body: formData });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
      throw new Error(errorData.message || 'Failed to diagnose');
    }
    return response.json();
  },
  getHistory: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/history/${userId}`);
    if (!response.ok) { throw new Error('Failed to fetch history'); }
    return response.json();
  },
  getForecast: async () => {
    const response = await fetch(`${API_BASE_URL}/forecast`);
    if (!response.ok) { throw new Error('Failed to fetch forecast'); }
    return response.json();
  }
};

// --- HELPER COMPONENTS ---
const ErrorDisplay = ({ message }) => (<div className="flex items-center space-x-2 bg-red-100 text-red-700 p-4 rounded-lg"><AlertTriangle className="h-5 w-5" /><span>{message}</span></div>);
const Spinner = ({ text }) => (<div className="flex flex-col items-center justify-center space-y-4 py-8"><div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div><p className="text-lg font-semibold text-gray-600">{text}</p></div>);
const LoginPrompt = ({ t, setPage }) => (
    <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
        <ShieldCheck className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">{t.loginToAccess}</h2>
        <p className="text-gray-500 mt-2">{t.loginSubtitle}</p>
        <button onClick={() => setPage('login')} className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">{t.login}</button>
    </div>
);


// --- CORE COMPONENTS ---

const Header = ({ lang, setLang, setPage, t, currentUser, onLogout }) => (
  <header className="bg-[#f9fcf8] flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e9f3e7] px-10 py-3 sticky top-0 z-50">
    <div className="flex items-center gap-4 text-[#101b0e] cursor-pointer" onClick={() => setPage(currentUser ? 'dashboard' : 'landing')}>
      <Leaf className="size-6 text-[#2fb714]" />
      <h2 className="text-[#101b0e] text-lg font-bold leading-tight tracking-[-0.015em]">{t.title}</h2>
    </div>
    <div className="flex flex-1 justify-end items-center gap-8">
      {currentUser ? (
        <nav className="hidden md:flex items-center gap-9">
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('dashboard'); }} className="text-[#101b0e] text-sm font-medium leading-normal">{t.nav.dashboard}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('diagnose'); }} className="text-[#101b0e] text-sm font-medium leading-normal">{t.nav.diagnose}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('history'); }} className="text-[#101b0e] text-sm font-medium leading-normal">{t.nav.history}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setPage('forecast'); }} className="text-[#101b0e] text-sm font-medium leading-normal">{t.nav.forecast}</a>
        </nav>
      ) : (
        <nav className="hidden md:flex items-center gap-9">
           <a href="#" onClick={(e) => { e.preventDefault(); setPage('landing'); }} className="text-[#101b0e] text-sm font-medium leading-normal">{t.nav.home}</a>
           {/* These links are for show in the new UI, they can be implemented later */}
           <a href="#" className="text-[#101b0e] text-sm font-medium leading-normal">{t.nav.about}</a>
           <a href="#" className="text-[#101b0e] text-sm font-medium leading-normal">{t.nav.contact}</a>
        </nav>
      )}
      <div className="relative mr-4">
        <Languages className="h-5 w-5 text-gray-500" />
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
      {currentUser ? (
        <button onClick={onLogout} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e9f3e7] text-[#101b0e] text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">{t.logout}</span>
        </button>
      ) : (
        <div className="flex gap-2">
          <button onClick={() => setPage('login')} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#2fb714] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">{t.login}</span>
          </button>
          <button onClick={() => setPage('register')} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e9f3e7] text-[#101b0e] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">{t.signUp}</span>
          </button>
        </div>
      )}
    </div>
  </header>
);

const UploadSection = ({ t, currentUser, setPage }) => {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setPreviewUrl(URL.createObjectURL(file)); setResult(null); setError(null); }
  };

  const handleDiagnose = async () => {
    if (!imageFile || !currentUser) return;
    setIsAnalyzing(true); setError(null); setResult(null);
    try {
      const diagnosisResult = await apiService.diagnose(imageFile, currentUser.id);
      setResult(diagnosisResult);
    } catch (err) { setError(err.message || t.errorDiagnose); } finally { setIsAnalyzing(false); }
  };

  useEffect(() => { if (imageFile) { handleDiagnose(); } }, [imageFile]);
  const triggerFileSelect = () => fileInputRef.current.click();

  if (!currentUser) { return <LoginPrompt t={t} setPage={setPage} />; }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left"><h2 className="text-3xl font-bold text-gray-800 mb-2">{t.uploadTitle}</h2><p className="text-gray-500 mb-6">{t.uploadSubtitle}</p><input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} /><button onClick={triggerFileSelect} className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"><Upload className="h-5 w-5" /><span className="font-semibold">{t.uploadButton}</span></button></div>
          <div className="relative h-64 w-full bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">{previewUrl ? <img src={previewUrl} alt="Uploaded Leaf" className="h-full w-full object-cover" /> : <div className="text-center text-gray-400"><Leaf className="mx-auto h-12 w-12 mb-2" /><p>{t.imagePreview}</p></div>}</div>
        </div>
      </div>
      {(isAnalyzing || result || error) && (<div className="mt-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-fade-in">{isAnalyzing && <Spinner text={t.analyzing} />}{error && <ErrorDisplay message={error} />}{result && <DiagnosisDetailView result={result} t={t} />}</div>)}
    </div>
  );
};

const DiagnosisDetailView = ({ result, t, onBack }) => (
  <div>
    {onBack && (<button onClick={onBack} className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 mb-6"><ArrowLeft className="h-4 w-4" /><span>{t.backToHistory}</span></button>)}
    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Bot className="mr-3 text-green-600"/>{t.diagnosisResult}</h3>
    <div className="space-y-6">
      <div className="bg-green-50 p-4 rounded-lg"><p className="text-sm font-semibold text-green-800">{t.disease}</p><p className="text-xl font-bold text-green-900">{result.diseaseName}</p></div>
      <div className="bg-blue-50 p-4 rounded-lg"><p className="text-sm font-semibold text-blue-800">{t.confidence}</p><div className="flex items-center space-x-3 mt-1"><div className="w-full bg-blue-200 rounded-full h-2.5"><div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${result.confidenceScore}%` }}></div></div><span className="font-bold text-blue-900">{result.confidenceScore}%</span></div></div>
      <div className="bg-yellow-50 p-4 rounded-lg"><p className="text-sm font-semibold text-yellow-800">{t.treatment}</p><pre className="text-sm text-yellow-900 whitespace-pre-wrap font-sans mt-2">{result.treatmentRecommended}</pre></div>
    </div>
  </div>
);

const HistoryPage = ({ t, onRecordSelect, currentUser, setPage }) => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) { setIsLoading(false); return; }
    const fetchHistory = async () => {
      try { const data = await apiService.getHistory(currentUser.id); setHistory(data); } catch (err) { setError(t.errorFetchHistory); } finally { setIsLoading(false); }
    };
    fetchHistory();
  }, [t.errorFetchHistory, currentUser]);

  if (!currentUser) { return <LoginPrompt t={t} setPage={setPage} />; }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.historyTitle}</h2>
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 min-h-[200px]">
        {isLoading && <Spinner text={t.loadingHistory} />}
        {error && <ErrorDisplay message={error} />}
        {!isLoading && !error && (
          history.length > 0 ? (
            <ul className="divide-y divide-gray-200">{history.map(record => (<li key={record.id} onClick={() => onRecordSelect(record)} className="py-4 flex items-center justify-between hover:bg-gray-50 -mx-6 px-6 cursor-pointer transition-colors"><div className="flex items-center space-x-4"><img src={record.imageUrl || `https://placehold.co/100x100/e2e8f0/4a5568?text=Leaf`} alt={record.diseaseName} className="h-16 w-16 rounded-lg object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/e2e8f0/4a5568?text=Leaf'; }}/><div><p className="text-lg font-semibold text-gray-800">{record.diseaseName}</p><p className="text-sm text-gray-500">{new Date(record.diagnosedAt).toLocaleDateString()}</p></div></div><ChevronRight className="h-6 w-6 text-gray-400" /></li>))}</ul>
          ) : (<p className="text-center text-gray-500 py-8">{t.noHistory}</p>)
        )}
      </div>
    </div>
  );
};

const ForecastPage = ({ t }) => {
    const [forecast, setForecast] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => { const fetchForecast = async () => { try { setIsLoading(true); setError(null); const data = await apiService.getForecast(); setForecast(data); } catch (err) { setError(err.message || 'Could not fetch forecast data.'); } finally { setIsLoading(false); } }; fetchForecast(); }, []);
    const getRiskColorClasses = (level) => { if (!level) return 'bg-gray-100 text-gray-800'; const lowerLevel = level.toLowerCase(); if (lowerLevel === 'high') return 'bg-red-100 text-red-800'; if (lowerLevel === 'medium') return 'bg-yellow-100 text-yellow-800'; return 'bg-green-100 text-green-800'; };
    const getWeatherIcon = (condition) => { if (!condition) return <Cloud className="h-20 w-20 text-gray-400" />; const lowerCondition = condition.toLowerCase(); if (lowerCondition.includes('clear') || lowerCondition.includes('sun')) return <Sun className="h-20 w-20 text-yellow-400" />; if (lowerCondition.includes('cloud')) return <Cloud className="h-20 w-20 text-gray-400" />; if (lowerCondition.includes('rain')) return <CloudRain className="h-20 w-20 text-blue-400" />; return <Cloud className="h-20 w-20 text-gray-400" />; };
    if (isLoading) { return <div className="w-full max-w-4xl mx-auto"><Spinner text="Loading Forecast..." /></div>; }
    if (error) { return <div className="w-full max-w-4xl mx-auto"><ErrorDisplay message={error} /></div>; }
    if (!forecast) { return null; }
    return (
        <div className="w-full max-w-4xl mx-auto animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.weatherTitle}</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"><p className="text-gray-500 font-semibold">{t.weatherLocation}</p><div className="flex items-center justify-center space-x-4 my-4">{getWeatherIcon(forecast.weather.condition)}<div><p className="text-5xl font-bold text-gray-800">{Math.round(forecast.weather.temperature)}°C</p><p className="text-lg text-gray-600">{forecast.weather.condition}</p></div></div><div className="flex justify-around text-center mt-4"><div><p className="font-bold text-gray-800">{forecast.weather.humidity}%</p><p className="text-sm text-gray-500">Humidity</p></div><div><p className="font-bold text-gray-800">{Math.round(forecast.weather.windSpeed)} km/h</p><p className="text-sm text-gray-500">Wind</p></div></div></div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"><h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><BarChart2 className="mr-2"/>{t.riskTitle}</h3><div className="space-y-3">{forecast.risks.map((risk, index) => (<div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"><span className="font-medium text-gray-700">{risk.diseaseName}</span><span className={`px-3 py-1 text-sm font-bold rounded-full ${getRiskColorClasses(risk.riskLevel)}`}>{risk.riskLevel}</span></div>))}</div></div>
            </div>
        </div>
    );
};

const LoginPage = ({ t, onLogin, setPage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => { e.preventDefault(); setIsLoading(true); setError(null); try { const user = await apiService.login(email, password); onLogin(user); } catch (err) { setError(err.message); } finally { setIsLoading(false); } };
    return (<div className="w-full max-w-md mx-auto"><div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"><h2 className="text-3xl font-bold text-gray-800 text-center mb-2">{t.loginTitle}</h2><p className="text-gray-500 text-center mb-8">{t.loginSubtitle}</p>{error && <div className="mb-4"><ErrorDisplay message={error} /></div>}<form onSubmit={handleSubmit} className="space-y-6"><div><label htmlFor="email" className="block text-sm font-medium text-gray-700">{t.email}</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" /></div><div><label htmlFor="password" className="block text-sm font-medium text-gray-700">{t.password}</label><input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" /></div><button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">{isLoading ? t.analyzing : t.login}</button></form><p className="mt-6 text-center text-sm text-gray-600">{t.noAccount} <a href="#" onClick={(e) => {e.preventDefault(); setPage('register')}} className="font-medium text-green-600 hover:text-green-500">{t.register}</a></p></div></div>);
};

const RegisterPage = ({ t, onRegister, setPage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => { e.preventDefault(); setIsLoading(true); setError(null); try { const newUser = await apiService.register(name, email, password); onRegister(newUser); } catch (err) { setError(err.message); } finally { setIsLoading(false); } };
    return (<div className="w-full max-w-md mx-auto"><div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"><h2 className="text-3xl font-bold text-gray-800 text-center mb-2">{t.registerTitle}</h2><p className="text-gray-500 text-center mb-8">{t.registerSubtitle}</p>{error && <div className="mb-4"><ErrorDisplay message={error} /></div>}<form onSubmit={handleSubmit} className="space-y-6"><div><label htmlFor="name" className="block text-sm font-medium text-gray-700">{t.fullName}</label><input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" /></div><div><label htmlFor="email-reg" className="block text-sm font-medium text-gray-700">{t.email}</label><input type="email" id="email-reg" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" /></div><div><label htmlFor="password-reg" className="block text-sm font-medium text-gray-700">{t.password}</label><input type="password" id="password-reg" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500" /></div><button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">{isLoading ? t.analyzing : t.register}</button></form><p className="mt-6 text-center text-sm text-gray-600">{t.alreadyAccount} <a href="#" onClick={(e) => {e.preventDefault(); setPage('login')}} className="font-medium text-green-600 hover:text-green-500">{t.loginHere}</a></p></div></div>);
};

const DashboardPage = ({ t, currentUser, setPage, onRecordSelect }) => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState({ total: 0, common: 'N/A' });

    useEffect(() => {
        if (!currentUser) { setIsLoading(false); return; }
        const fetchData = async () => {
            try {
                const data = await apiService.getHistory(currentUser.id);
                setHistory(data);
                if (data.length > 0) {
                    const counts = data.reduce((acc, record) => { acc[record.diseaseName] = (acc[record.diseaseName] || 0) + 1; return acc; }, {});
                    const common = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
                    setStats({ total: data.length, common: common });
                }
            } catch (err) { setError(t.errorFetchHistory); } finally { setIsLoading(false); }
        };
        fetchData();
    }, [currentUser, t.errorFetchHistory]);

    if (isLoading) { return <Spinner text="Loading Dashboard..." />; }
    if (error) { return <ErrorDisplay message={error} />; }

    return (
        <div className="w-full max-w-5xl mx-auto animate-fade-in">
            <div className="flex justify-between items-center mb-8"><h2 className="text-3xl font-bold text-gray-800">{t.dashboardWelcome}, {currentUser.name.split(' ')[0]}!</h2><button onClick={() => setPage('diagnose')} className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"><PlusCircle className="h-5 w-5" /><span>{t.diagnoseNew}</span></button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"><div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"><p className="text-gray-500">{t.totalDiagnoses}</p><p className="text-4xl font-bold text-gray-800 mt-2">{stats.total}</p></div><div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"><p className="text-gray-500">{t.commonDisease}</p><p className="text-2xl font-bold text-gray-800 mt-2 truncate">{stats.common}</p></div></div>
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100"><div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-gray-800">{t.recentActivity}</h3><button onClick={() => setPage('history')} className="text-sm font-medium text-green-600 hover:underline">{t.viewAll}</button></div>{history.length > 0 ? (<ul className="divide-y divide-gray-200">{history.slice(0, 3).map(record => (<li key={record.id} onClick={() => onRecordSelect(record)} className="py-3 flex items-center justify-between cursor-pointer group"><div className="flex items-center space-x-4"><img src={record.imageUrl || `https://placehold.co/100x100/e2e8f0/4a5568?text=Leaf`} alt={record.diseaseName} className="h-12 w-12 rounded-lg object-cover" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/100x100/e2e8f0/4a5568?text=Leaf'; }}/><div><p className="font-semibold text-gray-800">{record.diseaseName}</p><p className="text-sm text-gray-500">{new Date(record.diagnosedAt).toLocaleDateString()}</p></div></div><ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600" /></li>))}</ul>) : <p className="text-center text-gray-500 py-4">{t.noHistory}</p>}</div>
        </div>
    );
};

const HeroSection = ({ t, setPage }) => (
    <div className="p-4">
        <div
            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-lg items-center justify-center p-4"
            style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB4Vo4l6gq5ILwOXD0PRflOXzWu_BUCZ0SE5KXarOstNJ3eUa9mZhpDybDtSPjtJK5_K1NuI8NIcgr6B2R4Q-CxGJ6QpqdjUVxEte_O4R3lOjwS0s_pgwUoCAmhQjJWdUROXCdtCekGUhrXX2kD246RnDyngi0dhakLeCyb8fL4hSUS915fgqxzE21biv0XWAqw5f54gpYAPub8DtIGYb4MwsN5V6dUXYunoCHvEuTOgwYB1fwg5LAhyiITVk358iWdYJkOlS7japg")'}}
        >
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">{t.landingHeroTitle}</h1>
                <h2 className="text-white text-sm font-normal leading-normal sm:text-base">{t.landingHeroSubtitle}</h2>
            </div>
            <button
                onClick={() => setPage('login')}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-[#2fb714] text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base"
            >
                <span className="truncate">{t.uploadButton}</span>
            </button>
        </div>
    </div>
);

const FeaturesSection = ({ t }) => (
    <div className="flex flex-col gap-10 px-4 py-10">
        <div className="flex flex-col gap-4">
            <h1 className="text-[#101b0e] tracking-light text-[32px] font-bold leading-tight sm:text-4xl max-w-[720px]">{t.howItWorks}</h1>
            <p className="text-[#101b0e] text-base font-normal leading-normal max-w-[720px]">{t.howItWorksSub}</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            <div className="flex flex-1 gap-3 rounded-lg border border-[#d4e7d0] bg-[#f9fcf8] p-4 flex-col">
                <Camera className="text-[#101b0e] size-6" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#101b0e] text-base font-bold leading-tight">{t.feature1Title}</h2>
                    <p className="text-[#5a974e] text-sm font-normal leading-normal">{t.feature1Desc}</p>
                </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-[#d4e7d0] bg-[#f9fcf8] p-4 flex-col">
                <Heart className="text-[#101b0e] size-6" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#101b0e] text-base font-bold leading-tight">{t.feature2Title}</h2>
                    <p className="text-[#5a974e] text-sm font-normal leading-normal">{t.feature2Desc}</p>
                </div>
            </div>
            <div className="flex flex-1 gap-3 rounded-lg border border-[#d4e7d0] bg-[#f9fcf8] p-4 flex-col">
                <Cloud className="text-[#101b0e] size-6" />
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#101b0e] text-base font-bold leading-tight">{t.feature3Title}</h2>
                    <p className="text-[#5a974e] text-sm font-normal leading-normal">{t.feature3Desc}</p>
                </div>
            </div>
        </div>
    </div>
);

const CTASection = ({ t, setPage }) => (
    <div className="flex flex-col justify-end gap-6 px-4 py-10 sm:gap-8 sm:px-10 sm:py-20">
        <div className="flex flex-col gap-2 text-center">
            <h1 className="text-[#101b0e] tracking-light text-[32px] font-bold leading-tight sm:text-4xl max-w-[720px] mx-auto">{t.ctaTitle}</h1>
            <p className="text-[#101b0e] text-base font-normal leading-normal max-w-[720px] mx-auto">{t.ctaSubtitle}</p>
        </div>
        <div className="flex justify-center">
            <button
                onClick={() => setPage('register')}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 sm:h-12 sm:px-5 bg-[#2fb714] text-white text-sm font-bold leading-normal tracking-[0.015em] sm:text-base"
            >
                <span className="truncate">{t.getStarted}</span>
            </button>
        </div>
    </div>
);

const LandingPage = ({ t, setPage }) => (
    <div className="px-0 sm:px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col max-w-[960px] flex-1">
            <HeroSection t={t} setPage={setPage} />
            <FeaturesSection t={t} />
            <CTASection t={t} setPage={setPage} />
        </div>
    </div>
);


const Footer = ({ t }) => (
    <footer className="flex justify-center bg-[#f9fcf8] border-t border-solid border-t-[#e9f3e7]">
        <div className="flex max-w-[960px] flex-1 flex-col">
            <div className="flex flex-col gap-6 px-5 py-10 text-center">
                <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-around">
                    <a className="text-[#5a974e] text-base font-normal leading-normal min-w-40" href="#">{t.privacyPolicy}</a>
                    <a className="text-[#5a974e] text-base font-normal leading-normal min-w-40" href="#">{t.termsOfService}</a>
                    <a className="text-[#5a974e] text-base font-normal leading-normal min-w-40" href="#">{t.contactUs}</a>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    <a href="#"><Twitter className="text-[#5a974e] size-6" /></a>
                    <a href="#"><Facebook className="text-[#5a974e] size-6" /></a>
                    <a href="#"><Instagram className="text-[#5a974e] size-6" /></a>
                </div>
                <p className="text-[#5a974e] text-base font-normal leading-normal">© {new Date().getFullYear()} {t.title}. All rights reserved.</p>
            </div>
        </div>
    </footer>
);


// --- MAIN APP ---
export default function App() {
  const [lang, setLang] = useState('en');
  const [page, setPage] = useState('landing');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const t = translations[lang];

  useEffect(() => {
    if (!currentUser) {
      if (page !== 'login' && page !== 'register') {
        setPage('landing');
      }
    } else {
      setPage('dashboard');
    }
  }, [currentUser, page]);

  const handleLogin = (user) => { setCurrentUser(user); };
  const handleLogout = () => { setCurrentUser(null); };
  const handleRegister = (user) => { setCurrentUser(user); };
  const handleRecordSelect = (record) => { setSelectedRecord(record); setPage('historyDetail'); };
  const handleBackToHistory = () => { setSelectedRecord(null); setPage('history'); };

  const PageContent = useCallback(() => {
    if (!currentUser) {
        switch (page) {
            case 'login': return <LoginPage t={t} onLogin={handleLogin} setPage={setPage} />;
            case 'register': return <RegisterPage t={t} onRegister={handleRegister} setPage={setPage} />;
            default: return <LandingPage t={t} setPage={setPage} />;
        }
    }

    switch (page) {
      case 'dashboard': return <DashboardPage t={t} currentUser={currentUser} setPage={setPage} onRecordSelect={handleRecordSelect} />;
      case 'history': return <HistoryPage t={t} onRecordSelect={handleRecordSelect} currentUser={currentUser} setPage={setPage} />;
      case 'historyDetail': return <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100"><DiagnosisDetailView result={selectedRecord} t={t} onBack={handleBackToHistory} /></div>;
      case 'forecast': return <ForecastPage t={t} />;
      case 'diagnose': default: return <UploadSection t={t} currentUser={currentUser} setPage={setPage} />;
    }
  }, [page, t, selectedRecord, currentUser, handleLogin, handleRegister]);

  const isLanding = page === 'landing';

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#f9fcf8] group/design-root overflow-x-hidden" style={{fontFamily: 'Lexend, "Noto Sans", sans-serif'}}>
      <style>{`.loader { border-top-color: #3498db; animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } } @keyframes fade-in { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }`}</style>
      <Header lang={lang} setLang={setLang} setPage={setPage} t={t} currentUser={currentUser} onLogout={handleLogout} />
      <main className={isLanding ? 'flex h-full grow flex-col' : 'container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'}>
        <PageContent />
      </main>
      {currentUser && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-t-lg p-2 flex justify-around">
           <button onClick={() => setPage('dashboard')} className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${page === 'dashboard' ? 'text-green-600' : 'text-gray-500'}`}><LayoutDashboard/><span className="text-xs">{t.nav.dashboard}</span></button>
           <button onClick={() => setPage('diagnose')} className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${page === 'diagnose' ? 'text-green-600' : 'text-gray-500'}`}><Leaf/><span className="text-xs">{t.nav.diagnose}</span></button>
           <button onClick={() => setPage('history')} className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${page === 'history' ? 'text-green-600' : 'text-gray-500'}`}><History/><span className="text-xs">{t.nav.history}</span></button>
           <button onClick={() => setPage('forecast')} className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${page === 'forecast' ? 'text-green-600' : 'text-gray-500'}`}><Sun/><span className="text-xs">{t.nav.forecast}</span></button>
        </div>
      )}
      <Footer t={t} />
    </div>
  );
}
