<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createDato" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.control_inicio"
                  label="Primer Correlativo"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[reglasNotNull10]"
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="Ultimo Correlativo"
                  :rules="[reglasSegundoCorrelativo]"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-2 col-xs-12">
                <q-input
                  outlined
                  v-model="form.serie_doc"
                  label="Serie Lote"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasAllowNull1]"
                  @update:model-value="
                    form.serie_doc = form.serie_doc.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.ult_doc_referencia"
                  label="Ultimo Numero Asignado"
                  hint=""
                  class="pcform"
                  type="number"
                  :rules="[reglasAllowNull10]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.estatus_lote"
                  label="Estatus"
                  hint=""
                  :options="estatus"
                  lazy-rules
                  :rules="[reglasSelect]"
                >
                  <template v-slot:prepend>
                    <q-icon name="done_all" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
            >
              <q-btn
                label="Agregar Control"
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
          <q-form @submit="putDato">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="formEdit.control_inicio"
                  label="Primer Correlativo"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[reglasNotNull10]"
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.control_final"
                  label="Ultimo Correlativo"
                  :rules="[reglasSegundoCorrelativoEdit]"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-2 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.serie_doc"
                  label="Serie Lote"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasAllowNull1]"
                  @update:model-value="
                    formEdit.serie_doc = formEdit.serie_doc.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.ult_doc_referencia"
                  label="Ultimo Numero Asignado"
                  hint=""
                  class="pcform"
                  type="number"
                  :rules="[reglasAllowNull10]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.estatus_lote"
                  label="Estatus"
                  hint=""
                  :options="estatus"
                  :rules="[reglasSelect]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="done_all" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-top: 10px"
            >
              <q-btn
                label="Editar Control"
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
      <div
        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary"
      >
        <div>
          <h4 style="font-size: 35px; align-self: center; text-align: center">
            <strong>MANTENIMIENTO - CONTROL CORRELATIVO</strong>
          </h4>
        </div>
      </div>
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-11 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
          <div class="row">
            <div
              class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputciudadespc"
            >
              <q-select
                rounded
                transition-show="flip-up"
                transition-hide="flip-down"
                option-label="nb_agencia"
                option-value="id"
                :options="agenciasSelected"
                @filter="(val,update,abort) => 
                filterArray(val,update,abort,'agenciasSelected', 'agencias', 'nb_agencia')"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                v-model="selectedAgencia"
                outlined
                standout
                label="Escoge una Agencia"
                @update:model-value="
                  this.axiosConfig.headers.agencia = this.selectedAgencia.id;
                  getDataSelect(`/correlativo`, 'setData', 'datos');
                "
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-select>
            </div>
            <div
              class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputciudadespc2"
            >
              <q-select
                rounded
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="tiposSelected"
                @filter="(val,update,abort) => 
                filterArray(val,update,abort,'tiposSelected', 'tipos', 'descripcion')"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                option-label="descripcion"
                option-value="id"
                v-model="selectedTipo"
                outlined
                standout
                label="Tipo de Control"
                @update:model-value="
                  this.axiosConfig.headers.tipo = this.selectedTipo.id;
                  getDataSelect(`/correlativo`, 'setData', 'datos');
                "
              >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-select>
            </div>
            <div
              class="col-md-3 col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputpc"
            >
              <q-input
                rounded
                outlined
                v-model="filter"
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
              class="col-md-2 col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-5 inputpc"
              style="text-align: center; align-self: center"
            >
              <q-btn
                label="Insertar"
                rounded
                color="primary"
                :disabled="this.disabledCreate"
                @click="create = true"
                @click.capture="resetForm"
                size="16px"
                class="q-px-xl q-py-xs"
              ></q-btn>
            </div>
          </div>

          <div class="q-pa-md" style="margin-top: 20px">
            <div class="q-gutter-y-md">
              <div bordered flat class="my-card row">
                <q-table
                  :rows="datos"
                  row-key="id"
                  :loading="loading"
                  :columns="columns"
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
                  <template v-slot:body-cell-estatus="props">
                    <q-td :props="props">
                      <q-select
                        outlined
                        v-model="props.row.estatus_desc"
                        :options="estatus"
                        @update:model-value="
                          this.getDataEdit(props.row.id, 'putDatoSelect');
                          this.formEdit.estatus_lote = props.row.estatus_desc.value;"
                      >
                      </q-select>
                    </q-td>
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
                          getDataEdit(props.row.id, 'setDataEdit');
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
                                  getDataEdit(props.row.id, 'setDataEdit');
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
                              <q-select
                                v-else-if="col.name === 'estatus'"
                                outlined
                                v-model="props.row.estatus_desc"
                                :options="estatus"
                                @update:model-value="
                                  getDataEdit(props.row.id, 'putDatoSelect');
                                  this.formEdit.estatus_lote = props.row.estatus_desc.value;
                                "
                              >
                              </q-select>
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
    </div>

    <q-dialog v-model="deletePopup">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estás seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="deleteDato(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <methods
      ref="methods"
      @get-Data="getData('/correlativo', 'setData', 'datos')"
      @set-Data="setData"
      @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit"
      @put-Dato-Select="putDatoSelect"
    ></methods>
    <desactive-crud
      ref="desactiveCrud"
      @desactivar-Crud="desactivarCrud"
    ></desactive-crud>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { useQuasar } from "quasar";

import methodsVue from "src/components/methods.vue";

import desactivateCrudVue from "src/components/desactivateCrud.vue";

import { LocalStorage } from "quasar";

export default {
  components: { "desactive-crud": desactivateCrudVue, methods: methodsVue },
  name: "Bancos",
  data() {
    return {
      columns: [
        {
          name: "control_inicio",
          label: "Primer Correlativo",
          field: "control_inicio",
          align: "left",
          sortable: true,
        },
        {
          name: "control_final",
          label: "Ultimo Correlativo",
          field: "control_final",
          align: "left",
          sortable: true,
        },
        {
          name: "serie_doc",
          label: "Serie Lote",
          field: "serie_doc",
          align: "left",
          sortable: true,
        },
        {
          name: "ult_doc_referencia",
          label: "Ultimo Numero Asignado",
          field: "ult_doc_referencia",
          align: "left",
          type: "string",
        },
        {
          name: "estatus",
          label: "Estatus",
          align: "center",
          sortable: true,
          required: true,
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
        tipo: "",
        control_inicio: "",
        control_final: "",
        ult_doc_referencia: "",
        estatus_lote: "",
        serie_doc: "",
        cod_agencia: "",
      },
      formEdit: {
        id: "",
        tipo: "",
        control_inicio: "",
        control_final: "",
        ult_doc_referencia: "",
        estatus_lote: "",
        serie_doc: "",
        cod_agencia: "",
      },
      estatus: [
        { label: "CERRADO", value: "C" },
        { label: "ACTIVO", value: "A" },
        { label: "INACTIVO", value: "I" },
      ],
      agencias: [],
      tipos: [],
      agenciasSelected: [],
      tiposSelected: [],
      datos: [],
      selectedTipo: {
        "id": 16,
        "codigo": "FA",
        "descripcion": "Facturación",
      },
      selectedAgencia: {
        "id": 1,
        "nb_agencia": "VALENCIA, RCS EXPRESS",
      },
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: ``,
          agencia: "1",
          tipo: "16",
          fuente: "CR",
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
      loading: ref(false),
      activoExistente() {
        $q.notify({
          message: "Solo puede haber un Activo por Agencia",
          color: "red",
        });
      },
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData("/agencias", "setData", "agencias");
    this.getData("/tipos", "setData", "tipos");
    this.getData("/correlativo", "setData", "datos");
    this.$refs.desactiveCrud.desactivarCrud('c_ccorrelativo', 'r_ccorrelativo', 'u_ccorrelativo', 'd_ccorrelativo', 'desactivarCrud')
  },
  methods: {
    filterArray (val, update, abort, pagina, array, element) {
        if (val === '') {
        update(() => {
          this[pagina] = this[array]
        })
        return
    }
    update(() => {
        const needle = val.toUpperCase();
        var notEqual = JSON.parse(JSON.stringify(this[array]));
        for (var i = 0, len = this[array].length; i < len; i++) {
          if (!(this[array][i][element].indexOf(needle) > -1)) {
            delete notEqual[i];
          }
          if (i == this[array].length - 1) {
            this[pagina] = notEqual
            break
          };
        }
      })
    },
    resetLoading() {
      this.loading = false;
    },
    // Reglas
    reglasAllowNull1(val) {
      console.log(val)
        if (val) {
          if (val.length > 1) {
            return "Deben ser Maximo 1 caracter";
          }
      }
    },
    reglasAllowNull10(val) {
      console.log(val)
        if (val) {
          if (val.length > 10) {
            return "Deben ser Maximo 10 caracteres";
          }
      }
    },
    reglasNotNull10(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val.length > 10) {
            return "Deben ser Maximo 10 caracteres";
          }
      }
    },
    reglasSegundoCorrelativo(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val < this.form.control_inicio) {
            return "El Ultimo Correlativo debe ser Mayor al Primero"
          }
          if (val.length > 10) {
            return "Deben ser Maximo 10 caracteres";
          }
      }
    },
    reglasSegundoCorrelativoEdit(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val < this.formEdit.control_inicio) {
            return "El Ultimo Correlativo debe ser Mayor al Primero"
          }
          if (val.length > 10) {
            return "Deben ser Maximo 10 caracteres";
          }
      }
    },
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    desactivarCrud(createItem, readItem, deleteItem, updateItem) {
      if (readItem == true) {
        if (createItem == true) {
        this.disabledCreate = false
      }
        if (deleteItem == true) {
        this.disabledDelete = false
      }
        if (updateItem == true) {
        this.disabledEdit = false
      }
      } else this.$router.push("/dashboard");
    },

    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false
    },

    getDataEdit(id, call) {
      this.$refs.methods.getDataEdit(
        `/correlativo/${id}`,
        `${call}`,
        "formEdit",
        this.axiosConfig
      );
    },
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].tipo = res.tipo;
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].ult_doc_referencia = res.ult_doc_referencia;
      this[dataRes].estatus_lote = res.estatus_desc;
      this[dataRes].serie_doc = res.serie_doc;
      this[dataRes].cod_agencia = res.cod_agencia;
    },

    getDataSelect(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },

    deleteDato(idpost) {
      this.$refs.methods.deleteData(
        `/correlativo/${idpost}`,
        "getData",
        this.axiosConfig
      );
      this.loading = true;
    },
    createDato() {
      if (this.form.estatus_lote.value === "A") {
        for (var e = 0, len = this.datos.length; e < len; e++) {
          if (this.datos[e].estatus_lote === "A") {
            if (this.form.id !== this.datos[e].id) {
            this.activoExistente();
            return;
            }
          }
          if (e == this.datos.length - 1) break;
        }
        
      }
      this.form.cod_agencia = this.selectedAgencia.id
      this.form.tipo = this.selectedTipo.id
      this.form.estatus_lote = this.form.estatus_lote.value;
      this.$refs.methods.createData(
        "/correlativo",
        this.form,
        "getData",
        this.axiosConfig
      );
      this.resetForm();
      this.loading = true;
    },
    putDato() {
      if (this.formEdit.estatus_lote.value === "A") {
        for (var e = 0, len = this.datos.length; e < len; e++) {
          if (this.datos[e].estatus_lote === "A") {
            if (this.formEdit.id !== this.datos[e].id) {
            this.activoExistente();
            return;
            }
          }
          if (e == this.datos.length - 1) break;
        }
      }
      this.formEdit.estatus_lote = this.formEdit.estatus_lote.value;
      this.$refs.methods.putData(
        `/correlativo/${this.formEdit.id}`,
        this.formEdit,
        "getData",
        this.axiosConfig
      );
      this.edit = false;
      this.loading = true;
    },
    putDatoSelect(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].tipo = res.tipo;
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].ult_doc_referencia = res.ult_doc_referencia;
      this[dataRes].serie_doc = res.serie_doc;
      this[dataRes].cod_agencia = res.cod_agencia;
      console.log(this.formEdit)
      if (this.formEdit.estatus_lote === "A") {
        for (var e = 0, len = this.datos.length; e < len; e++) {
          if (this.datos[e].estatus_lote === "A") {
            if (this.formEdit.id !== this.datos[e].id) {
            this.activoExistente();
            this.getData("/correlativo", "setData", "datos")
            return;
            }
          }
          if (e == this.datos.length - 1) break;
        }
      }

      this.$refs.methods.putData(`/correlativo/${this.formEdit.id}`,this.formEdit,"getData",this.axiosConfig);
      this.loading = true;
    },

    resetForm() {
      (this.form.tipo = ""),
      (this.form.control_inicio = ""),
      (this.form.control_final = ""),
      (this.form.ult_doc_referencia = ""),
      (this.form.estatus_lote = ""),
      (this.form.serie_doc = ""),
      (this.form.cod_agencia = ""),
      (this.create = null);
    },
    resetFormEdit() {
      (this.formEdit.tipo = ""),
      (this.formEdit.control_inicio = ""),
      (this.formEdit.control_final = ""),
      (this.formEdit.ult_doc_referencia = ""),
      (this.formEdit.estatus_lote = ""),
      (this.formEdit.serie_doc = ""),
      (this.formEdit.cod_agencia = ""),
      (this.edit = null);
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
