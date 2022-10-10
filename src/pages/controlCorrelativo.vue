<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
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
                    (val) => this.reglasSegundoCorrelativo(val),
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
            <div
              class=" row justify-center items-center content-center"
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
      <div
        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
      >
        <p
          style="
            font-size: 25px;
            align-self: center;
            text-align: center;
            margin-top: 18px;
          "
        >
          <strong>MANTENIMIENTO - CONTROL CORRELATIVO</strong>
        </p>
      </div>
      <div
        class="q-pa-md row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 cardMarginFilter cardMarginSm selectMovil"
        >
          <q-select
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            option-label="nb_agencia"
            option-value="id"
            dense
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
            v-model="selectedAgencia"
            outlined
            standout
            label="Escoge una Agencia"
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
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 cardMarginFilter selectMovil"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="tiposSelected"
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
            option-label="descripcion"
            option-value="id"
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
          class="col-md-4 col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMarginFilter selectMovil"
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
          class="col-md-2 col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            color="primary"
            :disabled="this.allowOption(2)"
            @click="dialog = true"
            @click.capture="resetForm"
            class="q-px-xl q-py-xs"
          ></q-btn>
        </div>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="correlativos"
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
          <template v-slot:body-cell-estatus_lote="props">
            <q-td :props="props">
              <q-select
                outlined
                dense
                v-model="props.row.estatus_desc"
                :options="estatus"
                @update:model-value="
                  this.$refs.methods.getData(
                    `/correlativo/${props.row.id}`,
                    `putDataSelect`,
                    'form'
                  );
                  this.form.estatus_lote = props.row.estatus_desc.value;
                "
              >
              </q-select>
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
                    `/correlativo/${props.row.id}`,
                    `setDataEdit`,
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
                      <q-select
                        v-if="col.name === 'estatus_lote'"
                        outlined
                        dense
                        v-model="props.row.estatus_desc"
                        :options="estatus"
                        @update:model-value="
                          this.$refs.methods.getData(
                            `/correlativo/${props.row.id}`,
                            `putDataSelect`,
                            'form'
                          );
                          this.form.estatus_lote = props.row.estatus_desc.value;
                        "
                      >
                      </q-select>
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
      @set-Data-Init="setDataInit"
      @set-Data-Edit="setDataEdit"
      @get-Data-Table="getDataTable"
      @set-Data-Table-All="setDataTableAll"
      @get-Data-Table-All="getDataTableAll"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
      @put-Data-Select="putDataSelect"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue, rulesVue },
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
          label: "Ultimo Correlativo",
          field: "control_final",
          align: "left",
          sortable: true,
        },
        {
          name: "serie_doc",
          label: "Serie Lote",
          field: "serie_doc",
          align: "left",
          sortable: true,
        },
        {
          name: "ult_doc_referencia",
          label: "Ultimo Numero Asignado",
          field: "ult_doc_referencia",
          align: "left",
          type: "string",
          sortable: true,
        },
        {
          name: "estatus_lote",
          label: "Estatus",
          align: "center",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
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
      estatus: [
        { label: "CERRADO", value: "C" },
        { label: "ACTIVO", value: "A" },
        { label: "INACTIVO", value: "I" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5,
        sortBy: "control_final",
        descending: true,
        filter:
          "control_inicio,control_final,serie_doc,ult_doc_referencia,estatus_lote",
        filterValue: "",
        rowsNumber: "",
      },
      correlativos: [],
      correlativosAll: [],
      agencias: [],
      tipos: [],
      selectedAgencia: [],
      selectedTipo: [],
      agenciasSelected: [],
      tiposSelected: [],
      rpermisos: [],
      filter: "",
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      deletePopup: ref(false),
      activoExistente() {
        $q.notify({
          message: "Solo puede haber un Activo por Agencia",
          color: "red",
        });
      },
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Control Correlativo", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "controlcorrelativo",
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
    // Reglas de Correlativos
    reglasSegundoCorrelativo(val) {
      if (val - this.form.control_inicio < 0)
        return "El Ultimo Correlativo debe ser Mayor al Primero";
    },
    // Metodo para validar el lote
    validaLote() {
      if (
        this.form.estatus_lote === "A" &&
        this.correlativosAll.findIndex((item) => item.estatus_lote == "A") >= 0
      ) {
        return true;
      }
      return false;
    },

    // METODOS PARA PAGINA

    // Metodos para Setear Datos al Iniciar
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      api
        .get(`/tipos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            fuente: "CR",
          },
        })
        .then((res) => {
          this.tipos = res.data;
          this.selectedTipo = this.tipos[0];
          this.getDataTable();
        });
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      this.getDataTableAll();
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(
        `/correlativo`,
        "setDataTable",
        "correlativos",
        {
          headers: {
            agencia: this.selectedAgencia.id,
            tipo: this.selectedTipo.id,
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
    },
    // Metodo para Extraer Todos los Datos de Tabla
    getDataTableAll() {
      this.loading = true;
      this.$refs.methods.getData(
        "/correlativo",
        "setDataTableAll",
        "correlativosAll",
        {
          headers: {
            agencia: this.selectedAgencia.id,
            tipo: this.selectedTipo.id,
          },
        }
      );
    },
    // Metodo para Setear Todos los Datos de Tabla
    setDataTableAll(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
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
    // Metodos para Crear y Editar Datos
    sendData() {
      this.form.cod_agencia = this.selectedAgencia.id;
      this.form.tipo = this.selectedTipo.id;
      if (!this.form.id) {
        this.form.estatus_lote = "I";
        this.$refs.methods.createData(
          "/correlativo",
          this.form,
          "getDataTable"
        );
      } else {
        this.form.estatus_lote = this.form.estatus_lote.value;
        this.$refs.methods.putData(
          `/correlativo/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
    },
    // Metodos para hacer Edit con Select en Tabla
    putDataSelect(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].tipo = res.tipo;
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].ult_doc_referencia = res.ult_doc_referencia;
      this[dataRes].serie_doc = res.serie_doc;
      this[dataRes].cod_agencia = res.cod_agencia;

      // Valida que no se repita el lote Activo
      if (this.validaLote()) {
        this.activoExistente();
        this.getDataTable();
        return;
      }

      this.$refs.methods.putData(
        `/correlativo/${this.form.id}`,
        this.form,
        "getDataTable"
      );
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

@media screen and (min-width: 600px) {
  .cardMarginSm {
    padding-right: 20px !important;
  }
}

@media screen and (max-width: 1024px) {
  .buttonMargin {
    margin-bottom: 15px !important;
  }
}

@media screen and (max-width: 1024px) {
  .selectMovil {
    margin-bottom: 15px !important;
  }
}
</style>
