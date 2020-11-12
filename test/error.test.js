import { ApiError } from '../src';

describe('ApiError', () => {
  it('uses defaults', () => {
    const error = new ApiError();
    expect(error.message).toEqual('');
    expect(error.code).toEqual(500);
  });

  it('custom message', () => {
    const error = new ApiError('something failed');
    expect(error.message).toEqual('something failed');
  });

  it('custom code', () => {
    const error = new ApiError('Unauthorized', { code: 401 });
    expect(error.message).toEqual('Unauthorized');
    expect(error.code).toEqual(401);
  });

  it('additional properties', () => {
    const error = new ApiError('Invalid request: missing username', {
      title: 'Login',
    });
    expect(error.message).toEqual('Invalid request: missing username');
    expect(error.code).toEqual(500);
    expect(error.title).toEqual('Login');
  });

  it('throws correctly', () => {
    const thrower = () => {
      throw new ApiError('An error occured', {
        code: 502,
        title: 'Image Process',
        description: 'Seems like our server failed to process your request',
      });
    };
    expect(thrower).toThrow(ApiError);
  });
});
