const fastify = require('fastify')({logger: true});
const path = require('path');

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname + "/../", 'dist'),
  prefix: '/', // optional: default '/'
  //constraints: { host: 'example.com' } // optional: default 
})

fastify.setNotFoundHandler(function (request, reply) {
    reply.sendFile("index.html");
});

// Run the server!
fastify.listen({ port: 3003 }, (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})