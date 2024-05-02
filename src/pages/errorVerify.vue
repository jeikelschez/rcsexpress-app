<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <q-img src="images/logo_rcs.png" style="width:350px; align-self: center; margin-bottom: 40px;"/>
      <div style="font-size: 36px">Error al acceder al sistema de Usuarios</div>
      <q-btn
        size="22px"
        class="q-mt-xl"
        color="primary"
        text-color="white"
        unelevated
        href="https://rcsexpress.com"
        label="Volver a RCS Express"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error404",
});
</script>
