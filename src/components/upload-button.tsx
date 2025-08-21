"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Plus, FolderPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface UploadButtonProps {
  onNewFolder?: () => void
}

export function UploadButton({ onNewFolder }: UploadButtonProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = () => {
    setIsUploading(true)
    // Mock upload process
    setTimeout(() => {
      setIsUploading(false)
      alert("Files uploaded successfully!")
    }, 2000)
  }

  const handleFolderCreate = () => {
    if (onNewFolder) {
      onNewFolder()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 font-medium px-6"
          disabled={isUploading}
        >
          <Plus className="w-4 h-4 mr-2" />
          {isUploading ? "Uploading..." : "New"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 z-50">
        <DropdownMenuItem onClick={handleFolderCreate}>
          <FolderPlus className="w-4 h-4 mr-2" />
          New Folder
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleFileUpload}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
