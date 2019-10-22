import Dropzone from 'dropzone';

import VueAutoDropzone, { IDropzoneOptions, IDropzoneInstance, IDropzoneFile, IUpload } from './VueAutoDropzone.vue';

export default function getInstance(
    vm: VueAutoDropzone,
    element: HTMLElement,
    options: IDropzoneOptions,
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
        element!: HTMLElement;
        hiddenFileInput?: Node | null;

        private originalPreviewscontainer;

        constructor(element: HTMLElement, options: IDropzoneOptions) {
            // Make a copy since we need to modify properties internally
            const internalOptions = JSON.parse(JSON.stringify(options));

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
            delete this.element.dropzone;

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

        set files(value: VueAutoDropzone['files']) {
            vm.files.splice(0, vm.files.length, ...value);
        }

        enqueueFile(file: IDropzoneFile) {
            if (Object.prototype.hasOwnProperty.call(file, '$isManual')) {
                // If we're manually adding a file, fill all values as done
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

    return new DropzoneInstance(element, options);
}
