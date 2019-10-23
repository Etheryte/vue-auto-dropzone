import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

const CommonJSComponent = require('dist/index.common.js');
const UMDComponent = require('dist/index.umd.js');
const MinUMDComponent = require('dist/index.umd.min.js');

// Basic sanity checks to see that all build formats still work
describe('build', () => {
    const loopbackConfig = {
        options: {
            url: 'https://httpbin.org/anything',
        },
    };

    it('CommonJS mounts with basic config', () => {
        const wrapper = shallowMount(CommonJSComponent, {
            propsData: loopbackConfig,
        });
        expect(wrapper.text()).to.include('Drop files here to upload');
    });

    it('UMD mounts with basic config', () => {
        const wrapper = shallowMount(UMDComponent, {
            propsData: loopbackConfig,
        });
        expect(wrapper.text()).to.include('Drop files here to upload');
    });

    it('minified UMD mounts with basic config', () => {
        const wrapper = shallowMount(MinUMDComponent, {
            propsData: loopbackConfig,
        });
        expect(wrapper.text()).to.include('Drop files here to upload');
    });
});
