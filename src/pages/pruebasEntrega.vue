<template>
  <q-page class="pagina q-pa-md">
    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>MANTENIMIENTO - PRUEBAS DE ENTREGA</strong>
          </p>
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
            label="Agencia Origen"
            @update:model-value="
              this.selectedCliente = [];
              this.clientesLoading = true;
              this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
              this.getDataTable();
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
            v-model="selectedAgenciaDestino"
            outlined
            standout
            label="Agencia Destino"
            @update:model-value="
              this.selectedClienteDestino = [];
              this.clientesDestinoLoading = true;
              this.$refs.methods.getData(
                `/clientes`,
                'setData',
                'clientesDestino',
                {
                  headers: {
                    agencia: this.selectedAgenciaDestino.id,
                  },
                }
              );
              this.getDataTable();
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Desde"
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
            label="Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_hasta"
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            rounded
            dense
            input-debounce="0"
            v-model="nro_guia"
            outlined
            standout
            label="NRO. Guia"
            @blur="getDataTable()"
            @keyup.enter="getDataTable()"
          >
          </q-input>
        </div>
      </div>
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -25px"
      >
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            label="Cliente Origen"
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
            <template v-slot:clientesLoading>
              <q-inner-loading showing color="primary" class="loading" />
            </template>
          </q-select>
        </div>
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="clientesDestinoSelected"
            :loading="clientesDestinoLoading"
            :disable="clientesDestinoLoading"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'clientesDestinoSelected',
                  'clientesDestino',
                  'nb_cliente'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="nb_cliente"
            option-value="id"
            v-model="selectedClienteDestino"
            outlined
            standout
            label="Cliente Destino"
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
            <template v-slot:clientesDestinoLoading>
              <q-inner-loading showing color="primary" class="loading" />
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
            :options="estatusSelected"
            use-input
            hide-selected
            fill-input
            option-label="label"
            option-value="value"
            input-debounce="0"
            v-model="selectedEstatus"
            outlined
            standout
            label="Estatus"
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
          class="col-md-1 col-xl-1 col-lg-1 col-xs-6 col-sm-6 selectMobile2"
          style="align-self: center; text-align: center; padding-left: 0px"
        >
          <q-field
            hide-bottom-space
            borderless
            dense
            style="padding-left: 15px"
            v-model="checkTransito"
          >
            <template v-slot:control>
              <q-checkbox
                size="md"
                v-model="checkTransito"
                true-value="1"
                false-value="0"
                style="font-size: 13px"
                label="TRANSITO"
                @click="getDataTable()"
              />
            </template>
          </q-field>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
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
            @click="this.resetFilters()"
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
    </div>

    <div class="q-pa-md justify-center" style="margin-top: -25px">
      <q-table
        :rows="guias"
        :columns="columns"
        binary-state-sort
        :separator="separator"
        row-key="id"
        :loading="loading"
        :rows-per-page-options="[]"
        style="width: 100%; height: 580px"
        :grid="$q.screen.xs"
        v-model:pagination="pagination"
        @request="getDataTable"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" v-if="props.rowIndex == 0">
            <q-td colspan="100%" style="font-size: 20px; color: #283593">
              <div class="text-left">
                <strong> {{ "ORIGEN: " }} </strong>
                {{
                  this.findIndex(
                    "agencias",
                    this.guias[props.rowIndex].cod_agencia,
                    "nb_agencia"
                  ) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                }}
                <strong> {{ "DESTINO: " }} </strong>
                {{
                  this.findIndex(
                    "agencias",
                    this.guias[props.rowIndex].cod_agencia_dest,
                    "nb_agencia"
                  )
                }}
              </div>
            </q-td>
          </q-tr>
          <q-tr
            :props="props"
            v-else-if="
              props.rowIndex > 0 &&
              this.guias[props.rowIndex].cod_agencia +
                '-' +
                this.guias[props.rowIndex].cod_agencia_dest !=
                this.guias[props.rowIndex - 1].cod_agencia +
                  '-' +
                  this.guias[props.rowIndex - 1].cod_agencia_dest
            "
          >
            <q-td colspan="100%" style="font-size: 20px; color: #283593">
              <div class="text-left">
                <strong> {{ "ORIGEN: " }} </strong>
                {{
                  this.findIndex(
                    "agencias",
                    this.guias[props.rowIndex].cod_agencia,
                    "nb_agencia"
                  ) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                }}
                <strong> {{ "DESTINO: " }} </strong>
                {{
                  this.findIndex(
                    "agencias",
                    this.guias[props.rowIndex].cod_agencia_dest,
                    "nb_agencia"
                  )
                }}
              </div>
            </q-td>
          </q-tr>
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name == 'modalidad_pago'">
                {{ filterDesc("modalidadPago", props.row.modalidad_pago) }}
              </div>
              <div v-else-if="col.name == 'pagado_en'">
                {{ filterDesc("pagadoEn", props.row.pagado_en) }}
              </div>
              <div v-else-if="col.name == 'check_pagado'">
                <q-checkbox
                  size="md"
                  v-model="props.row.check_pagado"
                  true-value="1"
                  false-value="0"
                  :disable="true"
                  style="font-size: 13px"
                />
              </div>
              <div v-else-if="col.name == 'estatus_oper_desc'">
                <q-select
                  dense
                  outlined
                  :options="estatusSelected"
                  option-label="label"
                  option-value="value"
                  v-model="props.row.estatus_oper_desc"
                />
              </div>
              <div v-else-if="col.name == 'persona_recibio'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.persona_recibio"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 50)]"
                  style="padding-top: 20px; min-width: 250px"
                />
              </div>
              <div v-else-if="col.name == 'ci_persona_recibio'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.ci_persona_recibio"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 12)]"
                  style="padding-top: 20px; min-width: 150px"
                />
              </div>
              <div v-else-if="col.name == 'fecha_recepcion_format'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.fecha_recepcion_format"
                  lazy-rules
                  mask="##/##/####"
                  :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
                  style="padding-top: 20px; min-width: 150px"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy">
                        <q-date
                          v-model="props.row.fecha_recepcion_format"
                          mask="DD/MM/YYYY"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div v-else-if="col.name == 'hora_recepcion'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.hora_recepcion"
                  mask="fulltime"
                  :rules="['fulltime']"
                  style="padding-top: 20px; min-width: 120px"
                >
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy">
                        <q-time
                          v-model="props.row.hora_recepcion"
                          with-seconds
                          format24h
                        >
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div v-else-if="col.name == 'agentes'">
                <q-select
                  dense
                  outlined
                  :options="this.agentes[props.row.cod_agencia_dest - 1]"
                  use-input
                  :loading="agentesLoading"
                  :disable="agentesLoading"
                  hide-selected
                  fill-input
                  option-label="persona_responsable"
                  option-value="id"
                  v-model="props.row.agentes_entrega"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                  <template v-slot:agentesLoading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                </q-select>
              </div>
              <div v-else>
                {{ col.value }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Init="setDataInit"
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
  components: {
    methods: methodsVue,
    rulesVue,
  },
  data() {
    return {
      columns: [
        {
          name: "cliente_orig_desc",
          label: "Cliente Origen",
          field: "cliente_orig_desc",
          align: "left",
        },
        {
          name: "cliente_dest_desc",
          label: "Cliente Destino",
          field: "cliente_dest_desc",
          align: "left",
        },
        {
          name: "fecha_emision",
          label: "Fecha Emisión",
          field: "fecha_emision",
          align: "left",
          format: (val) => val.split("-").reverse().join("/"),
        },
        {
          name: "fecha_envio",
          label: "Fecha Envío",
          field: "fecha_envio",
          align: "left",
          format: (val) => val.split("-").reverse().join("/"),
        },
        {
          name: "nro_documento",
          label: "Nro. Guía",
          field: "nro_documento",
          align: "left",
        },
        {
          name: "modalidad_pago",
          label: "Forma Pago",
          field: "modalidad_pago",
          align: "left",
        },
        {
          name: "pagado_en",
          label: "Pagado En",
          field: "pagado_en",
          align: "left",
        },
        {
          name: "check_pagado",
          label: "Check Pagado",
          field: "check_pagado",
          align: "center",
        },
        {
          name: "estatus_oper_desc",
          label: "Estatus Operativo",
          field: "estatus_oper_desc",
          align: "left",
        },
        {
          name: "persona_recibio",
          label: "Persona que Recibió",
          field: "persona_recibio",
          align: "left",
        },
        {
          name: "ci_persona_recibio",
          label: "C:I Persona Recibió",
          field: "ci_persona_recibio",
          align: "left",
        },
        {
          name: "fecha_recepcion_format",
          label: "Fecha Entrega",
          field: "fecha_recepcion_format",
          align: "left",
          format: (val) => (val ? val.split("-").reverse().join("/") : ""),
        },
        {
          name: "hora_recepcion",
          label: "Hora Entrega",
          field: "hora_recepcion",
          align: "left",
        },
        {
          name: "agentes",
          label: "Agente Entrega",
          field: (row) => row.agentes_entrega.persona_responsable,
          align: "left",
        },
      ],
      estatusSelected: [
        { label: "EN PROCESO DE ENVÍO", value: "PR" },
        { label: "PENDIENTE POR ENTREGA", value: "PE" },
        { label: "ENTREGA CONFORME", value: "CO" },
        { label: "ENTREGA NO CONFORME", value: "NC" },
      ],
      modalidadPago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
        { label: "PREPAGADA", value: "PP" },
      ],
      pagadoEn: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      guias: [],
      agencias: [],
      agentes: [],
      agenciasDestino: [],
      clientes: [],
      clientesDestino: [],
      agenciasSelected: [],
      agenciasDestinoSelected: [],
      selectedAgencia: [],
      selectedAgenciaDestino: [],
      clientesSelected: [],
      selectedCliente: [],
      clientesLoading: false,
      clientesDestinoSelected: [],
      selectedClienteDestino: [],
      clientesDestinoLoading: false,
      agentesLoading: true,
      selectedEstatus: [],
      checkTransito: "0",
      pagado_en: "0",
      nro_guia: "",
      estatus: "",
      fecha_desde: moment().format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      pagination: {
        page: 1,
        rowsPerPage: 0,
      },
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Pruebas de Entrega", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/agentes", "setData", "agentes", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        group_ag: "S",
      },
    });

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "pruebasentrega",
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
    findIndex(array, value, field) {
      var find = this[array].findIndex((item) => item.id == value);
      return find >= 0 ? this[array][find][field] : null;
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

    // METODOS DE PAGINA

    // Metodo para Setear Datos Generales
    async setDataInit(res, dataRes) {
      this.loading = true;
      this[dataRes] = res.data ? res.data : res;
      this.getDataTable();
    },
    // Metodo para Setear Datos Generales
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable() {
      this.loading = true;
      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "guias", {
        headers: {
          agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
          cliente_orig: this.selectedCliente.id ? this.selectedCliente.id : "",
          agencia_dest: this.selectedAgenciaDestino.id
            ? this.selectedAgenciaDestino.id
            : "",
          cliente_dest: this.selectedClienteDestino.id
            ? this.selectedClienteDestino.id
            : "",
          desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
          hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
          nro_documento: this.nro_guia ? this.nro_guia : "",
          estatus_oper: this.selectedEstatus.value
            ? this.selectedEstatus.value
            : "",
          transito: this.checkTransito == "1" ? this.checkTransito : "",
          tipo: "GC",
          estatus_admin_ex: "A",
          order_pe: "S",
        },
      });
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para armar el nombre del cliente Origen
    buildNbCliente(type, row) {
      if (type == "cod_cliente_org") {
        if (!row.ci_rif_cte_conta_org || row.ci_rif_cte_conta_org == "") {
          return this.findIndex(
            "clientesAll",
            row.cod_cliente_org,
            "nb_cliente"
          );
        } else {
          var find = this.clientesParticularesAll.findIndex(
            (item) =>
              item.cod_agencia == row.cod_agencia &&
              item.cod_cliente == row.cod_cliente_org &&
              item.rif_ci == row.ci_rif_cte_conta_org
          );
          return find >= 0
            ? this.clientesParticularesAll[find]["nb_cliente"]
            : null;
        }
      } else {
        if (!row.ci_rif_cte_conta_dest || row.ci_rif_cte_conta_dest == "") {
          return this.findIndex(
            "clientesAll",
            row.cod_cliente_dest,
            "nb_cliente"
          );
        } else {
          var find = this.clientesParticularesAll.findIndex(
            (item) =>
              item.cod_agencia == row.cod_agencia_dest &&
              item.cod_cliente == row.cod_cliente_dest &&
              item.rif_ci == row.ci_rif_cte_conta_dest
          );
          return find >= 0
            ? this.clientesParticularesAll[find]["nb_cliente"]
            : null;
        }
      }
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selectedAgencia = [];
      this.selectedAgenciaDestino = [];
      this.selectedCliente = [];
      this.selectedClienteDestino = [];
      this.selectedEstatus = [];
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.checkTransito = "0";
      this.nro_guia = "";
      this.getDataTable();
    },
  },
};
</script>
