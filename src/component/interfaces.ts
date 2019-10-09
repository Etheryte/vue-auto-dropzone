import { DropzoneOptions } from 'dropzone';

export interface DropzoneInstance extends Dropzone {
    // Dropzone type definitions incorrectly identify this as static on instances
    options: DropzoneOptions;
    // This field is missing from the official types
    events: string[];
}
