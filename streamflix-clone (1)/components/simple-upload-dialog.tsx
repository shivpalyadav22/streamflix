"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Play, ImageIcon } from "lucide-react"
import Image from "next/image"
import type { Movie } from "@/lib/movies-data"

interface SimpleUploadDialogProps {
  isOpen: boolean
  onClose: () => void
  onMovieAdd: (movie: Movie) => void
}

export function SimpleUploadDialog({ isOpen, onClose, onMovieAdd }: SimpleUploadDialogProps) {
  const [title, setTitle] = useState("")
  const [selectedPoster, setSelectedPoster] = useState<File | null>(null)
  const [posterPreviewUrl, setPosterPreviewUrl] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setSelectedPoster(file)
      setPosterPreviewUrl(URL.createObjectURL(file))
    } else {
      alert("Please select an image file")
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setSelectedVideo(file)
      setVideoPreviewUrl(URL.createObjectURL(file))
    } else {
      alert("Please select a video file (MP4, MOV, AVI, etc.)")
    }
  }

  const removePoster = () => {
    if (posterPreviewUrl) {
      URL.revokeObjectURL(posterPreviewUrl)
    }
    setSelectedPoster(null)
    setPosterPreviewUrl(null)
  }

  const removeVideo = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl)
    }
    setSelectedVideo(null)
    setVideoPreviewUrl(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert("Please enter a movie title")
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const posterUrl =
        posterPreviewUrl || `https://via.placeholder.com/300x450/4A5568/FFFFFF?text=${encodeURIComponent(title)}`

      // Use uploaded video URL or fallback to a working sample video
      const videoUrl =
        videoPreviewUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

      const newMovie: Movie = {
        id: `uploaded-${Date.now()}`,
        title: title.trim(),
        year: new Date().getFullYear(),
        genre: ["Drama"],
        rating: 7.5,
        duration: "2h 0m",
        description: `${title} is a great movie to watch.`,
        poster: posterUrl,
        backdrop: "https://via.placeholder.com/1280x720/2D3748/FFFFFF?text=Backdrop",
        videoUrl: videoUrl,
        featured: false,
      }

      onMovieAdd(newMovie)
      resetForm()
      onClose()
      setIsSubmitting(false)
      alert(`"${title}" has been added! Scroll down to see it in the "Recently Uploaded Movies" section.`)
    }, 1200)
  }

  const resetForm = () => {
    setTitle("")
    removePoster()
    removeVideo()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white text-lg">Add Movie</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-300 text-sm">
              Movie Title *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter movie name"
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          {/* Poster Upload */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Poster Image</Label>

            {!selectedPoster ? (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-3 text-center">
                <ImageIcon className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePosterChange}
                  className="hidden"
                  id="poster-upload"
                />
                <Label
                  htmlFor="poster-upload"
                  className="cursor-pointer inline-block bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                >
                  Select Image
                </Label>
              </div>
            ) : (
              <div className="border border-gray-600 rounded-lg p-2 bg-gray-800">
                <div className="flex items-center space-x-2">
                  <Image
                    src={posterPreviewUrl! || "/placeholder.svg"}
                    alt="Preview"
                    width={35}
                    height={50}
                    className="rounded object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white text-xs">{selectedPoster.name}</p>
                    <p className="text-gray-400 text-xs">{formatFileSize(selectedPoster.size)}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removePoster}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Video Upload */}
          <div className="space-y-2">
            <Label className="text-gray-300 text-sm">Movie Video</Label>

            {!selectedVideo ? (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-3 text-center">
                <Play className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <Input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" id="video-upload" />
                <Label
                  htmlFor="video-upload"
                  className="cursor-pointer inline-block bg-purple-700 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
                >
                  Select Video
                </Label>
                <p className="text-xs text-gray-500 mt-1">MP4, MOV, AVI supported</p>
              </div>
            ) : (
              <div className="border border-gray-600 rounded-lg p-2 bg-gray-800">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-xs">{selectedVideo.name}</p>
                    <p className="text-gray-400 text-xs">{formatFileSize(selectedVideo.size)}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeVideo}
                    className="text-gray-400 hover:text-white p-1"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Info Note */}
          <div className="bg-gray-800 p-2 rounded text-xs text-gray-400">
            <strong>Auto-filled:</strong> Year: {new Date().getFullYear()} • Genre: Drama • Rating: 7.5/10
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            {isSubmitting ? "Uploading..." : "Add Movie"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
