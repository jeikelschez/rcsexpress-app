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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMax(val, 2, 'Maximo 2 Caracteres')|| '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, 'Requerido')|| '']"
                  :options="tipo_persona"
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMax(val, 50, 'Maximo 50 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMax(val, 12, 'Maximo 12 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMax(val, 12, 'Maximo 12 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMax(val, 12, 'Maximo 12 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMax(val, 12, 'Maximo 12 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMax(val, 3, 'Maximo 3 Caracteres')|| '']"
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
                  :rules="[(val) => this.$refs.rulesVue.checkDate(val, '') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.checkDate(val, '') || '']"
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
              class="full-width row justify-center items-center content-center"
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
      <div class="row q-pa-md justify-end">
        <div
          class="col-md-4 col-xs-12 text-secondary movilTitle"
          style="align-self: center; text-align: center; font-size: 20px"
        >
          <p><strong>MANTENIMIENTO - RETENCIONES</strong></p>
        </div>
        <div
          class="col-md-5 col-sm-7 col-xs-12 cardMargin selectMobile"
          style="align-self: center"
        >
          <q-input
            v-model="filter"
            rounded
            outlined
            standout
            type="search"
            label="Búsqueda avanzada"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-sm-4 col-xs-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar Retención"
            rounded
            color="primary"
            @click="
              dialog = true;
              this.resetForm();
            "
            :disabled="this.disabledCreate"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="datos"
          binary-state-sort
          :rows-per-page-options="[5, 10, 15, 20, 50]"
          @request="onRequest"
          row-key="id"
          :loading="loading"
          :columns="columns"
          :separator="separator"
          :filter="filter"
          style="width: 100%"
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
                  getData(
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
                          getData(
                            `/mretenciones/${props.row.id}`,
                            'setDataEdit',
                            'form'
                          );
                          dialog = true;
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
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @get-Data-Retenciones="
        getDataRetenciones('/mretenciones', 'setDataTable', 'datos')
      "
      @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit"
      @set-Data-Table="setDataTable"
      @on-Request="onRequest"
    >
    </methods>

    <desactivate-crud ref="desactivateCrud" @desactivar-Crud="desactivarCrud">
    </desactivate-crud>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import rulesVue from "src/components/rules.vue";
import { VMoney } from "v-money";
import methodsVue from "src/components/methods.vue";
import desactivateCrudVue from "src/components/desactivateCrud.vue";

export default {
  directives: { money: VMoney },
  components: {
    "desactivate-crud": desactivateCrudVue,
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
          required: true,
        },
        {
          name: "nb_tipo_retencion",
          label: "Descripción",
          field: "nb_tipo_retencion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "porc_retencion",
          label: "Retención",
          field: "porc_retencion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "pago_mayor",
          label: "Monto",
          field: "pago_mayor",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "sustraendo",
          label: "Sustraendo",
          field: "sustraendo",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tipo_persona_desc",
          label: "Tipo de Persona",
          field: "tipo_persona_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_fin_val",
          label: "Valido Hasta",
          field: "fecha_fin_val",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
          sortable: true,
          required: true,
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
      datos: [],
      count: 1,
      currentPage: 1,
      tipo_persona: [
        { label: "JURÍDICA", value: "J" },
        { label: "NATURAL", value: "N" },
      ],
      selected: [],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
    };
  },
  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const order = ref(false);
    const pagination = ref({
      descending: "",
      page: 1,
      rowsPerPage: 8,
      rowsNumber: "",
    });
    return {
      pagination,
      anulate: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Retenciones", "");
    this.getDataRetenciones("/mretenciones", "onRequest", "datos");
    this.$refs.desactivateCrud.desactivarCrud(
      "c_retenciones",
      "r_retenciones",
      "u_retenciones",
      "d_retenciones",
      "desactivarCrud"
    );
  },
  methods: {
    // Metodo para hacer Get de Datos cuando seleccionas opcion de Tabla
    onRequest(res, dataRes) {
      if (this.count == 1) {
        this.loading = false;
        this[dataRes] = res.data;
        this.pagination.rowsNumber = res.total;
      } else {
        let { page, rowsPerPage, sortBy, descending } = res.pagination;
        if (this.currentPage !== page) {
          descending = "";
        }
        const filter = res.filter;
        const startRow = (page - 1) * rowsPerPage;
        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;

        var headerPage = page;
        var headerOrder_direction = "";
        var headerLimit = fetchCount;
        if (sortBy) {
          var headerOrder_by = sortBy;
        } else {
          var headerOrder_by = "";
        }

        if (descending !== "") {
          this.pagination.descending = !this.pagination.descending;
          if (this.pagination.descending == true) {
            headerOrder_direction = "DESC";
          } else headerOrder_direction = "ASC";
        }

        if (sortBy) this.pagination.sortBy = sortBy;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.getData(`/mretenciones`, "setDataTable", "datos", {
          headers: {
            page: headerPage,
            limit: headerLimit,
            order_direction: headerOrder_direction,
            order_by: headerOrder_by,
          },
        });
      }
      this.count = 0;
    },
    // Metodo para Setear Datos en Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
    },
    // Metodo para Resetear Carga
    resetLoading() {
      this.loading = false;
    },
    // Metodo para Validar Permisos
    desactivarCrud(createItem, readItem, deleteItem, updateItem) {
      if (readItem == true) {
        if (createItem == true) {
          this.disabledCreate = false;
        }
        if (deleteItem == true) {
          this.disabledDelete = false;
        }
        if (updateItem == true) {
          this.disabledEdit = false;
        }
      } else this.$router.push("/error403");
    },

    // METODOS DE PAGINA

    // Metodo para hacer Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para hacer Get de Retenciones
    getDataRetenciones(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          page: 1,
          limit: 8,
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.loading = false;
      this.form.id = res.id;
      this.form.cod_tipo_persona = res.tipo_persona_desc;
      this.form.cod_tipo_retencion = res.cod_tipo_retencion;
      this.form.nb_tipo_retencion = res.nb_tipo_retencion;
      this.form.porc_base = res.porc_base;
      this.form.porc_retencion = res.porc_retencion;
      this.form.pago_mayor = res.pago_mayor;
      this.form.sustraendo = res.sustraendo;
      this.form.cod_seniat = res.cod_seniat;
      if (res.fecha_ini_val)
        this.form.fecha_ini_val = res.fecha_ini_val
          .split("-")
          .reverse()
          .join("/");
      if (res.fecha_fin_val)
        this.form.fecha_fin_val = res.fecha_fin_val
          .split("-")
          .reverse()
          .join("/");
    },
    // Metodo para Eliminar Datos Seleccionados
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/mretenciones/${idpost}`,
        "getDataRetenciones"
      );
      this.loading = true;
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
          "getDataRetenciones"
        );
        this.resetForm();
        this.loading = true;
        this.dialog = false;
      } else {
        this.$refs.methods.putData(
          `/mretenciones/${this.form.id}`,
          this.form,
          "getDataRetenciones"
        );
        this.dialog = false;
        this.resetForm();
        this.loading = true;
      }
    },
    // Metodo para Resetear Carga
    resetForm() {
      delete this.form.id;
      (this.form.cod_tipo_persona = ""),
        (this.form.cod_tipo_retencion = ""),
        (this.form.nb_tipo_retencion = ""),
        (this.form.porc_base = ""),
        (this.form.porc_retencion = ""),
        (this.form.pago_mayor = ""),
        (this.form.cod_seniat = ""),
        (this.form.sustraendo = ""),
        (this.form.fecha_ini_val = ""),
        (this.form.fecha_fin_val = "");
    },
  },
};
</script>

<style>
.hide {
  display: none;
}

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
