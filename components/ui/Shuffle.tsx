"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import "./Shuffle.css";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

interface ShuffleProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  shuffleDirection?: "left" | "right" | "up" | "down";
  duration?: number;
  maxDelay?: number;
  ease?: string;
  threshold?: number;
  rootMargin?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  textAlign?: string;
  onShuffleComplete?: () => void;
  shuffleTimes?: number;
  animationMode?: "evenodd" | "all";
  loop?: boolean;
  loopDelay?: number;
  stagger?: number;
  scrambleCharset?: string;
  colorFrom?: string;
  colorTo?: string;
  triggerOnce?: boolean;
  respectReducedMotion?: boolean;
  triggerOnHover?: boolean;
}

export default function Shuffle({
  text,
  className = "",
  style = {},
  shuffleDirection = "right",
  duration = 0.35,
  ease = "power3.out",
  threshold = 0.1,
  rootMargin = "-100px",
  tag = "p",
  onShuffleComplete,
  shuffleTimes = 1,
  animationMode = "evenodd",
  loop = false,
  loopDelay = 0,
  stagger = 0.03,
  scrambleCharset = "",
  colorFrom,
  colorTo,
  triggerOnce = true,
  respectReducedMotion = true,
  triggerOnHover = true,
}: ShuffleProps) {
  const ref = useRef<HTMLElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);

  const splitRef = useRef<InstanceType<typeof GSAPSplitText> | null>(null);
  const wrappersRef = useRef<HTMLElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const playingRef = useRef(false);
  const hoverHandlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if ("fonts" in document) {
      if (document.fonts.status === "loaded") setFontsLoaded(true);
      else document.fonts.ready.then(() => setFontsLoaded(true));
    } else setFontsLoaded(true);
  }, []);

  const scrollTriggerStart = useMemo(() => {
    const startPct = (1 - threshold) * 100;
    const mm = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin || "");
    const mv = mm ? parseFloat(mm[1]) : 0;
    const mu = mm ? mm[2] || "px" : "px";
    const sign =
      mv === 0 ? "" : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`;
    return `top ${startPct}%${sign}`;
  }, [threshold, rootMargin]);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (
        respectReducedMotion &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setReady(true);
        onShuffleComplete?.();
        return;
      }

      const el = ref.current;
      const start = scrollTriggerStart;

      const removeHover = () => {
        if (hoverHandlerRef.current && ref.current) {
          ref.current.removeEventListener(
            "mouseenter",
            hoverHandlerRef.current
          );
          hoverHandlerRef.current = null;
        }
      };

      const teardown = () => {
        if (tlRef.current) {
          tlRef.current.kill();
          tlRef.current = null;
        }
        if (wrappersRef.current.length) {
          wrappersRef.current.forEach((wrap) => {
            const inner = wrap.firstElementChild;
            const orig = inner?.querySelector('[data-orig="1"]');
            if (orig && wrap.parentNode)
              wrap.parentNode.replaceChild(orig, wrap);
          });
          wrappersRef.current = [];
        }
        try {
          splitRef.current?.revert();
        } catch {
          /* noop */
        }
        splitRef.current = null;
        playingRef.current = false;
      };

      const build = () => {
        teardown();

        splitRef.current = new GSAPSplitText(el, {
          type: "chars",
          charsClass: "shuffle-char",
          wordsClass: "shuffle-word",
          linesClass: "shuffle-line",
          smartWrap: true,
          reduceWhiteSpace: false,
        });

        const chars = splitRef.current.chars || [];
        wrappersRef.current = [];

        const rolls = Math.max(1, Math.floor(shuffleTimes));
        const rand = (set: string) =>
          set.charAt(Math.floor(Math.random() * set.length)) || "";

        (chars as HTMLElement[]).forEach((ch) => {
          const parent = ch.parentElement;
          if (!parent) return;

          const w = ch.getBoundingClientRect().width;
          const h = ch.getBoundingClientRect().height;
          if (!w) return;

          const wrap = document.createElement("span");
          Object.assign(wrap.style, {
            display: "inline-block",
            overflow: "hidden",
            width: w + "px",
            height:
              shuffleDirection === "up" || shuffleDirection === "down"
                ? h + "px"
                : "auto",
            verticalAlign: "bottom",
          });

          const inner = document.createElement("span");
          Object.assign(inner.style, {
            display: "inline-block",
            whiteSpace:
              shuffleDirection === "up" || shuffleDirection === "down"
                ? "normal"
                : "nowrap",
            willChange: "transform",
          });

          parent.insertBefore(wrap, ch);
          wrap.appendChild(inner);

          const firstOrig = ch.cloneNode(true) as HTMLElement;
          Object.assign(firstOrig.style, {
            display:
              shuffleDirection === "up" || shuffleDirection === "down"
                ? "block"
                : "inline-block",
            width: w + "px",
            textAlign: "center",
          });

          ch.setAttribute("data-orig", "1");
          Object.assign(ch.style, {
            display:
              shuffleDirection === "up" || shuffleDirection === "down"
                ? "block"
                : "inline-block",
            width: w + "px",
            textAlign: "center",
          });

          inner.appendChild(firstOrig);
          for (let k = 0; k < rolls; k++) {
            const c = ch.cloneNode(true) as HTMLElement;
            if (scrambleCharset) c.textContent = rand(scrambleCharset);
            Object.assign(c.style, {
              display:
                shuffleDirection === "up" || shuffleDirection === "down"
                  ? "block"
                  : "inline-block",
              width: w + "px",
              textAlign: "center",
            });
            inner.appendChild(c);
          }
          inner.appendChild(ch);

          const steps = rolls + 1;

          if (
            shuffleDirection === "right" ||
            shuffleDirection === "down"
          ) {
            const real = inner.lastElementChild;
            if (real) inner.insertBefore(real, inner.firstChild);
            const firstCopy = inner.children[1];
            if (firstCopy) inner.appendChild(firstCopy);
          }

          let startX = 0;
          let finalX = 0;
          let startY = 0;
          let finalY = 0;

          if (shuffleDirection === "right") {
            startX = -steps * w;
            finalX = 0;
          } else if (shuffleDirection === "left") {
            startX = 0;
            finalX = -steps * w;
          } else if (shuffleDirection === "down") {
            startY = -steps * h;
            finalY = 0;
          } else if (shuffleDirection === "up") {
            startY = 0;
            finalY = -steps * h;
          }

          if (
            shuffleDirection === "left" ||
            shuffleDirection === "right"
          ) {
            gsap.set(inner, { x: startX, y: 0, force3D: true });
            inner.setAttribute("data-start-x", String(startX));
            inner.setAttribute("data-final-x", String(finalX));
          } else {
            gsap.set(inner, { x: 0, y: startY, force3D: true });
            inner.setAttribute("data-start-y", String(startY));
            inner.setAttribute("data-final-y", String(finalY));
          }

          if (colorFrom) inner.style.color = colorFrom;
          wrappersRef.current.push(wrap);
        });
      };

      const inners = () =>
        wrappersRef.current.map((w) => w.firstElementChild).filter(Boolean);

      const play = () => {
        if (playingRef.current) return;
        playingRef.current = true;

        const els = inners();
        if (!els.length) {
          playingRef.current = false;
          return;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            playingRef.current = false;
            setReady(true);
            onShuffleComplete?.();
            if (loop) {
              setTimeout(() => {
                build();
                play();
              }, loopDelay * 1000);
            }
          },
        });

        const getStagger = (i: number) => {
          if (animationMode === "evenodd") {
            return i % 2 === 0 ? i * stagger : (els.length - i) * stagger;
          }
          return i * stagger;
        };

        els.forEach((inner, i) => {
          if (!inner) return;
          const props: gsap.TweenVars = {
            duration,
            ease,
            delay: getStagger(i),
          };

          if (
            shuffleDirection === "left" ||
            shuffleDirection === "right"
          ) {
            props.x = parseFloat(
              inner.getAttribute("data-final-x") || "0"
            );
          } else {
            props.y = parseFloat(
              inner.getAttribute("data-final-y") || "0"
            );
          }

          if (colorTo) props.color = colorTo;
          tl.to(inner, props, 0);
        });

        tlRef.current = tl;
      };

      build();
      setReady(true);

      ScrollTrigger.create({
        trigger: el,
        start,
        once: triggerOnce,
        onEnter: () => play(),
        onEnterBack: triggerOnce ? undefined : () => play(),
      });

      if (triggerOnHover) {
        const handler = () => {
          if (!playingRef.current) {
            build();
            play();
          }
        };
        hoverHandlerRef.current = handler;
        el.addEventListener("mouseenter", handler);
      }

      return () => {
        removeHover();
        teardown();
      };
    },
    {
      scope: ref,
      dependencies: [
        text,
        fontsLoaded,
        shuffleDirection,
        duration,
        ease,
        shuffleTimes,
        animationMode,
        stagger,
        scrambleCharset,
        colorFrom,
        colorTo,
        triggerOnce,
        triggerOnHover,
        loop,
        loopDelay,
        scrollTriggerStart,
        respectReducedMotion,
      ],
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Tag = tag as any;

  return (
    <Tag
      ref={ref}
      className={`shuffle-text ${className}`}
      style={{
        ...style,
        visibility: ready ? "visible" : "hidden",
        whiteSpace: "normal",
      }}
    >
      {text}
    </Tag>
  );
}
