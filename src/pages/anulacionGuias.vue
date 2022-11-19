<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form class="q-gutter-md" @submit="sendData()">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.fecha"
                  label="Fecha"
                  class="pcform"
                  hint=""
                  :disable="true"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.motivo"
                  label="Motivo"
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  :options="motivos"
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="desc_concepto"
                  option-value="id"
                >
                </q-select>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.observacion"
                  label="Observación"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                    (val) => this.$refs.rulesVue.isMax(val, 500),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
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

    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="padding-right: 30px"
      >
        <div
          class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>MANTENIMIENTO - ANULACION DE GUIAS</strong>
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
            @update:model-value="getDataTable()"
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
            @update:model-value="getDataTable()"
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
          class="col-md-2 col-xl-2 col-lg2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="tipos"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'tiposSelected',
                  'tipos',
                  'descripcion'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="label"
            option-value="value"
            v-model="selectedTipo"
            outlined
            standout
            label="Tipo de Control"
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
          class="col-md-1 col-xl-1 col-lg-1 col-xs-4 col-sm-4"
          style="align-self: center; text-align: center"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="resetFilters()"
          >
            <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Resetear Filtros</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-y-md" style="margin-top: -20px">
      <q-table
        :rows="guias"
        binary-state-sort
        row-key="id"
        :columns="columns"
        :separator="separator"
        :rows-per-page-options="[5, 10, 15, 20, 50]"
        @request="getDataTable"
        style="width: 100%; height: 580px"
        :loading="loading"
        :grid="$q.screen.xs"
        v-model:pagination="pagination"
        :visible-columns="visibleColumns"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:body-cell-nro_documento="props">
          <q-td :props="props">
            {{ buildNroDoc("nro_documento", props.row) }}
          </q-td>
        </template>
        <template v-slot:body-cell-cod_cliente_org="props">
          <q-td :props="props">
            {{ buildNbCliente(props.row) }}
          </q-td>
        </template>
        <template v-slot:body-cell-nro_doc="props">
          <q-td :props="props">
            {{ buildNroDoc("nro_doc", props.row) }}
          </q-td>
        </template>
        <template v-slot:body-cell-nro_ref="props">
          <q-td :props="props">
            {{ buildNroDoc("nro_ref", props.row) }}
          </q-td>
        </template>
        <template v-slot:body-cell-nro_doc_principal="props">
          <q-td :props="props">
            {{ buildNroDoc("nro_doc_principal", props.row) }}
          </q-td>
        </template>
        <template v-slot:body-cell-estatus_administra="props">
          <q-td :props="props">
            {{
              filterDesc("estatus_administrativo", props.row.estatus_administra)
            }}
          </q-td>
        </template>
        <template v-slot:body-cell-tipo_factura="props">
          <q-td :props="props">
            {{ filterDesc("tipo_factura", props.row.tipo_factura) }}
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="primary"
              icon="disabled_by_default"
              :disabled="
                this.allowOption(3)
                  ? true
                  : props.row.estatus_administra == 'A'
                  ? true
                  : false
              "
              @click="
                this.form.guia = props.row;
                dialog = true;
              "
            ></q-btn>
          </q-td>
        </template>
        <template v-slot:item="props">
          <div
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
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="disabled_by_default"
                      :disabled="
                        this.allowOption(3)
                          ? true
                          : props.row.estatus_administra == 'A'
                          ? true
                          : false
                      "
                      @click="
                        this.form.guia = props.row;
                        dialog = true;
                      "
                    ></q-btn>
                    <q-item-label>
                      {{ col.value }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="confirmPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Está seguro que desea Anular el documento seleccionado?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            color="primary"
            @click="this.confirmUpload = false"
            v-close-popup
          />
          <q-btn
            flat
            label="Guardar"
            color="primary"
            v-close-popup
            @click="this.confirmUpload = true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Init="setDataInit"
      @set-Data-Edit="setDataEdit"
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

export default {
  components: { methods: methodsVue, rulesVue },
  data() {
    return {
      columns: [
        {
          name: "nro_documento",
          label: "N° Control",
          field: "nro_documento",
          align: "left",
          sortable: true,
        },
        {
          name: "nro_doc",
          label: "N° Doc.",
          field: "nro_doc",
          align: "left",
        },
        {
          name: "nro_ref",
          label: "Ref.",
          field: "nro_ref",
          align: "left",
        },
        {
          name: "fecha_emision",
          label: "Emisión",
          field: "fecha_emision",
          align: "left",
          format: (val) => val.split("-").reverse().join("/"),
          sortable: true,
        },
        {
          name: "cod_cliente_org",
          label: "Cliente",
          field: "cod_cliente_org",
          align: "left",
          sortable: true,
        },
        {
          name: "monto_total",
          label: "Monto Total",
          field: "monto_total",
          align: "right",
          sortable: true,
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
          name: "nro_doc_principal",
          label: "Doc. Ppal.",
          field: "nro_doc_principal",
          align: "left",
        },
        {
          name: "estatus_administra",
          label: "Estatus",
          field: "estatus_administra",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_factura",
          label: "Tipo Factura",
          field: "tipo_factura",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: "Acción",
          align: "center",
        },
      ],
      form: {
        guia: {},
        fecha: moment().format("DD/MM/YYYY"),
        motivo: "",
        observacion: "",
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
      tipo_factura: [
        { label: "GUÍAS CRÉDITO", value: "FG" },
        { label: "PREPAGO", value: "FP" },
        { label: "OTROS INGRESOS", value: "FO" },
        { label: "GUÍAS CONTADO", value: "FC" },
      ],
      tipos: [
        { label: "GUÍA CARGA", value: "GC" },
        { label: "FACTURA", value: "FA" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "nro_documento",
        descending: true,
        filter: "",
        filterValue: "",
        rowsNumber: "",
      },
      clientesAll: [],
      clientesParticularesAll: [],
      motivos: [],
      guias: [],
      fecha_desde: moment().format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
      agencias: [],
      selectedAgencia: [],
      agenciasSelected: [],
      selectedTipo: [],
      rpermisos: [],
      confirmUpload: false,
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      confirmPopUp: ref(false),
      visibleColumns: ref([
        "nro_documento",
        "nro_doc",
        "nro_ref",
        "fecha_emision",
        "cod_cliente_org",
        "monto_total",
        "nro_doc_principal",
        "estatus_administra",
        "action",
      ]),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Anulacion de Guias", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/clientes", "setData", "clientesAll");
    this.$refs.methods.getData("/coperacion", "setData", "motivos", {
      headers: {
        tipo: 2,
      },
    });
    this.$refs.methods.getData(
      "/cparticulares",
      "setData",
      "clientesParticularesAll"
    );

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "anulacionguias",
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
      this.selectedTipo = this.tipos[0];
      this.getDataTable();
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      if (this.selectedTipo.value == "FA") {
        this.visibleColumns.push("tipo_factura");
      } else {
        this.visibleColumns = this.visibleColumns.filter(
          (item) => item !== "tipo_factura"
        );
      }
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "guias", {
        headers: {
          agencia: this.selectedAgencia.id,
          tipo: this.selectedTipo.value,
          desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
          hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
          estatus_admin_ex: "G,C",
          no_abono: "S",
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          order_by: this.pagination.sortBy,
          order_direction: this.pagination.descending ? "DESC" : "ASC",
          filter: this.pagination.filter,
          filter_value: this.pagination.filterValue,
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
    // Metodo para anular una guia
    async sendData() {
      this.confirmPopUp = true;
      await this.until((_) => this.confirmUpload == true);
      if (!this.confirmUpload) {
        return;
      } else {
        this.confirmUpload = false;
      }

      // Actualizamos la Guia Carga o Factura
      var formGuia = {};
      formGuia.cod_concepto = this.form.motivo.id;
      formGuia.fecha_anulacion = moment(this.form.fecha, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      formGuia.observacion = this.form.observacion;
      formGuia.estatus_administra = "A";
      formGuia.check_anulada = 1;
      formGuia.fecha_anulada = moment(this.form.fecha, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

      // Actualizamos datos del movimiento
      await api
        .put(`/mmovimientos/${this.form.guia.id}`, formGuia, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .catch(() => {
          this.errorMessage(
            "Error del Sistema. Problemas al actualizar los datos de la anulación. Comuníquese con el proveedor del Sistemas..."
          );
          return;
        });

      // Si el tipo de documento es factura y es del tipo credito
      if (
        this.form.guia.t_de_documento == "FA" &&
        (this.form.guia.tipo_factura == "FG" ||
          this.form.guia.tipo_factura == "FC")
      ) {
        //Reversar si hubo un descuento
        if (this.form.guia.porc_descuento > 0) {
          await api
            .get(`/mmovimientos/`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                nro_doc_ppal: this.form.guia.nro_documento,
                nro_ctrl_doc_ppal: this.form.guia.nro_control,
              },
            })
            .then((res) => {
              if (res.data.data.length > 0) {
                for (var i = 0; i <= res.data.data.length - 1; i++) {
                  var formGuiaDescuento = {};
                  var monto_base = this.parseFloatN(
                    this.form.guia.monto_ref_cte_sin_imp
                  );
                  var porc_imp = this.parseFloatN(this.form.guia.porc_impuesto);
                  var monto_imp =
                    (this.parseFloatN(monto_base) *
                      this.parseFloatN(porc_imp)) /
                    100;
                  var monto_total =
                    this.parseFloatN(monto_base) + this.parseFloatN(monto_imp);

                  formGuiaDescuento.monto_base = monto_base;
                  formGuiaDescuento.monto_subtotal = monto_base;
                  formGuiaDescuento.monto_impuesto = 0;
                  formGuiaDescuento.monto_total = monto_total;
                  formGuiaDescuento.saldo = monto_total;
                  formGuiaDescuento.porc_descuento = 0;
                  formGuiaDescuento.monto_descuento = 0;
                  formGuiaDescuento.base_comision_vta_rcl = monto_base;

                  api.put(
                    `/mmovimientos/${res.data.data[i].id}`,
                    formGuiaDescuento,
                    {
                      headers: {
                        Authorization: `Bearer ${LocalStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );

                  //buscar comisión por venta del agente
                  if (res.data.data[i].cod_agente_venta) {
                    api
                      .get(`/agentes/${res.data.data[i].cod_agente_venta}`, {
                        headers: {
                          Authorization: `Bearer ${LocalStorage.getItem(
                            "token"
                          )}`,
                        },
                      })
                      .then((res) => {
                        if (res.data.porc_comision_venta > 0) {
                          // Busca la comision de Venta
                          api
                            .get(`/ccomisiones`, {
                              headers: {
                                Authorization: `Bearer ${LocalStorage.getItem(
                                  "token"
                                )}`,
                                cod_movimiento: res.data.data[i].id,
                                tipo: "V",
                              },
                            })
                            .then((res) => {
                              if (res.data.data[0]) {
                                var comisionVenta = {
                                  monto_comision:
                                    (this.parseFloatN(monto_base) *
                                      this.parseFloatN(
                                        res.data.porc_comision_venta
                                      )) /
                                    100,
                                };
                                // Actualiza la comision de Venta
                                api.put(
                                  `/ccomisiones/${res.data.data[0].id}`,
                                  comisionVenta,
                                  {
                                    headers: {
                                      Authorization: `Bearer ${LocalStorage.getItem(
                                        "token"
                                      )}`,
                                    },
                                  }
                                );
                              }
                            });
                        }
                      });
                  }
                }
              }
            });
        }

        // Cambiar las guias asociadas a la factura a pendientes de Facturar y quitar asociacion
        await api
          .get(`/mmovimientos/`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              tipo_doc_ppal: "FA",
              nro_doc_ppal: this.form.guia.nro_documento,
              nro_ctrl_doc_ppal: this.form.guia.nro_control,
              cod_ag_doc_ppal: this.form.guia.cod_agencia,
              tipo: "GC",
            },
          })
          .then((res) => {
            if (res.data.data.length > 0) {
              for (var i = 0; i <= res.data.data.length - 1; i++) {
                var formGuiaAnul1 = {};
                formGuiaAnul1.estatus_administra = "F";
                formGuiaAnul1.tipo_doc_principal = null;
                formGuiaAnul1.nro_doc_principal = null;
                formGuiaAnul1.serie_doc_principal = null;
                formGuiaAnul1.nro_ctrl_doc_ppal = null;
                formGuiaAnul1.cod_ag_doc_ppal = null;
                formGuiaAnul1.nro_ctrl_doc_ppal_new = null;
                formGuiaAnul1.fecha_pxfac = moment().format("YYYY-MM-DD");
                formGuiaAnul1.check_pxfac = 1;
                formGuiaAnul1.fecha_anulada = moment().format("YYYY-MM-DD");
                formGuiaAnul1.check_anulada = 1;

                api.put(`/mmovimientos/${res.data.data[i].id}`, formGuiaAnul1, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                });
              }
            }
          });
      }

      //si es una guia carga reversar ó anular las comisiones generadas
      if (this.form.guia.t_de_documento == "GC") {
        await api
          .get(`/ccomisiones`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              cod_movimiento: this.form.guia.id,
              mayor: "S",
            },
          })
          .then((res) => {
            if (res.data.data.length > 0) {
              for (var i = 0; i <= res.data.data.length - 1; i++) {
                var fecha_emision = res.data.data[i].fecha_emision;
                var formComision = {};

                if (
                  fecha_emision == formGuia.fecha_anulacion ||
                  res.data.data[i].estatus == 0
                ) {
                  formComision = { estatus: 2 }; //anulado
                  // Actualiza las comisiones
                  api.put(`/ccomisiones/${res.data.data[i].id}`, formComision, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    },
                  });
                } else {                  
                  //Creo un registro de reverso de la comision
                  formComision = res.data.data[i];
                  delete formComision.id;
                  formComision.monto_comision = res.data.data[i].monto_comision * -1;
                  formComision.estatus = 0; //por descontar
                  formComision.fecha_emision = formGuia.fecha_anulacion;
                  // Actualiza las comisiones
                  api.post(`/ccomisiones/`, formComision, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    },
                  });
                }
              }
            }
          });
      }

      this.$q.notify({
        message: "Guía Anulada con exito!",
        color: "green",
      });

      this.getDataTable();
      this.dialog = false;
      this.resetForm();
    },
    // Arma el numero de documento en diferentes formatos
    buildNroDoc(field, row) {
      var response = "";
      switch (field) {
        case "nro_documento":
          if (row.t_de_documento == "FA") {
            response = "FA-";
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
            response = "GC-";
            response += row.nro_documento;
          }
          break;
        case "nro_doc":
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
        case "nro_doc_principal":
          if (row.tipo_doc_principal) response = row.tipo_doc_principal + "-";
          if (row.serie_doc_principal)
            response += row.serie_doc_principal + " - ";
          if (!row.nro_ctrl_doc_ppal && row.nro_doc_principal) {
            response += row.nro_doc_principal;
          } else if (!row.nro_ctrl_doc_ppal_new && row.nro_ctrl_doc_ppal) {
            response += row.nro_ctrl_doc_ppal;
          } else if (row.nro_ctrl_doc_ppal_new) {
            response += row.nro_ctrl_doc_ppal_new;
          }
          break;
        default:
          break;
      }
      return response;
    },
    // Metodo para armar el nombre del cliente Origen
    buildNbCliente(row) {
      if (row.t_de_documento == "FA") {
        if (!row.ci_rif_cte_conta_org || row.ci_rif_cte_conta_org == "") {
          return this.findIndex(
            "clientesAll",
            row.cod_cliente_org,
            "nb_cliente"
          );
        } else {
          return this.findIndex(
            "clientesParticularesAll",
            row.cod_cliente_org,
            "nb_cliente"
          );
        }
      } else {
        if (row.pagado_en == "O") {
          if (!row.ci_rif_cte_conta_org || row.ci_rif_cte_conta_org == "") {
            return this.findIndex(
              "clientesAll",
              row.cod_cliente_org,
              "nb_cliente"
            );
          } else {
            return this.findIndex(
              "clientesParticularesAll",
              row.cod_cliente_org,
              "nb_cliente"
            );
          }
        } else {
          if (!row.ci_rif_cte_conta_dest || !row.ci_rif_cte_conta_dest == "") {
            return this.findIndex(
              "clientesAll",
              row.cod_cliente_dest,
              "nb_cliente"
            );
          } else {
            return this.findIndex(
              "clientesParticularesAll",
              row.cod_cliente_dest,
              "nb_cliente"
            );
          }
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
    // Metodos para Resetear Datos
    resetForm() {
      this.form.id = "";
      this.form.motivo = "";
      this.form.observacion = "";
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selectedAgencia = this.agencias[0];
      this.selectedTipo = this.tipos[0];
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
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
  },
};
</script>
