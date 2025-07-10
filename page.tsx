"use client"

import Image from "next/image"
import Link from "next/link"
import { Search, Globe, Grid3X3, DollarSign, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MovieCarousel } from "@/components/movie-carousel"
import { MovieModal } from "@/components/movie-modal"
import { MobileNav } from "@/components/mobile-nav"
import { AIRecommendations } from "@/components/ai-recommendations"
import { moviesData, tvShowsData, type Movie } from "@/lib/movies-data"
import { useRef, useState } from "react"
import { SimpleUploadDialog } from "@/components/simple-upload-dialog"

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [uploadedMovies, setUploadedMovies] = useState<Movie[]>([])
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const movieSectionRef = useRef<HTMLDivElement>(null) // Ref for the movie section

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const handleWatchFreeClick = () => {
    movieSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleMovieAdd = (newMovie: Movie) => {
    setUploadedMovies((prev) => [...prev, newMovie])
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-50 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">StreamFlix</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Find Movies & TV"
                  className="w-full pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link href="/free-movies" className="text-gray-300 hover:text-white transition-colors">
                Free Movies & TV
              </Link>
              <Link href="/live-tv" className="text-gray-300 hover:text-white transition-colors">
                Live TV
              </Link>
              <Link
                href="/recommendations"
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-1"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Picks</span>
              </Link>
              <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/download" className="text-gray-300 hover:text-white transition-colors">
                Download
              </Link>
              <Link href="/signin" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </Link>
              <Button
                asChild
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md"
              >
                <Link href="/signup">Sign Up Free</Link>
              </Button>
              <Button
                onClick={() => setIsUploadDialogOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md"
              >
                Upload Movie
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <Button variant="ghost" className="lg:hidden" onClick={() => setIsMobileNavOpen(true)}>
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
                <div className="w-full h-0.5 bg-white"></div>
              </div>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image src="/hero-bg.jpg" alt="Movie collage background" fill className="object-cover opacity-60" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Free Movies to Watch,
              <br />
              Anytime Anywhere.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              The search is over! Let StreamFlix help you find the perfect movie to watch tonight for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleWatchFreeClick}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg rounded-full"
              >
                Watch Free
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 text-lg rounded-full bg-transparent"
              >
                <Link href="/recommendations" className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Get AI Picks</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="absolute bottom-20 left-4 right-4 md:hidden z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Find Movies & TV"
              className="w-full pl-10 bg-gray-800/90 backdrop-blur-sm border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <AIRecommendations movies={[...moviesData, ...uploadedMovies]} onMovieSelect={handleMovieSelect} />
        </div>
      </section>

      {/* Movies Section */}
      <section ref={movieSectionRef} className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Featured Content</h2>
            <p className="text-gray-400 text-sm">Discover amazing movies and TV shows curated by our team</p>
          </div>

          <MovieCarousel
            movies={[...moviesData, ...uploadedMovies]}
            tvShows={tvShowsData}
            onMovieSelect={handleMovieSelect}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Works Worldwide */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Works Worldwide</h3>
              <p className="text-gray-600 leading-relaxed">
                No other free streaming service delivers more content to and from more countries worldwide.
              </p>
            </div>

            {/* AI-Powered */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized movie recommendations powered by advanced AI that learns your preferences.
              </p>
            </div>

            {/* Thousands of Titles */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Grid3X3 className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Thousands of Titles</h3>
              <p className="text-gray-600 leading-relaxed">
                Choose from movies, shows, sports and music documentaries, AMG series, Live TV and more.
              </p>
            </div>

            {/* Always 100% Free */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Always 100% Free</h3>
              <p className="text-gray-600 leading-relaxed">
                Welcome to instant gratification at its best. Watch now without any payment or subscription.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MovieModal movie={selectedMovie} isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)} />
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onUploadClick={() => setIsUploadDialogOpen(true)}
      />
      <SimpleUploadDialog
        isOpen={isUploadDialogOpen}
        onClose={() => setIsUploadDialogOpen(false)}
        onMovieAdd={handleMovieAdd}
      />
    </div>
  )
}
