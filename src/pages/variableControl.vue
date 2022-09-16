<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.nombre" label="Descripción de Variable" hint="" class="pcform"
                  lazy-rules :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        50,
                        'Maximo 50 Caracteres'
                      ) || '',
                  ]" @update:model-value="form.nombre = form.nombre.toUpperCase()">
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input upper-case outlined v-model="form.valor" label="Valor de Variable" v-money="money"
                  input-class="text-right" hint="" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-select outlined v-model="form.tipo" label="Tipo de Variable" hint="" :options="tipo" lazy-rules
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]">
                  <template v-slot:prepend>
                    <q-icon name="done_all" />
                  </template>
                </q-select>
              </div>
            </div>

            <div class="full-width row justify-center items-center content-center">
              <q-btn label="Enviar" type="submit" color="primary" class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add" />
              <q-btn label="Cerrar" color="primary" flat class="col-md-5 col-sm-5 col-xs-12 btnmovil" icon="close"
                v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="justify-center" style="margin-top: 7px">
      <div class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary justify-end">
        <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 movilTitle">
          <p style="font-size: 25px; align-self: center; text-align: center; margin-top: 15px">
            <strong>MANTENIMIENTO - VARIABLE CONTROL</strong>
          </p>
        </div>
        <div class="col-md-6 col-sm-7 col-xs-12 cardMargin selectMobile" style="align-self: center; align-self: center">
          <q-input v-model="filter" rounded outlined standout type="search" label="Búsqueda avanzada">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-md-2 col-xl-3 col-xs-12 col-sm-4" style="text-align: center; align-self: center">
          <q-btn label="Insertar" rounded style="text-align: center; align-self: center" color="primary"
            :disabled="this.allowOption(2)" @click="
              dialog = true;
              this.resetForm();
            " size="16px" class="q-px-xl q-py-xs"></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <q-table :rows="datos" row-key="id" binary-state-sort :columns="columns" :separator="separator"
          :loading="loading" :filter="filter" style="width: 100%" :grid="$q.screen.xs" v-model:pagination="pagination">
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:body-cell-tipo="props">
            <q-td :props="props">
              <q-select outlined v-model="props.row.tipo_desc" :options="tipo" @update:model-value="
                getData(
                  `/vcontrol/${props.row.id}`,
                  `putDataSelect`,
                  'form'
                );
                this.form.tipo = props.row.tipo_desc.value;
              ">
              </q-select>
            </q-td>
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn dense round flat color="primary" icon="edit" :disabled="this.allowOption(3)" @click="
                getData(
                  `/vcontrol/${props.row.id}`,
                  `setDataEdit`,
                  'form'
                );
                dialog = true;
              "></q-btn>
              <q-btn dense round flat color="primary" icon="delete" :disabled="this.allowOption(4)"
                @click="selected = props.row.id" @click.capture="deletePopup = true"></q-btn>
            </q-td>
          </template>
          <template v-slot:item="props">
            <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''">
              <q-card :class="props.selected ? 'bg-grey-2' : ''">
                <q-list dense>
                  <q-item v-for="col in props.cols" :key="col.name">
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-chip v-if="col.name === 'status'" :color="
                        props.row.status == 'Active'
                          ? 'green'
                          : props.row.status == 'Disable'
                          ? 'red'
                          : 'grey'
                      " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}</q-chip>
                      <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="edit"
                        :disabled="this.allowOption(3)" @click="
                          getData(
                            `/vcontrol/${props.row.id}`,
                            `setDataEdit`,
                            'form'
                          );
                          dialog = true;
                        "></q-btn>
                      <q-chip v-if="col.name === 'status'" :color="
                        props.row.status == 'Active'
                          ? 'green'
                          : props.row.status == 'Disable'
                          ? 'red'
                          : 'grey'
                      " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}</q-chip>
                      <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="delete"
                        :disabled="this.allowOption(4)" @click="selected = props.row.id"
                        @click.capture="deletePopup = true"></q-btn>
                    </q-item-section>
                    <q-item-section side>
                      <q-chip v-if="col.name === 'status'" :color="
                        props.row.status == 'Active'
                          ? 'green'
                          : props.row.status == 'Disable'
                          ? 'red'
                          : 'grey'
                      " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}</q-chip>
                      <q-select v-else-if="col.name === 'tipo'" outlined v-model="props.row.tipo_desc" :options="tipo"
                        @update:model-value="
                          getData(
                            `/vcontrol/${props.row.id}`,
                            `putDataSelect`,
                            'form'
                          );
                          this.form.tipo = props.row.tipo_desc.value;
                        ">
                      </q-select>
                      <q-item-label v-else caption :class="col.classes ? col.classes : ''">{{ col.value }}
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
            ¿Estás seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Aceptar" color="primary" v-close-popup @click="deleteData(selected)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods ref="methods" @get-Data="
      getData('/vcontrol', 'setData', 'datos');
      this.loading = true;
    " @set-Data="setData" @reset-Loading="resetLoading" @set-Data-Edit="setDataEdit" @put-Data-Select="putDataSelect"
      @set-Data-Permisos="setDataPermisos"></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
import methodsVue from "src/components/methods.vue";
import { VMoney } from "v-money";

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
      tipo: [
        { label: "STRING", value: "1" },
        { label: "ENTERO", value: "2" },
        { label: "DECIMAL", value: "3" },
        { label: "FECHA", value: "4" },
        { label: "ENTERO LARGO", value: "5" },
      ],
      tipos: [],
      datos: [],
      rpermisos: [],
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
      loading: ref(false),
      dialog: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Variable Control", "");
    this.getData("/vcontrol", "setData", "datos");
    this.loading = true;

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        menu: "variablecontrol"
      },
    });
  },
  methods: {
    // Metodos para Resetear Datos
    resetLoading() {
      this.loading = false;
    },
    // Metodo para buscar y Setear Datos en Selects
    filterSelect(array, codigo, searched, selectedOption, selectedOptionValue) {
      var find = this[array].findIndex((item) => item[codigo] == searched);
      if (find >= 0) {
        this[selectedOption][selectedOptionValue] = this[array][find];
      } else {
        this[selectedOption][selectedOptionValue] = { label: "", value: null };
      }
    },
    // Metodo para validar Permisos
    allowOption(option) {
      return this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0;
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // METODOS DE PAGINA

    // Metodos para hacer Get de Datos
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    // Metodos para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodos para Setear Datos para Seleccionar
    setDataEdit(res, dataRes) {
      this.filterSelect("tipo", "value", res.tipo, "form", "tipo");
      this[dataRes].id = res.id;
      this[dataRes].nombre = res.nombre;
      this[dataRes].valor = res.valor;
    },
    // Metodos para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/vcontrol/${idpost}`, "getData");
      this.loading = true;
    },
    // Metodos para Editar y Crear Datos
    sendData() {
      this.form.valor = this.form.valor
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.tipo = this.form.tipo.value;
      if (!this.form.id) {
        this.$refs.methods.createData("/vcontrol", this.form, "getData");
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/vcontrol/${this.form.id}`,
          this.form,
          "getData"
        );
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      }
    },
    // Metodos para Actualizar con Selects de Tabla
    putDataSelect(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nombre = res.nombre;
      this[dataRes].valor = res.valor;

      this.$refs.methods.putData(
        `/vcontrol/${this.form.id}`,
        this.form,
        "getData"
      );
      this.loading = true;
    },
    // Metodos para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.nombre = "";
      this.form.tipo = "";
      this.form.valor = "";
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

@media screen and (max-width: 600px) {
  .selectMobile {
    margin-bottom: 25px !important;
  }
}
</style>
