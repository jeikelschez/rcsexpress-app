<template>
  <div id="webviewer" ref="viewer"></div>
</template>

<script>
import { ref, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";
export default {
  name: "WebViewer",
  data: function() {
      return {
      }
  },
  setup() {
    const viewer = ref(null);
    return {
      viewer,
    };
  },
  methods: {
    showpdf(pdf) {
      const path = `${process.env.publicPath}/webViewer`;
      WebViewer({ path }, this.viewer).then((instance) => {
        instance.UI.disableElements(["ribbons"]);
        instance.UI.disableElements(["toolsHeader"]);
        instance.UI.setLanguage("es");
        let base64 = pdf
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; ++i) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        let base64String = new Blob([bytes], { type: "application/pdf" });
        instance.UI.loadDocument(base64String, {
          filename: "myfile.pdf",
        });
        const { documentViewer } = instance.Core;
        documentViewer.addEventListener("documentLoaded", () => {
          // perform document operations
        });
      });
    },
  },
};
</script>

<style>
#webviewer {
  height: 600px;
}
</style>
