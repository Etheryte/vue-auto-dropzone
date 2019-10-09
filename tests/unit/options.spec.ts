import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';

import Component from '@/components/vue-auto-dropzone.vue';

describe('lifecycle', () => {
    const loopbackConfig = {
        options: {
            url: 'https://httpbin.org/anything',
        },
    };

    it('mirrors method overwriting to internal instance', () => {
        const fn = () => { };
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        const vm = wrapper.vm as any;
        vm.destroy = fn;
        expect(vm.instance.destroy).to.equal(fn);
    });
});
