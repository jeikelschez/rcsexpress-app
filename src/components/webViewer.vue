<template>
  <div id="WebViewer" ref="viewer" style="width: 600px; height: 600px"></div>
</template>

<script>
import { ref } from "vue";
import WebViewer from "@pdftron/pdfjs-express-viewer";
export default {
  name: "webViewer",
  data: function () {
    return {
      confirmPrint: false,
    };
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
      return new Blob([bytes], { type: "application/pdf" });
    },
    async until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
      };
      return new Promise(poll);
    },
    showpdf(filePath, zoom, wait = false, closable = true, base64) {
      const path = `${process.env.publicPath}/webViewer`;
      WebViewer({ path, licenseKey: "atkUT8UOiniAvAWUG1rN" }, this.viewer).then(
        (instance) => {
          instance.UI.disableElements(["panToolButton"]);
          instance.UI.disableElements(["textSelectButton"]);
          instance.UI.setHeaderItems((header) => {
            header.push({
              type: "actionButton",
              title: "Descargar",
              img: "icon-header-download",
              onClick: () => {
                instance.UI.downloadPdf();
              },
            });
            header.push({
              type: "actionButton",
              title: "Exportar Excel",
              img: "../../icons/icone-excel-grise.png",
              onClick: () => {
                this.$emit("exportExcel");
              },
            });
            header.push({
              type: "actionButton",
              title: "Imprimir",
              img: "icon-header-print-line",
              onClick: async () => {
                if (wait) {
                  this.$emit("printPdf");
                  await this.until((_) => this.confirmPrint == true);
                  if (!this.confirmPrint) {
                    return;
                  }
                }
                instance.UI.print();
                this.confirmPrint = false;
              },
            });
            if (closable) {
              header.push({
                type: "actionButton",
                title: "Cerrar",
                img: "icon-close",
                onClick: () => {
                  this.$emit("closePdf");
                },
              });
            }
          });
          if (base64) {
            instance.UI.loadDocument(this.base64ToBlob(base64), {
              filename: "REPORTE SCEN.pdf",
            });
          } else {
            instance.UI.loadDocument(
              `${process.env.apiPath}/pdfreports/loadPDF/${filePath}`
            );
          }
          instance.UI.setLanguage("es");
          instance.UI.useEmbeddedPrint(true);
          setTimeout(() => {
            instance.UI.setZoomLevel(zoom ? zoom : 0.7);
          }, 2000);
        }
      );
    },
  },
};
</script>
