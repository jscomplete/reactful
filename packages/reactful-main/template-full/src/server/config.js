const env = process.env;

module.exports = {
  port: env.PORT || 4242,
  host: env.HOST || 'localhost',
  isDev: env.NODE_ENV !== 'production',
  isBrowser: typeof window !== 'undefined',
};
