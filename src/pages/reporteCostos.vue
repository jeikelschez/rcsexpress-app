<template>
  <q-page class="pagina q-pa-md">
    <div
      class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      style="margin-left: 20px;"
    >
      <div class="col-md-4 col-xs-12 q-pa-sm justify-center">
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
              <strong>REPORTE DE COSTOS</strong>
            </p>
          </div>
        </div>
        <div
          class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center; margin-top: -25px"
        >
          <div
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 25px"
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
            style="align-self: center; text-align: center; margin-bottom: 25px"
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
                this.selectedAgente = [];
                this.agentes = [];
                this.$refs.methods.getData(`/agentes`, 'setData', 'agentes', {
                  headers: {
                    agencia: this.selectedAgencia.id,
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
            class="col-md-2 col-xl-2 col-lg-2 col-xs-2 col-sm-2 cardMargin selectMobile"
            style="align-self: center; text-align: center; margin-bottom: 25px"
          >
            <q-btn-toggle
              v-model="selectedTipoT"
              spread
              class="my-custom-toggle"
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="black"
              :options="tipo"
            >
            </q-btn-toggle>
          </div>
          <div
            class="col-md-10 col-xl-10 col-lg-10 col-xs-10 col-sm-10 cardMargin selectMobile"
            style="align-self: center; text-align: center; margin-bottom: 25px"
          >
            <q-select
              v-if="selectedTipoT == 'I'"
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="agentesSelected"
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
              v-else
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="proveedoresSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'proveedoresSelected',
                    'proveedores',
                    'nb_proveedor'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="nb_proveedor"
              option-value="id"
              v-model="selectedProveedor"
              outlined
              standout
              label="Proveedor"
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
            style="align-self: center; text-align: center; margin-bottom: 25px"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="unidadesSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'unidadesSelected',
                    'unidades',
                    'unidad_desc'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="unidad_desc"
              option-value="id"
              v-model="selectedUnidad"
              outlined
              standout
              label="Vehiculo"
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
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="ayudantesSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'ayudantesSelected',
                    'ayudantes',
                    'nb_ayudante'
                  )
              "
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              option-label="nb_ayudante"
              option-value="id"
              v-model="selectedAyudante"
              outlined
              standout
              label="Ayudante"
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
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
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
            class="col-md-6 col-xs-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 25px"
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
            style="align-self: center; text-align: center; margin-bottom: 25px"
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
            class="col-md-10 col-xl-10 col-lg-10 col-xs-10 col-sm-10 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 25px"
          >
            <q-btn-toggle
              v-model="selectedNeta"
              spread
              class="my-custom-toggle"
              rounded
              unelevated
              :disable="selectedTipo.value != 'CTP'"
              toggle-color="primary"
              color="white"
              text-color="black"
              :options="cargaNeta"
            >
            </q-btn-toggle>
          </div>
          <div
            class="col-md-2 col-xl-2 col-lg-2 col-xs-2 col-sm-2 cardMargin selectMobile2"
            style="align-self: center; text-align: center; margin-bottom: 25px"
          >
            <q-checkbox
              v-model="selectedDolar"
              label="$"
              :disable="
                selectedTipo.value != 'CTP' &&
                selectedTipo.value != 'CTA' &&
                selectedTipo.value != 'RVV'
              "
              color="primary"
              left-label
            />
          </div>
          <div
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center"
          >
            <q-btn
              rounded
              label="Imprimir"
              type="submit"
              color="primary"
              class="col-md-5 col-sm-5 col-xs-12"
              icon="print"
              style="margin-right: 30px"
              @click="pdfChange(false)"
            />
            <q-btn
              rounded
              label="Limpiar"
              color="primary"
              class="col-md-5 col-sm-5 col-xs-12 btnmovil"
              icon="filter_alt_off"
              @click="resetFilters()"
            />
          </div>
        </div>
      </div>
      <div class="q-pa-md col-md-8 col-xs-12 q-gutter-y-md justify-center">
        <webViewer
          ref="webViewer"
          v-if="pdf == true"
          style="width: 960px; height: 620px; max-width: 960px"
        ></webViewer>
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
          zoom: 1.3,
        },
        {
          label: "COSTOS DE TRANSPORTE POR RANGO DE FECHAS",
          value: "CTR",
          zoom: 1.3,
        },
        {
          label: "DISTRIBUCIÓN PRORRATEADA DEL COSTO DE TRANSPORTE POR CIUDAD",
          value: "DTC",
          zoom: 1.3,
        },
        {
          label: "DISTRIBUCIÓN REAL DEL COSTO DE TRANSPORTE POR CIUDAD",
          value: "DRC",
          zoom: 1.3,
        },
        {
          label: "COSTO DE TRANSPORTE POR AGENTE O PROVEEDORES",
          value: "CTP",
          zoom: 1.3,
        },
        {
          label: "COSTO DE TRANSPORTE POR AYUDANTE",
          value: "CTA",
          zoom: 1,
        },
        {
          label: "GUÍAS PENDIENTES POR ASOCIAR COSTOS DE TRANSPORTE",
          value: "GPC",
          zoom: 1.3,
        },
        {
          label: "REPORTE DE VIAJES POR VEHÍCULO",
          value: "RVV",
          zoom: 1,
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
        menu: "reportecostos",
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
      dataArray.dolar = this.selectedDolar;
      dataArray.neta = this.selectedNeta;

      if (this.reportValue == "CTP") {
        if (this.selectedTipoT == "I") {
          if (!this.selectedAgente.id) {
            this.$q.notify({
              message:
                "Debe seleccionar el Agente antes de imprimir el reporte...",
              color: "red",
            });
            this.loading = false;
            return;
          } else {
            dataArray.agente = this.selectedAgente.id;
            dataArray.nombreAgente =
              this.selectedAgente.nb_agente +
              " - " +
              this.selectedAgente.persona_responsable;
          }
        } else {
          if (!this.selectedProveedor.id) {
            this.$q.notify({
              message:
                "Debe seleccionar el Proveedor antes de imprimir el reporte...",
              color: "red",
            });
            this.loading = false;
            return;
          } else {
            dataArray.proveedor = this.selectedProveedor.id;
            dataArray.nombreProveedor = this.selectedProveedor.nb_proveedor;
          }
        }
      }

      if (this.reportValue == "CTA") {
        if (!this.selectedAyudante.id) {
          this.$q.notify({
            message:
              "Debe seleccionar el Ayudante antes de imprimir el reporte...",
            color: "red",
          });
          this.loading = false;
          return;
        } else {
          dataArray.ayudante = this.selectedAyudante.id;
          dataArray.nombreAyudante = this.selectedAyudante.nb_ayudante;
        }
      }

      if (this.reportValue == "RVV") {
        if (!this.selectedUnidad.id) {
          this.$q.notify({
            message:
              "Debe seleccionar el Transporte antes de imprimir el reporte...",
            color: "red",
          });
          this.loading = false;
          return;
        } else {
          dataArray.transporte = this.selectedUnidad.id;
          dataArray.nombreTransporte = this.selectedUnidad.unidad_desc;
        }
      }

      api
        .get(`/reports/reporteCostos`, {
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
