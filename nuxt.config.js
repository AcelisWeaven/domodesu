import i18n from './config/i18n'

const baseUrl = process.env.BASE_URL || 'http://localhost:3000/domodesu/'
const twitchClientId = process.env.TWITCH_CLIENT_ID || 'your-twitch-client-id'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  env: {
    baseUrl,
    twitchClientId,
  },

  // URL base: https://nuxtjs.org/docs/2.x/deployment/github-pages#deploying-to-github-pages-for-repository
  router: {
    base: '/domodesu/',
    middleware: ['auth'],
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
        href: `${baseUrl}favicon.ico`,
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
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    headers: {
      common: {
        'Client-ID': twitchClientId,
      },
    },
  },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    detectBrowserLanguage: true,
    vueI18n: i18n,
  },

  auth: {
    strategies: {
      twitch: {
        scheme: '~/schemes/twitchScheme',
        endpoints: {
          authorization: 'https://id.twitch.tv/oauth2/authorize',
          token: 'https://id.twitch.tv/oauth2/validate',
          userInfo: 'https://api.twitch.tv/helix/users',
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 60 * 60 * 24 * 60,
        },
        responseType: 'token',
        grantType: 'authorization_code',
        redirectUri: `${baseUrl}login`,
        clientId: twitchClientId,
        scope: [],
        state: 'UNIQUE_AND_NON_GUESSABLE',
      },
    },
    plugins: ['@/plugins/authLangRedirect'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
