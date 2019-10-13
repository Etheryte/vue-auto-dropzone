<template>
    <div :class="{ 'dropzone': includeStyling }">
        <template v-if="this.hasSlots">
            <div v-if="includeStyling" :class="{ 'dz-message': includeStyling }">
                <slot>Drop files here to upload</slot>
            </div>
            <slot v-else>Drop files here to upload</slot>
        </template>
        <slot name="files" v-bind="slotScope"></slot>
    </div>
</template>
<script lang="ts">
// $$HEADER
import { Vue, Component, Prop } from 'vue-property-decorator';

import Dropzone, { DropzoneOptions } from 'dropzone';

import getInstance from './DropzoneInstance';

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
export type CombinedInstance = IDropzoneInstance & UntypedFields;

@Component
export default class VueAutoDropzone extends Vue {
    instance!: CombinedInstance;
    files: CombinedInstance['files'] = [];

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

        // This isn't inferred correctly here yet
        this.instance = getInstance(this as any, this.$el as HTMLElement, this.options, this.hasSlots);

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
    }

    get hasSlots() {
        const hasSlots = this.$slots && (this.$slots.default || this.$slots.message || this.$slots.files);
        console.log('hasSlots', hasSlots);
        // NB! Update instance as a side-effect
        if (this.instance) {
            // TODO: Types?
            console.log('toggle', hasSlots);
            (this.instance as any).useFragment(hasSlots);
        }
        return Boolean(hasSlots);
    }

    get slotScope() {
        return {
            files: this.files,
        };
    }

    /** Array of all accepted files */
    get acceptedFiles() {
        return this.files.filter(file => file.accepted);
    }

    /** Array of all rejected files */
    get rejectedFiles() {
        return this.files.filter(file => !file.accepted);
    }

    /** Array of all files queued for upload */
    get queuedFiles() {
        return this.files.filter(file => file.status === Dropzone.QUEUED);
    }

    /** Array of all files currently uploading */
    get uploadingFiles() {
        return this.files.filter(file => file.status === Dropzone.UPLOADING);
    }

    /** Array of all added files */
    get addedFiles() {
        return this.files.filter(file => file.status === Dropzone.ADDED);
    }

    /** Array of all queued or currently uploading files */
    get activeFiles() {
        return this.files.filter(file => file.status === Dropzone.QUEUED || file.status === Dropzone.UPLOADING);
    }

    /** Get all Dropzone options */
    getOptions() {
        return this.instance.options;
    }

    /** Overwrite multiple Dropzone options at once via `Object.assign()` */
    setOptions(value: Partial<IDropzoneOptions>) {
        Object.assign(this.instance.options, value);
    }

    /** Get a single Dropzone option by key */
    getOption(key: keyof IDropzoneOptions) {
        return this.instance.options[key];
    }

    /** Set a single Dropzone option */
    setOption<T extends keyof IDropzoneOptions>(key: T, value: IDropzoneOptions[T]) {
        this.instance.options[key] = value;
    }

    // $$COMBINED_PARTIALS
};
</script>
<style src="./vueAutoDropzone.css"></style>
