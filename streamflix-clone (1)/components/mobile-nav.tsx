"use client"

import Link from "next/link"
import { X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  onUploadClick?: () => void
}

export function MobileNav({ isOpen, onClose, onUploadClick }: MobileNavProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-y-0 right-0 h-full w-64 bg-gray-900 text-white border-l border-gray-700 p-6 flex flex-col z-[100] md:hidden">
        <div className="flex justify-end mb-8">
          <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="flex flex-col space-y-6 text-lg">
          <Link href="/free-movies" className="hover:text-yellow-500 transition-colors" onClick={onClose}>
            Free Movies & TV
          </Link>
          <Link href="/live-tv" className="hover:text-yellow-500 transition-colors" onClick={onClose}>
            Live TV
          </Link>
          <Link
            href="/recommendations"
            className="hover:text-purple-500 transition-colors flex items-center space-x-2"
            onClick={onClose}
          >
            <Sparkles className="w-5 h-5" />
            <span>AI Picks</span>
          </Link>
          <Link href="/features" className="hover:text-yellow-500 transition-colors" onClick={onClose}>
            Features
          </Link>
          <Link href="/download" className="hover:text-yellow-500 transition-colors" onClick={onClose}>
            Download
          </Link>
          <Link href="/signin" className="hover:text-yellow-500 transition-colors" onClick={onClose}>
            Sign In
          </Link>
          <Button
            onClick={() => {
              onUploadClick?.()
              onClose()
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md"
          >
            Upload Movie
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md mt-4"
            onClick={onClose}
          >
            Sign Up Free
          </Button>
        </nav>
      </DialogContent>
    </Dialog>
  )
}
