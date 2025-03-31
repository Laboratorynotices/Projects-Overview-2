<script setup lang="ts">
import { type Project } from "~/types/project.types";

const props = defineProps<{
  projects: Project[];
}>();
</script>

<template>
  <!-- Задний фон блока -->
  <section id="projectsSection" class="bg-gray-50 dark:bg-slate-700">
    <!-- Основное поле блока будет посередине с неким отступом -->
    <div
      class="container mx-auto grid grid-cols-1 gap-8 py-16 md:py-20 md:grid-cols-2"
    >
      <!-- Вызов данных по отдельности. -->
      <ProjectCard
        v-for="(project, index) in props.projects"
        :key="index"
        :project="project"
      />
    </div>
  </section>
</template>
