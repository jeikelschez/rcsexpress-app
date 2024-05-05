<template>
  <q-page class="q-pa-md">
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import methodsVue from "src/components/methods.vue";
import { SessionStorage } from "quasar";

export default {
  components: { methods: methodsVue },
  data() {
    return {};
  },
  setup() {
    const $q = useQuasar();
    return {};
  },
  mounted() {
    // Verifico que cliente Exista
    api
      .get(`clientes/verify/${SessionStorage.getItem("clientId")}`, {})
      .then((res) => {
        this.$emit("changeTitle", res.data.nb_cliente);
      });
  },
  methods: {},
};
</script>
