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
  const url = search
    ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`
    : 'https://dummyjson.com/products'

  const res = await fetch(url, {
    next: {
      revalidate: 3600, // Cache for 1 hour
      tags: ['products']
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch products')
  }

  return res.json()
}