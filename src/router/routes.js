const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('layouts/Menu.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('pages/Index.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Operativa',
        component: () => import('pages/Operativa.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Costos',
        component: () => import('pages/Costos.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Registrodecostos',
        component: () => import('pages/Registrodecostos.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Reportedecostos',
        component: () => import('pages/Reportedecostos.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Pruebasentrega',
        component: () => import('pages/Pruebasdeentrega.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Registroserviciocarga',
        component: () => import('pages/Registroserviciocarga.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Facturacioncredito',
        component: () => import('pages/Facturacioncredito.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Anulacionguias',
        component: () => import('pages/Anulacionguias.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Emitircarta',
        component: () => import('pages/Emitircarta.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Administracion',
        component: () => import('pages/Administracion.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Notascontables',
        component: () => import('pages/Notascontables.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Notasdebito',
        component: () => import('pages/Notasdebito.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Notascredito',
        component: () => import('pages/Notascredito.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/AnulacionNotasContables',
        component: () => import('pages/AnulacionNotasContables.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Cuentasporcobrar',
        component: () => import('pages/Cuentasporcobrar.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Cuentasporpagar',
        component: () => import('pages/Cuentasporpagar.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Ingresocuentaspagar',
        component: () => import('pages/Ingresocuentaspagar.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Controlpagosproveedores',
        component: () => import('pages/Controlpagosproveedores.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Controldecomisiones',
        component: () => import('pages/Controldecomisiones.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Generarcomisiones',
        component: () => import('pages/Generarcomisiones.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Pagocomisiones',
        component: () => import('pages/Pagocomisiones.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Retencioncomprador',
        component: () => import('pages/Retencioncomprador.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/RelacionRetencionesComprador',
        component: () => import('pages/RelacionRetencionesComprador.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/MovimientosBancarios',
        component: () => import('pages/MovimientosBancarios.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Ingresomovimientos',
        component: () => import('pages/Ingresomovimientos.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Relacionmovimientos',
        component: () => import('pages/Relacionmovimientos.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Estadogananciasperdidas',
        component: () => import('pages/Estadogananciasperdidas.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Reporteventas',
        component: () => import('pages/Reporteventas.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Librocompras',
        component: () => import('pages/Librocompras.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Libroventas',
        component: () => import('pages/Libroventas.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Pagospendientesproveedores',
        component: () => import('pages/Pagospendientesproveedores.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Pagosrealizadosproveedores',
        component: () => import('pages/Pagosrealizadosproveedores.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Relacionretenciones',
        component: () => import('pages/Relacionretenciones.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Controlretencionesislr',
        component: () => import('pages/Controlretencionesislr.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Controlretencionesiva',
        component: () => import('pages/Controlretencionesiva.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/franqueopostal',
        component: () => import('pages/franqueopostal.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Agencias',
        component: () => import('pages/Agencias.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Agentes',
        component: () => import('pages/Agentes.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Paisestadociudad',
        component: () => import('pages/Paisestadociudad.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/ZonasAgencia',
        component: () => import('pages/ZonasAgencia.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/UnidadesTransporte',
        component: () => import('pages/UnidadesTransporte.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Ayudantes',
        component: () => import('pages/Ayudantes.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Receptores',
        component: () => import('pages/Receptores.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Tarifas',
        component: () => import('pages/Tarifas.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Controlcorrelativo',
        component: () => import('pages/Controlcorrelativo.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/VariableControl',
        component: () => import('pages/VariableControl.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Bancos',
        component: () => import('pages/Bancos.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/CuentasBancarias',
        component: () => import('pages/CuentasBancarias.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Clientes',
        component: () => import('pages/Clientes.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Empleados',
        component: () => import('pages/Empleados.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Proveedores',
        component: () => import('pages/Proveedores.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Retenciones',
        component: () => import('pages/Retenciones.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/ConceptosOperacion',
        component: () => import('pages/ConceptosOperacion.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/ConceptosFacturacion',
        component: () => import('pages/ConceptosFacturacion.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/ConceptosFPO',
        component: () => import('pages/ConceptosFPO.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Asignacionguias',
        component: () => import('pages/Asignacionguias.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Roles',
        component: () => import('pages/Roles.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Usuarios',
        component: () => import('pages/Usuarios.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Permisologia',
        component: () => import('pages/Permisologia.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/Transferencia',
        component: () => import('pages/Transferencia.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/TransferenciaHidroca',
        component: () => import('pages/TransferenciaHidroca.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/CargaManualGuias',
        component: () => import('pages/CargaManualGuias.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
