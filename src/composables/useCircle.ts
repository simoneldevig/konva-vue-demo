import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Circle } from 'konva/lib/shapes/Circle';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { Stage } from 'konva/lib/Stage';
import { ref, watch } from 'vue';
import { Position } from '../types';
import { getMousePos } from '../utils';

export default (stage: Stage, layer: Layer): Circle => {
  const isFinished = ref(true);  
  let startingPoint: Position = { x: 0, y: 0 };
  let transformer: Transformer | undefined;

  const circle = new Circle({
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
      circle.on('click touchstart', () => {
        if (transformer) {
          transformer.destroy();
          transformer = undefined;
        } else {
          stage.fire('reset-transformers');
          transformer = new Konva.Transformer(); 
          layer.add(transformer);
          transformer.nodes([circle]);
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
      circle.x(mousePos.x);
      circle.y(mousePos.y);
      isFinished.value = false;
    }
  });

  stage.on('mousemove touchmove', () => {
    if (!isFinished.value) {
      const sx = startingPoint.x;
      const sy = startingPoint.y;
      const { x, y } = getMousePos(stage);
      circle.x(sx);
      circle.y(sy);
      circle.width(Math.abs(x - sx));
      circle.height(Math.abs(y - sy));
    }
  });

  stage.on('mouseup touchend', () => {
    const { width, height } = circle.size();

    if (width !== 0 && height !== 0) {
      isFinished.value = true;
    } 
  });

  layer.add(circle);

  return circle;
};
