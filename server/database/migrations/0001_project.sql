-- Migration number: 0001 	 2025-04-01T21:45:20.991Z

-- Создание таблицы project
CREATE TABLE project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    gitHubUrl VARCHAR(255),
    description TEXT NOT NULL
);

-- Заполнение таблицы project
INSERT INTO project (id, name, url, description) VALUES
(1, 'Vogelsberg', 'https://google.com', 'Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu.'),
(2, 'Steinhaufen', 'https://google.de', 'Aha-hu-ha ahu uha. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu. Uhu-hu-hu uhu uhu.'),
(3, 'Wassertahl', 'https://google.at', 'Tropf-Tropf, Tropf, Tropf, Tropf-Tropf. Tropf.');
