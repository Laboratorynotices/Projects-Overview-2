import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  // Подключаем модули
  modules: [
    // ESLint для проверки кода
    "@nuxt/eslint",
  ],
  // Подключаем CSS-файл
  css: ["~/assets/css/main.css"],
  // Подключаем плагин
  vite: {
    // Подключаем плагин tailwindcss
    plugins: [tailwindcss()],
  },
});
