"use client"
import Image from "next/image"
import { Play, Plus, ThumbsUp, Star, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import type { Movie } from "@/lib/movies-data"
import { useState } from "react"
import { VideoPlayerModal } from "./video-player-modal"

interface MovieModalProps {
  movie: Movie | null
  isOpen: boolean
  onClose: () => void
}

export function MovieModal({ movie, isOpen, onClose }: MovieModalProps) {
  const [isAddedToList, setIsAddedToList] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)

  if (!movie) return null

  const handleWatchNow = () => {
    if (movie.videoUrl) {
      setIsVideoPlayerOpen(true)
    } else {
      console.log(`No video URL available for ${movie.title}.`)
      // Optionally, show an alert or a message to the user
    }
  }

  const handleToggleMyList = () => {
    setIsAddedToList((prev) => !prev)
    console.log(`${movie.title} ${isAddedToList ? "removed from" : "added to"} My List.`)
  }

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev)
    console.log(`${movie.title} ${isLiked ? "unliked" : "liked"}.`)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl bg-gray-900 text-white border border-gray-700">
          <DialogHeader className="border-b border-gray-700">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white border-0"
            ></Button>
          </DialogHeader>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Movie Poster */}
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden">
              <Image src={movie.poster || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
            </div>

            {/* Movie Details */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span>{movie.year}</span>
                  <span>{movie.duration}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{movie.rating}/10</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">{movie.description}</p>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleWatchNow} className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now
                </Button>
                <Button
                  onClick={handleToggleMyList}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                >
                  {isAddedToList ? <Check className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                  {isAddedToList ? "Added" : "My List"}
                </Button>
                <Button
                  onClick={handleToggleLike}
                  variant="outline"
                  className={`border-gray-600 text-white hover:bg-gray-800 bg-transparent ${isLiked ? "text-yellow-500" : ""}`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {movie.videoUrl && (
        <VideoPlayerModal
          isOpen={isVideoPlayerOpen}
          onClose={() => setIsVideoPlayerOpen(false)}
          videoUrl={movie.videoUrl}
          title={movie.title}
        />
      )}
    </>
  )
}
