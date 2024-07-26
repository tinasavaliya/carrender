// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 
  devtools: { enabled: true },
  // modules: ["@nuxtjs/tailwindcss", "@nuxt/image"]
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@nuxt/image",
    "@vueuse/nuxt"
]

})