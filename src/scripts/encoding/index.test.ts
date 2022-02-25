import { encode, decode } from '.';

describe('test encoding/decoding', () => {
  const params = {
    page: 1,
    pageSize: 50,
  };

  const encoded = encode(params);
  const decoded = decode(encoded);

  it('should encode params into string', () => {
    expect(encoded).not.toBe(JSON.stringify(params));
  });

  it('should decode string into params', () => {
    expect(decoded).toEqual(params);
  });
});
