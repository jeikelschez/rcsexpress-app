<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="max-width: 60vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_ayudante"
                  label="Nombre"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglaInput]"
                  @update:model-value="
                    form.nb_ayudante = form.nb_ayudante.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_ayudante"
                  label="Teléfono"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.dir_ayudante"
                  label="Direccion"
                  hint=""
                  :rules="[reglaInput]"
                  lazy-rules
                  @update:model-value="
                    form.dir_ayudante = form.dir_ayudante.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-select
                  outlined
                  v-model="form.flag_activo"
                  label="Vigente"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="vigente"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="rule" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Ayudante"
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
      <q-card class="q-pa-md" bordered style="max-width: 60vw">
        <q-card-section>
          <q-form @submit="putData">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nb_ayudante"
                  label="Nombre"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglaInput]"
                  @update:model-value="
                    formEdit.nb_ayudante = formEdit.nb_ayudante.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.tlf_ayudante"
                  label="Teléfono"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.dir_ayudante"
                  label="Direccion"
                  hint=""
                  :rules="[reglaInput]"
                  lazy-rules
                  @update:model-value="
                    formEdit.dir_ayudante = formEdit.dir_ayudante.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.flag_activo"
                  label="Vigente"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="vigente"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="rule" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Ayudante"
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
            <h4><strong>MANTENIMIENTO - AYUDANTES</strong></h4>
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
              label="Insertar Ayudante"
              rounded
              color="primary"
              @click="create = true"
              @click.capture="getData('/ayudantes','setdata','datos')"
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
                :separator="separator"
                class="my-sticky-column-table"
                :filter="filter"
                style="width: 100%"
                :grid="$q.screen.xs"
                v-model:pagination="pagination"
              >
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
                        getData(`/ayudantes/${props.row.id}`, 'setDataEdit', 'formEdit');
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
                                getData(`/ayudantes/${props.row.id}`, 'setDataEdit', 'formEdit');
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
    @get-Data="getData('/ayudantes','setData','datos')"
    @set-data="setData"
    @set-data-Edit="setDataEdit">
    </methods>
    <desactive-crud ref="desactiveCrud"
    @desactivar-Crud-Ayudantes="desactivarCrudAyudantes">
    </desactive-crud>
  </q-page>
</template>

<script>
import { ref } from "vue";


import { useQuasar } from "quasar";

import { LocalStorage } from "quasar";

import methodsVue from 'src/components/methods.vue';

import desactivateCrudVue from 'src/components/desactivateCrud.vue';

export default {
  components: {
  "desactive-crud": desactivateCrudVue,
  "methods": methodsVue },
  name: "Ayudantes",
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "Código",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "nb_ayudante",
          label: "Nombre",
          field: "nb_ayudante",
          align: "left",
          sortable: true,
        },
        {
          name: "activo_desc",
          label: "Estatus",
          field: "activo_desc",
          align: "left",
          sortable: true,
        },
        {
          name: "dir_ayudante",
          label: "Direccion",
          field: "dir_ayudante",
          align: "left",
          sortable: true,
        },
        {
          name: "tlf_ayudante",
          label: "Telefono",
          field: "tlf_ayudante",
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
        nb_ayudante: "",
        dir_ayudante: "",
        tlf_ayudante: "",
        flag_activo: ""
      },
      datos: [],
      formEdit: {
        nb_ayudante: "",
        dir_ayudante: "",
        tlf_ayudante: "",
        flag_activo: ""
      },
      vigente: [
        { label: "ACTIVO", value: "1" },
        { label: "INACTIVO", value: "0" },
      ],
      selected: [],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
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
      separator: ref("vertical"),
      create: ref(false),
      edit: ref(false),
      errorDelServidor() {
        $q.notify({
          message: this.error,
          color: "red",
        });
      },
      añadidoConExito() {
        $q.notify({
          message: "Banco agregado exitosamente",
          color: "green",
        });
      },
      editadoConExito() {
        $q.notify({
          message: "Banco editado exitosamente",
          color: "green",
        });
      },
      eliminadoConExito() {
        $q.notify({
          message: "Banco eliminado exitosamente",
          color: "green",
        });
      },
      medium: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData('/ayudantes','setData','datos')
    this.$refs.desactiveCrud.desactivarCrud('c_bancos', 'd_bancos', 'u_bancos', 'desactivarCrudAyudantes')
  },
  methods: {
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglaInputAyudantes(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
    },
    reglaInput(val) {
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
    },
    desactivarCrudAyudantes(createItem, deleteItem, updateItem) {
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
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes);
    },
    setData(res, dataRes) {
      this[dataRes] = res
    }, 
    setDataEdit(res, dataRes) {
      this[dataRes].nb_ayudante = res.nb_ayudante
      this[dataRes].dir_ayudante = res.dir_ayudante
      this[dataRes].tlf_ayudante = res.tlf_ayudante
      this[dataRes].flag_activo = res.activo_desc
    },   
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/ayudantes/${idpost}`, 'getData');
    },
    createData() {
      this.form.flag_activo = this.form.flag_activo.value
      this.$refs.methods.createData('/ayudantes', this.form, 'getData');
      this.resetForm();
    },
    putData() {
      this.formEdit.flag_activo = this.formEdit.flag_activo.value
      this.$refs.methods.putData(`/ayudantes/${this.formEdit.id}`, this.formEdit, 'getData');
      this.edit = false;
    },
    
    resetForm() {
      (this.form.nb_ayudante = null),
      (this.form.dir_ayudante = null),
      (this.form.tlf_ayudante = null),
      (this.form.flag_activo = null),
      (this.create = false);    
    },
    resetFormEdit() {
      (this.formEdit.nb_ayudante = null),
      (this.formEdit.dir_ayudante = null),
      (this.formEdit.tlf_ayudante = null),
      (this.formEdit.flag_activo = null),
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
