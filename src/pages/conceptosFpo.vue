<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.cod_fpo"
                  label="Codigo"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(val, 6, 'Maximo 6 Caracteres'),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || ']',
                  ]"
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
                  v-money="money"
                  input-class="text-right"
                  hint=""
                  class="pcform"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        13,
                        'Maximo 10 Caracteres'
                      ) || '',
                  ]"
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
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        40,
                        'Maximo 40 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || ']',
                  ]"
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
                      style="
                        align-self: center;
                        text-align: left;
                        margin-top: -30px;
                      "
                    >
                      <h4 style="font-size: 20px" class="text-secondary">
                        <strong>FECHAS DE VALIDEZ</strong>
                      </h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-input
                        outlined
                        label="Inicial"
                        hint=""
                        v-model="form.f_val"
                        class="pcform"
                        lazy-rules
                        mask="##/##/####"
                        :rules="[
                          (val) => this.$refs.rulesVue.checkDate(val, '') || '',
                        ]"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="form.f_val"
                                @input="() => $refs.qDateProxy.hide()"
                                mask="DD/MM/YYYY"
                                @update:model-value="
                                  this.$refs.qDateProxy.hide()
                                "
                              ></q-date>
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
                        v-model="form.f_anul"
                        class="pcform"
                        lazy-rules
                        mask="##/##/####"
                        :rules="[
                          (val) => this.$refs.rulesVue.checkDate(val, '') || '',
                        ]"
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="form.f_anul"
                                @input="() => $refs.qDateProxy.hide()"
                                mask="DD/MM/YYYY"
                                @update:model-value="
                                  this.$refs.qDateProxy.hide()
                                "
                              ></q-date>
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
                      style="
                        align-self: center;
                        text-align: left;
                        margin-top: -30px;
                      "
                    >
                      <h4 style="font-size: 20px" class="text-secondary">
                        <strong>RANGOS DE PESO</strong>
                      </h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-input
                        outlined
                        v-model="form.peso_inicio"
                        label="Inicial"
                        hint=""
                        v-money="money"
                        input-class="text-right"
                        class="pcform"
                        lazy-rules
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isMax(
                              val,
                              5,
                              'Maximo 4 Caracteres'
                            ) || ']',
                        ]"
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
                        v-money="money"
                        input-class="text-right"
                        lazy-rules
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isMax(
                              val,
                              5,
                              'Maximo 4 Caracteres'
                            ) || ']',
                        ]"
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
                @click="setData()"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="q-pa-sm justify-center">
      <div class="row q-pa-md justify-end">
        <div
          class="col-md-4 col-xs-12 text-secondary movilTitle"
          style="align-self: center; text-align: center"
        >
          <h4><strong>CONCEPTOS DE FLANQUEO POSTAL OBLIGATORIO</strong></h4>
        </div>
        <div
          class="col-md-5 col-sm-7 col-xs-12 cardMargin selectMovil"
          style="align-self: center"
        >
          <q-input
            v-model="filter"
            rounded
            outlined
            standout
            dense
            type="search"
            label="Búsqueda avanzada"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-sm-4 col-xs-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar Concepto"
            rounded
            color="primary"
            @click="
              dialog = true;
              this.resetForm();
            "
            :disabled="this.allowOption(2)"
          ></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
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
                  getData(`/fpos/${props.row.id}`, 'setDataEdit', 'form');
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
                        :disabled="this.allowOption(3)"
                        @click="
                          getData(
                            `/fpos/${props.row.id}`,
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
                        @click.capture="deletePopup = true"
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
      @get-Data="getData('/fpos', 'setData', 'datos')"
      @set-data="setData"
      @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit"
      @set-Data-Permisos="setDataPermisos"
    >
    </methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import { VMoney } from "v-money";
import methodsVue from "src/components/methods.vue";
import rulesVue from "src/components/rules.vue";

export default {
  directives: { money: VMoney },
  components: {
    methods: methodsVue,
    VMoney,
    rulesVue,
  },
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: true,
      },
      columns: [
        {
          name: "cod_fpo",
          label: "Código",
          field: "cod_fpo",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "desc_tipo",
          label: "Descripción",
          field: "desc_tipo",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "f_anul",
          label: "Valido Hasta",
          field: "f_anul",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "valor",
          label: "Valor",
          field: "valor",
          align: "right",
          sortable: true,
          required: true,
        },
        {
          name: "peso_inicio",
          label: "Rango de Peso Inicial",
          field: "peso_inicio",
          align: "right",
          sortable: true,
          required: true,
        },
        {
          name: "peso_fin",
          label: "Rango de Peso Final",
          field: "peso_fin",
          align: "right",
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
        cod_fpo: "",
        desc_tipo: "",
        valor: 0,
        f_val: "",
        f_anul: "",
        peso_inicio: 0,
        peso_fin: 0,
      },
      datos: [],
      selected: [],
      rpermisos: [],
      error: "",
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 5,
    });
    return {
      pagination: ref({
        rowsPerPage: 5,
      }),
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Conceptos FPO", "");
    this.getData("/fpos", "setData", "datos");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "conceptosfpo",
      },
    });
  },
  methods: {
    // Metodo para Resetear Carga
    resetLoading() {
      this.loading = false;
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

    // Metodo para Hacer Get de Datos
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes);
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodo para Setear Datos seleccionados
    setDataEdit(res, dataRes) {
      this.loading = false;
      this.form.id = res.id;
      this.form.cod_fpo = res.cod_fpo;
      this.form.desc_tipo = res.desc_tipo;
      this.form.valor = res.valor;
      this.form.f_val = res.f_val.split("-").reverse().join("/");
      this.form.f_anul = res.f_anul.split("-").reverse().join("/");
      this.form.peso_inicio = res.peso_inicio;
      this.form.peso_fin = res.peso_fin;
      this.form.valor = res.valor;
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/fpos/${idpost}`, "getData");
      this.loading = true;
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      this.form.valor = this.form.valor
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.peso_inicio = this.form.peso_inicio
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.peso_fin = this.form.peso_fin
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.f_val = this.form.f_val.split("/").reverse().join("-");
      this.form.f_anul = this.form.f_anul.split("/").reverse().join("-");
      if (!this.form.id) {
        this.$refs.methods.createData("/fpos", this.form, "getData");
        this.resetForm();
        this.loading = true;
        this.dialog = false;
      } else {
        this.$refs.methods.putData(
          `/fpos/${this.form.id}`,
          this.form,
          "getData"
        );
        this.edit = false;
        this.resetForm();
        this.loading = true;
        this.dialog = false;
      }
    },
    resetForm() {
      delete this.form.id;
      this.form.cod_fpo = "";
      this.form.desc_tipo = "";
      this.form.valor = "";
      this.form.f_anul = "";
      this.form.f_val = "";
      this.form.peso_inicio = "";
      this.form.peso_fin = "";
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

@media screen and (max-width: 1024px) {
  .buttonMargin {
    margin-bottom: 20px !important;
  }
}

@media screen and (max-width: 600px) {
  .selectMovil {
    margin-bottom: 20px !important;
  }
}
</style>
