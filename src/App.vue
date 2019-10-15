<template>
  <div id="app">
    <section>
        <h2>Slots</h2>
        <vue-auto-dropzone ref="dz" :options="options" v-slot="{ files, uploadingFiles, acceptedFiles, rejectedFiles, urls }">
            <div>
                <p>{{files.length}} files in total</p>
                <p>{{uploadingFiles.length}} uploading</p>
                <p>{{acceptedFiles.length}} accepted</p>
                <p>{{rejectedFiles.length}} rejected</p>
            </div>
            <div v-for="file in files" :key="file.upload.uuid">
                <p>{{file.name}}</p>
                <img v-if="file.dataURL" :src="file.dataURL" :alt="file.name" />
                <span v-else>Loading...</span>
            </div>
        </vue-auto-dropzone>
    </section>
    <section>
        <h2>Default</h2>
        <vue-auto-dropzone :options="options" />
    </section>
    <section>
        <h2>No styling</h2>
        <vue-auto-dropzone :options="options" :includeStyling="false" />
    </section>
    <section>
        <h2>Custom styling</h2>
        <vue-auto-dropzone :options="options" :includeStyling="false" class="custom" />
    </section>
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
        console.log(this.$refs.dz);
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
    padding: 20px;
    background-color: cornflowerblue;
    color: white;
    font-family: sans-serif;
}

img {
    max-height: 100px;
    max-width: 100px;
}
</style>
