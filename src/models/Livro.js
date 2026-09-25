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
    // Verificação para não quebrar caso a categoria seja passada como string ou vazia nos testes
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

  // Set preco (Já estava no seu código original)
  set preco(novoPreco) {
    if (novoPreco < 0) {
      console.log("ERRO: preco nao pode ser negativo. Valor recusado.");
      return;
    }
    this.#preco = novoPreco;
  }

  // ADICIONADO: Set estoque (Exigência obrigatória do checklist da atividade)
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
      titulo: this.titulo,
      autor: this.autor,
      preco: this.#preco,
      estoque: this.#estoque,
      categoria: this.categoria?.nome || this.categoria || undefined
    };
  }
}

// Simulando o array/banco de dados com dados iniciais fictícios para os testes funcionarem
const livrosConst = [
  new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", 49.90, 10, { nome: "Fantasia" }),
  new Livro("1984", "George Orwell", 34.90, 5, { nome: "Distopia" })
];

// Exportando a classe e o array simulado para o livroService usar
module.exports = { Livro, livrosConst };
