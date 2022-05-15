import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { onMounted, reactive, ref } from "vue";

export default () => {
  const layer = new Layer();  
  let stage: Stage;
  const konvaContainer = ref<HTMLDivElement>();

  onMounted(() => {
    stage = new Stage({
      container: document.createElement('div'),
      width: 1000,
      height: 1000,
      draggable: true,
    });

    const fitStageIntoParentContainer = () => {
      stage.width(window.innerWidth);
      stage.height(window.innerHeight - 80);
    };

    // Init and resize stage
    if (konvaContainer.value) {
      stage.container(konvaContainer.value);
      fitStageIntoParentContainer();
    }

    window.addEventListener('resize', fitStageIntoParentContainer);

    stage.add(layer);

    layer.draw();
  });

  const getStage = () => {
    return stage;
  }

  const getLayer = () => {
    return layer;
  }

  return {
    getStage,
    getLayer,
    konvaContainer
  };
}
