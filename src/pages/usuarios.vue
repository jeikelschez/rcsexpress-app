<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="max-width: 60vw">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md" autocomplete="off">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="form.login"
                  label="Login"
                  :readonly="this.disabledEdit"
                  :disable="this.disabledEdit"
                  hint=""
                  class="pcform"
                  @update:model-value="form.login = form.login.toUpperCase()"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(val, 11, 'Requiere Retorno'),
                    (val) =>
                      this.$refs.rulesVue.isMin(val, 3, 'Debe ser Mayor') || '',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="login" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="form.password"
                  label="Contraseña"
                  :type="isPwd ? 'password' : 'text'"
                  :readonly="this.disabledEdit"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(val, 10, 'Requiere Retorno'),
                    (val) =>
                      this.$refs.rulesVue.isMin(val, 3, 'Debe ser Mayor') || '',
                  ]"
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
                  v-model="form.nombre"
                  label="Nombre"
                  hint=""
                  @update:model-value="form.nombre = form.nombre.toUpperCase()"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(val, 50, 'Requiere Retorno'),
                    (val) =>
                      this.$refs.rulesVue.isMin(val, 3, 'Debe ser Mayor') || '',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="face" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="form.activo"
                  label="Vigente"
                  hint=""
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  :options="vigente"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="rule" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_rol"
                  label="Rol Desempeñado"
                  hint=""
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
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
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Enviar"
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

    <div class="q-pa-sm justify-center">
      <div class="q-pa-md row justify-end">
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>SEGURIDAD - USUARIOS</strong>
          </p>
        </div>

        <div
          class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6 cardMargin selectMobile"
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
              getData(`/usuarios`, 'setData', 'usuarios', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              })
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
          class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6 cardMarginFilter selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-input
            rounded
            outlined
            standout
            dense
            v-model="filter"
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
            :disabled="this.allowOption(2)"
            @click="dialog = true"
            @click.capture="resetForm()"
            size="16px"
            class="q-px-xl q-py-xs"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="usuarios"
          row-key="id"
          binary-state-sort
          :columns="columns"
          :separator="separator"
          :loading="loading"
          :filter="filter"
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
                :disabled="this.allowOption(3)"
                @click="
                  getData(
                    `/usuarios/${props.row.login}`,
                    'setDataEdit',
                    'form'
                  );
                  dialog = true;
                "
              ></q-btn>
              <q-btn
                dense
                round
                flat
                color="primary"
                icon="delete"
                :disabled="this.allowOption(4)"
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
                    <q-item-section side class="itemMovilSide">
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
                        :disabled="this.allowOption(3)"
                        @click="
                          getData(
                            `/usuarios/${props.row.login}`,
                            'setDataEdit',
                            'form'
                          );
                          dialog = true;
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
                        :disabled="this.allowOption(4)"
                        @click="selected = props.row.id"
                        @click.capture="usuariosDelete = true"
                      ></q-btn>
                      <q-item-label
                        v-else
                        caption
                        :class="col.classes ? col.classes : ''"
                        >{{ col.value }}
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

    <methods
      ref="methods"
      @get-Data-Usuarios="
        getData(`/usuarios`, 'setData', 'usuarios', {
          headers: {
            agencia: selectedAgencia.id,
          },
        })
      "
      @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit"
      @set-Data="setData"
      @set-Data-Init="setDataInit"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import { api } from "boot/axios";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue, rulesVue },
  data() {
    return {
      columns: [
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
          name: "activo_desc",
          label: "Vigente",
          field: "activo_desc",
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
      form: {
        login: "",
        nombre: "",
        activo: "",
        cod_rol: [],
        password: "",
        cod_agencia: [],
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
      rpermisos: [],
      menus: [],
      disabledPassword: false,
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
      rowsPerPage: 5,
    });
    return {
      pagination: ref({
        rowsPerPage: 5,
      }),
      separator: ref("vertical"),
      password: ref(""),
      loading: ref(false),
      isPwd: ref(true),
      dialog: ref(false),
      usuariosDelete: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Usuarios", "");
    this.getData("/agencias", "setDataInit", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "usuarios",
      },
    });
  },
  methods: {
    // Metodo para Filtrar Selects
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
    // Metodo para Resetear Datos
    resetLoading() {
      this.loading = false;
    },
    // Metodo para buscar y Setear Datos en Selects
    filterSelect(array, codigo, searched, selectedOption, selectedOptionValue) {
      var find = this[array].findIndex((item) => item[codigo] == searched);
      if (find >= 0) {
        this[selectedOption][selectedOptionValue] = this[array][find];
      } else {
        this[selectedOption][selectedOptionValue] = {
          label: "",
          value: "null",
        };
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

    // Metodo para Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para Get de Datos Iniciales
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
          this.roles = res.data;
        });
      api
        .get(`/usuarios`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            agencia: this.agencias[0].id,
          },
        })
        .then((res) => {
          this.usuarios = res.data;
        });
      this.loading = false;
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.resetForm();
      this[dataRes].login = res.login;
      this[dataRes].nombre = res.nombre;
      this[dataRes].id = res.id;
      this.disabledEdit = true;
      this.filterSelect("roles", "id", res.roles.id, "form", "cod_rol");
      this.filterSelect("vigente", "value", res.activo, "form", "activo");
      this[dataRes].cod_agencia = this.selectedAgencia;
    },
    // Metodo para Eliminar Datos Seleccionados
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/usuarios/${idpost}`, "getDataUsuarios");
      this.loading = true;
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      this.form.activo = this.form.activo.value;
      this.form.cod_rol = this.form.cod_rol.id;
      this.form.cod_agencia = this.selectedAgencia.id;
      if (!this.disabledEdit) {
        this.$refs.methods.createData(
          `/usuarios`,
          this.form,
          "getDataUsuarios"
        );
        this.dialog = false;
        this.loading = true;
      } else {
        delete this.form.password;
        delete this.form.edit;
        this.$refs.methods.putData(
          `/usuarios/${this.form.login}`,
          this.form,
          "getDataUsuarios"
        );
        this.dialog = false;
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      this.form.password = null;
      this.disabledEdit = false;
      delete this.form.id;
      this.form.nombre = null;
      this.form.login = null;
      this.form.cod_rol = null;
      this.form.activo = null;
      this.form.cod_agencia = null;
    },
  },
};
</script>

<style>
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
