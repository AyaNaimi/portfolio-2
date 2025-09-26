"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import RippleGrid from "./RippleGrid";
import SplashCursor from "./SplashCursor";
import gsap from "gsap";

export function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }

  const nameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Fond animé */}
      <div className="absolute inset-0 z-0 w-full h-full scale-110 sm:scale-125 lg:scale-150">
        <RippleGrid
          enableRainbow={false}
          gridColor="#5227FF"
          rippleIntensity={0.05}
          gridSize={9}
          gridThickness={13}
          mouseInteraction={true}
          mouseInteractionRadius={4.0}
          opacity={0.8}
          responsive={true}
        />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 text-center w-full max-w-7xl mx-auto flex items-center justify-center min-h-screen pointer-events-none">
        <div className="animate-fade-in-up w-full">
          {/* Badge de statut */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 backdrop-blur-sm mb-4 sm:mb-6 lg:mb-8 group hover:from-cyan-500/30 hover:to-purple-500/30 transition-all duration-300 pointer-events-auto">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 group-hover:animate-spin" />
            <span className="text-xs sm:text-sm text-cyan-300 font-medium">Disponible pour nouveaux projets</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight font-heading">
            <span
              ref={nameRef}
              className="bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-cyan-200 hover:via-purple-300 hover:to-pink-300 transition-all duration-500 cursor-default"
            >
              Aya Naimi
            </span>
          </h1>

          <div className="relative mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-slate-200 mb-2">
              Développeur Full-Stack & Designer UI/UX
            </h2>
            <div className="w-16 sm:w-20 md:w-24 lg:w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-300 mb-6 sm:mb-8 lg:mb-12 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed font-light">
            Je crée des{" "}
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-medium">
              expériences numériques exceptionnelles
            </span>{" "}
            en combinant développement moderne et design intuitif.
            <br className="hidden sm:block" />
            <span className="text-xs sm:text-sm lg:text-lg text-slate-400 block mt-2 sm:inline sm:mt-0">
              Passionné par l'innovation et la performance.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-8 sm:mb-12 lg:mb-16">
            <Button
              onClick={scrollToProjects}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-4 sm:px-6 lg:px-10 py-2 sm:py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 border-0 w-full sm:w-auto pointer-events-auto text-sm sm:text-base lg:text-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 font-semibold">Découvrir mes projets</span>
              <ArrowDown className="ml-2 sm:ml-3 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 relative z-10 group-hover:animate-bounce" />
            </Button>

            <div className="flex gap-2 sm:gap-3 lg:gap-4">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Mail, label: "Email" },
              ].map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl border-0 bg-slate-800/50 hover:bg-slate-700/60 backdrop-blur-sm text-slate-300 hover:text-white transition-all duration-300 hover:scale-110 group relative overflow-hidden pointer-events-auto"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 relative z-10" />
                </Button>
              ))}
            </div>
          </div>

          {/* Scroll indicator - hidden on mobile */}
          <div><br /><br /></div>
          <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block pointer-events-auto">
            <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-slate-400/50 rounded-full flex justify-center">
              <div className="w-1 h-2 sm:h-3 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Effet de fluide interactif */}
      <SplashCursor />
    </section>
  )
}
