<template >
  <q-layout>
    <q-page-container>
      <q-page class="login">
        <div class="fix-center text-center">
          <div class="frame q-pa-xl pad">
            <q-form class="q-gutter-md" @submit="onSubmit" @reset="onReset" novalidate="novalidate">
              <p class="titulo">SCEN</p>
              <div class="column">
                <div class="col q-gutter-md">
                  <q-input
                    required
                    color="blue"
                    bg-color="white"
                    filled
                    v-model="form.username"
                    :label="$t('Login.user')"
                    :rules="[val => !!val || $t('Login.blank_user')]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="perm_identity" />
                    </template>
                  </q-input>
                  <q-input
                    color="blue"
                    standout
                    bg-color="white"
                    filled
                    v-model="form.password"
                    :label="$t('Login.password')"
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[val => !!val || $t('Login.blank_pass')]"
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
        </div>
        <user-logout ref="component"></user-logout>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { api } from 'boot/axios';
import { LocalStorage } from 'quasar';
import { useQuasar } from "quasar";
import userLogoutVue from "src/components/userLogout.vue";

export default {
  components: { "user-logout": userLogoutVue },
  name: 'PageLogin',
  data() {
    return {
      routes: [],
      form: {
        username: "",
        password: "",
      },
      isPwd: true,
      remember: true,
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      isNotAuthenticated() {
        $q.notify({
          message: "Usuario o Contraseña Invalida",
          color: "red",
        });
      },
    };
  },
  methods: {
    onSubmit() {
      LocalStorage.set('usuario', this.form.username)
      api.post(`/usuarios/login`, this.form)
        .then((res) => {
          if ((res.status = 201)) {
            LocalStorage.set('token', `${res.data.data.accessToken}`),
            LocalStorage.set('user', true),
            LocalStorage.set('username', `${res.username}`),
            LocalStorage.set('refreshToken', `${res.data.data.refreshToken}`),
            this.$router.push('/dashboard');
            this.$refs.component.login()
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "404")) {
            this.isNotAuthenticated()
            this.onReset()
          }
        });
    },
    onReset() {
      this.form.username = '';
      this.form.password = '';
    },
  },
};
</script>

<style>
  body .login {
    /* background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(0, 194, 255, 1) 56%,
      rgba(20, 10, 219, 1) 100%
    );*/
    background: linear-gradient(
      90deg,
      rgba(20, 139, 247) 0%,
      rgba(0, 167, 172) 47%,
      rgba(10, 102, 191) 61%,
      rgba(1, 48, 102) 100%
    );
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
