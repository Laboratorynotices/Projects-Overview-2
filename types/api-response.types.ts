/**
 * Типы для стандартизированных ответов API
 * @module types/api-response
 */

import type { Project } from "~/types/project.types";

/**
 * Базовый интерфейс для всех API-ответов
 * @interface
 * @property {boolean} success - Индикатор успешности запроса
 * @property {string} [message] - Опциональное сообщение для клиента
 * @property {number} [timestamp] - Временная метка ответа (мс с эпохи Unix)
 */
export interface BaseApiResponse {
  success: boolean;
  message?: string;
  timestamp?: number;
}

/**
 * Успешный ответ API с данными
 * @interface
 * @template T - Тип возвращаемых данных
 * @extends BaseApiResponse
 * @property {T} results - Основные данные ответа
 * @property {true} success - Индикатор успешности (true)
 */
export interface ApiResponse<T = any> extends BaseApiResponse {
  results: T;
  success: true;
}

/**
 * Ответ с ошибкой
 * @interface
 * @extends BaseApiResponse
 * @property {string} error - Описание ошибки
 * @property {number} [statusCode] - HTTP статус код ошибки
 * @property {false} success - Индикатор успешности (false)
 */
export interface ApiErrorResponse extends BaseApiResponse {
  error: string;
  statusCode?: number;
  success: false;
}

/**
 * Специализированный тип для ответа с проектами
 * @typedef {ApiResponse<Project[]>} ProjectsApiResponse
 */
export type ProjectsApiResponse = ApiResponse<Project[]>;
