import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    "src": "./src",
  },
  dir: {
    public: "../public"
  },
  srcDir: './src',
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  css: [
    "~/assets/styles/styles.scss",
    "~/assets/styles/tailwind.css",
  ],
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
    importTheme: { from: '~/themes/primeVue.ts' },
    components: {
      include: "*"   
    }
  },
})
