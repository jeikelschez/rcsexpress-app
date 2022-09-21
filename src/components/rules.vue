<template></template>

<script>
import { useQuasar } from "quasar";
import moment from "moment";

export default {
  name: "rules",
  setup() {
    const $q = useQuasar();
  },
  methods: {
    // Reglas
    isReq(val, reason) {
      var ret = true;
      if (val == null || val.trim() == "") ret = `Valor Requerido`;
      if (ret !== true && reason == "") ret == "";
      return ret;
    },
    isReqSelect(val, reason) {
      var ret = true;
      if (val == null || val == [] || val == "") ret = `Valor Requerido`;
      if (ret !== true && reason == "") ret == "";
      return ret;
    },
    isMax(val, max, reason) {
      if (val !== null) {
        val = val.replace(".", "");
        val = val.replace(",", "");
        var ret = true;
        if (val !== "" && val !== null && val.length > max) ret = `Maximo ${max} Caracteres`;
        if (ret !== true && reason == "") ret == "";
        return ret;
      }
    },
    isMin(val, min, reason) {
      if (val !== null) {
        val = val.replace(".", "");
        val = val.replace(",", "");
        var ret = true;
        if (val !== "" && val !== null && val.length < min) return `Minimo ${min} Caracteres`;
        if (ret !== true && reason == "") ret == "";
        return ret;
      }
    },
    checkDate(val, reason) {
      var ret = true;
      if (moment(val, "DD/MM/YYYY", true)._isValid == false) ret = "Fecha Invalida";
      if (ret !== true && reason == "") ret == "";
      return ret;
    },
  },
};
</script>
