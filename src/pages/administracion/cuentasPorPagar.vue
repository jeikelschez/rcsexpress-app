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
            @click="
              dialogAnexoPago = true;
              this.idPago = this.fpago.id;
            "
            style="margin-right: 15px"
            :disable="!this.fpago.id ? true : false"
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
              !this.form.nro_documento || this.form.total_documento == '0,00'
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
            :disable="
              !this.form.nro_documento ||
              !this.form.nro_ctrl_doc ||
              this.gastos.length == 0 ||
              this.form.total_documento == '0,00'
                ? true
                : false
            "
            @click="
              this.form.selectedForma.value == 'CO'
                ? this.fpago.id
                  ? dialogPago()
                  : editPago()
                : saveCta()
            "
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
                    :readonly="
                      this.selectedTipo.value != 'NC' &&
                      this.selectedTipo.value != 'ND'
                        ? true
                        : false
                    "
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
                    v-model="form.fecha_vencimiento"
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
                    :options="tipoConcepto"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    option-label="label"
                    option-value="value"
                    v-model="form.selectedTipoConcepto"
                    class="pcform"
                    outlined
                    standout
                    label="Tipo de Concepto"
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
                    :disable="
                      this.selectedProveedor.length == 0 ||
                      this.form.estatus_documento == 'Cobrado'
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
                      this.selectedTipo.value == 'RE' ||
                      this.form.estatus_documento == 'Cobrado'
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
                      this.selectedTipo.value == 'RE' ||
                      this.form.estatus_documento == 'Cobrado'
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
                      this.selectedTipo.value == 'RE' ||
                      this.form.estatus_documento == 'Cobrado'
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
                      this.selectedTipo.value == 'RE' ||
                      this.form.estatus_documento == 'Cobrado'
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
                    @update:model-value="setBaseRetencion()"
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
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
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
                  v-model="fgastos.monto_distribuido"
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
                  @update:model-value="setRetencion()"
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

    <q-dialog v-model="pagoContadoDialog">
      <q-card class="q-pa-md" bordered style="width: 600px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="validatePago" class="q-gutter-md">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <p
                  style="font-size: 20px; text-align: left"
                  class="text-secondary"
                >
                  <strong>PAGO DE CONTADO</strong>
                </p>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-select
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
                  hint=""
                  dense
                  standout
                  label="Bancos"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  @update:model-value="
                    this.cuentas = [];
                    this.selectedCuenta = [];
                    this.fpago.nro_doc_pago2 = '';
                    this.$refs.methods.getData(
                      'cuentas',
                      'setData',
                      'cuentas',
                      {
                        headers: {
                          banco: this.selectedBanco.id,
                        },
                      }
                    );
                  "
                >
                  <template v-slot:no-option>
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
                <q-select
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="cuentas"
                  use-input
                  hint=""
                  dense
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="nro_cuenta"
                  option-value="id"
                  v-model="selectedCuenta"
                  outlined
                  standout
                  label="Cuentas"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  @update:model-value="findCheque()"
                >
                  <template v-slot:no-option>
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
                <q-input
                  outlined
                  label="Fecha Emisión"
                  hint=""
                  dense
                  style="padding-bottom: 0px"
                  v-model="fpago.fecha_pago"
                  lazy-rules
                  class="pcform"
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
                          v-model="fpago.fecha_pago"
                          mask="DD/MM/YYYY"
                          style="padding-bottom: 0px"
                          @update:model-value="this.$refs.qDateProxy.hide()"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="fpago.nro_doc_pago2"
                  dense
                  input-class="text-right"
                  label="Nro. Cheque"
                  hint=""
                  lazy-rules
                >
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="fpago.monto_doc"
                  input-class="text-right"
                  v-money="money"
                  dense
                  class="pcform"
                  label="Monto Documento"
                  hint=""
                  readonly
                  lazy-rules
                >
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="fpago.monto_pagado"
                  input-class="text-right"
                  v-money="money"
                  dense
                  class="pcform"
                  label="Monto a Pagar"
                  hint=""
                  readonly
                  lazy-rules
                >
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="fpago.monto_retener"
                  input-class="text-right"
                  v-money="money"
                  dense
                  label="Monto a Retener"
                  readonly
                  hint=""
                  lazy-rules
                >
                </q-input>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="fpago.beneficiario"
                  dense
                  label="Beneficiario"
                  hint=""
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, '')]"
                >
                </q-input>
              </div>
            </div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                :label="this.fpago.id ? 'Guardar' : 'Generar'"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="save"
              />
              <q-btn
                label="Cancelar"
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

    <q-dialog v-model="confirmPagoPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            El cheque {{ fpago.nro_doc_pago }} existe. ¿Desea modificarlo?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Si"
            color="primary"
            @click="this.confirmPago = 'SI'"
            v-close-popup
          />
          <q-btn
            flat
            label="No"
            color="primary"
            v-close-popup
            @click="this.confirmPago = 'NO'"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmGPagoPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Está seguro de generar el pago al proveedor bajo el Nro. de
            Documento {{ fpago.nro_doc_pago2 }} por el monto de Bs.
            {{ fpago.monto_pagado }}?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Si"
            color="primary"
            @click="saveCta()"
            v-close-popup
          />
          <q-btn flat label="No" color="primary" v-close-popup />
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
            @click="this.confirmForma = true"
            v-close-popup
          />
          <q-btn
            flat
            label="No"
            color="primary"
            v-close-popup
            @click="this.confirmForma = false"
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
                ).toFixed(2);
              "
            />
          </div>
          <div class="col-md-12 col-xs-12">
            <q-table
              :rows="islr"
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
                    @click="islr.splice(props.rowIndex, 1)"
                  ></q-btn>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmSavePopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Desea Grabar la Información?
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

    <q-dialog v-model="dialogAnexoPago" @show="this.printPago()">
      <webViewer
        ref="webViewer"
        @print-pdf="this.printData()"
        @close-pdf="dialogAnexoPago = false"
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
      gastosClone: [],
      fgastos: [],
      fIslr: [],
      conceptos: [],
      conceptosGastos: [],
      islr: [],
      islrClone: [],
      islrFact: [],
      retenciones: [],
      bancos: [],
      selectedBanco: [],
      cuentas: [],
      selectedCuenta: [],
      confirmSave: false,
      confirmDocument: false,
      confirmPago: false,
      confirmForma: false,
      proveedoresLoading: true,
      iva: 0,
      imp_intern: 0,
      totalGastos: 0,
      fpago: [],
      pagos: [],
      pagosClone: [],
      idPago: "",
      beneficiario: "",
      form: {
        id: "",
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
          label: "Retención",
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
      confirmPagoPopUp: ref(false),
      confirmGPagoPopUp: ref(false),
      confirmFormaPopUp: ref(false),
      confirmSavePopUp: ref(false),
      islrDialog: ref(false),
      islrEditDialog: ref(false),
      gastosDialog: ref(false),
      pagoContadoDialog: ref(false),
      dialogAnexoPago: ref(false),
      pagination: {
        page: 1,
        rowsPerPage: 0,
      },
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Administración - Cuentas por Pagar", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/bancos", "setData", "bancos");
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
      this.form.selectedTipoConcepto = this.tipoConcepto[1];
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
          this.resetFilters();
          this.$refs.documento.$el.focus();
          return;
        }
        this.form = ctaPagar;
        var agenciaIndex = this.agencias.findIndex(
          (item) => item.id == ctaPagar.cod_agencia
        );
        this.selectedAgencia = this.agencias[agenciaIndex].nb_agencia;
        this.form.selectedForma =
          this.formaPago[
            this.formaPago.findIndex(
              (item) => item.value == ctaPagar.pago_decontado
            )
          ];
        if (ctaPagar.pago_decontado == "CR" && ctaPagar.condicion_pago) {
          this.form.fecha_vencimiento = moment(
            ctaPagar.fecha_documento,
            "DD/MM/YYYY"
          )
            .add(ctaPagar.condicion_pago, "d")
            .format("DD/MM/YYYY");
        }
        this.form.selectedTipoConcepto =
          this.tipoConcepto[
            this.tipoConcepto.findIndex(
              (item) => item.value == ctaPagar.pago_permanente
            )
          ];
        this.form.estatus_documento = this.filterDesc(
          "estatus",
          ctaPagar.estatus_documento
        );
        this.selectedTipo = this.filterDesc("tipos", ctaPagar.tipo_documento);
        this.form.selectedPorc =
          this.porcentajes[
            this.porcentajes.findIndex(
              (item) => item.value == ctaPagar.porcentaje_retencion
            )
          ];

        this.gastosClone = [];
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
              this.gastosClone = [].concat(this.gastos);
            }
          });

        this.calculaGastos();

        // Retenciones ISLR
        this.islrClone = [];
        this.islrFact = [];
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
                this.islrFact.push(res.data.data[i]);
                api
                  .get(`/cislr/${res.data.data[i].cod_islr}`, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    },
                  })
                  .then((res) => {
                    if (res.data) {
                      this.islr.push(res.data);
                      this.islrClone.push(res.data);
                    }
                  });
              }
            }
          });

        // Cargamos los pagos generados
        await api
          .get(`/pgenerados`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              cod_cta_pagar: ctaPagar.id,
            },
          })
          .then((res) => {
            if (res.data.data.length > 0) {
              this.fpago = res.data.data[0];
            }
          });

        // Cargamos las retenciones segun la fecha
        await api
          .get(`/mretenciones`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              valido: moment(ctaPagar.fecha_documento, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              ),
              tipo_persona: this.selectedProveedor.tipo_persona,
            },
          })
          .then((res) => {
            this.retenciones = res.data.data;
          });

        this.confirmDocument = false;
      }
    },
    // Metodo para validar el pago
    validatePago() {
      if(this.fpago.nro_doc_pago2 == "") {
        this.$q.notify({
          message:
            "Debe ingresar el Número de Cheque",
          color: "red",
        });
        return;
      }

      if(this.fpago.id) {
        this.saveCta();
      } else {
        this.confirmGPagoPopUp = true;
      }
    },
    // Metodo para guardar la cuenta por Pagar
    async saveCta() {
      this.pagoContadoDialog = false;

      // Obtenemos el total de la Distribución de los Gastos
      let total_gtos = this.parseFloatN(this.curReplace(this.totalGastos));
      let monto_exento = this.parseFloatN(
        this.curReplace(this.form.monto_exento)
      );
      let monto_base_nac = this.parseFloatN(
        this.curReplace(this.form.monto_base_nacional)
      );
      let monto_base_inter = this.parseFloatN(
        this.curReplace(this.form.monto_base_intern)
      );
      let monto_cuenta = monto_exento + monto_base_nac + monto_base_inter;
      let mto_doc = this.parseFloatN(
        this.curReplace(this.form.total_documento)
      );
      let saldo_doc = this.parseFloatN(
        this.curReplace(this.form.saldo_documento)
      );
      let monto_ret = this.parseFloatN(
        this.curReplace(this.form.saldo_retenido)
      );

      if (this.form.selectedTipoConcepto.value == "P") {
        // Validamos que el de distrib de gastos sea igual a Monto Exento + Monto Base Nac. + Monto Base Int.
        if (monto_cuenta != total_gtos) {
          this.$q.notify({
            message:
              "Error en la Distribución de Gastos. Verifique que el Total de los Gastos sea igual a: Monto Exento + Monto Base Nac. + Monto Base Intern.",
            color: "red",
          });
          return;
        }

        //Valido que el total de los Gastos no sea mayor al Total del Documento
        if (total_gtos > mto_doc) {
          this.$q.notify({
            message:
              "Error en la Distribución de Gastos. Verifique que el Total de los Gastos no sea Mayor al Total del Documento",
            color: "red",
          });
          return;
        }
      }

      this.confirmSavePopUp = true;
      await this.until((_) => this.confirmSave == true);
      if (!this.confirmSave) {
        return;
      }
      this.confirmSave = false;
      this.loading = true;

      let formCtaPagar = Object.assign({}, this.form);

      formCtaPagar.cod_agencia = this.selectedAgencia.id;
      formCtaPagar.cod_proveedor = this.selectedProveedor.id;
      formCtaPagar.tipo_documento = this.selectedTipo.value;

      formCtaPagar.fecha_comprobante = this.form.fecha_comprobante
        ? moment(this.form.fecha_comprobante, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ) != "Invalid date"
          ? moment(this.form.fecha_comprobante, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            )
          : null
        : null;
      formCtaPagar.fecha_documento = this.form.fecha_documento
        ? moment(this.form.fecha_documento, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ) != "Invalid date"
          ? moment(this.form.fecha_documento, "DD/MM/YYYY").format("YYYY-MM-DD")
          : null
        : null;
      formCtaPagar.fecha_entrega = this.form.fecha_entrega
        ? moment(this.form.fecha_entrega, "DD/MM/YYYY").format("YYYY-MM-DD") !=
          "Invalid date"
          ? moment(this.form.fecha_entrega, "DD/MM/YYYY").format("YYYY-MM-DD")
          : null
        : null;
      formCtaPagar.fecha_registro = this.form.fecha_registro
        ? moment(this.form.fecha_registro, "DD/MM/YYYY").format("YYYY-MM-DD") !=
          "Invalid date"
          ? moment(this.form.fecha_registro, "DD/MM/YYYY").format("YYYY-MM-DD")
          : null
        : null;
      formCtaPagar.fecha_vencimiento = this.form.fecha_vencimiento
        ? moment(this.form.fecha_vencimiento, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ) != "Invalid date"
          ? moment(this.form.fecha_vencimiento, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            )
          : null
        : null;

      formCtaPagar.condicion_pago = this.form.condicion_pago
        ? parseInt(this.form.condicion_pago)
        : null;
      formCtaPagar.cod_tipo_persona = this.form.cod_tipo_persona
        ? parseInt(this.form.cod_tipo_persona)
        : null;

      formCtaPagar.estatus_documento =
        this.estatus[
          this.estatus.findIndex(
            (item) => item.label == this.form.estatus_documento
          )
        ].value;

      if (this.selectedTipo.value == "NC") {
        formCtaPagar.saldo_retenido = monto_ret * -1;
        formCtaPagar.total_documento = mto_doc * -1;
        formCtaPagar.saldo_documento = mto_doc * -1;
      } else {
        formCtaPagar.saldo_retenido = monto_ret;
        formCtaPagar.total_documento = mto_doc;
        formCtaPagar.saldo_documento = saldo_doc;
      }

      formCtaPagar.monto_exento = this.parseFloatN(
        this.curReplace(this.form.monto_exento)
      );
      formCtaPagar.monto_base_nacional = this.parseFloatN(
        this.curReplace(this.form.monto_base_nacional)
      );
      formCtaPagar.monto_base_intern = this.parseFloatN(
        this.curReplace(this.form.monto_base_intern)
      );
      formCtaPagar.monto_imp_nacional = this.parseFloatN(
        this.curReplace(this.form.monto_imp_nacional)
      );
      formCtaPagar.monto_imp_intern = this.parseFloatN(
        this.curReplace(this.form.monto_imp_intern)
      );
      formCtaPagar.base_imponible_retencion = this.parseFloatN(
        this.curReplace(this.form.base_imponible_retencion)
      );

      formCtaPagar.pago_decontado = this.form.selectedForma.value;
      formCtaPagar.pago_permanente = this.form.selectedTipoConcepto.value;
      formCtaPagar.porcentaje_retencion = this.form.selectedPorc.value;

      delete formCtaPagar.selectedForma;
      delete formCtaPagar.selectedTipoConcepto;
      delete formCtaPagar.selectedPorc;
      delete formCtaPagar.id;

      let idCtaPagar = this.form.id;
      if (idCtaPagar) {
        // Actualizamos la cuenta por Pagar
        await api
          .put(`/mctapagar/${this.form.id}`, formCtaPagar, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            idCtaPagar = res.data.id;
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error actualizando maestro de Cuentas por Pagar. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
          });
      } else {
        // Creamos la cuentas por Pagar
        await api
          .post(`/mctapagar`, formCtaPagar, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            idCtaPagar = res.data.id;
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error creando el maestro de Cuentas por Pagar. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
          });
      }
      if (!this.loading) return;

      // Si tiene Distribucion de Gastos cargadas se eliminan
      for (var i = 0; i <= this.gastosClone.length - 1; i++) {
        api
          .delete(`/dgastos/${this.gastosClone[i].id}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al Eliminar la Distribucion de Gastos. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
          });
      }
      if (!this.loading) return;

      // Creamos las Distribuciones de Gastos
      for (var i = 0; i <= this.gastos.length - 1; i++) {
        let formDgasto = this.gastos[i];
        delete formDgasto.id;
        formDgasto.cod_cta_pagar = idCtaPagar;
        formDgasto.monto_distribuido = this.parseFloatN(
          formDgasto.monto_distribuido
        );

        await api
          .post(`/dgastos`, formDgasto, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al crear la Distribucion de Gastos. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
          });
      }
      if (!this.loading) return;

      // Si tiene ISLR Facturas cargados se eliminan
      for (var i = 0; i <= this.islrFact.length - 1; i++) {
        await api
          .delete(`/cislrfac/${this.islrFact[i].id}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al Eliminar ISLR Factura. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
          });
      }
      if (!this.loading) return;

      // Si tiene ISLR cargados se eliminan
      for (var i = 0; i <= this.islrClone.length - 1; i++) {
        await api
          .delete(`/cislr/${this.islrClone[i].id}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al Eliminar ISLR. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
          });
      }
      if (!this.loading) return;

      // Datos para ISLR Factura
      let formIslrFact = {};
      formIslrFact.mes_compra = moment(
        this.form.fecha_documento,
        "DD/MM/YYYY"
      ).format("MM");
      formIslrFact.id_compra = idCtaPagar;
      formIslrFact.aplica = 1;
      formIslrFact.nro_factura = this.form.nro_ctrl_doc;
      formIslrFact.fecha_factura = moment(
        this.form.fecha_documento,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      formIslrFact.cod_proveedor = this.selectedProveedor.id;
      formIslrFact.monto_base = this.parseFloatN(
        this.curReplace(this.form.monto_base_nacional)
      );
      formIslrFact.nro_documento = this.form.nro_documento;
      formIslrFact.saldo_retenido = this.parseFloatN(
        this.curReplace(this.form.saldo_retenido)
      );

      for (var i = 0; i <= this.islr.length - 1; i++) {
        let formIslr = this.islr[i];
        delete formIslr.id;
        formIslr.fecha_comprobante = formIslr.fecha_comprobante
          ? moment(formIslr.fecha_comprobante, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            ) != "Invalid date"
            ? moment(formIslr.fecha_comprobante, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              )
            : null
          : null;
        formIslr.fecha_reg_islr = formIslr.fecha_reg_islr
          ? moment(formIslr.fecha_reg_islr, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            ) != "Invalid date"
            ? moment(formIslr.fecha_reg_islr, "DD/MM/YYYY").format("YYYY-MM-DD")
            : null
          : null;
        formIslr.monto_base = parseFloat(formIslr.monto_base);
        formIslr.monto_retener = parseFloat(formIslr.monto_retener);
        formIslr.monto_transferido = parseFloat(formIslr.monto_transferido);
        formIslr.porc_retencion = parseFloat(formIslr.porc_retencion);
        formIslr.status = parseInt(formIslr.status);

        // Creamos el ISLR
        await api
          .post(`/cislr`, formIslr, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            formIslrFact.cod_islr = res.data.id;
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al crear el Control de ISLR. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
          });

        // Creamos el ISLR Factura
        await api
          .post(`/cislrfac`, formIslrFact, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al crear ISLR Factura. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
          });
      }
      if (!this.loading) return;

      // Tipo CONTADO
      if (this.form.selectedForma.value == "CO") {
        let formPago = {};
        formPago.cod_cta_pagar = idCtaPagar;
        formPago.fecha_pago = moment(
          this.fpago.fecha_pago,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
        formPago.cod_cuenta = this.selectedCuenta.id
          ? this.selectedCuenta.id
          : this.fpago.cod_cuenta;
        formPago.tipo_doc_pago = "CH";
        formPago.nro_doc_pago = this.fpago.nro_doc_pago2;
        formPago.monto_pagado = this.parseFloatN(
          this.curReplace(this.fpago.monto_pagado)
        );
        formPago.monto_base = this.parseFloatN(
          this.curReplace(this.form.base_imponible_retencion)
        );
        formPago.monto_retenido = this.parseFloatN(
          this.curReplace(this.form.saldo_retenido)
        );
        formPago.porc_retencion = this.form.selectedPorc.value;

        // Si tiene Pagos Generados se actualizan
        if (this.fpago.id) {
          this.idPago = this.fpago.id;
          await api
            .put(`/pgenerados/${this.fpago.id}`, formPago, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .catch(() => {
              this.$q.notify({
                message:
                  "Error del Sistema. Problemas al Actualizar el Pago Generado. Comuníquese con el proveedor del Sistemas...",
                color: "red",
              });
              this.loading = false;
            });
          if (!this.loading) return;
        } else {
          // Creo el movimiento Bancario
          let formMbancario = {};
          formMbancario.cod_cuenta = this.selectedCuenta.id
            ? this.selectedCuenta.id
            : this.fpago.cod_cuenta;
          formMbancario.tipo_transaccion = "E";
          formMbancario.fecha_movimiento = moment(
            this.fpago.fecha_pago,
            "DD/MM/YYYY"
          ).format("YYYY-MM-DD");
          formMbancario.nro_documento = this.fpago.nro_doc_pago2;
          formMbancario.tipo_documento = "CH";
          formMbancario.monto_movimiento = this.parseFloatN(
            this.curReplace(this.fpago.monto_pagado)
          );
          formMbancario.beneficiario = this.fpago.beneficiario;
          formMbancario.tipo_pago = "PP";

          await api
            .post(`/mbancarios`, formMbancario, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .catch(() => {
              this.$q.notify({
                message:
                  "Error del Sistema. Problemas al Crear el movimiento Bancario. Comuníquese con el proveedor del Sistemas...",
                color: "red",
              });
              this.loading = false;
            });
          if (!this.loading) return;

          // Actualizar chequeras
          let idChequera;
          let nroChequera;
          await api
            .get(`/chequeras`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                cuenta: this.selectedCuenta.id,
                estatus: "A",
              },
            })
            .then((res) => {
              idChequera = res.data[0].id;
              nroChequera = res.data[0].nro_chequera;
            });

          if (idChequera) {
            let formChequera = {};
            formChequera.nro_chequera = nroChequera;
            formChequera.ultimo_cheque_asignado = this.fpago.nro_doc_pago2;
            await api
              .put(`/chequeras/${idChequera}`, formChequera, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .catch(() => {
                this.$q.notify({
                  message:
                    "Error del Sistema. Problemas al Actualizar la Chequera. Comuníquese con el proveedor del Sistemas...",
                  color: "red",
                });
                this.loading = false;
              });
            if (!this.loading) return;
          }

          // Cancelar la factura
          let formCtaPagar2 = {};
          formCtaPagar2.saldo_documento = 0;
          formCtaPagar2.estatus_documento = "C";
          formCtaPagar2.saldo_base_retencion = 0;
          await api
            .put(`/mctapagar/${idCtaPagar}`, formCtaPagar2, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              idCtaPagar = res.data.id;
            })
            .catch(() => {
              this.$q.notify({
                message:
                  "Error actualizando maestro de Cuentas por Pagar. Comuníquese con el proveedor del Sistemas...",
                color: "red",
              });
              this.loading = false;
            });
          if (!this.loading) return;

          // Se crea el Pago Generado
          await api
            .post(`/pgenerados`, formPago, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              this.idPago = res.data.id;
            })
            .catch(() => {
              this.$q.notify({
                message:
                  "Error del Sistema. Problemas al Crear el Pago Generado. Comuníquese con el proveedor del Sistemas...",
                color: "red",
              });
              this.loading = false;
            });
          if (!this.loading) return;
        }

        // Se abre modal con PDF de Cheque para imprimir
        this.dialogAnexoPago = true;
      }

      if (this.form.id) {
        this.$q.notify({
          message: "Cuenta por Pagar actualizada con Exito",
          color: "green",
        });
      } else {
        this.$q.notify({
          message: "Cuenta por Pagar creada con Exito",
          color: "green",
        });
      }

      this.selectedAgencia = this.agencias[0];
      this.beneficiario = this.selectedProveedor.nb_beneficiario
      this.selectedProveedor = [];
      this.selectedTipo = this.tipos[0];
      this.resetFilters();
      this.loading = false;
    },
    // Metodo para actualizar la fecha de vencimiento
    setVencimiento() {
      if (this.form.condicion_pago) {
        let fecha_documento = moment(this.form.fecha_documento);
        this.form.fecha_vencimiento = fecha_documento
          .add(this.form.condicion_pago, "d")
          .format("DD/MM/YYYY");
      } else {
        this.form.fecha_vencimiento = "";
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
        if (!this.confirmForma) {
          this.selectedTipo = this.tipos[0];
          return;
        }
        this.confirmForma = false;
        this.form.selectedForma = this.formaPago[0];
      }
    },
    // Metodo para setear el monto impúesto nacional
    async setImpuesto(tipo) {
      if (!this.form.id) {
        if (tipo == 1) {
          this.form.monto_imp_nacional = (
            (this.parseFloatN(this.curReplace(this.form.monto_base_nacional)) *
              parseFloat(this.iva)) /
            100
          ).toFixed(2);
          this.form.base_imponible_retencion = (
            (this.parseFloatN(this.curReplace(this.form.monto_base_nacional)) *
              parseFloat(this.iva)) /
            100
          ).toFixed(2);
        } else {
          this.form.monto_imp_intern = (
            (this.parseFloatN(this.curReplace(this.form.monto_base_intern)) *
              parseFloat(this.imp_intern)) /
            100
          ).toFixed(2);
        }
        this.calculaTotales();
      }
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

      this.form.saldo_retenido = (
        ((await this.parseFloatN(
          this.curReplace(this.form.base_imponible_retencion)
        )) *
          this.form.selectedPorc.value) /
        100
      ).toFixed(2);
    },
    // Metodo para calcular los totales
    async calculaTotales() {
      if (!this.form.id) {
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
      }
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
            this.curReplace(this.fgastos.monto_distribuido)
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
            this.curReplace(this.fgastos.monto_distribuido)
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

      this.fgastos.monto_distribuido = parseFloat(
        this.gastos[index].monto_distribuido
      ).toFixed(2);
      this.gastosDialog = true;
    },
    // Metodo para Crear y Editar ISLR
    saveIslr() {
      if (this.fIslr.index > -1) {
        let islrTemp = [].concat(this.islr);
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
          this.islr[this.fIslr.index].cod_tipo_retencion =
            this.fIslr.cod_tipo_retencion.id;
          this.islr[this.fIslr.index].cod_seniat =
            this.fIslr.cod_tipo_retencion.cod_seniat;
          this.islr[this.fIslr.index].descripcion_ret =
            this.fIslr.cod_tipo_retencion.nb_tipo_retencion;
          this.islr[this.fIslr.index].monto_base = this.parseFloatN(
            this.curReplace(this.fIslr.monto_base)
          );
          this.islr[this.fIslr.index].monto_retener = this.parseFloatN(
            this.curReplace(this.fIslr.monto_retener)
          );
          this.islr[this.fIslr.index].monto_transferido = this.parseFloatN(
            this.curReplace(this.fIslr.monto_retener)
          );
          this.islr[this.fIslr.index].porc_retencion = this.parseFloatN(
            this.curReplace(this.fIslr.cod_tipo_retencion.porc_retencion)
          );
          this.islr[this.fIslr.index].fecha_comprobante =
            this.fIslr.fecha_comprobante;
          this.islr[this.fIslr.index].fecha_reg_islr =
            this.fIslr.fecha_reg_islr;
        }
      } else {
        if (
          this.islr.findIndex(
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
          islr.cod_tipo_retencion = this.fIslr.cod_tipo_retencion.id;
          islr.ano_ejercicio = moment(
            this.form.fecha_documento,
            "DD/MM/YYYY"
          ).format("YYYY");
          islr.cod_seniat = this.fIslr.cod_tipo_retencion.cod_seniat;
          islr.descripcion_ret =
            this.fIslr.cod_tipo_retencion.nb_tipo_retencion;
          islr.fecha_reg_islr = moment().format("DD/MM/YYYY");
          islr.monto_base = this.parseFloatN(
            this.curReplace(this.fIslr.monto_base)
          );
          islr.monto_retener = this.parseFloatN(
            this.curReplace(this.fIslr.monto_retener)
          );
          islr.monto_transferido = this.parseFloatN(
            this.curReplace(this.fIslr.monto_retener)
          );
          islr.porc_retencion = this.parseFloatN(
            this.curReplace(this.fIslr.cod_tipo_retencion.porc_retencion)
          );
          islr.status = 1;
          this.islr.push(islr);
        }
      }
      this.islrEditDialog = false;
    },
    // Metodo para llenar la modal al editar ISLR
    editIslr(index) {
      this.fIslr = [];
      this.fIslr.index = index;

      this.fIslr.monto_base = parseFloat(this.islr[index].monto_base).toFixed(
        2
      );
      this.fIslr.monto_retener = parseFloat(
        this.islr[index].monto_retener
      ).toFixed(2);
      this.fIslr.monto_transferido = parseFloat(
        this.islr[index].monto_transferido
      ).toFixed(2);
      this.fIslr.cod_tipo_retencion =
        this.retenciones[
          this.retenciones.findIndex(
            (item) => item.id == this.islr[index].cod_tipo_retencion
          )
        ];
      this.fIslr.monto_retener = parseFloat(
        this.islr[index].monto_retener
      ).toFixed(2);
      this.fIslr.monto_transferido = parseFloat(
        this.islr[index].monto_transferido
      ).toFixed(2);
      this.fIslr.fecha_reg_islr = this.islr[index].fecha_reg_islr;
      this.fIslr.nro_comprobante = this.islr[index].nro_comprobante;
      this.fIslr.fecha_comprobante = this.islr[index].fecha_comprobante;
      this.islrEditDialog = true;
    },
    // Metodo para llenar saldo a Retener al editar el ISLR
    setRetencion() {
      let monto_base = this.parseFloatN(this.curReplace(this.fIslr.monto_base));
      let pago_mayor = this.parseFloatN(
        this.curReplace(this.fIslr.cod_tipo_retencion.pago_mayor)
      );

      if (monto_base >= pago_mayor) {
        let porc_ret = this.parseFloatN(
          this.curReplace(this.fIslr.cod_tipo_retencion.porc_retencion)
        );
        let sustraendo = this.parseFloatN(
          this.curReplace(this.fIslr.cod_tipo_retencion.sustraendo)
        );

        let monto_islr = (monto_base * (porc_ret / 100) - sustraendo).toFixed(
          2
        );
        this.fIslr.monto_retener = monto_islr;
        this.fIslr.monto_transferido = monto_islr;
      } else {
        this.$q.notify({
          message:
            "El Monto no corresponde para la selección del ISLR. Verifique...!",
          color: "red",
        });
        this.fIslr = [];
        return;
      }
    },
    // Metodo para editar el pago de Contado
    async dialogPago() {
      this.confirmPagoPopUp = true;
      await this.until((_) => this.confirmPago);
      if (this.confirmPago == "SI") {
        // Buscamos el banco de la cuenta
        let banco;
        await api
          .get(`/cuentas/${this.fpago.cod_cuenta}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            banco = res.data.cod_banco;
            this.selectedBanco =
              this.bancos[
                this.bancos.findIndex((item) => item.id == res.data.cod_banco)
              ];
          });

        await api
          .get(`/cuentas`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              banco: banco,
            },
          })
          .then((res) => {
            this.cuentas = res.data;
          });

        this.selectedCuenta =
          this.cuentas[
            this.cuentas.findIndex((item) => item.id == this.fpago.cod_cuenta)
          ];
        this.fpago.nro_doc_pago2 = this.fpago.nro_doc_pago;
        this.editPago();
      } else {
        this.saveCta();
      }
      this.confirmPago = false;
    },
    // Metodo para editar el pago de Contado
    async editPago() {
      let mto_doc = this.parseFloatN(
        this.curReplace(this.form.total_documento)
      );
      let monto_ret = this.parseFloatN(
        this.curReplace(this.form.saldo_retenido)
      );
      let monto_pago = mto_doc - monto_ret;
      this.fpago.monto_doc = mto_doc.toFixed(2);
      this.fpago.monto_pagado = monto_pago.toFixed(2);
      this.fpago.monto_retener = monto_ret.toFixed(2);
      this.fpago.fecha_pago = this.form.fecha_documento;
      this.fpago.beneficiario = this.selectedProveedor.nb_beneficiario;
      this.pagoContadoDialog = true;
    },
    // Metodo para buscar el valor del Ultimo cheque
    findCheque() {
      api
        .get(`/chequeras`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            cuenta: this.selectedCuenta.id,
            estatus: "A",
          },
        })
        .then((res) => {
          this.fpago.nro_doc_pago2 =
            parseInt(res.data[0].ultimo_cheque_asignado) + 1;
        });
    },
    // Imprimir Comprobante de Pago en PDF
    async printPago() {
      let pagoArray = {};
      console.log(this.selectedProveedor)
      api
        .get(`/pdfreports/reportePago`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            id: this.idPago,
            beneficiario: this.beneficiario,
          },
        })
        .then((res) => {
          if (!res.data.validDoc) {
            this.$q.notify({
              message: "No existen registros para este conjunto de Filtos",
              color: "red",
            });
            this.dialogAnexoPago = false;
            return;
          }
          this.$refs.webViewer.showpdf(res.data.pdfPath, 1.3);
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message,
            color: "red",
          });
          this.dialogAnexoPago = false;
          return;
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
        id: "",
        monto_exento: "0,00",
        monto_base_nacional: "0,00",
        monto_base_intern: "0,00",
        monto_imp_nacional: "0,00",
        monto_imp_intern: "0,00",
        base_imponible_retencion: "0,00",
      };
      this.form.selectedForma = this.formaPago[1];
      this.form.selectedTipoConcepto = this.tipoConcepto[1];
      this.form.selectedPorc = this.porcentajes[0];
      this.form.estatus_documento = this.estatus[0].label;
      this.form.fecha_registro = moment().format("DD/MM/YYYY");
      this.form.fecha_documento = moment().format("DD/MM/YYYY");
      this.gastos = [];
      this.gastosTemp = [];
      this.islr = [];
      this.islrClone = [];
      this.islrFact = [];
      this.gastosClone = [];
      this.fpago = [];
      this.selectedBanco = [];
      this.selectedCuenta = [];
    },
  },
};
</script>
