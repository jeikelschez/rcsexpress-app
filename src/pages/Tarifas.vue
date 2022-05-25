<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_urgencia"
                  label="Tipo de Urgencia"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="urgencias"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_tarifa"
                  label="Tipo de Tarifa"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="tarifas"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>   
              
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_ubicacion"
                  label="Tipo de Ubicación"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="ubicacion"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div> 

              <div class="col-md-4 col-xs-12">
                <currency-input
                  :options="{ currency: 'USD' }"
                  outlined
                  v-model="form.monto_tarifa"
                  label="Monto de Tarifa"
                  hint=""
                  class="pcform"
                  lazy-rules
                >
                </currency-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.kgr_hasta"
                  label="Kgrs Hasta"
                  class="pcform"
                  :rules="[reglasAllowNull6]"
                  hint=""
                  lazy-rules
                  mask="#####"
                >
                  <template v-slot:prepend>
                    <q-icon name="123" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_carga"
                  label="Tipo de Carga"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="cargas"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div> 

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.modalidad_pago"
                  label="Modalidad de Pago"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="modalidad_pago"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.pagado_en"
                  label="Lugar de Pago"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="ubicacion_pago"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>   
              
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.region_origen"
                  label="Region Origen"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="region_origen"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.region_destino"
                  label="Region Destino"
                  input-class="input"
                  class="pcform"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="region_destino"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tiempo_servicio"
                  label="Tiempo (HRS) Servicio"
                  hint=""
                  type="number"
                  lazy-rules
                  min="0"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Tarifa"
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
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.tipo_urgencia"
                  label="Tipo de Urgencia"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="urgencias"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.tipo_tarifa"
                  label="Tipo de Tarifa"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="tarifas"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>   
              
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.tipo_ubicacion"
                  label="Tipo de Ubicación"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="ubicacion"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div> 

              <div class="col-md-4 col-xs-12">
                <currency-input
                  :options="{ currency: 'USD' }"
                  outlined
                  v-model="formEdit.monto_tarifa"
                  label="Monto de Tarifa"
                  hint=""
                  class="pcform"
                  lazy-rules
                >
                </currency-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.kgr_hasta"
                  label="Kgrs Hasta"
                  class="pcform"
                  :rules="[reglasAllowNull6]"
                  hint=""
                  lazy-rules
                  mask="#####"
                >
                  <template v-slot:prepend>
                    <q-icon name="123" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.tipo_carga"
                  label="Tipo de Carga"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="cargas"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div> 

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.modalidad_pago"
                  label="Modalidad de Pago"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="modalidad_pago"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.pagado_en"
                  label="Lugar de Pago"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="ubicacion_pago"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>   
              
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.region_origen"
                  label="Region Origen"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="region_origen"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.region_destino"
                  label="Region Destino"
                  input-class="input"
                  class="pcform"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="region_destino"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.tiempo_servicio"
                  label="Tiempo (HRS) Servicio"
                  hint=""
                  type="number"
                  lazy-rules
                  min="0"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Tarifa"
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
            <h4><strong>MANTENIMIENTO - TARIFAS</strong></h4>
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
              label="Insertar Proveedor"
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
                        getData(`/tarifas/${props.row.id}`, 'setDataEdit', 'formEdit');
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
                                getData(`/tarifas/${props.row.id}`, 'setDataEdit', 'formEdit');
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
    @get-Data="getData('/tarifas','setData','datos')"
    @set-data="setData"
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
          name: "id",
          label: "Código",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_urgencia",
          label: "Tipo de Urgencia",
          field: "tipo_urgencia",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_tarifa",
          label: "Tipo de Tarifa",
          field: "tipo_tarifa",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_ubicacion",
          label: "Tipo de Ubicación",
          field: "tipo_ubicacion",
          align: "left",
          sortable: true,
        },
        {
          name: "region_origen",
          label: "Region Origen",
          field: "region_origen",
          align: "left",
          sortable: true,
        },
        {
          name: "region_destino",
          label: "Region Destino",
          field: "region_destino",
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
        monto_tarifa: "",
        tipo_urgencia: [],
        tipo_tarifa: [],
        tipo_ubicacion: [],
        kgr_hasta: "",
        tipo_carga: [],
        modalidad_pago: [],
        pagado_en: [],
        region_origen: [],
        region_destino: [],
        tiempo_servicio: "",
      },
      urgencias: [
        { label: "NORMAL", value: "N" },
        { label: "EMERGENCIA", value: "E" },
      ],
      tarifas: [
        { label: "BÁSICA", value: "BA" },
        { label: "KGRS.ADICIONALES", value: "KA" },
      ],
      ubicacion: [
        { label: "URBANA", value: "U" },
        { label: "EXTRA-URBANA", value: "E" },
      ],
      cargas: [
        { label: "PAQUETES", value: "PM" },
        { label: "SOBRE-BULTOS", value: "SB" },
      ],
      modalidad_pago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
      ],
      ubicacion_pago: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      region_origen: [
        { label: "CENTRAL", value: "CE" },
        { label: "OCCIDENTAL", value: "OC" },
        { label: "ORIENTAL", value: "OR" },
      ],
      region_destino: [
        { label: "CENTRAL", value: "CE" },
        { label: "OCCIDENTAL", value: "OC" },
        { label: "ORIENTAL", value: "OR" },
      ],
      datos: [],
      formEdit: {
        id: "",
        monto_tarifa: "",
        tipo_urgencia: [],
        tipo_tarifa: [],
        tipo_ubicacion: [],
        kgr_hasta: "",
        tipo_carga: [],
        modalidad_pago: [],
        pagado_en: [],
        region_origen: [],
        region_destino: [],
        tiempo_servicio: "",
      },
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
      medium: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData('/tarifas','setData','datos')
    this.$refs.desactivateCrud.desactivarCrud('c_bancos', 'd_bancos', 'u_bancos', 'desactivarCrudBancos')
  },
  methods: {
    // Reglas
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasAllowNull6(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length > 5) {
            return "Deben ser Maximo 6 caracteres";
          }
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
      this.$refs.methods.getData(url, call, dataRes);
    },
    setData(res, dataRes) {
      this[dataRes] = res
    },  
    setDataEdit(res, dataRes) {
      this.formEdit.id = res.id
      this.formEdit.monto_tarifa = res.monto_tarifa
      this.formEdit.kgr_hasta = res.kgr_hasta
      this.formEdit.tiempo_servicio = res.tiempo_servicio
      this.formEdit.tipo_urgencia = res.tipo_urgencia
      this.formEdit.tipo_tarifa = res.tipo_tarifa
      this.formEdit.tipo_ubicacion = res.tipo_ubicacion
      this.formEdit.tipo_carga = res.tipo_carga
      this.formEdit.modalidad_pago = res.modalidad_pago
      this.formEdit.pagado_en = res.pagado_en
      this.formEdit.region_origen = res.region_origen
      this.formEdit.region_destino = res.region_destino
      this.formEdit.tiempo_servicio = res.tiempo_servicio
    },   
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/tarifas/${idpost}`, 'getData');
    },
    createData() {
      this.form.tipo_urgencia = this.form.tipo_urgencia.value
      this.form.tipo_tarifa = this.form.tipo_tarifa.value
      this.form.tipo_ubicacion = this.form.tipo_ubicacion.value
      this.form.tipo_carga = this.form.tipo_carga.value
      this.form.modalidad_pago = this.form.modalidad_pago.value
      this.form.pagado_en = this.form.pagado_en.value
      this.form.region_origen = this.form.region_origen.value
      this.form.region_destino = this.form.region_destino.value
      this.form.tiempo_servicio = this.form.tiempo_servicio.value
      this.$refs.methods.createData('/tarifas', this.form, 'getData');
      this.resetForm();
    },
    putData() {
      this.form.tipo_urgencia = this.form.tipo_urgencia.value
      this.form.tipo_tarifa = this.form.tipo_tarifa.value
      this.form.tipo_ubicacion = this.form.tipo_ubicacion.value
      this.form.tipo_carga = this.form.tipo_carga.value
      this.form.modalidad_pago = this.form.modalidad_pago.value
      this.form.pagado_en = this.form.pagado_en.value
      this.form.region_origen = this.form.region_origen.value
      this.form.region_destino = this.form.region_destino.value
      this.form.tiempo_servicio = this.form.tiempo_servicio.value
      this.$refs.methods.putData(`/tarifas/${this.formEdit.id}`, this.formEdit, 'getData');
      this.edit = false;
      this.resetFormEdit()
    },
    
    resetForm() {
      (this.form.monto_tarifa = ""),
      (this.form.kgr_hasta = ""),
      (this.form.tiempo_servicio = ""),
      (this.form.tipo_urgencia = ""),
      (this.form.tipo_tarifa = ""),
      (this.form.tipo_ubicacion = ""),
      (this.form.tipo_carga = ""),
      (this.form.modalidad_pago = ""),
      (this.form.pagado_en = ""),
      (this.form.region_destino = ""),
      (this.form.region_origen = ""),
      (this.form.tiempo_servicio = ""),
      (this.create = false);    
    },
    resetFormEdit() {
      (this.formEdit.monto_tarifa = ""),
      (this.formEdit.kgr_hasta = ""),
      (this.formEdit.tiempo_servicio = ""),
      (this.formEdit.tipo_urgencia = ""),
      (this.formEdit.tipo_tarifa = ""),
      (this.formEdit.tipo_ubicacion = ""),
      (this.formEdit.tipo_carga = ""),
      (this.formEdit.modalidad_pago = ""),
      (this.formEdit.pagado_en = ""),
      (this.formEdit.region_destino = ""),
      (this.formEdit.region_origen = ""),
      (this.formEdit.tiempo_servicio = ""),
      (this.create = false);    
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
