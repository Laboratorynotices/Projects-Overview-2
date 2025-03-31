// Определяем интерфейс для проекта
export interface Project {
  name: string;
  url: string;
  gitHubUrl?: string;
  description: string;
  technologies: string[];
}
