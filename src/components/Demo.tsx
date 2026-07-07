import React, { useState, useEffect } from "react";
import "./Demo.css";
import { Reveal } from "./Reveal";

interface CardData {
  title: string;
  subtitle: string;
  target: number;
  progress: number;
  icon: "doc" | "check" | "folder" | "text";
}

const CARDS_DATA: CardData[] = [
  { title: "ACTIVOS TOTALES", subtitle: "En la biblioteca de medios", target: 70, progress: 100, icon: "doc" },
  { title: "OPTIMIZADOS", subtitle: "31% del total", target: 22, progress: 31, icon: "check" },
  { title: "SIN OPTIMIZAR", subtitle: "Listos para procesar", target: 11, progress: 100, icon: "folder" },
  { title: "SIN TEXTO SEO", subtitle: "Pendientes de texto", target: 25, progress: 100, icon: "text" }
];

const ICONS = {
  doc: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </svg>
  ),
  text: (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-[2]">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  )
};

export function Demo() {
  const [cardNumbers, setCardNumbers] = useState<number[]>([0, 0, 0, 0]);
  const [cardWidths, setCardWidths] = useState<number[]>([0, 0, 0, 0]);
  const [processProgress, setProcessProgress] = useState<number>(0);
  const [processCounter, setProcessCounter] = useState<number>(0);
  const [status, setStatus] = useState<"PAUSADA" | "EN PROCESO">("EN PROCESO");
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isPro, setIsPro] = useState<boolean>(false);
  const [bannerDot, setBannerDot] = useState<number>(0);
  const [isBouncing, setIsBouncing] = useState<boolean[]>([false, false, false, false]);
  const [animationTrigger, setAnimationTrigger] = useState<number>(0);

  // Background loop for counters
  useEffect(() => {
    let active = true;

    async function animate() {
      if (!active) return;

      // Reset
      setCardNumbers([0, 0, 0, 0]);
      setCardWidths([0, 0, 0, 0]);
      setProcessProgress(0);
      setProcessCounter(0);
      setIsBouncing([false, false, false, false]);

      await new Promise((resolve) => setTimeout(resolve, 150));
      if (!active) return;

      const duration = 2000;
      const startTime = performance.now();

      const animateStep = (timestamp: number) => {
        if (!active) return;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setCardNumbers(CARDS_DATA.map((card) => Math.floor(progress * card.target)));
        setCardWidths(CARDS_DATA.map((card) => progress * card.progress));
        setProcessProgress(progress * 3.57);
        setProcessCounter(Math.floor(progress * 1));

        if (progress < 1) {
          requestAnimationFrame(animateStep);
        } else {
          setCardNumbers(CARDS_DATA.map((card) => card.target));
          setCardWidths(CARDS_DATA.map((card) => card.progress));
          setProcessProgress(3.57);
          setProcessCounter(1);
          setIsBouncing([true, true, true, true]);

          setTimeout(() => {
            if (active) setIsBouncing([false, false, false, false]);
          }, 600);

          setTimeout(() => {
            if (active) animate();
          }, 3500);
        }
      };

      requestAnimationFrame(animateStep);
    }

    animate();

    return () => {
      active = false;
    };
  }, [animationTrigger]);

  // Tab change cycle
  useEffect(() => {
    const tabInterval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 5);
    }, 3500);
    return () => clearInterval(tabInterval);
  }, []);

  // Banner dots cycle
  useEffect(() => {
    const dotInterval = setInterval(() => {
      setBannerDot((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(dotInterval);
  }, []);

  const handleManualOptimize = () => {
    setAnimationTrigger((prev) => prev + 1);
  };

  return (
    <section id="demo" className="demo-section sticky top-20 md:top-24 z-10 py-[12vh] px-4 sm:px-6 lg:px-8 shadow-inner">
      <div className="max-w-7xl mx-auto">
        
        {/* Interactive Dashboard Container */}
        <Reveal direction="up" delay={200}>
          <div className="demo-dashboard-frame">
            
            {/* SIDEBAR */}
            <aside className="demo-sidebar">
              <div className="demo-sidebar-logo">
                <div className="demo-logo-icon">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div>
                  FasterFy
                  <span className="demo-logo-sub">PRO MEDIA OPTIMIZER</span>
                </div>
              </div>

              <ul className="demo-nav-menu">
                <li 
                  className={activeTab === 0 ? "active" : ""} 
                  onClick={() => setActiveTab(0)}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm-11 11h7v7H3v-7zm11 0h7v7h-7v-7z" />
                  </svg> 
                  Resumen
                </li>
                <li 
                  className={activeTab === 1 ? "active" : ""} 
                  onClick={() => setActiveTab(1)}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M4 4h16v16H4V4z" />
                  </svg> 
                  Biblioteca
                </li>
                <li 
                  className={activeTab === 2 ? "active" : ""} 
                  onClick={() => setActiveTab(2)}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M3 3h18v18H3V3z" />
                  </svg> 
                  Rendimiento
                </li>
                <li 
                  className={activeTab === 3 ? "active" : ""} 
                  onClick={() => setActiveTab(3)}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2L2 22h20L12 2z" />
                  </svg> 
                  SEO &amp; Textos
                </li>
                <li 
                  className={activeTab === 4 ? "active" : ""} 
                  onClick={() => setActiveTab(4)}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.03-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                  </svg> 
                  Ajustes
                </li>
              </ul>

              <div className="demo-sidebar-bottom">
                <div 
                  className={`demo-toggle-plan ${isPro ? "active-pro" : ""}`} 
                  onClick={() => setIsPro(!isPro)}
                >
                  <div className="demo-toggle-slider"></div>
                  <div className={`demo-toggle-btn ${!isPro ? "active" : ""}`}>Lite</div>
                  <div className={`demo-toggle-btn ${isPro ? "active" : ""}`}>Pro</div>
                </div>
                <div className="demo-sidebar-note">Modo simple, todo en un clic.</div>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="demo-main-content">
              <header className="demo-header">
                <div className="demo-header-title">
                  <h2>Resumen</h2>
                  <p>Centro de operación, estado actual de tu biblioteca y acciones rápidas.</p>
                </div>
                <button className="demo-btn-optimize" onClick={handleManualOptimize}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                  Optimizar todo
                </button>
              </header>

              {/* Promo Banner */}
              <div className="demo-banner">
                <div className="demo-banner-left">
                  <div className="demo-banner-icon-big">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </div>
                  <div className="demo-banner-text">
                    <h3 className="font-semibold">
                      FasterFy <span className="text-[#9ca3af] font-normal">PRO MEDIA OPTIMIZER</span>
                    </h3>
                    <p className="font-bold text-white mt-0.5">⚡ Hasta 80% más livianas</p>
                    <p className="text-[#9ca3af] text-[11px] sm:text-xs mt-0.5">
                      Convierte a WebP/AVIF y comprime automáticamente, sin perder calidad visible.
                    </p>
                  </div>
                </div>
                <div className="demo-banner-dots">
                  <div className={`demo-dot ${bannerDot === 0 ? "active" : ""}`}></div>
                  <div className={`demo-dot ${bannerDot === 1 ? "active" : ""}`}></div>
                  <div className={`demo-dot ${bannerDot === 2 ? "active" : ""}`}></div>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="demo-cards-grid">
                {CARDS_DATA.map((card, idx) => (
                  <div key={idx} className={`demo-card demo-card-float-${idx + 1}`}>
                    <div className="demo-card-header">
                      <span>{card.title}</span>
                      <div className="demo-card-icon">{ICONS[card.icon]}</div>
                    </div>
                    <div className={`demo-card-number ${isBouncing[idx] ? "demo-number-bounce" : ""}`}>
                      {cardNumbers[idx]}
                    </div>
                    <div className="demo-card-subtitle">{card.subtitle}</div>
                    <div className="demo-progress-container">
                      <div 
                        className="demo-progress-bar" 
                        style={{ width: `${cardWidths[idx]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Section */}
              <div className="demo-status-section">
                <div className="demo-status-header">
                  <h3>Estado del procesamiento</h3>
                  <div 
                    className={`demo-badge-paused ${status === "EN PROCESO" ? "running" : ""}`}
                    onClick={() => setStatus(status === "PAUSADA" ? "EN PROCESO" : "PAUSADA")}
                  >
                    {status === "EN PROCESO" ? "▶ EN PROCESO" : "⏸ PAUSADA"}
                  </div>
                </div>
                <div className="demo-status-progress-container">
                  <div 
                    className="demo-status-progress-bar" 
                    style={{ width: `${processProgress}%` }}
                  ></div>
                </div>
                <div className="demo-status-stats">
                  <div>
                    <strong>{processCounter}</strong> <span>/ 28</span>
                    <br />
                    <span className="text-[10px] text-[#9ca3af]">Procesados</span>
                  </div>
                  <div>
                    <strong>1</strong>
                    <br />
                    <span className="text-[10px] text-[#9ca3af]">Con éxito</span>
                  </div>
                  <div>
                    <strong>0</strong>
                    <br />
                    <span className="text-[10px] text-[#9ca3af]">Omitidos</span>
                  </div>
                  <div>
                    <strong>0</strong>
                    <br />
                    <span className="text-[10px] text-[#9ca3af]">Errores</span>
                  </div>
                </div>
                <div className="demo-status-actions">
                  <button className="demo-btn-resume" onClick={() => setStatus("EN PROCESO")}>▶ Reanudar</button>
                  <button className="demo-btn-stop" onClick={() => setStatus("PAUSADA")}>✖ Detener</button>
                  <span className="demo-motor-info">Motor: wp_cron</span>
                </div>
              </div>

              {/* Bottom Quick Actions and Server Capabilities */}
              <div className="demo-bottom-grid">
                <div className="demo-bottom-card">
                  <h4>Acciones rápidas</h4>
                  <div className="demo-actions-grid">
                    <button className="demo-action-btn green">
                      <svg viewBox="0 0 24 24"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10" /></svg> 
                      Optimizar textos
                    </button>
                    <button className="demo-action-btn green">
                      <svg viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5m-1.414-9.414a2 2 0 1 1 2.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> 
                      Generar textos
                    </button>
                    <button className="demo-action-btn gray">
                      <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg> 
                      Ir a la biblioteca
                    </button>
                    <button className="demo-action-btn red">
                      <svg viewBox="0 0 24 24"><path d="M3 7v6a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6V7" /><path d="M3 7h18" /><path d="M9 11v6" /><path d="M15 11v6" /><path d="M12 3v4" /></svg> 
                      Revertir todo
                    </button>
                  </div>
                </div>
                <div className="demo-bottom-card">
                  <h4>Capacidades del servidor</h4>
                  <div className="demo-server-tags">
                    <div className="demo-server-tag">Imagick</div>
                    <div className="demo-server-tag">GD</div>
                    <div className="demo-server-tag">WebP</div>
                    <div className="demo-server-tag">AVIF</div>
                    <div className="demo-server-tag">Cuatificación PNG</div>
                    <div className="demo-server-tag inactive">Action Scheduler</div>
                  </div>
                  <div className="demo-server-footer-text">Motor de cola: wp_cron</div>
                </div>
              </div>

            </main>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
