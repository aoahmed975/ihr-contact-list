"use client"

import { Search, X } from "lucide-react"

interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  placeholder?: string
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  placeholder = "Search contacts...",
}: SearchFilterProps) {
  const clearSearch = () => {
    onSearchChange("")
  }

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#ff5f05] focus:border-[#ff5f05] text-sm"
          placeholder={placeholder}
          aria-label="Search contacts"
        />
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="Clear search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
