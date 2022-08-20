<template>
  <div id="webviewer" ref="viewer"></div>
</template>

<script>
import { ref, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";
export default {
  name: "WebViewer",
  props: { initialDoc: { type: String } },
  setup(props) {
    const viewer = ref(null);
    onMounted(() => {
      const path = `${process.env.publicPath}/webViewer`;
      WebViewer({ path, initialDoc: props.initialDoc }, viewer.value).then(
        (instance) => {
          instance.UI.disableElements(["ribbons"]);
          instance.UI.disableElements(["toolsHeader"]);
          instance.UI.setLanguage("es");
          const { documentViewer } = instance.Core;
          documentViewer.addEventListener("documentLoaded", () => {
            // perform document operations
          });
        }
      );
    });
    return {
      viewer,
    };
  },
};
</script>

<style>
#webviewer {
  height: 600px;
}
</style>
