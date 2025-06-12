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
      instance: null,
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
      // Destruye la instancia previa si existe
      if (this.instance) {
        this.instance.UI.dispose();
        this.instance = null;
        // Limpia el DOM del visor
        if (this.viewer && this.viewer.$el) {
          this.viewer.$el.innerHTML = "";
        } else if (this.$refs.viewer) {
          this.$refs.viewer.innerHTML = "";
        }
      }

      const path = `${process.env.publicPath}/webViewer`;
      WebViewer({ path, licenseKey: "4rtfX5Op0lYmruJtmVOe" }, this.viewer).then(
        (instance) => {
          this.instance = instance; // <--- Guarda la instancia aquí
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
                  await this.until((_) => this.confirmPrint);
                  if (this.confirmPrint == "false") {
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
    // Method to dispose of the WebViewer instance
    disposeViewer() {
      if (this.instance) {
        this.instance.UI.dispose();
        this.instance = null;
        // Limpia el DOM del visor
        if (this.viewer && this.viewer.$el) {
          this.viewer.$el.innerHTML = "";
        } else if (this.$refs.viewer) {
          this.$refs.viewer.innerHTML = "";
        }
      }
    },
  },
  beforeUnmount() {
    this.disposeViewer();
  },
};
</script>
