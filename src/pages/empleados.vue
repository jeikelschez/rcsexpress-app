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
                  label="Nombre de Empleado"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        30,
                        'Maximo 30 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  @update:model-value="form.nombre = form.nombre.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.rif_empleado"
                  label="RIF de Empleado"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        10,
                        'Maximo 10 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]"
                  hint=""
                  lazy-rules
                  mask="##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="fact_check" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-3 col-xs-12" style="margin-bottom: 15px">
                <q-checkbox
                  size="lg"
                  v-model="form.aplica_retencion"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="¿APLICA RETENCIÓN?"
                />
              </div>

              <div class="col-md-9 col-xs-12">
                <q-input
                  outlined
                  v-model="form.porcentaje_retencion"
                  label="Porcentaje Retención"
                  v-money="money"
                  input-class="text-right"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(val, 6, 'Maxima Cantidad'),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.periodo"
                  label="Período"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        6,
                        'Maximo 6 Caracteres'
                      ) || '',
                  ]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  @update:model-value="
                    form.periodo = form.periodo.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="calendar_today" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.sueldo"
                  label="Sueldo"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isMax(val, 13, 'Maxima Cantidad') ||
                      '',
                  ]"
                  hint=""
                  v-money="money"
                  input-class="text-right"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class=" row justify-center items-center content-center"
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
          style="
            align-self: center;
            text-align: center;
            font-size: 20px;
            margin-bottom: 15px;
          "
        >
          <p><strong>MANTENIMIENTO - EMPLEADOS</strong></p>
        </div>
        <div
          class="col-md-5 col-sm-7 col-xs-12 cardMargin selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-input
            v-model="filter"
            rounded
            dense
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
            label="Añadir Empleado"
            rounded
            color="primary"
            @click="dialog = true"
            :disabled="this.allowOption(2)"
          >
          </q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="datos"
          binary-state-sort
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
                :disabled="this.allowOption(3)"
                @click="
                  getData(`/empleados/${props.row.id}`, 'setDataEdit', 'form');
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
                            `/empleados/${props.row.id}`,
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
                        @click.capture="deletePopup = true"
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
      @get-Data="getData('/empleados', 'setData', 'datos')"
      @set-data="setData"
      @set-Data-Edit="setData"
      @reset-Loading="resetLoading"
      @set-Data-Permisos="setDataPermisos"
    >
    </methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import { VMoney } from "v-money";
import methodsVue from "src/components/methods.vue";
import rulesVue from "src/components/rules.vue";

export default {
  directives: { money: VMoney },
  components: {
    methods: methodsVue,
    VMoney,
    rulesVue,
  },
  name: "Empleados",
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
          label: "Nombre del Empleado",
          field: "nombre",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "sueldo",
          label: "Sueldo",
          field: "sueldo",
          align: "right",
          sortable: true,
          required: true,
        },
        {
          name: "porcentaje_retencion",
          label: "Porcentaje Retención",
          field: "porcentaje_retencion",
          align: "right",
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
        rif_empleado: "",
        nombre: "",
        aplica_retencion: "0",
        porcentaje_retencion: "",
        periodo: "",
        sueldo: "",
      },
      datos: [],
      selected: [],
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
      rowsPerPage: 5,
    });
    return {
      pagination: ref({
        rowsPerPage: 5,
      }),
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Empleados", "");
    this.getData("/empleados", "setData", "datos");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "empleados",
      },
    });
  },
  methods: {
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

    // Metodo para Get de Datos
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes);
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.form.id = res.id;
      this.form.rif_empleado = res.rif_empleado;
      this.form.aplica_retencion = res.aplica_retencion;
      this.form.porcentaje_retencion = res.porcentaje_retencion;
      this.form.porcentaje_retencion = res.porcentaje_retencion;
      this.form.sueldo = res.sueldo;
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/empleados/${idpost}`, "getData");
      this.loading = true;
    },
    // Metodo para Editar o Crear Datos
    sendData() {
      this.form.porcentaje_retencion = this.form.porcentaje_retencion
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.sueldo = this.form.sueldo
        .replaceAll(".", "")
        .replaceAll(",", ".");
      if (!this.form.id) {
        this.$refs.methods.createData("/empleados", this.form, "getData");
        this.resetForm();
        this.loading = true;
        this.dialog = false;
      } else {
        this.$refs.methods.putData(
          `/empleados/${this.form.id}`,
          this.form,
          "getData"
        );
        this.dialog = false;
        this.resetForm();
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.rif_empleado = "";
      this.form.nombre = "";
      this.form.aplica_retencion = "0";
      this.form.porcentaje_retencion = "";
      this.form.periodo = "";
      this.form.sueldo = "";
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

@media screen and (max-width: 1024px) {
  .buttonMargin {
    margin-bottom: 20px !important;
  }
}

@media screen and (max-width: 600px) {
  .selectMobile {
    margin-bottom: 20px !important;
  }
}
</style>
