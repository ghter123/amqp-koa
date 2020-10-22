const assert = require('assert');
const AmqpRpc = require('../../lib/application');
const request = require('../client/request');

describe('app.use(fn)', () => {
  it('should compose middleware', async () => {
    const app = new AmqpRpc();
    const calls = [];

    app.use((ctx, next) => {
      calls.push(1);
      return next().then(() => {
        calls.push(6);
      });
    });

    app.use((ctx, next) => {
      calls.push(2);
      return next().then(() => {
        calls.push(5);
      });
    });

    app.use((ctx, next) => {
      calls.push(3);
      return next().then(() => {
        calls.push(4);
      });
    });

    const server = app.listen();

    await request(server)
      .get('/')
      .expect(404);

    assert.deepEqual(calls, [1, 2, 3, 4, 5, 6]);
  });

  it('should compose mixed middleware', async () => {
    process.once('deprecation', () => {}); // silence deprecation message
    const app = new AmqpRpc();
    const calls = [];

    app.use((ctx, next) => {
      calls.push(1);
      return next().then(() => {
        calls.push(6);
      });
    });

    app.use(async (next) => {
      calls.push(2);
      await next();
      calls.push(5);
    });

    app.use((ctx, next) => {
      calls.push(3);
      return next().then(() => {
        calls.push(4);
      });
    });

    const server = app.listen();

    await request(server)
      .get('/')
      .expect(404);

    assert.deepEqual(calls, [1, 2, 3, 4, 5, 6]);
  });

  it('should catch thrown errors in non-async functions', () => {
    const app = new AmqpRpc();

    app.use((ctx) => ctx.throw('Not Found', 404));

    return request(app.callback())
      .get('/')
      .expect(404);
  });

  it('should accept both generator and function middleware', () => {
    process.once('deprecation', () => {}); // silence deprecation message
    const app = new AmqpRpc();

    app.use((ctx, next) => next());
    app.use(function* (next){ this.body = 'generator'; });

    return request(app.callback())
      .get('/')
      .expect(200)
      .expect('generator');
  });

  it('should throw error for non-function', () => {
    const app = new AmqpRpc();

    [null, undefined, 0, false, 'not a function'].forEach((v) => {
      assert.throws(() => app.use(v), /middleware must be a function!/);
    });
  });

  it('should output deprecation message for generator functions', (done) => {
    process.once('deprecation', (message) => {
      assert(/Support for generators will be removed/.test(message));
      done();
    });

    const app = new AmqpRpc();
    app.use(function* (){});
  });
});
