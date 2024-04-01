# Instruções

### 1. Clone o repositório

```bash
git clone https://github.com/PedroCavalcantep/selecao-node-adasi

cd selecao-node-adasi
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o banco de dados

- Crie um banco de dados PostgreSQL
- No arquivo `config.json` na pasta config altere as variaveis de "development" com as informações necessarias para fazer a conexão com o banco
- execute as migrations

```bash
sequelize db:migrate
```

### 5. Inicie o servidor

```bash
npm run dev
```

## Testes

importe o arquivo `API ADASI.postman_collection.json` para o postman e execute o teste das rotas
