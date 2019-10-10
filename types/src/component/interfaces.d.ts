import { DropzoneOptions } from 'dropzone';
export interface IDropzoneOptions extends DropzoneOptions {
    url: string;
}
export interface IDropzoneInstance extends Dropzone {
    options: DropzoneOptions;
    events: string[];
}
