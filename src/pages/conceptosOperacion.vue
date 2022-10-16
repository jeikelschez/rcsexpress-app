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
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>
              <div
                class="col-md-12 col-xs-12"
                style="margin-bottom: 7px"
                id="select"
              >
                <q-field
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  hide-bottom-space
                  borderless
                  dense
                  v-model="form.afecta_estado"
                >
                  <template v-slot:control>
                    <q-checkbox
                      size="lg"
                      v-model="form.afecta_estado"
                      true-value="S"
                      false-value="N"
                      style="font-size: 13px"
                      label="¿AFECTA ESTADO DE GANANCIAS Y PERDIDAS?"
                      :disable="this.selectedTipo.codigo == 'DCO' || this.selectedTipo.codigo == 'DGA' ? false : true"
                    />
                  </template>
                </q-field>
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

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="q-pa-md row" style="margin-top: 2px">
          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
            style="align-self: center; text-align: center"
          >
            <p style="font-size: 20px" class="text-secondary">
              <strong>MANTENIMIENTO - CONCEPTOS POR OPERACIÓN</strong>
            </p>
          </div>
          <div
            class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6 cardMargin selectMobile"
            style="align-self: center; text-align: center"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="tipoOperacionSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'tipoOperacionSelected',
                    'tipoOperacion',
                    'descripcion'
                  )
              "
              use-input
              hide-selected
              fill-input
              dense
              input-debounce="0"
              option-label="descripcion"
              option-value="id"
              v-model="selectedTipo"
              outlined
              standout
              label="Tipo de Operación"
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
            class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6"
            style="align-self: center; text-align: center"
          >
            <q-input
              rounded
              outlined
              standout
              dense
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
            class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMarginButton"
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
              class="q-px-xl q-py-xs"
            ></q-btn>
          </div>
        </div>
        <div class="q-pa-md my-card row" bordered flat style="margin-top: 2px">
          <q-table
            :rows="conceptos"
            row-key="id"
            binary-state-sort
            :columns="columns"
            :loading="loading"
            :separator="separator"
            :rows-per-page-options="[5, 10, 15, 20, 50]"
            :filter="filter"
            style="width: 100%"
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
                              `/coperacion/${props.row.id}`,
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
                        <q-item-label> {{ col.value }} </q-item-label>
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
                `/coperacion/${selected}`,
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
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
        },
      ],
      form: {
        desc_concepto: "",
        tipo: "",
        afecta_estado: "N",
      },
      pagination: {
        rowsPerPage: 5,
      },
      tipoOperacion: [],
      conceptos: [],
      selected: [],
      tipoOperacionSelected: [],
      selectedTipo: [],
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
    this.$emit(
      "changeTitle",
      "SCEN - Mantenimiento - Conceptos de Operación",
      ""
    );
    this.$refs.methods.getData("/tipos", "setDataInit", "tipoOperacion");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "conceptosoperacion",
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
      this.selectedTipo = this.tipoOperacion[0];
      this.getDataTable();
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable() {
      this.loading = true;
      this.$refs.methods.getData("/coperacion", "setDataTable", "conceptos", {
        headers: {
          tipo: this.selectedTipo.id,
        },
      });
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Setear Datos seleccionados
    setDataEdit(res, dataRes) {
      this[dataRes].tipo = res.tipos.descripcion;
      this[dataRes].id = res.id;
      this[dataRes].desc_concepto = res.desc_concepto;
      this[dataRes].afecta_estado = res.afecta_estado;
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      this.form.tipo = this.selectedTipo.id;
      if (!this.form.id) {
        this.$refs.methods.createData(`/coperacion`, this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/coperacion/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
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
