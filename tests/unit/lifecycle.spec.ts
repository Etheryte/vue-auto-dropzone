import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Component from '@/components/generated';

describe('HelloWorld.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(Component, {
            propsData: { msg },
        });
        expect(wrapper.text()).to.include(msg);
    });
});
