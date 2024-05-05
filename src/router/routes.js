const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () => import("src/layouts/mainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          { path: "", component: () => import("pages/dashboard.vue") },
        ],
      },
      {
        path: "/error403",
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import("pages/error403.vue") }],
      },
      {
        path: "/m_login",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          { path: "", component: () => import("pages/manuals/m_login.vue") },
        ],
      },
      {
        path: "/relaciondespacho",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/operaciones/relacionDespacho.vue"),
          },
        ],
      },
      {
        path: "/registrocostos",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/operaciones/registroCostos.vue"),
          },
        ],
      },
      {
        path: "/reportecostos",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/operaciones/reporteCostos.vue"),
          },
        ],
      },
      {
        path: "/pruebasentrega",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/operaciones/pruebasEntrega.vue"),
          },
        ],
      },
      {
        path: "/registroserviciocarga",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/ventas/registroServicioCarga.vue"),
          },
        ],
      },
      {
        path: "/facturacioncredito",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/ventas/facturacionCredito.vue"),
          },
        ],
      },
      {
        path: "/anulacionguias",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/ventas/anulacionGuias.vue"),
          },
        ],
      },
      {
        path: "/emitircarta",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/ventas/emitirCarta.vue"),
          },
        ],
      },
      {
        path: "/notasdebito",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/administracion/notasDebito.vue"),
          },
        ],
      },
      {
        path: "/notascredito",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/administracion/notasCredito.vue"),
          },
        ],
      },
      {
        path: "/anulacionnotascontables",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/administracion/anulacionNotasContables.vue"),
          },
        ],
      },
      {
        path: "/cuentasporcobrar",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/administracion/cuentasPorCobrar.vue"),
          },
        ],
      },
      {
        path: "/generarcomisiones",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/administracion/generarComisiones.vue"),
          },
        ],
      },
      {
        path: "/comprobantesigtf",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/administracion/comprobantesIgtf.vue"),
          },
        ],
      },
      {
        path: "/relacionigtf",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/reportes/relacionIgtf.vue"),
          },
        ],
      },
      {
        path: "/reporteventas",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/reportes/reporteVentas.vue"),
          },
        ],
      },
      {
        path: "/librocompras",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/reportes/libroCompras.vue"),
          },
        ],
      },
      {
        path: "/libroventas",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/reportes/libroVentas.vue"),
          },
        ],
      },
      {
        path: "/pagospendproveedores",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/reportes/pagosPendProveedores.vue"),
          },
        ],
      },
      {
        path: "/pagosproveedores",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("src/pages/reportes/pagosProveedores.vue"),
          },
        ],
      },
      {
        path: "/relacionretenciones",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/reportes/relacionRetenciones.vue"),
          },
        ],
      },
      {
        path: "/controlretencionesislr",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/reportes/controlRetencionesIslr.vue"),
          },
        ],
      },
      {
        path: "/controlretencionesiva",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/reportes/controlRetencionesIva.vue"),
          },
        ],
      },
      {
        path: "/franqueopostal",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/reportes/franqueoPostal.vue"),
          },
        ],
      },
      {
        path: "/agencias",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/agencias.vue"),
          },
        ],
      },
      {
        path: "/agentes",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/agentes.vue"),
          },
        ],
      },
      {
        path: "/paisestadociudad",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/paisEstadoCiudad.vue"),
          },
        ],
      },
      {
        path: "/zonasagencia",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/zonasAgencia.vue"),
          },
        ],
      },
      {
        path: "/unidadestransporte",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("pages/mantenimiento/unidadesTransporte.vue"),
          },
        ],
      },
      {
        path: "/ayudantes",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/ayudantes.vue"),
          },
        ],
      },
      {
        path: "/receptores",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/receptores.vue"),
          },
        ],
      },
      {
        path: "/tarifas",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/tarifas.vue"),
          },
        ],
      },
      {
        path: "/controlcorrelativo",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("pages/mantenimiento/controlCorrelativo.vue"),
          },
        ],
      },
      {
        path: "/variablecontrol",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/variableControl.vue"),
          },
        ],
      },
      {
        path: "/bancos",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/bancos.vue"),
          },
        ],
      },
      {
        path: "/cuentasbancarias",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/cuentasBancarias.vue"),
          },
        ],
      },
      {
        path: "/clientes",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/clientes.vue"),
          },
        ],
      },
      {
        path: "/empleados",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/empleados.vue"),
          },
        ],
      },
      {
        path: "/proveedores",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/proveedores.vue"),
          },
        ],
      },
      {
        path: "/historicodolar",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/mantenimiento/historicoDolar.vue"),
          },
        ],
      },
      {
        path: "/retenciones",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/retenciones.vue"),
          },
        ],
      },
      {
        path: "/conceptosoperacion",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("pages/mantenimiento/conceptosOperacion.vue"),
          },
        ],
      },
      {
        path: "/conceptosfacturacion",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("pages/mantenimiento/conceptosFacturacion.vue"),
          },
        ],
      },
      {
        path: "/conceptosfpo",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/conceptosFpo.vue"),
          },
        ],
      },
      {
        path: "/asignacionguias",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/mantenimiento/asignacionGuias.vue"),
          },
        ],
      },
      {
        path: "/roles",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          { path: "", component: () => import("pages/seguridad/roles.vue") },
        ],
      },
      {
        path: "/usuarios",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          { path: "", component: () => import("pages/seguridad/usuarios.vue") },
        ],
      },
      {
        path: "/permisologia",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/seguridad/permisologia.vue"),
          },
        ],
      },
      {
        path: "/cargamanualguias",
        component: () => import("layouts/mainLayout.vue"),
        children: [
          {
            path: "",
            component: () =>
              import("src/pages/mantenimiento/cargaManualGuias.vue"),
          },
        ],
      },
    ],
  },

  {
    path: "/",
    redirect: "/userLogin",
    component: () => import("src/layouts/userLayout.vue"),
    children: [
      {
        path: "/dashboardUser",
        component: () => import("layouts/userLayout.vue"),
        children: [
          { path: "", component: () => import("pages/usuarios/dashboard.vue") },
        ],
      },
    ],
  },

  {
    path: "/",
    redirect: "/login",
    component: () => import("layouts/manualLayout.vue"),
    children: [
      {
        path: "/m_relaciondespacho",
        component: () => import("layouts/manualLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/manuals/m_relacionDespacho.vue"),
          },
        ],
      },
    ],
  },

  // always leave this as last one,
  // but you can also remove it
  {
    path: "/login",
    component: () => import("pages/login.vue"),
  },
  {
    path: "/userLogin",
    component: () => import("pages/usuarios/login.vue"),
  },
  {
    path: "/userConfirm",
    component: () => import("pages/usuarios/confirm.vue"),
  },
  {
    path: "/:catchall(.*)*",
    component: () => import("pages/error404.vue"),
  },
  {
    path: "/errorVerify",
    component: () => import("pages/errorVerify.vue"),
  },
  {
    path: "/userCreated",
    component: () => import("pages/userCreated.vue"),
  },
];
export default routes;
