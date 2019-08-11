module.exports = function(api) {
    api.cache(true);
    return {
        presets: ["minify"],
        plugins: [
          "@babel/plugin-transform-react-jsx",
          "@babel/plugin-proposal-class-properties"
        ],
    };
};
