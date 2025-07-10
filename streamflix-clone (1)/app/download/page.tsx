"use client"
import Link from "next/link"
import { Download, Smartphone, Monitor, Tv, Tablet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function DownloadPage() {
  const platforms = [
    {
      name: "Android",
      icon: Smartphone,
      description: "Download for Android phones and tablets",
      version: "Version 2.1.0",
      size: "45 MB",
      requirements: "Android 6.0+",
      downloadUrl: "#",
    },
    {
      name: "iOS",
      icon: Smartphone,
      description: "Download for iPhone and iPad",
      version: "Version 2.1.0",
      size: "52 MB",
      requirements: "iOS 12.0+",
      downloadUrl: "#",
    },
    {
      name: "Windows",
      icon: Monitor,
      description: "Download for Windows PC",
      version: "Version 2.1.0",
      size: "120 MB",
      requirements: "Windows 10+",
      downloadUrl: "#",
    },
    {
      name: "macOS",
      icon: Monitor,
      description: "Download for Mac computers",
      version: "Version 2.1.0",
      size: "115 MB",
      requirements: "macOS 10.15+",
      downloadUrl: "#",
    },
    {
      name: "Smart TV",
      icon: Tv,
      description: "Available on smart TV app stores",
      version: "Version 2.0.5",
      size: "80 MB",
      requirements: "Android TV 7.0+",
      downloadUrl: "#",
    },
    {
      name: "Tablet",
      icon: Tablet,
      description: "Optimized for tablet experience",
      version: "Version 2.1.0",
      size: "48 MB",
      requirements: "Android 6.0+ / iOS 12.0+",
      downloadUrl: "#",
    },
  ]

  const handleDownload = (platform: string) => {
    console.log(`Downloading StreamFlix for ${platform}`)
    // In a real app, this would trigger the actual download
    alert(`Download started for ${platform}`)
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
              <Link href="/live-tv" className="text-gray-300 hover:text-white transition-colors">
                Live TV
              </Link>
              <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </Link>
              <Link href="/download" className="text-yellow-500 font-semibold">
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
      <section className="relative py-20 bg-gradient-to-r from-green-900 to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Download StreamFlix</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Take your entertainment with you. Download StreamFlix on all your devices and watch anywhere, anytime.
          </p>
        </div>
      </section>

      {/* Download Options */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <platform.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{platform.name}</h3>
                      <p className="text-gray-400 text-sm">{platform.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6 text-sm text-gray-400">
                    <p>Version: {platform.version}</p>
                    <p>Size: {platform.size}</p>
                    <p>Requirements: {platform.requirements}</p>
                  </div>

                  <Button
                    onClick={() => handleDownload(platform.name)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download for {platform.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Download StreamFlix?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get the best streaming experience with our native apps designed for each platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Download className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Offline Viewing</h3>
              <p className="text-gray-400">Download movies and shows to watch without internet connection.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Better Performance</h3>
              <p className="text-gray-400">Native apps provide smoother playback and better user experience.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Tv className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Big Screen Ready</h3>
              <p className="text-gray-400">Optimized for TVs and large screens with remote control support.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
