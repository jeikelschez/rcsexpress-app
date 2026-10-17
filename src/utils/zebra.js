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

// Fallback SOLO para desarrollo: cuando no hay impresora, renderiza el ZPL en
// Labelary y abre el PDF (una página por etiqueta) en una pestaña nueva, para
// poder validar el diseño sin hardware. No se usa en producción.
// Sin indice al final: devuelve un PDF multipagina con TODAS las etiquetas.
const LABELARY_URL = "https://api.labelary.com/v1/printers/8dpmm/labels/4x4/";
function previsualizarEnLabelary(zpl) {
  return fetch(LABELARY_URL, {
    method: "POST",
    headers: {
      Accept: "application/pdf",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: zpl,
  }).then((resp) => {
    if (!resp.ok) throw new Error("Labelary respondió " + resp.status);
    return resp.blob().then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "etiquetas-qr.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    });
  });
}

// ¿Estamos en un entorno de desarrollo/local? (no producción)
// Se usa para activar la previsualización en PDF cuando no hay impresora.
function esModoPreview() {
  try {
    const host = (window.location && window.location.hostname) || "";
    const dev =
      typeof process !== "undefined" && process.env && process.env.DEV;
    return !!dev || host === "localhost" || host === "127.0.0.1";
  } catch (e) {
    return false;
  }
}

// ¿Forzar impresión real aunque estemos en local? (válvula de escape para probar
// la impresora en desarrollo): localStorage.setItem('zebraReal','1')
function forzarImpresionReal() {
  try {
    return (
      typeof window !== "undefined" &&
      window.localStorage &&
      window.localStorage.getItem("zebraReal") === "1"
    );
  } catch (e) {
    return false;
  }
}

// Envía una cadena ZPL (una o varias etiquetas concatenadas) a la impresora.
// En desarrollo/local previsualiza el PDF (sin enviar a la cola de impresión),
// para validar el diseño sin hardware. En producción envía a la Zebra.
export function imprimirZpl(zpl) {
  if (esModoPreview() && !forzarImpresionReal()) {
    return previsualizarEnLabelary(zpl);
  }
  return obtenerImpresora().then(
    (device) =>
      new Promise((res, rej) => {
        device.send(
          zpl,
          () => res(),
          (err) => rej(new Error(err || "Error al enviar a la impresora."))
        );
      })
  );
}
