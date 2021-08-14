# ICubus - desafio04 - modulo05 - backend

## O que é este projeto? 

<p>Este projeto é o quarto e último desafio do Curso intensivo de programação do zero, ministrado pela Cubos Academy. 
Entre as funcionalidades,
consta a criação e edição de clientes, listagem de restaurantes, entre outras.</p>

<p> O projeto possui um código para Front-end que está em outro repositório. Caso exista interesse, <a href='https://github.com/cboscariol/desafio-modulo-05-frontend'>clique aqui</a></p>

 Importante lembrar que para qualquer outro endpoint que não criar usuário ou autenticação, é necessário a inserção do token retornado pelo endpoint de autenticação no campo `Bearer Token`. 

## O que este projeto utiliza?

- javascript;
- `express`, para criar o servidor;
- `dotenv`, para uso das variáveis de ambiente;
- `jsonwebtoken`, para autenticação de sessão com token;
- `bcrypt`, para criptografar senhas;
- `knex`, para criação de querys;
- `yup`, para validações dos parâmetros da requisição;


        

## Funcionalidades

- Autenticação:
  - A funcionalidade de autenticação de sessão funciona requisitando `POST /login`.

- Clientes
  - A funcionalidade de cadastro de clientes funciona requisitando `POST /clientes`;
  - A funcionalidade de obter informações de um cliente logado funciona requisitando `GET /clientes`;
  - A funcionalidade de edição de um cliente logado funciona requisitando `PUT /clientes`.

- Restaurantes
    - A funcionalidade de listar todo os restaurantes cadastrados funciona requisitando `GET /clientes`;


 ## Fluxo da aplicação

 <p> Segue um pequeno fluxo para testar as funcionalidades do projeto: </p>

 1) Cadastrar-se como cliente;
 2) Autenticação do cliente e obtenção do token de acesso;
 3) Edição de cliente;
 4) Obter informações do cliente logado;
 5) Listar os restaurantes já cadastrados
 


