"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, TrendingUp, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AIRecommendations } from "@/components/ai-recommendations"
import { MovieModal } from "@/components/movie-modal"
import { moviesData, tvShowsData, type Movie } from "@/lib/movies-data"

export default function RecommendationsPage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const allContent = [...moviesData, ...tvShowsData]

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  // Simulated user stats (in real app, this would come from user data)
  const userStats = {
    totalWatched: 47,
    hoursWatched: 142,
    favoriteGenre: "Action",
    averageRating: 8.2,
    streakDays: 12,
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button asChild variant="ghost" className="text-gray-400 hover:text-white">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="text-white font-bold text-sm w-4 h-4" />
                </div>
                <span className="text-xl font-bold">AI Recommendations</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/free-movies" className="text-gray-300 hover:text-white transition-colors">
                Browse All
              </Link>
              <Link href="/live-tv" className="text-gray-300 hover:text-white transition-colors">
                Live TV
              </Link>
              <Link href="/signin" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Personal AI Curator</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover movies and shows tailored to your unique taste using advanced AI algorithms.
          </p>
        </div>
      </section>

      {/* User Stats */}
      <section className="py-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{userStats.totalWatched}</div>
                <p className="text-gray-400 text-sm">Movies Watched</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{userStats.hoursWatched}h</div>
                <p className="text-gray-400 text-sm">Hours Streamed</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.favoriteGenre}</div>
                <p className="text-gray-400 text-sm">Top Genre</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{userStats.averageRating}</div>
                <p className="text-gray-400 text-sm">Avg Rating</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{userStats.streakDays}</div>
                <p className="text-gray-400 text-sm">Day Streak</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <AIRecommendations movies={allContent} onMovieSelect={handleMovieSelect} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How Our AI Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our recommendation engine uses advanced machine learning to understand your preferences and suggest
              content you'll love.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-white">Analyze Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  We analyze your viewing history, ratings, and preferences to understand what you enjoy most.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-white">AI Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Advanced algorithms process millions of data points to find movies that match your unique taste.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-white">Personalized Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Get recommendations tailored specifically to you, with confidence scores and reasoning for each
                  suggestion.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <MovieModal movie={selectedMovie} isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  )
}
