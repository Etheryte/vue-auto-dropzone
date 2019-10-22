<template>
  <div id="app">
      <button @click="isAlive=!isAlive">Toggle isAlive</button>
      <section>
        <h2>Slots</h2>
        <vue-auto-dropzone v-if="isAlive" ref="dz1" :options="options" v-slot="{ files, uploadingFiles, acceptedFiles, rejectedFiles, removeFile }" :include-styling="false">
            <div>
                <p>{{files.length}} files in total</p>
                <p>{{uploadingFiles.length}} uploading</p>
                <p>{{acceptedFiles.length}} accepted</p>
                <p>{{rejectedFiles.length}} rejected</p>
            </div>
            <p v-if="!files.length">Give me fuel, give me files</p>
            <figure v-for="file in files" :key="file.upload.uuid" @click="removeFile(file)">
                <img v-if="file.dataURL" :src="file.dataURL" :alt="file.name" />
                <figcaption>
                    {{file.name}}
                    <span v-if="file.upload.progress !== 100">{{ file.upload.progress.toFixed(0) }}%</span>
                </figcaption>
                <pre>{{file.dataURL}}</pre>
            </figure>
        </vue-auto-dropzone>
    </section>
    <section>
        <h2>Default</h2>
        <vue-auto-dropzone v-if="isAlive" ref="dz2" :options="options" />
    </section>
    <!--
    <section>
        <h2>No styling</h2>
        <vue-auto-dropzone v-if="isAlive" :options="options" :includeStyling="false" />
    </section>
    <section>
        <h2>Custom styling</h2>
        <vue-auto-dropzone v-if="isAlive" :options="options" :includeStyling="false" class="custom" />
    </section>
    -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VueAutoDropzone, { IDropzoneOptions } from '@/component/VueAutoDropzone.vue';

@Component({
    components: {
        VueAutoDropzone,
    },
})
export default class App extends Vue {
    $refs!: {
        dz1: VueAutoDropzone,
        dz2: VueAutoDropzone,
    };

    isAlive = true;

    async mounted() {
        console.log(this.$refs.dz1);
        const data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEXMzMyWlpacnJyqqqrFxcWxsbGjo6O3t7e+vr6He3KoAAAACXBIWXMAAA7EAAAOxAGVKw4bAAACmElEQVR4nO3av2/aQBQH8O8ZbDPahJCOtpO2jE6aSB0PiDIbhswgIZHRphJdSfqP994ZEpwAigClrfr9SLyLeY7f/bIXAxAREREREREREREREREREREREf0/6ldfNDBr5svwrJ9MsDGxB6cZt+CG8VkZXsRJqDcm9jBI3RN0LxrNMjwz3w7STYl9jDWaKHJcLmwAihRFBngtqKiSOEBiJkYqPWY2mPn7JN/BieAElcQBfsKMJAa6qQ1Ao+3KCvi5jGQ9cRD/RLreHdlgjsdFVCbMxFUShxi0zFigIhvM8WNYblg31NXEAWrNRbXDtXaZuOzgWCOpxxNUp94p92uvrXGsNfFOYPdxkdlgDorYbqVx+jqxv0KuVbkdkl4Ldju8TuzPdBOVG9s9deX6nlQ61h0fJ0lSeUT1zN2hZWWSJDrWsys0Kg/bQWanUJnvg2M9hYmIiIiIiIiIiIiIiIjoD1HLz79SJGxev69IYI7ktaa8mHcCOTT68RS4CydQkX3PvUVQ//b+Ija2F5gvi9Q/618m3A61eoA/3l4EPVydw9G++cNNUqhhIE0tGUiR4Tm83GTWipyNMF0WqWVlcFM1h1fsKuJO7rJa3sUP3N/eQE1sc38rHVMm1Yhws14k6DSiZRFHl6EeKWfxtH0BzXQ5uh410mH+HRemz0rb5gJdKWJSmJrP6vWzFJl7+bKIWoVA+aPp9iJm4W0Ho84okgvJ/0gTrNYkwFMtr4zEmeHtSPA12jESOUu6O3oYme7bK0mzNhJniEoR9xRv1wSDbGcRWRMM81mGue7LlaR5WRP4Z9Ui9sDGtd2FXTeVnGx2Fx51V8OPO3KqNC+7C360oUg5pf1wdZ/sLPIO3kf8mGD2ATVU5wOKEP09fgOLdXyF2B0MogAAAABJRU5ErkJggg==';
        this.$refs.dz1.addFile(data, 'foobar');
        // this.$refs.dz2.addFile(data, 'foobar');
    }

    options = {
        url: 'https://httpbin.org/anything',
        headers: {
            'X-CSRF-Token': 'foobar',
        },
        maxFiles: 2,
    } as IDropzoneOptions;

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
