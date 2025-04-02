<script setup lang="ts">
import { ref } from "@vue/reactivity";

/*
Управление тёмной темой
*/
// Иконка для обозначения тёмной темы
const ICON_DARK_THEME: string =
  "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" as const;
// Иконка для обозначения обычной темы
const ICON_NORMAL_THEME: string =
  "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" as const;

// Флаг, тёмная ли тема.
const appDarkTheme = ref(false);

const iconData = ref(ICON_DARK_THEME);

/**
 * Функция, вызываемая @onclick(), переключающая тёмную и нормальную тему.
 */
function toggleDarkTheme() {
  // Переключаем значение флага
  appDarkTheme.value = !appDarkTheme.value;

  // Добавляем или убираем класс "dark" к тегу <html>
  if (appDarkTheme.value) {
    // Включаем тёмную тему
    document.querySelector("html")?.classList.add("dark");
    // Меняем иконку на "солнышко"
    iconData.value = ICON_NORMAL_THEME;
  } else {
    // Включаем обычную тему
    document.querySelector("html")?.classList.remove("dark");
    // Меняем иконку на "луну"
    iconData.value = ICON_DARK_THEME;
  }
}
</script>

<template>
  <div
    class="fixed right-0 bottom-1/3 bg-gradient-to-br from-blue-700 to-blue-500 dark:from-blue-300 dark:to-blue-100 drop-shadow-xl rounded-l-3xl border-2 border-r-0 border-black dark:border-white"
  >
    <div
      class="cursor-pointer rounded-full aspect-square m-2 p-1 bg-white dark:bg-gradient-to-br dark:from-blue-700 dark:to-blue-500"
      @click="toggleDarkTheme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-16 h-16 sm:w-10 sm:h-10"
      >
        <path stroke-linecap="round" stroke-linejoin="round" :d="iconData" />
      </svg>
    </div>
  </div>
</template>
