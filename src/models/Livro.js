// src/models/Livro.js
const PRECO_MINIMO = 0;

class Livro {
  #preco;
  #estoque;

  constructor(titulo, autor, preco, estoque, categoria) {
    this.titulo = titulo;
    this.autor = autor;
    this.preco = preco; // Utiliza o setter para validar na construção
    this.estoque = estoque; // Utiliza o setter para validar na construção
    this.categoria = categoria;
  }

  descrever() {
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

  // Set preco com throw para proteger o model
  set preco(novoPreco) {
    if (novoPreco < PRECO_MINIMO) {
      throw new Error("Preco nao pode ser negativo");
    }
    this.#preco = novoPreco;
  }

  // Set estoque com throw padronizado
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
      id: this.id,
      titulo: this.titulo,
      autor: this.autor,
      preco: this.#preco,
      estoque: this.#estoque,
      categoria: this.categoria?.nome || this.categoria || undefined
    };
  }
}

module.exports = Livro;