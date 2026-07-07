import { useState, useEffect } from "react";
import { Reveal } from "./Reveal";
import { TranslationItem } from "../data";
import BorderGlow from "./BorderGlow";
import { AnimatedCounter } from "./AnimatedCounter";
import { Check, Settings, LayoutGrid, BarChart2, MessageSquare, Shield, Info, ArrowRight, Sparkles } from "lucide-react";

interface HowItWorksProps {
  t: TranslationItem;
}

export function HowItWorks({ t }: HowItWorksProps) {
  const isSpanish = t.how.eyebrow === "Cómo funciona";

  // State for step 1: WordPress installation simulation
  const [installStatus, setInstallStatus] = useState<"idle" | "installing" | "active">("idle");

  const handleInstallClick = () => {
    if (installStatus !== "idle") return;
    setInstallStatus("installing");
    setTimeout(() => {
      setInstallStatus("active");
    }, 1800);
  };

  const handleResetInstall = () => {
    setInstallStatus("idle");
  };

  // State for step 2: Library scanning simulation
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0; // Loops back to 0
        }
        return prev + 1;
      });
    }, 80); // 80ms * 100 steps = 8000ms = 8 seconds loop
    return () => clearInterval(interval);
  }, []);

  const processedCount = Math.floor((progress / 100) * 280);

  const handleRestartScan = () => {
    setProgress(0);
  };

  return (
    <section id="how-it-works" className="py-24 bg-ink relative overflow-visible scroll-mt-20 z-20 shadow-2xl">
      
      {/* Background radial glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-brand/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-brand/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <Reveal direction="none" delay={100} className="max-w-[95%] w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <Reveal direction="up" delay={50}>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.25em] text-zinc-400 bg-zinc-800/40 px-4 py-1.5 rounded-full border border-zinc-800">
              ⚡ {isSpanish ? "Así funciona" : "How it works"}
            </span>
          </Reveal>
          
          <Reveal direction="up" delay={150}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {isSpanish ? (
                <>
                  Operativo en segundos,<br />
                  <span className="text-[#29BE29] font-serif italic font-normal">optimizado en minutos.</span>
                </>
              ) : (
                <>
                  Live in seconds,<br />
                  <span className="text-[#29BE29] font-serif italic font-normal">optimized in minutes.</span>
                </>
              )}
            </h2>
          </Reveal>
        </div>

        {/* 
          STACKED CARDS DECK LAYOUT 
          Cards use sticky positioning with top offsets and stack on top of each other as the user scrolls.
        */}
        <div className="relative mt-16 md:mt-24 space-y-16 lg:space-y-24 pb-12">
          
          {/* ================= CARD 1 ================= */}
          <Reveal 
            className="sticky top-24 md:top-28 z-10 w-full mb-12" 
            direction="up"
          >
            <div className="bg-[#131316] border border-white/10 rounded-3xl p-8 md:p-14 lg:p-16 shadow-2xl backdrop-blur-md flex flex-col lg:flex-row items-center gap-8 lg:gap-16 transition-transform duration-500 hover:scale-[1.005]">
              
              {/* Left explanation column */}
              <div className="w-full lg:w-[30%] space-y-6">
                <div className="space-y-4">
                  {/* Hexagonal step badge */}
                  <div 
                    className="w-14 h-14 bg-[#29BE29] text-black font-mono font-black text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(41,190,41,0.4)]"
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  >
                    1
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-[#29BE29]">
                    {isSpanish ? "Instala y conecta" : "Install & connect"}
                  </h3>
                </div>

                <p className="text-sm md:text-base text-[#D8D8D8]/80 leading-relaxed font-normal">
                  {isSpanish 
                    ? "Descarga y activa el plugin en WordPress. Sin herramientas de compilación ni servidores que administrar."
                    : "Download and activate the plugin on WordPress. No build tools, no servers to manage."}
                </p>
              </div>

              {/* Right graphical preview column (WordPress Mockup) */}
              <div className="w-full lg:w-[70%] flex justify-center">
                <div className="wp-plugin-window shadow-2xl relative select-none">
                  {/* Inline Scoped CSS Styles to avoid global namespace conflicts */}
                  <style>{`
                    .wp-plugin-window {
                      width: 100%;
                      height: 440px;
                      background: #f0f0f1;
                      display: flex;
                      flex-direction: column;
                      border: 1px solid #ccd0d4;
                      border-radius: 12px;
                      overflow: hidden;
                      position: relative;
                      color: #444;
                      font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                    }
                    .wp-main-content {
                      flex: 1;
                      display: flex;
                      flex-direction: column;
                      background: #f0f0f1;
                      height: 100%;
                      overflow: hidden;
                      width: 100%;
                    }
                    .wp-top-header {
                      background: #fff;
                      padding: 8px 16px;
                      border-bottom: 1px solid #ccd0d4;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      flex-shrink: 0;
                      height: 48px;
                    }
                    .wp-top-header .wp-left {
                      display: flex;
                      align-items: center;
                      gap: 12px;
                    }
                    .wp-top-header h1 {
                      font-size: 18px;
                      font-weight: 400;
                      color: #2c3338;
                      margin: 0;
                      line-height: 1.2;
                    }
                    .wp-btn-upload {
                      background: #fff;
                      border: 1px solid #ccd0d4;
                      border-radius: 3px;
                      padding: 2px 10px;
                      font-size: 11px;
                      color: #555;
                      cursor: pointer;
                      transition: all 0.15s;
                      height: 26px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    }
                    .wp-btn-upload:hover { 
                      background: #f7f7f7;
                    }
                    .wp-plugins-nav {
                      padding: 12px 16px 8px;
                      flex-shrink: 0;
                      border-bottom: 1px solid #e5e5e5;
                      background: #f0f0f1;
                    }
                    .wp-nav-tabs {
                      display: flex;
                      gap: 0px;
                      margin-bottom: 8px;
                      border-bottom: 1px solid #ccc;
                    }
                    .wp-nav-tabs a {
                      padding: 0 0 6px 0;
                      margin-right: 14px;
                      font-size: 12px;
                      font-weight: 400;
                      color: #2271b1;
                      text-decoration: none;
                      border-bottom: 3px solid transparent;
                      display: inline-block;
                      line-height: 1.4;
                    }
                    .wp-nav-tabs a.wp-active {
                      border-bottom-color: #000;
                      color: #2c3338;
                      font-weight: 600;
                    }
                    .wp-nav-description {
                      font-size: 11px;
                      color: #50575e;
                      line-height: 1.4;
                      margin-top: 2px;
                    }
                    .wp-nav-description a { color: #2271b1; text-decoration: none; }
                    .wp-plugins-list {
                      flex: 1;
                      overflow-y: auto;
                      padding: 12px;
                      display: grid;
                      grid-template-columns: 1fr;
                      gap: 12px;
                      align-content: start;
                      background: #f0f0f1;
                    }
                    @media (min-width: 640px) {
                      .wp-plugins-list {
                        grid-template-columns: 1fr 1fr;
                        padding: 16px;
                        gap: 16px;
                      }
                    }
                    .wp-plugins-list::-webkit-scrollbar { width: 6px; }
                    .wp-plugins-list::-webkit-scrollbar-track { background: #e5e7eb; }
                    .wp-plugins-list::-webkit-scrollbar-thumb { background: #9ca3af; border-radius: 3px; }
                    .wp-plugin-card {
                      box-sizing: border-box;
                      position: relative; 
                      min-height: 220px;
                      background: #FFFFFF;
                      border: 1px solid #CCD0D4;
                      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.04);
                      display: flex;
                      flex-direction: column;
                      overflow: hidden;
                    }
                    .wp-plugin-card .wp-card-body {
                      flex: 1;
                      display: flex;
                      padding: 12px;
                      gap: 12px;
                      align-items: flex-start;
                      overflow: hidden;
                    }
                    .wp-plugin-card .wp-logo-wrapper {
                      width: 64px;
                      height: 64px;
                      flex-shrink: 0;
                      background: #fff;
                      border: 1px solid #ccd0d4;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      overflow: hidden;
                    }
                    .wp-plugin-card .wp-logo-wrapper img {
                      width: 100%;
                      height: 100%;
                      object-fit: contain;
                      display: block;
                    }
                    .wp-plugin-card .wp-details {
                      flex: 1;
                      display: flex;
                      flex-direction: column;
                      gap: 2px;
                      min-width: 0;
                    }
                    .wp-plugin-card .wp-header-row {
                      display: flex;
                      justify-content: space-between;
                      align-items: flex-start;
                      gap: 4px;
                    }
                    .wp-plugin-card .wp-plugin-title {
                      font-size: 14px;
                      font-weight: 700;
                      color: #2271b1;
                      text-decoration: none;
                      line-height: 1.2;
                      padding-top: 1px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    .wp-plugin-card .wp-plugin-title:hover {
                      color: #135e96;
                    }
                    .wp-plugin-card .wp-actions {
                      display: flex;
                      flex-direction: column;
                      align-items: flex-end;
                      gap: 2px;
                      flex-shrink: 0;
                    }
                    .wp-plugin-card .wp-btn-install {
                      background: #f6f7f7;
                      border: 1px solid #2271b1;
                      border-radius: 3px;
                      padding: 3px 8px;
                      font-size: 11px;
                      color: #2271b1;
                      cursor: pointer;
                      height: 24px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      text-align: center;
                      transition: all 0.15s;
                      min-width: 70px;
                      font-weight: 500;
                    }
                    .wp-plugin-card .wp-btn-install:hover { 
                      background: #f0f6fa;
                      color: #0a4b78;
                      border-color: #0a4b78;
                    }
                    .wp-plugin-card .wp-more-details {
                      font-size: 10px;
                      color: #2271b1;
                      text-decoration: none;
                      margin-top: 1px;
                    }
                    .wp-plugin-card .wp-more-details:hover {
                      color: #135e96;
                    }
                    .wp-plugin-card .wp-desc {
                      font-size: 11px;
                      color: #4b5563;
                      line-height: 1.4;
                      flex: 1;
                      overflow: hidden;
                      display: -webkit-box;
                      -webkit-line-clamp: 3;
                      -webkit-box-orient: vertical;
                      margin-top: 2px;
                    }
                    .wp-plugin-card .wp-author {
                      font-size: 10px;
                      color: #6b7280;
                      font-style: italic;
                      margin-top: 2px;
                    }
                    .wp-plugin-card .wp-card-footer {
                      flex-shrink: 0;
                      background: #f7f7f7;
                      border-top: 1px solid #ccd0d4;
                      padding: 6px 10px;
                      display: flex;
                      flex-direction: column;
                      gap: 2px;
                      font-size: 10px;
                      color: #4b5563;
                    }
                    .wp-plugin-card .wp-card-footer .wp-footer-row {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      width: 100%;
                    }
                    .wp-plugin-card .wp-card-footer .wp-rating {
                      display: flex;
                      align-items: center;
                      gap: 2px;
                    }
                    .wp-plugin-card .wp-card-footer .wp-stars { color: #eab308; letter-spacing: 0.5px; }
                    .wp-plugin-card .wp-card-footer .wp-compat {
                      font-weight: 600;
                      color: #2c3338;
                    }
                    .wp-plugin-card .wp-card-footer .wp-compat span {
                      font-weight: 400;
                      color: #4b5563;
                    }
                    .wp-plugin-card.wp-featured {
                      border: 2px solid #29BE29;
                      animation: wp-glow-pulse 4s cubic-bezier(0.25, 0.8, 0.25, 1) infinite;
                      z-index: 2;
                    }
                    .wp-plugin-card.wp-featured .wp-badge {
                      position: absolute;
                      top: -2px;
                      left: -2px;
                      background: #29BE29;
                      color: #1a1a1a;
                      font-size: 9px;
                      font-weight: 700;
                      padding: 3px 8px;
                      border-bottom-right-radius: 6px;
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                      border: 1px solid #2ec62e;
                      z-index: 10;
                      box-shadow: 0 1px 3px rgba(0,0,0,0.15);
                    }
                    @keyframes wp-glow-pulse {
                      0% {
                        border-color: #29BE29;
                        box-shadow: 0 0 0 0 rgba(51, 238, 51, 0.4);
                        transform: scale(1);
                      }
                      50% {
                        border-color: #29BE29;
                        box-shadow: 0 0 30px 10px rgba(51, 238, 51, 0.25), inset 0 0 10px 4px rgba(51, 238, 51, 0.05);
                        transform: scale(1.008);
                      }
                      100% {
                        border-color: #29BE29;
                        box-shadow: 0 0 0 0 rgba(51, 238, 51, 0.4);
                        transform: scale(1);
                      }
                    }
                    .wp-plugin-card:not(.wp-featured) {
                      filter: grayscale(1) brightness(0.4);
                      position: relative;
                    }
                    .wp-plugin-card:not(.wp-featured)::after {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      bottom: 0;
                      background: rgba(0, 0, 0, 0.65);
                      z-index: 1;
                      pointer-events: none;
                    }
                  `}</style>

                  <main className="wp-main-content">
                    <header className="wp-top-header">
                      <div className="wp-left">
                        <h1 className="font-display font-medium">{isSpanish ? "Añadir plugins" : "Add Plugins"}</h1>
                        <button onClick={handleResetInstall} className="wp-btn-upload">
                          {isSpanish ? "Subir plugin" : "Upload Plugin"}
                        </button>
                      </div>
                    </header>

                    <div className="wp-plugins-nav">
                      <div className="wp-nav-tabs">
                        <a href="#" className="wp-active" onClick={(e) => e.preventDefault()}>{isSpanish ? "Destacados" : "Featured"}</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>{isSpanish ? "Populares" : "Popular"}</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>{isSpanish ? "Recomendados" : "Recommended"}</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>{isSpanish ? "Favoritos" : "Favorites"}</a>
                      </div>
                      <p className="wp-nav-description">
                        {isSpanish 
                          ? <>Los plugins extienden y expanden la funcionalidad de WordPress. Puedes instalar automáticamente plugins en formato .zip desde <a href="#" onClick={(e) => e.preventDefault()}>esta página</a>.</>
                          : <>Plugins extend and expand the functionality of WordPress. You may automatically install plugins in .zip format via <a href="#" onClick={(e) => e.preventDefault()}>this page</a>.</>}
                      </p>
                    </div>

                    <div className="wp-plugins-list">
                      {/* ⭐ PLUGIN DESTACADO: FASTERFY */}
                      <div className="wp-plugin-card wp-featured">
                        <div className="wp-badge">✨ {isSpanish ? "Destacado" : "Featured"}</div>
                        <div className="wp-card-body">
                          <div className="wp-logo-wrapper">
                            <img src="https://cdn.phototourl.com/free/2026-07-06-f43eb013-2a66-4a2d-aa79-1b5f21e56078.png" alt="FasterFY Logo" referrerPolicy="no-referrer" />
                          </div>
                          <div className="wp-details">
                            <div className="wp-header-row">
                              <a href="#" className="wp-plugin-title" onClick={(e) => e.preventDefault()}>FasterFY</a>
                              <div className="wp-actions">
                                <button
                                  onClick={handleInstallClick}
                                  className={`wp-btn-install transition duration-200 cursor-pointer ${
                                    installStatus === "idle"
                                      ? "bg-[#f6f7f7] hover:bg-[#f0f6fa] text-[#2271b1] border-[#2271b1]"
                                      : installStatus === "installing"
                                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-wait animate-pulse"
                                      : "bg-[#29BE29] text-black border-[#29BE29] font-bold shadow-[0_0_10px_rgba(41,190,41,0.4)]"
                                  }`}
                                >
                                  {installStatus === "idle" && (isSpanish ? "Instalar ahora" : "Install Now")}
                                  {installStatus === "installing" && (isSpanish ? "Instalando..." : "Installing...")}
                                  {installStatus === "active" && (isSpanish ? "¡Activo! ⚡" : "Active! ⚡")}
                                </button>
                                <a href="#" className="wp-more-details" onClick={(e) => e.preventDefault()}>
                                  {isSpanish ? "Más detalles" : "More Details"}
                                </a>
                              </div>
                            </div>
                            <div className="wp-desc">
                              {isSpanish 
                                ? "Escanea tu biblioteca y convierte, comprime y redacta el alt text de forma automática."
                                : "Scan your library and automatically convert, compress, and write SEO alt text."}
                            </div>
                            <div className="wp-author">By <em>FasterFY</em></div>
                          </div>
                        </div>
                        <div className="wp-card-footer">
                          <div className="wp-footer-row">
                            <span>200,000+ {isSpanish ? "Instalaciones activas" : "Active Installs"}</span>
                            <span>{isSpanish ? "Última actualización: hace 1 semana" : "Last Updated: 1 week ago"}</span>
                          </div>
                          <div className="wp-footer-row">
                            <div className="wp-rating">
                              <span className="wp-stars">★★★★★</span> (149)
                            </div>
                            <span className="wp-compat">✔ {isSpanish ? "Compatible con tu versión de WordPress" : "Compatible with your version of WordPress"}</span>
                          </div>
                        </div>
                      </div>

                      {/* PLUGIN 2: Akismet (CENSURADO) */}
                      <div className="wp-plugin-card">
                        <div className="wp-card-body">
                          <div className="wp-logo-wrapper" style={{ background: "#1a1a1a", color: "white", fontWeight: 700, fontSize: "11px", textAlign: "center" }}>AKISMET</div>
                          <div className="wp-details">
                            <div className="wp-header-row">
                              <a href="#" className="wp-plugin-title" onClick={(e) => e.preventDefault()}>Akismet</a>
                              <div className="wp-actions">
                                <button className="wp-btn-install" disabled>{isSpanish ? "Instalar" : "Install Now"}</button>
                                <a href="#" className="wp-more-details" onClick={(e) => e.preventDefault()}>{isSpanish ? "Más detalles" : "More Details"}</a>
                              </div>
                            </div>
                            <div className="wp-desc">Akismet checks your comments against the Akismet Web service to see if they look like spam or not.</div>
                            <div className="wp-author">By <em>Automattic</em></div>
                          </div>
                        </div>
                        <div className="wp-card-footer">
                          <div className="wp-footer-row">
                            <span>10+ Million Active Installs</span>
                            <span>Last Updated: 2 days ago</span>
                          </div>
                          <div className="wp-footer-row">
                            <div className="wp-rating"><span className="wp-stars">★★★★★</span> (5,234)</div>
                            <span className="wp-compat">✔ Compatible with your version of WordPress</span>
                          </div>
                        </div>
                      </div>

                      {/* PLUGIN 3: Jetpack (CENSURADO) */}
                      <div className="wp-plugin-card">
                        <div className="wp-card-body">
                          <div className="wp-logo-wrapper" style={{ background: "#1a1a1a", color: "white", fontWeight: 700, fontSize: "11px", textAlign: "center" }}>JETPACK</div>
                          <div className="wp-details">
                            <div className="wp-header-row">
                              <a href="#" className="wp-plugin-title" onClick={(e) => e.preventDefault()}>Jetpack by WordPress.com</a>
                              <div className="wp-actions">
                                <button className="wp-btn-install" disabled>{isSpanish ? "Instalar" : "Install Now"}</button>
                                <a href="#" className="wp-more-details" onClick={(e) => e.preventDefault()}>{isSpanish ? "Más detalles" : "More Details"}</a>
                              </div>
                            </div>
                            <div className="wp-desc">Your WordPress, Streamlined.</div>
                            <div className="wp-author">By <em>Automattic</em></div>
                          </div>
                        </div>
                        <div className="wp-card-footer">
                          <div className="wp-footer-row">
                            <span>5+ Million Active Installs</span>
                            <span>Last Updated: 3 days ago</span>
                          </div>
                          <div className="wp-footer-row">
                            <div className="wp-rating"><span className="wp-stars">★★★★★</span> (12,108)</div>
                            <span className="wp-compat">✔ Compatible with your version of WordPress</span>
                          </div>
                        </div>
                      </div>

                      {/* PLUGIN 4: WP Super Cache (CENSURADO) */}
                      <div className="wp-plugin-card">
                        <div className="wp-card-body">
                          <div className="wp-logo-wrapper" style={{ background: "#1a1a1a", color: "white", fontWeight: 700, fontSize: "10px", textAlign: "center", lineHeight: "1.2" }}>WP<br/>Super<br/>Cache</div>
                          <div className="wp-details">
                            <div className="wp-header-row">
                              <a href="#" className="wp-plugin-title" onClick={(e) => e.preventDefault()}>WP Super Cache</a>
                              <div className="wp-actions">
                                <button className="wp-btn-install" disabled>{isSpanish ? "Instalar" : "Install Now"}</button>
                                <a href="#" className="wp-more-details" onClick={(e) => e.preventDefault()}>{isSpanish ? "Más detalles" : "More Details"}</a>
                              </div>
                            </div>
                            <div className="wp-desc">A very fast caching engine for WordPress that produces static html files.</div>
                            <div className="wp-author">By <em>Automattic</em></div>
                          </div>
                        </div>
                        <div className="wp-card-footer">
                          <div className="wp-footer-row">
                            <span>2+ Million Active Installs</span>
                            <span>Last Updated: 2 weeks ago</span>
                          </div>
                          <div className="wp-footer-row">
                            <div className="wp-rating"><span className="wp-stars">★★★★★</span> (3,782)</div>
                            <span className="wp-compat">✔ Compatible with your version of WordPress</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </main>
                </div>
              </div>

            </div>
          </Reveal>

          {/* ================= CARD 2 ================= */}
          <Reveal 
            className="sticky top-28 md:top-32 z-20 w-full mb-12" 
            direction="up"
          >
            <div className="bg-[#131316] border border-white/10 rounded-3xl p-8 md:p-14 lg:p-16 shadow-2xl backdrop-blur-md flex flex-col lg:flex-row items-center gap-8 lg:gap-16 transition-transform duration-500 hover:scale-[1.005]">
              
              {/* Left explanation column */}
              <div className="w-full lg:w-[30%] space-y-6">
                <div className="space-y-4">
                  {/* Hexagonal step badge */}
                  <div 
                    className="w-14 h-14 bg-[#29BE29] text-black font-mono font-black text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(41,190,41,0.4)]"
                    style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                  >
                    2
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-[#29BE29]">
                    {isSpanish ? "Escanea tu biblioteca" : "Scan your library"}
                  </h3>
                </div>

                <p className="text-sm md:text-base text-[#D8D8D8]/80 leading-relaxed font-normal">
                  {isSpanish 
                    ? "FasterFy encuentra cada imagen y muestra exactamente qué se puede optimizar de forma retroactiva."
                    : "FasterFy discovers every image inside your library and catalogs exactly what can be optimized retroactively."}
                </p>
              </div>

              {/* Right graphical preview column (FasterFY Dashboard Mockup) */}
              <div className="w-full lg:w-[70%] flex justify-center">
                <div className="ff-lib-window shadow-2xl relative select-none">
                  {/* Inline Scoped CSS Styles to avoid global namespace conflicts */}
                  <style>{`
                    .ff-lib-window {
                      width: 100%;
                      max-width: 100%;
                      height: 440px;
                      background: #18181b;
                      display: flex;
                      flex-direction: row;
                      border-radius: 12px;
                      overflow: hidden;
                      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
                      position: relative;
                      border: 1px solid #27272a;
                      color: #ffffff;
                      font-family: 'Inter', sans-serif;
                    }

                    /* ─── SIDEBAR (Menú Lateral) ─── */
                    .ff-lib-sidebar {
                      width: 128px;
                      height: 100%;
                      background: #151515;
                      display: flex;
                      flex-direction: column;
                      flex-shrink: 0;
                      padding: 16px 8px;
                      border-right: 1px solid #27272a;
                    }

                    .ff-lib-sidebar .ff-lib-logo-wrapper {
                      display: flex;
                      align-items: center;
                      margin-bottom: 20px;
                      padding-left: 6px;
                    }

                    .ff-lib-sidebar .ff-lib-logo-wrapper img {
                      height: 28px;
                      width: auto;
                      object-fit: contain;
                    }

                    .ff-lib-sidebar .ff-lib-nav-items {
                      display: flex;
                      flex-direction: column;
                      gap: 4px;
                      flex: 1;
                    }

                    .ff-lib-sidebar .ff-lib-menu-item {
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      padding: 6px 10px;
                      border-radius: 6px;
                      color: #A1A1AA;
                      font-weight: 500;
                      font-size: 11px;
                      cursor: default;
                      text-decoration: none;
                      height: 32px;
                      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    }

                    .ff-lib-sidebar .ff-lib-menu-item svg {
                      width: 14px;
                      height: 14px;
                      flex-shrink: 0;
                      stroke: #A1A1AA;
                      fill: none;
                      stroke-width: 1.7;
                      stroke-linecap: round;
                      stroke-linejoin: round;
                      transition: stroke 0.3s ease;
                    }

                    .ff-lib-sidebar .ff-lib-menu-item.active {
                      background: rgba(34, 197, 94, 0.1);
                      color: #29BE29;
                      border-right: 3px solid #29BE29;
                      border-radius: 6px 0 0 6px;
                      margin-right: -8px; 
                      padding-right: 7px;
                    }

                    .ff-lib-sidebar .ff-lib-menu-item.active svg {
                      stroke: #29BE29;
                    }

                    .ff-lib-sidebar .ff-lib-menu-item:not(.active):hover {
                      transform: translateX(2px);
                      background: rgba(255, 255, 255, 0.05);
                      color: #ffffff;
                    }
                    .ff-lib-sidebar .ff-lib-menu-item:not(.active):hover svg {
                      stroke: #ffffff;
                    }

                    /* ─── MAIN CONTENT ─── */
                    .ff-lib-main-content {
                      flex: 1;
                      height: 100%;
                      background: #18181B;
                      display: flex;
                      flex-direction: column;
                      padding: 16px;
                      overflow: hidden;
                      justify-content: space-between;
                    }

                    .ff-lib-main-content .ff-lib-header {
                      display: flex;
                      flex-direction: column;
                      gap: 2px;
                      margin-bottom: 8px;
                    }

                    .ff-lib-main-content .ff-lib-header h1 {
                      font-weight: 700;
                      font-size: 16px;
                      color: #FFFFFF;
                      margin: 0;
                      letter-spacing: -0.2px;
                    }

                    .ff-lib-main-content .ff-lib-header p {
                      font-weight: 400;
                      font-size: 10px;
                      color: #71717A;
                      margin: 0;
                    }

                    /* ─── ACCIONES MASIVAS ─── */
                    .ff-lib-actions-panel {
                      background: rgba(24, 24, 27, 0.5);
                      border: 1px solid #27272A;
                      border-radius: 8px;
                      padding: 10px 12px;
                      display: flex;
                      flex-direction: column;
                      gap: 6px;
                      transition: border-color 0.3s ease;
                    }

                    .ff-lib-actions-panel:hover {
                      border-color: #3F3F46;
                    }

                    .ff-lib-actions-panel .ff-lib-ap-header {
                      display: flex;
                      align-items: center;
                      gap: 6px;
                    }

                    .ff-lib-actions-panel .ff-lib-ap-title {
                      font-weight: 600;
                      font-size: 11px;
                      color: #E5E7EB;
                    }

                    .ff-lib-actions-panel .ff-lib-ap-badge {
                      background: #3F3F46;
                      padding: 1px 6px;
                      border-radius: 3px;
                      font-size: 8px;
                      font-weight: 700;
                      color: #D4D4D8;
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                    }

                    .ff-lib-actions-panel .ff-lib-ap-desc {
                      font-weight: 400;
                      font-size: 9px;
                      line-height: 1.35;
                      color: #A1A1AA;
                    }

                    .ff-lib-actions-panel .ff-lib-ap-buttons {
                      display: flex;
                      gap: 8px;
                      margin-top: 2px;
                    }

                    .ff-lib-btn-primary {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 4px;
                      padding: 6px 10px;
                      background: #29BE29;
                      border: none;
                      border-radius: 6px;
                      font-weight: 700;
                      font-size: 10px;
                      color: #000000;
                      cursor: pointer;
                      transition: all 0.3s ease;
                      animation: ff-lib-subtle-pulse 3s infinite ease-in-out;
                    }
                    
                    @keyframes ff-lib-subtle-pulse {
                      0% { box-shadow: 0 0 0 0 rgba(41, 190, 41, 0.2); }
                      50% { box-shadow: 0 0 10px 3px rgba(41, 190, 41, 0.1); }
                      100% { box-shadow: 0 0 0 0 rgba(41, 190, 41, 0.2); }
                    }

                    .ff-lib-btn-primary:hover {
                      transform: scale(1.02);
                      background: #29BE29;
                      box-shadow: 0 0 12px rgba(41, 190, 41, 0.4);
                    }

                    .ff-lib-btn-secondary {
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 4px;
                      padding: 6px 10px;
                      background: transparent;
                      border: 1px solid #3F3F46;
                      border-radius: 6px;
                      font-weight: 700;
                      font-size: 10px;
                      color: #A1A1AA;
                      cursor: pointer;
                      transition: all 0.3s ease;
                    }
                    .ff-lib-btn-secondary:hover {
                      background: rgba(255, 255, 255, 0.05);
                      border-color: #71717A;
                      color: #ffffff;
                      transform: translateY(-1px);
                    }

                    .ff-lib-btn-primary svg, .ff-lib-btn-secondary svg {
                      width: 12px;
                      height: 12px;
                    }

                    /* ─── PROGRESO ─── */
                    .ff-lib-progress-panel {
                      margin-top: 8px;
                      background: rgba(0, 0, 0, 0.4);
                      border: 1px solid #27272A;
                      border-radius: 8px;
                      padding: 10px 12px;
                      display: flex;
                      flex-direction: column;
                      gap: 8px;
                    }

                    .ff-lib-progress-panel .ff-lib-pp-header {
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                    }

                    .ff-lib-progress-panel .ff-lib-pp-title {
                      font-weight: 700;
                      font-size: 8px;
                      letter-spacing: 0.5px;
                      text-transform: uppercase;
                      color: #D4D4D8;
                    }

                    .ff-lib-progress-panel .ff-lib-pp-status {
                      display: flex;
                      align-items: center;
                      gap: 4px;
                      padding: 1px 6px;
                      background: rgba(245, 158, 11, 0.15);
                      border: 1px solid rgba(245, 158, 11, 0.2);
                      border-radius: 12px;
                    }

                    .ff-lib-progress-panel .ff-lib-pp-status .ff-lib-dot {
                      width: 4px;
                      height: 4px;
                      background: #F59E0B;
                      border-radius: 50%;
                      animation: ff-lib-dot-pulse 1.5s infinite;
                    }

                    @keyframes ff-lib-dot-pulse {
                      0% { opacity: 0.4; transform: scale(0.8); }
                      50% { opacity: 1; transform: scale(1.2); }
                      100% { opacity: 0.4; transform: scale(0.8); }
                    }

                    .ff-lib-progress-panel .ff-lib-pp-status .ff-lib-status-text {
                      font-weight: 700;
                      font-size: 8px;
                      color: #F59E0B;
                    }

                    .ff-lib-progress-panel .ff-lib-pp-bar {
                      width: 100%;
                      height: 4px;
                      background: #27272A;
                      border-radius: 12px;
                      overflow: hidden;
                    }

                    .ff-lib-progress-panel .ff-lib-pp-bar .ff-lib-fill {
                      height: 100%;
                      background: linear-gradient(90deg, #29BE29 0%, #145e14 100%);
                      border-radius: 12px;
                    }

                    .ff-lib-progress-panel .ff-lib-pp-stats {
                      display: flex;
                      align-items: flex-end;
                      gap: 16px;
                      padding-top: 2px;
                    }

                    .ff-lib-progress-panel .ff-lib-stat-item {
                      display: flex;
                      flex-direction: column;
                      gap: 1px;
                    }

                    .ff-lib-progress-panel .ff-lib-stat-item .ff-lib-num {
                      font-weight: 700;
                      font-size: 11px;
                      color: #E5E7EB;
                      line-height: 1;
                      transition: color 0.3s ease;
                    }
                    
                    .ff-lib-progress-panel .ff-lib-stat-item:hover .ff-lib-num {
                      color: #FFFFFF;
                    }

                    .ff-lib-progress-panel .ff-lib-stat-item .ff-lib-num.dim {
                      color: #52525b;
                    }

                    .ff-lib-progress-panel .ff-lib-stat-item .ff-lib-label {
                      font-weight: 700;
                      font-size: 7px;
                      text-transform: uppercase;
                      color: #71717A;
                      letter-spacing: 0.4px;
                    }
                  `}</style>

                  <aside className="ff-lib-sidebar">
                    <div className="ff-lib-logo-wrapper">
                      <img src="https://cdn.phototourl.com/free/2026-07-06-d8b1a901-2dae-4734-ac9c-43475ddcc3d1.png" alt="FasterFY Logo" referrerPolicy="no-referrer" />
                    </div>

                    <nav className="ff-lib-nav-items">
                      <span className="ff-lib-menu-item">
                        <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        {isSpanish ? "Resumen" : "Overview"}
                      </span>
                      <span className="ff-lib-menu-item active">
                        <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/><line x1="8" y1="2" x2="8" y2="22"/><line x1="16" y1="2" x2="16" y2="22"/></svg>
                        {isSpanish ? "Biblioteca" : "Library"}
                      </span>
                      <span className="ff-lib-menu-item">
                        <svg viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
                        {isSpanish ? "Rendimiento" : "Performance"}
                      </span>
                      <span className="ff-lib-menu-item">
                        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                        {isSpanish ? "SEO & Textos" : "SEO & Texts"}
                      </span>
                      <span className="ff-lib-menu-item">
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                        {isSpanish ? "Ajustes" : "Settings"}
                      </span>
                    </nav>
                  </aside>

                  <main className="ff-lib-main-content">
                    <header className="ff-lib-header">
                      <h1>{isSpanish ? "Biblioteca" : "Library"}</h1>
                      <p>{isSpanish ? "Optimización retroactiva y mutación nativa de medios." : "Retroactive media optimization and format conversion."}</p>
                    </header>

                    <div className="ff-lib-actions-panel">
                      <div className="ff-lib-ap-header">
                        <span className="ff-lib-ap-title">{isSpanish ? "Acciones masivas" : "Bulk Actions"}</span>
                        <span className="ff-lib-ap-badge">LITE</span>
                      </div>
                      <div className="ff-lib-ap-desc">
                        {isSpanish 
                          ? "Modo simple: un clic optimiza toda tu biblioteca y genera los textos SEO. El proceso continúa en segundo plano."
                          : "Simple mode: one click optimizes your entire library and generates SEO texts. The process runs in the background."}
                      </div>
                      <div className="ff-lib-ap-buttons">
                        <button className="ff-lib-btn-primary">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>
                          {isSpanish ? "Optimizar todo + textos" : "Optimize all + text"}
                        </button>
                        <button className="ff-lib-btn-secondary">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                          {isSpanish ? "Revertir todo" : "Rollback all"}
                        </button>
                      </div>
                    </div>

                    <div className="ff-lib-progress-panel">
                      <div className="ff-lib-pp-header">
                        <span className="ff-lib-pp-title">{isSpanish ? "PROGRESO (OPTIMIZACIÓN + TEXTOS)" : "PROGRESS (OPTIMIZATION + ALT TEXT)"}</span>
                        <div className="ff-lib-pp-status">
                          <div className="ff-lib-dot"></div>
                          <span className="ff-lib-status-text">{isSpanish ? "EN PROCESO" : "PROCESSING"}</span>
                        </div>
                      </div>
                      <div className="ff-lib-pp-bar">
                        <div className="ff-lib-fill" style={{ width: `${progress}%` }}></div>
                      </div>
                      <div className="ff-lib-pp-stats">
                        <div className="ff-lib-stat-item">
                          <span className="ff-lib-num">{processedCount} / 280</span>
                          <span className="ff-lib-label">{isSpanish ? "PROCESADOS" : "PROCESSED"}</span>
                        </div>
                        <div className="ff-lib-stat-item">
                          <span className="ff-lib-num">{processedCount}</span>
                          <span className="ff-lib-label">{isSpanish ? "CON ÉXITO" : "SUCCESS"}</span>
                        </div>
                        <div className="ff-lib-stat-item">
                          <span className="ff-lib-num dim">0</span>
                          <span className="ff-lib-label">{isSpanish ? "OMITIDOS" : "SKIPPED"}</span>
                        </div>
                        <div className="ff-lib-stat-item">
                          <span className="ff-lib-num dim">0</span>
                          <span className="ff-lib-label">{isSpanish ? "ERRORES" : "ERRORS"}</span>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>

            </div>
          </Reveal>

          {/* ================= CARD 3 ================= */}
          <Reveal 
            className="sticky top-0 z-30 w-screen h-screen -mx-[calc((100vw-100%)/2)] !mt-0 !mb-0" 
            direction="up"
          >
            <div className="bg-[#E5E7EB] border-t border-b border-black/10 w-full h-full p-6 sm:p-10 md:p-14 lg:p-16 shadow-2xl backdrop-blur-md flex flex-col items-center justify-center gap-6 text-black overflow-y-auto">
              
              {/* Centered Top Explanation */}
              <div className="text-center max-w-2xl space-y-4">
                {/* Hexagonal Step Badge with Dark Background */}
                <div 
                  className="w-14 h-14 bg-[#18181B] text-[#29BE29] font-mono font-black text-2xl flex items-center justify-center mx-auto shadow-md"
                  style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
                >
                  3
                </div>
                
                <h3 className="text-2xl md:text-3xl font-display font-black tracking-tight text-zinc-900">
                  {isSpanish ? "Optimiza en masa" : "Optimize in bulk"}
                </h3>

                <p className="text-sm md:text-base text-zinc-600 leading-relaxed max-w-lg mx-auto font-normal">
                  {isSpanish 
                    ? "Ejecuta un lote y mira cómo baja el peso, tu web carga mas veloz y sube la cobertura SEO."
                    : "Run a single batch and watch your total asset weight drop, load speeds spike, and SEO score climb."}
                </p>
              </div>

              {/* 4 Beautiful statistics cards with BorderGlow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-6">
                
                {/* CARD 1: Espacio Ahorrado */}
                <BorderGlow 
                  glowColor="130 80 50" 
                  backgroundColor="#18181B" 
                  colors={["#29BE29", "#32D932", "#1a8c1a"]} 
                  borderRadius={14} 
                  glowRadius={40} 
                  glowIntensity={1.0}
                  animated={true}
                  className="text-white relative"
                >
                  <div className="p-5 flex flex-col justify-between h-[160px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-semibold text-zinc-400 tracking-wide">
                        {isSpanish ? "Espacio ahorrado" : "Space Saved"}
                      </span>
                      <span className="w-5 h-5 bg-[#29BE29]/15 rounded-md flex items-center justify-center border border-[#29BE29]/20">
                        <Check className="w-3 h-3 text-[#29BE29] stroke-[3]" />
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className="text-3xl md:text-4xl font-bold font-display text-[#29BE29] tracking-tight">
                        <AnimatedCounter end={240} duration={2000} suffix=" MB" />
                      </div>
                      <p className="text-[11px] text-zinc-400 font-medium mt-1">
                        {isSpanish ? "Total acumulado" : "Total accumulated"}
                      </p>
                    </div>

                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-[#29BE29] rounded-full animate-[shimmer_1.5s_infinite]" style={{ width: "100%" }} />
                    </div>
                  </div>
                </BorderGlow>

                {/* CARD 2: Optimizados */}
                <BorderGlow 
                  glowColor="130 80 50" 
                  backgroundColor="#18181B" 
                  colors={["#29BE29", "#32D932", "#1a8c1a"]} 
                  borderRadius={14} 
                  glowRadius={40} 
                  glowIntensity={1.0}
                  animated={true}
                  className="text-white relative"
                >
                  <div className="p-5 flex flex-col justify-between h-[160px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-semibold text-zinc-400 tracking-wide">
                        {isSpanish ? "Optimizados" : "Optimized Items"}
                      </span>
                      <span className="w-5 h-5 bg-[#29BE29]/15 rounded-md flex items-center justify-center border border-[#29BE29]/20">
                        <Check className="w-3 h-3 text-[#29BE29] stroke-[3]" />
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className="text-3xl md:text-4xl font-bold font-display text-[#29BE29] tracking-tight">
                        <AnimatedCounter end={280} duration={2200} />
                      </div>
                      <p className="text-[11px] text-zinc-400 font-medium mt-1">
                        {isSpanish ? "100% de la biblioteca" : "100% of the library"}
                      </p>
                    </div>

                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-[#29BE29] rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </BorderGlow>

                {/* CARD 3: Carga Salvada */}
                <BorderGlow 
                  glowColor="130 80 50" 
                  backgroundColor="#18181B" 
                  colors={["#29BE29", "#32D932", "#1a8c1a"]} 
                  borderRadius={14} 
                  glowRadius={40} 
                  glowIntensity={1.0}
                  animated={true}
                  className="text-white relative"
                >
                  <div className="p-5 flex flex-col justify-between h-[160px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] font-semibold text-zinc-400 tracking-wide">
                        {isSpanish ? "Carga salvada" : "Load Time Saved"}
                      </span>
                      <span className="w-5 h-5 bg-[#29BE29]/15 rounded-md flex items-center justify-center border border-[#29BE29]/20">
                        <Check className="w-3 h-3 text-[#29BE29] stroke-[3]" />
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className="text-3xl md:text-4xl font-bold font-display text-[#29BE29] tracking-tight">
                        <AnimatedCounter end={885.5} duration={2500} suffix=" s" />
                      </div>
                      <p className="text-[11px] text-zinc-400 font-medium mt-1">
                        {isSpanish ? "Conexión móvil ± 1.5 Mbps" : "Mobile connection ± 1.5 Mbps"}
                      </p>
                    </div>

                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-[#29BE29] rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </BorderGlow>

                {/* CARD 4: Ahorro Medio por Img */}
                <BorderGlow 
                  glowColor="130 80 50" 
                  backgroundColor="#18181B" 
                  colors={["#29BE29", "#32D932", "#1a8c1a"]} 
                  borderRadius={14} 
                  glowRadius={40} 
                  glowIntensity={1.0}
                  animated={true}
                  className="text-white relative"
                >
                  <div className="p-5 flex flex-col justify-between h-[160px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-semibold text-zinc-400 tracking-wide">
                        {isSpanish ? "Ahorro medio / Img" : "Avg Saving / Img"}
                      </span>
                      <span className="w-5 h-5 bg-[#29BE29]/15 rounded-md flex items-center justify-center border border-[#29BE29]/20">
                        <Check className="w-3 h-3 text-[#29BE29] stroke-[3]" />
                      </span>
                    </div>

                    <div className="mt-2">
                      <div className="text-3xl md:text-4xl font-bold font-display text-[#29BE29] tracking-tight">
                        <AnimatedCounter end={1.6} duration={1800} suffix=" Mb" />
                      </div>
                      <p className="text-[11px] text-zinc-400 font-medium mt-1">
                        {isSpanish ? "Por activo optimizado" : "Per optimized asset"}
                      </p>
                    </div>

                    <div className="w-full h-1 bg-zinc-800 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-[#29BE29] rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </BorderGlow>

              </div>

            </div>
          </Reveal>

        </div>

      </Reveal>
    </section>
  );
}
