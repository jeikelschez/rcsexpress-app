<template>
  <q-layout>
    <q-page-container>
      <q-page class="login">
        <div class="fix-center text-center">
          <q-form
            class="q-gutter-md"
            @submit="onSubmit"
            @reset="onReset"
            novalidate="novalidate"
          >
            <q-img src="images/logo_rcs.png"/>
            <div class="column">
              <div class="col q-gutter-md">
                <q-input
                  required
                  dense
                  bg-color="white"
                  filled
                  outlined 
                  v-model="form.username"
                  label="Usuario"
                >
                  <template v-slot:prepend>
                    <q-icon name="perm_identity" />
                  </template>
                </q-input>
                <q-input
                  color="blue"
                  standout
                  dense
                  bg-color="white"
                  filled
                  v-model="form.password"
                  :label="$t('Login.password')"
                  :type="isPwd ? 'password' : 'text'"
                  :rules="[(val) => !!val || $t('Login.blank_pass')]"
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
                <q-btn glossy :label="$t('Login.login')" type="submit" />
              </div>
            </div>
          </q-form>
        </div>
        <methods ref="methods" @log-User="logUser"></methods>
        <user-logout ref="userLogout"></user-logout>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from "quasar";
import { useQuasar } from "quasar";
import userLogoutVue from "src/components/userLogout.vue";
import methodsVue from "src/components/methods.vue";

export default {
  components: { "user-logout": userLogoutVue, methods: methodsVue },
  name: "login",
  data() {
    return {
      routes: [],
      form: {
        username: "",
        password: "",
      },
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
    return {
      isNotAuthenticated() {
        $q.notify({
          message: "Hubo un error al Iniciar Sesion...",
          color: "red",
        });
      },
    };
  },
  mounted() {
    //var decodedStringAtoB = atob(encodedStringAtoB);
    console.log(this.$router.currentRoute._value.query.isExternal)
  },
  methods: {
    onSubmit() {
      LocalStorage.set("usuario", this.form.username);
      this.$refs.methods.login(
        `/usuarios/login`,
        this.form,
        `logUser`,
        this.axiosConfig
      );
    },
    logUser(res) {
      LocalStorage.set("token", `${res.data.accessToken}`);
      LocalStorage.set("user", true);
      LocalStorage.set("username", `${this.form.username}`);
      LocalStorage.set("refreshToken", `${res.data.refreshToken}`);
      this.$router.push("/dashboard");
      this.$refs.userLogout.login();
    },
    onReset() {
      this.form.username = "";
      this.form.password = "";
    },
  },
};
</script>

<style>
body .login {
  background: #9EC1ED;
}
@media (min-width: 600px) {
  .frame {
    border-color: white;
    border-width: 2px;
    border-style: solid;
    border-radius: 10px;
    background-color: rgb(255, 255, 255, 0.3);
  }
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
