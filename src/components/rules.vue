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
      var ret = true;
      if (val == null || val.trim() == "") ret = reason;
      return ret;
    },
    
    isReqSelect(val, reason) {
      var ret = true;
      if (val == null || val == [] || val == "") ret = reason;
      return ret;
    },

    isMax(val, max, reason) {
      console.log(val)
      var ret = true;
      if (val !== "" && val !== null && val.length > max) ret = reason;
      return ret;
    },

    isMin(val, min, reason) {
      var ret = true;
      if (val !== "" && val !== null && val.length < min) return reason;
      return ret;
    },
  },
};
</script>
