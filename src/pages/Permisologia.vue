<template>
  <q-page class="q-pa-md">
    <q-dialog v-model="permisosForm">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="createData()" class="q-gutter-md">
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
              @update:model-value="
                getData(
                  `/agencias/${this.selectedAgencia.id}/roles`,
                  'setDataRoles',
                  'rolesPermisos'
                )
              "
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
              @update:model-value="
                getData(
                  `/roles/${this.selectedRol.id}/permisos`,
                  'setDataPermisos',
                  'permisos'
                )
              "
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
              @click="eliminarDuplicados"
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
                      :disabled="this.disabledDelete"
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
                              :disabled="this.disabledDelete"
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
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <user-logout ref="userlogout"
      @desactivar-Crud-Permisologia="desactivarCrudPermisologia"
    ></user-logout>
    <methods ref="methods"
      @get-Data-Permisos="getData(`/roles/${this.selectedRol.id}/permisos`, 'setDataPermisos','permisos')"
      @set-data-Roles="setDataRoles"
      @set-data-Permisos="setDataPermisos"
      @set-Data="setData"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import userLogoutVue from "src/components/userLogout.vue";

import methodsVue from "src/components/methods.vue";

import { LocalStorage } from 'quasar';

export default {
  components: { "user-logout": userLogoutVue,
  "methods": methodsVue },
  name: "Permisologia",
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
          id: 8,
          codigo: "m_cuentasbancarias",
          cod_rol: 1,
        },
        {
          id: 9,
          codigo: "m_cuentasporcobrar",
          cod_rol: 1,
        },
      ],
      permisos: [],
      agencias: [],
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
          id: "1",
        },
        {
          codigo: "Editar Agencia",
          cod_rol: "43",
          id: "2",
        },
        {
          codigo: "Eliminar Agencia",
          cod_rol: "2",
          id: "3",
        },
        {
          codigo: "Leer Agencia",
          cod_rol: "4",
          id: "4",
        },
        {
          codigo: "Solicitar Agencia",
          cod_rol: "3",
          id: "5",
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
      items: 0,
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
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
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
        }
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      reglasCodigo: [
        (val) => (val !== null && val !== "") || "Por favor escribe algo",
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
      sinPermisos() {
        $q.notify({
          message: "No hay más permisos que agregar...",
          color: "red",
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
    this.getData("/agencias", "setData", "agencias");
    this.$refs.userlogout.desactivarCrud('c_permisos', 'd_permisos', 'u_permisos', 'desactivarCrudPermisologia')
  },
  methods: {
    // Reglas
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
    },
    verificatePermisos() {
      if (this.items === this.objetos.length) {
        this.sinPermisos()
      };
      if (this.items < this.objetos.length) {
        this.permisosForm = true
      };
      this.items = 0
    },
    desactivarCrudPermisologia(createItem, deleteItem, updateItem) {
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
      this[dataRes] = res;
      if (dataRes == "agencias") {
        this.getData("/objetos", "setData", "objetos");
        this.getDataIniciar();
      }
    },
    // Metodos para permisos
    setDataRoles(res, dataRes) {
      this[dataRes] = res.roles;
      this.selectedRol = "";
    },
    setDataPermisos(res, dataRes) {
      this[dataRes] = res.permisos;
      this.permisosDuplicados = res.permisos;
    },

    deleteData(selected) {
      this.$refs.methods.deleteData(
        `/permisos/${selected}`,
        "getDataPermisos"
      );
    },
    createData() {
      this.formPermisos.cod_rol = this.selectedRol.id;
      this.formPermisos.codigo = this.formPermisos.codigo.codigo;
      this.$refs.methods.createData(
        `/permisos`,
        this.formPermisos,
        "getDataPermisos"
      );
      this.resetFormPermisos();
    },
    createDatoPermisos() {
      this.formPermisos.cod_rol = this.selectedRol.id;
      this.formPermisos.codigo = this.formPermisos.codigo.codigo;
      api
        .post(`/permisos`, this.formPermisos)
        .then((res) => {
          if ((res.status = 201)) {
            this.getDatosPermisos();
            this.añadidoConExito();
          }
        })
        .catch((err) => {
          if (err.response.data.statusCode === 409) {
            this.error =
              "El permiso que intenta agregar ya existe en el Rol Seleccionado.";
            this.errorDelServidor();
          }
          if (err.response.data.statusCode === 400) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
            this.errorDelServidor();
          }
          if (err.response.data.statusCode === 500) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
            this.errorDelServidor();
          }
        });
      this.resetFormPermisos();
    },
    resetFormPermisos() {
      (this.formPermisos.codigo = null),
        (this.formPermisos.cod_rol = null),
        (this.permisosForm = false);
    },
    // Metodos para colocar valores iniciales
    getDataIniciar() {
      this.selectedAgencia = this.agencias[0];
      this.agenciaRef = this.agencias[0].id;
      api.get(`/agencias/${this.agenciaRef}/roles`, this.axiosConfig)
      .then((res) => {
        this.selectedRol = res.data.roles[0];
        this.rolesPermisos = res.data.roles;
        this.rolesRef = res.data.roles[0].id;

        api.get(`/roles/${this.rolesRef}/permisos`, this.axiosConfig)
        .then((res) => {
          this.permisos = res.data.permisos;
          this.permisosDuplicados = res.data.permisos;
        });
      });
    },
    eliminarDuplicados() {
      this.objetosNoDuplicados = JSON.parse(JSON.stringify(this.objetos));
      for (var e = 0, len = this.permisos.length; e < len; e++) {
        for (var i = 0, len = this.objetos.length; i < len; i++) {
          if (this.objetos[i].codigo === this.permisos[e].codigo) {
            delete this.objetosNoDuplicados[i];
            this.items = this.items + 1
          }
          if (i == this.objetos.length - 1) break;
        }
        if (e == this.permisos.length - 1) break;
      };
      this.verificatePermisos();
    },
  },
};
</script>
