<template>
  <div>
    <div ref="konvaContainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import useStage from '../composables/useStage';
import { Rect } from 'konva/lib/shapes/Rect';
import { Transformer } from 'konva/lib/shapes/Transformer';
import Konva from 'konva';
import { onMounted } from 'vue';

export default defineComponent({
  setup() {
    const { getLayer, getStage, konvaContainer } = useStage();
    onMounted(() => {
      const layer = getLayer();
      const stage = getStage();
      let transformer: Transformer | undefined;
  
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

      rect.on('click touchstart', () => {
        if (transformer) {
          transformer.destroy();
          transformer = undefined;
        } else {
          transformer = new Konva.Transformer(); 
          layer.add(transformer);
          transformer.nodes([rect]);
        }
      });

      // add the shape to the layer
      layer.add(rect);
    });

    return {
      konvaContainer
    }
  },
});
</script>
