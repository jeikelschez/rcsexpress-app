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
        console.log('traducir token')
        var tokenTraducido = jwt_decode(LocalStorage.getItem('token'))
        console.log(LocalStorage.getItem('token'))
        LocalStorage.set('tokenTraducido', tokenTraducido)
      },
      setTimers() {
        if (LocalStorage.getItem('user') === true) {
        clearTimeout(this.logoutTimer);
        this.logoutTimer = null
        this.logoutTimer = setTimeout(this.logoutUser, 300 * 1000);
        }
      },
      setRefreshTimer() {
        if (LocalStorage.getItem('user') === true) {
        clearTimeout(this.refreshTimer);
        this.refreshTimer = null
        this.refreshTimer = setTimeout(this.refreshToken, 1140 * 1000);}
      },
      refreshToken() {
        if (LocalStorage.getItem('user') === true) {
        this.form.username = LocalStorage.getItem('usuario')
        this.form.token = LocalStorage.getItem('refreshToken')
        console.log('REFRESH ACTIVADO')
        api.post(`/usuarios/refresh`, this.form)
         .then((res) => {
            if ((res.status = 201)) {
            LocalStorage.set('token', `${res.data.data.accessToken}`),
            console.log(res)
            LocalStorage.set('user', true),
            console.log(LocalStorage.getItem('token'))
            window.location.reload()
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