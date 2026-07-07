import { TranslationItem } from "../data";
import { Reveal } from "./Reveal";
import { Zap, Bot, Files, PencilLine, Undo2, ShieldAlert } from "lucide-react";
import BorderGlow from "./BorderGlow";

interface FeaturesProps {
  t: TranslationItem;
}

export function Features({ t }: FeaturesProps) {
  // Map index to respective lucide icons
  const icons = [
    <Zap className="w-6 h-6 text-brand" />,
    <Bot className="w-6 h-6 text-brand" />,
    <Files className="w-6 h-6 text-brand" />,
    <PencilLine className="w-6 h-6 text-brand" />,
    <Undo2 className="w-6 h-6 text-brand" />,
    <ShieldAlert className="w-6 h-6 text-brand" />
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative z-20 bg-ink scroll-mt-20 shadow-2xl">
      
      {/* Visual background glow decor */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-brand/3 rounded-full blur-[120px] pointer-events-none -z-10" />

      <Reveal direction="none" delay={100} className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-4">
          <Reveal direction="up" delay={50}>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9CA3AF] bg-white/5 border border-white/10 px-3 py-1.5 rounded-full inline-block">
              {t.features.eyebrow}
            </span>
          </Reveal>
          
          <Reveal direction="up" delay={150}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              {t.features.title}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={250}>
            <p className="text-muted text-base sm:text-lg leading-relaxed">
              {t.features.sub}
            </p>
          </Reveal>
        </div>

        {/* Staggered Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.features.items.map((item, index) => (
            <Reveal
              key={index}
              direction="up"
              delay={index * 80} // Stagger delays automatically
              className="group"
            >
              <BorderGlow
                edgeSensitivity={30}
                glowColor="120 80 50"
                backgroundColor="#0C0C0E"
                borderRadius={16}
                glowRadius={50}
                glowIntensity={1.2}
                coneSpread={25}
                animated={false}
                colors={['#29BE29', '#1A8C1A', '#39E639']}
                className="h-full transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-brand/5"
              >
                <div
                  className="h-full p-6 md:p-8 flex flex-col justify-between cursor-default"
                  id={`feature-card-${index}`}
                >
                  <div className="space-y-4">
                    
                    {/* Icon container with hover scale & rotate */}
                    <div 
                      className="w-12 h-12 rounded-xl bg-brand-dim/60 border border-brand/10 flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      id={`feature-icon-${index}`}
                    >
                      {icons[index] || <span className="text-2xl">{item.icon}</span>}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg md:text-xl font-display font-bold text-white tracking-tight group-hover:text-brand transition-colors duration-200">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#D8D8D8]/80 leading-relaxed font-normal">
                      {item.desc}
                    </p>

                  </div>

                  {/* Micro edge line indicator */}
                  <div className="w-0 group-hover:w-full h-[2px] bg-brand/50 mt-6 transition-all duration-300 origin-left" />
                </div>
              </BorderGlow>
            </Reveal>
          ))}
        </div>

      </Reveal>
    </section>
  );
}
