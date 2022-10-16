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
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    reglasPrimerCorrelativo,
                  ]"
                  @update:model-value="
                    this.form.cant_asignada = 0;
                    this.form.cant_disponible = 0;
                    if (
                      this.form.control_final - this.form.control_inicio + 1 >
                      0
                    ) {
                      this.form.cant_asignada =
                        this.form.control_final - this.form.control_inicio + 1;
                        this.form.cant_disponible = this.form.cant_asignada;
                    }
                  "
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
                    reglasUltimoCorrelativo,
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    this.form.cant_asignada = 0;
                    this.form.cant_disponible = 0;
                    if (
                      this.form.control_final - this.form.control_inicio + 1 >
                      0
                    ) {
                      this.form.cant_asignada =
                        this.form.control_final - this.form.control_inicio + 1;
                        this.form.cant_disponible = this.form.cant_asignada;
                    }
                  "
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.cant_asignada"
                  :readonly="true"
                  label="Cantidad Asignada"
                  class="pcform"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="assignment" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.cant_disponible"
                  :readonly="true"
                  label="Cantidad Disponible"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="assignment_turned_in" />
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
                  :readonly="this.selectedAgencia.id ? true : false"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
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
                  lazy-rules
                  option-label="nb_agencia"
                  option-value="id"
                  @update:model-value="
                    this.$refs.methods.getData(
                      `/agentes`,
                      'setData',
                      'agentes',
                      {
                        headers: {
                          agencia: form.cod_agencia.id,
                        },
                      }
                    );
                    this.$refs.methods.getData(
                      `/clientes`,
                      'setData',
                      'clientes',
                      {
                        headers: {
                          agencia: form.cod_agencia.id,
                        },
                      }
                    );
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
                  label="Agente"
                  class="pcform"
                  hint=""
                  :readonly="this.selectedAgente.id ? true : false"
                  :options="agentesSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
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
                  :readonly="this.selectedCliente.id ? true : false"
                  label="Cliente"
                  hint=""
                  :options="clientesSelected"
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
              class="row justify-center items-center content-center"
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
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>MANTENIMIENTO - ASIGNACIÓN DE GUIAS</strong>
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
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agentesSelected"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
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
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="clientesSelected"
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
      </div>
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -20px"
      >
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            v-model="guia_desde"
            rounded
            dense
            outlined
            standout
            label="Guia Desde"
            @keyup.enter="getDataTable()"
            mask="##########"
          >
            <template v-slot:append>
              <q-icon
                @click="getDataTable()"
                class="cursor-pointer"
                name="search"
              />
            </template>
          </q-input>
        </div>
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            v-model="guia_hasta"
            rounded
            dense
            outlined
            standout
            label="Guia Hasta"
            @keyup.enter="getDataTable()"
            mask="##########"
          >
            <template v-slot:append>
              <q-icon
                @click="getDataTable()"
                class="cursor-pointer"
                name="search"
              />
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-6"
          style="margin-top: -4px"
        >
          <q-field
            hide-bottom-space
            borderless
            dense
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
                @update:model-value="getDataTable()"
              />
            </template>
          </q-field>
        </div>
        <div
          class="col-md-12 col-xl-2 col-lg-2 col-xs-12 col-sm-6 selectMobile3"
          style="margin-left: -50px"
        >
          <q-btn
            dense
            color="primary"
            :disabled="this.allowOption(2)"
            round
            @click="
              this.dialog = true;
              this.form.cod_agencia = findIndex(
                'agencias',
                this.selectedAgencia.id,
                'nb_agencia'
              );
              this.form.cod_agente = findIndex(
                'agentes',
                this.selectedAgente.id,
                'persona_responsable'
              );
              this.form.cod_cliente = findIndex(
                'clientes',
                this.selectedCliente.id,
                'nb_cliente'
              );
              this.form.fecha_asignacion = this.dateInit;
            "
            padding="sm"
            style="margin-right: 25px"
          >
            <q-icon size="25px" name="add" color="white"> </q-icon>
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
            style="margin-right: 25px"
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
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>
          <q-btn dense color="primary" round padding="sm">
            <q-icon size="25px" name="sticky_note_2" color="white"> </q-icon>
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
    <div class="q-pa-md q-gutter-y-md" style="margin-top: -40px">
      <q-table
        :rows="guias"
        binary-state-sort
        row-key="id"
        :columns="columns"
        :loading="loading"
        :separator="separator"
        style="width: 100%"
        :grid="$q.screen.xs"
        :rows-per-page-options="[5, 10, 15, 20, 50]"
        @request="getDataTable"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:body-cell-cod_agencia="props">
          <q-td :props="props">
            {{ findIndex("agencias", props.row.cod_agencia, "nb_agencia") }}
          </q-td>
        </template>
        <template v-slot:body-cell-cod_agente="props">
          <q-td :props="props">
            {{
              findIndex("agentes", props.row.cod_agente, "persona_responsable")
            }}
          </q-td>
        </template>
        <template v-slot:body-cell-cod_cliente="props">
          <q-td :props="props">
            {{ findIndex("clientes", props.row.cod_cliente, "nb_cliente") }}
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="primary"
              icon="delete"
              :disabled="this.allowOption(4)"
              @click="selected = props.row.id"
              @click.capture="deleteData(props.row)"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="primary"
              icon="sim_card_download"
              :disabled="props.row.cant_disponible > 0 ? false : true"
              @click="selected = props.row.id"
              @click.capture="printLote(props.row)"
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
                    <q-item-label v-if="col.name === 'cod_agencia'">
                      {{
                        findIndex(
                          "agencias",
                          props.row.cod_agencia,
                          "nb_agencia"
                        )
                      }}
                    </q-item-label>
                    <q-item-label v-if="col.name === 'cod_agente'">
                      {{
                        findIndex(
                          "agentes",
                          props.row.cod_agente,
                          "persona_responsable"
                        )
                      }}
                    </q-item-label>
                    <q-item-label v-if="col.name === 'cod_cliente'">
                      {{
                        findIndex(
                          "clientes",
                          props.row.cod_cliente,
                          "nb_cliente"
                        )
                      }}
                    </q-item-label>
                    <q-btn
                      v-if="col.name === 'action'"
                      dense
                      round
                      flat
                      color="primary"
                      icon="delete"
                      :disabled="this.allowOption(4)"
                      @click="selected = props.row.id"
                      @click.capture="deleteData(props.row)"
                    ></q-btn>
                    <q-btn
                      v-if="col.name === 'action'"
                      dense
                      round
                      flat
                      color="primary"
                      icon="sim_card_download"
                      :disabled="props.row.cant_disponible > 0 ? false : true"
                      @click="selected = props.row.id"
                      @click.capture="printLote(props.row)"
                    ></q-btn>
                    <q-item-label
                      v-if="
                        col.name != 'cod_agencia' &&
                        col.name != 'cod_agente' &&
                        col.name != 'cod_cliente'
                      "
                    >
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
                `/cguias/${selected}`,
                'getDataTable'
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Table-All="setDataTableAll"
      @get-Data-Table-All="getDataTableAll"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import moment from "moment";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

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
        },
        {
          name: "control_final",
          label: "Segundo Correlativo",
          field: "control_final",
          align: "left",
          sortable: true,
        },
        {
          name: "cant_asignada",
          label: "Asignado",
          field: "cant_asignada",
          align: "right",
          sortable: true,
        },
        {
          name: "cant_disponible",
          label: "Disponible",
          field: "cant_disponible",
          align: "right",
          sortable: true,
        },
        {
          name: "cod_agencia",
          label: "Agencia",
          field: "cod_agencia",
          align: "left",
          sortable: true,
        },
        {
          name: "cod_agente",
          label: "Agente",
          field: "cod_agente",
          align: "left",
          sortable: true,
        },
        {
          name: "cod_cliente",
          label: "Cliente",
          field: "cod_cliente",
          align: "left",
          sortable: true,
        },
        {
          name: "fecha_asignacion",
          label: "Fecha de Asignación",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
          format: (val) => val.split("-").reverse().join("/"),
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
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
      pagination: {
        page: 1,
        rowsPerPage: 5,
        sortBy: "control_inicio",
        descending: true,
        filter: "",
        filterValue: "",
        rowsNumber: "",
      },
      guias: [],
      guiasAll: [],
      agencias: [],
      rpermisos: [],
      menus: [],
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
      disabledAgencia: true,
      disabledAgente: false,
      disabledCliente: false,
      disabledInputsEdit: false,
    };
  },
  setup() {
    const $q = useQuasar();
    moment.locale("es");
    return {
      dateInit: moment().format("L"),
      loading: ref(false),
      separator: ref("vertical"),
      deletePopup: ref(false),
      dialog: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Asignacion de Guias", "");
    this.$refs.methods.getData("/agencias", "setData", "agencias");
    this.getDataTable();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "asignacionguias",
      },
    });
  },
  methods: {
    // Metodo para filtrar opciones de Selects
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
    // Regla particular del Primer Correlativo
    reglasPrimerCorrelativo(val) {
      if (this.guiasAll.findIndex((item) => item.control_inicio == val) >= 0)
        return "El lote de guía ya se encuentra cargado desde este número!";
    },
    // Regla particular de Correlativo
    reglasUltimoCorrelativo(val) {
      if (val - this.form.control_inicio < 0)
        return "El Ultimo Correlativo debe ser Mayor al Primero";
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos Iniciales
    setData(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      this.getDataTableAll();
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/cguias`, "setDataTable", "guias", {
        headers: {
          agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
          agente: this.selectedAgente.id ? this.selectedAgente.id : "",
          cliente: this.selectedCliente.id ? this.selectedCliente.id : "",
          desde: this.guia_desde,
          hasta: this.guia_hasta,
          disp: this.selectedCulminado,
          tipo: 20,
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
    // Metodo para Extraer Todos los Datos de Tabla
    getDataTableAll() {
      this.loading = true;
      this.$refs.methods.getData("/cguias", "setDataTableAll", "guiasAll", {
        headers: {
          tipo: 20,
        },
      });
    },
    // Metodo para Setear Todos los Datos de Tabla
    setDataTableAll(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Crear Datos
    sendData() {
      this.form.fecha_asignacion = this.form.fecha_asignacion
        .split("/")
        .reverse()
        .join("-");
      this.form.cod_cliente = this.form.cod_cliente.id;
      this.form.cod_agente = this.form.cod_agente.id;
      this.form.cod_agencia = this.form.cod_agencia.id;

      this.$refs.methods.createData(`/cguias`, this.form, "getDataTable");
      this.dialog = false;
      this.resetForm();
    },
    // Metodo para Eliminar Datos Seleccionados
    deleteData(row) {
      if (
        row.cant_disponible != 0 &&
        row.cant_disponible != row.cant_asignada
      ) {
        this.$q.notify({
          message:
            "El Lote no puede ser Eliminado, debido a que se está usando actualmente!",
          color: "red",
        });
      } else {
        this.deletePopup = true;
      }
    },
    // Metodo para Eliminar Datos Seleccionados
    printLote(row) {
      console.log("Aqui imprimo el Lote");
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.control_inicio = "";
      this.form.control_final = "";
      this.form.cant_asignada = "";
      this.form.cant_disponible = "";
      this.form.fecha_asignacion = "";
      this.form.cod_agencia = "";
      this.form.cod_agente = "";
      this.form.cod_cliente = "";
    },
  },
};
</script>
