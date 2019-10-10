import { IDropzoneOptions } from './interfaces';
import GeneratedBase from './Generated.vue';
import Dropzone from 'dropzone';
export default class VueAutoDropzone extends GeneratedBase {
    options: IDropzoneOptions;
    includeStyling: Boolean;
    destroyDropzone: Boolean;
    private hasBeenMounted;
    mounted(): void;
    beforeDestroy(): void;
    getOptions(): Dropzone.DropzoneOptions;
    setOptions(value: Partial<IDropzoneOptions>): void;
    getOption(key: keyof IDropzoneOptions): string | number | boolean | {} | HTMLElement | (string | HTMLElement)[] | ((name: string) => string) | Dropzone.DropzoneDictFileSizeUnits | ((file: Dropzone.DropzoneFile, done: (error?: string | Error | undefined) => void) => void) | ((file: Dropzone.DropzoneFile, done: (error?: string | Error | undefined) => void) => void) | ((this: Dropzone) => void) | (() => void) | ((file: Dropzone.DropzoneFile, width?: number | undefined, height?: number | undefined, resizeMethod?: string | undefined) => Dropzone.DropzoneResizeInfo) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | (() => void) | ((file: Dropzone.DropzoneFile) => void) | ((files: Dropzone.DropzoneFile[]) => void) | ((file: Dropzone.DropzoneFile) => void) | ((file: Dropzone.DropzoneFile, dataUrl: string) => void) | ((file: Dropzone.DropzoneFile, message: string | Error, xhr: XMLHttpRequest) => void) | ((files: Dropzone.DropzoneFile[], message: string | Error, xhr: XMLHttpRequest) => void) | ((file: Dropzone.DropzoneFile) => void) | ((files: Dropzone.DropzoneFile[]) => void) | ((file: Dropzone.DropzoneFile, progress: number, bytesSent: number) => void) | ((totalProgress: number, totalBytes: number, totalBytesSent: number) => void) | ((file: Dropzone.DropzoneFile, xhr: XMLHttpRequest, formData: FormData) => void) | ((files: Dropzone.DropzoneFile[], xhr: XMLHttpRequest, formData: FormData) => void) | ((file: Dropzone.DropzoneFile, response: string | Object) => void) | ((files: Dropzone.DropzoneFile[], responseText: string) => void) | ((file: Dropzone.DropzoneFile) => void) | ((file: Dropzone.DropzoneFile[]) => void) | ((file: Dropzone.DropzoneFile) => void) | ((file: Dropzone.DropzoneFile[]) => void) | ((file: Dropzone.DropzoneFile) => void) | ((files: Dropzone.DropzoneFile[]) => void) | (() => void) | ((file: Dropzone.DropzoneFile, done: (file: string | Blob) => void) => void) | undefined;
    setOption(key: keyof IDropzoneOptions, value: any): void;
}
