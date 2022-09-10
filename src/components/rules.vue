<template></template>

<script>
import { ref } from "vue";

import { useQuasar } from "quasar";

export default {
  name: "rules",
  setup() {
    const showSimulatedReturnData = ref(false);
    const $q = useQuasar();
    return {
      showSimulatedReturnData,
    };
  },
  methods: {
    // Reglas
    isReq(val, reason) {
      if (val == null || val.trim() == "") {
        return reason;
      } else {
        return true;
      }
    },

    isMax(val, max, reason) {
      if (val.length > max) {
        return reason;
      } else {
        return true;
      }
    },

    isMin(val, min, reason) {
      if (val !== null || val !== "") {
      if (val.length < min) {
        return reason;
      } else {
        return true;
      }
    }
    },
  },
};
</script>
