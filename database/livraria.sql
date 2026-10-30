DROP DATABASE IF EXISTS livraria;
CREATE DATABASE livraria;
USE livraria;

CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL
);

INSERT INTO livros (titulo, autor, preco, estoque) VALUES
('Clean Code', 'Robert C. Martin', 89.90, 12),
('Eloquent JavaScript', 'Marijn Haverbeke', 45.00, 20),
('O Hobbit', 'J.R.R. Tolkien', 39.90, 8),
('O Senhor dos Anéis', 'J.R.R. Tolkien', 59.90, 15);

SELECT * FROM livros;
SELECT * FROM livros WHERE id = 3;