<template>
</template>
    
<script>
import { LocalStorage } from 'quasar';
import { useQuasar } from "quasar";

  export default {
    name: "desactivateCrud",
    data: function() {
      return {
        axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
          }
      },
      error: "",
      permisos: [
      {
        permisoName: 'r_bancos',
        permiso: false,
        pagina: "disabledBancos",
        paginaSet: "disabledBancosSet"
      },
      {
        permisoName: 'r_agencias',
        permiso: false,
        pagina: "disabledAgencias",
        paginaSet: "disabledAgenciasSet"
      },
      {
        permisoName: 'r_ciudades',
        permiso: false,
        pagina: "disabledCiudades",
        paginaSet: "disabledCiudadesSet"
      },
      {
        permisoName: 'r_permisos',
        permiso: false,
        pagina: "disabledPermisos",
        paginaSet: "disabledPermisosSet"
      },
      {
        permisoName: 'r_usuarios',
        permiso: false,
        pagina: "disabledUsuarios",
        paginaSet: "disabledUsuariosSet"
      },
      {
        permisoName: 'r_roles',
        permiso: false,
        pagina: "disabledRoles",
        paginaSet: "disabledRolesSet"
      },
      {
        permisoName: 'r_agentes',
        permiso: false,
        pagina: "disabledAgentes",
        paginaSet: "disabledAgentesSet"
      },
      {
        permisoName: 'r_zonas',
        permiso: false,
        pagina: "disabledZonas",
        paginaSet: "disabledZonasSet"
      },
      {
        permisoName: 'r_unidades',
        permiso: false,
        pagina: "disabledUnidades",
        paginaSet: "disabledUnidadesSet"
      },
      {
        permisoName: 'r_ayudantes',
        permiso: false,
        pagina: "disabledAyudantes",
        paginaSet: "disabledAyudantesSet"
      },
      {
        permisoName: 'r_receptores',
        permiso: false,
        pagina: "disabledReceptores",
        paginaSet: "disabledReceptoresSet"
      },
      {
        permisoName: 'r_tarifas',
        permiso: false,
        pagina: "disabledTarifas",
        paginaSet: "disabledTarifasSet"
      },
      {
        permisoName: 'r_ccorrelativo',
        permiso: false,
        pagina: "disabledCcorrelativo",
        paginaSet: "disabledCcorrelativoSet"
      },
      {
        permisoName: 'r_vcontrol',
        permiso: false,
        pagina: "disabledVcontrol",
        paginaSet: "disabledVcontrolSet"
      },
      {
        permisoName: 'r_cuentas',
        permiso: false,
        pagina: "disabledCuentas",
        paginaSet: "disabledCuentasSet"
      },
      {
        permisoName: 'r_clientes',
        permiso: false,
        pagina: "disabledClientes",
        paginaSet: "disabledClientesSet"
      },
      {
        permisoName: 'r_empleados',
        permiso: false,
        pagina: "disabledEmpleados",
        paginaSet: "disabledEmpleadosSet"
      },
      {
        permisoName: 'r_proveedores',
        permiso: false,
        pagina: "disabledProveedores",
        paginaSet: "disabledProveedoresSet"
      },
      {
        permisoName: 'r_retenciones',
        permiso: false,
        pagina: "disabledRetenciones",
        paginaSet: "disabledRetencionesSet"
      },
      {
        permisoName: 'r_concepto_operacion',
        permiso: false,
        pagina: "disabledConceptoOperacion",
        paginaSet: "disabledConceptoOperacionSet"
      },
      {
        permisoName: 'r_concepto_facturacion',
        permiso: false,
        pagina: "disabledConceptoFacturacion",
        paginaSet: "disabledConceptoFacturacionSet"
      },
      {
        permisoName: 'r_concepto_fpo',
        permiso: false,
        pagina: "disabledConceptoFpo",
        paginaSet: "disabledConceptoFpoSet"
      },
      {
        permisoName: 'r_asignacionguias',
        permiso: false,
        pagina: "disabledAsignacionGuias",
        paginaSet: "disabledAsignacionGuiasSet"
      },
      ],
      }
    },

    setup() {
    const $q = useQuasar();
    return {
      errorDelServidor() {
        $q.notify({
          message: this.error,
          color: "red",
        });
      },
    };
  },

    methods: {
      desactivarCrud(createItem, readItem, updateItem, deleteItem, llamada) {
        var tokenTraducido = LocalStorage.getItem('tokenTraducido')

        var foundCreate
        var foundRead
        var foundDelete
        var foundUpdate
        
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo === createItem) {
            foundCreate = true
          }
          if (tokenTraducido.usuario.roles.permisos[e].codigo === deleteItem) {
            foundDelete = true
          }
          if (tokenTraducido.usuario.roles.permisos[e].codigo === updateItem) {
            foundUpdate = true
          }
          if (tokenTraducido.usuario.roles.permisos[e].codigo === readItem) {
            foundRead = true
          }
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          }

        if (foundCreate === true) 
        {
            createItem = true
        } else createItem = false
        if (foundDelete === true) 
        {
            deleteItem = true
        } else deleteItem = false
        if (foundUpdate === true) 
        {
            updateItem = true
        } else updateItem = false
        if (foundRead === true) 
        {
            readItem = true
        } else readItem = false
        this.$emit(llamada, createItem, readItem, deleteItem, updateItem)
      },
      desactivarOpciones(llamada) 
      {
        var tokenTraducido = LocalStorage.getItem('tokenTraducido')

      for (var i = 0, len = this.permisos.length; i < len; i++) {

        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo == this.permisos[i].permisoName) {
            this.permisos[i].permiso = true
          }
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
        };
        
        if (i == this.permisos.length - 1) {
          this.$emit(llamada, this.permisos)
          break
        };
      };
      },
  },
};
</script>