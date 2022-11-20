<template>
  <div id="WebViewer" ref="viewer" style="width: 100%; height: 100%"></div>
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
        instance.UI.setLanguage('es');
        instance.UI.loadDocument(this.base64ToBlob(pdf), { filename: 'REPORTE SCEN.pdf' });
        instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: "https://i.ibb.co/3RdScYv/1.png",
          onClick: () => {
            instance.print()
          }
        });
        header.push({
          type: 'actionButton',
          img: "https://i.ibb.co/cr5CYSB/2.png",
          onClick: () => {
            instance.downloadPdf()
          }
        });
      });
      });
    },
  },
};
</script>
