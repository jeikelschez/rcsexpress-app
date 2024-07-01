<template>
  <q-layout>
    <q-page-container>
      <q-page class="login">
        <div class="fix-center text-center" style="min-width: 320px">
          <q-form class="q-gutter-md" @submit="onSubmit">
            <q-img src="images/logo_rcs.png" />
            <div class="column">
              <div class="col q-gutter-md">
                <q-input
                  required
                  dense
                  bg-color="white"
                  filled
                  outlined
                  v-model="email"
                  label="Correo electrónico"
                  autocomplete="new-user"
                  style="margin-top: 40px"
                >
                  <template v-slot:prepend>
                    <q-icon name="perm_identity" />
                  </template>
                </q-input>
                <q-input
                  dense
                  bg-color="white"
                  filled
                  autocomplete="new-password"
                  v-model="password"
                  label="Contraseña"
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[(val) => (!!val && val.length > 3) || '']"
                  style="margin-bottom: -20px"
                >
                  <template v-slot:prepend>
                    <q-icon name="screen_lock_landscape" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>
              <div class="q-pa-lg" />
              <div class="col q-gutter-md">
                <q-btn glossy label="Ingresar" type="submit" />
              </div>
            </div>
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import methodsVue from "src/components/methods.vue";
import { SessionStorage } from "quasar";

export default {
  components: { methods: methodsVue },
  name: "login_user",
  data() {
    return {
      routes: [],
      email: "",
      password: "",
      isPwd: true,
      axiosConfig: {
        headers: {
          Authorization: ``,
        },
      },
    };
  },
  setup() {
    const $q = useQuasar();
    return {};
  },
  mounted() {},
  methods: {
    async onSubmit() {
      api
        .get(`cusuarios/login`, {
          headers: {
            email: this.email,
            password: this.password,
          },
        })
        .then((res) => {
          SessionStorage.set("clientId", res.data.data);
          SessionStorage.set("user", true);
          this.$emit("changeTitle", "SCEN - Mantenimiento - Clientes", "");
          this.$router.push("/dashboardUser");
        }).catch((err) => {
          this.$q.notify({
            message: err.response.data.message,
            color: "red",
          });
        });
    },
  },
};
</script>

<style>
body .login {
  background: #9ec1ed;
}
@media (min-width: 600px) {
  .fix-center {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;
  }
}
@media (max-width: 600px) {
  .pad {
    padding-top: 45%;
  }
}

.glossy {
  width: 95%;
  background-color: #3543ef;
  color: white;
}
.input {
  background-color: white;
}
.label {
  color: white;
}
.titulo {
  font-size: 20px;
  font-weight: 600;
  color: white;
}
</style>
