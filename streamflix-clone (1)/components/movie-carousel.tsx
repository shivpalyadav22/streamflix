"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Movie } from "@/lib/movies-data"

interface MovieCardProps {
  movie: Movie
  onSelect: (movie: Movie) => void
}

function MovieCard({ movie, onSelect }: MovieCardProps) {
  return (
    <Card
      className="group relative bg-gray-800 border-gray-700 overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer min-w-[200px] md:min-w-[250px]"
      onClick={() => onSelect(movie)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3]">
          <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Play className="w-4 h-4 mr-1" />
              Play
            </Button>
          </div>
        </div>
        <div className="p-3">
          <h3 className="text-white font-semibold text-sm mb-1 truncate">{movie.title}</h3>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{movie.year}</span>
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 mr-1" />
              <span>{movie.rating}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {movie.genre.slice(0, 2).map((g) => (
              <span key={g} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                {g}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CarouselSectionProps {
  title: string
  movies: Movie[]
  onMovieSelect: (movie: Movie) => void
}

function CarouselSection({ title, movies, onMovieSelect }: CarouselSectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  // Estimate card width + gap for scrolling calculation
  const cardWidth = 200 + 16 // min-w-[200px] + gap-4
  const containerPadding = 32 // px-4 on container, so 16px left + 16px right

  const scroll = (direction: "left" | "right") => {
    const carouselContainer = document.getElementById(`carousel-${title.replace(/\s/g, "-")}`)
    if (carouselContainer) {
      const visibleWidth = carouselContainer.offsetWidth
      const totalContentWidth = movies.length * cardWidth
      const maxScroll = Math.max(0, totalContentWidth - visibleWidth + containerPadding) // Adjust max scroll

      const scrollAmount = visibleWidth * 0.8 // Scroll by 80% of visible width
      let newPosition

      if (direction === "left") {
        newPosition = Math.max(0, scrollPosition - scrollAmount)
      } else {
        newPosition = Math.min(maxScroll, scrollPosition + scrollAmount)
      }
      setScrollPosition(newPosition)
    }
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll("left")}
            disabled={scrollPosition === 0}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scroll("right")}
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          id={`carousel-${title.replace(/\s/g, "-")}`}
          className="flex gap-4 transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelect={onMovieSelect} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface MovieCarouselProps {
  movies: Movie[]
  tvShows: Movie[]
  onMovieSelect: (movie: Movie) => void
}

export function MovieCarousel({ movies, tvShows, onMovieSelect }: MovieCarouselProps) {
  const featuredMovies = movies.filter((movie) => movie.featured)

  return (
    <div>
      <CarouselSection title="Featured Movies" movies={featuredMovies} onMovieSelect={onMovieSelect} />
      <CarouselSection title="Popular Movies" movies={movies} onMovieSelect={onMovieSelect} />
      <CarouselSection title="TV Shows" movies={tvShows} onMovieSelect={onMovieSelect} />
    </div>
  )
}
