DROP DATABASE IF EXISTS livraria;
CREATE DATABASE livraria;
USE livraria;

<<<<<<< HEAD
=======
-- Criação da tabela categorias (deve vir antes de livros)
CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(200)
);

-- Criação da tabela livros com chave estrangeira
>>>>>>> e54e1ae851734f9db68530d905ce1c7c7a5a27b8
CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categorias (id)
);

-- Carga inicial de categorias
INSERT INTO categorias (nome, descricao) VALUES
('Ficção', 'Romances, fantasia e ficção científica'),
('Tecnologia', 'Programação, engenharia de software e afins');

-- Carga inicial de livros vinculados às categorias
INSERT INTO livros (titulo, autor, preco, estoque, categoria_id) VALUES
('Clean Code', 'Robert C. Martin', 89.90, 12, 2),
('Eloquent JavaScript', 'Marijn Haverbeke', 45.00, 20, 2),
('O Hobbit', 'J.R.R. Tolkien', 39.90, 8, 1);

SELECT * FROM livros;
