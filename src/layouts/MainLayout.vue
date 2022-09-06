<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Encabezado de la pagina -->
    <q-header elevated>
      <q-toolbar class="bg-indigo-9">
        <!-- Boton para expandir Menu -->
        <q-btn flat dense round @click="this.hideItems(); this.drawerClick()" icon="menu" aria-label="Menu"
          class="q-mr-sm" />
        <!-- Titulo -->
        <q-toolbar-title class="titleMainLayout">SCEN - Sistema de Control de Encomiendas</q-toolbar-title>
        <q-space></q-space>
        <!-- Boton para acceder a manuales -->
        <q-btn dense color="white" round style="margin-right: 10px" clickable to="/m_bancos" padding="xs">
          <q-icon size="20px" name="question_mark" color="primary"> </q-icon>
        </q-btn>
        <!-- Boton usuario y Logout -->
        <q-btn flat dense>
          <q-avatar size="42px">
            <img :src="url" />
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
                <q-item v-if=item.qitem clickable tag="a" :to=item.url exact>
                  <q-item-section avatar>
                    <q-icon size="28px" :name=item.icon />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <!-- LEVEL 0 / Q-EXPANSION-ITEMS -->
                <q-expansion-item v-else expand-separator :icon=item.icon group="somegroup" default-opened
                  :label=item.label v-model=item.model>
                  <!-- MENUS LEVEL 1 -->
                  <div v-for="item2 in items">
                    <div v-if="item2.level == 1 && item.name == item2.padre">
                      <!-- LEVEL 1 / Q-ITEMS -->
                      <div v-if=item2.qitem class="q-pl-lg">
                        <q-item clickable tag="a" :to=item2.url exact>
                          <q-item-section avatar>
                            <q-icon size="28px" :name=item2.icon />
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
                        group="somegroup2" default-opened :icon=item2.icon :label=item2.label v-model=item2.model>
                        <!-- LEVEL 2 / Q-ITEMS -->
                        <div v-for="item3 in items">
                          <div v-if="item3.level == 2 && item2.name == item3.padre">
                            <q-item clickable tag="a" :to=item3.url exact>
                              <q-item-section avatar>
                                <q-icon size="28px" :name=item3.icon />
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
    <keep-alive>
      <router-view @mouseover="this.hideItems(); this.miniState = true" />
    </keep-alive>

    <!-- Contenedor de las paginas -->
    <q-page-container style="padding-bottom: 0px; padding-top: 37px">
    </q-page-container>

    <!-- Pie de Pagina -->
    <q-footer elevated bordered>
      <div v-for="item4 in directs" class="float-left buttons"
        style="margin-top: 10px; margin-bottom: 10px; margin-left: 15px">
        <q-btn v-show="item4.direct" dense color="white" round class="button" clickable :to=item4.url exact
          padding="xs">
          <q-icon size="25px" :name=item4.icon color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">{{ item4.label }}</q-tooltip>
          </q-icon>
        </q-btn>

        <!-- <q-btn dense color="white" round class="button" style="margin-right: 15px" clickable to="/empleados"
          padding="xs">
          <q-icon size="25px" name="groups" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Empleados</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense class="button1" color="white" round style="margin-right: 15px" clickable to="/retenciones"
          padding="xs">
          <q-icon size="25px" name="block" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Retenciones</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" round class="button2" style="margin-right: 10px" clickable to="/asignacionguias"
          padding="xs">
          <q-icon size="25px" name="auto_stories" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Asignación Guias</q-tooltip>
          </q-icon>
        </q-btn>
        
        <strong style="margin-right: 10px" class="button3">|</strong>
        
        <q-btn dense color="white" round style="margin-right: 15px" clickable class="button4" to="/clientes"
          padding="xs">
          <q-icon size="25px" name="face" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Clientes</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" round style="margin-right: 10px" clickable class="button5" to="/proveedores"
          padding="xs">
          <q-icon size="25px" name="support_agent" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Proveedores</q-tooltip>
          </q-icon>
        </q-btn>
        
        <strong style="margin-right: 10px" class="button6">|</strong>
        
        <q-btn dense color="white" round style="margin-right: 15px" clickable class="button7" to="/registrodecostos"
          padding="xs">
          <q-icon size="25px" name="local_shipping" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Costos Transporte</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" round style="margin-right: 10px" clickable class="button8" to="/pruebasentrega"
          padding="xs">
          <q-icon size="25px" name="assignment_turned_in" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Pruebas de Entrega</q-tooltip>
          </q-icon>
        </q-btn>
        
        <strong style="margin-right: 10px" class="button9">|</strong>
        
        <q-btn dense color="white" class="button10" round style="margin-right: 15px" clickable
          to="/registroserviciocarga" padding="xs">
          <q-icon size="25px" name="menu_book" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Registro Servicio de Carga</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" class="button11" round style="margin-right: 15px" clickable to="/facturacioncredito"
          padding="xs">
          <q-icon size="25px" name="request_quote" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Facturación</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" round class="button12" style="margin-right: 10px" clickable to="/anulacionguias"
          padding="xs">
          <q-icon size="25px" name="close" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Anulación Guias/Facturas</q-tooltip>
          </q-icon>
        </q-btn>
        
        <strong style="margin-right: 10px" class="button13">|</strong>
        
        <q-btn dense color="white" class="button14" round style="margin-right: 15px" clickable to="/notasdebito"
          padding="xs">
          <q-icon size="25px" name="send_and_archive" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Emision Notas Debito</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" round style="margin-right: 15px" clickable class="button15" to="/notascredito"
          padding="xs">
          <q-icon size="25px" name="send" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Emision Notas Credito</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" round style="margin-right: 10px" clickable class="button16" to="/notascredito"
          padding="xs">
          <q-icon size="25px" name="close" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Anulación de Notas</q-tooltip>
          </q-icon>
        </q-btn>
        
        <strong style="margin-right: 10px" class="button17">|</strong>
        
        <q-btn dense color="white" class="button18" round style="margin-right: 15px" clickable to="/cuentasporcobrar"
          padding="xs">
          <q-icon size="25px" name="price_check" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Generar Cobranza</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" round class="button19" style="margin-right: 15px" clickable to="/cuentasporpagar"
          padding="xs">
          <q-icon size="25px" name="attach_money" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Ingreso de CXP</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" class="button20" round style="margin-right: 10px" clickable
          to="/controlpagosproveedores" padding="xs">
          <q-icon size="25px" name="insert_chart" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Control Pago Proveedores</q-tooltip>
          </q-icon>
        </q-btn>
        
        <strong style="margin-right: 10px" class="button21">|</strong>
        
        <q-btn dense color="white" round class="button22" style="margin-right: 15px" clickable to="/generarcomisiones"
          padding="xs">
          <q-icon size="25px" name="receipt_long" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Comisiones Entrega</q-tooltip>
          </q-icon>
        </q-btn>
        
        <q-btn dense color="white" class="button23" round style="margin-right: 15px" clickable to="/pagocomisiones"
          padding="xs">
          <q-icon size="25px" name="paid" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Pago de Comisiones</q-tooltip>
          </q-icon>
        </q-btn>-->
      </div>
      <div class="text-caption float-right items-center creditos">
        <p style="font-size: 12px; margin-right: 20px; padding-top: 16px">
          <strong>© 2019. LOS DERECHOS RESERVADOS. RCS EXPRESS</strong>
        </p>
      </div>
      <user-logout ref="component"></user-logout>
      <desactivate-crud ref="desactivateCrud" @desactivar-Opciones-Set="desactivarOpcionesSet"></desactivate-crud>
    </q-footer>
  </q-layout>
  <methods ref="methods" @set-Data="setData"></methods>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { defineComponent, defineAsyncComponent } from "vue";
import desactivateCrudVue from "src/components/desactivateCrud.vue";
import userLogoutVue from "src/components/userLogout.vue";
import methodsVue from 'src/components/methods.vue';

export default {
  components: {
    "desactivate-crud": desactivateCrudVue,
    "user-logout": userLogoutVue,
    "methods": methodsVue
  },
  data() {
    return {
      directs: [],
      items: [],
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      permisos: [
        "r_bancos",
        "r_agencias",
        "r_ciudades",
        "r_permisos",
        "r_usuarios",
        "r_roles",
        "r_agentes",
        "r_zonas",
        "r_unidades",
        "r_ayudantes",
        "r_receptores",
        "r_tarifas",
        "r_ccorrelativo",
        "r_vcontrol",
        "r_cuentas",
        "r_clientes",
        "r_empleados",
        "r_proveedores",
        "r_retenciones",
        "r_concepto_operacion",
        "r_concepto_facturacion",
        "r_concepto_fpo",
        "r_asignacionguias",
      ],
      drawer: false,
      miniState: false,
      intervalLogout: null,
      dashboard: this.$t("Menu.dashboard"),
      picture:
        "https://www.thepeakid.com/wp-content/uploads/2016/03/default-profile-picture.jpg",
    };
  },
  setup() {
    const url = ref("https://joshuaproject.net/assets/img/chatbot/default.jpg");
    return {
      url,
    };
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetLogoutTimer);
    }, this);
    this.resetLogoutTimer();
    this.miniState = true;
    this.Authenticator();
    this.refreshTimer();
    this.$refs.desactivateCrud.desactivarOpciones("desactivarOpcionesSet");
    this.getData('/menus', 'setData', 'items', {
        headers: {
          Authorization: ``
        },
      })
    this.getData('/menus', 'setData', 'directs', {
        headers: {
          Authorization: ``,
          direct: 1
        },
      })
  },

  methods: {
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    setData(res, dataRes) {
      console.log(res)
      this[dataRes] = res
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
    desactivarOpcionesSet(permisos) {
      var permisos = permisos;
      for (var e = 0, len = permisos.length; e < len; e++) {
        if (permisos[e].permiso == true) {
          this[permisos[e].pagina] = true;
          this[permisos[e].paginaSet] = false;
        }
        if (e == permisos.length - 1) break;
      }
    },
    Authenticator() {
      if (LocalStorage.getItem("user") != true) {
        this.$router.push("/login");
      }
    },
    logout() {
      this.$refs.component.logoutUser();
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
            _this.$refs.component.logoutUser();
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
        this.items[i].model = false
      };
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

@media screen and (max-width: 680px) {
  .creditos {
    display: none;
  }
}

@media screen and (max-width: 680px) {
  .buttons {
    text-align: center;
  }
}

@media screen and (max-width: 680px) {
  .float-left {
    float: inherit;
  }
}

@media screen and (max-width: 1265px) {
  .button23 {
    display: none;
  }
}

@media screen and (max-width: 1215px) {
  .button22 {
    display: none;
  }

  .button21 {
    display: none;
  }
}

@media screen and (max-width: 1156px) {
  .button20 {
    display: none;
  }
}

@media screen and (max-width: 1110px) {
  .button19 {
    display: none;
  }
}

@media screen and (max-width: 1065px) {
  .button18 {
    display: none;
  }

  .button17 {
    display: none;
  }
}

@media screen and (max-width: 1000px) {
  .button16 {
    display: none;
  }
}

@media screen and (max-width: 956px) {
  .button15 {
    display: none;
  }
}

@media screen and (max-width: 913px) {
  .button14 {
    display: none;
  }

  .button13 {
    display: none;
  }
}

@media screen and (max-width: 852px) {
  .button12 {
    display: none;
  }
}

@media screen and (max-width: 805px) {
  .button11 {
    display: none;
  }
}

@media screen and (max-width: 803px) {
  .button12 {
    display: none;
  }
}

@media screen and (max-width: 757px) {
  .button10 {
    display: none;
  }

  .button9 {
    display: none;
  }
}

@media screen and (max-width: 697px) {
  .button8 {
    display: none;
  }
}

@media screen and (max-width: 321px) {
  .button6 {
    display: none;
  }

  .button3 {
    display: none;
  }
}

@media screen and (max-width: 298px) {
  .button7 {
    display: none;
  }
}

@media screen and (max-width: 1012px) {
  .titleMainLayout {
    display: none;
  }
}
</style>
