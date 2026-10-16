class Categoria {
  #nome;
  #descricao;
  #totalDeLivros;

  constructor(nome, descricao) {
    this.#totalDeLivros = 0;
    this.#nome = nome;
    this.#descricao = descricao;
  }

  // ----- LEITURA (getters) -----
  get totalDeLivros() {
    return this.#totalDeLivros;
  }

  get nome() {
    return this.#nome;
  }

  get descricao() {
    return this.#descricao;
  }

  // ----- ESCRITA COM VALIDAÇÃO (setters) -----
  set nome(novoNome) {
    if (novoNome && novoNome.length < 3) {
      console.log("ERRO: o nome da categoria precisa de pelo menos 3 letras.");
      return;
    }
    this.#nome = novoNome;
  }

  // 4.1 - Set descricao com validação para permitir atualizações (PUT/PATCH)
  set descricao(novaDescricao) {
    if (novaDescricao && novaDescricao.length < 5) {
      console.log("ERRO: a descricao precisa de pelo menos 5 letras.");
      return;
    }
    this.#descricao = novaDescricao;
  }

  // ----- MÉTODOS -----
  descrever() {
    console.log("Categoria: " + this.#nome);
    console.log("Descricao: " + this.#descricao);
    console.log("Total de Livros: " + this.#totalDeLivros);
  }

  // 4.1 - ADICIONADO: Método toJSON com id na primeira linha para a API REST
  toJSON() {
    return {
      id: this.id, // Primeira linha do toJSON
      nome: this.#nome,
      descricao: this.#descricao,
      totalDeLivros: this.#totalDeLivros,
    };
  }
}

module.exports = Categoria;