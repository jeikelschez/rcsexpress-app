// Utilidad para enviar ZPL a una impresora Zebra local vía Zebra Browser Print.
// Requiere que la PC tenga instalado "Zebra Browser Print" y el SDK cargado
// (window.BrowserPrint), referenciado en index.html.

export function browserPrintDisponible() {
  return typeof window !== "undefined" && !!window.BrowserPrint;
}

// Obtiene la impresora Zebra por defecto configurada en Browser Print.
export function obtenerImpresora() {
  return new Promise((resolve, reject) => {
    if (!browserPrintDisponible()) {
      reject(
        new Error(
          "Zebra Browser Print no está disponible. Verifique que esté instalado y en ejecución en esta PC."
        )
      );
      return;
    }
    window.BrowserPrint.getDefaultDevice(
      "printer",
      (device) => {
        if (!device) {
          reject(
            new Error(
              "No hay una impresora Zebra configurada como predeterminada en Browser Print."
            )
          );
          return;
        }
        resolve(device);
      },
      (err) => reject(new Error(err || "Error al conectar con Browser Print."))
    );
  });
}

// Envía una cadena ZPL (una o varias etiquetas concatenadas) a la impresora.
export function imprimirZpl(zpl) {
  return new Promise((resolve, reject) => {
    obtenerImpresora()
      .then((device) => {
        device.send(
          zpl,
          () => resolve(),
          (err) => reject(new Error(err || "Error al enviar a la impresora."))
        );
      })
      .catch(reject);
  });
}
