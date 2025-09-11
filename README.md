# AgroLink API 🌾

Bem-vindo ao repositório do Projeto Full-Stack do AgroLink! [cite_start]Este projeto é a minha visão para um sistema ERP (Enterprise Resource Planning) completo e moderno para o agronegócio brasileiro, construído para ser robusto, escalável e totalmente integrado[cite: 275].

Este README narra a jornada de construção desta API, as tecnologias que escolhi, as decisões de arquitetura que tomei e o roadmap para o futuro.

## A Jornada de Construção

Tudo o que você vê aqui foi construído passo a passo, com um foco imenso na criação de uma fundação sólida para o futuro.

#### 1. A Fundação: Infraestrutura e Banco de Dados
[cite_start]Tudo começou com uma decisão crucial: em vez de usar uma hospedagem compartilhada limitada, optei por um **Servidor Virtual Privado (VPS)**, o que me deu controle total sobre o ambiente[cite: 50]. [cite_start]Instalei o **Ubuntu 22.04**, configurei o **PostgreSQL** e, o mais importante, a extensão **PostGIS**, que é a espinha dorsal para todas as funcionalidades de geolocalização do sistema[cite: 51, 53].

Desde o início, a organização foi uma prioridade. [cite_start]Decidi estruturar o banco de dados usando **Schemas (`lands`, `operations`, `inventory`, `people`)** em vez de prefixos, uma escolha de arquitetura que facilita enormemente a gestão de permissões e a clareza do modelo de dados[cite: 54].

#### 2. O Coração da API: NestJS e o Primeiro CRUD
[cite_start]Com o banco de dados pronto, iniciei a construção da API com **NestJS**, um framework que escolhi por sua arquitetura modular e escalável[cite: 78]. O primeiro grande desafio foi criar o módulo `lands`, que se tornou o "template" para todos os outros. [cite_start]Foi uma jornada de aprendizado intensa, superando desafios de conexão com o banco no VPS [cite: 86][cite_start], entendendo as particularidades do TypeScript com o TypeORM [cite: 91] [cite_start]e configurando o `autoLoadEntities` para que o sistema reconhecesse minhas entidades[cite: 94].

#### 3. Evolução e Refatoração: Adaptando à Lógica de Negócio
Um dos momentos mais importantes foi quando percebi que a lógica inicial de "Talhões" estava incompleta. O sistema precisava refletir a hierarquia do mundo real: **Propriedade -> Talhão**. [cite_start]Isso exigiu uma refatoração corajosa tanto no banco de dados quanto no código, mas o resultado foi uma API muito mais robusta e correta[cite: 111]. Essa experiência definiu uma filosofia para o projeto: estar sempre pronto para adaptar e melhorar a arquitetura conforme a necessidade do negócio.

#### 4. Rumo a um Sistema Integrado e com Rastreabilidade Total
A partir dessa base sólida, construí os módulos operacionais em sequência:
* [cite_start]**Safras (`crop-cycles`):** Conectando uma cultura a um talhão para um ciclo produtivo[cite: 120].
* [cite_start]**Atividades (`activities`):** Permitindo o agendamento de tarefas para cada safra[cite: 147].
* **Estoque (`inventory`):** Um dos maiores saltos de complexidade. [cite_start]Modelei um sistema com Catálogo de Produtos, Níveis de Estoque e um "livro-razão" para Movimentações[cite: 181, 182]. [cite_start]Logo em seguida, refatorei tudo para suportar múltiplos **Silos**, tornando o controle de estoque muito mais poderoso[cite: 205].

[cite_start]O ápice dessa fase foi quando finalmente conectei as pontas: implementei a lógica que vincula uma **Atividade de Colheita** a uma **Movimentação de Entrada** no estoque, alcançando a rastreabilidade completa da lavoura ao silo[cite: 240, 242, 299].

#### 5. Fase 2: Foco nas Pessoas e Recursos
[cite_start]Recentemente, iniciamos a Fase 2 do projeto, focada nos recursos da fazenda[cite: 317]. [cite_start]O primeiro grande módulo foi o de **Colaboradores**, que construímos com um nível de detalhe profissional, incluindo informações contratuais (CLT/PJ), documentação e um sistema avançado de **Histórico de Eventos**, que registra automaticamente promoções e aumentos salariais[cite: 248, 319, 320].

## Tecnologias Utilizadas

* **Back-end:** [NestJS](https://nestjs.com/) (Node.js Framework)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* [cite_start]**Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) [cite: 53]
* [cite_start]**Extensão Geoespacial:** [PostGIS](https://postgis.net/) [cite: 53]
* [cite_start]**ORM:** [TypeORM](https://typeorm.io/) [cite: 79]
* **Validação de Dados:** [class-validator](https://github.com/typestack/class-validator) & [class-transformer](https://github.com/typestack/class-transformer)

## Estrutura do Projeto
[cite_start]A API segue uma arquitetura modular, onde cada área de negócio principal é encapsulada em seu próprio módulo, garantindo a separação de responsabilidades e facilitando a manutenção[cite: 268]. A estrutura de pastas `src/modules` reflete essa organização, com módulos como `lands`, `activities`, `inventory` e o mais novo, `people`.

## Status Atual do Projeto
O projeto está em pleno desenvolvimento e já conta com uma base sólida e funcional.

- [x] [cite_start]**Módulo de Cadastros Fundamentais:** CRUDs completos para Propriedades, Talhões (com geolocalização), Culturas, Produtos, Silos e Tipos de Tarefa[cite: 277].
- [x] [cite_start]**Módulo de Colaboradores:** CRUD completo com detalhes contratuais e um sistema de histórico de eventos (manual e automático)[cite: 287, 289].
- [x] [cite_start]**Módulo de Gestão Agrícola:** Criação de Safras e agendamento de Atividades[cite: 291].
- [x] [cite_start]**Módulo de Estoque:** Gestão de inventário multi-silo, com consulta de saldo e extrato de movimentações por silo[cite: 302].
- [x] [cite_start]**Rastreabilidade:** Vínculo funcional entre a Atividade de Colheita e a Movimentação de Entrada no Estoque[cite: 299].

## Roadmap (Próximos Passos)

Este projeto é ambicioso e ainda há muito a construir. O plano de ação atual está focado em finalizar a Fase 2.

- [ ] [cite_start]**Módulo de Maquinário:** Implementar o CRUD para cadastrar os ativos da fazenda (tratores, colheitadeiras, etc.)[cite: 323].
- [ ] [cite_start]**Integração de Recursos:** Modificar o módulo de Atividades para permitir a associação de Colaboradores e Maquinário a cada tarefa agendada[cite: 324].
- [ ] [cite_start]**Expandir o Módulo de Estoque:** Implementar outros tipos de movimentação, como Compra de Insumos, Venda de Produção e Transferência entre Silos[cite: 312].
- [ ] **Iniciar a Fase 3: Módulo de Pecuária**.
- [ ] **Iniciar a Fase 4: Módulo de Inteligência (Dashboards e Relatórios)**.

## Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO]
    cd agrolink-api
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    * Renomeie o arquivo `.env.example` para `.env`.
    * Preencha as variáveis do banco de dados (`DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, etc.).

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run start:dev
    ```
A aplicação estará rodando em `http://localhost:3000`.

## Contato
**Jefferson Lima** - [Jeffersonlima@jeffersonlima.net.br](mailto:Jeffersonlima@jeffersonlima.net.br)

Link do Projeto: [https://github.com/jefferson23br/agrolink-api](https://github.com/jefferson23br/agrolink-api)