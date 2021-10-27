<template>
<q-page class="q-pa-md">

<h4>Inventario - Tienda</h4>

<div class="q-pa-md q-gutter-sm">

    <q-editor
      v-model="editor"
      :definitions="{
        save: {
          tip: 'Guardar Item',
          icon: 'save',
          label: 'Guardar',
          handler: saveWork
        },
      }"
      :toolbar="[
        ['bold', 'italic', 'strike', 'underline'],
        ['upload', 'save']
      ]"
    />

    <q-card class="row" flat bordered v-for="(item, index) in task" :key= "index">
      <q-card-section class="col" v-html="item.texto" :class="item.estado ? 'tachar'  : ''"/>
      <q-btn flat color="blue" @click="item.estado = !item.estado">Acción</q-btn>
      <q-btn flat color="red" @click="eliminar(index)">Eliminar</q-btn>
    </q-card>
  </div>

</q-page>

</template>

<script>
export default {
  data() {
    return {
      editor: '',
      task: [
      ],
    };
  },
  methods: {
    saveWork() {
      this.task.push({
        texto: this.editor,
        estado: false,
      });
      this.$q.notify({
        message: 'Guardado en tu equipo',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
      });
    },
    eliminar(index) {
      this.$q.dialog({
        title: 'Cuidado!',
        message: 'Desea eliminar la nota?',
        cancel: true,
        persistent: true,
      }).onOk(() => {
        // console.log('>>>> OK')
        this.task.splice(index, 1);
      });
    },
  },
};
</script>

<style>
  .tachar {
    text-decoration: line-through;
  }
</style>
