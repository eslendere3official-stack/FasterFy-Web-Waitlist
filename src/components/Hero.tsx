import React, { useState, useEffect } from "react";
import { Check, Info, Sparkles, ShieldCheck, Mail, Zap, RefreshCw, Play, CheckCircle2, Settings, Database, ChevronDown } from "lucide-react";
import { TranslationItem } from "../data";
import { AnimatedCounter } from "./AnimatedCounter";
import { Reveal } from "./Reveal";
import { renderWithAccents } from "../utils/text";

interface HeroProps {
  t: TranslationItem;
  lang: "en" | "es";
  onSubmitSuccess: () => void;
}

export function Hero({ t, lang, onSubmitSuccess }: HeroProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  
  // Form submission status
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "throttled">("idle");
  const [statusMsg, setStatusMsg] = useState("");
  
  // Interactive counts loaded from localStorage
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [userRank, setUserRank] = useState<number | null>(null);

  // Title typing animation state & effect
  const [titleCharCount, setTitleCharCount] = useState(0);

  useEffect(() => {
    setTitleCharCount(0);
    const spanishFullText = "Optimiza la velocidad y el SEO de tus imágenes en WordPress.";
    const targetLength = lang === "es" ? spanishFullText.length : (t.hero.title || "").length;
    let current = 0;
    
    const interval = setInterval(() => {
      current += 1;
      setTitleCharCount(current);
      if (current >= targetLength) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [lang, t.hero.title]);

  // Load and sync waitlist state
  useEffect(() => {
    const stored = localStorage.getItem("fasterfy_waitlist");
    let countOffset = 0;
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as string[];
        countOffset = parsed.length;
        
        // If current user already submitted, find their rank
        const userEmail = localStorage.getItem("fasterfy_user_email");
        if (userEmail) {
          const index = parsed.indexOf(userEmail);
          if (index !== -1) {
            setUserRank(index + 1);
            setStatus("success");
            setEmail(userEmail);
            setConsent(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    setWaitlistCount(countOffset);
  }, []);

  // --- Overlapping Cards Typing Simulation States ---
  const [backFilename, setBackFilename] = useState("");
  const [backIsTyping, setBackIsTyping] = useState(false);

  const [frontState, setFrontState] = useState({
    filename: "",
    date: "",
    size: "",
    res: "",
    url: "",
    title: "",
    alt: "",
    caption: "",
    description: ""
  });

  const [activeField, setActiveField] = useState<keyof typeof frontState | "back" | null>(null);
  const [showFrontActions, setShowFrontActions] = useState(false);

  // Overlapping Cards typing loop
  useEffect(() => {
    let active = true;

    const typeValue = async (
      text: string,
      setter: (val: string) => void,
      fieldKey: keyof typeof frontState | "back" | null,
      speed: number
    ) => {
      if (!active) return false;
      if (fieldKey === "back") {
        setBackIsTyping(true);
      } else if (fieldKey) {
        setActiveField(fieldKey);
      }

      let current = "";
      for (let i = 0; i < text.length; i++) {
        if (!active) return false;
        current += text[i];
        setter(current);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }

      if (fieldKey === "back") {
        setBackIsTyping(false);
      } else if (fieldKey) {
        setActiveField(null);
      }
      return true;
    };

    // Back card typing (runs once)
    typeValue("Beagle-feliz-al-aire-libre.JPG", setBackFilename, "back", 60);

    // Front card infinite loop
    const runFrontLoop = async () => {
      while (active) {
        // Clear all fields
        setFrontState({
          filename: "",
          date: "",
          size: "",
          res: "",
          url: "",
          title: "",
          alt: "",
          caption: "",
          description: ""
        });
        setShowFrontActions(false);

        await new Promise((resolve) => setTimeout(resolve, 800));
        if (!active) break;

        // Type each field sequentially with exact matching speeds from standard code
        const ok1 = await typeValue("Perro-primer-plano.JPG", (val) => setFrontState(s => ({ ...s, filename: val })), "filename", 80);
        if (!ok1) break;
        const ok2 = await typeValue("Julio 4, 2026", (val) => setFrontState(s => ({ ...s, date: val })), "date", 50);
        if (!ok2) break;
        const ok3 = await typeValue("17 KB", (val) => setFrontState(s => ({ ...s, size: val })), "size", 30);
        if (!ok3) break;
        const ok4 = await typeValue("999 × 800", (val) => setFrontState(s => ({ ...s, res: val })), "res", 30);
        if (!ok4) break;
        const ok5 = await typeValue("https://localhost/golden-retriever-feliz", (val) => setFrontState(s => ({ ...s, url: val })), "url", 40);
        if (!ok5) break;
        const ok6 = await typeValue("Perro-en-primer-plano.jpg", (val) => setFrontState(s => ({ ...s, title: val })), "title", 40);
        if (!ok6) break;
        const ok7 = await typeValue("Primer plano de un perro de raza Golden Retriever mirando fijamente la cámara", (val) => setFrontState(s => ({ ...s, alt: val })), "alt", 25);
        if (!ok7) break;
        const ok8 = await typeValue("Un primer plano lleno de ternura capturando la mirada curiosa de su fiel amigo.", (val) => setFrontState(s => ({ ...s, caption: val })), "caption", 25);
        if (!ok8) break;
        const ok9 = await typeValue("Esta fotografía en primer plano destaca la suavidad del pelaje y la calidez de la mirada del perro.", (val) => setFrontState(s => ({ ...s, description: val })), "description", 20);
        if (!ok9) break;

        setShowFrontActions(true);
        // Wait 4000ms
        await new Promise((resolve) => setTimeout(resolve, 4000));
      }
    };

    runFrontLoop();

    return () => {
      active = false;
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setStatusMsg(t.msg.invalidEmail);
      return;
    }

    // Validate consent
    if (!consent) {
      setStatus("error");
      setStatusMsg(t.msg.consent);
      return;
    }

    // Check throttle (basic double-submission prevention)
    const lastSubmit = localStorage.getItem("fasterfy_last_submit_time");
    const now = Date.now();
    if (lastSubmit && now - parseInt(lastSubmit) < 5000) {
      setStatus("throttled");
      setStatusMsg(t.msg.throttled);
      return;
    }

    setStatus("sending");
    setStatusMsg(t.msg.sending);

    // Simulate server delay
    setTimeout(() => {
      try {
        const stored = localStorage.getItem("fasterfy_waitlist");
        let list: string[] = [];
        if (stored) {
          list = JSON.parse(stored);
        }

        // Add email if not already there
        if (!list.includes(email)) {
          list.push(email);
          localStorage.setItem("fasterfy_waitlist", JSON.stringify(list));
        }

        const newRank = list.indexOf(email) + 1;
        
        localStorage.setItem("fasterfy_user_email", email);
        localStorage.setItem("fasterfy_last_submit_time", String(now));
        
        setUserRank(newRank);
        setWaitlistCount(list.length);
        setStatus("success");
        setStatusMsg(t.msg.success);
        onSubmitSuccess();
      } catch (e) {
        setStatus("error");
        setStatusMsg(t.msg.error);
      }
    }, 1000);
  };

  const renderSpanishTyped = (charCount: number) => {
    const segments = [
      { text: "Optimiza", className: "text-[#29BE29]" },
      { text: " la ", className: "" },
      { text: "velocidad", className: "text-[#29BE29]" },
      { text: " y el ", className: "" },
      { text: "SEO", className: "text-[#29BE29]" },
      { text: " de tus ", className: "" },
      { text: "imágenes", className: "text-[#29BE29] font-serif italic" },
      { text: " en ", className: "" },
      { text: "WordPress.", className: "text-[#29BE29] font-serif italic" }
    ];

    let remaining = charCount;
    return (
      <>
        {segments.map((seg, idx) => {
          if (remaining <= 0) return null;
          const sliceLen = Math.min(seg.text.length, remaining);
          remaining -= sliceLen;
          const visibleText = seg.text.substring(0, sliceLen);
          return (
            <span key={idx} className={seg.className}>
              {visibleText}
            </span>
          );
        })}
      </>
    );
  };

  return (
    <section
      id="waitlist-section"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Pain, Promise & Form */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
          
          {/* Eyebrow Badge */}
          <Reveal direction="up" delay={50} className="self-start">
            <span className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-full bg-[#29BE29]/10 border border-[#29BE29]/30 text-xs font-semibold text-[#D8D8D8] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#29BE29] animate-pulse" />
              <span>{t.hero.badge}</span>
            </span>
          </Reveal>

          {/* Title */}
          <Reveal direction="up" delay={150}>
            {lang === "es" ? (
              <h1 className="text-4xl sm:text-5xl xl:text-6.5xl font-sans font-bold text-[#D8D8D8] tracking-tight leading-tight min-h-[3.3em] lg:min-h-[3.8em]">
                {renderSpanishTyped(titleCharCount)}
                <span className="inline-block w-[3px] h-[0.9em] ml-1 bg-[#29BE29] align-middle animate-pulse" style={{ animationDuration: '0.8s' }} />
              </h1>
            ) : (
              <h1 className="text-4xl sm:text-5xl xl:text-6.5xl font-sans font-bold text-[#D8D8D8] tracking-tight leading-tight min-h-[3.3em] lg:min-h-[3.8em]">
                {renderWithAccents((t.hero.title || "").substring(0, titleCharCount))}
                <span className="inline-block w-[3px] h-[0.9em] ml-1 bg-[#29BE29] align-middle animate-pulse" style={{ animationDuration: '0.8s' }} />
              </h1>
            )}
          </Reveal>

          {/* Lead & Sub-leads */}
          <div className="space-y-4">
            {lang === "es" ? (
              <>
                <Reveal direction="up" delay={800}>
                  <p className="text-base sm:text-lg text-[#D8D8D8] font-normal max-w-2xl leading-relaxed">
                    Las imágenes pesadas y la falta de textos alt{" "}
                    <span className="text-[#29BE29] font-serif italic font-semibold">están</span>{" "}
                    <span className="text-[#29BE29] font-semibold">hundiendo tu posicionamiento en Google.</span>
                  </p>
                </Reveal>
                <Reveal direction="up" delay={1100}>
                  <p className="text-xs sm:text-sm text-[#D8D8D8]/85 max-w-2xl leading-relaxed">
                    <span className="text-[#29BE29] font-bold">FasterFy</span> es un plugin que se instala en segundos, escanea tu biblioteca y{" "}
                    <span className="text-[#29BE29] font-semibold">convierte</span>,{" "}
                    <span className="text-[#29BE29] font-semibold">comprime</span> y{" "}
                    <span className="text-[#29BE29] font-semibold">redacta el alt text</span> de{" "}
                    forma <span className="text-[#29BE29] font-serif italic font-extrabold">AUTOMÁTICA</span>.
                  </p>
                </Reveal>
              </>
            ) : (
              <Reveal direction="up" delay={800}>
                <p className="text-base sm:text-lg text-muted font-normal max-w-2xl leading-relaxed">
                  {renderWithAccents(t.hero.lead)}
                </p>
              </Reveal>
            )}
          </div>

          {/* Subtle line divider as in the design sample */}
          <Reveal direction="up" delay={1300}>
            <hr className="border-t border-[#D8D8D8]/10 my-4" />
          </Reveal>

          {/* Form waitlist Call-To-Action line */}
          <Reveal direction="up" delay={1500} className="w-full">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm sm:text-base font-semibold text-[#D8D8D8]">
                <span>📧</span>
                <span>
                  {lang === "es" ? (
                    <>
                      <span className="font-serif italic">Únete</span> a{" "}
                      <span className="text-[#29BE29]">la lista de espera</span> y se el{" "}
                      <span className="text-[#29BE29]">primero</span> en{" "}
                      <span className="text-[#29BE29]">tener acceso</span>
                    </>
                  ) : (
                    "Join the waitlist and be the first to get access"
                  )}
                </span>
              </div>

              {/* Scarcity / urgency line */}
              <p className="flex items-start gap-2 text-xs sm:text-sm text-[#29BE29]/90 font-medium max-w-md leading-snug">
                {t.hero.scarcity}
              </p>

              {/* Form Input Container */}
              <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md w-full">
                <div className="relative flex-1">
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    disabled={status === "sending" || status === "success"}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder={lang === "es" ? "tunombre@correo.com" : t.form.emailPlaceholder}
                    className="w-full px-4 py-3 bg-[#161616] border border-[#D8D8D8]/15 hover:border-[#D8D8D8]/25 focus:border-[#29BE29] focus:ring-1 focus:ring-[#29BE29] text-white rounded-lg placeholder-[#D8D8D8]/30 text-sm focus:outline-none transition-all"
                  />
                </div>

                {status !== "success" ? (
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="shine-btn px-6 py-3 bg-[#29BE29] hover:bg-[#32D932] text-black font-bold text-sm rounded-lg transition-all shadow-md shadow-[#29BE29]/10 disabled:opacity-50"
                  >
                    {status === "sending" ? t.msg.sending : t.form.submit}
                  </button>
                ) : null}
              </form>

              {/* Consent check (smaller, compact under the input field) */}
              {status !== "success" && (
                <div className="flex items-start space-x-2.5 max-w-md">
                  <input
                    id="consent-check"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (status === "error") setStatus("idle");
                    }}
                    className="mt-0.5 h-4.5 w-4.5 rounded border-white/10 text-[#29BE29] bg-[#161616] focus:ring-[#29BE29] accent-[#29BE29] cursor-pointer"
                  />
                  <label htmlFor="consent-check" className="text-xs text-muted leading-tight select-none cursor-pointer">
                    {t.form.consent}
                  </label>
                </div>
              )}

              {/* Status messages */}
              {status === "success" && (
                <div className="p-4 bg-[#29BE29]/10 border border-[#29BE29]/30 rounded-lg text-[#29BE29] text-center max-w-md animate-fade-in">
                  <Check className="w-5 h-5 mx-auto mb-1 bg-[#29BE29] text-black rounded-full p-0.5" />
                  <p className="font-bold text-sm">{statusMsg}</p>
                  {userRank && (
                    <p className="text-xs font-mono mt-1 text-white/80">
                      {lang === "en" ? "Your position:" : "Tu posición:"} <span className="text-[#29BE29] font-bold">#{userRank.toLocaleString()}</span>
                    </p>
                  )}
                </div>
              )}

              {status !== "success" && status !== "idle" && (
                <div className={`p-3 rounded-lg text-xs font-semibold flex items-center space-x-2 border max-w-md ${
                  status === "error" ? "bg-red-500/10 border-red-500/20 text-red-400" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{statusMsg}</span>
                </div>
              )}
            </div>
          </Reveal>


        </div>

        {/* Right Side: Overlapping Image Cards (Perfect Pixel Replica) */}
        <div className="lg:col-span-6 relative mt-12 lg:mt-0 flex justify-center items-center w-full min-h-[580px]">
          
          <Reveal direction="none" delay={600} className="w-full flex justify-center">
            
            <div className="cards-wrapper">
              
              {/* TARJETA TRASERA (Left, BEFORE) */}
              <div className="card card-back">
                <div className="card-header">
                  <div className="thumbnail-container">
                    {/* Foto de Beagle */}
                    <img 
                      src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&auto=format&fit=crop" 
                      alt="Perro Beagle" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="meta-info">
                    <h2 className={`filename ${activeField === "back" ? "typing-cursor" : ""}`}>
                      {backFilename}
                    </h2>
                    <ul className="meta-list">
                      <li>Julio 4, 2026</li>
                      <li>17 KB</li>
                      <li>999 × 800</li>
                    </ul>
                    <div className="actions">
                      <a href="#edit" className="action-link edit" onClick={(e) => e.preventDefault()}>Editar imagen</a>
                      <a href="#delete" className="action-link delete" onClick={(e) => e.preventDefault()}>Borrar</a>
                    </div>
                  </div>
                </div>
                <hr className="divider" />
                <div className="card-body">
                  <div className="details-form">
                    <div className="form-group">
                      <label>URL</label>
                      <input type="text" value="https://localhost/wordp" readOnly />
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" value="IGM_dgejg852.JPG" readOnly />
                    </div>
                    <div className="form-group">
                      <label>Caption</label>
                      <textarea rows={2} readOnly value="" />
                    </div>
                    <div className="form-group">
                      <label>Alt Text</label>
                      <input type="text" readOnly value="" />
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea rows={2} readOnly value="" />
                    </div>
                  </div>
                </div>
              </div>

              {/* TARJETA DELANTERA (Right, AFTER - with green glow) */}
              <div className="card card-front">
                <div className="card-header">
                  <div className="thumbnail-container">
                    <img 
                      src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&auto=format&fit=crop" 
                      alt="Perro Golden Retriever primer plano" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="meta-info">
                    <h2 className={`filename ${activeField === "filename" ? "typing-cursor" : ""}`}>
                      {frontState.filename}
                    </h2>
                    <ul className="meta-list">
                      <li className={activeField === "date" ? "typing-cursor" : ""}>{frontState.date}</li>
                      <li className={activeField === "size" ? "typing-cursor" : ""}>{frontState.size}</li>
                      <li className={activeField === "res" ? "typing-cursor" : ""}>{frontState.res}</li>
                    </ul>
                    <div 
                      className="actions" 
                      style={{ opacity: showFrontActions ? 1 : 0, transition: "opacity 0.5s ease" }}
                    >
                      <a href="#edit" className="action-link edit" onClick={(e) => e.preventDefault()}>Editar imagen</a>
                      <a href="#delete" className="action-link delete" onClick={(e) => e.preventDefault()}>Borrar</a>
                    </div>
                  </div>
                </div>
                <hr className="divider" />
                <div className="card-body">
                  <div className="details-form">
                    
                    <div className="form-group">
                      <label>URL</label>
                      <input 
                        type="text" 
                        readOnly 
                        className={`typing-input ${activeField === "url" ? "typing-cursor" : ""}`}
                        value={frontState.url}
                      />
                    </div>

                    <div className="form-group">
                      <label>Title</label>
                      <input 
                        type="text" 
                        readOnly
                        className={`typing-input ${activeField === "title" ? "typing-cursor" : ""}`}
                        value={frontState.title}
                      />
                    </div>

                    <div className="form-group">
                      <label>Caption</label>
                      <textarea 
                        readOnly
                        rows={2}
                        className={`typing-textarea ${activeField === "caption" ? "typing-cursor" : ""}`}
                        value={frontState.caption}
                      />
                    </div>

                    <div className="form-group">
                      <label>Alt Text</label>
                      <input 
                        type="text" 
                        readOnly
                        className={`typing-input ${activeField === "alt" ? "typing-cursor" : ""}`}
                        value={frontState.alt}
                      />
                    </div>

                    <div className="form-group">
                      <label>Description</label>
                      <textarea 
                        readOnly
                        rows={2}
                        className={`typing-textarea ${activeField === "description" ? "typing-cursor" : ""}`}
                        value={frontState.description}
                      />
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </Reveal>

        </div>

      </div>

      {/* Saber más / Learn more scroll indicator */}
      <Reveal direction="up" delay={2000} className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div 
          onClick={() => {
            const sections = document.querySelectorAll("section");
            if (sections.length > 1) {
              sections[1].scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
            }
          }}
          className="flex flex-col items-center space-y-1 cursor-pointer select-none group opacity-75 hover:opacity-100 transition-all duration-300"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#D8D8D8]/50 font-mono font-semibold group-hover:text-[#29BE29] transition-colors">
            {lang === "es" ? "Saber más" : "Learn more"}
          </span>
          <ChevronDown className="w-4 h-4 sm:w-5 h-5 text-[#29BE29] animate-bounce" />
        </div>
      </Reveal>
    </section>
  );
}
