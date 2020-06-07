const env = process.env;

export default {
  port: Number(env.PORT || 1234),
  host: env.HOST || 'localhost',
  isDev: env.NODE_ENV !== 'production',
  isBrowser: typeof window !== 'undefined',
};
