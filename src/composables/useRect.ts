import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Rect } from 'konva/lib/shapes/Rect';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { Stage } from 'konva/lib/Stage';
import { ref, watch } from 'vue';
import { Position } from '../types';
import { getMousePos } from '../utils';

export default (stage: Stage, layer: Layer): Rect => {
  const isFinished = ref(true);  
  let startingPoint: Position = { x: 0, y: 0 };
  let transformer: Transformer | undefined;

  const rect = new Rect({
    fill: '#0c74b5',
    stroke: '#000',
    strokeWidth: 2,
    hitStrokeWidth: 4,
    perfectDrawEnabled: false,
    draggable: true
  });

  stage.on('reset-transformers', () => {
    if (transformer) {
      transformer.destroy();
      transformer = undefined;
    }
  });

  watch(isFinished, (value) => {
    if (value) {
      rect.on('click touchstart', () => {
        if (transformer) {
          transformer.destroy();
          transformer = undefined;
        } else {
          stage.fire('reset-transformers');
          transformer = new Konva.Transformer(); 
          layer.add(transformer);
          transformer.nodes([rect]);
        }
      });

      // Remove create EventListeners
      stage.off('mousedown touchstart');
      stage.off('mousemove touchmove');
      stage.off('mouseup touchend');

      // Emit done-event
      stage.fire('shape-done');
    }
  });

  stage.on('mousedown touchstart', (e) => {
    const emptySpace = e.target === e.target.getStage();
    if (e.evt.button !== 2 && emptySpace) {
      const mousePos = getMousePos(stage);
      startingPoint = mousePos;
      rect.x(mousePos.x);
      rect.y(mousePos.y);
      isFinished.value = false;
    }
  });

  stage.on('mousemove touchmove', () => {
    if (!isFinished.value) {
      const sx = startingPoint.x;
      const sy = startingPoint.y;
      const { x, y } = getMousePos(stage);
      rect.x(sx);
      rect.y(sy);
      rect.width(x - sx);
      rect.height(y - sy);
    }
  });

  stage.on('mouseup touchend', () => {
    const { width, height } = rect.size();

    if (width !== 0 && height !== 0) {
      isFinished.value = true;
    } 
  });

  layer.add(rect);

  return rect;
};
