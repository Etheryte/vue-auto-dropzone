<template>
    <div
        class="vue-auto-dropzone"
        :class="{ 'dropzone': includeStyling, 'is-clickable': !hasDefaultSlot }"
    >
        <!-- Placeholder until we mount -->
        <div v-if="!instance" class="dz-default dz-message">{{ defaultMessage }}</div>
        <template v-else>
            <slot v-if="hasDefaultSlot" v-bind="slotScope" />
            <div
                v-bind:class="{ 'is-hidden': hasDefaultSlot, 'dz-default dz-message': includeStyling }"
            >
                <slot name="message">{{ defaultMessage }}</slot>
            </div>
        </template>
    </div>
</template>
<script lang="ts">
// $$HEADER
import { Vue, Component, Prop } from 'vue-property-decorator';

import Dropzone, { DropzoneOptions, DropzoneFile } from 'dropzone';
import { debounce } from 'underscore';

import getInstance from './DropzoneInstance';
import NoCache from './NoCache';

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

interface IUpload {
    uuid: string;
    /** File upload progress, number `0..100` */
    progress: number;
    total: number;
    bytesSent: number;
    fileName: string;
    chunked: boolean;
    totalChunkCount: number;
}

interface IDropzoneFile extends DropzoneFile {
    dataURL?: string;
    upload: IUpload;
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
    instance: CombinedInstance | null = null;
    files: IDropzoneFile[] = [];
    defaultMessage = '// $$DEFAULT_MESSAGE';

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
        this.instance = getInstance(this as any, this.$el as HTMLElement, this.options, this.hasDefaultSlot);

        // Pass every configured event through
        this.instance!.events.forEach((eventName) => {
            this.instance!.on(eventName, (...args) => {
                // Dropzone is nigh unobservable, just manually fire updates when it fires events
                this.$forceUpdate();
                // Reemit events on the Vue component
                // eslint-disable-next-line no-useless-call
                this.$emit.apply(this, [eventName, ...args]);
            });
        });
    }

    beforeDestroy() {
        if (!(this.$props.destroyDropzone && this.instance)) return;
        this.instance.destroy();
    }

    get hasDefaultSlot() {
        const hasDefaultSlot = Boolean(
            (this.$slots && this.$slots.default) ||
            (this.$scopedSlots && this.$scopedSlots.default)
        );
        // NB! Update instance as a side-effect
        if (this.instance) {
            // TODO: Types
            (this.instance as any).useFragment(hasDefaultSlot);
        }
        return hasDefaultSlot;
    }

    // Here and elsewhere, Dropzone uses direct assignment and mutations that we can't observe without a Proxy, cache nothing
    @NoCache
    get slotScope() {
        return {
            files: this.files,
            acceptedFiles: this.acceptedFiles,
            rejectedFiles: this.rejectedFiles,
            queuedFiles: this.queuedFiles,
            uploadingFiles: this.uploadingFiles,
            addedFiles: this.addedFiles,
            activeFiles: this.activeFiles,
            // TODO: Test
            clickableElements: (this as any).clickableElements,
            // TODO: Do we need anything else in the scope?
        };
    }

    /** Array of all accepted files */
    @NoCache
    get acceptedFiles() {
        return this.files.filter(file => file.accepted);
    }

    /** Array of all rejected files */
    @NoCache
    get rejectedFiles() {
        return this.files.filter(file => !file.accepted);
    }

    /** Array of all files queued for upload */
    @NoCache
    get queuedFiles() {
        return this.files.filter(file => file.status === Dropzone.QUEUED);
    }

    /** Array of all files currently uploading */
    @NoCache
    get uploadingFiles() {
        return this.files.filter(file => file.status === Dropzone.UPLOADING);
    }

    /** Array of all added files */
    @NoCache
    get addedFiles() {
        return this.files.filter(file => file.status === Dropzone.ADDED);
    }

    /** Array of all queued or currently uploading files */
    @NoCache
    get activeFiles() {
        return this.files.filter(file => file.status === Dropzone.QUEUED || file.status === Dropzone.UPLOADING);
    }

    /** Get all Dropzone options */
    getOptions() {
        if (!this.instance) throw new TypeError('Dropzone instance is uninitiated');
        return this.instance.options;
    }

    /** Overwrite multiple Dropzone options at once via `Object.assign()` */
    setOptions(value: Partial<IDropzoneOptions>) {
        if (!this.instance) throw new TypeError('Dropzone instance is uninitiated');
        Object.assign(this.instance.options, value);
    }

    /** Get a single Dropzone option by key */
    getOption(key: keyof IDropzoneOptions) {
        if (!this.instance) throw new TypeError('Dropzone instance is uninitiated');
        return this.instance.options[key];
    }

    /** Set a single Dropzone option */
    setOption<T extends keyof IDropzoneOptions>(key: T, value: IDropzoneOptions[T]) {
        if (!this.instance) throw new TypeError('Dropzone instance is uninitiated');
        this.instance.options[key] = value;
    }

    // $$COMBINED_PARTIALS
};
</script>
<style src="./vueAutoDropzone.css"></style>
<style lang="scss" scoped>
.vue-auto-dropzone {
    // Suppress children's pointer events so all of the parent is clickable for initiating uploads
    &.is-clickable {
        cursor: pointer;

        > * {
            pointer-events: none;
        }
    }
}

.is-hidden {
    display: block;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>
