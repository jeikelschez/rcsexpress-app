
const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('src/layouts/mainLayout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/dashboard.vue')}]
      },
      {
        path: '/error403',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/error403.vue')}]
      },
      {
        path: '/m_login',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_login.vue')}]
      },
      {
        path: '/relaciondespacho',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/relacionDespacho.vue')}]
      },
      {
        path: '/registrocostos',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/registroCostos.vue')}]
      },
      {
        path: '/reportecostos',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/reporteCostos.vue')}]
      },
      {
        path: '/pruebasentrega',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/pruebasEntrega.vue')}]
      },
      {
        path: "/registroserviciocarga",
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import("src/pages/registroServicioCarga.vue") }],
      },
      {
        path: '/facturacioncredito',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/facturacionCredito.vue')}]
      },
      {
        path: '/anulacionguias',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/anulacionGuias.vue')}]
      },
      {
        path: '/emitircarta',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/emitirCarta.vue')}]
      },
      {
        path: '/administracion',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/administracion.vue')}]
      },
      {
        path: '/notascontables',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/notascontables.vue')}]
      },
      {
        path: '/notasdebito',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/notasDebito.vue')}]
      },
      {
        path: '/notascredito',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/notasCredito.vue')}]
      },
      {
        path: '/anulacionnotascontables',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/anulacionnotascontables.vue')}]
      },
      {
        path: '/cuentasporcobrar',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/cuentasporcobrar.vue')}]
      },
      {
        path: '/cuentasporpagar',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/cuentasporpagar.vue')}]
      },
      {
        path: '/historicodolar',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/historicoDolar.vue')}]
      },
      {
        path: '/ingresocuentaspagar',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/ingresocuentaspagar.vue')}]
      },
      {
        path: '/controlpagosproveedores',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/controlpagosproveedores.vue')}]
      },
      {
        path: '/controldecomisiones',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/controldecomisiones.vue')}]
      },
      {
        path: '/generarcomisiones',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/Generarcomisiones.vue')}]
      },
      {
        path: '/pagocomisiones',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/Pagocomisiones.vue')}]
      },
      {
        path: '/retencioncomprador',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/retencioncomprador.vue')}]
      },
      {
        path: '/relacionretencionescomprador',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/relacionretencionescomprador.vue')}]
      },
      {
        path: '/movimientosbancarios',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/movimientosbancarios.vue')}]
      },
      {
        path: '/ingresomovimientos',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/ingresomovimientos.vue')}]
      },
      {
        path: '/relacionmovimientos',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/relacionmovimientos.vue')}]
      },
      {
        path: '/estadogananciasperdidas',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/estadogananciasperdidas.vue')}]
      },
      {
        path: '/reporteventas',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/reporteVentas.vue')}]
      },
      {
        path: '/librocompras',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/libroCompras.vue')}]
      },
      {
        path: '/libroventas',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/libroVentas.vue')}]
      },
      {
        path: '/pagospendproveedores',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/pagosPendProveedores.vue')}]
      },
      {
        path: '/pagosproveedores',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/pagosProveedores.vue')}]
      },
      {
        path: '/relacionretenciones',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/relacionRetenciones.vue')}]
      },
      {
        path: '/controlretencionesislr',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/controlRetencionesIslr.vue')}]
      },
      {
        path: '/controlretencionesiva',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/controlRetencionesIva.vue')}]
      },
      {
        path: '/franqueopostal',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/franqueoPostal.vue')}]
      },
      {
        path: '/agencias',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/agencias.vue')}]
      },
      {
        path: '/agentes',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/agentes.vue')}]
      },
      {
        path: '/paisestadociudad',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/paisEstadoCiudad.vue')}]
      },
      {
        path: '/zonasagencia',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/zonasAgencia.vue')}]
      },
      {
        path: '/unidadestransporte',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/unidadesTransporte.vue')}]
      },
      {
        path: '/ayudantes',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/ayudantes.vue')}]
      },
      {
        path: '/receptores',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/receptores.vue')}]
      },
      {
        path: '/tarifas',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/tarifas.vue')}]
      },
      {
        path: '/controlcorrelativo',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/controlCorrelativo.vue')}]
      },
      {
        path: '/variablecontrol',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/variableControl.vue')}]
      },
      {
        path: '/bancos',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/bancos.vue')}]
      },
      {
        path: '/cuentasbancarias',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/cuentasBancarias.vue')}]
      },
      {
        path: '/clientes',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/clientes.vue')}]
      },
      {
        path: '/empleados',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/empleados.vue')}]
      },
      {
        path: '/proveedores',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/proveedores.vue')}]
      },
      {
        path: '/retenciones',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/retenciones.vue')}]
      },
      {
        path: '/conceptosoperacion',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/conceptosOperacion.vue')}]
      },
      {
        path: '/conceptosfacturacion',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/conceptosFacturacion.vue')}]
      },
      {
        path: '/conceptosfpo',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/conceptosFpo.vue')}]
      },
      {
        path: '/asignacionguias',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/asignacionGuias.vue')}]
      },
      {
        path: '/roles',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/roles.vue')}]
      },
      {
        path: '/usuarios',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/usuarios.vue')}]
      },
      {
        path: '/permisologia',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/permisologia.vue')}]
      },
      {
        path: '/transferencia',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/transferencia.vue')}]
      },
      {
        path: '/transferenciahidroca',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/transferenciahidroca.vue')}]
      },
      {
        path: '/cargamanualguias',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/cargaManualGuias.vue')}]
      },
  ]
  },

  {
    path: '/',
    redirect: '/login',
    component: () => import('layouts/manualLayout.vue'),
    children: [
      {
        path: '/m_relaciondespacho',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_relacionDespacho.vue')}]
      },
    ]
  },

  // always leave this as last one,
  // but you can also remove it
  {
    path: '/login',
    component: () => import('pages/login.vue'),
  },
  {
    path: '/:catchall(.*)*',
    component: () => import('pages/error404.vue')
  },

]
export default routes
