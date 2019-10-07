module.exports = {
    productionSourceMap: false,
    // Transpile any dependencies which are borked on older browsers
    // See https://cli.vuejs.org/config/#transpiledependencies
    transpileDependencies: [
        'vue-super',
    ],
};
