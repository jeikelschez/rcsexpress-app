<template>
  <q-input
    ref="inputRef"
    v-model="value"
    outlined
    label="Amount"
    :error-message="errorMessage"
    :error="!!errorMessage"
  />
</template>

<script>
import { parse, useCurrencyInput } from "vue-currency-input";
import { useField } from "vee-validate";

export default {
  name: "QCurrencyInput",
  props: {
    modelValue: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);
    const { errorMessage, value } = useField("amount");

    return { inputRef, errorMessage, value };
  },
};
</script>
