"use client"

import { useState } from "react"
import { FileIcon } from "./file-icon"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Download, Share, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FileItem {
  id: string
  name: string
  type: "folder" | "image" | "document" | "audio" | "video" | "archive" | "file"
  size?: string
  modified: string
  shared: boolean
  url?: string
}

interface FileListItemProps {
  item: FileItem
  onOpen: (item: FileItem) => void
  viewMode: "list" | "grid"
}

export function FileListItem({ item, onOpen, viewMode }: FileListItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (item.type === "folder") {
      onOpen(item)
    } else if (item.url) {
      window.open(item.url, "_blank")
    }
  }

  if (viewMode === "grid") {
    return (
      <div
        className={`group flex flex-col p-4 rounded-lg border border-border/50 transition-all duration-200 cursor-pointer aspect-square ${
          isHovered
            ? "bg-card/80 shadow-lg shadow-black/20 border-border transform translate-y-[-1px]"
            : "bg-card/40 hover:bg-card/60"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center flex-1 space-y-3">
          <div
            className={`p-4 rounded-lg transition-colors ${
              item.type === "folder" ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
            }`}
          >
            <FileIcon type={item.type} className="w-8 h-8" />
          </div>

          <div className="text-center w-full">
            <h3 className="font-medium text-foreground truncate font-sans text-sm">{item.name}</h3>
            <div className="flex flex-col items-center space-y-1 text-xs text-muted-foreground font-mono mt-1">
              {item.size && <span>{item.size}</span>}
              <span>{item.modified}</span>
              {item.shared && <span className="text-primary text-xs font-medium">Shared</span>}
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 absolute top-2 right-2"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {item.url && (
              <DropdownMenuItem onClick={() => window.open(item.url, "_blank")}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <Share className="w-4 h-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )
  }

  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-lg border border-border/50 transition-all duration-200 cursor-pointer ${
        isHovered
          ? "bg-card/80 shadow-lg shadow-black/20 border-border transform translate-y-[-1px]"
          : "bg-card/40 hover:bg-card/60"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <div
          className={`p-2 rounded-md transition-colors ${
            item.type === "folder" ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
          }`}
        >
          <FileIcon type={item.type} className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground truncate font-sans">{item.name}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground font-mono">
            {item.size && <span>{item.size}</span>}
            <span>{item.modified}</span>
            {item.shared && <span className="text-primary text-xs font-medium">Shared</span>}
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {item.url && (
            <DropdownMenuItem onClick={() => window.open(item.url, "_blank")}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Share className="w-4 h-4 mr-2" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
