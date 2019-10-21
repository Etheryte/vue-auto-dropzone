<template>
  <div class="vue-auto-dropzone" :class="{ dropzone: includeStyling }">
    <!-- Placeholder until we mount -->
    <div v-if="!instance" class="dz-default dz-message">
      {{ defaultMessage }}
    </div>
    <template v-else>
      <slot v-if="hasDefaultSlot" v-bind="slotScope" />
      <div
        v-bind:class="{
          'is-hidden': hasDefaultSlot,
          'dz-default dz-message': includeStyling
        }"
      >
        <slot name="message">{{ defaultMessage }}</slot>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
// NB! THIS IS A GENERATED FILE. ANY MODIFICATIONS YOU MAKE HERE WILL BE LOST.
import { Vue, Component, Prop } from 'vue-property-decorator';

import Dropzone, { DropzoneOptions, DropzoneFile } from 'dropzone';
import { debounce } from 'underscore';

import getInstance from './DropzoneInstance';
import NoCache from './NoCache';
import urltoFile from './fileUtil';

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

type FileOrDataString = Dropzone.DropzoneFile | File | string;

// Dropzone type definitions aren't up to date, hint the user where possible
interface TypeHints {
  accept: (...args: any[]) => any;
  cancelUpload: (...args: any[]) => any;
  createThumbnail: (...args: any[]) => any;
  createThumbnailFromUrl: (...args: any[]) => any;
  defaultOptions: object;
  destroy: (...args: any[]) => any;
  disable: (...args: any[]) => any;
  drop: (...args: any[]) => any;
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
  listeners: any[];
  off: (...args: any[]) => any;
  on: (...args: any[]) => any;
  paste: (...args: any[]) => any;
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

const uninitiatedInstanceMessage = 'Dropzone instance is uninitiated';

@Component
export default class VueAutoDropzone extends Vue {
  private instance: CombinedInstance | null = null;
  files: IDropzoneFile[] = [];
  defaultMessage = 'Drop files here to upload';

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
    this.instance!.events.forEach(eventName => {
      this.instance!.on(eventName, (...args) => {
          // Dropzone is nigh unobservable, just manually fire updates when it fires events
          this.$forceUpdate();
          // Reemit events on the Vue component
          // eslint-disable-next-line no-useless-call
          this.$emit.apply(this, [eventName, ...args]);
      });
    });
  }

  beforeDestroy() {
      if (!this.instance) return;
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

  // Just mirror the whole instance through for the slot scope. I'm pretty sure this will come back to bite me.
  get slotScope() {
      return this;
  }

  // Here and elsewhere, Dropzone uses direct assignment and mutations that we can't observe without a Proxy, cache nothing
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

  /** Manually add a new file, input is either a `File` or a data string (`"data:image/..."`) with a file name and optional mime type */
  async addFile<T extends FileOrDataString>(
      fileOrDataString: T,
      fileName?: T extends string ? string : never,
      mimeType?: T extends string ? string : never
  ) {
      if (typeof fileOrDataString === 'string') {
          const file = await urltoFile(fileOrDataString, fileName, mimeType);
          if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
          // The missing fields get added internally
          return this.instance.addFile(file as DropzoneFile);
      } else {
      // Manual check to let the user know they can't set the name and mime for File instances
          if (fileName || mimeType) {
              throw new TypeError('File.name and File.type are readonly properties');
          }
          if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
          return this.instance.addFile(fileOrDataString as DropzoneFile);
      }
  }

  /** Get all Dropzone options */
  getOptions() {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.options;
  }

  /** Overwrite multiple Dropzone options at once via `Object.assign()` */
  setOptions(value: Partial<IDropzoneOptions>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      Object.assign(this.instance.options, value);
  }

  /** Get a single Dropzone option by key */
  getOption(key: keyof IDropzoneOptions) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.options[key];
  }

  /** Set a single Dropzone option */
  setOption<T extends keyof IDropzoneOptions>(
      key: T,
      value: IDropzoneOptions[T]
  ) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.options[key] = value;
  }

  accept(...args: Parameters<CombinedInstance['accept']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.accept.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `accept()` method */
  setAccept(value: CombinedInstance['accept']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.accept = value;
  }

  cancelUpload(...args: Parameters<CombinedInstance['cancelUpload']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.cancelUpload.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `cancelUpload()` method */
  setCancelUpload(value: CombinedInstance['cancelUpload']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.cancelUpload = value;
  }

  createThumbnail(...args: Parameters<CombinedInstance['createThumbnail']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.createThumbnail.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `createThumbnail()` method */
  setCreateThumbnail(value: CombinedInstance['createThumbnail']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.createThumbnail = value;
  }

  createThumbnailFromUrl(
      ...args: Parameters<CombinedInstance['createThumbnailFromUrl']>
  ) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.createThumbnailFromUrl.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `createThumbnailFromUrl()` method */
  setCreateThumbnailFromUrl(value: CombinedInstance['createThumbnailFromUrl']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.createThumbnailFromUrl = value;
  }

  destroy(...args: Parameters<CombinedInstance['destroy']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.destroy.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `destroy()` method */
  setDestroy(value: CombinedInstance['destroy']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.destroy = value;
  }

  disable(...args: Parameters<CombinedInstance['disable']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.disable.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `disable()` method */
  setDisable(value: CombinedInstance['disable']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.disable = value;
  }

  drop(...args: Parameters<CombinedInstance['drop']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.drop.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `drop()` method */
  setDrop(value: CombinedInstance['drop']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.drop = value;
  }

  emit(...args: Parameters<CombinedInstance['emit']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.emit.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `emit()` method */
  setEmit(value: CombinedInstance['emit']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.emit = value;
  }

  enable(...args: Parameters<CombinedInstance['enable']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.enable.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `enable()` method */
  setEnable(value: CombinedInstance['enable']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.enable = value;
  }

  enqueueFile(...args: Parameters<CombinedInstance['enqueueFile']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.enqueueFile.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `enqueueFile()` method */
  setEnqueueFile(value: CombinedInstance['enqueueFile']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.enqueueFile = value;
  }

  enqueueFiles(...args: Parameters<CombinedInstance['enqueueFiles']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.enqueueFiles.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `enqueueFiles()` method */
  setEnqueueFiles(value: CombinedInstance['enqueueFiles']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.enqueueFiles = value;
  }

  filesize(...args: Parameters<CombinedInstance['filesize']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.filesize.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `filesize()` method */
  setFilesize(value: CombinedInstance['filesize']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.filesize = value;
  }

  getExistingFallback(
      ...args: Parameters<CombinedInstance['getExistingFallback']>
  ) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.getExistingFallback.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `getExistingFallback()` method */
  setGetExistingFallback(value: CombinedInstance['getExistingFallback']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.getExistingFallback = value;
  }

  getFallbackForm(...args: Parameters<CombinedInstance['getFallbackForm']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.getFallbackForm.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `getFallbackForm()` method */
  setGetFallbackForm(value: CombinedInstance['getFallbackForm']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.getFallbackForm = value;
  }

  getFilesWithStatus(
      ...args: Parameters<CombinedInstance['getFilesWithStatus']>
  ) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.getFilesWithStatus.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `getFilesWithStatus()` method */
  setGetFilesWithStatus(value: CombinedInstance['getFilesWithStatus']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.getFilesWithStatus = value;
  }

  handleFiles(...args: Parameters<CombinedInstance['handleFiles']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.handleFiles.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `handleFiles()` method */
  setHandleFiles(value: CombinedInstance['handleFiles']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.handleFiles = value;
  }

  off(...args: Parameters<CombinedInstance['off']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.off.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `off()` method */
  setOff(value: CombinedInstance['off']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.off = value;
  }

  on(...args: Parameters<CombinedInstance['on']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.on.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `on()` method */
  setOn(value: CombinedInstance['on']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.on = value;
  }

  paste(...args: Parameters<CombinedInstance['paste']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.paste.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `paste()` method */
  setPaste(value: CombinedInstance['paste']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.paste = value;
  }

  processFile(...args: Parameters<CombinedInstance['processFile']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.processFile.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `processFile()` method */
  setProcessFile(value: CombinedInstance['processFile']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.processFile = value;
  }

  processFiles(...args: Parameters<CombinedInstance['processFiles']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.processFiles.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `processFiles()` method */
  setProcessFiles(value: CombinedInstance['processFiles']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.processFiles = value;
  }

  processQueue(...args: Parameters<CombinedInstance['processQueue']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.processQueue.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `processQueue()` method */
  setProcessQueue(value: CombinedInstance['processQueue']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.processQueue = value;
  }

  removeAllFiles(...args: Parameters<CombinedInstance['removeAllFiles']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.removeAllFiles.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `removeAllFiles()` method */
  setRemoveAllFiles(value: CombinedInstance['removeAllFiles']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.removeAllFiles = value;
  }

  removeEventListeners(
      ...args: Parameters<CombinedInstance['removeEventListeners']>
  ) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.removeEventListeners.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `removeEventListeners()` method */
  setRemoveEventListeners(value: CombinedInstance['removeEventListeners']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.removeEventListeners = value;
  }

  removeFile(...args: Parameters<CombinedInstance['removeFile']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.removeFile.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `removeFile()` method */
  setRemoveFile(value: CombinedInstance['removeFile']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.removeFile = value;
  }

  resizeImage(...args: Parameters<CombinedInstance['resizeImage']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.resizeImage.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `resizeImage()` method */
  setResizeImage(value: CombinedInstance['resizeImage']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.resizeImage = value;
  }

  resolveOption(...args: Parameters<CombinedInstance['resolveOption']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.resolveOption.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `resolveOption()` method */
  setResolveOption(value: CombinedInstance['resolveOption']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.resolveOption = value;
  }

  setupEventListeners(
      ...args: Parameters<CombinedInstance['setupEventListeners']>
  ) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.setupEventListeners.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `setupEventListeners()` method */
  setSetupEventListeners(value: CombinedInstance['setupEventListeners']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.setupEventListeners = value;
  }

  submitRequest(...args: Parameters<CombinedInstance['submitRequest']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.submitRequest.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `submitRequest()` method */
  setSubmitRequest(value: CombinedInstance['submitRequest']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.submitRequest = value;
  }

  updateTotalUploadProgress(
      ...args: Parameters<CombinedInstance['updateTotalUploadProgress']>
  ) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.updateTotalUploadProgress.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `updateTotalUploadProgress()` method */
  setUpdateTotalUploadProgress(
      value: CombinedInstance['updateTotalUploadProgress']
  ) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.updateTotalUploadProgress = value;
  }

  uploadFile(...args: Parameters<CombinedInstance['uploadFile']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.uploadFile.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `uploadFile()` method */
  setUploadFile(value: CombinedInstance['uploadFile']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.uploadFile = value;
  }

  uploadFiles(...args: Parameters<CombinedInstance['uploadFiles']>) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.uploadFiles.apply(this.instance, args);
  }

  /** Overwrite Dropzone's internal `uploadFiles()` method */
  setUploadFiles(value: CombinedInstance['uploadFiles']) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      this.instance.uploadFiles = value;
  }

  @NoCache
  get defaultOptions(this: VueAutoDropzone) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.defaultOptions;
  }

  @NoCache
  get events(this: VueAutoDropzone) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.events;
  }

  @NoCache
  get hiddenFileInput(this: VueAutoDropzone) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.hiddenFileInput;
  }

  @NoCache
  get listeners(this: VueAutoDropzone) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.listeners;
  }

  @NoCache
  get version(this: VueAutoDropzone) {
      if (!this.instance) throw new TypeError(uninitiatedInstanceMessage);
      return this.instance.version;
  }
}
</script>
<style src="./vueAutoDropzone.css"></style>
<style lang="scss" scoped>
.is-hidden {
  display: block;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
