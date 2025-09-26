"use client"


import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const [text, setText] = useState("")
  const fullText = "Développeur Full-Stack"
  // Removed useTheme and pixelBlastColor as it's no longer needed for PixelBlast

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, index))
      index++
      if (index > fullText.length) {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    
    <section id="hero" className="min-h-screen flex items-center justify-center relative margin-top-60"> {/* Reverted background color and removed PixelBlast and overlay */}
      {/* The existing content of HeroSection */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* <div className="glass rounded-3xl p-8 md:p-12 animate-tilt"> */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 font-heading">
            <span className="block text-foreground">Aya</span>
            <span className="block text-gradient">Naimi</span>
          </h1>

          <div className="text-xl md:text-2xl text-muted-foreground mb-8 h-8">
            {text}
            <span className="animate-pulse">|</span>
          </div>

          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Passionné par la création d'expériences web modernes et performantes. Je transforme vos idées en solutions
            digitales innovantes avec React, Node.js et les dernières technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a href="#projects">
              <Button size="lg" className="button">
                Voir mes projets
              </Button>


            </a>
            <a href="#contact">
            <Button variant="outline" size="lg" className=" border-primary/90 hover:bg-primary/80 ">
                Me contacter
              </Button>
            </a>
          </div>

          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <a href="https://github.com/AyaNaimi">
              <Github className="h-6 w-6" /></a>
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <a href="www.linkedin.com/in/aya-naimi-974a66357">
              <Linkedin className="h-6 w-6" /></a>
            </Button>
            <Button variant="ghost" size="icon" className="hover:text-primary transition-colors">
              <a href="mailto:ayanaimi21@gmail.com">
              <Mail className="h-6 w-6" /></a>
            </Button>
          </div>
        {/* </div> */}

        <div className="mt-12 animate-bounce">
          <ArrowDown className="h-8 w-8 mx-auto text-muted-foreground" />
        </div>
      </div>
    </section>
  )
}
