const app = require('./app');
require('dotenv')


const PORT = process.env.PORT;

const server = app.listen(PORT, async () => {
    console.log(`rodando na porta ${PORT}`);
});

module.exports = server;