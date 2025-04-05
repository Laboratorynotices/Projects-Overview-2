import { ref, computed } from "vue";
import type { ProjectsApiResponse } from "~/types/api-response.types";
import { type Project } from "~/types/project.types";

export function useProjects() {
  const projects = ref<Project[]>([]);

  // Метод для загрузки из API/БД
  const fetchProjects = async () => {
    try {
      // Используем useFetch для получения данных из API
      const { data, error } = await useFetch<ProjectsApiResponse>(
        "/api/projects"
      );

      // Проверяем, что ответ успешный
      if (error.value) {
        console.error("Ошибка загрузки проектов:", error.value);
        return projects.value;
      }

      // Данные успешно загружены, обновляем состояние
      if (
        data.value &&
        data.value.success &&
        Array.isArray(data.value.results)
      ) {
        projects.value = data.value.results.map((item) => ({
          name: item.name,
          url: item.url,
          gitHubUrl: item.gitHubUrl,
          description: item.description,
          technologies: item.technologies || [],
        }));
      }

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
        projects.value.flatMap((project: Project) => project.technologies || [])
      ),
    ];
  });

  return {
    projects,
    technologies,
    fetchProjects,
  };
}
