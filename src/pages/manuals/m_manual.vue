<template>
  <q-page class="paginaManual q-pa-md">
    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="row">
          <div
            class="col-md-12 col-xs-12 text-secondary"
            style="align-self: center; text-align: left"
          >
            <h4 style="font-size: 32px">
              <strong>MANUAL DE USO Y CONTROL - INSTRUCCIONES</strong>
            </h4>
          </div>
          <q-toolbar
            class="bg-primary text-white shadow-2 rounded-borders col-md-12 col-xs-12"
            style="padding: 15px"
          >
            <q-btn
              flat
              round
              dense
              icon="menu"
              class="col-md-1 col-xs-1 hideMenuManual"
              style="margin-right: 20px"
            />

            <q-separator class="hideSeparatorManual" dark vertical inset />

            <q-input
              v-model="filter"
              class="col-md-10 col-xs-10 inputManual"
              rounded
              color="white"
              dark
              dense
              outlined
              standout
              type="search"
              label="¿Necesitas algo? Buscalo"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>
        </div>
        <div class="col-md-12 col-xs-12" style="margin-top: 30px" >
          <q-card class="my-card">
            <q-img src="~assets/bancos.png"> </q-img>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { defineComponent, defineAsyncComponent } from "vue";
import userLogoutVue from "src/components/userLogout.vue";

export default defineComponent({
  name: "Manual",
  components: {
    "user-logout": userLogoutVue,
  },
  data() {
    return {
      drawer: false,
      miniState: false,
      dashboard: this.$t("Menu.dashboard"),
      picture:
        "https://www.thepeakid.com/wp-content/uploads/2016/03/default-profile-picture.jpg",
    };
  },
  setup() {
    return {
      desplegable: ref(false),
      desplegable: ref(false),
      desplegable2: ref(false),
      desplegable3: ref(false),
      segundo: ref(false),
      tercero: ref(false),
      cuarto: ref(false),
      quinto: ref(false),
      sexto: ref(false),
      septimo: ref(false),
      octavo: ref(false),
      noveno: ref(false),
      decimo: ref(false),
      decimoprimero: ref(false),
      decimosegundo: ref(false),
      decimotercero: ref(false),
      decimocuarto: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.miniState = true;
    this.drawer = true;
  },
  methods: {
    drawerClick() {
      if (this.miniState) {
        this.miniState = false;
        this.drawer = true;
      } else {
        this.miniState = true;
        this.drawer = true;
      }
    },
  },
});
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
</style>
