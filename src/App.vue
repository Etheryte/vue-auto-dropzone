<template>
  <div id="app">
    <vue-auto-dropzone :options="options" v-on:addedfile="log" v-on:uploadprogress="log" />
    <vue-auto-dropzone :options="options">
        <p>Custom message</p>
    </vue-auto-dropzone>
    <vue-auto-dropzone :options="options" :includeStyling="false">
        <p>No styling</p>
    </vue-auto-dropzone>
    <vue-auto-dropzone :options="options" :includeStyling="false" class="custom">
        <p>Custom styling</p>
    </vue-auto-dropzone>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VueAutoDropzone from '@/component/VueAutoDropzone.vue';

@Component({
    components: {
        VueAutoDropzone,
    },
})
export default class App extends Vue {
    $refs!: {
        dz: VueAutoDropzone,
    };

    mounted() {
        // const foo = this.$refs.dz.
    }

    options = {
        url: 'https://httpbin.org/anything',
    };

    log(...args) {
        console.log.apply(console, args as any);
    }
}
</script>
<style lang="scss" scoped>
.custom {
    padding: 10px;
    background-color: sienna;
    cursor: pointer;

    p {
        pointer-events: none;
    }
}
</style>
