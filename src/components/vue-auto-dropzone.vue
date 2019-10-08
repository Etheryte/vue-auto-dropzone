<template>
    <div :id="id" :class="{ 'dropzone': includeStyling }">
        <div v-if="this.$slots.default && this.$slots.default.length" :class="{ 'dz-message': includeStyling }">
            <slot>Drop files here to upload</slot>
        </div>
    </div>
</template>
<script lang="ts">
// TODO: SSR
import Vue from 'vue';
import Component from 'vue-class-component';

import { methodPartials, computedPartials } from './generated';

import Dropzone from 'dropzone';

// Only mount manually
Dropzone.autoDiscover = false;

@Component({
    props: {
        options: {
            type: Object,
            required: true,
            default: () => ({}),
        },
        includeStyling: {
            type: Boolean,
            required: false,
            default: true,
        },
        destroyDropzone: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    methods: {
        ...methodPartials,
    },
    computed: {
        ...computedPartials,
    },
})
export default class VueAutoDropzone extends Vue {
    instance: Dropzone | null = null;
    hasBeenMounted = false;

    mounted() {
        if (this.$isServer && this.hasBeenMounted) {
            return;
        }
        this.hasBeenMounted = true;

        this.instance = new Dropzone(this.$el, this.$props.options);
        // Pass every configured event through
        this.instance.events.forEach((eventName) => {
            this.instance.on(eventName, (...args) => {
                // eslint-disable-next-line no-useless-call
                this.$emit.apply(this, [eventName, ...args]);
            });
        });
    }

    beforeDestroy() {
        if (!(this.$props.destroyDropzone && this.instance)) return;
        this.instance.destroy();
        this.instance = null;
    }
};
</script>
<style lang="scss">
// TODO: Direct ref or inline or..?
@import url(https://rawgit.com/enyo/dropzone/master/dist/dropzone.css);
</style>
