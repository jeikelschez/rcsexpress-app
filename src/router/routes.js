const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('layouts/mainlayout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/dashboard.vue')}]
      },
      {
        path: '/error403',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Error403.vue')}]
      },
      {
        path: '/m_login',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_login.vue')}]
      },
      {
        path: '/operativa',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/operativa.vue')}]
      },
      {
        path: '/costos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/costos.vue')}]
      },
      {
        path: '/registrodecostos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/registrodecostos.vue')}]
      },
      {
        path: '/reportedecostos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/reportedecostos.vue')}]
      },
      {
        path: '/pruebasentrega',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/pruebasdeentrega.vue')}]
      },
      {
        path: "/registroserviciocarga",
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import("src/pages/Registroserviciocarga.vue") }],
      },
      {
        path: '/facturacioncredito',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/facturacioncredito.vue')}]
      },
      {
        path: '/anulacionguias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/anulacionguias.vue')}]
      },
      {
        path: '/emitircarta',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/emitircarta.vue')}]
      },
      {
        path: '/administracion',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/administracion.vue')}]
      },
      {
        path: '/notascontables',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/notascontables.vue')}]
      },
      {
        path: '/notasdebito',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/notasdebito.vue')}]
      },
      {
        path: '/notascredito',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/notascredito.vue')}]
      },
      {
        path: '/anulacionnotascontables',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/anulacionnotascontables.vue')}]
      },
      {
        path: '/cuentasporcobrar',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/cuentasporcobrar.vue')}]
      },
      {
        path: '/cuentasporpagar',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/cuentasporpagar.vue')}]
      },
      {
        path: '/ingresocuentaspagar',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/ingresocuentaspagar.vue')}]
      },
      {
        path: '/controlpagosproveedores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/controlpagosproveedores.vue')}]
      },
      {
        path: '/controldecomisiones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/controldecomisiones.vue')}]
      },
      {
        path: '/generarcomisiones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/generarcomisiones.vue')}]
      },
      {
        path: '/pagocomisiones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/pagocomisiones.vue')}]
      },
      {
        path: '/retencioncomprador',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/retencioncomprador.vue')}]
      },
      {
        path: '/relacionretencionescomprador',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/relacionretencionescomprador.vue')}]
      },
      {
        path: '/movimientosbancarios',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/movimientosbancarios.vue')}]
      },
      {
        path: '/ingresomovimientos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/ingresomovimientos.vue')}]
      },
      {
        path: '/relacionmovimientos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/relacionmovimientos.vue')}]
      },
      {
        path: '/estadogananciasperdidas',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/estadogananciasperdidas.vue')}]
      },
      {
        path: '/reporteventas',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/reporteventas.vue')}]
      },
      {
        path: '/librocompras',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/librocompras.vue')}]
      },
      {
        path: '/libroventas',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/libroventas.vue')}]
      },
      {
        path: '/pagospendientesproveedores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/pagospendientesproveedores.vue')}]
      },
      {
        path: '/pagosrealizadosproveedores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/pagosrealizadosproveedores.vue')}]
      },
      {
        path: '/relacionretenciones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/relacionretenciones.vue')}]
      },
      {
        path: '/controlretencionesislr',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/controlretencionesislr.vue')}]
      },
      {
        path: '/controlretencionesiva',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/controlretencionesiva.vue')}]
      },
      {
        path: '/franqueopostal',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/franqueopostal.vue')}]
      },
      {
        path: '/agencias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/agencias.vue')}]
      },
      {
        path: '/agentes',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/agentes.vue')}]
      },
      {
        path: '/paisestadociudad',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Paisestadociudad.vue')}]
      },
      {
        path: '/zonasagencia',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/zonasagencia.vue')}]
      },
      {
        path: '/unidadestransporte',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/unidadestransporte.vue')}]
      },
      {
        path: '/ayudantes',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/ayudantes.vue')}]
      },
      {
        path: '/receptores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/receptores.vue')}]
      },
      {
        path: '/tarifas',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/tarifas.vue')}]
      },
      {
        path: '/controlcorrelativo',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/controlcorrelativo.vue')}]
      },
      {
        path: '/variablecontrol',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/variablecontrol.vue')}]
      },
      {
        path: '/bancos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/bancos.vue')}]
      },
      {
        path: '/cuentasbancarias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/cuentasbancarias.vue')}]
      },
      {
        path: '/clientes',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/clientes.vue')}]
      },
      {
        path: '/empleados',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/empleados.vue')}]
      },
      {
        path: '/proveedores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/proveedores.vue')}]
      },
      {
        path: '/retenciones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/retenciones.vue')}]
      },
      {
        path: '/conceptosoperacion',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/conceptosoperacion.vue')}]
      },
      {
        path: '/conceptosfacturacion',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/conceptosfacturacion.vue')}]
      },
      {
        path: '/conceptosfpo',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/conceptosfpo.vue')}]
      },
      {
        path: '/asignacionguias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/asignacionguias.vue')}]
      },
      {
        path: '/roles',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/roles.vue')}]
      },
      {
        path: '/usuarios',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/usuarios.vue')}]
      },
      {
        path: '/permisologia',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/permisologia.vue')}]
      },
      {
        path: '/transferencia',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/transferencia.vue')}]
      },
      {
        path: '/transferenciahidroca',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/transferenciahidroca.vue')}]
      },
      {
        path: '/cargamanualguias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/cargamanualguias.vue')}]
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
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_operativa.vue')}]
      },
      {
        path: '/m_costos',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_costos.vue')}]
      },
      {
        path: '/m_registrodecostos',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_registrodecostos.vue')}]
      },
      {
        path: '/m_reportedecostos',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_reportedecostos.vue')}]
      },
      {
        path: '/m_pruebasentrega',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_pruebasdeentrega.vue')}]
      },
      {
        path: '/m_registroserviciocarga',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_registroserviciocarga.vue')}]
      },
      {
        path: '/m_facturacioncredito',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_facturacioncredito.vue')}]
      },
      {
        path: '/m_anulacionguias',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_anulacionguias.vue')}]
      },
      {
        path: '/m_emitircarta',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_emitircarta.vue')}]
      },
      {
        path: '/m_administracion',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_administracion.vue')}]
      },
      {
        path: '/m_notascontables',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_notascontables.vue')}]
      },
      {
        path: '/m_notasdebito',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_notasdebito.vue')}]
      },
      {
        path: '/m_notascredito',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_notascredito.vue')}]
      },
      {
        path: '/m_anulacionnotascontables',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_anulacionnotascontables.vue')}]
      },
      {
        path: '/m_cuentasporcobrar',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_cuentasporcobrar.vue')}]
      },
      {
        path: '/m_cuentasporpagar',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_cuentasporpagar.vue')}]
      },
      {
        path: '/m_ingresocuentaspagar',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_ingresocuentaspagar.vue')}]
      },
      {
        path: '/m_controlpagosproveedores',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controlpagosproveedores.vue')}]
      },
      {
        path: '/m_controldecomisiones',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controldecomisiones.vue')}]
      },
      {
        path: '/m_generarcomisiones',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_generarcomisiones.vue')}]
      },
      {
        path: '/m_pagocomisiones',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_pagocomisiones.vue')}]
      },
      {
        path: '/m_retencioncomprador',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_retencioncomprador.vue')}]
      },
      {
        path: '/m_relacionretencionescomprador',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_relacionretencionescomprador.vue')}]
      },
      {
        path: '/m_movimientosbancarios',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_movimientosbancarios.vue')}]
      },
      {
        path: '/m_ingresomovimientos',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_ingresomovimientos.vue')}]
      },
      {
        path: '/m_relacionmovimientos',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_relacionmovimientos.vue')}]
      },
      {
        path: '/m_estadogananciasperdidas',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_estadogananciasperdidas.vue')}]
      },
      {
        path: '/m_reporteventas',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_reporteventas.vue')}]
      },
      {
        path: '/m_librocompras',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_librocompras.vue')}]
      },
      {
        path: '/m_libroventas',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_libroventas.vue')}]
      },
      {
        path: '/m_pagospendientesproveedores',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_pagospendientesproveedores.vue')}]
      },
      {
        path: '/m_pagosrealizadosproveedores',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_pagosrealizadosproveedores.vue')}]
      },
      {
        path: '/m_relacionretenciones',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_relacionretenciones.vue')}]
      },
      {
        path: '/m_controlretencionesislr',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controlretencionesislr.vue')}]
      },
      {
        path: '/m_controlretencionesiva',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controlretencionesiva.vue')}]
      },
      {
        path: '/m_franqueopostal',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_franqueopostal.vue')}]
      },
      {
        path: '/m_agencias',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_agencias.vue')}]
      },
      {
        path: '/m_agentes',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_agentes.vue')}]
      },
      {
        path: '/m_paisestadociudad',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_Paisestadociudad.vue')}]
      },
      {
        path: '/m_zonasagencia',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_zonasagencia.vue')}]
      },
      {
        path: '/m_unidadestransporte',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_unidadestransporte.vue')}]
      },
      {
        path: '/m_ayudantes',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_ayudantes.vue')}]
      },
      {
        path: '/m_receptores',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_receptores.vue')}]
      },
      {
        path: '/m_tarifas',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_tarifas.vue')}]
      },
      {
        path: '/m_controlcorrelativo',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controlcorrelativo.vue')}]
      },
      {
        path: '/m_variablecontrol',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_variablecontrol.vue')}]
      },
      {
        path: '/m_bancos',
        name: 'Manual Bancos',
        props: true,
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_bancos.vue')}]
      },
      {
        path: '/m_cuentasbancarias',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_cuentasbancarias.vue')}]
      },
      {
        path: '/m_clientes',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_clientes.vue')}]
      },
      {
        path: '/m_empleados',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_empleados.vue')}]
      },
      {
        path: '/m_proveedores',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_proveedores.vue')}]
      },
      {
        path: '/m_retenciones',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_retenciones.vue')}]
      },
      {
        path: '/m_conceptosoperacion',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_conceptosoperacion.vue')}]
      },
      {
        path: '/m_conceptosfacturacion',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_conceptosfacturacion.vue')}]
      },
      {
        path: '/m_conceptosfpo',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_conceptosfpo.vue')}]
      },
      {
        path: '/m_asignacionguias',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_asignacionguias.vue')}]
      },
      {
        path: '/m_roles',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_roles.vue')}]
      },
      {
        path: '/m_usuarios',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_usuarios.vue')}]
      },
      {
        path: '/m_permisologia',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_permisologia.vue')}]
      },
      {
        path: '/m_transferencia',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_transferencia.vue')}]
      },
      {
        path: '/m_transferenciahidroca',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_transferenciahidroca.vue')}]
      },
      {
        path: '/m_cargamanualguias',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_cargamanualguias.vue')}]
      },
      {
        path: '/m_dashboard',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_dashboard.vue')}]
      },
      {
        path: '/m_manual',
        component: () => import("layouts/manuallayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_manual.vue')}]
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
