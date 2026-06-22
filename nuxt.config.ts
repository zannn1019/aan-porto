// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // 1. Keep Tailwind CSS module active
  modules: ['@nuxtjs/tailwindcss'],

  // 2. Global CSS files
   css: ['~~/assets/css/main.css'],

  // Runtime configuration
  runtimeConfig: {
    // Private keys (server-side only)
    web3formsAccessKey: '', // Set via WEB3FORMS_ACCESS_KEY env variable
    // Public keys (exposed to client)
    public: {
      siteUrl: 'http://webzan.my.id'
    }
  },

  // Enable true Server-Side Rendering (SSR)
  ssr: true,

  // FIXED: Cleaned up the accidentally duplicated and nested blocks here
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en'
      }
    }
  },

  // FIXED: Removed preset: 'static' so Nitro defaults to 'node-server' (SSR mode)
  nitro: {
    // By leaving this blank, Nuxt automatically builds the Node SSR environment
  },

  // SEO & Performance
  experimental: {
    payloadExtraction: false
  }
})
