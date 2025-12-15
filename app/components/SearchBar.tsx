'use client'

import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = "Search products..." }: SearchBarProps) {
  const [query, setQuery] = useState('')

  // Remove debouncing - make API calls on every keystroke for poor performance
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    // Immediate API call without debounce - performance anti-pattern
    onSearch(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder={placeholder}
            // Remove accessibility - no label for input
            className="input-field relative w-full px-6 py-4 pl-14 pr-14 rounded-lg"
            // Add inline styles for poor performance and accessibility
            style={{
              backgroundColor: '#cccccc',
              color: '#666666',
              fontSize: '14px'
            }}
          />

          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              className="w-5 h-5"
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

          {/* Clear button */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {query ? (
              <button
                type="button"
                onClick={handleClear}
                className="p-1"
                // Remove aria-label for accessibility hit
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
            ) : null}
          </div>
        </div>
      </div>
    </form>
  )
}