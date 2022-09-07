
const routes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('layouts/mainlayout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Dashboard.vue')}]
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
        children: [{ path: "", component: () => import('pages/Operativa.vue')}]
      },
      {
        path: '/costos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Costos.vue')}]
      },
      {
        path: '/registrodecostos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Registrodecostos.vue')}]
      },
      {
        path: '/reportedecostos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Reportedecostos.vue')}]
      },
      {
        path: '/pruebasentrega',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Pruebasdeentrega.vue')}]
      },
      {
        path: "/registroserviciocarga",
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import("src/pages/Registroserviciocarga.vue") }],
      },
      {
        path: '/facturacioncredito',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Facturacioncredito.vue')}]
      },
      {
        path: '/anulacionguias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Anulacionguias.vue')}]
      },
      {
        path: '/emitircarta',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Emitircarta.vue')}]
      },
      {
        path: '/administracion',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Administracion.vue')}]
      },
      {
        path: '/notascontables',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Notascontables.vue')}]
      },
      {
        path: '/notasdebito',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Notasdebito.vue')}]
      },
      {
        path: '/notascredito',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Notascredito.vue')}]
      },
      {
        path: '/anulacionnotascontables',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Anulacionnotascontables.vue')}]
      },
      {
        path: '/cuentasporcobrar',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Cuentasporcobrar.vue')}]
      },
      {
        path: '/cuentasporpagar',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Cuentasporpagar.vue')}]
      },
      {
        path: '/ingresocuentaspagar',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Ingresocuentaspagar.vue')}]
      },
      {
        path: '/controlpagosproveedores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Controlpagosproveedores.vue')}]
      },
      {
        path: '/controldecomisiones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Controldecomisiones.vue')}]
      },
      {
        path: '/generarcomisiones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Generarcomisiones.vue')}]
      },
      {
        path: '/pagocomisiones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Pagocomisiones.vue')}]
      },
      {
        path: '/retencioncomprador',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Retencioncomprador.vue')}]
      },
      {
        path: '/relacionretencionescomprador',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Relacionretencionescomprador.vue')}]
      },
      {
        path: '/movimientosbancarios',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Movimientosbancarios.vue')}]
      },
      {
        path: '/ingresomovimientos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Ingresomovimientos.vue')}]
      },
      {
        path: '/relacionmovimientos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Relacionmovimientos.vue')}]
      },
      {
        path: '/estadogananciasperdidas',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Estadogananciasperdidas.vue')}]
      },
      {
        path: '/reporteventas',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Reporteventas.vue')}]
      },
      {
        path: '/librocompras',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Librocompras.vue')}]
      },
      {
        path: '/libroventas',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Libroventas.vue')}]
      },
      {
        path: '/pagospendientesproveedores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Pagospendientesproveedores.vue')}]
      },
      {
        path: '/pagosrealizadosproveedores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Pagosrealizadosproveedores.vue')}]
      },
      {
        path: '/relacionretenciones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Relacionretenciones.vue')}]
      },
      {
        path: '/controlretencionesislr',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Controlretencionesislr.vue')}]
      },
      {
        path: '/controlretencionesiva',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Controlretencionesiva.vue')}]
      },
      {
        path: '/franqueopostal',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Franqueopostal.vue')}]
      },
      {
        path: '/agencias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Agencias.vue')}]
      },
      {
        path: '/agentes',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Agentes.vue')}]
      },
      {
        path: '/paisestadociudad',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Paisestadociudad.vue')}]
      },
      {
        path: '/zonasagencia',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/ZonasAgencia.vue')}]
      },
      {
        path: '/unidadestransporte',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/UnidadesTransporte.vue')}]
      },
      {
        path: '/ayudantes',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Ayudantes.vue')}]
      },
      {
        path: '/receptores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Receptores.vue')}]
      },
      {
        path: '/tarifas',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Tarifas.vue')}]
      },
      {
        path: '/controlcorrelativo',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Controlcorrelativo.vue')}]
      },
      {
        path: '/variablecontrol',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/VariableControl.vue')}]
      },
      {
        path: '/bancos',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Bancos.vue')}]
      },
      {
        path: '/cuentasbancarias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/CuentasBancarias.vue')}]
      },
      {
        path: '/clientes',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Clientes.vue')}]
      },
      {
        path: '/empleados',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Empleados.vue')}]
      },
      {
        path: '/proveedores',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Proveedores.vue')}]
      },
      {
        path: '/retenciones',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Retenciones.vue')}]
      },
      {
        path: '/conceptosoperacion',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/ConceptosOperacion.vue')}]
      },
      {
        path: '/conceptosfacturacion',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/ConceptosFacturacion.vue')}]
      },
      {
        path: '/conceptosfpo',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/ConceptosFPO.vue')}]
      },
      {
        path: '/asignacionguias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Asignacionguias.vue')}]
      },
      {
        path: '/roles',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Roles.vue')}]
      },
      {
        path: '/usuarios',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Usuarios.vue')}]
      },
      {
        path: '/permisologia',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Permisologia.vue')}]
      },
      {
        path: '/transferencia',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Transferencia.vue')}]
      },
      {
        path: '/transferenciahidroca',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Transferenciahidroca.vue')}]
      },
      {
        path: '/cargamanualguias',
        component: () => import("layouts/mainlayout.vue"),
        children: [{ path: "", component: () => import('pages/Cargamanualguias.vue')}]
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
