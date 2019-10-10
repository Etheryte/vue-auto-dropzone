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
import { Vue, Component, Prop } from 'vue-property-decorator';

import { IDropzoneOptions } from './interfaces';

import GeneratedBase from './Generated.vue';

import Dropzone from 'dropzone';

// Only mount manually
Dropzone.autoDiscover = false;

@Component
export default class VueAutoDropzone extends GeneratedBase {
    @Prop({
        type: Object,
        required: true,
        validator: (value) => typeof value === 'object' && !!value.url,
    })
    options!: IDropzoneOptions;

    @Prop({
        type: Boolean,
        required: false,
        default: true,
    })
    includeStyling!: Boolean;

    @Prop({
        type: Boolean,
        required: false,
        default: true,
    })
    destroyDropzone!: Boolean;

    private hasBeenMounted = false;

    mounted() {
        // Dropzone requires window to mount
        if (typeof window === 'undefined') return;
        if (this.$isServer && this.hasBeenMounted) return;
        this.hasBeenMounted = true;

        this.instance = new Dropzone(this.$el as HTMLElement, this.options) as GeneratedBase['instance'];

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

    setOptions(value: Partial<IDropzoneOptions>) {
        Object.assign(this.instance.options, value);
    }

    getOption(key: keyof IDropzoneOptions) {
        return this.instance.options[key];
    }

    setOption(key: keyof IDropzoneOptions, value: any) {
        this.instance.options[key] = value;
    }
};
</script>
<style src="./generated.css"></style>
