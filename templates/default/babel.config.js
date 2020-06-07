module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/env',
      {
        targets: [
          '> 1%',
          'last 3 versions',
          'ie >= 9',
          'ios >= 8',
          'android >= 4.2',
        ],
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
