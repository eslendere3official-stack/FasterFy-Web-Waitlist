import React, { useState, useEffect } from "react";
import { TranslationItem } from "../data";
import { Reveal } from "./Reveal";
import { ArrowUp, Heart, Mail, CheckCircle2 } from "lucide-react";

interface FooterProps {
  t: TranslationItem;
  onCtaClick: () => void;
  onSubmitSuccess?: () => void;
}

export function Footer({ t, onCtaClick, onSubmitSuccess }: FooterProps) {
  const isSpanish = t.nav.features === "Funciones";
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "throttled">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  // Sync state with localstorage to handle shared submissions
  useEffect(() => {
    const userEmail = localStorage.getItem("fasterfy_user_email");
    if (userEmail) {
      setEmail(userEmail);
      setConsent(true);
      setStatus("success");
    }
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

        localStorage.setItem("fasterfy_user_email", email);
        localStorage.setItem("fasterfy_last_submit_time", String(now));
        
        setStatus("success");
        setStatusMsg(t.msg.success);
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } catch (e) {
        setStatus("error");
        setStatusMsg(t.msg.error);
      }
    }, 1000);
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-12 z-20 bg-ink border-t border-white/5 pt-0 pb-8 overflow-hidden shadow-2xl">
      
      {/* Background glow circle */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-brand/3 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Fullscreen CTA Section */}
      <div className="w-full min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4 py-16 md:py-24 border-b border-white/5 relative">
        <Reveal direction="none" delay={100} className="w-full md:max-w-[80vw] max-w-[90vw] mx-auto">
          <div className="p-8 sm:p-12 md:p-16 lg:p-20 rounded-3xl bg-[#141414] border border-white/5 relative shadow-2xl overflow-hidden group w-full">
            
            {/* Background elements */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brand/3 rounded-full blur-3xl pointer-events-none" />

            <div className="relative space-y-10 max-w-3xl mx-auto flex flex-col items-center">
              
              {/* Heading styled exactly like the screenshot */}
              <Reveal direction="up" delay={150}>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight text-center">
                  {isSpanish ? (
                    <>
                      Optimiza tu <span className="text-[#29BE29] font-extrabold">SEO</span>,{" "}
                      <span className="text-[#29BE29] italic font-medium">ahorra tiempo</span>{" "}
                      y haz tu web <span className="text-[#29BE29] font-extrabold">rápida</span>.
                    </>
                  ) : (
                    <>
                      Optimize your <span className="text-[#29BE29] font-extrabold">SEO</span>,{" "}
                      <span className="text-[#29BE29] italic font-medium">save time</span>{" "}
                      and make your site <span className="text-[#29BE29] font-extrabold">fast</span>.
                    </>
                  )}
                </h2>
              </Reveal>

              {status === "success" ? (
                <Reveal direction="up" className="w-full flex flex-col items-center space-y-4 py-8">
                  <div className="w-16 h-16 bg-[#29BE29]/10 rounded-full flex items-center justify-center text-[#29BE29] border border-[#29BE29]/20">
                    <CheckCircle2 className="w-8 h-8 animate-pulse" />
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {t.msg.success}
                  </p>
                  <p className="text-xs text-muted/80">
                    {isSpanish ? "¡Te mantendremos informado del lanzamiento!" : "We'll keep you updated on the launch!"}
                  </p>
                </Reveal>
              ) : (
                <form onSubmit={handleFormSubmit} className="w-full max-w-xl space-y-6 flex flex-col items-center">
                  {/* Email Input with Icon */}
                  <Reveal direction="up" delay={200} className="w-full">
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-black/50" />
                      </div>
                      <input
                        id="footer-waitlist-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === "error") setStatus("idle");
                        }}
                        placeholder={t.form.emailPlaceholder}
                        disabled={status === "sending"}
                        className="w-full bg-white text-black pl-12 pr-4 py-4 rounded-xl text-base font-medium placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-[#29BE29] border-0 transition-all shadow-md"
                      />
                    </div>
                  </Reveal>

                  {/* Checkbox Consent */}
                  <Reveal direction="up" delay={250} className="w-full text-left">
                    <label className="flex items-start space-x-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={consent}
                        disabled={status === "sending"}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (status === "error") setStatus("idle");
                        }}
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent text-[#29BE29] focus:ring-[#29BE29] accent-[#29BE29]"
                      />
                      <span className="text-xs text-white/75 leading-relaxed">
                        {t.form.consent}
                      </span>
                    </label>
                  </Reveal>

                  {/* Feedback Message */}
                  {statusMsg && (
                    <Reveal direction="none" className="w-full text-center">
                      <p className={`text-xs font-semibold ${status === "error" || status === "throttled" ? "text-red-400" : "text-[#29BE29]"}`}>
                        {statusMsg}
                      </p>
                    </Reveal>
                  )}

                  {/* Submit Button */}
                  <Reveal direction="up" delay={300} className="w-full">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="w-full bg-[#29BE29] hover:bg-[#25ad25] active:scale-[0.995] text-black font-extrabold py-4 rounded-xl transition-all shadow-lg shadow-[#29BE29]/10 hover:shadow-[#29BE29]/20 disabled:opacity-50 flex items-center justify-center space-x-2 text-base cursor-pointer"
                    >
                      {status === "sending" ? (
                        <span>{t.msg.sending}</span>
                      ) : (
                        <span>{t.form.submit}</span>
                      )}
                    </button>
                  </Reveal>
                </form>
              )}

              {/* Founding Member Note Disclaimer */}
              <Reveal direction="up" delay={350}>
                <p className="text-xs text-white/50 max-w-xl text-center leading-relaxed pt-2">
                  {t.form.note}
                </p>
              </Reveal>

            </div>
          </div>
        </Reveal>
      </div>

      {/* Footer Nav & Brand Info */}
      <Reveal direction="none" delay={100} className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Primary Footer Nav & Brand Info */}
        <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
          
          {/* Logo & Brand statement */}
          <div className="text-center md:text-left space-y-2">
            <a href="#" className="text-2xl font-sans font-bold tracking-tight text-white group">
              Faster<span className="text-brand">Fy</span>
            </a>
            <p className="text-xs text-muted leading-relaxed max-w-xs">
              {t.footer.tag}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-muted">
            <a href="#features" className="hover:text-brand transition-colors">
              {t.nav.features}
            </a>
            <a href="#how-it-works" className="hover:text-brand transition-colors">
              {t.nav.how}
            </a>
            <a href="#faq" className="hover:text-brand transition-colors">
              {t.nav.faq}
            </a>
          </div>

          {/* Scroll-to-top button */}
          <button
            onClick={handleScrollTop}
            className="p-3 rounded-full border border-white/10 hover:border-brand/40 bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-all cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>

        </div>

        {/* Footer bottom metadata info */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-3xs text-muted/60 tracking-wider uppercase font-mono">
          <div>
            &copy; {new Date().getFullYear()} FasterFy. {t.footer.rights}
          </div>
          <div className="flex items-center space-x-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-brand fill-brand" />
            <span>for WordPress speed</span>
          </div>
        </div>

      </Reveal>
    </footer>
  );
}
