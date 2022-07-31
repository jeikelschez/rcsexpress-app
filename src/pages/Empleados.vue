<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nombre"
                  label="Nombre de Empleado"
                  :rules="[reglasNotNull30]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  @update:model-value="
                    form.nombre = form.nombre.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.rif_empleado"
                  label="RIF de Empleado"
                  :rules="[reglasNotNull10]"
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
                  :rules="[reglasNotNullPercent]"
                  hint=""
                  step=".01"
                  lazy-rules
                  type="number"
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
                  :rules="[reglasNotNull6]"
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
                  :rules="[reglasAllowNullSueldo]"
                  hint=""
                  step=".01"
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>

              </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Empleado"
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

    <q-dialog v-model="edit">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="putData">
            <div class="row">

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nombre"
                  label="Nombre de Empleado"
                  :rules="[reglasNotNull30]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  @update:model-value="
                    formEdit.nombre = formEdit.nombre.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.rif_empleado"
                  label="RIF de Empleado"
                  :rules="[reglasNotNull10]"
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
                  v-model="formEdit.aplica_retencion"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="¿APLICA RETENCIÓN?"
                />
              </div>

              <div class="col-md-9 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.porcentaje_retencion"
                  label="Porcentaje Retención"
                  :rules="[reglasNotNullPercent]"
                  hint=""
                  step=".01"
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.periodo"
                  label="Período"
                  :rules="[reglasNotNull6]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  @update:model-value="
                    formEdit.periodo = formEdit.periodo.toUpperCase()
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
                  v-model="formEdit.sueldo"
                  label="Sueldo"
                  :rules="[reglasAllowNullSueldo]"
                  hint=""
                  step=".01"
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="paid" />
                  </template>
                </q-input>
              </div>

            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Empleado"
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
        <div class="row">
          <div
            class="col-md-4 col-xs-12 text-secondary"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <h4><strong>MANTENIMIENTO - EMPLEADOS</strong></h4>
          </div>
          <div
            class="col-md-5 col-sm-7 col-xs-6"
            style="align-self: center; margin-right: 20px"
          >
            <q-input
              v-model="filter"
              rounded
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
            class="col-md-2 col-sm-4 col-xs-5"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar Empleado"
              rounded
              color="primary"
              @click="create = true"
              :disabled="this.disabledCreate"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md">
          <div class="q-gutter-y-md">
            <div bordered flat class="row">
              <q-table
                :rows="datos"
                row-key="id"
                :loading="loading"
                :columns="columns"
                :separator="separator"
                class="my-sticky-column-table"
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
                      :disabled="this.disabledEdit"
                      @click="
                        getData(`/empleados/${props.row.id}`, 'setDataEdit', 'formEdit');
                        edit = true;
                      "
                    ></q-btn>
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="delete"
                      :disabled="this.disabledDelete"
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
                              :disabled="this.disabledEdit"
                              @click="
                                getData(`/empleados/${props.row.id}`, 'setDataEdit', 'formEdit');
                                edit = true;
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
                              :disabled="this.disabledDelete"
                              @click="selected = props.row.id"
                              @click.capture="deletePopup = true"
                            ></q-btn>
                            <q-item-label
                              v-else
                              caption
                              :class="col.classes ? col.classes : ''"
                              >{{ col.value }}</q-item-label
                            >
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
    <methods ref="methods"
    @get-Data="getData('/empleados','setData','datos')"
    @set-data="setData" @set-Data-Edit="setData"
    @reset-Loading="resetLoading">
    </methods>
    <desactivate-crud ref="desactivateCrud"
    @desactivar-Crud-Bancos="desactivarCrudBancos">
    </desactivate-crud>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { LocalStorage } from "quasar";

import methodsVue from 'src/components/methods.vue';

import desactivateCrudVue from 'src/components/desactivateCrud.vue';

export default {
  components: {
  "desactivate-crud": desactivateCrudVue,
  "methods": methodsVue },
  name: "Empleados",
  data() {
    return {
      columns: [
        {
          name: "nombre",
          label: "Nombre del Empleado",
          field: "nombre",
          align: "left",
          sortable: true,
        },
        {
          name: "sueldo",
          label: "Sueldo",
          field: "sueldo",
          align: "left",
          sortable: true,
        },
        {
          name: "porcentaje_retencion",
          label: "Porcentaje Retención",
          field: "porcentaje_retencion",
          align: "left",
          sortable: true,
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
        sueldo: ""
      },
      datos: [],
      formEdit: {
        id: "", 
        rif_empleado: "",
        nombre: "",
        aplica_retencion: "0",
        porcentaje_retencion: "",
        periodo: "",
        sueldo: ""
      },
      selected: [],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: ``,
        },
      },
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      create: ref(false),
      edit: ref(false),
      loading: ref(false),
      medium: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData('/empleados','setData','datos')
    this.$refs.desactivateCrud.desactivarCrud('c_bancos', 'd_bancos', 'u_bancos', 'desactivarCrudBancos')
  },
  methods: {
    resetLoading() {
      this.loading = false;
    },
    // Reglas
    reglasNotNull10(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 10) {
            return "Deben ser Maximo 10 caracteres";
          }
      }
    },
    reglasNotNull30(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 30) {
            return "Deben ser Maximo 30 caracteres";
          }
      }
    },
    reglasNotNullPercent(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if (val !== null !== "") {
          if (val > 999.99) {
            return "Deben ser Maximo 5 caracteres";
          }
      }
    },
    reglasNotNull6(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if (val !== null !== "") {
          if (val.length > 6) {
            return "Deben ser Maximo 6 caracteres";
          }
      }
    },
    reglasAllowNullSueldo(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val > 99999999.99) {
            return "Deben ser Maximo 10 caracteres";
          }
        }
      }
    },

    desactivarCrudBancos(createItem, deleteItem, updateItem) {
      if (createItem == true) {
        this.disabledCreate = false
      }
      if (deleteItem == true) {
        this.disabledDelete = false
      }
      if (updateItem == true) {
        this.disabledEdit = false
      }
    },

    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setData(res, dataRes) {
      this[dataRes] = res
      this.loading = false
    },  
    setDataEdit(res, dataRes) {
      this.formEdit.id = res.id
      this.formEdit.rif_empleado = res.rif_empleado
      this.formEdit.aplica_retencion = res.aplica_retencion
      this.formEdit.porcentaje_retencion = res.porcentaje_retencion
      this.formEdit.porcentaje_retencion = res.porcentaje_retencion
      this.formEdit.sueldo = res.sueldo
    },   
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/empleados/${idpost}`, 'getData', this.axiosConfig);
      this.loading = true;
    },
    createData() {
      this.$refs.methods.createData('/empleados', this.form, 'getData', this.axiosConfig);
      this.resetForm();
      this.loading = true;
    },
    putData() {
      this.$refs.methods.putData(`/empleados/${this.formEdit.id}`, this.formEdit, 'getData', this.axiosConfig);
      this.edit = false;
      this.resetFormEdit();
      this.loading = true;
    },
    
    resetForm() {
      (this.form.rif_empleado = ""),
      (this.form.nombre = ""),
      (this.form.aplica_retencion = "0"),
      (this.form.porcentaje_retencion = ""),
      (this.form.periodo = ""),
      (this.form.sueldo = ""),
      (this.create = false);    
    },
    resetFormEdit() {
      (this.formEdit.rif_empleado = ""),
      (this.formEdit.nombre = ""),
      (this.formEdit.aplica_retencion = "0"),
      (this.formEdit.porcentaje_retencion = ""),
      (this.formEdit.periodo = ""),
      (this.formEdit.sueldo = ""),
      (this.edit = false);    
    },
  },
};
</script>

<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */


  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #FFFFFF

  td:first-child
    background-color: #FFFFFF

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
