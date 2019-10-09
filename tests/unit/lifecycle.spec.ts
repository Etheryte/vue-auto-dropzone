import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';

import Component from '@/component/VueAutoDropzone.vue';

describe('lifecycle', () => {
    const loopbackConfig = {
        options: {
            url: 'https://httpbin.org/anything',
        },
    };

    it('throws without config', () => {
        expect(() => {
            shallowMount(Component);
        }).to.throw();
    });

    it('throws without URL config', () => {
        expect(() => {
            shallowMount(Component, {
                propsData: {
                    options: {},
                },
            });
        }).to.throw('No URL provided.');
    });

    it('mounts with basic config', () => {
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        expect(wrapper.text()).to.include('Drop files here to upload');
    });

    it('supports slots', () => {
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
            slots: {
                default: '<div>slot content</div>',
            },
        });
        expect(wrapper.text()).to.equal('slot content');
    });

    it('mirrors method overwriting to internal instance', () => {
        const fn = () => {};
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        const vm = wrapper.vm as any;
        vm.destroy = fn;
        expect(vm.instance.destroy).to.equal(fn);
    });

    it('destroys instance on unmount', () => {
        const spy = sinon.stub();
        const wrapper = shallowMount(Component, {
            propsData: loopbackConfig,
        });
        (wrapper.vm as any).destroy = spy;
        wrapper.destroy();
        expect(spy.calledOnce).to.equal(true);
    });
});
