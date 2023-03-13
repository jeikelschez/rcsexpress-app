<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Encabezado de la pagina -->
    <q-header elevated>
      <q-toolbar class="bg-indigo-9">
        <!-- Boton para expandir Menu -->
        <q-btn flat dense round @click="
          this.hideItems();
          this.drawerClick();
        " icon="menu" aria-label="Menu" class="q-mr-sm" />
        <!-- Titulo -->
        <q-toolbar-title class="titleMainLayout">{{title}}</q-toolbar-title>
        <q-toolbar-title class="titleMainLayoutMobile">{{titleMobile}}</q-toolbar-title>
        <q-space></q-space>
        <!-- Boton para acceder a manuales -->
        <q-btn dense color="white" round style="margin-right: 10px" clickable to="/m_bancos" padding="xs">
          <q-icon size="20px" name="question_mark" color="primary"> </q-icon>
        </q-btn>
        <!-- Boton usuario y Logout -->
        <q-btn flat dense>
          <q-avatar size="42px">
            <img src="~assets/avatar.jpg" />
          </q-avatar>
          <q-menu transition-show="flip-right" transition-hide="flip-left" auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable v-ripple @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>{{ $t("Menu.logout") }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Menu lateral izquierdo -->
    <q-drawer v-model="drawer" show-if-above :breakpoint="500" bordered :width="350" auto-close
      :mini="!drawer || miniState" @click="miniState = false" content-class="bg-grey-3">
      <q-list>
        <div>
          <q-list class="rounded-borders">
            <!-- Opcion del Dashboard -->
            <!-- MENUS LEVEL 0 -->
            <div v-for="item in items">
              <div v-if="item.level == 0">
                <!-- LEVEL 0 / Q-ITEMS -->
                <q-item v-if="item.qitem" style="margin-top:5px" clickable :to="item.url" :disable=allowOption(item) exact>
                  <q-item-section avatar>
                    <q-icon size="28px" :name="item.icon" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <!-- LEVEL 0 / Q-EXPANSION-ITEMS -->
                <q-expansion-item v-else expand-separator :icon=item.icon group="somegroup" default-opened
                  :label=item.label v-model="items_model[item.name]">
                  <!-- MENUS LEVEL 1 -->
                  <div v-for="item2 in items">
                    <div v-if="item2.level == 1 && item.name == item2.padre">
                      <!-- LEVEL 1 / Q-ITEMS -->
                      <div v-if="item2.qitem" class="q-pl-lg">
                        <q-item clickable :to="item2.url" :disable=allowOption(item2) exact>
                          <q-item-section avatar>
                            <q-icon size="28px" :name="item2.icon" />
                            <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                              transition-show="scale" transition-hide="scale">
                              <div class="tool">{{ item2.label }}</div>
                            </q-tooltip>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ item2.label }}</q-item-label>
                            <q-item-label caption></q-item-label>
                          </q-item-section>
                        </q-item>
                      </div>
                      <!-- LEVEL 1 / Q-EXPANSION-ITEMS -->
                      <q-expansion-item v-else :header-inset-level="0.4" :content-inset-level="0.9" expand-separator
                        group="somegroup2" default-opened :icon=item2.icon :label=item2.label
                        v-model="items_model[item2.name]">
                        <!-- LEVEL 2 / Q-ITEMS -->
                        <div v-for="item3 in items">
                          <div v-if="item3.level == 2 && item2.name == item3.padre">
                            <q-item clickable :to="item3.url" :disable=allowOption(item3) exact>
                              <q-item-section avatar>
                                <q-icon size="28px" :name="item3.icon" />
                                <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                                  transition-show="scale" transition-hide="scale">
                                  <div class="tool">{{ item3.label }}</div>
                                </q-tooltip>
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{ item3.label }}</q-item-label>
                                <q-item-label caption></q-item-label>
                              </q-item-section>
                            </q-item>
                          </div>
                        </div>
                      </q-expansion-item>
                    </div>
                  </div>
                </q-expansion-item>
              </div>
            </div>
            <!-- AQUI TERMINA DINAMICO -->
          </q-list>
        </div>
      </q-list>
    </q-drawer>

    <!-- Detecta cuando el mouse sale del menu y cierra los items -->
    <router-view @change-Title="changeTitle" @mouseover="this.hideItems(); this.miniState = true;">
    </router-view>
    <keep-alive> </keep-alive>

    <!-- Pie de Pagina -->
    <q-footer elevated bordered>
      <div v-for="(item4, index) in directs" class="float-left" style="margin-top: 10px; margin-bottom: 10px; margin-left: 15px">
        <q-btn v-show="item4.direct" dense color="white" round :class="`b${index + 1}`" clickable :to=item4.url exact
          padding="xs" :disable=allowOption(item4)>
          <q-icon size="25px" :name=item4.icon color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">{{ item4.label }}</q-tooltip>
          </q-icon>
        </q-btn>
      </div>
      <div class="text-caption float-right items-center creditos">
        <p style="font-size: 12px; margin-right: 20px; padding-top: 16px">
          <strong>© 2022. LOS DERECHOS RESERVADOS. RCS EXPRESS</strong>
        </p>
      </div>
      <user-logout ref="component"></user-logout>      
    </q-footer>
  </q-layout>
  <methods ref="methods" @set-Data="setData"></methods>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import userLogoutVue from "src/components/userLogout.vue";
import methodsVue from "src/components/methods.vue";

export default {
  emits: ["changeTitle", "mouseover"],
  components: {
    "user-logout": userLogoutVue,
    methods: methodsVue,
  },
  data() {
    return {
      directs: [],
      title: "SCEN - Sistema de Control de Encomiendas",
      titleMobile: "SCEN",
      items: [],
      items_model: {},
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],      
      drawer: false,
      miniState: false,
      intervalLogout: null,
      dashboard: this.$t("Menu.dashboard"),
    };
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetLogoutTimer);
    }, this);
    this.resetLogoutTimer();
    this.miniState = true;
    this.authenticator();
    this.refreshTimer();

    this.getData('/menus', 'setData', 'items', {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        read: 'S'
      },
    })
    this.getData('/menus', 'setData', 'directs', {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        direct: 1,
        read: 'S'
      },
    })
  },

  methods: {
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    setData(res, dataRes) {
      this[dataRes] = res;
    },
    drawerClick() {
      if (this.miniState) {
        this.miniState = false;
        this.drawer = true;
      } else {
        this.miniState = true;
        this.drawer = true;
      }
    },
    // Metodo para validar Permisos, muestra mensaje de error si no tiene permisos
    allowOption(items) {
      if (items.acciones[0].rpermisos.length == 0) {
        return true;
      } else {
        return false;
      }
    },
    authenticator() {
      if (LocalStorage.getItem("user") != true) {
        this.$router.push("/login");
      }
    },
    logout() {
      LocalStorage.remove("user");
      this.$router.push("/login");
    },
    refreshTimer() {
      let _this = this;
      var interval;
      let minutes = 19;
      let currentTime = localStorage.getItem("currentTime");
      let targetTime = localStorage.getItem("targetTime");
      if (targetTime == null && currentTime == null) {
        currentTime = new Date();
        targetTime = new Date(currentTime.getTime() + minutes * 60000);
        localStorage.setItem("currentTime", currentTime);
        localStorage.setItem("targetTime", targetTime);
      } else {
        currentTime = new Date(currentTime);
        targetTime = new Date(targetTime);
      }
      if (!checkComplete()) {
        interval = setInterval(checkComplete, 1000);
      }
      function checkComplete() {
        if (LocalStorage.getItem("user") === true) {
          currentTime = localStorage.getItem("currentTime");
          targetTime = localStorage.getItem("targetTime");
          if (currentTime > targetTime) {
            clearInterval(interval);
            LocalStorage.remove("currentTime");
            LocalStorage.remove("targetTime");
            _this.$refs.component.refreshToken();
            _this.refreshTimer();
          } else {
            currentTime = new Date();
            localStorage.setItem("currentTime", currentTime);
          }
        } else {
          clearInterval(interval);
          LocalStorage.remove("currentTime");
          LocalStorage.remove("targetTime");
          _this.$router.push("/login");
        }
      }
      document.onbeforeunload = function () {
        localStorage.setItem("currentTime", currentTime);
      };
    },
    resetLogoutTimer() {
      clearInterval(this.intervalLogout);
      LocalStorage.remove("currentTimeLogout");
      LocalStorage.remove("targetTimeLogout");
      var currentTime = new Date();
      var targetTime = new Date(currentTime.getTime() + 5 * 60000);
      localStorage.setItem("currentTimeLogout", currentTime);
      localStorage.setItem("targetTimeLogout", targetTime);
      this.logoutTimer();
    },
    logoutTimer() {
      let _this = this;
      let minutes = 5;
      let currentTime = localStorage.getItem("currentTimeLogout");
      let targetTime = localStorage.getItem("targetTimeLogout");
      if (targetTime == null && currentTime == null) {
        currentTime = new Date();
        targetTime = new Date(currentTime.getTime() + minutes * 60000);
        localStorage.setItem("currentTimeLogout", currentTime);
        localStorage.setItem("targetTimeLogout", targetTime);
      } else {
        currentTime = new Date(currentTime);
        targetTime = new Date(targetTime);
      }
      if (!checkComplete()) {
        _this.intervalLogout = setInterval(checkComplete, 1000);
      }
      function checkComplete() {
        if (LocalStorage.getItem("user") === true) {
          currentTime = localStorage.getItem("currentTimeLogout");
          targetTime = localStorage.getItem("targetTimeLogout");
          if (currentTime > targetTime) {
            clearInterval(_this.intervalLogout);
            LocalStorage.remove("currentTimeLogout");
            LocalStorage.remove("targetTimeLogout");
            LocalStorage.remove("user");
            _this.$router.push("/login");
          } else {
            currentTime = new Date();
            localStorage.setItem("currentTimeLogout", currentTime);
          }
        } else {
          clearInterval(_this.intervalLogout);
          LocalStorage.remove("currentTimeLogout");
          LocalStorage.remove("targetTimeLogout");
          _this.$router.push("/login");
        }
      }
      document.onbeforeunload = function () {
        localStorage.setItem("currentTime", currentTime);
      };
    },
    hideItems() {
      for (var i = 0; i < this.items.length - 1; i++) {
        this.items_model[this.items[i].name] = false;
      };
    },
    changeTitle(text, textMobile) {
      this.title = text;
      this.titleMobile = textMobile;
    },
  },
};
</script>

<style>
.q-drawer--standard .q-item.q-router-link--active {
  background: #e3f2ff;
  border-radius: 0 10px 10px 0;
}

.q-tooltip {
  background-color: #eee;
  height: 49px;
  margin-left: 3px;
  margin-top: 2px;
  opacity: 0.8;
}

.tool {
  font-weight: bold;
  font-size: 15px;
  margin-top: 7.5px;
  color: #027be3;
}

@media screen and (max-width: 800px) {
  .creditos {
    display: none;
  }
}

@media screen and (max-width: 1210px) {
  .b18 {
    display: none;
  }
}

@media screen and (max-width: 1160px) {
  .b17 {
    display: none;
  }
}

@media screen and (max-width: 1130px) {
  .b16 {
    display: none;
  }
}

@media screen and (max-width: 1095px) {
  .b15 {
    display: none;
  }
}

@media screen and (max-width: 1061px) {
  .b14 {
    display: none;
  }
}

@media screen and (max-width: 1029px) {
  .b13 {
    display: none;
  }
}

@media screen and (max-width: 993px) {
  .b12 {
    display: none;
  }
}

@media screen and (max-width: 961px) {
  .b11 {
    display: none;
  }
}

@media screen and (max-width: 927px) {
  .b10 {
    display: none;
  }
}

@media screen and (max-width: 897px) {
  .b9 {
    display: none;
  }
}

@media screen and (max-width: 861px) {
  .b8 {
    display: none;
  }
}

@media screen and (max-width: 830px) {
  .b7 {
    display: none;
  }
}

@media screen and (max-width: 358px) {
  .b6 {
    display: none;
  }
}

@media screen and (max-width: 317px) {
  .b5 {
    display: none;
  }
}

@media screen {
  .float-left {
    float: left;
  }
}

@media screen and (max-width: 680px) {
  .buttons {
    text-align: center;
  }
}

@media screen and (max-width: 1012px) {
  .titleMainLayout {
    display: none;
  }
}

@media screen and (min-width: 600px) {
  .titleMainLayoutMobile {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .titleMainLayoutMobile {
    display: block;
  }
}
</style>
