<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createDato" class="q-gutter-md">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedPais"
                  label="País"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="paises"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                  @update:model-value="this.axiosConfig.headers.pais = this.selectedPais.id;
                  getData(`/estados`, 'setDataEstados', 'estados')"
                >
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
                  :rules="[reglasSelect]"
                  hint=""
                  class="pcform"
                  :options="estados"
                  option-label="desc_estado"
                  option-value="id"
                  lazy-rules
                  @update:model-value="this.axiosConfig.headers.estado = this.selectedEstado.id;
                  getData(`/ciudades`, 'setDataCiudades', 'ciudades')"
                >
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
                  :rules="[reglasSelect]"
                  hint=""
                  :options="ciudades"
                  option-label="desc_ciudad"
                  option-value="id"
                  lazy-rules
                >
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
                  :rules="[reglaInputNombre]"
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
                  :rules="[reglaInputDireccion]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    form.persona_contacto = form.persona_contacto.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle"/>
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
                  :rules="[reglaInputDireccion]"
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
                  :rules="[reglaInputDireccion]"
                  lazy-rules
                  @update:model-value="
                    form.rif_agencia = form.rif_agencia.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="badge"/>
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nit_agencia"
                  label="NIT Agencia"
                  :rules="[reglaInputDireccion]"
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
                  :rules="[reglaInputDireccion]"
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
                  :rules="[reglaInputDireccion]"
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
                  :rules="[reglasSelect]"
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
                label="Agregar Agencia"
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
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="putDato">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedPais"
                  label="País"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="paises"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                  @update:model-value="this.axiosConfig.headers.pais = this.selectedPais.id;
                  getData(`/estados`, 'setDataEstados', 'estados')"
                >
                  <template v-slot:prepend>
                    <q-icon name="public" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedEstado"
                  label="Estado"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="estados"
                  option-label="desc_estado"
                  option-value="id"
                  lazy-rules
                  @update:model-value="this.axiosConfig.headers.estado = this.selectedEstado.id;
                  getData(`/ciudades`, 'setDataCiudades', 'ciudades')"
                >
                  <template v-slot:prepend>
                    <q-icon name="public" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="selectedCiudad"
                  label="Ciudad"
                  class="pcform"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  :options="ciudades"
                  option-label="desc_ciudad"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="public" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nb_agencia"
                  label="Agencia"
                  hint=""
                  lazy-rules
                  :rules="[reglaInputNombre]"
                  @update:model-value="
                    formEdit.nb_agencia = formEdit.nb_agencia.toUpperCase()
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
                  v-model="formEdit.persona_contacto"
                  label="Nombre"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[reglaInputDireccion]"
                  @update:model-value="
                    formEdit.persona_contacto =
                      formEdit.persona_contacto.toUpperCase()
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
                  v-model="formEdit.dir_agencia"
                  label="Dirección"
                  hint=""
                  lazy-rules
                  :rules="[reglaInputDireccion]"
                  @update:model-value="
                    formEdit.dir_agencia = formEdit.dir_agencia.toUpperCase()
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
                  v-model="formEdit.rif_agencia"
                  label="Rif"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglaInputDireccion]"
                  @update:model-value="
                    formEdit.rif_agencia = formEdit.rif_agencia.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nit_agencia"
                  label="NIT Agencia"
                  hint=""
                  lazy-rules
                  :rules="[reglaInputDireccion]"
                  @update:model-value="
                    formEdit.nit_agencia = formEdit.nit_agencia.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="list" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.fax_agencia"
                  label="Fax"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[reglaInputDireccion]"
                  mask="####-#####"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.tlf_agencia"
                  label="Teléfono"
                  hint=""
                  lazy-rules
                  :rules="[reglaInputDireccion]"
                  mask="(###) ### - ######"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.estatus"
                  input
                  label="Estatus"
                  hint=""
                  :rules="[reglasSelect]"
                  :options="estatus"
                  class="pcform"
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
                  v-model="formEdit.email_agencia"
                  label="Correo Electrónico"
                  hint=""
                  type="email"
                  lazy-rules
                  @update:model-value="
                    formEdit.email_agencia =
                      formEdit.email_agencia.toUpperCase()
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
              style="margin-top: 10px"
            >
              <q-btn
                label="Editar Agencia"
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
            <h4><strong>MANTENIMIENTO - AGENCIAS</strong></h4>
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
              label="Insertar Agencia"
              rounded
              color="primary"
              :disabled="this.disabledCreate"
              @click="create = true"
              @click.capture="this.resetForm()"
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
                      @click.capture="resetFormEdit"
                      :disabled="this.disabledEdit"
                      @click="
                        getDataEdit(props.row.id);
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
                              @click.capture="resetFormEdit"
                              @click="
                                getDataEdit(props.row.id);
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
            @click="deleteDato(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <methods ref="methods"
    @get-Data="getData('/agencias','setData','datos')"
    @set-Data="setData"
    @set-Data-Edit="setDataEdit"
    @set-Data-Edit-Ciudades="setDataEditCiudades"
    @set-Data-Edit-Estados="setDataEditEstados"
    @set-Data-Estados="setDataEstados"
    @set-Data-Ciudades="setDataCiudades"></methods>
    <desactive-crud ref="desactiveCrud"
    @desactivar-Crud-Agencias="desactivarCrudAgencias"></desactive-crud>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { useQuasar } from "quasar";

import methodsVue from 'src/components/methods.vue';

import desactivateCrudVue from 'src/components/desactivateCrud.vue';

import { LocalStorage } from "quasar";

export default {
  components: { 'desactive-crud': desactivateCrudVue,
  "methods": methodsVue },
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
          name: "Ciudades",
          label: "Ciudad",
          field: (row) => row.ciudades.desc_ciudad,
          align: "left",
          sortable: true,
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
          name: "activo_desc",
          label: "Estatus",
          field: "activo_desc",
          align: "left",
          type: "string",
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
      formEdit: {
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
      paises: [],
      estados: [],
      ciudades: [],
      datos: [],
      selectedPais: [],
      selectedEstado: [],
      selectedCiudad: [],
      selectedPaisEdit: "",
      selectedEstadoEdit: "",
      selectedCiudadEdit: "",
      CiudadEdit: "",
      EstadoEdit: "",
      PaisEdit: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          pais: "",
          estado: ""
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
      reglasInputs: [
        (val) => (val !== null && val !== "") || "Debes escribir algo",
        (val) => val.length <= 50 || "Deben ser máximo 50 caracteres",
      ],
      errorDelServidor() {
        $q.notify({
          message: this.error,
          color: "red",
        });
      },
      añadidoConExito() {
        $q.notify({
          message: "Agregado exitosamente",
          color: "green",
        });
      },
      editadoConExito() {
        $q.notify({
          message: "Editado exitosamente",
          color: "green",
        });
      },
      eliminadoConExito() {
        $q.notify({
          message: "Eliminado exitosamente",
          color: "green",
        });
      },
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData('/agencias','setData','datos')
    this.getData('/paises','setData','paises')
    this.$refs.desactiveCrud.desactivarCrud('c_agencias', 'd_agencias', 'u_agencias', 'desactivarCrudAgencias')
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
    reglaInputDireccion(val) {
      if(val !== null) {
      if (val.length > 200) {
        return "Deben ser máximo 200 caracteres";
        }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
      }
    },
    reglaInputNombre(val) {
      if(val !== null) {
        if (val === null) {
        return "Debes escribir algo";
      }
      if (val === "") {
        return "Debes escribir Algo";
      }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
      }
    },
    desactivarCrudAgencias(createItem, deleteItem, updateItem) {
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
    },
    setData(res, dataRes) {
      this[dataRes] = res
    },

    getDataEdit(id) {
      this.$refs.methods.getDataEdit(`/agencias/${id}`, 'setDataEdit', 'formEdit', this.axiosConfig);
    },
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id
      this[dataRes].nb_agencia = res.nb_agencia
      this[dataRes].persona_contacto = res.persona_contacto
      this[dataRes].dir_agencia = res.dir_agencia
      this[dataRes].fax_agencia = res.fax_agencia
      this[dataRes].email_agencia = res.email_agencia
      this[dataRes].tlf_agencia = res.tlf_agencia
      this[dataRes].rif_agencia = res.rif_agencia
      this[dataRes].nit_agencia = res.nit_agencia
      this[dataRes].estatus = res.activo_desc
      this.selectedCiudadEdit = res.ciudades.cod_estado,
      this.selectedCiudad = res.ciudades.desc_ciudad;
      this.ciudadEdit = res.ciudades.id
      this.axiosConfig.headers.estado = this.selectedCiudadEdit;
      this.$refs.methods.getDataEdit(`/ciudades`, 'setDataEditCiudades', 'ciudades', this.axiosConfig);
    },
    setDataEditCiudades(res, dataRes) {
      this[dataRes] = res
      this.selectedEstadoEdit = res[0].estados.cod_pais;
      this.selectedEstado = res[0].estados.desc_estado;
      this.axiosConfig.headers.pais = this.selectedEstadoEdit;
      this.$refs.methods.getDataEdit(
        `/estados`, 'setDataEditEstados', 'estados', this.axiosConfig);
    },
    setDataEditEstados(res, dataRes) {
      this[dataRes] = res
      this.selectedPais = res[0].paises.desc_pais;
    },

    setDataEstados(res, dataRes) {
      this[dataRes] = res
      this.selectedEstado = ''
      this.selectedCiudad = ''
      this.ciudades = ''
    },
    setDataCiudades(res, dataRes) {
      this.selectedCiudad = ''
      this[dataRes] = res
    },
    
    deleteDato(idpost) {
      this.$refs.methods.deleteData(`/agencias/${idpost}`, 'getData', this.axiosConfig);
    },
    createDato() {
      this.form.cod_ciudad = this.selectedCiudad.id;
      this.form.estatus = this.form.estatus.value;
      this.$refs.methods.createData('/agencias', this.form, 'getData', this.axiosConfig);
      this.resetForm();
    },
    putDato() {
      this.formEdit.cod_ciudad = this.selectedCiudad.id;
      this.formEdit.estatus = this.formEdit.estatus.value;
      this.$refs.methods.putData(`/agencias/${this.formEdit.id}`, this.formEdit, 'getData', this.axiosConfig);
      this.edit = false;
    },
    
    resetForm() {
        (this.selectedPais = null),
        (this.selectedEstado = null),
        (this.selectedCiudad = null),
        (this.estados = null),
        (this.ciudades = null),
        (this.form.persona_contacto = ""),
        (this.form.nb_agencia = ""),
        (this.form.persona_contacto = ""),
        (this.form.dir_agencia = ""),
        (this.form.fax_agencia = ""),
        (this.form.email_agencia = ""),
        (this.form.tlf_agencia = ""),
        (this.form.rif_agencia = ""),
        (this.form.nit_agencia = ""),
        (this.form.estatus = ""),
        (this.create = null)
    },
    resetFormEdit() {
      (this.selectedPais = null),
      (this.selectedEstado = null),
      (this.selectedCiudad = null),
      (this.formEdit.persona_contacto = ""),
      (this.formEdit.dir_agencia = ""),
      (this.formEdit.fax_agencia = ""),
      (this.formEdit.email_agencia = ""),
      (this.formEdit.tlf_agencia = ""),
      (this.formEdit.rif_agencia = ""),
      (this.formEdit.nit_agencia = ""),
      (this.formEdit.nb_agencia = ""),
      (this.formEdit.estatus = null)
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
