<template>
    <div class="vue-auto-dropzone" :class="{ 'dropzone': includeStyling }">
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

// TODO: Only import Dropzone if we're in a browser environment since it requires 'window'
// See: https://2ality.com/2017/01/import-operator.html
// NB! Use this import only as a type!
import DropzoneType, { DropzoneOptions, DropzoneFile } from 'dropzone';

import NoCache from './NoCache';
import urltoFile from './fileUtil';

import './vueAutoDropzone.css';

export interface IDropzoneOptions extends DropzoneOptions {
    url: string;
}
export interface IDropzoneInstance extends Dropzone {
    // Dropzone type definitions incorrectly identify this as static on instances
    options: IDropzoneOptions;
    // This field is missing from the official types
    events: string[];
}

export interface IUpload {
    uuid: string;
    /** File upload progress, number `0..100` */
    progress: number;
    total: number;
    bytesSent: number;
    fileName: string;
    chunked: boolean;
    totalChunkCount: number;
}

export interface IDropzoneFile extends DropzoneFile {
    dataURL?: string;
    upload: IUpload;
}

let Dropzone: typeof DropzoneType;

// SSR hacks ahoy
if (typeof window === 'undefined' || typeof document === 'undefined') {
    Dropzone = class SsrPlaceholder { } as unknown as typeof DropzoneType;
} else {
    Dropzone = require('dropzone');
}

// Only mount manually
Dropzone.autoDiscover = false;

function getInstance<T extends Vue & { files: any }>(
    vm: T,
    element: HTMLElement,
    instanceOptions: IDropzoneOptions,
    hasSlots: boolean
): any {
    let fragment: DocumentFragment | undefined = document.createDocumentFragment();

    // Extend Dropzone to make certain values reactive
    // Side note, I hope you enjoy this scoping hack
    class DropzoneInstance extends Dropzone implements IDropzoneInstance {
        // Dropzone type definitions incorrectly identify this as static on instances
        options!: IDropzoneOptions;
        // These fields are missing from the official types
        events!: string[];
        // TODO: Types
        element?: HTMLElement & { dropzone: IDropzoneInstance };
        hiddenFileInput?: Node | null;

        // These exist but are not inferred
        emit!: (eventName: string, ...args: any[]) => DropzoneInstance;
        disable!: () => void;

        private originalPreviewscontainer;

        constructor(element: HTMLElement, options: IDropzoneOptions) {
            // Spread since we need to modify properties internally
            const internalOptions = { ...options };

            // If no option is defined for the container, make it slottable
            if (hasSlots && !options.previewsContainer) {
                internalOptions.previewsContainer = fragment as any;
            }

            super(element, internalOptions);
        }

        destroy() {
            fragment = undefined;
            // The native destroy also removes all files from the server, reimplement without that logic
            this.disable();

            if (this.hiddenFileInput && this.hiddenFileInput.parentNode) {
                this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);
                this.hiddenFileInput = null;
            }
            if (this.element) {
                delete this.element.dropzone;
            }

            return Dropzone.instances.splice(Dropzone.instances.indexOf(this), 1);
        }

        useFragment(hasSlots: boolean) {
            if (hasSlots) {
                if (this.options.previewsContainer !== fragment) {
                    this.originalPreviewscontainer = this.options.previewsContainer;
                    this.options.previewsContainer = fragment as any;
                }
            } else {
                if (this.originalPreviewscontainer) {
                    this.options.previewsContainer = this.originalPreviewscontainer;
                    this.originalPreviewscontainer = undefined;
                }
            }
        }

        get files() {
            return vm.files;
        }

        set files(value: T['files']) {
            vm.files.splice(0, vm.files.length, ...value);
        }

        enqueueFile(file: IDropzoneFile) {
            if (Object.prototype.hasOwnProperty.call(file, '$autocompleteUpload')) {
                // If we're manually adding a file without uploading, fill all values as done
                file.status = Dropzone.SUCCESS;
                Object.assign(file.upload, {
                    progress: 100,
                    total: file.size,
                    bytesSent: file.size,
                } as IUpload);

                // And emit all relevant events with identical params
                this.emit('uploadprogress', file, 100, file.size);
                this.emit('success', file);
                this.emit('complete', file);

                // There is no clear singular reasonable return value here, just give the user something to work with
                return Promise.resolve([file]);
            }
            return super.enqueueFile(file);
        }
    }

    return new DropzoneInstance(element, instanceOptions);
}

type FileOrDataString = Dropzone.DropzoneFile | File | string;

// Dropzone type definitions aren't up to date, hint the user where possible
interface TypeHints {
    // $$TYPE_HINTS
}

// Assuming every key has a hint, TypeHints will be provided by the generator
type UntypedKeys = Exclude<keyof TypeHints, keyof IDropzoneInstance>;
type UntypedFields = Pick<TypeHints, UntypedKeys>;
export type CombinedInstance = IDropzoneInstance & UntypedFields;

const uninitiatedInstanceMessage = 'Dropzone instance is uninitiated';

export default class VueAutoDropzone extends Vue {
    private instance: CombinedInstance | null = null;
    files: IDropzoneFile[] = [];
    defaultMessage = '// $$DEFAULT_MESSAGE';

    @Prop({
        type: Object,
        required: true,
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
        // Dropzone requires window and document to mount
        if (typeof window === 'undefined' || typeof document === 'undefined') return;
        if (this.$isServer && this.hasBeenMounted) return;
        this.hasBeenMounted = true;

        // `this` isn't inferred correctly here, it will be in the generated file
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
        if (!this.instance || !this.$props.destroyDropzone) return;
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

    // Just mirror the whole instance through for the slot scope. I'm pretty sure this will come back to bite me.
    get slotScope() {
        return this;
    }

    // Here and elsewhere, Dropzone uses direct assignment and mutations that we can't observe without a Proxy, cache nothing
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

    /** Manually add a new file, input is either a `File` or a data string (`"data:image/..."`) with a file name and optional mime type */
    async addFile<T extends FileOrDataString>(
        fileOrDataString: T,
        fileName?: T extends string ? string : never,
        mimeType?: T extends string ? string : never,
    ) {
        if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
        const inputFile = await this.processManualInputFile(fileOrDataString, fileName, mimeType);

        inputFile.$autocompleteUpload = true;
        // The missing fields get added internally
        // eslint-disable-next-line no-useless-call
        return this.instance.addFile.call(this.instance, inputFile as IDropzoneFile);
    }

    /** Manually add and upload a new file, input is either a `File` or a data string (`"data:image/..."`) with a file name and optional mime type */
    async addAndUploadFile<T extends FileOrDataString>(
        fileOrDataString: T,
        fileName?: T extends string ? string : never,
        mimeType?: T extends string ? string : never,
    ) {
        if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
        const inputFile = await this.processManualInputFile(fileOrDataString, fileName, mimeType);

        // The missing fields get added internally
        // eslint-disable-next-line no-useless-call
        return this.instance.addFile.call(this.instance, inputFile as IDropzoneFile);
    }

    private async processManualInputFile<T extends FileOrDataString>(
        fileOrDataString: T,
        fileName?: T extends string ? string : never,
        mimeType?: T extends string ? string : never,
    ) {
        let inputFile;
        if (typeof fileOrDataString === 'string') {
            inputFile = await urltoFile(fileOrDataString, fileName, mimeType);
        } else {
            // Manual check to let the user know they can't set the name and mime for File instances
            if (fileName || mimeType) {
                throw new TypeError('File.name and File.type are readonly properties');
            }
            inputFile = fileOrDataString;
        }
        return inputFile;
    }

    /** Get all Dropzone options */
    getOptions() {
        if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
        return this.instance.options;
    }

    /** Overwrite multiple Dropzone options at once */
    setOptions(value: Partial<IDropzoneOptions>) {
        if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
        for (const key in value) {
            Vue.set(this.instance.options, key, value[key]);
        }
    }

    // TODO: Fix types
    /** Get a single Dropzone option by key */
    getOption(key: keyof IDropzoneOptions | any) {
        if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
        return this.instance.options[key];
    }

    /** Set a single Dropzone option */
    setOption<T extends keyof IDropzoneOptions>(key: T, value: IDropzoneOptions[T]) {
        if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);

        // If there's an old listener, remove it and add a new one
        if (this.instance.events.indexOf(key) !== -1) {
            if (this.instance.options[key]) {
                this.instance.off(key, this.instance.options[key] as any);
            }
            if (typeof value === 'function') {
                this.instance.on(key, value as any);
            }
        }
        Vue.set(this.instance.options, key, value);
    }

    // $$COMBINED_PARTIALS
};
</script>
