import { generateSW } from 'workbox-build';

generateSW({
  globDirectory: 'build',
  globPatterns: [
    '**/*.{html,js,css,png,svg,json}'
  ],
  swDest: 'build/sw.js',
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.mode === 'navigate', // Apply to navigations (e.g., HTML pages)
      handler: 'NetworkFirst',
      options: {
        cacheName: 'navigation-cache',
        plugins: [
          // Optional: Add a plugin for expiration or other features
        ]
      }
    },
    // Add more runtime caching rules for other asset types as needed
  ]
}).then(({ count, size }) => {
  console.log(`Generated service worker, which will precache ${count} files (${size} bytes).`);
});
