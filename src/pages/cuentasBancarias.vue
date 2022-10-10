<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nro_cuenta"
                  label="Numero de Cuenta"
                  hint=""
                  @update:model-value="
                    form.nro_cuenta = form.nro_cuenta.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 25),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="form.flag_activa"
                  label="Estatus"
                  hint=""
                  class="pcform"
                  :options="estatus"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="rule" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_cuenta"
                  label="Tipo de Cuenta"
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  :options="tipoCuenta"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="ballot" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.firma_autorizada"
                  label="Firma Autorizada"
                  hint=""
                  @update:model-value="
                    form.firma_autorizada = form.firma_autorizada.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="border_color" />
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

    <div
      class="q-pa-sm justify-center col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
    >
      <div class="row q-pa-md">
        <div
          class="col-xs-12 text-secondary movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 26px; margin-bottom: 20px">
            <strong>MANTENIMIENTO - CUENTAS BANCARIAS</strong>
          </p>
        </div>
        <div
          class="col-md-5 col-xs-12 col-sm-6 cardMargin selectMovil"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            dense
            :options="bancosSelected"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'bancosSelected',
                  'bancos',
                  'nb_banco'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="nb_banco"
            option-value="id"
            v-model="selectedBanco"
            outlined
            standout
            label="Escoge un Banco"
            @update:model-value="
              getDataTable(`/cuentas`, 'setDataTable', 'cuentas')
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
          class="col-md-5 col-xs-12 col-sm-6 cardMarginLast selectMovil"
          style="align-self: center; text-align: center"
        >
          <q-input
            rounded
            outlined
            dense
            standout
            v-model="filter"
            type="search"
            label="Búsqueda avanzada"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xs-12 col-sm-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            dense
            color="primary"
            :disabled="this.allowOption(2)"
            @click="dialog = true"
            @click.capture="resetForm()"
            size="16px"
            class="q-px-xl q-py-xs"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="cuentas"
          row-key="id"
          binary-state-sort
          :columns="columns"
          :separator="separator"
          :filter="filter"
          :loading="loading"
          :rows-per-page-options="[5, 10, 15, 20, 50]"
          style="width: 100%"
          :grid="$q.screen.xs"
          v-model:pagination="pagination"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" class="loading" />
          </template>
          <template v-slot:body-cell-tipo_cuenta="props">
            <q-td :props="props">
              {{ filterDesc("tipoCuenta", props.row.tipo_cuenta) }}
            </q-td>
          </template>
          <template v-slot:body-cell-flag_activa="props">
            <q-td :props="props">
              {{ filterDesc("estatus", props.row.flag_activa) }}
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
                    `/cuentas/${props.row.id}`,
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
                    <q-item-section side>
                      <q-item-label v-if="col.name === 'tipo_cuenta'">
                        {{ filterDesc("tipoCuenta", props.row.tipo_cuenta) }}
                      </q-item-label>
                      <q-item-label v-if="col.name === 'flag_activa'">
                        {{ filterDesc("estatus", props.row.flag_activa) }}
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
                            `/cuentas/${props.row.id}`,
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
                      <q-item-label v-if="col.name != 'tipo_cuenta' && col.name != 'flag_activa'"> {{ col.value }} </q-item-label>
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
              this.$refs.methods.deleteData(`/cuentas/${selected}`, 'getDataTable')
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
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue, rulesVue },
  data() {
    return {
      columns: [
        {
          name: "nro_cuenta",
          label: "Numero de Cuenta",
          field: "nro_cuenta",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_cuenta",
          label: "Tipo de Cuenta",
          field: "tipo_cuenta",
          align: "left",
          sortable: true,
        },
        {
          name: "flag_activa",
          label: "Estatus",
          field: "flag_activa",
          align: "left",
          sortable: true,
        },
        {
          name: "firma_autorizada",
          label: "Firma Autorizada",
          field: "firma_autorizada",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
        },
      ],
      form: {
        nro_cuenta: "",
        flag_activa: "",
        tipo_cuenta: "",
        firma_autorizada: "",
        cod_banco: [],
      },
      estatus: [
        { label: "ACTIVA", value: "A" },
        { label: "INACTIVA", value: "I" },
      ],
      tipoCuenta: [
        { label: "AHORRO", value: "A" },
        { label: "CORRIENTE", value: "C" },
      ],
      pagination: {
        rowsPerPage: 5,
      },
      bancos: [],
      cuentas: [],
      bancosSelected: [],
      selected: [],
      selectedBanco: [],
      rpermisos: [],
      filter: "",
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
    this.$emit("changeTitle", "SCEN - Mantenimiento - Cuentas Bancarias", "");
    this.$refs.methods.getData("/bancos", "setDataInit", "bancos");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "cuentasbancarias",
      },
    });
  },
  methods: {
    // Metodo para Filtrar Selects
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

    // Metodo para Setear Datos al Iniciar
    setDataInit(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.selectedBanco = this.bancos[0];
      this.getDataTable();
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable() {
      this.loading = true;
      this.$refs.methods.getData("/cuentas", "setDataTable", "cuentas", {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          banco: this.selectedBanco.id,
        },
      });
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nro_cuenta = res.nro_cuenta;
      this[dataRes].flag_activa = this.filterDesc("estatus", res.flag_activa);
      this[dataRes].tipo_cuenta = this.filterDesc("tipoCuenta", res.tipo_cuenta);
      this[dataRes].firma_autorizada = res.firma_autorizada;
      this[dataRes].cod_banco = res.cod_banco;
    },
    // Metodo para Crear o Editar Datos
    sendData() {
      this.form.cod_banco = this.selectedBanco.id;
      this.form.flag_activa = this.form.flag_activa.value;
      this.form.tipo_cuenta = this.form.tipo_cuenta.value;
      if (!this.form.id) {
        this.$refs.methods.createData(`/cuentas`, this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/cuentas/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.nro_cuenta = "";
      this.form.flag_activa = "";
      this.form.tipo_cuenta = "";
      this.form.firma_autorizada = "";
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
  .cardMarginLast {
    padding-right: 20px !important;
  }
}

@media screen and (min-width: 1024px) {
  .cardMarginFilter {
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
