<template>
  <q-page class="q-pa-md">

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
                  :options="países"
                  option-label="desc_pais"
                  option-value="id"
                  lazy-rules
                  @update:model-value="getDatosEstados(selectedPais)"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
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
                  @update:model-value="getDatosCiudades(selectedEstado)"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
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
                    <q-icon name="person" />
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
                  :rules="reglasInputs"
                  unmasked-value
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="form.persona_contacto"
                  label="Nombre"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
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
                  :rules="reglaInputDireccion"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="form.rif_agencia"
                  label="Rif"
                  hint=""
                  lazy-rules
                  :rules="reglasInputRifInt"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nit_agencia"
                  label="NIT Agencia"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="reglasInputRifInt"
                >
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
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
                  :options="estatus"
                  lazy-rules
                  :rules="[reglasSelect]"
                >
                  <template v-slot:prepend>
                    <q-icon name="dialpad" />
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
      <q-card class="q-pa-md" bordered style="width: 999px">
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
                  @update:model-value="getDatosEstados(selectedPais)"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
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
                  @update:model-value="getDatosCiudades(selectedEstado)"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
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
                    <q-icon name="person" />
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
                  :rules="[reglasInputs]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
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
                >
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
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
                  :rules="reglaInputDireccion"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
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
                  :rules="reglasInputRifInt"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
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
                  :rules="reglasInputRifInt"
                >
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
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
                  :options="estatus"
                  class="pcform"
                  lazy-rules
                  :rules="[reglasSelect]"
                  
                >
                  <template v-slot:prepend>
                    <q-icon name="dialpad" />
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
      <div class="col-md-12 col-xl-9 col-lg-9 col-xs-12 col-sm-12">
        <div class="row">
          <div
            class="col-md-4 col-xs-12"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <h4>Mantenimiento - Agencias</h4>
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
              @click="create = true"
              @click.capture="resetForm"
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
                :loading="loadingTable"
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
                      @click="
                        selectedEdit = props.row.id;
                        getDatoEdit(selectedEdit);
                        edit = true;
                      "
                    ></q-btn>
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="delete"
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
                              @click="
                                selectedEdit = props.row.id;
                                getDatoEdit(selectedEdit);
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
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

export default {
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
          field: row => row.ciudades.desc_ciudad,
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
          name: "estatus_desc",
          label: "Estatus",
          field: "estatus_desc",
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
        {label: 'ACTIVA', value: 'A'},
        {label: 'INACTIVA', value: 'I'}
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
        val => (val !== null && val !== '') || 'Debes escribir algo',
        val => val.length < 50 || 'Deben ser máximo 50 caracteres'
      ],
      reglaInputDireccion: [
        val => val.length < 200 || 'Deben ser máximo 200 caracteres'
      ],
      reglasInputRifInt: [
        val => val.length < 20 || 'Deben ser máximo 20 caracteres'
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
    this.getDato();
    this.getDatosPaises();
  },
  methods: {
    textToUpper(val) {
      this.text = val.toUpperCase()
    },
    // Reglas
    reglasSelect(val) {
      if (val === null) {
        return 'Debes Seleccionar Algo'        
      }
    },//
    getDatosPaises() {
      api.get("/paises").then((res) => {
        this.paises = res.data;
      })
    },//
    getDatosEstados(selectedPais) {
      api.get(`/paises/${this.selectedPais.id}/estados`)
        .then((res) => {
          this.estados = res.data.estados;
          this.ciudades = []
          this.ciudades = []
          this.selectedEstado = null
          this.selectedCiudad = null
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor()
        });
    },//
    getDatosCiudades(selectedEstado) {
      api.get(`/estados/${this.selectedEstado.id}/ciudades`)
        .then((res) => {
          this.ciudades = res.data.ciudades;
          this.selectedCiudad= null
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },//
    getDato() {
      api.get("/agencias").then((res) => {
        this.datos = res.data;
      })
    },//
    getDatoEdit(selectedEdit) {
      api.get(`/agencias/${selectedEdit}`).then((res) => {
        this.formEdit.id = res.data.id
        this.formEdit.nb_agencia = res.data.nb_agencia
        this.formEdit.persona_contacto = res.data.persona_contacto
        this.formEdit.dir_agencia = res.data.dir_agencia
        this.formEdit.fax_agencia = res.data.fax_agencia
        this.formEdit.email_agencia = res.data.email_agencia
        this.formEdit.tlf_agencia = res.data.tlf_agencia
        this.formEdit.rif_agencia = res.data.rif_agencia
        this.formEdit.nit_agencia = res.data.nit_agencia
        this.formEdit.estatus = res.data.estatus_desc
        this.formEdit.cod_ciudad = res.data.cod_ciudad
        this.selectedCiudadEdit = res.data.ciudades.cod_estado
        this.ciudadEdit = res.data.ciudades.id
        this.getDatoEditCiudades()
        this.pintarCiudadesEdit()
      });
    },//
    pintarCiudadesEdit() {
      api.get(`/ciudades/${this.ciudadEdit}`).then((res) => {
        this.selectedCiudad = `${res.data.desc_ciudad}`;
        this.estadoEdit = res.data.cod_estado;
        this.pintarEstadosEdit();
      });
    },//
    pintarEstadosEdit() {
      api.get(`/estados/${this.estadoEdit}`).then((res) => {
        this.selectedEstado = res.data.desc_estado;
        this.paisEdit = res.data.cod_pais;
        this.pintarPaisesEdit();
      });
    },//
    pintarPaisesEdit() {
      api.get(`/paises/${this.paisEdit}`).then((res) => {
        this.selectedPais = res.data.desc_pais;
      });
    },//
    getDatoEditCiudades() {
      api.get(`/estados/${this.selectedCiudadEdit}/ciudades`)
        .then((res) => {
        this.ciudades = res.data.ciudades;
        this.selectedEstadoEdit = res.data.cod_pais;
        this.getDatoEditEstados()
        });
    },//
    getDatoEditEstados() {
      api.get(`/paises/${this.selectedEstadoEdit}/estados`)
        .then((res) => {
          this.estados = res.data.estados;
          this.selectedPaisEdit = res.data.cod_pais;
          this.getDatoEditPaises()
        });
    },//
    getDatoEditPaises() {
      api.get("/paises").then((res) => {
        this.paises = res.data;
      })
    },//
    deleteDato(idpost) {
      api.delete(`/agencias/${idpost}`)
        .then((res) => {
          if ((res.status = 201)) {
            this.eliminadoConExito();
            api.get("/agencias").then((res) => {
              this.datos = res.data;
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },//
    createDato() {
      this.form.cod_ciudad = this.selectedCiudad.id;
      this.form.estatus = this.form.estatus.value;
      api.post("/agencias/", this.form)
        .then((res) => {
          if ((res.status = 201)) {
            this.añadidoConExito();
            api.get("/agencias").then((res) => {
              this.datos = res.data;
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
      this.resetForm();
    },//
    putDato() {
      this.formEdit.cod_ciudad = this.selectedCiudad.id;
      this.formEdit.estatus = this.formEdit.estatus.value;
      api.put(`/agencias/${this.formEdit.id}`, this.formEdit)
        .then((res) => {
          if ((res.status = 201)) {
            this.editadoConExito();
            this.getDato()
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
        this.resetFormEdit();
    },//
    resetForm() {
      (this.selectedPais = null),
      (this.selectedEstado = null),
      (this.selectedCiudad = null),
      (this.form.persona_contacto = null),
      (this.form.nb_agencia = null),
      (this.form.persona_contacto = null),
      (this.form.dir_agencia = ''),
      (this.form.fax_agencia = null),
      (this.form.email_agencia = null),
      (this.form.tlf_agencia = null),
      (this.form.rif_agencia = ''),
      (this.form.nit_agencia = ''),
      (this.form.estatus = null),
      (this.create = null),
      nb_agencia.value.resetValidation();
      persona_contacto.value.resetValidation();
      dir_agencia.value.resetValidation();
      fax_agencia.value.resetValidation();
      email_agencia.value.resetValidation();
      tlf_agencia.value.resetValidation();
      rif_agencia.value.resetValidation();
      nit_agencia.value.resetValidation();
      estatus.value.resetValidation();
    },//
    resetFormEdit() {
      (this.selectedPais = null),
      (this.selectedEstado = null),
      (this.selectedCiudad = null),
      (this.formEdit.persona_contacto = null),
      (this.formEdit.nb_agencia = null),
      (this.formEdit.persona_contacto = null),
      (this.formEdit.dir_agencia = null),
      (this.formEdit.fax_agencia = null),
      (this.formEdit.email_agencia = null),
      (this.formEdit.tlf_agencia = null),
      (this.formEdit.rif_agencia = null),
      (this.formEdit.nit_agencia = null),
      (this.formEdit.estatus = null),
      (this.edit = null),
      nb_agencia.value.resetValidation();
      persona_contacto.value.resetValidation();
      dir_agencia.value.resetValidation();
      fax_agencia.value.resetValidation();
      email_agencia.value.resetValidation();
      tlf_agencia.value.resetValidation();
      rif_agencia.value.resetValidation();
      nit_agencia.value.resetValidation();
      estatus.value.resetValidation();
    },//
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
