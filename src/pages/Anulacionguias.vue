<template>
  <q-page class="pagina q-pa-md">

    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 70vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                      outlined
                      label="Fecha"
                      hint=""
                      v-model="form.f_val"
                      mask="date"
                      :rules="['date']"
                      class="pcform"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.f_val">
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
                <q-select
                  outlined
                  v-model="form.direccion_banco"
                  label="Motivo"
                  hint=""
                  :rules="[reglaInput]"
                  lazy-rules
                  @update:model-value="
                    form.direccion_banco = form.direccion_banco.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.fax_banco"
                  label="Observación"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="#### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

            </div>

            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Anular Guia"
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
        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary justify-center"
        style="align-self: center; text-align: center"
      >
        <h4><strong>MANTENIMIENTO - ANULACIÓN DE GUIAS</strong></h4>
      </div>

      <div class="row col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 filterTop"
        style="align-self: center; text-align: center; margin-top: 10px;"
      >
        <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 selectmovil"
          style="align-self: center; text-align: center; margin-bottom: 20px"
        >
          <q-select
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agencias"
            option-label="nb_agencia"
            option-value="id"
            v-model="selectedAgencia"
            outlined
            standout
            label="Agencia"
            @update:model-value="
              this.axiosConfig.headers.agencia = this.selectedAgencia.id;
              getData(`/cguias`, 'setDataSelect', 'datos');
            "
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>

        <q-card bordered class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 inputGuias"
          style="align-self: center; text-align: center; margin-right: 26px"
        >
          <q-card-section
            class="row col-md-12 col-xs-12 menuFilter"
            style="align-self: center; text-align: center"
          >
            <div class="col-md-6 col-xs-12">
              <q-input
                      outlined
                      label="Guia Hasta:"
                      hint=""
                      v-model="form.f_val"
                      mask="date"
                      :rules="['date']"
                      class="pcform"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.f_val"
                        @keydown.enter="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/cguias`, 'setData', 'datos');
                  this.reglasCorrelativoFilter()"
                @keydown.tab="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/cguias`, 'setData', 'datos');
                  this.reglasCorrelativoFilter()"
                @blur="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/cguias`, 'setData', 'datos');
                  this.reglasCorrelativoFilter()">
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
                      label="Guia Hasta:"
                      hint=""
                      v-model="form.f_val"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.f_val" @keydown.enter="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/cguias`, 'setData', 'datos');
                  this.reglasCorrelativoFilter()"
                @keydown.tab="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/cguias`, 'setData', 'datos');
                  this.reglasCorrelativoFilter()"
                @blur="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/cguias`, 'setData', 'datos');
                  this.reglasCorrelativoFilter()">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
              </q-input>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="row col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-5"
        style="align-self: center; text-align: center; margin-top: 10px"
      >
        <q-card bordered class="row col-md-12 col-xs-12 col-xl-12 col-lg-12 col-sm-12 espaciadoGuias"
        >
          <q-card-section class="row col-md-12 col-xs-12">

            <div class="col-md-12 col-xs-12 col-sm-12"
              style="align-self: center; text-align: center; margin-top: 15px" 
            >
              <p
                style="
                  font-size: 20px;
                  align-self: center;
                  text-align: center;
                  margin-bottom: 20px;
                "
                class="text-secondary"
              >
                <strong>TIPO DE GUIA</strong>
              </p>
            </div>

            <div class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 justify-center"
            style="align-self: center; text-align: center"
            >
            <div class="col-md-3 col-xs-12 col-sm-12 buttonMenuInitial"
              style="
                align-self: center;
                text-align: center;
              "
              id="select"
            >
              <q-field
                hide-bottom-space
                borderless
                @update:model-value="
                  this.axiosConfig.headers.tipo_guia_carga =
                    this.selectedGuiaCarga.value;
                  getData(`/cguias`, 'setData', 'datos');
                "
                dense
                v-model="selectedGuiaCarga"
              >
                <template v-slot:control>
                  <q-checkbox
                    size="md"
                    v-model="selectedGuiaCarga"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Guia de Carga"
                  />
                </template>
              </q-field>
            </div>

            <div class="col-md-3 col-xs-12 col-sm-12 buttonMenu"
              style="
                align-self: center;
                text-align: center;
              "
              id="select"
            >
              <q-field class="check"
                hide-bottom-space
                borderless
                dense
                @update:model-value="
                  this.axiosConfig.headers.tipo_guia_factura =
                    this.selectedGuiaFactura.value;
                  getData(`/cguias`, 'setData', 'datos');
                "
                v-model="selectedGuiaFactura"
              >
                <template v-slot:control>
                  <q-checkbox
                    size="md"
                    v-model="selectedGuiaFactura"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Guia de Factura"
                  />
                </template>
              </q-field>
            </div>

            <div class="col-md-3 col-xs-12 col-sm-12 buttonMenu"
              style="
                align-self: center;
                text-align: center;
              "
              id="select"
            > 
              <q-field class="check"
                hide-bottom-space
                borderless
                dense
                @update:model-value="
                  this.axiosConfig.headers.tipo_guia_factura =
                    this.selectedGuiaFactura.value;
                  getData(`/cguias`, 'setData', 'datos');
                "
                v-model="selectedGuiaFactura"
              >
                <template v-slot:control>
                  <q-checkbox
                    size="md"
                    v-model="selectedGuiaFactura"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Factura"
                  />
                </template>
              </q-field>
            </div>
            </div>
          </q-card-section>
        </q-card>
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
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="delete"
                  :disabled="this.disabledDelete"
                  @click.capture="create = true"
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
                          icon="delete"
                          :disabled="this.disabledDelete"
                          @click.capture="create = true"
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
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <desactive-crud
      ref="desactiveCrud"
      @desactivar-Crud-Pais-Estado-Ciudad="desactivarCrudPaisEstadoCiudad"
    ></desactive-crud>

    <methods
      ref="methods"
      @get-Data="getData('/cguias', 'setData', 'datos')"
      @get-Data-Guias="getDataGuias('/cguias', 'setData', 'datos')"
      @set-Data="setData"
      @reset-Loading="resetLoading"
      @set-Data-Iniciar="setDataIniciar"
      @set-Data-Edit="setDataEdit"
      @set-Data-Select="setDataSelect"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import methodsVue from "src/components/methods.vue";

import { LocalStorage } from "quasar";

import desactivateCrudVue from "src/components/desactivateCrud.vue";

export default {
  components: { "desactive-crud": desactivateCrudVue, methods: methodsVue },
  name: "AsignacionGuias",
  data() {
    return {
      columns: [
        {
          name: "control_inicio",
          label: "NRO. Control",
          field: "control_inicio",
          align: "left",
          sortable: true,
        },
        {
          name: "control_final",
          label: "NRO. Doc.",
          field: "control_final",
          align: "left",
          sortable: true,
        },
        {
          name: "cant_asignada",
          label: "Ref.",
          field: "cant_asignada",
          align: "left",
          sortable: true,
        },
        {
          name: "fecha_asignacion",
          label: "Fecha Emision",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
        },
        {
          name: "fecha_asignacion",
          label: "Cliente",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
        },
        {
          name: "fecha_asignacion",
          label: "Monto Total",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
        },
        {
          name: "cant_disponible",
          label: "Documento Principal",
          field: "cant_disponible",
          align: "left",
          sortable: true,
        },
        {
          name: "cant_disponible",
          label: "Estatus",
          field: "cant_disponible",
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
      tipoGuia: [
        { label: "GUÍA DE CARGA", value: "20" },
        { label: "GUÍA DE FACTURA", value: "21" },
      ],
      form: {
        control_inicio: "",
        control_final: "",
        cant_asignada: "",
        cant_disponible: "",
        fecha_asignacion: "",
        cod_agencia: "",
        cod_agente: "",
        cod_cliente: "",
        tipo: "",
      },
      formEdit: {
        control_inicio: "",
        control_final: "",
        cant_asignada: "",
        cant_disponible: "",
        fecha_asignacion: "",
        cod_agencia: "",
        cod_agente: "",
        cod_cliente: "",
        tipo: "0",
        id: "",
      },
      datos: [],
      agencias: [],
      clientes: [],
      agentes: [],
      agenciasForm: [],
      clientesForm: [],
      agentesForm: [],
      selected: [],
      refAgencia: "",
      refCliente: "",
      refAgente: "",
      selectedAgencia: [],
      selectedGuiaCarga: "0",
      selectedGuiaFactura: "0",
      selectedCulminado: "0",
      selectedCliente: [],
      selectedAgente: [],
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
          agencia: "",
          tipo: "",
        },
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      create: ref(false),
      loading: ref(false),
      edit: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData("/agencias", "setDataIniciar", "agencias");
    this.$refs.desactiveCrud.desactivarCrud(
      "c_ciudades",
      "d_ciudades",
      "u_ciudades",
      "desactivarCrudPaisEstadoCiudad"
    );
  },
  methods: {
    resetLoading() {
      this.loading = false;
    },
    // Reglas
    reglasNotNull10(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if ((val !== null) !== "") {
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
      if ((val !== null) !== "") {
        if (val.length < this.form.control_inicio.length) {
          return "El Ultimo Correlativo debe ser Mayor al Primero";
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
      if ((val !== null) !== "") {
        if (val.length < this.formEdit.control_inicio.length) {
          return "El Ultimo Correlativo debe ser Mayor al Primero";
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
    desactivarCrudPaisEstadoCiudad(createItem, deleteItem, updateItem) {
      if (createItem == true) {
        this.disabledCreate = false;
      }
      if (deleteItem == true) {
        this.disabledDelete = false;
      }
      if (updateItem == true) {
        this.disabledEdit = false;
      }
    },
    // Metodos
    setDataSelect(res, dataRes) {
      this[dataRes] = res;
      this.selectedCliente = [];
      this.selectedAgente = [];
      this.loading = false
    },
    getDataGuias(url, call, dataRes) {
      this.axiosConfig.headers.agencia = this.selectedAgencia.id
      this.axiosConfig.headers.cliente = this.selectedCliente.id
      this.axiosConfig.headers.agente = this.selectedAgente.id
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    getDataEdit(id) {
      this.$refs.methods.getDataEdit(
        `/cguias/${id}`,
        `setDataEdit`,
        "formEdit",
        this.axiosConfig
      );
    },
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false
    },
    setDataIniciar(res, dataRes) {
      this[dataRes] = res;
      this.getDataIniciar();
      this.loading = false
    },
    setDataEdit(res, dataRes) {
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].cant_asignada = res.cant_asignada;
      this[dataRes].cant_disponible = res.cant_disponible;
      this[dataRes].fecha_asignacion = res.fecha_asignacion;
      var cod_agencia = res.cod_agencia;
      var cod_agente = res.cod_agente;
      var cod_cliente = res.cod_cliente;
      api.get(`/agencias/${cod_agencia}`, this.axiosConfig).then((res) => {
        this.formEdit.cod_agencia = res.data;
        this.axiosConfig.headers.agencia = cod_agencia
        if (cod_cliente) {
          api.get(`/clientes/${cod_cliente}`, this.axiosConfig).then((res) => {
          this.formEdit.cod_cliente = res.data;
        });
        this.getData("/clientes", "setData", "clientesForm");
        }
        if (cod_agente) {
              api.get(`/agentes/${cod_agente}`, this.axiosConfig)
                .then((res) => {
                  this.formEdit.cod_agente = res.data;});
              this.getData("/agentes", "setData", "agentesForm");
        }
      });
      this[dataRes].tipo = res.tipo_desc;
      this[dataRes].id = res.id;
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/cguias/${idpost}`,
        "getDataGuias",
        this.axiosConfig
      );
      this.loading = true;
    },
    createData() {
      this.form.cod_cliente = this.form.cod_cliente.id
      this.form.cod_agente = this.form.cod_agente.id
      this.form.tipo = this.form.tipo.value,
      this.form.cod_agencia = this.form.cod_agencia.id,
        this.$refs.methods.createData(
          `/cguias`,
          this.form,
          "getDataGuias",
          this.axiosConfig
        );
      this.resetForm();
      this.loading = true;
    },
    putData() {
      this.formEdit.cod_cliente = this.formEdit.cod_cliente.id
      this.formEdit.cod_agente = this.formEdit.cod_agente.id
      this.formEdit.cod_agencia = this.formEdit.cod_agencia.id,
      this.formEdit.tipo = this.formEdit.tipo.value,
      this.$refs.methods.putData(
        `/cguias/${this.formEdit.id}`,
        this.formEdit,
        "getDataGuias",
        this.axiosConfig
      );
      this.resetFormEdit();
      this.loading = true;
    },
    resetForm() {
      (this.form.control_inicio = ""),
        (this.form.control_final = ""),
        (this.form.cant_asignada = ""),
        (this.form.cant_disponible = ""),
        (this.form.fecha_asignacion = ""),
        (this.form.cod_agencia = ""),
        (this.form.cod_agente = ""),
        (this.form.cod_cliente = ""),
        (this.form.tipo = ""),
        (this.agentesForm = []),
        (this.clientesForm = []),
        (this.create = false);
    },
    resetFormEdit() {
      (this.formEdit.control_inicio = ""),
      (this.formEdit.control_final = ""),
      (this.formEdit.cant_asignada = ""),
      (this.formEdit.cant_disponible = ""),
      (this.formEdit.fecha_asignacion = ""),
      (this.formEdit.cod_agencia = ""),
      (this.formEdit.cod_agente = ""),
      (this.formEdit.cod_cliente = ""),
      (this.formEdit.tipo = ""),
      (this.agentesForm = []),
      (this.clientesForm = []),
      (this.edit = false);
    },

    // Metodos para colocar valores iniciales
    getDataIniciar() {
      this.axiosConfig.headers.agencia = this.agencias[0].id;
      this.selectedAgencia = this.agencias[0];
      this.getData("/clientes", "setData", "clientes");
      this.getData("/agentes", "setData", "agentes");
      this.getData("/cguias", "setData", "datos");
    },
  },
};
</script>

<style>
@media screen and (max-width: 1024px) {
  .espaciadoGuias {
    margin-top: 20px;
  }
}
.menuFilter {
    padding-bottom: 1px;
}
.buttonMenu {
    margin-left: 20px;
}
@media screen and (min-width: 1024px) {
  .inputMenuGuias {
    margin-right: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .inputMenuGuias2 {
    margin-right: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .buttonMenuInitial {
    margin-left: 20px;
  }
}
@media screen and (max-width: 1024px) {
  .check {
    padding-top: 0px; padding-bottom: 0px;
  }
}
@media screen and (max-width: 1024px) {
  .button-filter {
    margin-top: 13px;
  }
}
@media screen and (max-width: 1024px) {
  .inputMenuGuias {
    margin-top: 14px;
  }
}
@media screen and (max-width: 600px) {
  .selectmovil {
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 1024px) {
  .checkboxGuias {
    margin-top: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 30px;
  }
}
@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 30px;
  }
}
@media screen and (min-width: 600px) {
  .filterTop {
    margin-right: 45px;
  }
}
</style>
