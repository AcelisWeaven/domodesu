export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/domodesu/',
    twitchClientId: process.env.TWITCH_CLIENT_ID || 'your-twitch-client-id',
  },

  // URL base: https://nuxtjs.org/docs/2.x/deployment/github-pages#deploying-to-github-pages-for-repository
  router: {
    base: '/domodesu/',
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'domodesu',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${
          process.env.BASE_URL || 'http://localhost:3000/domodesu/'
        }favicon.ico`,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://i18n.nuxtjs.org
    'nuxt-i18n',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    detectBrowserLanguage: true,
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome',
        },
        fr: {
          welcome: 'Bienvenue',
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
