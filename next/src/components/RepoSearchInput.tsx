"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface RepoSearchInputProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
}

export function RepoSearchInput({
  value = "",
  onValueChange,
  placeholder = "Search repository...",
}: RepoSearchInputProps) {
  return (
    <div className="relative w-full bg-white dark:bg-gray-800">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  )
}
