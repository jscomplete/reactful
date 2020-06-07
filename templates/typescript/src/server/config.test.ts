import config from './config';

describe('config', () => {
  it('has defaults', () => {
    expect(config.host).toBe('localhost');
    expect(config.port).toBe(1234);
    expect(config.isBrowser).toBe(true);
    expect(config.isDev).toBe(true);
  });
});
