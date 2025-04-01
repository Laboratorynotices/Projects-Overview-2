import { ref, computed } from "vue";
import { type Project } from "~/types/project.types";

export function useProjects() {
  const projects = ref<Project[]>([]);

  // Метод для загрузки из API/БД
  const fetchProjects = async () => {
    try {
      projects.value = await $fetch("/api/projects");
      return projects.value;
    } catch (error) {
      console.error("Ошибка загрузки проектов:", error);
      return [];
    }
  };

  // Вычисляемое свойство для уникальных технологий
  const technologies = computed(() => {
    return [
      ...new Set(
        projects.value.flatMap((project: Project) => project.technologies)
      ),
    ];
  });

  return {
    projects,
    technologies,
    fetchProjects,
  };
}
