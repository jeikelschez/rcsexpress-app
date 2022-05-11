<template>
</template>
    
<script>
import { LocalStorage } from 'quasar';
import jwt_decode from 'jwt-decode';
import { api } from "boot/axios";
import { useQuasar } from "quasar";

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
      logoutTimerGlobal: null,
      logoutTimer: null,
      refreshTimer: null,
      error: "",
      form: {
        username: "",
        token: "",
      },
      }
    },

    mounted() {
      window.addEventListener('load', (event) => {
        console.log('page is fully loaded');
        });
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
      login: function() {
      this.events.forEach( function (event) {window.addEventListener(event, this.setTimers);
      }, this);
      this.traducirToken();
      this.setRefreshTimer();
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
        if (LocalStorage.getItem('user') === true) {
          console.log('logout activado')
        clearTimeout(this.logoutTimer);
        this.logoutTimer = null
        this.logoutTimer = setTimeout(this.logoutUser, 5 * 1000);
        }
      },
      setRefreshTimer() {
        console.log('refresh activado')
        clearTimeout(this.refreshTimer);
        this.refreshTimer = null
        this.refreshTimer = setTimeout(this.refreshToken, 5 * 1000);
      },
      refreshToken() {
        if (LocalStorage.getItem('user') === true) {
        this.form.username = LocalStorage.getItem('usuario')
        this.form.token = LocalStorage.getItem('refreshToken')
        api.post(`/usuarios/refresh`, this.form)
         .then((res) => {
            if ((res.status = 201)) {
            LocalStorage.set('token', `${res.data.data.accessToken}`),
            LocalStorage.set('user', true),
            this.traducirToken();
            this.setRefreshTimer();
          }
        })
          .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "404")) {
            this.errorDelServidor()
          }
        });
        }
      },
      logoutUser: function() {
        LocalStorage.remove('user');
        this.$router.push('/login');
      },
  },
};
</script>