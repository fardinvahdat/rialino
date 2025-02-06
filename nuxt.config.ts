// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  typescript: {
    tsConfig: {
      exclude: ['../service-worker'],
    },
  },

  devtools: { enabled: true },

  nitro: {
    prerender: {
      routes: ['/'],
    },
  },

  modules: ['@vite-pwa/nuxt','@nuxtjs/i18n','@pinia/nuxt','@element-plus/nuxt'],
  i18n: {
    vueI18n: './i18n.config.ts' // if you are using custom path, default 
  },

  pwa: {
    // strategies: 'injectManifest',
    // srcDir: 'service-worker',
    // filename: 'sw.ts',
    // registerType: 'prompt',
    // injectRegister: false,

    // pwaAssets: {
    //   disabled: false,
    //   config: true,
    // },

    // manifest: {
    //   name: 'rialino',
    //   short_name: 'rialino',
    //   description: 'rialino',
    //   theme_color: '#ffffff',
    // },

    // injectManifest: {
    //   globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    // },

    // devOptions: {
    //   enabled: false,
    //   suppressWarnings: true,
    //   navigateFallback: '/',
    //   navigateFallbackAllowlist: [/^\/$/],
    //   type: 'module',
    // },

    // registerWebManifestInRouteRules: true,

    // client: {
    //   installPrompt: true,
    // },
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