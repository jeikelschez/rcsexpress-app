<template>
  <q-page class="pagina q-pa-md">

    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 1400px; max-width: 100vw">
        <q-table
              :rows="datos"
              :loading="loading"
              binary-state-sort
              row-key="id"
              virtual-scroll
              :columns="columns"
              selection="multiple"
              :separator="separator"
              :filter="filter"
              :pagination="pagination"
              style="width: 100%; height: 450px; margin-bottom: 20px;"
              hide-bottom
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
                <div class="col-md-4 col-xs-12">
                  <p style="font-size: 18px; padding-right: 10px" class="text-secondary">
                  <strong>ASIGNAR LAS GUIAS PENDIENTES POR FACTURAR</strong>
                  </p>
                </div>
                <div class="col-md-4 col-xs-12 texto">
                  <p style="font-size: 17px; padding-right: 10px">
                    <strong class="text-secondary">AGENCIA:</strong> <strong> {{this.selectedAgencia.nb_agencia}} </strong>
                  </p>
                </div>
                <div class="col-md-4 col-xs-12 texto">
                  <p style="font-size: 17px">
                    <strong class="text-secondary">AGENCIA:</strong> <strong> {{this.selectedAgencia.nb_agencia}} </strong>
                  </p>
                </div>
              </template>
            </q-table>
                <div class="row" style="margin-bottom:10px; margin-top:10px">
                  <div class="col-md-2 col-xs-12">
                  <p style="font-size: 17px;margin-top:5px">
                    <strong class="text-secondary">TOTALES</strong>
                  </p>
                  </div>
                  <div class="col-md-3 col-xs-12">
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
                  <div class="col-md-3 col-xs-12">
                    <q-input
                      outlined
                      v-model="form.monto_impuesto"
                      label="Base Impuesto:"
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
                      label="Impuesto:"
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
                      label="Monto Total:"
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
                </div>
                <div class="row">
                  <div class="col-md-2 col-xs-12">
                  <p style="font-size: 17px;margin-top:5px">
                    <strong class="text-secondary">SELECCIONADOS</strong>
                  </p>
                  </div>
                  <div class="col-md-3 col-xs-12">
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
                  <div class="col-md-3 col-xs-12">
                    <q-input
                      outlined
                      v-model="form.monto_impuesto"
                      label="Base Impuesto:"
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
                      label="Impuesto:"
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
                      label="Monto Total:"
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
                </div>
                <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 6px; margin-top: 10px"
            >
              <q-btn
                label="Asignar"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="add"
              />
              <q-btn
                label="Regresar"
                color="primary"
                flat
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                v-close-popup
              />
            </div>
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
        class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="margin-top: 14px"
      >
        <div
          class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>VENTAS - FACTURACION CREDITO, CONTADO Y OTROS</strong>
          </p>
        </div>
        <div class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 selectMobile"
        >
          <q-select
            rounded
            class="pcform"
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
              this.selectedAgente = [];
              getDataTable();
              this.$refs.methods.getData(`/agentes`, 'setData', 'agentes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
              this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
                headers: {
                  agencia: this.selectedAgencia.id,
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
        <div class="col-md-3 col-xl-3 col-lg-3 col-xs-6 col-sm-6 selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="NRO. Control"
            hint=""
            dense
            class="pcform pcmovil"
            rounded
            style="padding-bottom: 0px"
            v-model="form.fecha_asignacion"
            lazy-rules
          >
          </q-input>
        </div>
        <div class="col-md-3 col-xl-3 col-lg-3 col-xs-6 col-sm-6 selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="NRO. Interno"
            hint=""
            class="pcform"
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="form.fecha_asignacion"
            lazy-rules
          >
          </q-input>
        </div>
        <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="REF."
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="form.fecha_asignacion"
            lazy-rules
          >
          </q-input>
        </div>
        <div class="col-md-3 col-xs-12">
          <q-select
            outlined
            v-model="form.nro_documento"
            label="Cliente"
            class="pcform"
            hint=""
            dense
            rounded
          >
          </q-select>
        </div>
        <div class="col-md-3 col-xs-12">
          <q-select
            outlined
            v-model="form.nro_documento"
            label="Tipo de Facturacion"
            hint=""
            rounded
            class="pcform"
            :options="facturacion"
            dense
          >
          </q-select>
        </div>
        <div class="col-md-2 col-xs-12">
          <q-input
            outlined
            label="Fecha Emision"
            hint=""
            v-model="form.fecha_emision"
            :tabindex="2"
            rounded
            :disable="this.disableGuia"
            lazy-rules
            dense
            class="pcform"
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
        <div class="col-md-2 col-xs-6">
          <q-input
            outlined
            rounded
            v-model="form.peso_kgs"
            ref="formKGS"
            label="Descuento"
            class="pcform"
            :rules="[
              (val) => this.$refs.rulesVue.isReqCurrency(val, ''),
              (val) => this.$refs.rulesVue.isMax(val, 9, ''),
            ]"
            input-class="text-right"
            dense
            style="padding-bottom: 10px"
            hide-buttom-space
            lazy-rules
          >
            <template v-slot:append>
              <q-icon name="percent" class="cursor-pointer"> </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-md-1 col-xs-3">
          <q-checkbox
            size="lg"
            true-value="1"
            false-value="0"
            style="font-size: 13px; margin-top: -5px; margin-left: 10px;"
            label="CR"
          />
        </div>
        <div class="col-md-1 col-xs-3">
          <q-checkbox
            size="lg"
            true-value="1"
            false-value="0"
            style="font-size: 13px; margin-top: -5px"
            label="CO"
          />
        </div>
        <div
            class="col-md-12 col-xs-12 lastboxStyle"
            style="margin-bottom: 20px;"
          >
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
                  <div class="col-md-6 col-xs-12">
              <q-select
                upper-case
                outlined
                v-model="form.control_inicio"
                label="Tipo Concepto"
                class="pcform"
                hint=""
                lazy-rules
                dense
                :rules="[
                  (val) => this.$refs.rulesVue.isReq(val),
                  (val) => this.$refs.rulesVue.isMax(val, 10),
                ]"
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon name="apartment" />
                </template>
              </q-select>
            </div>

            <div class="col-md-6 col-xs-12">
              <q-select
                outlined
                v-model="form.control_final"
                label="Concepto"
                dense
                :rules="[
                  (val) => this.$refs.rulesVue.isReq(val),
                  (val) => this.$refs.rulesVue.isMax(val, 10),
                  (val) => this.reglasSegundoCorrelativo(val),
                ]"
                hint=""
                lazy-rules
                type="number"
              >
                <template v-slot:prepend>
                  <q-icon name="account_circle" />
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
              :filter="filter"
              style="width: 100%; height: 270px; margin-bottom: 20px;"
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
        <div class="col-md-9 col-xs-12">
            <q-input
              outlined
              v-model="form.nro_documento"
              label="Observacion Factura"
              type="textarea"
              input-class="textArea"
            >
            </q-input>
        </div>
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 buttons"
          style="align-self: center; text-align: center"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
            @click="
             dialog= true
            "
          >
            <q-icon size="25px" name="save" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Imprimir</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            style="margin-right: 15px"
            padding="sm"
            @click="
              selectedAgencia = [];
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataTable();
            "
          >
            <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Imprimir</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="
              selectedAgencia = [];
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataTable();
            "
          >
            <q-icon size="25px" name="print" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Imprimir</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <q-dialog v-model="deletePopup">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Desea Eliminar el Registro?...
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Aceptar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data-Init="setDataInit"
      @set-Data-Edit="setDataEdit"
      @get-Data-Table="getDataTable"
      @set-Data-Table-All="setDataTableAll"
      @get-Data-Table-All="getDataTableAll"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
      @put-Data-Select="putDataSelect"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue, rulesVue },
  data() {
    return {
      columns: [
        {
          name: "nb_agencia",
          label: "NRO.",
          field: "nb_agencia",
          align: "left",
          sortable: true,
        },
        {
          name: "tlf_agencia",
          label: "Concepto",
          field: "tlf_agencia",
          align: "left",
          sortable: true,
        },
        {
          name: "id",
          label: "Cantidad",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "tlf_agencia",
          label: "Costo Unitario",
          field: "tlf_agencia",
          align: "left",
          type: "string",
          sortable: true,
        },
        {
          name: "tlf_agencia",
          label: "Sub-Total",
          field: "tlf_agencia",
          align: "center",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
          field: "action",
          align: "center",
          sortable: true,
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
      estatus: [
        { label: "CERRADO", value: "C" },
        { label: "ACTIVO", value: "A" },
        { label: "INACTIVO", value: "I" },
      ],
      facturacion: [
        { label: "FACTURACION CREDITO", value: "C" },
        { label: "FACTURACION CONTADO", value: "A" },
        { label: "FACTURACION OTROS INGRESOS", value: "I" },
      ],
      correlativos: [],
      correlativosAll: [],
      agencias: [],
      datos: [],
      selectedAgencia: [],
      selectedTipo: [],
      agenciasSelected: [],
      tiposSelected: [],
      rpermisos: [],
      filter: "",
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      pagination: ref({
        rowsPerPage: 0,
      }),
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      reference: ref(false),
      deletePopup: ref(false),
      activoExistente() {
        $q.notify({
          message: "Solo puede haber un Activo por Agencia",
          color: "red",
        });
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
    this.$refs.methods.getData("/agencias", "setDataTable", "datos");
    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "controlcorrelativo",
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
    // Reglas de Correlativos
    reglasSegundoCorrelativo(val) {
      if (val - this.form.control_inicio < 0)
        return "El Ultimo Correlativo debe ser Mayor al Primero";
    },
    // Metodo para validar el lote
    validaLote() {
      if (
        this.form.estatus_lote === "A" &&
        this.correlativosAll.findIndex((item) => item.estatus_lote == "A") >= 0
      ) {
        return true;
      }
      return false;
    },

    // METODOS PARA PAGINA

    // Metodos para Setear Datos al Iniciar
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      this.getDataTableAll();
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(
        `/correlativo`,
        "setDataTable",
        "correlativos",
        {
          headers: {
            agencia: this.selectedAgencia.id,
            tipo: this.selectedTipo.id,
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage,
            order_by: this.pagination.sortBy,
            order_direction: this.pagination.descending ? "DESC" : "ASC",
            filter: this.pagination.filter,
            filter_value: this.pagination.filterValue,
          },
        }
      );
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Extraer Todos los Datos de Tabla
    getDataTableAll() {
      this.loading = true;
      this.$refs.methods.getData(
        "/correlativo",
        "setDataTableAll",
        "correlativosAll",
        {
          headers: {
            agencia: this.selectedAgencia.id,
            tipo: this.selectedTipo.id,
          },
        }
      );
    },
    // Metodo para Setear Todos los Datos de Tabla
    setDataTableAll(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodos para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].tipo = res.tipo;
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].ult_doc_referencia = res.ult_doc_referencia;
      this[dataRes].estatus_lote = this.filterDesc("estatus", res.estatus_lote);
      this[dataRes].serie_doc = res.serie_doc;
      this[dataRes].cod_agencia = res.cod_agencia;
    },
    // Metodos para Crear y Editar Datos
    sendData() {
      this.form.cod_agencia = this.selectedAgencia.id;
      this.form.tipo = this.selectedTipo.id;
      if (!this.form.id) {
        this.form.estatus_lote = "I";
        this.$refs.methods.createData(
          "/correlativo",
          this.form,
          "getDataTable"
        );
      } else {
        this.form.estatus_lote = this.form.estatus_lote.value;
        this.$refs.methods.putData(
          `/correlativo/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
    },
    // Metodos para hacer Edit con Select en Tabla
    putDataSelect(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].tipo = res.tipo;
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].ult_doc_referencia = res.ult_doc_referencia;
      this[dataRes].serie_doc = res.serie_doc;
      this[dataRes].cod_agencia = res.cod_agencia;

      // Valida que no se repita el lote Activo
      if (this.validaLote()) {
        this.activoExistente();
        this.getDataTable();
        return;
      }

      this.$refs.methods.putData(
        `/correlativo/${this.form.id}`,
        this.form,
        "getDataTable"
      );
    },
    // Metodos para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.tipo = "";
      this.form.control_inicio = "";
      this.form.control_final = "";
      this.form.ult_doc_referencia = "";
      this.form.estatus_lote = "";
      this.form.serie_doc = "";
      this.form.cod_agencia = "";
    },
  },
};
</script>

<style>
.q-textarea.q-field--labeled .q-field__control-container {
  height: 100px !important;
}
@media screen and (min-width: 600px) {
  .movilTitle {
    display: none;
  }
}
@media screen and (min-width: 600px) {
  .selectMobile {
    margin-bottom: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .texto {
    text-align: right;
  }
}
@media screen and (max-width: 1024px) {
  .buttons {
    margin-top: 20px;
  }
}
@media screen and (min-width: 600px) {
  .itemMovil {
    display: none;
  }
}
@media screen and (max-width: 600px) {
  .itemPC {
    display: none;
  }
}
@media screen and (min-width: 1024px) {
  .buttonsDiv {
    padding-left: 50px;
  }
}
@media screen and (max-width: 600px) {
  .movilTitle {
    display: block;
  }
}
@media screen and (min-width: 600px) {
  .cardMargin {
    padding-right: 20px !important;
  }
}
@media screen and (min-width: 1024px) {
  .cardMarginFilter {
    padding-right: 20px !important;
  }
}
@media screen and (max-width: 1024px) {
  .espaciadoGuias {
    margin-top: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .marginCards {
    margin-top: 30px;
  }
}
@media screen and (max-width: 600px) {
  .marginCards {
    margin-top: 10px;
  }
}
.menuFilter {
  padding-bottom: 1px;
}
@media screen and (min-width: 1024px) {
  .buttonMenu {
    padding-left: 5px;
  }
}
@media screen and (max-width: 1024px) {
  .check {
    padding-top: 0px;
    padding-bottom: 0px;
  }
}
@media screen and (max-width: 600px) {
  .selectmovil {
    margin-bottom: 20px;
  }
}
@media screen and (min-width: 600px) {
  .filterTop {
    padding-right: 45px;
  }
}
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
    padding-right: 15px;
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
