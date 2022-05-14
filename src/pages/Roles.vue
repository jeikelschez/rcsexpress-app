<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="rolesForm">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="createDataRoles()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formRoles.descripcion"
                  label="Descripcion"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formRoles.descripcion =
                      formRoles.descripcion.toUpperCase()
                  "
                  lazy-rules
                  :rules="reglasDescripcion"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="formRoles.cod_agencia"
                  label="Agencia"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="agencias"
                  option-label="nb_agencia"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Rol"
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

    <q-dialog v-model="rolesFormEdit">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="putDataRoles()">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditRoles.descripcion"
                  label="Descripción"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEditRoles.descripcion =
                      formEditRoles.descripcion.toUpperCase()
                  "
                  lazy-rules
                  :rules="reglasDescripcion"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="formEditRoles.cod_agencia"
                  label="Agencia"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="agencias"
                  option-label="nb_agencia"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Rol"
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
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 text-secondary"
            style="align-self: center; text-align: center"
          >
            <h4 style="font-size: 30px"><strong>SEGURIDAD - ROLES</strong></h4>
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
              @update:model-value="getData(`/agencias/${this.selectedAgencia.id}/roles`, 'setDataRoles', 'roles')"
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
            <q-input
              rounded
              outlined
              standout
              v-model="filterRoles"
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
              @click="rolesForm = true"
              @click.capture="resetFormRoles()"
              size="16px"
              class="q-px-xl q-py-xs insertarestadosmovil"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md" style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
              <q-table
                :rows="roles"
                row-key="id"
                :columns="columnsRoles"
                :separator="separator"
                class="my-sticky-column-table"
                :filter="filterRoles"
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
                      getData(`/roles/${props.row.id}`, 'setDataRolesEdit', 'formEditRoles');
                      rolesFormEdit = true;
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
                      @click.capture="rolesDelete = true"
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
                                getData(`/roles/${props.row.id}`, 'setDataRolesEdit', 'formEditRoles');
                                rolesFormEdit = true;
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
                              @click.capture="rolesDelete = true"
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

    <q-dialog v-model="rolesDelete">
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
    <desactivate-crud ref="desactiveCrud"
      @desactivar-Crud-Roles="desactivarCrudRoles"
    ></desactivate-crud>
    <methods ref="methods"
      @get-Data="getData(`/agencias/${this.selectedAgencia.id}/roles`, 'setDataRoles', 'roles')"
      @set-Data-Roles="setDataRoles"
      @set-Data-Roles-Edit="setDataRolesEdit"
      @set-Data="setData"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { LocalStorage } from 'quasar';

import methodsVue from 'src/components/methods.vue';

import desactivateCrudVue from 'src/components/desactivateCrud.vue';

export default {
  components: { "desactivate-crud": desactivateCrudVue,
  "methods": methodsVue},
  name: "Bancos",
  data() {
    return {
      columnsRoles: [
        {
          name: "id",
          label: "ID",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "descripcion",
          label: "Roles",
          field: "descripcion",
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
      formRoles: {
        descripcion: "",
        cod_agencia: [],
      },
      formEditRoles: {
        descripcion: "",
        id: "",
        cod_agencia: [],
      },
      agencias: [],
      roles: [],
      selected: [],
      selectedAgencia: [],
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
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
        }
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      rolesForm: ref(false),
      rolesFormEdit: ref(false),
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
      rolesDelete: ref(false),
      filterRoles: ref(""),
      reglasDescripcion: [(val) =>
        (val !== null && val !== "") || "Por favor escribe algo",
        (val) => val.length < 30 || "Deben ser máximo 30 caracteres",
        (val) => val.length > 2 || "Deben ser minimo 3 caracteres",
      ],
    };
  },
  mounted() {
    this.getData('/agencias', 'setData', 'agencias');
    this.$refs.desactiveCrud.desactivarCrud('c_roles', 'd_roles', 'u_roles', 'desactivarCrudRoles')
  },
  methods: {
    // Reglas
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    desactivarCrudRoles(createItem, deleteItem, updateItem) {
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
      this.getDataIniciar();
    },
    setDataRoles(res, dataRes) {
      this[dataRes] = res.roles
    },
    setDataRolesEdit(res, dataRes) {
      this[dataRes].id = res.id
      this[dataRes].descripcion = res.descripcion
      this[dataRes].cod_agencia = this.selectedAgencia
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/roles/${idpost}`, 'getData');
    },
    createDataRoles() {
      this.formRoles.cod_agencia = this.formRoles.cod_agencia.id
      this.$refs.methods.createData(`/roles`, this.formRoles, 'getData');
      this.resetFormRoles();
    },
    putDataRoles() {
      this.formEditRoles.cod_agencia = this.formEditRoles.cod_agencia.id
      this.$refs.methods.putData(`/roles/${this.formEditRoles.id}`, this.formEditRoles, 'getData');
      this.resetFormEditRoles()
    },
    resetFormRoles() {
      (this.formRoles.descripcion = ""),
      (this.formRoles.cod_agencia = ""),
      (this.rolesForm = false)
    },
    resetFormEditRoles() {
      (this.formEditRoles.descripcion = null),
      (this.formEditRoles.cod_agencia = null),
      (this.rolesFormEdit = false)
    },
    // Metodos para colocar valores iniciales
    getDataIniciar() {
        this.agenciaRef2 = this.agencias[0].id;
        this.selectedAgencia = this.agencias[0];
        api.get(`/agencias/${this.agenciaRef2}/roles`, this.axiosConfig)
        .then((res) => {
          this.roles = res.data.roles;
        })
    },
  },
};
</script>
