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
                  v-model="form.nb_receptor"
                  label="Nombre"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasNotNull50]"
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
                  :rules="[reglasSelect]"
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
                  :rules="[reglasAllowNull100]"
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
                  :rules="[reglasAllowNull50]"
                  hint=""
                  lazy-rules
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
                  :rules="[reglasAllowNull50]"
                  hint=""
                  lazy-rules
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
                  :rules="[reglasAllowNull20]"
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
                  :rules="[reglasAllowNull10]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    form.placa = form.placa.toUpperCase()
                  "
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
                  :rules="[reglasAllowNull100]"
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
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Receptor"
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
                  v-model="formEdit.nb_receptor"
                  label="Nombre"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasNotNull50]"
                  @update:model-value="
                    formEdit.nb_receptor = formEdit.nb_receptor.toUpperCase()
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
                  v-model="formEdit.flag_activo"
                  label="Estatus"
                  input-class="input"
                  :rules="[reglasSelect]"
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
                  v-model="formEdit.dir_receptor"
                  label="Direccion"
                  :rules="[reglasAllowNull100]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    formEdit.dir_receptor = formEdit.dir_receptor.toUpperCase()
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
                  v-model="formEdit.tlf_receptor"
                  label="Teléfonos"
                  :rules="[reglasAllowNull50]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  @update:model-value="
                    formEdit.tlf_receptor = formEdit.tlf_receptor.toUpperCase()
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
                  v-model="formEdit.cel_receptor"
                  label="Celular"
                  :rules="[reglasAllowNull50]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    formEdit.cel_receptor = formEdit.cel_receptor.toUpperCase()
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
                  v-model="formEdit.cedula_receptor"
                  label="Cedula"
                  :rules="[reglasAllowNull20]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  @update:model-value="
                    formEdit.cedula_receptor = formEdit.cedula_receptor.toUpperCase()
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
                  v-model="formEdit.placa"
                  label="Placa"
                  :rules="[reglasAllowNull10]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    formEdit.placa = formEdit.placa.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="money" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.vehiculo"
                  label="Descripcion de Vehiculo"
                  :rules="[reglasAllowNull100]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    formEdit.vehiculo = formEdit.vehiculo.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="directions_car" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Receptor"
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
            <h4><strong>MANTENIMIENTO - RECEPTORES</strong></h4>
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
              label="Insertar Receptor"
              rounded
              color="primary"
              @click="create = true"
              @click.capture="resetForm()"
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
                :columns="columns"
                :separator="separator"
                class="my-sticky-column-table"
                :filter="filter"
                style="width: 100%"
                :grid="$q.screen.xs"
                v-model:pagination="pagination"
              >
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
                        getData(`/receptores/${props.row.id}`, 'setDataEdit', 'formEdit');
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
                                getData(`/receptores/${props.row.id}`, 'setDataEdit', 'formEdit');
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
    @get-Data="getData('/receptores','setData','datos')"
    @set-data="setData"
    @set-Data-Edit="setDataEdit">
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
  "methods": methodsVue},
  name: "Receptores",
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "Código",
          field: "id",
          align: "left",
          sortable: true,
        },
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
          name: "activo_desc",
          label: "Estatus",
          field: "activo_desc",
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
      datos: [],
      formEdit: {
        id: "",
        nb_receptor: "",
        dir_receptor: "",
        tlf_receptor: "",
        cel_receptor: "",
        cedula_receptor: "",
        placa: "",
        vehiculo: "",
        flag_activo: [],
      },
      selected: [],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
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
      medium: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData('/receptores','setData','datos')
    this.$refs.desactivateCrud.desactivarCrud('c_bancos', 'd_bancos', 'u_bancos', 'desactivarCrudBancos')
  },
  methods: {
    // Reglas
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasNotNull100(val) {
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 99) {
            return "Deben ser Maximo 100 caracteres";
          }
      }
    },
    reglasNotNull20(val) {
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 19) {
            return "Deben ser Maximo 19 caracteres";
          }
      }
    },
    reglasNotNull200(val) {
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 199) {
            return "Deben ser Maximo 200 caracteres";
          }
      }
    },
    reglasNotNull50(val) {
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 49) {
            return "Deben ser Maximo 50 caracteres";
          }
      }
    },
    reglasAllowNull20(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 19) {
            return "Deben ser Maximo 20 caracteres";
          }
        }
      }
    },
    reglasAllowNull100(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 99) {
            return "Deben ser Maximo 100 caracteres";
          }
        }
      }
    },
    reglasAllowNull10(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 9) {
            return "Deben ser Maximo 10 caracteres";
          }
        }
      }
    },
    reglasAllowNull50(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 49) {
            return "Deben ser Maximo 50 caracteres";
          }
        }
      }
    },

    // Desactivar CRUD
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

    // Metodos CRUD
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    setData(res, dataRes) {
      this[dataRes] = res
    },  
    setDataEdit(res, dataRes) {
      this.formEdit.id = res.id
      this.formEdit.nb_receptor = res.nb_receptor
      this.formEdit.dir_receptor = res.dir_receptor
      this.formEdit.tlf_receptor = res.tlf_receptor
      this.formEdit.cel_receptor = res.cel_receptor
      this.formEdit.cedula_receptor = res.cedula_receptor
      this.formEdit.placa = res.placa
      this.formEdit.vehiculo = res.vehiculo
      this.formEdit.flag_activo = res.activo_desc
    },   
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/receptores/${idpost}`, 'getData', this.axiosConfig);
    },
    createData() {
      this.form.flag_activo = this.form.flag_activo.value
      this.$refs.methods.createData('/receptores', this.form, 'getData', this.axiosConfig);
      this.resetForm();
    },
    putData() {
      this.formEdit.flag_activo = this.formEdit.flag_activo.value
      this.$refs.methods.putData(`/receptores/${this.formEdit.id}`, this.formEdit, 'getData', this.axiosConfig);
      this.edit = false;
      this.resetFormEdit()
    },
    
    resetForm() {
      (this.form.nb_receptor = ""),
      (this.form.dir_receptor = ""),
      (this.form.tlf_receptor = ""),
      (this.form.cel_receptor = ""),
      (this.form.cedula_receptor = ""),
      (this.form.cedula_receptor = ""),
      (this.form.flag_activo = ""),
      (this.create = false);    
    },
    resetFormEdit() {
      (this.formEdit.nb_receptor = ""),
      (this.formEdit.dir_receptor = ""),
      (this.formEdit.tlf_receptor = ""),
      (this.formEdit.cel_receptor = ""),
      (this.formEdit.cedula_receptor = ""),
      (this.formEdit.flag_activo = ""),
      (this.formEdit.placa = ""),
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
