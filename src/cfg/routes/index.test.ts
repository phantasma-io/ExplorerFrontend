import { routes } from '.';

describe('test en router', () => {
  it('should return "/en"', () => {
    expect(routes['/']('en')).toBe('/en');
  });

  it('should return "/en/nexus"', () => {
    expect(routes['/nexus']('en')).toBe('/en/nexus');
  });

  it('should return "/en/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4"', () => {
    expect(
      routes['/address']('en', {
        id: 'S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4',
      }),
    ).toBe('/en/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4');
  });

  it('should return "/en/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0"', () => {
    expect(
      routes['/block']('en', {
        id: '9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
      }),
    ).toBe(
      '/en/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
    );
  });

  it('should return "/en/token?id=soul&tab=overview"', () => {
    expect(
      routes['/token']('en', {
        id: 'soul',
        tab: 'overview',
      }),
    ).toBe('/en/token?id=soul&tab=overview');
  });

  it('should return "/en/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55"', () => {
    expect(
      routes['/transaction']('en', {
        id: '6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
      }),
    ).toBe(
      '/en/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
    );
  });
});

describe('test pt router', () => {
  it('should return "/pt"', () => {
    expect(routes['/']('pt')).toBe('/pt');
  });

  it('should return "/pt/nexus"', () => {
    expect(routes['/nexus']('pt')).toBe('/pt/nexus');
  });

  it('should return "/pt/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4"', () => {
    expect(
      routes['/address']('pt', {
        id: 'S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4',
      }),
    ).toBe('/pt/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4');
  });

  it('should return "/pt/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0"', () => {
    expect(
      routes['/block']('pt', {
        id: '9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
      }),
    ).toBe(
      '/pt/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
    );
  });

  it('should return "/pt/token?id=soul&tab=overview"', () => {
    expect(
      routes['/token']('pt', {
        id: 'soul',
        tab: 'overview',
      }),
    ).toBe('/pt/token?id=soul&tab=overview');
  });

  it('should return "/pt/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55"', () => {
    expect(
      routes['/transaction']('pt', {
        id: '6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
      }),
    ).toBe(
      '/pt/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
    );
  });
});

describe('test de router', () => {
  it('should return "/de"', () => {
    expect(routes['/']('de')).toBe('/de');
  });

  it('should return "/de/nexus"', () => {
    expect(routes['/nexus']('de')).toBe('/de/nexus');
  });

  it('should return "/de/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4"', () => {
    expect(
      routes['/address']('de', {
        id: 'S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4',
      }),
    ).toBe('/de/address?id=S3d7TbZxtNPdXy11hfmBLJLYn67gZTG2ibL7fJBcVdihWU4');
  });

  it('should return "/de/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0"', () => {
    expect(
      routes['/block']('de', {
        id: '9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
      }),
    ).toBe(
      '/de/block?id=9AD4C0C9602FBA780496D0569DDEF9FD64BA7FC6B1FB13CC35AD5CD6FA1C72C0',
    );
  });

  it('should return "/de/token?id=soul&tab=overview"', () => {
    expect(
      routes['/token']('de', {
        id: 'soul',
        tab: 'overview',
      }),
    ).toBe('/de/token?id=soul&tab=overview');
  });

  it('should return "/de/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55"', () => {
    expect(
      routes['/transaction']('de', {
        id: '6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
      }),
    ).toBe(
      '/de/transaction?id=6DC8D95C32D1517DE55EB4D8A46BF23235CE3DCFA38079398AC01F5C182CFF55',
    );
  });
});
