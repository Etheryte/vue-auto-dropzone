const webpack = require('webpack');

const banner = `
vue-auto-dropzone

Copyright (c) 2019, Karl Tarvas <info@karltarvas.com>

More info available: https://github.com/Etheryte/vue-auto-dropzone
Build date: ${new Date(Date.now()).toISOString()}
Build hash: [hash]
`;

module.exports = {
    productionSourceMap: false,
    css: {
        extract: false,
    },
    configureWebpack: {
        plugins: [
            new webpack.BannerPlugin({
                banner: banner,
                entryOnly: true,
            }),
        ],
    },
};
