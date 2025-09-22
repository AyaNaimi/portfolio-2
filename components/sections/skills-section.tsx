"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, Palette, Server, Cloud, GitBranch, Zap, Globe, Shield, Cpu, Layers } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: <Code2 className="h-6 w-6" />,
    skills: [
      { name: "React/Next.js", level: 85, color: "bg-blue-500" },
      { name: "TypeScript", level: 70, color: "bg-blue-600" },
      { name: "Tailwind CSS", level: 88, color: "bg-cyan-500" },
      { name: "Vue.js", level: 65, color: "bg-green-500" },
    ],
  },
  {
    title: "Backend",
    icon: <Server className="h-6 w-6" />,
    skills: [
      { name: "Node.js", level: 72, color: "bg-green-600" },
      // { name: "Express/Fastify", level: 88, color: "bg-gray-600" },
      { name: "Python", level: 80, color: "bg-yellow-600" },
      // { name: "GraphQL", level: 75, color: "bg-pink-500" },
    ],
  },
  {
    title: "Base de données",
    icon: <Database className="h-6 w-6" />,
    skills: [
      { name: "SQL", level: 85, color: "bg-blue-700" },
      { name: "MongoDB", level: 72, color: "bg-green-700" },
      { name: "supabase", level: 60, color: "bg-red-500" },

      // { name: "Redis", level: 78, color: "bg-red-500" },
      // { name: "Prisma/Drizzle", level: 88, color: "bg-indigo-500" },
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: <Cloud className="h-6 w-6" />,
    skills: [
      { name: "Docker", level: 80, color: "bg-blue-500" },
      { name: "Vercel", level: 80, color: "bg-orange-500" },
      // { name: "CI/CD", level: 82, color: "bg-purple-500" },
      // { name: "Kubernetes", level: 70, color: "bg-blue-600" },
    ],
  },
]

const tools = [
  { name: "Git", icon: <GitBranch className="h-5 w-5" /> },
  { name: "VS Code", icon: <Code2 className="h-5 w-5" /> },
  { name: "Figma", icon: <Palette className="h-5 w-5" /> },
  { name: "Postman", icon: <Zap className="h-5 w-5" /> },
  { name: "Vercel", icon: <Globe className="h-5 w-5" /> },
  { name: "Auth0", icon: <Shield className="h-5 w-5" /> },
  { name: "Stripe", icon: <Cpu className="h-5 w-5" /> },
  { name: "Supabase", icon: <Layers className="h-5 w-5" /> },
]

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSkills, setAnimatedSkills] = useState<{ [key: string]: number }>({})
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate skill bars
          setTimeout(() => {
            const newAnimatedSkills: { [key: string]: number } = {}
            skillCategories.forEach((category) => {
              category.skills.forEach((skill) => {
                newAnimatedSkills[skill.name] = skill.level
              })
            })
            setAnimatedSkills(newAnimatedSkills)
          }, 500)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 text-gradient transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Mes compétences
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Une expertise technique complète pour créer des solutions web modernes et performantes.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.title}
              className={`glass p-6 animate-tilt transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${300 + categoryIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/20 text-primary">{category.icon}</div>
                <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className={`transition-all duration-500 ${
                      isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"
                    }`}
                    style={{ transitionDelay: `${500 + categoryIndex * 100 + skillIndex * 50}ms` }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress
                      value={animatedSkills[skill.name] || 0}
                      className="h-2"
                      style={{
                        background: "rgba(255, 255, 255, 0.37)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Tools & Technologies */}
        <div
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Outils & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool, index) => (
              <Badge
                key={tool.name}
                variant="secondary"
                className={` px-4 py-2 text-sm font-medium hover:bg-primary/20 hover:text-primary transition-all duration-300 cursor-default ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: `${30 + index * 50}ms` }}
              >
                <span className="mr-2">{tool.icon}</span>
                {tool.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
