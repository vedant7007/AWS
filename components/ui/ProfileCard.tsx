"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import "./ProfileCard.css";

interface ProfileCardProps {
  name: string;
  title: string;
  handle?: string;
  status?: string;
  contactText?: string;
  avatarUrl?: string;
  showUserInfo?: boolean;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  onContactClick?: () => void;
  behindGlowColor?: string;
  iconUrl?: string;
  behindGlowEnabled?: boolean;
  innerGradient?: string;
  className?: string;
}

export default function ProfileCard({
  name,
  title,
  handle = "",
  status = "Online",
  contactText = "Contact Me",
  avatarUrl = "",
  showUserInfo = false,
  enableTilt = true,
  enableMobileTilt = false,
  onContactClick,
  behindGlowColor = "rgba(125, 190, 255, 0.67)",
  iconUrl,
  behindGlowEnabled = true,
  innerGradient = "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)",
  className = "",
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const enteringRef = useRef(false);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const updateVars = useCallback(
    (x: number, y: number) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = ((x - rect.left) / rect.width) * 100;
      const py = ((y - rect.top) / rect.height) * 100;
      const fromCenter = Math.sqrt(
        Math.pow(px / 100 - 0.5, 2) + Math.pow(py / 100 - 0.5, 2)
      );
      const fromTop = py / 100;
      const fromLeft = px / 100;
      el.style.setProperty("--pointer-x", `${px}%`);
      el.style.setProperty("--pointer-y", `${py}%`);
      el.style.setProperty("--pointer-from-center", `${fromCenter}`);
      el.style.setProperty("--pointer-from-top", `${fromTop}`);
      el.style.setProperty("--pointer-from-left", `${fromLeft}`);
      el.style.setProperty("--background-x", `${px}%`);
      el.style.setProperty("--background-y", `${py}%`);

      if (enableTilt && (!isMobile || enableMobileTilt)) {
        const rotX = (fromLeft - 0.5) * 20;
        const rotY = (fromTop - 0.5) * -20;
        el.style.setProperty("--rotate-x", `${rotX}deg`);
        el.style.setProperty("--rotate-y", `${rotY}deg`);
      }
    },
    [enableTilt, enableMobileTilt, isMobile]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      updateVars(e.clientX, e.clientY);
    },
    [updateVars]
  );

  const onPointerEnter = useCallback(() => {
    setIsActive(true);
    enteringRef.current = true;
    clearTimeout(enterTimeoutRef.current);
    enterTimeoutRef.current = setTimeout(() => {
      enteringRef.current = false;
    }, 200);
  }, []);

  const onPointerLeave = useCallback(() => {
    setIsActive(false);
    const el = cardRef.current;
    if (el) {
      el.style.setProperty("--rotate-x", "0deg");
      el.style.setProperty("--rotate-y", "0deg");
    }
  }, []);

  return (
    <div
      className={`pc-card-wrapper ${isActive ? "active" : ""} ${className}`.trim()}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      ref={cardRef}
      style={
        {
          "--behind-glow-color": behindGlowColor,
          "--icon": iconUrl ? `url(${iconUrl})` : "none",
          "--inner-gradient": innerGradient,
        } as React.CSSProperties
      }
    >
      {behindGlowEnabled && <div className="pc-behind" />}

      <div className={`pc-card-shell ${enteringRef.current ? "entering" : ""}`}>
        <div className={`pc-card ${isActive ? "active" : ""}`}>
          <div className="pc-inside" />

          <div className="pc-shine">
            <span />
          </div>

          <div className="pc-glare" />

          {/* Avatar */}
          <div className="pc-avatar-content pc-content">
            {avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={name}
                className="avatar"
                draggable={false}
              />
            )}
          </div>

          {/* Name + Title overlay */}
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>

          {/* User info bar */}
          {showUserInfo && (
            <div className="pc-user-info">
              <div className="pc-user-details">
                <div className="pc-mini-avatar">
                  {avatarUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatarUrl} alt={name} />
                  )}
                </div>
                <div className="pc-user-text">
                  {handle && <span className="pc-handle">@{handle}</span>}
                  <span className="pc-status">{status}</span>
                </div>
              </div>
              <button className="pc-contact-btn" onClick={onContactClick}>
                {contactText}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
