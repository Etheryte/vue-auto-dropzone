import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Component from '@/components/vue-auto-dropzone.vue';

describe('lifecycle', () => {
    const loopbackConfig = {
        options: {
            url: 'https://httpbin.org/anything',
        },
    };

    it('throws without URL config', () => {
        expect(() => {
            shallowMount(Component);
        }).to.throw('No URL provided.');
    });

    it('mounts with basic config', () => {
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        expect(wrapper.text()).to.include('Drop files here to upload');
    });

    it('destroys instance on unmount', () => {
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        // https://vue-test-utils.vuejs.org/api/wrapper/#destroy
    });

    it('accepts files', () => {
        // https://vue-test-utils.vuejs.org/api/wrapper/#trigger
    });

    it('emits basic events', () => {
        // https://vue-test-utils.vuejs.org/api/wrapper/#emitted
    });
});
