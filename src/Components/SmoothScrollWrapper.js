// src/components/SmoothScrollWrapper.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollWrapper({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    // Create ScrollSmoother
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      smooth: 2,        // how “loose” the scroll is
      effects: true,    // enable data-speed / parallax effects
      normalizeScroll: true,
      // optionally adjust other settings
    });

    // Return cleanup
    return () => {
      smoother.kill();  // destroy the smoother when component unmounts
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ overflow: "hidden" }}>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
