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
        enabled: true, // enable sw in dev mode
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
        start_url: "/?source=pwa",
        display: "standalone",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        orientation: "portrait-primary",
        scope: ".",
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
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff2}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
          },
          {
            urlPattern: ({ request }) => request.destination === "style",
            handler: "StaleWhileRevalidate",
          },
          {
            urlPattern: ({ request }) => request.destination === "script",
            handler: "StaleWhileRevalidate",
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
          },
        ],
      },
    }),
  ],
});
