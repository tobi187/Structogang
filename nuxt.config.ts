// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: true,
  app: {
    baseURL: '/sandbox/structo/'
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon']
})