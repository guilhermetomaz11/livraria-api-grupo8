class Livro {
  #preco;
  #estoque;

  constructor(titulo, autor, preco, estoque, categoria) {
    this.titulo = titulo;
    this.autor = autor;
    this.#preco = preco;
    this.#estoque = estoque;
    this.categoria = categoria;
  }

  descrever() {
    console.log("Titulo: " + this.titulo);
    console.log("Autor: " + this.autor);
    console.log("Preco: " + this.#preco);
    console.log("Estoque: " + this.#estoque + " unidades");
    console.log("Categoria: " + this.categoria.nome);
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
    if (novoPreco < 0) {
      console.log("ERRO: preco nao pode ser negativo. Valor recusado.");
      return;
    }
    this.#preco = novoPreco;
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
      titulo: this.titulo,
      autor: this.autor,
      preco: this.#preco,
      estoque: this.#estoque,
    };
  }
}

module.exports = Livro;
