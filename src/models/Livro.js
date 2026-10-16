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

  // Set preco
  set preco(novoPreco) {
    if (novoPreco < 0) {
      console.log("ERRO: preco nao pode ser negativo. Valor recusado.");
      return;
    }
    this.#preco = novoPreco;
  }

  // Set estoque
  set estoque(novoEstoque) {
    if (novoEstoque < 0) {
      console.log("ERRO: estoque nao pode ser negativo. Valor recusado.");
      return;
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
      id: this.id, // ID na primeira linha para a API REST
      titulo: this.titulo,
      autor: this.autor,
      preco: this.#preco,
      estoque: this.#estoque,
      categoria: this.categoria?.nome || this.categoria || undefined
    };
  }
}

// Exportação simples da classe para coincidir com o require do livroService
module.exports = Livro;