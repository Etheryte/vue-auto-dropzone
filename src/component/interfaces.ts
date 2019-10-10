import { DropzoneOptions } from 'dropzone';

export interface IDropzoneOptions extends DropzoneOptions {
    url: string;
}

export interface IDropzoneInstance extends Dropzone {
    // Dropzone type definitions incorrectly identify this as static on instances
    options: DropzoneOptions;
    // This field is missing from the official types
    events: string[];
}
