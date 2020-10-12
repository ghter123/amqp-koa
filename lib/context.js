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

  onerror(err) {
    this.channel.end(err);
  }
};
