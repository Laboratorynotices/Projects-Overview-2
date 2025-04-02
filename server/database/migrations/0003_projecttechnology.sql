-- Migration number: 0003 	 2025-04-02T08:04:08.598Z

-- Создание таблицы project_technology
CREATE TABLE project_technology (
    project_id INT NOT NULL,
    technology_id INT NOT NULL,
    PRIMARY KEY (project_id, technology_id),
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
    FOREIGN KEY (technology_id) REFERENCES technology(id) ON DELETE CASCADE
);

-- Создаем связи между проектами и технологиями
INSERT INTO project_technology (project_id, technology_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 2),
(3, 4),
(3, 2);
