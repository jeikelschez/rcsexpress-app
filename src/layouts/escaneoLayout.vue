<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-icon name="qr_code_scanner" size="sm" class="q-mr-sm" />
        <q-toolbar-title class="text-weight-bold ellipsis">
          Control de Carga
        </q-toolbar-title>
        <q-btn flat round dense class="q-ml-sm">
          <q-avatar size="30px" color="white" text-color="primary">
            <q-icon name="person" />
          </q-avatar>
          <q-menu anchor="bottom right" self="top right">
            <q-list style="min-width: 180px">
              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-medium">{{
                    nombre
                  }}</q-item-label>
                  <q-item-label caption>Operador de carga</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="salir">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Salir</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from "quasar";
import { api } from "boot/axios";

export default {
  name: "escaneoLayout",
  data() {
    return {
      nombre: "",
      // Política de sesión (igual que el resto del sistema):
      // auto-refresco del token + cierre por inactividad (60 min).
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "touchstart", "load"],
      intervalLogout: null,
      intervalRefresh: null,
      form: { username: "", token: "" },
    };
  },
  mounted() {
    try {
      const tt = LocalStorage.getItem("tokenTraducido");
      if (tt && tt.usuario) this.nombre = tt.usuario.nombre || "";
    } catch (e) {}
    this.events.forEach((event) => {
      window.addEventListener(event, this.resetLogoutTimer);
    });
    this.resetLogoutTimer();
    this.refreshTimer();
  },
  beforeUnmount() {
    this.events.forEach((event) => {
      window.removeEventListener(event, this.resetLogoutTimer);
    });
    clearInterval(this.intervalLogout);
    clearInterval(this.intervalRefresh);
  },
  methods: {
    salir() {
      clearInterval(this.intervalLogout);
      clearInterval(this.intervalRefresh);
      LocalStorage.clear();
      this.$router.push("/login");
    },
    // --- Auto-refresco del token (cada 119 min, antes de que expire a los 120) ---
    refreshTimer() {
      const _this = this;
      const minutes = 119;
      let currentTime = localStorage.getItem("currentTime");
      let targetTime = localStorage.getItem("targetTime");
      if (targetTime == null && currentTime == null) {
        currentTime = new Date();
        targetTime = new Date(currentTime.getTime() + minutes * 60000);
        localStorage.setItem("currentTime", currentTime);
        localStorage.setItem("targetTime", targetTime);
      }
      clearInterval(this.intervalRefresh);
      this.intervalRefresh = setInterval(checkComplete, 1000);
      function checkComplete() {
        if (LocalStorage.getItem("user") === true) {
          const ct = new Date(localStorage.getItem("currentTime"));
          const tt = new Date(localStorage.getItem("targetTime"));
          if (ct > tt) {
            clearInterval(_this.intervalRefresh);
            LocalStorage.remove("currentTime");
            LocalStorage.remove("targetTime");
            _this.refreshToken();
          } else {
            localStorage.setItem("currentTime", new Date());
          }
        } else {
          clearInterval(_this.intervalRefresh);
          LocalStorage.remove("currentTime");
          LocalStorage.remove("targetTime");
          _this.$router.push("/login");
        }
      }
    },
    refreshToken() {
      if (LocalStorage.getItem("user") === true) {
        this.form.username = LocalStorage.getItem("usuario");
        this.form.token = LocalStorage.getItem("refreshToken");
        api
          .post(`/usuarios/refresh`, this.form)
          .then((res) => {
            LocalStorage.set("token", `${res.data.data.accessToken}`);
            this.refreshTimer();
          })
          .catch(() => {
            this.$q.notify({
              message: "Sesión expirada, iniciá sesión de nuevo",
              color: "red",
            });
            this.salir();
          });
      }
    },
    // --- Cierre por inactividad (60 min sin actividad) ---
    resetLogoutTimer() {
      clearInterval(this.intervalLogout);
      const currentTime = new Date();
      const targetTime = new Date(currentTime.getTime() + 60 * 60000);
      localStorage.setItem("currentTimeLogout", currentTime);
      localStorage.setItem("targetTimeLogout", targetTime);
      this.logoutTimer();
    },
    logoutTimer() {
      const _this = this;
      this.intervalLogout = setInterval(checkComplete, 1000);
      function checkComplete() {
        if (LocalStorage.getItem("user") === true) {
          const ct = new Date(localStorage.getItem("currentTimeLogout"));
          const tt = new Date(localStorage.getItem("targetTimeLogout"));
          if (ct > tt) {
            clearInterval(_this.intervalLogout);
            _this.salir();
          } else {
            localStorage.setItem("currentTimeLogout", new Date());
          }
        } else {
          clearInterval(_this.intervalLogout);
          _this.$router.push("/login");
        }
      }
    },
  },
};
</script>
