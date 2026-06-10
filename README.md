# Porta de Notícias (ClickInfos)

Portal de notícias desenvolvido com Node.js, Express e MongoDB. Exibe artigos em destaque, últimas notícias e páginas individuais por slug.

## Funcionalidades

- **Página inicial** — notícia em destaque, lista de últimas notícias e seção "Mais Lidas"
- **Busca** — formulário de pesquisa no cabeçalho (página de resultados em desenvolvimento)
- **Artigo individual** — rota dinâmica por slug (`/:slug`)
- **Layout responsivo** — estilização em CSS com fontes Inter e Space Grotesk

## Tecnologias

| Tecnologia   | Uso                          |
|-------------|------------------------------|
| Node.js     | Runtime                      |
| Express 5   | Servidor HTTP e rotas        |
| MongoDB     | Banco de dados               |
| Mongoose    | Modelagem e consultas        |
| EJS         | Templates HTML               |
| dotenv      | Variáveis de ambiente        |
| body-parser | Parsing de requisições       |

## Estrutura do projeto

```
portaDeNoticias/
├── index.js              # Servidor Express e rotas
├── Posts.js              # Modelo Mongoose (coleção posts)
├── pages/
│   ├── home.html         # Página inicial
│   ├── busca.html        # Resultados de busca
│   ├── single.html       # Artigo individual
│   └── partials/
│       ├── header.html
│       └── footer.html
├── public/
│   └── style.css         # Estilos do portal
├── package.json
└── .env                  # Variáveis de ambiente (não versionado)
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v18 ou superior recomendado)
- [MongoDB](https://www.mongodb.com/) (local ou Atlas)

## Instalação

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd portaDeNoticias
```

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` na raiz do projeto:

```env
MONGO_URI=mongodb://localhost:27017/portadenoticias
```

Para MongoDB Atlas, use a string de conexão fornecida no painel do cluster.

## Executando o projeto

```bash
node index.js
```

O servidor sobe na porta **5000**. Acesse: [http://localhost:5000](http://localhost:5000)

## Modelo de dados

Cada post na coleção `posts` possui os seguintes campos:

| Campo      | Tipo   | Descrição                    |
|-----------|--------|------------------------------|
| titulo    | String | Título da notícia            |
| imagem    | String | URL da imagem de capa        |
| categoria | String | Categoria (ex.: Tecnologia)  |
| conteudo  | String | Texto completo do artigo     |
| slug      | String | Identificador na URL         |

Exemplo de documento no MongoDB:

```json
{
  "titulo": "Dez principais habilidades para se tornar um desenvolvedor full-stack",
  "imagem": "https://exemplo.com/imagem.jpg",
  "categoria": "Tecnologia",
  "conteudo": "Conteúdo completo da notícia...",
  "slug": "habilidades-desenvolvedor-fullstack"
}
```

## Rotas

| Método | Rota        | Descrição                              |
|--------|-------------|----------------------------------------|
| GET    | `/`         | Página inicial com lista de posts      |
| GET    | `/?busca=`  | Página de busca (query string `busca`) |
| GET    | `/:slug`    | Página do artigo pelo slug             |

## Scripts disponíveis

```bash
npm test   # Placeholder — testes ainda não configurados
```

## Licença

ISC
