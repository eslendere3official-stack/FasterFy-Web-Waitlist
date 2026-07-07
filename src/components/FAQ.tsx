import { useState, useEffect, useRef } from "react";
import { TranslationItem } from "../data";
import { Reveal } from "./Reveal";
import { Plus } from "lucide-react";

interface FAQProps {
  t: TranslationItem;
}

const mockupHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FasterFY Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    <style>
        /* ── Reset y Base ── */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            font-family: 'Inter', sans-serif;
        }

        /* ═══════════════════════════════════════════════
           📦 VENTANA PRINCIPAL (720px x 400px)
           ═══════════════════════════════════════════════ */
        .dashboard-container {
            width: 720px;
            height: 400px;
            background: #141414;
            border-radius: 16px;
            padding: 10px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: 82px 1fr 85px;
            gap: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            position: relative;
        }

        /* Áreas del Bento Grid */
        .logo-area { grid-column: 1 / 3; grid-row: 1; }
        .card-1   { grid-column: 3; grid-row: 1; }
        .card-2   { grid-column: 4; grid-row: 1; }
        .donut-area { grid-column: 1 / 3; grid-row: 2; }
        .card-3   { grid-column: 3; grid-row: 2; }
        .card-4   { grid-column: 4; grid-row: 2; }
        .progress-area { grid-column: 1 / 5; grid-row: 3; }


        /* ─── ESTILOS DE LAS CAJAS ─── */
        .box-container {
            background: #18181B;
            border: 1px solid #27272A;
            border-radius: 10px;
            padding: 12px 14px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            overflow: hidden;
        }

        /* ═══════════════════════════════════════════════
           🌟 ANIMACIÓN BORDE LUMINOSO (BORDERGLOW)
           ═══════════════════════════════════════════════ */
        .glow-card {
            --edge-proximity: 0;
            --cursor-angle: 45deg;
            --edge-sensitivity: 25;
            --color-sensitivity: calc(var(--edge-sensitivity) + 20);
            --border-radius: 10px;
            --glow-padding: 30px;
            --cone-spread: 25;
            isolation: isolate;
            transform: translate3d(0, 0, 0.01px);
            z-index: 0;
        }

        .glow-card::before,
        .glow-card::after,
        .glow-card > .edge-light {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            transition: opacity 0.25s ease-out;
            z-index: -1;
        }

        /* Apagado automático */
        .glow-card:not(:hover):not(.sweep-active)::before,
        .glow-card:not(:hover):not(.sweep-active)::after,
        .glow-card:not(:hover):not(.sweep-active) > .edge-light {
            opacity: 0;
            transition: opacity 0.75s ease-in-out;
        }

        /* Capas del borde */
        .glow-card::before {
            border: 1px solid transparent;
            background:
                linear-gradient(var(--card-bg, #18181B) 0 100%) padding-box,
                linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box,
                var(--gradient-one) border-box,
                var(--gradient-two) border-box,
                var(--gradient-three) border-box,
                var(--gradient-four) border-box,
                var(--gradient-five) border-box,
                var(--gradient-six) border-box,
                var(--gradient-seven) border-box,
                var(--gradient-base) border-box;
            
            opacity: calc((var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));
            mask-image: conic-gradient(from var(--cursor-angle) at center,
                black calc(var(--cone-spread) * 1%),
                transparent calc((var(--cone-spread) + 15) * 1%),
                transparent calc((100 - var(--cone-spread) - 15) * 1%),
                black calc((100 - var(--cone-spread)) * 1%)
            );
        }

        .glow-card::after {
            border: 1px solid transparent;
            background:
                var(--gradient-one) padding-box,
                var(--gradient-two) padding-box,
                var(--gradient-three) padding-box,
                var(--gradient-four) padding-box,
                var(--gradient-five) padding-box,
                var(--gradient-six) padding-box,
                var(--gradient-seven) padding-box,
                var(--gradient-base) padding-box;
            mask-image:
                linear-gradient(to bottom, black, black),
                radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%),
                radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%),
                radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%),
                radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%),
                radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%),
                conic-gradient(from var(--cursor-angle) at center, transparent 5%, black 15%, black 85%, transparent 95%);
            mask-composite: subtract, add, add, add, add, add;
            opacity: calc(0.5 * (var(--edge-proximity) - var(--color-sensitivity)) / (100 - var(--color-sensitivity)));
            mix-blend-mode: soft-light;
        }

        .glow-card > .edge-light {
            inset: calc(var(--glow-padding) * -1);
            pointer-events: none;
            z-index: 1;
            mask-image: conic-gradient(from var(--cursor-angle) at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%);
            opacity: calc((var(--edge-proximity) - var(--edge-sensitivity)) / (100 - var(--edge-sensitivity)));
            mix-blend-mode: plus-lighter;
        }

        .glow-card > .edge-light::before {
            content: "";
            position: absolute;
            inset: var(--glow-padding);
            border-radius: inherit;
            box-shadow:
                inset 0 0 0 1px var(--glow-color, hsl(130deg 80% 50% / 100%)),
                inset 0 0 1px 0 var(--glow-color-60, hsl(130deg 80% 50% / 60%)),
                inset 0 0 3px 0 var(--glow-color-50, hsl(130deg 80% 50% / 50%)),
                inset 0 0 6px 0 var(--glow-color-40, hsl(130deg 80% 50% / 40%)),
                inset 0 0 15px 0 var(--glow-color-30, hsl(130deg 80% 50% / 30%)),
                inset 0 0 25px 2px var(--glow-color-20, hsl(130deg 80% 50% / 20%)),
                inset 0 0 50px 2px var(--glow-color-10, hsl(130deg 80% 50% / 10%)),
                0 0 1px 0 var(--glow-color-60, hsl(130deg 80% 50% / 60%)),
                0 0 3px 0 var(--glow-color-50, hsl(130deg 80% 50% / 50%)),
                0 0 6px 0 var(--glow-color-40, hsl(130deg 80% 50% / 40%)),
                0 0 15px 0 var(--glow-color-30, hsl(130deg 80% 50% / 30%)),
                0 0 25px 2px var(--glow-color-20, hsl(130deg 80% 50% / 20%)),
                0 0 50px 2px var(--glow-color-10, hsl(130deg 80% 50% / 10%));
        }


        /* ─── CONTENIDO DE LAS TARJETAS ─── */
        .inner-content {
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 1;
            height: 100%;
            justify-content: space-between;
        }

        .card-header-sm {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .card-title-sm {
            font-size: 11px;
            font-weight: 400;
            color: #A1A1AA;
            min-height: 16px;
        }
        .status-icon-sm {
            width: 16px; height: 16px;
            background: #2A2A2A;
            border-radius: 4px;
            display: flex; justify-content: center; align-items: center;
        }
        .status-icon-sm svg { width: 8px; height: 8px; stroke: #A1A1AA; stroke-width: 2.5; fill: none; }
        .card-val-sm {
            font-size: 28px; font-weight: 700; color: #33ED33; line-height: 1; margin: 4px 0 2px;
        }
        .card-val-sm.dim { color: #52525B; }
        .card-sub-sm { font-size: 10px; color: #71717A; margin-bottom: 6px; }
        
        .progress-track-sm {
            width: 100%; height: 3px; background: #27272A; border-radius: 4px; overflow: hidden; margin-top: auto;
        }
        .progress-fill-sm {
            height: 100%; width: 0%; background: #33ED33; border-radius: 4px;
            /* ⏱️ BARRA MÁS LENTA (4s de duración) */
            animation: fillBar 4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }
        .glow-card:nth-child(1) .progress-fill-sm { animation-delay: 0.8s; }
        .glow-card:nth-child(2) .progress-fill-sm { animation-delay: 0.9s; }
        .glow-card:nth-child(3) .progress-fill-sm { animation-delay: 1.0s; }
        .glow-card:nth-child(4) .progress-fill-sm { animation-delay: 1.1s; }
        @keyframes fillBar { to { width: 100%; } }


        /* ─── LOGO ─── */
        .logo-card-inner {
            display: flex; align-items: center; justify-content: center; height: 100%;
        }
        .logo-card-inner img { height: 36px; width: auto; }


        /* ─── GRÁFICO DONUT ─── */
        .donut-wrapper {
            display: flex; align-items: center; justify-content: center; gap: 20px; height: 100%;
        }
        .donut-svg { width: 90px; height: 90px; flex-shrink: 0; }
        .donut-text-group { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #FFFFFF; }
        .donut-text-group .row { display: flex; gap: 6px; }
        .donut-text-group .row span { color: #A1A1AA; }
        .donut-text-group .row .val { color: #33ED33; }


        /* ─── BARRA DE PROGRESO INFERIOR ─── */
        .progress-panel {
            background: #18181B; border: 1px solid #27272A; border-radius: 10px; padding: 8px 14px;
            display: flex; flex-direction: column; justify-content: space-between; height: 100%;
            gap: 4px;
        }
        .panel-header { display: flex; justify-content: space-between; align-items: center; }
        .panel-title { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #D4D4D8; letter-spacing: 0.5px; }
        
        /* ✅ ESTADO "EN PROCESO" EN VERDE */
        .panel-status { 
            display: flex; align-items: center; gap: 4px; 
            background: rgba(51, 237, 51, 0.15); 
            border: 1px solid rgba(51, 237, 51, 0.2); 
            border-radius: 12px; padding: 2px 8px; 
        }
        .panel-status .dot { 
            width: 5px; height: 5px; background: #33ED33; border-radius: 50%; 
            animation: dot-pulse 1.5s infinite; 
        }
        .panel-status .stat-txt { 
            font-size: 9px; font-weight: 700; color: #33ED33; 
        }
        @keyframes dot-pulse { 0% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } 100% { opacity: 0.4; transform: scale(0.8); } }

        .panel-progress-track { width: 100%; height: 5px; background: #27272A; border-radius: 4px; overflow: hidden; margin: 4px 0; }
        .panel-progress-fill { height: 100%; width: 0%; background: #33ED33; border-radius: 4px; /* ⏱️ BARRA MÁS LENTA (10s de duración en bucle) */ animation: bottom-progress-loop 10s linear infinite; }
        @keyframes bottom-progress-loop { 0% { width: 0%; } 100% { width: 100%; } }

        .panel-stats-row { display: flex; justify-content: space-between; align-items: flex-end; padding-top: 2px; }
        .p-stat { display: flex; flex-direction: column; gap: 2px; }
        .p-stat .num { font-size: 15px; font-weight: 700; color: #E5E7EB; line-height: 1; }
        .p-stat .num.dim { color: #52525B; }
        .p-stat .lbl { font-size: 8px; font-weight: 700; text-transform: uppercase; color: #71717A; }

        .panel-controls { display: flex; gap: 8px; align-items: center; }
        .pc-btn { display: flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 6px; border: none; font-size: 11px; font-weight: 700; cursor: pointer; transition: 0.2s; height: 26px; }
        .pc-btn.resume { background: #33ED33; color: #000000; }
        .pc-btn.resume:hover { filter: brightness(1.1); }
        .pc-btn.stop { background: #27272A; color: #A1A1AA; border: 1px solid #3F3F46; }
        .pc-btn.stop:hover { background: #3F3F46; }

        @media (max-width: 750px) {
            .dashboard-container { width: 100%; height: auto; grid-template-columns: 1fr; grid-template-rows: auto; gap: 12px; padding: 12px; border-radius: 0; overflow-y: auto; }
            .logo-area, .card-1, .card-2, .donut-area, .card-3, .card-4, .progress-area { grid-column: 1 !important; grid-row: auto !important; }
        }
    </style>
</head>
<body>

    <div class="dashboard-container">

        <!-- ═══ LOGO (Esquina Izquierda - Sin texto) ═══ -->
        <div class="logo-area box-container">
            <div class="logo-card-inner">
                <img src="https://cdn.phototourl.com/free/2026-07-06-41798744-2e8a-4b0a-9846-db04f60a8a30.png" alt="FasterFY Logo" />
            </div>
        </div>

        <!-- ═══ TARJETA 1 (Activos Totales) ═══ -->
        <div class="card-1 box-container glow-card" data-index="0">
            <span class="edge-light"></span>
            <div class="inner-content">
                <div class="card-header-sm">
                    <div class="card-title-sm" data-title="Activos Totales"></div>
                    <div class="status-icon-sm"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                </div>
                <div class="card-val-sm" id="cnt-1">0</div>
                <div class="card-sub-sm">En la biblioteca de medios</div>
                <div class="progress-track-sm"><div class="progress-fill-sm"></div></div>
            </div>
        </div>

        <!-- ═══ TARJETA 2 (Optimizados) ═══ -->
        <div class="card-2 box-container glow-card" data-index="1">
            <span class="edge-light"></span>
            <div class="inner-content">
                <div class="card-header-sm">
                    <div class="card-title-sm" data-title="Optimizados"></div>
                    <div class="status-icon-sm"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                </div>
                <div class="card-val-sm" id="cnt-2">0</div>
                <div class="card-sub-sm">100% del total</div>
                <div class="progress-track-sm"><div class="progress-fill-sm"></div></div>
            </div>
        </div>

        <!-- ═══ DONUT / ESTADÍSTICAS (Centro Izquierdo) ═══ -->
        <div class="donut-area box-container">
            <div class="donut-wrapper">
                <div class="donut-svg">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#27272A" stroke-width="12" />
                        <circle id="donut-progress" cx="50" cy="50" r="40" fill="none" stroke="#33ED33" stroke-width="12" stroke-linecap="round" stroke-dasharray="251.3" stroke-dashoffset="251.3" />
                        <text x="50" y="45" text-anchor="middle" fill="#FFFFFF" font-size="24" font-weight="700">91%</text>
                        <text x="50" y="65" text-anchor="middle" fill="#A1A1AA" font-size="10">Optimizado</text>
                    </svg>
                </div>
                <div class="donut-text-group">
                    <div class="row"><span>Optimizadas:</span> <span class="val" id="donut-opt">0</span></div>
                    <div class="row"><span>Pendientes:</span> <span id="donut-pend">0</span></div>
                    <div class="row"><span>Total:</span> <span id="donut-total">0</span></div>
                </div>
            </div>
        </div>

        <!-- ═══ TARJETA 3 (Sin optimizar) ═══ -->
        <div class="card-3 box-container glow-card" data-index="2">
            <span class="edge-light"></span>
            <div class="inner-content">
                <div class="card-header-sm">
                    <div class="card-title-sm" data-title="Sin optimizar"></div>
                    <div class="status-icon-sm"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                </div>
                <div class="card-val-sm dim" id="cnt-3">0</div>
                <div class="card-sub-sm">Listos para procesar</div>
                <div class="progress-track-sm"><div class="progress-fill-sm"></div></div>
            </div>
        </div>

        <!-- ═══ TARJETA 4 (Con texto SEO) ═══ -->
        <div class="card-4 box-container glow-card" data-index="3">
            <span class="edge-light"></span>
            <div class="inner-content">
                <div class="card-header-sm">
                    <div class="card-title-sm" data-title="Con texto SEO"></div>
                    <div class="status-icon-sm"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                </div>
                <div class="card-val-sm" id="cnt-4">0</div>
                <div class="card-sub-sm">Con texto aplicado</div>
                <div class="progress-track-sm"><div class="progress-fill-sm"></div></div>
            </div>
        </div>

        <!-- ═══ BARRA DE PROGRESO INFERIOR (Full Width) ═══ -->
        <div class="progress-area">
            <div class="progress-panel">
                <div class="panel-header">
                    <span class="panel-title">PROGRESO (OPTIMIZACIÓN + TEXTOS)</span>
                    <!-- ✅ ETIQUETA CAMBIADA A "EN PROCESO" EN VERDE -->
                    <div class="panel-status">
                        <div class="dot"></div>
                        <span class="stat-txt">EN PROCESO</span>
                    </div>
                </div>
                <div class="panel-progress-track"><div class="panel-progress-fill"></div></div>
                <div class="panel-stats-row">
                    <div class="p-stat">
                        <div class="num"><span id="cnt-bottom-1">0</span> / <span id="cnt-bottom-total">0</span></div>
                        <span class="lbl">PROCESADOS</span>
                    </div>
                    <div class="p-stat">
                        <div class="num" id="cnt-bottom-2">0</div>
                        <span class="lbl">CON ÉXITO</span>
                    </div>
                    <div class="p-stat">
                        <div class="num" id="cnt-bottom-3">0</div>
                        <span class="lbl">OMITIDOS</span>
                    </div>
                    <div class="p-stat">
                        <div class="num" id="cnt-bottom-4">0</div>
                        <span class="lbl">ERRORES</span>
                    </div>
                    <div class="panel-controls">
                        <button class="pc-btn resume">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            Reanudar
                        </button>
                        <button class="pc-btn stop">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            Detener
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- 1. Efecto de Tipeo (Velocidad normal) ---
            const titleEls = document.querySelectorAll('.card-title-sm');
            titleEls.forEach((el, i) => {
                const text = el.getAttribute('data-title');
                let charIndex = 0;
                setTimeout(() => {
                    const interval = setInterval(() => {
                        if (charIndex < text.length) {
                            el.textContent += text.charAt(charIndex);
                            charIndex++;
                        } else { clearInterval(interval); }
                    }, 40);
                }, i * 300);
            });

            // --- 2. Contadores Animados MUCHO MÁS LENTOS ---
            const counters = [
                { id: 'cnt-1', target: 352, duration: 4000, delay: 600 },
                { id: 'cnt-2', target: 352, duration: 4000, delay: 700 },
                { id: 'cnt-3', target: 0, duration: 1500, delay: 800 },
                { id: 'cnt-4', target: 352, duration: 4000, delay: 900 },
                { id: 'cnt-bottom-1', target: 1, duration: 2500, delay: 500 },
                { id: 'cnt-bottom-2', target: 1, duration: 2500, delay: 600 },
                { id: 'donut-opt', target: 255, duration: 4000, delay: 500 },
                { id: 'donut-pend', target: 15, duration: 2500, delay: 600 },
                { id: 'donut-total', target: 270, duration: 4000, delay: 700 },
                { id: 'cnt-bottom-3', target: 0, duration: 1500, delay: 700 },
                { id: 'cnt-bottom-4', target: 0, duration: 1500, delay: 800 },
                { id: 'cnt-bottom-total', target: 28, duration: 2500, delay: 900 }
            ];

            function animateCounter(el, target, dur) {
                const start = performance.now(); const init = 0;
                function frame(now) {
                    let p = Math.min((now - start) / dur, 1);
                    const ease = 1 - Math.pow(1 - p, 3);
                    const val = init + (target - init) * ease;
                    el.textContent = target % 1 === 0 ? Math.floor(val) : val.toFixed(1);
                    if (p < 1) requestAnimationFrame(frame);
                    else el.textContent = target;
                } requestAnimationFrame(frame);
            }
            counters.forEach(c => {
                const el = document.getElementById(c.id);
                if (!el) return;
                setTimeout(() => animateCounter(el, c.target, c.duration), c.delay);
            });

            // --- 3. Animación del Gráfico Donut (Más lenta) ---
            const donut = document.getElementById('donut-progress');
            if (donut) {
                setTimeout(() => {
                    const circumference = 251.3;
                    const targetOffset = circumference - (circumference * 0.91);
                    let startTime = null;
                    function animateDonut(timestamp) {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / 2500, 1); // Ralentizado a 2.5s
                        const ease = 1 - Math.pow(1 - progress, 3);
                        const currentOffset = circumference - (circumference - targetOffset) * ease;
                        donut.style.strokeDashoffset = currentOffset;
                        if (progress < 1) requestAnimationFrame(animateDonut);
                        else donut.style.strokeDashoffset = targetOffset;
                    } requestAnimationFrame(animateDonut);
                }, 500);
            }


            // ═══════════════════════════════════════════════
            // 🚀 BORDERGLOW - Barrido + Apagado + Hover
            // ═══════════════════════════════════════════════
            
            const cards = document.querySelectorAll('.glow-card');
            const colors = ['#33ED33', '#22c55e', '#15803d'];

            cards.forEach(card => {
                // Configurar Gradientes y Colores
                const glowColorStr = '130 80 50';
                const h = parseHSL(glowColorStr);
                const base = h.h + 'deg ' + h.s + '% ' + h.l + '%';
                const opacities = [100, 60, 50, 40, 30, 20, 10];
                const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
                for (let i = 0; i < opacities.length; i++) {
                    card.style.setProperty('--glow-color' + keys[i], 'hsl(' + base + ' / ' + Math.min(opacities[i] * 1.0, 100) + '%)');
                }

                const GP = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
                const GK = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
                const CM = [0, 1, 2, 0, 1, 2, 1];
                for (let i = 0; i < 7; i++) {
                    const c = colors[Math.min(CM[i], colors.length - 1)];
                    card.style.setProperty(GK[i], 'radial-gradient(at ' + GP[i] + ', ' + c + ' 0px, transparent 50%)');
                }
                card.style.setProperty('--gradient-base', 'linear-gradient(' + colors[0] + ' 0 100%)');

                // Interacción del mouse
                card.addEventListener('pointermove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                    const cx = rect.width / 2; const cy = rect.height / 2;
                    const dx = x - cx; const dy = y - cy;
                    
                    let kx = Infinity, ky = Infinity;
                    if (dx !== 0) kx = cx / Math.abs(dx);
                    if (dy !== 0) ky = cy / Math.abs(dy);
                    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

                    let degrees = 0;
                    if (dx !== 0 || dy !== 0) {
                        degrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
                        if (degrees < 0) degrees += 360;
                    }
                    card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
                    card.style.setProperty('--cursor-angle', degrees.toFixed(3) + 'deg');
                });
            });

            // Animación de barrido inicial con apagado automático
            function startSweep(card, delay) {
                setTimeout(() => {
                    const angleStart = 110; const angleEnd = 465;
                    const sweepDuration = 5000;
                    let startTime = null;
                    function sweep(timestamp) {
                        if (startTime === null) startTime = timestamp;
                        const elapsed = timestamp - startTime;
                        let p = Math.min(elapsed / sweepDuration, 1);
                        card.classList.add('sweep-active');
                        card.style.setProperty('--edge-proximity', '100');
                        const angle = angleStart + (angleEnd - angleStart) * p;
                        card.style.setProperty('--cursor-angle', angle + 'deg');
                        if (p < 1) { requestAnimationFrame(sweep); } 
                        else {
                            setTimeout(() => {
                                card.classList.remove('sweep-active');
                                card.style.setProperty('--edge-proximity', '0');
                            }, 2000);
                        }
                    } requestAnimationFrame(sweep);
                }, delay);
            }

            cards.forEach((card, i) => startSweep(card, i * 700));

            function parseHSL(hslStr) {
                const match = hslStr.match(/([\\d.]+)\\s*([\\d.]+)%?\\s*([\\d.]+)%?/);
                if (!match) return { h: 130, s: 80, l: 50 };
                return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
            }
        });
    </script>
</body>
</html>`;

const InteractiveMockup = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const newScale = Math.min(width / 720, 1);
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    
    const timer = setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex items-center justify-center bg-[#121212] rounded-2xl border border-white/5 shadow-2xl overflow-hidden relative"
      style={{ height: `${400 * scale}px` }}
    >
      <iframe
        srcDoc={mockupHtml}
        style={{
          width: "720px",
          height: "400px",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="border-0 absolute pointer-events-auto"
        title="FasterFY Interactive Dashboard"
        scrolling="no"
      />
    </div>
  );
};

export function FAQ({ t }: FAQProps) {
  // State to track the currently expanded index (null means all collapsed)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const isSpanishLang = t.faq.eyebrow === "Preguntas" || t.faq.eyebrow === "Preguntas, respondidas" || true;

  return (
    <section id="faq" className="py-24 md:py-32 relative z-20 bg-ink scroll-mt-20 shadow-2xl overflow-hidden">
      
      {/* Background glow node */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/3 rounded-full blur-[120px] pointer-events-none -z-10" />

      <Reveal direction="none" delay={100} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Redesigned Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <Reveal direction="up" delay={50}>
            <span className="text-sm font-sans font-medium tracking-wide text-[#29BE29] border border-[#29BE29]/20 bg-[#29BE29]/5 px-5 py-2 rounded-full inline-block mb-6 shadow-sm">
              FAQs
            </span>
          </Reveal>
          
          <Reveal direction="up" delay={150}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tight leading-tight mb-6">
              {isSpanishLang ? (
                <>
                  Vamos a resolver <span className="text-[#32D932] italic font-normal">tus dudas</span>
                </>
              ) : (
                <>
                  We are here to resolve <span className="text-[#32D932] italic font-normal">your questions</span>
                </>
              )}
            </h2>
          </Reveal>
          
          <Reveal direction="up" delay={200}>
            <p className="text-sm md:text-base text-muted max-w-xl mx-auto font-normal leading-relaxed">
              {isSpanishLang 
                ? "Todo lo que necesitas saber sobre FasterFy para optimizar el rendimiento, automatizar descripciones de imagen y acelerar el SEO de tu sitio WordPress." 
                : "Everything you need to know about FasterFy to optimize performance, automate image descriptions, and accelerate your WordPress site's SEO."}
            </p>
          </Reveal>
        </div>

        {/* Split Grid Layout with FAQs on the Left and SaaS Mockup on the Right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Accordion List (FAQs) - 40% Width (2/5) */}
          <div className="lg:col-span-2 space-y-4">
            {t.faq.items.map((item, index) => {
              const isOpen = openIndex === index;
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <Reveal
                  key={index}
                  direction="up"
                  delay={index * 50}
                  className="w-full"
                >
                  <div
                    className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                      isOpen 
                        ? "bg-[#141414] border-[#29BE29]/40 shadow-lg shadow-[#29BE29]/2" 
                        : "bg-[#101010] border-white/5 hover:border-white/10"
                    }`}
                    id={`faq-item-${index}`}
                  >
                    {/* Accordion Trigger/Button Header */}
                    <button
                      onClick={() => toggleIndex(index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                      className="w-full px-6 py-5 md:py-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                    >
                      <div className="flex items-start space-x-4">
                        <span className={`font-mono text-xs font-bold mt-1 transition-colors ${isOpen ? "text-[#29BE29]" : "text-white/30"}`}>
                          {formattedIndex}
                        </span>
                        <span className="text-base md:text-lg font-display font-semibold text-white group-hover:text-[#29BE29] transition-colors duration-200 leading-snug">
                          {item.question}
                        </span>
                      </div>
                      
                      {/* Expand/Collapse rotatable indicator */}
                      <div 
                        className={`w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-muted group-hover:text-[#29BE29] group-hover:border-[#29BE29]/40 transition-all duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-45 border-[#29BE29]/50 text-[#29BE29] bg-[#29BE29]/10" : ""
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Accordion Content Panel */}
                    <div
                      id={`faq-answer-${index}`}
                      aria-labelledby={`faq-item-${index}`}
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[500px] border-t border-white/5" : "max-h-0"
                      }`}
                    >
                      <div className="px-6 py-5 pl-12 text-sm md:text-base text-muted font-normal leading-relaxed">
                        {item.answer}
                      </div>
                    </div>

                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Right Column: Redesigned interactive SaaS Mockup Window - 60% Width (3/5) */}
          <div className="lg:col-span-3 lg:sticky lg:top-28 w-full">
            <InteractiveMockup />
          </div>

        </div>

      </Reveal>
    </section>
  );
}
