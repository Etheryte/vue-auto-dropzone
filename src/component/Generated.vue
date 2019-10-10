<script lang="ts">
// NB! THIS IS A GENERATED FILE. ANY MODIFICATIONS YOU MAKE HERE WILL BE LOST WITH THE NEXT BUILD.
import Vue from 'vue';
import Component from 'vue-class-component';

import { IDropzoneInstance } from './interfaces';

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

// Assuming every key has a hint
type UntypedKeys = Exclude<keyof TypeHints, keyof IDropzoneInstance>;
type UntypedFields = Pick<TypeHints, UntypedKeys>;

@Component
export default class Dropzone extends Vue {
  instance!: IDropzoneInstance & UntypedFields;

  get Emitter(this: Dropzone) {
      return this.instance.Emitter;
  }

  set Emitter(this: Dropzone, value) {
      this.instance.Emitter = value;
  }

  get URL(this: Dropzone) {
      return this.instance.URL;
  }

  set URL(this: Dropzone, value) {
      this.instance.URL = value;
  }

  get accept(this: Dropzone) {
      return this.instance.accept;
  }

  set accept(this: Dropzone, value) {
      this.instance.accept = value;
  }

  get addFile(this: Dropzone) {
      return this.instance.addFile;
  }

  set addFile(this: Dropzone, value) {
      this.instance.addFile = value;
  }

  get cancelUpload(this: Dropzone) {
      return this.instance.cancelUpload;
  }

  set cancelUpload(this: Dropzone, value) {
      this.instance.cancelUpload = value;
  }

  get createThumbnail(this: Dropzone) {
      return this.instance.createThumbnail;
  }

  set createThumbnail(this: Dropzone, value) {
      this.instance.createThumbnail = value;
  }

  get createThumbnailFromUrl(this: Dropzone) {
      return this.instance.createThumbnailFromUrl;
  }

  set createThumbnailFromUrl(this: Dropzone, value) {
      this.instance.createThumbnailFromUrl = value;
  }

  get destroy(this: Dropzone) {
      return this.instance.destroy;
  }

  set destroy(this: Dropzone, value) {
      this.instance.destroy = value;
  }

  get disable(this: Dropzone) {
      return this.instance.disable;
  }

  set disable(this: Dropzone, value) {
      this.instance.disable = value;
  }

  get drop(this: Dropzone) {
      return this.instance.drop;
  }

  set drop(this: Dropzone, value) {
      this.instance.drop = value;
  }

  get emit(this: Dropzone) {
      return this.instance.emit;
  }

  set emit(this: Dropzone, value) {
      this.instance.emit = value;
  }

  get enable(this: Dropzone) {
      return this.instance.enable;
  }

  set enable(this: Dropzone, value) {
      this.instance.enable = value;
  }

  get enqueueFile(this: Dropzone) {
      return this.instance.enqueueFile;
  }

  set enqueueFile(this: Dropzone, value) {
      this.instance.enqueueFile = value;
  }

  get enqueueFiles(this: Dropzone) {
      return this.instance.enqueueFiles;
  }

  set enqueueFiles(this: Dropzone, value) {
      this.instance.enqueueFiles = value;
  }

  get filesize(this: Dropzone) {
      return this.instance.filesize;
  }

  set filesize(this: Dropzone, value) {
      this.instance.filesize = value;
  }

  get getAcceptedFiles(this: Dropzone) {
      return this.instance.getAcceptedFiles;
  }

  set getAcceptedFiles(this: Dropzone, value) {
      this.instance.getAcceptedFiles = value;
  }

  get getActiveFiles(this: Dropzone) {
      return this.instance.getActiveFiles;
  }

  set getActiveFiles(this: Dropzone, value) {
      this.instance.getActiveFiles = value;
  }

  get getAddedFiles(this: Dropzone) {
      return this.instance.getAddedFiles;
  }

  set getAddedFiles(this: Dropzone, value) {
      this.instance.getAddedFiles = value;
  }

  get getExistingFallback(this: Dropzone) {
      return this.instance.getExistingFallback;
  }

  set getExistingFallback(this: Dropzone, value) {
      this.instance.getExistingFallback = value;
  }

  get getFallbackForm(this: Dropzone) {
      return this.instance.getFallbackForm;
  }

  set getFallbackForm(this: Dropzone, value) {
      this.instance.getFallbackForm = value;
  }

  get getFilesWithStatus(this: Dropzone) {
      return this.instance.getFilesWithStatus;
  }

  set getFilesWithStatus(this: Dropzone, value) {
      this.instance.getFilesWithStatus = value;
  }

  get getQueuedFiles(this: Dropzone) {
      return this.instance.getQueuedFiles;
  }

  set getQueuedFiles(this: Dropzone, value) {
      this.instance.getQueuedFiles = value;
  }

  get getRejectedFiles(this: Dropzone) {
      return this.instance.getRejectedFiles;
  }

  set getRejectedFiles(this: Dropzone, value) {
      this.instance.getRejectedFiles = value;
  }

  get getUploadingFiles(this: Dropzone) {
      return this.instance.getUploadingFiles;
  }

  set getUploadingFiles(this: Dropzone, value) {
      this.instance.getUploadingFiles = value;
  }

  get handleFiles(this: Dropzone) {
      return this.instance.handleFiles;
  }

  set handleFiles(this: Dropzone, value) {
      this.instance.handleFiles = value;
  }

  get init(this: Dropzone) {
      return this.instance.init;
  }

  set init(this: Dropzone, value) {
      this.instance.init = value;
  }

  get off(this: Dropzone) {
      return this.instance.off;
  }

  set off(this: Dropzone, value) {
      this.instance.off = value;
  }

  get on(this: Dropzone) {
      return this.instance.on;
  }

  set on(this: Dropzone, value) {
      this.instance.on = value;
  }

  get paste(this: Dropzone) {
      return this.instance.paste;
  }

  set paste(this: Dropzone, value) {
      this.instance.paste = value;
  }

  get processFile(this: Dropzone) {
      return this.instance.processFile;
  }

  set processFile(this: Dropzone, value) {
      this.instance.processFile = value;
  }

  get processFiles(this: Dropzone) {
      return this.instance.processFiles;
  }

  set processFiles(this: Dropzone, value) {
      this.instance.processFiles = value;
  }

  get processQueue(this: Dropzone) {
      return this.instance.processQueue;
  }

  set processQueue(this: Dropzone, value) {
      this.instance.processQueue = value;
  }

  get removeAllFiles(this: Dropzone) {
      return this.instance.removeAllFiles;
  }

  set removeAllFiles(this: Dropzone, value) {
      this.instance.removeAllFiles = value;
  }

  get removeEventListeners(this: Dropzone) {
      return this.instance.removeEventListeners;
  }

  set removeEventListeners(this: Dropzone, value) {
      this.instance.removeEventListeners = value;
  }

  get removeFile(this: Dropzone) {
      return this.instance.removeFile;
  }

  set removeFile(this: Dropzone, value) {
      this.instance.removeFile = value;
  }

  get resizeImage(this: Dropzone) {
      return this.instance.resizeImage;
  }

  set resizeImage(this: Dropzone, value) {
      this.instance.resizeImage = value;
  }

  get resolveOption(this: Dropzone) {
      return this.instance.resolveOption;
  }

  set resolveOption(this: Dropzone, value) {
      this.instance.resolveOption = value;
  }

  get setupEventListeners(this: Dropzone) {
      return this.instance.setupEventListeners;
  }

  set setupEventListeners(this: Dropzone, value) {
      this.instance.setupEventListeners = value;
  }

  get submitRequest(this: Dropzone) {
      return this.instance.submitRequest;
  }

  set submitRequest(this: Dropzone, value) {
      this.instance.submitRequest = value;
  }

  get updateTotalUploadProgress(this: Dropzone) {
      return this.instance.updateTotalUploadProgress;
  }

  set updateTotalUploadProgress(this: Dropzone, value) {
      this.instance.updateTotalUploadProgress = value;
  }

  get uploadFile(this: Dropzone) {
      return this.instance.uploadFile;
  }

  set uploadFile(this: Dropzone, value) {
      this.instance.uploadFile = value;
  }

  get uploadFiles(this: Dropzone) {
      return this.instance.uploadFiles;
  }

  set uploadFiles(this: Dropzone, value) {
      this.instance.uploadFiles = value;
  }

  get clickableElements(this: Dropzone) {
      return this.instance.clickableElements;
  }

  get defaultOptions(this: Dropzone) {
      return this.instance.defaultOptions;
  }

  get element(this: Dropzone) {
      return this.instance.element;
  }

  get events(this: Dropzone) {
      return this.instance.events;
  }

  get files(this: Dropzone) {
      return this.instance.files;
  }

  get hiddenFileInput(this: Dropzone) {
      return this.instance.hiddenFileInput;
  }

  get listeners(this: Dropzone) {
      return this.instance.listeners;
  }

  get previewsContainer(this: Dropzone) {
      return this.instance.previewsContainer;
  }

  get version(this: Dropzone) {
      return this.instance.version;
  }
}
</script>
