<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="usuariosForm">
      <q-card class="q-pa-md" bordered style="max-width: 60vw">
        <q-card-section>
          <q-form @submit="createDataUsuarios()" class="q-gutter-md" autocomplete="off">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formUsuarios.login"
                  label="Login"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formUsuarios.login =
                      formUsuarios.login.toUpperCase()
                  "
                  lazy-rules
                  :rules="reglasLogin"
                >
                  <template v-slot:prepend>
                    <q-icon name="login" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="formUsuarios.password"
                  label="Contraseña"
                  :type="isPwd ? 'password' : 'text'"
                  lazy-rules
                  :rules="reglasPassword"
                >
                  <template v-slot:prepend>
                    <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  class="pcform"
                  v-model="formUsuarios.nombre"
                  label="Nombre"
                  hint=""
                  @update:model-value="
                    formUsuarios.nombre =
                      formUsuarios.nombre.toUpperCase()
                  "
                  lazy-rules
                  :rules="reglasNombre"
                >
                  <template v-slot:prepend>
                    <q-icon name="face" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="formUsuarios.activo"
                  label="Vigente"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="vigente"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="rule" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  class="pcform"
                  outlined
                  v-model="formUsuarios.cod_agencia"
                  label="Agencia"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="agenciasSelected"
                @filter="(val,update,abort) => 
                filterArray(val,update,abort,'agenciasSelected', 'agencias', 'nb_agencia')"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                  option-label="nb_agencia"
                  option-value="id"
                  lazy-rules
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  @update:model-value="this.axiosConfig.headers.agencia = this.formUsuarios.cod_agencia.id;
                  getData(`/roles`, 'setDataRoles', 'roles')"
                ><template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                Sin resultados
                              </q-item-section>
                            </q-item>
                          </template>
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="formUsuarios.cod_rol"
                  label="Rol Desempeñado"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="roles"
                  option-label="descripcion"
                  option-value="id"
                  lazy-rules
                  transition-show="flip-up"
                  transition-hide="flip-down"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Usuario"
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
                @click="resetFormUsuarios"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="usuariosFormEdit">
      <q-card class="q-pa-md" bordered style="max-width: 60vw" >
        <q-card-section>
          <q-form @submit="putDataUsuarios()" autocomplete="off">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditUsuarios.login"
                  label="Login"
                  hint=""
                  readonly
                  @update:model-value="
                    formEditUsuarios.login =
                      formEditUsuarios.login.toUpperCase()
                  "
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="login" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  class="pcform"
                  v-model="formEditUsuarios.nombre"
                  label="Nombre"
                  hint=""
                  @update:model-value="
                    formEditUsuarios.nombre =
                      formEditUsuarios.nombre.toUpperCase()
                  "
                  lazy-rules
                  :rules="reglasNombre"
                >
                  <template v-slot:prepend>
                    <q-icon name="face" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="formEditUsuarios.activo"
                  label="Vigente"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="vigente"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="rule" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  class="pcform"
                  outlined
                  v-model="formEditUsuarios.cod_agencia"
                  label="Agencia"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="agenciasSelected"
                @filter="(val,update,abort) => 
                filterArray(val,update,abort,'agenciasSelected', 'agencias', 'nb_agencia')"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                  option-label="nb_agencia"
                  option-value="id"
                  lazy-rules
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  @update:model-value="this.axiosConfig.headers.agencia = this.formEditUsuarios.cod_agencia.id;
                  getData(`/roles`, 'setDataRoles', 'roles')"
                ><template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                Sin resultados
                              </q-item-section>
                            </q-item>
                          </template>
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="formEditUsuarios.cod_rol"
                  label="Rol Desempeñado"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="roles"
                  option-label="descripcion"
                  option-value="id"
                  lazy-rules
                  transition-show="flip-up"
                  transition-hide="flip-down"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Usuario"
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
                @click="resetFormEditUsuarios"
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
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 text-secondary"
            style="align-self: center; text-align: center"
          >
            <h4 style="font-size: 30px"><strong>SEGURIDAD - USUARIOS</strong></h4>
          </div>

          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputestadospc"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="agenciasSelected"
                @filter="(val,update,abort) => 
                filterArray(val,update,abort,'agenciasSelected', 'agencias', 'nb_agencia')"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
              option-label="nb_agencia"
              option-value="id"
              v-model="selectedAgencia"
              outlined
              standout
              label="Escoge una Agencia"
              @update:model-value="this.axiosConfig.headers.agencia = this.selectedAgencia.id;
              getDataUsuarios(`/usuarios`, 'setDataUsuarios', 'usuarios')"
            ><template v-slot:no-option>
                            <q-item>
                              <q-item-section class="text-grey">
                                Sin resultados
                              </q-item-section>
                            </q-item>
                          </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>

          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputestadospc2"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-input
              rounded
              outlined
              standout
              v-model="filterUsuarios"
              type="search"
              label="Búsqueda avanzada"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
          <div
            class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar"
              rounded
              color="primary"
              :disabled="this.disabledCreate"
              @click="usuariosForm = true"
              @click.capture="resetFormUsuarios()"
              size="16px"
              class="q-px-xl q-py-xs insertarestadosmovil"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md" style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
              <q-table
                :rows="usuarios"
                row-key="id"
                binary-state-sort
                :columns="columnsUsuarios"
                :separator="separator"
                :loading="loading"
                
                :filter="filterUsuarios"
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
                      getData(`/usuarios/${props.row.login}`, 'setDataUsuariosEdit', 'formEditUsuarios');
                      usuariosFormEdit = true;
                      "
                    ></q-btn>
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="delete"
                      :disabled="this.disabledDelete"
                      @click="selected = props.row.login"
                      @click.capture="usuariosDelete = true"
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
                                getData(`/usuarios/${props.row.login}`, 'setDataUsuariosEdit', 'formEditUsuarios');
                                usuariosFormEdit = true;
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
                              @click.capture="usuariosDelete = true"
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

    <q-dialog v-model="usuariosDelete">
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
      @get-Data="this.axiosConfig.headers.agencia = this.selectedAgencia.id;
      getData(`/usuarios`, 'setDataRoles', 'usuarios')"
      @get-Data-Usuarios="this.axiosConfig.headers.agencia = this.selectedAgencia.id;
      getDataUsuarios(`/usuarios`, 'setDataUsuarios', 'usuarios')"
      @set-Data-Usuarios="setDataUsuarios"
      @reset-Loading="resetLoading"
      @set-Data-Usuarios-Edit="setDataUsuariosEdit"
      @set-Data-Roles="setDataRoles"
      @set-Data-Roles-Iniciar="setDataRolesIniciar"
      @set-Data="setData"
    ></methods>
    <desactivate-crud ref="desactiveCrud"
      @desactivar-Crud="desactivarCrud"
    ></desactivate-crud>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { LocalStorage } from 'quasar';

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import methodsVue from 'src/components/methods.vue';

import desactivateCrudVue from 'src/components/desactivateCrud.vue';

export default {
  components: { "desactivate-crud": desactivateCrudVue,
  "methods": methodsVue },
  name: "Bancos",
  data() {
    return {
      columnsUsuarios: [
        {
          name: "login",
          label: "Login",
          field: "login",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nombre",
          label: "Nombre",
          field: "nombre",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "roles",
          label: "Rol Desempeñado",
          field: (row) => row.roles.descripcion,
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "estatus_desc",
          label: "Vigente",
          field: "estatus_desc",
          align: "left",
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
      formUsuarios: {
        login: "",
        nombre: "",
        activo: "",
        cod_rol: [],
        password: "",
        cod_agencia: [],
      },
      formEditUsuarios: {
        login: "",
        nombre: "",
        activo: "",
        cod_rol: "",
        id: "",
        cod_agencia: "",
      },
      vigente: [
        { label: "ACTIVO", value: "1" },
        { label: "INACTIVO", value: "0" },
      ],
      agencias: [],
      roles: [],
      usuarios: [],
      selected: [],
      selectedAgencia: [],
      agenciasSelected: [],
      agenciaRef: "",
      agenciaRef2: "",
      error: "",
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
          Authorization: ``,
          agencia: ""
        }
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      password: ref(''),
      loading: ref(false),
      isPwd: ref(true),
      usuariosForm: ref(false),
      usuariosFormEdit: ref(false),
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
      usuariosDelete: ref(false),
      filterUsuarios: ref(""),
      reglasLogin: [(val) =>
          (val !== null && val !== "") || "Por favor escribe algo",
        (val) => val.length < 12 || "Deben ser máximo 11 caracteres",
        (val) => val.length >= 3 || "Deben ser minimo 3 caracteres",
      ],
      reglasPassword: [(val) =>
        (val !== null && val !== "") || "Por favor escribe algo",
        (val) => val.length <= 10 || "Deben ser máximo 10 caracteres",
        (val) => val.length >= 3 || "Deben ser minimo 3 caracteres",
      ],
      reglasNombre: [(val) =>
          (val !== null && val !== "") || "Por favor escribe algo",
        (val) => val.length <= 50 || "Deben ser máximo 50 caracteres",
        (val) => val.length >= 3 || "Deben ser minimo 3 caracteres",
      ],
    };
  },
  mounted() {
    this.getData('/agencias', 'setData', 'agencias');
    this.$refs.desactiveCrud.desactivarCrud('c_usuarios', 'r_usuarios', 'u_usuarios', 'd_usuarios', 'desactivarCrud')
  },
  methods: {
    filterArray(val, update, abort, pagina, array, element) {
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
    resetLoading() {
      this.loading = false;
    },
    // Reglas
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    desactivarCrud(createItem, readItem, deleteItem, updateItem) {
      if (readItem == true) {
        if (createItem == true) {
        this.disabledCreate = false
      }
        if (deleteItem == true) {
        this.disabledDelete = false
      }
        if (updateItem == true) {
        this.disabledEdit = false
      }
      } else this.$router.push("/error403");
    },
    getData(url, call, dataRes) {
    this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    getDataUsuarios(url, call, dataRes) {
    this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    this.loading = true;
    },
    setData(res, dataRes) {
      this[dataRes] = res
      this.getDatosIniciar();
      this.loading = false
    },
    setDataUsuarios(res, dataRes) {
      this[dataRes] = res;
      this.loading = false
    },
    setDataRoles(res, dataRes) {
      this[dataRes] = res
      this.formEditUsuarios.cod_rol = ''
      this.loading = false
    },
    setDataUsuariosEdit(res, dataRes) {
      this[dataRes].login = res.login;
      this[dataRes].nombre = res.nombre;
      this[dataRes].id = res.id;
      this[dataRes].cod_rol = res.roles.descripcion;
      this[dataRes].activo = res.activo_desc;
      this[dataRes].cod_agencia = this.selectedAgencia;
      this.axiosConfig.headers.agencia = this.formEditUsuarios.cod_agencia.id;
      this.getData(`/roles`, 'setDataRolesIniciar', 'roles')
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/usuarios/${idpost}`, 'getDataUsuarios', this.axiosConfig);
      this.loading = true;
    },
    createDataUsuarios() {
      this.formUsuarios.activo = this.formUsuarios.activo.value;
      this.formUsuarios.cod_rol = this.formUsuarios.cod_rol.id;
      this.formUsuarios.cod_agencia = this.formUsuarios.cod_agencia.id;
      this.$refs.methods.createData(`/usuarios`, this.formUsuarios, 'getDataUsuarios', this.axiosConfig);
      this.usuariosForm = false;
      this.loading = true;
    },
    putDataUsuarios() {
      this.formEditUsuarios.activo = this.formEditUsuarios.activo.value;
      this.formEditUsuarios.cod_rol = this.formEditUsuarios.cod_rol.id;
      this.formEditUsuarios.cod_agencia = this.formEditUsuarios.cod_agencia.id;
      this.$refs.methods.putData(`/usuarios/${this.formEditUsuarios.login}`, this.formEditUsuarios, 'getDataUsuarios', this.axiosConfig);
      this.resetFormEditUsuarios();
      this.loading = true;
    }, 
    resetFormUsuarios() {
      (this.formUsuarios.nombre = null),
      (this.formUsuarios.login = null),
      (this.formUsuarios.cod_rol = null),
      (this.formUsuarios.activo = null),
      (this.formUsuarios.password = null),
      (this.formUsuarios.cod_agencia = null),
      (this.usuariosForm = false)
    },
    resetFormEditUsuarios() {
      (this.formEditUsuarios.nombre = null),
      (this.formEditUsuarios.login = null),
      (this.formEditUsuarios.cod_rol = null),
      (this.formEditUsuarios.activo = null),
      (this.formUsuarios.password = null),
      (this.formUsuarios.cod_agencia = null),
      (this.usuariosFormEdit = false)
    },

    // Metodos para colocar valores iniciales
    getDatosIniciar() {
        this.agenciaRef2 = this.agencias[0].id;
        this.selectedAgencia = this.agencias[0];
        this.axiosConfig.headers.agencia = this.agenciaRef2
        api.get(`/roles`, this.axiosConfig)
        .then((res) => {
          this.roles = res.data;
        })
        api.get(`/usuarios`, this.axiosConfig)
        .then((res) => {
          this.usuarios = res.data;
        })
    },
    setDataRolesIniciar(res, dataRes) {
      this[dataRes] = res
      this.loading = false
    },
  },
};
</script>
