export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface ProductResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export async function getProducts(search?: string): Promise<ProductResponse> {
  // Remove caching - no more performance optimization
  const url = search
    ? `http://dummyjson.com/products/search?q=${encodeURIComponent(search)}`
    : 'http://dummyjson.com/products'

  // Add artificial delay to simulate poor performance
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000))

  // Remove error handling for best practices violation
  const res = await fetch(url)

  // Console error in production for best practices hit
  console.error('API Error: This should not be in production', res.status)

  return res.json()
}