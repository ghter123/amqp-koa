const Emitter = require('events');
const amqp = require('amqplib');
const uuid = require('uuid');
const debug = require('debug')('amqp-rpc:application');
const Context = require('./context');

module.exports = class Appcliation extends Emitter {
  constructor(options) {
    super();
    const configs = options || {};
    this.env = configs.env || process.env.NODE_ENV || 'development';
    this.middleware = [];
    this.context = new Context();
    this.url = options.url || 'amqp://localhost';
    debug(`url set to ${this.url}`);
    this.conn = null;
    this.serverName = options.serverName || uuid();
    debug(`query name set to ${this.serverName}`);
  }

  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
    this.middleware.push(fn);
    return true;
  }

  async listen() {
    this.conn = await amqp.connect(this.url);
    this.channel = await this.conn.createChannel();
    const q = this.serverName;
    await this.channel.assertQueue(q, { durable: true });
    this.channel.prefetch(1);
    this.channel.consume(q, this.onMessage(), {});
    debug(' [x] Awaiting RPC requests');
  }

  onMessage() {
    const fn = this.compose(this.middleware);

    // set default error handle without custom init.
    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (msg) => {
      const ctx = this.createContext(msg);
      return this.handleRequest(ctx, fn);
    };
    return handleRequest;
  }

  handleRequest(ctx, fnMiddleware) {
    const { res } = ctx;
    res.statuscode = ;
  }

  compose(middleware) {

  }

  onerror() {

  }
};
