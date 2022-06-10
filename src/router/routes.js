

const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('layouts/mainlayout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('pages/dashboard.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_login',
        component: () => import('pages/manuals/m_login.vue'),
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
        component: () => import('pages/Paisestadociudad.vue'),
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
        name: 'Bancos',
        props: true,
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

  {
    path: '/',
    redirect: '/login',
    component: () => import('layouts/manuallayout.vue'),
    children: [
      {
        path: '/m_operativa',
        component: () => import('pages/manuals/m_operativa.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_costos',
        component: () => import('pages/manuals/m_costos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_registrodecostos',
        component: () => import('pages/manuals/m_registrodecostos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_reportedecostos',
        component: () => import('pages/manuals/m_reportedecostos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_pruebasentrega',
        component: () => import('pages/manuals/m_pruebasdeentrega.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_registroserviciocarga',
        component: () => import('pages/manuals/m_registroserviciocarga.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_facturacioncredito',
        component: () => import('pages/manuals/m_facturacioncredito.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_anulacionguias',
        component: () => import('pages/manuals/m_anulacionguias.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_emitircarta',
        component: () => import('pages/manuals/m_emitircarta.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_administracion',
        component: () => import('pages/manuals/m_administracion.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_notascontables',
        component: () => import('pages/manuals/m_notascontables.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_notasdebito',
        component: () => import('pages/manuals/m_notasdebito.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_notascredito',
        component: () => import('pages/manuals/m_notascredito.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_anulacionnotascontables',
        component: () => import('pages/manuals/m_anulacionnotascontables.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_cuentasporcobrar',
        component: () => import('pages/manuals/m_cuentasporcobrar.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_cuentasporpagar',
        component: () => import('pages/manuals/m_cuentasporpagar.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_ingresocuentaspagar',
        component: () => import('pages/manuals/m_ingresocuentaspagar.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_controlpagosproveedores',
        component: () => import('pages/manuals/m_controlpagosproveedores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_controldecomisiones',
        component: () => import('pages/manuals/m_controldecomisiones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_generarcomisiones',
        component: () => import('pages/manuals/m_generarcomisiones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_pagocomisiones',
        component: () => import('pages/manuals/m_pagocomisiones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_retencioncomprador',
        component: () => import('pages/manuals/m_retencioncomprador.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_relacionretencionescomprador',
        component: () => import('pages/manuals/m_relacionretencionescomprador.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_movimientosbancarios',
        component: () => import('pages/manuals/m_movimientosbancarios.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_ingresomovimientos',
        component: () => import('pages/manuals/m_ingresomovimientos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_relacionmovimientos',
        component: () => import('pages/manuals/m_relacionmovimientos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_estadogananciasperdidas',
        component: () => import('pages/manuals/m_estadogananciasperdidas.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_reporteventas',
        component: () => import('pages/manuals/m_reporteventas.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_librocompras',
        component: () => import('pages/manuals/m_librocompras.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_libroventas',
        component: () => import('pages/manuals/m_libroventas.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_pagospendientesproveedores',
        component: () => import('pages/manuals/m_pagospendientesproveedores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_pagosrealizadosproveedores',
        component: () => import('pages/manuals/m_pagosrealizadosproveedores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_relacionretenciones',
        component: () => import('pages/manuals/m_relacionretenciones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_controlretencionesislr',
        component: () => import('pages/manuals/m_controlretencionesislr.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_controlretencionesiva',
        component: () => import('pages/manuals/m_controlretencionesiva.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_franqueopostal',
        component: () => import('pages/manuals/m_franqueopostal.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_agencias',
        component: () => import('pages/manuals/m_agencias.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_agentes',
        component: () => import('pages/manuals/m_agentes.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_paisestadociudad',
        component: () => import('pages/manuals/m_Paisestadociudad.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_zonasagencia',
        component: () => import('pages/manuals/m_zonasagencia.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_unidadestransporte',
        component: () => import('pages/manuals/m_unidadestransporte.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_ayudantes',
        component: () => import('pages/manuals/m_ayudantes.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_receptores',
        component: () => import('pages/manuals/m_receptores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_tarifas',
        component: () => import('pages/manuals/m_tarifas.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_controlcorrelativo',
        component: () => import('pages/manuals/m_controlcorrelativo.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_variablecontrol',
        component: () => import('pages/manuals/m_variablecontrol.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_bancos',
        name: 'Manual Bancos',
        props: true,
        component: () => import('pages/manuals/m_bancos.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_cuentasbancarias',
        component: () => import('pages/manuals/m_cuentasbancarias.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_clientes',
        component: () => import('pages/manuals/m_clientes.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_empleados',
        component: () => import('pages/manuals/m_empleados.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_proveedores',
        component: () => import('pages/manuals/m_proveedores.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_retenciones',
        component: () => import('pages/manuals/m_retenciones.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_conceptosoperacion',
        component: () => import('pages/manuals/m_conceptosoperacion.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_conceptosfacturacion',
        component: () => import('pages/manuals/m_conceptosfacturacion.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_conceptosfpo',
        component: () => import('pages/manuals/m_conceptosfpo.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_asignacionguias',
        component: () => import('pages/manuals/m_asignacionguias.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_roles',
        component: () => import('pages/manuals/m_roles.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_usuarios',
        component: () => import('pages/manuals/m_usuarios.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_permisologia',
        component: () => import('pages/manuals/m_permisologia.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_transferencia',
        component: () => import('pages/manuals/m_transferencia.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_transferenciahidroca',
        component: () => import('pages/manuals/m_transferenciahidroca.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_cargamanualguias',
        component: () => import('pages/manuals/m_cargamanualguias.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_dashboard',
        component: () => import('pages/manuals/m_dashboard.vue'),
        meta: { requiresauth: true },
      },
      {
        path: '/m_manual',
        component: () => import('pages/manuals/m_manual.vue'),
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
