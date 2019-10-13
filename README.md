# vue-auto-dropzone

A [Dropzone.js](https://www.dropzonejs.com) component for Vue.  
Full library coverage, improved Typescript support, slots, and more.

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
            const instance = this.$refs.dz;
        }
    });
</script>
```

## Props

| Name | Type | Default | Description | Required |
| --- | --- | --- | --- | --- |
| options | `Object` | `undefined` | an object containing [Dropzone configuration options](https://www.dropzonejs.com/#configuration-options) | `true` | the `url` field is mandatory |
| includeStyling | `Boolean` | `true` | whether to include default Dropzone styles on the component | `false` |
| destroyDropzone | `Boolean` | `true` |  whether to destroy the Dropzone instance on component destruction | `false` |


## Methods

All [Dropzone methods](https://www.dropzonejs.com/#dropzone-methods) are exposed on the component instance.

```ts
mounted() {
    const instance = this.$refs.dz;
    instance.disable();
}
```

### Method list
___TODO:___ Generate automatically

## Events

All [Dropzone events](https://www.dropzonejs.com/#event-list) are emitted on the component.

```html
<vue-auto-dropzone
    ref="dz"
    :options="options"
    @drop="onDrop"
    @success="onSuccess"
/>
```

### Event list

___TODO:___ Generate automatically

## Slots

To override the default content template, use a [slot](https://vuejs.org/v2/guide/components-slots.html).  

```html
<vue-auto-dropzone :options="options">
    <p>Default styles are still applied here</p>
</vue-auto-dropzone>
```

To omit default styling on the slot, also specify `:include-styling="false"`.
```html
<vue-auto-dropzone :options="options" :include-styling="false">
    <p>No styles are applied here</p>
</vue-auto-dropzone>
```
