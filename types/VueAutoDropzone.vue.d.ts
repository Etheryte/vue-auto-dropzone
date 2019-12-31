import { Vue } from 'vue-property-decorator';
import Dropzone, { DropzoneOptions, DropzoneFile } from 'dropzone';
export interface IDropzoneOptions extends DropzoneOptions {
    url: string;
}
export interface IDropzoneInstance extends Dropzone {
    options: IDropzoneOptions;
    events: string[];
}
export interface IUpload {
    uuid: string;
    /** File upload progress, number `0..100` */
    progress: number;
    total: number;
    bytesSent: number;
    fileName: string;
    chunked: boolean;
    totalChunkCount: number;
}
export interface IDropzoneFile extends DropzoneFile {
    dataURL?: string;
    upload: IUpload;
}
declare type FileOrDataString = Dropzone.DropzoneFile | File | string;
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
declare type UntypedKeys = Exclude<keyof TypeHints, keyof IDropzoneInstance>;
declare type UntypedFields = Pick<TypeHints, UntypedKeys>;
export declare type CombinedInstance = IDropzoneInstance & UntypedFields;
export default class VueAutoDropzone extends Vue {
    private instance;
    files: IDropzoneFile[];
    defaultMessage: string;
    options: IDropzoneOptions;
    includeStyling: Boolean;
    destroyDropzone: Boolean;
    private hasBeenMounted;
    mounted(): void;
    beforeDestroy(): void;
    readonly hasDefaultSlot: boolean;
    readonly slotScope: this;
    /** Array of all accepted files */
    readonly acceptedFiles: IDropzoneFile[];
    /** Array of all rejected files */
    readonly rejectedFiles: IDropzoneFile[];
    /** Array of all files queued for upload */
    readonly queuedFiles: IDropzoneFile[];
    /** Array of all files currently uploading */
    readonly uploadingFiles: IDropzoneFile[];
    /** Array of all added files */
    readonly addedFiles: IDropzoneFile[];
    /** Array of all queued or currently uploading files */
    readonly activeFiles: IDropzoneFile[];
    /** Manually add a new file, input is either a `File` or a data string (`"data:image/..."`) with a file name and optional mime type */
    addFile<T extends FileOrDataString>(fileOrDataString: T, fileName?: T extends string ? string : never, mimeType?: T extends string ? string : never): Promise<void>;
    /** Manually add and upload a new file, input is either a `File` or a data string (`"data:image/..."`) with a file name and optional mime type */
    addAndUploadFile<T extends FileOrDataString>(fileOrDataString: T, fileName?: T extends string ? string : never, mimeType?: T extends string ? string : never): Promise<void>;
    private processManualInputFile;
    /** Get all Dropzone options */
    getOptions(): IDropzoneOptions;
    /** Overwrite multiple Dropzone options at once via `Object.assign()` */
    setOptions(value: Partial<IDropzoneOptions>): void;
    /** Get a single Dropzone option by key */
    getOption(key: keyof IDropzoneOptions): string | number | boolean | {} | HTMLElement | (string | HTMLElement)[] | ((name: string) => string) | Dropzone.DropzoneDictFileSizeUnits | ((file: Dropzone.DropzoneFile, done: (error?: string | Error | undefined) => void) => void) | ((file: Dropzone.DropzoneFile, done: (error?: string | Error | undefined) => void) => void) | ((this: Dropzone) => void) | (() => void) | ((file: Dropzone.DropzoneFile, width?: number | undefined, height?: number | undefined, resizeMethod?: string | undefined) => Dropzone.DropzoneResizeInfo) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | ((e: DragEvent) => void) | (() => void) | ((file: Dropzone.DropzoneFile) => void) | ((files: Dropzone.DropzoneFile[]) => void) | ((file: Dropzone.DropzoneFile) => void) | ((file: Dropzone.DropzoneFile, dataUrl: string) => void) | ((file: Dropzone.DropzoneFile, message: string | Error, xhr: XMLHttpRequest) => void) | ((files: Dropzone.DropzoneFile[], message: string | Error, xhr: XMLHttpRequest) => void) | ((file: Dropzone.DropzoneFile) => void) | ((files: Dropzone.DropzoneFile[]) => void) | ((file: Dropzone.DropzoneFile, progress: number, bytesSent: number) => void) | ((totalProgress: number, totalBytes: number, totalBytesSent: number) => void) | ((file: Dropzone.DropzoneFile, xhr: XMLHttpRequest, formData: FormData) => void) | ((files: Dropzone.DropzoneFile[], xhr: XMLHttpRequest, formData: FormData) => void) | ((file: Dropzone.DropzoneFile, response: string | Object) => void) | ((files: Dropzone.DropzoneFile[], responseText: string) => void) | ((file: Dropzone.DropzoneFile) => void) | ((file: Dropzone.DropzoneFile[]) => void) | ((file: Dropzone.DropzoneFile) => void) | ((file: Dropzone.DropzoneFile[]) => void) | ((file: Dropzone.DropzoneFile) => void) | ((files: Dropzone.DropzoneFile[]) => void) | (() => void) | ((file: Dropzone.DropzoneFile, done: (file: string | Blob) => void) => void) | undefined;
    /** Set a single Dropzone option */
    setOption<T extends keyof IDropzoneOptions>(key: T, value: IDropzoneOptions[T]): void;
    accept(...args: Parameters<CombinedInstance['accept']>): void;
    /** Overwrite Dropzone's internal `accept()` method */
    setAccept(value: CombinedInstance['accept']): void;
    cancelUpload(...args: Parameters<CombinedInstance['cancelUpload']>): void;
    /** Overwrite Dropzone's internal `cancelUpload()` method */
    setCancelUpload(value: CombinedInstance['cancelUpload']): void;
    createThumbnail(...args: Parameters<CombinedInstance['createThumbnail']>): any;
    /** Overwrite Dropzone's internal `createThumbnail()` method */
    setCreateThumbnail(value: CombinedInstance['createThumbnail']): void;
    createThumbnailFromUrl(...args: Parameters<CombinedInstance['createThumbnailFromUrl']>): any;
    /** Overwrite Dropzone's internal `createThumbnailFromUrl()` method */
    setCreateThumbnailFromUrl(value: CombinedInstance['createThumbnailFromUrl']): void;
    destroy(...args: Parameters<CombinedInstance['destroy']>): Dropzone;
    /** Overwrite Dropzone's internal `destroy()` method */
    setDestroy(value: CombinedInstance['destroy']): void;
    disable(...args: Parameters<CombinedInstance['disable']>): void;
    /** Overwrite Dropzone's internal `disable()` method */
    setDisable(value: CombinedInstance['disable']): void;
    drop(...args: Parameters<CombinedInstance['drop']>): any;
    /** Overwrite Dropzone's internal `drop()` method */
    setDrop(value: CombinedInstance['drop']): void;
    emit(...args: Parameters<CombinedInstance['emit']>): Dropzone;
    /** Overwrite Dropzone's internal `emit()` method */
    setEmit(value: CombinedInstance['emit']): void;
    enable(...args: Parameters<CombinedInstance['enable']>): void;
    /** Overwrite Dropzone's internal `enable()` method */
    setEnable(value: CombinedInstance['enable']): void;
    enqueueFile(...args: Parameters<CombinedInstance['enqueueFile']>): void;
    /** Overwrite Dropzone's internal `enqueueFile()` method */
    setEnqueueFile(value: CombinedInstance['enqueueFile']): void;
    enqueueFiles(...args: Parameters<CombinedInstance['enqueueFiles']>): void;
    /** Overwrite Dropzone's internal `enqueueFiles()` method */
    setEnqueueFiles(value: CombinedInstance['enqueueFiles']): void;
    filesize(...args: Parameters<CombinedInstance['filesize']>): any;
    /** Overwrite Dropzone's internal `filesize()` method */
    setFilesize(value: CombinedInstance['filesize']): void;
    getExistingFallback(...args: Parameters<CombinedInstance['getExistingFallback']>): any;
    /** Overwrite Dropzone's internal `getExistingFallback()` method */
    setGetExistingFallback(value: CombinedInstance['getExistingFallback']): void;
    getFallbackForm(...args: Parameters<CombinedInstance['getFallbackForm']>): any;
    /** Overwrite Dropzone's internal `getFallbackForm()` method */
    setGetFallbackForm(value: CombinedInstance['getFallbackForm']): void;
    getFilesWithStatus(...args: Parameters<CombinedInstance['getFilesWithStatus']>): Dropzone.DropzoneFile[];
    /** Overwrite Dropzone's internal `getFilesWithStatus()` method */
    setGetFilesWithStatus(value: CombinedInstance['getFilesWithStatus']): void;
    handleFiles(...args: Parameters<CombinedInstance['handleFiles']>): any;
    /** Overwrite Dropzone's internal `handleFiles()` method */
    setHandleFiles(value: CombinedInstance['handleFiles']): void;
    off(...args: Parameters<CombinedInstance['off']>): Dropzone;
    /** Overwrite Dropzone's internal `off()` method */
    setOff(value: CombinedInstance['off']): void;
    on(...args: Parameters<CombinedInstance['on']>): Dropzone;
    /** Overwrite Dropzone's internal `on()` method */
    setOn(value: CombinedInstance['on']): void;
    paste(...args: Parameters<CombinedInstance['paste']>): any;
    /** Overwrite Dropzone's internal `paste()` method */
    setPaste(value: CombinedInstance['paste']): void;
    processFile(...args: Parameters<CombinedInstance['processFile']>): void;
    /** Overwrite Dropzone's internal `processFile()` method */
    setProcessFile(value: CombinedInstance['processFile']): void;
    processFiles(...args: Parameters<CombinedInstance['processFiles']>): void;
    /** Overwrite Dropzone's internal `processFiles()` method */
    setProcessFiles(value: CombinedInstance['processFiles']): void;
    processQueue(...args: Parameters<CombinedInstance['processQueue']>): void;
    /** Overwrite Dropzone's internal `processQueue()` method */
    setProcessQueue(value: CombinedInstance['processQueue']): void;
    removeAllFiles(...args: Parameters<CombinedInstance['removeAllFiles']>): void;
    /** Overwrite Dropzone's internal `removeAllFiles()` method */
    setRemoveAllFiles(value: CombinedInstance['removeAllFiles']): void;
    removeEventListeners(...args: Parameters<CombinedInstance['removeEventListeners']>): any;
    /** Overwrite Dropzone's internal `removeEventListeners()` method */
    setRemoveEventListeners(value: CombinedInstance['removeEventListeners']): void;
    removeFile(...args: Parameters<CombinedInstance['removeFile']>): void;
    /** Overwrite Dropzone's internal `removeFile()` method */
    setRemoveFile(value: CombinedInstance['removeFile']): void;
    resizeImage(...args: Parameters<CombinedInstance['resizeImage']>): void;
    /** Overwrite Dropzone's internal `resizeImage()` method */
    setResizeImage(value: CombinedInstance['resizeImage']): void;
    resolveOption(...args: Parameters<CombinedInstance['resolveOption']>): any;
    /** Overwrite Dropzone's internal `resolveOption()` method */
    setResolveOption(value: CombinedInstance['resolveOption']): void;
    setupEventListeners(...args: Parameters<CombinedInstance['setupEventListeners']>): any;
    /** Overwrite Dropzone's internal `setupEventListeners()` method */
    setSetupEventListeners(value: CombinedInstance['setupEventListeners']): void;
    submitRequest(...args: Parameters<CombinedInstance['submitRequest']>): any;
    /** Overwrite Dropzone's internal `submitRequest()` method */
    setSubmitRequest(value: CombinedInstance['submitRequest']): void;
    updateTotalUploadProgress(...args: Parameters<CombinedInstance['updateTotalUploadProgress']>): any;
    /** Overwrite Dropzone's internal `updateTotalUploadProgress()` method */
    setUpdateTotalUploadProgress(value: CombinedInstance['updateTotalUploadProgress']): void;
    uploadFile(...args: Parameters<CombinedInstance['uploadFile']>): void;
    /** Overwrite Dropzone's internal `uploadFile()` method */
    setUploadFile(value: CombinedInstance['uploadFile']): void;
    uploadFiles(...args: Parameters<CombinedInstance['uploadFiles']>): void;
    /** Overwrite Dropzone's internal `uploadFiles()` method */
    setUploadFiles(value: CombinedInstance['uploadFiles']): void;
    readonly defaultOptions: Dropzone.DropzoneOptions;
    readonly events: string[];
    readonly hiddenFileInput: object;
    readonly listeners: any[];
    readonly version: string;
}
export {};
