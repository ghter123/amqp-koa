module.exports = class AmqpKoaError {
  constructor({ status, msg, props }) {
    this.status = status || 500;
    this.msg = msg || 'internal server error ';
    this.props = props;
  }
};
