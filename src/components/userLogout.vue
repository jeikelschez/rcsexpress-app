<template>
</template>
    
<script>
import { LocalStorage } from 'quasar';
import jwt_decode from 'jwt-decode';
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { ref } from "vue";

  export default {
    name: "userLogout",
    data: function() {
      return {
        events: ['click','mousemove','mousedown','scroll','keypress','load'],
        axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
          }
      },
      warningTimer: null,
      logoutTimer: null,
      error: "",
      }
    },

    mounted() {
      this.events.forEach( function (event) {window.addEventListener(event, this.setTimers);
      }, this);
      this.traducirToken();
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
      añadidoConExito() {
        $q.notify({
          message: "Agregado exitosamente",
          color: "green",
        });
      },
      editadoConExito() {
        $q.notify({
          message: "Editado exitosamente",
          color: "green",
        });
      },
      eliminadoConExito() {
        $q.notify({
          message: "Eliminado exitosamente",
          color: "green",
        });
      },
    };
  },

    methods: {
      getData: function(url, llamada, dataRes) {
      api.get(url, this.axiosConfig)
      .then((res) => {
        this.$emit(llamada, res.data, dataRes)
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
      });
      },
      getDataEdit: function(url, llamada, dataRes) {
      api.get(url, this.axiosConfig)
      .then((res) => {
        this.$emit(llamada, res.data, dataRes)
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
      },
      deleteData: function(url, llamada) {
      api.delete(url, this.axiosConfig)
      .then((res) => {
        if ((res.status = 200)) {
            this.$emit(llamada)
            this.eliminadoConExito();
          }
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
      },
      createData: function(url, form, llamada) {

      api.post(url, form, this.axiosConfig)
      .then((res) => {
        if ((res.status = 200)) {
            this.$emit(llamada)
            this.añadidoConExito();
          }
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
      },
      putData: function(url, form, llamada) {
      api.put(url, form, this.axiosConfig)
      .then((res) => {
          if ((res.status = 200)) {
            this.$emit(llamada)
            this.editadoConExito();
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
      },
      traducirToken: function() {
        var tokenTraducido = jwt_decode(LocalStorage.getItem('token'))
        LocalStorage.set('tokenTraducido', tokenTraducido)
      },
      desactivarCrud(createItem, deleteItem, updateItem, llamada) {
        var tokenTraducido = LocalStorage.getItem('tokenTraducido')

        var foundCreate
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo === createItem) {
            foundCreate = true
          }
          if (foundCreate == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          }

        if (foundCreate === true) 
            {
              createItem = true
            }

        var foundDelete
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo === deleteItem) {
            foundDelete = true
          }
          if (foundDelete == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          }

        if (foundDelete === true) 
            {
              deleteItem = true
            }

        var foundEdit
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo === updateItem) {
            foundEdit = true
          }
          if (foundEdit == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          }

        if (foundEdit === true) 
            {
              updateItem = true
              this.$emit(llamada, createItem, deleteItem, updateItem)
            }

        var foundRead
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo === 'readItem') {
            foundRead = true
          }
          if (foundRead == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          }

        if (foundRead === true) 
            {
              console.log('agregar permiso de mostrar')
            }

      },
      desactivarOpciones(
      llamada,
      readBancos,
      readAgencias,
      readCiudades,
      readPermisos,
      readUsuarios,
      readRoles
      ) 
      {var tokenTraducido = LocalStorage.getItem('tokenTraducido')

        var foundBancos
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo == readBancos) {
            foundBancos = true
          }
          if (foundBancos == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          };

        if (foundBancos === true) 
            {
              readBancos = true
            };

        var foundAgencias
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo == readAgencias) {
            foundAgencias = true
          }
          if (foundAgencias == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          };

        if (foundAgencias === true) 
            {
              readAgencias = true
            }

        var foundCiudades
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo === readCiudades) {
            foundCiudades = true
          }
          if (foundCiudades == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          }

        if (foundCiudades === true) 
            {
              readCiudades = true
            }

        var foundPermisos
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo === readPermisos) {
            foundPermisos = true
          }
          if (foundPermisos == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          }

        if (foundPermisos === true) 
            {
              readPermisos = true
            }
        
        var foundUsuarios
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo === readUsuarios) {
            foundUsuarios = true
          }
          if (foundUsuarios == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          }

        if (foundUsuarios === true) 
            {
              readUsuarios = true
            }

        var foundRoles
        for (var e = 0, len = tokenTraducido.usuario.roles.permisos.length; e<len; e++) {
          if (tokenTraducido.usuario.roles.permisos[e].codigo === readRoles) {
            foundRoles = true
          }
          if (foundRoles == true) break
          if (e == tokenTraducido.usuario.roles.permisos.length.length - 1) break
          }

        if (foundRoles === true) 
            {
              readRoles = true
              this.$emit(llamada, readBancos, readAgencias, readCiudades, readPermisos, readUsuarios, readRoles)
            }

      },
      setTimers() {
        clearTimeout(this.logoutTimer);
        this.logoutTimer = setTimeout(this.logoutUser, 300 * 1000);
      },
      logoutUser: function() {
        LocalStorage.remove('user');
        this.$router.push('/login');
      },
  },
};
</script>