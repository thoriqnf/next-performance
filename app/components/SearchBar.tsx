'use client'

import { useState, useCallback, useRef, useEffect } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = "Search products..." }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Debounced search with useCallback to prevent unnecessary re-renders
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsTyping(true)
    timeoutRef.current = setTimeout(() => {
      onSearch(searchQuery)
      setIsTyping(false)
    }, 300) // 300ms debounce
  }, [onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSearch(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    onSearch(query)
    setIsTyping(false)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
    setIsTyping(false)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className={`relative group transition-all duration-200 ${
        isFocused ? 'scale-[1.01]' : ''
      }`}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`input-field relative w-full px-6 py-4 pl-14 pr-14 rounded-lg ${
              isFocused ? 'ring-2 ring-ring/50 ring-offset-2' : ''
            }`}
          />

          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className={`w-5 h-5 transition-colors duration-200 text-muted-foreground ${
                isFocused ? 'text-foreground' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Clear button or loading indicator */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {query ? (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 6L6 18M6 6l12 12"
                  />
                </svg>
              </button>
            ) : isTyping ? (
              <div className="w-5 h-5 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Search suggestions hint */}
        {isFocused && !query && (
          <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-card border border-border rounded-lg shadow-lg z-10 fade-in">
            <div className="text-sm">
              <div className="font-medium text-foreground mb-2">Popular searches:</div>
              <div className="flex flex-wrap gap-2">
                {['laptop', 'phone', 'watch', 'headphones', 'skincare'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term)
                      debouncedSearch(term)
                      setIsFocused(false)
                    }}
                    className="btn px-3 py-1 text-xs hover:bg-accent transition-colors duration-200"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}