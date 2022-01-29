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
        v-model="form.nb_banco"
        label="Nombre"
        hint=""
        class="pcform"
        lazy-rules
        :rules="[val => !!val || 'Por favor escribe un nombre']">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
        </q-input>
</div>

<div class="col-md-7 col-xs-12">
      <q-input
        outlined
        v-model="form.direccion_banco"
        label="Direccion"
        hint=""
        lazy-rules
        :rules="[val => !!val ||  'Inserta una direccion valida']">
        <template v-slot:prepend>
          <q-icon name="location_on" />
        </template>
        </q-input>
</div>

<div class="col-md-6 col-xs-12">
      <q-input
        outlined
        v-model="form.fax_banco"
        label="Fax"
        class="pcform"
        hint=""
        lazy-rules
        mask="####-#####"
        :rules="[val => !!val || 'Inserta un Fax valido']">
        <template v-slot:prepend>
          <q-icon name="fax" />
        </template>
        </q-input>
</div>

<div class="col-md-6 col-xs-12">
      <q-input
        outlined
        v-model="form.tlf_banco"
        label="Teléfono"
        hint=""
        lazy-rules
        mask="(###) ### - ####"
        :rules="[val => !!val || 'Inserta un teléfono valido']">
        <template v-slot:prepend>
          <q-icon name="phone" />
        </template>
        </q-input>
</div>

<div class="col-md-5 col-xs-12">
      <q-input
        outlined
        v-model="form.cod_postal"
        label="Código Postal"
        hint=""
        class="pcform"
        lazy-rules
        mask="##########"
        :rules="[val => !!val || 'Inserta un código postal valido']">
        <template v-slot:prepend>
          <q-icon name="dialpad" />
        </template>
        </q-input>
</div>

<div class="col-md-7 col-xs-12">
      <q-input
        outlined
        v-model="form.email_banco"
        label="Correo Electrónico"
        hint=""
        type="email"
        lazy-rules
        :rules="[val => !!val || 'Inserta un correo valido']">
        <template v-slot:prepend>
          <q-icon name="email" />
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
        color="primary" v-close-popup
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
        v-model="formedit.nb_banco"
        label="Nombre"
        hint=""
        class="pcform"
        lazy-rules
        :rules="[val => !!val || 'Por favor escribe un nombre']">
        <template v-slot:prepend>
          <q-icon name="person" />
        </template>
        </q-input>
</div>

<div class="col-md-7 col-xs-12">
      <q-input
        outlined
        v-model="formedit.direccion_banco"
        label="Direccion"
        hint=""
        lazy-rules
        :rules="[val => !!val || 'Inserta una Direccion valida']">
        <template v-slot:prepend>
          <q-icon name="location_on" />
        </template>
        </q-input>
</div>

<div class="col-md-6 col-xs-12">
      <q-input
        outlined
        v-model="formedit.fax_banco"
        label="Fax"
        hint=""
        class="pcform"
        lazy-rules
        mask="####-#######################"
        :rules="[val => !!val || 'Inserta un Fax valido']">
        <template v-slot:prepend>
          <q-icon name="fax" />
        </template>
        </q-input>
</div>

<div class="col-md-6 col-xs-12">
      <q-input
        outlined
        v-model="formedit.tlf_banco"
        label="Teléfono"
        hint=""
        lazy-rules
        mask="(###) ### - ####"
        :rules="[val => !!val || 'Inserta un Teléfono valido']">
        <template v-slot:prepend>
          <q-icon name="phone" />
        </template>
        </q-input>
</div>

<div class="col-md-5 col-xs-12">
      <q-input
        outlined
        v-model="formedit.cod_postal"
        label="Código Postal"
        hint=""
        class="pcform"
        lazy-rules
        mask="##########"
        :rules="[val => !!val || 'Inserta un código postal valido']">
        <template v-slot:prepend>
          <q-icon name="dialpad" />
        </template>
        </q-input>
</div>

<div class="col-md-7 col-xs-12">
      <q-input
        outlined
        v-model="formedit.email_banco"
        label="Correo Electrónico"
        hint=""
        type="email"
        lazy-rules
        :rules="[val => !!val || 'Inserta un correo valido']">
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
        </q-input>
</div>

</div>

    </q-form>
</q-card-section>

<div class="full-width row justify-center items-center content-center"
      style="margin-bottom:10px">
        <q-btn label="Editar Banco" type="submit"
        v-on:click="putDato(); getdatos();"
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
              label="Búsqueda avanzada"
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
                      row-key="cod_banco"
                      :columns= "columns"
                      :separator="separator"
                      class="my-sticky-column-table"
                      :loading="loadingTable"
                      :filter="filter"
                      style="width:100%"
                      :grid="$q.screen.xs"
                      v-model:pagination="pagination"
                    >
                    <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn dense round flat color="primary"
              icon="edit" @click="selectedEdit = props.row.cod_banco; getdatosedit(selectedEdit);
              alert2=true"></q-btn>
              <q-btn dense round flat color="primary"
              icon="delete" @click="selected = props.row.cod_banco; getdatos();"
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
              icon="edit" @click="selectedEdit = props.row.cod_banco; getdatosedit(selectedEdit);
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
              icon="delete" @click="selected = props.row.cod_banco; getdatos();"
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

<style>
.columna {width: 20px}
</style>

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
          name: 'cod_banco',
          label: 'Código',
          field: 'cod_banco',
          align: 'left',
          sortable: true,
        },
        {
          name: 'nb_banco',
          label: 'Nombre',
          field: 'nb_banco',
          align: 'left',
          sortable: true,
        },
        {
          name: 'tlf_banco',
          label: 'Teléfono',
          field: 'tlf_banco',
          align: 'left',
          sortable: true,
        },
        {
          name: 'cod_postal',
          label: 'Código postal',
          field: 'cod_postal',
          align: 'left',
          sortable: true,
        },
        {
          name: 'email_banco',
          label: 'Correo electrónico',
          field: 'email_banco',
          align: 'left',
          type: "string",
        },
        {
          name: 'action',
          label: 'Acciones',
          align: 'center',
          sortable: true,
          required: true,
        },
      ],
      form: {
        nb_banco: '',
        direccion_banco: '',
        tlf_banco: '',
        fax_banco: '',
        cod_postal: '',
        email_banco: '',
      },
      datos: [],
      formedit: {
        nb_banco: '',
        direccion_banco: '',
        tlf_banco: '',
        fax_banco: '',
        cod_postal: '',
        email_banco: '',
      },
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
      pagination: ref({
        rowsPerPage: 10
      }),
      separator: ref('vertical'),
      label: ref('Click me'),
      label2: ref('Also click me'),
      alert: ref(false),
      alert2: ref(false),
      contactoAñadido() {
        $q.notify({
          message: 'Banco añadido exitosamente',
          color: 'green',
        });
      },
      contactoEliminado() {
        $q.notify({
          message: 'Banco eliminado exitosamente',
          color: 'green',
        });
      },
      contactoEditado() {
        $q.notify({
          message: 'Banco actualizado exitosamente',
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
      api.get('/bancos')
        .then((res) => {
          this.datos = res.data;
        })
    },
    getdatosedit(selectedEdit) {
      api.get(`/bancos/${selectedEdit}`)
        .then((res) => {
          this.formedit = res.data;
          console.log(res);
        })
    },
    deletedato(idpost) {
      api.delete(`/bancos/${idpost}`);
      api.get('/bancos')
        .then((res) => {
          this.datos = res.data;
        });
    },
    createDato() {
      api.post('/bancos/', this.form)
      api.get('/bancos')
        .then((res) => {
          this.datos = res.data;
        });
    },
    putDato() {
      api.put(`/bancos/${this.formedit.cod_banco}`, this.formedit);
      api.get('/bancos')
        .then((res) => {
          this.datos = res.data;
        });
    },
    resetForm() {
    this.form.nb_banco = null,
    this.form.direccion_banco = null,
    this.form.tlf_banco = null,
    this.form.fax_banco = null,
    this.form.cod_postal = null,
    this.form.email_banco = null
    },
  },
};
</script>

<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */


  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #FFFFFF

  td:first-child
    background-color: #FFFFFF

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>