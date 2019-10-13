import Dropzone, { DropzoneFile } from 'dropzone';

import VueAutoDropzone, { IDropzoneOptions, IDropzoneInstance, CombinedInstance } from './VueAutoDropzone.vue';

export default function getInstance(
    vm: VueAutoDropzone,
    element: HTMLElement,
    options: IDropzoneOptions,
    hasSlots: boolean
): any {
    let fragment: DocumentFragment | undefined = document.createDocumentFragment();
    // ???
    // (fragment as any).getAttribute = () => undefined;

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
                options.previewsContainer = fragment as any;
            }

            super(element, options);

            // If no custom handler is used, bind our own reactivity
            if (!options.uploadprogress) {
                // this.options.uploadprogress = this.uploadprogress;
            }
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

        destroy() {
            const retVal = super.destroy();
            fragment = undefined;
            return retVal;
        }

        get files() {
            return vm.files;
        }

        set files(value: CombinedInstance['files']) {
            vm.files.splice(0, vm.files.length, ...value);
        }
    }

    return new DropzoneInstance(element, options);
}
