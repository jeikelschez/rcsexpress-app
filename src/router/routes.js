
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
        path: '/operativa',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/operativa.vue')}]
      },
      {
        path: '/costos',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/costos.vue')}]
      },
      {
        path: '/registrodecostos',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/registroDeCostos.vue')}]
      },
      {
        path: '/reportedecostos',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/Reportedecostos.vue')}]
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
        children: [{ path: "", component: () => import('src/pages/notasdebito.vue')}]
      },
      {
        path: '/notascredito',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/notascredito.vue')}]
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
        children: [{ path: "", component: () => import('src/pages/generarcomisiones.vue')}]
      },
      {
        path: '/pagocomisiones',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/pagocomisiones.vue')}]
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
        children: [{ path: "", component: () => import('src/pages/Reporteventas.vue')}]
      },
      {
        path: '/librocompras',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/librocompras.vue')}]
      },
      {
        path: '/libroventas',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/libroventas.vue')}]
      },
      {
        path: '/pagospendientesproveedores',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/pagospendientesproveedores.vue')}]
      },
      {
        path: '/pagosrealizadosproveedores',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/pagosrealizadosproveedores.vue')}]
      },
      {
        path: '/relacionretenciones',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/relacionretenciones.vue')}]
      },
      {
        path: '/controlretencionesislr',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/controlretencionesislr.vue')}]
      },
      {
        path: '/controlretencionesiva',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('src/pages/controlretencionesiva.vue')}]
      },
      {
        path: '/franqueopostal',
        component: () => import("layouts/mainLayout.vue"),
        children: [{ path: "", component: () => import('pages/franqueopostal.vue')}]
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
        path: '/m_operativa',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_operativa.vue')}]
      },
      {
        path: '/m_costos',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_costos.vue')}]
      },
      {
        path: '/m_registrodecostos',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_registroDeCostos.vue')}]
      },
      {
        path: '/m_reportedecostos',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_reportedecostos.vue')}]
      },
      {
        path: '/m_pruebasentrega',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_pruebasEntrega.vue')}]
      },
      {
        path: '/m_registroserviciocarga',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_registroServicioCarga.vue')}]
      },
      {
        path: '/m_facturacioncredito',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_facturacionCredito.vue')}]
      },
      {
        path: '/m_anulacionguias',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_anulacionGuias.vue')}]
      },
      {
        path: '/m_emitircarta',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_emitirCarta.vue')}]
      },
      {
        path: '/m_administracion',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_administracion.vue')}]
      },
      {
        path: '/m_notascontables',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_notascontables.vue')}]
      },
      {
        path: '/m_notasdebito',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_notasdebito.vue')}]
      },
      {
        path: '/m_notascredito',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_notascredito.vue')}]
      },
      {
        path: '/m_anulacionnotascontables',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_anulacionnotascontables.vue')}]
      },
      {
        path: '/m_cuentasporcobrar',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_cuentasporcobrar.vue')}]
      },
      {
        path: '/m_cuentasporpagar',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_cuentasporpagar.vue')}]
      },
      {
        path: '/m_ingresocuentaspagar',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_ingresocuentaspagar.vue')}]
      },
      {
        path: '/m_controlpagosproveedores',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controlpagosproveedores.vue')}]
      },
      {
        path: '/m_controldecomisiones',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controldecomisiones.vue')}]
      },
      {
        path: '/m_generarcomisiones',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_generarcomisiones.vue')}]
      },
      {
        path: '/m_pagocomisiones',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_pagocomisiones.vue')}]
      },
      {
        path: '/m_retencioncomprador',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_retencioncomprador.vue')}]
      },
      {
        path: '/m_relacionretencionescomprador',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_relacionretencionescomprador.vue')}]
      },
      {
        path: '/m_movimientosbancarios',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_movimientosbancarios.vue')}]
      },
      {
        path: '/m_ingresomovimientos',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_ingresomovimientos.vue')}]
      },
      {
        path: '/m_relacionmovimientos',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_relacionmovimientos.vue')}]
      },
      {
        path: '/m_estadogananciasperdidas',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_estadogananciasperdidas.vue')}]
      },
      {
        path: '/m_reporteventas',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_reporteventas.vue')}]
      },
      {
        path: '/m_librocompras',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_librocompras.vue')}]
      },
      {
        path: '/m_libroventas',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_libroventas.vue')}]
      },
      {
        path: '/m_pagospendientesproveedores',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_pagospendientesproveedores.vue')}]
      },
      {
        path: '/m_pagosrealizadosproveedores',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_pagosrealizadosproveedores.vue')}]
      },
      {
        path: '/m_relacionretenciones',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_relacionretenciones.vue')}]
      },
      {
        path: '/m_controlretencionesislr',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controlretencionesislr.vue')}]
      },
      {
        path: '/m_controlretencionesiva',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controlretencionesiva.vue')}]
      },
      {
        path: '/m_franqueopostal',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_franqueopostal.vue')}]
      },
      {
        path: '/m_agencias',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_agencias.vue')}]
      },
      {
        path: '/m_agentes',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_agentes.vue')}]
      },
      {
        path: '/m_paisestadociudad',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_paisEstadoCiudad.vue')}]
      },
      {
        path: '/m_zonasagencia',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_zonasAgencia.vue')}]
      },
      {
        path: '/m_unidadestransporte',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_unidadesTransporte.vue')}]
      },
      {
        path: '/m_ayudantes',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_ayudantes.vue')}]
      },
      {
        path: '/m_receptores',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_receptores.vue')}]
      },
      {
        path: '/m_tarifas',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_tarifas.vue')}]
      },
      {
        path: '/m_controlcorrelativo',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_controlCorrelativo.vue')}]
      },
      {
        path: '/m_variablecontrol',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_variableControl.vue')}]
      },
      {
        path: '/m_bancos',
        name: 'Manual Bancos',
        props: true,
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_bancos.vue')}]
      },
      {
        path: '/m_cuentasbancarias',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_cuentasBancarias.vue')}]
      },
      {
        path: '/m_clientes',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_clientes.vue')}]
      },
      {
        path: '/m_empleados',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_empleados.vue')}]
      },
      {
        path: '/m_proveedores',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_proveedores.vue')}]
      },
      {
        path: '/m_retenciones',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_retenciones.vue')}]
      },
      {
        path: '/m_conceptosoperacion',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_conceptosOperacion.vue')}]
      },
      {
        path: '/m_conceptosfacturacion',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_conceptosFacturacion.vue')}]
      },
      {
        path: '/m_conceptosfpo',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_conceptosFpo.vue')}]
      },
      {
        path: '/m_asignacionguias',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_asignacionGuias.vue')}]
      },
      {
        path: '/m_roles',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_roles.vue')}]
      },
      {
        path: '/m_usuarios',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_usuarios.vue')}]
      },
      {
        path: '/m_permisologia',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_permisologia.vue')}]
      },
      {
        path: '/m_transferencia',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_transferencia.vue')}]
      },
      {
        path: '/m_transferenciahidroca',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_transferenciahidroca.vue')}]
      },
      {
        path: '/m_cargamanualguias',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_cargamanualguias.vue')}]
      },
      {
        path: '/m_dashboard',
        component: () => import("layouts/manualLayout.vue"),
        children: [{ path: "", component: () => import('pages/manuals/m_dashboard.vue')}]
      },
      {
        path: '/m_manual',
        component: () => import("layouts/manualLayout.vue"),
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
