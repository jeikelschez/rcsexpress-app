<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="form">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 90vw">
        <q-card-section>
          <q-form @submit="createDataCuentas()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formAgentes.nb_agente"
                  label="Nombre de Agente"
                  class="pcform"
                  hint=""
                  @update:model-value="
                    formAgentes.nb_agente =
                      formAgentes.nb_agente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formAgentes.fax_agente"
                  label="Fax"
                  hint=""
                  mask="#### - ##########"
                  @update:model-value="
                    formAgentes.fax_agente =
                      formAgentes.fax_agente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput50]"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formAgentes.persona_responsable"
                  label="Persona Responsable"
                  class="pcform"
                  hint=""
                  @update:model-value="
                    formAgentes.persona_responsable =
                      formAgentes.persona_responsable.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput50]"
                >
                  <template v-slot:prepend>
                    <q-icon name="contact_phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                      <q-select
                        outlined
                        v-model="formAgentes.flag_activo"
                        label="Activo"
                        hint=""
                        :rules="[reglasSelect]"
                        :options="estatus"
                        lazy-rules
                      >
                        <template v-slot:prepend>
                          <q-icon name="rule" />
                        </template>
                      </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formAgentes.dir_agente"
                  label="Dirección"
                  hint=""
                  @update:model-value="
                    formAgentes.dir_agente =
                      formAgentes.dir_agente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formAgentes.email_web"
                  label="Email"
                  hint=""
                  type="email"
                  @update:model-value="
                    formAgentes.email_web =
                      formAgentes.email_web.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <q-card
                class="q-pa-md"
                bordered
                style="width: 999px; max-width: 80vw; margin-bottom: 20px"
              >
                <q-card-section>
                  <div class="row">
                    <div
                      class="col-md-12 col-xs-12"
                      style="align-self: center; text-align: left; margin-top: -30px"
                    >
                      <h4 style="font-size: 20px" class="text-secondary"><strong>IDENTIFICACIÓN Y COMISIONES</strong></h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      v-model="formAgentes.rif_ci_agente"
                      label="RIF/CI"
                      hint=""
                      class="pcform"
                      @update:model-value="
                      formAgentes.rif_ci_agente =
                      formAgentes.rif_ci_agente.toUpperCase()"
                      lazy-rules
                      :rules="[reglaInput20]"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_box" />
                  </template>
                </q-input>
                </div>

                    <div class="col-md-6 col-xs-12">
                      <q-select
                        outlined
                        v-model="formAgentes.tipo_agente"
                        label="Tipo de Agente"
                        hint=""
                        :rules="[reglasSelect]"
                        :options="tipoDeAgente"
                        lazy-rules
                      >
                        <template v-slot:prepend>
                          <q-icon name="face" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formAgentes.porc_comision_venta"
                  label="% Comisión por Venta"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formAgentes.porc_comision_venta =
                      formAgentes.porc_comision_venta.toUpperCase()
                  "
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
                    </div>

                    <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  class="pcform"
                  v-model="formAgentes.porc_comision_entrega"
                  label="% Comisión por Entrega"
                  hint=""
                  @update:model-value="
                    formAgentes.porc_comision_entrega =
                      formAgentes.porc_comision_entrega.toUpperCase()
                  "
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
                    </div>

                    <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formAgentes.porc_comision_seguro"
                  label="% Comisión por Seguro"
                  hint=""
                  @update:model-value="
                    formAgentes.porc_comision_seguro =
                      formAgentes.porc_comision_seguro.toUpperCase()
                  "
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Agente"
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

    <q-dialog v-model="formEdit">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 90vw">
        <q-card-section>
          <q-form @submit="putDataCuentas()">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditAgentes.nb_agente"
                  label="Nombre de Agente"
                  class="pcform"
                  hint=""
                  @update:model-value="
                    formEditAgentes.nb_agente =
                      formEditAgentes.nb_agente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditAgentes.fax_agente"
                  label="Fax"
                  mask="#### - ##########"
                  hint=""
                  @update:model-value="
                    formEditAgentes.fax_agente =
                      formEditAgentes.fax_agente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput50]"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditAgentes.persona_responsable"
                  label="Persona Responsable"
                  class="pcform"
                  hint=""
                  @update:model-value="
                    formEditAgentes.persona_responsable =
                      formEditAgentes.persona_responsable.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput50]"
                >
                  <template v-slot:prepend>
                    <q-icon name="contact_phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                      <q-select
                        outlined
                        v-model="formEditAgentes.flag_activo"
                        label="Activo"
                        hint=""
                        :rules="[reglasSelect]"
                        :options="estatus"
                        lazy-rules
                      >
                        <template v-slot:prepend>
                          <q-icon name="rule" />
                        </template>
                      </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditAgentes.dir_agente"
                  label="Dirección"
                  hint=""
                  @update:model-value="
                    formEditAgentes.dir_agente =
                      formEditAgentes.dir_agente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditAgentes.email_web"
                  label="Email"
                  hint=""
                  type="email"
                  @update:model-value="
                    formEditAgentes.email_web =
                      formEditAgentes.email_web.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInput50]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <q-card
                class="q-pa-md"
                bordered
                style="width: 999px; max-width: 80vw; margin-bottom: 20px"
              >
                <q-card-section>
                  <div class="row">
                    <div
                      class="col-md-12 col-xs-12"
                      style="align-self: center; text-align: left; margin-top: -30px"
                    >
                      <h4 style="font-size: 20px" class="text-secondary"><strong>IDENTIFICACIÓN Y COMISIONES</strong></h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      v-model="formEditAgentes.rif_ci_agente"
                      label="RIF/CI"
                      hint=""
                      class="pcform"
                      @update:model-value="
                      formAgentes.rif_ci_agente =
                      formAgentes.rif_ci_agente.toUpperCase()"
                      lazy-rules
                      :rules="[reglaInput20]"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_box" />
                  </template>
                </q-input>
                </div>

                    <div class="col-md-6 col-xs-12">
                      <q-select
                        outlined
                        v-model="formEditAgentes.tipo_agente"
                        label="Tipo de Agente"
                        hint=""
                        :rules="[reglasSelect]"
                        :options="tipoDeAgente"
                        lazy-rules
                      >
                        <template v-slot:prepend>
                          <q-icon name="face" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditAgentes.porc_comision_venta"
                  label="% Comisión por Venta"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEditAgentes.porc_comision_venta =
                      formEditAgentes.porc_comision_venta.toUpperCase()
                  "
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
                    </div>

                    <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  class="pcform"
                  v-model="formEditAgentes.porc_comision_entrega"
                  label="% Comisión por Entrega"
                  hint=""
                  @update:model-value="
                    formEditAgentes.porc_comision_entrega =
                      formEditAgentes.porc_comision_entrega.toUpperCase()
                  "
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
                    </div>

                    <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditAgentes.porc_comision_seguro"
                  label="% Comisión por Seguro"
                  hint=""
                  @update:model-value="
                    formEditAgentes.porc_comision_seguro =
                      formEditAgentes.porc_comision_seguro.toUpperCase()
                  "
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Cuenta"
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

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="row">
          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 text-secondary"
            style="align-self: center; text-align: center"
          >
            <h4 style="font-size: 26px"><strong>MANTENIMIENTO - AGENTES</strong></h4>
          </div>

          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputestadospc"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="agencias"
              option-label="nb_agencia"
              option-value="id"
              v-model="selectedAgencia"
              outlined
              standout
              label="Escoge una Agencia"
              @update:model-value="this.axiosConfig.headers.agencia = this.selectedAgencia.id;
              getData(`/agentes`, 'setDataAgentes', 'agentes')"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>

          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputestadospc2"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-input
              rounded
              outlined
              standout
              v-model="filter"
              type="search"
              label="Búsqueda avanzada"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          
          <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar"
              rounded
              color="primary"
              :disabled="this.disabledCreate"
              @click="form = true"
              @click.capture="resetForm()"
              size="16px"
              class="q-px-xl q-py-xs insertarestadosmovil"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md" style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
              <q-table
                :rows="agentes"
                row-key="id"
                :columns="columnsAgentes"
                :separator="separator"
                class="my-sticky-column-table"
                :filter="filter"
                style="width: 100%"
                :loading="loading"
                :grid="$q.screen.xs"
                v-model:pagination="pagination"
              >
                <template v-slot:loading>
                  <q-inner-loading showing color="primary" />
                </template>
                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="edit"
                      :disabled="this.disabledEdit"
                      @click="
                      getData(`/agentes/${props.row.id}`, 'setDataAgentesEdit', 'formEditAgentes');
                      formEdit = true;
                      "
                    ></q-btn>
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="delete"
                      :disabled="this.disabledDelete"
                      @click="selected = props.row.id"
                      @click.capture="agentesDelete = true"
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
                              :disabled="this.disabledEdit"
                              @click="
                                getData(`/agentes/${props.row.id}`, 'setDataAgentesEdit', 'formEditAgentes');
                                formEdit = true;
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
                              :disabled="this.disabledDelete"
                              @click="selected = props.row.id"
                              @click.capture="agentesDelete = true"
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
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="agentesDelete">
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
    <desactivate-crud ref="desactivateCrud"
      @desactivar-Crud-Roles="desactivarCrudRoles"
    ></desactivate-crud>
    <methods ref="methods"
      @get-Data="
      this.axiosConfig.headers.agencia = this.selectedAgencia.id;
      getData(`/agentes`, 'setDataAgentes', 'agentes')"
      @set-Data-Agentes="setDataAgentes"
      @reset-Loading="resetLoading"
      @set-Data-Agentes-Edit="setDataAgentesEdit"
      @set-Data="setData"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { LocalStorage } from 'quasar';

import methodsVue from 'src/components/methods.vue';

import desactivateCrudVue from 'src/components/desactivateCrud.vue';

export default {
  components: { "desactivate-crud": desactivateCrudVue,
  "methods": methodsVue},
  name: "Agentes",
  data() {
    return {
      columnsAgentes: [
        {
          name: "nb_agente",
          label: "Nombre",
          field: "nb_agente",
          align: "left",
          sortable: true,
        },
        {
          name: "persona_responsable",
          label: "Persona Responsable",
          field: "persona_responsable",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_desc",
          label: "Tipo de Agente",
          field: "tipo_desc",
          align: "left",
          sortable: true,
        },
        {
          name: "activo_desc",
          label: "Estatus",
          field: "activo_desc",
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
      formAgentes: {
        nb_agente: "",
        persona_responsable: "",
        dir_agente: "",
        tlf_agente: "",
        fax_agente: "",
        email_web: "",
        tipo_agente: "",
        flag_activo: "",
        rif_ci_agente: "",
        porc_comision_venta: "",
        porc_comision_entrega: "",
        porc_comision_seguro: "",
        cod_agencia: [],
      },
      formEditAgentes: {
        nb_agente: "",
        persona_responsable: "",
        dir_agente: "",
        tlf_agente: "",
        fax_agente: "",
        email_web: "",
        flag_activo: "",
        tipo_agente: "",
        rif_ci_agente: "",
        porc_comision_venta: "",
        porc_comision_entrega: "",
        porc_comision_seguro: "",
        cod_agencia: [],
        id: "",
      },
      estatus: [
        { label: "ACTIVO", value: "1" },
        { label: "INACTIVO", value: "0" },
      ],
      tipoDeAgente: [
        { label: "RESPONSABLE DE AGENCIA", value: "RP" },
        { label: "COURIERS", value: "CR" },
      ],
      agencias: [],
      agentes: [],
      selected: [],
      selectedAgencia: [],
      agenciaRef: "",
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      control: 0,
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      axiosConfig: {
        headers: {
          Authorization: ``,
        }
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      loading: ref(false),
      separator: ref("vertical"),
      form: ref(false),
      formEdit: ref(false),
      agentesDelete: ref(false),
      filter: ref("")
    };
  },
  mounted() {
    this.getData('/agencias', 'setData', 'agencias');
    this.$refs.desactivateCrud.desactivarCrud('c_roles', 'd_roles', 'u_roles', 'desactivarCrudRoles')
  },
  methods: {
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglaInput(val) {
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if(val !== null) {
      if (val.length > 25) {
        return "Deben ser máximo 25 caracteres";
        }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
      }
    },
    reglaInput100(val) {
      if(val !== null) {
      if (val.length > 100) {
        return "Deben ser máximo 100 caracteres";
        }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
      }
    },
    reglaInput50(val) {
      if(val !== null) {
      if (val.length > 50) {
        return "Deben ser máximo 50 caracteres";
        }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
      }
    },
    reglaInput20(val) {
      if(val !== null) {
      if (val.length > 20) {
        return "Deben ser máximo 20 caracteres";
        }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
      }
    },
    desactivarCrudRoles(createItem, deleteItem, updateItem) {
      if (createItem == true) {
        this.disabledCreate = false
      }
      if (deleteItem == true) {
        this.disabledDelete = false
      }
      if (updateItem == true) {
        this.disabledEdit = false
      }
    },

    
    resetLoading() {
      this.loading = false;
    },
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setData(res, dataRes) {
      this[dataRes] = res
      this.getDataIniciar();
      this.loading = false
    },
    setDataAgentes(res, dataRes) {
      this[dataRes] = res
      this.loading = false
    },
    setDataAgentesEdit(res, dataRes) {
      this[dataRes].id = res.id
      this[dataRes].flag_activo = res.activo_desc
      this[dataRes].nb_agente = res.nb_agente
      this[dataRes].persona_responsable = res.persona_responsable
      this[dataRes].dir_agente = res.dir_agente
      this[dataRes].tlf_agente = res.tlf_agente
      this[dataRes].fax_agente = res.fax_agente
      this[dataRes].email_web = res.email_web
      this[dataRes].rif_ci_agente = res.rif_ci_agente
      this[dataRes].porc_comision_venta = res.porc_comision_venta
      this[dataRes].porc_comision_seguro = res.porc_comision_seguro
      this[dataRes].porc_comision_entrega = res.porc_comision_entrega
      this[dataRes].flag_activo = res.activo_desc
      this[dataRes].tipo_agente = res.tipo_desc
      this[dataRes].cod_agencia = res.cod_agencia
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/agentes/${idpost}`, 'getData', this.axiosConfig);
      this.loading = true;
    },
    createDataCuentas() {
      this.formAgentes.cod_agencia = this.selectedAgencia.id
      this.formAgentes.tipo_agente = this.formAgentes.tipo_agente.value
      this.formAgentes.flag_activo = this.formAgentes.flag_activo.value
      this.$refs.methods.createData(`/agentes`, this.formAgentes, 'getData', this.axiosConfig);
      this.loading = true;
      this.resetForm();
    },
    putDataCuentas() {
      this.formEditAgentes.flag_activo = this.formEditAgentes.flag_activo.value
      this.formEditAgentes.tipo_agente = this.formEditAgentes.tipo_agente.value
      this.$refs.methods.putData(`/agentes/${this.formEditAgentes.id}`, this.formEditAgentes, 'getData', this.axiosConfig);
      this.loading = true;
      this.resetFormEdit()
    },
    resetForm() {
      (this.formAgentes.nb_agente = ""),
      (this.formAgentes.persona_responsable = ""),
      (this.formAgentes.dir_agente = ""),
      (this.formAgentes.tlf_agente = ""),
      (this.formAgentes.email_web = ""),
      (this.formAgentes.tipo_agente = ""),
      (this.formAgentes.rif_ci_agente = ""),
      (this.formAgentes.porc_comision_venta = ""),
      (this.formAgentes.flag_activo = ""),
      (this.formAgentes.porc_comision_entrega = ""),
      (this.formAgentes.porc_comision_seguro = ""),
      (this.formAgentes.cod_agencia = null),
      (this.form = false)
    },
    resetFormEdit() {
      (this.formEditAgentes.nb_agente = ""),
      (this.formEditAgentes.persona_responsable = ""),
      (this.formEditAgentes.dir_agente = ""),
      (this.formEditAgentes.tlf_agente = ""),
      (this.formEditAgentes.email_web = ""),
      (this.formEditAgentes.tipo_agente = ""),
      (this.formEditAgentes.rif_ci_agente = ""),
      (this.formEditAgentes.porc_comision_venta = ""),
      (this.formEditAgentes.porc_comision_entrega = ""),
      (this.formEditAgentes.porc_comision_seguro = ""),
      (this.formEditAgentes.cod_agencia = null),
      (this.formEdit = false)
    },
    // Metodos para colocar valores iniciales
    getDataIniciar() {
        this.agenciaRef = this.agencias[0].id;
        this.selectedAgencia = this.agencias[0];
        this.axiosConfig.headers.agencia = this.agenciaRef
        api.get(`/agentes`, this.axiosConfig)
        .then((res) => {
          this.agentes = res.data;
        })
    },
  },
};
</script>
