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

<div class="col-md-5 col-xs-12">
   <q-input
        outlined
        v-model="form.name"
        label="Nombre"
        hint=""
        class="pcform"
        lazy-rules
        :rules="[val => !!val || 'Por favor escribe un nombre']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-7 col-xs-12">
      <q-input
        outlined
        v-model="form.price"
        label="Direccion"
        hint=""
        lazy-rules
        :rules="[val => !!val ||  'Inserta una direccion valida']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-6 col-xs-12">
      <q-input
        outlined
        v-model="fax"
        label="Fax"
        class="pcform"
        hint=""
        lazy-rules
        mask="####-#####"
        :rules="[val => !!val || 'Inserta un Fax valido']">
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
        mask="(###) ### - ####"
        :rules="[val => !!val || 'Inserta un telefono valido']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-5 col-xs-12">
      <q-input
        outlined
        v-model="codigopostal"
        label="Codigo Postal"
        hint=""
        class="pcform"
        lazy-rules
        mask="##########"
        :rules="[val => !!val || 'Inserta un codigo postal valido']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-7 col-xs-12">
      <q-input
        outlined
        v-model="form.image"
        label="Correo Electronico"
        hint=""
        type="email"
        lazy-rules
        :rules="[val => !!val || 'Inserta un correo valido']">
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
        <q-btn label="Agregar Banco" type="submit"
        v-on:click="createDato(); getdatos();"
        color="primary" v-close-popup @click.capture="contactoAñadido"
        class="col-md-5 col-sm-5 col-xs-12" icon="person_add"/>
        <q-btn label="Cerrar" type="close" color="primary" flat
        class="col-md-5 col-sm-5 col-xs-12 btnmovil" icon="close" v-close-popup/>
      </div>

</q-card>
        </q-dialog>

        <q-dialog v-model="alert2">
<q-card class="q-pa-md" bordered style="width: 999px" >
      <q-card-section>
        <q-form
      @submit="onSubmit"
      @reset="onReset"
    >

<div class="row">

<div class="col-md-5 col-xs-12">
   <q-input
        outlined
        v-model="formedit.name"
        label="Nombre"
        hint=""
        class="pcform"
        lazy-rules
        :rules="[val => !!val || 'Por favor escribe un nombre']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-7 col-xs-12">
      <q-input
        outlined
        v-model="formedit.price"
        label="Direccion"
        hint=""
        lazy-rules
        :rules="[val => !!val || 'Inserta un telefono valido']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-6 col-xs-12">
      <q-input
        outlined
        v-model="fax"
        label="Fax"
        hint=""
        class="pcform"
        lazy-rules
        mask="####-#######################"
        :rules="[val => !!val || 'Inserta un Fax valido']">
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
        mask="(###) ### - ####"
        :rules="[val => !!val || 'Inserta un Fax valido']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-5 col-xs-12">
      <q-input
        outlined
        v-model="codigopostal"
        label="Codigo Postal"
        hint=""
        class="pcform"
        lazy-rules
        mask="##########"
        :rules="[val => !!val || 'Inserta un codigo postal valido']">
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
        </q-input>
</div>

<div class="col-md-7 col-xs-12">
      <q-input
        outlined
        v-model="mail"
        label="Correo Electronico"
        hint=""
        type="email"
        lazy-rules
        :rules="[val => !!val || 'Inserta un correo valido']">
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
        <q-btn label="Editar Banco" type="submit"
        v-on:click="putDato(); getdatos();" @click.capture="contactoEditado"
        color="primary" v-close-popup
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
          <div class="col-md-4 col-xs-12" style="align-self: center;text-align: center;
          margin-right:16px">
            <h4>Mantenimiento - Bancos</h4>
          </div>
          <div class="col-md-5 col-sm-7 col-xs-6" style="align-self: center;margin-right:20px">
            <q-input
              v-model="filter"
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
              label="Insertar Banco"
              rounded
              color="primary"
              @click="alert = true"
              @click.capture="resetForm"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md">
          <div class="q-gutter-y-md">

                  <div bordered flat class="my-card row">

                    <q-table
                      :rows="datos"
                      row-key="id"
                      :columns= "columns"
                      :separator="separator"
                      class="my-sticky-header-table"
                      :loading="loadingTable"
                      :filter="filter"
                      style="width:100%"
                      :grid="$q.screen.xs"
                      v-model:pagination="pagination"
                    >
                    <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn dense round flat color="primary"
              icon="edit" @click="selectedEdit = props.row.id; getdatosedit(selectedEdit);
              alert2=true"></q-btn>
              <q-btn dense round flat color="primary"
              icon="delete" @click="selected = props.row.id; getdatos();"
              @click.capture="small = true"></q-btn>
        </q-td>
      </template>
      <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card :class="props.selected ? 'bg-grey-2' : ''">
    <!--             <q-card-section>
                  <q-checkbox dense v-model="props.selected" :label="props.row.name"></q-checkbox>
                  {{props.row.name}}
                </q-card-section>
                <q-separator></q-separator> -->
                <q-list dense>
                  <q-item v-for="col in props.cols" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-chip v-if="col.name === 'status'"
                        :color="props.row.status == 'Active' ? 'green':
                        props.row.status == 'Disable' ? 'red': 'grey'"
                        text-color="white"
                        dense
                        class="text-weight-bolder"
                        square
                      >{{col.value}}</q-chip>
                      <q-btn v-else-if="col.name === 'action'" dense round flat color="primary"
              icon="edit" @click="selectedEdit = props.row.id; getdatosedit(selectedEdit);
              alert2=true"></q-btn>
              <q-chip v-if="col.name === 'status'"
                        :color="props.row.status == 'Active' ? 'green':
                        props.row.status == 'Disable' ? 'red': 'grey'"
                        text-color="white"
                        dense
                        class="text-weight-bolder"
                        square
                      >{{col.value}}</q-chip>
                      <q-btn v-else-if="col.name === 'action'" dense round flat color="primary"
              icon="delete" @click="selected = props.row.id; getdatos();"
              @click.capture="small = true"></q-btn>
                      <q-item-label v-else caption
                      :class="col.classes ? col.classes : ''">{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
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
      v-model="small"
    >
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5"
          style="font-size:18px;">¿Estas seguro que quieres eliminar este elemento?</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup/>
          <q-btn flat label="Aceptar" color="primary" v-close-popup
          @click.capture="contactoEliminado"
          @click="deletedato(selected); getdatos(); "/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { ref } from 'vue';

import { api } from 'boot/axios';

import { useQuasar } from 'quasar';

export default {
  name: 'PageLogin',
  data() {
    return {
      columns: [
        {
          name: 'id',
          label: 'Codigo',
          field: 'id',
          align: 'left',
          sortable: true,
        },
        {
          name: 'name',
          label: 'Nombre',
          field: 'name',
          align: 'left',
          sortable: true,
        },
        {
          name: 'price',
          label: 'Telefono',
          field: 'price',
          align: 'left',
          sortable: true,
        },
        {
          name: 'price',
          label: 'Fax',
          field: 'price',
          align: 'left',
          sortable: true,
        },
        {
          name: 'price',
          label: 'Codigo postal',
          field: 'price',
          align: 'left',
          sortable: true,
        },
        {
          name: 'image',
          label: 'Correo electronico',
          field: 'image',
          align: 'left',
          sortable: true,
        },
        {
          name: 'action',
          label: 'Accion',
          align: 'right',
          sortable: true,
        },
      ],
      form: {
        name: '',
        price: '',
        image: '',
      },
      datos: [],
      formedit: [],
      selected: [],
      isAuthenticated: false,
      routes: [],
      user: '',
      pass: '',
      isPwd: true,
      remember: true,
    };
  },
  setup() {
    const $q = useQuasar();
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
      alert2: ref(false),
      pagination,
      contactoAñadido() {
        $q.notify({
          message: 'Contacto añadido exitosamente',
          color: 'green',
        });
      },
      contactoEliminado() {
        $q.notify({
          message: 'Contacto eliminado exitosamente',
          color: 'green',
        });
      },
      contactoEditado() {
        $q.notify({
          message: 'Contacto actualizado exitosamente',
          color: 'green',
        });
      },
      medium: ref(false),
      small: ref(false),
      filter: ref(''),
    };
  },
  mounted() {
    this.getdatos();
  },
  methods: {
    getdatos() {
      api.get('/products')
        .then((res) => {
          this.datos = res.data;
        })
    },
    getdatosedit(selectedEdit) {
      api.get(`/products/${selectedEdit}`)
        .then((res) => {
          this.formedit = res.data;
          console.log(res);
        })
    },
    deletedato(idpost) {
      api.delete(`/products/${idpost}`);
      api.get('/products')
        .then((res) => {
          this.datos = res.data;
        });
    },
    createDato() {
      api.post('/products', this.form);
    },
    editdato(idpost) {
      api.delete(`/products/${idpost}`);
      api.get('/products')
        .then((res) => {
          this.datos = res.data;
        });
    },
    putDato() {
      api.patch(`/products/${this.formedit.id}`, this.formedit);
      api.get('/products')
        .then((res) => {
          this.datos = res.data;
        });
    },
    resetForm() {
      this.form.name = null;
      this.form.price = null;
      this.form.image = null;
    },
  },
};
</script>
