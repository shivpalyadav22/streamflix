"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Clock, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Channel {
  id: string
  name: string
  logo: string
  category: string
  viewers: string
  currentShow: string
  nextShow: string
  isLive: boolean
}

const channels: Channel[] = [
  {
    id: "1",
    name: "StreamFlix News",
    logo: "https://via.placeholder.com/100x60?text=NEWS",
    category: "News",
    viewers: "12.5K",
    currentShow: "Breaking News Live",
    nextShow: "Evening Report",
    isLive: true,
  },
  {
    id: "2",
    name: "StreamFlix Sports",
    logo: "https://via.placeholder.com/100x60?text=SPORTS",
    category: "Sports",
    viewers: "8.2K",
    currentShow: "Football Highlights",
    nextShow: "Basketball Tonight",
    isLive: true,
  },
  {
    id: "3",
    name: "StreamFlix Movies",
    logo: "https://via.placeholder.com/100x60?text=MOVIES",
    category: "Movies",
    viewers: "15.7K",
    currentShow: "Classic Cinema Hour",
    nextShow: "Action Movie Marathon",
    isLive: true,
  },
  {
    id: "4",
    name: "StreamFlix Kids",
    logo: "https://via.placeholder.com/100x60?text=KIDS",
    category: "Kids",
    viewers: "6.3K",
    currentShow: "Cartoon Adventures",
    nextShow: "Educational Fun",
    isLive: true,
  },
  {
    id: "5",
    name: "StreamFlix Music",
    logo: "https://via.placeholder.com/100x60?text=MUSIC",
    category: "Music",
    viewers: "4.1K",
    currentShow: "Top Hits Live",
    nextShow: "Indie Spotlight",
    isLive: false,
  },
  {
    id: "6",
    name: "StreamFlix Docs",
    logo: "https://via.placeholder.com/100x60?text=DOCS",
    category: "Documentary",
    viewers: "3.8K",
    currentShow: "Nature Wonders",
    nextShow: "History Mysteries",
    isLive: true,
  },
]

export default function LiveTVPage() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null)

  const handleWatchChannel = (channel: Channel) => {
    setSelectedChannel(channel)
    console.log(`Watching ${channel.name}`)
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
              <Link href="/free-movies" className="text-gray-300 hover:text-white transition-colors">
                Free Movies & TV
              </Link>
              <Link href="/live-tv" className="text-yellow-500 font-semibold">
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
      <section className="relative py-20 bg-gradient-to-r from-red-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Live TV Channels</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Watch live TV channels 24/7. News, sports, entertainment, and more - all completely free.
          </p>
        </div>
      </section>

      {/* Channels Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <Card key={channel.id} className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={channel.logo || "/placeholder.svg"}
                        alt={channel.name}
                        width={60}
                        height={40}
                        className="rounded bg-gray-700"
                      />
                      <div>
                        <h3 className="text-white font-semibold">{channel.name}</h3>
                        <p className="text-gray-400 text-sm">{channel.category}</p>
                      </div>
                    </div>
                    {channel.isLive && (
                      <div className="flex items-center space-x-1 bg-red-600 px-2 py-1 rounded text-xs">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>LIVE</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-white">Now: {channel.currentShow}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">Next: {channel.nextShow}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">{channel.viewers} watching</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleWatchChannel(channel)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                    disabled={!channel.isLive}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {channel.isLive ? "Watch Live" : "Coming Soon"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Channel Info */}
      {selectedChannel && (
        <section className="py-8 bg-yellow-500 text-black">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-semibold">
              Now watching: {selectedChannel.name} - {selectedChannel.currentShow}
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
