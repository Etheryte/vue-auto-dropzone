import Vue from 'vue';
import { IDropzoneOptions } from './VueAutoDropzone.vue';
export default function getInstance<T extends Vue & {
    files: any;
}>(vm: T, element: HTMLElement, instanceOptions: IDropzoneOptions, hasSlots: boolean): any;
