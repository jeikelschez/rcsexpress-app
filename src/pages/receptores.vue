<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.nb_receptor" label="Nombre" hint="" class="pcform" lazy-rules :rules="[
                  (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
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
                  form.nb_receptor = form.nb_receptor.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select outlined v-model="form.flag_activo" label="Estatus" :rules="[
                  (val) => this.$refs.rulesVue.isReqSelect(val, 'Requerido'),
                ]" hint="" :options="estatus" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="block" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input outlined v-model="form.dir_receptor" label="Direccion" :rules="[
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
                ]" hint="" lazy-rules @update:model-value="
                  form.dir_receptor = form.dir_receptor.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.tlf_receptor" label="Teléfonos" :rules="[
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
                ]" hint="" lazy-rules class="pcform" @update:model-value="
                  form.tlf_receptor = form.tlf_receptor.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.cel_receptor" label="Celular" :rules="[
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
                ]" hint="" lazy-rules @update:model-value="
                  form.cel_receptor = form.cel_receptor.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="phone_iphone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.cedula_receptor" label="Cedula" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      20,
                      'Maximo 20 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" hint="" lazy-rules class="pcform" @update:model-value="
                  form.cedula_receptor = form.cedula_receptor.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="contacts" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.placa" label="Placa" :rules="[
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
                ]" hint="" lazy-rules @update:model-value="form.placa = form.placa.toUpperCase()">
                  <template v-slot:prepend>
                    <q-icon name="money" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input outlined v-model="form.vehiculo" label="Descripcion de Vehiculo" :rules="[
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
                ]" hint="" lazy-rules @update:model-value="
                  form.vehiculo = form.vehiculo.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="directions_car" />
                  </template>
                </q-input>
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
      <div class="row justify-end q-pa-md">
        <div class="col-md-12 col-xs-12 text-secondary movilTitle" style="align-self: center; text-align: center">
          <h4><strong>MANTENIMIENTO - RECEPTORES</strong></h4>
        </div>
        <div class="col-md-6 col-sm-7 col-xs-12 cardMargin selectMobile" style="align-self: center">
          <q-input v-model="filter" rounded outlined standout type="search" label="Búsqueda avanzada">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12" style="text-align: center; align-self: center">
          <q-btn label="Insertar Receptor" rounded color="primary" @click="dialog = true" @click.capture="resetForm()"
            :disabled="this.allowOption(2)"></q-btn>
        </div>
      </div>

      <div class="row q-pa-md q-gutter-y-md">
        <q-table :rows="datos" row-key="id" :columns="columns" binary-state-sort :loading="loading"
          :separator="separator" :filter="filter" style="width: 100%" :grid="$q.screen.xs"
          v-model:pagination="pagination">
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn dense round flat color="primary" icon="edit" :disabled="this.allowOption(3)" @click="
                getData(`/receptores/${props.row.id}`, 'setDataEdit', 'form');
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
                            `/receptores/${props.row.id}`,
                            'setDataEdit',
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
      getData('/receptores', 'setData', 'datos');
      this.loading = true;
    " @set-data="setData" @reset-Loading="resetLoading" @set-Data-Edit="setDataEdit"
      @set-Data-Permisos="setDataPermisos">
    </methods>
    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
  },
  data() {
    return {
      columns: [
        {
          name: "nb_receptor",
          label: "Nombre",
          field: "nb_receptor",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cedula_receptor",
          label: "Cedula de Receptor",
          field: "cedula_receptor",
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
          name: "action",
          label: "Acciones",
          align: "center",
          sortable: true,
          required: true,
        },
      ],
      form: {
        nb_receptor: "",
        dir_receptor: "",
        tlf_receptor: "",
        cel_receptor: "",
        cedula_receptor: "",
        placa: "",
        vehiculo: "",
        flag_activo: [],
      },
      estatus: [
        { label: "ACTIVO", value: "A" },
        { label: "INACTIVO", value: "I" },
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
      dialog: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData("/receptores", "setData", "datos");
    this.$emit("changeTitle", "SCEN - Mantenimiento - Receptores", "");
    this.loading = true;

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        menu: "receptores"
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

    // METODOS DE PAGINA

    // Metodo para Hacer Get de Datos
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
        },
      });
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.form.id = res.id;
      this.form.nb_receptor = res.nb_receptor;
      this.form.dir_receptor = res.dir_receptor;
      this.form.tlf_receptor = res.tlf_receptor;
      this.form.cel_receptor = res.cel_receptor;
      this.form.cedula_receptor = res.cedula_receptor;
      this.form.placa = res.placa;
      this.form.vehiculo = res.vehiculo;
      this.form.flag_activo = res.activo_desc;
      this.loading = false;
    },
    // Metodo para Eliminar Datos 
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/receptores/${idpost}`, "getData", {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
        },
      });
      this.loading = true;
    },
    // Metodo para Editar o Crear Datos
    sendData() {
      this.form.flag_activo = this.form.flag_activo.value;
      if (!this.form.id) {
        this.$refs.methods.createData("/receptores", this.form, "getData", {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        });
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/receptores/${this.form.id}`,
          this.form,
          "getData",
          {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          }
        );
        this.dialog = false;
        this.resetForm();
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.nb_receptor = "";
      this.form.dir_receptor = "";
      this.form.tlf_receptor = "";
      this.form.cel_receptor = "";
      this.form.cedula_receptor = "";
      this.form.cedula_receptor = "";
      this.form.flag_activo = "";
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
