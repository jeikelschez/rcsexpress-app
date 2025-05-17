<template>
  <q-page class="pagina q-pa-md">
    <div class="q-pa-sm justify-center" style="margin-top: 10px">
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -20px"
      >
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>REPORTES - RELACIÓN DE PAGOS A IPOSTEL</strong>
          </p>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
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
          >
          </q-select>
        </div>
        <div
          class="col-md-2 col-xl2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
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
            :disable="this.selectedTipo.value == 'PA' ? true : false"
            @update:model-value="
              this.selectedCliente = [];
              this.clientesLoading = true;
              this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
                headers: {
                  agencia: selectedAgencia.id,
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
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
            v-model="selectedCliente"
            outlined
            :loading="clientesLoading"
            :disable="this.selectedTipo.value == 'PA' ? true : clientesLoading"
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
        </div>
        <div
          class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="pesosKgs"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            v-model="selectedKgs"
            outlined
            standout
            label="Peso Kgs"
          >
          </q-select>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
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
          class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 selectMobile2"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
            @click="resetFilters()"
          >
            <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Resetear Filtros</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click.capture="
              pdfChange();
              print = 1;
            "
          >
            <q-icon size="25px" name="input" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              transition-show="scale"
              style="max-height: 30px"
              transition-hide="scale"
              color="primary"
              >Generar</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <div
      class="q-pa-md col-md-12 col-xs-12 q-gutter-y-md justify-center"
      style="margin-top: -30px"
    >
      <webViewer
        @export-Excel="exportExcel"
        ref="webViewer"
        v-if="pdf == true"
        style="width: 1680px; height: 610px; max-width: 1680px"
      >
      </webViewer>
      <q-inner-loading :showing="loading" color="primary" class="loading" />
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
import moment from "moment";
import { api } from "boot/axios";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import rulesVue from "src/components/rules.vue";
import webViewerVue from "src/components/webViewer.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
    webViewer: webViewerVue,
  },
  data() {
    return {
      tipoReporte: [
        {
          label: "REPORTE GENERAL",
          value: "RG",
          tittle: "GENERAL",
        },
        {
          label: "RESUMEN",
          value: "RE",
          tittle: "RESUMEN",
        },
        {
          label: "RESUMEN GENERAL",
          value: "REG",
          tittle: "RESUMEN GENERAL",
        },
        {
          label: "PLANILLA DE AUTOLIQUIDACIÓN",
          value: "PA",
          tittle: "PLANILLA DE AUTOLIQUIDACIÓN",
        },
        {
          label: "RELACIÓN DIARIA",
          value: "RD",
          tittle: "RELACIÓN DIARIA",
        },
      ],
      pesosKgs: [
        {
          label: "DE 0.1 HASTA 250",
          kgs_min: 0,
          kgs_max: 0.25,
        },
        {
          label: "DE 251 HASTA 500",
          kgs_min: 0.25,
          kgs_max: 0.5,
        },
        {
          label: "DE 501 HASTA 1.000",
          kgs_min: 0.5,
          kgs_max: 1,
        },
        {
          label: "DE 1.001 HASTA 1500",
          kgs_min: 1,
          kgs_max: 1.5,
        },
        {
          label: "DE 1.501 HASTA 2.000",
          kgs_min: 1.5,
          kgs_max: 2,
        },
        {
          label: "DE 2.001 HASTA 2.500",
          kgs_min: 2,
          kgs_max: 2.5,
        },
        {
          label: "DE 2.501 HASTA 3.000",
          kgs_min: 2.5,
          kgs_max: 3,
        },
        {
          label: "DE 3.001 HASTA 3.500",
          kgs_min: 3,
          kgs_max: 3.5,
        },
        {
          label: "DE 3.501 HASTA 4.000",
          kgs_min: 3.5,
          kgs_max: 4,
        },
        {
          label: "DE 4.001 HASTA 4.500",
          kgs_min: 4,
          kgs_max: 4.5,
        },
        {
          label: "DE 4.501 HASTA 5.000",
          kgs_min: 4.5,
          kgs_max: 5,
        },
        {
          label: "DE 5.001 HASTA 5.500",
          kgs_min: 5,
          kgs_max: 5.5,
        },
        {
          label: "DE 5.501 HASTA 6.000",
          kgs_min: 5.5,
          kgs_max: 6,
        },
        {
          label: "DE 6.001 HASTA 6.500",
          kgs_min: 6,
          kgs_max: 6.5,
        },
        {
          label: "DE 6.501 HASTA 7.000",
          kgs_min: 6.5,
          kgs_max: 7,
        },
        {
          label: "DE 7.001 HASTA 7.500",
          kgs_min: 7,
          kgs_max: 7.5,
        },
        {
          label: "DE 7.501 HASTA 8.000",
          kgs_min: 7.5,
          kgs_max: 8,
        },
        {
          label: "DE 8.001 HASTA 8.500",
          kgs_min: 8,
          kgs_max: 8.5,
        },
        {
          label: "DE 8.501 HASTA 9.000",
          kgs_min: 8.5,
          kgs_max: 9,
        },
        {
          label: "DE 9.001 HASTA 9.500",
          kgs_min: 9,
          kgs_max: 9.5,
        },
        {
          label: "DE 9.501 HASTA 10.000",
          kgs_min: 9.5,
          kgs_max: 10,
        },
        {
          label: "DE 10.001 HASTA 10.500",
          kgs_min: 10,
          kgs_max: 10.5,
        },
        {
          label: "DE 10.501 HASTA 11.000",
          kgs_min: 10.5,
          kgs_max: 11,
        },
        {
          label: "DE 11.001 HASTA 11.500",
          kgs_min: 11,
          kgs_max: 11.5,
        },
        {
          label: "DE 11.501 HASTA 12.000",
          kgs_min: 11.5,
          kgs_max: 12,
        },
        {
          label: "DE 12.001 HASTA 12.500",
          kgs_min: 12,
          kgs_max: 12.5,
        },
        {
          label: "DE 12.501 HASTA 13.000",
          kgs_min: 12.5,
          kgs_max: 13,
        },
        {
          label: "DE 13.001 HASTA 13.500",
          kgs_min: 13,
          kgs_max: 13.5,
        },
        {
          label: "DE 13.501 HASTA 14.000",
          kgs_min: 13.5,
          kgs_max: 14,
        },
        {
          label: "DE 14.001 HASTA 14.500",
          kgs_min: 14,
          kgs_max: 14.5,
        },
        {
          label: "DE 14.501 HASTA 15.000",
          kgs_min: 14.5,
          kgs_max: 15,
        },
        {
          label: "DE 15.001 HASTA 15.500",
          kgs_min: 15,
          kgs_max: 15.5,
        },
        {
          label: "DE 15.501 HASTA 16.000",
          kgs_min: 15.5,
          kgs_max: 16,
        },
        {
          label: "DE 16.001 HASTA 16.500",
          kgs_min: 16,
          kgs_max: 16.5,
        },
        {
          label: "DE 16.501 HASTA 17.000",
          kgs_min: 16.5,
          kgs_max: 17,
        },
        {
          label: "DE 17.001 HASTA 17.500",
          kgs_min: 17,
          kgs_max: 17.5,
        },
        {
          label: "DE 17.501 HASTA 18.000",
          kgs_min: 17.5,
          kgs_max: 18,
        },
        {
          label: "DE 18.001 HASTA 18.500",
          kgs_min: 18,
          kgs_max: 18.5,
        },
        {
          label: "DE 18.501 HASTA 19.000",
          kgs_min: 18.5,
          kgs_max: 19,
        },
        {
          label: "DE 19.001 HASTA 19.500",
          kgs_min: 19,
          kgs_max: 19.5,
        },
        {
          label: "DE 19.501 HASTA 20.000",
          kgs_min: 19.5,
          kgs_max: 20,
        },
        {
          label: "DE 20.001 HASTA 20.500",
          kgs_min: 20,
          kgs_max: 20.5,
        },
        {
          label: "DE 20.501 HASTA 21.000",
          kgs_min: 20.5,
          kgs_max: 21,
        },
        {
          label: "DE 21.001 HASTA 21.500",
          kgs_min: 21,
          kgs_max: 21.5,
        },
        {
          label: "DE 21.501 HASTA 22.000",
          kgs_min: 21.5,
          kgs_max: 22,
        },
        {
          label: "DE 22.001 HASTA 22.500",
          kgs_min: 22,
          kgs_max: 22.5,
        },
        {
          label: "DE 22.501 HASTA 23.000",
          kgs_min: 22.5,
          kgs_max: 23,
        },
        {
          label: "DE 23.001 HASTA 23.500",
          kgs_min: 23,
          kgs_max: 23.5,
        },
        {
          label: "DE 23.501 HASTA 24.000",
          kgs_min: 23.5,
          kgs_max: 24,
        },
        {
          label: "DE 24.001 HASTA 24.500",
          kgs_min: 24,
          kgs_max: 24.5,
        },
        {
          label: "DE 24.501 HASTA 25.000",
          kgs_min: 24.5,
          kgs_max: 25,
        },
        {
          label: "DE 25.001 HASTA 25.500",
          kgs_min: 25,
          kgs_max: 25.5,
        },
        {
          label: "DE 25.501 HASTA 26.000",
          kgs_min: 25.5,
          kgs_max: 26,
        },
        {
          label: "DE 26.001 HASTA 26.500",
          kgs_min: 26,
          kgs_max: 26.5,
        },
        {
          label: "DE 26.501 HASTA 27.000",
          kgs_min: 26.5,
          kgs_max: 27,
        },
        {
          label: "DE 27.001 HASTA 27.500",
          kgs_min: 27,
          kgs_max: 27.5,
        },
        {
          label: "DE 27.501 HASTA 28.000",
          kgs_min: 27.5,
          kgs_max: 28,
        },
        {
          label: "DE 28.001 HASTA 28.500",
          kgs_min: 28,
          kgs_max: 28.5,
        },
        {
          label: "DE 28.501 HASTA 29.000",
          kgs_min: 28.5,
          kgs_max: 29,
        },
        {
          label: "DE 29.001 HASTA 29.500",
          kgs_min: 29,
          kgs_max: 29.5,
        },
        {
          label: "DE 29.501 HASTA 30.000",
          kgs_min: 29.5,
          kgs_max: 30,
        },
      ],
      pdf: true,
      selected: [],
      selectedOption: [],
      agencias: [],
      clientes: [],
      selectedTipo: [],
      selectedKgs: [],
      agenciasSelected: [],
      selectedAgencia: [],
      clientesSelected: [],
      selectedCliente: [],
      enabledExport: false,
      clientesLoading: false,
      print: "",
      fecha_desde: moment().format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      pdfView: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
    };
  },
  mounted() {
    this.pdfPrint();
    this.$emit(
      "changeTitle",
      "SCEN - Reportes - Relación de Pagos a Ipostel",
      ""
    );
    this.$refs.methods.getData("/agencias", "setData", "agencias", {
      headers: {
        order_by: "nb_agencia",
        order_direction: "ASC",
      },
    });

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "franqueopostal",
      },
    });
    this.selectedTipo = this.tipoReporte[0];
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
    // Metodo para traer el value de los Selects y Columns
    findIndex(array, value, field) {
      var find = this[array].findIndex((item) => item.id == value);
      return find >= 0 ? this[array][find][field] : null;
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },
    // Metodo para validar Permisos
    allowOption(option) {
      return (
        this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0
      );
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos Iniciales
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    async pdfChange() {
      this.loading = true;
      this.pdf = false;
      setTimeout(() => {
        this.pdfPrint();
        this.pdf = true;
      }, 100);
    },
    pdfPrint() {
      let dataArray = {};
      dataArray.cliente = this.selectedCliente.id
        ? this.selectedCliente.id
        : "";
      dataArray.nbCliente = this.selectedCliente.id
        ? this.selectedCliente.nb_cliente
        : "";
      dataArray.desde = this.fecha_desde;
      dataArray.hasta = this.fecha_hasta;
      dataArray.tittle = this.selectedTipo.tittle;
      dataArray.kgs_min = this.selectedKgs.kgs_min
        ? this.selectedKgs.kgs_min
        : 0;
      dataArray.kgs_max = this.selectedKgs.kgs_max
        ? this.selectedKgs.kgs_max
        : 30;
      api
        .get(`/pdfreports/relacionFpo`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            print: this.print,
            tipo: this.selectedTipo.value,
            data: JSON.stringify(dataArray),
          },
        })
        .then((res) => {
          if (!res.data.validDoc) {
            this.$q.notify({
              message: "No existen registros para este conjunto de Filtos",
              color: "red",
            });
            this.print = "";
          }

          console.log(res.data.pdfPath);

          if (res.data.pdfPath == "reporteBase.pdf") {
            this.enabledExport = false;
          } else {
            this.enabledExport = true;
          }

          this.$refs.webViewer.showpdf(
            res.data.pdfPath,
            this.print == "" ? 0.64 : 1.8,
            false,
            false
          );
          this.loading = false;
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message,
            color: "red",
          });
          this.pdfView = false;
          this.loading = false;
          return;
        });
    },
    // Metodo para exportar a Excel
    async exportExcel() {
      this.loading = true;
      if (!this.enabledExport) {
        this.loading = false;
        this.$q.notify({
          message: "No existen registros para este conjunto de Filtos",
          color: "red",
        });
        return;
      }  
      
      let dataArray = {};
      dataArray.cliente = this.selectedCliente.id
        ? this.selectedCliente.id
        : "";
      dataArray.nbCliente = this.selectedCliente.id
        ? this.selectedCliente.nb_cliente
        : "";
      dataArray.desde = this.fecha_desde;
      dataArray.hasta = this.fecha_hasta;
      dataArray.tittle = this.selectedTipo.tittle;
      dataArray.kgs_min = this.selectedKgs.kgs_min
        ? this.selectedKgs.kgs_min
        : 0;
      dataArray.kgs_max = this.selectedKgs.kgs_max
        ? this.selectedKgs.kgs_max
        : 30;

      await api
        .get(`/excelreports/relacionFpo`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            tipo: this.selectedTipo.value,
            data: JSON.stringify(dataArray),
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
          link.setAttribute("download", "relacionFpo.xlsx");
          setTimeout(() => {
            link.click();
          }, 1000);
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
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selected = [];
      this.selectedOption = [];
      this.selectedTipo = this.tipoReporte[0];
      this.selectedAgencia = [];
      this.selectedCliente = [];
      this.selectedKgs = [];
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.print = "";
      this.pdfChange();
    },
  },
};
</script>
