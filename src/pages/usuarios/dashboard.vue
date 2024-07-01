<template>
  <q-page class="pagina2 q-pa-md">
    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="margin-left: 30px"
      >
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Desde"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_desde"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
            @keyup.enter="getDataTable()"
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
                    @update:model-value="
                      this.$refs.qDateProxy.hide();
                      getDataTable();
                    "
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_hasta"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
            @keyup.enter="getDataTable()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy2"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_hasta"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                    @update:model-value="
                      this.$refs.qDateProxy2.hide();
                      getDataTable();
                    "
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
            :options="estatus"
            use-input
            hide-selected
            fill-input
            option-label="label"
            option-value="value"
            input-debounce="0"
            v-model="selectedEstatus"
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
            :options="cuidades"
            use-input
            hide-selected
            fill-input
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'ciudadesSelected',
                  'ciudades',
                  'desc_ciudad'
                )
            "
            option-label="desc_ciudad"
            option-value="id"
            input-debounce="0"
            v-model="selectedCuidades"
            outlined
            standout
            label="Ciudad"
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
          </q-select>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            rounded
            dense
            input-debounce="0"
            v-model="nro_guia"
            outlined
            standout
            label="NRO. Guia"
            @blur="getDataTable()"
            @keyup.enter="getDataTable()"
          >
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center"
        >
          <q-checkbox
              size="md"
              v-model="checkSerie"
              true-value="S"
              false-value=""
              style="font-size: 13px; padding-right: 30px;"
              @click="getDataTable()"
            />
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="this.resetFilters()"
            style="margin-right: 15px"
          >
            <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="pdfView = true"
            style="margin-right: 5px"
            :disable="this.guias.length == 0 ? true : false"
          >
            <q-icon size="25px" name="print" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Imprimir Reporte</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <div class="q-pa-md justify-center">
      <q-table
        :rows="guias"
        :columns="columns"
        binary-state-sort
        :separator="separator"
        row-key="id"
        :loading="loading"
        class="tableHeight"
        :rows-per-page-options="[0]"
        @request="getDataTable"
        style="width: 100%; height: 570px"
        :grid="$q.screen.xs"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:body-cell-nro_documento="props">
          <q-td
            :props="props"
            @click="loadDetalle(props.row)"
            style="color: #06065b"
          >
            {{ props.value }}
          </q-td>
        </template>
        <template v-slot:body-cell-estatus_operativo="props">
          <q-td :props="props">
            <q-icon
              size="20px"
              color="primary"
              v-if="props.value == 'CO'"
              name="thumb_up"
            />
            <q-icon
              size="20px"
              color="orange"
              v-else-if="props.value == 'PR' || props.value == 'PE'"
              name="thumb_down"
            />
            <q-icon size="20px" color="red" v-else name="warning" />
          </q-td>
        </template>
        <template v-slot:body-cell-persona_recibio="props">
          <q-td :props="props" class="limit-width" style="max-width: 150px">
            {{
              props.value == null || props.value == ""
                ? "NO DEFINIDO"
                : props.value
            }}
          </q-td>
        </template>
        <template v-slot:body-cell-fecha_recepcion="props">
          <q-td :props="props">
            {{
              props.value == null || props.value == ""
                ? "EN PROCESO"
                : props.value
            }}
          </q-td>
        </template>
        <template v-slot:body-cell-motivo_retraso="props">
          <q-td :props="props" class="limit-width" style="max-width: 60px">
            {{ calculaDias(props.row) }}
            <q-tooltip class="bg-blue text-body2" :offset="[10, 10]">{{
              calculaDias(props.row)
            }}</q-tooltip>
          </q-td>
        </template>
        <template v-slot:body-cell-dimensiones="props">
          <q-td :props="props" class="limit-width" style="max-width: 200px">
            {{ props.value }}
            <q-tooltip class="bg-blue text-body2" :offset="[10, 10]">{{
              props.value
            }}</q-tooltip>
          </q-td>
        </template>
        <template v-slot:body-cell-cliente_dest_desc="props">
          <q-td :props="props" class="limit-width" style="max-width: 350px">
            {{ props.value }}
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="guiaDialog">
      <q-card style="width: 1300px; max-width: 300vw">
        <q-card-section>
          <div
            class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
          >
            <div class="text-h6 col-md-4 col-xs-12">
              Nro Guia: <strong>{{ guiaSelected.nro_documento }}</strong>
            </div>
            <div
              class="col-md-4 col-xs-12"
              style="text-align: center; margin-top: 6px"
            >
              N° Fact Cliente: <strong>{{ guiaSelected.dimensiones }}</strong>
            </div>
            <div
              class="col-md-4 col-xs-12"
              style="text-align: right; margin-top: 6px"
            >
              Transito:
              <strong>{{
                guiaSelected.cod_agencia_transito == null
                  ? "Agencia T. no Definida"
                  : guiaSelected.agencias_trans.nb_agencia
              }}</strong>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="margin-top: -20px">
          <div
            class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
          >
            <div class="col-md-6 col-xs-12" style="margin-bottom: 8px">
              Cliente Origen: <strong>{{ this.client }}</strong>
            </div>
            <div class="col-md-6 col-xs-12">
              Cliente Destino:
              <strong>{{ guiaSelected.cliente_dest_desc }}</strong>
            </div>
            <div class="col-md-6 col-xs-12" style="margin-bottom: 8px">
              Fecha Emisión: <strong>{{ guiaSelected.fecha_emision }}</strong>
            </div>
            <div class="col-md-6 col-xs-12">
              Fecha Envio: <strong>{{ guiaSelected.fecha_envio }}</strong>
            </div>
            <div class="col-md-6 col-xs-12" style="margin-bottom: 8px">
              N° piezas: <strong>{{ guiaSelected.nro_piezas }}</strong>
            </div>
            <div class="col-md-6 col-xs-12">
              Peso Neto:
              <strong>{{
                new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                  currencyDisplay: "code",
                })
                  .format(guiaSelected.peso_kgs)
                  .replace("EUR", "")
                  .trim()
              }}</strong>
            </div>
            <div class="col-md-6 col-xs-12" style="margin-bottom: 8px">
              Método Pago:
              <strong>{{
                guiaSelected.modalidad_pago == "CO" ? "Contado" : "Crédito"
              }}</strong>
            </div>
            <div class="col-md-6 col-xs-12">
              Estatus:
              <strong>{{
                filterDesc("estatusOperativo", guiaSelected.estatus_operativo)
              }}</strong>
            </div>
            <div class="col-md-6 col-xs-12" style="margin-bottom: 8px">
              Recibido por:
              <strong>{{
                guiaSelected.persona_recibio == null ||
                guiaSelected.persona_recibio == ""
                  ? "NO DEFINIDO"
                  : guiaSelected.persona_recibio
              }}</strong>
            </div>
            <div class="col-md-6 col-xs-12">
              Cédula o Rif:
              <strong>{{ guiaSelected.ci_persona_recibio }}</strong>
            </div>
            <div class="col-md-6 col-xs-12" style="margin-bottom: 30px">
              Fecha entrega:
              <strong>{{
                guiaSelected.fecha_recepcion == null ||
                guiaSelected.fecha_recepcion == ""
                  ? "EN PROCESO"
                  : guiaSelected.fecha_recepcion
              }}</strong>
            </div>
            <div class="col-md-6 col-xs-12">
              Hora entrega: <strong>{{ guiaSelected.hora_recepcion }}</strong>
            </div>
            <div class="col-md-12 col-xs-12">
              <strong
                >NOTA: LA INFORMACIÓN REFLEJADA, SÓLO TIENE VIGENCIA DE 6
                MESES.</strong
              >
            </div>
            <div class="col-md-12 col-xs-12" style="margin-bottom: -40px">
              <strong
                >SI DESEA UNA LISTA DE GUIAS ANTERIORES, PUEDE SOLICITARLAS A
                TRAVÉS DEL CORREO ELECTRÓNICO:
                SERVICIOSALCLIENTE@RCSEXPRESS.COM.</strong
              >
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn color="primary" flat icon="close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="pdfView" @show="this.pdfPrint()">
      <webViewer
        ref="webViewer"
        @export-Excel="exportExcel"
        @close-pdf="this.pdfView = false"
        style="width: 1400px; height: 750px; max-width: 1400px"
      ></webViewer>
    </q-dialog>

    <methods ref="methods" @get-Data-Table="getDataTable"></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { api } from "boot/axios";
import rulesVue from "src/components/rules.vue";
import { useQuasar, SessionStorage } from "quasar";
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
      columns: [
        {
          name: "siglas_dest",
          label: "DESTINO",
          field: (row) => row.agencias_dest.ciudades.siglas,
          align: "center",
        },
        {
          name: "nro_documento",
          label: "GUÍA",
          field: "nro_documento",
          align: "center",
        },
        {
          name: "dimensiones",
          label: "N° FACT CLIENTE",
          field: "dimensiones",
          align: "center",
        },
        {
          name: "cliente_dest_desc",
          label: "DESTINATARIO",
          field: "cliente_dest_desc",
          align: "left",
        },
        {
          name: "nro_piezas",
          label: "PIEZAS",
          field: "nro_piezas",
          align: "center",
        },
        {
          name: "peso_kgs",
          label: "PESO",
          field: "peso_kgs",
          align: "right",
          format: (val) =>
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              currencyDisplay: "code",
            })
              .format(val)
              .replace("EUR", "")
              .trim(),
        },
        {
          name: "persona_recibio",
          label: "RECEPTOR",
          field: "persona_recibio",
          align: "center",
        },
        {
          name: "ci_persona_recibio",
          label: "CI/RIF",
          field: "ci_persona_recibio",
          align: "center",
        },
        {
          name: "fecha_emision",
          label: "EMISIÓN",
          field: "fecha_emision",
          align: "center",
        },
        {
          name: "fecha_recepcion",
          label: "RECEPCIÓN",
          field: "fecha_recepcion",
          align: "center",
        },
        {
          name: "estatus_operativo",
          label: "ESTATUS",
          field: "estatus_operativo",
          align: "center",
        },
        {
          name: "motivo_retraso",
          label: "MOTIVO RETRASO / DIAS",
          field: "motivo_retraso",
          align: "center",
        },
      ],
      estatus: [
        { label: "ENTREGADAS", value: "CO" },
        { label: "PENDIENTES", value: "PE" },
        { label: "NO CONFORMES", value: "NC" },
        { label: "EN PROCESO DE ENVÍO", value: "PR" },
      ],
      estatusOperativo: [
        { label: "EN PROCESO DE ENVÍO", value: "PR" },
        { label: "PENDIENTE POR ENTREGA", value: "PE" },
        { label: "ENTREGA CONFORME", value: "CO" },
        { label: "ENTREGA NO CONFORME", value: "NC" },
      ],
      pagadoEn: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: "",
      },
      guias: [],
      guiaSelected: [],
      agencias: [],
      agentes: [],
      cuidades: [],
      selectedEstatus: [],
      selectedCuidades: [],
      nro_guia: "",
      client: "",
      checkSerie: "",
      fecha_desde: moment().startOf("month").format("DD/MM/YYYY"),
      fecha_hasta: moment().endOf("month").format("DD/MM/YYYY"),
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      guiaDialog: ref(false),
      dialog: ref(false),
      pdfView: ref(false),
    };
  },
  mounted() {
    // Verifico que cliente Exista
    api
      .get(`clientes/verify/${SessionStorage.getItem("clientId")}`, {})
      .then((res) => {
        this.client = res.data.nb_cliente;
        this.$emit("changeTitle", res.data.nb_cliente);
      });

    this.getDataTable();
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
    // Metodo para traer el value de los Selects y Columns
    filterDesc(array, value) {
      var find = this[array].findIndex((item) => item.value == value);
      return find >= 0 ? this[array][find].label : null;
    },

    // Metodo para Extraer Datos de Tabla
    async getDataTable() {
      this.loading = true;
      if (this.fecha_desde == null || this.fecha_hasta == null) {
        this.loading = false;
        return;
      }

      await api
        .get(`mmovimientos/guiasEmpresa`, {
          headers: {
            client: SessionStorage.getItem("clientId"),
            desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
            hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
            estatus: this.selectedEstatus.value
              ? this.selectedEstatus.value
              : "",
            ciudad: this.selectedCuidades.id ? this.selectedCuidades.id : "",
            guia: this.nro_guia,
            serie: this.checkSerie,
          },
        })
        .then((res) => {
          this.guias = res.data;
          this.loading = false;
        });

      for (var i = 0; i <= this.guias.length - 1; i++) {
        if (
          this.cuidades.findIndex(
            (item) => item.id == this.guias[i].agencias_dest.ciudades.id
          ) < 0
        )
          this.cuidades.push(this.guias[i].agencias_dest.ciudades);
      }
      this.cuidades.sort((p1, p2) =>
        p1.desc_ciudad > p2.desc_ciudad
          ? 1
          : p1.desc_ciudad < p2.desc_ciudad
          ? -1
          : 0
      );
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.agencias = [];
      this.agentes = [];
      this.cuidades = [];
      this.selectedEstatus = [];
      this.selectedCuidades = [];
      this.nro_guia = "";
      this.checkSerie = "";
      this.fecha_desde = moment().startOf("month").format("DD/MM/YYYY");
      this.fecha_hasta = moment().endOf("month").format("DD/MM/YYYY");
      this.getDataTable();
    },
    loadDetalle(row) {
      this.guiaDialog = true;
      this.guiaSelected = row;
    },
    calculaDias(row) {
      let fecha_recepcion = moment(row.fecha_recepcion, "DD/MM/YYYY");
      let fecha_emision = moment(row.fecha_emision, "DD/MM/YYYY");
      let dias = fecha_recepcion.diff(fecha_emision, "days");

      if (row.observacion_entrega != null || row.motivo_retraso != null) {
        let motivo = "";
        if (row.motivo_retraso != null) {
          motivo = row.motivo_retraso + ". ";
        }
        if (row.observacion_entrega != null) {
          motivo = row.observacion_entrega;
        }

        motivo += " " + dias;
        if (dias == 1) {
          motivo += " Día";
        } else {
          motivo += " Días";
        }
        return motivo;
      } else {
        return "";
      }
    },
    // Metodo para imprimir en PDF
    pdfPrint() {
      api
        .get(`/pdfreports/guiasEmpresa`, {
          headers: {
            client: SessionStorage.getItem("clientId"),
            desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
            hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
            estatus: this.selectedEstatus.value
              ? this.selectedEstatus.value
              : "",
            ciudad: this.selectedCuidades.id ? this.selectedCuidades.id : "",
            guia: this.nro_guia,
          },
        })
        .then((res) => {
          this.$refs.webViewer.showpdf(res.data.pdfPath, 1.5);
          this.idCobranza = "";
        });
    },
    async exportExcel() {
      this.pdfView = false;
      this.loading = true;

      await api
        .get(`/excelreports/guiasEmpresa`, {
          headers: {
            client: SessionStorage.getItem("clientId"),
            desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
            hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
            estatus: this.selectedEstatus.value
              ? this.selectedEstatus.value
              : "",
            ciudad: this.selectedCuidades.id ? this.selectedCuidades.id : "",
            guia: this.nro_guia,
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
          link.setAttribute("download", "Consulta_RCS.xlsx");
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
        });
    },
  },
};
</script>

<style>
@media screen and (max-width: 1080px) {
  .tableHeight {
    height: 100% !important;
  }
}

.limit-width {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
