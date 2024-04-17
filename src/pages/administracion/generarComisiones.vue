<template>
  <q-page class="pagina q-pa-md">
    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>ADMINISTRACIÓN - GENERAR COMISIONES</strong>
          </p>
        </div>
        <div
          class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            fill-input
            multiple
            use-chips=""
            emit-value
            map-options
            input-debounce="0"
            option-label="nb_agencia"
            option-value="id"
            v-model="selectedAgenciaDestino"
            outlined
            standout
            :loading="loading"
            :disable="loading"
            label="Agencia Destino"
            @update:model-value="
              this.selectedAgente = [];
              this.agenteLoading = true;
              this.$refs.methods.getData('/agentes', 'setData', 'agentes', {
                headers: {
                  agencia: this.selectedAgenciaDestino.id
                    ? this.selectedAgenciaDestino.id
                    : this.selectedAgenciaDestino
                    ? this.selectedAgenciaDestino
                    : '',
                  activo: 'S',
                },
              });
              this.getDataTable();
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
          class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agentesSelected"
            :loading="agentesLoading"
            :disable="agentesLoading"
            ref="agentes"
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
            <template v-slot:agentesLoading>
              <q-inner-loading showing color="primary" class="loading" />
            </template>
          </q-select>
        </div>
      </div>
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -25px"
      >
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="opciones"
            use-input
            hide-selected
            fill-input
            option-label="label"
            option-value="value"
            input-debounce="0"
            v-model="selectedOpcion"
            outlined
            standout
            label="Opciones"
            @update:model-value="getDataTable()"
          >
          </q-select>
        </div>
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
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_hasta"
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
          <q-checkbox
            v-model="selectedSerie"
            color="primary"
            left-label
            val="44"
            label="Serie 44"
            @update:model-value="getDataTable()"
            :disable="
              this.selectedSerie.length > 1
                ? false
                : this.selectedSerie[0] == '55'
                ? false
                : true
            "
            :readonly="
              this.selectedSerie.length > 1
                ? false
                : this.selectedSerie[0] == '55'
                ? false
                : true
            "
          />
          <q-checkbox
            v-model="selectedSerie"
            color="primary"
            left-label
            val="55"
            label="Serie 55"
            @update:model-value="getDataTable()"
            :disable="
              this.selectedSerie.length > 1
                ? false
                : this.selectedSerie[0] == '44'
                ? false
                : true
            "
            :readonly="
              this.selectedSerie.length > 1
                ? false
                : this.selectedSerie[0] == '44'
                ? false
                : true
            "
          />
        </div>
        <div
          class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-checkbox
            v-model="selectedAgrup"
            color="primary"
            left-label
            label="Agrupado"
          />
        </div>
        <div
          class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-checkbox
            v-model="selectedDolar"
            color="primary"
            left-label
            label="$"
          />
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center"
        >
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
            @click="this.sendData()"
            style="margin-right: 15px"
          >
            <q-icon size="25px" name="save" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Guardar Selección</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 5px"
            :disabled="this.selected.length > 0 ? false : true"
            @click.capture="this.pdfView = true"
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

    <q-form ref="formData">
      <div class="q-pa-md justify-center" style="margin-top: -25px">
        <q-table
          :rows="guias"
          :columns="columns"
          binary-state-sort
          :separator="separator"
          selection="multiple"
          row-key="id"
          :loading="loading"
          :rows-per-page-options="[0]"
          @request="getDataTable"
          style="width: 100%; height: 490px; margin-bottom: 30px"
          :grid="$q.screen.xs"
          v-model:selected="selected"
          v-model:pagination="pagination"
          hide-bottom
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" class="loading" />
          </template>
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width>
                <q-checkbox v-model="props.selected" />
              </q-th>
              <q-th v-for="col in props.cols" :key="col.name" :props="props">
                {{ col.label }}
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props" style="margin-bottom: 20px">
            <q-tr :props="props" v-if="props.rowIndex * -1 == 0">
              <q-td colspan="100%" style="font-size: 20px; color: #283593">
                <div class="text-left" style="margin-bottom: -30px">
                  <strong>{{
                    findIndex(
                      "agencias",
                      this.guias[props.rowIndex].cod_agencia_dest,
                      "nb_agencia"
                    )
                  }}</strong>
                </div>
              </q-td>
            </q-tr>
            <q-tr
              :props="props"
              v-else-if="
                this.guias[props.rowIndex].cod_agencia_dest !=
                this.guias[props.rowIndex - 1].cod_agencia_dest
              "
            >
              <q-td colspan="100%" style="font-size: 20px; color: #283593">
                <div class="text-left" style="margin-bottom: -30px">
                  <strong>{{
                    findIndex(
                      "agencias",
                      this.guias[props.rowIndex].cod_agencia_dest,
                      "nb_agencia"
                    )
                  }}</strong>
                </div>
              </q-td>
            </q-tr>
            <q-tr :props="props" v-if="props.rowIndex * -1 == 0">
              <q-td colspan="4" style="font-size: 16px">
                <div class="text-left">
                  <strong>
                    {{
                      "Agente de Entrega: " +
                      findIndex(
                        "agentesAll",
                        this.guias[props.rowIndex].cod_agente_entrega,
                        "persona_responsable"
                      )
                    }}
                  </strong>
                </div>
              </q-td>
              <q-td colspan="2" style="font-size: 16px">
                <div class="text-left">
                  <strong>
                    {{
                      "% Com. Entrega: " +
                      findIndex(
                        "agentesAll",
                        this.guias[props.rowIndex].cod_agente_entrega,
                        "porc_comision_entrega"
                      ).replace(".", ",")
                    }}
                  </strong>
                </div>
              </q-td>
              <q-td colspan="7" style="font-size: 16px">
                <div class="text-left">
                  <strong>
                    {{
                      "% Com. Seguro: " +
                      findIndex(
                        "agentesAll",
                        this.guias[props.rowIndex].cod_agente_entrega,
                        "porc_comision_seguro"
                      ).replace(".", ",")
                    }}
                  </strong>
                </div>
              </q-td>
            </q-tr>
            <q-tr
              :props="props"
              v-else-if="
                this.guias[props.rowIndex].cod_agencia_dest +
                  '-' +
                  this.guias[props.rowIndex].cod_agente_entrega !=
                this.guias[props.rowIndex - 1].cod_agencia_dest +
                  '-' +
                  this.guias[props.rowIndex - 1].cod_agente_entrega
              "
            >
              <q-td colspan="4" style="font-size: 16px">
                <div class="text-left">
                  <strong>
                    {{
                      "Agente de Entrega: " +
                      findIndex(
                        "agentesAll",
                        this.guias[props.rowIndex].cod_agente_entrega,
                        "persona_responsable"
                      )
                    }}
                  </strong>
                </div>
              </q-td>
              <q-td colspan="2" style="font-size: 16px">
                <div class="text-left">
                  <strong>
                    {{
                      "% Com. Entrega: " +
                      findIndex(
                        "agentesAll",
                        this.guias[props.rowIndex].cod_agente_entrega,
                        "porc_comision_entrega"
                      ).replace(".", ",")
                    }}
                  </strong>
                </div>
              </q-td>
              <q-td colspan="7" style="font-size: 16px">
                <div class="text-left">
                  <strong>
                    {{
                      "% Com. Seguro: " +
                      findIndex(
                        "agentesAll",
                        this.guias[props.rowIndex].cod_agente_entrega,
                        "porc_comision_seguro"
                      ).replace(".", ",")
                    }}
                  </strong>
                </div>
              </q-td>
            </q-tr>
            <q-tr :props="props">
              <q-td>
                <q-checkbox v-model="props.selected" />
              </q-td>
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <div v-if="col.name == 'fecha_envio'">
                  {{ buildData("fecha_envio", props.row) }}
                </div>
                <div v-else-if="col.name == 'dias_entrega'">
                  {{ buildData("dias_entrega", props.row) }}
                </div>
                <div v-else-if="col.name == 'cod_cliente_org'">
                  {{ buildData("cod_cliente_org", props.row) }}
                </div>
                <div v-else-if="col.name == 'estatus_operativo'">
                  {{
                    filterDesc("estatusOperativo", props.row.estatus_operativo)
                  }}
                </div>
                <div v-else-if="col.name == 'estatus_administra'">
                  {{
                    filterDesc(
                      "estatusAdministrativo",
                      props.row.estatus_administra
                    )
                  }}
                </div>
                <div v-else>
                  {{ col.value }}
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
        <div class="col-md-6 col-xs-12">
          <q-card
            class="q-pa-md col-md-12 col-xs-12"
            bordered
            style="padding: 3px; margin-top: -20px"
          >
            <q-card-section style="padding: 3px; margin-bottom: -22px">
              <div class="row">
                <div class="col-md-1 col-xs-12">
                  <q-input
                    outlined
                    v-model="cantidad"
                    label="Cantidad"
                    hint=""
                    dense
                    :disable="true"
                    v-money="moneyNotDecimal"
                    input-class="text-right"
                    class="pcform"
                  >
                  </q-input>
                </div>
                <div class="col-md-5 col-xs-12"></div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="monto_total"
                    label="Monto Total"
                    class="pcform"
                    v-money="money"
                    dense
                    :disable="true"
                    input-class="text-right"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="comision_entrega"
                    label="Comisión Entrega"
                    class="pcform"
                    v-money="money"
                    dense
                    :disable="true"
                    input-class="text-right"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="comision_seguro"
                    label="Comisión Seguro"
                    class="pcform"
                    v-money="money"
                    dense
                    :disable="true"
                    input-class="text-right"
                  >
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-form>

    <q-dialog v-model="pdfView" @show="this.print()">
      <webViewer
        ref="webViewer"
        @export-Excel="exportExcel"
        @close-pdf="this.pdfView = false"
        style="width: 1200px; height: 750px; max-width: 1200px"
      ></webViewer>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Init="setDataInit"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { api } from "boot/axios";
import { VMoney } from "v-money";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import webViewerVue from "src/components/webViewer.vue";

export default {
  directives: { money: VMoney },
  components: {
    methods: methodsVue,
    webViewer: webViewerVue,
    rulesVue,
  },
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: false,
      },
      moneyNotDecimal: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: false,
      },
      columns: [
        {
          name: "nro_documento",
          label: "Nro. Documento",
          field: "nro_documento",
          align: "left",
        },
        {
          name: "fecha_emision",
          label: "Fecha Emisión",
          field: "fecha_emision",
          align: "left",
        },
        {
          name: "fecha_envio",
          label: "Fecha Envío",
          field: "fecha_envio",
          align: "left",
        },
        {
          name: "fecha_recepcion",
          label: "Fecha Entrega",
          field: "fecha_recepcion",
          align: "left",
        },
        {
          name: "dias_entrega",
          label: "Días Entrega",
          field: "dias_entrega",
          align: "center",
        },
        {
          name: "siglas_org",
          label: "Org.",
          field: "siglas_org",
          align: "center",
        },
        {
          name: "cod_cliente_org",
          label: "Cliente",
          field: "cod_cliente_org",
          align: "left",
        },
        {
          name: "monto_total",
          label: "Monto Total",
          field: "monto_total",
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
          name: "estatus_operativo",
          label: "Estatus Operativo",
          field: "estatus_operativo",
          align: "left",
        },
        {
          name: "estatus_administra",
          label: "Estatus Administra",
          field: "estatus_administra",
          align: "left",
        },
        {
          name: "comision_entrega",
          label: "Comisión Entrega",
          field: "comision_entrega",
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
          name: "comision_seguro",
          label: "Comisión Seguro",
          field: "comision_seguro",
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
      ],
      opciones: [
        { label: "GENERAR COMISIONES", value: "GC" },
        { label: "COMISIONES GENERADAS", value: "CG" },
      ],
      estatusOperativo: [
        { label: "Conforme", value: "CO" },
        { label: "No Conforme", value: "NC" },
      ],
      estatusAdministrativo: [
        { label: "En Elaboracion", value: "E" },
        { label: "Por Facturar", value: "F" },
        { label: "Facturada", value: "G" },
        { label: "Anulada", value: "A" },
        { label: "Por Cobrar", value: "P" },
        { label: "Cancelada", value: "C" },
        { label: "Por Imprimir", value: "I" },
        { label: "Modificada", value: "M" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0,
        sortBy: JSON.stringify([
          ["cod_agencia_dest", "ASC"],
          ["cod_agente_entrega", "ASC"],
          ["nro_documento", "ASC"],
          ["fecha_emision", "ASC"],
        ]),
        descending: false,
      },
      selected: [],
      guias: [],
      agencias: [],
      agentes: [],
      agentesAll: [],
      agentesArray: [],
      agentesEntrega: [],
      agentesSeguro: [],
      agenciasSelected: [],
      selectedAgenciaDestino: [],
      selectedAgente: [],
      agentesSelected: [],
      agentesLoading: false,
      selectedOpcion: [],
      selectedId: [],
      printData: [],
      selectedSerie: ["44", "55"],
      selectedAgrup: false,
      selectedDolar: false,
      fecha_desde: moment().startOf("month").format("DD/MM/YYYY"),
      fecha_hasta: moment().endOf("month").format("DD/MM/YYYY"),
      cantidad: 0,
      monto_total: 0,
      comision_entrega: 0,
      comision_seguro: 0,
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      pdfView: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Administración - Generar Comisiones", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/agentes", "setData", "agentesAll", {
      headers: {
        activo: "S",
      },
    });

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "generarcomisiones",
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
    // Metodo para validar Permisos
    allowOption(option) {
      return (
        this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0
      );
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos Generales
    async setDataInit(res, dataRes) {
      this.loading = true;
      this[dataRes] = res.data ? res.data : res;
      this.selectedOpcion = this.opciones[0];
      this.getDataTable();
    },
    // Metodo para Setear Datos Generales
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Extraer Datos de Tabla
    async getDataTable(props) {
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.agentesArray = [];

      // Si es multiagencia, y tiene agentes filtrados, busco los IDs
      if (this.selectedAgente.persona_responsable && !this.selectedAgente.id) {
        for (var i = 0; i <= this.selectedAgenciaDestino.length - 1; i++) {
          await api
            .get(`/agentes/`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                agencia: this.selectedAgenciaDestino[i],
                responsable: this.selectedAgente.persona_responsable,
                activo: "S",
              },
            })
            .then((res) => {
              if (res.data.data.length > 0) {
                this.agentesArray.push(res.data.data[0].id);
              }
            });
        }
      }

      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "guias", {
        headers: {
          filters: JSON.stringify({
            agencia_dest: this.selectedAgenciaDestino.id
              ? this.selectedAgenciaDestino.id
              : this.selectedAgenciaDestino.length > 0
              ? this.selectedAgenciaDestino
              : "",
            agente: this.selectedAgente.id
              ? this.selectedAgente.id
              : this.agentesArray.length > 0
              ? this.agentesArray
              : "",
            desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
            hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
            estatus_admin_ex: "A",
            estatus_oper_in: "CO,NC",
            include_fc: "S",
            serie: this.selectedSerie,
          }),
          order: this.pagination.sortBy,
          direction: this.pagination.descending ? "DESC" : "ASC",
        },
      });
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
      this.selected = this.guias;
      if (this.guias.length > 0) this.calculaTotales();
    },
    // Construye la data de la tabla
    buildData(field, row) {
      var response = "";
      switch (field) {
        case "fecha_envio":
          response = row.fecha_envio;
          if (row.fecha_envio_costo)
            response = moment(row.fecha_envio_costo, "YYYY-MM-DD").format(
              "DD/MM/YYYY"
            );
          break;
        case "dias_entrega":
          let fecha_recepcion = moment(row.fecha_recepcion, "DD/MM/YYYY");
          let fecha_envio = moment(row.fecha_envio, "DD/MM/YYYY");
          if (row.fecha_envio_costo) {
            fecha_envio = moment(row.fecha_envio_costo);
          }
          response = fecha_recepcion.diff(fecha_envio, "days");
          break;
        case "cod_cliente_org":
          response = row.cliente_dest_desc;
          if (row.pagado_en == "O") {
            response = row.cliente_orig_desc;
          }
          break;
        default:
          break;
      }
      return response;
    },
    // Imprimir Reporte
    print() {
      for (var i = 0; i < this.selected.length; i++) {
        this.selectedId.push(this.selected[i].id);
      }

      api
        .get(`/pdfreports/comisiones`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            data: JSON.stringify(this.selectedId),
            desde: this.fecha_desde,
            hasta: this.fecha_hasta,
            dolar: this.selectedDolar,
            group: this.selectedAgrup
          },
        })
        .then((res) => {
          if (!res.data.validDoc) {
            this.$q.notify({
              message: "No existen registros para este conjunto de Filtos",
              color: "red",
            });
            this.pdfView = false;
            return;
          }
          this.$refs.webViewer.showpdf(res.data.pdfPath, 1.4);
        })
        .catch((err) => {
          this.$q.notify({
            message: "Error en generar el reporte: " + err,
            color: "red",
          });
          this.pdfView = false;
          return;
        });
      this.printData = [];
    },
    async exportExcel() {
      this.pdfView = false
      this.loading = true;

      for (var i = 0; i < this.selected.length; i++) {
        this.selectedId.push(this.selected[i].id);
      }   

      await api
        .get(`/excelreports/comisiones`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            data: JSON.stringify(this.selectedId),
            desde: this.fecha_desde,
            hasta: this.fecha_hasta,
            dolar: this.selectedDolar,
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
    // Metodo para Calcular Totales
    async calculaTotales() {
      let total = 0;
      let entrega = 0;
      let seguro = 0;
      let agente_entrega = 0;
      let agente_seguro = 0;
      for (var i = 0; i < this.guias.length; i++) {
        total += this.parseFloatN(this.curReplace(this.guias[i].monto_total));
        entrega += this.parseFloatN(
          this.curReplace(this.guias[i].comision_entrega)
        );
        seguro += this.parseFloatN(
          this.curReplace(this.guias[i].comision_seguro)
        );
        if (
          i > 0 &&
          this.guias[i].cod_agencia_dest +
            "-" +
            this.guias[i].cod_agente_entrega !=
            this.guias[i - 1].cod_agencia_dest +
              "-" +
              this.guias[i - 1].cod_agente_entrega
        ) {
          this.agentesEntrega[
            this.guias[i - 1].cod_agencia_dest +
              "-" +
              this.guias[i - 1].cod_agente_entrega
          ] = agente_entrega;
          this.agentesSeguro[
            this.guias[i - 1].cod_agencia_dest +
              "-" +
              this.guias[i - 1].cod_agente_entrega
          ] = agente_seguro;
          agente_entrega = 0;
          agente_seguro = 0;
        }
        agente_entrega += this.parseFloatN(
          this.curReplace(this.guias[i].comision_entrega)
        );
        agente_seguro += this.parseFloatN(
          this.curReplace(this.guias[i].comision_seguro)
        );
      }
      this.agentesEntrega[
        this.guias[this.guias.length - 1].cod_agencia_dest +
          "-" +
          this.guias[this.guias.length - 1].cod_agente_entrega
      ] = agente_entrega;
      this.agentesSeguro[
        this.guias[this.guias.length - 1].cod_agencia_dest +
          "-" +
          this.guias[this.guias.length - 1].cod_agente_entrega
      ] = agente_seguro;

      this.cantidad = this.guias.length;
      this.monto_total = total.toFixed(2);
      this.comision_entrega = entrega.toFixed(2);
      this.comision_seguro = seguro.toFixed(2);
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selectedOpcion = this.opciones[0];
      this.selectedAgenciaDestino = [];
      this.selectedAgente = [];
      this.fecha_desde = moment().startOf("month").format("DD/MM/YYYY");
      this.fecha_hasta = moment().endOf("month").format("DD/MM/YYYY");
      this.selectedSerie = ["44", "55"];
      this.selectedAgrup = false;
      this.selectedDolar = false;
      this.getDataTable();
    },
    // Metodo para convertir a Currency los String
    curReplace(amount) {
      return amount.indexOf(",") < 0
        ? amount
        : amount.replaceAll(".", "").replaceAll(",", ".");
    },
    // Pasar un numero a numero con dos decimales en formato correcto para efectuar operaciones
    parseFloatN(number) {
      number = Math.round(number * 100) / 100;
      return number;
    },
  },
};
</script>
