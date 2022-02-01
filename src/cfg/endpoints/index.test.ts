import { endpoints, url } from '.';

describe('test endpoints', () => {
  it(`should return "${url}/addresses"`, () => {
    expect(endpoints['/addresses']()).toBe(`${url}/addresses`);
  });
  it(`should return "${url}/chains"`, () => {
    expect(endpoints['/chains']()).toBe(`${url}/chains`);
  });
  it(`should return "${url}/contracts"`, () => {
    expect(endpoints['/contracts']()).toBe(`${url}/contracts`);
  });
  it(`should return "${url}/instructions"`, () => {
    expect(endpoints['/instructions']()).toBe(`${url}/instructions`);
  });
  it(`should return "${url}/eventkinds"`, () => {
    expect(endpoints['/eventkinds']()).toBe(`${url}/eventkinds`);
  });
  it(`should return "${url}/events"`, () => {
    expect(endpoints['/events']()).toBe(`${url}/events`);
  });
  it(`should return "${url}/nfts"`, () => {
    expect(endpoints['/nfts']()).toBe(`${url}/nfts`);
  });
  it(`should return "${url}/organizations"`, () => {
    expect(endpoints['/organizations']()).toBe(`${url}/organizations`);
  });
  it(`should return "${url}/series"`, () => {
    expect(endpoints['/series']()).toBe(`${url}/series`);
  });
  it(`should return "${url}/tokens"`, () => {
    expect(endpoints['/tokens']()).toBe(`${url}/tokens`);
  });
  it(`should return "${url}/transactions"`, () => {
    expect(endpoints['/transactions']()).toBe(`${url}/transactions`);
  });
});
