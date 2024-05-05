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
                  :disable="true"
                  label="Correo electrónico"
                  style="margin-top: 40px"
                >
                  <template v-slot:prepend>
                    <q-icon name="perm_identity" />
                  </template>
                </q-input>
                <q-input
                  color="blue"
                  dense
                  bg-color="white"
                  filled
                  v-model="password"
                  label="Contraseña"
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[(val) => (!!val && val.length > 5) || '']"
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
                <q-input
                  color="blue"
                  dense
                  bg-color="white"
                  filled
                  v-model="confirm"
                  label="Confirmar Contraseña"
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[(val) => (!!val && val === this.password) || '']"
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
                <q-btn glossy label="Confirmar" type="submit" />
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
import { decode } from "js-base64";
import userLogoutVue from "src/components/userLogout.vue";
import methodsVue from "src/components/methods.vue";

export default {
  components: { "user-logout": userLogoutVue, methods: methodsVue },
  name: "login_user",
  data() {
    return {
      routes: [],
      email: "",
      password: "",
      confirm: "",
      cliente: "",
      isPwd: true,
      remember: true,
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
  mounted() {
    this.cliente = this.$router.currentRoute._value.query.cliente;
    this.email = decode(this.$router.currentRoute._value.query.email);
    this.verifyUser();
  },
  methods: {
    async onSubmit() {
      let formUsuarios = {};
      formUsuarios.cod_cliente = this.cliente;
      formUsuarios.email = this.email;
      formUsuarios.password = this.password;
      formUsuarios.estatus = "1";

      // Guardo el usuario
      await api
        .post(`/cusuarios`, formUsuarios, {})
        .then(() => {
          api.get(`cusuarios/send-confirm`, {
            headers: {
              address: this.email,
              client: this.cliente,
              password: this.password,
            },
          });
          this.$router.push("/userCreated");
        })
        .catch(() => {
          this.$q.notify({
            message:
              "Error del Sistema. Problemas al actualizar datos del Usuario. Comuníquese con el proveedor del Sistemas...",
            color: "red",
          });
          return;
        });
    },
    verifyUser() {
      // Verifico que cliente Exista
      api.get(`clientes/verify/${this.cliente}`, {}).catch((err) => {
        this.$router.push("/errorVerify");
      });

      // Verifico que usuario no exista para ese cliente
      api
        .get(`cusuarios/verify`, {
          headers: {
            email: this.email,
            cliente: this.cliente,
          },
        })
        .then((res) => {
          if (res.data > 0) {
            this.$router.push("/errorVerify");
          }
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
.forgot {
  margin-top: 20px;
}
.remember {
  color: white;
  font-weight: bold;
  width: 100px;
}
.titulo {
  font-size: 20px;
  font-weight: 600;
  color: white;
}
</style>
