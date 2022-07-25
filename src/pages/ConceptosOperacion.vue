<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createData()" class="q-gutter-md">
            <div class="row">              
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.desc_concepto"
                  label="Descripcion de Concepto"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    form.desc_concepto =
                      form.desc_concepto.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasInputs]"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="tipoDeOperacion"
                option-label="descripcion"
                option-value="id"
                v-model="form.tipo"
                outlined
                standout
                :rules="[reglasSelect]"
                label="Tipo de Operación"
                @update:model-value="validationSelect()"
            >
              <template v-slot:prepend>
                <q-icon name="format_list_bulleted" />
              </template>
            </q-select>
              </div>

              <div class="col-md-12 col-xs-12 displayHide" style="margin-bottom: 7px" id="select"> 
              <q-field
              :rules="[reglasSelect]"
              hide-bottom-space
              borderless
              dense
              v-model="form.afecta_estado"
              :disable="disable"
              >
              <template v-slot:control>
                  <q-checkbox
                  size="lg"
                  v-model="form.afecta_estado"
                  true-value="S"
                  false-value="N"
                  style="font-size: 13px"
                  label="¿AFECTA ESTADO DE GANANCIAS Y PERDIDAS?"
                  :disable="disable"
                />
              </template>
              </q-field>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Concepto"
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
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="putData()">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.desc_concepto"
                  label="Descripcion de Concepto"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEdit.desc_concepto =
                      formEdit.desc_concepto.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasInputs]"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="tipoDeOperacion"
                option-label="descripcion"
                option-value="id"
                v-model="formEdit.tipo"
                outlined
                standout
                :rules="[reglasSelect]"
                label="Tipo de Operación"
                @update:model-value="validationSelectEdit()"
            >
              <template v-slot:prepend>
                <q-icon name="format_list_bulleted" />
              </template>
            </q-select>
              </div>

              <div class="col-md-12 col-xs-12 displayHide" style="margin-bottom: 20px" id="selectEdit"> 
              <q-field
              :rules="[reglasSelect]"
              hide-bottom-space
              borderless
              dense
              v-model="formEdit.afecta_estado"
              :disable="disableEdit"
              >
              <template v-slot:control>
                  <q-checkbox
                  size="lg"
                  v-model="formEdit.afecta_estado"
                  true-value="S"
                  false-value="N"
                  style="font-size: 13px"
                  label="¿AFECTA ESTADO DE GANANCIAS Y PERDIDAS?"
                  :disable="disableEdit"
                />
              </template>
              </q-field>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Concepto"
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
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 text-secondary"
            style="align-self: center; text-align: center"
          >
            <h4 style="font-size: 30px"><strong>CONCEPTOS POR OPERACIÓN</strong></h4>
          </div>

          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputestadospc"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="tipoDeOperacion"
              option-label="descripcion"
              option-value="id"
              v-model="selectedTipo"
              outlined
              standout
              label="Tipo de Operación"
              @update:model-value="this.axiosConfig.headers.tipo = this.selectedTipo.id;
              getDataSelect(`/coperacion`, 'setDataConceptos', 'datos')"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>

          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputestadospc2"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-input
              rounded
              outlined
              standout
              v-model="filter"
              type="search"
              label="Búsqueda avanzada"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div
            class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar"
              rounded
              color="primary"
              :disabled="this.disabledCreate"
              @click="create = true"
              @click.capture="resetForm()"
              size="16px"
              class="q-px-xl q-py-xs insertarestadosmovil"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md" style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
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
                      getData(`/coperacion/${props.row.id}`, 'setDataEdit', 'formEdit');
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
                      @click.capture="conceptosDelete = true"
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
                                getData(`/coperacion/${props.row.id}`, 'setDataEdit', 'formRoles');
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
                              @click.capture="conceptosDelete = true"
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

    <q-dialog v-model="conceptosDelete">
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
    <desactivate-crud ref="desactiveCrud"
      @desactivar-Crud-Roles="desactivarCrudRoles"
    ></desactivate-crud>
    <methods ref="methods"
      @get-Data="getData(`/coperacion`, 'setDataConceptos', 'datos')"
      @set-Data-Conceptos="setDataConceptos"
      @reset-Loading="resetLoading"
      @set-Data-Iniciar="setDataIniciar"
      @set-Data-Edit="setDataEdit"
      @set-Data-Tipos="setDataTipos"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { LocalStorage } from 'quasar';

import methodsVue from 'src/components/methods.vue';

import desactivateCrudVue from 'src/components/desactivateCrud.vue';

export default {
  components: { "desactivate-crud": desactivateCrudVue,
  "methods": methodsVue},
  name: "Bancos",
  data() {
    return {
      columns: [
        {
          name: "desc_concepto",
          label: "Concepto",
          field: "desc_concepto",
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
        desc_concepto: "",
        tipo: "",
        afecta_estado: "N"
      },
      formEdit: {
        id: "",
        desc_concepto: "",
        tipo: "",
        afecta_estado: "N"
      },
      tipoDeOperacion: [],
      datos: [],
      selected: [],
      selectedTipo: [],
      tipoRef: "",
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      control: 0,
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      axiosConfig: {
        headers: {
          Authorization: ``,
          tipo: "1",
          fuente: "OP"
        }
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      create: ref(false),
      edit: ref(false),
      loading: ref(false),
      disable: ref(true),
      disableEdit: ref(true),
      errorDelServidor() {
        $q.notify({
          message: this.error,
          color: "red",
        });
      },
      añadidoConExito() {
        $q.notify({
          message: "Agregado exitosamente",
          color: "green",
        });
      },
      editadoConExito() {
        $q.notify({
          message: "Editado exitosamente",
          color: "green",
        });
      },
      eliminadoConExito() {
        $q.notify({
          message: "Eliminado exitosamente",
          color: "green",
        });
      },
      conceptosDelete: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData('/coperacion', 'setDataIniciar', 'datos');
    this.$refs.desactiveCrud.desactivarCrud('c_roles', 'd_roles', 'u_roles', 'desactivarCrudRoles')
  },
  methods: {
    resetLoading() {
      this.loading = false;
    },
    // Reglas
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasInputs(val) {
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if(val !== null) {
      if (val.length > 100) {
        return "Deben ser máximo 100 caracteres";
        }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
      }
    },
    desactivarCrudRoles(createItem, deleteItem, updateItem) {
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
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    validationSelect() {
      if (this.form.tipo.codigo == "DGA") {
          var element = document.getElementById("select");
          element.classList.remove("displayHide");
          element.classList.add("displayShow");
          this.disable = false
      }
      if (this.form.tipo.codigo == "DCO") {
          var element = document.getElementById("select");
          element.classList.remove("displayHide");
          element.classList.add("displayShow");
          this.disable = false
      };
      if (this.form.tipo.codigo !== "DGA" && this.form.tipo.codigo !== "DCO") {
        var element = document.getElementById("select");
        element.classList.remove("displayShow");
        element.classList.add("displayHide");
        this.disable = true
      }
    },
    validationSelectEdit() {
      if (this.formEdit.tipo.codigo == "DGA") {
          var element = document.getElementById("selectEdit");
          element.classList.remove("displayHide");
          element.classList.add("displayShow");
          this.disableEdit = false
      }
      if (this.formEdit.tipo.codigo == "DCO") {
          var element = document.getElementById("selectEdit");
          element.classList.remove("displayHide");
          element.classList.add("displayShow");
          this.disableEdit = false
      };
      if (this.formEdit.tipo.codigo !== "DGA" && this.formEdit.tipo.codigo !== "DCO") {
        var element = document.getElementById("selectEdit");
        element.classList.remove("displayShow");
        element.classList.add("displayHide");
        this.disableEdit = true
      }
    },
    getDataSelect(url, call, dataRes) {
      this.axiosConfig.headers.tipo = this.selectedTipo.id
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setDataIniciar(res, dataRes) {
      this.loading = false
      this[dataRes] = res
      this.getData('/tipos', 'setDataTipos', 'tipoDeOperacion')
    },
    setDataTipos(res, dataRes) {
      this[dataRes] = res
      this.selectedTipo = res[0].descripcion
    },
    setDataConceptos(res, dataRes) {
      this[dataRes] = res
      this.loading = false
    },
    setDataEdit(res, dataRes) {
      this[dataRes].tipo = res.tipos.descripcion
      this[dataRes].id = res.id
      this[dataRes].desc_concepto = res.desc_concepto
      this[dataRes].afecta_estado = res.afecta_estado
      var codigo = res.tipos.codigo
      if (codigo == "DCO") {
          var element = document.getElementById("selectEdit");
          element.classList.remove("displayHide");
          element.classList.add("displayShow");
          this.disableEdit = false
      }
      if (codigo == "DGA") {
          var element = document.getElementById("selectEdit");
          element.classList.remove("displayHide");
          element.classList.add("displayShow");
          this.disableEdit = false
      };
      if (codigo !== "DCO" && codigo !== "DGA") {
        var element = document.getElementById("selectEdit");
        element.classList.remove("displayShow");
        element.classList.add("displayHide");
        this.disableEdit = true
      }
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/coperacion/${idpost}`, 'getData', this.axiosConfig);
      this.loading = true;
    },
    createData() {
      this.form.tipo = this.form.tipo.id
      this.$refs.methods.createData(`/coperacion`, this.form, 'getData', this.axiosConfig);
      this.resetForm();
      this.loading = true;
    },
    putData() {
      this.formEdit.tipo = this.formEdit.tipo.id
      this.$refs.methods.putData(`/coperacion/${this.formEdit.id}`, this.formEdit, 'getData', this.axiosConfig);
      this.resetFormEdit();
      this.loading = true;
    },
    resetForm() {
      (this.form.desc_concepto = ""),
      (this.form.afecta_estado = "N"),
      (this.form.tipo = ""),
      (this.disable = true)
      (this.create = false)
    },
    resetFormEdit() {
      (this.formEdit.desc_concepto = ""),
      (this.formEdit.afecta_estado = "N"),
      (this.formEdit.tipo = ""),
      (this.disableEdit = true)
      (this.edit = false)
    },
  },
};
</script>
