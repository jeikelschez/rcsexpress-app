<template>
  <q-page class="pagina q-pa-md">
    <div class="q-pa-sm justify-center" style="margin-top: 10px">
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -20px"
      >
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>REPORTES - CONTROL DE RETENCIONES IVA</strong>
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
            :options="tipoReporte"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            v-model="selectedTipo"
            outlined
            standout
            label="Tipo de Reporte"
            @update:model-value="this.nro_comprobante = ''"
          >
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
            :options="proveedoresSelected"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'proveedoresSelected',
                  'proveedores',
                  'nb_proveedor'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="nb_proveedor"
            option-value="id"
            v-model="selectedProveedor"
            outlined
            :loading="proveedoresLoading"
            :disable="
              this.selectedTipo.value != 'DI' ? proveedoresLoading : true
            "
            standout
            label="Proveedor"
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-6 cardMargin selectMobile2"
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
                    @update:model-value="this.$refs.qDateProxy.hide()"
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-6 cardMargin selectMobile2"
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
                    @update:model-value="this.$refs.qDateProxy.hide()"
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile2"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
            @click="selectDetalleIva()"
            :disabled="
              this.selectedTipo.value == 'IC' && this.selectedProveedor.id
                ? false
                : true
            "
          >
            <q-icon size="25px" name="list_alt" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Seleccionar Facturas</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
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
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            :disabled="
              this.selectedTipo.value == 'IC'
                ? this.nro_comprobante
                  ? false
                  : true
                : false
            "
            @click="
              pdfChange();
              print = 1;
            "
          >
            <q-icon size="25px" name="input" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              transition-show="scale"
              style="max-height: 30px"
              transition-hide="scale"
              color="primary"
              >Generar</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <q-dialog v-model="detalleIva">
      <q-card style="width: 1000px; max-width: 80vw">
        <div
          class="row justify-center items-center content-center"
          style="padding: 20px"
        >
          <div class="col-md-11 col-xs-12">
            <p style="font-size: 20px; text-align: left" class="text-secondary">
              <strong>LISTA DE FACTURAS</strong>
            </p>
          </div>
          <div class="col-md-12 col-xs-12">
            <q-table
              :rows="listaIva"
              row-key="id"
              :columns="columnsLista"
              binary-state-sort
              :separator="separator"
              v-model:pagination="pagination"
              :grid="$q.screen.xs"
              :rows-per-page-options="[0]"
              selection="multiple"
              v-model:selected="selected"
              style="width: 100%; height: 350px"
              hide-bottom
            >
              <template v-slot:body-cell-fecha_entrega="props">
                <q-td :props="props">
                  <q-input
                    label="Fecha Desde"
                    hint=""
                    dense
                    style="padding-bottom: 0px"
                    v-model="props.row.fecha_entrega"
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
                            v-model="props.row.fecha_entrega"
                            mask="DD/MM/YYYY"
                            style="padding-bottom: 0px"
                            @update:model-value="this.$refs.qDateProxy.hide()"
                          ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-td>
              </template>
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn
                    dense
                    round
                    flat
                    color="primary"
                    icon="edit"
                    :disabled="this.allowOption(3) || props.row.fecha_entrega == '00/00/0000'"
                    @click="updateSelected(props.row.id, props.row.fecha_entrega)"
                  ></q-btn>
                  <q-btn
                    dense
                    round
                    flat
                    color="primary"
                    icon="backspace"
                    :disabled="this.allowOption(4)"
                    @click="deleteSelected(props.row.id, props.rowIndex)"
                  ></q-btn>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
        <div
          class="row justify-center items-center content-center"
          style="margin-bottom: 20px"
        >
          <q-btn
            label="Seleccionar"
            color="primary"
            class="col-md-5 col-sm-5 col-xs-12"
            icon="done_all"
            @click="this.selectOptions()"
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
      </q-card>
    </q-dialog>

    <q-dialog v-model="detalleIvaSelected">
      <q-card style="width: 500px; max-width: 80vw">
        <div
          class="row justify-center items-center content-center"
          style="padding: 20px"
        >
          <div class="col-md-11 col-xs-12">
            <p style="font-size: 20px; text-align: left" class="text-secondary">
              <strong>INGRESE COMPROBANTE IVA</strong>
            </p>
          </div>
          <div class="row col-md-12 col-xs-12">
            <div
              class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile2"
            >
              <q-input
                outlined
                label="Nro. Comprobante"
                hint=""
                dense
                rounded
                ref="nro_comprobante"
                style="padding-bottom: 10px"
                v-model="nro_comprobante"
                lazy-rules
              >
              </q-input>
            </div>
            <div class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6">
              <q-input
                outlined
                label="Fecha Comprobante"
                hint=""
                dense
                rounded
                style="padding-bottom: 0px"
                v-model="fecha_comprobante"
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
                        v-model="fecha_comprobante"
                        mask="DD/MM/YYYY"
                        style="padding-bottom: 0px"
                        @update:model-value="this.$refs.qDateProxy.hide()"
                      ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <div
          class="row justify-center items-center content-center"
          style="margin-bottom: 20px"
        >
          <q-btn
            label="Generar"
            color="primary"
            dense
            class="col-md-3 col-sm-3 col-xs-12"
            icon="settings"
            style="margin-left: 5px"
            :disable="generarDisabled"
            @click="this.generaNroComp()"
          />
          <q-btn
            label="Guardar"
            color="primary"
            dense
            class="col-md-3 col-sm-3 col-xs-12"
            icon="save"
            style="margin-left: 5px"
            @click="this.saveNroComp()"
          />
          <q-btn
            label="Cerrar"
            color="primary"
            flat
            dense
            class="col-md-3 col-sm-3 col-xs-12"
            icon="close"
            v-close-popup
          />
        </div>
      </q-card>
    </q-dialog>    

    <div
      class="q-pa-md col-md-12 col-xs-12 q-gutter-y-md justify-center"
      style="margin-top: -30px"
    >
      <webViewer
        ref="webViewer"
        v-if="pdf == true"
        style="width: 1580px; height: 560px; max-width: 1580px"
      >
      </webViewer>
      <q-inner-loading :showing="loading" color="primary" class="loading" />
    </div>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { api } from "boot/axios";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import rulesVue from "src/components/rules.vue";
import webViewerVue from "src/components/webViewer.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
    webViewer: webViewerVue,
  },
  data() {
    return {
      columnsLista: [
        {
          name: "fecha_documento",
          label: "Fec. Fact.",
          field: "fecha_documento",
          align: "center",
        },
        {
          name: "nro_documento",
          label: "Nro. Fact.",
          field: "nro_documento",
          align: "center",
        },
        {
          name: "nro_factura",
          label: "Nro. Control",
          field: "nro_ctrl_doc",
          align: "center",
        },
        {
          name: "nro_comprobante",
          label: "Nro. Comprobante",
          field: "nro_comprobante_iva",
          align: "center",
        },
        {
          name: "fecha_comprobante",
          label: "Fec. Comprobante",
          field: "fecha_comprobante",
          align: "center",
        },
        {
          name: "fecha_entrega",
          label: "Fec. Entrega",
          field: "fecha_entrega",
          align: "center",
        },
        {
          name: "action",
          label: "Acción",
          align: "center",
        },
      ],
      tipoReporte: [
        {
          label: "IMPRESIÓN DE COMPROBANTE IVA",
          value: "IC",
        },
        {
          label: "RESUMEN DE COMPROBANTE IVA",
          value: "RC",
        },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0,
        rowsNumber: "",
      },
      pdf: true,
      selected: [],
      selectedOption: [],
      proveedores: [],
      selectedTipo: [],
      proveedoresSelected: [],
      selectedProveedor: [],
      listaIva: [],
      proveedoresLoading: true,
      print: "",
      nro_comprobante: "",
      fecha_comprobante: "",
      generarDisabled: true,
      flagGenerar: false,
      valorIva: "",
      fecha_desde: moment().format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      pdfView: ref(false),
      detalleIva: ref(false),
      detalleIvaSelected: ref(false),
      separator: ref("vertical"),
    };
  },
  mounted() {
    this.pdfPrint();
    this.$emit(
      "changeTitle",
      "SCEN - Reportes - Control de Retenciones IVA",
      ""
    );
    this.$refs.methods.getData("/proveedores", "setData", "proveedores", {
      headers: {
        activo: "S",
      },
    });

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "controlretencionesiva",
      },
    });
    this.selectedTipo = this.tipoReporte[0];
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
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },
    // Metodo para validar Permisos
    allowOption(option) {
      return (
        this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0
      );
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos Iniciales
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    async pdfChange() {
      this.loading = true;
      this.pdf = false;
      setTimeout(() => {
        this.pdfPrint();
        this.pdf = true;
      }, 100);
    },
    pdfPrint() {
      let dataArray = {};
      dataArray.proveedor = this.selectedProveedor.id
        ? this.selectedProveedor.id
        : "";
      dataArray.desde = this.fecha_desde;
      dataArray.hasta = this.fecha_hasta;
      dataArray.comprobante = this.nro_comprobante;
      api
        .get(`/pdfreports/retencionesIva`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            print: this.print,
            tipo: this.selectedTipo.value,
            data: JSON.stringify(dataArray),
          },
        })
        .then((res) => {
          if (!res.data.validDoc) {
            this.$q.notify({
              message: "No existen registros para este conjunto de Filtos",
              color: "red",
            });
            this.print = "";
          }
          this.$refs.webViewer.showpdf(
            res.data.pdfPath,
            this.print == "" ? 0.64 : 1.8,
            false,
            false
          );
          this.loading = false;
        })
        .catch((err) => {
          this.$q.notify({
            message: err.message,
            color: "red",
          });
          this.pdfView = false;
          this.loading = false;
          return;
        });
    },
    // Metodo para seleccionar el detalle de IVA
    async selectDetalleIva() {
      await api
        .get(`/mctapagar`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
            hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
            proveedor: this.selectedProveedor.id,
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
            this.listaIva = res.data.data;
            this.detalleIva = true;
          } else {
            this.$q.notify({
              message: "No existen registros para este Proveedor",
              color: "red",
            });
          }
        });
    },
    // Metodo para seleccionar detalles de la lista
    selectOptions() {
      if (this.selected.length == 0) {
        this.$q.notify({
          message: "Debe Seleccionar al menos un Registro",
          color: "red",
        });
        return;
      }

      this.detalleIva = false;
      this.detalleIvaSelected = true;
      this.generarDisabled = true;
      if (
        this.selected[0].nro_comprobante_iva == null ||
        this.selected[0].nro_comprobante_iva == ""
      ) {
        this.generarDisabled = false;
      }
      this.nro_comprobante = this.selected[0].nro_comprobante_iva;
      this.fecha_comprobante = this.selected[0].fecha_comprobante;
    },
    // Metodo para guardar el nuevo numero de comprobante
    saveNroComp() {
      if (!this.nro_comprobante) {
        this.$q.notify({
          message: "Debe ingresar un número de Comprobante Válido",
          color: "red",
        });
        this.$refs.nro_comprobante.$el.focus();
        return;
      }

      for (var i = 0; i <= this.selected.length - 1; i++) {
        let formIva = {};
        formIva.nro_comprobante_iva = this.nro_comprobante;
        formIva.fecha_comprobante = moment(
          this.fecha_comprobante,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
        this.selected[i].nro_comprobante_iva = this.nro_comprobante;
        this.selected[i].fecha_comprobante = this.fecha_comprobante;

        api
          .put(`/mctapagar/${this.selected[i].id}`, formIva, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al Actualizar el IVA. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
          });
      }

      if (this.flagGenerar) {
        api
          .get(`/vcontrol`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              name: "COMPROBANTE_IVA",
            },
          })
          .then((res) => {
            res.data[0].valor = this.valorIva.toString();
            let id = res.data[0].id;
            delete res.data[0].id;
            delete res.data[0].tipo_desc;
            api
              .put(`/vcontrol/${id}`, res.data[0], {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              })
              .then(() => {
                this.$q.notify({
                  message: "Actualización Exitosa...",
                  color: "green",
                });
                this.flagGenerar = false;
              })
              .catch(() => {
                this.$q.notify({
                  message:
                    "Error del Sistema. Problemas al Actualizar el valor del IVA. Comuníquese con el proveedor del Sistemas...",
                  color: "red",
                });
              });
          });
      }

      this.detalleIvaSelected = false;
    },
    // Metodo para generar un numero de comprobante
    generaNroComp() {
      api
        .get(`/vcontrol`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            name: "COMPROBANTE_IVA",
          },
        })
        .then((res) => {
          this.valorIva = parseInt(res.data[0].valor, 10) + 1;
          let nro_comprobante =
            moment().format("YYYY") + moment().format("MM") + this.valorIva.toString().padStart(8, "0");
          this.nro_comprobante = nro_comprobante;
          this.fecha_comprobante = moment().format("DD/MM/YYYY");
          this.flagGenerar = true;
        });
    },
    // Metodo para setear fecha de entrega en Comprobante IVA
    updateSelected(id, fecha) {
      let formCtaPagar = {};
      formCtaPagar.fecha_entrega = moment(
        fecha,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
      api
        .put(`/mctapagar/${id}`, formCtaPagar, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.$q.notify({
            message: "Actualización Exitosa...",
            color: "green",
          });
        })
        .catch(() => {
          this.$q.notify({
            message:
              "Error del Sistema. Problemas al Actualizar la fecha de Entrega. Comuníquese con el proveedor del Sistemas...",
            color: "red",
          });
        });
    },
    // Metodo para borrar comprobante IVA y fecha
    deleteSelected(id, index) {
      this.listaIva[index].nro_comprobante_iva = null;
      this.listaIva[index].fecha_comprobante = null;
      let formCtaPagar = {};
      formCtaPagar.nro_comprobante_iva = null;
      formCtaPagar.fecha_comprobante = null;
      api
        .put(`/mctapagar/${id}`, formCtaPagar, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.$q.notify({
            message: "Actualización Exitosa...",
            color: "green",
          });
        })
        .catch(() => {
          this.$q.notify({
            message:
              "Error del Sistema. Problemas al borrar los datos del Comprobante. Comuníquese con el proveedor del Sistemas...",
            color: "red",
          });
        });
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selected = [];
      this.selectedOption = [];
      this.flagGenerar = false;
      this.selectedTipo = this.tipoReporte[0];
      this.generarDisabled = true;
      this.selectedProveedor = [];
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.print = "";
      this.pdfChange();
    },
  },
};
</script>
