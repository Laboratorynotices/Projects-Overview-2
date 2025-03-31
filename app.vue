<script setup lang="ts">
import { type Project } from "~/types/project.types";

const projects = ref<Project[]>([
  {
    name: "Vogelsberg",
    url: "https://google.com",
    description:
      "Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. ",
    technologies: ["Vue.js", "html5"],
  },
  {
    name: "Steinhaufen",
    url: "https://google.de",
    description:
      "Aha-hu-ha ahu uha. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. ",
    technologies: ["cakephp", "html5"],
  },
  {
    name: "Wassertahl",
    url: "https://google.at",
    description: "Tropf-Tropf, Tropf, Tropf, Tropf-Tropf. Tropf.",
    technologies: ["yii2", "html5"],
  },
]);

// Получение уникального списка технологий с использованием map() и reduce()
const technologiesOld: string[] = projects.value
  // Сначала проходим по массиву проектов и вытаскиваем из него массивы технологий
  .map((project: Project) => {
    // Вытягиваем массивы с технологиями из списка проектов.
    return project.technologies;
    // На выходе получаются двухмерные массивы технологий.
  })
  .reduce((accumulator: string[], current: string[]) => {
    // Переделываем двухмерный массив в одномерный, но более длинный
    return accumulator.concat(current);
    // На выходе получается одномерный массив с технологиями, но значения могут быть двойными
  }, [])
  .reduce((accumulator: string[], current: string) => {
    // Избавляемся от двойных значений в массиве

    // Проверка есть ли это значение уже в результате
    if (accumulator.includes(current)) {
      // Да, нынешний элемент уже находится в списке.
      // Ничего не делаем, просто возвращаем аккамулятор.
      return accumulator;
    } else {
      // Этого значения ещё нет в списке,
      // Добавляем его в список.
      return [...accumulator, current];
    }

    // На выходе получается список технологий без повторений.
  }, []);

// Вычисляемое свойство для уникальных технологий
const technologies: ComputedRef<string[]> = computed(() => {
  return [
    ...new Set(
      projects.value.flatMap((project: Project) => project.technologies)
    ),
  ];
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
