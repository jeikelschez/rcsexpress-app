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
              <strong>Administración - Pago de Comisiones</strong>
            </p>
          </div>
          <div
            class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center"
          >
            <q-option-group
            v-model="group"
            :options="options"
            color="primary"
            inline
            />
          </div>
          <div
            class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="tipoFacturacion"
              use-input
              hide-selected
              fill-input
              :disable="this.detalles.length > 0 ? true : false"
              option-label="label"
              option-value="value"
              input-debounce="0"
              v-model="selectedTipo"
              outlined
              standout
              label="Agencia"
              @update:model-value="setConceptos()"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center"
          >
          <q-btn-toggle
            v-model="model"
            toggle-color="primary"
            rounded
            :options="[
                {label: 'Ventas', value: 'one'},
                {label: 'Entrega', value: 'two'},
                {label: 'Seguro', value: 'three'}
            ]"
            />
          </div>
        </div>
        <div
          class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center; margin-top: -25px"
        >
          <div
            class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center"
          >
            <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="clientesSelected"
              :loading="clientesLoading"
              :disable="
                !clientesLoading
                  ? this.detalles.length > 0
                    ? true
                    : false
                  : true
              "
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
              label="Agente"
              @update:model-value="
                if (this.selectedCliente.cte_decontado == 1) {
                  popupCliente();
                } else {
                  setGuiasCarga();
                }
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
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
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
              v-model="fechaSelected"
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
                      v-model="fechaSelected"
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
              v-model="fechaSelected"
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
                      v-model="fechaSelected"
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
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12"
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
              @click="printDialog()"
              style="margin-right: 15px"
            >
              <q-icon size="25px" name="save" color="white"> </q-icon>
              <q-tooltip
                class="bg-primary"
                style="max-height: 30px"
                transition-show="scale"
                transition-hide="scale"
                color="primary"
                >Generar Factura</q-tooltip
              >
            </q-btn>
            <q-btn
              dense
              color="primary"
              round
              padding="sm"
              @click="printDialog()"
              style="margin-right: 15px"
            >
              <q-icon size="25px" name="print" color="white"> </q-icon>
              <q-tooltip
                class="bg-primary"
                style="max-height: 30px"
                transition-show="scale"
                transition-hide="scale"
                color="primary"
                >Generar Factura</q-tooltip
              >
            </q-btn>
          </div>
        </div>

        <div class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-12 col-xs-12" style="margin-bottom: 20px">
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
                <div class="table">
                  <q-table
                    :rows="detalles"
                    :loading="loading"
                    binary-state-sort
                    row-key="id"
                    style="width: 100%; height: 400px"
                    :pagination="pagination"
                    virtual-scroll
                    :columns="columnsDetalle"
                    :grid="$q.screen.xs"
                    :separator="separator"
                    hide-bottom
                  >
                    <template v-slot:loading>
                      <q-inner-loading
                        showing
                        color="primary"
                        class="loading"
                      />
                    </template>
                    <template v-slot:item="props">
                      <div
                        class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                        :style="props.selected ? 'transform: scale(0.95);' : ''"
                      >
                        <q-card :class="props.selected ? 'bg-grey-2' : ''">
                          <q-list dense>
                            <q-item v-for="col in props.cols" :key="col.name">
                              <q-item-section v-if="col.name !== 'check_impuesto' && col.name !== 'cod_concepto'">
                                <q-item-label>{{ col.label }}</q-item-label>
                              </q-item-section>
                              <q-item-section side class="itemMovilSide">
                                <q-input
                                  v-if="col.name === 'cantidad'"
                                  outlined
                                  input-class="text-right"
                                  dense
                                  v-money="moneyNotDecimal"
                                  v-model="props.row.cantidad"
                                  :disable="
                                    props.row.cod_concepto ==
                                    this.conceptoTransporte
                                      ? true
                                      : false
                                  "
                                  :ref="'cantidad' + (props.row.nro_item - 1)"
                                  :rules="[
                                    (val) => this.$refs.rulesVue.isReq(val, ''),
                                    (val) =>
                                      this.$refs.rulesVue.isMax(val, 3, ''),
                                  ]"
                                  hide-bottom-space
                                  @keyup="
                                    this.calculaDetalle('cantidad', props.row)
                                  "
                                >
                                </q-input>
                                <q-input
                                  outlined
                                  v-if="col.name === 'costo_unitario'"
                                  input-class="text-right"
                                  dense
                                  v-money="money"
                                  v-model="props.row.costo_unitario"
                                  :disable="
                                    props.row.cod_concepto ==
                                    this.conceptoTransporte
                                      ? true
                                      : false
                                  "
                                  ref="costo_unitario"
                                  :rules="[
                                    (val) => this.$refs.rulesVue.isReq(val, ''),
                                    (val) =>
                                      this.$refs.rulesVue.isMax(val, 9, ''),
                                  ]"
                                  hide-bottom-space
                                  @keyup="
                                    this.calculaDetalle(
                                      'costo_unitario',
                                      props.row
                                    )
                                  "
                                >
                                </q-input>
                                <q-input
                                  v-if="col.name === 'subtotal'"
                                  outlined
                                  input-class="text-right"
                                  dense
                                  v-money="money"
                                  v-model="props.row.subtotal"
                                  :disable="
                                    props.row.cod_concepto ==
                                    this.conceptoTransporte
                                      ? true
                                      : false
                                  "
                                  ref="subtotal"
                                  :rules="[
                                    (val) => this.$refs.rulesVue.isReq(val, ''),
                                    (val) =>
                                      this.$refs.rulesVue.isMax(val, 9, ''),
                                  ]"
                                  hide-bottom-space
                                  @keyup="
                                    this.calculaDetalle('subtotal', props.row)
                                  "
                                >
                                </q-input>
                                <q-btn
                                  v-if="col.name === 'action'"
                                  dense
                                  round
                                  flat
                                  color="primary"
                                  icon="reset_tv"
                                  :disabled="this.allowOption(3)"
                                  @click="selected = props.row.nro_item - 1"
                                  @click.capture="
                                    this.referencia = this.detalles[
                                      props.row.nro_item - 1
                                    ]
                                      ? this.detalles[props.row.nro_item - 1]
                                          .reference
                                      : '';
                                    this.reference = true;
                                  "
                                ></q-btn>
                                <q-btn
                                  v-if="col.name === 'action'"
                                  dense
                                  round
                                  flat
                                  color="primary"
                                  icon="delete"
                                  :disable="
                                    props.row.cod_concepto ==
                                    this.conceptoTransporte
                                      ? true
                                      : false
                                  "
                                  :disabled="this.allowOption(4)"
                                  @click="selected = props.row.nro_item - 1"
                                  @click.capture="deletePopup = true"
                                ></q-btn>
                                <q-item-label v-if="col.name === 'nro_item' || col.name === 'concepto'">{{ col.value }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-card>
                      </div>
                    </template>
                    <template v-slot:body-cell-cantidad="props">
                      <q-td :props="props">
                        <q-input
                          outlined
                          input-class="text-right"
                          dense
                          v-money="moneyNotDecimal"
                          v-model="props.row.cantidad"
                          :disable="
                            props.row.cod_concepto == this.conceptoTransporte
                              ? true
                              : false
                          "
                          :ref="'cantidad' + (props.row.nro_item - 1)"
                          :rules="[
                            (val) => this.$refs.rulesVue.isReq(val, ''),
                            (val) => this.$refs.rulesVue.isMax(val, 3, ''),
                          ]"
                          hide-bottom-space
                          @keyup="this.calculaDetalle('cantidad', props.row)"
                        >
                        </q-input>
                      </q-td>
                    </template>
                    <template v-slot:body-cell-costo_unitario="props">
                      <q-td :props="props">
                        <q-input
                          outlined
                          input-class="text-right"
                          dense
                          v-money="money"
                          v-model="props.row.costo_unitario"
                          :disable="
                            props.row.cod_concepto == this.conceptoTransporte
                              ? true
                              : false
                          "
                          ref="costo_unitario"
                          :rules="[
                            (val) => this.$refs.rulesVue.isReq(val, ''),
                            (val) => this.$refs.rulesVue.isMax(val, 9, ''),
                          ]"
                          hide-bottom-space
                          @keyup="
                            this.calculaDetalle('costo_unitario', props.row)
                          "
                        >
                        </q-input>
                      </q-td>
                    </template>
                    <template v-slot:body-cell-subtotal="props">
                      <q-td :props="props">
                        <q-input
                          outlined
                          input-class="text-right"
                          dense
                          v-money="money"
                          v-model="props.row.subtotal"
                          :disable="
                            props.row.cod_concepto == this.conceptoTransporte
                              ? true
                              : false
                          "
                          ref="subtotal"
                          :rules="[
                            (val) => this.$refs.rulesVue.isReq(val, ''),
                            (val) => this.$refs.rulesVue.isMax(val, 9, ''),
                          ]"
                          hide-bottom-space
                          @keyup="this.calculaDetalle('subtotal', props.row)"
                        >
                        </q-input>
                      </q-td>
                    </template>
                    <template v-slot:body-cell-action="props">
                      <q-td :props="props">
                        <q-btn
                          dense
                          round
                          flat
                          color="primary"
                          icon="reset_tv"
                          :disabled="this.allowOption(3)"
                          @click="selected = props.row.nro_item - 1"
                          @click.capture="
                            this.referencia = this.detalles[
                              props.row.nro_item - 1
                            ]
                              ? this.detalles[props.row.nro_item - 1].reference
                              : '';
                            this.reference = true;
                          "
                        ></q-btn>
                        <q-btn
                          dense
                          round
                          flat
                          color="primary"
                          icon="delete"
                          :disable="
                            props.row.cod_concepto == this.conceptoTransporte
                              ? true
                              : false
                          "
                          :disabled="this.allowOption(4)"
                          @click="selected = props.row.nro_item - 1"
                          @click.capture="deletePopup = true"
                        ></q-btn>
                      </q-td>
                    </template>
                  </q-table>
                </div>
                <div class="col-md-3 col-xs-12" style="align-self: center; text-align: center">
                    <p style="font-size: 20px; text-align: center; margin-top: 5px" class="text-secondary">
                    <strong>Datos del Cheque a Generar:</strong>
                    </p>
                </div>
                <div class="col-md-4 col-xs-12 cardMargin selectMobile2">
                    <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="clientesSelected"
              :loading="clientesLoading"
              :disable="
                !clientesLoading
                  ? this.detalles.length > 0
                    ? true
                    : false
                  : true
              "
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
              label="Banco"
              @update:model-value="
                if (this.selectedCliente.cte_decontado == 1) {
                  popupCliente();
                } else {
                  setGuiasCarga();
                }
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
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
            </q-select>
                </div>
                <div class="col-md-5 col-xs-12 selectMobile2">
                    <q-select
              rounded
              dense
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="clientesSelected"
              :loading="clientesLoading"
              :disable="
                !clientesLoading
                  ? this.detalles.length > 0
                    ? true
                    : false
                  : true
              "
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
              label="Cta. Banco"
              @update:model-value="
                if (this.selectedCliente.cte_decontado == 1) {
                  popupCliente();
                } else {
                  setGuiasCarga();
                }
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
              <template v-slot:clientesLoading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
            </q-select>
                </div>
                <div class="col-md-5 col-xs-12 cardMargin selectMobile2">
                    <q-input
              outlined
              label="Ult. Cheque"
              hint=""
              dense
              rounded
              style="padding-bottom: 0px"
              v-model="fechaSelected"
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
                      v-model="fechaSelected"
                      mask="DD/MM/YYYY"
                      style="padding-bottom: 0px"
                      @update:model-value="this.$refs.qDateProxy.hide()"
                    ></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>    
                </div>
                <div class="col-md-7 col-xs-12 selectMobile2">
                    <q-input
              outlined
              label="Beneficiario"
              hint=""
              dense
              rounded
              style="padding-bottom: 0px"
              v-model="fechaSelected"
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
                      v-model="fechaSelected"
                      mask="DD/MM/YYYY"
                      style="padding-bottom: 0px"
                      @update:model-value="this.$refs.qDateProxy.hide()"
                    ></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>    
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      </div>
  
      <q-dialog v-model="deletePopup">
        <q-card style="width: 700px">
          <q-card-section>
            <div class="text-h5" style="font-size: 18px">
              ¿Desea eliminar el Registro?
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn
              flat
              label="Aceptar"
              color="primary"
              v-close-popup
              @click="deleteConcepto(selected)"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
  
      <methods
        ref="methods"
        @set-Data="setData"
        @set-Data-Init="setDataInit"
        @set-Ultima-Fact="setUltimaFact"
        @set-Data-Permisos="setDataPermisos"
      ></methods>
  
      <rules-vue ref="rulesVue"></rules-vue>
    </q-page>
  </template>
  
  <script>
  import { ref } from "vue";
  import rulesVue from "src/components/rules.vue";
  import moment from "moment";
  import { VMoney } from "v-money";
  import { api } from "boot/axios";
  import webViewerVue from "src/components/webViewer.vue";
  import { useQuasar, LocalStorage } from "quasar";
  import methodsVue from "src/components/methods.vue";
  
  export default {
    directives: { money: VMoney },
    components: {
      methods: methodsVue,
      rulesVue,
      webViewer: webViewerVue,
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
        columnsDetalle: [
          {
            name: "nro_item",
            label: "Tipo Comisión",
            field: "nro_item",
            align: "center",
          },
          {
            name: "concepto",
            label: "Nro. Documento",
            field: "concepto",
            align: "left",
            style: "width: 700px",
          },
          {
            name: "cantidad",
            label: "Fecha Emisión",
            field: "cantidad",
            align: "right",
          },
          {
            name: "costo_unitario",
            label: "Org.",
            field: "costo_unitario",
            align: "right",
          },
          {
            name: "subtotal",
            label: "Cliente",
            field: "subtotal",
            align: "right",
          },
          {
            name: "subtotal",
            label: "Sub-Total Documento",
            field: "subtotal",
            align: "right",
          },
          {
            name: "subtotal",
            label: "% Com.",
            field: "subtotal",
            align: "right",
          },
          {
            name: "subtotal",
            label: "Monto Comision",
            field: "subtotal",
            align: "right",
          },
          {
            name: "subtotal",
            label: "Nro. Control",
            field: "subtotal",
            align: "right",
          },
          {
            name: "subtotal",
            label: "Nro. Doc.",
            field: "subtotal",
            align: "right",
          },
          {
            name: "subtotal",
            label: "Ref.",
            field: "subtotal",
            align: "right",
          },
          {
            name: "action",
            label: "Acciones",
            align: "center",
          },
        ],
        form: {
          monto_subtotal: 0,
          monto_descuento: 0,
          monto_base: 0,
          monto_impuesto: 0,
          monto_fpo: 0,
          monto_total: 0,
          observacion: "",
        },
        formaPago: [
          { label: "CONTADO", value: "CO" },
          { label: "CRÉDITO", value: "CR" },
        ],
        tipoFacturacion: [
          {
            label: "FACTURACION CREDITO",
            value: "C",
            tipo: 22,
            formaPago: "CR",
            tipoFact: "FG",
            formaindex: 1,
            vcontrol: 15,
          },
          {
            label: "FACTURACION CONTADO",
            value: "A",
            tipo: 22,
            formaPago: "CO",
            tipoFact: "FC",
            formaindex: 0,
            vcontrol: 21,
          },
          {
            label: "FACTURACION OTROS INGRESOS",
            value: "I",
            tipo: 3,
            formaPago: "",
            tipoFact: "FO",
            formaindex: 0,
            vcontrol: 15,
          },
        ],
        pagadoEn: [
          { label: "ORIGEN", value: "O" },
          { label: "DESTINO", value: "D" },
        ],
        paginationGuia: {
          page: 1,
          rowsPerPage: 0,
          sortBy: "fecha_emision",
          descending: false,
        },
        formClientesParticulares: {
          pais: "",
          estado: "",
          ciudad: "",
          cod_agencia: [],
          cod_ciudad: [],
          cod_localidad: [],
          cod_municipio: [],
          cod_parroquia: [],
          cod_cliente: "",
          direccion: "",
          fax: "",
          id: "",
          nb_cliente: "",
          rif_ci: "",
          telefonos: "",
        },
        multiples_agencias: true,
        fpoConceptos: [15, 16, 17, 18, 19, 20, 21, 22],
        ci_rif_cte_conta_org: null,
        id_clte_part_orig: null,
        cliente_id_temp: "",
        disableCliente: true,
        disableRif: false,
        municipiosSelected: [],
        parroquiasFiltered: [],
        localidadesSelected: [],
        agencias: [],
        detalles: [],
        guiasCarga: [],
        ultimaFact: [],
        selected: [],
        selectedAgencia: [],
        selectedCliente: [],
        selectedTipo: [],
        selectedForma: [],
        agenciasSelected: [],
        tiposSelected: [],
        fechaSelected: moment().format("DD/MM/YYYY"),
        descuentoSelected: 0,
        cobradoSelected: 0,
        clientesSelected: [],
        conceptos: [],
        selectedConcepto: [],
        tiposConcepto: [],
        selectedTiposConcepto: [],
        ultNroControl: "",
        ultNroInterno: "",
        ultNroRef: "",
        clientesLoading: true,
        monto_subtotal: 0,
        monto_base: 0,
        monto_impuesto: 0,
        monto_total: 0,
        monto_subtotal_select: 0,
        monto_base_select: 0,
        monto_impuesto_select: 0,
        monto_total_select: 0,
        rpermisos: [],
        confirmAsign: false,
        confirmSave: false,
        confirmPrint: false,
        conceptoTransporte: "",
        referencia: "",
        imprimio: false,
        imprimioAnexo: false,
        iva: 0,
        correlativo: {},
        nro_documento: 0,
        nro_interno: "",
      };
    },
    setup() {
      const $q = useQuasar();
      return {
        group: ref('op1'),
        options: [
        {
            label: 'Generar Pago Comisión',
            value: 'op1'
        },
        {
            label: 'Comisiones Pagadas',
            value: 'op2'
        },
        ],
        model: ref("two"),
        loading: ref(false),
        separator: ref("vertical"),
        asignDialog: ref(false),
        reference: ref(false),
        confirmPopUp: ref(false),
        confirmSavePopUp: ref(false),
        confirmPrintPopUp: ref(false),
        clienteBox: ref(false),
        selectedGuias: ref([]),
        deletePopup: ref(false),
        printFactura: ref(false),
        printAnexo: ref(false),
        pagination: {
          page: 1,
          rowsPerPage: 0,
        },
      };
    },
    mounted() {
      this.$emit(
        "changeTitle",
        "SCEN - Ventas - Facturacion Credito, Contado y Otros",
        ""
      );
      this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
      this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
        headers: {
          rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
          menu: "facturacioncredito",
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
  
      // Metodo para Setear Datos Generales
      setData(res, dataRes) {
        eval("this." + dataRes + "Loading = false");
        this[dataRes] = res.data ? res.data : res;
      },
      // Metodos para Setear Datos al Iniciar
      setDataInit(res, dataRes) {
        this[dataRes] = res.data;
        this.selectedAgencia = this.agencias[0];
        this.selectedTipo = this.tipoFacturacion[2];
        this.selectedForma = this.formaPago[0];
        this.$refs.methods.getData(`/clientes`, "setData", "clientes", {
          headers: {
            agencia: this.selectedAgencia.id,
            activo: "S",
          },
        });
  
        // Seteamos los tipos de concepto
        api
          .get(`/coperacion`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              tipo: 8,
            },
          })
          .then((res) => {
            this.tiposConcepto = res.data;
            this.setConceptos();
          });
  
        // Buscamos el valor del IVA
        api
          .get(`/vcontrol/1`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.iva = res.data.valor;
          });
  
        // Seteamos los datos de la ultima Factura
        this.$refs.methods.getData(
          "/mmovimientos",
          "setUltimaFact",
          "ultimaFact",
          {
            headers: {
              tipo: "FA",
              page: 0,
              limit: 1,
              order_by: "nro_control",
              order_direction: "DESC",
            },
          }
        );
      },
      // Metodos para mostrar el preimpreso de la Factura
      async printDialog() {
        // Verifico que tenga detalle
        if (this.detalles.length == 0) {
          this.errorMessage(
            "No es posible generar la Factura si esta no posee Detalle"
          );
          return;
        }
  
        // Verifico que el detalle no este vacio
        for (var i = 0; i < this.detalles.length; i++) {
          if (this.detalles[i].subtotal == "0,00") {
            eval("this.$refs.cantidad" + i + ".$el.focus()");
            this.errorMessage(
              "Debe ingresar los datos completos en el detalle, antes de generar la Factura"
            );
            return;
          }
        }
  
        this.confirmSavePopUp = true;
        await this.until((_) => this.confirmSave == true);
        if (!this.confirmSave) {
          return;
        }
  
        this.loading = true;
  
        //se define que agencia maneja el correlativo
        let agencia_ctrl;
        await api
          .get(`/vcontrol/20`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            agencia_ctrl = res.data.valor;
          });
  
        //se define el tipo de formato que usa la factura
        let formato_fa;
        let tipo_formato;
        await api
          .get(`/vcontrol/22`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            formato_fa = res.data.valor;
          });
  
        await api
          .get(`/tipos/`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              fuente: "CR",
              codigo: formato_fa,
            },
          })
          .then((res) => {
            tipo_formato = res.data[0].id;
          });
  
        //buscar el control correlativo de la factura
        await api
          .get(`/correlativo/`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: agencia_ctrl,
              tipo: tipo_formato,
              estatus: "A",
            },
          })
          .then((res) => {
            this.correlativo = res.data.data[0];
          });
  
        if (this.correlativo) {
          //Pregunto si el valor que hay en el campo "control_inicio" de la tabla CONTROL_CORRELATIVO es Null
          delete this.correlativo.estatus_desc;
          if (this.correlativo.ult_doc_referencia == 0) {
            //Igualo el valor que tiene el campo "control_inicio" en la tabla CONTROL_CORRELATIVO a la variable li_inicio
            this.correlativo.ult_doc_referencia = this.correlativo.control_inicio;
          } else {
            //Verificar el ultimo numero del Control Preimpreso
            this.correlativo.ult_doc_referencia =
              this.parseFloatN(this.correlativo.ult_doc_referencia) + 1;
            if (
              this.correlativo.ult_doc_referencia ==
              this.correlativo.control_final
            ) {
              this.errorMessage(
                "Atención: el Número Correlativo del Control Preimpreso Activo ha llegado al último Número asignado al mismo"
              );
              this.errorMessage(
                "Para Registrar otra factura Ingrese un nuevo Control Correlativo y asignele estatus [Activo]"
              );
  
              //Actualiza la tabla CONTROL_CORRELATIVO y asigna estatus 'C'=Culminado
              this.correlativo.estatus_lote = "C";
            } else if (
              this.correlativo.ult_doc_referencia > this.correlativo.control_final
            ) {
              this.errorMessage(
                "Atención: no existe un Número Correlativo Activo del Control Preimpreso de Facturas"
              );
              this.errorMessage(
                "Para Registrar otra factura Ingrese un nuevo Control Correlativo y asignele estatus [Activo]"
              );
              this.loading = false;
              return;
            }
          }
        } else {
          this.errorMessage(
            "La Factura no se puede generar porque no hay un N° de Control Inicio Preimpreso"
          );
          this.errorMessage(
            "SOLUCION: Registre un Control Correlativo en el Módulo de Mantenimiento Sub Módulo Datos Generales y vuelva a generar la Factura."
          );
          this.loading = false;
          return;
        }
  
        //Busca y Genera el código del documento
        this.nro_documento = 0;
        await api
          .get(`/mmovimientos/`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: this.selectedAgencia.id,
              tipo: "FA",
              page: 0,
              limit: 1,
              estatus: "A",
              order_by: "nro_documento",
              order_direction: "DESC",
            },
          })
          .then((res) => {
            this.nro_documento = res.data.data[0].nro_documento;
            this.nro_documento = this.parseFloatN(this.nro_documento) + 1;
          });
  
        //Busca y Genera ultimo numero interno de las facturas
        this.nro_interno = this.parseFloatN(this.ultimaFact[0].nro_control) + 1;
  
        // Hacer el Preview de la factura
        this.confirmSave = false;
        this.printFactura = true;
        this.loading = false;
      },
      // Metodo para imprimir la Factura
      async printData() {
        this.confirmPrintPopUp = true;
        await this.until((_) => this.confirmPrint == true);
        if (!this.confirmPrint) {
          return;
        }
  
        this.confirmPrint = false;
        this.errorMessage("Aqui imprimo la factura");
  
        if (this.selectedTipo.formaPago == "CR") {
          this.imprimio = true;
        } else {
          this.sendData();
          this.printFactura = false;
        }
      },
      // Metodo para imprimir el Anexo
      async printDataAnexo() {
        if (!this.imprimio) {
          this.errorMessage(
            "Debe Imprimir la Factura antes de imprimir el reporte Anexo..."
          );
          return;
        }
  
        this.$q.notify({
          message: "Recuerde Imprimir el reporte Anexo a la Factura",
          color: "green",
        });
  
        this.printAnexo = true;
        this.printFactura = false;
        this.sendData();
      },
      // Metodo para cerrar el print de la Factura
      closePrint() {
        if (
          this.selectedTipo.formaPago == "CR" &&
          this.imprimio &&
          !this.imprimioAnexo
        ) {
          this.errorMessage("Debe Imprimir el Reporte Anexo antes de Salir...");
          return;
        } else {
          this.printFactura = false;
          this.imprimio = false;
        }
      },
      // Metodos para guardar la Factura
      async sendData() {
        this.imprimio = false;
        this.loading = true;
  
        // Actualizo el correlativo
        await api.put(`/correlativo/${this.correlativo.id}`, this.correlativo, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        });
  
        let descuento = this.curReplace(this.descuentoSelected);
  
        // Si es contado o credito, setea las facturas asociadas
        if (
          this.selectedTipo.formaPago == "CR" ||
          this.selectedTipo.formaPago == "CO"
        ) {
          for (var i = 0; i < this.selectedGuias.length; i++) {
            let formGuiasCarga = {};
  
            if (descuento > 0) {
              let comisionVenta = {};
              let cod_comision;
              let cod_agente;
  
              let monto_base = (
                this.selectedGuias[i].monto_base *
                (1 - descuento / 100)
              ).toFixed(2);
              let monto_impuesto = (
                this.selectedGuias[i].monto_impuesto *
                (1 - descuento / 100)
              ).toFixed(2);
              let monto_descuento = (monto_base * (descuento / 100)).toFixed(2);
              let monto_total = (
                this.parseFloatN(monto_base) +
                this.parseFloatN(monto_impuesto) -
                this.parseFloatN(monto_descuento)
              ).toFixed(2);
              let monto_comision = 0;
  
              // Busco la comision de Venta para extraer el ID y el agente
              await api
                .get(`/ccomisiones`, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    cod_movimiento: this.selectedGuias[i].id,
                    tipo: "V",
                  },
                })
                .then((res) => {
                  if (res.data.data[0]) {
                    cod_comision = res.data.data[0].id;
                    cod_agente = res.data.data[0].cod_agente;
                  }
                });
  
              // Busco la comision del Agente de ventas
              if (cod_agente) {
                await api
                  .get(`/agentes/${cod_agente}`, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    },
                  })
                  .then((res) => {
                    monto_comision = (
                      (res.data.porc_comision_venta * monto_base) /
                      100
                    ).toFixed(2);
                    comisionVenta = {
                      monto_comision: monto_comision,
                    };
                  });
              }
  
              // Actualizo la comision de Ventas
              if (monto_comision > 0) {
                await api
                  .put(`/ccomisiones/${cod_comision}`, comisionVenta, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    },
                  })
                  .catch(() => {
                    this.errorMessage(
                      "Error al Actualizar las Comisiones de las Cargas asociadas a la Factura!..."
                    );
                    return;
                  });
              }
  
              formGuiasCarga.porc_descuento = descuento;
              formGuiasCarga.monto_base = monto_base;
              formGuiasCarga.monto_subtotal = monto_base;
              formGuiasCarga.monto_impuesto = monto_impuesto;
              formGuiasCarga.monto_descuento = monto_descuento;
              formGuiasCarga.base_comision_vta_rcl = monto_base;
              formGuiasCarga.comision_venta = monto_comision;
              formGuiasCarga.monto_total = monto_total;
            }
  
            formGuiasCarga.estatus_administra = "G";
            formGuiasCarga.tipo_doc_principal = "FA";
            formGuiasCarga.nro_doc_principal = this.nro_documento;
            formGuiasCarga.serie_doc_principal = this.correlativo.serie_doc;
            formGuiasCarga.nro_ctrl_doc_ppal = this.nro_interno;
            formGuiasCarga.cod_ag_doc_ppal = this.selectedAgencia.id;
            formGuiasCarga.nro_ctrl_doc_ppal_new =
              this.correlativo.ult_doc_referencia;
            formGuiasCarga.check_cfacgen = 1;
            formGuiasCarga.fecha_cfacgen = moment().format("YYYY-MM-DD");
  
            await api
              .put(`/mmovimientos/${this.selectedGuias[i].id}`, formGuiasCarga, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .catch(() => {
                this.errorMessage(
                  "Error al Actualizar las Guias Carga asociadas a la Factura!..."
                );
                return;
              });
          }
        }
  
        // Setear los datos en el maestro
        let formFactura = {};
  
        formFactura.cod_agencia = this.selectedAgencia.id;
        formFactura.nro_documento = this.nro_documento;
        formFactura.t_de_documento = "FA";
        formFactura.fecha_emision = moment(
          this.fechaSelected,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
        formFactura.cod_cliente_org = this.selectedCliente.id;
        formFactura.modalidad_pago = this.selectedForma.value;
        formFactura.porc_impuesto = this.iva;
        formFactura.monto_subtotal = this.curReplace(this.form.monto_subtotal);
        formFactura.monto_base = this.curReplace(this.form.monto_base);
        formFactura.monto_impuesto = this.curReplace(this.form.monto_impuesto);
        formFactura.monto_total = this.curReplace(this.form.monto_total);
        formFactura.saldo = this.curReplace(this.form.monto_total);
        formFactura.estatus_administra = "P";
        formFactura.observacion = this.form.observacion;
        formFactura.tipo_factura = this.selectedTipo.tipoFact;
        formFactura.nro_control = this.nro_interno;
        formFactura.nro_control_new = this.correlativo.ult_doc_referencia;
        formFactura.porc_descuento = descuento;
        formFactura.monto_descuento = this.curReplace(this.form.monto_descuento);
        formFactura.monto_divisas_igtf = this.curReplace(this.cobradoSelected);
  
        let idFact;
        await api
          .post(`/mmovimientos`, formFactura, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            idFact = res.data.id;
          })
          .catch(() => {
            this.errorMessage(
              "Error del Sistema. Problemas al actualizar el maestro de la factura. Comuníquese con el proveedor del Sistemas..."
            );
            return;
          });
  
        // Setear los datos en el detalle
        for (var i = 0; i < this.detalles.length; i++) {
          let formDetalle = {};
          formDetalle.cod_movimiento = idFact;
          formDetalle.nro_item = this.detalles[i].nro_item;
          formDetalle.cod_concepto = this.detalles[i].cod_concepto;
          formDetalle.precio_unitario = this.curReplace(
            this.detalles[i].costo_unitario
          );
          formDetalle.cantidad = this.parseFloatN(this.detalles[i].cantidad);
          formDetalle.importe_renglon = this.curReplace(
            this.detalles[i].subtotal
          );
          formDetalle.descripcion = this.detalles[i].reference
            ? this.detalles[i].reference
            : null;
          formDetalle.porc_descuento = descuento;
  
          await api
            .post(`/dmovimientos`, formDetalle, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .catch(() => {
              this.errorMessage(
                "Error del Sistema. Problemas al actualizar el detalle de la factura. Comuníquese con el proveedor del Sistemas..."
              );
              return;
            });
        }
  
        this.$q.notify({
          message: "La Factura ha sido generada Exitosamente",
          color: "green",
        });
  
        await this.resetFilters();
        this.loading = false;
  
        // Seteamos los datos de la ultima Factura
        this.$refs.methods.getData(
          "/mmovimientos",
          "setUltimaFact",
          "ultimaFact",
          {
            headers: {
              tipo: "FA",
              page: 0,
              limit: 1,
              order_by: "nro_control",
              order_direction: "DESC",
            },
          }
        );
      },
      // Seteamos guias carga del cliente
      async setGuiasCarga() {
        if (this.selectedTipo.formaPago == "" || !this.selectedCliente.id) return;
  
        this.resetForm();
        this.loading = true;
  
        // Extraigo las pagadas en Origen con Cliente Origen
        await api
          .get(`/mmovimientos`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              cliente_orig: this.selectedCliente.id,
              tipo: "GC",
              pagado_en: "O",
              modalidad: this.selectedTipo.formaPago,
              estatus_admin_in: "F",
            },
          })
          .then((res) => {
            if (res.data.data.length > 0) {
              this.guiasCarga = res.data.data;
            }
          });
  
        // Extraigo las pagadas en Destino con Cliente Destino
        await api
          .get(`/mmovimientos`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              cliente_dest: this.selectedCliente.id,
              tipo: "GC",
              pagado_en: "D",
              modalidad: this.selectedTipo.formaPago,
              estatus_admin_in: "F",
            },
          })
          .then((res) => {
            if (res.data.data.length > 0) {
              for (var i = 0; i <= res.data.data.length - 1; i++) {
                this.guiasCarga.push(res.data.data[i]);
              }
            }
          });
  
        if (this.guiasCarga.length > 0) {
          this.asignDialog = true;
        } else {
          this.errorMessage(
            "No existen Guías pendientes de Facturar para el Cliente seleccionado"
          );
          this.selectedTipo = this.tipoFacturacion[2];
          this.setConceptos();
          this.loading = false;
          return;
        }
  
        this.guiasCarga.sort((a, b) => a.nro_documento - b.nro_documento);
        for (var i = 0; i < this.guiasCarga.length; i++) {
          this.monto_subtotal += this.parseFloatN(
            this.guiasCarga[i].monto_subtotal
          );
          this.monto_base += this.parseFloatN(this.guiasCarga[i].monto_base);
          this.monto_impuesto += this.parseFloatN(
            this.guiasCarga[i].monto_impuesto
          );
          this.monto_total += this.parseFloatN(this.guiasCarga[i].monto_total);
        }
  
        this.monto_subtotal = this.monto_subtotal.toFixed(2);
        this.monto_base = this.monto_base.toFixed(2);
        this.monto_impuesto = this.monto_impuesto.toFixed(2);
        this.monto_total = this.monto_total.toFixed(2);
  
        this.loading = false;
      },
      // Setear cliente Particular
      popupCliente() {
        this.$q.notify({
          message: "El cliente es Particular, debe ingresar los datos del mismo",
          color: "green",
        });
  
        this.cliente_id_temp = this.selectedCliente.id
          ? this.selectedCliente.id
          : this.cliente_id_temp;
        this.selectedCliente.id = "";
  
        this.formClientesParticulares.cod_agencia =
          this.selectedAgencia.nb_agencia;
        this.formClientesParticulares.pais =
          this.selectedAgencia.ciudades.estados.paises.desc_pais;
        this.formClientesParticulares.estado =
          this.selectedAgencia.ciudades.estados.desc_estado;
        this.formClientesParticulares.ciudad =
          this.selectedAgencia.ciudades.desc_ciudad;
  
        api
          .get(`/municipios/`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              estado: this.selectedAgencia.ciudades.estados.id,
            },
          })
          .then((res) => {
            if (res.data.data.length) {
              this.municipios = res.data.data;
            }
          });
  
        api
          .get(`/localidades/`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              estado: this.selectedAgencia.ciudades.estados.id,
            },
          })
          .then((res) => {
            if (res.data.data.length) {
              this.localidades = res.data.data;
            }
          });
  
        this.clienteBox = true;
      },
      // Metodo para validar por RIF si un cliente ya existe
      validateExistingClient() {
        if (this.formClientesParticulares.rif_ci !== "") {
          api
            .get(`/cparticulares`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                agencia: this.selectedAgencia.id,
                rif: this.formClientesParticulares.rif_ci,
                activo: "S",
              },
            })
            .then((res) => {
              if (res.data.data[0]) {
                this.formClientesParticulares.id = res.data.data[0].id;
                this.formClientesParticulares.nb_cliente =
                  res.data.data[0].nb_cliente;
                this.formClientesParticulares.cod_municipio = res.data.data[0]
                  .cod_municipio
                  ? this.municipios[
                      this.municipios.findIndex(
                        (item) => item.id == res.data.data[0].cod_municipio
                      )
                    ]
                  : null;
                if (res.data.data[0].cod_municipio) {
                  api
                    .get(`/parroquias/`, {
                      headers: {
                        Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                        municipio: res.data.data[0].cod_municipio,
                      },
                    })
                    .then((parroquia) => {
                      if (parroquia.data.data.length) {
                        this.parroquias = parroquia.data.data;
                        this.formClientesParticulares.cod_parroquia = res.data
                          .data[0].cod_parroquia
                          ? this.parroquias[
                              this.parroquias.findIndex(
                                (item) =>
                                  item.id == res.data.data[0].cod_parroquia
                              )
                            ]
                          : null;
                      }
                    });
                }
                this.formClientesParticulares.cod_localidad = res.data.data[0]
                  .cod_localidad
                  ? this.localidades[
                      this.localidades.findIndex(
                        (item) => item.id == res.data.data[0].cod_localidad
                      )
                    ]
                  : null;
              } else {
                this.disableCliente = false;
              }
              this.disableRif = true;
            });
        }
      },
      // Setear datos del cliente particular
      async setClienteParticular() {
        this.clienteBox = false;
        this.selectedCliente.id = this.cliente_id_temp;
  
        if (!this.formClientesParticulares.id) {
          let formPart = {};
          formPart.cod_agencia = this.selectedAgencia.id;
          formPart.cod_cliente = this.selectedCliente.id;
          formPart.nb_cliente = this.formClientesParticulares.nb_cliente;
          formPart.rif_ci = this.formClientesParticulares.rif_ci;
          formPart.cod_ciudad = this.selectedAgencia.ciudades.id;
          formPart.direccion = this.formClientesParticulares.direccion;
          formPart.telefonos = this.formClientesParticulares.telefonos;
          formPart.fax = this.formClientesParticulares.fax;
          formPart.estatus = "A";
          formPart.cod_municipio = this.formClientesParticulares.cod_municipio.id;
          formPart.cod_parroquia = this.formClientesParticulares.cod_parroquia.id;
          formPart.cod_localidad = this.formClientesParticulares.cod_localidad.id;
          await api
            .post(`/cparticulares`, formPart, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              this.$q.notify({
                message: "Cliente Particular Creado Exitosamente",
                color: "green",
              });
              this.id_clte_part_orig = res.data.id;
            });
        } else {
          this.id_clte_part_orig = this.formClientesParticulares.id;
        }
        this.ci_rif_cte_conta_org = this.formClientesParticulares.rif_ci;
      },
      // Asignar las guias Carga a la Factura
      async asignarGuias() {
        if (this.selectedGuias.length == 0) {
          this.errorMessage(
            "Debe seleccionar al menos una Guía para poder asignarlas a la Factura a Generar"
          );
          return;
        }
  
        this.confirmPopUp = true;
        await this.until((_) => this.confirmAsign == true);
        if (!this.confirmAsign) {
          return;
        }
  
        this.confirmAsign = false;
        this.asignDialog = false;
        let form = {};
  
        for (var i = 0; i < this.selectedGuias.length; i++) {
          if (this.selectedTipo.formaPago == "CO") {
            if (this.form.observacion == "") {
              if (this.selected.length > 1) {
                this.form.observacion =
                  "MERCANCIA CORRESPONDIENTE A LA(S) GUIA(S) CARGA: " +
                  this.selectedGuias[i].nro_documento;
              } else {
                this.form.observacion =
                  "MERCANCIA CORRESPONDIENTE A LA GUIA CARGA: " +
                  this.selectedGuias[i].nro_documento;
              }
            } else {
              this.form.observacion += ", " + this.selectedGuias[i].nro_documento;
            }
          }
        }
  
        await api
          .get(`/cfacturacion/${this.conceptoTransporte}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            form.concepto = res.data.desc_concepto;
            form.cod_concepto = res.data.id;
            form.check_impuesto = res.data.check_impuesto;
          });
  
        form.nro_item = 1;
        form.cantidad = this.selectedGuias.length;
        form.costo_unitario = 0;
        form.subtotal = this.curReplace(this.monto_total_select);
        this.detalles.push(form);
        this.selectedForma = this.formaPago[this.selectedTipo.formaindex];
        this.calculaTotales();
      },
      // Metodo para Setear Datos de la ultima Factura
      setUltimaFact(res, dataRes) {
        this[dataRes] = res.data;
        this.ultNroInterno = this.ultimaFact[0].nro_control.padStart(4, "0000");
        this.ultNroRef =
          this.ultimaFact[0].cod_agencia + "-" + this.ultimaFact[0].nro_documento;
        this.ultNroControl = this.ultimaFact[0].serie_documento
          ? this.ultimaFact[0].serie_documento + " "
          : "" + this.ultimaFact[0].nro_control_new.padStart(9, "00-000000");
      },
      // Metodo para Setear los conceptos por Tipo
      setConceptos() {
        this.conceptos = [];
        var find = this.tiposConcepto.findIndex(
          (item) => item.id == this.selectedTipo.tipo
        );
        this.selectedTiposConcepto = this.tiposConcepto[find];
  
        // Seteamos el concepto de Transporte de Mercancia
        api
          .get(`/vcontrol/${this.selectedTipo.vcontrol}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.conceptoTransporte = res.data.valor;
          });
  
        api
          .get(`/cfacturacion`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              cod_concepto: this.selectedTiposConcepto.id,
            },
          })
          .then((res) => {
            this.conceptos = res.data;
          });
  
        this.setGuiasCarga();
      },
      // Metodos para Agregar conceptos
      addConcepto() {
        for (var i = 0; i < this.detalles.length; i++) {
          if (this.selectedConcepto.id == this.detalles[i].cod_concepto) {
            this.errorMessage("El concepto de Facturación ya fue Insertado");
            return;
          }
        }
  
        let form = {};
        form.concepto = this.selectedConcepto.desc_concepto;
        form.cod_concepto = this.selectedConcepto.id;
        form.check_impuesto = this.selectedConcepto.check_impuesto;
        form.nro_item = this.detalles.length + 1;
        form.cantidad = 0;
        form.costo_unitario = 0;
        form.subtotal = 0;
        this.detalles.push(form);
        this.calculaTotales();
      },
      // Metodos para Eliminar conceptos
      async deleteConcepto(selected) {
        this.detalles.splice(selected, 1);
        this.calculaTotales();
      },
      // Metodo para setar los valores totales y seleccionados
      onSelection({ rows, added }) {
        let monto_subtotal = 0;
        let monto_base = 0;
        let monto_impuesto = 0;
        let monto_total = 0;
  
        for (var i = 0; i < rows.length; i++) {
          monto_subtotal += this.parseFloatN(rows[i].monto_subtotal);
          monto_base += this.parseFloatN(rows[i].monto_base);
          monto_impuesto += this.parseFloatN(rows[i].monto_impuesto);
          monto_total += this.parseFloatN(rows[i].monto_total);
        }
  
        if (added) {
          this.monto_subtotal_select = (
            this.parseFloatN(this.curReplace(this.monto_subtotal_select)) +
            monto_subtotal
          ).toFixed(2);
          this.monto_base_select = (
            this.parseFloatN(this.curReplace(this.monto_base_select)) + monto_base
          ).toFixed(2);
          this.monto_impuesto_select = (
            this.parseFloatN(this.curReplace(this.monto_impuesto_select)) +
            monto_impuesto
          ).toFixed(2);
          this.monto_total_select = (
            this.parseFloatN(this.curReplace(this.monto_total_select)) +
            monto_total
          ).toFixed(2);
        } else {
          this.monto_subtotal_select = (
            this.parseFloatN(this.curReplace(this.monto_subtotal_select)) -
            monto_subtotal
          ).toFixed(2);
          this.monto_base_select = (
            this.parseFloatN(this.curReplace(this.monto_base_select)) - monto_base
          ).toFixed(2);
          this.monto_impuesto_select = (
            this.parseFloatN(this.curReplace(this.monto_impuesto_select)) -
            monto_impuesto
          ).toFixed(2);
          this.monto_total_select = (
            this.parseFloatN(this.curReplace(this.monto_total_select)) -
            monto_total
          ).toFixed(2);
        }
      },
      // Metodo para calcular el detalle del documento
      async calculaDetalle(field, row) {
        let cantidad;
        let subtotal;
        let costo_unitario;
        switch (field) {
          case "cantidad":
            cantidad = await this.curReplace(row.cantidad);
            costo_unitario = await this.curReplace(row.costo_unitario);
            row.subtotal = (cantidad * costo_unitario).toFixed(2);
            this.calculaTotales();
            break;
          case "costo_unitario":
            cantidad = await this.curReplace(row.cantidad);
            costo_unitario = await this.curReplace(row.costo_unitario);
            row.subtotal = (cantidad * costo_unitario).toFixed(2);
            this.calculaTotales();
            break;
          case "subtotal":
            cantidad = await this.curReplace(row.cantidad);
            subtotal = await this.curReplace(row.subtotal);
            row.costo_unitario = (subtotal / cantidad).toFixed(2);
            this.calculaTotales();
            break;
          default:
            break;
        }
      },
      // Metodo para calcular los totales del detalle del documento
      async calculaTotales() {
        let subtotal = 0;
        let descuento = 0;
        let subtotal_base = 0;
        let descuento_base = 0;
        let base = 0;
        let fpo = 0;
        let impuesto = 0;
  
        this.form = {
          monto_subtotal: 0,
          monto_descuento: 0,
          monto_base: 0,
          monto_impuesto: 0,
          monto_fpo: 0,
          monto_total: 0,
        };
  
        for (var i = 0; i <= this.detalles.length - 1; i++) {
          subtotal +=
            this.detalles[i].subtotal != "0"
              ? await this.parseFloatN(this.curReplace(this.detalles[i].subtotal))
              : 0;
  
          // Calculamos el FPO
          if (
            this.fpoConceptos.find(
              (item) => item == this.detalles[i].cod_concepto
            )
          ) {
            fpo +=
              this.detalles[i].subtotal != "0"
                ? await this.parseFloatN(
                    this.curReplace(this.detalles[i].subtotal)
                  )
                : 0;
          }
  
          // Calculamos el Monto base
          if (this.detalles[i].check_impuesto == 1) {
            subtotal_base +=
              this.detalles[i].subtotal != "0"
                ? await this.parseFloatN(
                    this.curReplace(this.detalles[i].subtotal)
                  )
                : 0;
            descuento_base =
              (subtotal_base *
                this.parseFloatN(this.curReplace(this.descuentoSelected))) /
              100;
            base = subtotal_base - descuento_base;
          }
  
          if (i == this.detalles.length - 1) {
            this.form.monto_subtotal = subtotal.toFixed(2);
            descuento =
              (subtotal *
                this.parseFloatN(this.curReplace(this.descuentoSelected))) /
              100;
            this.form.monto_descuento = descuento.toFixed(2);
            this.form.monto_base = base.toFixed(2);
            impuesto = (base * this.iva) / 100;
            this.form.monto_impuesto = impuesto.toFixed(2);
            this.form.monto_fpo = fpo.toFixed(2);
            this.form.monto_total = (subtotal - descuento + impuesto).toFixed(2);
          }
        }
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
      // Metodo para limpiar el formulario
      resetForm() {
        this.guiasCarga = [];
        this.selectedGuias = [];
        this.monto_subtotal = 0;
        this.monto_base = 0;
        this.monto_impuesto = 0;
        this.monto_total = 0;
        this.monto_subtotal_select = 0;
        this.monto_base_select = 0;
        this.monto_impuesto_select = 0;
        this.monto_total_select = 0;
      },
      // Metodo para limpiar los filtros
      resetFilters() {
        this.resetForm();
        this.selectedAgencia = this.agencias[0];
        this.selectedTipo = this.tipoFacturacion[2];
        this.selectedForma = this.formaPago[0];
        this.fechaSelected = moment().format("DD/MM/YYYY");
        this.detalles = [];
        this.descuentoSelected = 0;
        this.cobradoSelected = 0;
        this.form = {
          monto_subtotal: 0,
          monto_descuento: 0,
          monto_base: 0,
          monto_impuesto: 0,
          monto_fpo: 0,
          monto_total: 0,
          observacion: "",
        };
        this.selectedCliente = [];
        this.clientesLoading = true;
        this.$refs.methods.getData(`/clientes`, "setData", "clientes", {
          headers: {
            agencia: this.selectedAgencia.id,
            activo: "S",
          },
        });
      },
      // Metodo para que una funcion no avance hasta que se cumpla una condicion
      async until(conditionFunction) {
        const poll = (resolve) => {
          if (conditionFunction()) resolve();
          else setTimeout((_) => poll(resolve), 400);
        };
        return new Promise(poll);
      },
      // Metodo para mostrar PDF en funcion de BASE 64
      pdfview() {
        this.$refs.webViewer.showpdf(this.base64, true);
      },
    },
  };
  </script>
  
  <style>
  .q-textarea.q-field--labeled .q-field__control-container {
    height: 120px !important;
  }
  @media screen and (min-width: 1080px) {
    .table {
      width: 100%;
      height: 100%;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1080px) {
    .table {
      height: 100%;
      width: 100%;
      margin-bottom: 20px;
    }
  }
  @media screen and (min-width: 1080px) {
    .pc {
      display: none;
    }
  }
  @media screen and (max-width: 1080px) {
    .movil {
      display: none;
    }
  }
  </style>
  