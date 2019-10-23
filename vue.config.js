const webpack = require('webpack');
const path = require('path');

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
    configureWebpack: config => {
        if (process.env.NODE_ENV !== 'production') return;

        config.module.rules.forEach(rule => {
            if (rule.use) {
                let idx = rule.use.findIndex(w => w.loader === 'thread-loader');
                if (idx !== -1) rule.use.splice(idx, 1);
            }
        });
    },
    chainWebpack: config => {
        // Make dist available for tests
        // See: https://webpack.js.org/configuration/resolve/
        config.resolve.alias.set('dist', path.join(__dirname, 'dist'));

        // The rest is production-only
        if (process.env.NODE_ENV !== 'production') return;

        config.plugin('banner')
            .use(webpack.BannerPlugin, [{
                banner: banner,
                entryOnly: true,
            }]);

        // TODO: Test: disable cache (not sure if this is actually useful...)
        config.module.rule('ts').uses.delete('cache-loader');

        // Generate TS types, see https://github.com/vuejs/vue-cli/issues/1081#issuecomment-473530301
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
