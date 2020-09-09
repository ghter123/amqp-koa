const Emitter = require('events');
const context = require('./context');

module.exports = class Appcliation extends Emitter {
  constructor(options) {
    super();
    const configs = options || {};
    this.env = configs.env || process.env.NODE_ENV || 'development';
    this.middleware = [];
    this.context = Object.create(context);
  }
};
