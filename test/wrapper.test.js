import { wrapper, ApiError } from '../src';

const harness = async (fn) => {
  const res = {
    status: jest.fn(),
    header: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
  };

  const req = {
    path: {
      slug: 'test',
    },
    query: {
      next: 10,
    },
  };

  await wrapper(fn)(req, res, jest.fn());
  return {
    req, 
    res,
  }
};

describe('wrapper', () => {
  it('success defaults', async () => {
    const handler = async () => ({
      foo: 'bar',
    });

    const { res } = await harness(handler);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('normal response if nothing returned', async () => {
    const handler = () => undefined;

    const { res } = await harness(handler);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });

  it('success custom headers and body', async () => {
    const handler = () => ({
      headers: {
        'Content-Type': 'text/html',
      },
      body: '<h1>hello</h1>',
    });

    const { res } = await harness(handler);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith('<h1>hello</h1>');
    expect(res.header).toHaveBeenCalledWith('Content-Type', 'text/html');
  });

  it('error defaults', async () => {
    const handler = () => {
      throw new Error('foo');
    };

    const { res } = await harness(handler);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({});
  });

  it('custom error', async () => {
    const handler = () => {
      throw new ApiError('Unauthorized', { code: 401, description: 'nope' });
    };

    const { res } = await harness(handler);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      description: 'nope',
      message: 'Unauthorized', 
      name: 'ApiError',
    });
  });
});
