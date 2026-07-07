import { useState, useEffect } from "react";
import { translations } from "./data";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Screenshots } from "./components/Screenshots";
import { Demo } from "./components/Demo";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { FounderNote } from "./components/FounderNote";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Info, X, Sparkles } from "lucide-react";
import { gsap } from "gsap";

export default function App() {
  // Determine language on load
  const [lang, setLang] = useState<"en" | "es">(() => {
    const saved = localStorage.getItem("fasterfy_lang");
    if (saved === "en" || saved === "es") return saved;
    
    // Check browser language
    const navLang = navigator.language.substring(0, 2);
    return navLang === "es" ? "es" : "en";
  });

  const [scrollPercent, setScrollPercent] = useState(0);
  const [showPreviewBanner, setShowPreviewBanner] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  // Sync scroll height progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalHeight = scrollHeight - clientHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  // Update language preference in storage
  const handleLangChange = (newLang: "en" | "es") => {
    setLang(newLang);
    localStorage.setItem("fasterfy_lang", newLang);
  };

  // Scroll smoothly back to input email waitlist form and focus it
  const handleFocusWaitlist = () => {
    const emailInput = document.getElementById("waitlist-email");
    if (emailInput) {
      emailInput.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        emailInput.focus();
      }, 550);
    }
  };

  const handleWaitlistSubmitSuccess = () => {
    setCelebrate(true);
    // End celebration visual effect after 4 seconds
    setTimeout(() => {
      setCelebrate(false);
    }, 4000);
  };

  const t = translations[lang];

  return (
    <div className="aurora-bg min-h-screen bg-ink text-white font-sans antialiased relative selection:bg-brand selection:text-black">
      {/* Moving green grid background */}
      <div className="grid-bg" />
      
      {/* Scroll Progress Bar */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollPercent}%` }} 
        role="progressbar" 
        aria-valuenow={scrollPercent} 
        aria-valuemin={0} 
        aria-valuemax={100}
      />

      {/* Glassmorphic Navbar */}
      <Header 
        t={t} 
        lang={lang} 
        setLang={handleLangChange} 
        onJoinClick={handleFocusWaitlist} 
      />

      {/* Main Page Content */}
      <main>
        {/* Celebrate burst visual indicator */}
        {celebrate && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
            <div className="absolute inset-0 bg-brand/5 backdrop-blur-3xs animate-pulse" />
            <div className="p-8 bg-ink-card/95 border border-brand/30 rounded-2xl shadow-2xl flex flex-col items-center space-y-3 animate-bounce">
              <Sparkles className="w-12 h-12 text-brand animate-spin" />
              <p className="text-xl font-display font-extrabold text-white text-center">
                {lang === "en" ? "Welcome Aboard Founder!" : "¡Bienvenido a bordo, fundador!"}
              </p>
              <p className="text-xs text-brand font-semibold">
                {lang === "en" ? "Queue position secured." : "Posición de cola asegurada."}
              </p>
            </div>
          </div>
        )}

        {/* Hero Section (incorporates waitlist) */}
        <Hero 
          t={t} 
          lang={lang} 
          onSubmitSuccess={handleWaitlistSubmitSuccess} 
        />

        {/* Visual proof — real plugin screenshots (placeholders for now) */}
        <Screenshots t={t} />

        {/* Container to scope Demo's stickiness so that it scrolls away before HowItWorks */}
        <div className="relative">
          {/* Live Interactive Demo Section */}
          <Demo />

          {/* What You Get / Core Features */}
          <Features t={t} />
        </div>

        {/* How It Works step by step Onboarding */}
        <HowItWorks t={t} />

        {/* Founder note — trust for a new pre-launch brand */}
        <FounderNote t={t} />

        {/* Frequently Asked Questions */}
        <FAQ t={t} />
      </main>

      {/* Pre-footer final CTA and footer content */}
      <Footer 
        t={t} 
        onCtaClick={handleFocusWaitlist} 
        onSubmitSuccess={handleWaitlistSubmitSuccess} 
      />

      {/* Preview Simulation Banner */}
      {showPreviewBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-ink-card/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl z-40 animate-fade-in flex items-start space-x-3.5">
          <Info className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-xs text-muted font-normal leading-relaxed">
            <p className="font-semibold text-white mb-0.5">
              {lang === "en" ? "Interactive Pre-launch Demo" : "Demo interactiva de prelanzamiento"}
            </p>
            <p>{t.msg.preview}</p>
          </div>
          <button
            onClick={() => setShowPreviewBanner(false)}
            className="text-muted/60 hover:text-white p-0.5 rounded transition-all cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
