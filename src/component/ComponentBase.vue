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
// $$HEADER
import { Vue, Component, Prop } from 'vue-property-decorator';

import Dropzone, { DropzoneOptions } from 'dropzone';

// Only mount manually
Dropzone.autoDiscover = false;

export interface IDropzoneOptions extends DropzoneOptions {
    url: string;
}

export interface IDropzoneInstance extends Dropzone {
    // Dropzone type definitions incorrectly identify this as static on instances
    options: IDropzoneOptions;
    // This field is missing from the official types
    events: string[];
}

// Dropzone type definitions aren't up to date, hint the user where possible
interface TypeHints {
    // $$TYPE_HINTS
}

// Assuming every key has a hint, TypeHints will be provided by the generator
type UntypedKeys = Exclude<keyof TypeHints, keyof IDropzoneInstance>;
type UntypedFields = Pick<TypeHints, UntypedKeys>;
type CombinedInstance = IDropzoneInstance & UntypedFields;

@Component
export default class VueAutoDropzone extends Vue {
    private instance!: CombinedInstance;

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

        this.instance = new Dropzone(this.$el as HTMLElement, this.options) as CombinedInstance;

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
        // @ts-ignore
        this.instance.options[key] = value;
    }

    // $$COMBINED_PARTIALS
};
</script>
<style src="./vueAutoDropzone.css"></style>
