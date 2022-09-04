<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 90vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="form.cod_tipo_retencion"
                  label="Codigo"
                  hint=""
                  lazy-rules
                  class="pcform"
                  type="number"
                  :rules="[reglasNotNull2]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_tipo_persona"
                  label="Tipo Persona"
                  hint=""
                  class="pcform"
                  :rules="[reglasSelect]"
                  :options="tipo_persona"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_tipo_retencion"
                  label="Descripción"
                  hint=""
                  lazy-rules
                  :rules="[reglasNotNull50]"
                  @update:model-value="
                    form.nb_tipo_retencion = form.nb_tipo_retencion.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.porc_base"
                  label="Porcentaje Base"
                  hint=""
                  class="pcform"
                  type="number"
                  lazy-rules
                  step=".01"
                  :rules="[reglasNotNull12]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.porc_retencion"
                  label="Porcentaje Retención"
                  hint=""
                  lazy-rules
                  step=".01"
                  class="pcform"
                  type="number"
                  :rules="[reglasNotNull12]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.pago_mayor"
                  label="Monto"
                  hint=""
                  step=".01"
                  lazy-rules
                  type="number"
                  :rules="[reglasNotNull12]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.sustraendo"
                  label="Sustraendo"
                  hint=""
                  lazy-rules
                  step=".01"
                  class="pcform"
                  type="number"
                  :rules="[reglasNotNull12]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.cod_seniat"
                  label="Codigo SENIAT"
                  hint=""
                  lazy-rules
                  :rules="[reglasNotNull3]"
                  @update:model-value="
                    form.cod_seniat = form.cod_seniat.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      label="Fecha de Validez Inicial"
                      hint=""
                      v-model="form.fecha_ini_val"
                      mask="date"
                      :rules="['date']"
                      class="pcform"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.fecha_ini_val">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      label="Fecha de Validez Final"
                      hint=""
                      v-model="form.fecha_fin_val"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.fecha_fin_val">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Retención"
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
                @click="setData()"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 90vw">
        <q-card-section>
          <q-form @submit="putData">
            <div class="row">
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.cod_tipo_retencion"
                  label="Codigo"
                  hint=""
                  lazy-rules
                  class="pcform"
                  type="number"
                  :rules="[reglasNotNull2]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.cod_tipo_persona"
                  label="Tipo Persona"
                  hint=""
                  class="pcform"
                  :rules="[reglasSelect]"
                  :options="tipo_persona"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nb_tipo_retencion"
                  label="Descripción"
                  hint=""
                  lazy-rules
                  :rules="[reglasNotNull50]"
                  @update:model-value="
                    formEdit.nb_tipo_retencion = formEdit.nb_tipo_retencion.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.porc_base"
                  label="Porcentaje Base"
                  hint=""
                  class="pcform"
                  step=".01"
                  type="number"
                  lazy-rules
                  :rules="[reglasNotNull12]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.porc_retencion"
                  label="Porcentaje Retención"
                  hint=""
                  lazy-rules
                  step=".01"
                  class="pcform"
                  type="number"
                  :rules="[reglasNotNull12]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.pago_mayor"
                  label="Monto"
                  step=".01"
                  hint=""
                  lazy-rules
                  type="number"
                  :rules="[reglasNotNull12]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.sustraendo"
                  label="Sustraendo"
                  hint=""
                  lazy-rules
                  step=".01"
                  class="pcform"
                  type="number"
                  :rules="[reglasNotNull12]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.cod_seniat"
                  label="Codigo SENIAT"
                  hint=""
                  lazy-rules
                  :rules="[reglasNotNull3]"
                  @update:model-value="
                    formEdit.cod_seniat = formEdit.cod_seniat.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      label="Fecha de Validez Inicial"
                      hint=""
                      v-model="formEdit.fecha_ini_val"
                      mask="date"
                      :rules="['date']"
                      class="pcform"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formEdit.fecha_ini_val">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      label="Fecha de Validez Final"
                      hint=""
                      v-model="formEdit.fecha_fin_val"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formEdit.fecha_fin_val">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Retención"
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
            <h4><strong>MANTENIMIENTO - RETENCIONES</strong></h4>
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
              label="Insertar Retención"
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
                binary-state-sort
                row-key="id"
                :loading="loading"
                :columns="columns"
                :separator="separator"
                
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
                        getData(`/mretenciones/${props.row.id}`, 'setDataEdit', 'formEdit');
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
                                getData(`/mretenciones/${props.row.id}`, 'setDataEdit', 'formEdit');
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
    @get-Data-Retenciones="getDataRetenciones('/mretenciones','setData','datos')"
    @set-data="setData"
    @reset-Loading="resetLoading"
    @set-Data-Edit="setDataEdit">
    </methods>
    <desactivate-crud ref="desactivateCrud"
    @desactivar-Crud="desactivarCrud">
    </desactivate-crud>
  </q-page>
</template>

<script>
import { ref } from "vue";

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
  name: "retenciones",
  data() {
    return {
      columns: [
        {
          name: "cod_tipo_retencion",
          label: "Codigo",
          field: "cod_tipo_retencion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nb_tipo_retencion",
          label: "Descripción",
          field: "nb_tipo_retencion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "porc_retencion",
          label: "Retención",
          field: "porc_retencion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "pago_mayor",
          label: "Monto",
          field: "pago_mayor",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "sustraendo",
          label: "Sustraendo",
          field: "sustraendo",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tipo_persona_desc",
          label: "Tipo de Persona",
          field: "tipo_persona_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_fin_val",
          label: "Valido Hasta",
          field: "fecha_fin_val",
          align: "left",
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
        cod_tipo_persona: "",
        cod_tipo_retencion: "",
        nb_tipo_retencion: "",
        porc_base: "",
        porc_retencion: "",
        pago_mayor: "",
        sustraendo: "",
        cod_seniat: "",
        fecha_ini_val: "",
        fecha_fin_val: ""
      },
      datos: [],
      formEdit: {
        id: "",
        cod_tipo_persona: "",
        cod_tipo_retencion: "",
        nb_tipo_retencion: "",
        porc_base: "",
        porc_retencion: "",
        pago_mayor: "",
        sustraendo: "",
        cod_seniat: "",
        fecha_ini_val: "",
        fecha_fin_val: "",
      },
      tipo_persona: [
        { label: "JURÍDICA", value: "J" },
        { label: "NATURAL", value: "N" },
      ],
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
      separator: ref("vertical"),
      create: ref(false),
      edit: ref(false),
      loading: ref(false),
      medium: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getDataRetenciones('/mretenciones','setData','datos')
    this.$refs.desactivateCrud.desactivarCrud('c_retenciones', 'r_retenciones', 'u_retenciones', 'd_retenciones', 'desactivarCrud')

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
    reglasNotNull50(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val > 49) {
            return "Deben ser Maximo 50 Caracteres";
          }
      }
    },
    reglasNotNull12(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val > 9999999999.99) {
            return "Monto Maximo Superado";
          }
      }
    },
    reglasNotNull3(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val > 999) {
            return "Deben ser Maximo 3 Caracteres";
          }
      }
    },
    reglasNotNull2(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val > 99) {
            return "Deben ser Maximo 2 Caracteres";
          }
      }
    },

    // Desactivar CRUD
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
      } else this.$router.push("/error403");
    },

    // Metodos CRUD
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    getDataRetenciones(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false
    },  
    setDataEdit(res, dataRes) {
      this.loading = false
      this.formEdit.id = res.id
      this.formEdit.cod_tipo_persona = res.tipo_persona_desc
      this.formEdit.cod_tipo_retencion = res.cod_tipo_retencion
      this.formEdit.nb_tipo_retencion = res.nb_tipo_retencion
      this.formEdit.porc_base = res.porc_base
      this.formEdit.porc_retencion = res.porc_retencion
      this.formEdit.pago_mayor = res.pago_mayor
      this.formEdit.sustraendo = res.sustraendo
      this.formEdit.cod_seniat = res.cod_seniat
      this.formEdit.fecha_ini_val = res.fecha_ini_val
      this.formEdit.fecha_fin_val = res.fecha_fin_val
    },   
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/mretenciones/${idpost}`, 'getDataRetenciones', this.axiosConfig);
      this.loading = true;
    },
    createData() {
      this.form.cod_tipo_persona = this.form.cod_tipo_persona.value
      this.$refs.methods.createData('/mretenciones', this.form, 'getDataRetenciones', this.axiosConfig);
      this.resetForm();
      this.loading = true;
    },
    putData() {
      this.formEdit.cod_tipo_persona = this.formEdit.cod_tipo_persona.value
      this.$refs.methods.putData(`/mretenciones/${this.formEdit.id}`, this.formEdit, 'getDataRetenciones', this.axiosConfig);
      this.edit = false;
      this.resetFormEdit();
      this.loading = true;
    },
    
    resetForm() {
      (this.form.cod_tipo_persona = ""),
      (this.form.cod_tipo_retencion = ""),
      (this.form.nb_tipo_retencion = ""),
      (this.form.porc_base = ""),
      (this.form.porc_retencion = ""),
      (this.form.pago_mayor = ""),
      (this.form.cod_seniat = ""),
      (this.form.sustraendo = ""),
      (this.form.fecha_ini_val = ""),
      (this.form.fecha_fin_val = ""),
      (this.create = false);    
    },
    resetFormEdit() {
      (this.formEdit.id = ""),
      (this.formEdit.cod_tipo_persona = ""),
      (this.formEdit.cod_tipo_retencion = ""),
      (this.formEdit.nb_tipo_retencion = ""),
      (this.formEdit.porc_base = ""),
      (this.formEdit.porc_retencion = ""),
      (this.formEdit.pago_mayor = ""),
      (this.formEdit.cod_seniat = ""),
      (this.formEdit.sustraendo = ""),
      (this.formEdit.fecha_ini_val = ""),
      (this.formEdit.fecha_fin_val = "")
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
