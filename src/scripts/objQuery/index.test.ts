import { objToQuery, queryToObj } from '.';

describe('test object to query string conversion', () => {
  it('should convert `{ a: 1, b: "lorem" }` to "?a=1&b=lorem"', () => {
    expect(objToQuery({ a: 1, b: 'lorem' })).toBe('?a=1&b=lorem');
  });

  it('should convert "?a=1&b=lorem" to `{ a: "1", b: "lorem" }`', () => {
    expect(queryToObj('?a=1&b=lorem')).toEqual({ a: '1', b: 'lorem' });
  });
});
