<script setup lang="ts">
import { type Project } from "~/types/project.types";
import { useProjects } from "~/composables/useProjects";

// Задаём метаданные страницы для SEO
useSeoMeta({
  title: "Projektliste",
  /*
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
  */
});

// Используем наш composable
const { projects, technologies, fetchProjects } = useProjects();

// Загружаем проекты при монтировании компонента
onMounted(async () => {
  await fetchProjects();
});
</script>

<template>
  <ApplicationHeader />
  <ApplicationDescription />
  <TechnologiesSection :technologies="technologies" />
  <ProjectsSection :projects="projects" />
  <ApplicationFooter />
  <ApplicationControlPanel />
</template>
