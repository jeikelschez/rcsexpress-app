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
            <strong>ADMINISTRACIÓN - CUENTAS POR PAGAR</strong>
          </p>
        </div>
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            @update:model-value="
              this.selectedProveedor = [];
              this.selectedTipo = this.tipos[0];
              resetFilters();
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
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
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
            ref="proveedores"
            v-model="selectedProveedor"
            :loading="proveedoresLoading"
            :disable="proveedoresLoading"
            outlined
            standout
            label="Proveedor"
            @update:model-value="
              this.$refs.methods.getData(
                'mretenciones',
                'setData',
                'retenciones',
                {
                  headers: {
                    vigente: 's',
                    tipo_persona: this.selectedProveedor.tipo_persona,
                  },
                }
              );
              this.selectedTipo = this.tipos[0];
              resetFilters();
              setCondicion();
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
            <template v-slot:proveedoresLoading>
              <q-inner-loading showing color="primary" class="loading" />
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
            :options="tipos"
            use-input
            hide-selected
            fill-input
            ref="tipos"
            input-debounce="0"
            option-label="label"
            option-value="value"
            v-model="selectedTipo"
            outlined
            standout
            label="Tipo de Documento"
            @update:model-value="
              resetFilters();
              setTipo();
            "
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-2 col-sm-2"
          style="align-self: center; text-align: center"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="
              this.selectedAgencia = this.agencias[0];
              this.selectedProveedor = [];
              this.selectedTipo = this.tipos[0];
              resetFilters();
            "
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
            @click=""
            style="margin-right: 15px"
            :disable="
              this.form.estatus_documento == 'Por Cobrar' ? true : false
            "
          >
            <q-icon size="25px" name="payments" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Consulta de Pago</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="islrDialog = true"
            style="margin-right: 15px"
            :disable="
              !this.form.nro_documento ||
              this.form.monto_base_nacional == '0,00'
                ? true
                : false
            "
          >
            <q-icon size="25px" name="list_alt" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >ISLR</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            :disabled="false"
            @click=""
          >
            <q-icon size="25px" name="save" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Guardar</q-tooltip
            >
          </q-btn>
        </div>
      </div>
      <div class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-12 col-xs-12" style="margin-top: 20px">
          <q-card
            class="q-pa-md col-md-12 col-xs-12"
            bordered
            style="padding: 5px"
          >
            <q-card-section>
              <div class="text-h8" style="margin-top: -15px">
                Datos del Documento
              </div>
              <div class="row pc" style="padding-top: 10px">
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.nro_documento"
                    label="Nro. Documento"
                    dense
                    ref="documento"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    @blur="findDocument()"
                    @keyup.enter="findDocument()"
                    :disable="this.selectedProveedor.length == 0 ? true : false"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.nro_ctrl_doc"
                    label="Nro. Control"
                    hint=""
                    ref="control"
                    dense
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :disable="this.selectedProveedor.length == 0 ? true : false"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    label="Fecha Emisión"
                    hint=""
                    dense
                    style="padding-bottom: 0px"
                    v-model="form.fecha_registro"
                    lazy-rules
                    class="pcform"
                    mask="##/##/####"
                    :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
                    :disable="this.selectedProveedor.length == 0 ? true : false"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="form.fecha_registro"
                            mask="DD/MM/YYYY"
                            style="padding-bottom: 0px"
                            @update:model-value="this.$refs.qDateProxy.hide()"
                            :disable="
                              this.selectedProveedor.length == 0 ? true : false
                            "
                          ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    label="Fecha Recepción"
                    hint=""
                    dense
                    style="padding-bottom: 0px"
                    v-model="form.fecha_documento"
                    lazy-rules
                    class="pcform"
                    mask="##/##/####"
                    :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
                    :disable="this.selectedProveedor.length == 0 ? true : false"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="form.fecha_documento"
                            mask="DD/MM/YYYY"
                            style="padding-bottom: 0px"
                            @update:model-value="this.$refs.qDateProxy.hide()"
                            :disable="
                              this.selectedProveedor.length == 0 ? true : false
                            "
                          ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.nro_doc_afectado"
                    label="Factura Afectada"
                    hint=""
                    dense
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :readonly="true"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-select
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
                    v-model="form.selectedForma"
                    outlined
                    standout
                    label="Forma de Pago"
                    :disable="
                      this.selectedProveedor.length == 0 ||
                      this.selectedTipo.value == 'NC'
                        ? true
                        : false
                    "
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>
              </div>
              <div class="row pc" style="margin-bottom: -15px">
                <div class="col-md-1 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.condicion_pago"
                    label="Días Crédito"
                    hint=""
                    dense
                    mask="###"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :disable="
                      this.selectedProveedor.length == 0 ||
                      this.form.selectedForma.value == 'CO'
                        ? true
                        : false
                    "
                    @update:model-value="setVencimiento()"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    label="Vencimiento"
                    hint=""
                    dense
                    style="padding-bottom: 0px"
                    v-model="form.vencimiento"
                    lazy-rules
                    class="pcform"
                    mask="##/##/####"
                    :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
                    :readonly="true"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-select
                    dense
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="tipoCuenta"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    option-label="label"
                    option-value="value"
                    v-model="form.selectedTipoCuenta"
                    class="pcform"
                    outlined
                    standout
                    label="Tipo de Cuenta"
                    :disable="this.selectedProveedor.length == 0 ? true : false"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.estatus_documento"
                    label="Estatus"
                    hint=""
                    dense
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :readonly="true"
                  >
                  </q-input>
                </div>
                <div class="col-md-5 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.concepto_documento"
                    label="Concepto"
                    hint=""
                    dense
                    style="padding-bottom: 10px"
                    lazy-rules
                    :disable="this.selectedProveedor.length == 0 ? true : false"
                  >
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-12 col-xs-12" style="margin-top: 10px">
          <q-card
            class="q-pa-md col-md-12 col-xs-12"
            bordered
            style="padding: 5px"
          >
            <q-card-section>
              <div class="text-h8" style="margin-top: -15px">
                Datos de la Cuenta por Pagar
              </div>
              <div
                class="row pc"
                style="padding-top: 10px; margin-bottom: -15px"
              >
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_exento"
                    label="Monto Exento"
                    hint=""
                    dense
                    v-money="money"
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :disable="this.selectedProveedor.length == 0 ? true : false"
                    @update:model-value="calculaTotales()"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_base_nacional"
                    label="Monto Base Venta Nacional"
                    hint=""
                    dense
                    v-money="money"
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :disable="
                      this.selectedProveedor.length == 0 ||
                      this.selectedTipo.value == 'RE'
                        ? true
                        : false
                    "
                    @update:model-value="setImpuesto(1)"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_base_intern"
                    label="Monto Base Venta Internacional"
                    hint=""
                    dense
                    v-money="money"
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :disable="
                      this.selectedProveedor.length == 0 ||
                      this.selectedTipo.value == 'RE'
                        ? true
                        : false
                    "
                    @update:model-value="setImpuesto(2)"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_imp_nacional"
                    :label="'Imp. de Venta Nacional (' + this.iva + '%)'"
                    hint=""
                    dense
                    v-money="money"
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :disable="
                      this.selectedProveedor.length == 0 ||
                      this.selectedTipo.value == 'RE'
                        ? true
                        : false
                    "
                    @update:model-value="calculaTotales()"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_imp_intern"
                    :label="
                      'Imp. de Venta Internac. (' + this.imp_intern + '%)'
                    "
                    hint=""
                    dense
                    v-money="money"
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :disable="
                      this.selectedProveedor.length == 0 ||
                      this.selectedTipo.value == 'RE'
                        ? true
                        : false
                    "
                    @update:model-value="calculaTotales()"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.total_documento"
                    label="Total Documento"
                    hint=""
                    dense
                    v-money="money"
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    :readonly="true"
                    lazy-rules
                  >
                  </q-input>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-12 col-xs-12" style="margin-top: 10px">
          <q-card
            class="q-pa-md col-md-12 col-xs-12"
            bordered
            style="padding: 5px"
          >
            <q-card-section>
              <div class="text-h8" style="margin-top: -15px">Totales</div>
              <div
                class="row pc"
                style="padding-top: 10px; margin-bottom: -15px"
              >
                <div class="col-md-2 col-xs-12"></div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.base_imponible_retencion"
                    label="Base Imponible Ret."
                    hint=""
                    dense
                    v-money="money"
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :disable="
                      this.selectedProveedor.length == 0 ||
                      this.selectedTipo.value == 'RE'
                        ? true
                        : false
                    "
                    @update:model-value="setBaseRetencion()"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-select
                    dense
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="porcentajes"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    option-label="label"
                    option-value="value"
                    v-model="form.selectedPorc"
                    outlined
                    standout
                    class="pcform"
                    label="% Retención"
                    input-class="text-right"
                    :disable="
                      this.selectedProveedor.length == 0 ||
                      this.selectedTipo.value == 'RE'
                        ? true
                        : false
                    "
                    @update:model-value="calculaTotales()"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.saldo_retenido"
                    label="Monto a Retener"
                    hint=""
                    dense
                    v-money="money"
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                    :readonly="true"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.saldo_documento"
                    label="Saldo"
                    hint=""
                    dense
                    v-money="money"
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    lazy-rules
                    :readonly="true"
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12"></div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-12 col-xs-12" style="margin-top: 10px">
          <q-card
            class="q-pa-md col-md-12 col-xs-12"
            bordered
            style="padding: 5px"
          >
            <q-card-section>
              <div
                class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
              >
                <div
                  class="text-h8 col-md-11 col-xs-12"
                  style="margin-top: -5px"
                >
                  {{
                    "Distribución de Gastos (" +
                    new Intl.NumberFormat("de-DE", {
                      style: "currency",
                      currency: "EUR",
                      currencyDisplay: "code",
                    })
                      .format(totalGastos)
                      .replace("EUR", "")
                      .trim() +
                    ")"
                  }}
                </div>
                <div
                  class="col-md-1 col-xs-12"
                  style="
                    margin-bottom: 0px;
                    padding-left: 50px;
                    margin-top: -10px;
                    text-align: center;
                  "
                >
                  <q-btn
                    color="primary"
                    rounded
                    dense
                    icon="add"
                    @click="
                      this.fgastos = [];
                      gastosDialog = true;
                    "
                    :disable="this.selectedProveedor.length == 0 ? true : false"
                  />
                </div>
              </div>
              <div style="padding-top: 10px">
                <q-table
                  :rows="gastos"
                  :loading="loading"
                  binary-state-sort
                  row-key="id"
                  :pagination="pagination"
                  virtual-scroll
                  :columns="columnsGastos"
                  :grid="$q.screen.xs"
                  :separator="separator"
                  style="width: 100%; height: 170px"
                  hide-bottom
                >
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                  <template v-slot:body-cell-cod_agencia="props">
                    <q-td :props="props">
                      {{
                        findIndex(
                          "agencias",
                          props.row.cod_agencia,
                          "nb_agencia"
                        )
                      }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-tipo_concepto="props">
                    <q-td :props="props">
                      {{ filterDesc("tipoCuenta", props.row.tipo_concepto) }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-cod_concepto="props">
                    <q-td :props="props">
                      {{
                        findIndex(
                          "conceptos",
                          props.row.cod_concepto,
                          "desc_concepto"
                        )
                      }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-action="props">
                    <q-td :props="props">
                      <q-btn
                        dense
                        round
                        flat
                        color="primary"
                        icon="edit"
                        :disabled="this.allowOption(3)"
                        @click="editGastos(props.rowIndex)"
                      ></q-btn>
                      <q-btn
                        dense
                        round
                        flat
                        color="primary"
                        icon="delete"
                        :disabled="this.allowOption(4)"
                        @click="
                          gastos.splice(props.rowIndex, 1);
                          calculaGastos();
                        "
                      ></q-btn>
                    </q-td>
                  </template>
                </q-table>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <q-dialog v-model="gastosDialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="saveGastos" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-select
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="agencias"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'agencias',
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
                  class="pcform"
                  v-model="fgastos.agencia"
                  outlined
                  standout
                  label="Agencia"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
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
              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="fgastos.tipoCuenta"
                  label="Tipo Concepto"
                  hint=""
                  :options="tipoCuenta"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  @update:model-value="
                    this.fgastos.concepto = '';
                    this.$refs.methods.getData(
                      'coperacion',
                      'setData',
                      'conceptosGastos',
                      {
                        headers: {
                          tipo: this.fgastos.tipoCuenta.id,
                        },
                      }
                    );
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="payments" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="fgastos.concepto"
                  label="Concepto"
                  hint=""
                  option-label="desc_concepto"
                  option-value="id"
                  class="pcform"
                  :options="conceptosGastos"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                >
                  <template v-slot:prepend>
                    <q-icon name="payments" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="fgastos.monto"
                  input-class="text-right"
                  v-money="money"
                  label="Monto Distribuido"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, ''),
                    (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                  ]"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>
            </div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Guardar"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="save"
              />
              <q-btn
                label="Cerrar"
                color="primary"
                flat
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="islrEditDialog">
      <q-card class="q-pa-md" bordered style="width: 400px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="saveIslr" class="q-gutter-md">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="fIslr.monto_base"
                  input-class="text-right"
                  v-money="money"
                  label="Monto Base"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReqCurrency(val, ''),
                    (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                  ]"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-select
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="retenciones"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="nb_tipo_retencion"
                  option-value="id"
                  v-model="fIslr.cod_tipo_retencion"
                  outlined
                  standout
                  label="Retención"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
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
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="fIslr.monto_retener"
                  input-class="text-right"
                  v-money="money"
                  label="Monto Retener"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReqCurrency(val, ''),
                    (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                  ]"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>
            </div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Guardar"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="save"
              />
              <q-btn
                label="Cerrar"
                color="primary"
                flat
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmDocPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            Nº de Documento ya existente para este Proveedor. Desea Modificar
            los Datos?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Si"
            color="primary"
            @click="this.confirmDocument = 'true'"
            v-close-popup
          />
          <q-btn
            flat
            label="No"
            color="primary"
            v-close-popup
            @click="this.confirmDocument = 'false'"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmFormaPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            No es posible cancelar una Nota de Crédito de Contado. ¿Desea
            cambiar la forma de pago?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Si"
            color="primary"
            @click="this.confirmForma = 'true'"
            v-close-popup
          />
          <q-btn
            flat
            label="No"
            color="primary"
            v-close-popup
            @click="this.confirmForma = 'false'"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="islrDialog">
      <q-card style="width: 800px; max-width: 80vw">
        <div
          class="row justify-center items-center content-center"
          style="padding: 20px"
        >
          <div class="col-md-10 col-xs-12">
            <p style="font-size: 20px; text-align: left" class="text-secondary">
              <strong>Retenciones ISLR</strong>
            </p>
          </div>
          <div
            class="col-md-2 col-xs-12"
            style="margin-bottom: 20px; text-align: center"
          >
            <q-btn
              color="primary"
              rounded
              icon="add"
              @click="
                this.fIslr = [];
                islrEditDialog = true;
                this.fIslr.monto_base = this.parseFloatN(
                  this.curReplace(this.form.monto_base_nacional)
                );
              "
            />
          </div>
          <div class="col-md-12 col-xs-12">
            <q-table
              :rows="retencionesIslr"
              row-key="id"
              :columns="columnsIslr"
              binary-state-sort
              :separator="separator"
              v-model:pagination="pagination"
              :grid="$q.screen.xs"
              :rows-per-page-options="[0]"
              style="width: 100%; height: 350px"
              hide-bottom
            >
              <template v-slot:body-cell-cod_tipo_retencion="props">
                <q-td :props="props">
                  {{
                    findIndex(
                      "retenciones",
                      props.row.cod_tipo_retencion,
                      "nb_tipo_retencion"
                    )
                  }}
                </q-td>
              </template>
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn
                    dense
                    round
                    flat
                    color="primary"
                    icon="edit"
                    :disabled="this.allowOption(3)"
                    @click="editIslr(props.rowIndex)"
                  ></q-btn>
                  <q-btn
                    dense
                    round
                    flat
                    color="primary"
                    icon="delete"
                    :disabled="this.allowOption(4)"
                    @click="retencionesIslr.splice(props.rowIndex, 1)"
                  ></q-btn>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
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
      agencias: [],
      selectedAgencia: [],
      agenciasSelected: [],
      proveedoresSelected: [],
      selectedProveedor: [],
      selectedTipo: [],
      proveedores: [],
      rpermisos: [],
      gastos: [],
      fgastos: [],
      fIslr: [],
      conceptos: [],
      conceptosGastos: [],
      retencionesIslr: [],
      retenciones: [],
      confirmDocument: false,
      confirmForma: false,
      proveedoresLoading: true,
      isSave: false,
      iva: 0,
      imp_intern: 0,
      totalGastos: 0,
      form: {
        monto_exento: "0,00",
        monto_base_nacional: "0,00",
        monto_base_intern: "0,00",
        monto_imp_nacional: "0,00",
        monto_imp_intern: "0,00",
        base_imponible_retencion: "0,00",
      },
      columnsGastos: [
        {
          name: "cod_agencia",
          label: "Agencia",
          field: "cod_agencia",
          align: "center",
        },
        {
          name: "tipo_concepto",
          label: "Tipo Concepto",
          field: "tipo_concepto",
          align: "center",
        },
        {
          name: "cod_concepto",
          label: "Concepto",
          field: "cod_concepto",
          align: "center",
        },
        {
          name: "monto_distribuido",
          label: "Monto",
          field: "monto_distribuido",
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
      ],
      columnsIslr: [
        {
          name: "monto_base",
          label: "Monto Base",
          field: "monto_base",
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
          name: "cod_tipo_retencion",
          label: "Rtencion",
          field: "cod_tipo_retencion",
          align: "center",
        },
        {
          name: "monto_retener",
          label: "Monto Retener",
          field: "monto_retener",
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
      ],
      tipos: [
        {
          label: "FACTURA",
          value: "FA",
        },
        {
          label: "NOTA DE CRÉDITO",
          value: "NC",
        },
        {
          label: "NOTA DE DÉBITO",
          value: "ND",
        },
        {
          label: "RECIBO",
          value: "RE",
        },
      ],
      formaPago: [
        { label: "CRÉDITO", value: "CR" },
        { label: "CONTADO", value: "CO" },
      ],
      tipoCuenta: [
        { label: "Gastos de Administración", value: "DGA", id: 6 },
        { label: "Gastos de Ventas", value: "DCO", id: 7 },
      ],
      tipoConcepto: [
        { label: "CxP Temporal", value: "T" },
        { label: "CxP Permanente", value: "P" },
      ],
      porcentajes: [
        { label: "75%", value: 75 },
        { label: "100%", value: 100 },
      ],
      estatus: [
        { label: "Por Cobrar", value: "P" },
        { label: "Cobrado", value: "C" },
      ],
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      confirmDocPopUp: ref(false),
      confirmFormaPopUp: ref(false),
      islrDialog: ref(false),
      islrEditDialog: ref(false),
      gastosDialog: ref(false),
      pagination: {
        page: 1,
        rowsPerPage: 0,
      },
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Administración - Cuentas por Pagar", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/proveedores", "setData", "proveedores", {
      headers: {
        activo: "S",
      },
    });

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "cuentasporpagar",
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
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodos para Setear Datos al Iniciar
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      this.selectedTipo = this.tipos[0];
      this.form.selectedForma = this.formaPago[1];
      this.form.selectedTipoCuenta = this.tipoCuenta[1];
      this.form.selectedPorc = this.porcentajes[0];
      this.form.estatus_documento = this.estatus[0].label;
      this.form.fecha_registro = moment().format("DD/MM/YYYY");
      this.form.fecha_documento = moment().format("DD/MM/YYYY");

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

      // Buscamos el Impuesto Internacional
      api
        .get(`/vcontrol/17`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.imp_intern = res.data.valor;
        });

      // Seteamos los tipos de concepto
      api
        .get(`/coperacion`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            tipo_in: "6,7",
          },
        })
        .then((res) => {
          this.conceptos = res.data;
        });
    },
    // Metodo para buscar documento existente
    async findDocument() {
      if (!this.form.nro_documento) return;
      let ctaPagar = {};
      this.$refs.control.$el.focus();
      await api
        .get(`/mctapagar`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            proveedor: this.selectedProveedor.id,
            documento: this.form.nro_documento,
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            ctaPagar = res.data.data[0];
          }
        });

      if (ctaPagar.id) {
        this.confirmDocPopUp = true;
        await this.until((_) => this.confirmDocument);
        if (this.confirmDocument == "false") {
          this.confirmDocument = false;
          this.form.nro_documento = "";
          this.$refs.documento.$el.focus();
          return;
        }
        this.form = ctaPagar;
        var agenciaIndex = this.agencias.findIndex(
          (item) => item.id == ctaPagar.cod_agencia
        );
        this.selectedAgencia = this.agencias[agenciaIndex].nb_agencia;
        this.form.selectedForma = this.filterDesc(
          "formaPago",
          ctaPagar.pago_decontado
        );
        if (ctaPagar.pago_decontado == "CR" && ctaPagar.condicion_pago) {
          this.form.vencimiento = moment(ctaPagar.fecha_documento, "DD/MM/YYYY")
            .add(ctaPagar.condicion_pago, "d")
            .format("DD/MM/YYYY");
        }
        this.form.selectedTipoCuenta = this.filterDesc(
          "tipoCuenta",
          ctaPagar.pago_permanente
        );
        this.form.estatus_documento = this.filterDesc(
          "estatus",
          ctaPagar.estatus_documento
        );
        this.selectedTipo = this.filterDesc("tipos", ctaPagar.tipo_documento);
        this.form.selectedPorc = this.filterDesc(
          "porcentajes",
          ctaPagar.porcentaje_retencion
        );

        // Distribucion de Gastos
        await api
          .get(`/dgastos`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              cod_cta: ctaPagar.id,
            },
          })
          .then((res) => {
            if (res.data.data.length > 0) {
              this.gastos = res.data.data;
            }
          });

        this.calculaGastos();

        // Retenciones ISLR
        await api
          .get(`/cislrfac`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              cod_compra: ctaPagar.id,
              proveedor: this.selectedProveedor.id,
            },
          })
          .then((res) => {
            if (res.data.data.length > 0) {
              for (var i = 0; i <= res.data.data.length - 1; i++) {
                api
                  .get(`/cislr/${res.data.data[0].cod_islr}`, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    },
                  })
                  .then((res) => {
                    if (res.data) {
                      this.retencionesIslr.push(res.data);
                    }
                  });
              }
            }
          });

        this.confirmDocument = false;
        this.isSave = true;
      }
    },
    // Metodo para actualizar la fecha de vencimiento
    setVencimiento() {
      if (this.form.condicion_pago) {
        let fecha_documento = moment(this.form.fecha_documento);
        this.form.vencimiento = fecha_documento
          .add(this.form.condicion_pago, "d")
          .format("DD/MM/YYYY");
      } else {
        this.form.vencimiento = "";
      }
    },
    // Metodo para setear la condicion de Pago del proveedor
    setCondicion() {
      if (this.selectedProveedor.condicion_pago > 0) {
        this.form.condicion_pago = this.selectedProveedor.condicion_pago;
        this.form.selectedForma = this.formaPago[0];
      }
    },
    // Metodo para validar el tipo de cuenta
    async setTipo() {
      if (
        this.selectedTipo.value == "NC" &&
        this.form.selectedForma.value == "CO"
      ) {
        this.confirmFormaPopUp = true;
        await this.until((_) => this.confirmForma);
        if (this.confirmDocument == "false") {
          this.selectedTipo = this.tipos[0];
          return;
        }
        this.form.selectedForma = this.formaPago[0];
      }
    },
    // Metodo para setear el monto impúesto nacional
    async setImpuesto(tipo) {
      if (tipo == 1) {
        this.form.monto_imp_nacional = await (
          (this.parseFloatN(this.curReplace(this.form.monto_base_nacional)) *
            parseFloat(this.iva)) /
          100
        ).toFixed(2);
        this.form.base_imponible_retencion = await (
          (this.parseFloatN(this.curReplace(this.form.monto_base_nacional)) *
            parseFloat(this.iva)) /
          100
        ).toFixed(2);
      } else {
        this.form.monto_imp_intern = await (
          (this.parseFloatN(this.curReplace(this.form.monto_base_intern)) *
            parseFloat(this.imp_intern)) /
          100
        ).toFixed(2);
      }
      this.calculaTotales();
    },
    // Metodo para validar el monto retencion
    async setBaseRetencion() {
      if (
        this.parseFloatN(this.curReplace(this.form.base_imponible_retencion)) >
        this.parseFloatN(this.curReplace(this.form.total_documento))
      ) {
        this.$q.notify({
          message: "Monto Base a Retener es mayor al Total del Documento",
          color: "red",
        });
        this.form.base_imponible_retencion = "0,00";
      }
      this.calculaTotales();
    },
    // Metodo para calcular los totales
    async calculaTotales() {
      this.form.total_documento = await (
        this.parseFloatN(this.curReplace(this.form.monto_exento)) +
        this.parseFloatN(this.curReplace(this.form.monto_base_nacional)) +
        this.parseFloatN(this.curReplace(this.form.monto_base_intern)) +
        this.parseFloatN(this.curReplace(this.form.monto_imp_nacional)) +
        this.parseFloatN(this.curReplace(this.form.monto_imp_intern))
      ).toFixed(2);
      this.form.saldo_documento = await this.parseFloatN(
        this.curReplace(this.form.total_documento)
      ).toFixed(2);
      this.form.saldo_retenido = await (
        (this.parseFloatN(this.curReplace(this.form.base_imponible_retencion)) *
          this.form.selectedPorc.value) /
        100
      ).toFixed(2);
    },
    // Metodo para calcular los Gastos Totales
    async calculaGastos() {
      let totalGasto = 0;
      for (var i = 0; i <= this.gastos.length - 1; i++) {
        totalGasto += this.parseFloatN(this.gastos[i].monto_distribuido);
      }
      this.totalGastos = totalGasto.toFixed(2);
    },
    // Metodo para Crear y Editar Gastos
    saveGastos() {
      if (this.fgastos.index > -1) {
        let gastosTemp = [].concat(this.gastos);
        gastosTemp.splice(this.fgastos.index, 1);
        if (
          gastosTemp.findIndex(
            (item) => item.cod_agencia == this.fgastos.agencia.id
          ) > -1 &&
          gastosTemp.findIndex(
            (item) => item.cod_concepto == this.fgastos.concepto.id
          ) > -1
        ) {
          this.$q.notify({
            message:
              "Concepto ya existente para esta Agencia. Seleccione uno diferente...",
            color: "red",
          });
          return;
        } else {
          this.gastos[this.fgastos.index].cod_agencia = this.fgastos.agencia.id;
          this.gastos[this.fgastos.index].tipo_concepto =
            this.fgastos.tipoCuenta.value;
          this.gastos[this.fgastos.index].cod_concepto =
            this.fgastos.concepto.id;
          this.gastos[this.fgastos.index].monto_distribuido = this.parseFloatN(
            this.curReplace(this.fgastos.monto)
          );
        }
      } else {
        if (
          this.gastos.findIndex(
            (item) => item.cod_agencia == this.fgastos.agencia.id
          ) > -1 &&
          this.gastos.findIndex(
            (item) => item.cod_concepto == this.fgastos.concepto.id
          ) > -1
        ) {
          this.$q.notify({
            message:
              "Concepto ya existente para esta Agencia. Seleccione uno diferente...",
            color: "red",
          });
          return;
        } else {
          let gasto = {};
          gasto.cod_agencia = this.fgastos.agencia.id;
          gasto.tipo_concepto = this.fgastos.tipoCuenta.value;
          gasto.cod_concepto = this.fgastos.concepto.id;
          gasto.monto_distribuido = this.parseFloatN(
            this.curReplace(this.fgastos.monto)
          );
          this.gastos.push(gasto);
        }
      }

      this.calculaGastos();
      this.gastosDialog = false;
    },
    // Metodo para llenar la modal al editar Gastos
    editGastos(index) {
      this.fgastos = [];
      this.fgastos.index = index;
      this.fgastos.agencia =
        this.agencias[
          this.agencias.findIndex(
            (item) => item.id == this.gastos[index].cod_agencia
          )
        ];
      this.fgastos.tipoCuenta =
        this.tipoCuenta[
          this.tipoCuenta.findIndex(
            (item) => item.value == this.gastos[index].tipo_concepto
          )
        ];

      this.$refs.methods.getData("coperacion", "setData", "conceptosGastos", {
        headers: {
          tipo: this.fgastos.tipoCuenta.id,
        },
      });

      this.fgastos.concepto =
        this.conceptos[
          this.conceptos.findIndex(
            (item) => item.id == this.gastos[index].cod_concepto
          )
        ];

      this.fgastos.monto = parseFloat(
        this.gastos[index].monto_distribuido
      ).toFixed(2);
      this.gastosDialog = true;
    },
    // Metodo para Crear y Editar ISLR
    saveIslr() {
      if (this.fIslr.index > -1) {
        let islrTemp = [].concat(this.retencionesIslr);
        islrTemp.splice(this.fIslr.index, 1);
        if (
          islrTemp.findIndex(
            (item) =>
              item.cod_tipo_retencion == this.fIslr.cod_tipo_retencion.id
          ) > -1
        ) {
          this.$q.notify({
            message:
              "Código de retención repetido! Seleccione uno diferente...",
            color: "red",
          });
          return;
        } else {
          this.retencionesIslr[this.fIslr.index].monto_base = this.parseFloatN(
            this.curReplace(this.fIslr.monto_base)
          );
          this.retencionesIslr[this.fIslr.index].cod_tipo_retencion =
            this.fIslr.cod_tipo_retencion.id;
          this.retencionesIslr[this.fIslr.index].monto_retener =
            this.parseFloatN(this.curReplace(this.fIslr.monto_retener));
        }
      } else {
        if (
          this.retencionesIslr.findIndex(
            (item) =>
              item.cod_tipo_retencion == this.fIslr.cod_tipo_retencion.id
          ) > -1
        ) {
          this.$q.notify({
            message:
              "Código de retención repetido! Seleccione uno diferente...",
            color: "red",
          });
          return;
        } else {
          let islr = {};
          islr.monto_base = this.parseFloatN(
            this.curReplace(this.fIslr.monto_base)
          );
          islr.cod_tipo_retencion = this.fIslr.cod_tipo_retencion.id;
          islr.monto_retener = this.parseFloatN(
            this.curReplace(this.fIslr.monto_retener)
          );
          this.retencionesIslr.push(islr);
        }
      }
      this.islrEditDialog = false;
    },
    // Metodo para llenar la modal al editar ISLR
    editIslr(index) {
      this.fIslr = [];
      this.fIslr.index = index;

      this.fIslr.monto_base = parseFloat(
        this.retencionesIslr[index].monto_base
      ).toFixed(2);
      this.fIslr.cod_tipo_retencion =
        this.retenciones[
          this.retenciones.findIndex(
            (item) => item.id == this.retencionesIslr[index].cod_tipo_retencion
          )
        ];
      this.fIslr.monto_retener = parseFloat(
        this.retencionesIslr[index].monto_retener
      ).toFixed(2);
      this.islrEditDialog = true;
      console.log(this.retencionesIslr);
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
      this.form = {
        monto_exento: "0,00",
        monto_base_nacional: "0,00",
        monto_base_intern: "0,00",
        monto_imp_nacional: "0,00",
        monto_imp_intern: "0,00",
        base_imponible_retencion: "0,00",
      };
      this.form.selectedForma = this.formaPago[1];
      this.form.selectedTipoCuenta = this.tipoCuenta[1];
      this.form.selectedPorc = this.porcentajes[0];
      this.form.estatus_documento = this.estatus[0].label;
      this.form.fecha_registro = moment().format("DD/MM/YYYY");
      this.form.fecha_documento = moment().format("DD/MM/YYYY");
      this.gastos = [];
      this.retencionesIslr = [];
      this.isSave = false;
    },
  },
};
</script>
