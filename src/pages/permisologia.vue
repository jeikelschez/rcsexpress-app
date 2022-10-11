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

    <div class="q-pa-sm justify-center">
      <div class="q-pa-md row justify-end">
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
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
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
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
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

      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="menus"
          row-key="id"
          :columns="columnsPermisos"
          :loading="loading"
          binary-state-sort
          :separator="separator"
          :filter="filterPermisos"
          style="width: 100%"
          :grid="$q.screen.xs"
          v-model:pagination="pagination"
          hide-bottom
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
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

    <methods
      ref="methods"
      @set-Data-Menus="setDataMenus"
      @set-Data-Roles="setDataRoles"
      @reset-Loading="resetLoading"
      @set-Data-Init="setDataInit"
      @set-Data-Permisos="setDataPermisos"
    ></methods>
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
      roles: [],
      rolesPermisos: [],
      form: {
        acciones: [],
      },
      objetos: [],
      rolesPermisosSelected: [],
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
      filterPermisos: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Seguridad - Permisologia", "");
    this.loading = true;
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
      this.loading = false;
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

<style>
.titleCheckbox {
  margin-bottom: 0px;
}

.q-item__section {
  padding-left: 0px !important;
}

.hide {
  display: none;
}

@media screen and (min-width: 600px) {
  .movilTitle {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .movilTitle {
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .titleCheckbox {
    margin-bottom: 20px !important;
  }

  .checkboxItem {
    margin-bottom: 20px !important;
    text-align: center;
  }
}

@media screen and (min-width: 600px) {
  .cardMargin {
    padding-right: 20px !important;
  }
}

@media screen and (min-width: 1024px) {
  .cardMarginFilter {
    padding-right: 20px !important;
  }
}

@media screen and (max-width: 1024px) {
  .buttonMargin {
    margin-bottom: 15px !important;
  }
}

@media screen and (max-width: 1024px) {
  .selectMobile {
    margin-bottom: 15px !important;
  }
}
</style>
