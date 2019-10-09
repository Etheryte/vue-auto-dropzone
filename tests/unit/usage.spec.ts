import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import sinon from 'sinon';

import Component from '@/component/VueAutoDropzone.vue';

describe('usage', () => {
    const loopbackConfig = {
        options: {
            url: 'https://httpbin.org/anything',
        },
    };

    it('accepts files', () => {
        // https://vue-test-utils.vuejs.org/api/wrapper/#trigger
        // TODO: Implement
    });

    it('emits basic events', () => {
        // https://vue-test-utils.vuejs.org/api/wrapper/#emitted
        // TODO: Implement
    });
});
