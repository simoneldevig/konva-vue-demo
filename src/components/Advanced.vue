<template>
  <div>
    <div ref="konvaContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import useStage from '../composables/useStage';
import useRect from '../composables/useRect';
import { onMounted } from 'vue';

export default defineComponent({
  setup() {
    const { getLayer, getStage, konvaContainer } = useStage();

    onMounted(() => {
      const layer = getLayer();
      const stage = getStage();
      useRect(stage, layer);

      stage.on('shape-done', () => {
        useRect(stage, layer);
      });
    });

    return {
      konvaContainer
    }
  },
});
</script>
