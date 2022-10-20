<template>
  <div id="WebViewer" ref="viewer" style="width: 100%; max-width: 80vw; height: 700px"></div>
</template>

<script>
import { ref } from "vue";
import WebViewer from "@pdftron/pdfjs-express-viewer";
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
    base64ToBlob(base64) {
      const binaryString = window.atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; ++i) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      return new Blob([bytes], { type: 'application/pdf' });
    },
    showpdf(pdf) {
      const path = `${process.env.publicPath}/webViewer`;
      const licenseKey = 'atkUT8UOiniAvAWUG1rN';
      WebViewer({ path, licenseKey }, this.viewer).then(instance => {
        instance.UI.loadDocument(this.base64ToBlob(pdf), { filename: 'myfile.pdf' });
      });
    },
  },
};
</script>
