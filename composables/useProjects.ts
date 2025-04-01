import { ref, computed } from "vue";
import { type Project } from "~/types/project.types";

export function useProjects() {
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

  // В будущем здесь будет метод для загрузки из API/БД
  const fetchProjects = async () => {
    try {
      // projects.value = await $fetch('/api/projects')
      // Пока используем моковые данные
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
