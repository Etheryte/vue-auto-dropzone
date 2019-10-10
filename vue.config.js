const webpack = require('webpack');

const banner = `
vue-auto-dropzone

Copyright (c) 2019, Karl Tarvas <info@karltarvas.com>
Original licensing applies for dependencies, bundled and otherwise

More info available: https://github.com/Etheryte/vue-auto-dropzone
Build date: ${new Date(Date.now()).toISOString()}
Build hash: [hash]
`;

module.exports = {
    productionSourceMap: true,
    css: {
        extract: false,
    },
    /*
    plugins: [
            new webpack.BannerPlugin({
                banner: banner,
                entryOnly: true,
            }),
        ],
    */
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return;

        config.module.rules.forEach(rule => {
            if (rule.use) {
                let idx = rule.use.findIndex(w => w.loader === 'thread-loader');
                if (idx !== -1) rule.use.splice(idx, 1);
            }
        });

        // config.plugin(webpack.BannerPlugin);
    },
    // Generate TS types, see https://github.com/vuejs/vue-cli/issues/1081#issuecomment-473530301
    chainWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return;

        // TODO: Test. disable cache (not sure if this is actually useful...)
        config.module.rule('ts').uses.delete('cache-loader');

        config.module
            .rule('ts')
            .use('ts-loader')
            .loader('ts-loader')
            .tap(opts => {
                opts.transpileOnly = false;
                opts.happyPackMode = false;
                // Only generate types for bundled files, see https://github.com/vuejs/vue-cli/issues/1081#issuecomment-473560196
                opts.onlyCompileBundledFiles = true;
                return opts;
            });
    },
};
