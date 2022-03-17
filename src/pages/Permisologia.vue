<template>
  <q-page class="q-pa-md">
    <q-dialog v-model="permisosForm">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="createDatoPermisos()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-select
                  outlined
                  v-model="formPermisos.codigo"
                  label="Permisos"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="objetosNoDuplicados"
                  option-label="codigo"
                  option-value="codigo"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Permiso"
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
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12"
            style="align-self: center; text-align: center"
          >
            <h4 style="font-size: 30px">Seguridad - Permisología</h4>
          </div>

          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputestadospc"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="agencias"
              option-label="nb_agencia"
              option-value="id"
              v-model="selectedAgencia"
              outlined
              standout
              label="Escoge una Agencia"
              @update:model-value="getDatosRolesSelect2(selectedAgencia)"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>

          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputestadospc2"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="rolesPermisos"
              option-label="descripcion"
              option-value="id"
              v-model="selectedRol"
              outlined
              standout
              label="Escoge un Rol"
              @update:model-value="getDatosPermisos(selectedRol)"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>
          <div
            class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar"
              rounded
              color="primary"
              @click="permisosForm = true"
              @click.capture="eliminarDuplicados"
              size="16px"
              class="q-px-xl q-py-xs insertarestadosmovil"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md" style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
              <q-table
                :rows="permisos"
                row-key="id"
                :columns="columnsPermisos"
                :separator="separator"
                class="my-sticky-column-table"
                :loading="loadingTable"
                :filter="filterPermisos"
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
                      icon="delete"
                      @click="selected = props.row.id"
                      @click.capture="permisosDelete = true"
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
                              icon="delete"
                              @click="selected = props.row.id"
                              @click.capture="permisosDelete = true"
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

    <q-dialog v-model="permisosDelete">
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
            @click.capture="contactoEliminado"
            @click="deleteDatoPermisos(selected)"
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
import i18n from 'src/i18n';

export default {
  name: "Bancos",
  data() {
    return {
      columnsPermisos: [
        {
          name: "id",
          label: "Código",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "codigo",
          label: "Permisos",
          field: "codigo",
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
      selectedEditRol: [
    {
      "id": 8,
      "codigo": "m_cuentasbancarias",
      "cod_rol": 1
    },
    {
      "id": 9,
      "codigo": "m_cuentasporcobrar",
      "cod_rol": 1
    },
    ],
      permisos: [],
      permisosDuplicados: [],
      roles: [],
      rolesPermisos: [],
      formPermisos: {
        codigo: "",
        cod_rol: "",
      },
      formEditPermisos: {
        codigo: "",
        cod_rol: "",
        id: "",
      },
      pruebaPermisos: [
        {
        codigo: "Agregar Agencia",
        cod_rol: "23",
        id: "1"
        },
        {
        codigo: "Editar Agencia",
        cod_rol: "43",
        id: "2"
        },
        {
        codigo: "Eliminar Agencia",
        cod_rol: "2",
        id: "3"
        },
        {
        codigo: "Leer Agencia",
        cod_rol: "4",
        id: "4"
        },
        {
        codigo: "Solicitar Agencia",
        cod_rol: "3",
        id: "5"
        },
      ],
      objetos: [],
      objetosNoDuplicados: [],
      selected: [],
      selectedAgencia: [],
      selectedRol: [],
      agenciaRef: "",
      rolesRef: "",
      error: "",
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      control: 0,
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      reglasCodigo: [(val) =>
        (val !== null && val !== "") || "Por favor escribe algo",
        (val) => val.length < 25 || "Deben ser máximo 25 caracteres",
        (val) => val.length > 3 || "Deben ser minimo 3 caracteres",
      ],
      permisosForm: ref(false),
      permisosFormEdit: ref(false),
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
      permisosDelete: ref(false),
      filterPermisos: ref(""),
    };
  },
  mounted() {
    this.getDatosAgencias();
    this.getDatosRoles();
    this.getDatosAgenciasIniciar();
    this.getDatosObjetos()
  },
  methods: {
    // Reglas
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
    },
    // Metodos para agencias
    getDatosAgencias() {
      api.get("/agencias").then((res) => {
        this.agencias = res.data;
      });
    },
    getDatosRoles() {
      api.get("/roles").then((res) => {
        this.roles = res.data;
      });
    },
    getDatosObjetos() {
      api.get("/objetos").then((res) => {
        this.objetos = res.data;
      });
    },
    // Metodos para permisos
    getDatosRolesSelect2(selectedAgencia) {
      api
        .get(`/agencias/${this.selectedAgencia.id}/roles`)
        .then((res) => {
          this.rolesPermisos = res.data.roles;
          this.selectedRol = "";
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
    },
    getDatosPermisos(selectedRol) {
      api.get(`/roles/${this.selectedRol.id}/permisos`)
        .then((res) => {
          this.permisos = res.data.permisos;
          this.permisosDuplicados = res.data.permisos;
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
    },
    deleteDatoPermisos(idpost) {
      api.delete(`/permisos/${idpost}`)
        .then((res) => {
          if ((res.status = 201)) {
            this.eliminadoConExito();
            this.getDatosPermisos();
          }
        })
        .catch((err) => {
          if ((err.response.data.statusCode === 400)) {
            this.error = "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema"
            this.errorDelServidor();
          }
          if ((err.response.data.statusCode === 500)) {
            this.error = "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema"
            this.errorDelServidor();
          }
        });
    },
    createDatoPermisos() {
      this.formPermisos.cod_rol = this.selectedRol.id;
      this.formPermisos.codigo = this.formPermisos.codigo.codigo;
      api.post(`/permisos`, this.formPermisos)
        .then((res) => {
          if ((res.status = 201)) {
            this.getDatosPermisos();
            this.añadidoConExito();
          }
        })
        .catch((err) => {
          if ((err.response.data.statusCode === 409)) {
            this.error = "El permiso que intenta agregar ya existe en el Rol Seleccionado."
            this.errorDelServidor();
          }
          if ((err.response.data.statusCode === 400)) {
            this.error = "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema"
            this.errorDelServidor();
          }
          if ((err.response.data.statusCode === 500)) {
            this.error = "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema"
            this.errorDelServidor();
          }
        });
      this.resetFormPermisos();
    },
    resetFormPermisos() {
        (this.formPermisos.codigo = null),
        (this.formPermisos.cod_rol = null),
        (this.permisosForm = false)
    },
    resetFormEditPermisos() {
      (this.formEditPermisos.codigo = null),
      (this.formEditPermisos.cod_rol = null),
      (this.permisosFormEdit = false)
    },
    // Metodos para colocar valores iniciales
    getDatosAgenciasIniciar() {
      api
        .get(`/agencias`)
        .then((res) => {
          this.selectedAgencia = res.data[0];
          this.agenciaRef = res.data[0].id;
          this.getDatosRolesIniciar2();
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
    },
    getDatosRolesIniciar2() {
      api
        .get(`/agencias/${this.agenciaRef}/roles`)
        .then((res) => {
          this.selectedRol = res.data.roles[0];
          this.rolesPermisos = res.data.roles;
          this.rolesRef = res.data.roles[0].id;
          this.getDatosPermisosIniciar();
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
    },
    getDatosPermisosIniciar() {
      api.get(`/roles/${this.rolesRef}/permisos`)
        .then((res) => {
          this.permisos = res.data.permisos;
          this.permisosDuplicados = res.data.permisos;
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
    },
    eliminarDuplicados() {
    this.objetosNoDuplicados = JSON.parse(JSON.stringify(this.objetos))
    for (var e = 0, len = this.permisos.length; e<len; e++) {
      for (var i = 0, len = this.objetos.length; i<len; i++) {
        if (this.objetos[i].codigo === this.permisos[e].codigo) 
        {
          delete this.objetosNoDuplicados[i]
        }
        if (i == this.objetos.length - 1) break
      };
    if (e == this.permisos.length - 1) break
    }
    }
  },
};
</script>