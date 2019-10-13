<template>
  <div id="app">
    <vue-auto-dropzone ref="dz" :options="options">
        <template v-slot:files="{ files }">
            foobar <pre>{{files.length}}</pre>
        </template>
    </vue-auto-dropzone>

    <hr />
    <vue-auto-dropzone :options="options" />
    <section>
        <h2>No styling</h2>
        <vue-auto-dropzone :options="options" :includeStyling="false" />
    </section>
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
        console.log(this.$refs.dz, this.$refs.dz.$slots, this.$refs.dz.$scopedSlots);
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
