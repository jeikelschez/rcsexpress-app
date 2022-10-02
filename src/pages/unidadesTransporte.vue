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
                  v-model="form.placas"
                  label="Placa Vehículo"
                  class="pcform"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="form.placas = form.placas.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="recent_actors" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.chofer"
                  label="Chofer"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 30),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="form.chofer = form.chofer.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="face" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.descripcion"
                  label="Descripción"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                    (val) => this.$refs.rulesVue.isMin(val),
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    form.descripcion = form.descripcion.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
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
      <div class="row q-pa-md justify-end">
        <div
          class="col-xs-12 text-secondary movilTitle"
          style="align-self: center; text-align: center; font-size: 25px"
        >
          <p><strong>MANTENIMIENTO - UNIDADES DE TRANSPORTE</strong></p>
        </div>
        <div
          class="col-md-5 col-sm-6 col-xs-12 marginHeader marginHeaderMobile"
          style="align-self: center"
        >
          <q-input
            v-model="filter"
            rounded
            outlined
            dense
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
          class="col-md-2 col-sm-3 col-xs-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            color="primary"
            @click="dialog = true"
            @click.capture="resetForm()"
            :disabled="this.allowOption(2)"
          ></q-btn>
        </div>
      </div>
      <div class="q-pa-md">
        <q-table
          :rows="unidades"
          binary-state-sort
          row-key="id"
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
                  this.$refs.methods.getData(
                    `/unidades/${props.row.id}`,
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
                            `/unidades/${props.row.id}`,
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
                `/unidades/${selected}`,
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
import methodsVue from "src/components/methods.vue";
import rulesVue from "src/components/rules.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
  },
  data() {
    return {
      columns: [
        {
          name: "placas",
          label: "Numero de Placa",
          field: "placas",
          align: "left",
          sortable: true,
        },
        {
          name: "chofer",
          label: "Chofer",
          field: "chofer",
          align: "left",
          sortable: true,
        },
        {
          name: "descripcion",
          label: "Descripcion de Unidad",
          field: "descripcion",
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
        id: "",
        placas: "",
        chofer: "",
        descripcion: "",
      },
      pagination: {
        rowsPerPage: 5,
      },
      unidades: [],
      selected: [],
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
      "SCEN - Mantenimiento - Unidades de Transporte",
      ""
    );
    this.getDataTable();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "unidadestransporte",
      },
    });
  },
  methods: {
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
    getDataTable() {
      this.loading = true;
      this.$refs.methods.getData("/unidades", "setDataTable", "unidades");
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.form.id = res.id;
      this.form.descripcion = res.descripcion;
      this.form.placas = res.placas;
      this.form.chofer = res.chofer;
    },
    // Metodo para Crear y Editar Datos
    sendData() {
      if (!this.form.id) {
        this.$refs.methods.createData("/unidades", this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/unidades/${this.form.id}`,
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
      this.form.chofer = "";
      this.form.descripcion = "";
      this.form.placas = "";
      this.create = false;
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
  .marginHeader {
    padding-right: 20px;
  }
}

@media screen and (min-width: 1024px) {
  .marginHeaderFilter {
    padding-right: 20px;
  }
}

@media screen and (max-width: 600px) {
  .marginHeaderMobile {
    margin-bottom: 25px;
  }
}

@media screen and (max-width: 600px) {
  .paddingMobile {
    padding-left: 2px;
    padding-right: 2px;
  }
}
</style>
