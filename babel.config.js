module.exports = {
  presets:[
    [
      '@babel/env',
      {
        'modules': false,
        'targets': {
          "browsers": ["last 8 versions", "not dead"]
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-private-methods',
  ]
};
