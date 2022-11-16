<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form class="q-gutter-md">
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
                  ]"
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
                  ]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.serie_doc"
                  label="Serie Lote"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 1)]"
                  @update:model-value="
                    form.serie_doc = form.serie_doc.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.ult_doc_referencia"
                  label="Ultimo Numero Asignado"
                  hint=""
                  class="pcform"
                  type="number"
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 10)]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
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
        style="padding-right: 30px"
      >
        <div
          class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>MANTENIMIENTO - ANULACION DE GUIAS</strong>
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
            label="Agencia"
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
            v-model="form.fecha_emision"
            lazy-rules
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
                    v-model="form.fecha_emision"
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
            v-model="form.fecha_emision"
            lazy-rules
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
                    v-model="form.fecha_emision"
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
          class="col-md-2 col-xl-2 col-lg2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="tipos"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'tiposSelected',
                  'tipos',
                  'descripcion'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="label"
            option-value="value"
            v-model="selectedTipo"
            outlined
            standout
            label="Tipo de Control"
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
          class="col-md-1 col-xl-1 col-lg-1 col-xs-4 col-sm-4 buttonsDiv"
          style="align-self: center; text-align: center"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="
              this.selectedAgencia = this.agencias[0];
              this.selectedTipo = this.tipos[0];
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
              >Resetear Filtros</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-y-md" style="margin-top: -20px">
      <q-table
        :rows="guias"
        binary-state-sort
        row-key="id"
        :columns="columns"
        :separator="separator"
        :rows-per-page-options="[5, 10, 15, 20, 50]"
        @request="getDataTable"
        style="width: 100%"
        :loading="loading"
        :grid="$q.screen.xs"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:body-cell-cod_cliente_org="props">
          <q-td :props="props">
            {{
              findIndex("clientesAll", props.row.cod_cliente_org, "nb_cliente")
            }}
          </q-td>
        </template>
        <template v-slot:body-cell-estatus_administra="props">
          <q-td :props="props">
            {{
              filterDesc(
                "estatus_administrativo",
                props.row.estatus_administra
              )
            }}
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="primary"
              icon="disabled_by_default"
              :disabled="this.allowOption(3)"
              @click="
                this.$refs.methods.getData(
                  `/correlativo/${props.row.id}`,
                  `setDataEdit`,
                  'form'
                );
                dialog = true;
              "
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
                    <q-btn
                      v-if="col.name === 'action'"
                      dense
                      round
                      flat
                      color="primary"
                      icon="edit"
                      :disabled="this.allowOption(3)"
                      @click="
                        this.$refs.methods.getData(
                          `/correlativo/${props.row.id}`,
                          `setDataEdit`,
                          'form'
                        );
                        dialog = true;
                      "
                    ></q-btn>
                    <q-item-label>
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
                `/correlativo/${selected}`,
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
      @set-Data-Init="setDataInit"
      @set-Data-Edit="setDataEdit"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue, rulesVue },
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
          name: "nro_doc_principal",
          label: "N° Doc.",
          field: "nro_doc_principal",
          align: "left",
          sortable: true,
        },
        {
          name: "serie_doc_principal",
          label: "Ref.",
          field: "serie_doc_principal",
          align: "left",
          sortable: true,
        },
        {
          name: "fecha_emision",
          label: "Emisión",
          field: "fecha_emision",
          align: "left",
          format: (val) => val.split("-").reverse().join("/"),
          sortable: true,
        },
        {
          name: "cod_cliente_org",
          label: "Cliente",
          field: "cod_cliente_org",
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
          name: "nro_doc_principal",
          label: "Doc. Ppal.",
          field: "nro_doc_principal",
          align: "left",
          sortable: true,
        },
        {
          name: "estatus_administra",
          label: "Estatus",
          field: "estatus_administra",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: "Acción",
          align: "center",
        },
      ],
      form: {
        tipo: "",
        control_inicio: "",
        control_final: "",
        ult_doc_referencia: "",
        estatus_lote: "",
        serie_doc: "",
        cod_agencia: "",
      },
      estatus_administrativo: [
        { label: "EN ELABORACIÓN", value: "E" },
        { label: "PENDIENTE POR FACTURAR", value: "F" },
        { label: "CON FACTURA GENERADA", value: "G" },
        { label: "ANULADA", value: "A" },
        { label: "PENDIENTE DE COBRAR", value: "P" },
        { label: "CANCELADA", value: "C" },
        { label: "PENDIENTE POR IMPRIMIR", value: "I" },
      ],
      tipos: [
        { label: "GUÍA CARGA", value: "GC" },
        { label: "FACTURA", value: "FA" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "nro_documento",
        descending: true,
        filter: "",
        filterValue: "",
        rowsNumber: "",
      },
      clientesAll: [],
      guias: [],
      agencias: [],
      selectedAgencia: [],
      agenciasSelected: [],
      selectedTipo: [],
      rpermisos: [],
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      deletePopup: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Anulacion de Guias", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/clientes", "setData", "clientesAll");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "anulacionguias",
      },
    });
  },
  methods: {
    // Metodos para Filtrar Selects
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

    // METODOS PARA PAGINA

    // Metodo para Setear Datos Iniciales
    setData(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodos para Setear Datos al Iniciar
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      this.selectedTipo = this.tipos[0];
      this.getDataTable();
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "guias", {
        headers: {
          agencia: this.selectedAgencia.id,
          tipo: this.selectedTipo.value,
          estatus_admin_ex: "G,C",
          no_abono: "S",
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
    // Metodos para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].tipo = res.tipo;
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].ult_doc_referencia = res.ult_doc_referencia;
      this[dataRes].estatus_lote = this.filterDesc("estatus", res.estatus_lote);
      this[dataRes].serie_doc = res.serie_doc;
      this[dataRes].cod_agencia = res.cod_agencia;
    },
    // Metodos para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.tipo = "";
      this.form.control_inicio = "";
      this.form.control_final = "";
      this.form.ult_doc_referencia = "";
      this.form.estatus_lote = "";
      this.form.serie_doc = "";
      this.form.cod_agencia = "";
    },
  },
};
</script>

<style>
@media screen and (min-width: 600px) {
  .movilTitle {
    display: none;
  }
}
@media screen and (min-width: 1024px) {
  .buttonsDiv {
    padding-left: 50px;
  }
}
@media screen and (max-width: 600px) {
  .movilTitle {
    display: block;
  }
}
@media screen and (min-width: 600px) {
  .cardMargin {
    padding-right: 20px !important;
  }
}
@media screen and (min-width: 1024px) {
  .cardMarginFilter {
    padding-right: 20px !important;
  }
}
@media screen and (max-width: 1024px) {
  .espaciadoGuias {
    margin-top: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .marginCards {
    margin-top: 30px;
  }
}
@media screen and (max-width: 600px) {
  .marginCards {
    margin-top: 10px;
  }
}
.menuFilter {
  padding-bottom: 1px;
}
@media screen and (min-width: 1024px) {
  .buttonMenu {
    padding-left: 5px;
  }
}
@media screen and (max-width: 1024px) {
  .check {
    padding-top: 0px;
    padding-bottom: 0px;
  }
}
@media screen and (max-width: 600px) {
  .selectmovil {
    margin-bottom: 20px;
  }
}
@media screen and (min-width: 600px) {
  .filterTop {
    padding-right: 45px;
  }
}
</style>
