<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="permisosForm">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <div
            class="row items-center"
            v-for="(accion, index) in this.form.acciones"
          >
            <div class="col-md-9 col-sm-10 col-xs-9" v-if="index > 3">
              <p class="titleCheckbox">
                {{ accion.descripcion }}
              </p>
            </div>
            <div
              class="col-md-2 col-sm-2 col-xs-3"
              style="text-align: right"
              v-if="index > 3"
            >
              <q-checkbox
                v-model="accion.bpermisos"
                class="checkboxItem"
                :disable="this.allowOption(2)"
                @update:model-value="updatePermisos(accion)"
              />
            </div>
          </div>
          <div
            class="row justify-center items-center"
            style="margin-bottom: 10px; margin-top: 40px"
          >
            <q-btn
              label="Cerrar"
              color="primary"
              class="col-md-5 col-sm-5 col-xs-12"
              icon="close"
              v-close-popup
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="q-pa-md row" style="margin-top: 2px">
          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
            style="align-self: center; text-align: center"
          >
            <p style="font-size: 20px" class="text-secondary">
              <strong>SEGURIDAD - PERMISOLOGÍA</strong>
            </p>
          </div>
          <div
            class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile"
            style="align-self: center; text-align: center"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="agenciasSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'agenciasSelected',
                    'agencias',
                    'nb_agencia'
                  )
              "
              use-input
              hide-selected
              fill-input
              dense
              input-debounce="0"
              option-label="nb_agencia"
              option-value="id"
              v-model="selectedAgencia"
              outlined
              standout
              label="Escoge una Agencia"
              @update:model-value="
                getData(`/roles`, 'setDataRoles', 'rolesPermisos', {
                  headers: {
                    agencia: this.selectedAgencia.id,
                  },
                });
                this.menus = [];
              "
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
            class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 selectMobile"
            style="align-self: center; text-align: center"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="rolesPermisosSelected"
              @filter="
                (val, update) =>
                  filterArray(
                    val,
                    update,
                    'rolesPermisosSelected',
                    'rolesPermisos',
                    'descripcion'
                  )
              "
              use-input
              hide-selected
              fill-input
              dense
              input-debounce="0"
              option-label="descripcion"
              option-value="id"
              v-model="selectedRol"
              outlined
              standout
              label="Escoge un Rol"
              @update:model-value="
                getData(`/menus`, 'setDataMenus', 'menus', {
                  headers: {
                    rol: this.selectedRol.id,
                  },
                });
                this.menus = [];
              "
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
        </div>
        <div class="q-pa-md my-card row" bordered flat style="margin-top: 2px">
          <q-table
            :rows="menus"
            row-key="id"
            :columns="columnsPermisos"
            :loading="loading"
            binary-state-sort
            :separator="separator"
            style="width: 100%"
            :grid="$q.screen.xs"
            v-model:pagination="pagination"
            hide-bottom
          >
            <template v-slot:loading>
              <q-inner-loading showing color="primary" class="loading" />
            </template>
            <template v-slot:body-cell-leer="props">
              <q-td :props="props">
                <q-checkbox
                  dense
                  v-model="props.row.acciones[0].bpermisos"
                  :disable="this.allowOption(2)"
                  @update:model-value="updatePermisos(props.row.acciones[0])"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-crear="props">
              <q-td :props="props">
                <q-checkbox
                  dense
                  v-model="props.row.acciones[1].bpermisos"
                  :disable="this.allowOption(2)"
                  @update:model-value="updatePermisos(props.row.acciones[1])"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-editar="props">
              <q-td :props="props">
                <q-checkbox
                  dense
                  v-model="props.row.acciones[2].bpermisos"
                  :disable="this.allowOption(2)"
                  @update:model-value="updatePermisos(props.row.acciones[2])"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-eliminar="props">
              <q-td :props="props">
                <q-checkbox
                  dense
                  v-model="props.row.acciones[3].bpermisos"
                  :disable="this.allowOption(2)"
                  @update:model-value="updatePermisos(props.row.acciones[3])"
                />
              </q-td>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="settings"
                  v-if="props.row.acciones[4]"
                  @click="
                    this.form.acciones = props.row.acciones;
                    this.permisosForm = true;
                  "
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
                      <q-item-section side class="itemMovilSide">
                        <q-item-label v-if="col.name === 'label'">{{
                          props.row.label
                        }}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          dense
                          v-if="col.name === 'leer'"
                          v-model="props.row.acciones[0].bpermisos"
                          :disable="this.allowOption(2)"
                          @update:model-value="
                            updatePermisos(props.row.acciones[0])
                          "
                        />
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          dense
                          v-if="col.name === 'crear'"
                          v-model="props.row.acciones[1].bpermisos"
                          :disable="this.allowOption(2)"
                          @update:model-value="
                            updatePermisos(props.row.acciones[1])
                          "
                        />
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          dense
                          v-if="col.name === 'editar'"
                          v-model="props.row.acciones[2].bpermisos"
                          :disable="this.allowOption(2)"
                          @update:model-value="
                            updatePermisos(props.row.acciones[2])
                          "
                        />
                      </q-item-section>
                      <q-item-section side>
                        <q-checkbox
                          dense
                          v-if="col.name === 'eliminar'"
                          v-model="props.row.acciones[3].bpermisos"
                          :disable="this.allowOption(2)"
                          @update:model-value="
                            updatePermisos(props.row.acciones[3])
                          "
                        />
                      </q-item-section>
                      <q-item-section side>
                        <q-btn
                          dense
                          round
                          flat
                          color="primary"
                          icon="settings"
                          v-if="col.name === 'action' && props.row.acciones[4]"
                          @click="
                            this.form.acciones = props.row.acciones;
                            this.permisosForm = true;
                          "
                        ></q-btn>
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

    <methods
      ref="methods"
      @set-Data-Menus="setDataMenus"
      @set-Data-Roles="setDataRoles"
      @set-Data-Init="setDataInit"
      @set-Data-Permisos="setDataPermisos"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";
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
        },
      ],
      form: {
        acciones: [],
      },
      pagination: {
        rowsPerPage: 200,
        sortBy: 'label',
        descending: false,
      },
      permisos: [],
      agencias: [],
      agenciasSelected: [],
      roles: [],
      rolesPermisos: [],
      objetos: [],
      rolesPermisosSelected: [],
      selected: [],
      selectedAgencia: [],
      selectedRol: [],
      rpermisos: [],
      menus: [],
    };
  },
  setup() {
    return {
      separator: ref("vertical"),
      permisosForm: ref(false),
      loading: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Seguridad - Permisologia", "");
    this.getData("/agencias", "setDataInit", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "permisologia",
      },
    });
  },
  methods: {
    // Metodo para filtrar opciones de Selects
    filterArray(val, update, pagina, array, element) {
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
    // Metodo para validar Permisos
    allowOption(option) {
      return (
        this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0
      );
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
      this.loading = true;
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      api
        .get(`/roles`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            agencia: this.agencias[0].id,
          },
        })
        .then((res) => {
          this.selectedRol = res.data[0];
          this.rolesPermisos = res.data;
          this.getData(`/menus`, "setDataMenus", "menus", {
            headers: {
              rol: this.selectedRol.id,
            },
          });
        });
    },
    // Metodo para Setear Datos
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
    // Metodos para Setear permisos
    setDataMenus(res, dataRes) {
      this[dataRes] = res;
      for (let i = 0; i < this.menus.length; i++) {
        for (let j = 0; j < this.menus[i].acciones.length; j++) {
          if (this.menus[i].acciones[j].rpermisos.length > 0) {
            this.menus[i].acciones[j].bpermisos = true;
          } else {
            this.menus[i].acciones[j].bpermisos = false;
          }
        }
      }
      this.loading = false;
    },
    // Metodos para Actualizar permisos
    updatePermisos(action) {
      if (action.bpermisos) {
        api
          .post(
            `/rpermisos`,
            {
              cod_rol: this.selectedRol.id,
              cod_menu_accion: action.id,
            },
            {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            }
          )
          .then((res) => {
            this.$q.notify({
              message: "Agregado exitosamente",
              color: "green",
            });
            action.rpermisos[0] = res.data;
          });
      } else {
        this.$refs.methods.deleteData(
          `/rpermisos/${action.rpermisos[0].id}`,
          "getData"
        );
      }
    },
  },
};
</script>
