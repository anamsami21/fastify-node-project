// this will add.env variables to process.env
require('dotenv').config();

const PORT = process.env.PORT || 8000;

const server = require('./src/app')({
  logger: {
    level: 'info',
    pinoPretty: true,
  },
});

const start = async () => {
  try {
    await server.listen(PORT, '0.0.0.0');
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
