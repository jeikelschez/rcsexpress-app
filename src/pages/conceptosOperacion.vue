<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
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
                class="col-md-12 col-xs-12 displayHide"
                style="margin-bottom: 7px"
                id="select"
              >
                <q-field
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  hide-bottom-space
                  borderless
                  dense
                  v-model="form.afecta_estado"
                  :disable="disable"
                >
                  <template v-slot:control>
                    <q-checkbox
                      size="lg"
                      v-model="form.afecta_estado"
                      true-value="S"
                      false-value="N"
                      style="font-size: 13px"
                      label="¿AFECTA ESTADO DE GANANCIAS Y PERDIDAS?"
                      :disable="disable"
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
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 30px">
            <strong>CONCEPTOS POR OPERACIÓN</strong>
          </p>
        </div>

        <div
          class="col-md-5 col-xs-12 col-sm-6 cardMargin selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="tipoDeOperacionSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'tipoDeOperacionSelected',
                  'tipoDeOperacion',
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
            label="Tipo de Operación"
            @update:model-value="getData(`/coperacion`, 'setData', 'datos')"
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
          class="col-md-5 col-xs-12 col-sm-6 cardMarginLast selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-input
            rounded
            outlined
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
              resetForm();
            "
            size="16px"
            class="q-px-xl q-py-xs insertarestadosmovil"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md">
        <div class="q-gutter-y-md">
          <div bordered flat class="my-card row">
            <q-table
              :rows="datos"
              row-key="id"
              binary-state-sort
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
                        `/coperacion/${props.row.id}`,
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
                    @click.capture="conceptosDelete = true"
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
                                `/coperacion/${props.row.id}`,
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
                            @click.capture="conceptosDelete = true"
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
      </div>
    </div>

    <q-dialog v-model="conceptosDelete">
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
      @get-Data="getData(`/coperacion`, 'setData', 'datos')"
      @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit"
      @set-Data="setData"
      @set-Data-Tipos="setDataTipos"
      @set-Data-Permisos="setDataPermisos"
    >
    </methods>

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
          label: "Concepto",
          field: "desc_concepto",
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
        tipo: "",
        afecta_estado: "N",
      },
      tipoDeOperacion: [],
      datos: [],
      selected: [],
      tipoDeOperacionSelected: [],
      selectedTipo: [],
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
    });
    return {
      pagination: ref({
        rowsPerPage: 5,
      }),
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      disable: ref(true),
      disableEdit: ref(true),
      conceptosDelete: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Mantenimiento - Conceptos de Operación",
      ""
    );
    this.selectedTipo.id = "1";
    this.getData("/tipos", "setDataTipos", "tipoDeOperacion");
    this.getData("/coperacion", "setData", "datos");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "conceptosoperacion",
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
          tipo: this.selectedTipo.id,
          fuente: "OP",
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodos para Setear Tipos
    setDataTipos(res, dataRes) {
      this[dataRes] = res;
      this.selectedTipo = res[0];
    },
    // Metodo para Setear Datos seleccionados
    setDataEdit(res, dataRes) {
      this[dataRes].tipo = res.tipos.descripcion;
      this[dataRes].id = res.id;
      this[dataRes].desc_concepto = res.desc_concepto;
      this[dataRes].afecta_estado = res.afecta_estado;
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/coperacion/${idpost}`,
        "getData",
        this.axiosConfig
      );
      this.loading = true;
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      this.form.tipo = this.selectedTipo.id;
      if (!this.form.id) {
        this.$refs.methods.createData(`/coperacion`, this.form, "getData");
        this.resetForm();
        this.loading = true;
        this.dialog = false;
      } else {
        this.$refs.methods.putData(
          `/coperacion/${this.form.id}`,
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
      delete this.form.id;
      this.form.desc_concepto = "";
      this.form.afecta_estado = "N";
      this.form.tipo = "";
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
  .selectMobile {
    margin-bottom: 15px !important;
  }
}
</style>
