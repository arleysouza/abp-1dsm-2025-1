# Projeto de Gerenciamento Acadêmico

Este projeto consiste em um servidor desenvolvido com Node.js para exibir os cursos, professores, disciplinas, salas e horários acadêmicos. Os dados são armazenados e manipulados por meio de arquivos CSV e comandos SQL.

## 📁 Estrutura do Projeto

- `src/` - Código-fonte do servidor  
  - `controllers/` - Lógica de controle para cada entidade (curso, professor, sala etc.)  
  - `data/` - Arquivos de dados (CSV, SQL e modelo de dados compatível com o DBDesigner)  
  - `routes/` - Rotas da API  
  - `index.js` - Ponto de entrada do servidor  

- `public/` - Arquivos estáticos (HTML, CSS, JS)  
  - `html/cursos.html` — Página web com interface interativa para visualizar cursos e horários  
  - `css/cursos.css` — Estilos da página `cursos.html`  
  - `js/cursos.js` — Scripts da página `cursos.html`  

- `package.json` - Dependências e scripts do projeto 

## 🔌Rotas da API

### Cursos
- `GET /degree` — Lista todos os cursos.

### Disciplinas
- `GET /course` — Lista todas as disciplinas.
- `GET /course/:id` — Lista as disciplinas de um curso.

### Professores
- `GET /professor` — Lista todos os professores.

### Salas
- `GET /room` — Lista todas as salas.

### Relação horários
- `GET /roomHasCourse` — Lista os horários de todas as disciplinas.
- `GET /roomHasCourse/:iddegree/:semester` — Lista os horários de todas as disciplinas do semestre de um curso. 

## 📦 Estrutura dos Objetos Retornados

### Curso
```json
  {
    "iddegree": 1,
    "name": "Desenvolvimento de Software Multiplataforma",
    "acronym": "DSM",
    "period": "Noturno"
  }
```

### Professor
```json
  {
    "idprofessor": 7,
    "name": "Arley Souza"
  }
```

### Disciplina
```json
  {
    "idcourse": 1,
    "name": "Algoritmos e Lógica de Programação",
    "semester": 1,
    "degree": {
      "iddegree": 1,
      "name": "Desenvolvimento de Software Multiplataforma",
      "acronym": "DSM",
      "period": "Noturno"
    },
    "professor": {
      "idprofessor": 7,
      "name": "Arley Souza"
    }
  }
```

### Sala
```json
  {
    "number": 1,
    "level": 0,
    "description": "Laboratório de análises ambientais"
  }
```

### Relação horários
```json
  {
    "begin": "18:45:00",
    "finish": "22:15:00",
    "day_of_week": "segunda-feira",
    "room": {
      "number": 207,
      "description": "Laboratório de informática "
    },
    "course": {
      "idcourse": 4,
      "name": "Engenharia de Software I"
    }
  }
```

## 🛠 Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/arleysouza/abp-1dsm-2025-1 server
   ```
2. Acesse o diretório do projeto e instale as dependências:
   ```sh
   cd server
   npm install
   ```

## 💾 Carregamento dos Dados no Banco de Dados

1. Crie um banco de dados no PostgreSQL;
2. Edite o arquivo `src/controllers/db.js` com os parâmetros de conexão apropriados (usuário, senha, host e nome do banco);
3. No pgAdmin (ou outro cliente PostgreSQL), execute os comandos do arquivo `src/data/comandos.sql` para criar as tabelas. Modelo de dados:
![](https://github.com/arleysouza/https://github.com/arleysouza/abp-1dsm-2025-1/blob/main/images/modelo-bd.png)
4. No mesmo cliente, execute os comandos do arquivo `src/data/load.sql`, ajustando os caminhos para os arquivos `.csv` conforme necessário, para popular o banco com os dados.


## ▶️ Execução

Para iniciar o servidor, utilize um dos comandos abaixo:
```sh
npm start # Executa em modo de produção
# ou 
npm run dev # Executa em modo de desenvolvimento (com nodemon)
```

O servidor será iniciado na porta configurada (padrão: 3001).

## 🌐 Páginas Web

### Página `cursos.html`

Esta página permite ao usuário visualizar as disciplinas associadas a cada curso e seus respectivos horários.

#### Funcionalidades

1. **Listagem de Cursos**: Ao carregar a página, uma lista de cursos disponíveis é exibida.  
2. **Listagem de Disciplinas**: Ao clicar sobre o nome de um curso, é feita uma requisição à rota `/course/:iddegree`, e as disciplinas são listadas em uma tabela com as colunas:
   - `name` (nome da disciplina)
   - `semester` (semestre em que é ofertada)
   - `professor.name` (nome do professor)

   Os campos `idcourse`, `semester` e `iddegree` são armazenados de forma oculta nas linhas da tabela, para uso posterior.

3. **Visualização de Horários**: Ao clicar sobre o número do semestre de uma disciplina, é feita uma requisição à rota `/roomHasCourse/:iddegree/:semester`, retornando os horários das disciplinas daquele semestre. Os dados são renderizados em uma tabela semanal com:
   - Colunas representando os dias da semana (segunda a sexta-feira)
   - Linhas representando os horários:
     - 18h45 a 19h35
     - 19h35 a 20h25
     - 20h25 a 21h15
     - 21h25 a 22h15
     - 22h15 a 23h05

   Em cada célula da tabela é exibido o nome da disciplina correspondente ao dia e horário retornados.

