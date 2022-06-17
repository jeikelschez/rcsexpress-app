<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="createData()" class="q-gutter-md">
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
                  :rules="[reglasNotNull10]"
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
                  :rules="[reglasSegundoCorrelativo]"
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
                <q-select
                  outlined
                  v-model="form.tipo"
                  label="Tipo de Carga"
                  hint=""
                  class="pcform"
                  :rules="[reglasSelect]"
                  :options="tipoGuia"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha de Asignación"
                  hint=""
                  v-model="form.fecha_asignacion"
                  mask="date"
                  :rules="['date']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.fecha_asignacion">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_agencia"
                  label="Agencia"
                  hint=""
                  class="pcform"
                  :rules="[reglasSelect]"
                  :options="agencias"
                  lazy-rules
                  option-label="nb_agencia"
                  option-value="id"
                  @update:model-value="
                    this.axiosConfig.headers.agencia = this.form.cod_agencia.id;
                    getData('/clientes', 'setData', 'clientesForm');
                    getData('/agentes', 'setData', 'agentesForm');
                    this.form.cod_cliente = '';
                    this.form.cod_agente = ''
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_agente"
                  label="Agente"
                  class="pcform"
                  hint=""
                  :rules="[reglasSelect]"
                  :options="agentesForm"
                  lazy-rules
                  option-label="persona_responsable"
                  option-value="id"
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_cliente"
                  label="Cliente"
                  hint=""
                  :rules="[reglasSelect]"
                  :options="clientesForm"
                  lazy-rules
                  option-label="nb_cliente"
                  option-value="id"
                >
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
                label="Agregar Control"
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

    <q-dialog v-model="edit">
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="putData()">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="formEdit.control_inicio"
                  label="Primer Correlativo"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[reglasNotNull10]"
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
                  v-model="formEdit.control_final"
                  label="Ultimo Correlativo"
                  :rules="[reglasSegundoCorrelativo]"
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
                <q-select
                  outlined
                  v-model="formEdit.tipo"
                  label="Tipo de Carga"
                  hint=""
                  class="pcform"
                  :rules="[reglasSelect]"
                  :options="tipoGuia"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha de Asignación"
                  hint=""
                  v-model="formEdit.fecha_asignacion"
                  mask="date"
                  :rules="['date']"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="formEdit.fecha_asignacion">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.cod_agencia"
                  label="Agencia"
                  hint=""
                  class="pcform"
                  :rules="[reglasSelect]"
                  :options="agencias"
                  lazy-rules
                  option-label="nb_agencia"
                  option-value="id"
                  @update:model-value="
                    this.axiosConfig.headers.agencia =
                    this.formEdit.cod_agencia.id;
                    getData('/clientes', 'setData', 'clientesForm');
                    getData('/agentes', 'setData', 'agentesForm');
                    this.formEdit.cod_cliente = '';
                    this.formEdit.cod_agente = ''
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.cod_agente"
                  label="Agente"
                  class="pcform"
                  hint=""
                  :rules="[reglasSelect]"
                  :options="agentesForm"
                  lazy-rules
                  option-label="persona_responsable"
                  option-value="id"
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.cod_cliente"
                  label="Cliente"
                  hint=""
                  :rules="[reglasSelect]"
                  :options="clientesForm"
                  lazy-rules
                  option-label="nb_cliente"
                  option-value="id"
                >
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
                label="Editar Control"
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

    <div class="row q-pa-sm">
      <div
        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary"
        style="align-self: center; text-align: center"
      >
        <h4><strong>MANTENIMIENTO - ASIGNACIÓN DE GUIAS</strong></h4>
      </div>

      <div
        class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-bottom: 20px"
      >
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-3 selectmovil"
          style="align-self: center; text-align: center; margin-right: 20px"
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
            label="Agencia"
            @update:model-value="
              this.axiosConfig.headers.agencia = this.selectedAgencia.id;
              getData(`/cguias`, 'setDataSelect', 'datos');
              getData(`/agentes`, 'setDataSelect', 'agentes');
              getData(`/clientes`, 'setDataSelect', 'clientes');
            "
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>

        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-4 selectmovil"
          style="align-self: center; text-align: center; margin-right: 20px"
        >
          <q-select
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agentes"
            option-label="persona_responsable"
            option-value="id"
            v-model="selectedAgente"
            outlined
            standout
            label="Agente"
            @update:model-value="
              this.axiosConfig.headers.agente = this.selectedAgente.id;
              getData(`/cguias`, 'setData', 'datos');
            "
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>

        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-3"
          style="align-self: center; text-align: center; margin-right: 30px"
        >
          <q-select
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="clientes"
            option-label="nb_cliente"
            option-value="id"
            v-model="selectedCliente"
            outlined
            standout
            label="Cliente"
            @update:model-value="
              this.axiosConfig.headers.cliente = this.selectedCliente.id;
              getData(`/cguias`, 'setData', 'datos');
            "
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>

        <q-card
          bordered
          class="row col-md-5 col-xs-12 col-xl-5 col-lg-5 col-sm-12 espaciadoGuias"
        >
          <q-card-section class="row col-md-12 col-xs-12" style="padding: 2px">
            <div
              class="col-md-4 col-xs-12 col-sm-4 titleMenu"
              style="align-self: center; text-align: center"
            >
              <p
                style="
                  font-size: 16px;
                  align-self: center;
                  text-align: center;
                  margin-bottom: 0px;
                "
                class="text-secondary"
              >
                <strong>TIPO DE GUIA</strong>
              </p>
            </div>

            <div
              class="col-md-4 col-xs-6 col-sm-4"
              style="
                margin-bottom: 7px;
                margin-top: 7px;
                align-self: center;
                text-align: center;
              "
              id="select"
            >
              <q-field
                hide-bottom-space
                borderless
                @update:model-value="
                  this.axiosConfig.headers.tipo_guia_carga =
                    this.selectedGuiaCarga.value;
                  getData(`/cguias`, 'setData', 'datos');
                "
                dense
                class="pcform"
                v-model="selectedGuiaCarga"
              >
                <template v-slot:control>
                  <q-checkbox
                    size="md"
                    v-model="selectedGuiaCarga"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Guia de Carga"
                  />
                </template>
              </q-field>
            </div>

            <div
              class="col-md-4 col-xs-6 col-sm-4"
              style="
                margin-bottom: 7px;
                margin-top: 7px;
                align-self: center;
                text-align: center;
              "
              id="select"
            >
              <q-field
                hide-bottom-space
                borderless
                dense
                @update:model-value="
                  this.axiosConfig.headers.tipo_guia_factura =
                    this.selectedGuiaFactura.value;
                  getData(`/cguias`, 'setData', 'datos');
                "
                v-model="selectedGuiaFactura"
              >
                <template v-slot:control>
                  <q-checkbox
                    size="md"
                    v-model="selectedGuiaFactura"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Guia de Factura"
                  />
                </template>
              </q-field>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div
        class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center"
      >
        <q-card
          bordered
          class="row col-md-8 col-xl-7 col-lg-7 col-xs-12 col-sm-12 inputGuias"
          style="align-self: center; text-align: center; margin-right: 26px"
        >
          <q-card-section
            class="row col-md-12 col-xs-12"
            style="align-self: center; text-align: center"
          >
            <div class="col-md-4 col-xs-12">
              <q-input
                outlined
                v-model="form.desc_ciudad"
                label="Guia Desde:"
                type="number"
                class="inputMenuGuias"
                hide-bottom-space
                hint=""
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="south_america" />
                </template>
              </q-input>
            </div>

            <div class="col-md-4 col-xs-12">
              <q-input
                outlined
                v-model="form.desc_ciudad"
                label="Guia Hasta:"
                type="number"
                class="inputMenuGuias"
                hide-bottom-space
                lazy-rules
                hint=""
              >
                <template v-slot:prepend>
                  <q-icon name="south_america" />
                </template>
              </q-input>
            </div>

            <div class="col-md-2 col-xs-6 button-filter">
              <q-btn
                dense
                color="primary"
                round
                padding="sm"
                style="margin-top: 3px"
              >
                <q-icon size="30px" name="search" color="white"> </q-icon>
                <q-tooltip
                  class="bg-primary"
                  style="max-height: 30px"
                  transition-show="scale"
                  transition-hide="scale"
                  color="primary"
                  >Filtrar</q-tooltip
                >
              </q-btn>
            </div>

            <div class="col-md-2 col-xs-6 checkboxGuias">
              <q-field
                hide-bottom-space
                borderless
                dense
                v-model="selectedCulminado"
                @update:model-value="
                  this.axiosConfig.headers.selectedCulminado =
                    this.selectedCulminado.value;
                  getData(`/cguias`, 'setData', 'datos');
                "
              >
                <template v-slot:control>
                  <q-checkbox
                    size="md"
                    v-model="selectedCulminado"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Culminado"
                  />
                </template>
              </q-field>
            </div>
          </q-card-section>
        </q-card>

        <div
          class="col-md-3 col-xl-4 col-lg-4 col-xs-12 col-sm-12 botonesGuias"
          style="text-align: center; align-self: center"
        >
          <q-btn
            dense
            color="primary"
            round
            @click="this.create = true"
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
            style="margin-right: 25px"
            @click="
              selectedAgencia = null;
              selectedCliente = null;
              selectedAgente = null;
              selectedGuiaCarga = '0';
              selectedGuiaFactura = '0';
              selectedCulminado = '0';
              this.axiosConfig.headers.agencia = '';
              this.axiosConfig.headers.clientes = '';
              this.axiosConfig.headers.agentes = '';
              getData(`/cguias`, 'setData', 'datos');
            "
          >
            <q-icon size="40px" name="delete" color="white"> </q-icon>
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

    <div class="q-pa-md" style="margin-top: 20px">
      <div class="q-gutter-y-md">
        <div bordered flat class="my-card row">
          <q-table
            :rows="datos"
            row-key="id"
            :columns="columns"
            :separator="separator"
            class="my-sticky-column-table"
            :filter="filter"
            style="width: 100%"
            :grid="$q.screen.xs"
            v-model:pagination="pagination"
          >
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
                    getDataEdit(`${props.row.id}`);
                    edit = true;
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
                          :disabled="this.disabledEdit"
                          @click="
                            getDataEdit(`${props.row.id}`);
                            edit = true;
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
      </div>
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

    <desactive-crud
      ref="desactiveCrud"
      @desactivar-Crud-Pais-Estado-Ciudad="desactivarCrudPaisEstadoCiudad"
    ></desactive-crud>

    <methods
      ref="methods"
      @get-Data="getData('/cguias', 'setData', 'datos')"
      @get-Data-Guias="getDataGuias('/cguias', 'setData', 'datos')"
      @set-Data="setData"
      @set-Data-Iniciar="setDataIniciar"
      @set-Data-Edit="setDataEdit"
      @set-Data-Select="setDataSelect"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import methodsVue from "src/components/methods.vue";

import { LocalStorage } from "quasar";

import desactivateCrudVue from "src/components/desactivateCrud.vue";

export default {
  components: { "desactive-crud": desactivateCrudVue, methods: methodsVue },
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
          align: "left",
          sortable: true,
        },
        {
          name: "cant_disponible",
          label: "Disponible",
          field: "cant_disponible",
          align: "left",
          sortable: true,
        },
        {
          name: "fecha_asignacion",
          label: "Fecha de Asignación",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
        },
        {
          name: "fecha_asignacion",
          label: "Fecha de Asignación",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
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
      tipoGuia: [
        { label: "GUÍA DE CARGA", value: "20" },
        { label: "GUÍA DE FACTURA", value: "21" },
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
        tipo: "",
      },
      formEdit: {
        control_inicio: "",
        control_final: "",
        cant_asignada: "",
        cant_disponible: "",
        fecha_asignacion: "",
        cod_agencia: "",
        cod_agente: "",
        cod_cliente: "",
        tipo: "0",
        id: "",
      },
      datos: [],
      agencias: [],
      clientes: [],
      agentes: [],
      agenciasForm: [],
      clientesForm: [],
      agentesForm: [],
      selected: [],
      refAgencia: "",
      refCliente: "",
      refAgente: "",
      selectedAgencia: [],
      selectedGuiaCarga: "0",
      selectedGuiaFactura: "0",
      selectedCulminado: "0",
      selectedCliente: [],
      selectedAgente: [],
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
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          agencia: "",
          agente: "",
          cliente: "",
        },
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      create: ref(false),
      edit: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData("/agencias", "setDataIniciar", "agencias");
    this.$refs.desactiveCrud.desactivarCrud(
      "c_ciudades",
      "d_ciudades",
      "u_ciudades",
      "desactivarCrudPaisEstadoCiudad"
    );
  },
  methods: {
    // Reglas
    reglasNotNull10(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if ((val !== null) !== "") {
        if (val.length > 10) {
          return "Deben ser Maximo 10 caracteres";
        }
      }
    },
    reglasSegundoCorrelativo(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if ((val !== null) !== "") {
        if (val.length < this.form.control_inicio.length) {
          return "El Ultimo Correlativo debe ser Mayor al Primero";
        }
        if (val.length > 10) {
          return "Deben ser Maximo 10 caracteres";
        }
      }
    },
    reglasSegundoCorrelativoEdit(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if ((val !== null) !== "") {
        if (val.length < this.formEdit.control_inicio.length) {
          return "El Ultimo Correlativo debe ser Mayor al Primero";
        }
        if (val.length > 10) {
          return "Deben ser Maximo 10 caracteres";
        }
      }
    },
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    desactivarCrudPaisEstadoCiudad(createItem, deleteItem, updateItem) {
      if (createItem == true) {
        this.disabledCreate = false;
      }
      if (deleteItem == true) {
        this.disabledDelete = false;
      }
      if (updateItem == true) {
        this.disabledEdit = false;
      }
    },
    // Metodos
    setDataSelect(res, dataRes) {
      this[dataRes] = res;
      this.selectedCliente = [];
      this.selectedAgente = [];
    },
    getDataGuias(url, call, dataRes) {
      this.axiosConfig.headers.agencia = this.selectedAgencia.id
      this.axiosConfig.headers.cliente = this.selectedCliente.id
      this.axiosConfig.headers.agente = this.selectedAgente.id
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    getDataEdit(id) {
      this.$refs.methods.getDataEdit(
        `/cguias/${id}`,
        `setDataEdit`,
        "formEdit",
        this.axiosConfig
      );
    },
    setData(res, dataRes) {
      this[dataRes] = res;
    },
    setDataIniciar(res, dataRes) {
      this[dataRes] = res;
      this.getDataIniciar();
    },
    setDataEdit(res, dataRes) {
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].cant_asignada = res.cant_asignada;
      this[dataRes].cant_disponible = res.cant_disponible;
      this[dataRes].fecha_asignacion = res.fecha_asignacion;
      var cod_agencia = res.cod_agencia;
      var cod_agente = res.cod_agente;
      var cod_cliente = res.cod_cliente;
      api.get(`/agencias/${cod_agencia}`, this.axiosConfig).then((res) => {
        this.formEdit.cod_agencia = res.data;
        this.axiosConfig.headers.agencia = cod_agencia
        if (cod_cliente) {
          api.get(`/clientes/${cod_cliente}`, this.axiosConfig).then((res) => {
          this.formEdit.cod_cliente = res.data;
        });
        this.getData("/clientes", "setData", "clientesForm");
        }
        if (cod_agente) {
              api.get(`/agentes/${cod_agente}`, this.axiosConfig)
                .then((res) => {
                  this.formEdit.cod_agente = res.data;});
              this.getData("/agentes", "setData", "agentesForm");
        }
      });
      this[dataRes].tipo = res.tipo_desc;
      this[dataRes].id = res.id;
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/cguias/${idpost}`,
        "getDataGuias",
        this.axiosConfig
      );
    },
    createData() {
      this.form.cod_cliente = this.form.cod_cliente.id
      this.form.cod_agente = this.form.cod_agente.id
      this.form.tipo = this.form.tipo.value,
      this.form.cod_agencia = this.form.cod_agencia.id,
        this.$refs.methods.createData(
          `/cguias`,
          this.form,
          "getDataGuias",
          this.axiosConfig
        );
      this.resetForm();
    },
    putData() {
      this.formEdit.cod_cliente = this.formEdit.cod_cliente.id
      this.formEdit.cod_agente = this.formEdit.cod_agente.id
      this.formEdit.cod_agencia = this.formEdit.cod_agencia.id,
      this.formEdit.tipo = this.formEdit.tipo.value,
      this.$refs.methods.putData(
        `/cguias/${this.formEdit.id}`,
        this.formEdit,
        "getDataGuias",
        this.axiosConfig
      );
      this.resetFormEdit()
    },
    resetForm() {
      (this.form.control_inicio = ""),
        (this.form.control_final = ""),
        (this.form.cant_asignada = ""),
        (this.form.cant_disponible = ""),
        (this.form.fecha_asignacion = ""),
        (this.form.cod_agencia = ""),
        (this.form.cod_agente = ""),
        (this.form.cod_cliente = ""),
        (this.form.tipo = ""),
        (this.agentesForm = []),
        (this.clientesForm = []),
        (this.create = false);
    },
    resetFormEdit() {
      (this.formEdit.control_inicio = ""),
      (this.formEdit.control_final = ""),
      (this.formEdit.cant_asignada = ""),
      (this.formEdit.cant_disponible = ""),
      (this.formEdit.fecha_asignacion = ""),
      (this.formEdit.cod_agencia = ""),
      (this.formEdit.cod_agente = ""),
      (this.formEdit.cod_cliente = ""),
      (this.formEdit.tipo = ""),
      (this.agentesForm = []),
      (this.clientesForm = []),
      (this.edit = false);
    },

    // Metodos para colocar valores iniciales
    getDataIniciar() {
      this.axiosConfig.headers.agencia = this.agencias[0].id;
      this.selectedAgencia = this.agencias[0];
      this.getData("/clientes", "setData", "clientes");
      this.getData("/agentes", "setData", "agentes");
      this.getData("/cguias", "setData", "datos");
    },
  },
};
</script>

<style>
@media screen and (max-width: 1024px) {
  .espaciadoGuias {
    margin-top: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .inputMenuGuias {
    margin-right: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .inputMenuGuias2 {
    margin-right: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .button-filter {
    margin-top: 13px;
  }
}
@media screen and (max-width: 1024px) {
  .inputMenuGuias {
    margin-top: 14px;
  }
}
@media screen and (max-width: 600px) {
  .selectmovil {
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 600px) {
  .titleMenu {
    margin-top: 15px;
  }
}
@media screen and (max-width: 1024px) {
  .checkboxGuias {
    margin-top: 10px;
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
</style>
