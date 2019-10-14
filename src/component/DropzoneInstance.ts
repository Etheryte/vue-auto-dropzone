import Vue from 'vue';
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
            // console.log('c has', hasSlots);
            // If no option is defined for the container, make it slottable
            if (hasSlots && !options.previewsContainer) {
                // console.log('use fragment');
                options.previewsContainer = fragment as any;
            }

            super(element, options);

            // If no custom handler is used, bind our own reactivity
            if (!options.uploadprogress) {
                // this.options.uploadprogress = this.uploadprogress;
            }

            // Make addFile reactive
            this.makeObserved('addFile' /*, (file) => {
                return Object.assign(file, {
                    upload: null,
                    dataURL: null,
                });
            } */);
            // this.makeObserved('_enqueueThumbnail');
            // this.makeObserved('handleFiles');
        }

        destroy() {
            const retVal = super.destroy();
            fragment = undefined;
            return retVal;
        }

        useFragment(hasSlots: boolean) {
            // console.log('usefragment', hasSlots);
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

        makeObserved(methodName: string, mapper?: Function) {
            const original = this[methodName] as Function;
            this[methodName] = ({
                // Make a named function
                [methodName](...args) {
                    const reactiveArgs = args.map(a => {
                        return Vue.observable(mapper ? mapper(a) : a);
                    });
                    return original.apply(this, reactiveArgs);
                },
            }[methodName]) as any;
        }

        get files() {
            return vm.files;
        }

        // TODO: Does this work?
        set files(value: CombinedInstance['files']) {
            console.log('set', value);
            const mappedValue = value.map(x => {
                console.log(x);
                (x as any).dataURL = (x as any).dataURL || 'null';
                return Vue.observable(x);
            });
            vm.files.splice(0, vm.files.length, ...mappedValue);
        }
    }

    return new DropzoneInstance(element, options);
}
