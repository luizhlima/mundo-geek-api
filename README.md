#README: API de Gerenciamento de Loja - Mundo Geek

Este projeto consiste na implementação de uma API RESTful para o gerenciamento de categorias e produtos da loja "Mundo Geek". A API foi desenvolvida utilizando Node.js e TypeScript, seguindo as boas práticas de arquitetura de software e a aplicação dos princípios de divisão de responsabilidade.🛠️ Tecnologias Utilizadas
Linguagem: TypeScript
Runtime: Node.js
Framework Web: Express
ORM: TypeORM
Banco de Dados: PostgreSQL
Validação: Zod
Variáveis de Ambiente: Dotenv
Ferramentas de Desenvolvimento: Nodemon, tsx

⚙️ Pré-requisitos

Antes de começar, você deve ter instalado em sua máquina:
Node.js (versão recomendada)
npm (gerenciador de pacotes do Node.js)
PostgreSQL (servidor de banco de dados)

🚀 Configuração e Execução

Siga os passos abaixo para configurar e rodar a API localmente:1. Início do Projeto
Crie uma nova pasta para o projeto.
Inicialize o projeto Node.js:
npm init -y
Instale o TypeScript:
npm install typescript ts-node @types/node --save-dev
Crie o arquivo tsconfig.json:
npx tsc --init

2. Instalação de Dependências

Instale as dependências essenciais:
# Express
npm install express @types/express

# TypeORM e PostgreSQL
npm install typeorm pg @types/pg

# Zod para validação
npm install zod

# Dotenv para variáveis de ambiente
npm install dotenv

# Dependências de desenvolvimento (Nodemon e tsx)

npm i nodemon tsx -save-dev

3. Configuração do Banco de Dados

Crie um banco de dados PostgreSQL para o projeto.
Crie o arquivo .env na raiz do projeto (ou configure as variáveis de ambiente necessárias) com as credenciais de conexão do seu banco de dados, seguindo o padrão de variáveis esperado pelo TypeORM e pela configuração em src/config/.

4. Estrutura de Pastas

O projeto segue a estrutura de pastas sugerida:
src/
├── server.ts         # Ponto de entrada da aplicação, configuração do Express
├── controllers/      # Lógica de manipulação de requisições e respostas
├── routes/           # Definição das rotas da API
├── services/         # Regras de negócio e orquestração
├── database/         # Configuração da conexão com o banco de dados e TypeORM
├── config/           # Variáveis de ambiente e outras configurações gerais
├── middlewares/      # (Opcional) Middlewares customizados
├── entities/         # Definição das entidades do TypeORM (Categoria, Produto)
├── validates/        # Esquemas de validação com Zod
└── models/           # (Opcional) Interfaces ou classes para modelos de dados

5. Execução do Projeto

Adicione o script dev ao seu arquivo package.json:
"scripts": {
    "dev": "nodemon --watch src/**/*.ts --exec tsx src/server.ts"
}
Inicie o servidor de desenvolvimento:
npm run dev
📝 Entidades Essenciais

A API gerencia duas entidades principais com um relacionamento de Um para Muitos (1:N):1. Categoria

Representa uma categoria de produtos (ex: "Jogos de Tabuleiro", "Action Figures").
Campo	Tipo	Requisito	Descrição
id	UUID ou Numérico	Chave Primária	Identificador único.
nome	string	Obrigatório, Único	Nome da categoria.
descricao	string	Opcional	Descrição da categoria.
dataCriacao	Data e Hora	Gerado Automaticamente	Data de criação do registro.
dataAtualizacao	Data e Hora	Atualizado Automaticamente	Última data de atualização do registro.

2. Produto

Representa um item disponível na loja.
Campo	Tipo	Requisito	Descrição
id	UUID ou Numérico	Chave Primária	Identificador único.
nome	string	Obrigatório	Nome do produto.
descricao	string	Opcional	Descrição do produto.
preco	Número Decimal	Obrigatório, > 0	Preço do produto.
estoque	Número Inteiro	Obrigatório, >= 0	Quantidade em estoque.
dataCriacao	Data e Hora	Gerado Automaticamente	Data de criação do registro.
dataAtualizacao	Data e Hora	Atualizado Automaticamente	Última data de atualização do registro.
categoria	Objeto Categoria	Relacionamento 1:N	Categoria à qual o produto pertence.
🔑 Funcionalidades (CRUD)

O projeto implementa as operações básicas de CRUD (Create, Read, Update, Delete) para as entidades Categoria e Produto.
Entidade	Operação	Método HTTP	Rota	Descrição
Categoria	Criar	POST	/categorias	Cria uma nova categoria.
Categoria	Listar Todos	GET	/categorias	Lista todas as categorias.
Categoria	Buscar por ID	GET	/categorias/:id	Retorna uma categoria específica.
Categoria	Atualizar	PUT/PATCH	/categorias/:id	Atualiza uma categoria existente.
Categoria	Excluir	DELETE	/categorias/:id	Remove uma categoria.
Produto	Criar	POST	/produtos	Cria um novo produto, associando a uma categoria.
Produto	Listar Todos	GET	/produtos	Lista todos os produtos.
Produto	Buscar por ID	GET	/produtos/:id	Retorna um produto específico.
Produto	Atualizar	PUT/PATCH	/produtos/:id	Atualiza um produto existente.
Produto	Excluir	DELETE	/produtos/:id	Remove um produto.

🔒 Validação e Tratamento de Erros
Validação de Esquemas: Todas as entradas da API (corpo da requisição, parâmetros, query) são validadas utilizando o Zod.
Regras Específicas: O nome da categoria deve ser único, e o preço do produto deve ser um número maior que zero.
Tratamento de Erros: Há um tratamento de erros implementado para retornar mensagens claras e códigos de status HTTP apropriados.
🤝 Contribuição (Trabalho em Grupo)

Este projeto pode ser desenvolvido individualmente, em duplas ou em trios, promovendo a colaboração e troca de experiências.📄 Documentação da Solução

Juntamente com o código-fonte (em um repositório Git), um arquivo Markdown ou PDF deve ser entregue detalhando:
A arquitetura da solução (diagrama simples, se possível).
As decisões de design tomadas (abordagens escolhidas).
Como os princípios de divisão de responsabilidades foram aplicados.
Instruções para configurar e rodar a API localmente.
Já deixe no formato markdown .md
README: API de Gerenciamento de Loja - Mundo Geek

Este projeto consiste na implementação de uma API RESTful para o gerenciamento de categorias e produtos da loja "Mundo Geek". A API é desenvolvida utilizando Node.js e TypeScript, aplicando boas práticas de arquitetura de software e os princípios de divisão de responsabilidade.🛠️ Tecnologias Utilizadas
Tecnologia	Função
Linguagem	TypeScript
Runtime	Node.js
Framework Web	Express
ORM	TypeORM
Banco de Dados	PostgreSQL
Validação	Zod (para validação de esquemas de entrada)
Ferramentas Dev	Nodemon e tsx
Variáveis de Ambiente	Dotenv

⚙️ Pré-requisitos

Para rodar o projeto, você deve ter instalado:
Node.js
npm (gerenciador de pacotes)
PostgreSQL (servidor de banco de dados)

🚀 Configuração e Execução

Siga os passos para configurar e iniciar a API localmente.1. Início do Projeto
Crie uma nova pasta para o projeto.
Inicialize o projeto Node.js: npm init -y.
Instale o TypeScript: npm install typescript ts-node @types/node --save-dev.
Crie o arquivo tsconfig.json: npx tsc --init.

2. Instalação de Dependências

Instale as dependências essenciais:
# Express
npm install express @types/express

# TypeORM e PostgreSQL
npm install typeorm pg @types/pg

# Zod para validação
npm install zod

# Dotenv para variáveis de ambiente
npm install dotenv

# Dependências de desenvolvimento (Nodemon e tsx)
npm i nodemon tsx -save-dev

3. Configuração do Banco de Dados

Configure o seu banco de dados PostgreSQL. Crie o arquivo .env na raiz do projeto com as credenciais de conexão necessárias.4. Estrutura de Pastas

O projeto deve seguir a estrutura modular dentro da pasta src/:
src/
├── server.ts         # Ponto de entrada da aplicação, configuração do Express
├── controllers/      # Lógica de manipulação de requisições e respostas
├── routes/           # Definição das rotas da API
├── services/         # Regras de negócio e orquestração
├── database/         # Configuração da conexão com o banco de dados e TypeORM
├── config/           # Variáveis de ambiente e outras configurações gerais
├── middlewares/      # (Opcional) Middlewares customizados
├── entities/         # Definição das entidades do TypeORM (Categoria, Produto)
├── validates/        # Esquemas de validação com Zod
└── models/           # (Opcional) Interfaces/classes para modelos de dados que não são entidades TypeORM

5. Execução do Projeto

Adicione o script dev ao seu arquivo package.json:
"scripts": {
    "dev": "nodemon --watch src/**/*.ts --exec tsx src/server.ts"
}
Inicie o servidor de desenvolvimento:
npm run dev
📝 Entidades Essenciais

A API gerencia as seguintes entidades com um relacionamento de Um para Muitos (1:N):1. Categoria

Representa uma categoria de produtos (ex: "Jogos de Tabuleiro", "Action Figures").
Campo	Tipo	Requisito
id	UUID ou numérico	Chave Primária
nome	string	Obrigatório, Único
descricao	string	Opcional
dataCriacao	Data e Hora	Gerado Automaticamente
dataAtualizacao	Data e Hora	Atualizado Automaticamente

2. Produto

Representa um item disponível na loja.
Campo	Tipo	Requisito
id	UUID ou numérico	Chave Primária
nome	string	Obrigatório
descricao	string	Opcional
preco	Número Decimal	Obrigatório, Maior que zero
estoque	Número Inteiro	Obrigatório, Maior ou igual a zero
dataCriacao	Data e Hora	Gerado Automaticamente
dataAtualizacao	Data e Hora	Atualizado Automaticamente
categoria	Objeto Categoria	Relacionamento 1:N

🔑 Funcionalidades (CRUD)

O projeto implementa as operações básicas de CRUD (Create, Read, Update, Delete) para as entidades Categoria e Produto.
Entidade	Operação	Método HTTP	Rota
Categoria	Criar	POST	/categorias
Categoria	Listar Todos	GET	/categorias
Categoria	Buscar por ID	GET	/categorias/:id
Categoria	Atualizar	PUT/PATCH	/categorias/:id
Categoria	Excluir	DELETE	/categorias/:id
Produto	Criar	POST	/produtos
Produto	Listar Todos	GET	/produtos
Produto	Buscar por ID	GET	/produtos/:id
Produto	Atualizar	PUT/PATCH	/produtos/:id
Produto	Excluir	DELETE	/produtos/:id
🔒 Validação e Tratamento de Erros
Validação: Todas as entradas da API devem ser validadas utilizando Zod.
Regras de Negócio: O nome da Categoria deve ser único, e o preco do Produto deve ser maior que zero.
Tratamento de Erros: Deve ser implementado um tratamento de erros adequado, retornando mensagens claras e códigos de status HTTP apropriados.