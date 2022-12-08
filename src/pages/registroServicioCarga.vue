<template>
  <q-page
    class="pagina q-pa-md paginaRegistroServicioCarga"
    style="padding-bottom: 0px"
  >
    <q-page-sticky
      position="bottom-right"
      class="z-top"
      style="margin-right: 20px; margin-bottom: 20px"
    >
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action
          color="primary"
          style="margin-top: 15px"
          icon="save"
          class="z-top"
          @click="
            this.closeDialogs();
            this.sendDataGuia();
          "
        >
          <q-tooltip
            ref="fabtp"
            class="bg-primary"
            style="max-height: 30px"
            transition-show="scale"
            transition-hide="scale"
            anchor="center left"
            self="center right"
            :offset="[5, 10]"
          >
            Guardar Guia (Ctrl + G)
          </q-tooltip>
        </q-fab-action>
        <q-fab-action
          color="primary"
          style="margin-top: 15px"
          icon="filter_alt_off"
          class="z-top"
          @click="limpiarGuia()"
        >
          <q-tooltip
            class="bg-primary"
            style="max-height: 30px"
            transition-show="scale"
            transition-hide="scale"
            anchor="center left"
            self="center right"
            :offset="[5, 10]"
            color="primary"
          >
            Limpiar Guia (Ctrl + L)
          </q-tooltip>
        </q-fab-action>
        <q-fab-action
          color="primary"
          icon="print"
          class="z-top"
          style="margin-top: 15px"
          @click="
            closeDialogs();
            this.pdfView = true;
          "
        >
          <q-tooltip
            style="max-height: 30px"
            class="bg-primary"
            transition-show="scale"
            transition-hide="scale"
            anchor="center left"
            self="center right"
            :offset="[5, 10]"
            color="primary"
          >
            Imprimir Guia (Ctrl + I)
          </q-tooltip>
        </q-fab-action>
        <q-fab-action
          color="primary"
          icon="close"
          class="z-top"
          style="margin-top: 15px"
          @click="
            this.closeDialogs();
            this.reversar();
          "
        >
          <q-tooltip
            class="bg-primary"
            style="max-height: 30px"
            transition-show="scale"
            anchor="center left"
            self="center right"
            :offset="[5, 10]"
            transition-hide="scale"
            color="primary"
          >
            Reversar Guia (Ctrl + R)
          </q-tooltip>
        </q-fab-action>
        <q-fab-action
          color="primary"
          icon="money"
          class="z-top"
          @click="
            this.closeDialogs();
            this.tarificar();
          "
          style="margin-top: 15px"
        >
          <q-tooltip
            class="bg-primary"
            style="max-height: 30px"
            transition-show="scale"
            transition-hide="scale"
            anchor="center left"
            self="center right"
            :offset="[5, 10]"
            color="primary"
          >
            Tarifear (Ctrl + F)
          </q-tooltip>
        </q-fab-action>
        <q-fab-action
          color="primary"
          style="margin-top: 15px"
          icon="description"
          class="z-top"
          @click="
            this.closeDialogs();
            this.showDetalle();
          "
        >
          <q-tooltip
            class="bg-primary"
            style="max-height: 30px"
            transition-show="scale"
            anchor="center left"
            self="center right"
            :offset="[5, 10]"
            transition-hide="scale"
            color="primary"
          >
            Detalle del Documento (Ctrl + T)
          </q-tooltip>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="clientesBox">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendDataClientes()">
            <div class="row">
              <div
                class="col-md-12 col-xs-12"
                v-if="this.cliente"
                style="align-self: center; text-align: left; margin-top: -30px"
              >
                <h4 style="font-size: 20px" class="text-secondary">
                  <strong>UBICACIÓN GEOGRAFICA DE CLIENTE DESTINO</strong>
                </h4>
              </div>
              <div
                class="col-md-12 col-xs-12"
                v-else
                style="align-self: center; text-align: left; margin-top: -30px"
              >
                <h4 style="font-size: 20px" class="text-secondary">
                  <strong>UBICACIÓN GEOGRAFICA DE CLIENTE ORIGEN</strong>
                </h4>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="pais"
                  label="Pais"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="paisesFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'paisesFiltered',
                        'paises',
                        'desc_pais'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="desc_pais"
                  option-value="id"
                  @update:model-value="
                    this.estado = '';
                    this.ciudad = '';
                    this.localidades = [];
                    this.municipios = [];
                    this.parroquias = [];
                    this.ciudades = [];
                    this.formClientes.cod_localidad = [];
                    this.formClientes.cod_municipio = [];
                    this.formClientes.cod_parroquia = [];
                    this.$refs.methods.getData(
                      'estados',
                      'setData',
                      'estados',
                      {
                        headers: {
                          Authorization: ``,
                          pais: this.pais.id,
                        },
                      }
                    );
                  "
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="estado"
                  label="Estado"
                  class="pcform"
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="estadosFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'estadosFiltered',
                        'estados',
                        'desc_estado'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="desc_estado"
                  option-value="id"
                  @update:model-value="
                    this.formClientes.cod_parroquia = [];
                    this.formClientes.cod_municipio = [];
                    this.parroquias = [];
                    this.$refs.methods.getData(
                      'municipios',
                      'setData',
                      'municipios',
                      {
                        headers: {
                          Authorization: ``,
                          estado: this.estado.id,
                        },
                      }
                    );
                    this.$refs.methods.getData(
                      'localidades',
                      'setData',
                      'localidades',
                      {
                        headers: {
                          Authorization: ``,
                          estado: this.estado.id,
                        },
                      }
                    );
                    this.ciudad = '';
                    this.formClientes.cod_localidad = [];
                    this.$refs.methods.getData(
                      'ciudades',
                      'setData',
                      'ciudades',
                      {
                        headers: {
                          Authorization: ``,
                          estado: this.estado.id,
                        },
                      }
                    );
                  "
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="ciudad"
                  label="Ciudad"
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="ciudadesFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'ciudadesFiltered',
                        'ciudades',
                        'desc_ciudad'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="desc_ciudad"
                  option-value="id"
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientes.cod_municipio"
                  label="Municipio"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="municipiosFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'municipiosFiltered',
                        'municipios',
                        'desc_municipio'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="desc_municipio"
                  option-value="id"
                  lazy-rules
                  @update:model-value="
                    this.formClientes.cod_parroquia = [];
                    this.$refs.methods.getData(
                      'parroquias',
                      'setData',
                      'parroquias',
                      {
                        headers: {
                          municipio: this.formClientes.cod_municipio.id,
                        },
                      }
                    );
                  "
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientes.cod_parroquia"
                  label="Parroquia"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="parroquiasFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'parroquiasFiltered',
                        'parroquias',
                        'desc_parroquia'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="desc_parroquia"
                  option-value="id"
                  lazy-rules
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientes.cod_localidad"
                  label="Localidad"
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="localidadesFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'localidadesFiltered',
                        'localidades',
                        'desc_localidad'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="desc_localidad"
                  option-value="id"
                  lazy-rules
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
            </div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 6px; margin-top: 10px"
            >
              <q-btn
                label="Actualizar Cliente"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add"
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

    <q-dialog v-model="detalle">
      <q-card
        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="width: 1000px; max-width: 80vw"
      >
        <q-table
          :rows="detalle_movimiento"
          row-key="id"
          :columns="columnsConceptos"
          binary-state-sort
          :separator="separator"
          :filter="filter"
          v-model:pagination="pagination"
          style="width: 100%"
          :grid="$q.screen.xs"
          hide-bottom
        >
          <template>
            <div class="col-4 q-table__title">
              <h4
                style="font-size: 19px; margin-top: 10px; margin-bottom: 10px"
                class="text-secondary"
              >
                <strong>DETALLE DEL DOCUMENTO</strong>
              </h4>
            </div>
            <q-space />
            <q-btn
              flat
              round
              dense
              icon="close"
              @click="this.detalle = false"
              class="q-ml-md"
            />
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
                  props.row.nro_item == 1 || props.row.nro_item == 2
                    ? this.disableGuia
                      ? true
                      : false
                    : true
                "
                ref="cantidad"
                :rules="[
                  (val) => this.$refs.rulesVue.isReq(val, ''),
                  (val) => this.$refs.rulesVue.isMax(val, 9, ''),
                ]"
                hide-bottom-space
                @keyup="this.calculaDetalle('cantidad', props.row)"
              >
              </q-input>
            </q-td>
          </template>
          <template v-slot:body-cell-importe_renglon="props">
            <q-td :props="props">
              <q-input
                outlined
                v-money="money"
                input-class="text-right"
                dense
                v-model="props.row.importe_renglon"
                :disable="this.disableGuia"
                :rules="[
                  (val) => this.$refs.rulesVue.isReq(val, ''),
                  (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                ]"
                hide-bottom-space
                @keyup="this.calculaDetalle('importe_renglon', props.row)"
              >
              </q-input>
            </q-td>
          </template>
          <template v-slot:body-cell-precio_unitario="props">
            <q-td :props="props">
              <q-input
                outlined
                input-class="text-right"
                dense
                v-money="money"
                v-model="props.row.precio_unitario"
                :disable="this.disableGuia"
                :rules="[
                  (val) => this.$refs.rulesVue.isReq(val, ''),
                  (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                ]"
                hide-bottom-space
                @keyup="this.calculaDetalle('precio_unitario', props.row)"
              >
              </q-input>
            </q-td>
          </template>
          <template v-slot:item="props">
            <div
              style="padding-right: 10px; padding-left: 10px"
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card :class="props.selected ? 'bg-grey-2' : ''">
                <q-list dense>
                  <q-item v-for="col in props.cols" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side class="itemMovilSide">
                      <q-input
                        outlined
                        v-if="col.name == 'cantidad'"
                        :disable="
                          props.row.nro_item == 1 || props.row.nro_item == 2
                            ? this.disableGuia
                              ? true
                              : false
                            : true
                        "
                        input-class="text-right"
                        dense
                        v-money="moneyNotDecimal"
                        v-model="props.row.cantidad"
                        :rules="[
                          (val) => this.$refs.rulesVue.isReq(val, ''),
                          (val) => this.$refs.rulesVue.isMax(val, 9, ''),
                        ]"
                        hide-bottom-space
                        @keyup="this.calculaDetalle('cantidad', props.row)"
                      >
                      </q-input>
                      <q-input
                        outlined
                        v-if="col.name == 'importe_renglon'"
                        v-money="money"
                        input-class="text-right"
                        dense
                        style="margin-bottom: 10px"
                        v-model="props.row.importe_renglon"
                        :disable="this.disableGuia"
                        :rules="[
                          (val) => this.$refs.rulesVue.isReq(val, ''),
                          (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                        ]"
                        hide-bottom-space
                        @keyup="
                          this.calculaDetalle('importe_renglon', props.row)
                        "
                      >
                      </q-input>
                      <q-input
                        outlined
                        v-if="col.name == 'precio_unitario'"
                        input-class="text-right"
                        dense
                        v-money="money"
                        v-model="props.row.precio_unitario"
                        :disable="this.disableGuia"
                        :rules="[
                          (val) => this.$refs.rulesVue.isReq(val, ''),
                          (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                        ]"
                        hide-bottom-space
                        @keyup="
                          this.calculaDetalle('precio_unitario', props.row)
                        "
                      >
                      </q-input>
                      <q-item-label
                        v-if="col.name == 'cod_concepto'"
                        caption
                        :class="col.classes ? col.classes : ''"
                        >{{ col.value }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>

        <div
          class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
          style="
            align-self: center;
            text-align: center;
            padding-left: 30px;
            padding-right: 30px;
            padding-top: 30px;
          "
        >
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              v-model="form.valor_declarado_cod"
              label="Valor COD"
              :readonly="true"
              dense
              v-money="money"
              input-class="text-right"
              class="pcform"
              hint=""
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              v-model="form.valor_declarado_seg"
              label="Valor Seguro"
              :readonly="true"
              dense
              class="pcform"
              v-money="money"
              input-class="text-right"
              lazy-rules
              hint=""
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              v-model="form.porc_apl_seguro"
              label="% Seguro"
              :readonly="true"
              v-money="money"
              input-class="text-right"
              class="pcform"
              lazy-rules
              dense
              hint=""
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              dense
              v-model="form.monto_subtotal"
              v-money="money"
              input-class="text-right"
              label="Sub Total:"
              :readonly="true"
              class="pcform"
              lazy-rules
              hint=""
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              dense
              v-model="form.monto_impuesto"
              label="Impuesto:"
              :readonly="true"
              v-money="money"
              input-class="text-right"
              class="pcform"
              lazy-rules
              hint=""
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              dense
              v-model="form.monto_base"
              v-money="money"
              input-class="text-right"
              label="Monto Base:"
              :readonly="true"
              lazy-rules
              hint=""
            >
            </q-input>
          </div>
          <div class="col-md-3 col-xs-12">
            <q-input
              outlined
              dense
              v-model="form.monto_total"
              v-money="money"
              input-class="text-right"
              label="Total"
              :readonly="true"
              class="pcform"
              lazy-rules
              hint=""
            >
            </q-input>
          </div>
          <div class="col-md-3 col-xs-12">
            <q-input
              outlined
              v-model="form.monto_ref_cte_sin_imp"
              label="Monto Ref. Cliente sin IVA"
              v-money="money"
              :readonly="true"
              input-class="text-right"
              lazy-rules
              dense
              hint=""
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12">
            <h4
              style="
                font-size: 12px;
                margin-top: 0px;
                margin-bottom: 0px;
                padding-left: 30px;
              "
            >
              VALOR DÍA
            </h4>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              dense
              v-model="valor_dolar"
              label="Valor Ref:"
              :readonly="true"
              v-money="money"
              input-class="text-right"
              class="pcform"
              lazy-rules
              hint=""
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              dense
              v-model="total_ref"
              v-money="money"
              input-class="text-right"
              label="Total Ref:"
              :readonly="true"
              lazy-rules
              hint=""
            >
            </q-input>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="clienteLabelBox">
      <q-card
        class="q-pa-md"
        bordered
        style="width: 999px; max-width: 80vw; padding-bottom: 0px"
      >
        <q-card-section>
          <q-form @submit="sendDataGuiaClientesParticulares()">
            <div class="row">
              <div
                class="col-md-12 col-xs-12"
                v-if="this.destino == true"
                style="align-self: center; text-align: left; margin-top: -30px"
              >
                <h4 style="font-size: 20px" class="text-secondary">
                  <strong>CLIENTE PARTICULAR DESTINO</strong>
                </h4>
              </div>
              <div
                class="col-md-12 col-xs-12"
                v-else
                style="align-self: center; text-align: left; margin-top: -30px"
              >
                <h4 style="font-size: 20px" class="text-secondary">
                  <strong>CLIENTE PARTICULAR ORIGEN</strong>
                </h4>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientesParticulares.rif_ci"
                  label="RIF/CI"
                  dense
                  :rules="[(val) => this.$refs.rulesVue.isMin(val, 3, '')]"
                  :readonly="this.disableRif"
                  @blur="this.validateExistingClient()"
                  @keyup.enter="this.validateExistingClient()"
                  hint=""
                  lazy-rules
                  class="pcform"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientesParticulares.cod_agencia"
                  label="Agencia"
                  :readonly="this.disableAgencia"
                  hint=""
                  dense
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="agenciasFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'agenciasFiltered',
                        'agencias',
                        'nb_agencia'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="nb_agencia"
                  option-value="id"
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientesParticulares.nb_cliente"
                  label="Cliente"
                  :readonly="this.disableCliente"
                  dense
                  :rules="[(val) => this.$refs.rulesVue.isMin(val, 3, '')]"
                  lazy-rules
                  hint=""
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="pais"
                  label="Pais"
                  :readonly="this.disableInputs"
                  hint=""
                  dense
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="paisesFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'paisesFiltered',
                        'paises',
                        'desc_pais'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="desc_pais"
                  option-value="id"
                  @update:model-value="
                    this.estado = '';
                    this.ciudad = '';
                    this.localidades = [];
                    this.municipios = [];
                    this.parroquias = [];
                    this.ciudades = [];
                    this.formClientesParticulares.cod_localidad = [];
                    this.formClientesParticulares.cod_municipio = [];
                    this.formClientesParticulares.cod_parroquia = [];
                    this.$refs.methods.getData(
                      'estados',
                      'setData',
                      'estados',
                      {
                        headers: {
                          pais: this.pais.id,
                        },
                      }
                    );
                  "
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="estado"
                  dense
                  label="Estado"
                  class="pcform"
                  hint=""
                  :readonly="this.disableInputs"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="estadosFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'estadosFiltered',
                        'estados',
                        'desc_estado'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="desc_estado"
                  option-value="id"
                  @update:model-value="
                    this.formClientesParticulares.cod_parroquia = [];
                    this.formClientesParticulares.cod_municipio = [];
                    this.parroquias = [];
                    this.$refs.methods.getData(
                      'municipios',
                      'setData',
                      'municipios',
                      {
                        headers: {
                          Authorization: ``,
                          estado: this.estado.id,
                        },
                      }
                    );
                    this.$refs.methods.getData(
                      'localidades',
                      'setData',
                      'localidades',
                      {
                        headers: {
                          Authorization: ``,
                          estado: this.estado.id,
                        },
                      }
                    );
                    this.ciudad = '';
                    this.formClientesParticulares.cod_localidad = [];
                    this.$refs.methods.getData(
                      'ciudades',
                      'setData',
                      'ciudades',
                      {
                        headers: {
                          Authorization: ``,
                          estado: this.estado.id,
                        },
                      }
                    );
                  "
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="ciudad"
                  label="Ciudad"
                  dense
                  hint=""
                  :readonly="this.disableInputs"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="ciudadesFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'ciudadesFiltered',
                        'ciudades',
                        'desc_ciudad'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="desc_ciudad"
                  option-value="id"
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientesParticulares.cod_municipio"
                  label="Municipio"
                  hint=""
                  class="pcform"
                  :readonly="this.disableInputs"
                  dense
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="municipiosFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'municipiosFiltered',
                        'municipios',
                        'desc_municipio'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="desc_municipio"
                  option-value="id"
                  lazy-rules
                  @update:model-value="
                    this.formClientesParticulares.cod_parroquia = [];
                    this.$refs.methods.getData(
                      'parroquias',
                      'setData',
                      'parroquias',
                      {
                        headers: {
                          Authorization: ``,
                          municipio:
                            this.formClientesParticulares.cod_municipio.id,
                        },
                      }
                    );
                  "
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientesParticulares.cod_parroquia"
                  label="Parroquia"
                  :readonly="this.disableInputs"
                  hint=""
                  class="pcform"
                  dense
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="parroquiasFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'parroquiasFiltered',
                        'parroquias',
                        'desc_parroquia'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="desc_parroquia"
                  option-value="id"
                  lazy-rules
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientesParticulares.cod_localidad"
                  label="Localidad"
                  hint=""
                  :readonly="this.disableInputs"
                  dense
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  :options="localidadesFiltered"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'localidadesFiltered',
                        'localidades',
                        'desc_localidad'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="desc_localidad"
                  option-value="id"
                  lazy-rules
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientesParticulares.telefonos"
                  label="Telefono"
                  :rules="[(val) => this.$refs.rulesVue.isMin(val, 3, '')]"
                  :readonly="this.disableInputs"
                  class="pcform"
                  dense
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientesParticulares.fax"
                  :readonly="this.disableInputs"
                  label="Fax"
                  dense
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isMin(val, 3, '')]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientesParticulares.direccion"
                  label="Direccion"
                  :readonly="this.disableInputs"
                  :rules="[(val) => this.$refs.rulesVue.isMin(val, 3, '')]"
                  dense
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
            </div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 6px; margin-top: 10px"
            >
              <q-btn
                label="Actualizar Cliente"
                :disable="this.disableInputs"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add"
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

    <q-dialog v-model="pdfView" @show="this.pdfview()">
      <div style="width: 100%; max-width: 80vw">
        <webViewer ref="webViewer" @close-pdf="closePdf"></webViewer>
      </div>
    </q-dialog>

    <div
      class="row q-pa-sm justify-center"
      style="padding-bottom: 0px; padding-top: 0px"
    >
      <q-form ref="formData">
        <div class="row items-center pageStyle">
          <div
            class="row col-md-3 col-xs-12 cardMenus boxStyle"
            style="padding-bottom: 0px; padding-right: 20px; padding-top: 19px"
          >
            <div class="col-md-12 col-xs-6">
              <q-input
                outlined
                v-model="form.nro_documento"
                label="NRO. Documento"
                class="pcmovil"
                hint=""
                :autofocus="true"
                :tabindex="1"
                lazy-rules
                mask="##########"
                @keyup.enter="
                  if (
                    form.nro_documento !== '' &&
                    form.nro_documento !== this.nroRef
                  ) {
                    this.resetFormGuia();
                    this.showTextLoading();
                    this.validationGetGuia();
                  }
                "
                @blur="
                  if (
                    form.nro_documento !== '' &&
                    form.nro_documento !== this.nroRef
                  ) {
                    this.resetFormGuia();
                    this.showTextLoading();
                    this.validationGetGuia();
                  }
                "
                dense
                :rules="[
                  (val) => this.$refs.rulesVue.isReq(val, ''),
                  (val) => this.$refs.rulesVue.isMax(val, 10, ''),
                  (val) => this.$refs.rulesVue.isMin(val, 3, ''),
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    @click="
                      if (form.nro_documento !== '') {
                        this.resetFormGuia();
                        this.showTextLoading();
                        this.validationGetGuia();
                      }
                    "
                    class="cursor-pointer"
                    name="search"
                  />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 col-xs-6">
              <q-input
                outlined
                v-model="nro_factura"
                label="NRO. Factura"
                :disable="true"
                hint=""
                dense
              >
              </q-input>
            </div>
            <div class="col-md-6 col-xs-6">
              <q-input
                outlined
                v-model="nro_doc"
                label="NRO. DOC"
                hint=""
                :disable="true"
                class="pcform pcmovil"
                dense
              >
              </q-input>
            </div>
            <div class="col-md-6 col-xs-6">
              <q-input
                outlined
                v-model="nro_ref"
                label="REF"
                hint=""
                dense
                :disable="true"
              >
              </q-input>
            </div>
          </div>
          <div
            class="col-md-4 col-xs-12 boxStyle"
            style="margin-bottom: 5px; padding-top: 5px"
          >
            <q-card
              class="q-pa-md col-md-4 col-xs-12 cardMenus"
              bordered
              style="padding: 5px"
            >
              <q-card-section
                style="
                  padding-bottom: 5px;
                  padding-left: 10px;
                  padding-right: 10px;
                  padding-top: 13px;
                "
              >
                <div class="row">
                  <div
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="
                        font-size: 16px;
                        margin-bottom: 10px;
                        margin-top: 25px;
                      "
                      class="text-secondary"
                    >
                      <strong>Fechas</strong>
                    </h4>
                  </div>
                  <div class="col-md-6 col-xs-6">
                    <q-input
                      outlined
                      label="Emision"
                      hint=""
                      v-model="form.fecha_emision"
                      :tabindex="2"
                      :disable="this.disableGuia"
                      lazy-rules
                      dense
                      style="padding-bottom: 10px"
                      class="pcform pcmovil"
                      :rules="[(val) => this.$refs.rulesVue.checkDate(val, '')]"
                      mask="##/##/####"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="form.fecha_emision"
                              mask="DD/MM/YYYY"
                              @update:model-value="this.$refs.qDateProxy.hide()"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-6 col-xs-6">
                    <q-input
                      outlined
                      label="Envio"
                      :tabindex="3"
                      :disable="this.disableGuia"
                      hint=""
                      dense
                      style="padding-bottom: 10px"
                      v-model="form.fecha_envio"
                      lazy-rules
                      mask="##/##/####"
                      :rules="[(val) => this.$refs.rulesVue.checkDate(val, '')]"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="form.fecha_envio"
                              mask="DD/MM/YYYY"
                              @update:model-value="this.$refs.qDateProxy.hide()"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                  <div class="col-md-12 col-xs-12">
                    <q-input
                      outlined
                      label="Aplicación"
                      :tabindex="4"
                      :disable="this.disableGuia"
                      hint=""
                      dense
                      style="padding-bottom: 10px"
                      v-model="form.fecha_aplicacion"
                      mask="##/##/####"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="form.fecha_aplicacion"
                              mask="DD/MM/YYYY"
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
          <div
            class="col-md-3 col-xs-12 boxStyle"
            style="margin-bottom: 5px; padding-top: 5px"
          >
            <q-card
              class="q-pa-md col-md-4 col-xs-12 cardMenus"
              bordered
              style="padding: 5px; padding-top: 10px"
            >
              <q-card-section
                style="
                  padding-bottom: 5px;
                  padding-left: 10px;
                  padding-right: 10px;
                  padding-top: 13px;
                "
              >
                <div class="row">
                  <div
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="font-size: 16px; margin-bottom: 10px"
                      class="text-secondary"
                    >
                      <strong>Información de Carga</strong>
                    </h4>
                  </div>
                  <div class="col-md-6 col-xs-6">
                    <q-input
                      outlined
                      dense
                      style="padding-bottom: 10px"
                      v-model="form.nro_piezas"
                      label="Piezas"
                      :tabindex="5"
                      :disable="this.disableGuia"
                      v-money="moneyNotDecimal"
                      input-class="text-right"
                      :rules="[
                        (val) => this.$refs.rulesVue.isReqCurrency(val, ''),
                        (val) => this.$refs.rulesVue.isMax(val, 3, ''),
                      ]"
                      hide-buttom-space
                      class="pcform pcmovil"
                      lazy-rules
                    >
                    </q-input>
                  </div>

                  <div class="col-md-6 col-xs-6">
                    <q-input
                      outlined
                      v-model="form.peso_kgs"
                      ref="formKGS"
                      label="Peso KGS"
                      :tabindex="6"
                      :disable="this.disableGuia"
                      :rules="[
                        (val) => this.$refs.rulesVue.isReqCurrency(val, ''),
                        (val) => this.$refs.rulesVue.isMax(val, 9, ''),
                      ]"
                      v-money="money"
                      input-class="text-right"
                      dense
                      style="padding-bottom: 10px"
                      hide-buttom-space
                      lazy-rules
                    >
                    </q-input>
                  </div>

                  <div class="col-md-6 col-xs-6">
                    <q-checkbox
                      size="lg"
                      v-model="checkbox.paquetes"
                      true-value="1"
                      false-value="0"
                      style="font-size: 13px"
                      label="Paquetes"
                      :tabindex="7"
                      :disable="this.disableGuia"
                      @update:model-value="
                        if (this.checkbox.paquetes == '1') {
                          this.checkbox.sobres = '0';
                        }
                      "
                    />
                  </div>

                  <div class="col-md-6 col-xs-6">
                    <q-checkbox
                      size="lg"
                      v-model="checkbox.sobres"
                      true-value="1"
                      false-value="0"
                      style="font-size: 13px"
                      label="Sobres"
                      :tabindex="8"
                      :disable="this.disableGuia"
                      @update:model-value="
                        if (this.checkbox.sobres == '1') {
                          this.checkbox.paquetes = '0';
                        }
                      "
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="col-md-2 col-xs-12 boxStyle"
            style="margin-bottom: 11px; padding-top: 10px"
          >
            <q-card
              class="q-pa-md col-md-4 col-xs-12"
              bordered
              style="padding: 6px; padding-top: 10px"
            >
              <q-card-section
                style="
                  padding-bottom: 3px;
                  padding-left: 10px;
                  padding-right: 10px;
                "
              >
                <div class="row">
                  <div
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="font-size: 16px; margin-bottom: 8px"
                      class="text-secondary textPago"
                    >
                      <strong>Información de Pago</strong>
                    </h4>
                  </div>
                  <div class="col-md-12 col-xs-12">
                    <q-select
                      outlined
                      v-model="form.modalidad_pago"
                      ref="formModalidadPago"
                      label="Modalidad Pago"
                      :tabindex="9"
                      :disable="this.disableGuia"
                      hint=""
                      :rules="[
                        (val) => this.$refs.rulesVue.isReqSelect(val, ''),
                      ]"
                      dense
                      style="padding-bottom: 10px"
                      :options="modalidad_pago"
                      lazy-rules
                    >
                    </q-select>
                  </div>
                  <div class="col-md-12 col-xs-12">
                    <q-select
                      outlined
                      v-model="form.pagado_en"
                      ref="formPagado"
                      label="Pagado En"
                      :tabindex="10"
                      :disable="this.disableGuia"
                      hint=""
                      :rules="[
                        (val) => this.$refs.rulesVue.isReqSelect(val, ''),
                      ]"
                      dense
                      style="padding-bottom: 10px"
                      :options="pagado_en"
                      lazy-rules
                    >
                    </q-select>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="col-md-3 col-xs-12 boxStyle"
            style="margin-bottom: 10px; padding-right: 7px"
          >
            <q-card
              class="q-pa-md col-md-4 col-xs-12 cardMenus"
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
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="font-size: 16px; margin-bottom: 10px"
                      class="text-secondary"
                    >
                      <strong>Origen</strong>
                    </h4>
                  </div>
                  <div class="col-md-12 col-xs-6">
                    <q-select
                      outlined
                      v-model="form.cod_agencia"
                      label="Agencia"
                      :tabindex="11"
                      :disable="this.disableGuia"
                      ref="formAgencia"
                      dense
                      style="padding-bottom: 20px"
                      @click="
                        this.$q.notify({
                          message:
                            'No es posible modificar la agencia origen. Pues la guía tiene detalle asociado',
                          color: 'red',
                        })
                      "
                      :rules="[
                        (val) => this.$refs.rulesVue.isReqSelect(val, ''),
                      ]"
                      @filter="
                        (val, update, abort) =>
                          filterArray(
                            val,
                            update,
                            abort,
                            'agenciasFiltered',
                            'agencias',
                            'nb_agencia'
                          )
                      "
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      class="pcmovil"
                      hint=""
                      :options="agenciasFiltered"
                      lazy-rules
                      @update:model-value="
                        this.clientes_origen = [];
                        this.agentes = [];
                        this.form.cod_agente_venta = '';
                        this.form.id_clte_part_orig = '';
                        this.$refs.methods.getData(
                          `/clientes`,
                          'setData',
                          'clientes_origen',
                          {
                            headers: {
                              Authorization: ``,
                              agencia: this.form.cod_agencia.id,
                            },
                          }
                        );
                        this.$refs.methods.getData(
                          `/agentes`,
                          'setData',
                          'agentes',
                          {
                            headers: {
                              Authorization: ``,
                              agencia: this.form.cod_agencia.id,
                            },
                          }
                        );
                        this.form.cod_cliente_org = '';
                      "
                      option-label="nb_agencia"
                      option-value="id"
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Sin resultados
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="col-md-12 col-xs-6">
                    <q-select
                      outlined
                      v-model="form.cod_cliente_org"
                      label="Cliente"
                      :tabindex="12"
                      :disable="this.disableGuia"
                      ref="formClienteDestino"
                      :rules="[
                        (val) => this.$refs.rulesVue.isReqSelect(val, ''),
                      ]"
                      hint=""
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      dense
                      style="padding-bottom: 15px"
                      @filter="
                        (val, update, abort) =>
                          filterArray(
                            val,
                            update,
                            abort,
                            'clientes_origenFiltered',
                            'clientes_origen',
                            'nb_cliente'
                          )
                      "
                      :options="clientes_origenFiltered"
                      option-label="nb_cliente"
                      option-value="id"
                      lazy-rules
                      @update:model-value="
                        if (this.form.cod_cliente_org.cte_decontado == 1) {
                          this.clienteClick(false);
                        }
                      "
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Sin resultados
                          </q-item-section>
                        </q-item>
                      </template>
                      <template
                        v-slot:append
                        v-if="this.form.cod_cliente_org.cte_decontado == 1"
                      >
                        <q-icon
                          @click.stop.prevent="this.clienteClick(false)"
                          class="cursor-pointer"
                          name="settings"
                        />
                      </template>
                    </q-select>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-5 col-xs-12 boxStyle" style="margin-bottom: 7px">
            <q-card
              class="q-pa-md col-md-4 col-xs-12 cardMenus"
              bordered
              style="padding: 5px"
            >
              <q-card-section
                style="
                  padding-top: 15px;
                  padding-bottom: 0px;
                  padding-left: 10px;
                  padding-right: 10px;
                "
              >
                <div class="row">
                  <div
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="font-size: 16px; margin-bottom: 10px"
                      class="text-secondary"
                    >
                      <strong>Destino</strong>
                    </h4>
                  </div>
                  <div class="col-md-6 col-xs-6">
                    <q-select
                      outlined
                      v-model="form.cod_agencia_dest"
                      ref="formAgenciaDestino"
                      label="Agencia"
                      :tabindex="13"
                      :disable="this.disableGuia"
                      hint=""
                      dense
                      style="padding-bottom: 20px"
                      use-input
                      hide-selected
                      fill-input
                      :rules="[
                        (val) => this.$refs.rulesVue.isReqSelect(val, ''),
                      ]"
                      input-debounce="0"
                      @filter="
                        (val, update, abort) =>
                          filterArray(
                            val,
                            update,
                            abort,
                            'agenciasDestFiltered',
                            'agencias',
                            'nb_agencia'
                          )
                      "
                      class="pcform pcmovil"
                      :options="agenciasDestFiltered"
                      lazy-rules
                      option-label="nb_agencia"
                      option-value="id"
                      @update:model-value="
                        this.form.id_clte_part_dest = '';
                        this.clientes_destino = [];
                        this.zonas_destino = [];
                        this.$refs.methods.getData(
                          `/clientes`,
                          'setData',
                          'clientes_destino',
                          {
                            headers: {
                              Authorization: ``,
                              agencia: this.form.cod_agencia_dest.id,
                            },
                          }
                        );
                        this.$refs.methods.getData(
                          `/zonas`,
                          'setData',
                          'zonas_destino',
                          {
                            headers: {
                              Authorization: ``,
                              agencia: this.form.cod_agencia_dest.id,
                            },
                          }
                        );
                        this.form.cod_cliente_dest = '';
                        this.form.cod_zona_dest = '';
                      "
                      ><template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Sin resultados
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                  <div class="col-md-6 col-xs-6">
                    <q-select
                      outlined
                      v-model="form.cod_cliente_dest"
                      ref="formClienteDestino"
                      :rules="[
                        (val) => this.$refs.rulesVue.isReqSelect(val, ''),
                      ]"
                      label="Cliente"
                      :tabindex="14"
                      :disable="this.disableGuia"
                      dense
                      style="padding-bottom: 20px"
                      hint=""
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      @filter="
                        (val, update, abort) =>
                          filterArray(
                            val,
                            update,
                            abort,
                            'clientesDestFiltered',
                            'clientes_destino',
                            'nb_cliente'
                          )
                      "
                      :options="clientesDestFiltered"
                      lazy-rules
                      option-label="nb_cliente"
                      option-value="id"
                      @update:model-value="
                        if (this.form.cod_cliente_dest.cte_decontado == 1) {
                          this.clienteClick(true);
                        }
                      "
                    >
                      <template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Sin resultados
                          </q-item-section>
                        </q-item>
                      </template>
                      <template
                        v-slot:append
                        v-if="this.form.cod_cliente_dest.cte_decontado == 1"
                      >
                        <q-icon
                          @click.stop.prevent="this.clienteClick(true)"
                          class="cursor-pointer"
                          name="settings"
                        />
                      </template>
                    </q-select>
                  </div>
                  <div class="col-md-12 col-xs-12">
                    <q-select
                      outlined
                      v-model="form.cod_zona_dest"
                      label="Zona"
                      :tabindex="15"
                      :disable="this.disableGuia"
                      dense
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      @filter="
                        (val, update, abort) =>
                          filterArray(
                            val,
                            update,
                            abort,
                            'zonasFiltered',
                            'zonas_destino',
                            'nb_zona'
                          )
                      "
                      hint=""
                      :options="zonasFiltered"
                      lazy-rules
                      option-label="nb_zona"
                      option-value="id"
                      ><template v-slot:no-option>
                        <q-item>
                          <q-item-section class="text-grey">
                            Sin resultados
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-select>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="col-md-4 col-xs-12 boxStyle"
            style="margin-bottom: 0px; padding-bottom: 5px"
          >
            <q-card
              class="q-pa-md col-md-12 col-xs-12"
              bordered
              style="
                padding-top: 5px;
                padding-bottom: 5px;
                padding-left: 6px;
                padding-right: 0px;
              "
            >
              <q-card-section
                class="row col-md-12 col-xs-12"
                style="
                  padding-bottom: 2px;
                  padding-top: 2px;
                  padding-left: 10px;
                "
              >
                <div
                  class="col-md-2 col-xs-12 items-center"
                  style="align-self: center; text-align: left"
                >
                  <h4
                    style="font-size: 16px; margin-top: 0px; margin-bottom: 0px"
                    class="text-secondary inputServicio"
                  >
                    <strong>Servicio</strong>
                  </h4>
                </div>
                <div
                  class="col-md-5 col-xs-6 checkboxForaneo"
                  style="margin-bottom: 6px"
                >
                  <q-checkbox
                    size="lg"
                    v-model="checkbox.nacional"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px; padding-left: 10px"
                    label="Nacional"
                    :tabindex="16"
                    :disable="this.disableGuia"
                    @update:model-value="
                      if (this.checkbox.nacional == '1') {
                        this.checkbox.internacional = '0';
                      }
                    "
                  />
                </div>
                <div class="col-md-5 col-xs-6" style="margin-bottom: 6px">
                  <q-checkbox
                    size="lg"
                    v-model="checkbox.internacional"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Internacional"
                    :tabindex="17"
                    :disable="this.disableGuia"
                    @update:model-value="
                      if (this.checkbox.internacional == '1') {
                        this.checkbox.nacional = '0';
                      }
                    "
                  />
                </div>
                <div
                  class="col-md-2 col-xs-12 items-center"
                  style="align-self: center; text-align: left"
                >
                  <h4
                    style="font-size: 16px; margin-top: 0px; margin-bottom: 0px"
                    class="text-secondary"
                  >
                    <strong>Ubicación</strong>
                  </h4>
                </div>
                <div
                  class="col-md-5 col-xs-6 checkboxForaneo"
                  style="margin-bottom: 6px"
                >
                  <q-checkbox
                    size="lg"
                    v-model="checkbox.urbano"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px; padding-left: 10px"
                    label="Urbano"
                    :tabindex="18"
                    :disable="this.disableGuia"
                    @update:model-value="
                      if (this.checkbox.urbano == '1') {
                        this.checkbox.extra_urbano = '0';
                      }
                    "
                  />
                </div>
                <div class="col-md-5 col-xs-6" style="margin-bottom: 6px">
                  <q-checkbox
                    size="lg"
                    v-model="checkbox.extra_urbano"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Extra-Urbano"
                    :tabindex="19"
                    :disable="this.disableGuia"
                    @update:model-value="
                      if (this.checkbox.extra_urbano == '1') {
                        this.checkbox.urbano = '0';
                      }
                    "
                  />
                </div>
                <div
                  class="col-md-2 col-xs-12 items-center"
                  style="align-self: center; text-align: left"
                >
                  <h4
                    style="font-size: 16px; margin-top: 0px; margin-bottom: 0px"
                    class="text-secondary"
                  >
                    <strong>Urgencia</strong>
                  </h4>
                </div>
                <div class="col-md-5 col-xs-6 checkboxForaneo">
                  <q-checkbox
                    size="lg"
                    v-model="checkbox.normal"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px; padding-left: 10px"
                    label="Normal"
                    :tabindex="20"
                    :disable="this.disableGuia"
                    @update:model-value="
                      if (this.checkbox.normal == '1') {
                        this.checkbox.emergencia = '0';
                      }
                    "
                  />
                </div>
                <div class="col-md-5 col-xs-6">
                  <q-checkbox
                    size="lg"
                    v-model="checkbox.emergencia"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Emergencia"
                    :tabindex="21"
                    :disable="this.disableGuia"
                    @update:model-value="
                      if (this.checkbox.emergencia == '1') {
                        this.checkbox.normal = '0';
                      }
                    "
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="col-md-6 col-xs-12 lastboxStyle"
            style="margin-bottom: 5px"
          >
            <q-card
              class="q-pa-md col-md-12 col-xs-12 cardMenus"
              bordered
              style="padding: 5px"
            >
              <q-card-section
                style="
                  padding-bottom: 0px;
                  padding-left: 10px;
                  padding-right: 10px;
                "
              >
                <div class="row">
                  <div
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="font-size: 16px; margin-bottom: 5px"
                      class="text-secondary"
                    >
                      <strong>Totales</strong>
                    </h4>
                  </div>
                  <div class="col-md-6 col-xs-12">
                    <q-input
                      outlined
                      v-model="form.monto_subtotal"
                      ref="subtotal"
                      label="Monto Subtotal"
                      hint=""
                      dense
                      :disable="true"
                      v-money="money"
                      input-class="text-right"
                      style="padding-bottom: 10px"
                      class="pcform"
                      :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
                      lazy-rules
                    >
                    </q-input>
                  </div>
                  <div class="col-md-6 col-xs-12">
                    <q-input
                      outlined
                      v-model="form.monto_impuesto"
                      label="Monto Impuesto"
                      hint=""
                      :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
                      dense
                      :disable="true"
                      v-money="money"
                      input-class="text-right"
                      style="padding-bottom: 10px"
                      lazy-rules
                    >
                    </q-input>
                  </div>
                  <div class="col-md-6 col-xs-12">
                    <q-input
                      outlined
                      v-model="form.monto_base"
                      label="Monto Base"
                      v-money="money"
                      input-class="text-right"
                      hint=""
                      :disable="true"
                      :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
                      dense
                      style="padding-bottom: 10px"
                      class="pcform"
                      lazy-rules
                    >
                    </q-input>
                  </div>
                  <div class="col-md-6 col-xs-12">
                    <q-input
                      outlined
                      v-model="form.monto_total"
                      label="Monto Total"
                      v-money="money"
                      input-class="text-right"
                      hint=""
                      :disable="true"
                      :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
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
          <div class="row col-md-6 col-xs-12">
            <div class="row col-md-12 col-xs-12 inputsCard">
              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_agente_venta"
                  label="Recolectado Por:"
                  :tabindex="22"
                  :disable="this.disableGuia"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, '')]"
                  hint=""
                  class="pcform"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  :options="agentesFiltered"
                  style="padding-bottom: 10px"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'agentesFiltered',
                        'agentes',
                        'persona_responsable'
                      )
                  "
                  dense
                  lazy-rules
                  option-label="persona_responsable"
                  option-value="id"
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_proveedor"
                  label="Proveedor del Transporte"
                  hint=""
                  :tabindex="23"
                  :disable="this.disableGuia"
                  use-input
                  hide-selected
                  style="padding-bottom: 10px"
                  fill-input
                  input-debounce="0"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'proveedoresFiltered',
                        'proveedores',
                        'nb_proveedor'
                      )
                  "
                  dense
                  :options="proveedoresFiltered"
                  option-label="nb_proveedor"
                  option-value="id"
                  lazy-rules
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row col-md-12 col-xs-12">
              <div class="col-md-6 col-xs-6">
                <q-input
                  outlined
                  v-model="form.dimensiones"
                  label="Dimensiones"
                  :tabindex="24"
                  :disable="this.disableGuia"
                  dense
                  style="padding-bottom: 10px"
                  hint=""
                  class="pcform pcmovil"
                  @update:model-value="
                    form.dimensiones = form.dimensiones.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>
              <div class="col-md-6 col-xs-6">
                <q-select
                  outlined
                  v-model="form.desc_contenido"
                  label="Contenido"
                  :tabindex="25"
                  :disable="this.disableGuia"
                  hint=""
                  dense
                  style="padding-bottom: 10px"
                  :options="contenido"
                  lazy-rules
                >
                </q-select>
              </div>
            </div>
            <div class="row col-md-12 col-xs-12">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.carga_neta"
                  label="Carga Neta"
                  :tabindex="26"
                  :disable="this.disableGuia"
                  hint=""
                  dense
                  style="padding-bottom: 10px"
                  v-money="money"
                  input-class="text-right"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReqCurrency(val, ''),
                    (val) => this.$refs.rulesVue.isMax(val, 9, ''),
                  ]"
                  class="pcform"
                  lazy-rules
                >
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.valor_declarado_cod"
                  label="COD - Valor Declarado"
                  :tabindex="27"
                  :disable="this.disableGuia"
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
                  dense
                  style="padding-bottom: 10px"
                  v-money="money"
                  input-class="text-right"
                  lazy-rules
                  @keyup="this.calculaCod()"
                >
                </q-input>
              </div>
            </div>
          </div>
          <div class="col-md-2 col-xs-9">
            <q-input
              outlined
              v-model="form.valor_declarado_seg"
              label="Seguro"
              :tabindex="28"
              :disable="this.disableGuia"
              hint=""
              :rules="[(val) => this.$refs.rulesVue.isMax(val, 17, '')]"
              dense
              style="padding-bottom: 10px"
              class="pcform pcmovil"
              v-money="money"
              input-class="text-right"
              lazy-rules
              @keyup="this.calculaPorcSeguro()"
            >
            </q-input>
          </div>
          <div class="col-md-2 col-xs-3">
            <q-input
              outlined
              v-model="form.porc_apl_seguro"
              hint=""
              :rules="[(val) => this.$refs.rulesVue.isMax(val, 7, '')]"
              dense
              label="% Seguro"
              :tabindex="29"
              :disable="
                this.disableGuia
                  ? true
                  : this.form.valor_declarado_seg
                  ? this.curReplace(this.form.valor_declarado_seg) > 0
                    ? false
                    : true
                  : false
              "
              v-money="money"
              input-class="text-right"
              style="padding-bottom: 10px"
              class="pcform"
              lazy-rules
              @keyup="this.setDataSeguro()"
            >
            </q-input>
          </div>
          <div
            class="col-md-2 col-xs-12 margin_bottom"
            style="padding-left: 10px; padding-top: 10px"
          >
            <q-checkbox
              size="lg"
              v-model="form.check_transito"
              true-value="1"
              false-value="0"
              style="font-size: 12px"
              label="PASA POR TRANSITO"
              :tabindex="30"
              :disable="this.disableGuia"
              @update:model-value="this.updateTransito()"
            />
          </div>
          <div class="col-md-3 col-xs-12">
            <q-select
              outlined
              v-model="form.cod_agencia_transito"
              label="Agencia Transito"
              :tabindex="31"
              :disable="
                this.disableGuia
                  ? true
                  : form.check_transito == 0
                  ? true
                  : false
              "
              hint=""
              use-input
              hide-selected
              fill-input
              input-debounce="0"
              @filter="
                (val, update, abort) =>
                  filterArray(
                    val,
                    update,
                    abort,
                    'agenciasTransitoFiltered',
                    'agencias',
                    'nb_agencia'
                  )
              "
              :options="agenciasTransitoFiltered"
              class="pcform"
              option-label="nb_agencia"
              option-value="id"
              dense
              style="padding-bottom: 10px"
              lazy-rules
              ><template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="col-md-3 col-xs-12">
            <q-input
              outlined
              label="Fecha Llegada Transito"
              :tabindex="32"
              hint=""
              use-input
              hide-selected
              fill-input
              :disable="
                this.disableGuia
                  ? true
                  : form.check_transito == 0
                  ? true
                  : false
              "
              dense
              style="padding-bottom: 10px"
              v-model="form.fecha_llega_transito"
              mask="##/##/####"
              lazy-rules
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="form.fecha_llega_transito"
                      mask="DD/MM/YYYY"
                      @update:model-value="this.$refs.qDateProxy.hide()"
                    ></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-md-3 col-xs-12">
            <q-select
              outlined
              v-model="form.estatus_operativo"
              label="Estatus Operacional"
              :tabindex="33"
              :disable="this.disableGuia"
              hint=""
              dense
              class="pcform"
              :options="estatus_operativo"
              lazy-rules
            >
            </q-select>
          </div>
          <div class="col-md-3 col-xs-12">
            <q-select
              outlined
              v-model="form.estatus_administra"
              label="Estatus Administrativo"
              :tabindex="34"
              :disable="this.disableGuia"
              hint=""
              :options="estatus_administrativo"
              class="pcform"
              dense
              lazy-rules
              @update:model-value="this.updateEstatusAdministra()"
            >
            </q-select>
          </div>
          <div class="col-md-2 col-xs-12">
            <q-input
              outlined
              v-model="form.monto_ref_cte_sin_imp"
              label="Monto Referencia Cliente"
              :tabindex="35"
              :disable="this.disableGuia"
              dense
              hint=""
              v-money="money"
              input-class="text-right"
              :rules="[(val) => this.$refs.rulesVue.isMax(val, 17, '')]"
              class="pcform"
              lazy-rules
              @update:model-value="
                this.monto_ref = (
                  this.parseFloatN(
                    this.curReplace(this.form.monto_ref_cte_sin_imp)
                  ) / this.parseFloatN(this.valor_dolar)
                ).toFixed(2)
              "
            >
              <template v-slot:append>
                <q-btn
                  round
                  dense
                  flat
                  icon="input"
                  @click="this.setMontoRef()"
                />
              </template>
            </q-input>
          </div>
          <div class="col-md-1 col-xs-12">
            <q-input
              outlined
              v-model="monto_ref"
              label="Monto Referencia"
              :disable="true"
              dense
              hint=""
              v-money="money"
              input-class="text-right"
              class="pcform"
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-1 col-xs-5">
            <q-input
              outlined
              v-model="form.porc_comision"
              label="% X Zona"
              :tabindex="36"
              :disable="this.disableGuia"
              v-money="money"
              input-class="text-right"
              class="pcform pcmovil"
              hint=""
              dense
              lazy-rules
            >
            </q-input>
          </div>
          <div class="col-md-1 col-xs-4">
            <q-input
              outlined
              v-model="form.porc_descuento"
              label="% Desc"
              :tabindex="37"
              :disable="this.disableGuia"
              v-money="money"
              input-class="text-right"
              class="pcform pcmovil"
              hint=""
              :rules="[(val) => this.$refs.rulesVue.isMax(val, 7, '')]"
              dense
              lazy-rules
            >
            </q-input>
          </div>
          <q-inner-loading :showing="visible">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </div>
      </q-form>
    </div>

    <q-dialog v-model="clientesDeletePopUp">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estas seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="reversarPopUp">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estas seguro que quieres reversar esta guia?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Reversar"
            color="primary"
            v-close-popup
            @click="
              this.reversada = true;
              this.closeDialogs();
              this.sendDataGuia();
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="saveDetallesPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            La guía no esta completa. ¿Desea guardar con estatus en
            elaboración?...
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            color="primary"
            @click="this.saveDetails = null"
            v-close-popup
          />
          <q-btn
            flat
            label="Guardar"
            color="primary"
            v-close-popup
            @click="this.saveDetails = true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="validateDetallesPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            La guía está tarificada, una vez que se encuentre completa no podrá
            ser modificada. ¿Está seguro de que la misma esta completa?..."
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="NO"
            color="primary"
            @click="validateDetails = null"
            v-close-popup
          />
          <q-btn
            flat
            label="SI"
            color="primary"
            v-close-popup
            @click="validateDetails = true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Guia="setDataGuia"
      @reset-Loading="resetLoading"
      @set-Data-Detalle="setDataDetalle"
      @set-Data-Permisos="setDataPermisos"
    >
    </methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { api } from "boot/axios";
import { VMoney } from "v-money";
import methodsVue from "src/components/methods.vue";
import webViewerVue from "src/components/webViewer.vue";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";

export default {
  directives: { money: VMoney },
  components: {
    methods: methodsVue,
    webViewer: webViewerVue,
    VMoney,
    rulesVue,
  },
  name: "registroServicioCarga",
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
      columnsConceptos: [
        {
          label: "Conceptos",
          field: (row) => row.conceptos.desc_concepto,
          name: "cod_concepto",
          align: "left",
        },
        {
          name: "cantidad",
          label: "Cantidad",
          field: "cantidad",
          align: "right",
        },
        {
          name: "precio_unitario",
          label: "Precio Unitario",
          field: "precio_unitario",
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
          name: "importe_renglon",
          label: "Importe Renglon",
          field: "importe_renglon",
          align: "right",
        },
      ],
      form: {
        fecha_elab: "",
        check_elab: null,
        check_pe: "",
        fecha_pe: "",
        nro_documento: "",
        t_de_documento: "GC",
        serie_documento: "",
        id_clte_part_dest: "",
        id_clte_part_orig: "",
        ci_rif_cte_conta_dest: "",
        ci_rif_cte_conta_org: "",
        fecha_emision: moment().format("DD/MM/YYYY"),
        fecha_envio: moment().format("DD/MM/YYYY"),
        fecha_aplicacion: "00/00/0000",
        nro_piezas: "",
        peso_kgs: "",
        tipo_carga: "",
        modalidad_pago: "",
        pagado_en: "",
        cod_agencia: "",
        cod_cliente_org: "",
        cod_agencia_dest: "",
        cod_cliente_dest: "",
        cod_zona_dest: "",
        tipo_servicio: "",
        tipo_ubicacion: "",
        tipo_urgencia: "",
        cod_agente_venta: "",
        cod_proveedor: "",
        dimensiones: "",
        desc_contenido: "",
        carga_neta: "",
        valor_declarado_cod: "",
        valor_declarado_seg: "",
        porc_apl_seguro: "",
        saldo: "0",
        cod_agencia_transito: "",
        monto_subtotal: "",
        monto_impuesto: "",
        monto_base: "",
        monto_total: "",
        fecha_llega_transito: "",
        check_transito: "0",
        estatus_operativo: "",
        estatus_administra: "",
        monto_ref_cte_sin_imp: "",
        porc_comision: "",
        porc_descuento: "",
        porc_impuesto: "",
        comision_venta: 0,
        comision_seg_vta: 0,
        base_comision_vta_rcl: "",
        base_comision_seg: 0,
        monto_fpo: 0,
        cod_fpo: "",
        id: "",
      },
      formClientes: {
        nb_cliente: "",
        rif_cedula: "",
        nit: "",
        dir_correo: "",
        dir_fiscal: "",
        email: "",
        tlf_cliente: "",
        fax: "",
        razon_social: "",
        descripcion: "",
        tipo_persona: "",
        modalidad_pago: "",
        persona_contacto: "",
        observacion: "",
        cte_decontado: "",
        tipo_persona_new: "",
        flag_activo: "",
        cod_agencia: [],
        cod_ciudad: [],
        cod_agente: [],
        cod_municipio: [],
        cod_parroquia: [],
        cod_localidad: [],
      },
      formClientesParticulares: {
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
      checkbox: {
        guia_factura: "0",
        guia_carga: "0",
        paquetes: "0",
        sobres: "0",
        nacional: "0",
        internacional: "0",
        urbano: "0",
        extra_urbano: "0",
        normal: "0",
        emergencia: "0",
      },
      saveDetails: false,
      validateDetails: false,
      rpermisos: [],
      nro_factura: "",
      nro_doc: "",
      nro_ref: "",
      disableAgencia: true,
      disableInputs: true,
      disableRif: true,
      disableCliente: true,
      disableGuia: true,
      pais: "",
      estado: "",
      ciudad: "",
      clienteLabel: "",
      destino: false,
      cliente: false,
      base64:
        "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CmVuZG9iagoKOSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UcnVlVHlwZS9CYXNlRm9udC9CQUFBQUErQXJpYWwtQm9sZE1UCi9GaXJzdENoYXIgMAovTGFzdENoYXIgMTEKL1dpZHRoc1s3NTAgNzIyIDYxMCA4ODkgNTU2IDI3NyA2NjYgNjEwIDMzMyAyNzcgMjc3IDU1NiBdCi9Gb250RGVzY3JpcHRvciA3IDAgUgovVG9Vbmljb2RlIDggMCBSCj4+CmVuZG9iagoKMTAgMCBvYmoKPDwKL0YxIDkgMCBSCj4+CmVuZG9iagoKMTEgMCBvYmoKPDwvRm9udCAxMCAwIFIKL1Byb2NTZXRbL1BERi9UZXh0XT4+CmVuZG9iagoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDQgMCBSL1Jlc291cmNlcyAxMSAwIFIvTWVkaWFCb3hbMCAwIDU5NSA4NDJdL0dyb3VwPDwvUy9UcmFuc3BhcmVuY3kvQ1MvRGV2aWNlUkdCL0kgdHJ1ZT4+L0NvbnRlbnRzIDIgMCBSPj4KZW5kb2JqCgoxMiAwIG9iago8PC9Db3VudCAxL0ZpcnN0IDEzIDAgUi9MYXN0IDEzIDAgUgo+PgplbmRvYmoKCjEzIDAgb2JqCjw8L1RpdGxlPEZFRkYwMDQ0MDA3NTAwNkQwMDZEMDA3OTAwMjAwMDUwMDA0NDAwNDYwMDIwMDA2NjAwNjkwMDZDMDA2NT4KL0Rlc3RbMSAwIFIvWFlaIDU2LjcgNzczLjMgMF0vUGFyZW50IDEyIDAgUj4+CmVuZG9iagoKNCAwIG9iago8PC9UeXBlL1BhZ2VzCi9SZXNvdXJjZXMgMTEgMCBSCi9NZWRpYUJveFsgMCAwIDU5NSA4NDIgXQovS2lkc1sgMSAwIFIgXQovQ291bnQgMT4+CmVuZG9iagoKMTQgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDQgMCBSCi9PdXRsaW5lcyAxMiAwIFIKPj4KZW5kb2JqCgoxNSAwIG9iago8PC9BdXRob3I8RkVGRjAwNDUwMDc2MDA2MTAwNkUwMDY3MDA2NTAwNkMwMDZGMDA3MzAwMjAwMDU2MDA2QzAwNjEwMDYzMDA2ODAwNkYwMDY3MDA2OTAwNjEwMDZFMDA2RTAwNjkwMDczPgovQ3JlYXRvcjxGRUZGMDA1NzAwNzIwMDY5MDA3NDAwNjUwMDcyPgovUHJvZHVjZXI8RkVGRjAwNEYwMDcwMDA2NTAwNkUwMDRGMDA2NjAwNjYwMDY5MDA2MzAwNjUwMDJFMDA2RjAwNzIwMDY3MDAyMDAwMzIwMDJFMDAzMT4KL0NyZWF0aW9uRGF0ZShEOjIwMDcwMjIzMTc1NjM3KzAyJzAwJyk+PgplbmRvYmoKCnhyZWYKMCAxNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMTE5OTcgMDAwMDAgbiAKMDAwMDAwMDAxOSAwMDAwMCBuIAowMDAwMDAwMjI0IDAwMDAwIG4gCjAwMDAwMTIzMzAgMDAwMDAgbiAKMDAwMDAwMDI0NCAwMDAwMCBuIAowMDAwMDExMTU0IDAwMDAwIG4gCjAwMDAwMTExNzYgMDAwMDAgbiAKMDAwMDAxMTM2OCAwMDAwMCBuIAowMDAwMDExNzA5IDAwMDAwIG4gCjAwMDAwMTE5MTAgMDAwMDAgbiAKMDAwMDAxMTk0MyAwMDAwMCBuIAowMDAwMDEyMTQwIDAwMDAwIG4gCjAwMDAwMTIxOTYgMDAwMDAgbiAKMDAwMDAxMjQyOSAwMDAwMCBuIAowMDAwMDEyNDk0IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSAxNi9Sb290IDE0IDAgUgovSW5mbyAxNSAwIFIKL0lEIFsgPEY3RDc3QjNEMjJCOUY5MjgyOUQ0OUZGNUQ3OEI4RjI4Pgo8RjdENzdCM0QyMkI5RjkyODI5RDQ5RkY1RDc4QjhGMjg+IF0KPj4Kc3RhcnR4cmVmCjEyNzg3CiUlRU9GCg==",
      reversada: false,
      agencias: [],
      agenciasFiltered: [],
      paises: [],
      estados: [],
      ciudades: [],
      municipios: [],
      parroquias: [],
      localidades: [],
      paisesFiltered: [],
      estadosFiltered: [],
      ciudadesFiltered: [],
      municipiosFiltered: [],
      parroquiasFiltered: [],
      localidadesFiltered: [],
      detalle_movimiento: [],
      clientes_origen: [],
      clientes_origenFiltered: [],
      clientes_destino: [],
      zonas_destino: [],
      agentes: [],
      proveedores: [],
      proveedoresFiltered: [],
      agenciasDestFiltered: [],
      clientesDestFiltered: [],
      agentesFiltered: [],
      zonasFiltered: [],
      proveedoresFiltered: [],
      agenciasTransitoFiltered: [],
      estatus_operativo: [
        { label: "EN PROCESO DE ENVIÓ", value: "PR" },
        { label: "PENDIENTE POR ENTREGAR", value: "PE" },
        { label: "ENTREGA CONFORME", value: "CO" },
        { label: "ENTREGA NO CONFORME", value: "NC" },
      ],
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
      pagado_en: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      modalidad_pago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
        { label: "PREPAGADA", value: "PP" },
      ],
      contenido: [
        {
          label: "EQUIPOS Y ACCESORIOS DE COMPUTACION",
          value: "EQUIPOS Y ACCESORIOS DE COMPUTACION",
        },
        { label: "EQUIPOS CELULARES", value: "EQUIPOS CELULARES" },
        { label: "REPUESTOS", value: "REPUESTOS" },
        { label: "PARABRISAS Y/O VIDRIOS", value: "PARABRISAS Y/O VIDRIOS" },
        { label: "DOCUMENTOS", value: "DOCUMENTOS" },
        { label: "VARIOS", value: "VARIOS" },
      ],
      pagination: {
        rowsPerPage: 10,
        sortBy: "nro_item",
        descending: false,
      },
      nroRef: "",
      iva: 0,
      monto_ref: 0,
      total_ref: 0,
      valor_dolar: 0,
    };
  },
  setup() {
    const visible = ref(false);
    const showSimulatedReturnData = ref(false);
    const $q = useQuasar();
    return {
      formData: null,
      formAgencia: null,
      formAgenciaDestino: null,
      formClienteDestino: null,
      formKGS: null,
      formPagado: null,
      formModalidadPago: null,
      detalleCantidad: null,
      detalleImporteRenglon: null,
      detallePrecioUnitario: null,
      visible,
      showSimulatedReturnData,
      showTextLoading() {
        visible.value = true;
        showSimulatedReturnData.value = false;
      },
      resetLoading() {
        visible.value = false;
        showSimulatedReturnData.value = true;
      },
      anulate: ref(false),
      separator: ref("vertical"),
      loading: ref(false),
      clientesDeletePopUp: ref(false),
      saveDetallesPopUp: ref(false),
      validateDetallesPopUp: ref(false),
      detalle: ref(false),
      clienteLabelBox: ref(false),
      pdfView: ref(false),
      filter: ref(""),
      clientesBox: ref(false),
      reversarPopUp: ref(false),
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Mantenimiento - Registro Servicio Carga",
      ""
    );

    document.addEventListener("keydown", this.comandoteclas);
    this.$refs.methods.getData(`/paises`, `setData`, `paises`);
    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "registroserviciocarga",
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
  },
  methods: {
    closePdf() {
      this.pdfView = false;
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
    // Metodo para Acciones con Comando de Teclado
    comandoteclas(event) {
      if (event.ctrlKey && !(event.altKey || event.shiftKey || event.metaKey)) {
        switch (event.keyCode) {
          case 71:
            event.preventDefault();
            this.closeDialogs();
            this.sendDataGuia();
            break;
          case 76:
            event.preventDefault();
            this.closeDialogs();
            this.limpiarGuia();
            break;
          case 73:
            event.preventDefault();
            this.closeDialogs();
            this.pdfView = true;
            break;
          case 82:
            event.preventDefault();
            this.closeDialogs();
            this.reversar();
            break;
          case 70:
            event.preventDefault();
            this.closeDialogs();
            this.tarificar();
            break;
          case 68:
            event.preventDefault();
            this.closeDialogs();
            this.showDetalle();
            break;
          default:
            break;
        }
      }
    },
    // Metodo para mostrar PDF en funcion de BASE 64
    pdfview() {
      this.$refs.webViewer.showpdf(this.base64);
    },
    // Metodo para mostart el Detalle de Documento
    showDetalle() {
      if (!this.agencias[0]) {
        this.$q.notify({
          message: "Debe Cargar una Guía",
          color: "red",
        });
        return;
      }
      if (!this.detalle_movimiento[0]) {
        this.$q.notify({
          message: "La Guía no está Tarifeada",
          color: "red",
        });
        return;
      }
      this.detalle = true;
    },
    // Metodo para filtrar Selects con Busqueda de Usuario
    filterArray(val, update, abort, pagina, array, element) {
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
    // Metodo para validar por RIF si un cliente ya existe
    validateExistingClient() {
      if (this.formClientesParticulares.rif_ci !== "") {
        api
          .get(`/cparticulares`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: this.destino
                ? this.form.cod_agencia_dest.id
                : this.form.cod_agencia.id,
              rif: this.formClientesParticulares.rif_ci,
              activo: "S",
            },
          })
          .then((res) => {
            if (res.data.data[0]) {
              this.setDataClientesParticulares(res.data.data[0]);
              this.disableInputs = false;
              this.disableRif = true;
              return;
            } else {
              this.disableInputs = false;
              this.disableCliente = false;
              this.disableRif = true;
            }
          });
      }
    },
    // Metodo para abrir pagina especificada en otra pestaña
    pushToWindow(pagina) {
      let route = this.$router.resolve({ path: pagina });
      window.open(route.href);
    },
    // Metodo para reversar una Guía
    reversar() {
      if (!this.agencias[0]) {
        this.$q.notify({
          message: "Debe cargar una Guia",
          color: "red",
        });
        return;
      }
      if (
        !(
          this.form.estatus_administra.value == "F" ||
          this.form.estatus_administra.value == "P"
        )
      ) {
        this.$q.notify({
          message:
            "La guía no puede ser reversada bajo el Estatus Administrativo en el que se encuentra.",
          color: "red",
        });
        return;
      }
      if (this.allowOption(5)) {
        this.$q.notify({
          message: "No tiene Permiso para reversar esta Guia",
          color: "red",
        });
        return;
      }
      this.reversarPopUp = true;
    },
    // Metodo para Buscar Item en Array de Objetos y Setear un Valor al conseguirlo
    filterAndSet(
      array,
      codigo,
      searched,
      selectedOption,
      selectedOptionValue,
      itemLabel
    ) {
      var find = this[array].findIndex((item) => item[codigo] == searched);
      if (find >= 0) {
        this[selectedOption][selectedOptionValue] = this[array][find];
        return;
      }
      if (codigo == "id") {
        this[selectedOption][selectedOptionValue] = {
          [itemLabel]: "",
          id: null,
        };
        return;
      }
      this[selectedOption][selectedOptionValue] = { label: "", value: null };
    },
    // Metodo para Buscar Item en Array de Objetos, retornar True al conseguirlo y False al no encontrarlo
    filterAndReturn(array, codigo, searched) {
      return this[array].findIndex((item) => item[codigo] == searched);
    },
    // Pasar un numero a numero con dos decimales en formato correcto para efectuar operaciones
    parseFloatN(number) {
      number = Math.round(number * 100) / 100;
      return number;
    },
    updateTransito() {
      if (this.form.check_transito == "0") {
        this.form.cod_agencia_transito = "";
        this.form.fecha_llega_transito = null;
      } else {
        this.form.fecha_llega_transito = moment().format("DD/MM/YYYY");
      }
    },
    updateEstatusAdministra() {
      this.disableGuia =
        this.form.estatus_administra.value == "E" ? false : true;
    },
    // Metodo para Tarificar una Guía
    async tarificar() {
      try {
        var error = true;
        var form = JSON.parse(JSON.stringify(this.form));
        form.nro_piezas = this.curReplace(form.nro_piezas);
        form.peso_kgs = this.curReplace(form.peso_kgs);
        form.porc_apl_seguro = this.curReplace(form.porc_apl_seguro);
        form.porc_descuento = this.curReplace(form.porc_descuento);
        form.carga_neta = this.curReplace(form.carga_neta);
        form.porc_comision = this.curReplace(form.porc_comision);
        form.valor_declarado_seg = this.curReplace(form.valor_declarado_seg);
        form.valor_declarado_cod = this.curReplace(form.valor_declarado_cod);

        var monto_basico;
        var kgr_minimos;
        var kgs_adicionales;
        var monto_kg_ad;
        var dif_comision;
        var comision;
        var porc_otros;
        var val_declarado_otros;
        var monto_otros = 0;
        var monto_base;
        var monto_seguro = 0;
        var porc_cod;
        var monto_cod = 0;
        var errorMessage;
        var monto_especial;
        if (this.checkbox.paquetes == "1") form.tipo_carga = "PM";
        if (this.checkbox.sobres == "1") form.tipo_carga = "SB";
        if (this.checkbox.nacional == "1") form.tipo_servicio = "N";
        if (this.checkbox.internacional == "1") form.tipo_servicio = "I";
        if (this.checkbox.urbano == "1") form.tipo_ubicacion = "U";
        if (this.checkbox.extra_urbano == "1") form.tipo_ubicacion = "E";
        if (this.checkbox.foraneo == "1") form.tipo_ubicacion = "F";
        if (this.checkbox.normal == "1") form.tipo_urgencia = "N";
        if (this.checkbox.emergencia == "1") form.tipo_urgencia = "E";
        if (!this.form.cod_agencia.id) {
          this.$q.notify({
            message: "Debe Cargar una Guia",
            color: "red",
          });
          return;
        }
        if (this.detalle_movimiento[0]) {
          this.$q.notify({
            message: "La guía ya fue Tarificada",
            color: "red",
          });
          return;
        }
        if (form.estatus_administra.value == "A") {
          this.$q.notify({
            message:
              "La Guía no puede ser tarifeada cuando se encuentra anulada",
            color: "red",
          });
          return;
        }
        if (!form.cod_agencia) {
          this.$q.notify({
            message: "Debe ingresar la Agencia Origen antes de tarifear",
            color: "red",
          });
          return;
        }
        if (!form.cod_cliente_org) {
          this.$q.notify({
            message: "Debe ingresar el Cliente Origen antes de tarifear",
            color: "red",
          });
          return;
        }
        if (!form.cod_agencia_dest) {
          this.$q.notify({
            message: "Debe ingresar la Agencia Destino antes de tarifear",
            color: "red",
          });
          return;
        }
        if (!form.cod_cliente_dest) {
          this.$q.notify({
            message: "Debe ingresar el Cliente Destino antes de tarifear",
            color: "red",
          });
          return;
        }
        if (form.peso_kgs == 0.0) {
          this.$q.notify({
            message: "Debe ingresar la cantidad de KG antes de tarifear",
            color: "red",
          });
          return;
        }
        if (!form.modalidad_pago) {
          this.$q.notify({
            message: "Debe ingresar la modalidad de pago antes de tarifear",
            color: "red",
          });
          return;
        }
        if (!form.pagado_en) {
          this.$q.notify({
            message:
              "Debe ingresar donde será pagada la guía antes de tarifear",
            color: "red",
          });
          return;
        }
        if (
          !(this.checkbox.extra_urbano !== "0" || this.checkbox.urbano !== "0")
        ) {
          this.$q.notify({
            message: "Debe ingresar el tipo de ubicación antes de tarifear",
            color: "red",
          });
          return;
        }
        if (
          !(this.checkbox.emergencia !== "0" || this.checkbox.normal !== "0")
        ) {
          this.$q.notify({
            message: "Debe ingresar el tipo de urgencia antes de tarifear",
            color: "red",
          });
          return;
        }
        if (!(this.checkbox.paquetes !== "0" || this.checkbox.sobres !== "0")) {
          this.$q.notify({
            message: "Debe ingresar el tipo de carga antes de tarifear",
            color: "red",
          });
          return;
        }
        if (!this.form.cod_agencia.ciudades.cod_region) {
          this.$q.notify({
            message:
              "Error del Sistema... No existe un Codigo de Region para la Agencia Origen Seleccionada",
            color: "red",
          });
          return;
        }
        if (!this.form.cod_agencia_dest.ciudades.cod_region) {
          this.$q.notify({
            message:
              "Error del Sistema... No existe un Codigo de Region para la Agencia Destino Seleccionada",
            color: "red",
          });
          return;
        }

        // setear los valores del concepto básico
        this.detalle_movimiento[0] = {
          id: 0,
          cod_movimiento: null,
          nro_item: 1,
          conceptos: {
            desc_concepto: "",
            check_impuesto: null,
            check_comision: null,
          },
          cod_concepto: null,
          precio_unitario: null,
          cantidad: null,
          importe_renglon: null,
          cod_concepto_oper: null,
        };

        this.showTextLoading();

        // tarificar mínimo
        await api
          .get(`/vcontrol/4`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[0].cod_concepto = res.data.valor;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // Se incluye este aparte para calcular el diferencial del minimo y el valor declarado
        await api
          .get(`/cfacturacion/${this.detalle_movimiento[0].cod_concepto}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[0].conceptos.check_comision =
              res.data.check_comision;
            this.detalle_movimiento[0].conceptos.check_impuesto =
              res.data.check_impuesto;
            this.detalle_movimiento[0].conceptos.desc_concepto =
              res.data.desc_concepto;
            this.detalle_movimiento[0].cod_concepto_oper =
              res.data.cod_concepto;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // Buscar tarifa básica
        await api
          .get(`/tarifas`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              tipo_tarifa: "BA",
              tipo_urgencia: form.tipo_urgencia,
              tipo_ubicacion: form.tipo_ubicacion,
              tipo_carga: form.tipo_carga,
            },
          })
          .then((res) => {
            if (!res.data[0]) {
              errorMessage =
                "Problemas al ubicar la tarifa básica. Revisar mantenimiento de tarifas";
              return error;
            }
            if (
              res.data[0].monto_tarifa == null ||
              res.data[0].monto_tarifa == "" ||
              res.data[0].monto_tarifa == 0
            ) {
              errorMessage =
                "Problemas al ubicar el monto de la tarifa básica. Revisar mantenimiento de tarifas";
              return error;
            }
            if (
              res.data[0].kgr_hasta == null ||
              res.data[0].kgr_hasta == "" ||
              res.data[0].kgr_hasta == 0
            ) {
              errorMessage =
                "Problemas al ubicar los Kgs. minimos de la tarifa básica. Revisar mantenimiento de tarifas";
              return error;
            }
            monto_basico = res.data[0].monto_tarifa;
            kgr_minimos = res.data[0].kgr_hasta;

            // Se incluye este aparte para calcular el diferencial del minimo y el valor declarado
            if (form.peso_kgs > 30) {
              val_declarado_otros = form.monto_ref_cte_sin_imp
                ? this.curReplace(form.monto_ref_cte_sin_imp)
                : 0;
              porc_otros = this.curReplace(form.porc_comision);
              comision = (
                (this.parseFloatN(val_declarado_otros) *
                  this.parseFloatN(porc_otros)) /
                100
              ).toFixed(2);
              dif_comision =
                this.parseFloatN(comision) - this.parseFloatN(monto_basico);

              if (dif_comision >= 0) {
                monto_basico =
                  this.parseFloatN(monto_basico) +
                  this.parseFloatN(dif_comision);
              }
            }

            this.detalle_movimiento[0].cantidad = kgr_minimos / 100;
            this.detalle_movimiento[0].precio_unitario =
              (this.parseFloatN(monto_basico) / this.parseFloatN(kgr_minimos)) *
              100;
            this.detalle_movimiento[0].importe_renglon =
              this.parseFloatN(monto_basico).toFixed(2);
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // setear los valores del concepto kg adicionales
        this.detalle_movimiento[1] = {
          id: 0,
          cod_movimiento: null,
          nro_item: 2,
          conceptos: {
            desc_concepto: "",
            check_impuesto: null,
            check_comision: null,
          },
          cod_concepto: null,
          precio_unitario: null,
          cantidad: null,
          importe_renglon: null,
          cod_concepto_oper: null,
        };

        // tarificar kg adicionales
        await api
          .get(`/vcontrol/5`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[1].cod_concepto = res.data.valor;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // buscar si el concepto acepta comisiones y vale para el iva
        await api
          .get(`/cfacturacion/${this.detalle_movimiento[1].cod_concepto}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[1].conceptos.check_comision =
              res.data.check_comision;
            this.detalle_movimiento[1].conceptos.check_impuesto =
              res.data.check_impuesto;
            this.detalle_movimiento[1].conceptos.desc_concepto =
              res.data.desc_concepto;
            this.detalle_movimiento[1].cod_concepto_oper =
              res.data.cod_concepto;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        var axiosConfig;
        if (form.tipo_ubicacion == "U" && form.modalidad_pago.value == "CO") {
          axiosConfig = {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              pagado_en: form.pagado_en.value,
              tipo_ubicacion: form.tipo_ubicacion,
              modalidad_pago: "CO",
              tipo_tarifa: "KA",
              tipo_urgencia: form.tipo_urgencia,
              region_origen: form.cod_agencia.ciudades.cod_region,
              region_destino: form.cod_agencia_dest.ciudades.cod_region,
              mix_region: "S",
            },
          };
        }
        if (form.tipo_ubicacion == "U" && form.modalidad_pago.value == "CR") {
          axiosConfig = {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              tipo_ubicacion: form.tipo_ubicacion,
              tipo_tarifa: "KA",
              modalidad_pago: "CR",
              tipo_urgencia: form.tipo_urgencia,
              region_origen: form.cod_agencia.ciudades.cod_region,
              region_destino: form.cod_agencia_dest.ciudades.cod_region,
              mix_region: "S",
            },
          };
        }
        if (form.tipo_ubicacion == "E") {
          axiosConfig = {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              tipo_ubicacion: "E",
              tipo_tarifa: "KA",
              tipo_urgencia: form.tipo_urgencia,
              region_origen: form.cod_agencia.ciudades.cod_region,
              region_destino: form.cod_agencia_dest.ciudades.cod_region,
              mix_region: "S",
            },
          };
        }

        // Buscar tarifa kg adicionales
        await api
          .get(`/tarifas`, axiosConfig)
          .then((res) => {
            if (!res.data[0]) {
              errorMessage =
                "Problemas al ubicar la tarifa de Kgs. Adicionales. Revisar mantenimiento de tarifas";
              return error;
            }
            if (
              res.data[0].kgr_hasta == null ||
              res.data[0].kgr_hasta == "" ||
              res.data[0].kgr_hasta == 0
            ) {
              errorMessage =
                "Problemas al ubicar el monto de los Kgs. adicionales. Revisar mantenimiento de tarifas";
              return error;
            }

            if (form.peso_kgs > kgr_minimos) {
              kgs_adicionales =
                this.parseFloatN(form.peso_kgs) - this.parseFloatN(kgr_minimos);
            } else {
              kgs_adicionales = 0;
            }

            // Se incluye este aparte para calcular el diferencial del minimo y el valor declarado
            if (form.peso_kgs > 30) {
              monto_kg_ad = 0;
            } else {
              monto_kg_ad =
                this.parseFloatN(Math.round(kgs_adicionales)) *
                this.parseFloatN(res.data[0].monto_tarifa);
            }

            this.detalle_movimiento[1].cantidad = this.parseFloatN(
              Math.round(kgs_adicionales)
            ).toFixed(0);
            this.detalle_movimiento[1].importe_renglon =
              this.parseFloatN(monto_kg_ad).toFixed(2);
            this.detalle_movimiento[1].precio_unitario = this.parseFloatN(
              res.data[0].monto_tarifa
            ).toFixed(2);
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // setear los valores del concepto otros
        this.detalle_movimiento[2] = {
          id: 0,
          cod_movimiento: null,
          nro_item: 3,
          conceptos: {
            desc_concepto: "",
            check_impuesto: null,
            check_comision: null,
          },
          cod_concepto: null,
          precio_unitario: null,
          cantidad: 1,
          importe_renglon: null,
          cod_concepto_oper: null,
        };

        // tarificar otros
        await api
          .get(`/vcontrol/6`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[2].cod_concepto = res.data.valor;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // buscar si el concepto acepta comisiones y vale para el iva
        await api
          .get(`/cfacturacion/${this.detalle_movimiento[2].cod_concepto}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[2].conceptos.check_comision =
              res.data.check_comision;
            this.detalle_movimiento[2].conceptos.check_impuesto =
              res.data.check_impuesto;
            this.detalle_movimiento[2].conceptos.desc_concepto =
              res.data.desc_concepto;
            this.detalle_movimiento[2].cod_concepto_oper =
              res.data.cod_concepto;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // Se incluye esta tarifa para manejar precio actualizado del $.
        await api
          .get(`/tarifas`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              tipo_urgencia: "B",
              tipo_ubicacion: form.tipo_ubicacion,
              region_origen: form.cod_agencia.ciudades.cod_region,
              region_destino: form.cod_agencia_dest.ciudades.cod_region,
              mix_region: "S",
            },
          })
          .then((res) => {
            monto_especial = !res.data[0] ? 0 : res.data[0].monto_tarifa;

            //Se incluye este aparte para calcular el diferencial del minimo y el valor declarado
            if (form.peso_kgs > 30) {
              monto_otros = 0;
              //Se incluye esta tarifa para manejar precio actualizado del $.
              if (monto_especial > 0 && monto_basico < monto_especial) {
                monto_otros =
                  this.parseFloatN(monto_especial) -
                  this.parseFloatN(monto_basico);
              }
            } else {
              val_declarado_otros = form.monto_ref_cte_sin_imp
                ? form.monto_ref_cte_sin_imp
                : 0;
              porc_otros = form.porc_comision;
              comision =
                (this.curReplace(val_declarado_otros) *
                  this.curReplace(porc_otros)) /
                100;
              monto_base =
                this.parseFloatN(monto_basico) + this.parseFloatN(monto_kg_ad);
              if (comision > 0) {
                dif_comision =
                  this.parseFloatN(monto_base) - this.parseFloatN(comision);
                monto_otros =
                  dif_comision >= 0
                    ? 0
                    : this.parseFloatN(comision) - this.parseFloatN(monto_base);

                //Se incluye esta tarifa para manejar precio actualizado del $.
                if (
                  monto_especial > 0 &&
                  comision < monto_especial &&
                  this.parseFloatN(monto_especial) -
                    this.parseFloatN(monto_base) >
                    0
                ) {
                  monto_otros =
                    this.parseFloatN(monto_especial) -
                    this.parseFloatN(monto_base);
                }
              }
            }
            this.detalle_movimiento[2].importe_renglon = monto_otros.toFixed(2);
            this.detalle_movimiento[2].precio_unitario = monto_otros.toFixed(2);
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // setear los valores del concepto seguros
        this.detalle_movimiento[3] = {
          id: 0,
          cod_movimiento: null,
          nro_item: 4,
          conceptos: {
            desc_concepto: "",
            check_impuesto: null,
            check_comision: null,
          },
          cod_concepto: null,
          precio_unitario: null,
          cantidad: 1,
          importe_renglon: null,
          cod_concepto_oper: null,
        };

        // tarificar seguro
        await api
          .get(`/vcontrol/9`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[3].cod_concepto = res.data.valor;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        //buscar si el concepto acepta comisiones y vale para el iva
        await api
          .get(`/cfacturacion/${this.detalle_movimiento[3].cod_concepto}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[3].conceptos.check_comision =
              res.data.check_comision;
            this.detalle_movimiento[3].conceptos.check_impuesto =
              res.data.check_impuesto;
            this.detalle_movimiento[3].conceptos.desc_concepto =
              res.data.desc_concepto;
            this.detalle_movimiento[3].cod_concepto_oper =
              res.data.cod_concepto;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        monto_seguro =
          (this.parseFloatN(form.valor_declarado_seg) *
            this.parseFloatN(form.porc_apl_seguro)) /
          100;
        this.detalle_movimiento[3].precio_unitario = monto_seguro.toFixed(2);
        this.detalle_movimiento[3].importe_renglon = monto_seguro.toFixed(2);

        // setear los valores del concepto COD
        this.detalle_movimiento[4] = {
          id: 0,
          cod_movimiento: null,
          nro_item: 5,
          conceptos: {
            desc_concepto: "",
            check_impuesto: null,
            check_comision: null,
          },
          cod_concepto: null,
          precio_unitario: null,
          cantidad: 1,
          importe_renglon: null,
          cod_concepto_oper: null,
        };

        // tarificar COD
        await api
          .get(`/vcontrol/8`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[4].cod_concepto = res.data.valor;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        await api
          .get(`/cfacturacion/${this.detalle_movimiento[4].cod_concepto}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[4].conceptos.check_comision =
              res.data.check_comision;
            this.detalle_movimiento[4].conceptos.check_impuesto =
              res.data.check_impuesto;
            this.detalle_movimiento[4].conceptos.desc_concepto =
              res.data.desc_concepto;
            this.detalle_movimiento[4].cod_concepto_oper =
              res.data.cod_concepto;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        await api
          .get(`/vcontrol/10`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            porc_cod = res.data.valor;
            monto_cod =
              (this.parseFloatN(form.valor_declarado_cod) *
                this.parseFloatN(porc_cod)) /
              100;
            this.detalle_movimiento[4].precio_unitario = monto_cod.toFixed(2);
            this.detalle_movimiento[4].importe_renglon = monto_cod.toFixed(2);
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // setear los valores del concepto gastos reembolsables
        this.detalle_movimiento[5] = {
          id: 0,
          cod_movimiento: null,
          nro_item: 6,
          conceptos: {
            desc_concepto: "",
            check_impuesto: null,
            check_comision: null,
          },
          cod_concepto: null,
          precio_unitario: 0,
          cantidad: 1,
          importe_renglon: 0,
          cod_concepto_oper: null,
        };

        // tarificar gastos reembolsables
        await api
          .get(`/vcontrol/18`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[5].cod_concepto = res.data.valor;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        //buscar si el concepto acepta comisiones y vale para el iva
        await api
          .get(`/cfacturacion/${this.detalle_movimiento[5].cod_concepto}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.detalle_movimiento[5].conceptos.check_comision =
              res.data.check_comision;
            this.detalle_movimiento[5].conceptos.check_impuesto =
              res.data.check_impuesto;
            this.detalle_movimiento[5].conceptos.desc_concepto =
              res.data.desc_concepto;
            this.detalle_movimiento[5].cod_concepto_oper =
              res.data.cod_concepto;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        // setear los valores de los totales
        this.calculaTotales();

        this.$q.notify({
          message: "Guia Tarificada",
          color: "green",
        });
        this.detalle = true;
        this.resetLoading();
      } catch (error) {
        if (errorMessage) {
          this.detalle_movimiento = [];
          this.resetLoading();
          this.$q.notify({
            message: errorMessage,
            color: "red",
          });
          errorMessage = "";
        }
      }
    },
    // Metodo para que una funcion no avance hasta que se cumpla una condicion
    async until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
      };
      return new Promise(poll);
    },
    // Metodo para Validar si Guia Existe y hacer Get de la Misma
    async validationGetGuia() {
      try {
        var errorMessage = null;
        var cod_agencia;
        var cod_cliente;
        var cod_agente;
        this.nroRef = this.form.nro_documento;

        await api
          .get(`/mmovimientos`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              nro_documento: this.form.nro_documento,
              tipo: "GC",
            },
          })
          .then((res) => {
            if (res.data.data[0]) {
              this.setDataGuia(res.data.data);
              return stopFuction;
            }
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return stopFuction;
          });

        await api
          .get(`/cguias`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              desde_fact: this.form.nro_documento,
              hasta_fact: this.form.nro_documento,
              tipo: 20,
            },
          })
          .then((res) => {
            if (res.data.data[0]) {
              cod_agencia = res.data.data[0].cod_agencia;
              cod_cliente = res.data.data[0].cod_cliente;
              cod_agente = res.data.data[0].cod_agente;
            } else {
              errorMessage =
                "El numero de guía no se encuentra en inventario. Debe asignar el numero antes de continuar";
              return stopFuction;
            }
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return stopFuction;
          });

        await api
          .get(`/ginutilizadas`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: cod_agencia,
              nro_guia: this.form.nro_documento,
            },
          })
          .then((res) => {
            if (res.data.data[0]) {
              errorMessage =
                "No se puede seleccionar la Guía, ya que la misma está Inutilizada...!";
              return stopFuction;
            }
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return stopFuction;
          });

        await api
          .get(`/agencias`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.agencias = res.data.data;
            if (this.filterAndReturn("agencias", "id", cod_agencia) >= 0) {
              this.form.cod_agencia =
                this.agencias[
                  this.filterAndReturn("agencias", "id", cod_agencia)
                ];
            }
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return stopFuction;
          });
        await api
          .get(`/clientes`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: this.form.cod_agencia.id,
            },
          })
          .then((res) => {
            this.clientes_origen = res.data.data;
            if (this.filterAndReturn("clientes_origen", "id", cod_cliente) >= 0)
              this.form.cod_cliente_org =
                this.clientes_origen[
                  this.filterAndReturn("clientes_origen", "id", cod_cliente)
                ];
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return stopFuction;
          });
        await api
          .get(`/agentes`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: this.form.cod_agencia.id,
            },
          })
          .then((res) => {
            this.agentes = res.data.data;
            if (this.filterAndReturn("agentes", "id", cod_agente) >= 0)
              this.form.cod_agente_venta =
                this.agentes[this.filterAndReturn("agentes", "id", cod_agente)];
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return stopFuction;
          });
        await api
          .get(`/proveedores`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              tipo_servicio: "TP",
              order_by: "nb_proveedor",
              order_direction: "ASC",
            },
          })
          .then((res) => {
            this.proveedores = res.data.data;
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return stopFuction;
          });

        await api
          .get(`/hdolar/`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              fecha: moment(this.form.fecha_emision, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              ),
            },
          })
          .then((res) => {
            this.valor_dolar = res.data.data[0].valor;
          })
          .catch(() => {
            errorMessage =
              "Error del Sistema. No se pudo encontrar el valor del Dolar correspondiente a la fecha del día";
            return error;
          });

        this.form.tipo_servicio = "N";
        this.form.tipo_ubicacion = "U";
        this.form.tipo_urgencia = "N";
        this.form.check_transito = 0;
        this.form.estatus_operativo = this.estatus_operativo[0];
        this.form.check_pe = 1;
        var date = moment().format("DD/MM/YYYY");
        this.form.fecha_pe = date;
        this.form.fecha_elab = date;
        this.form.fecha_emision = date;
        this.form.fecha_envio = date;
        this.form.fecha_aplicacion = "00/00/0000";
        this.form.estatus_administra = this.estatus_administrativo[0];
        this.updateEstatusAdministra();
        this.checkbox.nacional = "1";
        this.checkbox.urbano = "1";
        this.checkbox.normal = "1";
        this.form.check_elab = 1;
        this.checkbox.paquetes = "1";
        this.form.check_transito = "0";
        this.resetLoading();
      } catch (stopFuction) {
        if (errorMessage) {
          this.resetFormGuia();
          this.resetLoading();
          this.$q.notify({
            message: errorMessage,
            color: "red",
          });
        }
      }
    },
    // Metodo para Extraer Datos de Tabla de Detalles de Movimiento
    getDataDetalles() {
      this.loading = true;
      this.$refs.methods.getData(
        `/dmovimientos`,
        "setDataDetalle",
        "detalle_movimiento",
        {
          headers: {
            cod_movimiento: this.form.id,
            order_by: this.pagination.sortBy,
            order_direction: this.pagination.descending ? "DESC" : "ASC",
          },
        }
      );
    },
    // Metodo para Setear Datos de Detalles de Movimiento
    setDataDetalle(res) {
      this.detalle_movimiento = res.data;
      this.loading = false;
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Setear Datos de Guia
    async setDataGuia(res) {
      try {
        var errorMessage;
        var res = res[0];
        var cod_agencia = res.cod_agencia;
        var cod_cliente_org = res.cod_cliente_org;
        var cod_agencia_dest = res.cod_agencia_dest;
        var cod_zona_dest = res.cod_zona_dest;
        var cod_cliente_dest = res.cod_cliente_dest;
        var cod_agente_venta = res.cod_agente_venta;
        var cod_agencia_transito = res.cod_agencia_transito;
        var cod_proveedor = res.cod_proveedor;
        this.form.nro_piezas = res.nro_piezas;
        this.form.id = res.id;
        this.getDataDetalles();
        this.form.peso_kgs = res.peso_kgs;
        this.form.serie_documento = res.serie_documento;
        this.form.fecha_elab = res.fecha_elab;
        this.form.check_elab = res.check_elab;
        this.form.check_pe = res.check_pe;
        this.form.fecha_pe = res.fecha_pe;
        this.form.saldo = res.saldo;
        this.form.nro_piezas = res.nro_piezas;
        this.form.peso_kgs = res.peso_kgs;
        this.form.monto_subtotal = res.monto_subtotal;
        this.form.monto_impuesto = res.monto_impuesto;
        this.form.monto_base = res.monto_base;
        this.form.monto_total = res.monto_total;
        this.filterAndSet(
          "modalidad_pago",
          "value",
          res.modalidad_pago,
          "form",
          "modalidad_pago"
        );
        this.filterAndSet(
          "pagado_en",
          "value",
          res.pagado_en,
          "form",
          "pagado_en"
        );
        this.filterAndSet(
          "estatus_operativo",
          "value",
          res.estatus_operativo,
          "form",
          "estatus_operativo"
        );
        this.filterAndSet(
          "estatus_administrativo",
          "value",
          res.estatus_administra,
          "form",
          "estatus_administra"
        );

        this.updateEstatusAdministra();

        if (
          !res.nro_ctrl_doc_ppal &&
          res.serie_doc_principal &&
          res.nro_doc_principal
        ) {
          this.nro_factura = `${res.serie_doc_principal}-${res.nro_doc_principal}`;
        } else if (!res.nro_ctrl_doc_ppal_new && res.nro_ctrl_doc_ppal) {
          this.nro_factura = res.nro_ctrl_doc_ppal.padStart(4, "0000");
        } else if (!res.serie_doc_principal && res.nro_ctrl_doc_ppal_new) {
          this.nro_factura = res.nro_ctrl_doc_ppal_new.padStart(9, "00-000000");
        } else if (res.serie_doc_principal && res.nro_ctrl_doc_ppal_new) {
          this.nro_factura =
            `${res.serie_doc_principal}-${res.nro_ctrl_doc_ppal_new}`.padStart(
              9,
              "00-000000"
            );
        }

        if (!res.nro_ctrl_doc_ppal) {
          this.nro_ref = "";
        } else if (res.cod_ag_doc_ppal && res.nro_doc_principal) {
          this.nro_ref = `${res.cod_ag_doc_ppal}-${res.nro_doc_principal}`;
        }

        if (!res.nro_ctrl_doc_ppal) {
          this.nro_doc = "";
        } else {
          this.nro_doc = res.nro_ctrl_doc_ppal.padStart(4, "0000");
        }

        await api
          .get(`/hdolar/`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              fecha: moment(res.fecha_emision, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              ),
            },
          })
          .then((res) => {
            this.valor_dolar = res.data.data[0].valor;
          })
          .catch(() => {
            errorMessage =
              "Error del Sistema. No se pudo encontrar el valor del Dolar correspondiente a la fecha de Emisión de esta Guía";
            return error;
          });

        this.form.id_clte_part_dest = res.id_clte_part_dest;
        this.form.id_clte_part_orig = res.id_clte_part_orig;
        this.form.dimensiones = res.dimensiones;
        this.form.desc_contenido = res.desc_contenido;
        this.form.carga_neta = res.carga_neta;
        this.form.valor_declarado_cod = res.valor_declarado_cod;
        this.form.valor_declarado_seg = res.valor_declarado_seg;
        this.form.porc_apl_seguro = res.porc_apl_seguro;
        this.form.check_transito = res.check_transito;
        this.form.monto_ref_cte_sin_imp = res.monto_ref_cte_sin_imp;
        this.form.porc_comision = res.porc_comision;
        this.form.porc_descuento = res.porc_descuento;
        this.form.base_comision_vta_rcl = res.base_comision_vta_rcl;
        this.form.base_comision_seg = res.base_comision_seg;
        this.total_ref = (res.monto_total / this.valor_dolar).toFixed(2);

        if (res.fecha_emision) this.form.fecha_emision = res.fecha_emision;
        if (res.fecha_envio) this.form.fecha_envio = res.fecha_envio;
        if (res.fecha_aplicacion)
          this.form.fecha_aplicacion = res.fecha_aplicacion
            ? res.fecha_aplicacion
            : "00/00/0000";
        if (res.fecha_llega_transito)
          this.form.fecha_llega_transito = res.fecha_llega_transito;

        if (res.tipo_carga == "PM") this.checkbox.paquetes = "1";
        if (res.tipo_carga == "SB") this.checkbox.sobres = "1";
        if (res.tipo_servicio == "N") this.checkbox.nacional = "1";
        if (res.tipo_servicio == "I") this.checkbox.internacional = "1";
        if (res.tipo_ubicacion == "U") this.checkbox.urbano = "1";
        if (res.tipo_ubicacion == "E") this.checkbox.extra_urbano = "1";
        if (res.tipo_urgencia == "N") this.checkbox.normal = "1";
        if (res.tipo_urgencia == "E") this.checkbox.emergencia = "1";

        var axiosConfig = {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            agencia: cod_agencia,
          },
        };

        await api
          .get(`/agencias`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.agencias = res.data.data;
            this.filterAndSet(
              "agencias",
              "id",
              cod_agencia,
              "form",
              "cod_agencia",
              "nb_agencia"
            );
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        await api
          .get(`/agentes`, axiosConfig)
          .then((res) => {
            this.agentes = res.data.data;
            if (cod_agente_venta) {
              this.filterAndSet(
                "agentes",
                "id",
                cod_agente_venta,
                "form",
                "cod_agente_venta",
                "nb_agente"
              );
            }
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        await api
          .get(`/proveedores`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              tipo_servicio: "TP",
              order_by: "nb_proveedor",
              order_direction: "ASC",
            },
          })
          .then((res) => {
            this.proveedores = res.data.data;
            this.filterAndSet(
              "proveedores",
              "id",
              cod_proveedor,
              "form",
              "cod_proveedor",
              "nb_proveedor"
            );
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        await api
          .get(`/clientes`, axiosConfig)
          .then((res) => {
            this.clientes_origen = res.data.data;
            this.filterAndSet(
              "clientes_origen",
              "id",
              cod_cliente_org,
              "form",
              "cod_cliente_org",
              "nb_cliente"
            );
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        this.filterAndSet(
          "agencias",
          "id",
          cod_agencia_dest,
          "form",
          "cod_agencia_dest",
          "nb_agencia"
        );

        await api
          .get(`/clientes`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: cod_agencia_dest,
            },
          })
          .then((res) => {
            this.clientes_destino = res.data.data;
            this.filterAndSet(
              "clientes_destino",
              "id",
              cod_cliente_dest,
              "form",
              "cod_cliente_dest",
              "nb_cliente"
            );
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        await api
          .get(`/zonas`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: cod_agencia_dest,
            },
          })
          .then((res) => {
            this.zonas_destino = res.data;
            this.filterAndSet(
              "zonas_destino",
              "id",
              cod_zona_dest,
              "form",
              "cod_zona_dest",
              "nb_zona"
            );
          })
          .catch((err) => {
            if (err.response) {
              errorMessage = err.response.data.message;
            }
            return error;
          });

        this.filterAndSet(
          "agencias",
          "id",
          cod_agencia_transito,
          "form",
          "cod_agencia_transito",
          "nb_agencia"
        );

        this.resetLoading();
      } catch (error) {
        this.resetFormGuia();
        this.resetLoading();
        this.$q.notify({
          message: errorMessage,
          color: "red",
        });
      }
    },
    // Metodo para Guardar Datos de Guia
    async sendDataGuia() {
      this.showTextLoading();
      var errorMessage = null;
      var guia;
      var comisionVenta;
      var comisionSeguro;
      var comVta = "";
      var comSeg = "";
      this.saveDetails = false;
      var form = JSON.parse(JSON.stringify(this.form));
      this.$refs.formData.validate().then(async (valid) => {
        try {
          // Verifica los datos requeridos
          if (!valid) {
            errorMessage = "Este campo es requerido";
            return stopFuction;
          }
          // Verifica el estatus administrativo antes de guardar
          if (
            this.reversada != true &&
            !(
              form.estatus_administra.value == "E" ||
              form.estatus_administra.value == "P" ||
              form.estatus_administra.value == "G" ||
              form.estatus_administra.value == "F"
            )
          ) {
            errorMessage =
              "La guía no puede ser modificada bajo el estatus administrativo en el que se encuentra...";
            return stopFuction;
          }
          // Veriica el DPT en cliente origen
          if (form.cod_cliente_org.cte_decontado == 1) {
            if (form.id_clte_part_orig) {
              await api
                .get(`/cparticulares/${form.id_clte_part_orig}`, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .then((res) => {
                  if (
                    !res.data.cod_municipio ||
                    !res.data.cod_parroquia ||
                    !res.data.cod_localidad
                  ) {
                    this.resetFormClientes();
                    this.clienteLabelBox = true;
                    this.destino = false;
                    this.clienteLabel = "origen";
                    this.setDataClientesParticulares(res.data);
                    errorMessage = "Debe completar la DPT del Cliente Origen";
                    return stopFuction;
                  }
                });
            } else {
              this.resetFormClientes();
              this.disableRif = false;
              this.clienteLabelBox = true;
              this.destino = false;
              this.clienteLabel = "origen";
              this.formClientesParticulares.cod_agencia = form.cod_agencia;
              errorMessage = "Debe crear el Cliente Particular Origen";
              return stopFuction;
            }
          } else {
            for (var i = 0; i <= this.clientes_origen.length - 1; i++) {
              if (this.clientes_origen[i].id == form.cod_cliente_org.id) {
                if (
                  !this.clientes_origen[i].cod_municipio ||
                  !this.clientes_origen[i].cod_parroquia ||
                  !this.clientes_origen[i].cod_localidad
                ) {
                  this.cliente = false;
                  this.clientesBox = true;
                  this.resetFormClientes();
                  this.setDataClientes(this.clientes_origen[i]);
                  errorMessage = "Debe completar la DPT del Cliente Origen";
                  return stopFuction;
                }
              }
            }
          }
          // Veriica el DPT en cliente destino
          if (form.cod_cliente_dest.cte_decontado == 1) {
            if (form.id_clte_part_dest) {
              await api
                .get(`/cparticulares/${form.id_clte_part_dest}`, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .then((res) => {
                  if (
                    !res.data.cod_municipio ||
                    !res.data.cod_parroquia ||
                    !res.data.cod_localidad
                  ) {
                    this.resetFormClientes();
                    this.clienteLabelBox = true;
                    this.clienteLabel = "destino";
                    this.destino = true;
                    this.setDataClientesParticulares(res.data);
                    errorMessage = "Debe completar la DPT del Cliente Destino";
                    return stopFuction;
                  }
                });
            } else {
              this.$q.notify({
                message: "Debe crear el Cliente Particular Destino",
                color: "red",
              });
              this.resetFormClientes();
              this.disableRif = false;
              this.clienteLabelBox = true;
              this.destino = true;
              this.clienteLabel = "destino";
              this.formClientesParticulares.cod_agencia = form.cod_agencia_dest;
              errorMessage = "Debe crear el Cliente Particular Destino";
              return stopFuction;
            }
          } else {
            for (var i = 0; i <= this.clientes_destino.length - 1; i++) {
              if (this.clientes_destino[i].id == form.cod_cliente_dest.id) {
                if (
                  !this.clientes_destino[i].cod_municipio ||
                  !this.clientes_destino[i].cod_parroquia ||
                  !this.clientes_destino[i].cod_localidad
                ) {
                  this.resetFormClientes();
                  this.cliente = true;
                  this.clientesBox = true;
                  this.setDataClientes(this.clientes_destino[i]);
                  errorMessage = "Debe completar la DPT del Cliente Destino";
                  return stopFuction;
                }
              }
            }
          }

          form.estatus_administra = form.estatus_administra.value;
          form.estatus_operativo = form.estatus_operativo.value;
          form.cod_agencia = form.cod_agencia.id;
          form.cod_agente_venta = form.cod_agente_venta.id;
          form.cod_cliente_dest = form.cod_cliente_dest.id;
          form.cod_cliente_org = form.cod_cliente_org.id;
          form.cod_agencia_dest = form.cod_agencia_dest.id;
          form.cod_agencia_transito = form.cod_agencia_transito
            ? form.cod_agencia_transito.id
            : null;
          form.cod_zona_dest = form.cod_zona_dest
            ? form.cod_zona_dest.id
            : null;
          form.cod_proveedor = form.cod_proveedor
            ? form.cod_proveedor.id
            : null;
          if (this.checkbox.paquetes == "1") form.tipo_carga = "PM";
          if (this.checkbox.sobres == "1") form.tipo_carga = "SB";
          if (this.checkbox.nacional == "1") form.tipo_servicio = "N";
          if (this.checkbox.internacional == "1") form.tipo_servicio = "I";
          if (this.checkbox.urbano == "1") form.tipo_ubicacion = "U";
          if (this.checkbox.extra_urbano == "1") form.tipo_ubicacion = "E";
          if (this.checkbox.foraneo == "1") form.tipo_ubicacion = "F";
          if (this.checkbox.normal == "1") form.tipo_urgencia = "N";
          if (this.checkbox.emergencia == "1") form.tipo_urgencia = "E";
          form.modalidad_pago = form.modalidad_pago.value;
          form.desc_contenido = form.desc_contenido
            ? form.desc_contenido.value
            : null;
          form.pagado_en = form.pagado_en.value;

          if (form.fecha_envio)
            form.fecha_envio = moment(form.fecha_envio, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            );
          if (form.valor_declarado_cod)
            form.valor_declarado_cod = this.curReplace(
              form.valor_declarado_cod
            );
          if (form.valor_declarado_seg)
            form.valor_declarado_seg = this.curReplace(
              form.valor_declarado_seg
            );
          if (form.monto_ref_cte_sin_imp)
            form.monto_ref_cte_sin_imp = this.curReplace(
              form.monto_ref_cte_sin_imp
            );
          if (form.nro_piezas)
            form.nro_piezas = this.curReplace(form.nro_piezas);
          if (form.peso_kgs) form.peso_kgs = this.curReplace(form.peso_kgs);
          if (form.monto_subtotal)
            form.monto_subtotal = this.curReplace(form.monto_subtotal);
          if (form.monto_impuesto)
            form.monto_impuesto = this.curReplace(form.monto_impuesto);
          if (form.monto_total)
            form.monto_total = this.curReplace(form.monto_total);
          if (form.monto_base)
            form.monto_base = this.curReplace(form.monto_base);
          if (form.porc_apl_seguro)
            form.porc_apl_seguro = this.curReplace(form.porc_apl_seguro);
          if (form.porc_descuento)
            form.porc_descuento = this.curReplace(form.porc_descuento);
          if (form.carga_neta)
            form.carga_neta = this.curReplace(form.carga_neta);
          if (form.porc_comision)
            form.porc_comision = this.curReplace(form.porc_comision);
          if (form.fecha_aplicacion)
            form.fecha_aplicacion =
              form.fecha_aplicacion != "00/00/0000"
                ? moment(form.fecha_aplicacion, "DD/MM/YYYY").format(
                    "YYYY-MM-DD"
                  )
                : null;
          if (form.fecha_emision)
            form.fecha_emision = moment(
              form.fecha_emision,
              "DD/MM/YYYY"
            ).format("YYYY-MM-DD");
          if (form.fecha_llega_transito)
            form.fecha_llega_transito =
              form.fecha_llega_transito != "00/00/0000"
                ? moment(form.fecha_llega_transito, "DD/MM/YYYY").format(
                    "YYYY-MM-DD"
                  )
                : null;
          if (form.fecha_pe)
            form.fecha_pe = moment(form.fecha_pe, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            );
          if (form.fecha_elab)
            form.fecha_elab = moment(form.fecha_elab, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            );

          // Si la guia tiene detalles, valida el mismo
          if (this.detalle_movimiento[0]) {
            this.validateDetails = false;
            if (this.reversada != true) {
              this.validateDetallesPopUp = true;
              await this.until(
                (_) =>
                  this.validateDetails == true || this.validateDetails == null
              );
              if (this.validateDetails == null) return stopFuction;
            }
            for (var i = 0; i <= this.detalle_movimiento.length - 1; i++) {
              if (
                this.$refs.rulesVue.isMax(
                  this.detalle_movimiento[i].cantidad,
                  9,
                  false
                ) ||
                this.$refs.rulesVue.isReq(
                  this.detalle_movimiento[i].cantidad,
                  false
                )
              ) {
                errorMessage = `Error en Cantidad de Detalle ${this.detalle_movimiento[i].conceptos.desc_concepto}`;
                return stopFuction;
              }
              if (
                this.$refs.rulesVue.isMax(
                  this.detalle_movimiento[i].importe_renglon,
                  15,
                  false
                ) ||
                this.$refs.rulesVue.isReq(
                  this.detalle_movimiento[i].importe_renglon,
                  false
                )
              ) {
                errorMessage = `Error en Importe Renglon de Detalle ${this.detalle_movimiento[i].conceptos.desc_concepto}`;
                return stopFuction;
              }
              if (
                this.$refs.rulesVue.isMax(
                  this.detalle_movimiento[i].precio_unitario,
                  15,
                  false
                ) ||
                this.$refs.rulesVue.isReq(
                  this.detalle_movimiento[i].precio_unitario,
                  false
                )
              ) {
                errorMessage = `Error en Precio Unitario de Detalle ${this.detalle_movimiento[i].conceptos.desc_concepto}`;
                return stopFuction;
              }
            }

            this.detalle = false;

            if (!form.cod_agente_venta) {
              this.$q.notify({
                message:
                  "Error de Usuario. Debe ingresar el agente que recolecto la carga antes de completar la guía",
                color: "red",
              });
              return;
            }

            // Se genera la comisión del agente que realizo la venta
            if (form.base_comision_vta_rcl > 0) {
              //buscar comisión por venta del agente
              await api
                .get(`/agentes/${form.cod_agente_venta}`, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .then((res) => {
                  if (
                    !res.data.porc_comision_venta ||
                    res.data.porc_comision_venta == 0
                  ) {
                    errorMessage =
                      "Error del Sistema. Problemas al buscar el % de comisión por venta. Revise el % del agente para que sea posible generar la comisión...";
                    return stopFuction;
                  } else {
                    form.comision_venta = (
                      (this.parseFloatN(res.data.porc_comision_venta) *
                        this.parseFloatN(form.base_comision_vta_rcl)) /
                      100
                    ).toFixed(2);
                  }
                });
            }

            // Se genera la comisión del seguro
            if (form.base_comision_seg > 0) {
              //buscar comisión por venta del agente
              await api
                .get(`/agentes/${form.cod_agente_venta}`, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .then((res) => {
                  if (
                    !res.data.porc_comision_seguro ||
                    res.data.porc_comision_seguro == 0
                  ) {
                    errorMessage =
                      "Error del Sistema. Problemas al buscar el % de comisión por seguro. Revise el % del agente para que sea posible generar la comisión...";
                    return stopFuction;
                  } else {
                    form.comision_seg_vta = (
                      (this.parseFloatN(res.data.porc_comision_seguro) *
                        this.parseFloatN(form.base_comision_seg)) /
                      100
                    ).toFixed(2);
                  }
                });
            }

            if (form.estatus_administra !== "G") form.estatus_administra = "F";
            form.check_pxfac = 1;
            form.fecha_pxfac = moment().format("YYYY-MM-DD");

            // Guarda el FPO
            if (this.curReplace(form.peso_kgs) >= 0.001) {
              await api
                .get(`/fpos`, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    fecha: moment().format("YYYY-MM-DD"),
                    peso: form.peso_kgs,
                  },
                })
                .then((res) => {
                  if (res.data.length > 0) {
                    form.cod_fpo = res.data[0].cod_fpo;
                    form.monto_fpo = res.data[0].valor;
                  }
                });
            }
          } else {
            // Si no tiene detalles
            this.saveDetallesPopUp = true;
            await this.until(
              (_) => this.saveDetails == true || this.saveDetails == null
            );
            if (this.saveDetails == null) return stopFuction;
          }

          // Si la guia es nueva, rebaja la cantidad disponible
          if (form.id == "") {
            await api
              .get(`/cguias`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  desde_fact: form.nro_documento,
                  hasta_fact: form.nro_documento,
                  tipo: 20,
                },
              })
              .then((res) => {
                if (res.data.data[0]) {
                  guia = res.data.data[0];
                  guia.cant_disponible = guia.cant_disponible - 1;
                } else {
                  errorMessage =
                    "No hay una Guía registrada para este Número de Documento...";
                  return stopFuction;
                }
              });

            delete guia.tipos;

            await api
              .put(`/cguias/${guia.id}`, guia, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .catch(() => {
                errorMessage =
                  "Error del Sistema. Problemas al actualizar el inventario de guías. Comuníquese con el proveedor del Sistemas...";
                return stopFuction;
              });
          }

          // Guarda la guia
          if (form.id !== "") {
            if (form.id_clte_part_dest == "") delete form.id_clte_part_dest;
            if (form.id_clte_part_orig == "") delete form.id_clte_part_orig;
            if (this.reversada == true) {
              form.estatus_administra = "E";
              form.check_elab = 1;
              this.disableGuia = false;
            } else {
              this.disableGuia = true;
            }

            this.filterAndSet(
              "estatus_administrativo",
              "value",
              form.estatus_administra,
              "form",
              "estatus_administra"
            );

            this.updateEstatusAdministra();

            await api
              .put(`/mmovimientos/${form.id}`, form, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                this.reversada = false;
                this.destino = false;
                this.cliente = false;
                this.saveDetails = false;
              })
              .catch(() => {
                this.reversada = false;
                this.destino = false;
                this.saveDetails = false;
                this.cliente = false;
                errorMessage =
                  "Error del Sistema. Problemas al actualizar los datos Generales de la Guía. Comuníquese con el proveedor del Sistemas...";
                return stopFuction;
              });
          } else {
            delete form.id;
            if (form.id_clte_part_dest == "") delete form.id_clte_part_dest;
            if (form.id_clte_part_orig == "") delete form.id_clte_part_orig;
            await api
              .post(`/mmovimientos`, form, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                this.form.id = res.data.id;
              })
              .catch(() => {
                errorMessage =
                  "Error del Sistema. Problemas al crear los datos Generales de la Guía. Comuníquese con el proveedor del Sistemas...";
                return stopFuction;
              });
          }

          // Si tiene detalles, lo guarda y guarda las comisiones
          if (this.detalle_movimiento.length > 0) {
            // Busca la comision de Venta
            await api
              .get(`/ccomisiones`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  cod_movimiento: this.form.id,
                  tipo: "V",
                },
              })
              .then((res) => {
                if (res.data.data[0]) {
                  comVta = res.data.data[0].id;
                  comisionVenta = {
                    cod_agencia: form.cod_agencia,
                    cod_agente: form.cod_agente_venta,
                    cod_movimiento: this.form.id,
                    fecha_emision: form.fecha_emision,
                    monto_comision: form.comision_venta,
                    estatus: 0,
                  };
                } else {
                  comisionVenta = {
                    cod_agencia: form.cod_agencia,
                    cod_agente: form.cod_agente_venta,
                    cod_movimiento: this.form.id,
                    fecha_emision: form.fecha_emision,
                    monto_comision: form.comision_venta,
                    tipo_comision: "V",
                    estatus: 0,
                  };
                }
              })
              .catch(() => {
                errorMessage =
                  "Error del Sistema. Problemas al encontrar comisiones. Comuníquese con el proveedor del Sistemas";
                return stopFuction;
              });

            // Guarda la comision de Ventas
            if (comVta != "") {
              await api
                .put(`/ccomisiones/${comVta}`, comisionVenta, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .catch(() => {
                  errorMessage =
                    "Error del Sistema. Problemas al Actualizar comisión del Ventas. Comuníquese con el proveedor del Sistemas";
                  return stopFuction;
                });
            } else {
              await api
                .post(`/ccomisiones/`, comisionVenta, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .catch(() => {
                  errorMessage =
                    "Error del Sistema. Problemas al Crear comisión del Ventas. Comuníquese con el proveedor del Sistemas";
                  return stopFuction;
                });
            }

            // Busca la comision de Seguro
            await api
              .get(`/ccomisiones`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  cod_movimiento: this.form.id,
                  tipo: "S",
                },
              })
              .then((res) => {
                if (res.data.data[0]) {
                  comSeg = res.data.data[0].id;
                  comisionSeguro = {
                    cod_agencia: form.cod_agencia,
                    cod_agente: form.cod_agente_venta,
                    cod_movimiento: this.form.id,
                    fecha_emision: form.fecha_emision,
                    monto_comision: form.comision_seg_vta,
                    estatus: 0,
                  };
                } else {
                  comisionSeguro = {
                    cod_agencia: form.cod_agencia,
                    cod_agente: form.cod_agente_venta,
                    cod_movimiento: this.form.id,
                    fecha_emision: form.fecha_emision,
                    monto_comision: form.comision_seg_vta,
                    tipo_comision: "S",
                    estatus: 0,
                  };
                }
              })
              .catch(() => {
                errorMessage =
                  "Error del Sistema. Problemas al encontrar comisiones. Comuníquese con el proveedor del Sistemas";
                return stopFuction;
              });

            // Guarda la comision de Seguro
            if (comSeg != "") {
              await api
                .put(`/ccomisiones/${comSeg}`, comisionSeguro, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .catch(() => {
                  errorMessage =
                    "Error del Sistema. Problemas al Actualizar comisión del Seguro. Comuníquese con el proveedor del Sistemas";
                  return stopFuction;
                });
            } else {
              await api
                .post(`/ccomisiones/`, comisionSeguro, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .catch(() => {
                  errorMessage =
                    "Error del Sistema. Problemas al Crear comisión del Seguro. Comuníquese con el proveedor del Sistemas";
                  return stopFuction;
                });
            }

            // Guarda el Detalle
            var detalleTemp = JSON.parse(
              JSON.stringify(this.detalle_movimiento)
            );
            for (var i = 0; i <= detalleTemp.length - 1; i++) {
              detalleTemp[i].cod_movimiento = this.form.id;
              detalleTemp[i].cantidad = await this.curReplace(
                detalleTemp[i].cantidad
              );
              detalleTemp[i].precio_unitario = await this.curReplace(
                detalleTemp[i].precio_unitario
              );
              detalleTemp[i].importe_renglon = await this.curReplace(
                detalleTemp[i].importe_renglon
              );
              delete detalleTemp[i].conceptos;
              if (detalleTemp[i].id == 0) {
                delete detalleTemp[i].id;
                await api
                  .post(`/dmovimientos`, detalleTemp[i], {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    },
                  })
                  .then((res) => {
                    this.detalle_movimiento[i].id = res.data.id;
                  })
                  .catch(() => {
                    errorMessage =
                      "Error del Sistema. Problemas al crear los datos del Detalle de la Guía. Comuníquese con el proveedor del Sistemas";
                    return stopFuction;
                  });
              } else {
                await api
                  .put(`/dmovimientos/${detalleTemp[i].id}`, detalleTemp[i], {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    },
                  })
                  .catch(() => {
                    errorMessage =
                      "Error del Sistema. Problemas al actualizar los datos del Detalle de la Guía. Comuníquese con el proveedor del Sistemas";
                    return stopFuction;
                  });
              }
            }
          }

          this.resetLoading();
          this.$q.notify({
            message: "Actualización Exitosa...",
            color: "green",
          });
        } catch (stopFuction) {
          this.resetLoading();
          if (errorMessage) {
            this.$q.notify({
              message: errorMessage,
              color: "red",
            });
          }
        }
      });
    },
    // Metodo para mostrar PopUp de Cliente Particular al hacer Click en Boton
    clienteClick(destino) {
      if (destino) {
        this.destino = true;
      } else {
        this.destino = false;
      }
      this.resetFormClientes();
      if (this.destino) {
        if (this.form.id_clte_part_dest) {
          api
            .get(`/cparticulares/${this.form.id_clte_part_dest}`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                agencia: this.form.cod_agencia_dest.id,
                activo: "S",
              },
            })
            .then((res) => {
              this.clienteLabelBox = true;
              this.setDataClientesParticulares(res.data);
              return;
            });
        } else {
          this.formClientesParticulares.cod_agencia =
            this.form.cod_agencia_dest;
          this.disableRif = false;
          this.clienteLabelBox = true;
        }
      } else {
        if (this.form.id_clte_part_orig) {
          api
            .get(`/cparticulares/${this.form.id_clte_part_orig}`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                agencia: this.form.cod_agencia.id,
                activo: "S",
              },
            })
            .then((res) => {
              this.clienteLabelBox = true;
              this.setDataClientesParticulares(res.data);
              return;
            });
        } else {
          this.formClientesParticulares.cod_agencia = this.form.cod_agencia;
          this.disableRif = false;
          this.clienteLabelBox = true;
        }
      }
    },
    // Metodo para Setear Clientes
    setDataClientes(res) {
      this.formClientes.id = res.id;
      this.formClientes.descripcion = res.descripcion;
      this.formClientes.nb_cliente = res.nb_cliente;
      this.formClientes.rif_cedula = res.rif_cedula;
      this.formClientes.nit = res.nit;
      this.formClientes.dir_correo = res.dir_correo;
      this.formClientes.dir_fiscal = res.dir_fiscal;
      this.formClientes.tlf_cliente = res.tlf_cliente;
      this.formClientes.fax = res.fax;
      this.formClientes.razon_social = res.razon_social;
      this.formClientes.tipo_persona = res.tipo_persona;
      this.formClientes.modalidad_pago = res.modalidad_pago;
      this.formClientes.persona_contacto = res.persona_contacto;
      this.formClientes.cte_decontado = res.cte_decontado;
      this.formClientes.flag_activo = res.flag_activo;
      this.formClientes.cod_agente = res.cod_agente;
      var cod_municipio = res.cod_municipio;
      var cod_parroquia = res.cod_parroquia;
      var cod_localidad = res.cod_localidad;
      var cod_ciudad = res.cod_ciudad;
      var cod_agencia = res.cod_agencia;

      if (cod_agencia) {
        this.filterAndSet(
          "agencias",
          "id",
          cod_agencia,
          "formClientes",
          "cod_agencia",
          "nb_agencia"
        );
      }
      if (cod_ciudad) {
        api
          .get(`/ciudades/${cod_ciudad}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.ciudad = res.data;
            var cod_estado = res.data.cod_estado;
            var axiosConfig = {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                estado: cod_estado,
              },
            };
            api.get(`/ciudades`, axiosConfig).then((res) => {
              this.ciudades = res.data.data;
            });
            api
              .get(`/estados/${cod_estado}`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                this.estado = res.data;
                this.pais = res.data.paises;
              });
            api
              .get(`/estados`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                this.estados = res.data.data;
              });

            api.get(`/municipios`, axiosConfig).then((res) => {
              this.municipios = res.data.data;
              if (cod_municipio) {
                this.filterAndSet(
                  "municipios",
                  "id",
                  cod_municipio,
                  "formClientes",
                  "cod_municipio",
                  "nb_municipio"
                );
                api
                  .get(`/parroquias`, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                      municipio: cod_municipio,
                    },
                  })
                  .then((res) => {
                    this.parroquias = res.data.data;
                    if (cod_parroquia) {
                      this.filterAndSet(
                        "parroquias",
                        "id",
                        cod_parroquia,
                        "formClientes",
                        "cod_parroquia",
                        "nb_parroquia"
                      );
                    }
                  });
              }
            });
            api.get(`/localidades`, axiosConfig).then((res) => {
              this.localidades = res.data.data;
              if (cod_localidad) {
                this.filterAndSet(
                  "localidades",
                  "id",
                  cod_localidad,
                  "formClientes",
                  "cod_localidad",
                  "desc_localidad"
                );
              }
            });
          });
      }
    },
    // Metodo para Crear o Editar Clientes
    sendDataClientes() {
      var formClientesTemp = {};
      formClientesTemp.id = this.formClientes.id;
      formClientesTemp.cod_agencia = this.formClientes.cod_agencia.id;
      formClientesTemp.cod_ciudad = this.formClientes.cod_ciudad.id;
      formClientesTemp.cod_localidad = this.formClientes.cod_localidad.id;
      formClientesTemp.cod_municipio = this.formClientes.cod_municipio.id;
      formClientesTemp.cod_parroquia = this.formClientes.cod_parroquia.id;
      formClientesTemp.nb_cliente = this.formClientes.nb_cliente;
      formClientesTemp.rif_cedula = this.formClientes.rif_cedula;
      formClientesTemp.dir_fiscal = this.formClientes.dir_fiscal;
      formClientesTemp.razon_social = this.formClientes.razon_social;
      formClientesTemp.tipo_persona = this.formClientes.tipo_persona;
      formClientesTemp.modalidad_pago = this.formClientes.modalidad_pago;
      this.$refs.methods.putData(
        `/clientes/${formClientesTemp.id}`,
        formClientesTemp,
        "getData"
      );
      this.clientesBox = false;
      this.resetFormClientes();
      this.$refs.methods.getData(`/clientes`, "setData", "clientes_origen", {
        headers: {
          Authorization: ``,
          agencia: this.form.cod_agencia.id,
        },
      });
      this.$refs.methods.getData(`/clientes`, "setData", "clientes_destino", {
        headers: {
          Authorization: ``,
          agencia: this.form.cod_agencia_dest.id,
        },
      });
    },
    // Metodo para Setear Clientes Particulares
    setDataClientesParticulares(res) {
      this.formClientesParticulares.id = res.id;
      this.disableInputs = false;
      this.formClientesParticulares.direccion = res.direccion;
      this.formClientesParticulares.nb_cliente = res.nb_cliente;
      this.formClientesParticulares.rif_ci = res.rif_ci;
      this.formClientesParticulares.telefonos = res.telefonos;
      this.formClientesParticulares.fax = res.fax;
      this.formClientesParticulares.cod_ciudad = res.cod_ciudad;
      var cod_municipio = res.cod_municipio;
      var cod_parroquia = res.cod_parroquia;
      var cod_localidad = res.cod_localidad;
      var cod_ciudad = res.cod_ciudad;
      var cod_agencia = res.cod_agencia;
      if (cod_agencia) {
        this.filterAndSet(
          "agencias",
          "id",
          cod_agencia,
          "formClientesParticulares",
          "cod_agencia",
          "nb_agencia"
        );
      }
      if (cod_ciudad) {
        api
          .get(`/ciudades/${cod_ciudad}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.ciudad = res.data;
            var cod_estado = res.data.cod_estado;
            var axiosConfig = {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                estado: cod_estado,
              },
            };
            api.get(`/ciudades`, axiosConfig).then((res) => {
              this.ciudades = res.data.data;
            });
            api
              .get(`/estados/${cod_estado}`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                this.estado = res.data;
                this.pais = res.data.paises;
              });
            api
              .get(`/estados`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                this.estados = res.data.data;
              });

            api.get(`/municipios`, axiosConfig).then((res) => {
              this.municipios = res.data.data;
              if (cod_municipio) {
                this.filterAndSet(
                  "municipios",
                  "id",
                  cod_municipio,
                  "formClientesParticulares",
                  "cod_municipio",
                  "nb_municipio"
                );
                api
                  .get(`/parroquias`, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                      municipio: cod_municipio,
                    },
                  })
                  .then((res) => {
                    this.parroquias = res.data.data;
                    this.filterAndSet(
                      "parroquias",
                      "id",
                      cod_parroquia,
                      "formClientesParticulares",
                      "cod_parroquia",
                      "nb_parroquia"
                    );
                  });
              }
            });
            api.get(`/localidades`, axiosConfig).then((res) => {
              this.localidades = res.data.data;
              this.filterAndSet(
                "localidades",
                "id",
                cod_localidad,
                "formClientesParticulares",
                "cod_localidad",
                "desc_localidad"
              );
            });
          });
      }
    },
    // Metodo para Crear o Editar Clientes Particulares
    sendDataGuiaClientesParticulares() {
      this.formClientesParticulares.cod_agencia =
        this.formClientesParticulares.cod_agencia.id;
      this.formClientesParticulares.cod_localidad =
        this.formClientesParticulares.cod_localidad.id;
      this.formClientesParticulares.cod_municipio =
        this.formClientesParticulares.cod_municipio.id;
      this.formClientesParticulares.cod_parroquia =
        this.formClientesParticulares.cod_parroquia.id;
      this.formClientesParticulares.cod_ciudad = this.ciudad.id;
      if (this.formClientesParticulares.id) {
        delete this.formClientesParticulares.cod_cliente;
        api
          .put(
            `/cparticulares/${this.formClientesParticulares.id}`,
            this.formClientesParticulares,
            {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            this.$q.notify({
              message: "Cliente Particular Actualizado Exitosamente",
              color: "green",
            });
            if (this.destino) {
              this.form.id_clte_part_dest = res.data.id;
              this.form.ci_rif_cte_conta_dest = res.data.rif_ci;
            } else {
              this.form.id_clte_part_orig = res.data.id;
              this.form.ci_rif_cte_conta_org = res.data.rif_ci;
            }
            return;
          });
      } else {
        delete this.formClientesParticulares.id;
        this.formClientesParticulares.cod_cliente =
          this.form.cod_cliente_dest.id;
        api
          .post(`/cparticulares`, this.formClientesParticulares, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.$q.notify({
              message: "Cliente Particular Creado Exitosamente",
              color: "green",
            });
            if (this.clienteLabel == "destino") {
              this.form.id_clte_part_dest = res.data.id;
              this.form.ci_rif_cte_conta_dest = res.data.rif_ci;
            } else {
              this.form.id_clte_part_orig = res.data.id;
              this.form.ci_rif_cte_conta_org = res.data.rif_ci;
            }
            return;
          });
      }
      this.$refs.methods.getData(`/clientes`, "setData", "clientes_origen", {
        headers: {
          Authorization: ``,
          agencia: this.form.cod_agencia.id,
        },
      });
      this.$refs.methods.getData(`/clientes`, "setData", "clientes_destino", {
        headers: {
          Authorization: ``,
          agencia: this.form.cod_agencia_dest.id,
        },
      });
      this.clienteLabelBox = false;
      this.resetFormClientes();
    },
    // Metodo para calcular el detalle del documento
    async calculaDetalle(field, row) {
      let cantidad;
      let importe_renglon;
      let precio_unitario;
      switch (field) {
        case "cantidad":
          cantidad = await this.curReplace(row.cantidad);
          precio_unitario = await this.curReplace(row.precio_unitario);
          row.importe_renglon = (cantidad * precio_unitario).toFixed(2);
          this.calculaTotales();
          break;
        case "precio_unitario":
          cantidad = await this.curReplace(row.cantidad);
          precio_unitario = await this.curReplace(row.precio_unitario);
          row.importe_renglon = (cantidad * precio_unitario).toFixed(2);
          this.calculaTotales();
          break;
        case "importe_renglon":
          cantidad = await this.curReplace(row.cantidad);
          importe_renglon = await this.curReplace(row.importe_renglon);
          row.precio_unitario = (importe_renglon / cantidad).toFixed(2);
          this.calculaTotales();
          break;
        default:
          break;
      }
    },
    // Metodo para calcular los totales del detalle del documento
    async calculaTotales() {
      let subtotal = 0;
      let monto_base = 0;
      let monto_impuesto = 0;
      let monto_total = 0;
      let base_comision_vta_rcl = 0;
      let base_comision_seg = 0;
      for (var i = 0; i <= this.detalle_movimiento.length - 1; i++) {
        let importe_renglon = await this.curReplace(
          this.detalle_movimiento[i].importe_renglon
        );
        let check_impuesto = await this.detalle_movimiento[i].conceptos
          .check_impuesto;
        let check_comision = await this.detalle_movimiento[i].conceptos
          .check_comision;
        let cod_concepto_oper = await this.detalle_movimiento[i].conceptos
          .cod_concepto;

        subtotal += this.parseFloatN(importe_renglon);
        monto_base +=
          check_impuesto == 1 ? await this.parseFloatN(importe_renglon) : 0;
        base_comision_vta_rcl +=
          check_comision == 1 && cod_concepto_oper == 1
            ? this.parseFloatN(importe_renglon)
            : 0;
        base_comision_seg +=
          check_comision == 1 && cod_concepto_oper == 2
            ? this.parseFloatN(importe_renglon)
            : 0;

        if (i == this.detalle_movimiento.length - 1) {
          monto_impuesto =
            ((await this.parseFloatN(monto_base)) *
              this.parseFloatN(this.iva)) /
            100;
          monto_total =
            (await this.parseFloatN(subtotal)) +
            this.parseFloatN(monto_impuesto);
          this.form.monto_subtotal = subtotal.toFixed(2);
          this.form.monto_base = monto_base.toFixed(2);
          this.form.monto_impuesto = monto_impuesto.toFixed(2);
          this.form.monto_total = monto_total.toFixed(2);
          this.form.porc_impuesto = this.iva;
          this.form.saldo = monto_total.toFixed(2);
          this.form.base_comision_vta_rcl = base_comision_vta_rcl.toFixed(2);
          this.form.base_comision_seg = base_comision_seg.toFixed(2);
          this.total_ref = (
            monto_total / this.curReplace(this.valor_dolar)
          ).toFixed(2);
        }
      }
    },
    setMontoRef() {
      this.form.valor_declarado_seg = this.curReplace(
        this.form.monto_ref_cte_sin_imp
      );
      this.calculaPorcSeguro();
    },
    // Metodo para calcular el monto del seguro
    async calculaPorcSeguro() {
      // Si monto declarado es 0 ponemos el % en 0
      if (
        !this.form.porc_apl_seguro ||
        this.curReplace(this.form.valor_declarado_seg) == 0.0
      ) {
        this.form.porc_apl_seguro = "";
      } else {
        // Buscamos el valor del % del seguro
        await api
          .get(`/vcontrol/11`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            this.form.porc_apl_seguro = res.data.valor * 100;
          });
      }
      this.setDataSeguro();
    },
    // Metodo para setear el detalle del Seguro
    async setDataSeguro() {
      if (this.detalle_movimiento[3]) {
        let valor_declarado_seg = await this.parseFloatN(
          this.curReplace(this.form.valor_declarado_seg)
        );
        let porc_apl_seguro = await this.parseFloatN(
          this.curReplace(this.form.porc_apl_seguro)
        );
        let monto_seguro = (valor_declarado_seg * porc_apl_seguro) / 100;
        this.detalle_movimiento[3].precio_unitario = monto_seguro.toFixed(2);
        this.detalle_movimiento[3].importe_renglon = monto_seguro.toFixed(2);
        this.calculaTotales();
      }
    },
    async calculaCod() {
      if (this.detalle_movimiento[4]) {
        await api
          .get(`/vcontrol/10`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            let porc_cod = res.data.valor;
            let valor_declarado_cod = this.curReplace(
              this.form.valor_declarado_cod
            );
            let monto_cod =
              (this.parseFloatN(valor_declarado_cod) *
                this.parseFloatN(porc_cod)) /
              100;
            this.detalle_movimiento[4].precio_unitario = monto_cod.toFixed(2);
            this.detalle_movimiento[4].importe_renglon = monto_cod.toFixed(2);
          });

        this.calculaTotales();
      }
    },
    // Metodo para convertir a Currency los String
    curReplace(amount) {
      return amount.indexOf(",") < 0
        ? amount
        : amount.replaceAll(".", "").replaceAll(",", ".");
    },
    // Metodo para Limpiar Datos de la Guia
    limpiarGuia() {
      this.form.nro_documento = "";
      this.closeDialogs();
      this.resetFormGuia();
    },
    // Metodo para cerrar todos los dialogs
    closeDialogs() {
      this.reversarPopUp = false;
      this.saveDetallesPopUp = false;
      this.validateDetails = null;
      this.saveDetails = null;
      this.validateDetallesPopUp = false;
      this.clientesDeletePopUp = false;
      this.pdfView = false;
      this.clientesBox = false;
      this.detalle = false;
      this.clienteLabelBox = false;
    },
    // Metodo para Resetear Datos de Guia
    resetFormGuia() {
      this.nro_doc = "";
      this.nro_ref = "";
      this.monto_ref = 0;
      this.total_ref = 0;
      this.reversada = false;
      this.destino = false;
      this.cliente = false;
      this.nro_factura = "";
      this.form.t_de_documento = "GC";
      this.form.serie_documento = "";
      this.form.fecha_emision = moment().format("DD/MM/YYYY");
      this.form.fecha_envio = moment().format("DD/MM/YYYY");
      this.form.fecha_aplicacion = "00/00/0000";
      this.form.nro_piezas = "";
      this.form.peso_kgs = "";
      this.form.tipo_carga = "";
      this.form.modalidad_pago = "";
      this.form.pagado_en = "";
      this.form.cod_agencia = "";
      this.form.cod_cliente_org = "";
      this.form.cod_agencia_dest = "";
      this.form.cod_cliente_dest = "";
      this.form.cod_zona_dest = "";
      this.form.tipo_servicio = "";
      this.form.tipo_ubicacion = "";
      this.form.tipo_urgencia = "";
      this.form.cod_agente_venta = "";
      this.form.cod_proveedor = "";
      this.form.dimensiones = "";
      this.form.desc_contenido = "";
      this.form.carga_neta = "";
      this.form.valor_declarado_cod = "";
      this.form.valor_declarado_seg = "";
      this.form.porc_apl_seguro = "";
      this.form.cod_agencia_transito = "";
      this.form.monto_subtotal = "";
      this.form.monto_impuesto = "";
      this.form.monto_base = "";
      this.form.monto_total = "";
      this.form.fecha_llega_transito = "";
      this.form.check_transito = "0";
      this.form.estatus_operativo = "";
      this.form.estatus_administra = "";
      this.form.monto_ref_cte_sin_imp = "";
      this.form.id_clte_part_dest = "";
      this.form.id_clte_part_orig = "";
      this.form.ci_rif_cte_conta_dest = "";
      this.form.ci_rif_cte_conta_org = "";
      this.form.porc_comision = "";
      this.form.porc_descuento = "";
      this.checkbox.guia_factura = "0";
      this.checkbox.guia_carga = "0";
      this.checkbox.paquetes = "0";
      this.checkbox.sobres = "0";
      this.checkbox.nacional = "0";
      this.checkbox.internacional = "0";
      this.checkbox.foraneo = "0";
      this.checkbox.urbano = "0";
      this.checkbox.extra_urbano = "0";
      this.checkbox.normal = "0";
      this.checkbox.emergencia = "0";
      this.form.id = "";
      this.clientes_origen = [];
      this.detalle_movimiento = [];
      this.clientes_destino = [];
      this.zonas_destino = [];
      this.agencias = [];
    },
    // Metodo para Resetear Datos de Clientes
    resetFormClientes() {
      delete this.formClientes.id;
      delete this.formClientesParticulares.id;
      this.disableAgencia = true;
      this.disableRif = true;
      this.disableCliente = true;
      this.disableInputs = true;
      this.formClientes.id = "";
      this.formClientes.nb_cliente = "";
      this.formClientes.rif_cedula = "";
      this.formClientes.nit = "";
      this.formClientes.dir_correo = "";
      this.formClientes.dir_fiscal = "";
      this.formClientes.email = "";
      this.formClientes.tlf_cliente = "";
      this.formClientes.fax = "";
      this.formClientes.razon_social = "";
      this.formClientes.tipo_persona = "";
      this.formClientes.modalidad_pago = "";
      this.formClientes.persona_contacto = "";
      this.formClientes.observacion = "";
      this.formClientes.cte_decontado = "";
      this.formClientes.tipo_persona_new = "";
      this.formClientes.flag_activo = "";
      this.formClientes.cod_agencia = "";
      this.formClientes.cod_agente = "";
      this.formClientes.cod_municipio = "";
      this.formClientes.cod_parroquia = "";
      this.formClientes.cod_localidad = "";
      this.formClientes.cte_decontado = "0";
      this.pais = "";
      this.estado = "";
      this.ciudad = "";
      this.formClientesParticulares.id = "";
      this.formClientesParticulares.cod_agencia = [];
      this.formClientesParticulares.cod_ciudad = [];
      this.formClientesParticulares.cod_localidad = [];
      this.formClientesParticulares.cod_municipio = [];
      this.formClientesParticulares.cod_parroquia = [];
      this.formClientesParticulares.direccion = "";
      this.formClientesParticulares.fax = "";
      this.formClientesParticulares.id = "";
      this.formClientesParticulares.nb_cliente = "";
      this.formClientesParticulares.rif_ci = "";
      this.formClientesParticulares.telefonos = "";
    },
  },
};
</script>

<style>
.q-field__bottom {
  display: none;
}
@media screen and (max-width: 1024px) {
  .inputServicio {
    padding-top: 5px !important;
  }
}

@media screen and (max-width: 1235px) and (min-width: 1024px) {
  .textPago {
    font-size: 13px !important;
  }
}

@media screen and (min-width: 1024px) {
  .inputsCard {
    padding-top: 15px;
  }
}

@media screen and (min-width: 1024px) {
  .margin_bottom {
    margin-bottom: 13px;
  }
}

@media screen and (max-width: 1024px) {
  .margin_bottom {
    margin-bottom: 10px;
  }
}

@media screen and (min-width: 1024px) {
  .marginMenu {
    margin-bottom: 10px;
    margin-top: 54px;
  }
}

@media screen and (min-width: 1024px) {
  .checkboxForaneo {
    padding-left: 10px;
  }
}

@media screen and (max-width: 600px) {
  .selectmovil {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 600px) {
  .selectmovil2 {
    margin-bottom: 20px;
  }
}

@media screen and (min-width: 600px) {
  .selectmovil {
    margin-right: 20px;
  }
}

@media screen and (min-width: 600px) {
  .selectmovil2 {
    margin-right: 35px;
  }
}

@media screen and (min-width: 600px) {
  .btnCard {
    margin-right: 25px;
    align-self: center;
    text-align: center;
  }
}

@media screen and (max-width: 600px) {
  .btnCard {
    margin-left: 25px;
  }
}

@media screen and (min-width: 600px) {
  .paginaRegistroServicioCarga {
    margin-top: -8px;
  }
}

@media screen and (min-width: 1024px) {
  .cardMenus {
    width: 96%;
  }
}

@media screen and (max-width: 1024px) {
  .boxStyle {
    padding-bottom: 5px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
    margin-bottom: 5px !important;
  }
}

@media screen and (max-width: 1024px) {
  .lastboxStyle {
    padding-bottom: 10px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
  }
}

@media screen and (min-width: 1200px) {
  .separationMobile {
    margin-left: 10px;
  }
}

@media screen and (max-width: 1024px) {
  .pageStyle {
    margin-top: 20px;
  }
}
</style>
