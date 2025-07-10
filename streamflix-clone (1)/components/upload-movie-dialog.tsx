"use client"

import type React from "react"

import { useState, useId } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Movie } from "@/lib/movies-data"
import Image from "next/image"

interface UploadMovieDialogProps {
  isOpen: boolean
  onClose: () => void
  onMovieAdd: (movie: Movie) => void
}

export function UploadMovieDialog({ isOpen, onClose, onMovieAdd }: UploadMovieDialogProps) {
  const idPrefix = useId()
  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [genre, setGenre] = useState("")
  const [rating, setRating] = useState("")
  const [duration, setDuration] = useState("")
  const [description, setDescription] = useState("")
  const [posterUrl, setPosterUrl] = useState("") // For external URL
  const [selectedFile, setSelectedFile] = useState<File | null>(null) // For file upload
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null) // For file preview
  const [videoUrl, setVideoUrl] = useState("") // New state for video URL
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setFilePreviewUrl(URL.createObjectURL(file)) // Create a temporary URL for preview
      setPosterUrl("") // Clear external URL if a file is selected
    } else {
      setSelectedFile(null)
      setFilePreviewUrl(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Determine which poster URL to use
    const finalPosterUrl = filePreviewUrl || posterUrl || "https://via.placeholder.com/300x450?text=No+Image"
    const finalBackdropUrl = "https://via.placeholder.com/1280x720?text=No+Image+Backdrop" // Default backdrop

    // Simulate upload and processing
    setTimeout(() => {
      const newMovie: Movie = {
        id: `uploaded-${Date.now()}`, // Unique ID
        title: title || "Untitled Movie",
        year: Number.parseInt(year) || new Date().getFullYear(),
        genre: genre
          .split(",")
          .map((g) => g.trim())
          .filter(Boolean),
        rating: Number.parseFloat(rating) || 0.0,
        duration: duration || "N/A",
        description: description || "No description provided.",
        poster: finalPosterUrl,
        backdrop: finalBackdropUrl,
        videoUrl: videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4", // Use provided URL or default
        featured: false, // Newly uploaded movies are not featured by default
      }

      onMovieAdd(newMovie)
      resetForm()
      onClose()
      setIsSubmitting(false)
    }, 1000) // Simulate network delay
  }

  const resetForm = () => {
    setTitle("")
    setYear("")
    setGenre("")
    setRating("")
    setDuration("")
    setDescription("")
    setPosterUrl("")
    setSelectedFile(null)
    if (filePreviewUrl) {
      URL.revokeObjectURL(filePreviewUrl) // Clean up the temporary URL
      setFilePreviewUrl(null)
    }
    setVideoUrl("") // Reset video URL
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-gray-900 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Upload New Movie</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add details for a new movie or TV show. Image and video uploads are simulated for the current session.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${idPrefix}-title`} className="text-right text-gray-300">
              Title
            </Label>
            <Input
              id={`${idPrefix}-title`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3 bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${idPrefix}-year`} className="text-right text-gray-300">
              Year
            </Label>
            <Input
              id={`${idPrefix}-year`}
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="col-span-3 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${idPrefix}-genre`} className="text-right text-gray-300">
              Genre (comma-separated)
            </Label>
            <Input
              id={`${idPrefix}-genre`}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="col-span-3 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${idPrefix}-rating`} className="text-right text-gray-300">
              Rating (0-10)
            </Label>
            <Input
              id={`${idPrefix}-rating`}
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="col-span-3 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${idPrefix}-duration`} className="text-right text-gray-300">
              Duration (e.g., 2h 30m)
            </Label>
            <Input
              id={`${idPrefix}-duration`}
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="col-span-3 bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${idPrefix}-description`} className="text-right text-gray-300">
              Description
            </Label>
            <Textarea
              id={`${idPrefix}-description`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          {/* File Upload Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${idPrefix}-file-upload`} className="text-right text-gray-300">
              Upload Poster
            </Label>
            <Input
              id={`${idPrefix}-file-upload`}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="col-span-3 bg-gray-800 border-gray-700 text-white file:text-white file:bg-gray-700 file:border-0 file:mr-4 file:py-1 file:px-2 file:rounded-md"
            />
          </div>

          {/* OR External URL Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${idPrefix}-poster-url`} className="text-right text-gray-300">
              Poster URL (or above)
            </Label>
            <Input
              id={`${idPrefix}-poster-url`}
              value={posterUrl}
              onChange={(e) => {
                setPosterUrl(e.target.value)
                setSelectedFile(null) // Clear file selection if URL is entered
                if (filePreviewUrl) {
                  URL.revokeObjectURL(filePreviewUrl)
                  setFilePreviewUrl(null)
                }
              }}
              placeholder="e.g., https://image.tmdb.org/t/p/w500/your-image.jpg"
              className="col-span-3 bg-gray-800 border-gray-700 text-white"
              disabled={!!selectedFile} // Disable if a file is selected
            />
          </div>

          {/* Image Preview */}
          {(filePreviewUrl || posterUrl) && (
            <div className="col-span-4 flex justify-center">
              <Image
                src={filePreviewUrl || posterUrl}
                alt="Poster Preview"
                width={150}
                height={225}
                className="rounded-md object-cover border border-gray-700"
              />
            </div>
          )}

          {/* Video URL Input */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${idPrefix}-video-url`} className="text-right text-gray-300">
              Video URL
            </Label>
            <Input
              id={`${idPrefix}-video-url`}
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="e.g., https://www.w3schools.com/html/mov_bbb.mp4"
              className="col-span-3 bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mt-4"
          >
            {isSubmitting ? "Uploading..." : "Add Movie"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
