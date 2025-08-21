"use client"

import { ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BreadcrumbItem {
  name: string
  path: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
  onNavigate: (path: string) => void
}

export function BreadcrumbNav({ items, onNavigate }: BreadcrumbNavProps) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onNavigate("/")}
        className="h-8 px-2 hover:bg-muted/50 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Button>

      {items.map((item, index) => (
        <div key={item.path} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground/60" />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate(item.path)}
            className={`h-8 px-2 hover:bg-muted/50 transition-colors ${
              index === items.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.name}
          </Button>
        </div>
      ))}
    </nav>
  )
}
