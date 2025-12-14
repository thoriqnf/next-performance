import { ProductGrid } from './components/ProductGrid'
import { getProducts } from './lib/api'

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Next.js Performance Demo",
  "description": "Experience lightning-fast product browsing with modern Next.js optimization techniques. Achieving perfect 100/100 Lighthouse scores.",
  "url": "https://localhost:3000",
  "applicationCategory": "DevelopmentApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "Performance Demo"
  },
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 30,
    "itemListElement": Array.from({ length: 30 }, (_, i) => ({
      "@type": "Product",
      "position": i + 1,
      "name": `Product ${i + 1}`,
      "category": "Electronics"
    }))
  }
}

// Server Component - optimal for performance
export default async function Home() {
  // Fetch data on the server for optimal performance
  const initialProducts = await getProducts()

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
      <ProductGrid initialProducts={initialProducts.products} />
    </>
  )
}