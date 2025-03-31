<script setup lang="ts">
import { type Project } from "~/types/project.types";

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <!-- Карточка для отображения проекта -->
  <article
    class="my-2 rounded-3xl shadow-lg bg-white dark:bg-gradient-to-br dark:from-blue-700 dark:to-blue-500 flex flex-col"
  >
    <!-- Заголовок карточки -->
    <ProjectCardHeader :title="props.project.name" />

    <!-- Описание проекта -->
    <ProjectCardMain :text="props.project.description" />

    <!-- Подвал карточки -->
    <ProjectCardFooter
      :url="props.project.url"
      :technologies="props.project.technologies"
      :gitHubUrl="props.project.gitHubUrl ? props.project.gitHubUrl : ''"
    />
  </article>
</template>
