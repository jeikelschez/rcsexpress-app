<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 90vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="form.cod_tipo_retencion"
                  label="Codigo"
                  hint=""
                  lazy-rules
                  class="pcform"
                  type="number"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 2),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_tipo_persona"
                  label="Tipo Persona"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  :options="tipoPersona"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_tipo_retencion"
                  label="Descripción"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  @update:model-value="
                    form.nb_tipo_retencion =
                      form.nb_tipo_retencion.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.porc_base"
                  label="Porcentaje Base"
                  hint=""
                  class="pcform"
                  v-money="money"
                  input-class="text-right"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 12),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.porc_retencion"
                  label="Porcentaje Retención"
                  hint=""
                  lazy-rules
                  v-money="money"
                  input-class="text-right"
                  class="pcform"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 12),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.pago_mayor"
                  label="Monto"
                  hint=""
                  v-money="money"
                  input-class="text-right"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 12),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.sustraendo"
                  label="Sustraendo"
                  hint=""
                  lazy-rules
                  class="pcform"
                  v-money="money"
                  input-class="text-right"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 12),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.cod_seniat"
                  label="Codigo SENIAT"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 3),
                  ]"
                  @update:model-value="
                    form.cod_seniat = form.cod_seniat.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha de Validez Inicial"
                  hint=""
                  v-model="form.fecha_ini_val"
                  mask="##/##/####"
                  :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.fecha_ini_val"
                          mask="DD/MM/YYYY"
                          @update:model-value="this.$refs.qDateProxy.hide()"
                        >
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
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha de Validez Final"
                  hint=""
                  v-model="form.fecha_fin_val"
                  mask="##/##/####"
                  :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.fecha_fin_val"
                          mask="DD/MM/YYYY"
                          @update:model-value="this.$refs.qDateProxy.hide()"
                        >
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
      <div class="q-pa-md row justify-end">
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>MANTENIMIENTO - RETENCIONES</strong>
          </p>
        </div>
        <div
          class="col-md-5 col-sm-7 col-xs-12 cardMargin selectMobile"
          style="align-self: center"
        >
          <q-input
            v-model="this.pagination.filterValue"
            rounded
            dense
            outlined
            standout
            label="Búsqueda avanzada"
            @keydown.enter="getDataTable()"
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
        <div
          class="col-md-2 col-sm-4 col-xs-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            color="primary"
            @click="
              dialog = true;
              this.resetForm();
            "
            :disabled="this.allowOption(2)"
            class="q-px-xl q-py-xs"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="retenciones"
          binary-state-sort
          :rows-per-page-options="[5, 10, 15, 20, 50]"
          @request="getDataTable"
          row-key="id"
          :loading="loading"
          :columns="columns"
          :separator="separator"
          style="width: 100%"
          :grid="$q.screen.xs"
          v-model:pagination="pagination"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" class="loading" />
          </template>
          <template v-slot:body-cell-cod_tipo_persona="props">
            <q-td :props="props">
              {{ filterDesc("tipoPersona", props.row.cod_tipo_persona) }}
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
                :disabled="this.allowOption(3)"
                @click="
                  this.$refs.methods.getData(
                    `/mretenciones/${props.row.id}`,
                    'setDataEdit',
                    'form'
                  );
                  dialog = true;
                "
              ></q-btn>
              <q-btn
                dense
                round
                flat
                color="primary"
                icon="delete"
                :disabled="this.allowOption(4)"
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
                    <q-item-section side class="itemMovilSide">
                      <q-item-label v-if="col.name === 'cod_tipo_persona'">
                        {{
                          filterDesc("tipoPersona", props.row.cod_tipo_persona)
                        }}
                      </q-item-label>
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
                            `/mretenciones/${props.row.id}`,
                            'setDataEdit',
                            'form'
                          );
                          dialog = true;
                        "
                      ></q-btn>
                      <q-btn
                        v-if="col.name === 'action'"
                        dense
                        round
                        flat
                        color="primary"
                        icon="delete"
                        :disabled="this.allowOption(4)"
                        @click="selected = props.row.id"
                        @click.capture="deletePopup = true"
                      ></q-btn>
                      <q-item-label v-if="col.name != 'cod_tipo_persona'">
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
    </div>

    <q-dialog v-model="deletePopup">
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
            @click="
              this.$refs.methods.deleteData(
                `/mretenciones/${selected}`,
                'getDataTable'
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data-Edit="setDataEdit"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
    >
    </methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
import { VMoney } from "v-money";
import methodsVue from "src/components/methods.vue";

export default {
  directives: { money: VMoney },
  components: {
    methods: methodsVue,
    VMoney,
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
        masked: true,
      },
      columns: [
        {
          name: "cod_tipo_retencion",
          label: "Codigo",
          field: "cod_tipo_retencion",
          align: "left",
          sortable: true,
        },
        {
          name: "nb_tipo_retencion",
          label: "Descripción",
          field: "nb_tipo_retencion",
          align: "left",
          sortable: true,
        },
        {
          name: "porc_retencion",
          label: "Retención",
          field: "porc_retencion",
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
          name: "pago_mayor",
          label: "Monto",
          field: "pago_mayor",
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
          name: "sustraendo",
          label: "Sustraendo",
          field: "sustraendo",
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
          name: "cod_tipo_persona",
          label: "Tipo de Persona",
          field: "cod_tipo_persona",
          align: "left",
          sortable: true,
        },
        {
          name: "fecha_fin_val",
          label: "Valido Hasta",
          field: "fecha_fin_val",
          align: "left",
          sortable: true,
          format: (val) => val.split("-").reverse().join("/"),
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
        },
      ],
      form: {
        cod_tipo_persona: "",
        cod_tipo_retencion: "",
        nb_tipo_retencion: "",
        porc_base: "",
        porc_retencion: "",
        pago_mayor: "",
        sustraendo: "",
        cod_seniat: "",
        fecha_ini_val: "",
        fecha_fin_val: "",
      },
      tipoPersona: [
        { label: "JURÍDICA", value: "J" },
        { label: "NATURAL", value: "N" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5,
        sortBy: "nb_tipo_retencion",
        descending: false,
        filter:
          "cod_tipo_retencion,nb_tipo_retencion,porc_retencion,pago_mayor,sustraendo,fecha_fin_val",
        filterValue: "",
        rowsNumber: "",
      },
      retenciones: [],
      selected: [],
      rpermisos: [],
    };
  },
  setup() {
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      deletePopup: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Retenciones", "");
    this.getDataTable();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "retenciones",
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

    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(
        `/mretenciones`,
        "setDataTable",
        "retenciones",
        {
          headers: {
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage,
            order_by: this.pagination.sortBy,
            order_direction: this.pagination.descending ? "DESC" : "ASC",
            filter: this.pagination.filter,
            filter_value: this.pagination.filterValue,
          },
        }
      );
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
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].cod_tipo_retencion = res.cod_tipo_retencion;
      this[dataRes].nb_tipo_retencion = res.nb_tipo_retencion;
      this[dataRes].porc_base = res.porc_base;
      this[dataRes].porc_retencion = res.porc_retencion;
      this[dataRes].pago_mayor = res.pago_mayor;
      this[dataRes].sustraendo = res.sustraendo;
      this[dataRes].cod_seniat = res.cod_seniat;
      this[dataRes].cod_tipo_persona = this.filterDesc(
        "tipoPersona",
        res.cod_tipo_persona
      );
      if (res.fecha_ini_val)
        this[dataRes].fecha_ini_val = res.fecha_ini_val
          .split("-")
          .reverse()
          .join("/");
      if (res.fecha_fin_val)
        this[dataRes].fecha_fin_val = res.fecha_fin_val
          .split("-")
          .reverse()
          .join("/");
    },
    // Metodo para Editar o Crear Datos
    sendData() {
      this.form.fecha_ini_val = this.form.fecha_ini_val
        .split("/")
        .reverse()
        .join("-");
      this.form.fecha_fin_val = this.form.fecha_fin_val
        .split("/")
        .reverse()
        .join("-");
      this.form.porc_base = this.form.porc_base
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.porc_retencion = this.form.porc_retencion
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.pago_mayor = this.form.pago_mayor
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.sustraendo = this.form.sustraendo
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.cod_tipo_persona = this.form.cod_tipo_persona.value;

      if (!this.form.id) {
        this.$refs.methods.createData(
          "/mretenciones",
          this.form,
          "getDataTable"
        );
      } else {
        this.$refs.methods.putData(
          `/mretenciones/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
    },
    // Metodo para Resetear Carga
    resetForm() {
      delete this.form.id;
      this.form.cod_tipo_persona = "";
      this.form.cod_tipo_retencion = "";
      this.form.nb_tipo_retencion = "";
      this.form.porc_base = "";
      this.form.porc_retencion = "";
      this.form.pago_mayor = "";
      this.form.cod_seniat = "";
      this.form.sustraendo = "";
      this.form.fecha_ini_val = "";
      this.form.fecha_fin_val = "";
    },
  },
};
</script>

<style>
@media screen and (min-width: 600px) {
  .movilTitle {
    display: none;
    margin-bottom: 15px;
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
  .cardMarginLast {
    padding-right: 20px !important;
  }
}

@media screen and (max-width: 1024px) {
  .buttonMargin {
    margin-bottom: 15px !important;
  }
}

@media screen and (max-width: 600px) {
  .selectMobile {
    margin-bottom: 25px !important;
  }
}
</style>
