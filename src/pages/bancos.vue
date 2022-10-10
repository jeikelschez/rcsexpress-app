<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 70vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_banco"
                  label="Nombre"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                  ]"
                  @update:model-value="
                    form.nb_banco = form.nb_banco.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.direccion_banco"
                  label="Direccion"
                  hint=""
                  :rules="[
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                  ]"
                  lazy-rules
                  @update:model-value="
                    form.direccion_banco = form.direccion_banco.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.fax_banco"
                  label="Fax"
                  class="pcform"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                    (val) => this.$refs.rulesVue.isMax(val, 25),
                  ]"
                  hint=""
                  lazy-rules
                  mask="(####) ### - ####"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_banco"
                  label="Teléfono"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                    (val) => this.$refs.rulesVue.isMax(val, 25),
                  ]"
                  hint=""
                  lazy-rules
                  mask="(####) ### - ####"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="form.cod_postal"
                  label="Código Postal"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMin(val, 1),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                  ]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  mask="##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="dialpad" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="form.email_banco"
                  label="Correo Electrónico"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                  ]"
                  hint=""
                  type="email"
                  lazy-rules
                  @update:model-value="
                    form.email_banco = form.email_banco.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
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
      <div class="row q-pa-md justify-end">
        <div
          class="col-md-4 col-xs-12 text-secondary movilTitle"
          style="align-self: center; text-align: center; font-size: 25px"
        >
          <p><strong>MANTENIMIENTO - BANCOS</strong></p>
        </div>
        <div
          class="col-md-6 col-sm-7 col-xs-12 cardMargin selectMobile"
          style="text-align: center; align-self: center"
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
          class="col-md-2 col-sm-4 col-xs-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            size="13px"
            color="primary"
            @click="
              dialog = true;
              this.resetForm();
            "
            :disabled="this.allowOption(2)"
          ></q-btn>
        </div>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="bancos"
          :loading="loading"
          binary-state-sort
          row-key="id"
          :columns="columns"
          :rows-per-page-options="[5, 10, 15, 20, 50]"
          :separator="separator"
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
                    `/bancos/${props.row.id}`,
                    'setDataTable',
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
                            `/bancos/${props.row.id}`,
                            'setDataTable',
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
                `/bancos/${selected}`,
                'getDataTable'
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
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
  components: {
    methods: methodsVue,
    rulesVue,
  },
  data() {
    return {
      columns: [
        {
          name: "nb_banco",
          label: "Nombre",
          field: "nb_banco",
          align: "left",
          sortable: true,
        },
        {
          name: "tlf_banco",
          label: "Teléfono",
          field: "tlf_banco",
          align: "left",
          sortable: true,
        },
        {
          name: "fax_banco",
          label: "Fax",
          field: "fax_banco",
          align: "left",
          sortable: true,
        },
        {
          name: "cod_postal",
          label: "Código postal",
          field: "cod_postal",
          align: "left",
          sortable: true,
        },
        {
          name: "email_banco",
          label: "Correo electrónico",
          field: "email_banco",
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
        nb_banco: "",
        direccion_banco: "",
        tlf_banco: "",
        fax_banco: "",
        cod_postal: "",
        email_banco: "",
      },
      pagination: {
        rowsPerPage: 5,
      },
      bancos: [],
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
    this.$emit("changeTitle", "SCEN - Mantenimiento - Bancos", "");
    this.getDataTable();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "bancos",
      },
    });
  },
  methods: {
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

    // METODOS DE PAGINAS

    // Metodo para Extraer Datos de Tabla
    getDataTable() {
      this.loading = true;
      this.$refs.methods.getData("/bancos", "setDataTable", "bancos");
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      if (!this.form.id) {
        this.$refs.methods.createData("/bancos", this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/bancos/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
    },
    // Metodo para Resetear Formulario
    resetForm() {
      delete this.form.id;
      this.form.nb_banco = null;
      this.form.direccion_banco = null;
      this.form.tlf_banco = null;
      this.form.fax_banco = null;
      this.form.cod_postal = null;
      this.form.email_banco = null;
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

@media screen and (max-width: 600px) {
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
