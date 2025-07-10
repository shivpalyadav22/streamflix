import Link from "next/link"
import { Globe, Grid3X3, DollarSign, Smartphone, Play, Download, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function FeaturesPage() {
  const features = [
    {
      icon: Globe,
      title: "Works Worldwide",
      description: "Access StreamFlix from anywhere in the world. No geographical restrictions.",
      color: "text-pink-500",
      bgColor: "bg-pink-100",
    },
    {
      icon: Grid3X3,
      title: "Thousands of Titles",
      description: "Huge library of movies, TV shows, documentaries, and live TV channels.",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: DollarSign,
      title: "Always 100% Free",
      description: "No subscription fees, no hidden costs. Completely free forever.",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      icon: Smartphone,
      title: "Device-Friendly",
      description: "Watch on any device - phone, tablet, laptop, smart TV, or desktop.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      icon: Play,
      title: "Instant Streaming",
      description: "No downloads required. Start watching immediately with one click.",
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      icon: Download,
      title: "Offline Viewing",
      description: "Download content to watch later without an internet connection.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your privacy is protected. No personal information required.",
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized streaming with minimal buffering and fast load times.",
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
  ]

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
              <Link href="/features" className="text-yellow-500 font-semibold">
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
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Powerful Features</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover what makes StreamFlix the best free streaming platform in the world.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-700 transition-colors">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 ${feature.bgColor} rounded-full flex items-center justify-center`}
                  >
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Watching?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join millions of users who are already enjoying free movies and TV shows on StreamFlix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              <Link href="/signup">Sign Up Free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black bg-transparent"
            >
              <Link href="/free-movies">Browse Movies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
