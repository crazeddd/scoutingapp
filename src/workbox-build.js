import { generateSW } from "workbox-build";

generateSW({
    globDirectory: 'build',
    globPatterns: [
        '**/*.{html,js,css,png,svg,json}'
    ],
    swDest: 'build/sw.js',
    clientsClaim: true,
    skipWaiting: true,
}).then(({ count, size }) => {
    console.log(`Generated service worker, which will precache ${count} files (${size} bytes).`);
});
