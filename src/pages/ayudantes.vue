<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="max-width: 60vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.nb_ayudante" label="Nombre" hint="" class="pcform" lazy-rules :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      50,
                      'Maximo 50 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" @update:model-value="
                  form.nb_ayudante = form.nb_ayudante.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.tlf_ayudante" label="Teléfono" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      50,
                      'Maximo 50 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" hint="" lazy-rules mask="### - ### - ##########">
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input outlined v-model="form.dir_ayudante" label="Direccion" hint="" :rules="[
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
                ]" lazy-rules @update:model-value="
                  form.dir_ayudante = form.dir_ayudante.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-select outlined v-model="form.flag_activo" label="Vigente" hint="" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                ]" :options="vigente" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="rule" />
                  </template>
                </q-select>
              </div>
            </div>

            <div class="full-width row justify-center items-center content-center" style="margin-bottom: 10px">
              <q-btn label="Enviar" type="submit" color="primary" class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add" />
              <q-btn label="Cerrar" color="primary" flat class="col-md-5 col-sm-5 col-xs-12 btnmovil" icon="close"
                v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="q-pa-sm justify-center col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
      <div class="row q-pa-md justify-end">
        <div class="col-md-4 col-xs-12 text-secondary movilTitle" style="align-self: center; text-align: center">
          <h4><strong>MANTENIMIENTO - AYUDANTES</strong></h4>
        </div>
        <div class="col-md-6 col-sm-7 col-xs-12 cardMargin selectMobile" style="align-self: center">
          <q-input v-model="filter" rounded outlined standout type="search" label="Búsqueda avanzada">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12" style="text-align: center; align-self: center">
          <q-btn label="Insertar Ayudante" rounded color="primary" @click="
            dialog = true;
            this.resetForm();
          " :disabled="this.allowOption(2)"></q-btn>
        </div>
      </div>

      <div class="row q-pa-md q-gutter-y-md">
        <q-table :rows="datos" binary-state-sort row-key="id" :loading="loading" :columns="columns"
          :separator="separator" :filter="filter" style="width: 100%" :grid="$q.screen.xs"
          v-model:pagination="pagination">
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn dense round flat color="primary" icon="edit" :disabled="this.allowOption(3)" @click="
                getData(`/ayudantes/${props.row.id}`, 'setDataEdit', 'form');
                this.resetForm();
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
                            `/ayudantes/${props.row.id}`,
                            'setDataEdit',
                            'form'
                          );
                          this.resetFormEdit();
                          edit = true;
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
            ¿Estas seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Aceptar" color="primary" v-close-popup @click="deleteData(selected)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods ref="methods" @get-Data="
      getData('/ayudantes', 'setData', 'datos');
      this.loading = true;
    " @set-Data="setData" @reset-Loading="resetLoading" @set-data-Edit="setDataEdit"
      @set-Data-Permisos="setDataPermisos">
    </methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
import methodsVue from "src/components/methods.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
  },
  name: "Ayudantes",
  data() {
    return {
      columns: [
        {
          name: "nb_ayudante",
          label: "Nombre",
          field: "nb_ayudante",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "activo_desc",
          label: "Estatus",
          field: "activo_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "dir_ayudante",
          label: "Direccion",
          field: "dir_ayudante",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tlf_ayudante",
          label: "Telefono",
          field: "tlf_ayudante",
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
        nb_ayudante: "",
        dir_ayudante: "",
        tlf_ayudante: "",
        flag_activo: "",
      },
      vigente: [
        { label: "ACTIVO", value: "1" },
        { label: "INACTIVO", value: "0" },
      ],
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
      loading: ref(false),
      dialog: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Ayudantes", "");
    this.getData("/ayudantes", "setData", "datos");
    this.loading = true;

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        menu: "ayudantes"
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
      return this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0;
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // METODOS DE PAGINAS

    // Metodo para Hacer Get de Datos
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes);
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodo para Setear Datos de Ayudante Seleccionado
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nb_ayudante = res.nb_ayudante;
      this[dataRes].dir_ayudante = res.dir_ayudante;
      this[dataRes].tlf_ayudante = res.tlf_ayudante;
      this[dataRes].flag_activo = res.activo_desc;
      this.loading = false;
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/ayudantes/${idpost}`, "getData");
      this.loading = true;
    },
    // Metodo para Editar o Crear Datos
    sendData() {
      this.form.flag_activo = this.form.flag_activo.value;
      if (!this.form.id) {
        this.$refs.methods.createData("/ayudantes", this.form);
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/ayudantes/${this.form.id}`,
          this.form,
          "getData"
        );
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.nb_ayudante = null;
      this.form.dir_ayudante = null;
      this.form.tlf_ayudante = null;
      this.form.flag_activo = null;
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
