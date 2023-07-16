<template>
  <div id="WebViewer" ref="viewer" style="width: 600px; height: 600px;"></div>
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
          title: 'Descargar',
          img: "icon-header-download",
          onClick: () => {
            instance.downloadPdf();
          }
        });
        header.push({
          type: 'actionButton',
          title: 'Imprimir',
          img: "icon-header-print-line",
          onClick: () => {
            instance.print();
          }
        });
        header.push({
          type: 'actionButton',
          title: 'Cerrar',
          img: "icon-close",
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
