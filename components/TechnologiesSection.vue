<script setup lang="ts">
// Правильно типизированные пропсы
const props = defineProps<{
  technologies: string[];
}>();
</script>

<template>
  <!-- Задний фон блока -->
  <section
    id="technologiesSection"
    class="bg-gradient-to-br from-blue-700 to-blue-500 dark:from-blue-300 dark:to-blue-100 drop-shadow-2xl"
  >
    <!-- Основное поле блока будет посередине с неким отступом -->
    <div
      class="container mx-auto grid grid-cols-4 gap-8 py-16 md:py-20 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12"
    >
      <!-- Вызов данных по отдельности. -->
      <TechnologyCard
        v-for="(technology, index) in props.technologies"
        :key="index"
        :technology="technology"
        mode="TechnologiesSection"
      />
    </div>
  </section>
</template>
