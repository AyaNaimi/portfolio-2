"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useToast } from "@/hooks/use-toast"
import { Star, Calendar, Heart, ThumbsUp } from "lucide-react"

interface Review {
  id: string
  name: string
  email: string
  rating: number
  comment: string
  date: string
  avatar: string
  approved: boolean
  likes: number
}

const initialReviews: Review[] = [
  {
    id: "1",
    name: "Marie Dupont",
    email: "marie@example.com",
    rating: 5,
    comment:
      "Excellent travail ! Alex a su comprendre parfaitement nos besoins et livrer un produit de qualité exceptionnelle.",
    date: "2024-01-15",
    avatar: "/placeholder.svg?height=40&width=40",
    approved: true,
    likes: 12,
  },
  {
    id: "2",
    name: "Pierre Martin",
    email: "pierre@example.com",
    rating: 5,
    comment: "Très professionnel et réactif. Le projet a été livré dans les temps avec une qualité irréprochable.",
    date: "2024-01-10",
    avatar: "/placeholder.svg?height=40&width=40",
    approved: true,
    likes: 8,
  },
  {
    id: "3",
    name: "Sophie Bernard",
    email: "sophie@example.com",
    rating: 4,
    comment: "Bon développeur avec de bonnes idées créatives. Communication fluide tout au long du projet.",
    date: "2024-01-05",
    avatar: "/placeholder.svg?height=40&width=40",
    approved: true,
    likes: 5,
  },
]

export function ReviewsSection() {
  const { toast } = useToast()
  const [reviews, setReviews] = useLocalStorage<Review[]>("portfolio-comments", initialReviews)
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
  })

  const approvedReviews = reviews.filter((review) => review.approved)

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newReview.name || !newReview.email || !newReview.comment) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      })
      return
    }

    const review: Review = {
      id: Date.now().toString(),
      ...newReview,
      date: new Date().toISOString().split("T")[0],
      avatar: "/placeholder.svg?height=40&width=40",
      approved: false,
      likes: 0,
    }

    setReviews((prev) => [review, ...prev])
    setNewReview({ name: "", email: "", rating: 5, comment: "" })

    toast({
      title: "Avis soumis !",
      description: "Votre avis sera visible après modération.",
    })
  }

  const handleLikeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) => (review.id === reviewId ? { ...review, likes: review.likes + 1 } : review)),
    )
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 transition-all duration-300 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
            } ${interactive ? "cursor-pointer hover:text-yellow-400 hover:scale-110" : ""}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    )
  }

  const averageRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((acc, review) => acc + review.rating, 0) / approvedReviews.length
      : 0

  return (
    <section id="reviews" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up">
            Avis Clients
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto rounded-full mb-8 animate-fade-in-up"></div>

          <div className="flex items-center justify-center gap-4 mb-8 animate-fade-in-up">
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</span>
            </div>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 animate-pulse">
              {approvedReviews.length} avis
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6 animate-fade-in-left">Témoignages</h3>
            {approvedReviews.map((review, index) => (
              <Card
                key={review.id}
                className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-500 group hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.name}
                      className="w-12 h-12 rounded-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {review.name}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {new Date(review.date).toLocaleDateString("fr-FR")}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-400">({review.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                    {review.comment}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLikeReview(review.id)}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-all duration-300 group/like"
                    >
                      <Heart className="w-4 h-4 group-hover/like:animate-pulse group-hover/like:fill-red-400" />
                      <span>{review.likes}</span>
                    </button>
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      Vérifié
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm h-fit hover:bg-slate-800/70 transition-all duration-500 animate-fade-in-right">
            <CardHeader>
              <h3 className="text-2xl font-semibold text-white">Laisser un avis</h3>
              <p className="text-gray-400">Partagez votre expérience de collaboration</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Votre nom *"
                    value={newReview.name}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className="bg-slate-700/50 border-purple-500/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                  />
                  <Input
                    type="email"
                    placeholder="Votre email *"
                    value={newReview.email}
                    onChange={(e) => setNewReview((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className="bg-slate-700/50 border-purple-500/20 text-white placeholder:text-gray-400 transition-all duration-300 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Note *</label>
                  <div className="flex items-center gap-2">
                    {renderStars(newReview.rating, true, (rating) => setNewReview((prev) => ({ ...prev, rating })))}
                    <span className="text-sm text-gray-400 ml-2">({newReview.rating}/5)</span>
                  </div>
                </div>

                <Textarea
                  placeholder="Votre commentaire *"
                  value={newReview.comment}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                  required
                  rows={4}
                  className="bg-slate-700/50 border-purple-500/20 text-white placeholder:text-gray-400 resize-none transition-all duration-300 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Publier l'avis
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
