"use client"

import { Button } from "@/components/ui/button"
import { FolderOpen, Upload, Plus } from "lucide-react"

interface EmptyStateProps {
  onNewFolder: () => void
  onUpload: () => void
}

export function EmptyState({ onNewFolder, onUpload }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center backdrop-blur-sm border border-border/30">
          <FolderOpen className="w-12 h-12 text-primary/70" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
          <Plus className="w-4 h-4 text-primary" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-3 font-sans">This folder is empty</h3>

      <p className="text-muted-foreground text-center mb-8 max-w-md font-mono">
        Get started by uploading files or creating a new folder to organize your content.
      </p>
      <div className="flex items-center gap-4">
        <Button
          onClick={onUpload}
          className="bg-primary hover:bg-primary/90 text-foreground shadow-lg hover:shadow-xl transition-all duration-200 px-6"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>

        <Button
          onClick={onNewFolder}
          variant="outline"
          className="border-border/50 hover:bg-accent/50 px-6 bg-transparent"
        >
          <FolderOpen className="w-4 h-4 mr-2" />
          New Folder
        </Button>
      </div>
    </div>
  )
}
