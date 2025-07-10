"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MovieModal } from "@/components/movie-modal"
import { moviesData, tvShowsData, type Movie } from "@/lib/movies-data"

export default function FreeMoviesPage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGenre, setSelectedGenre] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const allContent = [...moviesData, ...tvShowsData]

  // Get unique genres
  const genres = Array.from(new Set(allContent.flatMap((item) => item.genre)))

  // Filter content based on search and genre
  const filteredContent = allContent.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = selectedGenre === "all" || item.genre.includes(selectedGenre)
    return matchesSearch && matchesGenre
  })

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold">StreamFlix</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/free-movies" className="text-yellow-500 font-semibold">
                Free Movies & TV
              </Link>
              <Link href="/live-tv" className="text-gray-300 hover:text-white transition-colors">
                Live TV
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
              <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                <Link href="/signup">Sign Up Free</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-purple-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Free Movies & TV Shows</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover thousands of movies and TV shows completely free. No subscription required.
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search movies and TV shows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-white">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="bg-gray-800 border-gray-700"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="bg-gray-800 border-gray-700"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="mb-4">
            <p className="text-gray-400">
              Showing {filteredContent.length} results
              {searchQuery && ` for "${searchQuery}"`}
              {selectedGenre !== "all" && ` in ${selectedGenre}`}
            </p>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredContent.map((item) => (
                <div key={item.id} className="group cursor-pointer" onClick={() => handleMovieSelect(item)}>
                  <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-2">
                    <Image
                      src={item.poster || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                        Watch Now
                      </Button>
                    </div>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1 truncate">{item.title}</h3>
                  <p className="text-gray-400 text-xs">
                    {item.year} • {item.rating}/10
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => handleMovieSelect(item)}
                >
                  <div className="relative w-20 h-28 rounded overflow-hidden flex-shrink-0">
                    <Image src={item.poster || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {item.year} • {item.duration} • {item.rating}/10
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {item.genre.slice(0, 3).map((genre) => (
                        <span key={genre} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2">{item.description}</p>
                  </div>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black self-center">Watch Now</Button>
                </div>
              ))}
            </div>
          )}

          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No movies or TV shows found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      <MovieModal movie={selectedMovie} isOpen={!!selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  )
}
