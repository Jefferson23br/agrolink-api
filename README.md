<div align="center">

# 🌾 AgroLink API

### Sistema ERP Completo para o Agronegócio Brasileiro

[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![PostGIS](https://img.shields.io/badge/PostGIS-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgis.net/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)

[![License](https://img.shields.io/badge/license-UNLICENSED-red?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge)]()

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Módulos do Sistema](#-módulos-do-sistema)
- [Rastreabilidade](#-rastreabilidade)
- [Status do Projeto](#-status-do-projeto)
- [Roadmap](#-roadmap)
- [Como Executar](#-como-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contato](#-contato)

---

## 🎯 Sobre o Projeto

O **AgroLink API** é um sistema ERP (Enterprise Resource Planning) completo e moderno desenvolvido especificamente para o agronegócio brasileiro. Construído com foco em robustez, escalabilidade e integração total, oferece uma solução completa para gestão de propriedades rurais, desde o planejamento até o controle de estoque.

### 🚀 Principais Características

- ✅ **Rastreabilidade Completa**: Do plantio ao armazenamento, rastreie cada etapa do processo produtivo
- ✅ **Gestão Multi-Silo**: Controle de estoque distribuído em múltiplos locais de armazenamento
- ✅ **Georreferenciamento**: Integração com PostGIS para mapeamento geográfico de propriedades e talhões
- ✅ **Arquitetura Modular**: Código organizado e escalável, facilitando manutenção e expansão
- ✅ **API RESTful**: Endpoints bem estruturados seguindo as melhores práticas

---

## 🛠 Tecnologias

### Backend & Framework

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

</div>

### Banco de Dados

<div align="center">

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![PostGIS](https://img.shields.io/badge/PostGIS-336791?style=for-the-badge&logo=postgresql&logoColor=white)

</div>

### Ferramentas & Bibliotecas

<div align="center">

![TypeORM](https://img.shields.io/badge/TypeORM-FE0902?style=for-the-badge&logo=typeorm&logoColor=white)
![class-validator](https://img.shields.io/badge/class--validator-FF6B6B?style=for-the-badge)
![class-transformer](https://img.shields.io/badge/class--transformer-4ECDC4?style=for-the-badge)

</div>

### Stack Completa

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| **Framework** | NestJS | ^11.0.1 |
| **Linguagem** | TypeScript | ^5.7.3 |
| **Runtime** | Node.js | LTS |
| **Banco de Dados** | PostgreSQL | Latest |
| **Extensão Geoespacial** | PostGIS | Latest |
| **ORM** | TypeORM | ^0.3.26 |
| **Validação** | class-validator | ^0.14.2 |
| **Transformação** | class-transformer | ^0.5.1 |

---

## ✨ Funcionalidades

### 🏞 Gestão de Terras
- Cadastro de propriedades rurais com georreferenciamento
- Gestão de talhões com mapeamento geográfico (PostGIS)
- Controle de área total e por talhão

### 🌱 Gestão Agrícola
- Criação e gestão de safras
- Catálogo de culturas (Soja, Milho, etc.)
- Agendamento de atividades agrícolas
- Tipos de tarefa configuráveis (Plantio, Colheita, Pulverização, etc.)
- Status de atividades (Pendente, Em Andamento, Concluída, Cancelada)

### 📦 Controle de Estoque
- Catálogo de produtos (grãos e insumos)
- Gestão multi-silo
- Movimentações de entrada e saída
- Ajustes de estoque
- Consulta de saldo por silo
- Extrato completo de movimentações
- Atualização automática de saldos

### 👥 Gestão de Pessoas
- Cadastro completo de colaboradores
- Suporte a CLT e PJ
- Histórico de eventos (promoções, aumentos, etc.)
- Documentação e contratos

### 🚜 Gestão de Ativos
- Cadastro de maquinário (tratores, colheitadeiras, etc.)
- Controle de status e tipos de equipamentos
- Associação de maquinário às atividades

### 🔗 Rastreabilidade
- Vínculo entre atividades de colheita e movimentações de estoque
- Rastreamento completo: Propriedade → Talhão → Safra → Atividade → Estoque

---

## 🏗 Arquitetura

### Estrutura Modular

O projeto segue uma arquitetura modular do NestJS, onde cada área de negócio é encapsulada em seu próprio módulo:

```
src/
├── core/
│   └── database/          # Configuração do banco de dados
├── modules/
│   ├── lands/            # Propriedades e Talhões
│   ├── crop-cycles/      # Safras
│   ├── crops/            # Culturas
│   ├── task-types/       # Tipos de Tarefa
│   ├── activities/       # Atividades Agrícolas
│   ├── inventory/        # Estoque (Produtos, Silos, Movimentações)
│   ├── people/           # Colaboradores
│   └── assets/           # Maquinário
└── main.ts               # Ponto de entrada da aplicação
```

### Organização do Banco de Dados

O banco de dados está organizado em **schemas** para melhor organização e gestão de permissões:

- **`lands`**: Propriedades e Talhões
- **`operations`**: Safras, Atividades e Tipos de Tarefa
- **`inventory`**: Produtos, Silos, Estoque e Movimentações
- **`people`**: Colaboradores e Histórico
- **`assets`**: Maquinário

### Padrões de Desenvolvimento

- **DTOs (Data Transfer Objects)**: Validação de dados de entrada
- **Entities**: Mapeamento ORM das tabelas do banco
- **Services**: Lógica de negócio isolada
- **Controllers**: Endpoints RESTful
- **Modules**: Encapsulamento e injeção de dependências

---

## 📦 Módulos do Sistema

### 1. Lands (Terras)
**Endpoints:** `/propriedades`, `/talhoes`

Gerencia propriedades rurais e seus talhões, com suporte a georreferenciamento usando PostGIS.

### 2. Crop Cycles (Safras)
**Endpoint:** `/safras`

Gerencia ciclos produtivos, conectando culturas a talhões específicos.

### 3. Crops (Culturas)
**Endpoint:** `/culturas`

Catálogo de culturas agrícolas (Soja, Milho, Algodão, etc.).

### 4. Task Types (Tipos de Tarefa)
**Endpoint:** `/tipos-tarefa`

Catálogo de tipos de operações agrícolas (Plantio, Colheita, Pulverização, etc.).

### 5. Activities (Atividades)
**Endpoint:** `/atividades`

Agendamento e execução de tarefas agrícolas, com suporte a:
- Associação de colaboradores
- Associação de maquinário
- Controle de status
- Vínculo com safras

### 6. Inventory (Estoque)
**Endpoints:** `/produtos`, `/silos`, `/movements`

Sistema completo de gestão de estoque:
- Catálogo de produtos
- Gestão de silos
- Movimentações (Entrada, Saída, Ajustes)
- Consulta de saldo por silo
- Extrato de movimentações

### 7. People (Pessoas)
**Endpoint:** `/colaboradores`

Gestão completa de colaboradores com:
- Dados pessoais e contratuais
- Suporte a CLT e PJ
- Histórico de eventos

### 8. Assets (Ativos)
**Endpoint:** `/machinery`

Cadastro e gestão de maquinário da fazenda.

---

## 🔄 Rastreabilidade

O sistema oferece rastreabilidade completa do processo produtivo:

```
Propriedade
    ↓
Talhão
    ↓
Safra (Cultura)
    ↓
Atividade (Colheita)
    ↓
Movimentação de Entrada
    ↓
Silo (Estoque)
```

**Exemplo de Fluxo:**
1. Uma propriedade possui talhões cadastrados
2. Uma safra é criada vinculando uma cultura a um talhão
3. Uma atividade de colheita é agendada para a safra
4. Ao registrar a colheita, uma movimentação de entrada é criada no estoque
5. O sistema atualiza automaticamente o saldo no silo
6. É possível rastrear de onde veio cada produto no estoque

---

## 📊 Status do Projeto

### ✅ Fase 1 - Concluída

- [x] Módulo de Cadastros Fundamentais
  - [x] Propriedades e Talhões (com geolocalização)
  - [x] Culturas
  - [x] Produtos
  - [x] Silos
  - [x] Tipos de Tarefa

- [x] Módulo de Gestão Agrícola
  - [x] Criação de Safras
  - [x] Agendamento de Atividades

- [x] Módulo de Estoque
  - [x] Gestão multi-silo
  - [x] Movimentações de entrada/saída
  - [x] Consulta de saldo e extrato

- [x] Rastreabilidade
  - [x] Vínculo Atividade → Movimentação

### 🚧 Fase 2 - Em Andamento

- [x] Módulo de Colaboradores
  - [x] CRUD completo
  - [x] Sistema de histórico de eventos

- [x] Módulo de Maquinário
  - [x] CRUD completo

- [ ] Integração de Recursos
  - [ ] Associação de Colaboradores às Atividades
  - [ ] Associação de Maquinário às Atividades

### 📅 Próximas Fases

- [ ] **Fase 3**: Módulo de Pecuária
- [ ] **Fase 4**: Módulo de Inteligência (Dashboards e Relatórios)

---

## 🗺 Roadmap

### Curto Prazo
- [ ] Finalizar integração de Colaboradores e Maquinário às Atividades
- [ ] Expandir tipos de movimentação (Compra, Venda, Transferência entre Silos)
- [ ] Melhorias na API de consultas e relatórios

### Médio Prazo
- [ ] Módulo de Pecuária (Gestão de rebanhos, vacinas, etc.)
- [ ] Sistema de autenticação e autorização
- [ ] API de relatórios e dashboards

### Longo Prazo
- [ ] Módulo de Inteligência com dashboards interativos
- [ ] Integração com APIs externas (clima, preços de commodities)
- [ ] Aplicativo mobile
- [ ] Sistema de notificações

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão LTS recomendada)
- PostgreSQL com extensão PostGIS
- npm ou yarn

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/jefferson23br/agrolink-api.git
cd agrolink-api/agrolink-api
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
   
   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=agrolink

# Server
PORT=3000
```

4. **Configure o banco de dados:**
   
   Certifique-se de que o PostgreSQL está rodando e que a extensão PostGIS está instalada:
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

5. **Inicie o servidor de desenvolvimento:**
```bash
npm run start:dev
```

A aplicação estará rodando em `http://localhost:3000`

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev      # Inicia o servidor em modo watch

# Produção
npm run build          # Compila o projeto
npm run start:prod     # Inicia o servidor em produção

# Testes
npm run test           # Executa testes unitários
npm run test:e2e       # Executa testes end-to-end
npm run test:cov       # Executa testes com cobertura

# Qualidade de Código
npm run lint           # Executa o linter
npm run format         # Formata o código
```

---

## 📁 Estrutura do Projeto

```
agrolink-api/
├── src/
│   ├── core/
│   │   └── database/
│   │       └── database.module.ts
│   ├── modules/
│   │   ├── activities/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── activities.controller.ts
│   │   │   ├── activities.service.ts
│   │   │   └── activities.module.ts
│   │   ├── assets/
│   │   │   ├── machinery/
│   │   │   └── entities/
│   │   ├── crop-cycles/
│   │   ├── crops/
│   │   ├── inventory/
│   │   │   ├── movements/
│   │   │   ├── silos/
│   │   │   └── entities/
│   │   ├── lands/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── propriedades.controller.ts
│   │   │   ├── talhoes.controller.ts
│   │   │   └── lands.module.ts
│   │   ├── people/
│   │   │   ├── collaborators/
│   │   │   └── entities/
│   │   └── task-types/
│   ├── app.module.ts
│   └── main.ts
├── test/
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📞 Contato

**Jefferson Lima**

📧 Email: [Jeffersonlima@jeffersonlima.net.br](mailto:Jeffersonlima@jeffersonlima.net.br)

🔗 GitHub: [@jefferson23br](https://github.com/jefferson23br)

🌐 Repositório: [https://github.com/jefferson23br/agrolink-api](https://github.com/jefferson23br/agrolink-api)

---

<div align="center">

### ⭐ Se este projeto foi útil para você, considere dar uma estrela!

Feito com ❤️ para o agronegócio brasileiro

</div>
