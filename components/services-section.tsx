"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Smartphone, Palette, Check } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Développement Web",
    description: "Applications web modernes et performantes avec les dernières technologies",
    features: [
      "Applications React/Next.js",
      "APIs REST et GraphQL",
      "Bases de données optimisées",
      "Déploiement cloud",
      "Tests automatisés",
    ],
  },
  {
    icon: Smartphone,
    title: "Applications Mobile",
    description: "Applications mobiles natives et cross-platform pour iOS et Android",
    features: ["React Native", "Flutter", "Applications hybrides", "Intégrations natives", "Publication sur stores"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Interfaces utilisateur intuitives et expériences utilisateur optimales",
    features: [
      "Design systems",
      "Prototypage interactif",
      "Tests utilisateurs",
      "Responsive design",
      "Accessibilité web",
    ],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Mes Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Je propose des solutions complètes pour vos projets digitaux, du concept à la mise en production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group"
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-white group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </CardTitle>
                <p className="text-gray-400">{service.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
