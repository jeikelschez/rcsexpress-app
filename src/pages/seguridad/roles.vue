<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.descripcion"
                  label="Descripcion"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    form.descripcion = form.descripcion.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 30),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
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

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="q-pa-md row" style="margin-top: 2px">
          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
            style="align-self: center; text-align: center"
          >
            <p style="font-size: 20px" class="text-secondary">
              <strong>SEGURIDAD - ROLES</strong>
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
              dense
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
              input-debounce="0"
              option-label="nb_agencia"
              option-value="id"
              v-model="selectedAgencia"
              outlined
              standout
              label="Escoge una Agencia"
              @update:model-value="getDataTable()"
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
            class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6"
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
            class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMarginButton"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar"
              rounded
              color="primary"
              :disabled="this.allowOption(2)"
              @click="dialog = true"
              @click.capture="resetForm()"
              class="q-px-xl q-py-xs"
            ></q-btn>
          </div>
        </div>
        <div class="q-pa-md my-card row" bordered flat style="margin-top: 2px">
          <q-table
            :rows="roles"
            binary-state-sort
            row-key="id"
            :columns="columns"
            :loading="loading"
            :separator="separator"
            :rows-per-page-options="[5, 10, 15, 20, 50]"
            :filter="filter"
            style="width: 100%"
            :grid="$q.screen.xs"
            v-model:pagination="pagination"
          >
            <template v-slot:loading>
              <q-inner-loading showing color="primary" class="loading" />
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
                    this.$refs.methods.getData(`/roles/${props.row.id}`, 'setDataEdit', 'form');
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
                      <q-item-section side class="itemMovilSide">
                        <q-btn
                          v-if="col.name === 'action'"
                          dense
                          round
                          flat
                          color="primary"
                          icon="edit"
                          :disabled="this.allowOption(3)"
                          @click="
                            this.$refs.methods.getData(
                              `/roles/${props.row.id}`,
                              'setDataEdit',
                              'form'
                            );
                            dialog = true;
                          "
                        ></q-btn>
                        <q-btn
                          v-if="col.name === 'action'"
                          dense
                          round
                          flat
                          color="primary"
                          icon="delete"
                          :disabled="this.allowOption(4)"
                          @click="selected = props.row.id"
                          @click.capture="deletePopup = true"
                        ></q-btn>
                        <q-item-label> {{ col.value }} </q-item-label>
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

    <q-dialog v-model="deletePopup">
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
            @click="
              this.$refs.methods.deleteData(
                `/roles/${selected}`,
                'getDataTable'
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data-Init="setDataInit"
      @set-Data-Edit="setDataEdit"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import { LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue, rulesVue },
  data() {
    return {
      columns: [
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
        },
      ],
      form: {
        descripcion: "",
        cod_agencia: [],
      },
      pagination: {
        rowsPerPage: 10,
      },
      agencias: [],
      roles: [],
      selected: [],
      selectedAgencia: [],
      agenciasSelected: [],
      rpermisos: [],
      filter: "",
    };
  },
  setup() {
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      deletePopup: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Roles", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "roles",
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
      this[dataRes] = res.data ? res.data : res;
      this.selectedAgencia = this.agencias[0];
      this.getDataTable();
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable() {
      this.loading = true;
      this.$refs.methods.getData(`/roles`, "setDataTable", "roles", {
        headers: {
          agencia: this.selectedAgencia.id,
        },
      });
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].descripcion = res.descripcion;
      this[dataRes].cod_agencia = this.selectedAgencia;
    },
    // Metodo para Editar o Crear Datos
    sendData() {
      this.form.cod_agencia = this.selectedAgencia.id;
      if (!this.form.id) {
        this.$refs.methods.createData(`/roles`, this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/roles/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.descripcion = "";
      this.form.cod_agencia = "";
    },
  },
};
</script>
