import { routes } from '.';

describe('test router', () => {
  it('should return "/"', () => {
    expect(routes['/']()).toBe('/');
  });

  it('should return "/nexus"', () => {
    expect(routes['/nexus']()).toBe('/nexus');
  });

  it('should return "/chain"', () => {
    expect(routes['/chain']()).toBe('/chain');
  });

  it('should return "/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4"', () => {
    expect(
      routes['/address']({
        id: 'S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4',
      }),
    ).toBe('/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4');
  });

  it('should return "/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0"', () => {
    expect(
      routes['/block']({
        id: '9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
      }),
    ).toBe(
      '/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
    );
  });

  it('should return "/contract?id=account&tab=overview"', () => {
    expect(
      routes['/contract']({
        id: 'account',
        tab: 'overview',
      }),
    ).toBe('/contract?id=account&tab=overview');
  });

  it('should return "/dao?id=masters&tab=overview"', () => {
    expect(
      routes['/dao']({
        id: 'masters',
        tab: 'overview',
      }),
    ).toBe('/dao?id=masters&tab=overview');
  });

  it('should return "/token?id=soul&tab=overview"', () => {
    expect(
      routes['/token']({
        id: 'soul',
        tab: 'overview',
      }),
    ).toBe('/token?id=soul&tab=overview');
  });

  it('should return "/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55"', () => {
    expect(
      routes['/transaction']({
        id: '6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
      }),
    ).toBe(
      '/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
    );
  });
});
