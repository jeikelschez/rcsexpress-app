<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="agenciasDialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedPais"
                  label="País"
                  class="pcform"
                  input-class="input"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  hint=""
                  :options="paisesSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'paisesSelected',
                        'paises',
                        'desc_pais'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                  @update:model-value="
                    this.selectedEstado = [];
                    this.selectedCiudad = [];
                    this.estados = [];
                    this.ciudades = [];
                    this.$refs.methods.getData(
                      `/estados`,
                      'setData',
                      'estados',
                      {
                        headers: {
                          pais: this.selectedPais.id,
                        },
                      }
                    );
                  "
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="public" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedEstado"
                  label="Estado"
                  input-class="input"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  hint=""
                  class="pcform"
                  :options="estadosSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'estadosSelected',
                        'estados',
                        'desc_estado'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="desc_estado"
                  option-value="id"
                  lazy-rules
                  @update:model-value="
                    this.selectedCiudad = [];
                    this.ciudades = [];
                    this.$refs.methods.getData(
                      `/ciudades`,
                      'setData',
                      'ciudades',
                      {
                        headers: {
                          estado: this.selectedEstado.id,
                        },
                      }
                    );
                  "
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="public" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedCiudad"
                  label="Ciudad"
                  input-class="input"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  hint=""
                  :options="ciudadesSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'ciudadesSelected',
                        'ciudades',
                        'desc_ciudad'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="desc_ciudad"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="public" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-7 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.nb_agencia"
                  label="Agencia"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  @update:model-value="
                    form.nb_agencia = form.nb_agencia.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="form.persona_contacto"
                  label="Nombre"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 200),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    form.persona_contacto = form.persona_contacto.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="form.dir_agencia"
                  label="Dirección"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 200),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  @update:model-value="
                    form.dir_agencia = form.dir_agencia.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="form.rif_agencia"
                  label="Rif"
                  hint=""
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 200),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  lazy-rules
                  @update:model-value="
                    form.rif_agencia = form.rif_agencia.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nit_agencia"
                  label="NIT Agencia"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 200),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  @update:model-value="
                    form.nit_agencia = form.nit_agencia.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="list" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.fax_agencia"
                  label="Fax"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 200),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  mask="####-#####"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_agencia"
                  label="Teléfono"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 200),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                  mask="(###) ### - ####"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="form.estatus"
                  label="Estatus"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  :options="estatus"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="done_all" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="form.email_agencia"
                  label="Correo Electrónico"
                  hint=""
                  type="email"
                  lazy-rules
                  @update:model-value="
                    form.email_agencia = form.email_agencia.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
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

    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
          style="align-self: center; text-align: center; font-size: 20px"
        >
          <p><strong>MANTENIMIENTO - AGENCIAS</strong></p>
        </div>
        <div
          class="col-md-5 col-sm-7 col-xs-12 cardMargin selectMobile"
          style="align-self: center"
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
          class="col-md-2 col-sm-3 col-xs-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            color="primary"
            :disabled="this.allowOption(2)"
            @click="agenciasDialog = true"
            @click.capture="this.resetForm()"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="agencias"
          :loading="loading"
          binary-state-sort
          row-key="id"
          :columns="columns"
          :separator="separator"
          :rows-per-page-options="[5, 10, 15, 20, 50]"
          @request="getDataTable"
          style="width: 100%"
          :grid="$q.screen.xs"
          v-model:pagination="pagination"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" class="loading" />
          </template>
          <template v-slot:body-cell-estatus="props">
            <q-td :props="props">
              {{ filterDesc("estatus", props.row.estatus) }}
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
                @click.capture="resetForm"
                :disabled="this.allowOption(3)"
                @click="
                  this.$refs.methods.getData(
                    `/agencias/${props.row.id}`,
                    'setDataEdit',
                    'form'
                  );
                  agenciasDialog = true;
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
                      <q-item-label v-if="col.name === 'estatus'">
                        {{ filterDesc("estatus", props.row.estatus) }}
                      </q-item-label>
                      <q-btn
                        v-if="col.name === 'action'"
                        dense
                        round
                        flat
                        color="primary"
                        icon="edit"
                        :disabled="this.allowOption(3)"
                        @click.capture="resetForm"
                        @click="
                          this.$refs.methods.getData(
                            `/agencias/${props.row.id}`,
                            'setDataEdit',
                            'form'
                          );
                          agenciasDialog = true;
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
                      <q-item-label v-if="col.name != 'estatus'"
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
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
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
import { api } from "boot/axios";
import { LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
import methodsVue from "src/components/methods.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
  },
  name: "Agencias",
  data() {
    return {
      columns: [
        {
          name: "Ciudades",
          label: "Ciudad",
          field: (row) => row.ciudades.desc_ciudad,
          align: "left",
        },
        {
          name: "nb_agencia",
          label: "Agencia",
          field: "nb_agencia",
          align: "left",
          sortable: true,
        },
        {
          name: "tlf_agencia",
          label: "Teléfono",
          field: "tlf_agencia",
          align: "left",
          sortable: true,
        },
        {
          name: "estatus",
          label: "Estatus",
          field: "estatus",
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
        cod_ciudad: "",
        nb_agencia: "",
        persona_contacto: "",
        dir_agencia: "",
        fax_agencia: "",
        email_agencia: "",
        tlf_agencia: "",
        rif_agencia: "",
        nit_agencia: "",
        estatus: "",
      },
      estatus: [
        { label: "ACTIVA", value: "A" },
        { label: "INACTIVA", value: "I" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 5,
        sortBy: "nb_agencia",
        descending: false,
        filter: "nb_agencia,tlf_agencia",
        filterValue: "",
        rowsNumber: "",
      },
      paises: [],
      estados: [],
      count: 1,
      currentPage: 1,
      ciudades: [],
      agencias: [],
      rpermisos: [],
      paisesSelected: [],
      estadosSelected: [],
      ciudadesSelected: [],
      selectedPais: [],
      selectedEstado: [],
      selectedCiudad: [],
    };
  },
  setup() {
    return {
      loading: ref(false),
      separator: ref("vertical"),
      agenciasDialog: ref(false),
      deletePopup: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Agencias", "");
    this.$refs.methods.getData("/paises", "setData", "paises");
    this.getDataTable();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "agencias",
      },
    });
  },
  methods: {
    // Metodo para Filtrar Datos de Selects
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

    // Metodo para Setear Datos Generales
    setData(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Eliminar Datos en Tabla
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/agencias/${idpost}`, "getDataTable");
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/agencias`, "setDataTable", "agencias", {
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
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
    },
    // Metodo para Setear Datos de Agencia Seleccionada
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nb_agencia = res.nb_agencia;
      this[dataRes].persona_contacto = res.persona_contacto;
      this[dataRes].dir_agencia = res.dir_agencia;
      this[dataRes].fax_agencia = res.fax_agencia;
      this[dataRes].email_agencia = res.email_agencia;
      this[dataRes].tlf_agencia = res.tlf_agencia;
      this[dataRes].rif_agencia = res.rif_agencia;
      this[dataRes].nit_agencia = res.nit_agencia;
      this[dataRes].estatus = this.filterDesc("estatus", res.estatus);
      this.selectedCiudad = res.ciudades;
      this.ciudadEdit = res.ciudades.id;
      api
        .get(`/ciudades`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            estado: this.selectedCiudad.cod_estado,
          },
        })
        .then((res) => {
          this.ciudades = res.data.data;
          this.selectedEstado = res.data.data[0].estados;
          api
            .get(`/estados`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                pais: this.selectedEstado.cod_pais,
              },
            })
            .then((res) => {
              this.estados = res.data.data;
              this.selectedPais = res.data.data[0].paises.desc_pais;
            });
        });
    },
    // Metodo para Editar o Crear Agencia
    sendData() {
      this.form.cod_ciudad = this.selectedCiudad.id;
      this.form.estatus = this.form.estatus.value;
      if (!this.form.id) {
        this.$refs.methods.createData("/agencias", this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/agencias/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.agenciasDialog = false;
      this.resetForm();
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.selectedPais = [];
      this.selectedEstado = [];
      this.selectedCiudad = [];
      this.estados = [];
      this.ciudades = [];
      this.form.persona_contacto = "";
      this.form.nb_agencia = "";
      this.form.dir_agencia = "";
      this.form.fax_agencia = "";
      this.form.email_agencia = "";
      this.form.tlf_agencia = "";
      this.form.rif_agencia = "";
      this.form.nit_agencia = "";
      this.form.estatus = "";
      this.agenciasDialog = false;
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
  .cardMarginFilter {
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
