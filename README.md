# vue-auto-dropzone

A [Dropzone.js](https://www.dropzonejs.com) component for Vue.  
Typescript support, native slots, and more.

## Installation
```sh
yarn install vue-auto-dropzone
```

## Basic usage
```html
<template>
    <vue-auto-dropzone ref="dz" :options="options" />
</template>
<script lang="ts">
    import Vue from 'vue';

    import VueAutoDropzone from 'vue-auto-dropzone';

    export default Vue.extend({
        components: {
            VueAutoDropzone,
        },
        data() {
            return {
                options: {
                    url: 'https://httpbin.org/anything',
                },
            };
        },
        mounted() {
            // The Dropzone instance is available after mounting
            const dz = this.$refs.dz;
        }
    });
</script>
```

## Slots

All content is configurable by [slots](https://vuejs.org/v2/guide/components-slots.html).  
Slots receive the instance itself as their [scope](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots), meaning all relevant fields are directly accessible.  
To omit default styling on the slot, also specify `:include-styling="false"`.  

```html
<vue-auto-dropzone :options="options" :include-styling="false" v-slot="{ files, removeFile }">
    <p v-if="!files.length">Give me fuel, give me files</p>

    <figure v-for="file in files" :key="file.upload.uuid" @click="removeFile(file)">
        <img v-if="file.dataURL" :src="file.dataURL" :alt="file.name" />
        <figcaption>
            {{file.name}}
            <span v-if="file.upload.progress !== 100">{{ file.upload.progress.toFixed(0) }}%</span>
        </figcaption>
    </figure>
</vue-auto-dropzone>
```

## Props

| Name | Type | Default | Description | Required |
| --- | --- | --- | --- | --- |
| `options` | `Object` | `undefined` | an object containing [Dropzone configuration options](https://www.dropzonejs.com/#configuration-options) | `true` | the `url` field is mandatory |
| `includeStyling` | `Boolean` | `true` | whether to include default Dropzone styles on the component | `false` |
| `destroyDropzone` | `Boolean` | `true` | whether to destroy the Dropzone instance on component unmount | `false` |


## Events

All [Dropzone events](https://www.dropzonejs.com/#event-list) are emitted on the component with identical names and parameters.  
Use [standard Vue event handling](https://vuejs.org/v2/guide/events.html) to listen for events and respond to them.

```html
<vue-auto-dropzone
    :options="options"
    @drop="onDrop"
    @success="onSuccess"
/>
```

## Properties

Properties are exposed directly on the component.

```ts
mounted() {
    const dz = this.$refs.dz;
    const files = dz.files;
}
```

### Property list

| Name | Description |
| --- | --- |
| `files` | Array of all files |
| `acceptedFiles` | Array of all accepted files |
| `rejectedFiles` | Array of all rejected files |
| `queuedFiles` | Array of all files queued for upload |
| `uploadingFiles` | Array of all files currently uploading |
| `addedFiles` | Array of all added files |
| `activeFiles` | Array of all queued or currently uploading files |
| `defaultOptions` | Object containing default [Dropzone configuration values](https://www.dropzonejs.com/#configuration-options) |
| `events` | Array of all event names the instance supports |
| `hiddenFileInput` | A reference to the [input element used by Dropzone](https://www.dropzonejs.com/#config-hiddenInputContainer) |
| `listeners` | Array of all elements with relevant listeners used by Dropzone |
| `version` | Bundled Dropzone version |

## Methods

Methods are exposed directly on the component.  
The instance is available once the component is [mounted](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram).

```ts
mounted() {
    const dz = this.$refs.dz;
    // Manually add a file
    dz.addFile('data:image/png;...', 'image.png');
}
```

### Method list

| Method | Description |
| --- | --- |
| `getOptions()` | Get all currently set [Dropzone configuration values](https://www.dropzonejs.com/#configuration-options) |
| `setOptions(value: Partial<IDropzoneOptions>)` | Set multiple configuration options at a time |
| `getOption(key: keyof IDropzoneOptions)` | Get the value of a single configuration option by key |
| `setOption(key: keyof IDropzoneOptions, value: any)` | Set a single configuration option |
| `addFile(file: File \| string, fileName?: string, mimeType?: string)` | Manually add a new file without triggering upload hooks. Input is either a `File` or a data string (`"data:image/..."`) with a file name and optional mime type |
| `addAndUploadFile(file: File \| string, fileName?: string, mimeType?: string)` | Manually add a new file and trigger all regular upload hooks. Input is either a `File` or a data string (`"data:image/..."`) with a file name and optional mime type |
| `removeFile(file: File)` | Remove the given file |
| `removeAllFiles(includeUploading = false)` | Remove all currently not uploading files, call `removeAllFiles(true)` to also remove actively uploading files |
| `processQueue()` | Process the upload queue when [`autoProcessQueue` is disabled](https://www.dropzonejs.com/#config-autoProcessQueue) |
| `disable()` | Disable the instance, also removes event listeners etc |
| `enable()` | Reenable the instance |
| `createThumbnailFromUrl(file: File, sourceUrl: string, callback?: () => any, crossOrigin?: boolean)` | Create a thumbnail to [display files already stored on the server](https://github.com/enyo/dropzone/wiki/FAQ#how-to-show-files-already-stored-on-server) |
| `setParams()` | Override [the `params()` function](https://www.dropzonejs.com/#config-params) |
| `setAccept()` | Override [the `accept()` function](https://www.dropzonejs.com/#config-accept) |
| `setChunksUploaded()` | Override [the `chunksUploaded()` function](https://www.dropzonejs.com/#config-chunksUploaded) |
| `setFallback()` | Override [the `fallback()` function](https://www.dropzonejs.com/#config-fallback) |
| `setResize()` | Override [the `resize()` function](https://www.dropzonejs.com/#config-resize) |
| `setTransformFile()` | Override [the `transformFile()` function](https://www.dropzonejs.com/#config-transformFile) |

Additional methods on the instance expose the internal Dropzone instance, but those are officially unsupported as they may change with a new Dropzone release.  
All exposed internals come with corresponding setters similar to those shown above.

## Contributing

Currently, this repo is iterating reasonably fast and the style is subject to change over time.  
Pull requests are discouraged, but issue reports and feature requests are very welcome.  