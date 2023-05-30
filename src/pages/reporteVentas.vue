<template>
  <q-page class="pagina q-pa-md">
    <div
      class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      style="margin-left: 100px; margin-right: 120px"
    >
      <div
          class="row q-pa-md col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center; margin-top: 15px"
        >
          <div
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
            style="align-self: center; text-align: center"
          >
            <p
              style="font-size: 25px; margin-bottom: 25px"
              class="text-secondary"
            >
              <strong>REPORTE DE VENTAS</strong>
            </p>
          </div>
          <div
            class="col-md-11 col-xl-11 col-lg-11 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="tipos_reportes"
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              v-model="selectedReport"
              outlined
              standout
              label="Tipo de Reporte"
              @update:model-value="changeFilters()"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 justify-center" style="text-align: center; margin-bottom: 15px"
          >
            <q-btn dense color="primary" round padding="sm">
              <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
              <q-tooltip
                class="bg-primary"
                style="max-height: 30px"
                transition-show="scale"
                transition-hide="scale"
                color="primary"
                >Limpiar Filtros</q-tooltip
              >
            </q-btn>
          </div>
          <div
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="reportType"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'clientesSelected',
                    'clientes',
                    'nb_cliente'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="nb_cliente"
              option-value="id"
              :disable="disableAgencia"
              v-model="selectedCliente"
              outlined
              standout
              label="Agencia"
              @update:model-value="getDataTable()"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="reportType"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'clientesSelected',
                    'clientes',
                    'nb_cliente'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="nb_cliente"
              option-value="id"
              :loading="clientesLoading"
              :disable="disablecliente"
              v-model="selectedCliente"
              outlined
              standout
              label="Cliente"
              @update:model-value="getDataTable()"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="reportType"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'clientesSelected',
                    'clientes',
                    'nb_cliente'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="nb_cliente"
              option-value="id"
              :loading="clientesLoading"
              :disable="disableagente"
              v-model="selectedCliente"
              outlined
              standout
              label="Agente"
              @update:model-value="getDataTable()"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12"
            style="align-self: center; text-align: center"
          >
            <p
              style="font-size: 25px; margin-bottom: 0px; margin-bottom: 15px"
              class="text-secondary"
            >
              <strong>Periodo Consultado</strong>
            </p>
          </div>
          <div
            class="col-md-4 col-xs-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-input
              outlined
              label="Fecha Desde:"
              hint=""
              rounded
              style="padding-bottom: 0px"
              :disable="disabledesde"
              lazy-rules
              dense
              mask="##/##/####"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date mask="DD/MM/YYYY"></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div
            class="col-md-4 col-xs-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-input
              outlined
              label="Fecha Hasta:"
              hint=""
              rounded
              :disable="disablehasta"
              lazy-rules
              dense
              style="padding-bottom: 0px"
              mask="##/##/####"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date mask="DD/MM/YYYY"></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-btn-toggle
              v-model="selectedTipo"
              spread
              class="my-custom-toggle"
              rounded
              :disable="disablevisible"
              unelevated
              toggle-color="primary"
              color="white"
              text-color="black"
              :options="monto_venta"
              @update:model-value="getDataClientes()"
            >
            </q-btn-toggle>
          </div>
          <div
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="clientesSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'clientesSelected',
                    'clientes',
                    'nb_cliente'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="nb_cliente"
              option-value="id"
              :loading="clientesLoading"
              :disable="disableestatus"
              v-model="selectedCliente"
              outlined
              standout
              label="Estatus"
              @update:model-value="getDataTable()"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="clientesSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'clientesSelected',
                    'clientes',
                    'nb_cliente'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="nb_cliente"
              option-value="id"
              :loading="clientesLoading"
              :disable="disabledocumento"
              v-model="selectedCliente"
              outlined
              standout
              label="Tipo de Documento"
              @update:model-value="getDataTable()"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-6 col-xl-162 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="clientesSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'clientesSelected',
                    'clientes',
                    'nb_cliente'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="nb_cliente"
              :disable="disableformapago"
              option-value="id"
              :loading="clientesLoading"
              v-model="selectedCliente"
              outlined
              standout
              label="Forma de Pago"
              @update:model-value="getDataTable()"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="clientesSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'clientesSelected',
                    'clientes',
                    'nb_cliente'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="nb_cliente"
              :disable="disablepagadoen"
              option-value="id"
              :loading="clientesLoading"
              v-model="selectedCliente"
              outlined
              standout
              label="Pagado En"
              @update:model-value="getDataTable()"
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-6 col-xl-6 col-lg-6 col-xs-6 col-sm-6"
            style="align-self: center; text-align: center"
          >
            <p
              style="font-size: 25px; margin-bottom: 15px"
              class="text-secondary"
            >
              <strong>Orden Correlativo</strong>
            </p>
          </div>
          <div
            class="col-md-6 col-xl-6 col-lg-6 col-xs-6 col-sm-6 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-btn-toggle
              v-model="selectedTipo"
              spread
              class="my-custom-toggle"
              rounded
              unelevated
              :disable="disableordencorrelativo"
              toggle-color="primary"
              color="white"
              text-color="black"
              :options="tipos"
              @update:model-value="getDataClientes()"
            >
            </q-btn-toggle>
          </div>
          <div
            class="col-md-6 col-xl-6 col-lg-6 col-xs-6 col-sm-6"
            style="align-self: center; text-align: center"
          >
            <p
              style="font-size: 25px; margin-bottom: 15px"
              class="text-secondary"
            >
              <strong>Agrupado Cliente</strong>
            </p>
          </div>
          <div
            class="col-md-6 col-xl-6 col-lg-6 col-xs-6 col-sm-6 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 15px"
          >
            <q-btn-toggle
              v-model="selectedTipo"
              spread
              class="my-custom-toggle"
              rounded
              unelevated
              :disable="disableagrupadocliente"
              toggle-color="primary"
              color="white"
              text-color="black"
              :options="tipos"
              @update:model-value="getDataClientes()"
            >
            </q-btn-toggle>
          </div>
      </div>
      <div
        class="q-pa-md col-md-6 col-xs-12 q-gutter-y-md justify-center"
        style="height: 650px"
      >
        <webViewer ref="webViewer" v-if="pdf == true"></webViewer>
      </div>
    </div>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import { api } from "boot/axios";
import moment from "moment";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import webViewerVue from "src/components/webViewer.vue";

export default {
  components: {
    methods: methodsVue,
    webViewer: webViewerVue,
    rulesVue,
  },
  data() {
    return {
      reportType: [
        { label: "RESUMEN", value: "C" },
        { label: "RANGO DE FECHAS", value: "A" },
        { label: "DISTRIBUCION PRORRATEADA POR CIUDAD", value: "A" },
        { label: "DISTRIBUCION REAL POR CIUDAD", value: "A" },
        { label: "AGENTES O PROVEEDORES", value: "A" },
        { label: "AYUDANTE", value: "A" },
        { label: "GUIAS PENDIENTES POR ASOCIAR COSTO", value: "A" },
        { label: "REPORTE DE VIAJES POR VEHICULO", value: "A" },
        { label: "REPORTE DE VIAJES POR AGENTE", value: "A" },
      ],
      tipos: [
        { label: "Si", value: "C", slot: "clte" },
        { label: "No", value: "P", slot: "part" },
      ],
      monto_venta: [
        { label: "Visible", value: "C", slot: "clte" },
        { label: "No Visible", value: "P", slot: "part" },
      ],
      tipos_reportes: [
        {
          label: "VENTAS GENERALES",
          value: "VG",
        },
        {
          label: "VENTAS POR CLIENTES",
          value: "VC",
        },
        {
          label: "TOTALES DE VENTAS",
          value: "TV",
        },
        {
          label: "TOTALES RELACIÓN DESPACHO",
          value: "TRD",
        },
        {
          label: "GUÍAS CARGAS",
          value: "GC",
        },
        {
          label: "GUÍAS FACTURAS",
          value: "GF",
        },
        {
          label: "FACTURAS",
          value: "F",
        },
        {
          label: "FACTURAS FPO",
          value: "FFPO",
        },
        {
          label: "NOTAS DE CRÉDITO",
          value: "NC",
        },
        {
          label: "NOTAS DE DÉBITO",
          value: "ND",
        },
        {
          label: "DOCUMENTOS EMITIDOS",
          value: "DE",
        },
        {
          label: "COBRANZA GENERAL",
          value: "CG",
        },
        {
          label: "COBRO EN DESTINO",
          value: "CD",
        },
        {
          label: "CUENTAS POR COBRAR",
          value: "CC",
        },
        {
          label: "CUENTAS POR COBRAR CLIENTE",
          value: "CCC",
        },
      ],
      selectedTipo: 'C',
      disable: true,
      disableVG: true,
      disableVC: true,
      disableTV: true,
      disableTRD: true,
      disableGC: true,
      disableGF: true,
      disableF: true,
      disableFFPO: true,
      disableNC: true,
      disableND: true,
      disableDE: true,
      disableGC: true,
      disableGD: true,
      disableCC: true,
      disableCCC: true,
      selectedReport: [],
      tipo: [
        { label: "I", value: "I" },
        { label: "E", value: "E" },
      ],
      cargaNeta: [
        { label: "PESO KGS", value: "K", slot: "one" },
        { label: "PESO NETO", value: "N", slot: "two" },
      ],
      tipoReporte: [
        {
          label: "RESUMEN DE COSTOS DE TRANSPORTE",
          value: "RCT",
        },
        {
          label: "COSTOS DE TRANSPORTE POR RANGO DE FECHAS",
          value: "CTR",
        },
        {
          label: "DISTRIBUCIÓN PRORRATEADA DEL COSTO DE TRANSPORTE POR CIUDAD",
          value: "DTC",
        },
        {
          label: "DISTRIBUCIÓN REAL DEL COSTO DE TRANSPORTE POR CIUDAD",
          value: "DRC",
        },
        {
          label: "COSTO DE TRANSPORTE POR AGENTE O PROVEEDORES",
          value: "CTP",
        },
        {
          label: "COSTO DE TRANSPORTE POR AYUDANTE",
          value: "CTA",
        },
        {
          label: "GUÍAS PENDIENTES POR ASOCIAR COSTOS DE TRANSPORTE",
          value: "GPC",
        },
        {
          label: "REPORTE DE VIAJES POR VEHÍCULO",
          value: "RVV",
        },
        {
          label: "REPORTE DE VIAJES POR AGENTE",
          value: "RVA",
        },
      ],
      pdf: true,
      reportValue: "",
      selectedNeta: "K",
      selectedTipoT: "I",
      selectedDolar: false,
      selectedTipo: [],
      agencias: [],
      agentes: [],
      proveedores: [],
      unidades: [],
      ayudantes: [],
      agenciasSelected: [],
      selectedAgencia: [],
      agentesSelected: [],
      selectedAgente: [],
      unidadesSelected: [],
      selectedUnidad: [],
      proveedoresSelected: [],
      selectedProveedor: [],
      ayudantesSelected: [],
      selectedAyudante: [],
      fecha_desde: moment().format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      deletePopup: ref(false),
      dialog: ref(false),
      pdfView: ref(true),
    };
  },
  mounted() {
    this.pdfPrint();
    this.$refs.methods.getData("/agencias", "setData", "agencias");
    this.$refs.methods.getData("/proveedores", "setData", "proveedores", {
      headers: {
        tipo_servicio: "TP",
        activo: "S",
      },
    });
    this.$refs.methods.getData("/unidades", "setData", "unidades");
    this.$refs.methods.getData("/ayudantes", "setData", "ayudantes", {
      headers: {
        activo: "S",
      },
    });

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "reportedecostos",
      },
    });
  },
  methods: {
    // Metodo para filtrar opciones de Selects
    filterArray(val, update, pagina, array, element) {
      if (val === "") {
        update(() => {
          this[pagina] = this[array];
        });
        return;
      }
      update(() => {
        const needle = val.toUpperCase();
        var notEqual = [];
        for (var i = 0; i <= this[array].length - 1; i++) {
          if (this[array][i][element].indexOf(needle) > -1) {
            notEqual.push(this[array][i]);
          }
          if (i == this[array].length - 1) {
            this[pagina] = notEqual;
            break;
          }
        }
      });
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos Iniciales
    setData(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    async pdfChange(def) {
      if (def && this.reportValue == "") return;
      this.reportValue = "";
      if (!def) this.reportValue = this.selectedTipo.value;
      this.pdf = false;
      setTimeout(() => {
        this.pdfPrint();
        this.pdf = true;
      }, 100);
    },
    pdfPrint() {
      api
        .get(`/reports/reporteVentas`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            tipo: 'RCT',
          },
        })
        .then((res) => {
          this.$refs.webViewer.showpdf(res.data.base64);
        });
    },
    // Metodo para Resetear Filtros
    resetFilters() {
      this.agentes = [];
      this.selectedTipo = [];
      this.selectedAgencia = [];
      this.selectedAgente = [];
      this.selectedAyudante = [];
      this.selectedProveedor = [];
      this.selectedUnidad = [];
      this.selectedNeta = "K";
      this.selectedTipoT = "I";
      this.selectedDolar = false;
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.pdfChange(0);
    },
  },
};
</script>

<style>
.q-inner-loading__label {
  margin-bottom: 10px;
}
</style>
