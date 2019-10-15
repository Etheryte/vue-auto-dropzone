<template>
  <div
    class="vue-auto-dropzone"
    :class="{ dropzone: includeStyling, 'is-clickable': !hasDefaultSlot }"
  >
    <slot v-if="hasDefaultSlot" v-bind="slotScope" />
    <div
      v-bind:class="{
        'is-hidden': hasDefaultSlot,
        'dz-default dz-message': includeStyling
      }"
    >
      <slot name="message">Drop files here to upload</slot>
    </div>
    <pre>urls: {{ urls }}</pre>
  </div>
</template>
<script lang="ts">
// NB! THIS IS A GENERATED FILE. ANY MODIFICATIONS YOU MAKE HERE WILL BE LOST.
import { Vue, Component, Prop } from 'vue-property-decorator';

import Dropzone, { DropzoneOptions, DropzoneFile } from 'dropzone';
import { debounce } from 'underscore';

import getInstance from './DropzoneInstance';
import NoCache from './NoCache';

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

interface IUpload {
  uuid: string;
  /** File upload progress, number `0..100` */
  progress: number;
  total: number;
  bytesSent: number;
  fileName: string;
  chunked: boolean;
  totalChunkCount: number;
}

interface IDropzoneFile extends DropzoneFile {
  dataURL?: string;
  upload: IUpload;
}

// Dropzone type definitions aren't up to date, hint the user where possible
interface TypeHints {
  accept: (...args: any[]) => any;
  addFile: (...args: any[]) => any;
  cancelUpload: (...args: any[]) => any;
  clickableElements: any[];
  createThumbnail: (...args: any[]) => any;
  createThumbnailFromUrl: (...args: any[]) => any;
  defaultOptions: object;
  destroy: (...args: any[]) => any;
  disable: (...args: any[]) => any;
  drop: (...args: any[]) => any;
  element: object;
  emit: (...args: any[]) => any;
  enable: (...args: any[]) => any;
  enqueueFile: (...args: any[]) => any;
  enqueueFiles: (...args: any[]) => any;
  events: any[];
  filesize: (...args: any[]) => any;
  getExistingFallback: (...args: any[]) => any;
  getFallbackForm: (...args: any[]) => any;
  getFilesWithStatus: (...args: any[]) => any;
  handleFiles: (...args: any[]) => any;
  hiddenFileInput: object;
  init: (...args: any[]) => any;
  listeners: any[];
  off: (...args: any[]) => any;
  on: (...args: any[]) => any;
  paste: (...args: any[]) => any;
  previewsContainer: object;
  processFile: (...args: any[]) => any;
  processFiles: (...args: any[]) => any;
  processQueue: (...args: any[]) => any;
  removeAllFiles: (...args: any[]) => any;
  removeEventListeners: (...args: any[]) => any;
  removeFile: (...args: any[]) => any;
  resizeImage: (...args: any[]) => any;
  resolveOption: (...args: any[]) => any;
  setupEventListeners: (...args: any[]) => any;
  submitRequest: (...args: any[]) => any;
  updateTotalUploadProgress: (...args: any[]) => any;
  uploadFile: (...args: any[]) => any;
  uploadFiles: (...args: any[]) => any;
  version: string;
}

// Assuming every key has a hint, TypeHints will be provided by the generator
type UntypedKeys = Exclude<keyof TypeHints, keyof IDropzoneInstance>;
type UntypedFields = Pick<TypeHints, UntypedKeys>;
export type CombinedInstance = IDropzoneInstance & UntypedFields;

@Component
export default class VueAutoDropzone extends Vue {
  instance!: CombinedInstance;
  files: IDropzoneFile[] = [];

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

      // This isn't inferred correctly here yet
      this.instance = getInstance(
      this as any,
      this.$el as HTMLElement,
      this.options,
      this.hasDefaultSlot
      );

      // Pass every configured event through
      this.instance.events.forEach(eventName => {
          this.instance.on(eventName, (...args) => {
              // Dropzone is nigh unobservable, just manually fire updates when it fires events
              this.$forceUpdate();
              // eslint-disable-next-line no-useless-call
              this.$emit.apply(this, [eventName, ...args]);
              console.log(
                  'on',
                  eventName,
                  this.files && this.files.map(f => (f as any).dataURL)
              );
          });
      });
  }

  beforeDestroy() {
      if (!(this.$props.destroyDropzone && this.instance)) return;
      this.instance.destroy();
  }

  get hasDefaultSlot() {
      const hasDefaultSlot = Boolean(
          (this.$slots && this.$slots.default) ||
        (this.$scopedSlots && this.$scopedSlots.default)
      );
      // NB! Update instance as a side-effect
      if (this.instance) {
      // TODO: Types
          (this.instance as any).useFragment(hasDefaultSlot);
      }
      return hasDefaultSlot;
  }

  // Here and elsewhere, Dropzone uses direct assignment and mutations that we can't observe without a Proxy, cache nothing
  @NoCache
  get slotScope() {
      // TODO: Generate
      return {
          urls: this.urls,
          files: this.files,
          acceptedFiles: this.acceptedFiles,
          rejectedFiles: this.rejectedFiles,
          queuedFiles: this.queuedFiles,
          uploadingFiles: this.uploadingFiles,
      };
  }

  // TODO: Testing only
  @NoCache
  get urls() {
      return this.files.map(file => (file as any).dataURL);
  }

  /** Array of all accepted files */
  @NoCache
  get acceptedFiles() {
      return this.files.filter(file => file.accepted);
  }

  /** Array of all rejected files */
  @NoCache
  get rejectedFiles() {
      return this.files.filter(file => !file.accepted);
  }

  /** Array of all files queued for upload */
  @NoCache
  get queuedFiles() {
      return this.files.filter(file => file.status === Dropzone.QUEUED);
  }

  /** Array of all files currently uploading */
  @NoCache
  get uploadingFiles() {
      return this.files.filter(file => file.status === Dropzone.UPLOADING);
  }

  /** Array of all added files */
  @NoCache
  get addedFiles() {
      return this.files.filter(file => file.status === Dropzone.ADDED);
  }

  /** Array of all queued or currently uploading files */
  @NoCache
  get activeFiles() {
      return this.files.filter(
          file =>
              file.status === Dropzone.QUEUED || file.status === Dropzone.UPLOADING
      );
  }

  /** Get all Dropzone options */
  getOptions() {
      return this.instance.options;
  }

  /** Overwrite multiple Dropzone options at once via `Object.assign()` */
  setOptions(value: Partial<IDropzoneOptions>) {
      Object.assign(this.instance.options, value);
  }

  /** Get a single Dropzone option by key */
  getOption(key: keyof IDropzoneOptions) {
      return this.instance.options[key];
  }

  /** Set a single Dropzone option */
  setOption<T extends keyof IDropzoneOptions>(
      key: T,
      value: IDropzoneOptions[T]
  ) {
      this.instance.options[key] = value;
  }

  accept(...args: Parameters<CombinedInstance['accept']>) {
      return this.instance.accept.apply(this, args);
  }

  /** Overwrite Dropzone's internal `accept()` method */
  setAccept(value: CombinedInstance['accept']) {
      this.instance.accept = value;
  }

  addFile(...args: Parameters<CombinedInstance['addFile']>) {
      return this.instance.addFile.apply(this, args);
  }

  /** Overwrite Dropzone's internal `addFile()` method */
  setAddFile(value: CombinedInstance['addFile']) {
      this.instance.addFile = value;
  }

  cancelUpload(...args: Parameters<CombinedInstance['cancelUpload']>) {
      return this.instance.cancelUpload.apply(this, args);
  }

  /** Overwrite Dropzone's internal `cancelUpload()` method */
  setCancelUpload(value: CombinedInstance['cancelUpload']) {
      this.instance.cancelUpload = value;
  }

  createThumbnail(...args: Parameters<CombinedInstance['createThumbnail']>) {
      return this.instance.createThumbnail.apply(this, args);
  }

  /** Overwrite Dropzone's internal `createThumbnail()` method */
  setCreateThumbnail(value: CombinedInstance['createThumbnail']) {
      this.instance.createThumbnail = value;
  }

  createThumbnailFromUrl(
      ...args: Parameters<CombinedInstance['createThumbnailFromUrl']>
  ) {
      return this.instance.createThumbnailFromUrl.apply(this, args);
  }

  /** Overwrite Dropzone's internal `createThumbnailFromUrl()` method */
  setCreateThumbnailFromUrl(value: CombinedInstance['createThumbnailFromUrl']) {
      this.instance.createThumbnailFromUrl = value;
  }

  destroy(...args: Parameters<CombinedInstance['destroy']>) {
      return this.instance.destroy.apply(this, args);
  }

  /** Overwrite Dropzone's internal `destroy()` method */
  setDestroy(value: CombinedInstance['destroy']) {
      this.instance.destroy = value;
  }

  disable(...args: Parameters<CombinedInstance['disable']>) {
      return this.instance.disable.apply(this, args);
  }

  /** Overwrite Dropzone's internal `disable()` method */
  setDisable(value: CombinedInstance['disable']) {
      this.instance.disable = value;
  }

  drop(...args: Parameters<CombinedInstance['drop']>) {
      return this.instance.drop.apply(this, args);
  }

  /** Overwrite Dropzone's internal `drop()` method */
  setDrop(value: CombinedInstance['drop']) {
      this.instance.drop = value;
  }

  emit(...args: Parameters<CombinedInstance['emit']>) {
      return this.instance.emit.apply(this, args);
  }

  /** Overwrite Dropzone's internal `emit()` method */
  setEmit(value: CombinedInstance['emit']) {
      this.instance.emit = value;
  }

  enable(...args: Parameters<CombinedInstance['enable']>) {
      return this.instance.enable.apply(this, args);
  }

  /** Overwrite Dropzone's internal `enable()` method */
  setEnable(value: CombinedInstance['enable']) {
      this.instance.enable = value;
  }

  enqueueFile(...args: Parameters<CombinedInstance['enqueueFile']>) {
      return this.instance.enqueueFile.apply(this, args);
  }

  /** Overwrite Dropzone's internal `enqueueFile()` method */
  setEnqueueFile(value: CombinedInstance['enqueueFile']) {
      this.instance.enqueueFile = value;
  }

  enqueueFiles(...args: Parameters<CombinedInstance['enqueueFiles']>) {
      return this.instance.enqueueFiles.apply(this, args);
  }

  /** Overwrite Dropzone's internal `enqueueFiles()` method */
  setEnqueueFiles(value: CombinedInstance['enqueueFiles']) {
      this.instance.enqueueFiles = value;
  }

  filesize(...args: Parameters<CombinedInstance['filesize']>) {
      return this.instance.filesize.apply(this, args);
  }

  /** Overwrite Dropzone's internal `filesize()` method */
  setFilesize(value: CombinedInstance['filesize']) {
      this.instance.filesize = value;
  }

  getExistingFallback(
      ...args: Parameters<CombinedInstance['getExistingFallback']>
  ) {
      return this.instance.getExistingFallback.apply(this, args);
  }

  /** Overwrite Dropzone's internal `getExistingFallback()` method */
  setGetExistingFallback(value: CombinedInstance['getExistingFallback']) {
      this.instance.getExistingFallback = value;
  }

  getFallbackForm(...args: Parameters<CombinedInstance['getFallbackForm']>) {
      return this.instance.getFallbackForm.apply(this, args);
  }

  /** Overwrite Dropzone's internal `getFallbackForm()` method */
  setGetFallbackForm(value: CombinedInstance['getFallbackForm']) {
      this.instance.getFallbackForm = value;
  }

  getFilesWithStatus(
      ...args: Parameters<CombinedInstance['getFilesWithStatus']>
  ) {
      return this.instance.getFilesWithStatus.apply(this, args);
  }

  /** Overwrite Dropzone's internal `getFilesWithStatus()` method */
  setGetFilesWithStatus(value: CombinedInstance['getFilesWithStatus']) {
      this.instance.getFilesWithStatus = value;
  }

  handleFiles(...args: Parameters<CombinedInstance['handleFiles']>) {
      return this.instance.handleFiles.apply(this, args);
  }

  /** Overwrite Dropzone's internal `handleFiles()` method */
  setHandleFiles(value: CombinedInstance['handleFiles']) {
      this.instance.handleFiles = value;
  }

  init(...args: Parameters<CombinedInstance['init']>) {
      return this.instance.init.apply(this, args);
  }

  /** Overwrite Dropzone's internal `init()` method */
  setInit(value: CombinedInstance['init']) {
      this.instance.init = value;
  }

  off(...args: Parameters<CombinedInstance['off']>) {
      return this.instance.off.apply(this, args);
  }

  /** Overwrite Dropzone's internal `off()` method */
  setOff(value: CombinedInstance['off']) {
      this.instance.off = value;
  }

  on(...args: Parameters<CombinedInstance['on']>) {
      return this.instance.on.apply(this, args);
  }

  /** Overwrite Dropzone's internal `on()` method */
  setOn(value: CombinedInstance['on']) {
      this.instance.on = value;
  }

  paste(...args: Parameters<CombinedInstance['paste']>) {
      return this.instance.paste.apply(this, args);
  }

  /** Overwrite Dropzone's internal `paste()` method */
  setPaste(value: CombinedInstance['paste']) {
      this.instance.paste = value;
  }

  processFile(...args: Parameters<CombinedInstance['processFile']>) {
      return this.instance.processFile.apply(this, args);
  }

  /** Overwrite Dropzone's internal `processFile()` method */
  setProcessFile(value: CombinedInstance['processFile']) {
      this.instance.processFile = value;
  }

  processFiles(...args: Parameters<CombinedInstance['processFiles']>) {
      return this.instance.processFiles.apply(this, args);
  }

  /** Overwrite Dropzone's internal `processFiles()` method */
  setProcessFiles(value: CombinedInstance['processFiles']) {
      this.instance.processFiles = value;
  }

  processQueue(...args: Parameters<CombinedInstance['processQueue']>) {
      return this.instance.processQueue.apply(this, args);
  }

  /** Overwrite Dropzone's internal `processQueue()` method */
  setProcessQueue(value: CombinedInstance['processQueue']) {
      this.instance.processQueue = value;
  }

  removeAllFiles(...args: Parameters<CombinedInstance['removeAllFiles']>) {
      return this.instance.removeAllFiles.apply(this, args);
  }

  /** Overwrite Dropzone's internal `removeAllFiles()` method */
  setRemoveAllFiles(value: CombinedInstance['removeAllFiles']) {
      this.instance.removeAllFiles = value;
  }

  removeEventListeners(
      ...args: Parameters<CombinedInstance['removeEventListeners']>
  ) {
      return this.instance.removeEventListeners.apply(this, args);
  }

  /** Overwrite Dropzone's internal `removeEventListeners()` method */
  setRemoveEventListeners(value: CombinedInstance['removeEventListeners']) {
      this.instance.removeEventListeners = value;
  }

  removeFile(...args: Parameters<CombinedInstance['removeFile']>) {
      return this.instance.removeFile.apply(this, args);
  }

  /** Overwrite Dropzone's internal `removeFile()` method */
  setRemoveFile(value: CombinedInstance['removeFile']) {
      this.instance.removeFile = value;
  }

  resizeImage(...args: Parameters<CombinedInstance['resizeImage']>) {
      return this.instance.resizeImage.apply(this, args);
  }

  /** Overwrite Dropzone's internal `resizeImage()` method */
  setResizeImage(value: CombinedInstance['resizeImage']) {
      this.instance.resizeImage = value;
  }

  resolveOption(...args: Parameters<CombinedInstance['resolveOption']>) {
      return this.instance.resolveOption.apply(this, args);
  }

  /** Overwrite Dropzone's internal `resolveOption()` method */
  setResolveOption(value: CombinedInstance['resolveOption']) {
      this.instance.resolveOption = value;
  }

  setupEventListeners(
      ...args: Parameters<CombinedInstance['setupEventListeners']>
  ) {
      return this.instance.setupEventListeners.apply(this, args);
  }

  /** Overwrite Dropzone's internal `setupEventListeners()` method */
  setSetupEventListeners(value: CombinedInstance['setupEventListeners']) {
      this.instance.setupEventListeners = value;
  }

  submitRequest(...args: Parameters<CombinedInstance['submitRequest']>) {
      return this.instance.submitRequest.apply(this, args);
  }

  /** Overwrite Dropzone's internal `submitRequest()` method */
  setSubmitRequest(value: CombinedInstance['submitRequest']) {
      this.instance.submitRequest = value;
  }

  updateTotalUploadProgress(
      ...args: Parameters<CombinedInstance['updateTotalUploadProgress']>
  ) {
      return this.instance.updateTotalUploadProgress.apply(this, args);
  }

  /** Overwrite Dropzone's internal `updateTotalUploadProgress()` method */
  setUpdateTotalUploadProgress(
      value: CombinedInstance['updateTotalUploadProgress']
  ) {
      this.instance.updateTotalUploadProgress = value;
  }

  uploadFile(...args: Parameters<CombinedInstance['uploadFile']>) {
      return this.instance.uploadFile.apply(this, args);
  }

  /** Overwrite Dropzone's internal `uploadFile()` method */
  setUploadFile(value: CombinedInstance['uploadFile']) {
      this.instance.uploadFile = value;
  }

  uploadFiles(...args: Parameters<CombinedInstance['uploadFiles']>) {
      return this.instance.uploadFiles.apply(this, args);
  }

  /** Overwrite Dropzone's internal `uploadFiles()` method */
  setUploadFiles(value: CombinedInstance['uploadFiles']) {
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
<style lang="scss" scoped>
.vue-auto-dropzone {
  // Suppress children's pointer events so all of the parent is clickable for initiating uploads
  &.is-clickable {
    cursor: pointer;

    > * {
      pointer-events: none;
    }
  }
}

.is-hidden {
  display: block;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
