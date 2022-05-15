<template>
  <div>
    <div ref="konvaContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import useStage from '../composables/useStage';
import { Rect } from "konva/lib/shapes/Rect";
import { onMounted } from 'vue';

export default defineComponent({
  setup() {
    const { getLayer, getStage, konvaContainer } = useStage();
    onMounted(() => {
      const layer = getLayer();
      const stage = getStage();
  
      const rect = new Rect({
        x: stage.width() / 2 - 200,
        y: stage.height() / 2 - 200,
        width: 400,
        height: 200,
        fill: '#0c74b5',
        stroke: '#000',
        strokeWidth: 2,
        perfectDrawEnabled: false
      });
  
      // add the shape to the layer
      layer.add(circle);
    });

    return {
      konvaContainer
    }
  },
});
</script>
