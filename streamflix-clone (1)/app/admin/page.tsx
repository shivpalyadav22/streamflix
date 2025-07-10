"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Shield, Users, Film, BarChart3, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SimpleUploadDialog } from "@/components/simple-upload-dialog"
import { moviesData, tvShowsData, type Movie } from "@/lib/movies-data"
// import { RevenueDashboard } from "@/components/revenue-dashboard"

export default function AdminPage() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [uploadedMovies, setUploadedMovies] = useState<Movie[]>([])

  const handleMovieAdd = (newMovie: Movie) => {
    setUploadedMovies((prev) => [...prev, newMovie])
  }

  const totalMovies = moviesData.length + uploadedMovies.length
  const totalTVShows = tvShowsData.length
  const totalContent = totalMovies + totalTVShows

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
              <span className="text-xl font-bold">StreamFlix Admin</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                Back to Site
              </Link>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
                <Shield className="w-4 h-4 mr-2" />
                Admin Panel
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Admin Dashboard */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your StreamFlix content and platform</p>
          </div>

          {/* Stats Cards - Only 4 unique cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Total Movies</CardTitle>
                <Film className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{totalMovies}</div>
                <p className="text-xs text-gray-400">
                  {uploadedMovies.length > 0 ? `+${uploadedMovies.length} uploaded` : "Available to stream"}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">TV Shows</CardTitle>
                <BarChart3 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{totalTVShows}</div>
                <p className="text-xs text-gray-400">Active series</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
                <Users className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">12,543</div>
                <p className="text-xs text-gray-400">+2.5% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">Monthly Views</CardTitle>
                <TrendingUp className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">1.2M</div>
                <p className="text-xs text-gray-400">+15.3% this month</p>
              </CardContent>
            </Card>
          </div>

          {/* Content Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload New Content */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Content Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Upload New Movie
                </Button>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                    Manage Movies
                  </Button>
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                    Manage TV Shows
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recently Uploaded */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recently Uploaded</CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedMovies.length > 0 ? (
                  <div className="space-y-3">
                    {uploadedMovies.slice(-5).map((movie) => (
                      <div key={movie.id} className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{movie.title}</p>
                          <p className="text-gray-400 text-xs">
                            {movie.year} • {movie.genre.join(", ")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Film className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No movies uploaded yet</p>
                    <p className="text-gray-500 text-sm">Upload your first movie to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                View Analytics
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                User Management
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                Content Reports
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent">
                System Settings
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SimpleUploadDialog
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onMovieAdd={handleMovieAdd}
      />
    </div>
  )
}
