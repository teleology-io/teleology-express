import qs from 'querystring';

const extractBody = (body) => {
  let value = body;
  
  try {
    const o = JSON.parse(value);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {
    // do nothing
  }

  try {
    return { ...qs.parse(value) };
  } catch (e) {
    // do nothing
  }

  // Couldn't parse body as object -- return empty for it
  if (typeof body === 'string') {
    return {};
  }

  return body;
};

export default (req) => {
  const { params, query, body, headers } = req;
  const h = Object.keys(headers).reduce((a, key) => {
    a[key.toLowerCase()] = headers[key];
    return a;
  }, {});

  return {
    ...req,
    data: {
      ...params,
      ...query,
      ...extractBody(body),
    },
    headers: h,
  };
};
