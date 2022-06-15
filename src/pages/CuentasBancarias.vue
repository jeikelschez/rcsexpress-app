<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="form">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="createDataCuentas()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formCuentas.nro_cuenta"
                  label="Numero de Cuenta"
                  hint=""
                  @update:model-value="
                    formCuentas.nro_cuenta =
                      formCuentas.nro_cuenta.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInputCuenta]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="formCuentas.flag_activa"
                  label="Estatus"
                  hint=""
                  class="pcform"
                  :options="estatus"
                  :rules="[reglasSelect]"
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
                  v-model="formCuentas.tipo_cuenta"
                  label="Tipo de Cuenta"
                  hint=""
                  :rules="[reglasSelect]"
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
                  v-model="formCuentas.firma_autorizada"
                  label="Firma Autorizada"
                  hint=""
                  @update:model-value="
                    formCuentas.firma_autorizada =
                      formCuentas.firma_autorizada.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInputFirma]"
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
                label="Agregar Cuenta"
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

    <q-dialog v-model="formEdit">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="putDataCuentas()">
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditCuentas.nro_cuenta"
                  label="Numero de Cuenta"
                  hint=""
                  @update:model-value="
                    formEditCuentas.nro_cuenta =
                      formEditCuentas.nro_cuenta.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInputCuenta]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="formEditCuentas.flag_activa"
                  label="Estatus"
                  hint=""
                  :rules="[reglasSelect]"
                  :options="estatus"
                  class="pcform"
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
                  v-model="formEditCuentas.tipo_cuenta"
                  label="Tipo de Cuenta"
                  hint=""
                  :rules="[reglasSelect]"
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
                  v-model="formEditCuentas.firma_autorizada"
                  label="Firma Autorizada"
                  hint=""
                  @update:model-value="
                    formEditCuentas.firma_autorizada =
                      formEditCuentas.firma_autorizada.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglaInputFirma]"
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
                label="Editar Cuenta"
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
            <h4 style="font-size: 26px"><strong>MANTENIMIENTO - CUENTAS BANCARIAS</strong></h4>
          </div>

          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputestadospc"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="bancos"
              option-label="nb_banco"
              option-value="id"
              v-model="selectedBanco"
              outlined
              standout
              label="Escoge un Banco"
              @update:model-value="this.axiosConfig.headers.banco = this.selectedBanco.id;
              getData(`/cuentas`, 'setDataCuentas', 'cuentas')"
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
              :disabled="this.disabledCreate"
              @click="form = true"
              @click.capture="resetForm()"
              size="16px"
              class="q-px-xl q-py-xs insertarestadosmovil"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md" style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
              <q-table
                :rows="cuentas"
                row-key="id"
                :columns="columnsCuentas"
                :separator="separator"
                class="my-sticky-column-table"
                :filter="filter"
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
                      getData(`/cuentas/${props.row.id}`, 'setDataCuentasEdit', 'formEditCuentas');
                      formEdit = true;
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
                                getData(`/cuentas/${props.row.id}`, 'setDataCuentasEdit', 'formEditCuentas');
                                formEdit = true;
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
        </div>
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
    <desactivate-crud ref="desactivateCrud"
      @desactivar-Crud-Roles="desactivarCrudRoles"
    ></desactivate-crud>
    <methods ref="methods"
      @get-Data="this.axiosConfig.headers.banco = this.selectedBanco.id;
      getData(`/cuentas`, 'setDataCuentas', 'cuentas')"
      @set-Data-Cuentas="setDataCuentas"
      @set-Data-Cuentas-Edit="setDataRolesEdit"
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
  name: "Cuentas",
  data() {
    return {
      columnsCuentas: [
        {
          name: "id",
          label: "Codigo",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "nro_cuenta",
          label: "Numero de Cuenta",
          field: "nro_cuenta",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_desc",
          label: "Tipo de Cuenta",
          field: "tipo_desc",
          align: "left",
          sortable: true,
        },
        {
          name: "activa_desc",
          label: "Estatus",
          field: "activa_desc",
          align: "left",
          sortable: true,
        },
        {
          name: "firma_autorizada",
          label: "Firma Autorizada",
          field: "firma_autorizada",
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
      formCuentas: {
        nro_cuenta: "",
        flag_activa: "",
        tipo_cuenta: "",
        firma_autorizada: "",
        cod_banco: [],
      },
      formEditCuentas: {
        nro_cuenta: "",
        flag_activa: "",
        tipo_cuenta: "",
        firma_autorizada: "",
        id: "",
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
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
          banco: ""
        }
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      form: ref(false),
      formEdit: ref(false),
      cuentasDelete: ref(false),
      filter: ref("")
    };
  },
  mounted() {
    this.getData('/bancos', 'setData', 'bancos');
    this.$refs.desactivateCrud.desactivarCrud('c_roles', 'd_roles', 'u_roles', 'desactivarCrudRoles')
  },
  methods: {
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglaInputCuenta(val) {
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if(val !== null) {
      if (val.length > 25) {
        return "Deben ser máximo 25 caracteres";
        }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
      }
    },
    reglaInputFirma(val) {
      if(val !== null) {
      if (val.length > 50) {
        return "Deben ser máximo 50 caracteres";
        }
      if (val.length > 0) {
        if (val.length < 3) {
        return "Deben ser minimo 3 caracteres";
        }
      }
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
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    setData(res, dataRes) {
      this[dataRes] = res
      this.getDataIniciar();
    },
    setDataCuentas(res, dataRes) {
      this[dataRes] = res
    },
    setDataRolesEdit(res, dataRes) {
      this[dataRes].id = res.id
      this[dataRes].nro_cuenta = res.nro_cuenta
      this[dataRes].flag_activa = res.activa_desc
      this[dataRes].tipo_cuenta = res.tipo_desc
      this[dataRes].firma_autorizada = res.firma_autorizada
      this[dataRes].cod_banco = res.cod_banco
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/cuentas/${idpost}`, 'getData', this.axiosConfig);
    },
    createDataCuentas() {
      this.formCuentas.cod_banco = this.selectedBanco.id
      this.formCuentas.flag_activa = this.formCuentas.flag_activa.value
      this.formCuentas.tipo_cuenta = this.formCuentas.tipo_cuenta.value
      this.$refs.methods.createData(`/cuentas`, this.formCuentas, 'getData', this.axiosConfig);
      this.resetForm();
    },
    putDataCuentas() {
      this.formEditCuentas.flag_activa = this.formEditCuentas.flag_activa.value
      this.formEditCuentas.tipo_cuenta = this.formEditCuentas.tipo_cuenta.value
      this.$refs.methods.putData(`/cuentas/${this.formEditCuentas.id}`, this.formEditCuentas, 'getData', this.axiosConfig);
      this.resetFormEdit()
    },
    resetForm() {
      (this.formCuentas.nro_cuenta = ""),
      (this.formCuentas.flag_activa = ""),
      (this.formCuentas.tipo_cuenta = ""),
      (this.formCuentas.firma_autorizada = ""),
      (this.form = false)
    },
    resetFormEdit() {
      (this.formEditCuentas.nro_cuenta = ""),
      (this.formEditCuentas.flag_activa = ""),
      (this.formEditCuentas.tipo_cuenta = ""),
      (this.formEditCuentas.firma_autorizada = ""),
      (this.formEditCuentas.cod_banco = null),
      (this.formEdit = false)
    },
    // Metodos para colocar valores iniciales
    getDataIniciar() {
        this.bancoRef = this.bancos[0].id;
        this.selectedBanco = this.bancos[0];
        this.axiosConfig.headers.banco = this.bancoRef;
        api.get(`/cuentas`, this.axiosConfig)
        .then((res) => {
          this.cuentas = res.data;
        })
    },
  },
};
</script>
