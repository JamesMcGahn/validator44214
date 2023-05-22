require('dotenv').config();
const dbConnect = require('./utils/dbConnect');
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

dbConnect();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
