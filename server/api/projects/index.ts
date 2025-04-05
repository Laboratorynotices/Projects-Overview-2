import { Project, ProjectRow } from "~/types/project.types";
import {
  ProjectsApiResponse,
  // ApiErrorResponse,
} from "~/types/api-response.types";
import type { H3Event } from "h3";

export default cachedEventHandler(
  // export default defineEventHandler(
  async (): Promise<ProjectsApiResponse> => {
    const db = hubDatabase();

    try {
      // SQL-запрос для получения проектов и связанных технологий
      const SQL_QUERY = `
        SELECT 
          p.name,
          p.url,
          p.gitHubUrl,
          p.description,
          json_group_array(t.name) AS technologies
        FROM 
          project p
        LEFT JOIN 
          project_technology pt ON p.id = pt.project_id
        LEFT JOIN 
          technology t ON pt.technology_id = t.id
        GROUP BY 
          p.id, p.name, p.url, p.gitHubUrl, p.description;
      `;

      // Выполняем SQL-запрос и получаем результаты
      const rawResults = await db.prepare(SQL_QUERY).all();

      // Распарсиваем технологии из JSON-строки в массив
      const projects: Project[] = rawResults.results.map(
        (project: ProjectRow) => ({
          ...project,
          technologies: project.technologies
            ? JSON.parse(project.technologies)
            : [], // Парсим JSON или возвращаем пустой массив
        })
      );

      return {
        results: projects,
        success: rawResults.success,
        timestamp: Date.now(),
      } as ProjectsApiResponse;
    } catch (error) {
      console.error(error);
      throw createError({
        statusCode: 500,
        message: "Database error: " + error,
      });
      /*
      // Если вы хотите вернуть ошибку в формате ApiErrorResponse, раскомментируйте следующий код
      return {
        success: false,
        error: "Database error",
        statusCode: 500,
      } as ApiErrorResponse;
      */
    }
  },
  {
    maxAge: 10 * 60, // 10 минут
    getKey: (event: H3Event) => event.path,
  }
);
