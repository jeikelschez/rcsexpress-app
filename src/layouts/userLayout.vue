<template>
  <q-layout view="hHh lpR fFf">
    <!-- Encabezado de la pagina -->
    <q-header elevated>
      <q-toolbar class="bg-indigo-9">
        <!-- Titulo -->
        <q-toolbar-title style="font-size: 18px"
          >Rastreo de Encomiendas</q-toolbar-title
        >
        <q-space></q-space>
        <q-space></q-space>
        <q-toolbar-title style="font-size: 14px; text-align: right">{{
          title
        }}</q-toolbar-title>
        <q-btn flat dense>
          <q-avatar size="42px">
            <img src="~assets/avatar.jpg" />
          </q-avatar>
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
            auto-close
          >
            <q-list style="min-width: 100px">
              <q-item clickable v-ripple @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Cerrar Sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <router-view @change-Title="changeTitle"></router-view>

    <!-- Pie de Pagina -->
    <q-footer elevated bordered>
      <div class="text-caption float-right items-center creditos">
        <p style="font-size: 12px; margin-right: 20px; padding-top: 16px">
          <strong>© 2022. LOS DERECHOS RESERVADOS. RCS EXPRESS</strong>
        </p>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { SessionStorage } from "quasar";

export default {
  emits: ["changeTitle"],
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    if (SessionStorage.getItem("user") != true) {
      this.$router.push("/userLogin");
    }
  },

  methods: {
    logout() {
      SessionStorage.remove("user");
      this.$router.push("/userLogin");
    },
    changeTitle(text) {
      this.title = text;
    },
  },
};
</script>
