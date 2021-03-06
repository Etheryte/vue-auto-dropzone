import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Component from '@/component/VueAutoDropzone.vue';

describe('configuration', () => {
    const loopbackConfig = {
        options: {
            url: 'https://httpbin.org/anything',
        },
    };

    it('internal instance methods can be set', () => {
        const fn = () => { };
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        const vm = wrapper.vm as any;
        vm.setDestroy(fn);
        expect(vm.instance.destroy).to.equal(fn);
    });

    // This is provided by Dropzone, this simply checks whether that ever changes and breaks since it's mistyped
    it('exposes options as an instance member', () => {
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        expect(typeof wrapper.options).to.not.equal('undefined');
    });

    it('gets individual options', () => {
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        const vm = wrapper.vm as any;
        expect(vm.getOption('url')).to.equal(loopbackConfig.options.url);
    });

    it('sets individual options', () => {
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        const vm = wrapper.vm as any;
        vm.setOption('url', 'new value');
        expect(vm.getOption('url')).to.equal('new value');
    });

    it('sets individual function options', () => {
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        const vm = wrapper.vm as any;
        const value = () => {};
        vm.setOption('sending', value);
        expect(vm.getOption('sending')).to.equal(value);
    });

    it('sets multiple options', () => {
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        const vm = wrapper.vm as any;
        vm.setOptions({
            url: 'new value',
            timeout: 1234,
        });
        expect(vm.getOption('url')).to.equal('new value');
        expect(vm.getOption('timeout')).to.equal(1234);
    });
});
