module.exports = class Request {
  constructor() {
    this.channel = null;
    this.queue = null;
    this.exchange = null;
    this.msg = null;
  }

  get properties() {
    return this.msg.properties;
  }

  get headers() {
    return this.msg.properties.headers;
  }

  get contentType() {
    return this.msg.properties.contentType;
  }

  get contentEncoding() {
    return this.msg.properties.contentEncoding;
  }

  get deliveryMode() {
    return this.msg.properties.deliveryMode;
  }

  get priority() {
    return this.msg.properties.priority;
  }

  get correlationId() {
    return this.msg.properties.correlationId;
  }

  get replyTo() {
    return this.msg.properties.replyTo;
  }

  get expiration() {
    return this.msg.properties.expiration;
  }

  get messageId() {
    return this.msg.properties.messageId;
  }

  get timestamp() {
    return this.msg.properties.timestamp;
  }

  get type() {
    return this.msg.properties.type;
  }

  get userId() {
    return this.msg.properties.userId;
  }

  get appId() {
    return this.msg.properties.appId;
  }

  get clusterId() {
    return this.msg.properties.clusterId;
  }

  get queue() {
    return this.queue.queue;
  }

  get messageCount() {
    return this.queue.messageCount;
  }

  get consumerCount() {
    return this.queue.consumerCount;
  }

  get exchange() {
    return this.exchange;
  }

  inspect() {
    return this.toJSON();
  }

  toJSON() {
    return JSON.stringify({
      properties: this.properties,
    });
  }

  get channel() {
    return this.channel;
  }
};
