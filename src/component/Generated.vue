<script lang="ts">
// NB! THIS IS A GENERATED FILE. ANY MODIFICATIONS YOU MAKE HERE WILL BE LOST WITH THE NEXT BUILD.
import Vue from 'vue';
import Component from 'vue-class-component';

import { DropzoneInstance } from './interfaces';

        // Dropzone type definitions aren't up to date
        type UntypedKeys = Exclude<keyof GeneratedBase, keyof DropzoneInstance>;
        type UntypedFields = Record<UntypedKeys, any>;

        @Component
export default class GeneratedBase extends Vue {
            instance!: DropzoneInstance & UntypedFields;

            get Emitter(this: GeneratedBase) {
                return this.instance.Emitter;
            }

            set Emitter(this: GeneratedBase, value) {
                this.instance.Emitter = value;
            }

            get URL(this: GeneratedBase) {
                return this.instance.URL;
            }

            set URL(this: GeneratedBase, value) {
                this.instance.URL = value;
            }

            get accept(this: GeneratedBase) {
                return this.instance.accept;
            }

            set accept(this: GeneratedBase, value) {
                this.instance.accept = value;
            }

            get addFile(this: GeneratedBase) {
                return this.instance.addFile;
            }

            set addFile(this: GeneratedBase, value) {
                this.instance.addFile = value;
            }

            get cancelUpload(this: GeneratedBase) {
                return this.instance.cancelUpload;
            }

            set cancelUpload(this: GeneratedBase, value) {
                this.instance.cancelUpload = value;
            }

            get createThumbnail(this: GeneratedBase) {
                return this.instance.createThumbnail;
            }

            set createThumbnail(this: GeneratedBase, value) {
                this.instance.createThumbnail = value;
            }

            get createThumbnailFromUrl(this: GeneratedBase) {
                return this.instance.createThumbnailFromUrl;
            }

            set createThumbnailFromUrl(this: GeneratedBase, value) {
                this.instance.createThumbnailFromUrl = value;
            }

            get destroy(this: GeneratedBase) {
                return this.instance.destroy;
            }

            set destroy(this: GeneratedBase, value) {
                this.instance.destroy = value;
            }

            get disable(this: GeneratedBase) {
                return this.instance.disable;
            }

            set disable(this: GeneratedBase, value) {
                this.instance.disable = value;
            }

            get drop(this: GeneratedBase) {
                return this.instance.drop;
            }

            set drop(this: GeneratedBase, value) {
                this.instance.drop = value;
            }

            get emit(this: GeneratedBase) {
                return this.instance.emit;
            }

            set emit(this: GeneratedBase, value) {
                this.instance.emit = value;
            }

            get enable(this: GeneratedBase) {
                return this.instance.enable;
            }

            set enable(this: GeneratedBase, value) {
                this.instance.enable = value;
            }

            get enqueueFile(this: GeneratedBase) {
                return this.instance.enqueueFile;
            }

            set enqueueFile(this: GeneratedBase, value) {
                this.instance.enqueueFile = value;
            }

            get enqueueFiles(this: GeneratedBase) {
                return this.instance.enqueueFiles;
            }

            set enqueueFiles(this: GeneratedBase, value) {
                this.instance.enqueueFiles = value;
            }

            get filesize(this: GeneratedBase) {
                return this.instance.filesize;
            }

            set filesize(this: GeneratedBase, value) {
                this.instance.filesize = value;
            }

            get getAcceptedFiles(this: GeneratedBase) {
                return this.instance.getAcceptedFiles;
            }

            set getAcceptedFiles(this: GeneratedBase, value) {
                this.instance.getAcceptedFiles = value;
            }

            get getActiveFiles(this: GeneratedBase) {
                return this.instance.getActiveFiles;
            }

            set getActiveFiles(this: GeneratedBase, value) {
                this.instance.getActiveFiles = value;
            }

            get getAddedFiles(this: GeneratedBase) {
                return this.instance.getAddedFiles;
            }

            set getAddedFiles(this: GeneratedBase, value) {
                this.instance.getAddedFiles = value;
            }

            get getExistingFallback(this: GeneratedBase) {
                return this.instance.getExistingFallback;
            }

            set getExistingFallback(this: GeneratedBase, value) {
                this.instance.getExistingFallback = value;
            }

            get getFallbackForm(this: GeneratedBase) {
                return this.instance.getFallbackForm;
            }

            set getFallbackForm(this: GeneratedBase, value) {
                this.instance.getFallbackForm = value;
            }

            get getFilesWithStatus(this: GeneratedBase) {
                return this.instance.getFilesWithStatus;
            }

            set getFilesWithStatus(this: GeneratedBase, value) {
                this.instance.getFilesWithStatus = value;
            }

            get getQueuedFiles(this: GeneratedBase) {
                return this.instance.getQueuedFiles;
            }

            set getQueuedFiles(this: GeneratedBase, value) {
                this.instance.getQueuedFiles = value;
            }

            get getRejectedFiles(this: GeneratedBase) {
                return this.instance.getRejectedFiles;
            }

            set getRejectedFiles(this: GeneratedBase, value) {
                this.instance.getRejectedFiles = value;
            }

            get getUploadingFiles(this: GeneratedBase) {
                return this.instance.getUploadingFiles;
            }

            set getUploadingFiles(this: GeneratedBase, value) {
                this.instance.getUploadingFiles = value;
            }

            get handleFiles(this: GeneratedBase) {
                return this.instance.handleFiles;
            }

            set handleFiles(this: GeneratedBase, value) {
                this.instance.handleFiles = value;
            }

            get init(this: GeneratedBase) {
                return this.instance.init;
            }

            set init(this: GeneratedBase, value) {
                this.instance.init = value;
            }

            get off(this: GeneratedBase) {
                return this.instance.off;
            }

            set off(this: GeneratedBase, value) {
                this.instance.off = value;
            }

            get on(this: GeneratedBase) {
                return this.instance.on;
            }

            set on(this: GeneratedBase, value) {
                this.instance.on = value;
            }

            get paste(this: GeneratedBase) {
                return this.instance.paste;
            }

            set paste(this: GeneratedBase, value) {
                this.instance.paste = value;
            }

            get processFile(this: GeneratedBase) {
                return this.instance.processFile;
            }

            set processFile(this: GeneratedBase, value) {
                this.instance.processFile = value;
            }

            get processFiles(this: GeneratedBase) {
                return this.instance.processFiles;
            }

            set processFiles(this: GeneratedBase, value) {
                this.instance.processFiles = value;
            }

            get processQueue(this: GeneratedBase) {
                return this.instance.processQueue;
            }

            set processQueue(this: GeneratedBase, value) {
                this.instance.processQueue = value;
            }

            get removeAllFiles(this: GeneratedBase) {
                return this.instance.removeAllFiles;
            }

            set removeAllFiles(this: GeneratedBase, value) {
                this.instance.removeAllFiles = value;
            }

            get removeEventListeners(this: GeneratedBase) {
                return this.instance.removeEventListeners;
            }

            set removeEventListeners(this: GeneratedBase, value) {
                this.instance.removeEventListeners = value;
            }

            get removeFile(this: GeneratedBase) {
                return this.instance.removeFile;
            }

            set removeFile(this: GeneratedBase, value) {
                this.instance.removeFile = value;
            }

            get resizeImage(this: GeneratedBase) {
                return this.instance.resizeImage;
            }

            set resizeImage(this: GeneratedBase, value) {
                this.instance.resizeImage = value;
            }

            get resolveOption(this: GeneratedBase) {
                return this.instance.resolveOption;
            }

            set resolveOption(this: GeneratedBase, value) {
                this.instance.resolveOption = value;
            }

            get setupEventListeners(this: GeneratedBase) {
                return this.instance.setupEventListeners;
            }

            set setupEventListeners(this: GeneratedBase, value) {
                this.instance.setupEventListeners = value;
            }

            get submitRequest(this: GeneratedBase) {
                return this.instance.submitRequest;
            }

            set submitRequest(this: GeneratedBase, value) {
                this.instance.submitRequest = value;
            }

            get updateTotalUploadProgress(this: GeneratedBase) {
                return this.instance.updateTotalUploadProgress;
            }

            set updateTotalUploadProgress(this: GeneratedBase, value) {
                this.instance.updateTotalUploadProgress = value;
            }

            get uploadFile(this: GeneratedBase) {
                return this.instance.uploadFile;
            }

            set uploadFile(this: GeneratedBase, value) {
                this.instance.uploadFile = value;
            }

            get uploadFiles(this: GeneratedBase) {
                return this.instance.uploadFiles;
            }

            set uploadFiles(this: GeneratedBase, value) {
                this.instance.uploadFiles = value;
            }

            get clickableElements(this: GeneratedBase) {
                return this.instance.clickableElements;
            }

            get defaultOptions(this: GeneratedBase) {
                return this.instance.defaultOptions;
            }

            get element(this: GeneratedBase) {
                return this.instance.element;
            }

            get events(this: GeneratedBase) {
                return this.instance.events;
            }

            get files(this: GeneratedBase) {
                return this.instance.files;
            }

            get hiddenFileInput(this: GeneratedBase) {
                return this.instance.hiddenFileInput;
            }

            get listeners(this: GeneratedBase) {
                return this.instance.listeners;
            }

            get previewsContainer(this: GeneratedBase) {
                return this.instance.previewsContainer;
            }

            get version(this: GeneratedBase) {
                return this.instance.version;
            }
}
</script>
