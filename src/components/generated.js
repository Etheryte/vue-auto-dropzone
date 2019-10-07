/**
 * NB! THIS IS A GENERATED FILE. ANY MODIFICATIONS YOU MAKE WILL BE LOST WITH THE NEXT BUILD.
 *
 * vue-auto-dropzone
 * Copyright (c) 2019, Karl Tarvas
 *
 */

export default {
    data() {
        return {
            hasBeenMounted: false,
        };
    },
    mounted() {
        if (this.$isServer && this.hasBeenMounted) {
            return;
        }
        this.hasBeenMounted = true;
    /*
    this.dropzone = new Dropzone(
        this.$refs.dropzoneElement,
        this.dropzoneSettings
    );
    */
    },
    methods: {
        URL: function URL(...args) {
            return this.dropzone.URL.apply(this, args);
        },
        constructor: function constructor(...args) {
            return this.dropzone.constructor.apply(this, args);
        },
        getAcceptedFiles: function getAcceptedFiles(...args) {
            return this.dropzone.getAcceptedFiles.apply(this, args);
        },
        getRejectedFiles: function getRejectedFiles(...args) {
            return this.dropzone.getRejectedFiles.apply(this, args);
        },
        getFilesWithStatus: function getFilesWithStatus(...args) {
            return this.dropzone.getFilesWithStatus.apply(this, args);
        },
        getQueuedFiles: function getQueuedFiles(...args) {
            return this.dropzone.getQueuedFiles.apply(this, args);
        },
        getUploadingFiles: function getUploadingFiles(...args) {
            return this.dropzone.getUploadingFiles.apply(this, args);
        },
        getAddedFiles: function getAddedFiles(...args) {
            return this.dropzone.getAddedFiles.apply(this, args);
        },
        getActiveFiles: function getActiveFiles(...args) {
            return this.dropzone.getActiveFiles.apply(this, args);
        },
        init: function init(...args) {
            return this.dropzone.init.apply(this, args);
        },
        destroy: function destroy(...args) {
            return this.dropzone.destroy.apply(this, args);
        },
        updateTotalUploadProgress: function updateTotalUploadProgress(...args) {
            return this.dropzone.updateTotalUploadProgress.apply(this, args);
        },
        getFallbackForm: function getFallbackForm(...args) {
            return this.dropzone.getFallbackForm.apply(this, args);
        },
        getExistingFallback: function getExistingFallback(...args) {
            return this.dropzone.getExistingFallback.apply(this, args);
        },
        setupEventListeners: function setupEventListeners(...args) {
            return this.dropzone.setupEventListeners.apply(this, args);
        },
        removeEventListeners: function removeEventListeners(...args) {
            return this.dropzone.removeEventListeners.apply(this, args);
        },
        disable: function disable(...args) {
            return this.dropzone.disable.apply(this, args);
        },
        enable: function enable(...args) {
            return this.dropzone.enable.apply(this, args);
        },
        filesize: function filesize(...args) {
            return this.dropzone.filesize.apply(this, args);
        },
        drop: function drop(...args) {
            return this.dropzone.drop.apply(this, args);
        },
        paste: function paste(...args) {
            return this.dropzone.paste.apply(this, args);
        },
        handleFiles: function handleFiles(...args) {
            return this.dropzone.handleFiles.apply(this, args);
        },
        accept: function accept(...args) {
            return this.dropzone.accept.apply(this, args);
        },
        addFile: function addFile(...args) {
            return this.dropzone.addFile.apply(this, args);
        },
        enqueueFiles: function enqueueFiles(...args) {
            return this.dropzone.enqueueFiles.apply(this, args);
        },
        enqueueFile: function enqueueFile(...args) {
            return this.dropzone.enqueueFile.apply(this, args);
        },
        removeFile: function removeFile(...args) {
            return this.dropzone.removeFile.apply(this, args);
        },
        removeAllFiles: function removeAllFiles(...args) {
            return this.dropzone.removeAllFiles.apply(this, args);
        },
        resizeImage: function resizeImage(...args) {
            return this.dropzone.resizeImage.apply(this, args);
        },
        createThumbnail: function createThumbnail(...args) {
            return this.dropzone.createThumbnail.apply(this, args);
        },
        createThumbnailFromUrl: function createThumbnailFromUrl(...args) {
            return this.dropzone.createThumbnailFromUrl.apply(this, args);
        },
        processQueue: function processQueue(...args) {
            return this.dropzone.processQueue.apply(this, args);
        },
        processFile: function processFile(...args) {
            return this.dropzone.processFile.apply(this, args);
        },
        processFiles: function processFiles(...args) {
            return this.dropzone.processFiles.apply(this, args);
        },
        cancelUpload: function cancelUpload(...args) {
            return this.dropzone.cancelUpload.apply(this, args);
        },
        resolveOption: function resolveOption(...args) {
            return this.dropzone.resolveOption.apply(this, args);
        },
        uploadFile: function uploadFile(...args) {
            return this.dropzone.uploadFile.apply(this, args);
        },
        uploadFiles: function uploadFiles(...args) {
            return this.dropzone.uploadFiles.apply(this, args);
        },
        submitRequest: function submitRequest(...args) {
            return this.dropzone.submitRequest.apply(this, args);
        },
        Emitter: function Emitter(...args) {
            return this.dropzone.Emitter.apply(this, args);
        },
        on: function on(...args) {
            return this.dropzone.on.apply(this, args);
        },
        emit: function emit(...args) {
            return this.dropzone.emit.apply(this, args);
        },
        off: function off(...args) {
            return this.dropzone.off.apply(this, args);
        },
    },
    computed: {
        element: {
            cache: false,
            get: function element() {
                return this.dropzone.element;
            },
        },
        version: {
            cache: false,
            get: function version() {
                return this.dropzone.version;
            },
        },
        clickableElements: {
            cache: false,
            get: function clickableElements() {
                return this.dropzone.clickableElements;
            },
        },
        listeners: {
            cache: false,
            get: function listeners() {
                return this.dropzone.listeners;
            },
        },
        files: {
            cache: false,
            get: function files() {
                return this.dropzone.files;
            },
        },
        options: {
            cache: false,
            get: function options() {
                return this.dropzone.options;
            },
        },
        previewsContainer: {
            cache: false,
            get: function previewsContainer() {
                return this.dropzone.previewsContainer;
            },
        },
        hiddenFileInput: {
            cache: false,
            get: function hiddenFileInput() {
                return this.dropzone.hiddenFileInput;
            },
        },
        events: {
            cache: false,
            get: function events() {
                return this.dropzone.events;
            },
        },
        defaultOptions: {
            cache: false,
            get: function defaultOptions() {
                return this.dropzone.defaultOptions;
            },
        },
    },
};
