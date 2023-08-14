<template>
  <q-page class="pagina q-pa-md">
    <div
      class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      style="margin-left: 20px"
    >
      <div
        class="row col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 q-pa-sm justify-center"
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
          class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="tipoReporte"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            v-model="selectedTipo"
            outlined
            standout
            label="Tipo de Reporte"
            @update:model-value="pdfChange(true)"
          >
          </q-select>
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
            :options="agenciasSelected"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'agenciasSelected',
                  'agencias',
                  'nb_agencia'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="nb_agencia"
            option-value="id"
            v-model="selectedAgencia"
            outlined
            standout
            label="Agencia"
            @update:model-value="
              this.agentesLoading = true;
              this.selectedAgente = [];
              this.agentes = [];
              this.$refs.methods.getData(`/agentes`, 'setData', 'agentes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
              this.clientesLoading = true;
              this.selectedCliente = [];
              this.clientes = [];
              this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                  activo: 'S',
                },
              });
            "
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
          class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-select
            v-if="selectedTipo.value == 'VG'"
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agentesSelected"
            :loading="agentesLoading"
            :disable="agentesLoading"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'agentesSelected',
                  'agentes',
                  'persona_responsable'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="persona_responsable"
            option-value="id"
            v-model="selectedAgente"
            outlined
            standout
            label="Agente"
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
          <q-select
            v-else-if="
              selectedTipo.value == 'VC' ||
              selectedTipo.value == 'RD' ||
              selectedTipo.value == 'GC' ||
              selectedTipo.value == 'FA' ||
              selectedTipo.value == 'CD' ||
              selectedTipo.value == 'CCC'
            "
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="clientesSelected"
            :loading="clientesLoading"
            :disable="clientesLoading"
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
            v-model="selectedCliente"
            outlined
            standout
            label="Cliente"
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
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-12 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px; margin-bottom: 5px" class="text-secondary">
            <strong>Periodo Consultado</strong>
          </p>
        </div>
        <div
          class="col-md-6 col-xs-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-input
            outlined
            label="Fecha Desde"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_desde"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_desde"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                    @update:model-value="this.$refs.qDateProxy.hide()"
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-6 col-xs-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-input
            outlined
            label="Fecha Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_hasta"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_hasta"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                    @update:model-value="this.$refs.qDateProxy.hide()"
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-4 cardMargin selectMobile2"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-select
            v-if="
              selectedTipo.value == 'GC' ||
              selectedTipo.value == 'FA' ||
              selectedTipo.value == 'CD'
            "
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="estatus"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="label"
            option-value="value"
            v-model="selectedEstatus"
            outlined
            standout
            label="Estatus"
          >
          </q-select>
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-4 cardMargin selectMobile2"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-select
            v-if="selectedTipo.value == 'CD'"
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="tipoDoc"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="label"
            option-value="value"
            v-model="selectedTipoDoc"
            outlined
            standout
            label="Tipo Doc."
          >
          </q-select>
          <q-select
            v-else-if="selectedTipo.value == 'GC' || selectedTipo.value == 'FA'"
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="formaPago"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="label"
            option-value="value"
            v-model="selectedForma"
            outlined
            standout
            label="Forma Pago"
          >
          </q-select>
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-4 cardMargin selectMobile2"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-select
            v-if="selectedTipo.value == 'GC'"
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="pagadoEn"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="label"
            option-value="value"
            v-model="selectedPagado"
            outlined
            standout
            label="Pagado En"
          >
          </q-select>
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div class="col-md-3" style="align-self: center; text-align: center">
          <p
            style="font-size: 20px; margin-bottom: 15px"
            class="text-secondary"
            v-if="
              selectedTipo.value != 'CG' &&
              selectedTipo.value != 'CC' &&
              selectedTipo.value != 'CCC'
            "
          >
            <strong>Ver Montos</strong>
          </p>
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-3 cardMargin selectMobile2"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-btn-toggle
            v-if="
              selectedTipo.value != 'CG' &&
              selectedTipo.value != 'CC' &&
              selectedTipo.value != 'CCC'
            "
            v-model="selectedMonto"
            spread
            class="my-custom-toggle"
            rounded
            unelevated
            toggle-color="primary"
            color="white"
            text-color="black"
            :options="montoVenta"
          >
          </q-btn-toggle>
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div class="col-md-2" style="align-self: center; text-align: center">
          <p
            style="font-size: 20px; margin-bottom: 15px; margin-left: -50px"
            class="text-secondary"
            v-if="
              selectedTipo.value == 'VC' ||
              selectedTipo.value == 'TV' ||
              selectedTipo.value == 'RD'
            "
          >
            <strong>Serie</strong>
          </p>
          <p
            style="font-size: 20px; margin-bottom: 15px; margin-right: -20px"
            class="text-secondary"
            v-else-if="selectedTipo.value == 'GC' || selectedTipo.value == 'FA'"
          >
            <strong>Correlativo</strong>
          </p>
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-3 cardMargin selectMobile2"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-checkbox
            v-if="
              selectedTipo.value == 'VC' ||
              selectedTipo.value == 'TV' ||
              selectedTipo.value == 'RD'
            "
            v-model="selectedSerie"
            color="primary"
            left-label
            val="44"
            label="44"
            style="margin-left: -60px"
          />
          <q-checkbox
            v-if="
              selectedTipo.value == 'VC' ||
              selectedTipo.value == 'TV' ||
              selectedTipo.value == 'RD'
            "
            v-model="selectedSerie"
            color="primary"
            left-label
            val="55"
            label="55"
          />
          <q-checkbox
            v-else-if="
              selectedTipo.value == 'GC' ||
              selectedTipo.value == 'GF' ||
              selectedTipo.value == 'FA'
            "
            v-model="selectedCorrelativo"
            color="primary"
            left-label
            style="margin-left: -40px"
          />
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-1 col-xl-1 col-lg-1 col-xs-1 col-sm-1 cardMargin selectMobile2"
          style="align-self: center; text-align: center; margin-bottom: 15px"
        >
          <q-checkbox
            v-if="
              selectedTipo.value == 'VG' ||
              selectedTipo.value == 'VC' ||
              selectedTipo.value == 'TV' ||
              selectedTipo.value == 'RD'
            "
            v-model="selectedDolar"
            color="primary"
            left-label
            label="$"
            class="text-secondary"
            style="font-size: 20px; font-weight: bold; margin-left: -30px"
          />
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div class="col-md-3" style="align-self: center; text-align: center">
          <p
            style="font-size: 20px; margin-bottom: 15px"
            class="text-secondary"
            v-if="selectedTipo.value == 'VC'"
          >
            <strong>Agrup. Mes</strong>
          </p>
          <p
            style="font-size: 20px; margin-bottom: 15px"
            class="text-secondary"
            v-else-if="selectedTipo.value == 'TV'"
          >
            <strong>Agrup. Clientes</strong>
          </p>
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-1 cardMargin selectMobile2"
          style="
            align-self: center;
            text-align: center;
            margin-bottom: 15px;
            margin-left: -10px;
          "
        >
          <q-checkbox
            v-if="selectedTipo.value == 'VC'"
            v-model="selectedAgrMes"
            color="primary"
            left-label
            @update:model-value="if (selectedAgrMes) selectedAgrDia = false;"
          />
          <q-checkbox
            v-else-if="selectedTipo.value == 'TV'"
            v-model="selectedAgrCli"
            color="primary"
            left-label
            @update:model-value="if (selectedAgrCli) selectedAgrDia = false;"
          />
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div class="col-md-3" style="align-self: center; text-align: center">
          <p
            style="font-size: 20px; margin-bottom: 15px; margin-left: -10px"
            class="text-secondary"
            v-if="selectedTipo.value == 'VC' || selectedTipo.value == 'TV'"
          >
            <strong>Agrup. Días</strong>
          </p>
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-1 cardMargin selectMobile2"
          style="
            align-self: center;
            text-align: center;
            margin-bottom: 15px;
            margin-left: -10px;
          "
        >
          <q-checkbox
            v-if="selectedTipo.value == 'VC' || selectedTipo.value == 'TV'"
            v-model="selectedAgrDia"
            color="primary"
            left-label
            @update:model-value="
              if (selectedAgrDia) {
                selectedAgrMes = false;
                selectedAgrCli = false;
              }
            "
          />
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div class="col-md-3" style="align-self: center; text-align: center">
          <p
            style="font-size: 20px; margin-bottom: 15px"
            class="text-secondary"
            v-if="
              selectedTipo.value == 'VC' ||
              selectedTipo.value == 'TV' ||
              selectedTipo.value == 'RD'
            "
          >
            <strong>Neta</strong>
          </p>
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-1 cardMargin selectMobile2"
          style="
            align-self: center;
            text-align: center;
            margin-bottom: 15px;
            margin-left: -35px;
          "
        >
          <q-checkbox
            v-if="
              selectedTipo.value == 'VC' ||
              selectedTipo.value == 'TV' ||
              selectedTipo.value == 'RD'
            "
            v-model="selectedNeta"
            color="primary"
            left-label
          />
          <div v-else style="margin-bottom: 40px"></div>
        </div>
        <div
          class="col-md-4 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-btn
            rounded
            label="Generar"
            type="submit"
            color="primary"
            class="col-md-3 col-sm-3 col-xs-12"
            icon="input"
            style="margin-right: 20px"
            @click="pdfChange(false)"
          />
          <q-btn
            rounded
            :disabled="!this.enabledExport"
            label="Excel"
            color="primary"
            class="col-md-3 col-sm-3 col-xs-12"
            icon="system_update_alt"
            style="margin-right: 20px"
            @click="exportExcel()"
          />
          <q-btn
            rounded
            label="Limpiar"
            color="primary"
            class="col-md-3 col-sm-3 col-xs-12 btnmovil"
            icon="filter_alt_off"
            @click="resetFilters()"
          />
        </div>
      </div>
      <div class="q-pa-md col-md-8 col-xs-12 q-gutter-y-md justify-center">
        <webViewer
          ref="webViewer"
          v-if="pdf == true"
          style="width: 960px; height: 620px; max-width: 960px"
        >
        </webViewer>
        <q-inner-loading :showing="loading" color="primary" class="loading" />
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
      montoVenta: [
        { label: "SI", value: "SI" },
        { label: "NO", value: "NO" },
      ],
      serieGuias: [
        { label: "44", value: "44" },
        { label: "55", value: "55" },
      ],
      tipoReporte: [
        {
          label: "VENTAS GENERALES",
          value: "VG",
          zoom: 1.6,
        },
        {
          label: "VENTAS POR CLIENTES",
          value: "VC",
          zoom: 1.6,
        },
        {
          label: "TOTALES DE VENTAS",
          value: "TV",
          zoom: 1.6,
        },
        {
          label: "TOTALES RELACIÓN DESPACHO",
          value: "RD",
          zoom: 1.6,
        },
        {
          label: "GUÍAS CARGAS",
          value: "GC",
          zoom: 1.4,
        },
        {
          label: "FACTURAS",
          value: "FA",
          zoom: 1.4,
        },
        {
          label: "FACTURAS FPO",
          value: "FPO",
          zoom: 1.4,
        },
        {
          label: "NOTAS DE CRÉDITO",
          value: "NC",
          zoom: 1.4,
        },
        {
          label: "NOTAS DE DÉBITO",
          value: "ND",
          zoom: 1.4,
        },
        {
          label: "DOCUMENTOS EMITIDOS",
          value: "DE",
          zoom: 1.4,
        },
        {
          label: "COBRANZA GENERAL",
          value: "CG",
          zoom: 1.4,
        },
        {
          label: "COBRO EN DESTINO",
          value: "CD",
          zoom: 1.4,
        },
        {
          label: "CUENTAS POR COBRAR",
          value: "CC",
          zoom: 1.4,
        },
        {
          label: "CUENTAS POR COBRAR CLIENTE",
          value: "CCC",
          zoom: 1.4,
        },
      ],
      estatus: [
        { label: "PENDIENTES POR COBRAR", value: "P" },
        { label: "PENDIENTES POR FACTURAR", value: "F" },
        { label: "CANCELADAS", value: "C" },
        { label: "ANULADAS", value: "A" },
        { label: "EN ELABORACIÓN", value: "E" },
        { label: "FACTURADAS", value: "G" },
        { label: "PENDIENTES POR IMPRIMIR", value: "I" },
        { label: "MODIFICADAS", value: "M" },
      ],
      tipoDoc: [
        { label: "GUÍAS CARGA", value: "GC" },
        { label: "FACTURAS", value: "FA" },
      ],
      formaPago: [
        { label: "CRÉDITO", value: "CR" },
        { label: "CONTADO", value: "CO" },
      ],
      pagadoEn: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      cargaNeta: [
        { label: "PESO KGS", value: "K", slot: "one" },
        { label: "PESO NETO", value: "N", slot: "two" },
      ],
      selectedTipo: "",
      pdf: true,
      agenciasSelected: [],
      selectedAgencia: [],
      agencias: [],
      clientesSelected: [],
      selectedCliente: [],
      clientesLoading: false,
      clientes: [],
      agentesSelected: [],
      selectedAgente: [],
      agentesLoading: false,
      agentes: [],
      selectedEstatus: [],
      selectedTipoDoc: [],
      selectedForma: [],
      selectedPagado: [],
      reportValue: "",
      selectedMonto: "SI",
      selectedNeta: false,
      selectedSerie: ["44", "55"],
      selectedDolar: false,
      selectedCorrelativo: false,
      selectedAgrMes: false,
      selectedAgrCli: false,
      selectedAgrDia: false,
      enabledExport: false,
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
    this.$emit("changeTitle", "SCEN - Reportes - Reporte de Ventas", "");
    this.$refs.methods.getData("/agencias", "setData", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "reporteventas",
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
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    async pdfChange(def) {
      if (def && this.reportValue == "") return;
      this.reportValue = "";
      this.loading = true;
      if (!def) this.reportValue = this.selectedTipo.value;
      this.pdf = false;
      setTimeout(() => {
        this.pdfPrint();
        this.pdf = true;
      }, 100);
    },
    pdfPrint() {
      var dataArray = {};
      dataArray.fecha_desde = this.fecha_desde;
      dataArray.fecha_hasta = this.fecha_hasta;
      dataArray.agencia = this.selectedAgencia.id;
      dataArray.cliente = this.selectedCliente.id;
      dataArray.agente = this.selectedAgente.id;
      dataArray.dolar = this.selectedDolar;
      dataArray.visible = this.selectedMonto;
      dataArray.neta = this.selectedNeta;
      dataArray.estatus_admin = this.selectedEstatus.value;
      dataArray.modalidad = this.selectedForma.value;
      dataArray.pagado_en = this.selectedPagado.value;
      dataArray.correlativo = this.selectedCorrelativo;
      dataArray.tipo_doc = this.selectedTipoDoc.value;

      if (this.reportValue == "VC" || this.reportValue == "CCC") {
        if (this.selectedAgrMes) this.reportValue = "VCM";
        if (this.selectedAgrDia) this.reportValue = "VCD";
        if (!this.selectedAgencia.id) {
          this.$q.notify({
            message:
              "Debe seleccionar la Agencia antes de imprimir el reporte...",
            color: "red",
          });
          this.reportValue = "";
        } else if (!this.selectedCliente.id) {
          this.$q.notify({
            message:
              "Debe seleccionar el Cliente antes de imprimir el reporte...",
            color: "red",
          });
          this.reportValue = "";
        } else {
          dataArray.agencia = this.selectedAgencia.id;
          dataArray.cliente = this.selectedCliente.id;
        }
      }

      if (this.reportValue == "TV") {
        if (this.selectedAgrCli) this.reportValue = "TVC";
        if (this.selectedAgrDia) this.reportValue = "TVD";
      }

      if (
        this.reportValue == "VC" ||
        this.reportValue == "VCM" ||
        this.reportValue == "VCD" ||
        this.reportValue == "TV" ||
        this.reportValue == "TVC" ||
        this.reportValue == "TVD" ||
        this.reportValue == "RD"
      ) {
        if (this.selectedSerie.length == 0) {
          this.$q.notify({
            message: "Debe seleccionar al menos una serie...",
            color: "red",
          });
          this.reportValue = "";
        } else {
          dataArray.serie = this.selectedSerie;
        }
      }

      api
        .get(`/pdfreports/reporteVentas`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            tipo: this.reportValue,
            data: JSON.stringify(dataArray),
          },
        })
        .then((res) => {
          let zoom = this.reportValue ? this.selectedTipo.zoom : 0.7;
          if (!res.data.validDoc) {
            this.$q.notify({
              message: "No existen registros para este conjunto de Filtos",
              color: "red",
            });
            zoom = 0.7;
          }
          if (res.data.pdfPath == "reporteBase.pdf") {
            this.enabledExport = false;
          } else {
            this.enabledExport = true;
          }
          this.$refs.webViewer.showpdf(res.data.pdfPath, zoom, false, false);
          this.loading = false;
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message,
            color: "red",
          });
          this.loading = false;
        });
    },
    exportExcel() {
      api
        .get(`/excelreports/reporteVentas`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            tipo: this.selectedTipo.value,
          },
        })
        .then((res) => {
          if (!res.data.validDoc) {
            this.$q.notify({
              message: "No existen registros para este conjunto de Filtos",
              color: "red",
            });
            return;
          }

          const link = document.createElement("a");
          link.href = `${process.env.apiPath}/excelReports/loadExcel/${res.data.excelPath}`;
          link.setAttribute("download", "file.xlsx");
          link.click();
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message,
            color: "red",
          });
        });
    },
    // Metodo para Resetear Filtros
    resetFilters() {
      this.agentes = [];
      this.clientes = [];
      this.selectedTipo = "";
      this.reportValue = "";
      this.selectedAgencia = [];
      this.selectedAgente = [];
      this.selectedCliente = [];
      this.selectedEstatus = [];
      this.selectedTipoDoc = [];
      this.selectedForma = [];
      this.selectedPagado = [];
      this.selectedDolar = false;
      this.selectedMonto = "SI";
      this.selectedSerie = ["44", "55"];
      this.selectedDolar = false;
      this.selectedCorrelativo = false;
      this.selectedAgrMes = false;
      this.selectedAgrCli = false;
      this.selectedAgrDia = false;
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.pdfChange(0);
    },
  },
};
</script>
