const app = require('./app');
require('dotenv').config();


// const PORT = process.env.PORT;

// const server = app.listen(PORT, async () => {
//     console.log(`rodando na porta ${PORT}`);
// });

module.exports = app;