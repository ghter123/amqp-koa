module.exports = class Response {
  constructor() {
    this.channel = null;
    this.queue = null;
    this.exchange = null;
    this.msg = null;
  }

  get channel() {
    return this.channel;
  }

  get body() {
    return this.body;
  }

  /**
   * set res body
   *
   * @param {String|Buffer|Object|} val
   */
  set body(val) {
    this.body = val;

    const setType = !this.has('Content-Type');

    if (typeof this.body === 'string' && setType) {
      this.contentType = 'text';
      return;
    }

    if (Buffer.isBuffer(val) && setType) {
      this.contentType = 'bin';
      return;
    }
    if (setType) this.contentType = 'bin';
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

  set contentType(val) {
    this.msg.properties.contentType = val;
  }

  get contentEncoding() {
    return this.msg.properties.contentEncoding;
  }

  set contentEncoding(val) {
    this.msg.properties.contentEncoding = val;
  }

  get deliveryMode() {
    return this.msg.properties.deliveryMode;
  }

  set deliveryMode(val) {
    this.msg.properties.deliveryMode = val;
  }

  get priority() {
    return this.msg.properties.priority;
  }

  set priority(val) {
    this.msg.properties.priority = val;
  }

  get correlationId() {
    return this.msg.properties.correlationId;
  }

  set correlationId(val) {
    this.msg.properties.correlationId = val;
  }

  get replyTo() {
    return this.msg.properties.replyTo;
  }

  set replyTo(val) {
    this.msg.properties.replyTo = val;
  }

  get expiration() {
    return this.msg.properties.expiration;
  }

  set expiration(val) {
    this.msg.properties.expiration = val;
  }

  get messageId() {
    return this.msg.properties.messageId;
  }

  set messageId(val) {
    this.msg.properties.messageId = val;
  }

  get timestamp() {
    return this.msg.properties.timestamp;
  }

  set timestamp(val) {
    this.msg.properties.timestamp = val;
  }

  get type() {
    return this.msg.properties.type;
  }

  set type(val) {
    this.msg.properties.type = val;
  }

  get userId() {
    return this.msg.properties.userId;
  }

  set userId(val) {
    this.msg.properties.userId = val;
  }

  get appId() {
    return this.msg.properties.appId;
  }

  set appId(val) {
    this.msg.properties.appId = val;
  }

  get clusterId() {
    return this.msg.properties.clusterId;
  }

  set clusterId(val) {
    this.msg.properties.clusterId = val;
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

  has(field) {
    return Object.prototype.hasOwnProperty.call(this.msg.properties, field)
    && this.msg.properties[field] !== null;
  }
};
