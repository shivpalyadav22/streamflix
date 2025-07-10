"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  X,
  AlertCircle,
  Settings,
  Gauge,
  Bookmark,
  BookmarkPlus,
  Play,
  Trash2,
  Edit3,
  Keyboard,
  RotateCcw,
  Square,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface VideoPlayerModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  title: string
}

interface VideoBookmark {
  id: string
  timestamp: number
  title: string
  note?: string
  createdAt: Date
}

interface LoopSection {
  start: number
  end: number
  enabled: boolean
}

const PLAYBACK_SPEEDS = [
  { value: "0.25", label: "0.25x" },
  { value: "0.5", label: "0.5x" },
  { value: "0.75", label: "0.75x" },
  { value: "1", label: "Normal" },
  { value: "1.25", label: "1.25x" },
  { value: "1.5", label: "1.5x" },
  { value: "1.75", label: "1.75x" },
  { value: "2", label: "2x" },
]

const KEYBOARD_SHORTCUTS = [
  { key: "B", description: "Add bookmark at current time" },
  { key: "L", description: "Toggle loop current section" },
  { key: "Space", description: "Play/Pause video" },
  { key: "←/→", description: "Seek backward/forward 10s" },
  { key: "↑/↓", description: "Volume up/down" },
  { key: "1-5", description: "Set playback speed" },
  { key: "F", description: "Toggle fullscreen" },
  { key: "M", description: "Mute/Unmute" },
  { key: "Esc", description: "Close player" },
]

export function VideoPlayerModal({ isOpen, onClose, videoUrl, title }: VideoPlayerModalProps) {
  const [hasError, setHasError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [playbackSpeed, setPlaybackSpeed] = useState("1")
  const [showControls, setShowControls] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)
  const [bookmarks, setBookmarks] = useState<VideoBookmark[]>([])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isAddingBookmark, setIsAddingBookmark] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState<VideoBookmark | null>(null)
  const [bookmarkTitle, setBookmarkTitle] = useState("")
  const [bookmarkNote, setBookmarkNote] = useState("")
  const [shortcutFeedback, setShortcutFeedback] = useState<string | null>(null)
  const [loopSection, setLoopSection] = useState<LoopSection>({ start: 0, end: 0, enabled: false })
  const [isSettingLoop, setIsSettingLoop] = useState(false)
  const [loopStartSet, setLoopStartSet] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    if (isOpen && title) {
      const savedBookmarks = localStorage.getItem(`bookmarks_${title}`)
      if (savedBookmarks) {
        try {
          const parsed = JSON.parse(savedBookmarks).map((b: any) => ({
            ...b,
            createdAt: new Date(b.createdAt),
          }))
          setBookmarks(parsed)
        } catch (error) {
          console.error("Error loading bookmarks:", error)
        }
      }
    }
  }, [isOpen, title])

  // Save bookmarks to localStorage whenever bookmarks change
  useEffect(() => {
    if (title && bookmarks.length >= 0) {
      localStorage.setItem(`bookmarks_${title}`, JSON.stringify(bookmarks))
    }
  }, [bookmarks, title])

  // Loop functionality
  useEffect(() => {
    if (!loopSection.enabled || !videoRef.current) return

    const video = videoRef.current
    const checkLoop = () => {
      if (video.currentTime >= loopSection.end) {
        video.currentTime = loopSection.start
        showFeedback(`🔄 Looped to ${formatTime(loopSection.start)}`)
      }
    }

    video.addEventListener("timeupdate", checkLoop)
    return () => video.removeEventListener("timeupdate", checkLoop)
  }, [loopSection])

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle shortcuts if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        // Allow Enter to save bookmark when in bookmark dialog
        if (e.key === "Enter" && isAddingBookmark) {
          e.preventDefault()
          saveBookmark()
        }
        return
      }

      const video = videoRef.current
      if (!video) return

      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault()
          quickAddBookmark()
          showFeedback("Bookmark added! 📌")
          break

        case "l":
          e.preventDefault()
          handleLoopToggle()
          break

        case " ":
          e.preventDefault()
          if (video.paused) {
            video.play()
            showFeedback("Playing ▶️")
          } else {
            video.pause()
            showFeedback("Paused ⏸️")
          }
          break

        case "arrowleft":
          e.preventDefault()
          video.currentTime = Math.max(0, video.currentTime - 10)
          showFeedback("⏪ -10s")
          break

        case "arrowright":
          e.preventDefault()
          video.currentTime = Math.min(video.duration, video.currentTime + 10)
          showFeedback("⏩ +10s")
          break

        case "arrowup":
          e.preventDefault()
          video.volume = Math.min(1, video.volume + 0.1)
          showFeedback(`🔊 ${Math.round(video.volume * 100)}%`)
          break

        case "arrowdown":
          e.preventDefault()
          video.volume = Math.max(0, video.volume - 0.1)
          showFeedback(`🔉 ${Math.round(video.volume * 100)}%`)
          break

        case "1":
          e.preventDefault()
          handleSpeedChange("0.5")
          showFeedback("Speed: 0.5x")
          break

        case "2":
          e.preventDefault()
          handleSpeedChange("1")
          showFeedback("Speed: Normal")
          break

        case "3":
          e.preventDefault()
          handleSpeedChange("1.25")
          showFeedback("Speed: 1.25x")
          break

        case "4":
          e.preventDefault()
          handleSpeedChange("1.5")
          showFeedback("Speed: 1.5x")
          break

        case "5":
          e.preventDefault()
          handleSpeedChange("2")
          showFeedback("Speed: 2x")
          break

        case "f":
          e.preventDefault()
          if (document.fullscreenElement) {
            document.exitFullscreen()
            showFeedback("Exited fullscreen")
          } else {
            video.requestFullscreen()
            showFeedback("Fullscreen mode")
          }
          break

        case "m":
          e.preventDefault()
          video.muted = !video.muted
          showFeedback(video.muted ? "Muted 🔇" : "Unmuted 🔊")
          break

        case "escape":
          e.preventDefault()
          if (isAddingBookmark) {
            cancelBookmark()
          } else if (isSettingLoop) {
            cancelLoopSetting()
          } else {
            handleClose()
          }
          break

        default:
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, isAddingBookmark, currentTime, isSettingLoop, loopStartSet])

  const showFeedback = (message: string) => {
    setShortcutFeedback(message)
    setTimeout(() => setShortcutFeedback(null), 2000)
  }

  const handleLoopToggle = () => {
    if (loopSection.enabled) {
      // Disable current loop
      setLoopSection({ start: 0, end: 0, enabled: false })
      setIsSettingLoop(false)
      setLoopStartSet(false)
      showFeedback("Loop disabled 🔄❌")
    } else if (isSettingLoop) {
      if (!loopStartSet) {
        // Set loop start
        setLoopSection((prev) => ({ ...prev, start: currentTime }))
        setLoopStartSet(true)
        showFeedback(`Loop start set: ${formatTime(currentTime)} 🔄⏰`)
      } else {
        // Set loop end and enable
        if (currentTime > loopSection.start) {
          setLoopSection((prev) => ({ ...prev, end: currentTime, enabled: true }))
          setIsSettingLoop(false)
          setLoopStartSet(false)
          showFeedback(`Loop enabled: ${formatTime(loopSection.start)} - ${formatTime(currentTime)} 🔄✅`)
        } else {
          showFeedback("Loop end must be after start! ⚠️")
        }
      }
    } else {
      // Start setting loop
      setIsSettingLoop(true)
      setLoopStartSet(false)
      showFeedback("Press L again to set loop start 🔄⏰")
    }
  }

  const cancelLoopSetting = () => {
    setIsSettingLoop(false)
    setLoopStartSet(false)
    showFeedback("Loop setting cancelled")
  }

  const quickSetLoop = () => {
    // Quick loop: current time ± 30 seconds
    const start = Math.max(0, currentTime - 15)
    const end = Math.min(duration, currentTime + 15)
    setLoopSection({ start, end, enabled: true })
    showFeedback(`Quick loop: ${formatTime(start)} - ${formatTime(end)} 🔄⚡`)
  }

  const quickAddBookmark = () => {
    const newBookmark: VideoBookmark = {
      id: `bookmark_${Date.now()}`,
      timestamp: currentTime,
      title: `Quick bookmark at ${formatTime(currentTime)}`,
      createdAt: new Date(),
    }
    setBookmarks((prev) => [...prev, newBookmark].sort((a, b) => a.timestamp - b.timestamp))
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget
    let errorMsg = "Video playback failed"

    if (video.error) {
      switch (video.error.code) {
        case video.error.MEDIA_ERR_ABORTED:
          errorMsg = "Video playback was aborted"
          break
        case video.error.MEDIA_ERR_NETWORK:
          errorMsg = "Network error occurred while loading video"
          break
        case video.error.MEDIA_ERR_DECODE:
          errorMsg = "Video format not supported or corrupted"
          break
        case video.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMsg = "Video format not supported by your browser"
          break
        default:
          errorMsg = "Unknown video error occurred"
      }
    }

    console.error("Video playback error:", errorMsg, video.error)
    setErrorMessage(errorMsg)
    setHasError(true)
  }

  const handleVideoLoad = () => {
    setHasError(false)
    setErrorMessage("")
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const resetError = () => {
    setHasError(false)
    setErrorMessage("")
  }

  const handleClose = () => {
    resetError()
    setPlaybackSpeed("1")
    setShowControls(false)
    setShowBookmarks(false)
    setShowShortcuts(false)
    setIsAddingBookmark(false)
    setEditingBookmark(null)
    setCurrentTime(0)
    setDuration(0)
    setShortcutFeedback(null)
    setLoopSection({ start: 0, end: 0, enabled: false })
    setIsSettingLoop(false)
    setLoopStartSet(false)
    onClose()
  }

  const handleSpeedChange = (speed: string) => {
    setPlaybackSpeed(speed)
    if (videoRef.current) {
      videoRef.current.playbackRate = Number.parseFloat(speed)
    }
  }

  const toggleControls = () => {
    setShowControls(!showControls)
  }

  const toggleBookmarks = () => {
    setShowBookmarks(!showBookmarks)
  }

  const toggleShortcuts = () => {
    setShowShortcuts(!showShortcuts)
  }

  const startAddingBookmark = () => {
    setBookmarkTitle(`Bookmark at ${formatTime(currentTime)}`)
    setBookmarkNote("")
    setIsAddingBookmark(true)
  }

  const startEditingBookmark = (bookmark: VideoBookmark) => {
    setEditingBookmark(bookmark)
    setBookmarkTitle(bookmark.title)
    setBookmarkNote(bookmark.note || "")
    setIsAddingBookmark(true)
  }

  const saveBookmark = () => {
    if (!bookmarkTitle.trim()) return

    if (editingBookmark) {
      // Update existing bookmark
      setBookmarks((prev) =>
        prev.map((b) =>
          b.id === editingBookmark.id ? { ...b, title: bookmarkTitle.trim(), note: bookmarkNote.trim() } : b,
        ),
      )
      setEditingBookmark(null)
    } else {
      // Add new bookmark
      const newBookmark: VideoBookmark = {
        id: `bookmark_${Date.now()}`,
        timestamp: currentTime,
        title: bookmarkTitle.trim(),
        note: bookmarkNote.trim() || undefined,
        createdAt: new Date(),
      }
      setBookmarks((prev) => [...prev, newBookmark].sort((a, b) => a.timestamp - b.timestamp))
    }

    setIsAddingBookmark(false)
    setBookmarkTitle("")
    setBookmarkNote("")
  }

  const cancelBookmark = () => {
    setIsAddingBookmark(false)
    setEditingBookmark(null)
    setBookmarkTitle("")
    setBookmarkNote("")
  }

  const deleteBookmark = (bookmarkId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== bookmarkId))
  }

  const jumpToBookmark = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp
    }
  }

  // Check if the video URL is valid
  const isValidVideoUrl = videoUrl && videoUrl.trim() !== ""

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-5xl w-full h-auto bg-black text-white border border-gray-700 p-0 overflow-hidden">
        <DialogHeader className="p-3 flex flex-row items-center justify-between border-b border-gray-700">
          <DialogTitle className="text-white text-base">{title}</DialogTitle>
          <div className="flex items-center space-x-2">
            {/* Loop Controls */}
            <Button
              variant="ghost"
              size="sm"
              onClick={quickSetLoop}
              className="text-gray-400 hover:text-white"
              title="Quick Loop (±15s)"
              disabled={!isValidVideoUrl || hasError}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            {/* Keyboard Shortcuts */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleShortcuts}
              className={`text-gray-400 hover:text-white ${showShortcuts ? "text-blue-400" : ""}`}
              title="Keyboard Shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </Button>
            {/* Bookmark Controls */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleBookmarks}
              className={`text-gray-400 hover:text-white ${showBookmarks ? "text-yellow-400" : ""}`}
              title="Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={startAddingBookmark}
              className="text-gray-400 hover:text-white"
              title="Add Bookmark (B)"
              disabled={!isValidVideoUrl || hasError}
            >
              <BookmarkPlus className="w-4 h-4" />
            </Button>
            {/* Speed Controls Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleControls}
              className="text-gray-400 hover:text-white"
              title="Playback Settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
              <span className="sr-only">Close video player</span>
            </Button>
          </div>
        </DialogHeader>

        {/* Keyboard Shortcuts Panel */}
        {showShortcuts && (
          <div className="px-3 pb-3 border-b border-gray-700">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Keyboard className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-white font-semibold">Keyboard Shortcuts</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {KEYBOARD_SHORTCUTS.map((shortcut) => (
                  <div key={shortcut.key} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{shortcut.description}</span>
                    <Badge variant="outline" className="border-gray-600 text-gray-400 font-mono text-xs">
                      {shortcut.key}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Speed Controls Panel */}
        {showControls && (
          <div className="px-3 pb-3 border-b border-gray-700">
            <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">Playback Speed</span>
              </div>
              <Select value={playbackSpeed} onValueChange={handleSpeedChange}>
                <SelectTrigger className="w-24 bg-gray-700 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {PLAYBACK_SPEEDS.map((speed) => (
                    <SelectItem
                      key={speed.value}
                      value={speed.value}
                      className="text-white hover:bg-gray-700 focus:bg-gray-700"
                    >
                      {speed.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="flex">
          {/* Video Player */}
          <div className="flex-1">
            <div className="relative w-full" style={{ paddingBottom: "45%" }}>
              {!isValidVideoUrl ? (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800">
                  <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-400 text-center">No video URL provided for this movie.</p>
                  <Button onClick={handleClose} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                    Close
                  </Button>
                </div>
              ) : hasError ? (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800">
                  <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                  <p className="text-red-400 text-center mb-2">Video Error</p>
                  <p className="text-gray-400 text-center text-sm mb-4 max-w-md px-4">{errorMessage}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={resetError}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                    >
                      Try Again
                    </Button>
                    <Button onClick={handleClose} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="absolute top-0 left-0 w-full h-full">
                  <video
                    ref={videoRef}
                    key={videoUrl}
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    onError={handleVideoError}
                    onLoadStart={handleVideoLoad}
                    onCanPlay={handleVideoLoad}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    preload="metadata"
                  >
                    <p className="text-gray-400">
                      Your browser does not support the video tag.
                      <a
                        href={videoUrl}
                        className="text-yellow-500 hover:text-yellow-400 ml-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download the video instead
                      </a>
                    </p>
                  </video>

                  {/* Keyboard Shortcut Feedback */}
                  {shortcutFeedback && (
                    <div className="absolute top-4 left-4 bg-black/90 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm border border-gray-600">
                      {shortcutFeedback}
                    </div>
                  )}

                  {/* Loop Status Indicator */}
                  {(loopSection.enabled || isSettingLoop) && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-600/90 text-white px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm border border-green-500">
                      {loopSection.enabled ? (
                        <div className="flex items-center space-x-2">
                          <RotateCcw className="w-4 h-4 animate-spin" />
                          <span>
                            Loop: {formatTime(loopSection.start)} - {formatTime(loopSection.end)}
                          </span>
                          <Button
                            onClick={() => setLoopSection({ start: 0, end: 0, enabled: false })}
                            variant="ghost"
                            size="sm"
                            className="text-white hover:text-red-300 p-1 h-auto"
                          >
                            <Square className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : isSettingLoop ? (
                        <div className="flex items-center space-x-2">
                          <RotateCcw className="w-4 h-4" />
                          <span>
                            {!loopStartSet
                              ? "Press L to set loop start"
                              : `Start: ${formatTime(loopSection.start)} - Press L to set end`}
                          </span>
                          <Button
                            onClick={cancelLoopSetting}
                            variant="ghost"
                            size="sm"
                            className="text-white hover:text-red-300 p-1 h-auto"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* Speed Indicator Overlay */}
                  {playbackSpeed !== "1" && (
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                      <div className="flex items-center space-x-1">
                        <Gauge className="w-3 h-3" />
                        <span>{PLAYBACK_SPEEDS.find((s) => s.value === playbackSpeed)?.label}</span>
                      </div>
                    </div>
                  )}

                  {/* Loop Section Indicators on Timeline */}
                  {loopSection.enabled && duration > 0 && (
                    <div className="absolute bottom-16 left-0 right-0 h-2 pointer-events-none">
                      <div
                        className="absolute h-full bg-green-400/60 rounded"
                        style={{
                          left: `${(loopSection.start / duration) * 100}%`,
                          width: `${((loopSection.end - loopSection.start) / duration) * 100}%`,
                        }}
                      />
                      <div
                        className="absolute w-1 h-full bg-green-400 rounded"
                        style={{ left: `${(loopSection.start / duration) * 100}%` }}
                      />
                      <div
                        className="absolute w-1 h-full bg-green-400 rounded"
                        style={{ left: `${(loopSection.end / duration) * 100}%` }}
                      />
                    </div>
                  )}

                  {/* Bookmark Indicators on Timeline */}
                  {bookmarks.length > 0 && duration > 0 && (
                    <div className="absolute bottom-16 left-0 right-0 h-1 pointer-events-none">
                      {bookmarks.map((bookmark) => (
                        <div
                          key={bookmark.id}
                          className="absolute w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `${(bookmark.timestamp / duration) * 100}%`, top: "50%" }}
                          title={bookmark.title}
                        />
                      ))}
                    </div>
                  )}

                  {/* Quick Shortcut Hints */}
                  {!showShortcuts && (
                    <div className="absolute bottom-4 right-4 bg-black/80 text-gray-300 px-3 py-1 rounded-lg text-xs backdrop-blur-sm">
                      Press{" "}
                      <Badge variant="outline" className="border-gray-600 text-yellow-400 mx-1">
                        B
                      </Badge>{" "}
                      bookmark{" "}
                      <Badge variant="outline" className="border-gray-600 text-green-400 mx-1">
                        L
                      </Badge>{" "}
                      loop
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Speed Buttons (when controls are hidden) */}
            {!showControls && isValidVideoUrl && !hasError && (
              <div className="absolute bottom-4 left-4 flex space-x-2">
                {["0.5", "1", "1.25", "1.5", "2"].map((speed) => (
                  <Button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    variant={playbackSpeed === speed ? "default" : "outline"}
                    size="sm"
                    className={`text-xs ${
                      playbackSpeed === speed
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "border-gray-600 text-gray-300 hover:bg-gray-700 bg-black/80 backdrop-blur-sm"
                    }`}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Bookmarks Sidebar */}
          {showBookmarks && (
            <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
              <div className="p-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Bookmark className="w-5 h-5 mr-2 text-yellow-400" />
                    Bookmarks
                  </h3>
                  <span className="text-sm text-gray-400">{bookmarks.length}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Press B to quick bookmark</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {bookmarks.length === 0 ? (
                  <div className="text-center py-8">
                    <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No bookmarks yet</p>
                    <p className="text-gray-500 text-sm">Press B or click + to add</p>
                  </div>
                ) : (
                  bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="bg-gray-700 rounded-lg p-3 hover:bg-gray-600 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium text-sm line-clamp-2">{bookmark.title}</h4>
                        <div className="flex space-x-1 ml-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditingBookmark(bookmark)}
                            className="text-gray-400 hover:text-white p-1 h-auto"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBookmark(bookmark.id)}
                            className="text-gray-400 hover:text-red-400 p-1 h-auto"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 text-sm font-mono">{formatTime(bookmark.timestamp)}</span>
                        <Button
                          onClick={() => jumpToBookmark(bookmark.timestamp)}
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-2 py-1 h-auto"
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Jump
                        </Button>
                      </div>

                      {bookmark.note && <p className="text-gray-300 text-xs mt-2 line-clamp-2">{bookmark.note}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Add/Edit Bookmark Dialog */}
        {isAddingBookmark && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-96 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingBookmark ? "Edit Bookmark" : "Add Bookmark"}
              </h3>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="bookmark-title" className="text-gray-300 text-sm">
                    Title
                  </Label>
                  <Input
                    id="bookmark-title"
                    value={bookmarkTitle}
                    onChange={(e) => setBookmarkTitle(e.target.value)}
                    placeholder="Enter bookmark title"
                    className="bg-gray-700 border-gray-600 text-white mt-1"
                    autoFocus
                  />
                </div>

                <div>
                  <Label htmlFor="bookmark-note" className="text-gray-300 text-sm">
                    Note (optional)
                  </Label>
                  <Textarea
                    id="bookmark-note"
                    value={bookmarkNote}
                    onChange={(e) => setBookmarkNote(e.target.value)}
                    placeholder="Add a note about this moment..."
                    className="bg-gray-700 border-gray-600 text-white mt-1 resize-none"
                    rows={3}
                  />
                </div>

                <div className="text-sm text-gray-400">
                  Timestamp:{" "}
                  <span className="text-yellow-400 font-mono">
                    {formatTime(editingBookmark?.timestamp || currentTime)}
                  </span>
                </div>

                <div className="text-xs text-gray-500 bg-gray-700 p-2 rounded">
                  💡 Tip: Press{" "}
                  <Badge variant="outline" className="border-gray-600 text-gray-400 mx-1">
                    Enter
                  </Badge>{" "}
                  to save
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  onClick={cancelBookmark}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={saveBookmark}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black"
                  disabled={!bookmarkTitle.trim()}
                >
                  {editingBookmark ? "Update" : "Save"} Bookmark
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
