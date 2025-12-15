// Intentionally large file to bloat bundle size
export const heavyData = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  title: `Heavy Item ${i}`,
  description: `This is a heavy item description that repeats many times to increase the bundle size of the application. `.repeat(20),
  metadata: {
    createdAt: new Date().toISOString(),
    complexObject: {
      nested: {
        deep: {
          value: Math.random()
        }
      }
    },
    tags: Array.from({ length: 10 }, (_, j) => `tag-${j}`)
  }
}));
