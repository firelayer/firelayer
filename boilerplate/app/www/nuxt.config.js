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
    title: 'Firelayer.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: 'Firelayer - Jumpstart your Firebase Project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    ['@nuxtjs/pwa', {
      meta: false,
      workbox: false,
      oneSignal: false
    }]
  ],

  /**
   * Proxy
   */
  proxy,

  /**
   * Manifest
   */
  manifest: {
    name: 'Firelayer',
    'short_name': 'Firelayer',
    description: 'Firelayer - Jumpstart you Firebase Project'
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
