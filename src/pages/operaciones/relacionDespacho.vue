<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 800px; max-width: 80vw">
        <q-card-section>
          <q-form class="q-gutter-md" @submit="pdfView = true">
            <div class="row" style="text-align: center">
              <div class="col-md-12 col-xs-12" style="margin-bottom: 10px">
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
                  use-input
                  hide-selected
                  fill-input
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
              <div class="col-md-12 col-xs-12" style="margin-bottom: 10px">
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
                  use-input
                  hide-selected
                  fill-input
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
              <div class="col-md-12 col-xs-12" style="margin-bottom: 10px">
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
                  use-input
                  hide-selected
                  fill-input
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
              <div class="col-md-12 col-xs-12" style="margin-bottom: 10px">
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
                  use-input
                  hide-selected
                  fill-input
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
              <div class="col-md-12 col-xs-12" style="margin-bottom: 10px">
                <q-select
                  label="Guías Adicionales"
                  v-model="selectedGuias"
                  use-input
                  use-chips
                  outlined
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
                />
              </div>
              <div
                class="col-md-5 col-xs-12 pcform"
                style="margin-bottom: 10px; padding-left: 30px"
              >
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
                >
                </q-btn-toggle>
              </div>
              <div
                class="col-md-5 col-xs-12"
                style="margin-bottom: 10px; padding-left: 15px"
              >
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
                >
                </q-btn-toggle>
              </div>
              <div class="col-md-2 col-xs-12" style="margin-bottom: 10px">
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
                label="Imprimir"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="print"
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

    <q-dialog v-model="dialogFecha">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="col-md-12 col-xs-12">
            <p style="font-size: 17px" class="text-secondary">
              <strong>ASIGNAR FECHA DEL COSTO</strong>
            </p>
          </div>
          <div class="col-md-12 col-xs-12">
            <q-input
              outlined
              label="Fecha Costo"
              hint=""
              dense
              style="padding-bottom: 0px"
              v-model="fecha_costo"
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
                      v-model="fecha_costo"
                      mask="DD/MM/YYYY"
                      style="padding-bottom: 0px"
                    ></q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div
            class="col-md-12 col-xs-12"
            style="margin-top: 23px; text-align: center"
          >
            <q-btn
              label="Asignar"
              color="primary"
              style="width: 100px"
              @click="findCostos()"
            />
          </div>
        </q-card-section>
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
        v-if="selectedReporte == 'MAD'"
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
          fill-input
          multiple
          use-chips=""
          emit-value
          map-options
          input-debounce="0"
          option-label="nb_agencia"
          option-value="id"
          v-model="selectedAgenciaDestino"
          outlined
          standout
          :loading="loading"
          :disable="loading"
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
      <div
        class="col-md-4 col-xs-12 selectMobile2 cardMargin"
        style="margin-bottom: 10px"
        v-else
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
          <template v-slot:clientesLoading>
            <q-inner-loading showing color="primary" class="loading" />
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
          @keyup.enter="getDataTable()"
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
          @keyup.enter="getDataTable()"
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
          @update:model-value="changeReporte()"
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
      <q-checkbox
            v-model="selectedSerie"
            color="primary"
            left-label
            val="44"
            label="Serie 44"
            @update:model-value="getDataTable()"
            :disable="this.selectedSerie.length > 1 ? false : this.selectedSerie[0] == '55' ? false : true"
            :readonly="this.selectedSerie.length > 1 ? false : this.selectedSerie[0] == '55' ? false : true"
          />
          <q-checkbox
            v-model="selectedSerie"
            color="primary"
            left-label
            val="55"
            label="Serie 55"
            @update:model-value="getDataTable()"
            :disable="this.selectedSerie.length > 1 ? false : this.selectedSerie[0] == '44' ? false : true"
            :readonly="this.selectedSerie.length > 1 ? false : this.selectedSerie[0] == '44' ? false : true"
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
          :disabled="this.guias.length > 0 ? false : true"
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
        :columns="columns"
        :loading="loading"
        class="tableHeight"
        selection="multiple"
        binary-state-sort
        :separator="separator"
        row-key="id"
        :grid="$q.screen.xs"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        style="width: 100%; height: 520px"
        :visible-columns="visibleColumns"
        v-model:selected="selected"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width>
              <q-checkbox v-model="props.selected" />
            </q-th>
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props" style="margin-bottom: 20px">
          <q-tr
            :props="props"
            v-if="selectedReporte == 'APZ' && props.rowIndex * -1 == 0"
          >
            <q-td colspan="100%" style="font-size: 20px; color: #283593">
              <div class="text-left">
                <strong> {{ "Zona Destino: " }} </strong>
                {{
                  this.guias[props.rowIndex].zonas_dest
                    ? this.guias[props.rowIndex].zonas_dest.nb_zona
                    : "SIN ZONA DEFINIDA"
                }}
              </div>
            </q-td>
          </q-tr>
          <q-tr
            :props="props"
            v-else-if="
              selectedReporte == 'APZ' &&
              (this.guias[props.rowIndex].zonas_dest
                ? this.guias[props.rowIndex].zonas_dest.nb_zona
                : 'SIN ZONA DEFINIDA') !=
                (this.guias[props.rowIndex - 1].zonas_dest
                  ? this.guias[props.rowIndex - 1].zonas_dest.nb_zona
                  : 'SIN ZONA DEFINIDA')
            "
          >
            <q-td colspan="100%" style="font-size: 20px; color: #283593">
              <div class="text-left">
                <strong> {{ "Zona Destino: " }} </strong>
                {{
                  this.guias[props.rowIndex].zonas_dest
                    ? this.guias[props.rowIndex].zonas_dest.nb_zona
                    : "SIN ZONA DEFINIDA"
                }}
              </div>
            </q-td>
          </q-tr>
          <q-tr
            :props="props"
            v-if="selectedReporte == 'MAD' && props.rowIndex * -1 == 0"
          >
            <q-td colspan="100%" style="font-size: 20px; color: #283593">
              <div class="text-left">
                <strong> {{ "Agencia Destino: " }} </strong>
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
              selectedReporte == 'MAD' &&
              this.guias[props.rowIndex].cod_agencia_dest !=
                this.guias[props.rowIndex - 1].cod_agencia_dest
            "
          >
            <q-td colspan="100%" style="font-size: 20px; color: #283593">
              <div class="text-left">
                <strong> {{ "Agencia Destino: " }} </strong>
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
            <q-td>
              <q-checkbox v-model="props.selected" />
            </q-td>
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name == 'cod_agencia'">
                {{ this.findSiglas("agencias", props.row.cod_agencia) }}
              </div>
              <div v-else-if="col.name == 'cod_agencia_dest'">
                {{ this.findSiglas("agencias", props.row.cod_agencia_dest) }}
              </div>
              <div v-else>
                {{ col.value }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="pdfView" @show="this.printReport()">
      <webViewer
        ref="webViewer"
        @print-pdf="this.sendCostos()"
        @close-pdf="this.pdfView = false"
        style="width: 1400px; height: 750px; max-width: 1400px"
      ></webViewer>
    </q-dialog>

    <q-dialog v-model="confirmCostosPopUp" persistent>
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Desea Trasladar esta información a Costos?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Si"
            color="primary"
            v-close-popup
            @click="this.confirmCostos = true"
          />
          <q-btn
            flat
            label="No"
            color="primary"
            @click="this.confirmCostos = false"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="confirmMezclarPopUp" persistent>
      <q-card style="width: 600px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            Existe un Costo cargado para este Chofer y Vehículo en esta fecha.
            ¿Desea unificar el Costo?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Si"
            color="primary"
            v-close-popup
            @click="this.confirmMezclar = '1'"
          />
          <q-btn
            flat
            label="No"
            color="primary"
            @click="this.confirmMezclar = '2'"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
import { api } from "boot/axios";
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
      ],
      cargaNeta: [
        { label: "PESO KGS", value: "K", slot: "one" },
        { label: "PESO NETO", value: "N", slot: "two" },
      ],
      columns: [
        {
          name: "nro_documento",
          label: "Guía",
          field: "nro_documento",
          required: true,
          align: "left",
        },
        {
          name: "fecha_emision",
          label: "Emisión",
          field: "fecha_emision",
          required: true,
          align: "left",
        },
        {
          name: "cod_agencia",
          label: "Origen",
          field: "cod_agencia",
          required: true,
          align: "left",
        },
        {
          name: "cod_agencia_dest",
          label: "Destino",
          field: "cod_agencia_dest",
          required: true,
          align: "left",
        },
        {
          name: "zona_dest",
          label: "Zona",
          field: (row) =>
            row.zonas_dest ? row.zonas_dest.nb_zona : "SIN ZONA DEFINIDA",
          align: "left",
        },
        {
          name: "cliente_orig_desc",
          label: "Remitente",
          field: "cliente_orig_desc",
          required: true,
          align: "left",
        },
        {
          name: "cliente_dest_desc",
          label: "Destinatario",
          field: "cliente_dest_desc",
          required: true,
          align: "left",
        },
      ],
      columnsAgencia: [
        {
          name: "nb_agencia",
          label: "Agencia",
          field: "nb_agencia",
          align: "left",
        },
      ],
      visibleColumns: ["zona_dest"],
      pagination: {
        page: 1,
        rowsPerPage: 0,
        sortBy: JSON.stringify([["nro_documento", "ASC"]]),
        descending: false,
      },
      selected: [],
      guias: [],
      selectedTipo: "O",
      selectedReporte: "GPA",
      selectedVisible: "V",
      selectedSerie: ["44", "55"],
      selectedDolar: false,
      selectedNeta: "K",
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
      selectedGuias: [],
      costo: [],
      nombreReporte: "Relación de Despacho para la Agencia",
      fecha_desde: moment().format("DD/MM/YYYY"),
      fecha_costo: "",
      fecha_hasta: moment().format("DD/MM/YYYY"),
      confirmCostos: false,
      confirmMezclar: false,
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      dialogAgencias: ref(false),
      dialogFecha: ref(false),
      pdfView: ref(false),
      confirmCostosPopUp: ref(false),
      confirmMezclarPopUp: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Operaciones - Relación de Despacho", "");
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
      if (!this.selectedAgencia.id && this.selectedAgenciaDestino.length == 0)
        return;
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "guias", {
        headers: {
          filters: JSON.stringify({
            agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
            cliente_orig: this.selectedCliente.id
              ? this.selectedCliente.id
              : "",
            agencia_dest: this.selectedAgenciaDestino.id
              ? this.selectedAgenciaDestino.id
              : this.selectedAgenciaDestino
              ? this.selectedAgenciaDestino
              : "",
            agencia_dest_transito: this.selectedAgenciaDestino.id
              ? this.selectedAgenciaDestino.id
              : this.selectedAgenciaDestino
              ? this.selectedAgenciaDestino
              : "",
            desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
            hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
            prefix_nro:
              this.selectedSerie.length < 2 ? this.selectedSerie[0] : "",
            tipo: "GC",
            estatus_admin_ex: "A",
            estatus_oper: this.selectedTipo == "C" ? "PR" : "",
            include_zona: "S",
          }),
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
      this.selected = this.guias;
      this.loading = false;
    },
    // Imprimir Reporte
    printReport() {
      var factArray = {};
      var detalleArray = [];
      this.dialog = false;

      for (var i = 0; i <= this.selected.length - 1; i++) {
        detalleArray.push(this.selected[i].nro_documento);
      }

      for (var i = 0; i <= this.selectedGuias.length - 1; i++) {
        detalleArray.push(this.selectedGuias[i]);
      }

      factArray.fecha_desde = this.fecha_desde;
      factArray.fecha_hasta = this.fecha_hasta;
      factArray.usuario = LocalStorage.getItem("tokenTraducido").usuario.nombre;
      factArray.agencia =
        this.selectedAgenciaDestino.length == 0
          ? this.selectedAgencia.nb_agencia
          : this.selectedAgenciaDestino.nb_agencia;
      factArray.visible = this.selectedVisible;
      factArray.chofer = this.selectedAgente.id
        ? this.selectedAgente.persona_responsable +
          " - C.I." +
          this.selectedAgente.rif_ci_agente
        : "";
      factArray.vehiculo = this.selectedUnidad.id
        ? this.selectedUnidad.placas +
          " - " +
          this.selectedUnidad.descripcion +
          " - " +
          this.selectedUnidad.chofer
        : "";
      factArray.receptor = this.selectedReceptor.id
        ? this.selectedReceptor
        : "";
      factArray.neta = this.selectedNeta;
      factArray.dolar = this.selectedDolar;
      factArray.tipoReporte = this.selectedReporte;
      factArray.sortBy = this.pagination.sortBy;
      factArray.nombreReporte = this.nombreReporte;

      api
        .get(`/pdfreports/relacionDespacho`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            data: JSON.stringify(factArray),
            detalle: detalleArray,
            usuario: LocalStorage.getItem("tokenTraducido").usuario.nombre,
          },
        })
        .then((res) => {
          if (!res.data.validDoc) {
            this.$q.notify({
              message: "No existen registros para este conjunto de Filtos",
              color: "red",
            });
            this.pdfView = false;
            return;
          }
          this.$refs.webViewer.showpdf(res.data.pdfPath, 1.6);
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message,
            color: "red",
          });
          this.pdfView = false;
          return;
        });
    },
    // Metodo al imprimir el reporte para asociar a Costos
    async sendCostos() {
      if (this.selectedTipo == "C") {
        this.confirmCostosPopUp = true;
        await this.until((_) => this.confirmCostos == true);
        if (this.confirmCostos) {
          this.confirmCostos = false;
          if (this.selectedAgenciaDestino.length == 0) {
            this.$q.notify({
              message:
                "Debe seleccionar al menos un Destino para cargar el Costo",
              color: "red",
            });
            return;
          }
          if (!this.selectedAgente.id || !this.selectedUnidad.id) {
            this.$q.notify({
              message:
                "Debe seleccionar el Chofer y el Vehículo para cargar el Costo",
              color: "red",
            });
            return;
          }
          if (this.selectedAgente.cod_agencia != 1) {
            this.$q.notify({
              message:
                "El Chofer no existe para la Agencia principal de Costos",
              color: "red",
            });
            return;
          }
          this.fecha_costo = this.fecha_desde;
          this.dialogFecha = true;
        }
      }
    },
    // Metodo para buscar costos por chofer y vehiculo de ese dia
    async findCostos() {
      this.dialogFecha = false;
      let flagCosto = false;
      await api
        .get(`/costos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            desde: moment(this.fecha_costo, "DD/MM/YYYY").format("YYYY-MM-DD"),
            hasta: moment(this.fecha_costo, "DD/MM/YYYY").format("YYYY-MM-DD"),
            agencia: 1,
            agente: this.selectedAgente.id,
            transporte: this.selectedUnidad.id,
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) this.costo = res.data.data;
        });

      if (this.costo.length) {
        this.confirmMezclarPopUp = true;
        await this.until((_) => this.confirmMezclar);
        if (this.confirmMezclar == "1") {
          this.mezclarCosto();
        } else {
          this.crearCosto();
        }
      } else {
        this.crearCosto();
      }
      this.confirmMezclar = false;
      flagCosto = false;
    },
    // Metodo para mezclar los Costos
    async mezclarCosto() {
      this.pdfView = false;
      this.loading = true;
      let destino = this.costo[0].destino;
      if (this.selectedAgenciaDestino.length) {
        for (var i = 0; i < this.selectedAgenciaDestino.length; i++) {
          let find = this.agencias.findIndex(
            (item) => item.id == this.selectedAgenciaDestino[i]
          );
          if (destino.indexOf(this.agencias[find].ciudades.siglas) < 0) {
            destino += " " + this.agencias[find].ciudades.siglas;
          }
        }
      } else {
        let find = this.agencias.findIndex(
          (item) => item.id == this.selectedAgenciaDestino.id
        );
        if (destino.indexOf(this.agencias[find].ciudades.siglas) < 0) {
          destino += " " + this.agencias[find].ciudades.siglas;
        }
      }

      var formCosto = JSON.parse(JSON.stringify(this.costo[0]));
      formCosto.destino = destino;
      if (this.selectedAyudante.id)
        formCosto.cod_ayudante = this.selectedAyudante.id;
      formCosto.fecha_envio = moment(
        formCosto.fecha_envio,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      delete formCosto.detalles;
      delete formCosto.detallesg;
      delete formCosto.dolar;

      // Actualizamos el costo
      await api
        .put(`/costos/${this.costo[0].id}`, formCosto, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .catch(() => {
          this.$q.notify({
            message:
              "Error del Sistema. Problemas al actualizar los Costos. Comuníquese con el proveedor del Sistemas...",
            color: "red",
          });
          this.loading = false;
          return;
        });

      for (var i = 0; i < this.selected.length; i++) {
        let formGuia = {};
        formGuia.cod_costo = this.costo[0].id;
        formGuia.cod_movimiento = this.selected[i].id;
        // Guardo el detalle
        await api
          .post(`/dcostosg`, formGuia, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al crear el detalle de Guias de los Costos. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
            return;
          });

        // Actualizamos el estatus del movimiento
        let formMovimientos = {};
        formMovimientos.estatus_operativo = "PE";
        await api
          .put(`/mmovimientos/${this.selected[i].id}`, formMovimientos, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al actualizar el estatus de la Guia. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
            return;
          });
      }
      this.$q.notify({
        message: "Costo Actualizado con Exito",
        color: "green",
      });
      this.getDataTable();
    },
    // Metodo para Crear el Costo
    async crearCosto() {
      this.pdfView = false;
      this.loading = true;
      let destino = "";
      if (this.selectedAgenciaDestino.length) {
        for (var i = 0; i < this.selectedAgenciaDestino.length; i++) {
          let find = this.agencias.findIndex(
            (item) => item.id == this.selectedAgenciaDestino[i]
          );
          destino += " " + this.agencias[find].ciudades.siglas;
        }
      } else {
        let find = this.agencias.findIndex(
          (item) => item.id == this.selectedAgenciaDestino.id
        );
        destino += " " + this.agencias[find].ciudades.siglas;
      }

      var formCosto = {};
      formCosto.cod_agencia = 1;
      formCosto.fecha_envio = moment(this.fecha_costo, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      );
      formCosto.tipo_transporte = "I";
      formCosto.cod_agente = this.selectedAgente.id;
      formCosto.destino = destino;
      formCosto.cod_transporte = this.selectedUnidad.id;
      if (this.selectedAyudante.id)
        formCosto.cod_ayudante = this.selectedAyudante.id;

      // Creamos el costo
      let idCosto;
      await api
        .post(`/costos`, formCosto, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          idCosto = res.data.id;
        })
        .catch(() => {
          this.$q.notify({
            message:
              "Error del Sistema. Problemas al Crear los Costos. Comuníquese con el proveedor del Sistemas...",
            color: "red",
          });
          this.loading = false;
          return;
        });

      for (var i = 0; i < this.selected.length; i++) {
        let formGuia = {};
        formGuia.cod_costo = idCosto;
        formGuia.cod_movimiento = this.selected[i].id;
        // Guardo el detalle
        await api
          .post(`/dcostosg`, formGuia, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al crear el detalle de Guias de los Costos. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
            return;
          });

        // Actualizamos el estatus del movimiento
        let formMovimientos = {};
        formMovimientos.estatus_operativo = "PE";
        await api
          .put(`/mmovimientos/${this.selected[i].id}`, formMovimientos, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al actualizar el estatus de la Guia. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
            return;
          });
      }
      this.$q.notify({
        message: "Costo Creado con Exito",
        color: "green",
      });
      this.getDataTable();
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
      this.selectedAgente = [];
      this.selectedUnidad = [];
      this.selectedAyudante = [];
      this.selectedReceptor = [];
      this.selectedGuias = [];
      this.selectedVisible = "V";
      this.selectedDolar = false;
      this.selectedNeta = "K";
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
    },
    // Metodo para que una funcion no avance hasta que se cumpla una condicion
    async until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
      };
      return new Promise(poll);
    },
    // Metodo para cambiar el tipo de Reporte
    changeReporte() {
      this.selectedAgenciaDestino = [];
      this.guias = [];

      switch (this.selectedReporte) {
        case "GPA":
          this.nombreReporte = "Relación de Despacho para la Agencia";
          this.visibleColumns = ["zona_dest"];
          this.pagination.sortBy = JSON.stringify([["nro_documento", "ASC"]]);
          break;
        case "APZ":
          this.nombreReporte = "Relación de Despacho Agrupado por Zonas";
          this.visibleColumns = [];
          this.pagination.sortBy = JSON.stringify([
            ["cod_zona_dest", "ASC"],
            ["nro_documento", "ASC"],
          ]);
          break;
        case "MAD":
          this.nombreReporte = "Relación de Despacho por Agencia Destino";
          this.visibleColumns = ["zona_dest"];
          this.pagination.sortBy = JSON.stringify([
            ["cod_zona_dest", "ASC"],
            ["nro_documento", "ASC"],
          ]);
          this.pagination.sortBy = JSON.stringify([
            ["cod_agencia_dest", "ASC"],
            ["nro_documento", "ASC"],
          ]);
          break;
        default:
          break;
      }
      this.getDataTable();
    },
  },
};
</script>
