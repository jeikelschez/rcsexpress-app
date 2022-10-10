<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha"
                  hint=""
                  v-model="form.fecha"
                  lazy-rules
                  :readonly="fechaNoEditable"
                  class="pcform"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) =>
                      this.$refs.rulesVue.checkDate(val, 'Fecha Invalida'),
                    (val) => this.dateDuplicate(val),
                  ]"
                  mask="##/##/####"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.fecha"
                          mask="DD/MM/YYYY"
                          @update:model-value="this.$refs.qDateProxy.hide()"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.valor"
                  v-money="money"
                  label="Valor"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) =>
                      this.$refs.rulesVue.isMax(val, 22, 'Cantidad Maxima'),
                  ]"
                  hint=""
                  class="pcform"
                  lazy-rules
                >
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
          <strong>MANTENIMIENTO - HISTORICO DEL DOLAR</strong>
        </p>
      </div>

      <div
        class="q-pa-md row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 justify-end"
      >
        <div
          class="col-md-7 col-xl-7 col-lg-7 col-xs-12 col-sm-12 cardMarginFilter selectMovil"
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
          :rows="historico"
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
                    `/hdolar/${props.row.fecha}`,
                    `setDataEdit`,
                    'form'
                  );
                  fechaNoEditable = true;
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
                @click="selected = props.row.fecha"
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
                            `/hdolar/${props.row.fecha}`,
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
                      <q-item-label v-if="col.name != 'estatus_lote'">
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
                `/hdolar/${selected}`,
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
      @get-Data-Table-All="getDataTableAll"
      @set-Data-Table="setDataTable"
      @set-Data-Table-All="setDataTableAll"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { VMoney } from "v-money";
import moment from "moment";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  directives: { money: VMoney },
  components: { methods: methodsVue, rulesVue, VMoney },
  data() {
    return {
      columns: [
        {
          name: "fecha",
          label: "Fecha",
          field: "fecha",
          align: "left",
          sortable: true,
        },
        {
          name: "valor",
          label: "Valor Dolar",
          field: "valor",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
        },
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: true,
      },
      form: {
        valor: "",
        fecha: "",
      },
      pagination: {
        page: 1,
        rowsPerPage: 5,
        sortBy: "fecha",
        descending: true,
        filter: "fecha,valor",
        filterValue: "",
        rowsNumber: "",
      },
      historico: [],
      fechaNoEditable: false,
      historicoAll: [],
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
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Historico Del Dolar", "");
    this.getDataTable();
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
    dateDuplicate(val) {
      if (!this.fechaNoEditable) {
        var fecha = val;
        fecha = fecha.split("/").reverse().join("-");
        var find = this.historicoAll.findIndex((item) => item.fecha == fecha);
        return find >= 0 ? "Esta Fecha ya esta Registrada!" : true;
      }
    },

    // METODOS PARA PAGINA

    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      this.getDataTableAll();
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/hDolar`, "setDataTable", "historico", {
        headers: {
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          order_by: this.pagination.sortBy,
          order_direction: this.pagination.descending ? "DESC" : "ASC",
          filter: this.pagination.filter,
          filter_value: this.pagination.filterValue,
        },
      });
    },
    // Metodo para Extraer Todos los Datos de Tabla
    getDataTableAll() {
      this.loading = true;
      this.$refs.methods.getData("/hdolar", "setDataTableAll", "historicoAll");
    },
    // Metodo para Setear Todos los Datos de Tabla
    setDataTableAll(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
    },
    // Metodos para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].fecha = res.fecha.split("-").reverse().join("/");
      this[dataRes].valor = res.valor;
    },
    // Metodos para Crear y Editar Datos
    sendData() {
      var form = JSON.parse(JSON.stringify(this.form));
      form.fecha = form.fecha.split("/").reverse().join("-");
      form.valor = form.valor.replaceAll(".", "").replaceAll(",", ".");
      if (this.dateDuplicate(form.fecha) === true) {
        this.$refs.methods.createData("/hdolar", form, "getDataTable")
      } else {
        this.$refs.methods.putData(`/hdolar/${form.fecha}`, form, "getDataTable")
      }
      this.resetForm();
    },

    // Metodos para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.dialog = false;
      this.fechaNoEditable = false;
      this.form.valor = "";
      this.form.fecha = "";
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
