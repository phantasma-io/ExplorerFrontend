import { routes } from '.';

describe('test default router', () => {
  it('should return "/en/"', () => {
    expect(routes['/']()).toBe('/en/');
  });

  it('should return "/en/nexus"', () => {
    expect(routes['/nexus']()).toBe('/en/nexus');
  });

  it('should return "/en/chain"', () => {
    expect(routes['/chain']()).toBe('/en/chain');
  });

  it('should return "/en/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4"', () => {
    expect(
      routes['/address']({
        id: 'S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4',
      }),
    ).toBe('/en/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4');
  });

  it('should return "/en/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0"', () => {
    expect(
      routes['/block']({
        id: '9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
      }),
    ).toBe(
      '/en/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
    );
  });

  it('should return "/en/contract?id=account&tab=overview"', () => {
    expect(
      routes['/contract']({
        id: 'account',
        tab: 'overview',
      }),
    ).toBe('/en/contract?id=account&tab=overview');
  });

  it('should return "/en/dao?id=masters&tab=overview"', () => {
    expect(
      routes['/dao']({
        id: 'masters',
        tab: 'overview',
      }),
    ).toBe('/en/dao?id=masters&tab=overview');
  });

  it('should return "/en/token?id=soul&tab=overview"', () => {
    expect(
      routes['/token']({
        id: 'soul',
        tab: 'overview',
      }),
    ).toBe('/en/token?id=soul&tab=overview');
  });

  it('should return "/en/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55"', () => {
    expect(
      routes['/transaction']({
        id: '6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
      }),
    ).toBe(
      '/en/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
    );
  });
});
