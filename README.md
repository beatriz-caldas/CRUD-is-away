# CRUD is Away

Sistema web de cadastro de usuários, com design inspirado em interfaces retrô. Desenvolvido com React no frontend, Node.js no backend e MySQL como banco de dados.

## Tecnologias

- React (frontend)
- Node.js + Express (backend)
- MySQL
- Fetch API
- CSS personalizado

## Como rodar o projeto

## 1. Banco de Dados
### Estrutura da Tabela
O arquivo `sql/users.sql` contém o script de criação da tabela `users` e dados de exemplo para inserção inicial.

### Exportação Completa
O arquivo `sql/Data.sql` contém um dump completo do banco, caso você prefira importar tudo de uma vez.

### Como usar:
1. Crie um banco com o nome `api_usuarios`.
2. Importe um dos arquivos:
   - Para criar a tabela com dados iniciais: use `users.sql`.
   - Para restaurar um dump completo: use `Data.sql`.

Você pode importar via terminal MySQL ou ferramentas como MySQL Workbench.


### 2. Backend
```bash
cd backend
npm install
npm start
````

### 3. Frontend
``` bash
cd frontend/react
npm install
npm start
```
