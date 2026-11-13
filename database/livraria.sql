DROP DATABASE IF EXISTS livraria;
CREATE DATABASE livraria;
USE livraria;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  descricao VARCHAR(255)
);

CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  autor VARCHAR(100) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  estoque INT NOT NULL DEFAULT 0,
  categoria_id INT NULL,
  CONSTRAINT fk_livros_categoria
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
);

INSERT INTO categorias (nome, descricao) VALUES
('Ficção', 'Romances, fantasia e ficção científica'),
('Tecnologia', 'Programação, engenharia de software e afins'),
('História', 'Livros para crianças'),
('Negócios', 'Administração, finanças e empreendedorismo');

INSERT INTO livros (titulo, autor, preco, estoque, categoria_id) VALUES
('Clean Code', 'Robert C. Martin', 89.90, 12, 2),
('Eloquent JavaScript', 'Marijn Haverbeke', 45.00, 20, 2),
('O Hobbit', 'J.R.R. Tolkien', 39.90, 8, 1),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 29.90, 10, 3),
('Arquitetura Limpa', 'Robert C. Martin', 94.50, 15, 2),
('1984', 'George Orwell', 34.90, 18, 1),
('Pai Rico, Pai Pobre', 'Robert Kiyosaki', 49.90, 14, 4),
('A Revolução dos Bichos', 'George Orwell', 27.90, 22, 1);

SELECT livros.titulo, categorias.nome
FROM livros
JOIN categorias ON livros.categoria_id = categorias.id;