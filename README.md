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

## Deploy

Você encontrar a aplicação full stack deste repositório no link abaixo:


[Cellphone Manager](https://cellphone-manager-client.vercel.app/){:target="_blank"}

