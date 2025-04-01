import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  // Подключаем модули
  modules: [
    // ESLint для проверки кода
    "@nuxt/eslint",
    // NuxtHub для хостинга, базы данных и других сервисов
    "@nuxthub/core",
  ],
  // Подключаем CSS-файл
  css: ["~/assets/css/main.css"],
  // Настройки плагина NuxtHub
  hub: {
    // Активируем кэширование для NuxtHub
    cache: true,
    // Активируем D1 SQL Database от Cloudflare
    database: true,
  },
  // Разрешаем использовать SSR (Server-Side Rendering)
  ssr: true,
  // Подключаем плагин
  vite: {
    // Подключаем плагин tailwindcss
    plugins: [tailwindcss()],
  },
});
