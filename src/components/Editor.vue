<template>
  <div>
    <div ref="konvaContainer"></div>
  </div>
  <div class="bottom-6 fixed flex w-full justify-center"> 
    <button @click="setSelectedShape('rect')" :class="{'bg-slate-700': selectedShape === 'rect'}" class="bg-slate-500 text-white pl-8 pr-6 py-4 rounded-l-full shadow" title="Add square">
      <span class="w-7 h-7 border-2 block hover:border-slate-300 rounded"></span>
    </button>
    <button @click="setSelectedShape('circle')" :class="{'bg-slate-700': selectedShape === 'circle'}" class="bg-slate-500 text-white pr-8 pl-6 py-4 rounded-r-full shadow" title="Add cicle">
      <span class="w-7 h-7 border-2 block rounded-full hover:border-slate-300"></span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import useStage from '../composables/useStage';
import useCircle from '../composables/useCircle';
import useRect from '../composables/useRect';
import { onMounted, ref, watch } from 'vue';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';

export default defineComponent({
  setup() {
    const { getLayer, getStage, konvaContainer } = useStage();
    const selectedShape = ref('');
    let layer: Layer;
    let stage: Stage;

    onMounted(() => {
      layer = getLayer();
      stage = getStage();
    });

    const setSelectedShape = (shape: string) => {
      selectedShape.value = shape;
    }

    watch(selectedShape, (shape: string) => {
      if (shape === 'rect') {
        useRect(stage, layer);
      } else if (shape === 'circle') {
        useCircle(stage, layer);
      }

      if (shape !== '') {
        stage.on('shape-done', () => {
          setSelectedShape('');
        });
      }
    });

    return {
      konvaContainer,
      selectedShape,
      setSelectedShape
    }
  },
});
</script>
