// Базовый интерфейс с общими полями
export interface BaseProject {
  id?: number;
  name: string;
  url: string;
  gitHubUrl?: string;
  description: string;
}

// Интерфейс проекта с технологиями в виде массива для использования в приложении
export interface Project extends BaseProject {
  technologies: string[];
}

// Интерфейс для строки результата SQL-запроса
export interface ProjectRow extends BaseProject {
  technologies: string;
}
