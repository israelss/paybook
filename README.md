# 🚀 Sobre este projeto

Esta é a minha solução para o teste técnico proposto para o processo seletivo da Softeo Tecnologia

<!-- TODO: add live url -->
Live Preview: [Heroku]()

# 🧠 Contexto

- Érica é uma dentista que atende seus pacientes apenas com atendimento particular.
- O pagamento do tratamento do paciente pode ser parcelado.
- A cada tratamento, ela anota num caderninho quanto e quando cada paciente deve pagar.
- Para saber quanto vai receber num determinado período, Érica precisa somar cada valor na calculadora.

O desafio foi implementar uma tela na nuvem com as seguintes funcionalidades:
- [x] Inserção de novos registros, com:
  - [x] nome do paciente
  - [x] quanto o paciente deve pagar
  - [x] quando o paciente deve pagar
- [x] Total a receber dentro de um determinado período

## 💡 O que foi entregue
_ℹ️ Observação ℹ️:_

_Na minha solução, utilizei a nomenclatura **cliente**, em vez de **paciente**, por ser um termo mais genérico, possibilitando que a ferramenta possa ser utilizada não só por Érica, mas por todos que tenham a mesma necessidade que ela._

<!-- TODO: add live url -->
Desenvolvi uma tela responsiva na nuvem (ver [deploy]()) com as seguintes funcionalidades:
- [x] Inserção de novos registros, com:
  - [x] nome do cliente
  - [x] quanto o cliente deve pagar
  - [x] quando o cliente deve pagar
- [x] Total a receber dentro de um determinado período

## 🧰 Tecnologias e ferramentas

Para este projeto foram utilizados:

- [Typescript](https://www.typescriptlang.org/)
- [ts-standard](https://github.com/standard/ts-standard) para formatação, padronização e lint do código
- [tiny-invariant](https://github.com/alexreardon/tiny-invariant) para validação e [estreitamento de tipos](https://github.com/alexreardon/tiny-invariant#type-narrowing)
- Framework:
  - [Remix](https://remix.run/), um framework web fullstack
  - [Remix Forms](https://remix-forms.seasoned.cc/) para facilitar a criação de forms acessíveis e autovalidáveis, através de:
    - [zod](https://zod.dev/)
    - [Remix Domains](https://github.com/SeasonedSoftware/remix-domains)
    - [React Hook Form](https://react-hook-form.com/)
- Banco de dados:
  - [PostgreSQL](https://www.postgresql.org/) ([na plataforma Heroku](https://www.heroku.com/postgres))
  - [Prisma](https://www.prisma.io/) como ORM
  - [Faker](https://fakerjs.dev/), para gerar dados para popular o banco de dados
  - [esbuild-register](https://github.com/egoist/esbuild-register) para rodar o arquivo de seed, em desenvolvimento
- Deploy:
  - [Heroku](https://heroku.com/)
- Estilização:
  - [TailwindCSS](https://tailwindcss.com/)
  - [DaisyUI](https://daisyui.com/), uma biblioteca de componentes criados com TailwindCSS
  - [Heroicons](https://heroicons.com/), ícones em SVG
- Utilitários:
  - [ReactDatePicker](https://reactdatepicker.com/) para selecionar datas
  - [date-fns](https://date-fns.org/) para manipulação de datas

# 📋 Instruções

Clone o projeto:

<!-- TODO: include git url -->
```bash
git clone
```

Após clonar o projeto, instale as dependências:

```bash
npm install
# ou
yarn
```

Preencha o arquivo `.env` com as variáveis necessárias:
```sh
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE1?schema=public
SHADOW_DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE2?schema=public
```

_⚠️ Atenção ⚠️:_

_Para utilizar as migrações do Prisma no Heroku é necessário utilizar dois bancos atrelados ao mesmo app._

_O primeiro banco atrelado ao app é atribuído automaticamente à variável **DATABASE_URL**._

_O segundo será atribuído a uma variável aleatória._

_É necessário substituir **SHADOW_DATABASE_URL** com a variável definida automaticamente no Heroku para o segundo banco ou criar uma nova variável no Heroku (**SHADOW_DATABASE_URL**) que aponte para o segundo banco criado._

(Re)crie e popule o banco de dados:

- Se não tiver as migrações criadas:
```bash
#
npm run db:migrate
npm run db:seed
# ou
yarn db:migrate
yarn db:seed
```

- Se já tiver as migrações criadas:
```bash
#
npm run db:reset
# ou
yarn db:reset
```

# ⚙️ Rodando o projeto

## Modo de Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
npx next dev
```

Abra [http://localhost:3000](http://localhost:3000).
Edite os arquivos para ver as mudanças automaticamente refletidas no navegador.

## Modo de Produção

Compile o projeto:

```bash
npm run build
# ou
yarn build
# ou
npx next build
```

Inicie o servidor compilado localmente:

```bash
npm run start
# ou
yarn start
# ou
npx next start
```
