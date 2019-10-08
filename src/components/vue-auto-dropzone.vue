<template>
    <!-- TODO: id? -->
    <div :class="{ 'dropzone': true }">
        <div v-if="false && useCustomSlot" class="dz-message">
            <slot>Drop files here to upload</slot>
        </div>
    </div>
</template>
<script lang="ts">
// TODO: SSR
import GeneratedComponent from './generated';

export default GeneratedComponent;
</script>
<style lang="scss">
// TODO: Only if includeStyles?
@import url(https://rawgit.com/enyo/dropzone/master/dist/dropzone.css);
</style>
