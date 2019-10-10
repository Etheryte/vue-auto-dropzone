import { DropzoneOptions } from 'dropzone';
export interface DropzoneInstance extends Dropzone {
    options: DropzoneOptions;
    events: string[];
}
