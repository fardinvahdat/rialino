// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  devtools: { enabled: false },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  modules: ['@nuxtjs/i18n','@pinia/nuxt','@element-plus/nuxt'],
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default 
  },

  runtimeConfig: {
      public: {
          baseURL: process.env.BASE_URL,
      },
  },

  compatibilityDate: '2025-01-05',

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})