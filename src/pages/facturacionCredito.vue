<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.control_inicio"
                  label="Primer Correlativo"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                  ]"
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="Ultimo Correlativo"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    (val) => this.reglasSegundoCorrelativo(val),
                  ]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.serie_doc"
                  label="Serie Lote"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 1)]"
                  @update:model-value="
                    form.serie_doc = form.serie_doc.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.ult_doc_referencia"
                  label="Ultimo Numero Asignado"
                  hint=""
                  class="pcform"
                  type="number"
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 10)]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="row justify-center items-center content-center">
              <q-btn
                label="Enviar"
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

    <q-page-sticky
      position="bottom-right"
      class="z-top"
      style="margin-right: 20px; margin-bottom: 20px"
    >
      <q-btn round color="primary" icon="description" @click="saveData()" />
    </q-page-sticky>

    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12" style="margin-top: 14px"
      >
        <div class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>VENTAS - FACTURACION CREDITO, CONTADO Y OTROS</strong>
          </p>
        </div>
        <div class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
        <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Guia Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="form.fecha_asignacion"
            lazy-rules
          >
          </q-input>
        </div>
        <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Guia Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="form.fecha_asignacion"
            lazy-rules
          >
          </q-input>
        </div>
        <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Guia Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="form.fecha_asignacion"
            lazy-rules
          >
          </q-input>
        </div>
        <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
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

    <div
      class="row q-pa-sm justify-center"
      style="padding-bottom: 0px; padding-top: 0px"
    >
      <q-form ref="formData">
        <div class="row items-center pageStyle">
          <div class="row col-md-12 col-xs-12"
            style="margin-bottom: 10px; margin-top: 20px"
          >
            <div class="col-md-12 col-xs-12">
              <q-select
                outlined
                v-model="form.nro_documento"
                label="Cliente"
                hint=""
                dense
              >
              </q-select>
            </div>
          </div>
          <div
            class="col-md-5 col-xs-12 cardMenus boxStyle"
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
                  padding-bottom: 6px;
                  padding-top: 10px;
                  padding-left: 6px;
                "
              >
                <div
                  class="col-md-4 col-xs-12"
                  style="margin-bottom: 6px"
                >
                  <q-checkbox
                    size="lg"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Facturacion Credito"
                  />
                </div>
                <div class="col-md-4 col-xs-12" style="margin-bottom: 6px">
                  <q-checkbox
                    size="lg"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Facturacion Contado"
                  />
                </div>
                <div
                  class="col-md-4 col-xs-12"
                  style="margin-bottom: 6px"
                >
                  <q-checkbox
                    size="lg"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Facturacion Otros Ingresos"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="col-md-7 col-xs-12 boxStyle"
            style="margin-bottom: 5px; padding-top: 0px"
          >
            <q-card
              class="q-pa-md col-md-4 col-xs-12"
              bordered
              style="padding: 5px; padding-top: 10px"
            >
              <q-card-section
                style="
                  padding-bottom: 7px;
                  padding-left: 10px;
                  padding-right: 10px;
                  padding-top: 10px;
                "
              >
                <div class="row">
                  <div class="col-md-4 col-xs-12">
                    <q-input
                      outlined
                      dense
                      style="padding-bottom: 10px"
                      v-model="form.nro_piezas"
                      label="Fecha Emision"
                      class="pcform"
                      input-class="text-right"
                      :rules="[
                        (val) => this.$refs.rulesVue.isReqCurrency(val, ''),
                        (val) => this.$refs.rulesVue.isMax(val, 3, ''),
                      ]"
                      hide-buttom-space
                      lazy-rules
                    >
                    </q-input>
                  </div>

                  <div class="col-md-4 col-xs-12">
                    <q-input
                      outlined
                      v-model="form.peso_kgs"
                      ref="formKGS"
                      label="Peso KGS"
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
                    </q-input>
                  </div>

                  <div class="col-md-2 col-xs-6">
                    <q-checkbox
                      size="lg"
                      true-value="1"
                      false-value="0"
                      style="font-size: 13px;margin-top: -5px;"
                      label="Credito"
                    />
                  </div>

                  <div class="col-md-2 col-xs-6">
                    <q-checkbox
                      size="lg"
                      true-value="1"
                      false-value="0"
                      style="font-size: 13px; margin-top: -5px;"
                      label="Contado"
                    />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="row col-md-12 col-xs-12"
            style="margin-top: 20px"
          >
            <div class="col-md-12 col-xs-6">
              <q-input
                outlined
                v-model="form.nro_documento"
                label="Observacion Factura"
                type="textarea"
                input-class="textArea"
              >
              </q-input>
            </div>
          </div>
          <div
            class="col-md-12 col-xs-12 lastboxStyle"
            style="margin-top: 20px"
          >
            <q-card
              class="q-pa-md col-md-12 col-xs-12 cardMenus"
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
                  <div class="col-md-2 col-xs-12">
                    <q-input
                      outlined
                      v-model="form.monto_subtotal"
                      label="Monto Subtotal"
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
                      label="Descuento"
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
                      label="Monto Base"
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
                      label="Monto Impuesto"
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
                      label="FPO"
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
                      label="Monto Total"
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
          <q-inner-loading :showing="visible">
            <q-spinner-gears size="50px" color="primary" />
          </q-inner-loading>
        </div>
      </q-form>
    </div>

    <q-dialog v-model="deletePopup">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estás seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="
              this.$refs.methods.deleteData(
                `/correlativo/${selected}`,
                'getDataTable'
              )
            "
          />
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
          name: "control_inicio",
          label: "Primer Correlativo",
          field: "control_inicio",
          align: "left",
          sortable: true,
        },
        {
          name: "control_final",
          label: "Ultimo Correlativo",
          field: "control_final",
          align: "left",
          sortable: true,
        },
        {
          name: "serie_doc",
          label: "Serie Lote",
          field: "serie_doc",
          align: "left",
          sortable: true,
        },
        {
          name: "ult_doc_referencia",
          label: "Ultimo Numero Asignado",
          field: "ult_doc_referencia",
          align: "left",
          type: "string",
          sortable: true,
        },
        {
          name: "estatus_lote",
          label: "Estatus",
          align: "center",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
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
      pagination: {
        page: 1,
        rowsPerPage: 5,
        sortBy: "control_final",
        descending: true,
        filter:
          "control_inicio,control_final,serie_doc,ult_doc_referencia,estatus_lote",
        filterValue: "",
        rowsNumber: "",
      },
      correlativos: [],
      correlativosAll: [],
      agencias: [],
      tipos: [],
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
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
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
    this.$emit("changeTitle", "SCEN - Ventas - Facturacion Credito, Contado y Otros", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");

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
      api
        .get(`/tipos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            fuente: "CR",
          },
        })
        .then((res) => {
          this.tipos = res.data;
          this.selectedTipo = this.tipos[0];
          this.getDataTable();
        });
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
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
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
.textArea {
  min-height: 155px !important;
}
@media screen and (min-width: 600px) {
  .movilTitle {
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
