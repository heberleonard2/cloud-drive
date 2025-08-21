import { File, Folder, ImageIcon, FileText, Music, Video, Archive } from "lucide-react"

interface FileIconProps {
  type: "folder" | "image" | "document" | "audio" | "video" | "archive" | "file"
  className?: string
}

export function FileIcon({ type, className = "w-5 h-5" }: FileIconProps) {
  const iconMap = {
    folder: Folder,
    image: ImageIcon,
    document: FileText,
    audio: Music,
    video: Video,
    archive: Archive,
    file: File,
  }

  const Icon = iconMap[type]
  return <Icon className={className} />
}
