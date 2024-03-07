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
                  v-model="form.nb_receptor"
                  label="Nombre"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  @update:model-value="
                    form.nb_receptor = form.nb_receptor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.flag_activo"
                  label="Estatus"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  hint=""
                  :options="estatus"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="block" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.dir_receptor"
                  label="Direccion"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    form.dir_receptor = form.dir_receptor.toUpperCase()
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
                  v-model="form.tlf_receptor"
                  label="Teléfonos"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  lazy-rules
                  mask="(####) ### - ####"
                  class="pcform"
                  @update:model-value="
                    form.tlf_receptor = form.tlf_receptor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.cel_receptor"
                  label="Celular"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  lazy-rules
                  mask="(####) ### - ####"
                  @update:model-value="
                    form.cel_receptor = form.cel_receptor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="phone_iphone" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.cedula_receptor"
                  label="Cedula"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 20),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  @update:model-value="
                    form.cedula_receptor = form.cedula_receptor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="contacts" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.placa"
                  label="Placa"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="form.placa = form.placa.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="money" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.vehiculo"
                  label="Descripcion de Vehiculo"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    form.vehiculo = form.vehiculo.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="directions_car" />
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
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>MANTENIMIENTO - RECEPTORES</strong>
          </p>
        </div>
        <div
          class="col-md-5 col-sm-7 col-xs-12 cardMargin selectMobile"
          style="align-self: center"
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
            class="q-px-xl q-py-xs"
          ></q-btn>
        </div>
      </div>
      <div class="row q-pa-md q-gutter-y-md">
        <q-table
          :rows="receptores"
          row-key="id"
          :columns="columns"
          binary-state-sort
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
          <template v-slot:body-cell-flag_activo="props">
            <q-td :props="props">
              {{ filterDesc("estatus", props.row.flag_activo) }}
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
                    `/receptores/${props.row.id}`,
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
                      <q-item-label v-if="col.name === 'flag_activo'">
                        {{ filterDesc("estatus", props.row.flag_activo) }}
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
                            `/receptores/${props.row.id}`,
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
                      <q-item-label v-if="col.name != 'flag_activo'">
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
                `/receptores/${selected}`,
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
import rulesVue from "src/components/rules.vue";
import { LocalStorage } from "quasar";
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
          name: "nb_receptor",
          label: "Nombre",
          field: "nb_receptor",
          align: "left",
          sortable: true,
        },
        {
          name: "cedula_receptor",
          label: "Cedula de Receptor",
          field: "cedula_receptor",
          align: "left",
          sortable: true,
        },
        {
          name: "flag_activo",
          label: "Estatus",
          field: "flag_activo",
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
        nb_receptor: "",
        dir_receptor: "",
        tlf_receptor: "",
        cel_receptor: "",
        cedula_receptor: "",
        placa: "",
        vehiculo: "",
        flag_activo: [],
      },
      estatus: [
        { label: "ACTIVO", value: "A" },
        { label: "INACTIVO", value: "I" },
      ],
      pagination: {
        rowsPerPage: 10,
      },
      receptores: [],
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
    this.$emit("changeTitle", "SCEN - Mantenimiento - Receptores", "");
    this.getDataTable();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "receptores",
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

    // METODOS DE PAGINA

    // Metodo para Extraer Datos de Tabla
    getDataTable() {
      this.loading = true;
      this.$refs.methods.getData("/receptores", "setDataTable", "receptores");
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nb_receptor = res.nb_receptor;
      this[dataRes].dir_receptor = res.dir_receptor;
      this[dataRes].tlf_receptor = res.tlf_receptor;
      this[dataRes].cel_receptor = res.cel_receptor;
      this[dataRes].cedula_receptor = res.cedula_receptor;
      this[dataRes].placa = res.placa;
      this[dataRes].vehiculo = res.vehiculo;
      this[dataRes].flag_activo = this.filterDesc("estatus", res.flag_activo);
    },
    // Metodo para Editar o Crear Datos
    sendData() {
      this.form.flag_activo = this.form.flag_activo.value;
      if (!this.form.id) {
        this.$refs.methods.createData("/receptores", this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/receptores/${this.form.id}`,
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
      this.form.nb_receptor = "";
      this.form.dir_receptor = "";
      this.form.tlf_receptor = "";
      this.form.cel_receptor = "";
      this.form.cedula_receptor = "";
      this.form.cedula_receptor = "";
      this.form.flag_activo = "";
      this.form.vehiculo = "";
    },
  },
};
</script>
