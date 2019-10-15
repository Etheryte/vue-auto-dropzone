import Dropzone from 'dropzone';

import VueAutoDropzone, { IDropzoneOptions, IDropzoneInstance } from './VueAutoDropzone.vue';

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
        // This field is missing from the official types
        events!: string[];

        private originalPreviewscontainer;

        constructor(element: HTMLElement, options: IDropzoneOptions) {
            console.log('c has', hasSlots);
            // If no option is defined for the container, make it slottable
            if (hasSlots && !options.previewsContainer) {
                // console.log('use fragment');
                options.previewsContainer = fragment as any;
            }

            super(element, options);
        }

        destroy() {
            const retVal = super.destroy();
            fragment = undefined;
            return retVal;
        }

        useFragment(hasSlots: boolean) {
            console.log('usefragment', hasSlots);
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
    }

    return new DropzoneInstance(element, options);
}