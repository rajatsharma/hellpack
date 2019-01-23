module.exports = {
  presets: ['@lectro/babel-preset-lectro', '@babel/preset-flow'].map(x =>
    require.resolve(x),
  ),
};
