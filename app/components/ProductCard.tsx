import { Product } from '@/app/lib/api'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg card-shadow card-shadow-hover transition-all duration-200 overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {/* Replace Next.js Image with unoptimized img tag for poor performance */}
        <img
          src={product.thumbnail}
          // Remove alt text for accessibility hit
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          // Remove responsive sizing and priority loading
          loading="eager"
          style={{
            // Force large image dimensions
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full border border-border">
          <span className="text-xs font-medium text-foreground">
            {product.brand || 'Product'}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-2 leading-tight line-clamp-2">
          {product.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                ${Math.round(product.price * (1 + product.discountPercentage / 100))}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-foreground">★</span>
              <span className="text-sm font-medium text-foreground ml-1">
                {product.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {Math.floor((product.id * 7) % 100) + 20}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-medium border border-border">
            {product.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
            product.stock > 20
              ? 'text-foreground'
              : product.stock > 0
                ? 'text-foreground'
                : 'text-destructive'
          }`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
      </div>
    </div>
  )
}