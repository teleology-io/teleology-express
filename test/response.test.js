import { response } from '../src';

const harness = (...args) => {
  const send = jest.fn();
  const status = jest.fn();
  const header = jest.fn();
  const mock = {
    send,
    status,
    header,
    json: (some) => {
      header('Content-Type', 'application/json');
      send(JSON.stringify(some));
    },
  };

  response(mock)(...args);
  return mock;
}

describe('response', () => {
  it('uses defaults', () => {
    const res = harness({ body: {} });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.header).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.send).toHaveBeenCalledWith('{}');
  });

  it('stringifies body data', () => {
    const res = harness({
      body: {
        foo: 'bar',
      },
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.header).toHaveBeenCalledWith('Content-Type', 'application/json');
    expect(res.send).toHaveBeenCalledWith(JSON.stringify({ foo: 'bar' }));
  });

  it('overrides headers', () => {
    const res = harness({ headers: { 'Content-Type': 'text/plain' }, body: '' });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.header).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.send).toHaveBeenCalledWith('');
  });

  it('overrides code', () => {
    const res = harness({ code: 500 });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalled();
  });
});
