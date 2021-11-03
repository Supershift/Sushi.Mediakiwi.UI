module.exports = {
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
  }
};
