const AmqpKoaError = require('./amqp-koa-error');

module.exports = class Context {
  constructor() {
    this.request = null;
    this.response = null;
    this.app = null;
    this.amqp = null;
    this.channel = null;
  }

  inspect() {
    return this.toJSON();
  }

  toJSON() {
    return {
      request: this.request.toJSON(),
      response: this.response.toJSON(),
      app: this.app.toJSON(),
      amqp: '<original node socket>',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  // throw(args) {
  //   throw new AmqpKoaError(args);
  // }
  onerror(err) {
    this.channel.end(err);
  }
};
