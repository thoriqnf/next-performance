'use client'

import { useState, useEffect } from 'react'
import { ProductGrid } from './components/ProductGrid'
import { getProducts } from './lib/api'
import moment from 'moment'
import _ from 'lodash'
import $ from 'jquery'

// Import heavy libraries to increase bundle size
import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Client-side only fetching for poor performance
    const fetchProducts = async () => {
      try {
        // Add artificial delay and make it client-side only
        await new Promise(resolve => setTimeout(resolve, 1000))
        const data = await getProducts()
        setProducts(data.products)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    // Add memory leak - never cleaned up interval
    const interval = setInterval(() => {
      // Force re-renders for poor performance
      setProducts(prev => [...prev])
    }, 500)

    // Heavy computation on every render
    const heavyArray = new Array(10000).fill(0).map(() => Math.random() * 1000)
    const sorted = _.sortBy(heavyArray)
    console.log('Heavy computation result:', sorted[0])

    return () => {
      // Don't clear interval for memory leak
    }
  }, [])

  if (loading) {
    return <div className="text-center p-8">Loading...</div>
  }

  return (
    <>
      {/* Remove structured data for SEO hit */}
      <ProductGrid initialProducts={products} />
    </>
  )
}