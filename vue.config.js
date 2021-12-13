module.exports = {
  pages: {
    index: {
      entry: "src/main.ts",
      title: "Mediakiwi"
    }
  },
  publicPath: "/",
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import \"@/assets/scss/styles.scss\";",
      },
    },
  },
  configureWebpack: {
    devtool: "source-map"
  },
};
