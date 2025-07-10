"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Sparkles, TrendingUp, Heart, Star, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Movie } from "@/lib/movies-data"

interface UserPreferences {
  favoriteGenres: string[]
  recentlyWatched: string[]
  likedMovies: string[]
  averageRating: number
  preferredDecade: string
  watchTime: "short" | "medium" | "long"
}

interface RecommendationReason {
  type: "genre" | "similar" | "trending" | "new" | "ai" | "mood"
  text: string
  confidence: number
}

interface RecommendedMovie extends Movie {
  reason: RecommendationReason
  matchScore: number
}

interface AIRecommendationsProps {
  movies: Movie[]
  onMovieSelect: (movie: Movie) => void
  userPreferences?: UserPreferences
}

export function AIRecommendations({ movies, onMovieSelect, userPreferences }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendedMovie[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentMood, setCurrentMood] = useState<string>("discover")

  // Default user preferences (in real app, this would come from user data)
  const defaultPreferences: UserPreferences = {
    favoriteGenres: ["Action", "Sci-Fi", "Drama"],
    recentlyWatched: ["The Dark Knight", "Inception"],
    likedMovies: ["Pulp Fiction", "The Matrix"],
    averageRating: 8.2,
    preferredDecade: "2000s",
    watchTime: "medium",
  }

  const preferences = userPreferences || defaultPreferences

  const moods = [
    { id: "discover", label: "🎬 Discover", description: "Find something new" },
    { id: "action", label: "💥 Action", description: "High-energy thrills" },
    { id: "chill", label: "😌 Chill", description: "Relaxing watch" },
    { id: "classic", label: "🎭 Classic", description: "Timeless favorites" },
    { id: "trending", label: "🔥 Trending", description: "What's popular now" },
  ]

  // AI Recommendation Algorithm
  const generateRecommendations = (mood: string = currentMood) => {
    setIsGenerating(true)

    // Simulate AI processing time
    setTimeout(() => {
      const scored = movies.map((movie) => {
        let score = 0
        let reason: RecommendationReason

        // Genre matching (40% weight)
        const genreMatch = movie.genre.some((g) => preferences.favoriteGenres.includes(g))
        if (genreMatch) score += 40

        // Rating preference (20% weight)
        const ratingDiff = Math.abs(movie.rating - preferences.averageRating)
        score += Math.max(0, 20 - ratingDiff * 5)

        // Decade preference (15% weight)
        const decade = Math.floor(movie.year / 10) * 10
        if (decade.toString() === preferences.preferredDecade.replace("s", "")) {
          score += 15
        }

        // Mood-based scoring (25% weight)
        switch (mood) {
          case "action":
            if (movie.genre.includes("Action")) score += 25
            reason = {
              type: "mood",
              text: "Perfect for an action-packed evening",
              confidence: 0.9,
            }
            break
          case "chill":
            if (movie.genre.includes("Drama") || movie.genre.includes("Romance")) score += 25
            reason = {
              type: "mood",
              text: "Great for a relaxing watch",
              confidence: 0.85,
            }
            break
          case "classic":
            if (movie.year < 2000) score += 25
            reason = {
              type: "mood",
              text: "A timeless classic you'll love",
              confidence: 0.8,
            }
            break
          case "trending":
            if (movie.rating > 8.5) score += 25
            reason = {
              type: "trending",
              text: "Highly rated and popular",
              confidence: 0.95,
            }
            break
          default:
            // AI-powered discovery
            if (movie.rating > preferences.averageRating - 0.5) score += 25
            reason = {
              type: "ai",
              text: "AI thinks you'll enjoy this based on your taste",
              confidence: 0.88,
            }
        }

        // Avoid recently watched
        if (preferences.recentlyWatched.includes(movie.title)) {
          score -= 30
        }

        // Boost if similar to liked movies
        if (
          preferences.likedMovies.some((liked) =>
            movie.genre.some((g) => movies.find((m) => m.title === liked)?.genre.includes(g)),
          )
        ) {
          score += 10
          reason = {
            type: "similar",
            text: "Similar to movies you've liked",
            confidence: 0.92,
          }
        }

        // Add some randomness for discovery
        score += Math.random() * 10

        return {
          ...movie,
          reason: reason!,
          matchScore: Math.min(100, Math.max(0, score)),
        }
      })

      // Sort by score and take top 8
      const topRecommendations = scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, 8)

      setRecommendations(topRecommendations)
      setIsGenerating(false)
    }, 1500)
  }

  useEffect(() => {
    generateRecommendations()
  }, [movies])

  const handleMoodChange = (mood: string) => {
    setCurrentMood(mood)
    generateRecommendations(mood)
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-green-400"
    if (confidence >= 0.8) return "text-yellow-400"
    return "text-blue-400"
  }

  const getReasonIcon = (type: string) => {
    switch (type) {
      case "trending":
        return <TrendingUp className="w-3 h-3" />
      case "similar":
        return <Heart className="w-3 h-3" />
      case "mood":
        return <Sparkles className="w-3 h-3" />
      case "ai":
        return <Sparkles className="w-3 h-3" />
      default:
        return <Star className="w-3 h-3" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
            <p className="text-gray-400 text-sm">Personalized picks just for you</p>
          </div>
        </div>
        <Button
          onClick={() => generateRecommendations()}
          disabled={isGenerating}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
          {isGenerating ? "Generating..." : "Refresh"}
        </Button>
      </div>

      {/* Mood Selector */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">What's your mood?</h3>
        <div className="flex flex-wrap gap-2">
          {moods.map((mood) => (
            <Button
              key={mood.id}
              onClick={() => handleMoodChange(mood.id)}
              variant={currentMood === mood.id ? "default" : "outline"}
              className={`${
                currentMood === mood.id
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              }`}
            >
              {mood.label}
            </Button>
          ))}
        </div>
      </div>

      {/* User Insights */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Your Taste Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Favorite Genres</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {preferences.favoriteGenres.slice(0, 2).map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-400">Avg Rating</p>
              <p className="text-white font-semibold">{preferences.averageRating}/10</p>
            </div>
            <div>
              <p className="text-gray-400">Preferred Era</p>
              <p className="text-white font-semibold">{preferences.preferredDecade}</p>
            </div>
            <div>
              <p className="text-gray-400">Watch Time</p>
              <p className="text-white font-semibold capitalize">{preferences.watchTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      {isGenerating ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
              <div className="aspect-[2/3] bg-gray-700 rounded-t-lg"></div>
              <CardContent className="p-3">
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendations.map((movie, index) => (
            <Card
              key={movie.id}
              className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer group"
              onClick={() => onMovieSelect(movie)}
            >
              <div className="relative aspect-[2/3] rounded-t-lg overflow-hidden">
                <Image
                  src={movie.poster || "/placeholder.svg"}
                  alt={movie.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Match Score Badge */}
                <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                  {Math.round(movie.matchScore)}%
                </div>
                {/* Ranking Badge */}
                <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full font-bold">
                  #{index + 1}
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="text-white font-semibold text-sm mb-1 truncate">{movie.title}</h3>
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>{movie.year}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-500 mr-1" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
                {/* AI Reason */}
                <div className={`flex items-center space-x-1 text-xs ${getConfidenceColor(movie.reason.confidence)}`}>
                  {getReasonIcon(movie.reason.type)}
                  <span className="truncate">{movie.reason.text}</span>
                </div>
                {/* Genres */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {movie.genre.slice(0, 2).map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs border-gray-600 text-gray-400">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-700">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-purple-400" />
            <div>
              <h4 className="text-white font-semibold">AI Insight</h4>
              <p className="text-gray-300 text-sm">
                Based on your viewing patterns, you tend to enjoy{" "}
                <span className="text-purple-400 font-semibold">{preferences.favoriteGenres[0]}</span> movies with
                ratings above <span className="text-purple-400 font-semibold">{preferences.averageRating}</span>. Try
                exploring more <span className="text-purple-400 font-semibold">{preferences.preferredDecade}</span>{" "}
                classics!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
