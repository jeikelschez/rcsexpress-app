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
            <strong>ADMINISTRACIÓN - RETENCIONES COMPRADOR</strong>
          </p>
        </div>
        <div
          class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            :loading="loading"
            :disable="loading"
            label="Agencia"
            @update:model-value="
              this.selectedCliente = [];
              this.facturas = [];
              this.selectedFacturas = [];
              this.clientesLoading = true;
              this.$refs.methods.getData('/clientes', 'setData', 'clientes', {
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
          class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            ref="clientes"
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
            @update:model-value="setFacturas()"
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
          class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12"
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
            @click="this.sendData()"
            style="margin-right: 15px"
            :disable="this.selectedFacturas.length == 0 ? true : false"
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
        </div>
      </div>
    </div>

    <div
      class="row justify-center items-center content-center"
      style="padding: 10px"
    >
      <div class="col-md-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-table
              :rows="facturas"
              dense
              selection="single"
              :columns="columnsFacturas"
              binary-state-sort
              :separator="separator"
              :rows-per-page-options="[0]"
              v-model:selected="selectedFacturas"
              row-key="id"
              style="width: 100%; height: 500px"
              @selection="onSelection"
              :loading="loading"
              hide-bottom
            >
              <template v-slot:loading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
              <template v-slot:body-cell-nro_control="props">
                <q-td :props="props">
                  {{ buildNroDoc("nro_control", props.row) }}
                </q-td>
              </template>
              <template v-slot:body-cell-nro_documento="props">
                <q-td :props="props">
                  {{ buildNroDoc("nro_documento", props.row) }}
                </q-td>
              </template>
              <template v-slot:body-cell-nro_ref="props">
                <q-td :props="props">
                  {{ buildNroDoc("nro_ref", props.row) }}
                </q-td>
              </template>
            </q-table>
            <div class="row" style="margin-top: 20px">
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Recepción Comprobante"
                  hint=""
                  dense
                  style="padding-bottom: 0px"
                  v-model="fecha_comp_ret_compra"
                  class="pcform"
                  lazy-rules
                  mask="##/##/####"
                  :disable="this.selectedFacturas.length == 0 ? true : false"
                  :readonly="this.selectedFacturas.length == 0 ? true : false"
                  :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy1"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="fecha_comp_ret_compra"
                          mask="DD/MM/YYYY"
                          style="padding-bottom: 0px"
                          @update:model-value="this.$refs.qDateProxy1.hide()"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Emisión Comprobante"
                  hint=""
                  dense
                  style="padding-bottom: 0px"
                  v-model="fecha_emi_comp_ret_compra"
                  class="pcform"
                  lazy-rules
                  mask="##/##/####"
                  :disable="this.selectedFacturas.length == 0 ? true : false"
                  :readonly="this.selectedFacturas.length == 0 ? true : false"
                  :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy2"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="fecha_emi_comp_ret_compra"
                          mask="DD/MM/YYYY"
                          style="padding-bottom: 0px"
                          @update:model-value="this.$refs.qDateProxy2.hide()"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="nro_comp_ret_compra"
                  label="Nº Comprobante Retención"
                  hint=""
                  dense
                  input-class="text-right"
                  style="padding-bottom: 10px"
                  class="pcform"
                  :disable="this.selectedFacturas.length == 0 ? true : false"
                  :readonly="this.selectedFacturas.length == 0 ? true : false"
                  lazy-rules
                >
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="iva_retenido_comprador"
                  label="IVA Retenido"
                  hint=""
                  dense
                  input-class="text-right"
                  style="padding-bottom: 10px"
                  v-money="money"
                  :disable="this.selectedFacturas.length == 0 ? true : false"
                  :readonly="this.selectedFacturas.length == 0 ? true : false"
                  lazy-rules
                >
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
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
import { VMoney } from "v-money";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  directives: { money: VMoney },
  components: {
    methods: methodsVue,
    rulesVue,
  },
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: false,
      },
      agencias: [],
      clientes: [],
      facturas: [],
      selectedFacturas: [],
      agenciasSelected: [],
      selectedAgencia: [],
      selectedCliente: [],
      clientesSelected: [],
      clientesLoading: false,
      fecha_comp_ret_compra: null,
      fecha_emi_comp_ret_compra: null,
      nro_comp_ret_compra: "",
      iva_retenido_comprador: 0,
      columnsFacturas: [
        {
          name: "t_de_documento",
          label: "Tipo",
          field: "t_de_documento",
          align: "center",
        },
        {
          name: "nro_control",
          label: "Nº Ctrl.",
          field: "nro_control",
          align: "center",
        },
        {
          name: "nro_documento",
          label: "Nº Doc.",
          field: "nro_documento",
          align: "center",
        },
        {
          name: "nro_ref",
          label: "Ref.",
          field: "nro_ref",
          align: "center",
        },
        {
          name: "fecha_emision",
          label: "Emisión",
          field: "fecha_emision",
          align: "center",
        },
        {
          name: "monto_total",
          label: "Total",
          field: "monto_total",
          align: "right",
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
          name: "porc_impuesto",
          label: "% Impuesto",
          field: "porc_impuesto",
          align: "right",
          format: (val) => parseInt(val) + "%",
        },
        {
          name: "monto_impuesto",
          label: "IVA",
          field: "monto_impuesto",
          align: "right",
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
      ],
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      pdfView: ref(false),
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Administración - Retenciones Comprador",
      ""
    );
    this.$refs.methods.getData("/agencias", "setData", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "retencioncomprador",
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
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para setear las Facturas de un cliente
    async setFacturas() {
      this.facturas = [];
      this.selectedFacturas = [];
      this.loading = true;
      await api
        .get(`/mmovimientos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            filters: JSON.stringify({
              agencia: this.selectedAgencia.id,
              cliente_orig: this.selectedCliente.id,
              tipo_in: "FA,NC,ND",
              estatus_admin_ex: "A",
            }),
            order: JSON.stringify([
              ["t_de_documento", "ASC"],
              ["nro_documento", "DESC"],
            ]),
            direction: "DESC",
          },
        })
        .then((res) => {
          this.facturas = res.data.data;
          this.loading = false;
        });
    },
    // Metodo para setear las Facturas de un cliente
    async onSelection({ rows, added }) {
      this.fecha_comp_ret_compra = null;
      this.fecha_emi_comp_ret_compra = null;
      this.nro_comp_ret_compra = "";
      this.iva_retenido_comprador = 0;
      if (added) {
        this.fecha_comp_ret_compra =
          rows[0].fecha_comp_ret_compra != null
            ? rows[0].fecha_comp_ret_compra
            : moment().format("DD/MM/YYYY");
        this.fecha_emi_comp_ret_compra =
          rows[0].fecha_emi_comp_ret_compra != null
            ? rows[0].fecha_emi_comp_ret_compra
            : moment().format("DD/MM/YYYY");
        this.nro_comp_ret_compra = rows[0].nro_comp_ret_compra;
        this.iva_retenido_comprador = rows[0].iva_retenido_comprador;
        if(rows[0].iva_retenido_comprador == 0 || rows[0].iva_retenido_comprador == null) {
          this.iva_retenido_comprador = (rows[0].monto_impuesto * 0.75).toFixed(2);
        }
      }
    },
    // Arma el numero de documento en diferentes formatos
    buildNroDoc(field, row) {
      var response = "";
      switch (field) {
        case "nro_control":
          if (row.t_de_documento == "FA") {
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
            response += row.nro_documento;
          }
          break;
        case "nro_documento":
          if (row.t_de_documento == "FA") {
            if (!row.nro_control) {
              response = row.serie_documento + " - " + row.nro_documento;
            } else {
              response = row.nro_control.padStart(4, "0000");
            }
          }
          break;
        case "nro_ref":
          if (row.t_de_documento == "FA" && row.nro_control)
            response = row.cod_agencia + "-" + row.nro_documento;
          break;
        default:
          break;
      }
      return response;
    },
    // Guarda los cambios
    async sendData() {
      if (
        moment(this.fecha_comp_ret_compra, "DD/MM/YYYY").format("YYYY-MM-DD") ==
          "Invalid date" ||
        moment(this.fecha_comp_ret_compra, "DD/MM/YYYY").format("YYYY-MM-DD") ==
          null ||
        moment(this.fecha_emi_comp_ret_compra, "DD/MM/YYYY").format("YYYY-MM-DD") ==
          "Invalid date" ||
        moment(this.fecha_emi_comp_ret_compra, "DD/MM/YYYY").format("YYYY-MM-DD") ==
          null ||
        this.nro_comp_ret_compra == "" ||
        this.nro_comp_ret_compra == null ||
        this.iva_retenido_comprador == null ||
        parseFloat(this.iva_retenido_comprador) <= 0
      ) {
        this.$q.notify({
          message:
            "Recuerde que dede ingresar el número de comprobante, la fecha de recepción, la fecha de emisión del mismo y el monto del iva retenido antes de guardar...",
          color: "red",
        });
        return;
      }

      // Actualizamos data del formulario
      var find = this.facturas.findIndex(
        (item) => item.id == this.selectedFacturas[0].id
      );
      this.facturas[find].fecha_comp_ret_compra = this.fecha_comp_ret_compra;
      this.facturas[find].fecha_emi_comp_ret_compra =
        this.fecha_emi_comp_ret_compra;
      this.facturas[find].nro_comp_ret_compra = this.nro_comp_ret_compra;
      this.facturas[find].iva_retenido_comprador = this.iva_retenido_comprador;

      // Actualizamos el estatus del movimiento
      let formMovimientos = {};
      formMovimientos.fecha_comp_ret_compra = moment(
        this.fecha_comp_ret_compra,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      formMovimientos.fecha_emi_comp_ret_compra = moment(
        this.fecha_emi_comp_ret_compra,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD");
      formMovimientos.nro_comp_ret_compra = this.nro_comp_ret_compra;
      formMovimientos.iva_retenido_comprador = parseFloat(
        this.curReplace(this.iva_retenido_comprador)
      );
      await api
        .put(`/mmovimientos/${this.selectedFacturas[0].id}`, formMovimientos, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .catch(() => {
          this.$q.notify({
            message:
              "Error del Sistema. Problemas al actualizar datos del Movimiento. Comuníquese con el proveedor del Sistemas...",
            color: "red",
          });
          return;
        });

      this.$q.notify({
        message: "Retención de IVA guardada exitosamente",
        color: "green",
      });
    },
    // Metodo para convertir a Currency los String
    curReplace(amount) {
      return amount.indexOf(",") < 0
        ? amount
        : amount.replaceAll(".", "").replaceAll(",", ".");
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selectedAgencia = [];
      this.selectedCliente = [];
      this.facturas = [];
      this.clientes = [];
      this.selectedFacturas = [];
      this.fecha_comp_ret_compra = null;
      this.fecha_emi_comp_ret_compra = null;
      this.nro_comp_ret_compra = "";
    },
  },
};
</script>
