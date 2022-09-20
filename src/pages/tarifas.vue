<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_urgencia"
                  label="Tipo de Urgencia"
                  class="pcform"
                  input-class="input"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  hint=""
                  :options="urgencias"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_tarifa"
                  label="Tipo de Tarifa"
                  class="pcform"
                  input-class="input"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  hint=""
                  :options="tarifas"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_ubicacion"
                  label="Tipo de Ubicación"
                  input-class="input"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  hint=""
                  :options="ubicacion"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.monto_tarifa"
                  label="Monto de Tarifa"
                  v-money="money"
                  input-class="text-right"
                  hint=""
                  class="pcform"
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.kgr_hasta"
                  label="Kgrs Hasta"
                  v-money="money"
                  input-class="text-right"
                  class="pcform"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        6,
                        'Maximo 6 Caracteres'
                      ) || '',
                  ]"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="123" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_carga"
                  label="Tipo de Carga"
                  input-class="input"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  hint=""
                  :options="cargas"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.modalidad_pago"
                  label="Modalidad de Pago"
                  class="pcform"
                  input-class="input"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  hint=""
                  :options="modalidad_pago"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.pagado_en"
                  label="Lugar de Pago"
                  class="pcform"
                  input-class="input"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  hint=""
                  :options="ubicacion_pago"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.region_origen"
                  label="Region Origen"
                  input-class="input"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  hint=""
                  :options="region_origen"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.region_destino"
                  label="Region Destino"
                  input-class="input"
                  class="pcform"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  hint=""
                  :options="region_destino"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tiempo_servicio"
                  label="Tiempo (HRS) Servicio"
                  hint=""
                  type="number"
                  lazy-rules
                  min="0"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
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
      class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 q-pa-sm justify-center"
    >
      <div class="justify-end q-pa-md row">
        <div
          class="col-md-4 col-xs-12 text-secondary movilTitle"
          style="align-self: center; text-align: center"
        >
          <h4><strong>MANTENIMIENTO - TARIFAS</strong></h4>
        </div>
        <div
          class="col-md-6 col-sm-7 col-xs-12 cardMargin selectMobile"
          style="align-self: center"
        >
          <q-input
            v-model="filter"
            rounded
            dense
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
          class="col-md-2 col-sm-4 col-xs-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar Tarifa"
            rounded
            color="primary"
            @click="dialog = true"
            @click.capture="resetForm()"
            :disabled="this.allowOption(2)"
          ></q-btn>
        </div>
      </div>

      <div class="row q-gutter-y-md q-pa-md">
        <q-table
          :rows="datos"
          :loading="loading"
          binary-state-sort
          row-key="id"
          :columns="columns"
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
                :disabled="this.allowOption(3)"
                @click="
                  getData(`/tarifas/${props.row.id}`, 'setDataEdit', 'form');
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
                            `/tarifas/${props.row.id}`,
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
      @get-Data="
        getData('/tarifas', 'setData', 'datos');
        this.loading = true;
      "
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
          name: "monto_tarifa",
          label: "Monto de Tarifa",
          field: "monto_tarifa",
          align: "right",
          sortable: true,
          required: true,
        },
        {
          name: "urgencia_desc",
          label: "Tipo de Urgencia",
          field: "urgencia_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tarifa_desc",
          label: "Tipo de Tarifa",
          field: "tarifa_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "ubicacion_desc",
          label: "Tipo de Ubicación",
          field: "ubicacion_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "origen_desc",
          label: "Region Origen",
          field: "origen_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "destino_desc",
          label: "Region Destino",
          field: "destino_desc",
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
        monto_tarifa: "",
        tipo_urgencia: [],
        tipo_tarifa: [],
        tipo_ubicacion: [],
        kgr_hasta: "",
        tipo_carga: [],
        modalidad_pago: [],
        pagado_en: [],
        region_origen: [],
        region_destino: [],
        tiempo_servicio: "",
      },
      urgencias: [
        { label: "NORMAL", value: "N" },
        { label: "EMERGENCIA", value: "E" },
      ],
      tarifas: [
        { label: "BÁSICA", value: "BA" },
        { label: "KGRS.ADICIONALES", value: "KA" },
      ],
      ubicacion: [
        { label: "URBANA", value: "U" },
        { label: "EXTRA-URBANA", value: "E" },
      ],
      cargas: [
        { label: "PAQUETES", value: "PM" },
        { label: "SOBRE-BULTOS", value: "SB" },
      ],
      modalidad_pago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
      ],
      ubicacion_pago: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      region_origen: [
        { label: "CENTRAL", value: "CE" },
        { label: "OCCIDENTAL", value: "OC" },
        { label: "ORIENTAL", value: "OR" },
      ],
      region_destino: [
        { label: "CENTRAL", value: "CE" },
        { label: "OCCIDENTAL", value: "OC" },
        { label: "ORIENTAL", value: "OR" },
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
      // rowsNumber: xx if getting data from a server
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
    this.$emit("changeTitle", "SCEN - Mantenimiento - Tarifas", "");
    this.getData("/tarifas", "setData", "datos");
    this.loading = true;

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "tarifas",
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

    // Metodo para hacer Get de Datos
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
      this.form.id = res.id;
      this.form.monto_tarifa = res.monto_tarifa;
      this.form.kgr_hasta = res.kgr_hasta;
      this.form.tiempo_servicio = res.tiempo_servicio;
      this.form.tipo_urgencia = res.urgencia_desc;
      this.form.tipo_tarifa = res.tarifa_desc;
      this.form.tipo_ubicacion = res.ubicacion_desc;
      this.form.tipo_carga = res.carga_desc;
      this.form.modalidad_pago = res.modalidad_desc;
      this.form.pagado_en = res.pagado_desc;
      this.form.region_origen = res.origen_desc;
      this.form.region_destino = res.destino_desc;
      this.form.tiempo_servicio = res.tiempo_servicio;
      this.loading = false;
      if (this.form.tiempo_servicio == null) {
        this.form.tiempo_servicio = "";
      }
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/tarifas/${idpost}`, "getData");
      this.loading = true;
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      this.form.kgr_hasta = this.form.kgr_hasta
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.monto_tarifa = this.form.monto_tarifa
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.tipo_urgencia = this.form.tipo_urgencia.value;
      this.form.tipo_tarifa = this.form.tipo_tarifa.value;
      this.form.tipo_ubicacion = this.form.tipo_ubicacion.value;
      this.form.tipo_carga = this.form.tipo_carga.value;
      this.form.modalidad_pago = this.form.modalidad_pago.value;
      this.form.pagado_en = this.form.pagado_en.value;
      this.form.region_origen = this.form.region_origen.value;
      this.form.region_destino = this.form.region_destino.value;
      if (!this.form.id) {
        this.$refs.methods.createData("/tarifas", this.form, "getData");
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/tarifas/${this.form.id}`,
          this.form,
          "getData"
        );
        this.dialog = false;
        this.resetForm();
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.monto_tarifa = "0";
      this.form.kgr_hasta = "";
      this.form.tiempo_servicio = "";
      this.form.tipo_urgencia = "";
      this.form.tipo_tarifa = "";
      this.form.tipo_ubicacion = "";
      this.form.tipo_carga = "";
      this.form.modalidad_pago = "";
      this.form.pagado_en = "";
      this.form.region_destino = "";
      this.form.region_origen = "";
      this.form.tiempo_servicio = "";
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
