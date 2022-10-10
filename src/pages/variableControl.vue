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
                  v-model="form.nombre"
                  label="Descripción de Variable"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                  ]"
                  @update:model-value="form.nombre = form.nombre.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.valor"
                  label="Valor de Variable"
                  input-class="text-right"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                  ]"
                  @update:model-value="form.valor = form.valor.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo"
                  label="Tipo de Variable"
                  hint=""
                  :options="tipos"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                >
                  <template v-slot:prepend>
                    <q-icon name="done_all" />
                  </template>
                </q-select>
              </div>
            </div>
            <div
              class="full-width row justify-center items-center content-center"
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

    <div class="justify-center" style="margin-top: 7px">
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary justify-end"
      >
        <div
          class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 movilTitle"
        >
          <p
            style="
              font-size: 25px;
              align-self: center;
              text-align: center;
              margin-top: 15px;
            "
          >
            <strong>MANTENIMIENTO - VARIABLE CONTROL</strong>
          </p>
        </div>
        <div
          class="col-md-6 col-sm-7 col-xs-12 cardMargin selectMobile"
          style="align-self: center; align-self: center"
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
          class="col-md-2 col-xl-3 col-xs-12 col-sm-4"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            dense
            style="text-align: center; align-self: center"
            color="primary"
            :disabled="this.allowOption(2)"
            @click="
              dialog = true;
              this.resetForm();
            "
            size="16px"
            class="q-px-xl q-py-xs"
          ></q-btn>
        </div>
      </div>
      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="variables"
          row-key="id"
          binary-state-sort
          :columns="columns"
          :separator="separator"
          :rows-per-page-options="[5, 10, 15, 20, 50]"
          :loading="loading"
          :filter="filter"
          style="width: 100%"
          :grid="$q.screen.xs"
          v-model:pagination="pagination"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" class="loading" />
          </template>
          <template v-slot:body-cell-tipo="props">
            <q-td :props="props">
              <q-select
                outlined
                dense
                v-model="props.row.tipo_desc"
                :options="tipos"
                @update:model-value="
                  this.$refs.methods.getData(
                    `/vcontrol/${props.row.id}`,
                    `putDataSelect`,
                    'form'
                  );
                  this.form.tipo = props.row.tipo_desc.value;
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
                    `/vcontrol/${props.row.id}`,
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
                            `/vcontrol/${props.row.id}`,
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
                        v-if="col.name === 'tipo'"
                        outlined
                        dense
                        v-model="props.row.tipo_desc"
                        :options="tipos"
                        @update:model-value="
                          this.$refs.methods.getData(
                            `/vcontrol/${props.row.id}`,
                            `putDataSelect`,
                            'form'
                          );
                          this.form.tipo = props.row.tipo_desc.value;
                        "
                      >
                      </q-select>
                      <q-item-label v-if="col.name != 'tipo'"> {{ col.value }} </q-item-label>
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
                `/vcontrol/${selected}`,
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
      @put-Data-Select="putDataSelect"
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
  components: {
    methods: methodsVue,
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
          name: "nombre",
          label: "Descripción de la Variable",
          field: "nombre",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo",
          label: "Tipo de Variable",
          field: "tipo",
          align: "left",
        },
        {
          name: "valor",
          label: "Valor de la Variable",
          field: "valor",
          align: "left",
          type: "string",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
        },
      ],
      form: {
        nombre: "",
        tipo: "",
        valor: "",
      },
      tipos: [
        { label: "STRING", value: "1" },
        { label: "ENTERO", value: "2" },
        { label: "DECIMAL", value: "3" },
        { label: "FECHA", value: "4" },
        { label: "ENTERO LARGO", value: "5" },
      ],
      pagination: {
        rowsPerPage: 5,
      },
      variables: [],
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
    this.$emit("changeTitle", "SCEN - Mantenimiento - Variable Control", "");
    this.getDataTable();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "variablecontrol",
      },
    });
  },
  methods: {
    // Metodo para traer el Label de los Selects y Columns
    filterDesc(array, value) {
      var find = this[array].findIndex((item) => item.value == value);
      return find >= 0 ? this[array][find].label : null;
    },
    // Metodo para traer el Value de los Selects y Columns
    filterLabel(array, label) {
      var find = this[array].findIndex((item) => item.label == label);
      return find >= 0 ? this[array][find].value : null;
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

    // Metodo para Extraer Datos de Tabla(
    getDataTable() {
      this.loading = true;
      this.$refs.methods.getData("/vcontrol", "setDataTable", "variables");
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodos para Setear Datos para Seleccionar
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nombre = res.nombre;
      this[dataRes].valor = res.valor;
      this[dataRes].tipo = this.filterDesc("tipos", res.tipo);      
    },
    // Metodos para Editar y Crear Datos
    sendData() {
      this.form.tipo = this.form.tipo.value ? this.form.tipo.value : this.filterLabel("tipos", this.form.tipo);
      if (!this.form.id) {
        this.$refs.methods.createData("/vcontrol", this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/vcontrol/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
    },
    // Metodos para Actualizar con Selects de Tabla
    putDataSelect(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nombre = res.nombre;
      this[dataRes].valor = res.valor;
      this.$refs.methods.putData(
        `/vcontrol/${this.form.id}`,
        this.form,
        "getDataTable"
      );
    },
    // Metodos para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.nombre = "";
      this.form.tipo = "";
      this.form.valor = "";
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
