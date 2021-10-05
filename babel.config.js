module.exports = function(api) {
    api.cache(true);
    return {
        presets: [
          ["@babel/preset-env",
          {
            targets: {
              node: 14,
              esmodules: false
            }
          }
        ]],
        plugins: [
          "@babel/plugin-transform-react-jsx",
          "@babel/plugin-proposal-class-properties"
        ],
    };
};
