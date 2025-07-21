import { useRef, useEffect, ReactNode, CSSProperties } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

const DEFAULT_GLOW_COLOR = "132, 0, 255";

type ParticleCardProps = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  style?: CSSProperties;
  [key: string]: any;
};

const ParticleCard = ({
  children,
  className = "",
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  enableMagnetism = false,
  style = {},
  ...props
}: ParticleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enableTilt, enableMagnetism]);

  return (
    <div
      ref={cardRef}
      className={`card particle-container ${className}`}
      style={{ position: "relative", overflow: "hidden", ...style }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ParticleCard;
