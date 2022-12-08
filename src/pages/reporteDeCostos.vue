<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
            <div class="row">
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
          <p style="font-size: 20px; margin-bottom: 25px;" class="text-secondary">
            <strong>OPERACIONES - REPORTE DE COSTOS</strong>
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
            :loading="agenciasLoading"
            :disable="agenciasLoading"
            label="Agencia Origen"
            @update:model-value="
              this.agentesLoading = true;
              this.clientesLoading = true;
              this.agentesSelected = [];
              this.clientesSelected = [];
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
            <template v-slot:agenciasLoading>
              <q-inner-loading showing color="primary" class="loading" />
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
            :loading="agentesLoading"
            :disable="agentesLoading"
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
            <template v-slot:agentesLoading>
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
            :loading="clientesLoading"
            :disable="clientesLoading"
            v-model="selectedCliente"
            outlined
            standout
            label="Vehiculo"
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
            :loading="clientesLoading"
            :disable="clientesLoading"
            v-model="selectedCliente"
            outlined
            standout
            label="Ayudante"
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
      </div>
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -15px"
      >
        <div
          class="col-md-2 col-xs-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Fecha Desde:"
            hint=""
            rounded
            style="padding-bottom: 0px"
            lazy-rules
            dense
            mask="##/##/####"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date mask="DD/MM/YYYY"></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xs-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Fecha Hasta:"
            hint=""
            rounded
            lazy-rules
            dense
            style="padding-bottom: 0px"
            mask="##/##/####"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date mask="DD/MM/YYYY"></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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
            :loading="clientesLoading"
            :disable="clientesLoading"
            v-model="selectedCliente"
            outlined
            standout
            label="Tipo de Transporte"
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
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-10 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="reportType"
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
            :loading="clientesLoading"
            :disable="clientesLoading"
            v-model="selectedCliente"
            outlined
            standout
            label="Tipo de Reporte"
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
        <div class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-2 justify-center">
          <q-btn dense color="primary" round padding="sm">
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
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-y-md justify-center"
      style="width: 100%; height: 580px; margin-top: -30px;"
    >
      <webViewer ref="webViewer" @close-pdf="closePdf"></webViewer>
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

    <methods ref="methods"></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import moment from "moment";
import { api } from "boot/axios";
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
      reportType: [
        { label: "RESUMEN", value: "C" },
        { label: "RANGO DE FECHAS", value: "A" },
        { label: "DISTRIBUCION PRORRATEADA POR CIUDAD", value: "A" },
        { label: "DISTRIBUCION REAL POR CIUDAD", value: "A" },
        { label: "AGENTES O PROVEEDORES", value: "A" },
        { label: "AYUDANTE", value: "A" },
        { label: "GUIAS PENDIENTES POR ASOCIAR COSTO", value: "A" },
        { label: "REPORTE DE VIAJES POR VEHICULO", value: "A" },
        { label: "REPORTE DE VIAJES POR AGENTE", value: "A" },
      ],
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      dateInit: moment().format("DD/MM/YYYY"),
      loading: ref(false),
      separator: ref("vertical"),
      deletePopup: ref(false),
      dialog: ref(false),
      pdfView: ref(false),
    };
  },
  mounted() {
    this.printPending();
  },
  methods: {
    closePdf() {
      this.pdfView = false;
    },
    printPending() {
      api
        .get(`/cguias/generatePDF`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            id: "1345",
          },
        })
        .then((res) => {
          this.$refs.webViewer.showpdf(res.data.base64);
        });
    },
  },
};
</script>

<style>
.q-field__bottom {
  display: none;
}
</style>
