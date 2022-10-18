const tempService = require('../../service/temp.service');
const { postRequestBody, postResponse, getResponseBody } = require('./temp.schema');

const route = async (fastify) => {
  // get route api/v1/test
  const { getAll, save } = tempService(fastify);
  fastify.get('/',{schema: { response: getResponseBody}}, async (request, reply) => {
    const allTest = await getAll();

    reply.code(200).send({
      temps: allTest
    });
  });

  // post route api/v1/test

  fastify.post(
    '/',
    { schema: { body: postRequestBody , response: postResponse} },
    async (request, reply) => {
      fastify.log.info(`request with body ${request}`);
      const { title } = request.body;

      const id = await save(title);

      reply.code(201).send(id);
    }
  );
};

module.exports = route;
