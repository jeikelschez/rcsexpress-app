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
    isReq(val, ret = false) {
      if (val == null || val.trim() == "")
        return ret !== false ? ret : `Valor Requerido`;
    },
    isReqCurrency(val, ret = false) {
      if (val == null || val.trim() == "" || val.trim() == "0,00" || val.trim() == "0")
        return ret !== false ? ret : `Valor Requerido`;
    },
    isReqSelect(val, ret = false) {
      if (val == null || val == [] || val == "")
        return ret !== false ? ret : `Valor Requerido`;
    },
    isMax(val, max, ret = false) {
      if (val !== null && val !== "" && val.length > max)
        return ret !== false ? ret : `Maximo ${max} Caracteres`;
    },
    isMin(val, min, ret = false) {
      if (val !== null && val !== "" && val.length < min)
        return ret !== false ? ret : `Minimo ${min} Caracteres`;
    },
    checkDate(val, ret = false) {
      if (moment(val, "DD/MM/YYYY", true)._isValid == false)
        return ret !== false ? ret : `Fecha Invalida`;
    },
    checkHour(val, ret = false) {
      if (moment(val, "HH:mm:mm", true)._isValid == false)
        return ret !== false ? ret : `Hora Invalida`;
    },
  },
};
</script>
