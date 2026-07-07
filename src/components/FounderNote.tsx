import { TranslationItem } from "../data";
import { Reveal } from "./Reveal";
import BorderGlow from "./BorderGlow";

interface FounderNoteProps {
  t: TranslationItem;
}

/**
 * Founder note — builds trust for a brand-new, pre-launch product.
 * Tip: replace the signature in data.ts (founder.signature) with your real name.
 */
export function FounderNote({ t }: FounderNoteProps) {
  return (
    <section id="founder" className="py-20 md:py-28 relative z-20 bg-ink scroll-mt-20">
      <Reveal direction="none" delay={100} className="max-w-3xl mx-auto px-4 md:px-8">
        <BorderGlow
          glowColor="120 80 50"
          backgroundColor="#0C0C0E"
          borderRadius={20}
          glowRadius={60}
          glowIntensity={1.0}
          animated={false}
          colors={["#29BE29", "#1A8C1A", "#39E639"]}
          className="w-full"
        >
          <div className="p-8 md:p-12 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full inline-block">
              {t.founder.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
              {t.founder.title}
            </h2>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              {t.founder.body}
            </p>
            <p className="text-brand font-serif italic text-lg">
              {t.founder.signature}
            </p>
          </div>
        </BorderGlow>
      </Reveal>
    </section>
  );
}
