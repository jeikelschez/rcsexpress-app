<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.cod_fpo"
                  label="Codigo"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasNotNull6]"
                  @update:model-value="
                    form.cod_fpo = form.cod_fpo.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.valor"
                  label="Valor"
                  step=".01"
                  hint=""
                  class="pcform"
                  type="number"
                  :rules="[reglasValor]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="sell" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.desc_tipo"
                  label="Descripción"
                  hint=""
                  class="pcform"
                  :rules="[reglasNotNull40]"
                  lazy-rules
                  @update:model-value="
                    form.desc_tipo = form.desc_tipo.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>

              <q-card
                class="q-pa-md"
                bordered
                style="width: 999px; max-width: 80vw; margin-bottom: 20px"
              >
                <q-card-section>
                  <div class="row">
                    <div
                      class="col-md-12 col-xs-12"
                      style="align-self: center; text-align: left; margin-top: -30px"
                    >
                      <h4 style="font-size: 20px" class="text-secondary"><strong>FECHAS DE VALIDEZ</strong></h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      label="Inicial"
                      hint=""
                      v-model="form.f_val"
                      mask="date"
                      :rules="['date']"
                      class="pcform"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.f_val">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                </div>

                <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      label="Final"
                      hint=""
                      mask="date"
                      :rules="['date']"
                      v-model="form.f_anul"
                      class="pcform"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.f_anul">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                </div>
                  </div>
                </q-card-section>
              </q-card>

              <q-card
                class="q-pa-md"
                bordered
                style="width: 999px; max-width: 80vw; margin-bottom: 20px"
              >
                <q-card-section>
                  <div class="row">
                    <div
                      class="col-md-12 col-xs-12"
                      style="align-self: center; text-align: left; margin-top: -30px"
                    >
                      <h4 style="font-size: 20px" class="text-secondary"><strong>RANGOS DE PESO</strong></h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      v-model="form.peso_inicio"
                      label="Inicial"
                      hint=""
                      class="pcform"
                      type="number"
                      step=".01"
                      lazy-rules
                      :rules="[reglasNotNull4]"
                >
                  <template v-slot:prepend>
                    <q-icon name="scale" />
                  </template>
                </q-input>
                </div>

                <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      v-model="form.peso_fin"
                      label="Final"
                      hint=""
                      type="number"
                      step=".01"
                      lazy-rules
                      :rules="[reglasNotNull4]"
                >
                  <template v-slot:prepend>
                    <q-icon name="scale" />
                  </template>
                </q-input>
                </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Concepto FPO"
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
                @click="setData()"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="edit">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="putData">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.cod_fpo"
                  label="Codigo"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasNotNull6]"
                  @update:model-value="
                    formEdit.cod_fpo = formEdit.cod_fpo.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="qr_code_2" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  type="number"
                  outlined
                  v-model="formEdit.valor"
                  label="Valor"
                  step=".01"
                  hint=""
                  class="pcform"
                  :rules="[reglasValorEdit]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="sell" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.desc_tipo"
                  label="Descripción"
                  hint=""
                  class="pcform"
                  :rules="[reglasNotNull40]"
                  lazy-rules
                  @update:model-value="
                    formEdit.desc_tipo = formEdit.desc_tipo.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
                  </template>
                </q-input>
              </div>

              <q-card
                class="q-pa-md"
                bordered
                style="width: 999px; max-width: 80vw; margin-bottom: 20px"
              >
                <q-card-section>
                  <div class="row">
                    <div
                      class="col-md-12 col-xs-12"
                      style="align-self: center; text-align: left; margin-top: -30px"
                    >
                      <h4 style="font-size: 20px" class="text-secondary"><strong>FECHAS DE VALIDEZ</strong></h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      label="Inicial"
                      hint=""
                      v-model="formEdit.f_val"
                      mask="date"
                      :rules="['date']"
                      class="pcform"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formEdit.f_val">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                </div>

                <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      label="Final"
                      hint=""
                      mask="date"
                      :rules="['date']"
                      v-model="formEdit.f_anul"
                      class="pcform"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formEdit.f_anul">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                </div>
                  </div>
                </q-card-section>
              </q-card>

              <q-card
                class="q-pa-md"
                bordered
                style="width: 999px; max-width: 80vw; margin-bottom: 20px"
              >
                <q-card-section>
                  <div class="row">
                    <div
                      class="col-md-12 col-xs-12"
                      style="align-self: center; text-align: left; margin-top: -30px"
                    >
                      <h4 style="font-size: 20px" class="text-secondary"><strong>RANGOS DE PESO</strong></h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      v-model="formEdit.peso_inicio"
                      label="Inicial"
                      hint=""
                      class="pcform"
                      type="number"
                      step=".01"
                      lazy-rules
                      :rules="[reglasNotNull4]"
                >
                  <template v-slot:prepend>
                    <q-icon name="scale" />
                  </template>
                </q-input>
                </div>

                <div class="col-md-6 col-xs-12">
                      <q-input
                      outlined
                      v-model="formEdit.peso_fin"
                      label="Final"
                      hint=""
                      type="number"
                      step=".01"
                      lazy-rules
                      :rules="[reglasNotNull4]"
                >
                  <template v-slot:prepend>
                    <q-icon name="scale" />
                  </template>
                </q-input>
                </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Concepto FPO"
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
            class="col-md-4 col-xs-12 text-secondary"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <h4><strong>CONCEPTOS DE FLANQUEO POSTAL OBLIGATORIO</strong></h4>
          </div>
          <div
            class="col-md-5 col-sm-7 col-xs-6"
            style="align-self: center; margin-right: 20px"
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
            class="col-md-2 col-sm-4 col-xs-5"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar Concepto"
              rounded
              color="primary"
              @click="create = true"
              @click.capture="resetForm()"
              :disabled="this.disabledCreate"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md">
          <div class="q-gutter-y-md">
            <div bordered flat class="row">
              <q-table
                :rows="datos"
                row-key="id"
                :columns="columns"
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
                        getData(`/fpos/${props.row.id}`, 'setDataEdit', 'formEdit');
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
                                getData(`/fpos/${props.row.id}`, 'setDataEdit', 'formEdit');
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
    @get-Data="getData('/fpos','setData','datos')"
    @set-data="setData"
    @set-Data-Edit="setDataEdit">
    </methods>
    <desactivate-crud ref="desactivateCrud"
    @desactivar-Crud-Bancos="desactivarCrudBancos">
    </desactivate-crud>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { LocalStorage } from "quasar";

import methodsVue from 'src/components/methods.vue';

import desactivateCrudVue from 'src/components/desactivateCrud.vue';

import currencyInputVue from 'src/components/currency-input.vue';

export default {
  components: {
  "desactivate-crud": desactivateCrudVue,
  "methods": methodsVue,
  "currency-input": currencyInputVue},
  name: "Bancos",
  data() {
    return {
      columns: [
        {
          name: "cod_fpo",
          label: "Código",
          field: "cod_fpo",
          align: "left",
          sortable: true,
        },
        {
          name: "desc_tipo",
          label: "Descripción",
          field: "desc_tipo",
          align: "left",
          sortable: true,
        },
        {
          name: "valor",
          label: "Valor",
          field: "valor",
          align: "left",
          sortable: true,
        },
        {
          name: "f_anul",
          label: "Valido Hasta",
          field: "f_anul",
          align: "left",
          sortable: true,
        },
        {
          name: "peso_inicio",
          label: "Rango de Peso Inicial",
          field: "peso_inicio",
          align: "left",
          sortable: true,
        },
        {
          name: "peso_fin",
          label: "Rango de Peso Final",
          field: "peso_fin",
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
      form: {
        cod_fpo: "",
        desc_tipo: "",
        valor: 0,
        f_val: "",
        f_anul: "",
        peso_inicio: 0,
        peso_fin: 0,
      },
      datos: [],
      formEdit: {
        id: "",
        cod_fpo: "",
        desc_tipo: "",
        valor: 0,
        f_anul: "",
        f_val: "",
        peso_inicio: 0,
        peso_fin: 0,
      },
      selected: [],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
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
      edit: ref(false),
      medium: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData('/fpos','setData','datos')
    this.$refs.desactivateCrud.desactivarCrud('c_bancos', 'd_bancos', 'u_bancos', 'desactivarCrudBancos')
  },
  methods: {
    // Reglas
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasValor(val) {
      if (this.form.valor === null) {
        return "Debes Escribir Algo";
      }
      if (this.form.valor === "") {
        return "Debes Escribir Algo";
      }
        if (this.form.valor !== null !== "") {
          if (this.form.valor > 9.99) {
            return "El valor maximo es 9,99";
          }
      }
    },
    reglasValorEdit(val) {
      if (this.formEdit.valor === null) {
        return "Debes Escribir Algo";
      }
      if (this.formEdit.valor === "") {
        return "Debes Escribir Algo";
      }
        if (this.formEdit.valor !== null !== "") {
          if (this.formEdit.valor > 9.99) {
            return "El valor maximo es 9,99";
          }
      }
    },
    reglasNotNull4(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val > 99.99) {
            return "Monto Maximo";
          }
      }
    },
    reglasNotNull6(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 5) {
            return "Deben ser Maximo 6 caracteres";
          }
      }
    },
    reglasNotNull40(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 39) {
            return "Deben ser Maximo 40 caracteres";
          }
      }
    },

    // Desactivar CRUD
    desactivarCrudBancos(createItem, deleteItem, updateItem) {
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

    // Metodos CRUD
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes);
    },
    setData(res, dataRes) {
      this[dataRes] = res
    },  
    setDataEdit(res, dataRes) {
      this.formEdit.id = res.id
      this.formEdit.cod_fpo = res.cod_fpo
      this.formEdit.desc_tipo = res.desc_tipo
      this.formEdit.valor = res.valor
      this.formEdit.f_anul = res.f_anul
      this.formEdit.f_val = res.f_val
      this.formEdit.peso_inicio = res.peso_inicio
      this.formEdit.peso_fin = res.peso_fin
      this.formEdit.valor = res.valor
    },   
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/fpos/${idpost}`, 'getData');
    },
    createData() {
      this.$refs.methods.createData('/fpos', this.form, 'getData');
      this.resetForm();
    },
    putData() {
      this.$refs.methods.putData(`/fpos/${this.formEdit.id}`, this.formEdit, 'getData');
      this.edit = false;
      this.resetFormEdit()
    },
    
    resetForm() {
      (this.form.cod_fpo = ""),
      (this.form.desc_tipo = ""),
      (this.form.valor = ""),
      (this.form.f_anul = ""),
      (this.form.f_val = ""),
      (this.form.peso_inicio = ""),
      (this.form.peso_fin = ""),
      (this.create = false);    
    },
    resetFormEdit() {
      (this.formEdit.cod_fpo = ""),
      (this.formEdit.desc_tipo = ""),
      (this.formEdit.valor = ""),
      (this.formEdit.f_anul = ""),
      (this.formEdit.f_val = ""),
      (this.formEdit.peso_inicio = ""),
      (this.formEdit.peso_fin = "")
    },
  },
};
</script>

<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */


  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #FFFFFF

  td:first-child
    background-color: #FFFFFF

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
