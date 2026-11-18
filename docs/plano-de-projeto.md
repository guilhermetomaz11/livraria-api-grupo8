# Plano de Projeto — API de Gestão da Livraria

**Grupo:** Grupo 8  
**Versão:** 1.0  
**Integrantes:** Guilherme Tomaz Camara (`@guilhermetomaz11`)
Heloisa Gigliott Soroca (`@heloisasoroca-ai`)
Isabela Ferreira da Silva (`@isafrsilva`) 
**Turma / Unidade:** 1-2026-SESI_DEV_OC_1 Osvaldo Cruz
**Data:** 06/11/2026  


---

## 1. Visão geral

O projeto **API de Gestão da Livraria** tem como objetivo desenvolver o sistema de *back-end* responsável por gerenciar o catálogo de livros (físicos e digitais) e suas respectivas categorias para uma livraria.

Atualmente, o controle de acervo da livraria demanda padronização e segurança na manipulação de registros, evitando falhas de integridade e erros de entrada de dados. Para resolver esse problema, a solução fornece uma interface de programação de aplicações (**API** — *Application Programming Interface*) no padrão **REST** (*Representational State Transfer*), permitindo que sistemas clientes cadastrem, consultem, filtrem, atualizem e removam livros e categorias de forma segura, padronizada e íntegra.

---

## 2. Metodologia

Para conduzir o desenvolvimento dentro do prazo acadêmico e acomodar evoluções estruturais do código, o grupo adotou uma **abordagem ágil baseada no framework Scrum**, adaptada ao contexto de equipe enxuta de 3 integrantes.

**Justificativa da escolha:** Como os requisitos de negócio da livraria evoluíram por blocos incrementais (desde a modelagem orientada a objetos até a refatoração para a arquitetura MVC/Services e tratamento centralizado de erros), ciclos curtos (Sprints) permitem entregas funcionais contínuas e mitigam falhas acumuladas na integração final.

O trabalho está organizado da seguinte forma:
* **Sprints quinzenais (2 semanas):** Cada ciclo encerra com uma entrega funcional testada e validada via Postman.
* **Gestão visual (Kanban):** Todas as demandas são convertidas em *issues* no **GitHub Projects**, divididas nas colunas *Backlog*, *To Do*, *In Progress*, *In Review* e *Done*.
* **Controle de versão e rodízio:** As responsabilidades técnicas são distribuídas por bloco com rodízio entre os participantes, utilizando *branches* individuais e *Pull Requests* antes do *merge* na branch principal (`main`).

---

## 3. Escopo

Esta seção delimita o que será entregue pelo projeto, o que fica explicitamente fora desta versão, as condições assumidas e os critérios para aceite final.

### 3.1. Escopo incluído
* Estruturação do banco de dados relacional MySQL com integridade referencial entre categorias e livros.
* Arquitetura em camadas (**MVC / Services**) contemplando rotas (`routes`), controladores (`controllers`), regras de negócio (`services`), modelos de domínio (`models`) e middlewares (`middlewares`).
* Desenvolvimento de API RESTful com operações completas de **CRUD** (*Create, Read, Update, Delete*) para **Livros** e **Categorias**.
* Funcionalidade de busca e filtragem de livros por título, autor e categoria.
* Middleware centralizado de tratamento de erros (`src/middlewares/tratarErros.js`) cobrindo indisponibilidade do banco (`503`), limites de tamanho de dados (`400`), JSON mal formatado (`400`) e erros internos (`500`).
* Coleção de testes automatizados/manuais no Postman (`postman/livraria.postman_collection.json`) e documentação técnica de planejamento.

### 3.2. Escopo excluído
* **Interface gráfica de usuário (Front-end Web ou Mobile):** O projeto contempla exclusivamente a camada de serviços (*back-end*).
* **Módulo de fechamento de pedidos e pagamentos:** As classes `Pedido` e `ItemPedido` permanecem apenas no diagrama UML de referência e não fazem parte das rotas entregues nesta etapa.
* **Relatórios gerenciais em PDF/Excel:** Exportação de documentos financeiros *(removido formalmente do backlog para manter o foco no catálogo e respeitar o teto de 60 horas)*.

### 3.3. Premissas e restrições
* **Premissas:** Todos os integrantes possuem ambiente local configurado com Node.js, MySQL, Postman e Git; o repositório no GitHub (`https://github.com/guilhermetomaz11/livraria-api-grupo8`) permanece acessível a todos os membros.
* **Restrições tecnológicas:** A API deve ser desenvolvida obrigatoriamente utilizando **Node.js**, framework **Express** e banco de dados **MySQL**, realizando a comunicação com o banco por meio do driver **`mysql2` com consultas SQL puras** (sem uso de ORMs como Sequelize ou Prisma).
* **Restrições de prazo e custo:** O esforço total de desenvolvimento não deve ultrapassar 60 horas técnicas, respeitando o teto orçamentário definido.

### 3.4. Critérios de aceitação
* Todas as rotas previstas nos requisitos funcionais devem responder corretamente aos métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`) retornando payloads em formato **JSON**.
* Falhas de conexão com o banco ou dados inválidos devem ser interceptados pelo middleware `tratarErros.js`, retornando códigos HTTP semânticos sem derrubar o servidor.
* O código-fonte deve estar versionado no GitHub sem exposição de credenciais sensíveis (uso de `.env` ignorado no `.gitignore`).

---

## 4. Requisitos

Os requisitos do sistema estão divididos entre **Requisitos Funcionais (RF)**, que descrevem as funcionalidades que a API deve oferecer, e **Requisitos Não-Funcionais (RNF)**, que estabelecem restrições técnicas e padrões de qualidade.

### 4.1. Requisitos funcionais

A tabela abaixo apresenta os requisitos funcionais da API da livraria, seus respectivos códigos de rastreabilidade e os critérios necessários para validação.

| Código | Descrição | Critério de aceitação |
| :--- | :--- | :--- |
| **RF001** | **Cadastrar livro:** O sistema deve permitir o cadastro de um novo livro contendo título, autor, ISBN, preço, estoque e ID da categoria (`POST /livros`). | Retorna status `201 Created` com os dados do livro criado em JSON; retorna `400 Bad Request` caso campos obrigatórios estejam ausentes ou excedam o tamanho suportado. |
| **RF002** | **Listar e consultar livros:** O sistema deve permitir listar todos os livros cadastrados (`GET /livros`) e consultar um livro específico pelo seu ID (`GET /livros/:id`). | Retorna status `200 OK` com a lista ou objeto do livro; retorna `404 Not Found` caso o ID informado não exista no banco. |
| **RF003** | **Buscar e filtrar livros:** O sistema deve permitir filtrar livros por parâmetros de consulta (*query params*) como título, autor ou categoria (`GET /livros?titulo=...&categoria_id=...`). | Retorna status `200 OK` apenas com os registros que correspondem aos filtros informados, ou lista vazia `[]` caso não haja correspondência. |
| **RF004** | **Atualizar e remover livro:** O sistema deve permitir atualizar os dados de um livro existente (`PUT /livros/:id`) e excluí-lo do catálogo (`DELETE /livros/:id`). | Retorna status `200 OK` (ou `204 No Content` na exclusão) após persistir a alteração no MySQL; retorna `404 Not Found` para IDs inexistentes. |
| **RF005** | **Gerenciar categorias de livros:** O sistema deve permitir criar (`POST /categorias`), listar (`GET /categorias`), atualizar (`PUT /categorias/:id`) e excluir (`DELETE /categorias/:id`) categorias. | Operações CRUD funcionam corretamente retornando JSON; impede a exclusão de categorias vinculadas a livros ativos (retornando status `409 Conflict` ou `400 Bad Request`). |

### 4.2. Requisitos não-funcionais

A tabela a seguir especifica os requisitos não-funcionais que orientam a arquitetura, a resiliência e a manutenibilidade da aplicação.

| Código | Categoria | Descrição | Critério de aceitação |
| :--- | :--- | :--- | :--- |
| **RNF001** | Arquitetura MVC/Services | A API deve ser implementada em **Node.js** com **Express**, separando responsabilidades entre `routes`, `controllers`, `services`, `models` e `middlewares`. | Código organizado conforme a árvore de diretórios do projeto, sem consultas SQL misturadas nas rotas. |
| **RNF002** | Persistência de Dados | Os dados devem ser armazenados em banco relacional **MySQL**, utilizando exclusivamente o driver **`mysql2`** com *prepared statements* (SQL puro). | Scripts SQL versionados e consultas parametrizadas (`?`) para prevenir *SQL Injection*. |
| **RNF003** | Tratamento de Erros | Exceções de banco de dados e sintaxe JSON devem ser tratadas de forma centralizada pelo middleware `src/middlewares/tratarErros.js`. | Retorna `503` para `ECONNREFUSED`, `400` para `ER_DATA_TOO_LONG` / `ER_WARN_DATA_OUT_OF_RANGE` / `entity.parse.failed` e `500` para erros inesperados. |
| **RNF004** | Segurança e Testes | Credenciais devem ser isoladas em variáveis de ambiente (`.env`) e os fluxos validados por coleção automatizada no Postman. | Arquivo `.env` listado no `.gitignore` e suíte `postman/livraria.postman_collection.json` (incluindo pasta *Erros do banco*) aprovada. |

---

## 5. Riscos

O gerenciamento de riscos identifica ameaças que podem afetar o prazo, o escopo ou a qualidade da entrega. A pontuação de severidade resulta da multiplicação entre **Probabilidade (1 a 5)** e **Impacto (1 a 5)**, classificando os riscos em Baixo (1–6), Médio (8–12) ou Alto (15–25).

A tabela abaixo detalha os riscos mapeados para o projeto, sua classificação, os gatilhos de alerta, o plano de resposta e o integrante responsável pelo monitoramento.

| ID | Risco | Prob. | Impacto | Severidade | Estratégia e Plano de Resposta | Gatilho | Dono |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- |
| **R1** | Atraso na entrega das rotas de busca e filtros dinâmicos da API (`GET /livros`). | 3 | 4 | **12 (Médio)** | **Mitigar:** Prototipar previamente as queries SQL dinâmicas na camada `livroService.js` e realizar *pair programming* na Sprint 2. | Tarefa de busca permanecer mais de 3 dias na coluna *In Progress*. | Guilherme Tomaz |
| **R2** | Dificuldade na modelagem relacional e chaves estrangeiras entre livros e categorias no MySQL. | 3 | 4 | **12 (Médio)** | **Mitigar:** Validar o Diagrama de Classes (`diagrama-classes-v2.png`) e testar os scripts SQL localmente na Sprint 1 antes de codificar os *services*. | Erros de restrição de chave estrangeira (*Foreign Key*) nos testes iniciais. | Isabela Ferreira |
| **R3** | Conflitos de integração de código (*merge conflicts*) ou indisponibilidade de integrante na reta final. | 4 | 4 | **16 (Alto)** | **Mitigar:** Exigir *branches* individuais por *issue*, *Pull Requests* pequenos e revisões diárias pelo Scrum Master. | Acúmulo de mais de 2 PRs abertos sem revisão ou ausência de integrante por mais de 48h. | Heloisa Gigliott |
| **R4** | Indisponibilidade do banco de dados durante a apresentação à banca. | 2 | 3 | **6 (Baixo)** | **Aceitar / Contornar:** Garantir resposta graciosa `503` pelo `tratarErros.js` e manter instância local do MySQL pronta como plano B na defesa. | Erro `ECONNREFUSED` nos testes pré-apresentação. | Guilherme Tomaz |

---

## 6. Cronograma

O desenvolvimento está estruturado em **3 Sprints** ao longo de 6 semanas, alinhadas às entregas da Unidade Curricular. Todos os marcos e tarefas estão rastreados no repositório e quadro Kanban oficial do grupo.

* **Repositório e GitHub Project:** https://github.com/guilhermetomaz11/livraria-api-grupo8

A tabela abaixo apresenta a distribuição das Sprints, os principais marcos de entrega, as dependências técnicas e as *issues* associadas.

| Ciclo / Sprint | Período | Principais Entregas e Marcos | Issues Vinculadas | Dependências Principais |
| :--- | :--- | :--- | :--- | :--- |
| **Sprint 1 — Fundação e Banco** | Semanas 1 e 2 | **Marco 1:** Estrutura MVC/Services criada, conexão `mysql2` ativa e tabelas `categorias` e `livros` modeladas no MySQL (mitigação do risco **R2**). | `#1` | Auditoria de classes (`diagrama-classes-v2.png`) e definição do escopo. |
| **Sprint 2 — Core da API (CRUD e Busca)** | Semanas 3 e 4 | **Marco 2:** Endpoints de Categorias (RF005) e Livros (RF001, RF002, RF004) concluídos; revisão intermediária das rotas de filtros (mitigação do risco **R1**). | `#2`, `#3`, `#4`, `#5`, `#6`, `#9`, `#10` | Conclusão da estrutura de tabelas do banco na Sprint 1 (`#1`). |
| **Sprint 3 — Tratamento de Erros, Testes e Entrega** | Semanas 5 e 6 | **Marco 3:** Implementação do middleware `tratarErros.js`, execução da coleção Postman (*Erros do banco*), deploy e consolidação do documento final. | `#7`, `#8`, `#11` | Todas as rotas principais implementadas e integradas na *branch* `main`. |

---

## 7. Estimativa e recursos

Para dimensionar o esforço de desenvolvimento, o grupo utilizou a técnica de **Planning Poker**, atribuindo pontos de história (*Story Points*) a cada *issue* do backlog com base na complexidade técnica, onde **1 ponto equivale a 2 horas de trabalho técnico**.

**Justificativa da escolha:** O *Planning Poker* foi escolhido por promover o consenso técnico entre os desenvolvedores da equipe, expor dúvidas sobre a complexidade das consultas SQL antes da codificação e mapear diretamente o esforço de cada *issue* registrada no GitHub Projects.

A tabela a seguir demonstra a rastreabilidade entre os requisitos, as *issues* do Project, a pontuação estimada e o total de horas de desenvolvimento.

| Requisito / Escopo | Issue(s) no Project | Descrição da Tarefa | Pontos | Horas Estimadas |
| :--- | :--- | :--- | :---: | :---: |
| **RNF001 / RNF002** | `#1` | Estruturação MVC/Services, conexão `mysql2` e criação das tabelas MySQL | 3 pts | 6 h |
| **RF001** | `#2`, `#3` | Validação de payload e rota `POST /livros` (`livroController` / `livroService`) | 5 pts | 10 h |
| **RF002** | `#4` | Rotas `GET /livros` e `GET /livros/:id` com consulta relacional de categoria | 3 pts | 6 h |
| **RF003** | `#5`, `#6` | Implementação de busca e filtros dinâmicos por título, autor e categoria | 6 pts | 12 h |
| **RF004** | `#7`, `#8` | Rotas `PUT /livros/:id` e `DELETE /livros/:id` | 5 pts | 10 h |
| **RF005** | `#9`, `#10` | CRUD completo de categorias (`/categorias`) com trava de integridade | 5 pts | 10 h |
| **RNF003 / RNF004** | `#11` | Middleware `tratarErros.js` e coleção Postman (`livraria.postman_collection.json`) | 3 pts | 6 h |
| **TOTAL** | **11 issues** | **Esforço total de desenvolvimento técnico** | **30 pts** | **60 h** |

**Recursos técnicos e materiais utilizados:**
* **Desenvolvimento:** Node.js, Express, driver `mysql2`, dotenv e editor Visual Studio Code.
* **Banco de Dados:** MySQL Server (local e instância gerenciada em nuvem).
* **Qualidade e Gestão:** Postman (`postman/livraria.postman_collection.json`), Git, GitHub e GitHub Projects.

---

## 8. Orçamento

O orçamento do projeto foi estruturado em quatro blocos financeiros, considerando os custos-hora de referência definidos para a disciplina (**R$ 40,00/hora** para Desenvolvimento e **R$ 60,00/hora** para Gestão/PO) e a duração estimada de **2 meses** de execução.

### 8.1. Detalhamento dos custos (Blocos 1 a 3)

A tabela abaixo apresenta a composição detalhada de pessoal, infraestrutura e serviços de software necessários para a execução do projeto.

| Bloco | Item / Descrição | Cálculo (Quantidade × Valor Unitário) | Custo Total |
| :--- | :--- | :--- | :---: |
| **1. Pessoal** | Desenvolvimento Back-end (base rastreada das 11 *issues*) | `60 horas × R$ 40,00` | R$ 2.400,00 |
| **1. Pessoal** | Gestão de Projeto / Product Owner (15% sobre horas de dev) | `9 horas × R$ 60,00` | R$ 540,00 |
| **2. Infraestrutura** | Hospedagem da API Node.js em nuvem (plano básico) | `2 meses × R$ 35,00` | R$ 70,00 |
| **2. Infraestrutura** | Banco de dados MySQL gerenciado em nuvem | `2 meses × R$ 25,00` | R$ 50,00 |
| **2. Infraestrutura** | Repositório e automação CI/CD (GitHub Free / Actions) | `2 meses × R$ 0,00` | R$ 0,00 |
| **3. Software e Serviços** | Ferramentas de desenvolvimento (VS Code, Postman, GitHub Projects) | `Gratuito × R$ 0,00` | R$ 0,00 |
| **3. Software e Serviços** | Serviço de monitoramento de logs e alertas da API | `2 meses × R$ 20,00` | R$ 40,00 |
| **SUBTOTAL (1 + 2 + 3)** | **Custo base estimado do projeto** | — | **R$ 3.100,00** |

### 8.2. Resumo orçamentário e reserva de contingência (Bloco 4)

Para proteger o projeto contra imprevistos técnicos, o grupo aplicou uma **reserva de contingência de 15%** sobre o subtotal.

**Justificativa da contingência:** O percentual de 15% (R$ 465,00) foi definido com base nos riscos de severidade Média e Alta mapeados na Seção 5: especificamente o risco **R3 (Alto — 16 pontos)**, referente a conflitos de integração de código ou indisponibilidade de membros, e os riscos **R1 e R2 (Médios — 12 pontos)**, ligados à complexidade das queries SQL dinâmicas de busca e modelagem relacional. Esse valor garante cobertura para aproximadamente 11 horas adicionais de refatoração ou suporte técnico caso algum gatilho seja acionado.

A tabela a seguir consolida os quatro blocos financeiros e o orçamento total aprovado.

| Bloco Orçamentário | Valor (R$) |
| :--- | :---: |
| **1. Pessoal** (Desenvolvimento + Gestão) | R$ 2.940,00 |
| **2. Infraestrutura** (Nuvem e Banco de Dados) | R$ 120,00 |
| **3. Software e Serviços** (Monitoramento) | R$ 40,00 |
| **Subtotal (Blocos 1 + 2 + 3)** | **R$ 3.100,00** |
| **4. Reserva de Contingência** (15% sobre o subtotal) | R$ 465,00 |
| **TOTAL DO PROJETO** | **R$ 3.565,00** |

---

## 9. Equipe e papéis (RACI)

A organização da equipe combina papéis ágeis (Scrum) com responsabilidades técnicas bem distribuídas entre os integrantes do **Grupo 8**, evitando sobrecarga individual.

### 9.1. Papéis dos integrantes

A tabela abaixo descreve a função técnica e o papel Scrum desempenhado por cada membro do grupo.

| Integrante | GitHub | Papel Técnico no Projeto | Papel no Scrum |
| :--- | :--- | :--- | :--- |
| **Guilherme Tomaz Camara** | `@guilhermetomaz11` | Analista de Requisitos, Desenvolvedor Back-end (Rotas/Services) e Logs/Infra | Product Owner (**PO**) / Dev |
| **Heloisa Gigliott Soroca** | `@heloisasoroca-ai` | Gestora do GitHub Project, Riscos e Middlewares (`tratarErros.js`) | Scrum Master / Dev |
| **Isabela Ferreira da Silva** | `@isafrsilva` | Arquiteta de Dados (MySQL), Qualidade (QA) e Testes Postman | Time de Desenvolvimento |

### 9.2. Matriz de Responsabilidades (RACI)

Para garantir clareza na execução e correspondência direta com os responsáveis (*assignees*) no GitHub Projects, utiliza-se a matriz **RACI**, onde:
* **R (*Responsible*):** Quem executa a tarefa (corresponde ao *assignee* no GitHub).
* **A (*Accountable*):** Quem aprova e responde pela entrega final da atividade (apenas um por linha).
* **C (*Consulted*):** Quem fornece apoio técnico ou opinião antes da conclusão.
* **I (*Informed*):** Quem é comunicado sobre o andamento e resultados.

A tabela seguinte apresenta a matriz RACI completa do projeto.

| Atividade | Guilherme (PO/Dev) | Heloisa (SM/Dev) | Isabela (Dados/QA) |
| :--- | :---: | :---: | :---: |
| Levantamento e revisão de requisitos | **A / R** | C | C |
| Modelagem do banco de dados (MySQL) | C | I | **A / R** |
| Rotas de livros (CRUD e busca) | **A / R** | C | C |
| Rotas de categorias | **A / R** | **R** | C |
| Middleware de erros e testes da API (Postman) | I | **R** | **A / R** |
| Gestão do Project no GitHub | C | **A / R** | — |
| Acompanhamento da matriz de riscos | I | **A / R** | C |
| Documento de Planejamento do Projeto | **A** | **R** | **R** |
| Preparação da defesa oral | **A / R** | **R** | **R** |
| Configuração do ambiente e deploy da API | **R** | C | **A / R** |

---

## Histórico de versões

A tabela abaixo registra o controle de alterações e revisões realizadas neste documento de planejamento.

| Versão | Data | Autor(es) | Descrição das Alterações |
| :--- | :--- | :--- | :--- |
| **1.0** | 06/11/2026 | Guilherme, Heloisa, Isabela | Consolidação inicial das peças de escopo, requisitos, riscos, cronograma, estimativas (60h), orçamento (R$ 3.565,00) e matriz RACI alinhados à arquitetura MVC/Services e ao repositório oficial do Grupo 8. |
