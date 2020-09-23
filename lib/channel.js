module.exports = class Channel {
  constructor() {
    this.ch = null;
    this.queue = null;
  }

  async end(data) {
    this.ch.send();
    this.ch.close();
  }
};
