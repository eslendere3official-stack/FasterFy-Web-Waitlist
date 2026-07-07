import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  end: string | number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ end, duration = 1200, prefix = "", suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Extract numbers if string, e.g. "1.248" or "12.4"
  const cleanString = typeof end === "string" ? end.replace(/,/g, "") : String(end);
  const numericEnd = parseFloat(cleanString);
  const isNumeric = !isNaN(numericEnd);
  const isFloat = cleanString.includes(".");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
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

  useEffect(() => {
    if (!hasStarted || !isNumeric) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      
      // easeOutQuad
      const easedProgress = progress * (2 - progress);
      const currentCount = easedProgress * numericEnd;

      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(numericEnd);
      }
    };

    window.requestAnimationFrame(step);
  }, [hasStarted, isNumeric, numericEnd, duration]);

  if (!isNumeric) {
    return <span ref={containerRef}>{prefix}{end}{suffix}</span>;
  }

  // Format display string
  let displayValue = "";
  if (count === numericEnd) {
    displayValue = typeof end === "number" ? end.toLocaleString() : end;
  } else {
    if (isFloat) {
      displayValue = count.toFixed(1);
    } else {
      displayValue = Math.floor(count).toLocaleString();
    }
  }

  return (
    <span ref={containerRef} className="tabular-nums">
      {prefix}{displayValue}{suffix}
    </span>
  );
}
