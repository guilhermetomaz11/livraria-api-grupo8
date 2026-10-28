// src/models/Livro.js
const PRECO_MINIMO = 0;

class Livro {
  #preco;
  #estoque;
  #id; // Adicionado ID privado para consistência

  constructor(titulo, autor, preco, estoque, categoria) {
    this.titulo = titulo;
    this.autor = autor;
    this.preco = preco; 
    this.estoque = estoque; 
    this.categoria = categoria;
    this.#id = null; // Inicializa vazio até o service atribuir
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = Number(novoId);
  }

  descrever() {
    console.log("Id: " + this.#id);
    console.log("Titulo: " + this.titulo);
    console.log("Autor: " + this.autor);
    console.log("Preco: " + this.#preco);
    console.log("Estoque: " + this.#estoque + " unidades");
    console.log("Categoria: " + (this.categoria?.nome || this.categoria || "Nenhuma"));
  }

  valorEmEstoque() {
    return this.preco * this.estoque;
  }

  get preco() {
    return this.#preco;
  }

  get estoque() {
    return this.#estoque;
  }

  set preco(novoPreco) {
    if (novoPreco < PRECO_MINIMO) {
      throw new Error("Preco nao pode ser negativo");
    }
    this.#preco = novoPreco;
  }

  set estoque(novoEstoque) {
    if (novoEstoque < 0) {
      throw new Error("Estoque nao pode ser negativo");
    }
    this.#estoque = novoEstoque;
  }

  vender(quantidade) {
    if (quantidade > this.#estoque) {
      console.log("ERRO: estoque insuficiente.");
      return;
    }
    this.#estoque = this.#estoque - quantidade;
    console.log("Venda registrada. Restam " + this.#estoque + " unidades.");
  }

  toJSON() {
    return {
      id: this.#id, // Retorna o ID numérico correto
      titulo: this.titulo,
      autor: this.autor,
      preco: this.#preco,
      estoque: this.#estoque,
      categoria: this.categoria?.nome || this.categoria || undefined
    };
  }
}

module.exports = Livro;
