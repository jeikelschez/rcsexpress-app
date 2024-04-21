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
            <strong>ADMINISTRACIÓN - ANULACIÓN DE NOTAS CONTABLES</strong>
          </p>
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
          class="col-md-3 col-xl-3 col-lg-3 col-xs-10 col-sm-10 cardMargin"
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
            label="Tipo de Documento"
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
          class="col-md-1 col-xl-1 col-lg-1 col-xs-2 col-sm-2"
          style="align-self: center; text-align: center"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-left: 15px"
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
        :rows="notas"
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
        <template v-slot:body-cell-cliente_orig_desc="props">
          <q-td :props="props">
            {{ props.row.cliente_orig_desc }}
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
                this.form.nota = props.row;
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
                  <q-item-section side>
                    <q-item-label>
                      {{ col.value }}
                    </q-item-label>
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
                        this.form.nota = props.row;
                        dialog = true;
                      "
                    ></q-btn>
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
          sortable: true,
        },
        {
          name: "cliente_orig_desc",
          label: "Cliente",
          field: "cliente_orig_desc",
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
        nota: {},
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
        { label: "NOTAS DE DÉBITO", value: "ND" },
        { label: "NOTAS DE CRÉDITO", value: "NC" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "nro_documento",
        descending: true,
        rowsNumber: "",
      },
      clientesAll: [],
      clientesParticularesAll: [],
      motivos: [],
      notas: [],
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
        "cliente_orig_desc",
        "monto_total",
        "nro_doc_principal",
        "action",
      ]),
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Administración - Anulación de Notas Contables",
      ""
    );
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/clientes", "setData", "clientesAll");
    this.$refs.methods.getData("/coperacion", "setData", "motivos", {
      headers: {
        tipo: 4,
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
        menu: "anulacionnotascontables",
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
    getDataTable(props) {
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "notas", {
        headers: {
          filters: JSON.stringify({
            agencia: this.selectedAgencia.id,
            tipo_in: this.selectedTipo.value
              ? this.selectedTipo.value
              : "NC,ND",
            desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
            hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
            estatus_admin_ex: "A",
          }),
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          order: this.pagination.sortBy,
          direction: this.pagination.descending ? "DESC" : "ASC",
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
    // Metodo para anular una nota
    async sendData() {
      this.confirmPopUp = true;
      await this.until((_) => this.confirmUpload == true);
      if (!this.confirmUpload) {
        return;
      } else {
        this.confirmUpload = false;
      }

      this.dialog = false;
      this.loading = true;

      // Actualizamos la Nota
      let formNota = {};
      formNota.cod_concepto = this.form.motivo.id;
      formNota.fecha_anulacion = moment(this.form.fecha, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      formNota.observacion = this.form.observacion;
      formNota.estatus_administra = "A";
      formNota.check_anulada = 1;
      formNota.fecha_anulada = moment(this.form.fecha, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );

      // Actualizamos datos del movimiento
      await api
        .put(`/mmovimientos/${this.form.nota.id}`, formNota, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .catch(() => {
          this.errorMessage(
            "Error del Sistema. Problemas al actualizar los datos de la anulación. Comuníquese con el proveedor del Sistemas..."
          );
          this.loading = false;
          return;
        });

      // Anular las comisiones generadas por la nota contable
      await api
        .get(`/ccomisiones`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            cod_movimiento: this.form.nota.id,
          },
        })
        .then((res) => {
          if (res.data.data.length) {
            for (var i = 0; i < res.data.data.length; i++) {
              let comisionVenta = {};
              comisionVenta.estatus = 2;
              api.put(`/ccomisiones/${res.data.data[i].id}`, comisionVenta, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              });
            }
          }
        });

      // Devolver el saldo de la factura
      await api
        .get(`/mmovimientos/`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            filters: JSON.stringify({
              tipo: this.form.nota.tipo_doc_principal,
              nro_documento: this.form.nota.nro_doc_principal,
              agencia: this.form.nota.cod_agencia,
            }),
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            let formFact = {};
            if (this.form.t_de_documento == "NC") {
              formFact.saldo =
                res.data.data[0].saldo + this.form.nota.monto_total;
            } else {
              formFact.saldo =
                res.data.data[0].saldo - this.form.nota.monto_total;
            }

            if (formFact.saldo > 0) {
              formFact.estatus_administra = "P";
            } else {
              formFact.estatus_administra = "C";
            }

            api
              .put(`/mmovimientos/${res.data.data[0].id}`, formFact, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .catch(() => {
                this.errorMessage(
                  "Error del Sistema. Problemas al actualizar el saldo de la Factura Origen. Comuníquese con el proveedor del Sistemas..."
                );
                this.loading = false;
                return;
              });
          }
        });

      // Coloco la base de comision inicial tanto de venta como de seguro
      await api
        .get(`/mmovimientos/`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            filters: JSON.stringify({
              tipo_doc_ppal: this.form.nota.tipo_doc_principal,
              nro_doc_ppal: this.form.nota.nro_doc_principal,
              agencia: this.form.nota.cod_agencia,
              serie_doc_ppal: this.form.nota.serie_doc_principal,
              tipo: "GC",
            }),
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              // Busco la comision del Agente de ventas
              let idGuia = res.data.data[i].id;
              let co_base_vta_ant = 0;
              let co_base_seg_ant = 0;
              let comision_venta = res.data.data[i].comision_venta;
              let comision_seguro = res.data.data[i].comision_seg_vta;
              let formGuia = {};
              if (res.data.data[i].cod_agente_venta) {
                api
                  .get(`/agentes/${res.data.data[i].cod_agente_venta}`, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    },
                  })
                  .then((res2) => {
                    co_base_vta_ant = (
                      (comision_venta * 100) /
                      res2.data.porc_comision_venta
                    ).toFixed(2);
                    co_base_seg_ant = (
                      (comision_seguro * 100) /
                      res2.data.porc_comision_seguro
                    ).toFixed(2);
                    formGuia = {
                      base_comision_vta_rcl: co_base_vta_ant,
                      base_comision_seg: co_base_seg_ant,
                    };

                    api
                      .put(`/mmovimientos/${idGuia}`, formGuia, {
                        headers: {
                          Authorization: `Bearer ${LocalStorage.getItem(
                            "token"
                          )}`,
                        },
                      })
                      .catch(() => {
                        this.errorMessage(
                          "Error del Sistema. Problemas al actualizar la base de comisiones de las Guias. Comuníquese con el proveedor del Sistemas..."
                        );
                        this.loading = false;
                        return;
                      });
                  });
              }
            }
          }
        });

      this.$q.notify({
        message: "Nota Anulada con exito!",
        color: "green",
      });

      this.loading = false;
      this.getDataTable();
      this.resetForm();
    },
    // Arma el numero de documento en diferentes formatos
    buildNroDoc(field, row) {
      var response = "";
      switch (field) {
        case "nro_documento":
          response = row.t_de_documento + " ";
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
          break;
        case "nro_doc":
          if (!row.nro_control) {
            response = row.serie_documento + " - " + row.nro_documento;
          } else {
            response = row.nro_control.padStart(4, "0000");
          }
          break;
        case "nro_ref":
          if (row.nro_control)
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
