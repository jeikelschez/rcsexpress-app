<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="permisosForm">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="createData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-select outlined v-model="formPermisos.codigo" label="Permisos" hint="" :rules="[reglasInputs]"
                  :options="objetosNoDuplicadosSelected" @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'objetosNoDuplicadosSelected',
                        'objetosNoDuplicados',
                        'codigo'
                      )
                  " use-input hide-selected fill-input input-debounce="0" option-label="codigo" option-value="codigo"
                  lazy-rules><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="settings" />
                  </template>
                </q-select>
              </div>
            </div>

            <div class="full-width row justify-center items-center content-center" style="margin-bottom: 10px">
              <q-btn label="Agregar Permiso" type="submit" color="primary" class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add" />
              <q-btn label="Cerrar" color="primary" flat class="col-md-5 col-sm-5 col-xs-12 btnmovil" icon="close"
                v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="row">
          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 text-secondary"
            style="align-self: center; text-align: center">
            <h4 style="font-size: 30px">
              <strong>SEGURIDAD - PERMISOLOGÍA</strong>
            </h4>
          </div>

          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputestadospc"
            style="align-self: center; text-align: center; margin-right: 16px">
            <q-select rounded transition-show="flip-up" transition-hide="flip-down" :options="agenciasSelected" @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'agenciasSelected',
                  'agencias',
                  'nb_agencia'
                )
            " use-input hide-selected fill-input input-debounce="0" option-label="nb_agencia" option-value="id"
              v-model="selectedAgencia" outlined standout label="Escoge una Agencia" @update:model-value="
                getData(`/roles`, 'setDataRoles', 'rolesPermisos', {
                  headers: {
                    agencia: this.selectedAgencia.id,
                  },
                });
                this.permisos = [];
              "><template v-slot:no-option>
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

          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputestadospc2"
            style="align-self: center; text-align: center; margin-right: 16px">
            <q-select rounded transition-show="flip-up" transition-hide="flip-down" :options="rolesPermisosSelected"
              @filter="
                (val, update, abort) =>
                  filterArray(
                    val,
                    update,
                    abort,
                    'rolesPermisosSelected',
                    'rolesPermisos',
                    'descripcion'
                  )
              " use-input hide-selected fill-input input-debounce="0" option-label="descripcion" option-value="id"
              v-model="selectedRol" outlined standout label="Escoge un Rol" @update:model-value="
                getData(`/permisos`, 'setDataPermisos', 'permisos')
              "><template v-slot:no-option>
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
          <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12" style="text-align: center; align-self: center">
            <q-btn label="Insertar" rounded color="primary" size="16px" class="q-px-xl q-py-xs insertarestadosmovil">
            </q-btn>
          </div>
        </div>

        <div class="q-pa-md" style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
              <q-table :rows="menus" row-key="id" :columns="columnsPermisos" :loading="loading" binary-state-sort
                :separator="separator" :filter="filterPermisos" style="width: 100%" :grid="$q.screen.xs"
                v-model:pagination="pagination" hide-bottom>
                <template v-slot:loading>
                  <q-inner-loading showing color="primary" />
                </template>
                <template v-slot:body-cell-leer="props">
                  <q-td :props="props">
                    <q-checkbox v-model="props.row.acciones[0].rpermisos" />
                  </q-td>
                </template>
                <template v-slot:body-cell-crear="props">
                  <q-td :props="props">
                    <q-checkbox v-model="props.row.acciones[1].rpermisos" />
                  </q-td>
                </template>
                <template v-slot:body-cell-editar="props">
                  <q-td :props="props">
                    <q-checkbox v-model="props.row.acciones[2].rpermisos" />
                  </q-td>
                </template>
                <template v-slot:body-cell-eliminar="props">
                  <q-td :props="props">
                    <q-checkbox v-model="props.row.acciones[3].rpermisos" />
                  </q-td>
                </template>
                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <q-btn dense round flat color="primary" icon="delete" :disabled="this.allowOption(4)"
                      @click="selected = props.row.id" @click.capture="permisosDelete = true"></q-btn>
                  </q-td>
                </template>
                <template v-slot:item="props">
                  <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                    :style="props.selected ? 'transform: scale(0.95);' : ''">
                    <q-card :class="props.selected ? 'bg-grey-2' : ''">
                      <q-list dense>
                        <q-item v-for="col in props.cols" :key="col.name">
                          <q-item-section>
                            <q-item-label>{{ col.label }}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-chip v-if="col.name === 'status'" :color="
                              props.row.status == 'Active'
                                ? 'green'
                                : props.row.status == 'Disable'
                                ? 'red'
                                : 'grey'
                            " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}</q-chip>
                            <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="delete"
                              :disabled="this.allowOption(4)" @click="selected = props.row.id"
                              @click.capture="permisosDelete = true"></q-btn>
                            <q-item-label v-else caption :class="col.classes ? col.classes : ''">{{ col.value }}
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
          <q-btn flat label="Aceptar" color="primary" v-close-popup @click="deleteData(selected)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <methods ref="methods" @set-data="setData" @set-data-Roles="setDataRoles" @reset-Loading="resetLoading"
      @set-Data-Init="setDataInit" @set-Data-Roles="setDataRoles" @set-Data-Permisos="setDataPermisos"></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue },
  name: "Permisologia",
  data() {
    return {
      columnsPermisos: [
        {
          name: "label",
          label: "Menu",
          field: "label",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "leer",
          label: "Leer",
          align: "center",
        },
        {
          name: "crear",
          label: "Crear",
          align: "center",
        },
        {
          name: "editar",
          label: "Editar",
          align: "center",
        },
        {
          name: "eliminar",
          label: "Eliminar",
          align: "center",
        },
        {
          name: "action",
          label: "Otros",
          align: "center",
          sortable: true,
          required: true,
        },
      ],
      permisos: [],
      agencias: [],
      agenciasSelected: [],
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
      objetos: [],
      objetosNoDuplicados: [],
      agenciasSelected: [],
      rolesPermisosSelected: [],
      objetosNoDuplicadosSelected: [],
      selected: [],
      selectedAgencia: [],
      selectedRol: [],
      rpermisos: [],
      menus: [],
      error: "",
      items: 0,
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      control: 0,
      rowsPerPage: 100,
    });
    return {
      axiosConfig: {
        headers: {
          Authorization: ``,
        },
      },
      pagination: ref({
        rowsPerPage: 100,
      }),
      separator: ref("vertical"),
      reglasCodigo: [
        (val) => (val !== null && val !== "") || "Por favor escribe algo",
        (val) => val.length < 25 || "Deben ser máximo 25 caracteres",
        (val) => val.length > 3 || "Deben ser minimo 3 caracteres",
      ],
      permisosForm: ref(false),
      loading: ref(false),
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
    this.loading = true;
    this.getData("/agencias", "setDataInit", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        menu: "permisologia"
      },
    });
  },
  methods: {
    // Metodo para filtrar opciones de Selects
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
    // Metodo para desactivar Icono de Carga
    resetLoading() {
      this.loading = false;
    },
    // Reglas
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
    },
    verificatePermisos() {
      if (this.items === this.objetos.length) {
        this.sinPermisos();
      }
      if (this.items < this.objetos.length) {
        this.permisosForm = true;
      }
      this.items = 0;
    },
    // Metodo para validar Permisos
    allowOption(option) {
      return this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0;
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos al Iniciar
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];

      api.get(`/roles`, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          agencia: this.agencias[0].id,
        },
      }).then((res) => {
        this.selectedRol = res.data[0];
        this.rolesPermisos = res.data;
        
        api.get(`/menus`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            rol: res.data[0].id,
          },
        }).then((res) => {
          this.menus = res.data;
          for (let i = 0; i < this.menus.length; i++) {  
            for (let j = 0; j < this.menus[i].acciones.length; j++) {
              if (this.menus[i].acciones[j].rpermisos.length > 0) {
                this.menus[i].acciones[j].rpermisos = true;
              } else {
                this.menus[i].acciones[j].rpermisos = false;
              }
            }
          }
        });
      });
      this.loading = false;
    },
    setData(res, dataRes) {
      this[dataRes] = res;
    },
    // Metodo para Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodos para permisos
    setDataRoles(res, dataRes) {
      this[dataRes] = res;
      this.selectedRol = this.roles[0];
    },
  },
};
</script>
