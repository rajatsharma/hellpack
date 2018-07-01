const excludedImports = ["express-helpers", "react-redux/next", "^#"];
const globals = ["fetch", "Transformer", "System"];

const config = {
  parser: "babel-eslint",
  extends: [
    require.resolve("eslint-config-airbnb"),
    require.resolve("eslint-config-prettier")
  ],
  plugins: ["import", "react"],
  globals: globals.reduce(
    (acc, x) => Object.assign({}, acc, { [x]: true }),
    {}
  ),
  rules: {
    "import/no-unresolved": ["error", { ignore: excludedImports }],
    "import/extensions": ["error", "never"],
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ]
  }
};

module.exports = config;
