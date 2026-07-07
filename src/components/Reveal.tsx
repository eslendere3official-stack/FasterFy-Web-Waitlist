import { useEffect, useRef, useState, ReactNode, HTMLAttributes } from "react";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  delay?: number; // delay in milliseconds
  key?: any;
}

export function Reveal({ children, className = "", direction = "up", delay = 0, ...props }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsRevealed(true);
          // Once revealed, we don't need to observe anymore
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      { threshold: 0.08 }
    );

    const currentEl = containerRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, []);

  const baseDirectionClass =
    direction === "up" ? "reveal-init" :
    direction === "left" ? "reveal-left-init" :
    direction === "right" ? "reveal-right-init" : "";

  return (
    <div
      ref={containerRef}
      className={`${baseDirectionClass} ${isRevealed ? "reveal-active" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}
