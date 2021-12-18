<template>
  <q-page padding id="Contacts">

        <q-dialog v-model="alert">
<q-card class="q-pa-md" bordered style="width: 999px" >
      <q-card-section>
        <q-form
      @submit="onSubmit"
      @reset="onReset"
    >

<div class="row">

<div class="col-md-6 col-xs-12">
   <q-input
        outlined
        v-model="name"
        label="Nombre"
        hint=""
        class="pcform"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Por favor escribe un nombre']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-6 col-xs-12">
      <q-input
        outlined
        v-model="telefono"
        label="Telefono"
        hint=""
        lazy-rules
        mask="phone"
        :rules="[ val => val && val.length > 0 || 'Inserta un telefono valido']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-12">
      <q-input
        outlined
        v-model="fax"
        label="Fax"
        hint=""
        lazy-rules
        mask="####-#######################"
        :rules="[ val => val && val.length > 0 || 'Inserta un Fax valido']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-6 col-xs-12">
      <q-input
        outlined
        v-model="codigopostal"
        label="Codigo Postal"
        hint=""
        class="pcform"
        lazy-rules
        mask="##########"
        :rules="[ val => val && val.length > 0 || 'Inserta un codigo postal valido']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-6 col-xs-12">
      <q-input
        outlined
        v-model="mail"
        label="Correo Electronico"
        hint=""
        type="email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Inserta un correo valido']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

</div>

    </q-form>
</q-card-section>

<div class="full-width row justify-center items-center content-center"
      style="margin-bottom:10px">
        <q-btn label="Agregar cliente" type="submit" color="primary"
        class="col-md-5 col-sm-5 col-xs-12" icon="person_add"/>
        <q-btn label="Cerrar" type="close" color="primary" flat
        class="col-md-5 col-sm-5 col-xs-12 btnmovil" icon="close" v-close-popup/>
      </div>

</q-card>
        </q-dialog>

    <div class="row q-pa-sm justify-center"
    >
      <div class="col-md-11 col-xl-9 col-lg-9 col-xs-12 col-sm-12">
        <div class="row">
          <div class="col-md-3 col-xs-12" style="align-self: center;text-align: center;
          margin-right:16px">
            <h4>Lista de clientes</h4>
          </div>
          <div class="col-md-6 col-sm-7 col-xs-6" style="align-self: center;margin-right:20px">
            <q-input
              v-model="search"
              rounded
              outlined
              standout
              type="search"
              label="Busqueda avanzada"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div class="col-md-2 col-sm-4 col-xs-5" style="text-align: center;align-self: center;">
            <q-btn
              label="Crear Contacto"
              rounded
              color="primary"
              @click="alert = true"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md">
          <div class="q-gutter-y-md">

                  <div bordered flat class="my-card row">

                    <q-table
                      :data="contacts"
                      :rows="rows"
                      row-key="name"
                      :columns= "columns"
                      :separator="separator"
                      class="my-sticky-header-table"
                      :loading="loadingTable"
                      style="width:100%"
                      :grid="$q.screen.xs"
                      v-model:pagination="pagination"
                      hide-pagination
                    >
                    <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="primary"
              @click="onEdit(props.row)"
              icon="edit"></q-btn>
              <q-btn dense round flat color="primary"
              @click="onDelete(props.row)"
              icon="delete"></q-btn>
            </q-td>
          </template>
                    </q-table>

                    <!-- fin q-table-->
                  </div>
                  <div class="full-width row justify-center items-center content-center"
      style="margin-top:25px">
                <q-pagination
                  v-model="pagination.page"
                  color="primary"
                  :max="pagesNumber"
                  size="md"
      />
        <!-- <q-btn  label="Guardar" type="submit" color="primary" icon="save"
        class="col-md-2 col-sm-3 col-xs-12 btnmovil"/>
        <q-btn label="Insertar" type="" color="primary" flat icon="person_add"
         class="col-md-2 col-sm-3 col-xs-12 btnmovil"/>
        <q-btn label="Eliminar" type="reset" color="primary"
        icon="person_remove" class="col-md-2 col-sm-3 col-xs-12 btnmovil"/> -->
      </div>

          </div>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="showEditDialog"
      transition-show="scale"
      transition-hide="scale"
    >
      <ContactEdit
        :action="selectedAction"
        :contact="selectedContact"
        @record-saved="onRecordSaved()"
        @record-not-deleted="onRecordNotDeleted()"
      />
    </q-dialog>

  </q-page>
</template>

<script>
import { ref, computed } from 'vue';

import { api } from 'boot/axios';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true,
  },
  {
    name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true,
  },
  {
    name: 'carbs', label: 'Carbs (g)', field: 'carbs',
  },
  {
    name: 'protein', label: 'Protein (g)', field: 'protein',
  },
  {
    name: 'sodium', label: 'Sodium (mg)', field: 'sodium',
  },
  {
    name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'actions', label: 'Opciones', field: '', align: 'center',
  },
];

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%',
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%',
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%',
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%',
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%',
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%',
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%',
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%',
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%',
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%',
  },
];

export default {
  name: 'PageLogin',
  data() {
    return {
      isAuthenticated: false,
      routes: [],
      user: '',
      pass: '',
      isPwd: true,
      remember: true,
    };
  },
  setup() {
    const onEdit = (row) => {
      console.log(`Editing row - '${row.name}'`);
    };

    const onDelete = (row) => {
      console.log(`Deleting row - '${row.name}'`);
    };
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 2,
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      separator: ref('vertical'),
      label: ref('Click me'),
      label2: ref('Also click me'),
      alert: ref(false),
      selected: ref([]),
      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage)),
      columns,
      pagination,
      rows,
      onEdit,
      onDelete,
    };
  },
  mounted() {
    api.get('/products')
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        console.log('error');
      });
  },
};
</script>
