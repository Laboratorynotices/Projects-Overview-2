import { Project } from "~/types/project.types";
import {
  ProjectsApiResponse,
  // ApiErrorResponse,
} from "~/types/api-response.types";
import type { H3Event } from "h3";

export default cachedEventHandler(
  async (): Promise<ProjectsApiResponse> => {
    const db = hubDatabase();

    try {
      // SQL-запрос для получения проектов и связанных технологий
      const SQL_QUERY = `
        SELECT 
          p.id,
          p.name,
          p.url,
          p.github_url AS "gitHubUrl",
          p.description,
          COALESCE(
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', t.id,
                'name', t.name
              )
            ) FILTER (WHERE t.id IS NOT NULL),
            '[]'::JSON
          ) AS technologies
        FROM 
          project p
        LEFT JOIN 
          project_technology pt ON p.id = pt.project_id
        LEFT JOIN 
          technology t ON pt.technology_id = t.id
        GROUP BY 
          p.id
        ORDER BY 
          p.id;
      `;
      // Выполняем SQL-запрос и получаем результаты
      const projects: Project[] = await db.prepare(SQL_QUERY).all();

      return {
        results: projects,
        success: true,
        timestamp: Date.now(),
      } as ProjectsApiResponse;
    } catch (error) {
      console.error(error);
      throw createError({ statusCode: 500, message: "Database error" });
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
    maxAge: 60 * 60, // 1 час
    getKey: (event: H3Event) => event.path,
  }
);
