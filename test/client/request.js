const amqp = require('amqplib');

(async () => {
  const conn = await amqp.connect('amqp://localhost');
  const ch = await conn.createChannel();
  const queue = await ch.assertQueue('rpc_queue');
  ch.sendToQueue(queue.queue, Buffer.from('client test'));
  await conn.close();
})();
