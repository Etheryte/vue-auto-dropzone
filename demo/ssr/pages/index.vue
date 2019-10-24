<template>
  <vue-auto-dropzone :options="options" />
</template>

<script>
import VueAutoDropzone from 'vue-auto-dropzone';

export default {
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
};
</script>
