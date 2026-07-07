import { TranslationItem } from "../data";
import { Reveal } from "./Reveal";
import { ImageIcon } from "lucide-react";

interface ScreenshotsProps {
  t: TranslationItem;
}

/**
 * Visual proof section.
 *
 * ⚠️ Placeholders on purpose. To use REAL plugin screenshots:
 *   1. Drop the images into /assets (e.g. /assets/screenshot-1.png).
 *   2. Replace the placeholder <div> below with, for example:
 *        <img
 *          src="/assets/screenshot-1.png"
 *          alt={caption}
 *          className="w-full aspect-[4/3] object-cover rounded-xl border border-white/10"
 *        />
 *   3. Keep one <img> per caption (order matches t.screenshots.captions).
 */
export function Screenshots({ t }: ScreenshotsProps) {
  return (
    <section id="screenshots" className="py-20 md:py-28 relative z-20 bg-ink scroll-mt-20">
      <Reveal direction="none" delay={100} className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20 space-y-4">
          <Reveal direction="up" delay={50}>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full inline-block">
              {t.screenshots.eyebrow}
            </span>
          </Reveal>
          <Reveal direction="up" delay={150}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {t.screenshots.title}
            </h2>
          </Reveal>
          <Reveal direction="up" delay={250}>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              {t.screenshots.sub}
            </p>
          </Reveal>
        </div>

        {/* Screenshot grid (placeholders — replace with real captures) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {t.screenshots.captions.map((caption, i) => (
            <Reveal key={i} direction="up" delay={i * 80} className="group">
              <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-white/15 bg-ink-card/60 flex flex-col items-center justify-center gap-3 text-center p-6 transition-colors duration-300 group-hover:border-brand/40">
                <ImageIcon className="w-8 h-8 text-brand/70" />
                <span className="text-xs text-muted font-medium">
                  {t.screenshots.placeholder}
                </span>
              </div>
              <p className="mt-3 text-sm text-[#D8D8D8]/80 text-center leading-snug">
                {caption}
              </p>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
