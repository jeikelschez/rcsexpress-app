<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.placas"
                  label="Placa Vehículo"
                  class="pcform"
                  :rules="[reglasNotNull10]"
                  hint=""
                  lazy-rules
                  @update:model-value="form.placas = form.placas.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="recent_actors" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.chofer"
                  label="Chofer"
                  :rules="[reglasAllowNull30]"
                  hint=""
                  lazy-rules
                  @update:model-value="form.chofer = form.chofer.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="face" />
                  </template>
                </q-input>
              </div>   
              
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.descripcion"
                  label="Descripción"
                  :rules="[reglasNotNull100]"
                  hint=""
                  lazy-rules
                  @update:model-value="form.descripcion = form.descripcion.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Unidad"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add"
              />
              <q-btn
                label="Cerrar"
                color="primary"
                flat
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="putData">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.placas"
                  label="Placa Vehículo"
                  class="pcform"
                  :rules="[reglasNotNull10]"
                  hint=""
                  lazy-rules
                  @update:model-value="formEdit.placas = formEdit.placas.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="recent_actors" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.chofer"
                  label="Chofer"
                  :rules="[reglasAllowNull30]"
                  hint=""
                  lazy-rules
                  @update:model-value="formEdit.chofer = formEdit.chofer.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="face" />
                  </template>
                </q-input>
              </div>   
              
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.descripcion"
                  label="Descripción"
                  :rules="[reglasNotNull100]"
                  hint=""
                  lazy-rules
                  @update:model-value="formEdit.descripcion = formEdit.descripcion.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Unidad"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add"
              />
              <q-btn
                label="Cerrar"
                color="primary"
                flat
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="row">
          <div
            class="col-md-4 col-xs-12 text-secondary"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <h4><strong>MANTENIMIENTO - UNIDADES DE TRANSPORTE</strong></h4>
          </div>
          <div
            class="col-md-5 col-sm-7 col-xs-6"
            style="align-self: center; margin-right: 20px"
          >
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
          <div
            class="col-md-2 col-sm-4 col-xs-5"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar Unidad"
              rounded
              color="primary"
              @click="create = true"
              @click.capture="resetForm()"
              :disabled="this.disabledCreate"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md">
          <div class="q-gutter-y-md">
            <div bordered flat class="row">
              <q-table
                :rows="datos"
                row-key="id"
                :columns="columns"
                :loading="loading"
                :separator="separator"
                class="my-sticky-column-table"
                :filter="filter"
                style="width: 100%"
                :grid="$q.screen.xs"
                v-model:pagination="pagination"
              >
                <template v-slot:loading>
                  <q-inner-loading showing color="primary" />
                </template>
                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="edit"
                      :disabled="this.disabledEdit"
                      @click="
                        getData(`/unidades/${props.row.id}`, 'setDataEdit', 'formEdit');
                        edit = true;
                      "
                    ></q-btn>
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="delete"
                      :disabled="this.disabledDelete"
                      @click="selected = props.row.id"
                      @click.capture="deletePopup = true"
                    ></q-btn>
                  </q-td>
                </template>
                <template v-slot:item="props">
                  <div
                    class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                    :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >
                    <q-card :class="props.selected ? 'bg-grey-2' : ''">
                      <q-list dense>
                        <q-item v-for="col in props.cols" :key="col.name">
                          <q-item-section>
                            <q-item-label>{{ col.label }}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-chip
                              v-if="col.name === 'status'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-btn
                              v-else-if="col.name === 'action'"
                              dense
                              round
                              flat
                              color="primary"
                              icon="edit"
                              :disabled="this.disabledEdit"
                              @click="
                                getData(`/unidades/${props.row.id}`, 'setDataEdit', 'formEdit');
                                edit = true;
                              "
                            ></q-btn>
                            <q-chip
                              v-if="col.name === 'status'"
                              :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              "
                              text-color="white"
                              dense
                              class="text-weight-bolder"
                              square
                              >{{ col.value }}</q-chip
                            >
                            <q-btn
                              v-else-if="col.name === 'action'"
                              dense
                              round
                              flat
                              color="primary"
                              icon="delete"
                              :disabled="this.disabledDelete"
                              @click="selected = props.row.id"
                              @click.capture="deletePopup = true"
                            ></q-btn>
                            <q-item-label
                              v-else
                              caption
                              :class="col.classes ? col.classes : ''"
                              >{{ col.value }}</q-item-label
                            >
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="deletePopup">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estas seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <methods ref="methods"
    @get-Data="getData('/unidades','setData','datos')"
    @set-data="setData"
    @reset-Loading="resetLoading"
    @set-Data-Edit="setDataEdit">
    </methods>
    <desactivate-crud ref="desactivateCrud"
    @desactivar-Crud-Bancos="desactivarCrudBancos">
    </desactivate-crud>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { LocalStorage } from "quasar";

import methodsVue from 'src/components/methods.vue';

import desactivateCrudVue from 'src/components/desactivateCrud.vue';

import currencyInputVue from 'src/components/currency-input.vue';

export default {
  components: {
  "desactivate-crud": desactivateCrudVue,
  "methods": methodsVue,
  "currency-input": currencyInputVue},
  name: "Bancos",
  data() {
    return {
      columns: [
        {
          name: "placas",
          label: "Numero de Placa",
          field: "placas",
          align: "left",
          sortable: true,
        },
        {
          name: "chofer",
          label: "Chofer",
          field: "chofer",
          align: "left",
          sortable: true,
        },
        {
          name: "descripcion",
          label: "Descripcion de Unidad",
          field: "descripcion",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
          sortable: true,
          required: true,
        },
      ],
      form: {
        placas: "",
        chofer: "",
        descripcion: "",
      },
      datos: [],
      formEdit: {
        id: "",
        placas: "",
        chofer: "",
        descripcion: "",
      },
      selected: [],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: ``,
        },
      },   
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      pagination: ref({
        rowsPerPage: 10,
      }),
      loading: ref(false),
      separator: ref("vertical"),
      create: ref(false),
      edit: ref(false),
      medium: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData('/unidades','setData','datos')
    this.$refs.desactivateCrud.desactivarCrud('c_bancos', 'd_bancos', 'u_bancos', 'desactivarCrudBancos')
  },
  methods: {
    resetLoading() {
      this.loading = false;
    },
    // Reglas
    reglasAllowNull30(val) {
      if (val !== null !== "") {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 29) {
            return "Deben ser Maximo 30 caracteres";
          }
        }
      }
    },
    reglasNotNull10(val) {
        if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 9) {
            return "Deben ser Maximo 10 caracteres";
          }
      }
    },
    reglasNotNull100(val) {
        if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 99) {
            return "Deben ser Maximo 100 caracteres";
          }
      }
    },

    // Desactivar CRUD
    desactivarCrudBancos(createItem, deleteItem, updateItem) {
      if (createItem == true) {
        this.disabledCreate = false
      }
      if (deleteItem == true) {
        this.disabledDelete = false
      }
      if (updateItem == true) {
        this.disabledEdit = false
      }
    },

    // Metodos CRUD
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setData(res, dataRes) {
      this[dataRes] = res
      this.loading = false
    },  
    setDataEdit(res, dataRes) {
      this.formEdit.id = res.id
      this.formEdit.descripcion = res.descripcion
      this.formEdit.placas = res.placas
      this.formEdit.chofer = res.chofer
      this.loading = false
    },   
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/unidades/${idpost}`, 'getData', this.axiosConfig);
      this.loading = true;
    },
    createData() {
      this.$refs.methods.createData('/unidades', this.form, 'getData', this.axiosConfig);
      this.resetForm();
      this.loading = true;
    },
    putData() {
      this.$refs.methods.putData(`/unidades/${this.formEdit.id}`, this.formEdit, 'getData', this.axiosConfig);
      this.edit = false;
      this.resetFormEdit();
      this.loading = true;
    },
    
    resetForm() {
      (this.form.chofer = ""),
      (this.form.descripcion = ""),
      (this.form.placas = ""),
      (this.create = false);    
    },
    resetFormEdit() {
      (this.formEdit.chofer = ""),
      (this.formEdit.descripcion = ""),
      (this.formEdit.placas = ""),
      (this.edit = false);    
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
