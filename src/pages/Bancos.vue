<template>
<q-page class="q-pa-md">

<div class="q-pa-md" style="margin-top:-35px">

  <h2 style="monospace;font-size: 30px;letter-spacing: 4pt;word-spacing: -4.2pt;">
  Mantenimiento - Bancos </h2>

<q-card class="my-card sombra_svg" bordered style="margin-left: 20px, margin-right:20px,">
      <q-card-section>
        <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        outlined
        v-model="name"
        label="Nombre"
        hint=""
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escribe un nombre']"
      />

      <q-input
        outlined
        v-model="telefono"
        label="Telefono"
        hint=""
        lazy-rules
        mask="phone"
        :rules="[ val => val && val.length > 0 || 'Inserta un telefono valido']"
      />

      <q-input
        outlined
        v-model="fax"
        label="Fax"
        hint=""
        lazy-rules
        mask="####-#######################"
        :rules="[ val => val && val.length > 0 || 'Inserta un Fax valido']"
      />

      <q-input
        outlined
        v-model="codigopostal"
        label="Codigo Postal"
        hint=""
        lazy-rules
        mask="##########"
        :rules="[ val => val && val.length > 0 || 'Inserta un codigo postal valido']"
      />

      <q-input
        outlined
        v-model="mail"
        label="Correo Electronico"
        hint=""
        type="email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Inserta un correo valido']"
      />
    </q-form>
</q-card-section>
</q-card>

<div class="full-width row wrap justify-center items-center content-center"
      style="margin-top:30px">
        <q-btn label="Guardar" type="submit" color="primary"/>
        <q-btn label="Eliminar" type="reset" color="primary" flat class="q-ml-sm" />
        <q-btn label="Insertar" type="" color="primary" flat class="q-ml-sm"/>
        <q-btn label="Cerrar" type="close" color="primary" flat class="q-ml-sm" />
      </div>

  </div>

  <div class="full-width row wrap justify-center items-center content-center"
  style="margin-top:5px, margin-bottom:5px">
    <q-pagination
      v-model="current"
      :max="5"
      direction-links
      boundary-links
      icon-first="skip_previous"
      icon-last="skip_next"
      icon-prev="fast_rewind"
      icon-next="fast_forward"
    />
</div>

</q-page>

</template>

<script>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

export default {
  setup() {
    const $q = useQuasar();
    const name = ref(null);
    const codigopostal = ref(null);
    const telefono = ref(null);
    const fax = ref(null);
    const direccion = ref(null);
    const age = ref(null);
    const accept = ref(false);
    const mail = ref(null);

    return {
      name,
      mail,
      direccion,
      telefono,
      codigopostal,
      current: ref(3),
      fax,
      age,
      accept,

      onSubmit() {
        if (accept.value !== true) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Enviado',
          });
        }
      },

      onReset() {
        name.value = null;
        name.value = null;
        mail.value = null;
        direccion.value = null;
        telefono.value = null;
        codigopostal.value = null;
        fax.value = null;
        accept.value = false;
      },
    };
  },
};
</script>
