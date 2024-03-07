<template>
  <q-page class="pagina q-pa-md">
    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>ADMINISTRACIÓN - NOTAS DE DÉBITO</strong>
          </p>
        </div>
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            :disable="this.detalles.length > 0 ? true : false"
            @update:model-value="
              this.selectedFactura = [];
              this.facturas = [];
              this.getFacturas(this.selectedAgencia.id);
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
            :options="facturasSelected"
            :loading="facturasLoading"
            :disable="
              facturasLoading || this.detalles.length > 0 ? true : false
            "
            option-label="nro_doc"
            use-input
            hide-selected
            fill-input
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'facturasSelected',
                  'facturas',
                  'nro_doc'
                )
            "
            v-model="selectedFactura"
            outlined
            standout
            label="Documento Principal"
          >
            <template v-slot:facturasLoading>
              <q-inner-loading showing color="primary" class="loading" />
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:before-options>
              <q-card>
                <q-card-section horizontal>
                  <q-card-section class="col-2">
                    <div class="opt-text">N° DOC.</div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-1">
                    <div class="opt-text">REF.</div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-2">
                    <div class="opt-text">F. EMISIÓN</div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-3">
                    <div class="opt-text">CLIENTE</div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-2">
                    <div class="opt-text">TOTAL</div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-2">
                    <div class="opt-text">SALDO</div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </template>
            <template v-slot:option="scope">
              <q-card>
                <q-card-section horizontal v-bind="scope.itemProps">
                  <q-card-section class="col-2">
                    <div class="hr-option-text">{{ scope.opt.nro_doc }}</div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-1">
                    <div class="hr-option-text">
                      {{ scope.opt.nro_documento }}
                    </div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-2">
                    <div class="hr-option-text">
                      {{ scope.opt.fecha_emision }}
                    </div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-3">
                    <div class="hr-option-text">
                      {{ scope.opt.cliente_orig_desc }}
                    </div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-2">
                    <div class="hr-option-text">
                      {{ scope.opt.monto_total }}
                    </div>
                  </q-card-section>
                  <q-separator vertical />
                  <q-card-section class="col-2">
                    <div class="hr-option-text">{{ scope.opt.saldo }}</div>
                  </q-card-section>
                </q-card-section>
              </q-card>
            </template>
          </q-select>
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
          class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12"
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
              >Generar Nota de Débito</q-tooltip
            >
          </q-btn>
        </div>
        <div
          class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
          style="margin-top: 15px"
        >
          <div class="col-md-3 col-xs-12">
            <q-input
              outlined
              v-model="this.selectedFactura.cliente_orig_desc"
              label="Cliente"
              hint=""
              dense
              class="pcform"
              :readonly="true"
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              v-model="this.selectedFactura.fecha_emision"
              label="Fecha_emision"
              hint=""
              dense
              class="pcform"
              :readonly="true"
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              v-model="this.selectedFactura.estatus"
              label="Estatus"
              hint=""
              dense
              class="pcform"
              :readonly="true"
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-1 col-xs-12">
            <q-input
              outlined
              v-model="this.selectedFactura.modalidad_desc"
              label="Modalidad Pago"
              hint=""
              dense
              class="pcform"
              :readonly="true"
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-1 col-xs-12">
            <q-input
              outlined
              v-model="this.selectedFactura.monto_subtotal"
              label="SubTotal"
              hint=""
              dense
              class="pcform"
              v-money="money"
              input-class="text-right"
              :readonly="true"
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-1 col-xs-12">
            <q-input
              outlined
              v-model="this.selectedFactura.monto_total"
              label="Total"
              hint=""
              dense
              class="pcform"
              v-money="money"
              input-class="text-right"
              :readonly="true"
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-1 col-xs-12">
            <q-input
              outlined
              v-model="this.selectedFactura.monto_impuesto"
              label="Impuesto"
              hint=""
              dense
              class="pcform"
              v-money="money"
              input-class="text-right"
              :readonly="true"
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-1 col-xs-12">
            <q-input
              outlined
              v-model="this.selectedFactura.saldo"
              label="Saldo"
              hint=""
              dense
              class="pcform"
              v-money="money"
              input-class="text-right"
              :readonly="true"
              lazy-rules
            >
            </q-input>
          </div>
        </div>
      </div>
      <div class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div
          class="col-md-12 col-xs-12"
          style="margin-bottom: 20px; margin-top: -20px"
        >
          <q-card
            class="q-pa-md col-md-12 col-xs-12"
            bordered
            style="padding: 5px"
          >
            <q-card-section>
              <div class="row">
                <div class="col-md-4 col-xs-12 selectMobile2"></div>
                <div class="col-md-4 col-xs-12 selectMobile2">
                  <q-select
                    dense
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="tiposConcepto"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    option-label="desc_concepto"
                    option-value="id"
                    v-model="selectedTiposConcepto"
                    outlined
                    standout
                    :disable="!selectedFactura.nro_doc ? true : false"
                    label="Tipo Concepto"
                    style="margin-top: -10px"
                    @update:model-value="addConcepto()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="apartment" />
                    </template>
                  </q-select>
                </div>
                <div class="col-md-4 col-xs-12 selectMobile2"></div>
                <div class="table">
                  <q-table
                    :rows="detalles"
                    :loading="loading"
                    binary-state-sort
                    row-key="id"
                    :pagination="pagination"
                    virtual-scroll
                    :columns="columnsDetalle"
                    :grid="$q.screen.xs"
                    :separator="separator"
                    style="width: 100%; height: 230px; margin-top: 10px"
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
                              <q-item-section
                                v-if="
                                  col.name !== 'check_impuesto' &&
                                  col.name !== 'cod_concepto'
                                "
                              >
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
                                  :disabled="this.allowOption(4)"
                                  @click="selected = props.row.nro_item - 1"
                                  @click.capture="deletePopup = true"
                                ></q-btn>
                                <q-item-label
                                  v-if="
                                    col.name === 'nro_item' ||
                                    col.name === 'concepto'
                                  "
                                  >{{ col.value }}</q-item-label
                                >
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
                          :disabled="this.allowOption(4)"
                          @click="selected = props.row.nro_item - 1"
                          @click.capture="deletePopup = true"
                        ></q-btn>
                      </q-td>
                    </template>
                  </q-table>
                </div>
                <div class="col-md-3 col-xs-12"></div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_subtotal"
                    label="Monto Subtotal:"
                    hint=""
                    dense
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    class="pcform"
                    v-money="money"
                    :readonly="true"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_impuesto"
                    label="Monto Impuesto:"
                    input-class="text-right"
                    class="pcform"
                    hint=""
                    v-money="money"
                    :readonly="true"
                    dense
                    style="padding-bottom: 10px"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_total"
                    label="Monto Total:"
                    input-class="text-right"
                    hint=""
                    v-money="money"
                    :readonly="true"
                    dense
                    style="padding-bottom: 10px"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-md-3 col-xs-12"></div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-9 col-xs-12 cardMargin selectMobile2">
          <q-input
            outlined
            v-model="this.selectedFactura.observacion"
            label="Observacion Nota de Débito"
            type="textarea"
            input-class="textArea"
          >
          </q-input>
        </div>
        <div class="row col-md-3 col-xs-12">
          <div
            class="col-md-12 col-xs-12 align-center"
            style="align-self: center; text-align: center"
          >
            <p
              style="font-size: 15px; margin-bottom: 7px"
              class="text-secondary"
            >
              <strong>Ultima Nota de Débito Registrada</strong>
            </p>
          </div>
          <div
            class="col-md-12 col-xs-12 align-center"
            style="align-self: center; text-align: center"
          >
            <q-input
              outlined
              v-model="ultNroControl"
              label="Nro. Control"
              dense
              :disable="true"
              style="margin-bottom: 10px"
            >
            </q-input>
          </div>
          <div class="col-md-7 col-xs-7">
            <q-input
              outlined
              v-model="ultNroInterno"
              dense
              :disable="true"
              label="Nro. Interno"
              class="pcform pcmovil"
              style="margin-bottom: 10px"
            >
            </q-input>
          </div>
          <div
            class="col-md-5 col-xs-5"
            style="align-self: center !important; margin-bottom: 10px"
          >
            <p
              style="font-size: 15px; margin-bottom: 0px"
              class="text-secondary"
            >
              <strong>Ref. </strong> {{ ultNroRef }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="reference">
      <q-card style="width: 900px">
        <q-card-section>
          <div class="row justify-center items-center">
            <div
              class="col-md-12 col-xs-12"
              style="margin-bottom: 6px; margin-top: 10px"
            >
              <p
                style="font-size: 17px; text-align: center"
                class="text-secondary"
              >
                <strong>ACTUALIZAR LA DESCRIPCION DEL ITEM SELECCIONADO</strong>
              </p>
            </div>
            <div class="col-md-12 col-xs-12">
              <q-input
                outlined
                v-model="referencia"
                label="Referencia Item"
                type="textarea"
                input-class="textArea"
                @update:model-value="referencia = referencia.toUpperCase()"
              >
              </q-input>
            </div>
            <div
              class="col-md-12 col-xs-12"
              style="margin-top: 23px; margin-bottom: 10px; text-align: center"
            >
              <q-btn
                label="Generar"
                color="primary"
                style="width: 300px"
                @click="
                  this.detalles[selected].reference = this.referencia;
                  this.reference = false;
                "
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmSavePopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Desea Generar la Nota de Débito?
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
            label="Generar"
            color="primary"
            v-close-popup
            @click="this.confirmSave = true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmPrintPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            Estas seguro de Imprimir la Nota de Débito con Nro. Control
            {{
              this.correlativo.serie_doc
                ? this.correlativo.serie_doc + " "
                : "" +
                  this.correlativo.ult_doc_referencia
                    .toString()
                    .padStart(9, "00-000000")
            }}?.
          </div>
          <div class="text-h5" style="font-size: 18px">
            Verifique que se encuentre en la Impresora.
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Imprimir"
            color="primary"
            @click="this.confirmPrint = true"
            v-close-popup
          />
          <q-btn
            flat
            label="Cancelar"
            color="primary"
            v-close-popup
            @click="this.confirmPrint = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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

    <q-dialog v-model="dialogNota" @show="this.printNota()">
      <webViewer
        ref="webViewer"
        @print-pdf="this.printData()"
        @close-pdf="dialogNota = false"
        style="width: 900px; height: 750px; max-width: 900px"
      ></webViewer>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Init="setDataInit"
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
          name: "check_impuesto",
          label: "Check Impuesto",
          field: "check_impuesto",
          classes: "hidden",
          headerClasses: "hidden",
        },
        {
          name: "nro_item",
          label: "Nro",
          field: "nro_item",
          align: "center",
        },
        {
          name: "concepto",
          label: "Concepto",
          field: "concepto",
          align: "left",
          style: "width: 700px",
        },
        {
          name: "cantidad",
          label: "Cantidad",
          field: "cantidad",
          align: "right",
        },
        {
          name: "costo_unitario",
          label: "Costo Unitario",
          field: "costo_unitario",
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
          name: "subtotal",
          label: "Sub-Total",
          field: "subtotal",
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
          name: "action",
          label: "Acciones",
          align: "center",
        },
        {
          name: "cod_concepto",
          label: "Codigo",
          field: "cod_concepto",
          classes: "hidden",
          headerClasses: "hidden",
        },
      ],
      form: {
        monto_subtotal: 0,
        monto_impuesto: 0,
        monto_total: 0,
      },
      estatus_administrativo: [
        { label: "EN ELABORACIÓN", value: "E" },
        { label: "PENDIENTE POR FACTURAR", value: "F" },
        { label: "CON FACTURA GENERADA", value: "G" },
        { label: "ANULADA", value: "A" },
        { label: "PENDIENTE DE COBRAR", value: "P" },
        { label: "CANCELADA", value: "C" },
        { label: "PENDIENTE POR IMPRIMIR", value: "I" },
        { label: "MODIFICADA", value: "M" },
      ],
      forma_pago: [
        { label: "CONTADO", value: "CO" },
        { label: "CRÉDITO", value: "CR" },
      ],
      agencias: [],
      selectedAgencia: [],
      selectedFactura: [],
      agenciasSelected: [],
      fechaSelected: moment().format("DD/MM/YYYY"),
      facturasSelected: [],
      facturasLoading: false,
      facturas: [],
      detalles: [],
      tiposConcepto: [],
      selectedTiposConcepto: [],
      ultNroControl: "",
      ultNroInterno: "",
      ultNroRef: "",
      referencia: "",
      rpermisos: [],
      confirmSave: false,
      confirmPrint: false,
      iva: 0,
      correlativo: {},
      ultimaNota: [],
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      confirmSavePopUp: ref(false),
      confirmPrintPopUp: ref(false),
      dialogNota: ref(false),
      reference: ref(false),
      deletePopup: ref(false),
      pagination: {
        page: 1,
        rowsPerPage: 0,
      },
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Administración - Notas de Débito", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "notasdebito",
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
      this.getFacturas(this.selectedAgencia.id);

      this.$refs.methods.getData("/coperacion", "setData", "tiposConcepto", {
        headers: {
          tipo: 11,
        },
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

      // Seteamos los datos de la ultima Nota de Debito
      api
        .get(`/mmovimientos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            filters: JSON.stringify({
              tipo: "ND",
            }),
            page: 0,
            limit: 1,
            order: "nro_control",
            direction: "DESC",
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            this.ultimaNota = res.data.data;
            this.ultNroInterno = this.ultimaNota[0].nro_control.padStart(
              4,
              "0000"
            );
            this.ultNroRef =
              this.ultimaNota[0].cod_agencia +
              "-" +
              this.ultimaNota[0].nro_documento;
            this.ultNroControl = this.ultimaNota[0].serie_documento
              ? this.ultimaNota[0].serie_documento + " "
              : "" +
                this.ultimaNota[0].nro_control_new.padStart(9, "00-000000");
          }
        });
    },
    // Setear Facturas
    async getFacturas(agencia) {
      this.facturasLoading = true;
      await api
        .get(`/mmovimientos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            filters: JSON.stringify({
              agencia: agencia,
              tipo: "FA",
              estatus_admin_ex: "A,E",
              no_pagada: "S",
            }),
            order: "nro_documento",
            direction: "DESC",
          },
        })
        .then((res) => {
          for (let data of res.data.data) {
            let factura = {};
            factura.nro_doc = "";
            let serie = data.serie_documento ? data.serie_documento + "-" : "";
            if (!data.nro_control || data.nro_control == 0) {
              factura.nro_doc =
                data.nro_documento +
                (data.serie_documento ? "-" + data.serie_documento : "");
            } else {
              if (!data.nro_control_new) {
                factura.nro_doc =
                  data.nro_control.padStart(4, "0000") +
                  "  F." +
                  data.cod_agencia +
                  "-" +
                  data.nro_documento;
              } else {
                factura.nro_doc =
                  serie +
                  data.nro_control_new.padStart(9, "00-000000") +
                  "  F. " +
                  data.nro_control.padStart(4, "0000");
              }
            }

            factura.id = data.id;
            factura.cod_agencia = data.cod_agencia;
            factura.nro_documento = data.nro_documento;
            factura.t_de_documento = data.t_de_documento;
            factura.serie_documento = data.serie_documento;
            factura.nro_control = data.nro_control;
            factura.nro_control_new = data.nro_control_new;
            factura.fecha_emision = data.fecha_emision;
            factura.cod_cliente_org = data.cod_cliente_org;
            factura.cliente_orig_desc = data.cliente_orig_desc;
            factura.monto_total = data.monto_total;
            factura.saldo = data.saldo;
            factura.estatus = this.filterDesc(
              "estatus_administrativo",
              data.estatus_administra
            );
            factura.modalidad_desc = this.filterDesc(
              "forma_pago",
              data.modalidad_pago
            );
            factura.monto_subtotal = data.monto_subtotal;
            factura.monto_total = data.monto_total;
            factura.monto_impuesto = data.monto_impuesto;
            factura.saldo = data.saldo;
            factura.modalidad_pago = data.modalidad_pago;
            factura.pagado_en = data.pagado_en;
            factura.cod_agencia_dest = data.cod_agencia_dest;
            factura.cod_cliente_dest = data.cod_cliente_dest;
            factura.ci_rif_cte_conta_org = data.ci_rif_cte_conta_org;
            factura.ci_rif_cte_conta_dest = data.ci_rif_cte_conta_dest;

            let observacion =
              "NOTA DE DÉBITO APLICADA AL DOCUMENTO NRO. " + serie;

            if (!data.nro_control || data.nro_control == 0) {
              observacion += data.t_de_documento + " ";
              observacion +=
                serie + data.nro_documento + "  DE FECHA " + data.fecha_emision;
            } else if (!data.nro_control_new || data.nro_control_new == 0) {
              observacion += data.t_de_documento + " ";
              observacion +=
                serie +
                data.nro_control.padStart(4, "0000") +
                "  DE FECHA " +
                data.fecha_emision;
            } else {
              observacion += "CTRL. ";
              observacion +=
                serie +
                data.nro_control_new.padStart(9, "00-000000") +
                "  NRO. FACTURA " +
                data.nro_control.padStart(4, "0000") +
                "  DE FECHA " +
                data.fecha_emision;
            }
            factura.observacion = observacion;
            this.facturas.push(factura);
          }
        });
      this.facturasLoading = false;
    },
    // Metodos para Agregar conceptos
    addConcepto() {
      for (var i = 0; i < this.detalles.length; i++) {
        if (this.selectedTiposConcepto.id == this.detalles[i].cod_concepto) {
          this.$q.notify({
            message: "El concepto de Nota de Débito ya fue Insertado",
            color: "red",
          });
          this.selectedTiposConcepto = [];
          return;
        }
      }

      let form = {};
      form.concepto = this.selectedTiposConcepto.desc_concepto;
      form.cod_concepto = this.selectedTiposConcepto.id;
      form.check_impuesto = this.selectedTiposConcepto.check_impuesto;
      form.nro_item = this.detalles.length + 1;
      form.cantidad = 0;
      form.costo_unitario = 0;
      form.subtotal = 0;
      this.detalles.push(form);
      this.selectedTiposConcepto = [];
      this.calculaTotales();
    },
    // Metodos para mostrar el preimpreso de la Nota de Debito
    async printDialog() {
      // Verifico que tenga detalle
      if (this.detalles.length == 0) {
        this.errorMessage(
          "No es posible generar la Nota de Débito si esta no posee Detalle"
        );
        return;
      }

      // Verifico que el detalle no este vacio
      for (var i = 0; i < this.detalles.length; i++) {
        if (this.detalles[i].subtotal == "0,00") {
          eval("this.$refs.cantidad" + i + ".$el.focus()");
          this.errorMessage(
            "Debe ingresar los datos completos en el detalle, antes de generar la Nota de Débito"
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

      //se define el tipo de formato que usa la nota de debito
      let formato_nd;
      let tipo_formato;
      await api
        .get(`/vcontrol/24`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          formato_nd = res.data.valor;
        });

      await api
        .get(`/tipos/`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            fuente: "CR",
            codigo: formato_nd,
          },
        })
        .then((res) => {
          tipo_formato = res.data[0].id;
        });

      //buscar el control correlativo de la Nota de Debito
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
              "Para Registrar otra Nota de Débito Ingrese un nuevo Control Correlativo y asignele estatus [Activo]"
            );

            //Actualiza la tabla CONTROL_CORRELATIVO y asigna estatus 'C'=Culminado
            this.correlativo.estatus_lote = "C";
          } else if (
            this.correlativo.ult_doc_referencia > this.correlativo.control_final
          ) {
            this.errorMessage(
              "Atención: no existe un Número Correlativo Activo del Control Preimpreso de Notas de Débito"
            );
            this.errorMessage(
              "Para Registrar otra Nota de Débito Ingrese un nuevo Control Correlativo y asignele estatus [Activo]"
            );
            this.loading = false;
            return;
          }
        }
      } else {
        this.errorMessage(
          "La Nota de Débito no se puede generar porque no hay un N° de Control Inicio Preimpreso"
        );
        this.errorMessage(
          "SOLUCION: Registre un Control Correlativo en el Módulo de Mantenimiento Sub Módulo Datos Generales y vuelva a generar la Nota de Débito."
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
            filters: JSON.stringify({
              agencia: this.selectedAgencia.id,
              tipo: "ND",
            }),
            page: 0,
            limit: 1,
            order: "nro_documento",
            direction: "DESC",
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            this.nro_documento = res.data.data[0].nro_documento;
            this.nro_documento = this.parseFloatN(this.nro_documento) + 1;
          } else {
            this.nro_documento = 1;
          }
        });

      //Busca y Genera ultimo numero interno de las Notas de Débito
      if (this.ultimaNota.length > 0) {
        this.nro_interno = this.parseFloatN(this.ultimaNota[0].nro_control) + 1;
      } else {
        this.nro_interno = 1;
      }

      // Hacer el Preview de la Nota de Debito
      this.confirmSave = false;
      this.dialogNota = true;
      this.loading = false;
    },
    // Metodo para imprimir la Nota de Debito
    async printData() {
      this.confirmPrintPopUp = true;
      await this.until((_) => this.confirmPrint == true);
      if (!this.confirmPrint) {
        return;
      }
      this.confirmPrint = false;
      this.sendData();
      this.$refs.webViewer.confirmPrint = true;
    },
    // Metodos para guardar la Nota de Debito
    async sendData() {
      this.loading = true;

      // Actualizo el correlativo
      await api.put(`/correlativo/${this.correlativo.id}`, this.correlativo, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
        },
      });

      // Actualizo la factura original
      var formFact = {};
      formFact.estatus_administra = "P";
      formFact.saldo =
        this.parseFloatN(this.curReplace(this.selectedFactura.saldo)) +
        this.parseFloatN(this.curReplace(this.form.monto_total));

      api.put(`/mmovimientos/${this.selectedFactura.id}`, formFact, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
        },
      });

      // Setear los datos en el maestro
      let formNota = {};

      formNota.tipo_doc_principal = this.selectedFactura.t_de_documento;
      formNota.nro_doc_principal = this.selectedFactura.nro_documento;
      formNota.serie_doc_principal = this.selectedFactura.serie_documento;
      formNota.nro_ctrl_doc_ppal = this.selectedFactura.nro_control;
      formNota.nro_ctrl_doc_ppal_new = this.selectedFactura.nro_control_new;
      formNota.cod_ag_doc_ppal = this.selectedFactura.cod_agencia;

      formNota.pagado_en = this.selectedFactura.pagado_en;
      formNota.modalidad_pago = this.selectedFactura.modalidad_pago;
      formNota.porc_impuesto = this.iva;
      formNota.cod_agencia = this.selectedAgencia.id;
      formNota.nro_documento = this.nro_documento;
      formNota.nro_control = this.nro_interno;
      formNota.nro_control_new = this.correlativo.ult_doc_referencia;
      formNota.t_de_documento = "ND";
      formNota.cod_agencia_dest = this.selectedFactura.cod_agencia_dest;
      formNota.cod_cliente_org = this.selectedFactura.cod_cliente_org;
      formNota.cod_cliente_dest = this.selectedFactura.cod_cliente_dest;
      formNota.ci_rif_cte_conta_org = this.selectedFactura.ci_rif_cte_conta_org;
      formNota.ci_rif_cte_conta_dest =
        this.selectedFactura.ci_rif_cte_conta_dest;
      formNota.monto_subtotal = this.curReplace(this.form.monto_subtotal);
      formNota.monto_base = this.curReplace(this.form.monto_subtotal);
      formNota.monto_impuesto = this.curReplace(this.form.monto_impuesto);
      formNota.monto_total = this.curReplace(this.form.monto_total);
      formNota.saldo = 0;
      formNota.estatus_administra = "N";
      formNota.observacion = this.selectedFactura.observacion;
      formNota.fecha_emision = moment(this.fechaSelected, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

      let idFact;
      await api
        .post(`/mmovimientos`, formNota, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          idFact = res.data.id;
        })
        .catch(() => {
          this.errorMessage(
            "Error del Sistema. Problemas al actualizar el maestro de la Nota de Débito. Comuníquese con el proveedor del Sistemas..."
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

        await api
          .post(`/dmovimientos`, formDetalle, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.errorMessage(
              "Error del Sistema. Problemas al actualizar el detalle de la Nota de Débito. Comuníquese con el proveedor del Sistemas..."
            );
            return;
          });
      }

      this.$q.notify({
        message: "La Nota de Débito ha sido generada Exitosamente",
        color: "green",
      });

      this.dialogNota = false;
      this.loading = false;
      this.resetFilters();

      // Seteamos los datos de la ultima Nota de Debito
      api
        .get(`/mmovimientos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            filters: JSON.stringify({
              tipo: "ND",
            }),
            page: 0,
            limit: 1,
            order: "nro_control",
            direction: "DESC",
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            this.ultimaNota = res.data.data;
            this.ultNroInterno = this.ultimaNota[0].nro_control.padStart(
              4,
              "0000"
            );
            this.ultNroRef =
              this.ultimaNota[0].cod_agencia +
              "-" +
              this.ultimaNota[0].nro_documento;
            this.ultNroControl = this.ultimaNota[0].serie_documento
              ? this.ultimaNota[0].serie_documento + " "
              : "" +
                this.ultimaNota[0].nro_control_new.padStart(9, "00-000000");
          }
        });
    },
    // Imprimir Nota en PDF
    async printNota() {
      let notaArray = {};
      notaArray.tipo = "NOTA DE DÉBITO";
      let serie_doc = this.correlativo.serie_doc
        ? this.correlativo.serie_doc + "-"
        : "";
      notaArray.nroControl =
        serie_doc +
        (this.nro_interno
          ? this.nro_interno.toString().padStart(4, "0000")
          : this.nro_documento.toString().padStart(4, "0000"));
      notaArray.fecha_emision = this.fechaSelected;

      notaArray.cliente_orig = this.selectedFactura.cod_cliente_org;
      notaArray.detalles = this.detalles;
      notaArray.observacion = this.selectedFactura.observacion;
      notaArray.nota =
        "N " +
        this.selectedAgencia.id +
        "-" +
        serie_doc +
        (this.nro_interno ? this.nro_interno : this.nro_documento);

      api
        .get(`/pdfreports/notaPreimpreso`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            data: JSON.stringify(notaArray),
          },
        })
        .then((res) => {
          if (!res.data.validDoc) {
            this.$q.notify({
              message: "No existen registros para este conjunto de Filtos",
              color: "red",
            });
            this.dialogNota = false;
            return;
          }
          this.$refs.webViewer.showpdf(res.data.pdfPath, 1.5, true);
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message,
            color: "red",
          });
          this.dialogNota = false;
          return;
        });
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
      let impuesto = 0;

      this.form = {
        monto_subtotal: 0,
        monto_impuesto: 0,
        monto_total: 0,
      };

      for (var i = 0; i <= this.detalles.length - 1; i++) {
        subtotal +=
          this.detalles[i].subtotal != "0"
            ? await this.parseFloatN(this.curReplace(this.detalles[i].subtotal))
            : 0;

        if (i == this.detalles.length - 1) {
          this.form.monto_subtotal = subtotal.toFixed(2);
          impuesto = (subtotal * this.iva) / 100;
          this.form.monto_impuesto = impuesto.toFixed(2);
          this.form.monto_total = (subtotal + impuesto).toFixed(2);
        }
      }

      //Valido que el total de la Nota de Débito no sea mayor al Monto Total del Documento
      if (
        this.form.monto_subtotal >
        this.parseFloatN(this.curReplace(this.selectedFactura.monto_subtotal))
      ) {
        this.$q.notify({
          message:
            "Error en la Nota de Débito. Verifique que el Total de la Nota de Débito no sea Mayor al Monto Total del Documento Principal",
          color: "red",
        });
        this.detalles[this.detalles.length - 1].cantidad = 0;
        this.detalles[this.detalles.length - 1].costo_unitario = 0;
        this.detalles[this.detalles.length - 1].subtotal = 0;
        eval(
          "this.$refs.cantidad" + (this.detalles.length - 1) + ".$el.focus()"
        );
        this.form = {
          monto_subtotal: 0,
          monto_impuesto: 0,
          monto_total: 0,
        };
      }
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
    // Metodos para Eliminar conceptos
    async deleteConcepto(selected) {
      this.detalles.splice(selected, 1);
      this.calculaTotales();
    },
    // Metodo para imprimir mensajes de error
    errorMessage(message) {
      this.$q.notify({
        message: message,
        color: "red",
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
    // Metodo para limpiar los filtros
    resetFilters() {
      this.selectedAgencia = this.agencias[0];
      this.selectedTiposConcepto = [];
      this.fechaSelected = moment().format("DD/MM/YYYY");
      this.detalles = [];
      this.form = {
        monto_subtotal: 0,
        monto_impuesto: 0,
        monto_total: 0,
      };

      this.selectedFactura = [];
      this.facturas = [];
      this.getFacturas(this.selectedAgencia.id);
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
