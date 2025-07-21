"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  className?: string
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [preview, setPreview] = useState<string>(value || "")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier image valide.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      toast({
        title: "Erreur",
        description: "L'image ne doit pas dépasser 5MB.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreview(result)
      onChange(result)
      setIsUploading(false)
      toast({
        title: "Image uploadée !",
        description: "L'image a été ajoutée avec succès.",
      })
    }
    reader.onerror = () => {
      setIsUploading(false)
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement de l'image.",
        variant: "destructive",
      })
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPreview("")
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUrlChange = (url: string) => {
    setPreview(url)
    onChange(url)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex gap-4">
        <Input
          placeholder="URL de l'image ou uploadez un fichier"
          value={preview}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="bg-slate-700/50 border-purple-500/20 text-white placeholder:text-gray-400"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="border-purple-500/20 hover:bg-purple-500/10 bg-transparent shrink-0"
        >
          <Upload className="w-4 h-4 mr-2" />
          {isUploading ? "Upload..." : "Upload"}
        </Button>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      {preview && (
        <div className="relative group">
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-slate-700/30 border border-purple-500/20">
            <img
              src={preview || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="bg-red-500/80 hover:bg-red-500"
              >
                <X className="w-4 h-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}

      {!preview && (
        <div className="w-full h-48 rounded-lg border-2 border-dashed border-purple-500/30 bg-slate-800/30 flex items-center justify-center group hover:border-purple-500/50 transition-colors duration-300">
          <div className="text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2 group-hover:text-purple-400 transition-colors duration-300" />
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
              Aucune image sélectionnée
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
