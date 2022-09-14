<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="unidadesDialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.placas"
                  label="Placa Vehículo"
                  class="pcform"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        10,
                        'Maximo 10 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="form.placas = form.placas.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="recent_actors" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.chofer"
                  label="Chofer"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        20,
                        'Maximo 30 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracterers'
                      ) || '',
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="form.chofer = form.chofer.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="face" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.descripcion"
                  label="Descripción"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        100,
                        'Maximo 100 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    form.descripcion = form.descripcion.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="description" />
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

    <div
      class="q-pa-sm justify-center col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
    >
      <div class="row q-pa-md justify-end">
        <div
          class="col-xs-12 text-secondary movilTitle"
          style="align-self: center; text-align: center; font-size: 25px"
        >
          <p><strong>MANTENIMIENTO - UNIDADES DE TRANSPORTE</strong></p>
        </div>
        <div
          class="col-md-5 col-sm-6 col-xs-12 marginHeader marginHeaderMobile"
          style="align-self: center"
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
          class="col-md-2 col-sm-3 col-xs-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar Unidad"
            rounded
            color="primary"
            @click="unidadesDialog = true"
            @click.capture="resetForm()"
            :disabled="this.disabledCreate"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md">
        <q-table
          :rows="datos"
          binary-state-sort
          row-key="id"
          :columns="columns"
          :loading="loading"
          :separator="separator"
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
                :disabled="this.disabledEdit"
                @click="
                  getData(`/unidades/${props.row.id}`, 'setDataEdit', 'form');
                  unidadesDialog = true;
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
                          getData(
                            `/unidades/${props.row.id}`,
                            'setDataEdit',
                            'form'
                          );
                          unidadesDialog = true;
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

    <methods
      ref="methods"
      @get-Data="
        getData('/unidades', 'setData', 'datos');
        this.loading = true;
      "
      @set-data="setData"
      @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit"
    >
    </methods>

    <desactivate-crud
      ref="desactivateCrud"
      @desactivar-Crud="desactivarCrud"
    ></desactivate-crud>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { LocalStorage } from "quasar";

import methodsVue from "src/components/methods.vue";

import rulesVue from "src/components/rules.vue";

import desactivateCrudVue from "src/components/desactivateCrud.vue";

import CurrencyInput from "src/components/CurrencyInput.vue";

export default {
  components: {
    "desactivate-crud": desactivateCrudVue,
    methods: methodsVue,
    CurrencyInput,
    rulesVue,
  },
  data() {
    return {
      columns: [
        {
          name: "placas",
          label: "Numero de Placa",
          field: "placas",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "chofer",
          label: "Chofer",
          field: "chofer",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "descripcion",
          label: "Descripcion de Unidad",
          field: "descripcion",
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
        placas: "",
        chofer: "",
        descripcion: "",
      },
      datos: [],
      form: {
        id: "",
        placas: "",
        chofer: "",
        descripcion: "",
      },
      selected: [],
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
      rowsPerPage: 9,
      // rowsNumber: xx if getting data from a server
    });
    return {
      pagination: ref({
        rowsPerPage: 9,
      }),
      loading: ref(false),
      separator: ref("vertical"),
      unidadesDialog: ref(false),
      medium: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Mantenimiento - Unidades de Transporte",
      ""
    );
    this.getData("/unidades", "setData", "datos");
    this.loading = true;
    this.$refs.desactivateCrud.desactivarCrud(
      "c_unidades",
      "r_unidades",
      "u_unidades",
      "d_unidades",
      "desactivarCrud"
    );
  },
  methods: {
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

    // METODOS DE PAGINA
    
    // Metodo para Get de Datos
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes);
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.resetForm();
      this.form.id = res.id;
      this.form.descripcion = res.descripcion;
      this.form.placas = res.placas;
      this.form.chofer = res.chofer;
      this.loading = false;
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/unidades/${idpost}`, "getData");
      this.loading = true;
    },
    // Metodo para Crear y Editar Datos
    sendData() {
      if (!this.form.id) {
        this.$refs.methods.createData("/unidades", this.form, "getData");
        this.resetForm();
        this.unidadesDialog = false
        this.loading = true;
      } else {
        this.$refs.methods.putData(`/unidades/${this.form.id}`, this.form, "getData");
        this.unidadesDialog = false;
        this.resetForm();
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id,
        (this.form.chofer = ""),
        (this.form.descripcion = ""),
        (this.form.placas = ""),
        (this.create = false);
    },
  },
};
</script>

<style>
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
  .marginHeader {
    padding-right: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .marginHeaderFilter {
    padding-right: 20px;
  }
}
@media screen and (max-width: 600px) {
  .marginHeaderMobile {
    margin-bottom: 25px;
  }
}
@media screen and (max-width: 600px) {
  .paddingMobile {
    padding-left: 2px;
    padding-right: 2px;
  }
}
@media screen and (min-width: 1024px) {
  .marginHeaderPC {
    margin-bottom: 20px;
  }
}
</style>
