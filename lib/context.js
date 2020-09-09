const AmqpKoaError = require('./amqp-koa-error');

module.exports = class Context {
  constructor() {
    this.request = null;
    this.response = null;
    this.app = null;
    this.req = null;
    this.res = null;
    this.amqp = null;
  }

  inspect() {
    return this.toJSON();
  }

  toJSON() {
    return {
      request: this.request.toJSON(),
      response: this.response.toJSON(),
      app: this.app.toJSON(),
      req: '<original node req>',
      res: '<original node res>',
      amqp: '<original node socket>',
    };
  }

  // eslint-disable-next-line class-methods-use-this
  throw(args) {
    throw new AmqpKoaError(args);
  }
};
