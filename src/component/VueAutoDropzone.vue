<template>
  <div :class="{ dropzone: includeStyling }">
    <template
      v-if="this.$slots && this.$slots.default && this.$slots.default.length"
    >
      <div v-if="includeStyling" :class="{ 'dz-message': includeStyling }">
        <slot>Drop files here to upload</slot>
      </div>
      <slot v-else>Drop files here to upload</slot>
    </template>
  </div>
</template>
<script lang="ts">
// NB! THIS IS A GENERATED FILE. ANY MODIFICATIONS YOU MAKE HERE WILL BE LOST.
import { Vue, Component, Prop } from 'vue-property-decorator';

import Dropzone, { DropzoneOptions } from 'dropzone';

// Only mount manually
Dropzone.autoDiscover = false;

export interface IDropzoneOptions extends DropzoneOptions {
  url: string;
}

export interface IDropzoneInstance extends Dropzone {
  // Dropzone type definitions incorrectly identify this as static on instances
  options: IDropzoneOptions;
  // This field is missing from the official types
  events: string[];
}

// Dropzone type definitions aren't up to date, hint the user where possible
interface TypeHints {
  Emitter: Function;
  URL: Function;
  accept: Function;
  addFile: Function;
  cancelUpload: Function;
  clickableElements: any[];
  createThumbnail: Function;
  createThumbnailFromUrl: Function;
  defaultOptions: object;
  destroy: Function;
  disable: Function;
  drop: Function;
  element: object;
  emit: Function;
  enable: Function;
  enqueueFile: Function;
  enqueueFiles: Function;
  events: any[];
  files: any[];
  filesize: Function;
  getAcceptedFiles: Function;
  getActiveFiles: Function;
  getAddedFiles: Function;
  getExistingFallback: Function;
  getFallbackForm: Function;
  getFilesWithStatus: Function;
  getQueuedFiles: Function;
  getRejectedFiles: Function;
  getUploadingFiles: Function;
  handleFiles: Function;
  hiddenFileInput: object;
  init: Function;
  listeners: any[];
  off: Function;
  on: Function;
  paste: Function;
  previewsContainer: object;
  processFile: Function;
  processFiles: Function;
  processQueue: Function;
  removeAllFiles: Function;
  removeEventListeners: Function;
  removeFile: Function;
  resizeImage: Function;
  resolveOption: Function;
  setupEventListeners: Function;
  submitRequest: Function;
  updateTotalUploadProgress: Function;
  uploadFile: Function;
  uploadFiles: Function;
  version: string;
}

// Assuming every key has a hint, TypeHints will be provided by the generator
type UntypedKeys = Exclude<keyof TypeHints, keyof IDropzoneInstance>;
type UntypedFields = Pick<TypeHints, UntypedKeys>;
type CombinedInstance = IDropzoneInstance & UntypedFields;

@Component
export default class VueAutoDropzone extends Vue {
  instance!: CombinedInstance;

  @Prop({
      type: Object,
      required: true,
      validator: value => typeof value === 'object' && !!value.url,
  })
  options!: IDropzoneOptions;

  @Prop({
      type: Boolean,
      required: false,
      default: true,
  })
  includeStyling!: Boolean;

  @Prop({
      type: Boolean,
      required: false,
      default: true,
  })
  destroyDropzone!: Boolean;

  private hasBeenMounted = false;

  mounted() {
      // Dropzone requires window to mount
      if (typeof window === 'undefined') return;
      if (this.$isServer && this.hasBeenMounted) return;
      this.hasBeenMounted = true;

      this.instance = new Dropzone(
      this.$el as HTMLElement,
      this.options
      ) as CombinedInstance;

      // Pass every configured event through
      this.instance.events.forEach(eventName => {
      this.instance!.on(eventName, (...args) => {
          // eslint-disable-next-line no-useless-call
          this.$emit.apply(this, [eventName, ...args]);
      });
      });
  }

  beforeDestroy() {
      if (!(this.$props.destroyDropzone && this.instance)) return;
      this.instance.destroy();
  }

  getOptions() {
      return this.instance.options;
  }

  setOptions(value: Partial<IDropzoneOptions>) {
      Object.assign(this.instance.options, value);
  }

  getOption(key: keyof IDropzoneOptions) {
      return this.instance.options[key];
  }

  setOption(key: keyof IDropzoneOptions, value: any) {
      // @ts-ignore
      this.instance.options[key] = value;
  }

  get Emitter(this: VueAutoDropzone): CombinedInstance['Emitter'] {
      return this.instance.Emitter;
  }

  set Emitter(this: VueAutoDropzone, value) {
      this.instance.Emitter = value;
  }

  get URL(this: VueAutoDropzone): CombinedInstance['URL'] {
      return this.instance.URL;
  }

  set URL(this: VueAutoDropzone, value) {
      this.instance.URL = value;
  }

  get accept(this: VueAutoDropzone): CombinedInstance['accept'] {
      return this.instance.accept;
  }

  set accept(this: VueAutoDropzone, value) {
      this.instance.accept = value;
  }

  get addFile(this: VueAutoDropzone): CombinedInstance['addFile'] {
      return this.instance.addFile;
  }

  set addFile(this: VueAutoDropzone, value) {
      this.instance.addFile = value;
  }

  get cancelUpload(this: VueAutoDropzone): CombinedInstance['cancelUpload'] {
      return this.instance.cancelUpload;
  }

  set cancelUpload(this: VueAutoDropzone, value) {
      this.instance.cancelUpload = value;
  }

  get createThumbnail(
      this: VueAutoDropzone
  ): CombinedInstance['createThumbnail'] {
      return this.instance.createThumbnail;
  }

  set createThumbnail(this: VueAutoDropzone, value) {
      this.instance.createThumbnail = value;
  }

  get createThumbnailFromUrl(
      this: VueAutoDropzone
  ): CombinedInstance['createThumbnailFromUrl'] {
      return this.instance.createThumbnailFromUrl;
  }

  set createThumbnailFromUrl(this: VueAutoDropzone, value) {
      this.instance.createThumbnailFromUrl = value;
  }

  get destroy(this: VueAutoDropzone): CombinedInstance['destroy'] {
      return this.instance.destroy;
  }

  set destroy(this: VueAutoDropzone, value) {
      this.instance.destroy = value;
  }

  get disable(this: VueAutoDropzone): CombinedInstance['disable'] {
      return this.instance.disable;
  }

  set disable(this: VueAutoDropzone, value) {
      this.instance.disable = value;
  }

  get drop(this: VueAutoDropzone): CombinedInstance['drop'] {
      return this.instance.drop;
  }

  set drop(this: VueAutoDropzone, value) {
      this.instance.drop = value;
  }

  get emit(this: VueAutoDropzone): CombinedInstance['emit'] {
      return this.instance.emit;
  }

  set emit(this: VueAutoDropzone, value) {
      this.instance.emit = value;
  }

  get enable(this: VueAutoDropzone): CombinedInstance['enable'] {
      return this.instance.enable;
  }

  set enable(this: VueAutoDropzone, value) {
      this.instance.enable = value;
  }

  get enqueueFile(this: VueAutoDropzone): CombinedInstance['enqueueFile'] {
      return this.instance.enqueueFile;
  }

  set enqueueFile(this: VueAutoDropzone, value) {
      this.instance.enqueueFile = value;
  }

  get enqueueFiles(this: VueAutoDropzone): CombinedInstance['enqueueFiles'] {
      return this.instance.enqueueFiles;
  }

  set enqueueFiles(this: VueAutoDropzone, value) {
      this.instance.enqueueFiles = value;
  }

  get filesize(this: VueAutoDropzone): CombinedInstance['filesize'] {
      return this.instance.filesize;
  }

  set filesize(this: VueAutoDropzone, value) {
      this.instance.filesize = value;
  }

  get getAcceptedFiles(
      this: VueAutoDropzone
  ): CombinedInstance['getAcceptedFiles'] {
      return this.instance.getAcceptedFiles;
  }

  set getAcceptedFiles(this: VueAutoDropzone, value) {
      this.instance.getAcceptedFiles = value;
  }

  get getActiveFiles(
      this: VueAutoDropzone
  ): CombinedInstance['getActiveFiles'] {
      return this.instance.getActiveFiles;
  }

  set getActiveFiles(this: VueAutoDropzone, value) {
      this.instance.getActiveFiles = value;
  }

  get getAddedFiles(this: VueAutoDropzone): CombinedInstance['getAddedFiles'] {
      return this.instance.getAddedFiles;
  }

  set getAddedFiles(this: VueAutoDropzone, value) {
      this.instance.getAddedFiles = value;
  }

  get getExistingFallback(
      this: VueAutoDropzone
  ): CombinedInstance['getExistingFallback'] {
      return this.instance.getExistingFallback;
  }

  set getExistingFallback(this: VueAutoDropzone, value) {
      this.instance.getExistingFallback = value;
  }

  get getFallbackForm(
      this: VueAutoDropzone
  ): CombinedInstance['getFallbackForm'] {
      return this.instance.getFallbackForm;
  }

  set getFallbackForm(this: VueAutoDropzone, value) {
      this.instance.getFallbackForm = value;
  }

  get getFilesWithStatus(
      this: VueAutoDropzone
  ): CombinedInstance['getFilesWithStatus'] {
      return this.instance.getFilesWithStatus;
  }

  set getFilesWithStatus(this: VueAutoDropzone, value) {
      this.instance.getFilesWithStatus = value;
  }

  get getQueuedFiles(
      this: VueAutoDropzone
  ): CombinedInstance['getQueuedFiles'] {
      return this.instance.getQueuedFiles;
  }

  set getQueuedFiles(this: VueAutoDropzone, value) {
      this.instance.getQueuedFiles = value;
  }

  get getRejectedFiles(
      this: VueAutoDropzone
  ): CombinedInstance['getRejectedFiles'] {
      return this.instance.getRejectedFiles;
  }

  set getRejectedFiles(this: VueAutoDropzone, value) {
      this.instance.getRejectedFiles = value;
  }

  get getUploadingFiles(
      this: VueAutoDropzone
  ): CombinedInstance['getUploadingFiles'] {
      return this.instance.getUploadingFiles;
  }

  set getUploadingFiles(this: VueAutoDropzone, value) {
      this.instance.getUploadingFiles = value;
  }

  get handleFiles(this: VueAutoDropzone): CombinedInstance['handleFiles'] {
      return this.instance.handleFiles;
  }

  set handleFiles(this: VueAutoDropzone, value) {
      this.instance.handleFiles = value;
  }

  get init(this: VueAutoDropzone): CombinedInstance['init'] {
      return this.instance.init;
  }

  set init(this: VueAutoDropzone, value) {
      this.instance.init = value;
  }

  get off(this: VueAutoDropzone): CombinedInstance['off'] {
      return this.instance.off;
  }

  set off(this: VueAutoDropzone, value) {
      this.instance.off = value;
  }

  get on(this: VueAutoDropzone): CombinedInstance['on'] {
      return this.instance.on;
  }

  set on(this: VueAutoDropzone, value) {
      this.instance.on = value;
  }

  get paste(this: VueAutoDropzone): CombinedInstance['paste'] {
      return this.instance.paste;
  }

  set paste(this: VueAutoDropzone, value) {
      this.instance.paste = value;
  }

  get processFile(this: VueAutoDropzone): CombinedInstance['processFile'] {
      return this.instance.processFile;
  }

  set processFile(this: VueAutoDropzone, value) {
      this.instance.processFile = value;
  }

  get processFiles(this: VueAutoDropzone): CombinedInstance['processFiles'] {
      return this.instance.processFiles;
  }

  set processFiles(this: VueAutoDropzone, value) {
      this.instance.processFiles = value;
  }

  get processQueue(this: VueAutoDropzone): CombinedInstance['processQueue'] {
      return this.instance.processQueue;
  }

  set processQueue(this: VueAutoDropzone, value) {
      this.instance.processQueue = value;
  }

  get removeAllFiles(
      this: VueAutoDropzone
  ): CombinedInstance['removeAllFiles'] {
      return this.instance.removeAllFiles;
  }

  set removeAllFiles(this: VueAutoDropzone, value) {
      this.instance.removeAllFiles = value;
  }

  get removeEventListeners(
      this: VueAutoDropzone
  ): CombinedInstance['removeEventListeners'] {
      return this.instance.removeEventListeners;
  }

  set removeEventListeners(this: VueAutoDropzone, value) {
      this.instance.removeEventListeners = value;
  }

  get removeFile(this: VueAutoDropzone): CombinedInstance['removeFile'] {
      return this.instance.removeFile;
  }

  set removeFile(this: VueAutoDropzone, value) {
      this.instance.removeFile = value;
  }

  get resizeImage(this: VueAutoDropzone): CombinedInstance['resizeImage'] {
      return this.instance.resizeImage;
  }

  set resizeImage(this: VueAutoDropzone, value) {
      this.instance.resizeImage = value;
  }

  get resolveOption(this: VueAutoDropzone): CombinedInstance['resolveOption'] {
      return this.instance.resolveOption;
  }

  set resolveOption(this: VueAutoDropzone, value) {
      this.instance.resolveOption = value;
  }

  get setupEventListeners(
      this: VueAutoDropzone
  ): CombinedInstance['setupEventListeners'] {
      return this.instance.setupEventListeners;
  }

  set setupEventListeners(this: VueAutoDropzone, value) {
      this.instance.setupEventListeners = value;
  }

  get submitRequest(this: VueAutoDropzone): CombinedInstance['submitRequest'] {
      return this.instance.submitRequest;
  }

  set submitRequest(this: VueAutoDropzone, value) {
      this.instance.submitRequest = value;
  }

  get updateTotalUploadProgress(
      this: VueAutoDropzone
  ): CombinedInstance['updateTotalUploadProgress'] {
      return this.instance.updateTotalUploadProgress;
  }

  set updateTotalUploadProgress(this: VueAutoDropzone, value) {
      this.instance.updateTotalUploadProgress = value;
  }

  get uploadFile(this: VueAutoDropzone): CombinedInstance['uploadFile'] {
      return this.instance.uploadFile;
  }

  set uploadFile(this: VueAutoDropzone, value) {
      this.instance.uploadFile = value;
  }

  get uploadFiles(this: VueAutoDropzone): CombinedInstance['uploadFiles'] {
      return this.instance.uploadFiles;
  }

  set uploadFiles(this: VueAutoDropzone, value) {
      this.instance.uploadFiles = value;
  }

  get clickableElements(this: VueAutoDropzone) {
      return this.instance.clickableElements;
  }

  get defaultOptions(this: VueAutoDropzone) {
      return this.instance.defaultOptions;
  }

  get element(this: VueAutoDropzone) {
      return this.instance.element;
  }

  get events(this: VueAutoDropzone) {
      return this.instance.events;
  }

  get files(this: VueAutoDropzone) {
      return this.instance.files;
  }

  get hiddenFileInput(this: VueAutoDropzone) {
      return this.instance.hiddenFileInput;
  }

  get listeners(this: VueAutoDropzone) {
      return this.instance.listeners;
  }

  get previewsContainer(this: VueAutoDropzone) {
      return this.instance.previewsContainer;
  }

  get version(this: VueAutoDropzone) {
      return this.instance.version;
  }
}
</script>
<style src="./vueAutoDropzone.css"></style>
