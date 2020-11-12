const { inherits } = require('util');

function ApiError(message, properties) {
  this.name = 'ApiError';
  this.message = message || '';

  Object.assign(
    this,
    {
      code: 500,
    },
    properties,
  );
  Error.captureStackTrace(this, ApiError);
}

inherits(ApiError, Error);

export default ApiError;
