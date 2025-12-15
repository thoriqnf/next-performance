import './globals.css'

// Remove all metadata for SEO degradation
export const metadata = {}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Remove lang attribute for accessibility hit
    <html>
      <head>
        {/* Add blocking external resources for poor performance */}
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.3.3/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

        {/* Add tracking scripts for performance hit */}
        <script async src="https://www.google-analytics.com/analytics.js"></script>
        <script async src="https://www.googletagmanager.com/gtag/js"></script>
      </head>
      <body>
        {children}
        {/* Add heavy inline scripts for performance hit */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Heavy computation on main thread
              const heavyComputation = () => {
                let result = 0;
                for (let i = 0; i < 100000000; i++) {
                  result += Math.sqrt(i);
                }
                return result;
              };

              // Block main thread on page load
              heavyComputation();

              // Add memory leak
              window.leakyArray = [];
              setInterval(() => {
                window.leakyArray.push(new Array(1000).fill('*'));
              }, 1000);

              console.log('Heavy scripts loaded - performance degradation active');
            `
          }}
        />
      </body>
    </html>
  )
}