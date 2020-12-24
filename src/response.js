const serializeBody = (e) =>
  Object.getOwnPropertyNames(e).reduce((it, key) => {
    // Don't include stack in json response
    if (key === 'stack') return it;

    it[key] = e[key];
    return it;
  }, {});

export default (res) => (response = {}) => {
  if (typeof response === 'string') return res.send(response);

  const { body: bd, headers = {}, code = 200, ...rest } = response;

  res.status(code);
  if (headers) {
    Object.entries(headers).forEach(([k, v]) => res.header(k, v));
  }

  if (typeof bd === 'string') {
    return res.send(bd);
  }

  if (bd) {
    return res.json(serializeBody(bd));
  }

  if (Object.keys(rest).length > 0) {
    return res.json(serializeBody(rest));
  }

  res.send();
};
