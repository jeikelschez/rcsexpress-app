<template>
  <q-page class="pagina q-pa-md">
    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="padding-right: 30px; margin-bottom: -10px"
      >
        <div
          class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>ADMINISTRACIÓN - CUENTAS POR COBRAR</strong>
          </p>
        </div>
        <div
          class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center; padding-left: 30px"
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
            label="Fecha Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_hasta"
            mask="##/##/####"
            lazy-rules
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
          <q-input
            outlined
            label="Fecha Emisión"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_emision"
            mask="##/##/####"
            lazy-rules
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
                    v-model="fecha_emision"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-1 col-xl-1 col-lg-1 col-xs-2 col-sm-2"
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
              >Limpiar Filtros</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            :disabled="this.cuentas_cobrar.length > 0 ? false : true"
            @click="this.saveCuentas()"
          >
            <q-icon size="25px" name="input" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Cobranza</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <div
      class="row justify-center items-center content-center"
      style="padding: 10px"
    >
      <div class="col-md-6 col-xs-12" style="width: 48%; padding-right: 5px">
        <q-card style="margin-top: 10px">
          <q-card-section>
            <q-table
              :rows="cuentas_cobrar_asignar"
              dense
              selection="multiple"
              :columns="columnsCuentasCobrarAsignar"
              binary-state-sort
              :separator="separator"
              :rows-per-page-options="[0]"
              v-model:selected="selectedCuentasCobrarAsignar"
              row-key="id"
              style="width: 100%; height: 400px"
              :loading="loading"
              hide-bottom
            >
              <template v-slot:loading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
              <template v-slot:body-cell-nro_control="props">
                <q-td :props="props">
                  {{ buildNroDoc("nro_control", props.row) }}
                </q-td>
              </template>
              <template v-slot:body-cell-nro_documento="props">
                <q-td :props="props">
                  {{ buildNroDoc("nro_documento", props.row) }}
                </q-td>
              </template>
              <template v-slot:body-cell-nro_ref="props">
                <q-td :props="props">
                  {{ buildNroDoc("nro_ref", props.row) }}
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
      <div
        class="row col-md-1 col-xs-12"
        style="text-align: center; margin-left: -40px; margin-right: -40px"
      >
        <div class="col-md-12 col-xs-3 buttonsCard">
          <q-btn
            color="primary"
            round
            padding="sm"
            icon="chevron_right"
            @click="addSelectedCuenta()"
          />
        </div>
        <div class="col-md-12 col-xs-3 buttonsCard">
          <q-btn
            color="primary"
            round
            padding="sm"
            icon="chevron_left"
            @click="removeSelectedCuenta()"
          />
        </div>
      </div>
      <div class="col-md-6 col-xs-12" style="width: 48%; padding-left: 5px">
        <q-card style="margin-top: 10px">
          <q-card-section>
            <q-table
              :rows="cuentas_cobrar"
              dense
              selection="multiple"
              :columns="columnsCuentasCobrar"
              binary-state-sort
              :separator="separator"
              :rows-per-page-options="[0]"
              v-model:selected="selectedCuentasCobrar"
              row-key="id"
              style="width: 100%; height: 400px"
              :loading="loading"
              hide-bottom
            >
              <template v-slot:loading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
              <template v-slot:body-cell-nro_control="props">
                <q-td :props="props">
                  {{ buildNroDoc("nro_control", props.row) }}
                </q-td>
              </template>
              <template v-slot:body-cell-nro_documento="props">
                <q-td :props="props">
                  {{ buildNroDoc("nro_documento", props.row) }}
                </q-td>
              </template>
              <template v-slot:body-cell-nro_ref="props">
                <q-td :props="props">
                  {{ buildNroDoc("nro_ref", props.row) }}
                </q-td>
              </template>
              <template v-slot:body-cell-iva_retenido="props">
                <q-td :props="props">
                  <q-input
                    dense
                    v-model="props.row.iva_retenido"
                    v-money="money"
                    input-class="text-right"
                    style="min-width: 80px; font-size: 13px"
                    @update:model-value="calculaTotales()"
                  />
                </q-td>
              </template>
              <template v-slot:body-cell-islr_retenido="props">
                <q-td :props="props">
                  <q-input
                    dense
                    v-model="props.row.islr_retenido"
                    v-money="money"
                    input-class="text-right"
                    style="min-width: 80px; font-size: 13px"
                    @update:model-value="calculaTotales()"
                  />
                </q-td>
              </template>
              <template v-slot:body-cell-monto_pagado="props">
                <q-td :props="props">
                  <q-input
                    dense
                    v-model="props.row.monto_pagado"
                    v-money="money"
                    input-class="text-right"
                    style="min-width: 100px; font-size: 13px"
                    @update:model-value="calculaTotales()"
                  />
                </q-td>
              </template>
              <template v-slot:body-cell-observacion="props">
                <q-td :props="props">
                  <q-input
                    dense
                    v-model="props.row.observacion"
                    style="min-width: 120px; font-size: 13px"
                  />
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </div>
      <div class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-12 col-xs-12" style="margin-top: 20px">
          <q-card
            class="q-pa-md col-md-12 col-xs-12"
            bordered
            style="padding: 5px"
          >
            <q-card-section
              style="
                padding-bottom: 5px;
                padding-left: 10px;
                padding-right: 10px;
              "
            >
              <div class="row">
                <div
                  class="col-md-5 col-xs-12 selectMobile2"
                  style="margin-bottom: 20px"
                >
                  <q-select
                    dense
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="bancos"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    option-label="nb_banco"
                    option-value="id"
                    v-model="selectedBanco"
                    outlined
                    standout
                    ref="banco"
                    label="Banco"
                    class="pcform"
                    @update:model-value="this.setCuentas()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="apartment" />
                    </template>
                  </q-select>
                </div>
                <div class="col-md-5 col-xs-12" style="padding-right: 20px">
                  <q-select
                    dense
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="cuentas"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    option-label="nro_cuenta"
                    option-value="id"
                    v-model="selectedCuenta"
                    outlined
                    standout
                    ref="cuenta"
                    label="Cuenta"
                  >
                    <template v-slot:prepend>
                      <q-icon name="apartment" />
                    </template>
                  </q-select>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    label="Fecha"
                    hint=""
                    dense
                    v-model="fecha_cobranza"
                    mask="##/##/####"
                    lazy-rules
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
                            v-model="fecha_cobranza"
                            mask="DD/MM/YYYY"
                            style="padding-bottom: 0px"
                          ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-md-3 col-xs-12">
                  <q-input
                    outlined
                    v-model="nro_ingreso"
                    label="Ingreso de Caja N°:"
                    hint=""
                    dense
                    mask="######"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-md-3 col-xs-12">
                  <q-input
                    outlined
                    v-model="monto_cobrado"
                    label="Monto Cobrado:"
                    hint=""
                    class="pcform"
                    v-money="money"
                    dense
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-md-3 col-xs-12">
                  <q-input
                    outlined
                    v-model="monto_retenido"
                    label="Monto Retenido:"
                    input-class="text-right"
                    hint=""
                    v-money="money"
                    dense
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-md-3 col-xs-12">
                  <q-input
                    outlined
                    v-model="monto_deposito"
                    label="Monto Depósito:"
                    input-class="text-right"
                    hint=""
                    v-money="money"
                    dense
                    style="padding-bottom: 10px"
                    lazy-rules
                  >
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="confirmPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Está seguro de los datos de la Cobranza?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            color="primary"
            @click="this.confirmSave = false"
            v-close-popup
          />
          <q-btn
            flat
            label="Guardar"
            color="primary"
            v-close-popup
            @click="this.confirmSave = true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="pdfView" @show="this.pdfPrint()">
      <webViewer
        ref="webViewer"
        @close-pdf="this.pdfView = false"
        style="width: 1000px; height: 750px; max-width: 1000px"
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
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import { VMoney } from "v-money";
import webViewerVue from "src/components/webViewer.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
    VMoney,
    webViewer: webViewerVue,
  },
  directives: { money: VMoney },
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
      nro_ingreso: "",
      monto_cobrado: 0,
      monto_retenido: 0,
      monto_deposito: 0,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "nro_documento",
        descending: true,
        rowsNumber: "",
      },
      fecha_desde: moment().startOf("month").format("DD/MM/YYYY"),
      fecha_hasta: moment().endOf("month").format("DD/MM/YYYY"),
      fecha_emision: moment().format("DD/MM/YYYY"),
      fecha_cobranza: moment().format("DD/MM/YYYY"),
      agencias: [],
      selectedAgencia: [],
      agenciasSelected: [],
      rpermisos: [],
      cuentas_cobrar: [],
      selectedCuentasCobrar: [],
      cuentas_cobrar_asignar: [],
      selectedCuentasCobrarAsignar: [],
      bancos: [],
      selectedBanco: [],
      cuentas: [],
      selectedCuenta: [],
      confirmSave: false,
      idCobranza: "",
      columnsCuentasCobrar: [
        {
          name: "t_de_documento",
          label: "Tipo",
          field: "t_de_documento",
          align: "center",
        },
        {
          name: "nro_control",
          label: "Nº Ctrl.",
          field: "nro_control",
          align: "center",
        },
        {
          name: "nro_documento",
          label: "Nº Doc.",
          field: "nro_documento",
          align: "center",
        },
        {
          name: "nro_ref",
          label: "Ref.",
          field: "nro_ref",
          align: "center",
        },
        {
          name: "monto_total",
          label: "Ingreso",
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
          name: "iva_retenido",
          label: "Iva Ret.",
          field: "iva_retenido",
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
          name: "islr_retenido",
          label: "Islr Ret.",
          field: "islr_retenido",
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
          name: "monto_pagado",
          label: "Depósito",
          field: "monto_pagado",
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
          name: "observacion",
          label: "Observación",
          field: "observacion",
          align: "center",
        },
      ],
      columnsCuentasCobrarAsignar: [
        {
          name: "t_de_documento",
          label: "Tipo",
          field: "t_de_documento",
          align: "center",
        },
        {
          name: "nro_control",
          label: "Nº Ctrl.",
          field: "nro_control",
          align: "center",
        },
        {
          name: "nro_documento",
          label: "Nº Doc.",
          field: "nro_documento",
          align: "center",
        },
        {
          name: "nro_ref",
          label: "Ref.",
          field: "nro_ref",
          align: "center",
        },
        {
          name: "fecha_emision",
          label: "Emisión",
          field: "fecha_emision",
          align: "center",
        },
        {
          name: "monto_total",
          label: "Total",
          field: "monto_total",
          align: "right",
        },
        {
          name: "saldo",
          label: "Saldo",
          field: "saldo",
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
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      confirmPopUp: ref(false),
      pdfView: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Administración - Cuentas por Cobrar", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/bancos", "setData", "bancos");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "cuentasporcobrar",
      },
    });
  },
  methods: {
    // Metodos para Filtrar Selects
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
    filterDesc(array, value) {
      var find = this[array].findIndex((item) => item.value == value);
      return find >= 0 ? this[array][find].label : null;
    },
    // Metodo para traer el value de los Selects y Columns
    findIndex(array, value, field) {
      var find = this[array].findIndex((item) => item.id == value);
      return find >= 0 ? this[array][find][field] : null;
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

    // METODOS PARA PAGINA

    // Metodo para Setear Datos Iniciales
    setData(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodos para Setear Datos al Iniciar
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      this.getDataTable();
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable() {
      this.cuentas_cobrar = [];
      this.$refs.methods.getData(
        `/mmovimientos`,
        "setDataTable",
        "cuentas_cobrar_asignar",
        {
          headers: {
            filters: JSON.stringify({
              agencia: this.selectedAgencia.id,
              desde: moment(this.fecha_desde, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              ),
              hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              ),
              estatus_admin_in: "P",
              tipo_in: "FA,NC",
            }),
            order: JSON.stringify([
              ["t_de_documento", "DESC"],
              ["nro_documento", "ASC"],
            ]),
            direction: "DESC",
          },
        }
      );
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para setear las cuentas del banco
    setCuentas() {
      this.selectedCuenta = [];
      this.$refs.methods.getData("/cuentas", "setData", "cuentas", {
        headers: {
          rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
          banco: this.selectedBanco.id,
        },
      });
    },
    async saveCuentas() {
      // Valido que el banco este lleno
      if (this.selectedBanco.length == 0) {
        this.$refs.banco.$el.focus();
        this.$q.notify({
          message: "Debe seleccionar el Banco para poder generar la Cobranza",
          color: "red",
        });
        return;
      }

      // Valido que la cuenta este llena
      if (this.selectedCuenta.length == 0) {
        this.$refs.cuenta.$el.focus();
        this.$q.notify({
          message: "Debe seleccionar la Cuenta para poder generar la Cobranza",
          color: "red",
        });
        return;
      }

      this.confirmPopUp = true;
      await this.until((_) => this.confirmSave == true);
      if (!this.confirmSave) {
        return;
      } else {
        this.confirmSave = false;
      }

      this.loading = true;

      // Se crea el maestro de Cobranza
      var formCobranza = {};
      formCobranza.cod_agencia = this.selectedAgencia.id;
      formCobranza.fecha_deposito = moment(
        this.fecha_cobranza,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      formCobranza.monto_cobrado = parseFloat(
        this.curReplace(this.monto_cobrado)
      );
      formCobranza.cod_cuenta = this.selectedCuenta.id;
      formCobranza.monto_retenido = parseFloat(
        this.curReplace(this.monto_retenido)
      );
      formCobranza.monto_deposito =
        parseFloat(this.curReplace(this.monto_deposito));
      formCobranza.ingreso_caja = this.nro_ingreso;

      await api
        .post(`/mcobranzas/`, formCobranza, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.idCobranza = res.data.id;
        })
        .catch(() => {
          this.errorMessage(
            "Error al crear el Maestro de Cobranza. Comuníquese con el proveedor del Sistemas..."
          );
          return;
        });

      // Movimiento Bancario
      var formBancario = {};
      formBancario.cod_cuenta = this.selectedCuenta.id;
      formBancario.tipo_transaccion = "I";
      formBancario.fecha_movimiento = moment(
        this.fecha_cobranza,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      formBancario.nro_documento = 0;
      formBancario.tipo_documento = "DP";
      formBancario.monto_movimiento =
        parseFloat(this.curReplace(this.monto_deposito));

      await api
        .post(`/mbancarios/`, formBancario, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .catch(() => {
          this.errorMessage(
            "Error al crear el Movimiento Bancario. Comuníquese con el proveedor del Sistemas..."
          );
          return;
        });

      // Actualiza los saldos en el maestro de movimientos, el estatus según el saldo
      for (var i = 0; i < this.cuentas_cobrar.length; i++) {
        let saldo = 0;
        if (this.cuentas_cobrar[i].t_de_documento != "NC")
          saldo =
            parseFloat(this.curReplace(this.cuentas_cobrar[i].saldo)) -
            parseFloat(this.curReplace(this.cuentas_cobrar[i].monto_pagado));

        let estatus = "P";
        if (saldo == 0) estatus = "C";

        var formFact = {};
        formFact.estatus_administra = estatus;
        formFact.saldo = saldo.toFixed(2);
        formFact.check_cancel = 1;
        formFact.fecha_cancel = moment().format("YYYY-MM-DD");

        // Función que actualiza el maestro de movimientos
        await api
          .put(`/mmovimientos/${this.cuentas_cobrar[i].id}`, formFact, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.errorMessage(
              "Error actualizando los datos del Movimiento. Comuníquese con el proveedor del Sistemas..."
            );
            return;
          });

        // Detalle de Cobranza
        var formDetalle = {};
        formDetalle.cod_cobranza = this.idCobranza;
        formDetalle.cod_movimiento = this.cuentas_cobrar[i].id;
        formDetalle.monto_pagado = parseFloat(
          this.curReplace(this.cuentas_cobrar[i].monto_pagado)
        );
        formDetalle.iva_retenido = parseFloat(
          this.curReplace(this.cuentas_cobrar[i].iva_retenido)
        );
        formDetalle.islr_retenido = parseFloat(
          this.curReplace(this.cuentas_cobrar[i].islr_retenido)
        );
        formDetalle.observacion = this.cuentas_cobrar[i].observacion;

        await api
          .post(`/dcobranzas/`, formDetalle, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.errorMessage(
              "Error al crear el Detalle de Cobranza. Comuníquese con el proveedor del Sistemas..."
            );
            return;
          });
      }

      this.$q.notify({
        message: "Cobranza procesada Exitosamente",
        color: "green",
      });

      // Imprimimos el detalle de la Cobranza
      this.pdfView = true;

      this.loading = false;
      this.resetFilters();
    },

    // Metodo para imprimiir la Cobranza
    pdfPrint() {
      api
        .get(`/pdfreports/cobranza`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            id: this.idCobranza,
          },
        })
        .then((res) => {
          this.$refs.webViewer.showpdf(res.data.pdfPath, 1.5);
          this.idCobranza = "";
        });
    },
    // Metodo para agregar las cuentas por cobrar al control de seleccionadas
    addSelectedCuenta() {
      for (var i = 0; i < this.selectedCuentasCobrarAsignar.length; i++) {
        this.cuentas_cobrar.push(this.selectedCuentasCobrarAsignar[i]);
        let index = this.cuentas_cobrar.findIndex(
          (item) => item.id == this.selectedCuentasCobrarAsignar[i].id
        );
        let monto_total = this.selectedCuentasCobrarAsignar[i].monto_total;
        let iva_retenido = (
          (parseFloat(monto_total) /
            (100 +
              parseFloat(
                this.selectedCuentasCobrarAsignar[i].monto_impuesto
              ))) *
          100 *
          (((parseFloat(this.selectedCuentasCobrarAsignar[i].monto_impuesto) /
            100) *
            75) /
            100)
        ).toFixed(2);
        let islr_retenido = (
          (parseFloat(monto_total) /
            (100 +
              parseFloat(
                this.selectedCuentasCobrarAsignar[i].monto_impuesto
              ))) *
          100 *
          (3 / 100)
        ).toFixed(2);

        if (this.selectedCuentasCobrarAsignar[i].t_de_documento == "NC") {
          monto_total = (parseFloat(monto_total) * -1).toFixed(2);
          iva_retenido = (parseFloat(iva_retenido) * -1).toFixed(2);
          islr_retenido = (parseFloat(islr_retenido) * -1).toFixed(2);
        }

        this.cuentas_cobrar[index].monto_total = monto_total;
        this.cuentas_cobrar[index].monto_pagado = monto_total;
        this.cuentas_cobrar[index].iva_retenido = iva_retenido;
        this.cuentas_cobrar[index].islr_retenido = islr_retenido;
        this.cuentas_cobrar[index].observacion = "";
        this.cuentas_cobrar_asignar.splice(
          this.cuentas_cobrar_asignar.findIndex(
            (item) => item.id == this.selectedCuentasCobrarAsignar[i].id
          ),
          1
        );
      }
      this.selectedCuentasCobrarAsignar = [];
      this.calculaTotales();
    },
    // Metodo para remover las cuentas por cobrar al control de seleccionadas
    removeSelectedCuenta() {
      for (var i = 0; i < this.selectedCuentasCobrar.length; i++) {
        this.cuentas_cobrar_asignar.push(this.selectedCuentasCobrar[i]);
        this.cuentas_cobrar.splice(
          this.cuentas_cobrar.findIndex(
            (item) => item.id == this.selectedCuentasCobrar[i].id
          ),
          1
        );
      }
      this.selectedCuentasCobrar = [];
      this.cuentas_cobrar_asignar.sort((p1, p2) =>
        p1.nro_documento > p2.nro_documento
          ? 1
          : p1.nro_documento < p2.nro_documento
          ? -1
          : 0
      );
      this.calculaTotales();
    },
    // Metodo para calcular los totales
    calculaTotales() {
      let monto_cobrado = 0;
      let monto_deposito = 0;
      let iva_retenido = 0;
      let islr_retenido = 0;
      for (var i = 0; i < this.cuentas_cobrar.length; i++) {
        monto_cobrado += parseFloat(
          this.curReplace(this.cuentas_cobrar[i].monto_total)
        );
        monto_deposito +=
          parseFloat(this.curReplace(this.cuentas_cobrar[i].monto_total)) -
          parseFloat(this.curReplace(this.cuentas_cobrar[i].islr_retenido));
        iva_retenido += parseFloat(
          this.curReplace(this.cuentas_cobrar[i].iva_retenido)
        );
        islr_retenido += parseFloat(
          this.curReplace(this.cuentas_cobrar[i].islr_retenido)
        );
      }
      this.monto_cobrado = monto_cobrado.toFixed(2);
      this.monto_deposito = monto_deposito.toFixed(2);
      this.monto_retenido = (iva_retenido + islr_retenido).toFixed(2);
    },
    // Arma el numero de documento en diferentes formatos
    buildNroDoc(field, row) {
      var response = "";
      switch (field) {
        case "nro_control":
          if (row.t_de_documento == "FA") {
            if (!row.nro_control) {
              response += row.serie_documento + " - " + row.nro_documento;
            } else if (!row.nro_control_new) {
              response += row.nro_control.padStart(4, "0000");
            } else if (!row.serie_documento) {
              response += row.nro_control_new.padStart(9, "00-000000");
            } else {
              response +=
                row.serie_documento +
                " - " +
                row.nro_control_new.padStart(9, "00-000000");
            }
          } else {
            response += row.nro_documento;
          }
          break;
        case "nro_documento":
          if (row.t_de_documento == "FA") {
            if (!row.nro_control) {
              response = row.serie_documento + " - " + row.nro_documento;
            } else {
              response = row.nro_control.padStart(4, "0000");
            }
          }
          break;
        case "nro_ref":
          if (row.t_de_documento == "FA" && row.nro_control)
            response = row.cod_agencia + "-" + row.nro_documento;
          break;
        default:
          break;
      }
      return response;
    },
    // Metodo para que una funcion no avance hasta que se cumpla una condicion
    async until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
      };
      return new Promise(poll);
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selectedAgencia = this.agencias[0];
      this.fecha_desde = moment().startOf("month").format("DD/MM/YYYY");
      this.fecha_hasta = moment().endOf("month").format("DD/MM/YYYY");
      this.fecha_emision = moment().format("DD/MM/YYYY");
      this.fecha_cobranza = moment().format("DD/MM/YYYY");
      this.selectedBanco = [];
      this.selectedCuenta = [];
      this.cuentas = [];
      this.getDataTable();
    },
    // Metodo para imprimir mensajes de error
    errorMessage(message) {
      this.$q.notify({
        message: message,
        color: "red",
      });
    },
    // Pasar un numero a numero con dos decimales en formato correcto para efectuar operaciones
    parseFloatN(number) {
      number = Math.round(number * 100) / 100;
      return number;
    },
    // Metodo para convertir a Currency los String
    curReplace(amount) {
      return amount.indexOf(",") < 0
        ? amount
        : amount.replaceAll(".", "").replaceAll(",", ".");
    },
  },
};
</script>
