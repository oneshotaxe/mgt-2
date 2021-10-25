var dev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: 'spa',
  server: {
    host: '0.0.0.0',
    port: 8080
  },
  head: {
    titleTemplate: '%s',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#fff' },
  css: [
  ],
  plugins: [
    // '@plugins/app',
    // '@plugins/composition-api'
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL:  dev ? '' : 'http://151.248.126.45:8080/'
  },
  vuetify: {
  },
  build: {
    extend (config, ctx) {
    }
  }
}
