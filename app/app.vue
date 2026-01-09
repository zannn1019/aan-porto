<template>
  <div>
    <LoadingScreen @loaded="handleLoaded" />
    <Analytics />
    <CustomCursor />
    <NuxtPage :page-key="route => route.fullPath" />
  </div>
</template>

<script setup>
import { Analytics } from "@vercel/analytics/nuxt";

const isLoaded = useState('isLoaded', () => false)

const handleLoaded = () => {
  isLoaded.value = true
}

useHead({
  title: "Ahmad Fauzan - Fullstack Web Developer",
  link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  // Open Graph / Facebook
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    {
      name: "description",
      content:
        "Ahmad Fauzan - Fullstack Web Developer specializing in Nuxt.js and Laravel",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://webzan.my.id/" },
    { property: "og:title", content: "Ahmad Fauzan - Fullstack Web Developer" },
    { property: "og:description", content: "Ahmad Fauzan - Fullstack Web Developer specializing in Nuxt.js and Laravel" },
    { property: "og:image", content: "https://webzan.my.id/og-image.jpg" },

    // Twitter
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:url", content: "https://webzan.my.id/" },
    { property: "twitter:title", content: "Ahmad Fauzan - Fullstack Web Developer" },
    { property: "twitter:description", content: "Ahmad Fauzan - Fullstack Web Developer specializing in Nuxt.js and Laravel" },
    { property: "twitter:image", content: "https://webzan.my.id/og-image.jpg" },
  ],
});
</script>

<style>
/* Global styles moved to assets/css/main.css */
</style>
