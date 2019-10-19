module.exports = {
  outputDir: process.env.VUE_APP_BUILD_MODE === 'SSR' ? `dist-${process.env.VUE_APP_SSR_ENTRY.toLowerCase()}` : 'dist',
  chainWebpack: (config) => {
    config
      .entry('app').clear().add('./src/entry-client.js');
    if (process.env.VUE_APP_BUILD_MODE === 'SSR') {
      // for cache-loader directory
      config.module.rule('vue').use('cache-loader').tap((options) => {
        options.cacheIdentifier += `-${process.env.VUE_APP_SSR_ENTRY.toLowerCase()}`;
        options.cacheDirectory += `-${process.env.VUE_APP_SSR_ENTRY.toLowerCase()}`;
        return options
      });
      switch (process.env.VUE_APP_SSR_ENTRY) {
        case 'CLIENT':
          config
            .entry('app').clear().add('./src/entry-client.js');
          break;
        case 'SERVER':
          config
            .entry('app').clear().add('./src/entry-server.js').end()
            .output.libraryTarget('commonjs2').libraryExport('default').filename('[name].js').end()
            .optimization.splitChunks(false).end()
            .target('node');
          break;
        case 'RENDERER':
          config
            .entry('app').clear().add('./src/entry-renderer.js').end()
            .output.library('RENDERED').end()
            .node.set('module', 'empty').end()
            .optimization.clear().end()
            .plugins.delete('vue-loader').end()
            .module.rules.clear();
          break;
        case 'SERVER-RENDERER':
          config
            .entryPoints.delete('app').end()
            .entry('server').add('./src/entry-server-renderer.js')
            .end()
            .output.library('RENDERED').libraryExport('default').filename('[name].js').globalObject('this')
            .end()
            .node.set('module', 'empty').end()
            .optimization.delete('splitChunks').end()
            // .module.rule('js').use('babel-loader').loader('babel-loader').options({
            //   plugins: [
            //     'dynamic-import-webpack',
            //     'remove-webpack',
            //   ],
            // })
            .end();
          break;
        default:
      }
    }
  },
};
