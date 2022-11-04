const fastify = require('fastify');
const db = require('./plugin/database');
const testRoute = require('./route/tempTestRoute');
const swaggerPg = require('./plugin/swagger');
const userRoute = require('./route/user');

const build = (opts = {}) => {
  const app = fastify(opts);

  // register plugins
  app.register(db);
  app.register(swaggerPg);

  // register route
  app.register(testRoute, { prefix: 'api/v1/test' });
  app.register(userRoute, { prefix: 'api/v1/users' });

  app.get('/', (request, reply) => {
    reply.send({ hello: 'world. I am done with CI/CD for the very first time.' });
  });
  return app;
};

module.exports = build;
