<template>
  <div id="app">
    <vue-auto-dropzone :options="options" v-on:addedfile="log" v-on:uploadprogress="log" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import VueAutoDropzone from '@/components/vue-auto-dropzone.vue';

@Component({
    components: {
        VueAutoDropzone,
    },
})
export default class App extends Vue {
    options = {
        url: 'https://httpbin.org/anything',
    };

    log(...args) {
        console.log.apply(console, args as any);
    }
}
</script>
