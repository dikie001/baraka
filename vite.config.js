import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        short_name: "Quizzy",
        name: "Quizzy - Smart Revision Quizzes",
        description:
          "Your ultimate revision buddy with smart quizzes across subjects!",
        icons: [
          {
            src: "/icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        crossorigin: "use-credentials",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        orientation: "portrait-primary",
        scope: "/",
        id: "/",
        lang: "en",
        dir: "ltr",
        prefer_related_applications: false,
        related_applications: [],
        screenshots: [
          {
            src: "/screenshots/shot1.jpg",
            type: "image/png",
            sizes: "1280x720",
            label: "Quizzy Notes Interface",
          },
          {
            src: "/screenshots/shot2.jpg",
            type: "image/png",
            sizes: "1280x720",
            label: "Inbuilt Baraka AI Assistant",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff2,mp3,ogg,wav}"],
        navigateFallback: "/",
        runtimeCaching: [
          // 🧠 App Shell
          {
            urlPattern: ({ request }) => request.mode === "navigate",
            handler: "NetworkFirst",
            options: {
              cacheName: "pages-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          // 🎨 Styles
          {
            urlPattern: ({ request }) => request.destination === "style",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "styles-cache",
            },
          },
          // 🧠 Scripts
          {
            urlPattern: ({ request }) => request.destination === "script",
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "scripts-cache",
            },
          },
          // 🖼️ Images
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          // 🔊 Audio
          {
            urlPattern: ({ request }) =>
              ["audio"].includes(request.destination),
            handler: "CacheFirst",
            options: {
              cacheName: "audio-assets",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          // 🌐 API (optional)
          {
            urlPattern: /^https:\/\/baraka-bozes.vercel.app\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: true,
  },
});
