<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 90vw">
        <q-card-section>
          <q-form @submit="createData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-12 col-xs-12">
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
                  :rules="[reglasNotNull100]"
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
                :options="conceptos"
                option-label="desc_concepto"
                option-value="id"
                class="pcform"
                v-model="form.cod_concepto"
                outlined
                standout
                :rules="[reglasSelect]"
                label="Tipo de Operación"
            >
              <template v-slot:prepend>
                <q-icon name="format_list_bulleted" />
              </template>
            </q-select>
              </div>

              <div class="col-md-3 col-xs-6" style="margin-bottom: 7px" id="select"> 
              <q-field
              :rules="[reglasSelect]"
              hide-bottom-space
              borderless
              dense
              class="pcform"
              v-model="form.check_comision"
              >
              <template v-slot:control>
                  <q-checkbox
                  size="lg"
                  v-model="form.check_comision"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="¿GENERA COMISIÓN?"
                />
              </template>
              </q-field>
              </div>

              <div class="col-md-3 col-xs-6" style="margin-bottom: 7px" id="select"> 
              <q-field
              :rules="[reglasSelect]"
              hide-bottom-space
              borderless
              dense
              v-model="form.check_impuesto"
              >
              <template v-slot:control>
                  <q-checkbox
                  size="lg"
                  v-model="form.check_impuesto"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="¿INFLUYE EN IMPUESTO?"
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
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 90vw">
        <q-card-section>
          <q-form @submit="putData()">
            <div class="row">
              <div class="col-md-12 col-xs-12">
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
                  :rules="[reglasNotNull100]"
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
                :options="conceptos"
                option-label="desc_concepto"
                option-value="id"
                class="pcform"
                v-model="formEdit.cod_concepto"
                outlined
                standout
                :rules="[reglasSelect]"
                label="Tipo de Operación"
            >
              <template v-slot:prepend>
                <q-icon name="format_list_bulleted" />
              </template>
            </q-select>
              </div>

              <div class="col-md-3 col-xs-6" style="margin-bottom: 7px" id="select"> 
              <q-field
              :rules="[reglasSelect]"
              hide-bottom-space
              borderless
              dense
              class="pcform"
              v-model="formEdit.check_comision"
              >
              <template v-slot:control>
                  <q-checkbox
                  size="lg"
                  v-model="formEdit.check_comision"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="¿GENERA COMISIÓN?"
                />
              </template>
              </q-field>
              </div>

              <div class="col-md-3 col-xs-6" style="margin-bottom: 7px" id="select"> 
              <q-field
              :rules="[reglasSelect]"
              hide-bottom-space
              borderless
              dense
              v-model="formEdit.check_impuesto"
              >
              <template v-slot:control>
                  <q-checkbox
                  size="lg"
                  v-model="formEdit.check_impuesto"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="¿INFLUYE EN IMPUESTO?"
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
          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 text-secondary"
            style="align-self: center; text-align: center"
          >
            <h4 style="font-size: 26px"><strong>CONCEPTOS DE FACTURACIÓN</strong></h4>
          </div>

          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputestadospc"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="conceptos"
              option-label="desc_concepto"
              option-value="id"
              v-model="selectedConcepto"
              outlined
              standout
              label="Escoge un Concepto"
              @update:model-value="getDataSelect(`/cfacturacion`, 'setData', 'datos')"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>

          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputestadospc2"
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
          
          <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
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
                      getData(`/cfacturacion/${props.row.id}`, 'setDataEdit', 'formEdit');
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
                      @click.capture="deleteForm = true"
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
                                getData(`/cfacturacion/${props.row.id}`, 'setDataEdit', 'formEdit');
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
                              @click.capture="deleteForm = true"
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

    <q-dialog v-model="deleteForm">
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
    <desactivate-crud ref="desactivateCrud"
      @desactivar-Crud-Roles="desactivarCrudRoles"
    ></desactivate-crud>
    <methods ref="methods"
      @get-Data="getData(`/cfacturacion`, 'setData', 'datos')"
      @set-Data-Iniciar="setDataIniciar"
      @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit"
      @set-Data="setData"
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
  name: "Agentes",
  data() {
    return {
      columns: [
        {
          name: "desc_concepto",
          label: "Nombre",
          field: "desc_concepto",
          align: "left",
          sortable: true,
        },
        {
          name: "check_comision",
          label: "Genera Comision",
          field: "check_comision",
          align: "left",
          sortable: true,
        },
        {
          name: "check_impuesto",
          label: "Influye en el Impuesto",
          field: "check_impuesto",
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
        check_comision: "0",
        check_impuesto: "0",
        cod_concepto: "",
      },
      formEdit: {
        desc_concepto: "",
        check_comision: "0",
        check_impuesto: "0",
        cod_concepto: "",
        id: "",
      },
      conceptos: [],
      datos: [],
      selected: [],
      selectedConcepto: [],
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
          cod_concepto: "1",
          tipo: "8"
        }
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      create: ref(false),
      loading: ref(false),
      edit: ref(false),
      deleteForm: ref(false),
      filter: ref("")
    };
  },
  mounted() {
    this.getData('/coperacion', 'setDataIniciar', 'conceptos');
    this.getData('/cfacturacion', 'setData', 'datos');
    this.$refs.desactivateCrud.desactivarCrud('c_roles', 'd_roles', 'u_roles', 'desactivarCrudRoles')
  },
  methods: {
    resetLoading() {
      this.loading = false;
    },
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
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
          if (val.length > 100) {
            return "Deben ser Maximo 100 caracteres";
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
      this.loading = true;
    },
    getDataSelect(url, call, dataRes) {
      this.axiosConfig.headers.cod_concepto = this.selectedConcepto.id
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setDataIniciar(res, dataRes) {
      this[dataRes] = res
        for (var e = 0, len = this.datos.length; e < len; e++) {
          if (this.datos[e].check_comision === "1") {
            this.datos[e].check_comision = "✓"
          }
          if (this.datos[e].check_comision === "0") {
            this.datos[e].check_comision = ""
          }
          if (this.datos[e].check_impuesto === "1") {
            this.datos[e].check_impuesto = "✓"
          }
          if (this.datos[e].check_impuesto === "0") {
            this.datos[e].check_impuesto = ""
          }
          if (e == this.datos.length - 1) break;
        }
      this.selectedConcepto = this.conceptos[0].desc_concepto;
      this.getData('/cfacturacion', 'setData', 'datos')
      this.loading = false
    },
    setData(res, dataRes) {
      this[dataRes] = res
      this.loading = false
      for (var e = 0, len = this.datos.length; e < len; e++) {
          if (this.datos[e].check_comision === "1") {
            this.datos[e].check_comision = "✓"
          }
          if (this.datos[e].check_comision === "0") {
            this.datos[e].check_comision = ""
          }
          if (this.datos[e].check_impuesto === "1") {
            this.datos[e].check_impuesto = "✓"
          }
          if (this.datos[e].check_impuesto === "0") {
            this.datos[e].check_impuesto = ""
          }
          if (e == this.datos.length - 1) break;
        }
    },
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id
      this[dataRes].desc_concepto = res.desc_concepto
      this[dataRes].check_comision = res.check_comision
      this[dataRes].check_impuesto = res.check_impuesto
      this[dataRes].cod_concepto = res.conceptos.desc_concepto
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/cfacturacion/${idpost}`, 'getData', this.axiosConfig);
      this.loading = true;
    },
    createData() {
      this.form.cod_concepto = this.form.cod_concepto.id
      this.$refs.methods.createData(`/cfacturacion`, this.form, 'getData', this.axiosConfig);
      this.resetForm();
      this.loading = true;
    },
    putData() {
      this.formEdit.cod_concepto = this.formEdit.cod_concepto.id
      this.$refs.methods.putData(`/cfacturacion/${this.formEdit.id}`, this.formEdit, 'getData', this.axiosConfig);
      this.resetFormEdit();
      this.loading = true;
    },

    resetForm() {
      (this.form.desc_concepto = ""),
      (this.form.check_comision = "0"),
      (this.form.check_impuesto = "0"),
      (this.form.cod_concepto = ""),
      (this.create = false)
    },
    resetFormEdit() {
      (this.formEdit.desc_concepto = ""),
      (this.formEdit.check_comision = "0"),
      (this.formEdit.check_impuesto = "0"),
      (this.formEdit.cod_concepto = ""),
      (this.edit = false)
    },
  },
};
</script>
