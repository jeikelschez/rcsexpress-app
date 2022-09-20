<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 90vw">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.desc_concepto"
                  label="Descripcion de Concepto"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    form.desc_concepto = form.desc_concepto.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        100,
                        'Maximo 100 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>

              <div
                class="col-md-6 col-xs-6"
                style="margin-bottom: 7px"
                id="select"
              >
                <q-field
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido') || '',
                  ]"
                  hide-bottom-space
                  borderless
                  dense
                  class="pcform"
                  v-model="form.check_comision"
                >
                  <template v-slot:control>
                    <q-checkbox
                      size="lg"
                      v-model="form.check_comision"
                      true-value="1"
                      false-value="0"
                      style="font-size: 13px"
                      label="¿GENERA COMISIÓN?"
                    />
                  </template>
                </q-field>
              </div>

              <div
                class="col-md-6 col-xs-6"
                style="margin-bottom: 7px"
                id="select"
              >
                <q-field
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido') || '',
                  ]"
                  hide-bottom-space
                  borderless
                  dense
                  v-model="form.check_impuesto"
                >
                  <template v-slot:control>
                    <q-checkbox
                      size="lg"
                      v-model="form.check_impuesto"
                      true-value="1"
                      false-value="0"
                      style="font-size: 13px"
                      label="¿INFLUYE EN IMPUESTO?"
                    />
                  </template>
                </q-field>
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
      <div class="row q-pa-md">
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 text-secondary movilTitle"
          style="align-self: center; text-align: center; margin-bottom: 20px"
        >
          <p style="font-size: 26px">
            <strong>CONCEPTOS DE FACTURACIÓN</strong>
          </p>
        </div>

        <div
          class="col-md-5 col-xs-12 col-sm-6 cardMargin selectMovil"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="conceptosSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'conceptosSelected',
                  'conceptos',
                  'desc_concepto'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="desc_concepto"
            option-value="id"
            v-model="selectedConcepto"
            outlined
            standout
            label="Escoge un Concepto"
            @update:model-value="getData(`/cfacturacion`, 'setData', 'datos')"
          >
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
            standout
            v-model="filter"
            dense
            type="search"
            label="Búsqueda avanzada"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            color="primary"
            :disabled="this.allowOption(2)"
            @click="
              dialog = true;
              this.resetForm();
            "
            size="16px"
            class="q-px-xl q-py-xs insertarestadosmovil"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md" style="margin-top: 5px">
        <q-table
          :rows="datos"
          row-key="id"
          :columns="columns"
          :loading="loading"
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
                :disabled="this.allowOption(3)"
                @click="
                  getData(
                    `/cfacturacion/${props.row.id}`,
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
                @click.capture="deleteForm = true"
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
                        :disabled="this.allowOption(3)"
                        @click="
                          getData(
                            `/cfacturacion/${props.row.id}`,
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
                        :disabled="this.allowOption(4)"
                        @click="selected = props.row.id"
                        @click.capture="deleteForm = true"
                      ></q-btn>
                      <q-item-label
                        v-else
                        caption
                        :class="col.classes ? col.classes : ''"
                        >{{ col.value }}
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

    <q-dialog v-model="deleteForm">
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
      @get-Data="getData(`/cfacturacion`, 'setData', 'datos')"
      @set-Data-Init="setDataInit"
      @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit"
      @set-Data="setData"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue, rulesVue },
  data() {
    return {
      columns: [
        {
          name: "desc_concepto",
          label: "Nombre",
          field: "desc_concepto",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "check_comision",
          label: "Genera Comision",
          field: "check_comision",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "check_impuesto",
          label: "Influye en el Impuesto",
          field: "check_impuesto",
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
        desc_concepto: "",
        check_comision: "0",
        check_impuesto: "0",
        cod_concepto: "",
      },
      conceptos: [],
      datos: [],
      selected: [],
      conceptosSelected: [],
      selectedConcepto: [],
      rpermisos: [],
      error: "",
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      control: 0,
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    });
    return {
      pagination: ref({
        rowsPerPage: 5,
      }),
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      deleteForm: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Mantenimiento - Conceptos de Facturacion",
      ""
    );
    this.$refs.methods.getData("/coperacion", "setDataInit", "conceptos");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "conceptosfacturacion",
      },
    });
  },

  methods: {
    // Metodo para Filtrar Selects
    filterArray(val, update, abort, pagina, array, element) {
      if (val === "") {
        update(() => {
          this[pagina] = this[array];
        });
        return;
      }
      update(() => {
        const needle = val.toUpperCase();
        var notEqual = JSON.parse(JSON.stringify(this[array]));
        for (var i = 0, len = this[array].length; i < len; i++) {
          if (!(this[array][i][element].indexOf(needle) > -1)) {
            delete notEqual[i];
          }
          if (i == this[array].length - 1) {
            this[pagina] = notEqual;
            break;
          }
        }
      });
    },
    // Metodo para Resetear Carga
    resetLoading() {
      this.loading = false;
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

    // Metodo para hacer Get de Datos
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          cod_concepto: this.selectedConcepto.id,
          tipo: "8",
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Datos al Iniciar
    setDataInit(res, dataRes) {
      this[dataRes] = res;
      for (var e = 0, len = this.datos.length; e < len; e++) {
        if (this.datos[e].check_comision === "1") {
          this.datos[e].check_comision = "✓";
        }
        if (this.datos[e].check_comision === "0") {
          this.datos[e].check_comision = "";
        }
        if (this.datos[e].check_impuesto === "1") {
          this.datos[e].check_impuesto = "✓";
        }
        if (this.datos[e].check_impuesto === "0") {
          this.datos[e].check_impuesto = "";
        }
        if (e == this.datos.length - 1) break;
      }
      this.selectedConcepto = this.conceptos[0];
      this.getData("/cfacturacion", "setData", "datos");
      this.loading = false;
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
      for (var e = 0, len = this.datos.length; e < len; e++) {
        if (this.datos[e].check_comision === "1") {
          this.datos[e].check_comision = "✓";
        }
        if (this.datos[e].check_comision === "0") {
          this.datos[e].check_comision = "";
        }
        if (this.datos[e].check_impuesto === "1") {
          this.datos[e].check_impuesto = "✓";
        }
        if (this.datos[e].check_impuesto === "0") {
          this.datos[e].check_impuesto = "";
        }
        if (e == this.datos.length - 1) break;
      }
    },
    // Metodo para Setear Datos seleccionados
    setDataEdit(res, dataRes) {
      this.loading = false;
      this[dataRes].id = res.id;
      this[dataRes].desc_concepto = res.desc_concepto;
      this[dataRes].check_comision = res.check_comision;
      this[dataRes].check_impuesto = res.check_impuesto;
      this[dataRes].cod_concepto = res.conceptos;
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/cfacturacion/${idpost}`, "getData");
      this.loading = true;
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      this.form.cod_concepto = this.selectedConcepto.id;
      if (!this.form.id) {
        this.$refs.methods.createData(`/cfacturacion`, this.form, "getData");
        this.resetForm();
        this.loading = true;
        this.dialog = false;
      } else {
        this.$refs.methods.putData(
          `/cfacturacion/${this.form.id}`,
          this.form,
          "getData"
        );
        this.resetForm();
        this.loading = true;
        this.dialog = false;
      }
    },
    // Metodos para Resetear Datos
    resetForm() {
      delete this.form.id, (this.form.desc_concepto = "");
      this.form.check_comision = "0";
      this.form.check_impuesto = "0";
      this.form.cod_concepto = "";
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
    margin-bottom: 10px !important;
  }
}
</style>
