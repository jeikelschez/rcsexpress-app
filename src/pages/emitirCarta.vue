<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form class="q-gutter-md" @submit="pdfView = true">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.contacto"
                  label="Contacto"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                  ]"
                  @update:model-value="
                    form.contacto = form.contacto.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.cargo"
                  label="Cargo"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                  ]"
                  @update:model-value="form.cargo = form.cargo.toUpperCase()"
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
      >
        <div
          class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>MANTENIMIENTO - EMITIR CARTA A CLIENTES</strong>
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
            label="Agencia"
            @update:model-value="getDataClientes()"
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
            @blur="getDataClientes()"
            @keyup.enter="getDataClientes()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy1"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_desde"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                    @blur="getDataClientes()"
                    @keyup.enter="getDataClientes()"
                    @update:model-value="getDataClientes(); this.$refs.qDateProxy1.hide()"
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
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
            @blur="getDataClientes()"
            @keyup.enter="getDataClientes()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy2"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_hasta"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                    @blur="getDataClientes()"
                    @keyup.enter="getDataClientes()"
                    @update:model-value="getDataClientes(); this.$refs.qDateProxy2.hide() "
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <div class="q-gutter-md">
            <q-btn-toggle
              v-model="selectedTipo"
              spread
              class="my-custom-toggle"
              rounded
              unelevated
              toggle-color="primary"
              color="white"
              text-color="black"
              :options="tipos"
              @update:model-value="getDataClientes()"
            >
              <template v-slot:clte>
                <q-tooltip
                  class="bg-primary"
                  style="max-height: 30px"
                  transition-show="scale"
                  transition-hide="scale"
                  color="primary"
                  >Clientes
                </q-tooltip>
              </template>
              <template v-slot:part>
                <q-tooltip
                  class="bg-primary"
                  style="max-height: 30px"
                  transition-show="scale"
                  transition-hide="scale"
                  color="primary"
                  >Particulares
                </q-tooltip>
              </template>
            </q-btn-toggle>
          </div>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile2"
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
                  this.selectedTipo == 'C' ? 'clientes' : 'cparticulares',
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
            :loading="clientesLoading"
            :disable="clientesLoading"
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
            style="margin-right: 5px"
            :disabled="this.guias.length > 0 ? false : true"
            @click.capture="this.dialog = true"
          >
            <q-icon size="25px" name="print" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Imprimir Carta</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-y-md" style="margin-top: -30px">
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
        style="width: 100%; height: 560px"
        hide-bottom
        v-model:selected="selected"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:body-cell-nro_documento="props">
          <q-td :props="props">
            {{ buildNroDoc("nro_documento", props.row) }}
          </q-td>
        </template>
        <template v-slot:body-cell-nro_fact="props">
          <q-td :props="props">
            {{ buildNroDoc("nro_fact", props.row) }}
          </q-td>
        </template>
        <template v-slot:body-cell-observacion_adic="props">
          <q-td :props="props" style="padding-top: 30px">
            <q-input
              outlined
              v-model="props.row.observacion_adic"
              dense
              hint=""
              :rules="[
                (val) => this.$refs.rulesVue.isMax(val, 100),
                (val) => this.$refs.rulesVue.isMin(val, 3),
              ]"
              lazy-rules
            >
            </q-input>
          </q-td>
        </template>
        <template v-slot:item="props" style="margin-bottom: 20px">
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
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'nro_documento'"
                  >
                    {{ buildNroDoc("nro_documento", props.row) }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'nro_fact'"
                  >
                    {{ buildNroDoc("nro_fact", props.row) }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'fecha_emision'"
                  >
                    {{ props.row.fecha_emision }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'monto_total'"
                  >
                    {{ props.row.monto_total }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'observacion_entrega'"
                    style="text-align: right !important"
                  >
                    {{ props.row.observacion_entrega }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'observacion_adic'"
                    style="text-align: right !important; align-self: center"
                  >
                    <q-input
                      outlined
                      v-model="props.row.observacion_adic"
                      dense
                      hint=""
                      :rules="[
                        (val) => this.$refs.rulesVue.isMax(val, 100),
                        (val) => this.$refs.rulesVue.isMin(val, 3),
                      ]"
                      lazy-rules
                      hide-bottom-space
                      style="padding-top: 20px"
                    >
                    </q-input>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="pdfView" @show="this.printLetter()">
      <div style="width: 700px; height: 700px">
        <webViewer ref="webViewer" @close-pdf="closePdf"></webViewer>
      </div>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data-Agencias="setDataAgencias"
      @get-Data-Clientes="getDataClientes"
      @set-Data-Clientes="setDataClientes"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import rulesVue from "src/components/rules.vue";
import moment from "moment";
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
      columns: [
        {
          name: "nro_documento",
          label: "N° Control",
          field: "nro_documento",
          align: "left",
          sortable: true,
        },
        {
          name: "nro_fact",
          label: "N° Fact.",
          field: "nro_fact",
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
          name: "observacion_entrega",
          label: "Descripción",
          field: "observacion_entrega",
          align: "left",
        },
        {
          name: "observacion_adic",
          label: "Observación Adicional",
          field: "observacion_adic",
          align: "left",
        },
      ],
      form: {
        contacto: "",
        cargo: "",
      },
      tipos: [
        { label: "Clte", value: "C", slot: "clte" },
        { label: "Part", value: "P", slot: "part" },
      ],
      guias: [],
      guiasAll: [],
      agencias: [],
      rpermisos: [],
      clientes: [],
      agenciasSelected: [],
      clientesSelected: [],
      selectedAgencia: [],
      selectedCliente: [],
      selectedTipo: "C",
      fecha_desde: moment().subtract(7, "days").format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
      clientesLoading: false,
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      selected: ref([]),
      pdfView: ref(false),
      pagination: {
        page: 1,
        rowsPerPage: 0,
      },
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Mantenimiento - Emitir Carta de Cliente",
      ""
    );
    this.$refs.methods.getData("/agencias", "setDataAgencias", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "emitircarta",
      },
    });
  },
  methods: {
    closePdf() {
      this.pdfView = false;
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

    // METODOS DE PAGINA

    // Metodos para Setear Datos de Agencias
    setDataAgencias(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      this.getDataClientes();
    },
    // Metodo para Extraer Todos las facturas y de alli los clientes
    getDataClientes() {
      this.guias = [];
      this.selected = [];
      this.clientes = [];
      this.selectedCliente = [];
      this.$refs.methods.getData(
        `/mmovimientos`,
        "setDataClientes",
        "guiasAll",
        {
          headers: {
            agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
            desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
            hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
            cliente_orig_exist: this.selectedTipo == "C" ? "S" : "",
            cliente_part_exist: this.selectedTipo == "C" ? "" : "S",
            tipo_in: "FA,NC,ND",
            estatus_admin_ex: "A",
          },
        }
      );
    },
    // Metodo para Setear Datos de Tabla clientes
    async setDataClientes(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      if (this.guiasAll.length == 0) {
        var cTipo = this.selectedTipo == "C" ? "Cliente" : "Particular";
        this.errorMessage(
          "No se han emitido Facturas a ningun " +
            cTipo +
            " en este período de Tiempo!!"
        );
      } else {
        this.clientesLoading = true;
        var clientesArray = [];
        for (var i = 0; i <= this.guiasAll.length - 1; i++) {
          if (clientesArray.indexOf(this.guiasAll[i].cod_cliente_org) < 0) {
            clientesArray.push(this.guiasAll[i].cod_cliente_org);
            var clienteUrl =
              this.selectedTipo == "C" ? "/clientes" : "/cparticulares";
            await api
              .get(`${clienteUrl}/${this.guiasAll[i].cod_cliente_org}`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .then((res) => {
                this.clientes.push(res.data);
              });
          }
        }
        this.clientesLoading = false;
      }
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable() {
      if (!this.selectedCliente.id) return;
      this.loading = true;
      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "guias", {
        headers: {
          agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
          cliente_orig: this.selectedCliente.id ? this.selectedCliente.id : "",
          desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
          hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
          tipo_in: "FA,NC,ND",
          estatus_admin_ex: "A",
        },
      });
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.selected = this.guias;
      this.loading = false;
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
        case "nro_fact":
          if (row.t_de_documento == "FA") {
            if (!row.nro_control) {
              response = row.serie_documento + " - " + row.nro_documento;
            } else {
              response = row.nro_control.padStart(4, "0000");
            }
          }
          break;
        default:
          break;
      }
      return response;
    },
    // Metodo para Resetear Filtros
    resetFilters() {
      this.guias = [];
      this.selected = [];
      this.clientes = [];
      this.selectedCliente = [];
      this.selectedTipo = "C";
      this.selectedAgencia = this.agencias[0];
      this.fecha_desde = moment().subtract(7, "days").format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.getDataClientes();
    },
    // Imprimir Carta
    printLetter() {
      var factArray = [];
      this.dialog = false;
      for (var i = 0; i <= this.selected.length - 1; i++) {
        factArray.push(
          this.selected[i].id +
            "/" +
            (this.selected[i].observacion_adic
              ? this.selected[i].observacion_adic.toUpperCase()
              : "")
        );
      }
      api
        .get(`/reports/cartaCliente`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            data: factArray,
            cliente: this.selectedCliente.nb_cliente,
            contacto: this.form.contacto,
            cargo: this.form.cargo,
            ciudad: this.selectedAgencia.ciudades.desc_ciudad,
            usuario: LocalStorage.getItem('tokenTraducido').usuario.nombre,
          },
        })
        .then((res) => {
          this.$refs.webViewer.showpdf(res.data.base64);
          this.resetForm();
        });
    },
    // Metodo para Resetear Datos
    resetForm() {
      this.form.contacto = "";
      this.form.cargo = "";
    },
    // Metodo para imprimir mensajes de error
    errorMessage(message) {
      this.$q.notify({
        message: message,
        color: "red",
      });
    },
  },
};
</script>

<style>
@media screen and (max-width: 1080px) {
  .tableHeight {
    height: 100% !important;
  }
}
</style>
