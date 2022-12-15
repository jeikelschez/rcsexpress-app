<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="asignDialog">
      <q-card class="q-pa-md" bordered style="width: 1400px; max-width: 100vw">
        <q-card-section>
          <div class="text-h5">
            <p style="font-size: 24px">
              <strong>ASIGNAR LAS GUIAS PENDIENTES POR FACTURAR</strong>
            </p>
          </div>
        </q-card-section>
        <q-card-section style="margin-top: -30px">
          <q-table
            :rows="guiasCarga"
            :loading="loading"
            binary-state-sort
            row-key="id"
            :columns="columns"
            selection="multiple"
            :separator="separator"
            :pagination="paginationGuia"
            :rows-per-page-options="[]"
            style="width: 100%; height: 450px; margin-bottom: 20px"
            v-model:selected="selected"
            :selected.sync="selected"
            @selection="onSelection"
          >
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="edit"
                  :disabled="this.allowOption(3)"
                  @click="
                    this.$refs.methods.getData(
                      `/paises/${props.row.id}`,
                      'setDataPaisesEdit',
                      'formPaises'
                    );
                    paisesDialog = true;
                  "
                ></q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="delete"
                  :disabled="this.allowOption(4)"
                  @click="selected = props.row.id"
                  @click.capture="paisesDelete = true"
                ></q-btn>
              </q-td>
            </template>
            <template v-slot:loading>
              <q-inner-loading showing color="primary" class="loading" />
            </template>
            <template v-slot:top="props">
              <div class="col-md-4 col-xs-12 texto">
                <p style="font-size: 20px; padding-right: 10px">
                  <strong class="text-secondary">AGENCIA: </strong>
                  <strong> {{ this.selectedAgencia.nb_agencia }} </strong>
                </p>
              </div>
              <div class="col-md-4 col-xs-12 texto">
                <p style="font-size: 20px">
                  <strong class="text-secondary">CLIENTE: </strong>
                  <strong> {{ this.selectedCliente.nb_cliente }} </strong>
                </p>
              </div>
            </template>
            <template v-slot:body-cell-nro_documento="props">
              <q-td :props="props">
                {{ props.row.t_de_documento + "-" + props.row.nro_documento }}
              </q-td>
            </template>
            <template v-slot:body-cell-pagado_en="props">
              <q-td :props="props">
                {{ filterDesc("pagadoEn", props.row.pagado_en) }}
              </q-td>
            </template>
          </q-table>
          <div class="row" style="margin-bottom: 10px; margin-top: 10px">
            <div class="col-md-2 col-xs-12">
              <p style="font-size: 17px; margin-top: 5px">
                <strong class="text-secondary">Totales</strong>
              </p>
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                outlined
                v-model="monto_subtotal"
                label="Monto Subtotal:"
                hint=""
                dense
                v-money="money"
                input-class="text-right"
                style="padding-bottom: 10px"
                class="pcform"
                :readonly="true"
                lazy-rules
              >
              </q-input>
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                outlined
                v-model="monto_base"
                label="Base Impuesto:"
                hint=""
                class="pcform"
                dense
                v-money="money"
                input-class="text-right"
                style="padding-bottom: 10px"
                :readonly="true"
                lazy-rules
              >
              </q-input>
            </div>
            <div class="col-md-2 col-xs-12">
              <q-input
                outlined
                v-model="monto_impuesto"
                label="Impuesto:"
                input-class="text-right"
                hint=""
                v-money="money"
                dense
                style="padding-bottom: 10px"
                class="pcform"
                :readonly="true"
                lazy-rules
              >
              </q-input>
            </div>
            <div class="col-md-2 col-xs-12">
              <q-input
                outlined
                v-model="monto_total"
                label="Monto Total:"
                input-class="text-right"
                class="pcform"
                hint=""
                dense
                v-money="money"
                :readonly="true"
                style="padding-bottom: 10px"
                lazy-rules
              >
              </q-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2 col-xs-12">
              <p style="font-size: 17px; margin-top: 5px">
                <strong class="text-secondary">Seleccionados</strong>
              </p>
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                outlined
                v-model="monto_subtotal_select"
                :input-style="{ color: '#06065B' }"
                label="Monto Subtotal:"
                hint=""
                dense
                input-class="text-right"
                style="padding-bottom: 10px"
                v-money="money"
                :readonly="true"
                class="pcform"
                lazy-rules
              >
              </q-input>
            </div>
            <div class="col-md-3 col-xs-12">
              <q-input
                outlined
                v-model="monto_base_select"
                :input-style="{ color: '#06065B' }"
                label="Base Impuesto:"
                hint=""
                class="pcform"
                dense
                input-class="text-right"
                style="padding-bottom: 10px"
                v-money="money"
                :readonly="true"
                lazy-rules
              >
              </q-input>
            </div>
            <div class="col-md-2 col-xs-12">
              <q-input
                outlined
                v-model="monto_impuesto_select"
                :input-style="{ color: '#06065B' }"
                label="Impuesto:"
                input-class="text-right"
                hint=""
                dense
                style="padding-bottom: 10px"
                v-money="money"
                :readonly="true"
                class="pcform"
                lazy-rules
              >
              </q-input>
            </div>
            <div class="col-md-2 col-xs-12">
              <q-input
                outlined
                v-model="monto_total_select"
                :input-style="{ color: '#06065B' }"
                label="Monto Total:"
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
          </div>
          <div class="float-right" style="margin-bottom: 6px; margin-top: 10px">
            <q-btn
              label="Asignar"
              @click="this.asignarGuias()"
              color="primary"
              icon="add"
            />
            <q-btn
              label="Regresar"
              color="primary"
              flat
              icon="close"
              v-close-popup
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

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
                v-model="form.nro_documento"
                label="Referencia Item"
                type="textarea"
                input-class="textArea"
              >
              </q-input>
            </div>
            <div
              class="col-md-12 col-xs-12"
              style="margin-top: 23px; margin-bottom: 10px; text-align: center"
            >
              <q-btn label="Guardar" color="primary" style="width: 300px" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>Ventas - Facturacion Credito, Contado y Otros</strong>
          </p>
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
              this.selectedCliente = [];
              this.clientesLoading = true;
              this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
                headers: {
                  agencia: this.selectedAgencia.id,
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
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            option-label="label"
            option-value="value"
            input-debounce="0"
            v-model="selectedTipo"
            outlined
            standout
            label="Tipo Servicio"
            @update:model-value="setConceptos()"
          >
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="formaPago"
            use-input
            hide-selected
            fill-input
            option-label="label"
            option-value="value"
            input-debounce="0"
            v-model="selectedForma"
            outlined
            standout
            label="Forma Pago"
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
            :disable="clientesLoading"
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
            label="Cliente"
            @update:model-value="setGuiasCarga()"
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
            rounded
            dense
            input-debounce="0"
            v-model="descuentoSelected"
            outlined
            standout
            label="Descuento"
          >
            <template v-slot:append>
              <q-icon name="percent" class="cursor-pointer"> </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            rounded
            dense
            input-debounce="0"
            v-model="descuentoSelected"
            outlined
            standout
            label="Cobrado"
          >
            <template v-slot:append>
              <q-icon name="attach_money" class="cursor-pointer"> </q-icon>
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
                <div class="col-md-6 col-xs-12" style="padding-left: 20px">
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
                    :readonly="true"
                    outlined
                    standout
                    label="Tipo Concepto"
                    class="pcform"
                  >
                    <template v-slot:prepend>
                      <q-icon name="apartment" />
                    </template>
                  </q-select>
                </div>
                <div class="col-md-6 col-xs-12" style="margin-bottom: 20px">
                  <q-select
                    dense
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="conceptos"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    option-label="desc_concepto"
                    option-value="id"
                    v-model="selectedConcepto"
                    :disable="!selectedCliente.id ? true : false"
                    outlined
                    standout
                    label="Concepto"
                    class="pcform"
                  >
                    <template v-slot:prepend>
                      <q-icon name="apartment" />
                    </template>
                  </q-select>
                </div>
                <q-table
                  :rows="datos"
                  :loading="loading"
                  binary-state-sort
                  row-key="id"
                  :pagination="pagination"
                  virtual-scroll
                  :columns="columns"
                  :separator="separator"
                  style="width: 100%; height: 300px; margin-bottom: 20px"
                  hide-bottom
                >
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" class="loading" />
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
                      ></q-btn>
                      <q-btn
                        dense
                        round
                        flat
                        color="primary"
                        icon="delete"
                        :disabled="this.allowOption(4)"
                        @click="selected = props.row.id"
                        @click.capture="paisesDelete = true"
                      ></q-btn>
                    </q-td>
                  </template>
                </q-table>
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
                    :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_impuesto"
                    label="Descuento:"
                    hint=""
                    class="pcform"
                    :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
                    dense
                    input-class="text-right"
                    style="padding-bottom: 10px"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_base"
                    label="Monto Base:"
                    input-class="text-right"
                    hint=""
                    :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
                    dense
                    style="padding-bottom: 10px"
                    class="pcform"
                    lazy-rules
                  >
                  </q-input>
                </div>
                <div class="col-md-2 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.monto_total"
                    label="Monto Impuesto:"
                    input-class="text-right"
                    class="pcform"
                    hint=""
                    :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
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
                    label="FPO:"
                    class="pcform"
                    input-class="text-right"
                    hint=""
                    :rules="[(val) => this.$refs.rulesVue.isMax(val, 15, '')]"
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
        <div class="col-md-9 col-xs-12 cardMargin selectMobile2">
          <q-input
            outlined
            v-model="form.nro_documento"
            label="Observacion Factura"
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
              <strong>Ultima Factura Registrada</strong>
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

    <q-dialog v-model="confirmPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Está seguro de asociar las Guías a la Factura a generar?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            color="primary"
            @click="this.confirmAsign = false"
            v-close-popup
          />
          <q-btn
            flat
            label="Guardar"
            color="primary"
            v-close-popup
            @click="this.confirmAsign = true"
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
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  directives: { money: VMoney },
  components: { methods: methodsVue, rulesVue },
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
      columns: [
        {
          name: "nro_documento",
          label: "Nro. Guía",
          field: "nro_documento",
          align: "left",
        },
        {
          name: "fecha_emision",
          label: "Emisión",
          field: "fecha_emision",
          align: "left",
        },
        {
          name: "pagado_en",
          label: "Pagado En",
          field: "pagado_en",
          align: "left",
        },
        {
          name: "monto_subtotal",
          label: "Sub-total",
          field: "monto_subtotal",
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
          name: "monto_base",
          label: "Base Impuesto",
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
          name: "monto_impuesto",
          label: "Impuesto",
          field: "monto_impuesto",
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
      ],
      form: {
        tipo: "",
        control_inicio: "",
        control_final: "",
        ult_doc_referencia: "",
        estatus_lote: "",
        serie_doc: "",
        cod_agencia: "",
      },
      formaPago: [
        { label: "CONTADO", value: "CO" },
        { label: "CRÉDITO", value: "CR" },
      ],
      tipoFacturacion: [
        { label: "FACTURACION CREDITO", value: "C", tipo: 22, formaPago: "CR" },
        { label: "FACTURACION CONTADO", value: "A", tipo: 22, formaPago: "CO" },
        {
          label: "FACTURACION OTROS INGRESOS",
          value: "I",
          tipo: 3,
          formaPago: "",
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
      agencias: [],
      datos: [],
      guiasCarga: [],
      ultimaFact: [],
      selectedAgencia: [],
      selectedCliente: [],
      selectedTipo: [],
      selectedForma: [],
      agenciasSelected: [],
      tiposSelected: [],
      fechaSelected: moment().format("DD/MM/YYYY"),
      descuentoSelected: "",
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
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      asignDialog: ref(false),
      reference: ref(false),
      confirmPopUp: ref(false),
      selected: ref([]),
      deletePopup: ref(false),
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
    // Asignar las guias Carga a la Factura
    async asignarGuias() {
      if (this.selected.length == 0) {
        this.errorMessage("Debe seleccionar al menos una Guía para poder asignarlas a la Factura a Generar");
        return;
      }
      
      this.confirmPopUp = true;
      await this.until((_) => this.confirmAsign == true);
      if (!this.confirmAsign) {
        return;
      }

      this.confirmAsign = false;
      this.asignDialog = false;

      console.log(this.selected)
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
    async onSelection({ rows, added }) {
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
    resetForm() {
      this.guiasCarga = [];
      this.selected = [];
      this.monto_subtotal = 0;
      this.monto_base = 0;
      this.monto_impuesto = 0;
      this.monto_total = 0;
      this.monto_subtotal_select = 0;
      this.monto_base_select = 0;
      this.monto_impuesto_select = 0;
      this.monto_total_select = 0;
    },
    // Metodo para que una funcion no avance hasta que se cumpla una condicion
    async until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
      };
      return new Promise(poll);
    },
  },
};
</script>

<style>
.q-textarea.q-field--labeled .q-field__control-container {
  height: 120px !important;
}
</style>
