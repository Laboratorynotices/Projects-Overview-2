-- Migration number: 0002 	 2025-04-02T07:57:10.316Z

-- Создание таблицы technology
CREATE TABLE technology (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Заполнение таблицы technologies
INSERT INTO technology (id, name) VALUES
(1, 'Vue.js'),
(2, 'html5'),
(3, 'cakephp'),
(4, 'yii2');
