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
        prependData: "@import \"@/assets/scss/abstracts/abstracts.scss\";",
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    host: "127.0.0.1",
    port: 8080,
    https: false,
  },
  
};
