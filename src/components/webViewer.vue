<template>
  <div id="webViewer" ref="viewer" style="width: 100%; max-width: 80vw; height: 700px"></div>
</template>

<script>
import { ref } from "vue";
import webViewer from "@pdftron/webviewer";
export default {
  name: "webViewer",
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
      webViewer({ path }, this.viewer).then((instance) => {
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
