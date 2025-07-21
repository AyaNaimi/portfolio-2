"use client"

import { Button } from "@/components/ui/button"
import { Settings, MessageCircle, Zap } from "lucide-react"

interface FloatingButtonsProps {
  onAdminOpen: () => void
  onChatOpen: () => void
}

export function FloatingButtons({ onAdminOpen, onChatOpen }: FloatingButtonsProps) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 flex flex-col gap-3 sm:gap-4 z-40">
      {/* Chatbot Button */}
      <div className="relative group">
        <Button
          onClick={onChatOpen}
          size="icon"
          className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-xl sm:shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-110 border-0 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 relative z-10 group-hover:animate-pulse" />

          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </Button>

        {/* Tooltip - hidden on mobile */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800/90 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-purple-500/20 hidden sm:block">
          Assistant IA
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800/90"></div>
        </div>
      </div>

      {/* Admin Button */}
      <div className="relative group">
        <Button
          onClick={onAdminOpen}
          size="icon"
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-slate-800/80 hover:bg-slate-700/90 backdrop-blur-sm text-slate-300 hover:text-white shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border border-slate-600/50 hover:border-purple-500/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
        </Button>

        {/* Tooltip - hidden on mobile */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800/90 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-purple-500/20 hidden sm:block">
          Administration
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800/90"></div>
        </div>
      </div>

      {/* Quick action button - hidden on small mobile */}
      <div className="relative group hidden sm:block">
        <Button
          size="icon"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 backdrop-blur-sm text-yellow-400 hover:text-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border border-yellow-500/30 hover:border-yellow-400/50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Zap className="w-4 h-4 relative z-10 group-hover:animate-pulse" />
        </Button>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-slate-800/90 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-purple-500/20 hidden lg:block">
          Actions rapides
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-slate-800/90"></div>
        </div>
      </div>
    </div>
  )
}
