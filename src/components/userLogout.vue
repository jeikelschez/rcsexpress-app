<template>
</template>
    
<script>
import { LocalStorage } from "quasar";
import jwt_decode from "jwt-decode";
import { api } from "boot/axios";
import { useQuasar } from "quasar";

export default {
  name: "userLogout",
  data: function () {
    return {
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
        },
      },
      logoutTimerGlobal: null,
      logoutTimer: null,
      refreshTimer: "null",
      error: "",
      form: {
        username: "",
        token: "",
      },
    };
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
  mounted() {
  },
  methods: {
    login: function () {
      LocalStorage.remove("currentTime");
      LocalStorage.remove("targetTime");
      this.traducirToken();
    },
    traducirToken: function () {
      var tokenTraducido = jwt_decode(LocalStorage.getItem("token"));
      LocalStorage.set("tokenTraducido", tokenTraducido);
    },
    refreshToken() {
      if (LocalStorage.getItem("user") === true) {
        this.form.username = LocalStorage.getItem("usuario");
        this.form.token = LocalStorage.getItem("refreshToken");
        api
          .post(`/usuarios/refresh`, this.form)
          .then((res) => {
            if ((res.status = 201)) {
              LocalStorage.set("token", `${res.data.data.accessToken}`),
              LocalStorage.set("user", true),
              console.log(LocalStorage.getItem("token"));
              this.traducirToken();
              this.setRefreshTimer();
            }
          })
          .catch((err) => {
            if (err.response) {
              this.error = err.response.data.statusCode;
            }
            if ((this.error = "404")) {
              this.errorDelServidor();
            }
          });
      }
    },
    logoutUser: function () {
      LocalStorage.remove("user");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#timer {
  font-weight: bold;
  color: red;
}
</style>