<template>
    <div :class="{ 'dropzone': includeStyling }">
        <template v-if="this.$slots && this.$slots.default && this.$slots.default.length">
            <div v-if="includeStyling" :class="{ 'dz-message': includeStyling }">
                <slot>Drop files here to upload</slot>
            </div>
            <slot v-else>Drop files here to upload</slot>
        </template>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { computedMethodPartials, computedPropertyPartials } from './generated';

import Dropzone, { DropzoneOptions } from 'dropzone';

// Only mount manually
Dropzone.autoDiscover = false;

interface DropzoneInstance extends Dropzone {
    // Dropzone type definitions incorrectly identify this as static on instances
    options: DropzoneOptions;
    // This field is missing from the official types
    events: string[];
}

@Component({
    props: {
        options: {
            type: Object,
            required: true,
            validator: (value) => typeof value === 'object' && !!value.url,
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
    computed: {
        ...computedMethodPartials,
        ...computedPropertyPartials,
    },
})
export default class VueAutoDropzone extends Vue {
    instance!: DropzoneInstance;
    hasBeenMounted = false;

    mounted() {
        // Dropzone requires window to mount
        if (typeof window === 'undefined') return;
        if (this.$isServer && this.hasBeenMounted) return;
        this.hasBeenMounted = true;

        const options: DropzoneOptions = this.$props.options;
        this.instance = new Dropzone(this.$el as HTMLElement, options) as DropzoneInstance;

        // Pass every configured event through
        this.instance.events.forEach((eventName) => {
            this.instance!.on(eventName, (...args) => {
                // eslint-disable-next-line no-useless-call
                this.$emit.apply(this, [eventName, ...args]);
            });
        });
    }

    beforeDestroy() {
        if (!(this.$props.destroyDropzone && this.instance)) return;
        this.instance.destroy();
    }

    getOptions() {
        return this.instance.options;
    }

    setOptions(value: Partial<DropzoneOptions>) {
        Object.assign(this.instance.options, value);
    }

    getOption(key: keyof DropzoneOptions) {
        return this.instance.options[key];
    }

    setOption(key: keyof DropzoneOptions, value: any) {
        this.instance.options[key] = value;
    }
};
</script>
<style src="./generated.css"></style>
