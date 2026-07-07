import { useState, useEffect } from "react";
import { Globe, Menu, X } from "lucide-react";
import { TranslationItem } from "../data";

interface HeaderProps {
  t: TranslationItem;
  lang: "en" | "es";
  setLang: (l: "en" | "es") => void;
  onJoinClick: () => void;
}

export function Header({ t, lang, setLang, onJoinClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll height to apply glassmorphic styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 12) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy: Track active section
  useEffect(() => {
    const sections = ["features", "how-it-works", "faq"];
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger when section is in middle of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
  };

  const navItems = [
    { id: "features", label: t.nav.features },
    { id: "how-it-works", label: t.nav.how },
    { id: "faq", label: t.nav.faq },
  ];

  return (
    <>
      {/* Skip Link for accessibility */}
      <a
        href="#waitlist-section"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-brand focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:outline-none"
      >
        {t.nav.skip}
      </a>

      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-ink/80 backdrop-blur-md border-brand/10 py-3 shadow-lg shadow-brand/2"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center space-x-2 text-2xl font-sans font-bold tracking-tight text-white group"
            id="logo"
          >
            <span>
              Faster<span className="text-brand transition-colors duration-300 group-hover:text-brand-hover">Fy</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.id ? "text-brand" : "text-muted hover:text-white"
                }`}
              >
                {item.label}
                {/* Custom animated underline */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-brand origin-left transition-transform duration-300 ${
                    activeSection === item.id ? "scale-x-100" : "scale-x-0 hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Action buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switch */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-brand/40 bg-white/5 hover:bg-white/10 text-xs font-medium text-muted hover:text-white transition-all duration-200"
              aria-label={`Switch to ${lang === "en" ? "Spanish" : "English"}`}
            >
              <Globe className="w-3.5 h-3.5 text-brand" />
              <span>{lang === "en" ? "EN" : "ES"}</span>
              <span className="text-white/20">|</span>
              <span>{lang === "en" ? "ES" : "EN"}</span>
            </button>

            {/* CTA Button */}
            <button
              onClick={onJoinClick}
              className="shine-btn btn--primary px-4 py-2 bg-brand text-black hover:bg-brand-hover font-semibold rounded-lg text-sm transition-all duration-200 shadow-md shadow-brand/10 hover:shadow-brand/25"
              id="header-cta"
            >
              {t.nav.cta}
            </button>
          </div>

          {/* Mobile menu and language buttons */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Language Switch for Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-muted hover:text-white"
              aria-label="Toggle language"
            >
              <Globe className="w-3 h-3 text-brand" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-muted hover:text-white hover:border-brand/30 transition-all"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-ink/95 backdrop-blur-lg border-b border-white/10 py-4 px-6 flex flex-col space-y-4 md:hidden animate-fade-in shadow-2xl">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 text-base font-medium transition-colors ${
                  activeSection === item.id ? "text-brand" : "text-muted hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onJoinClick();
              }}
              className="shine-btn w-full py-3 bg-brand text-black font-semibold rounded-lg text-center transition-all shadow-md shadow-brand/10"
            >
              {t.nav.cta}
            </button>
          </div>
        )}
      </header>
    </>
  );
}
