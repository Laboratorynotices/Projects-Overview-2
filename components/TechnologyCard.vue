<script setup lang="ts">
import { computed } from "vue";

// Получаем данные от "родительского" элемента.
const props = defineProps({
  technology: String,
  mode: {
    type: String,
    default: "TechnologiesSection",
  },
});

// В зависимости от "родительского" элемента выбираем набор классов.
const divClass = computed(() =>
  props.mode == "TechnologiesSection"
    ? "rounded-full my-2 border-4 border-blue-700 shadow-xl"
    : "w-6 first:mr-5"
);

// Генерируем путь к файлу с лого технологией. При этом пробел заменяем на минус.
const technologyImagePath = computed(
  () => "img/technologies/" + props.technology?.replace(" ", "-") + ".svg"
);
</script>

<template>
  <!-- Логотипы технологий должны быть .svg-формата и иметь такое же имя, которое у технологии -->
  <!-- Обёртка вокруг отдельного логотипа -->
  <div :class="divClass">
    <!-- Отображение самих логотипов -->
    <div
      class="rounded-full aspect-square bg-no-repeat bg-center bg-contain bg-white dark:bg-gradient-to-br dark:from-blue-700 dark:to-blue-500 h-full"
      :style="'background-image: url(' + technologyImagePath + ')'"
      :title="technology"
    />
  </div>
</template>
