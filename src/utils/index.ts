import { Stage } from "konva/lib/Stage";
import { Position } from "../types";

export function getMousePos(stage: Stage): Position {
  const pointerPosition = stage.getPointerPosition();
  const stageAttrs = stage.attrs;
  let x = 0;
  let y = 0;

  if (pointerPosition) {
    if (stageAttrs.scaleX) {
      x = (pointerPosition.x - stageAttrs.x) / stageAttrs.scaleX;
      y = (pointerPosition.y - stageAttrs.y) / stageAttrs.scaleY;
    } else {
      x = pointerPosition.x,
      y = pointerPosition.y;
    }
  }

  return {
    x,
    y
  };
}
