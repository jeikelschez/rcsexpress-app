<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 700px; max-width: 80vw">
        <q-card-section>
          <q-form class="q-gutter-md" @submit="pdfView = true">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-select
                  :options="agentesSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'agentesSelected',
                        'agentes',
                        'agente_desc'
                      )
                  "
                  option-label="agente_desc"
                  option-value="id"
                  v-model="selectedAgente"
                  outlined
                  label="Chofer"
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
              <div class="col-md-12 col-xs-12">
                <q-select
                  :options="unidadesSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'unidadesSelected',
                        'unidades',
                        'unidad_desc'
                      )
                  "
                  option-label="unidad_desc"
                  option-value="id"
                  v-model="selectedUnidad"
                  outlined
                  label="Vehiculo"
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
              <div class="col-md-12 col-xs-12">
                <q-select
                  :options="ayudantesSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'ayudantesSelected',
                        'ayudantes',
                        'nb_ayudante'
                      )
                  "
                  option-label="nb_ayudante"
                  option-value="id"
                  v-model="selectedAyudante"
                  outlined
                  label="Ayudante"
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
              <div class="col-md-12 col-xs-12">
                <q-select
                  :options="receptoresSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'receptoresSelected',
                        'receptores',
                        'nb_receptor'
                      )
                  "
                  option-label="nb_receptor"
                  option-value="id"
                  v-model="selectedReceptor"
                  outlined
                  label="Receptor"
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
              <div class="col-md-6 col-xs-12">
                <q-btn-toggle
                  v-model="selectedVisible"
                  spread
                  class="my-custom-toggle"
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="black"
                  :options="visible"
                  @update:model-value=""
                >
                </q-btn-toggle>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-btn-toggle
                  v-model="selectedNeta"
                  spread
                  class="my-custom-toggle"
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="black"
                  :options="cargaNeta"
                  @update:model-value=""
                >
                </q-btn-toggle>
              </div>
              <div class="col-md-2 col-xs-12">
                <q-checkbox
                  v-model="selectedDolar"
                  label="$"
                  color="primary"
                  left-label
                />
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

    <q-dialog
      v-model="dialogAgencias"
      style="max-width: 100vw"
      class="row justify-center items-center"
    >
      <q-card style="max-width: 100vw">
        <div class="row justify-center items-center" style="padding: 10px">
          <div class="col-md-6 col-xs-12 boxStyle Cards">
            <q-card
              class="q-pa-md col-md-4 col-xs-12"
              bordered
              style="padding: 10px"
            >
              <q-card-section
                style="
                  padding-bottom: 5px;
                  padding-left: 10px;
                  padding-right: 10px;
                "
              >
                <div class="row">
                  <div
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="font-size: 19px; margin-bottom: 20px"
                      class="text-secondary"
                    >
                      <strong>Lista de Agencias</strong>
                    </h4>
                  </div>
                  <div
                    class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
                  <q-table
                    :rows="clientes"
                    dense
                    :columns="columnsClientes"
                    binary-state-sort
                    :virtual-scroll="null"
                    :separator="separator"
                    row-key="action"
                    :loading="loading"
                    class="my-sticky-header-column-table"
                    style="width: 100%; height: 350px"
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
                          icon="save"
                          :disabled="this.disabledDelete"
                          @click="selected = props.row.id"
                          @click.capture="permisosDelete = true"
                        ></q-btn>
                        <q-btn
                          dense
                          round
                          flat
                          color="primary"
                          icon="edit"
                          @click="this.dialog = true"
                        ></q-btn>
                      </q-td>
                    </template>
                  </q-table>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="row col-md-1 col-xs-12 buttonsMobile"
            style="text-align: center"
          >
            <div class="col-md-12 col-xs-3">
              <q-btn padding="md" color="primary" round icon="chevron_right" />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn padding="md" color="primary" round icon="chevron_left" />
            </div>

            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="close"
                @click="this.dialog = false"
              />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="keyboard_double_arrow_right"
              />
            </div>

            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="keyboard_double_arrow_left"
              />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn padding="md" round color="primary" icon="check" />
            </div>
          </div>
          <div
            class="row col-md-1 col-xs-12 buttonsMenu buttonsMobile"
            style="text-align: center"
          >
            <div class="col-md-12 col-xs-3">
              <q-btn padding="md" color="primary" round icon="expand_less" />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn padding="md" color="primary" round icon="expand_more" />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="keyboard_double_arrow_up"
              />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="keyboard_double_arrow_down"
              />
            </div>
            <div
              class="col-md-12 col-xs-6 buttonsCard"
              style="margin-top: 20px"
            >
              <q-btn
                padding="md"
                color="primary"
                round
                icon="close"
                @click="this.dialog = false"
              />
            </div>
            <div
              class="col-md-12 col-xs-6 buttonsCard"
              style="margin-top: 20px"
            >
              <q-btn padding="md" round color="primary" icon="check" />
            </div>
          </div>
          <div class="col-md-6 col-xs-12 Cards">
            <q-card
              class="q-pa-md col-md-4 col-xs-12"
              bordered
              style="padding: 10px"
            >
              <q-card-section
                style="
                  padding-bottom: 5px;
                  padding-left: 10px;
                  padding-right: 10px;
                "
              >
                <div class="row">
                  <div
                    class="col-md-12 col-xs-12"
                    style="
                      align-self: center;
                      text-align: left;
                      margin-top: -30px;
                    "
                  >
                    <h4
                      style="font-size: 19px; margin-bottom: 20px"
                      class="text-secondary"
                    >
                      <strong>Agencias Seleccionadas</strong>
                    </h4>
                  </div>
                  <div
                    class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
                    style="align-self: center; text-align: center"
                  >
                    <q-input
                      v-model="guia_desde"
                      rounded
                      dense
                      outlined
                      standout
                      label="Buscar:"
                      @keyup.enter="getDataTable()"
                      mask="##########"
                    >
                    </q-input>
                  </div>
                  <q-table
                    :rows="clientes"
                    dense
                    :columns="columnsClientes"
                    binary-state-sort
                    :virtual-scroll="null"
                    :separator="separator"
                    row-key="action"
                    :loading="loading"
                    class="my-sticky-header-column-table"
                    :filter="filter"
                    style="width: 100%; height: 350px"
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
                          icon="save"
                          :disabled="this.disabledDelete"
                          @click="selected = props.row.id"
                          @click.capture="permisosDelete = true"
                        ></q-btn>
                        <q-btn
                          dense
                          round
                          flat
                          color="primary"
                          icon="edit"
                          @click="this.dialog = true"
                        ></q-btn>
                      </q-td>
                    </template>
                  </q-table>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <div
      class="q-pa-md row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      style="align-self: left; text-align: center"
    >
      <div class="row align-center justify-center">
        <p
          style="font-size: 25px; text-align: left; margin-bottom: 10px"
          class="text-secondary col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 movilTitle"
        >
          <strong>RELACIÓN DE DESPACHO POR AGENCIA</strong>
        </p>
      </div>
      <div
        class="col-md-4 col-xs-12 selectMobile2 cardMargin"
        style="margin-bottom: 10px"
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
      <div class="col-md-4 col-xs-12 selectMobile2 cardMargin">
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
            getDataTable();
            this.selectedCliente = [];
            this.clientesLoading = true;
            this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
              headers: {
                agencia: selectedAgencia.id,
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
      <div class="col-md-4 col-xs-12 selectMobile2 cardMargin">
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
          :loading="clientesLoading"
          :disable="clientesLoading"
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
      <div class="col-md-2 col-xs-12 cardMargin selectMobile2">
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
      <div class="col-md-2 col-xs-12 selectMobile2 cardMargin">
        <q-input
          outlined
          label="Fecha Hasta"
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
        class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 selectMobile2 cardMargin"
      >
        <q-btn-toggle
          v-model="selectedReporte"
          spread
          class="my-custom-toggle"
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="black"
          :options="reportes"
          @update:model-value=""
        >
          <template v-slot:one>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >GENERAL POR AGENCIA</q-tooltip
            >
          </template>
          <template v-slot:two>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >AGRUPADO POR ZONA</q-tooltip
            >
          </template>
          <template v-slot:three>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >MULTIPLES AGENCIA DESTINO</q-tooltip
            >
          </template>
          <template v-slot:four>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >MULTIPLES AGENCIA AGRUPADO</q-tooltip
            >
          </template>
        </q-btn-toggle>
      </div>
      <div
        class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile2"
        style="padding-right: 25px"
      >
        <q-option-group
          v-model="selectedSerie"
          :options="optionSerie"
          color="primary"
          type="checkbox"
          inline
          @update:model-value="getDataTable()"
        />
      </div>
      <div
        class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile2 cardMargin"
      >
        <q-btn-toggle
          v-model="selectedTipo"
          spread
          class="my-custom-toggle"
          rounded
          unelevated
          toggle-color="primary"
          color="white"
          text-color="black"
          :options="tipoReporte"
          @update:model-value="getDataTable()"
        >
        </q-btn-toggle>
      </div>
      <div
        class="col-md-1 col-xl-1 col-lg-1 col-xs-6 col-sm-6"
        style="padding-right: 10px"
      >
        <q-btn
          dense
          color="primary"
          padding="sm"
          round
          style="margin-right: 10px"
          @click="resetFilters()"
        >
          <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
          <q-tooltip
            class="bg-primary"
            style="max-height: 30px"
            transition-show="scale"
            transition-hide="scale"
            color="primary"
            >Limpiar Filtros</q-tooltip
          >
        </q-btn>
        <q-btn
          dense
          round
          color="primary"
          padding="sm"
          @click.capture="this.dialog = true"
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

    <div class="q-pa-md col-md-12 col-xs-12 justify-center cardMargin">
      <q-table
        :rows="guias"
        binary-state-sort
        row-key="id"
        :columns="columns"
        :loading="loading"
        class="tableHeight"
        selection="multiple"
        :separator="separator"
        :grid="$q.screen.xs"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        style="width: 100%; height: 520px"
        v-model:selected="selected"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:body-cell-cod_agencia="props">
          <q-td :props="props">
            {{ this.findSiglas("agencias", props.row.cod_agencia) }}
          </q-td>
        </template>
        <template v-slot:body-cell-cod_agencia_dest="props">
          <q-td :props="props">
            {{ this.findSiglas("agencias", props.row.cod_agencia_dest) }}
          </q-td>
        </template>
      </q-table>
    </div>

    <methods
      ref="methods"
      @set-Data="setData"
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
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import webViewerVue from "src/components/webViewer.vue";

export default {
  components: {
    methods: methodsVue,
    webViewer: webViewerVue,
    rulesVue,
  },
  data() {
    return {
      tipoReporte: [
        { label: "OPERATIVA", value: "O" },
        { label: "COSTOS", value: "C" },
      ],
      visible: [
        { label: "VISIBLE", value: "V" },
        { label: "NO VISIBLE", value: "N" },
      ],
      reportes: [
        { label: "GPA", value: "GPA", slot: "one" },
        { label: "APZ", value: "APZ", slot: "two" },
        { label: "MAD", value: "MAD", slot: "three" },
        { label: "MAG", value: "MAG", slot: "four" },
      ],
      cargaNeta: [
        { label: "KG+NETA", value: "K", slot: "one" },
        { label: "NETA", value: "N", slot: "two" },
      ],
      columns: [
        {
          name: "nro_documento",
          label: "Guía",
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
          name: "cod_agencia",
          label: "Origen",
          field: "cod_agencia",
          align: "left",
        },
        {
          name: "cod_agencia_dest",
          label: "Destino",
          field: "cod_agencia_dest",
          align: "left",
        },
        {
          name: "cliente_orig_desc",
          label: "Remitente",
          field: "cliente_orig_desc",
          align: "left",
        },
        {
          name: "cliente_dest_desc",
          label: "Destinatario",
          field: "cliente_dest_desc",
          align: "left",
        },
      ],
      optionSerie: [
        {
          label: "Serie 44",
          value: "44",
        },
        {
          label: "Serie 55",
          value: "55",
        },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0,
        sortBy: "nro_documento",
        descending: false,
      },
      selected: [],
      guias: [],
      selectedTipo: "O",
      selectedReporte: "GPA",
      selectedVisible: "V",
      selectedSerie: ["44", "55"],
      selectedDolar: false,
      selectedNeta: "",
      agencias: [],
      agenciasSelected: [],
      selectedAgencia: [],
      selectedAgenciaDestino: [],
      clientesSelected: [],
      selectedCliente: [],
      clientesLoading: false,
      agentesSelected: [],
      selectedAgente: [],
      unidadesSelected: [],
      selectedUnidad: [],
      ayudantesSelected: [],
      selectedAyudante: [],
      receptoresSelected: [],
      selectedReceptor: [],
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
      dialogAgencias: ref(false),
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Mantenimiento - Relación de Despacho",
      ""
    );
    this.$refs.methods.getData("/agencias", "setData", "agencias");
    this.$refs.methods.getData("/agentes", "setData", "agentes", {
      headers: {
        agencia: 1,
        activo: "S",
      },
    });
    this.$refs.methods.getData("/unidades", "setData", "unidades");
    this.$refs.methods.getData("/ayudantes", "setData", "ayudantes", {
      headers: {
        activo: "S",
      },
    });
    this.$refs.methods.getData("/receptores", "setData", "receptores", {
      headers: {
        activo: "S",
      },
    });

    this.getDataTable();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "relaciondespacho",
      },
    });
  },
  methods: {
    // Metodo para traer el value de los Selects y Columns
    findIndex(array, value, field) {
      var find = this[array].findIndex((item) => item.id == value);
      return find >= 0 ? this[array][find][field] : null;
    },
    // Metodo para traer el valor de las siglas
    findSiglas(array, value) {
      var find = this[array].findIndex((item) => item.id == value);
      return find >= 0 ? this[array][find].ciudades.siglas : null;
    },
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
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos Iniciales
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      if (!this.selectedAgencia.id && !this.selectedAgenciaDestino.id) return;
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "guias", {
        headers: {
          agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
          cliente_orig: this.selectedCliente.id ? this.selectedCliente.id : "",
          agencia_dest: this.selectedAgenciaDestino.id
            ? this.selectedAgenciaDestino.id
            : "",
          desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
          hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
          prefix_nro:
            this.selectedSerie.length < 2 ? this.selectedSerie[0] : "",
          tipo: "GC",
          estatus_admin_ex: "A",
          estatus_oper: this.selectedTipo == "C" ? "PR" : "",
          order_by: this.pagination.sortBy,
          order_direction: this.pagination.descending ? "DESC" : "ASC",
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
      this.selected = this.guias;
      this.loading = false;
    },
    // Metodo para Resetear Filtros
    resetFilters() {
      this.guias = [];
      this.selected = [];
      this.selectedAgencia = [];
      this.selectedAgenciaDestino = [];
      this.selectedCliente = [];
      this.selectedTipo = "O";
      this.selectedSerie = ["44", "55"];
      this.selectedReporte = "GPA";
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.getDataClientes();
    },
  },
};
</script>
