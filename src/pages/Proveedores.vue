<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_banco"
                  label="Beneficiario"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglaInputBancos]"
                  @update:model-value="
                    form.nb_banco = form.nb_banco.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.direccion_banco"
                  label="RIF"
                  hint=""
                  class="pcform"
                  :rules="[reglaInput]"
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

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.fax_banco"
                  label="NIT"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="#### - ##########"
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
                  label="Direccion Fiscal"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_banco"
                  label="Direccion de Correo"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_banco"
                  label="Telefono"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_banco"
                  label="Fax"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_banco"
                  label="Email"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedPais"
                  label="Servicio Prestado"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="paises"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedPais"
                  label="Tipo de Persona"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="paises"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedPais"
                  label="Tipo Retención ISLR"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="paises"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                  @update:model-value="getData(`/paises/${this.selectedPais.id}/estados`, 'setDataEstados', 'estados')"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_banco"
                  label="Observaciones"
                  hint=""
                  lazy-rules
                  :rules="[reglaInputBancos]"
                  @update:model-value="
                    form.nb_banco = form.nb_banco.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Proveedor"
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
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_banco"
                  label="Beneficiario"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglaInputBancos]"
                  @update:model-value="
                    form.nb_banco = form.nb_banco.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.direccion_banco"
                  label="RIF"
                  hint=""
                  class="pcform"
                  :rules="[reglaInput]"
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

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.fax_banco"
                  label="NIT"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="#### - ##########"
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
                  label="Direccion Fiscal"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_banco"
                  label="Direccion de Correo"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_banco"
                  label="Telefono"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_banco"
                  label="Fax"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_banco"
                  label="Email"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedPais"
                  label="Servicio Prestado"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="paises"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedPais"
                  label="Tipo de Persona"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="paises"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedPais"
                  label="Tipo Retención ISLR"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="paises"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                  @update:model-value="getData(`/paises/${this.selectedPais.id}/estados`, 'setDataEstados', 'estados')"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_banco"
                  label="Observaciones"
                  hint=""
                  lazy-rules
                  :rules="[reglaInputBancos]"
                  @update:model-value="
                    form.nb_banco = form.nb_banco.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Proveedor"
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
            <h4><strong>MANTENIMIENTO - PROVEEDORES</strong></h4>
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
              label="Insertar Proveedor"
              rounded
              color="primary"
              @click="create = true"
              @click.capture="getData('/bancos','setdata','datos')"
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
                        getData(`/bancos/${props.row.id}`, 'setData', 'formEdit');
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
                                getData(`/bancos/${props.row.id}`, 'setData', 'formEdit');
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
    @get-Data="getData('/bancos','setData','datos')"
    @set-data="setData" @set-Data-Edit="setData">
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
  name: "Bancos",
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
          name: "nb_banco",
          label: "Nombre del Proveedor",
          field: "nb_banco",
          align: "left",
          sortable: true,
        },
        {
          name: "tlf_banco",
          label: "Condicion de Pago",
          field: "tlf_banco",
          align: "left",
          sortable: true,
        },
        {
          name: "fax_banco",
          label: "Estatus",
          field: "fax_banco",
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
        nb_banco: "",
        direccion_banco: "",
        tlf_banco: "",
        fax_banco: "",
        cod_postal: "",
        email_banco: "",
      },
      datos: [],
      formEdit: {
        nb_banco: "",
        direccion_banco: "",
        tlf_banco: "",
        fax_banco: "",
        cod_postal: "",
        email_banco: "",
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
    this.getData('/bancos','setData','datos')
    this.$refs.desactivateCrud.desactivarCrud('c_bancos', 'd_bancos', 'u_bancos', 'desactivarCrudBancos')
  },
  methods: {
    reglaInputBancos(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
    },
    reglaInput(val) {
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
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
      this.$refs.methods.getData(url, call, dataRes);
    },
    setData(res, dataRes) {
      this[dataRes] = res
    },    
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/bancos/${idpost}`, 'getData');
    },
    createData() {
      this.$refs.methods.createData('/bancos', this.form, 'getData');
      this.resetForm();
    },
    putData() {
      this.$refs.methods.putData(`/bancos/${this.formEdit.id}`, this.formEdit, 'getData');
      this.edit = false;
    },
    
    resetForm() {
      (this.form.nb_banco = null),
      (this.form.direccion_banco = null),
      (this.form.tlf_banco = null),
      (this.form.fax_banco = null),
      (this.form.cod_postal = null),
      (this.form.email_banco = null),
      (this.create = false);    
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
