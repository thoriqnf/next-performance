'use client'

import { useState, useEffect, useMemo } from 'react'
import { Product, getProducts } from '@/app/lib/api'
import { ProductCard } from './ProductCard'
import { SearchBar } from './SearchBar'

interface ProductGridProps {
  initialProducts?: Product[]
}

export function ProductGrid({ initialProducts = [] }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Memoize filtered products to prevent unnecessary re-renders
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products
    return products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [products, searchQuery])

  const handleSearch = async (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setProducts(initialProducts)
      return
    }

    setLoading(true)
    try {
      const result = await getProducts(query.trim())
      setProducts(result.products)
    } catch (error) {
      console.error('Failed to search products:', error)
      // Keep current products on error
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="relative overflow-hidden bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                Next.js Performance Demo
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                Experience lightning-fast product browsing with modern optimization techniques
              </p>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-3xl font-bold">100</div>
                <div className="text-sm opacity-80">Lighthouse Score</div>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-3xl font-bold">&lt; 80KB</div>
                <div className="text-sm opacity-80">Bundle Size</div>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-3xl font-bold">&lt; 1.5s</div>
                <div className="text-sm opacity-80">First Paint</div>
              </div>
              <div className="bg-background/10 backdrop-blur-sm rounded-lg p-4 border border-border">
                <div className="text-3xl font-bold">30x</div>
                <div className="text-sm opacity-80">Faster</div>
              </div>
            </div>

            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" role="main" aria-label="Product catalog">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20" aria-label="Loading products">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-muted border-t-foreground"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-foreground opacity-20"></div>
            </div>
            <p className="mt-4 text-muted-foreground font-medium">Loading amazing products...</p>
          </div>
        ) : (
          <>
            {/* Search Results Header */}
            <div className="mb-8 flex flex-col sm:flex-row items-center justify-between bg-card rounded-lg card-shadow border border-border p-4">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-lg font-semibold text-foreground">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {filteredProducts.length > 0
                    ? `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`
                    : 'No products found'
                  }
                </p>
              </div>

              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="px-4 py-2 text-sm text-foreground hover:text-muted-foreground transition-colors duration-200"
                  aria-label="Clear search"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* No Results State */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <svg className="w-24 h-24 text-muted mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    We couldn't find any products matching "{searchQuery}". Try searching for different keywords.
                  </p>
                  <button
                    onClick={() => handleSearch('')}
                    className="px-6 py-3 bg-foreground text-background rounded-lg hover:bg-muted hover:text-foreground transition-colors duration-200"
                    aria-label="Browse all products"
                  >
                    Browse All Products
                  </button>
                </div>
              </div>
            ) : (
              /* Products Grid */
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
                role="region"
                aria-label={`Products${searchQuery ? ` matching "${searchQuery}"` : ''}`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background mt-20" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Performance Optimizations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-4xl mx-auto">
              <div className="bg-background/10 rounded-lg p-6 border border-border">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-semibold mb-2">Lightning Fast</h4>
                <p className="opacity-80 text-sm">Server Components, optimized images, and smart caching</p>
              </div>
              <div className="bg-background/10 rounded-lg p-6 border border-border">
                <div className="text-3xl mb-3">📦</div>
                <h4 className="font-semibold mb-2">Tiny Bundle</h4>
                <p className="opacity-80 text-sm">Tree-shaking, code splitting, and optimized dependencies</p>
              </div>
              <div className="bg-background/10 rounded-lg p-6 border border-border">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-semibold mb-2">User Focused</h4>
                <p className="opacity-80 text-sm">Debounced search, responsive design, accessibility</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}