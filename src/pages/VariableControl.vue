<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createDato" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nombre"
                  label="Descripción de Variable"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasNotNull50]"
                  @update:model-value="
                    form.nombre = form.nombre.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.valor"
                  label="Valor de Variable"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo"
                  label="Tipo de Variable"
                  hint=""
                  :options="tipo"
                  lazy-rules
                  :rules="[reglasSelect]"
                >
                  <template v-slot:prepend>
                    <q-icon name="done_all" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
            >
              <q-btn
                label="Agregar Control"
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

    <q-dialog v-model="edit">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="putDato">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nombre"
                  label="Descripción de Variable"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasNotNull50]"
                  @update:model-value="
                    formEdit.nombre = formEdit.nombre.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="formEdit.valor"
                  label="Valor de Variable"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.tipo"
                  label="Tipo de Variable"
                  hint=""
                  :options="tipo"
                  lazy-rules
                  :rules="[reglasSelect]"
                >
                  <template v-slot:prepend>
                    <q-icon name="done_all" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-top: 10px"
            >
              <q-btn
                label="Editar Control"
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
      <div
        class="
          row
          q-pa-md
          col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12
          text-secondary
        "
      >
        <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
          <h4 style="font-size: 35px; align-self: center; text-align: center">
            <strong>MANTENIMIENTO - VARIABLE CONTROL</strong>
          </h4>
        </div>
        <div
          class="col-md-8 col-sm-12 col-xs-12 filter"
          style="align-self: center; align-self: center"
        >
          <q-input
            v-model="filter"
            rounded
            outlined
            standout
            type="search"
            label="Búsqueda avanzada"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar"
            rounded
            style="text-align: center; align-self: center"
            color="primary"
            :disabled="this.disabledCreate"
            @click="create = true"
            size="16px"
            class="q-px-xl q-py-xs insertarestadosmovil"
          ></q-btn>
        </div>
      </div>

      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="q-pa-md" style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
              <q-table
                :rows="datos"
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
                <template v-slot:body-cell-tipo="props">
                  <q-td :props="props">
                    <q-select
                      outlined
                      v-model="props.row.tipo_desc"
                      :options="tipo"
                      @update:model-value="
                        this.getDataEdit(props.row.id, 'putDatoSelect');
                        this.formEdit.tipo =
                          props.row.tipo_desc.value;
                      "
                    >
                    </q-select>
                  </q-td>
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
                        getDataEdit(props.row.id, 'setDataEdit');
                        edit = true;
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
                      @click.capture="deletePopup = true"
                    ></q-btn>
                  </q-td>
                </template>
                <template v-slot:item="props">
                  <div
                    class="
                      q-pa-xs
                      col-xs-12 col-sm-6 col-md-4 col-lg-3
                      grid-style-transition
                    "
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
                                getDataEdit(props.row.id, 'setDataEdit');
                                edit = true;
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
                              @click.capture="deletePopup = true"
                            ></q-btn>
                            <q-item-label
                              v-else
                              caption
                              :class="col.classes ? col.classes : ''"
                              >{{ col.value }}</q-item-label
                            >
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
                            <q-select
                              v-else-if="col.name === 'tipo'"
                              outlined
                              v-model="props.row.tipo_desc"
                              :options="tipo"
                              @update:model-value="
                                getDataEdit(props.row.id, 'putDatoSelect');
                                this.formEdit.tipo =
                                  props.row.tipo_desc.value;
                              "
                            >
                            </q-select>
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

    <q-dialog v-model="deletePopup">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estás seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="deleteDato(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <methods
      ref="methods"
      @get-Data-Variable="getDataVariable('/vcontrol', 'setData', 'datos')"
      @set-Data="setData"
      @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit"
      @put-Dato-Select="putDatoSelect"
    ></methods>
    <desactive-crud
      ref="desactiveCrud"
      @desactivar-Crud="desactivarCrud"
    ></desactive-crud>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { useQuasar } from "quasar";

import methodsVue from "src/components/methods.vue";

import desactivateCrudVue from "src/components/desactivateCrud.vue";

import { LocalStorage } from "quasar";

export default {
  components: { "desactive-crud": desactivateCrudVue, methods: methodsVue },
  name: "Bancos",
  data() {
    return {
      columns: [
        {
          name: "nombre",
          label: "Descripción de la Variable",
          field: "nombre",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tipo",
          label: "Tipo de Variable",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "valor",
          label: "Valor de la Variable",
          field: "valor",
          align: "left",
          type: "string",
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
        nombre: "",
        tipo: "",
        valor: "",
      },
      formEdit: {
        id: "",
        nombre: "",
        tipo: "",
        valor: "",
      },
      tipo: [
        { label: "STRING", value: "1" },
        { label: "ENTERO", value: "2" },
        { label: "DECIMAL", value: "3" },
        { label: "FECHA", value: "4" },
        { label: "ENTERO LARGO", value: "5" },
      ],
      tipos: [],
      datos: [],
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: ``,
          agencia: "1",
          tipo: "16",
          fuente: "CR",
        },
      },
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      create: ref(false),
      loading: ref(false),
      edit: ref(false),
      activoExistente() {
        $q.notify({
          message: "Solo puede haber un Activo por Agencia",
          color: "red",
        });
      },
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getDataVariable("/vcontrol", "setData", "datos");
    this.$refs.desactiveCrud.desactivarCrud('c_vcontrol', 'r_vcontrol', 'u_vcontrol', 'd_vcontrol', 'desactivarCrud')
  },
  methods: {
    resetLoading() {
      this.loading = false;
    },
    // Reglas
    reglasAllowNull1(val) {
      if ((val !== null) !== "") {
        if (val.length > 1) {
          return "Deben ser Maximo 1 caracter";
        }
      }
    },
    reglasNotNull50(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if ((val !== null) !== "") {
        if (val.length > 50) {
          return "Deben ser Maximo 50 caracteres";
        }
      }
    },
    reglasNotNull100(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if ((val !== null) !== "") {
        if (val > 999) {
          return "Deben ser Maximo 3 caracteres";
        }
        if (val.length < 3) {
          return "Deben ser Minimo 3 caracteres";
        }
      }
    },
    reglasSelect(val) {
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
    getDataVariable(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false
    },

    getDataEdit(id, call) {
      this.$refs.methods.getDataEdit(
        `/vcontrol/${id}`,
        `${call}`,
        "formEdit",
        this.axiosConfig
      );
    },
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nombre = res.nombre;
      this[dataRes].tipo = res.tipo_desc;
      this[dataRes].valor = res.valor;
    },

    getDataSelect(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },

    deleteDato(idpost) {
      this.$refs.methods.deleteData(
        `/vcontrol/${idpost}`,
        "getDataVariable",
        this.axiosConfig
      );
      this.loading = true;
    },
    createDato() {
      this.form.tipo = this.form.tipo.value;
      this.$refs.methods.createData(
        "/vcontrol",
        this.form,
        "getDataVariable",
        this.axiosConfig
      );
      this.resetForm();
      this.loading = true;
    },
    putDato() {
      this.formEdit.tipo = this.formEdit.tipo.value;
      this.$refs.methods.putData(
        `/vcontrol/${this.formEdit.id}`,
        this.formEdit,
        "getDataVariable",
        this.axiosConfig
      );
      this.edit = false;
      this.loading = true;
    },
    putDatoSelect(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nombre = res.nombre;
      this[dataRes].valor = res.valor;

      this.$refs.methods.putData(
        `/vcontrol/${this.formEdit.id}`,
        this.formEdit,
        "getDataVariable",
        this.axiosConfig
      );
      this.loading = true;
    },

    resetForm() {
      (this.form.nombre = ""),
        (this.form.tipo = ""),
        (this.form.valor = ""),
        (this.create = null);
    },
    resetFormEdit() {
      (this.formEdit.nombre = ""),
        (this.formEdit.tipo = ""),
        (this.formEdit.valor = ""),
        (this.edit = null);
    },
  },
};
</script>

<style>
@media screen and (min-width: 1024px) {
  .filter {
    margin-right: 40px;
  }
}
</style>
