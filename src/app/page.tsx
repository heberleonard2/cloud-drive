"use client"

import { useState } from "react"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { FileListItem } from "@/components/file-list-item"
import { UploadButton } from "@/components/upload-button"
import { NewFolderModal } from "@/components/new-folder-modal"
import { EmptyState } from "@/components/empty-state"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"


 interface FileItem {
  id: string
  name: string
  type: "folder" | "image" | "document" | "audio" | "video" | "archive" | "file"
  size?: string
  modified: string
  shared: boolean
  url?: string
}

// Mock data
const mockFiles = {
  "/": [
    {
      id: "1",
      name: "Documents",
      type: "folder" as const,
      modified: "2 days ago",
      shared: false,
    },
    {
      id: "2",
      name: "Photos",
      type: "folder" as const,
      modified: "1 week ago",
      shared: true,
    },
    {
      id: "3",
      name: "Project Proposal.pdf",
      type: "document" as const,
      size: "2.4 MB",
      modified: "3 hours ago",
      shared: false,
      url: "https://example.com/proposal.pdf",
    },
    {
      id: "4",
      name: "Presentation.pptx",
      type: "document" as const,
      size: "15.2 MB",
      modified: "1 day ago",
      shared: true,
      url: "https://example.com/presentation.pptx",
    },
    {
      id: "5",
      name: "Budget_2024.xlsx",
      type: "document" as const,
      size: "890 KB",
      modified: "5 days ago",
      shared: false,
      url: "https://example.com/budget.xlsx",
    },
  ],
  "/Documents": [
    {
      id: "6",
      name: "Meeting Notes.docx",
      type: "document" as const,
      size: "45 KB",
      modified: "2 hours ago",
      shared: false,
      url: "https://example.com/notes.docx",
    },
    {
      id: "7",
      name: "Contract.pdf",
      type: "document" as const,
      size: "1.2 MB",
      modified: "1 day ago",
      shared: true,
      url: "https://example.com/contract.pdf",
    },
  ],
  "/Photos": [
    {
      id: "8",
      name: "Vacation",
      type: "folder" as const,
      modified: "2 weeks ago",
      shared: false,
    },
    {
      id: "9",
      name: "Profile.jpg",
      type: "image" as const,
      size: "2.1 MB",
      modified: "3 days ago",
      shared: false,
      url: "https://example.com/profile.jpg",
    },
  ],
} as Record<string, FileItem[]>



export default function CloudDrive() {
  const [currentPath, setCurrentPath] = useState("/")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false)

  const currentFiles = mockFiles[currentPath] ?? []

  const breadcrumbItems =
    currentPath === "/"
      ? []
      : currentPath
          .split("/")
          .filter(Boolean)
          .map((segment, index, array) => ({
            name: segment,
            path: "/" + array.slice(0, index + 1).join("/"),
          }))

  const handleFileOpen = (item: typeof currentFiles[0]) => {
    if (item.type === "folder") {
      const newPath = currentPath === "/" ? `/${item.name}` : `${currentPath}/${item.name}`
      setCurrentPath(newPath)
    }
  }

  const handleCreateFolder = (name: string) => {
    // Mock folder creation
    alert(`Folder "${name}" created successfully!`)
  }

  const handleFileUpload = () => {
    alert("File upload functionality would be implemented here")
  }

 

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-foreground font-sans">CloudDrive</h1>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-border/50 rounded-md">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className="border-r border-border/50"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>

              <UploadButton onNewFolder={() => setIsNewFolderModalOpen(true)} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <BreadcrumbNav items={breadcrumbItems} onNavigate={setCurrentPath} />

        {currentFiles.length === 0 ? (
          <EmptyState onNewFolder={() => setIsNewFolderModalOpen(true)} onUpload={handleFileUpload} />
        ) : (
          <div>
            {viewMode === "list" ? (
              <div className="space-y-2">
                {currentFiles.map((file) => (
                  <FileListItem key={file.id} item={file} onOpen={handleFileOpen} viewMode="list" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {currentFiles.map((file) => (
                  <FileListItem key={file.id} item={file} onOpen={handleFileOpen} viewMode="grid" />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <NewFolderModal
        isOpen={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  )
}
