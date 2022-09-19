<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
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
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(val, 10, 'Requiere Retorno') ||
                      '',
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
                  :rules="[reglasCorrelativo]"
                  hint=""
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
                  label="Fecha de Asignación"
                  hint=""
                  class="pcform"
                  v-model="form.fecha_asignacion"
                  lazy-rules
                  mask="##/##/####"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.checkDate(val, 'Requiere Retorno') ||
                      '',
                  ]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.fecha_asignacion"
                          mask="DD/MM/YYYY"
                          @update:model-value="this.$refs.qDateProxy.hide()"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_agencia"
                  label="Agencia"
                  hint=""
                  :readonly="this.disabledAgencia"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  :options="agenciasSelected"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'agenciasSelected',
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
                  @update:model-value="
                    this.axiosConfig.headers.agencia = this.form.cod_agencia.id;
                    getData('/clientes', 'setData', 'clientes');
                    getData('/agentes', 'setData', 'agentes');
                    this.form.cod_cliente = '';
                    this.form.cod_agente = '';
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
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_agente"
                  :readonly="this.disabledAgente"
                  label="Agente"
                  class="pcform"
                  hint=""
                  :options="agentesSelected"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'agentesSelected',
                        'agentes',
                        'persona_responsable'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
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
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_cliente"
                  :readonly="this.disabledCliente"
                  label="Cliente"
                  hint=""
                  :options="clientesSelected"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'clientesSelected',
                        'clientes',
                        'nb_cliente'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="nb_cliente"
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
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
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
                @click="this.resetForm()"
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
        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
        style="
          align-self: center;
          text-align: center;
          font-size: 20px;
          margin-top: 20px;
        "
      >
        <p><strong>MANTENIMIENTO - ASIGNACIÓN DE GUIAS</strong></p>
      </div>

      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center"
      >
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMarginFilter selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agenciasSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
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
              getDataGuias();
              getData(`/agentes`, 'setDataPaginated', 'agentes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
              getData(`/clientes`, 'setDataPaginated', 'clientes', {
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

        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agentesSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'agentesSelected',
                  'agentes',
                  'persona_responsable'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="persona_responsable"
            option-value="id"
            v-model="selectedAgente"
            outlined
            standout
            label="Agente"
            @update:model-value="getDataGuias()"
            ><template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon
                @click.stop.prevent="
                  this.selectedAgente = [];
                  getDataGuias();
                "
                class="cursor-pointer"
                name="filter_alt_off"
              />
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>

        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-6 selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="clientesSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
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
            @update:model-value="getDataGuias()"
            ><template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon
                @click.stop.prevent="
                  this.selectedCliente = [];
                  getDataGuias();
                "
                class="cursor-pointer"
                name="filter_alt_off"
              />
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>
      </div>

      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cajaMobile"
        style="align-self: center; text-align: center"
      >
        <q-card
          bordered
          class="row col-md-8 col-xl-8 col-lg-8 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center"
        >
          <q-card-section
            class="row col-md-12 col-xs-12 menuFilter"
            style="align-self: center; text-align: center"
          >
            <div class="col-md-4 col-xs-12">
              <q-input
                outlined
                v-model="guia_hasta"
                dense
                label="Guia Desde:"
                class="pcform"
                @keydown.enter="
                  if (this.reglasCorrelativoFilter()) {
                    getDataGuias();
                  }
                "
                hide-bottom-space
                hint=""
                lazy-rules
              >
                <template v-slot:append>
                  <q-icon
                    @click="
                      if (this.reglasCorrelativoFilter()) {
                        getDataGuias();
                      }
                    "
                    class="cursor-pointer"
                    name="search"
                  />
                </template>
              </q-input>
            </div>

            <div class="col-md-4 col-xs-12 col-sm-7">
              <q-input
                outlined
                v-model="guia_desde"
                dense
                @keydown.enter="
                  if (this.reglasCorrelativoFilter()) {
                    getDataGuias();
                  }
                "
                label="Guia Hasta:"
                class="inputMenuGuias"
                hide-bottom-space
                lazy-rules
                hint=""
              >
                <template v-slot:append>
                  <q-icon
                    @click="
                      if (this.reglasCorrelativoFilter()) {
                        getDataGuias();
                      }
                    "
                    class="cursor-pointer"
                    name="search"
                  />
                </template>
              </q-input>
            </div>

            <div class="col-md-3 col-xs-12 col-sm-5">
              <q-field
                hide-bottom-space
                borderless
                dense
                class="checkboxCulminado"
                v-model="selectedCulminado"
              >
                <template v-slot:control>
                  <q-checkbox
                    size="md"
                    v-model="selectedCulminado"
                    true-value="0"
                    false-value=""
                    style="font-size: 13px"
                    label="Culminado"
                    @update:model-value="getDataGuias()"
                  />
                </template>
              </q-field>
            </div>
          </q-card-section>
        </q-card>

        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 botonesGuias"
          style="text-align: center; align-self: center"
        >
          <q-btn
            dense
            color="primary"
            :disabled="this.allowOption(1)"
            round
            @click="
              this.dialog = true;
              this.setDataCreate();
            "
            padding="sm"
            style="margin-right: 25px"
          >
            <q-icon size="40px" name="add" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Agregar Control</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            :disabled="this.allowOption(4)"
            style="margin-right: 25px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataGuias();
            "
          >
            <q-icon size="40px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn dense color="primary" round padding="sm">
            <q-icon size="40px" name="sticky_note_2" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              transition-show="scale"
              style="max-height: 30px"
              transition-hide="scale"
              color="primary"
              >Carta para el Cliente</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-y-md">
      <q-table
        :rows="datos"
        binary-state-sort
        row-key="id"
        :columns="columns"
        :loading="loading"
        :separator="separator"
        style="width: 100%"
        :grid="$q.screen.xs"
        :rows-per-page-options="[5, 10, 15, 20, 50]"
        @request="onRequest"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" style="padding-top: 46px"/>
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
                this.resetForm();
                this.getData(`/cguias/${props.row.id}`, `setDataEdit`, 'form');
                dialog = true;
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
              @click.capture="deletePopup = true"
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
                    <q-chip
                      v-if="col.name === 'status'"
                      :color="
                        props.row.status == 'Active'
                          ? 'green'
                          : props.row.status == 'Disable'
                          ? 'red'
                          : 'grey'
                      "
                      text-color="white"
                      dense
                      class="text-weight-bolder"
                      square
                      >{{ col.value }}</q-chip
                    >
                    <q-btn
                      v-else-if="col.name === 'action'"
                      dense
                      round
                      flat
                      color="primary"
                      icon="edit"
                      :disabled="this.allowOption(3)"
                      @click="
                        this.resetForm();
                        this.getData(
                          `/cguias/${props.row.id}`,
                          `setDataEdit`,
                          'form'
                        );
                        dialog = true;
                      "
                    ></q-btn>
                    <q-chip
                      v-if="col.name === 'status'"
                      :color="
                        props.row.status == 'Active'
                          ? 'green'
                          : props.row.status == 'Disable'
                          ? 'red'
                          : 'grey'
                      "
                      text-color="white"
                      dense
                      class="text-weight-bolder"
                      square
                      >{{ col.value }}</q-chip
                    >
                    <q-btn
                      v-else-if="col.name === 'action'"
                      dense
                      round
                      flat
                      color="primary"
                      icon="delete"
                      :disabled="this.allowOption(4)"
                      @click="selected = props.row.id"
                      @click.capture="deletePopup = true"
                    ></q-btn>
                    <q-item-label
                      v-else
                      caption
                      :class="col.classes ? col.classes : ''"
                      >{{ col.value }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
      </q-table>
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
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @get-Data-Guias="getDataGuias()"
      @set-Data="setData"
      @set-Data-Edit="setDataEdit"
      @set-Data-Table="setDataTable"
      @reset-Loading="resetLoading"
      @set-Data-Init="setDataInit"
      @set-Data-Paginated="setDataPaginated"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";

import rulesVue from "src/components/rules.vue";

import moment from "moment";

import { useQuasar } from "quasar";

import methodsVue from "src/components/methods.vue";

import { LocalStorage } from "quasar";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
  },
  name: "AsignacionGuias",
  data() {
    return {
      columns: [
        {
          name: "control_inicio",
          label: "Primer Correlativo",
          field: "control_inicio",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "control_final",
          label: "Segundo Correlativo",
          field: "control_final",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cant_asignada",
          label: "Asignado",
          field: "cant_asignada",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cant_disponible",
          label: "Disponible",
          field: "cant_disponible",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_asignacion",
          label: "Fecha de Asignación",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_asignacion",
          label: "Fecha de Asignación",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cant_disponible",
          label: "Pendiente",
          field: "cant_disponible",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
          sortable: true,
          required: true,
        },
      ],
      form: {
        control_inicio: "",
        control_final: "",
        cant_asignada: "",
        cant_disponible: "",
        fecha_asignacion: "",
        cod_agencia: "",
        cod_agente: "",
        cod_cliente: "",
        tipo: "20",
      },
      datos: [],
      agencias: [],
      count: 1,
      rpermisos: [],
      menus: [],
      orderDirection: "",
      currentPage: 1,
      clientes: [],
      agentes: [],
      agenciasSelected: [],
      agentesSelected: [],
      agentesFormSelected: [],
      clientesSelected: [],
      clientesFormSelected: [],
      clientesForm: [],
      agentesForm: [],
      selected: [],
      selectedAgencia: [],
      selectedGuiaCarga: "20",
      selectedGuiaFactura: "",
      selectedCulminado: "",
      guia_desde: "",
      guia_hasta: "",
      selectedCliente: [],
      selectedAgente: [],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      disabledAgencia: true,
      disabledAgente: false,
      disabledCliente: false,
      disabledInputsEdit: false,
    };
  },
  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const order = ref(false);
    const pagination = ref({
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: "",
      order_by: "control_inicio",
    });
    return {
      pagination,
      anulate: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
    };
  },
  mounted() {
    this.getData("/agencias", "setDataInit", "agencias");
    this.loading = true;
    this.$refs.methods.getData("/rpermisos", "setData", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "asignacionguias",
      },
    });
  },
  methods: {
    // Metodo para Setear Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },
    // Metodo para Actualizar Tabla
    onRequest(res) {
      let { page, rowsPerPage, sortBy, descending } = res.pagination;
      if (this.currentPage !== page) descending = "";

      const fetchCount =
        rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;
      if (!sortBy) sortBy = "";

      if (sortBy == "action") {
        descending = "";
        sortBy = "";
      }

      if (descending !== "") {
        this.pagination.descending = !this.pagination.descending;
        if (this.pagination.descending == true) {
          this.orderDirection = "DESC";
        } else this.orderDirection = "ASC";
      }

      this.pagination.sortBy = sortBy;
      this.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage;
      var cliente = "";
      var agente = "";
      if (this.selectedCliente.id) cliente = this.selectedCliente.id;
      if (this.selectedAgente.id) agente = this.selectedAgente.id;
      if (!sortBy) sortBy = "control_inicio";
      if (this.orderDirection == "") this.orderDirection = "DESC";
      this.$refs.methods.getData(`/cguias`, "setDataTable", "datos", {
        headers: {
          page: page,
          limit: fetchCount,
          order_by: sortBy,
          order_direction: this.orderDirection,
          agencia: this.selectedAgencia.id,
          agente: agente,
          cliente: cliente,
          disp: this.selectedCulminado,
          tipo: "20",
          desde: this.guia_desde,
          hasta: this.guia_hasta,
        },
      });
    },
    // Metodo para Actualizar Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
    },
    // Metodo para Setear Datos al Abrir Modal de Crear
    setDataCreate() {
      moment.locale("es");
      this.form.fecha_asignacion = moment().format("L");
      this.form.cod_agencia = this.selectedAgencia;
      if (this.selectedAgencia.id) {
        this.disabledAgencia = true;
      } else {
        this.disabledAgencia = false;
      }
      if (this.selectedCliente.id) {
        this.form.cod_cliente = this.selectedCliente;
        this.disabledCliente = true;
      } else {
        this.disabledCliente = false;
      }
      if (this.selectedAgente.id) {
        this.form.cod_agente = this.selectedAgente;
        this.disabledAgente = true;
      } else {
        this.disabledAgente = false;
      }
    },
    // Metodo para Filtrar Selects
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
    // Metodo para Resetear Carga
    resetLoading() {
      this.loading = false;
    },
    // Metodo de Permisos
    allowOption(option) {
      return (
        this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0
      );
    },
    // Regla particular de Correlativo
    reglasCorrelativo(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if ((val !== null) !== "") {
        if (val - this.form.control_inicio < 0) {
          return "El Ultimo Correlativo debe ser Mayor al Primero";
        }
        if (val.length > 10) {
          return "Deben ser Maximo 10 caracteres";
        }
      }
    },
    // Regla Particular de Correlativo para Filtros
    reglasCorrelativoFilter() {
      if (this.guia_desde == "" || this.guia_desde == null) return true;
      if (this.guia_desde - this.guia_hasta < 0) {
        this.$q.notify({
          message: "El Ultimo Correlativo debe ser Mayor al Primero",
          color: "red",
        });
        return false;
      }
      return true;
    },

    // METODOS DE PAGINA

    // Metodo para hacer Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para hacer Get de Guias
    getDataGuias() {
      var cliente = "";
      var agente = "";
      var sortBy = this.pagination.sortBy;
      var orderDirection = this.orderDirection;
      if (this.selectedCliente.id) cliente = this.selectedCliente.id;
      if (this.selectedAgente.id) agente = this.selectedAgente.id;
      if (!sortBy) sortBy = "control_inicio";
      if (orderDirection == "") orderDirection = "DESC";
      this.$refs.methods.getData(`/cguias`, "setDataTable", "datos", {
        headers: {
          page: 1,
          limit: 5,
          order_by: sortBy,
          order_direction: orderDirection,
          agencia: this.selectedAgencia.id,
          agente: agente,
          cliente: cliente,
          disp: this.selectedCulminado,
          tipo: "20",
          desde: this.guia_desde,
          hasta: this.guia_hasta,
        },
      });
    },
    // Metodo para Setear datos Paginados
    setDataPaginated(res, dataRes) {
      this[dataRes] = res.data;
    },
    // Metodo para Setear Datos No Paginados
    setData(res, dataRes) {
      this[dataRes] = res;
    },
    // Metodo para Setear Datos Iniciales
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      this.pagination.sortBy = "control_inicio";
      this.getData("/clientes", "setDataPaginated", "clientes");
      this.getData("/agentes", "setDataPaginated", "agentes");
      this.getData(`/cguias`, "setDataTable", "datos", {
        headers: {
          agencia: this.selectedAgencia.id,
          page: 1,
          tipo: "20",
          limit: 5,
          order_direction: "DESC",
          order_by: "control_inicio",
        },
      });
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.loading = false;
      this[dataRes].cant_disponible = res.cant_disponible;
      if (this.form.cant_disponible == "0") {
        this.disabledInputsEdit = true;
      }
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].cant_asignada = res.cant_asignada;
      this.form.fecha_asignacion = res.fecha_asignacion
        .split("-")
        .reverse()
        .join("/");
      var cod_agencia = res.cod_agencia;
      var cod_agente = res.cod_agente;
      var cod_cliente = res.cod_cliente;
      if (cod_agencia) {
        for (var i = 0; i <= this.agencias.length - 1; i++) {
          if (this.agencias[i].id == cod_agencia) {
            this.form.cod_agencia = this.agencias[i];
            break;
          }
        }
      }
      if (cod_agente) {
        for (var i = 0; i <= this.agentes.length - 1; i++) {
          if (this.agentes[i].id == cod_agente) {
            this.form.cod_agente = this.agentes[i];
            break;
          }
        }
      }
      if (cod_cliente) {
        for (var i = 0; i <= this.clientes.length - 1; i++) {
          if (this.clientes[i].id == cod_cliente) {
            this.form.cod_cliente = this.clientes[i];
            break;
          }
        }
      }
      this[dataRes].id = res.id;
    },
    // Metodo para Eliminar Datos Seleccionados
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/cguias/${idpost}`, "getDataGuias");
      this.loading = true;
    },
    // Metodo para Editar o Crear Datos
    sendData() {
      this.form.fecha_asignacion = this.form.fecha_asignacion
        .split("/")
        .reverse()
        .join("-");
      this.form.cod_cliente = this.form.cod_cliente.id;
      this.form.cod_agente = this.form.cod_agente.id;
      this.form.cod_agencia = this.form.cod_agencia.id;
      if (!this.form.id) {
        this.$refs.methods.createData(`/cguias`, this.form, "getDataGuias");
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/cguias/${this.form.id}`,
          this.form,
          "getDataGuias"
        );
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      (this.form.control_inicio = ""),
        (this.form.control_final = ""),
        (this.form.cant_asignada = ""),
        (this.form.cant_disponible = ""),
        (this.form.fecha_asignacion = ""),
        (this.form.cod_agencia = ""),
        (this.form.cod_agente = ""),
        (this.form.cod_cliente = "");
    },
  },
};
</script>

<style>
.hide {
  display: none;
}
@media screen and (min-width: 1024px) {
  .inputMenuGuias {
    margin-right: 20px;
  }
}
@media screen and (min-width: 600px) {
  .menuFilter {
    padding-bottom: 1px;
  }
}
@media screen and (max-width: 1024px) {
  .inputMenuGuias {
    margin-top: 14px;
  }
}
@media screen and (min-width: 600px) and (max-width: 1024px) {
  .titleMenu {
    padding-bottom: 1px;
  }
}
@media screen and (max-width: 600px) {
  .titleMenu {
    margin-top: 15px;
  }
}
@media screen and (max-width: 1024px) {
  .checkboxGuias {
    margin-top: 14px;
  }
}
@media screen and (max-width: 1024px) {
  .checkboxGuias {
    margin-left: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 30px;
  }
}
@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 30px;
  }
}
@media screen and (min-width: 600px) {
  .movilTitle {
    display: none;
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

@media screen and (max-width: 600px) {
  .cajaMobile {
    padding: 5px !important;
  }
}

@media screen and (max-width: 1024px) {
  .selectMobile {
    margin-bottom: 15px !important;
  }
}
@media screen and (max-width: 600px) {
  .selectMobile2 {
    margin-bottom: 15px;
  }
}
@media screen and (min-width: 1024px) {
  .checkboxCulminado {
    margin-top: -6px;
  }
}
@media screen and (min-width: 600px) and (max-width: 1024px) {
  .checkboxCulminado {
    margin-top: 8px;
    text-align: center;
  }
}
</style>
