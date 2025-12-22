// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Project | Backoffice',
    }
  },
  css: [
    '~/assets/scss/app.scss',
  ],
  typescript: {
    /**
     *  Ждать пока выйдет версия 0.13, а пока чекать через команду `yarn ts`
     *  https://www.npmjs.com/package/vite-plugin-checker?activeTab=versions
     **/
    typeCheck: false,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  laravelAuth: {
    domain: 'http://backoffice-api.lsmlocal.ru',
    redirects: {
      guest: '/login',
      auth: '/'
    },
    endpoints: {
      login: 'managers/self/auth',
      logout: 'managers/self/logout',
      fetchUser: 'managers/self/detail',
      register: 'managers/self/register', // Опционально
    },
  },
  modules: [
    '@mrzlanx532/nuxt-3-laravel-auth-module',
    '@element-plus/nuxt',
    '@vue-final-modal/nuxt',
  ],
})