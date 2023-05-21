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
    showpdf(filePath, base64) {
      const path = `${process.env.publicPath}/webViewer`;
      WebViewer({ path, licenseKey: 'atkUT8UOiniAvAWUG1rN', }, this.viewer).then(instance => {
        instance.UI.disableElements(['panToolButton']);
        instance.UI.disableElements(['textSelectButton']);
        instance.UI.setHeaderItems(header => {
        header.push({
          type: 'actionButton',
          img: "https://i.ibb.co/cr5CYSB/2.png",
          onClick: () => {
            instance.downloadPdf();
          }
        });
        header.push({
          type: 'actionButton',
          img: "https://i.ibb.co/3RdScYv/1.png",
          onClick: () => {
            this.$emit('printPdf');
          }
        });
        header.push({
          type: 'actionButton',
          img: "https://i.ibb.co/qJqLZTd/close.png",
          onClick: () => {
            this.$emit('closePdf');
          }
        });
      });
      if(base64) {
        instance.UI.loadDocument(this.base64ToBlob(base64), { filename: 'REPORTE SCEN.pdf' });
      } else {
        instance.UI.loadDocument(`${process.env.apiPath}/reports/loadPDF/${filePath}`);
      }
      instance.UI.setLanguage('es');
      });
    },
  },
};
</script>
