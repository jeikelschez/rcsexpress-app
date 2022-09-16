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
                  v-model="form.nro_cuenta"
                  label="Numero de Cuenta"
                  hint=""
                  @update:model-value="
                    form.nro_cuenta =
                      form.nro_cuenta.toUpperCase()
                  "
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMax(val, 25, 'Maximo 25 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="form.flag_activa"
                  label="Estatus"
                  hint=""
                  class="pcform"
                  :options="estatus"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, 'Requerido')|| '']"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="rule" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_cuenta"
                  label="Tipo de Cuenta"
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, 'Requerido')|| '']"
                  :options="tipoDeCuenta"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="ballot" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.firma_autorizada"
                  label="Firma Autorizada"
                  hint=""
                  @update:model-value="
                    form.firma_autorizada =
                      form.firma_autorizada.toUpperCase()
                  "
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 50, 'Maximo 50 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                >
                  <template v-slot:prepend>
                    <q-icon name="border_color" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
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

    <div class="q-pa-sm justify-center col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
    >
      <div class="row q-pa-md">
        <div
          class="col-xs-12 text-secondary movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 26px; margin-bottom: 20px;">
            <strong>MANTENIMIENTO - CUENTAS BANCARIAS</strong>
          </p>
        </div>

        <div
          class="col-md-5 col-xs-12 col-sm-6 cardMargin selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="bancosSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'bancosSelected',
                  'bancos',
                  'nb_banco'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="nb_banco"
            option-value="id"
            v-model="selectedBanco"
            outlined
            standout
            label="Escoge un Banco"
            @update:model-value="
              getDataCuentas(`/cuentas`, 'setData', 'cuentas')
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
          class="col-md-5 col-xs-12 col-sm-6 cardMarginLast selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-input
            rounded
            outlined
            standout
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
          class="col-md-2 col-xs-12 col-sm-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            color="primary"
            :disabled="this.disabledCreate"
            @click="dialog = true"
            @click.capture="resetForm()"
            size="16px"
            class="q-px-xl q-py-xs"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="cuentas"
          row-key="id"
          binary-state-sort
          :columns="columns"
          :separator="separator"
          :filter="filter"
          :loading="loading"
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
                  getData(
                    `/cuentas/${props.row.id}`,
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
                :disabled="this.disabledDelete"
                @click="selected = props.row.id"
                @click.capture="cuentasDelete = true"
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
                          getData(
                            `/cuentas/${props.row.id}`,
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
                        :disabled="this.disabledDelete"
                        @click="selected = props.row.id"
                        @click.capture="cuentasDelete = true"
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

    <q-dialog v-model="cuentasDelete">
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

    <desactivate-crud
      ref="desactivateCrud"
      @desactivar-Crud="desactivarCrud"
    ></desactivate-crud>

    <methods
      ref="methods"
      @get-Data="
        getDataCuentas(`/cuentas`, 'setData', 'cuentas')
      "
      @reset-Loading="resetLoading"
      @set-Data-Cuentas-Edit="setDataEdit"
      @set-Data-Iniciar="setDataIniciar"
      @set-Data="setData"
      @set-Data-Edit="setDataEdit"
    ></methods>

    <rules-vue
      ref="rulesVue"
    ></rules-vue>

  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { LocalStorage } from "quasar";

import rulesVue from "src/components/rules.vue";

import methodsVue from "src/components/methods.vue";

import desactivateCrudVue from "src/components/desactivateCrud.vue";

export default {
  components: { "desactivate-crud": desactivateCrudVue, methods: methodsVue, rulesVue },
  data() {
    return {
      columns: [
        {
          name: "nro_cuenta",
          label: "Numero de Cuenta",
          field: "nro_cuenta",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tipo_desc",
          label: "Tipo de Cuenta",
          field: "tipo_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "activa_desc",
          label: "Estatus",
          field: "activa_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "firma_autorizada",
          label: "Firma Autorizada",
          field: "firma_autorizada",
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
        nro_cuenta: "",
        flag_activa: "",
        tipo_cuenta: "",
        firma_autorizada: "",
        cod_banco: [],
      },
      estatus: [
        { label: "ACTIVA", value: "A" },
        { label: "INACTIVA", value: "I" },
      ],
      tipoDeCuenta: [
        { label: "AHORRO", value: "A" },
        { label: "CORRIENTE", value: "C" },
      ],
      bancos: [],
      cuentas: [],
      bancosSelected: [],
      selected: [],
      selectedBanco: [],
      bancoRef: "",
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
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      cuentasDelete: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Cuentas Bancarias", "");
    this.getData("/bancos", "setDataIniciar", "bancos");
    this.$refs.desactivateCrud.desactivarCrud(
      "c_cuentas",
      "r_cuentas",
      "u_cuentas",
      "d_cuentas",
      "desactivarCrud"
    );
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
    // Metodo para Resetear Carga
    resetLoading() {
      this.loading = false;
    },
    // Metodo para Validar Permisos
    desactivarCrud(createItem, readItem, deleteItem, updateItem) {
      if (readItem == true) {
        if (createItem == true) {
          this.disabledCreate = false;
        }
        if (deleteItem == true) {
          this.disabledDelete = false;
        }
        if (updateItem == true) {
          this.disabledEdit = false;
        }
      } else this.$router.push("/error403");
    },

    // METODOS DE PAGINAS

    // Metodo para hacer Get de Datos
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes);
    },
    // Metodo para Get de Agentes
    getDataCuentas(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          banco: this.selectedBanco.id,
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Datos al Iniciar
    setDataIniciar(res, dataRes) {
      this[dataRes] = res;
      this.bancoRef = this.bancos[0].id;
      this.selectedBanco = this.bancos[0];
      api.get(`/cuentas`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            banco: this.bancoRef,
          },
        })
        .then((res) => {
          this.cuentas = res.data;
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
      this[dataRes].id = res.id;
      this[dataRes].nro_cuenta = res.nro_cuenta;
      this[dataRes].flag_activa = res.activa_desc;
      this[dataRes].tipo_cuenta = res.tipo_desc;
      this[dataRes].firma_autorizada = res.firma_autorizada;
      this[dataRes].cod_banco = res.cod_banco;
      this.loading = false;
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/cuentas/${idpost}`,
        "getData"
      );
      this.loading = true;
    },
    // Metodo para Crear o Editar Datos
    sendData() {
      this.form.cod_banco = this.selectedBanco.id;
      this.form.flag_activa = this.form.flag_activa.value;
      this.form.tipo_cuenta = this.form.tipo_cuenta.value;
      if (!this.form.id) {
      this.$refs.methods.createData(
        `/cuentas`,
        this.form,
        "getData"
      );
      this.resetForm();
      this.dialog = false
      this.loading = true;} else {
        this.$refs.methods.putData(
        `/cuentas/${this.form.id}`,
        this.form,
        "getData"
      );
      this.resetForm();
      this.dialog = false
      this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id,
      this.form.nro_cuenta = "",
      this.form.flag_activa = "",
      this.form.tipo_cuenta = "",
      this.form.firma_autorizada = ""
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
    .cardMarginLast {
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
