const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('layouts/mainlayout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('pages/dashboard.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/operativa',
        component: () => import('pages/operativa.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/costos',
        component: () => import('pages/costos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/registrodecostos',
        component: () => import('pages/registrodecostos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/reportedecostos',
        component: () => import('pages/reportedecostos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/pruebasentrega',
        component: () => import('pages/pruebasdeentrega.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/registroserviciocarga',
        component: () => import('pages/registroserviciocarga.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/facturacioncredito',
        component: () => import('pages/facturacioncredito.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/anulacionguias',
        component: () => import('pages/anulacionguias.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/emitircarta',
        component: () => import('pages/emitircarta.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/administracion',
        component: () => import('pages/administracion.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/notascontables',
        component: () => import('pages/notascontables.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/notasdebito',
        component: () => import('pages/notasdebito.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/notascredito',
        component: () => import('pages/notascredito.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/anulacionnotascontables',
        component: () => import('pages/anulacionnotascontables.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/cuentasporcobrar',
        component: () => import('pages/cuentasporcobrar.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/cuentasporpagar',
        component: () => import('pages/cuentasporpagar.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/ingresocuentaspagar',
        component: () => import('pages/ingresocuentaspagar.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/controlpagosproveedores',
        component: () => import('pages/controlpagosproveedores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/controldecomisiones',
        component: () => import('pages/controldecomisiones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/generarcomisiones',
        component: () => import('pages/generarcomisiones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/pagocomisiones',
        component: () => import('pages/pagocomisiones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/retencioncomprador',
        component: () => import('pages/retencioncomprador.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/relacionretencionescomprador',
        component: () => import('pages/relacionretencionescomprador.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/movimientosbancarios',
        component: () => import('pages/movimientosbancarios.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/ingresomovimientos',
        component: () => import('pages/ingresomovimientos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/relacionmovimientos',
        component: () => import('pages/relacionmovimientos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/estadogananciasperdidas',
        component: () => import('pages/estadogananciasperdidas.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/reporteventas',
        component: () => import('pages/reporteventas.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/librocompras',
        component: () => import('pages/librocompras.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/libroventas',
        component: () => import('pages/libroventas.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/pagospendientesproveedores',
        component: () => import('pages/pagospendientesproveedores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/pagosrealizadosproveedores',
        component: () => import('pages/pagosrealizadosproveedores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/relacionretenciones',
        component: () => import('pages/relacionretenciones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/controlretencionesislr',
        component: () => import('pages/controlretencionesislr.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/controlretencionesiva',
        component: () => import('pages/controlretencionesiva.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/franqueopostal',
        component: () => import('pages/franqueopostal.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/agencias',
        component: () => import('pages/agencias.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/agentes',
        component: () => import('pages/agentes.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/paisestadociudad',
        component: () => import('pages/paisestadociudad.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/zonasagencia',
        component: () => import('pages/zonasagencia.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/unidadestransporte',
        component: () => import('pages/unidadestransporte.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/ayudantes',
        component: () => import('pages/ayudantes.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/receptores',
        component: () => import('pages/receptores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/tarifas',
        component: () => import('pages/tarifas.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/controlcorrelativo',
        component: () => import('pages/controlcorrelativo.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/variablecontrol',
        component: () => import('pages/variablecontrol.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/bancos',
        component: () => import('pages/bancos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/cuentasbancarias',
        component: () => import('pages/cuentasbancarias.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/clientes',
        component: () => import('pages/clientes.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/empleados',
        component: () => import('pages/empleados.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/proveedores',
        component: () => import('pages/proveedores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/retenciones',
        component: () => import('pages/retenciones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/conceptosoperacion',
        component: () => import('pages/conceptosoperacion.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/conceptosfacturacion',
        component: () => import('pages/conceptosfacturacion.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/conceptosfpo',
        component: () => import('pages/conceptosfpo.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/asignacionguias',
        component: () => import('pages/asignacionguias.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/roles',
        component: () => import('pages/roles.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/usuarios',
        component: () => import('pages/usuarios.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/permisologia',
        component: () => import('pages/permisologia.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/transferencia',
        component: () => import('pages/transferencia.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/transferenciahidroca',
        component: () => import('pages/transferenciahidroca.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/cargamanualguias',
        component: () => import('pages/cargamanualguias.vue'),
        meta: { requiresauth: true },
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
