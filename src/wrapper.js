/* eslint-disable no-param-reassign */
import request from './request';
import response from './response';

export default (fn) => (req, res) => {
  const res2 = response(res);
  try {
    const req2 = request(req);
    const fnRes = fn(req2);

    return res2(fnRes);
  } catch (e) {
    const { code = 500, ...rest } = e;
    return res2({
      code,
      body: rest,
    });
  }
};
