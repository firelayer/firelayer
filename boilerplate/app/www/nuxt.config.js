const config = JSON.parse(process.env.www || '{}')
const isProd = process.env.NODE_ENV === 'production'

// Proxy configurations for local development
const proxy = isProd ? {} : {
  '/api': {
    target: `http://localhost:5000/${config.firebase.projectId}/api`
  }
}

export default {
  generate: { fallback: true },
  mode: 'universal',
  dev: !isProd,
  srcDir: 'src/',
  /**
   * Environment
   */
  env: {
    config: process.env.www || {}
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'TheCompany',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: 'TheCompany - A new awesome service' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@500;600;700&display=swap' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#1976d2' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles/global.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/firebase.js'
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    ['@nuxtjs/vuetify', {
      customVariables: ['~/assets/styles/vuetify'],
      optionsPath: '~/config/vuetify.options.js',
      treeShake: true
    }]
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['@nuxtjs/pwa', {
      meta: false,
      workbox: false,
      oneSignal: false
    }],
    ['nuxt-i18n', {
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected'
      },
      locales: [{
        code: 'en',
        name: 'English',
        file: 'en-US.js'
      }, {
        code: 'pt',
        name: 'Português',
        file: 'pt-PT.js'
      }],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en'
      }
    }],
    '@nuxtjs/sitemap'
  ],

  /**
   * Proxy
   */
  proxy,

  /**
   * Inject SCSS variables globally
   */
  styleResources: {
    scss: [
      '~/assets/styles/vuetify/_index.scss'
    ]
  },

  sitemap: {
    hostname: config.firebase.authDomain,
    gzip: true,
    exclude: [
      '/_static/'
    ]
  },

  /**
   * Manifest file
   */
  manifest: {
    name: 'Firelayer',
    'short_name': 'Firelayer',
    description: 'Firelayer - Jumpstart you Firebase Web Project'
  },

  /*
  ** Build configuration
  */
  build: {
    publicPath: '/_static/',
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) { }
  }
}
