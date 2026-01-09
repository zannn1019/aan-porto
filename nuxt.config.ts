// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],

  // Runtime configuration
  runtimeConfig: {
    // Private keys (server-side only)
    web3formsAccessKey: '', // Set via WEB3FORMS_ACCESS_KEY env variable
    // Public keys (exposed to client)
    public: {
      siteUrl: 'http://webzan.my.id'
    }
  },

  // Enable SSG (Static Site Generation)
  ssr: true,

  // Deployment configuration
  app: {
    // Use root path for Vercel/Netlify, '/portfolio/' for GitHub Pages
    baseURL: '/',
    buildAssetsDir: 'assets',
    head: {
      htmlAttrs: {

        modules: [
          '@nuxtjs/tailwindcss'
        ],

        css: [
          'assets/css/main.css'
        ],

        // Deployment configuration
        app: {
          // Use root path for Vercel/Netlify, '/portfolio/' for GitHub Pages
          baseURL: '/',
          head: {
            htmlAttrs: {
              lang: 'en'
            },
          },
        }
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },

  // Target static for deployment
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },

  // SEO & Performance
  experimental: {
    payloadExtraction: false
  },

  // Enable compression
  routeRules: {
    '/': { prerender: true }
  }
})