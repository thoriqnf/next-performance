# Next.js Performance Demo

A comprehensive demonstration of performance optimization techniques in Next.js 16, showcasing the dramatic differences between optimized and un-optimized implementations.

## 🚀 Project Overview

This demo features two versions of the same application - a product search and grid interface using the DummyJSON API:

- **Optimized Version** (`main` branch): Lighthouse score 100+
- **Un-optimized Version** (`ugly` branch): Lighthouse score <50

## 📊 Performance Comparison

| Metric | Optimized | Un-optimized | Improvement |
|--------|-----------|---------------|-------------|
| Bundle Size | ~80KB | ~2.5MB | 30x smaller |
| Build Time | 2.0s | 4.8s | 2.4x faster |
| Lighthouse Score | 100+ | <50 | 2x+ better |
| First Contentful Paint | <1.5s | >4s | 3x faster |

## 🏗️ Quick Start

### Clone and Setup
```bash
git clone <repository-url>
cd react-performance
npm install
```

### View Optimized Version
```bash
git checkout main
npm run dev
# Open http://localhost:3000
```

### View Un-optimized Version
```bash
git checkout ugly
npm run dev
# Open http://localhost:3000
```

## 📈 Bundle Analysis

View detailed bundle analysis reports:

```bash
# Optimized version
git checkout main
npm run analyze
open analyze/main-optimized.html

# Un-optimized version
git checkout ugly
npm run analyze
open analyze/ugly-unoptimized.html
```

## 🎯 Demo Script

1. **Start with ugly version** to show poor performance:
   ```bash
   git checkout ugly
   npm run dev
   # Run Lighthouse audit - expect score <50
   ```

2. **Switch to optimized version**:
   ```bash
   git checkout main
   npm run dev
   # Run Lighthouse audit - expect score 100
   ```

3. **Compare bundle sizes**:
   ```bash
   npm run analyze
   # View the dramatic size differences
   ```

## 🔍 Performance Features

### Optimized Version (main branch)
✅ **Server Components** - SSR for initial data fetching
✅ **Image Optimization** - WebP/AVIF formats with lazy loading
✅ **Code Splitting** - Dynamic imports and tree shaking
✅ **Efficient Caching** - 1-hour revalidation
✅ **Debounced Search** - 300ms debounce prevents unnecessary API calls
✅ **React.memo** - Component optimization
✅ **Bundle Analysis** - Regular performance monitoring

### Un-optimized Version (ugly branch)
❌ **Heavy Dependencies** - axios, moment, lodash, jquery, bootstrap, chart.js
❌ **No Debouncing** - Immediate API calls on every keystroke
❌ **Client-Side Only** - No SSR benefits
❌ **Memory Leaks** - Uncleaned intervals and event listeners
❌ **Large Images** - Unoptimized with no lazy loading
❌ **Inline Styles** - Expensive re-renders on every change
❌ **Sequential API Calls** - Waterfall requests
❌ **No Compression** - Disabled gzip/brotli

## 📁 Project Structure

```
react-performance/
├── analyze/                    # Bundle analysis reports
│   ├── main-optimized.html    # Optimized version analysis
│   ├── ugly-unoptimized.html  # Un-optimized version analysis
│   └── comparison.md          # Detailed comparison
├── app/                       # Next.js app directory
│   ├── components/            # React components
│   ├── lib/                  # Utility functions
│   └── globals.css           # Global styles
├── main (branch)             # Optimized version
└── ugly (branch)             # Un-optimized version
```

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run analyze    # Generate bundle analysis report
npm run lint       # Run ESLint
```

## 🎓 Learning Objectives

This demo demonstrates:

1. **Performance Impact**: How optimization choices affect user experience
2. **Bundle Analysis**: Using webpack-bundle-analyzer to identify issues
3. **Best Practices**: Server Components, image optimization, caching
4. **Anti-Patterns**: Common mistakes that hurt performance
5. **Measurement**: Lighthouse scoring and Core Web Vitals

## 🚨 Anti-Patterns Demonstrated

The `ugly` branch intentionally includes:

- **Bundle Bloat**: Large libraries for simple tasks
- **No Optimization**: Disabled Next.js performance features
- **Memory Leaks**: Uncleaned resources
- **Inefficient Rendering**: Unnecessary re-renders and computations
- **Poor Data Fetching**: Sequential API calls without caching
- **Heavy Assets**: Unoptimized images and resources

## ✅ Best Practices Demonstrated

The `main` branch showcases:

- **Server Components**: Leveraging SSR for performance
- **Image Optimization**: Modern formats and lazy loading
- **Code Splitting**: Efficient bundle management
- **Smart Caching**: Appropriate cache strategies
- **Efficient State**: Proper React optimization patterns
- **Performance Monitoring**: Bundle analysis and optimization

## 📚 Related Resources

- [Next.js Performance Documentation](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Auditing](https://developer.chrome.com/docs/lighthouse/)
- [Core Web Vitals](https://web.dev/vitals/)

---

**Perfect for**: Development teams, performance workshops, and learning optimization techniques in modern web applications.