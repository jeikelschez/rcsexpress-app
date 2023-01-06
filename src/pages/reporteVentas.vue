<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
            <div class="row"></div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Enviar"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add"
              />
              <q-btn
                label="Cerrar"
                color="primary"
                flat
                @click="this.resetForm()"
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div
      class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
    >
      <div class="col-md-6 col-xs-12 q-pa-sm justify-center">
        <div
          class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        >
          <div
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
            style="align-self: center; text-align: center"
          >
            <p
              style="font-size: 25px; margin-bottom: 25px"
              class="text-secondary"
            >
              <strong>CONSULTAS Y REPORTES - REPORTE DE VENTAS</strong>
            </p>
          </div>
          <div
            class="col-md-11 col-xl-11 col-lg-11 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center"
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
            class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 justify-center" style="text-align: center"
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
        </div>

        <div
          class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center; margin-top: -15px; padding-bottom: 0px"
        >
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
      </div>

      <div
        class="q-pa-md col-md-6 col-xs-12 q-gutter-y-md justify-center table" style="margin-bottom: 20px"
      >
        <webViewer ref="webViewer" @close-pdf="closePdf"></webViewer>
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
            @click="
              this.$refs.methods.deleteData(
                `/cguias/${selected}`,
                'getDataTable'
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods ref="methods"></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import moment from "moment";
import { api } from "boot/axios";
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
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      dateInit: moment().format("DD/MM/YYYY"),
      loading: ref(false),
      separator: ref("vertical"),
      deletePopup: ref(false),
      dialog: ref(false),
      pdfView: ref(false),
    };
  },
  mounted() {
    this.printPending();
  },
  methods: {
    closePdf() {
      this.pdfView = false;
    },
    printPending() {
      this.$refs.webViewer.showpdf();
    },
    changeFilters() {
      switch (this.selectedReport.value) {
        case 'VG':
        this.disableAgencia = false;
        this.disablecliente = true;
        this.disableagente = false;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'VC':
        this.disableAgencia = false;
        this.disablecliente = false;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'TV':
        this.disableAgencia = false;
        this.disablecliente = true;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = false;
        break;
        case 'TRD':
        this.disableAgencia = false;
        this.disablecliente = false;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'GC':
        this.disableAgencia = false;
        this.disablecliente = false;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = false;
        this.disableestatus = false;
        this.disabledocumento = true;
        this.disableformapago = false;
        this.disableordencorrelativo = false;
        this.disableagrupadocliente = true;
        break;
        case 'GF':
        this.disableAgencia = false;
        this.disablecliente = false;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = true;
        this.disablepagadoen = true;
        this.disableestatus = false;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = false;
        this.disableagrupadocliente = true;
        break;
        case 'F':
        this.disableAgencia = false;
        this.disablecliente = true;
        this.disableagente = false;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = false;
        this.disabledocumento = true;
        this.disableformapago = false;
        this.disableordencorrelativo = false;
        this.disableagrupadocliente = true;
        break;
        case 'FFPO':
        this.disableAgencia = false;
        this.disablecliente = true;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'NC':
        this.disableAgencia = false;
        this.disablecliente = true;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'ND':
        this.disableAgencia = false;
        this.disablecliente = true;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'DE':
        this.disableAgencia = false;
        this.disablecliente = true;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'GC':
        this.disableAgencia = false;
        this.disablecliente = true;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = true;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'GD':
        this.disableAgencia = false;
        this.disablecliente = false;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = false;
        this.disablepagadoen = true;
        this.disableestatus = false;
        this.disabledocumento = false;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'CC':
        this.disableAgencia = false;
        this.disablecliente = true;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = true;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
        case 'CCC':
        this.disableAgencia = false;
        this.disablecliente = false;
        this.disableagente = true;
        this.disabledesde = false;
        this.disablehasta = false;
        this.disablevisible = true;
        this.disablepagadoen = true;
        this.disableestatus = true;
        this.disabledocumento = true;
        this.disableformapago = true;
        this.disableordencorrelativo = true;
        this.disableagrupadocliente = true;
        break;
      }
    }
  },
};
</script>

<style>
.q-field__bottom {
  display: none;
}

@media screen and (min-width: 1080px) {
  .table {
  width: 50%; height: 850px; margin-top: -30px
  }
}

@media screen and (max-width: 1080px) {
  .table {
  height: 500px !important
  }
}
</style>
