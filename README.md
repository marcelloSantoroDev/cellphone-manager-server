# Cellphone Manager - Server Side

Esta é uma aplicação para o servidor de uma aplicação que gerencia dados de celulares.
Esta aplicação foi criada com `Node.js`, `Express.js` e `Sequelize`

A aplicação possui três tabelas:
- `users`
- `products`
- `details` -- Tabela relacionada a `products`, permitindo que seja criada uma API de estrutura complexa, capaz de adicionar, para um mesmo produto, diferentes cores e preços.

Para a tabela `users`, é possível criar um novo usuário com `nome`, `email`, e `senha`. Esta é criptografada usando a livraria `bcrypt`. Ao passo que o usuário realiza o sign up, é gerado um `token` usando `jsonwebtoken`. Sem este token, não é possível navegar para as seguintes rotas no front-end. Nesta tabela, também é possível fazer um login, através do qual o usuário também recebe um token, após seu e-mail e sua senha terem sido validados.

Para a tabela `products` e `details`, é possível fazer um CRUD, sendo possível também visualizar todos os produtos juntos em uma mesma query.

O usuário também pode realizar o log out, tendo seu token destruído.

--------------------------------------------------------------------------------

## Cellphone Manager - Server Side
This is an application for the server side of a system that manages cellphone data. The application is built using `Node.js`, `Express.js`, and `Sequelize`.

The application consists of three tables:

- `users`
- `products`
- `details` -- A table related to products, enabling the creation of a complex API structure capable of adding different colors and prices for the same product.
  
For the `users` table, it is possible to create a new user with `name`, `email`, and `password`. The password is encrypted using the `bcrypt` library. When the user signs up, a `token` is generated using `jsonwebtoken`. Without this token, it is not possible to navigate to the following routes on the front-end. In this table, it is also possible to log in, and the user receives a token after their email and password have been validated.

For the `products` and `details` tables, CRUD operations are possible, and it is also possible to view all products together in a single query.

The user can also log out, destroying their token.
