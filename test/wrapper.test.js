import { wrapper, ApiError } from '../src';

const event = {
  pathParameters: {
    slug: 'test',
  },
  queryStringParameters: {
    next: 10,
  },
};

describe.only('wrapper', () => {
  it('success defaults', async () => {
    const handler = () => ({
      foo: 'bar',
    });

    const result = await wrapper(handler)(event);
    expect(result).toMatchSnapshot();
  });

  it('normal response if nothing returned', async () => {
    const handler = () => undefined;

    const result = await wrapper(handler)(event);
    expect(result).toMatchSnapshot();
  });

  it('success custom headers and body', async () => {
    const handler = () => ({
      headers: {
        'Content-Type': 'text/html',
      },
      body: '<h1>hello</h1>',
    });

    const result = await wrapper(handler)(event);
    expect(result).toMatchSnapshot();
  });

  it('error defaults', async () => {
    const handler = () => {
      throw new Error('foo');
    };

    const result = await wrapper(handler)(event);
    expect(result).toMatchSnapshot();
  });

  it('custom error', async () => {
    const handler = () => {
      throw new ApiError('Unauthorized', { code: 401, description: 'nope' });
    };

    const result = await wrapper(handler)(event);
    expect(result).toMatchSnapshot();
  });
});
