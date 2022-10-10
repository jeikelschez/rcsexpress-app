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
                  hint=""
                  :options="tipoUrgencia"
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
                  hint=""
                  :options="tipoTarifa"
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
                  hint=""
                  :options="tipoUbicacion"
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
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 14),
                  ]"
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
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 8)]"
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
                  hint=""
                  :options="tipoCarga"
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
                  hint=""
                  :options="modalidadPago"
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
                  hint=""
                  :options="pagadoEn"
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
                  hint=""
                  :options="regiones"
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
                  hint=""
                  :options="regiones"
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
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 3)]"
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
              class=" row justify-center items-center content-center"
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
            label="Insertar"
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
          :rows="tarifas"
          :loading="loading"
          binary-state-sort
          row-key="id"
          :columns="columns"
          :separator="separator"
          :rows-per-page-options="[5, 10, 15, 20, 50]"
          :filter="filter"
          style="width: 100%"
          :grid="$q.screen.xs"
          v-model:pagination="pagination"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" class="loading" />
          </template>
          <template v-slot:body-cell-tipo_urgencia="props">
            <q-td :props="props">
              {{ filterDesc("tipoUrgencia", props.row.tipo_urgencia) }}
            </q-td>
          </template>
          <template v-slot:body-cell-tipo_tarifa="props">
            <q-td :props="props">
              {{ filterDesc("tipoTarifa", props.row.tipo_tarifa) }}
            </q-td>
          </template>
          <template v-slot:body-cell-tipo_ubicacion="props">
            <q-td :props="props">
              {{ filterDesc("tipoUbicacion", props.row.tipo_ubicacion) }}
            </q-td>
          </template>
          <template v-slot:body-cell-region_origen="props">
            <q-td :props="props">
              {{ filterDesc("regiones", props.row.region_origen) }}
            </q-td>
          </template>
          <template v-slot:body-cell-region_destino="props">
            <q-td :props="props">
              {{ filterDesc("regiones", props.row.region_destino) }}
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
                :disabled="this.allowOption(3)"
                @click="
                  this.$refs.methods.getData(
                    `/tarifas/${props.row.id}`,
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
                    <q-item-section side class="itemMovilSide">
                      <q-item-label v-if="col.name === 'tipo_urgencia'">
                        {{
                          filterDesc("tipoUrgencia", props.row.tipo_urgencia)
                        }}
                      </q-item-label>
                      <q-item-label v-if="col.name === 'tipo_tarifa'">
                        {{ filterDesc("tipoTarifa", props.row.tipo_tarifa) }}
                      </q-item-label>
                      <q-item-label v-if="col.name === 'tipo_ubicacion'">
                        {{
                          filterDesc("tipoUbicacion", props.row.tipo_ubicacion)
                        }}
                      </q-item-label>
                      <q-item-label v-if="col.name === 'region_origen'">
                        {{ filterDesc("regiones", props.row.region_origen) }}
                      </q-item-label>
                      <q-item-label v-if="col.name === 'region_destino'">
                        {{ filterDesc("regiones", props.row.region_destino) }}
                      </q-item-label>
                      <q-btn
                        v-if="col.name === 'action'"
                        dense
                        round
                        flat
                        color="primary"
                        icon="edit"
                        :disabled="this.allowOption(3)"
                        @click="
                          this.$refs.methods.getData(
                            `/tarifas/${props.row.id}`,
                            'setDataEdit',
                            'form'
                          );
                          dialog = true;
                        "
                      ></q-btn>
                      <q-btn
                        v-if="col.name === 'action'"
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
                        v-if="
                          col.name != 'tipo_urgencia' &&
                          col.name != 'tipo_tarifa' &&
                          col.name != 'tipo_ubicacion' &&
                          col.name != 'region_origen' &&
                          col.name != 'region_destino'
                        "
                      >
                        {{ col.value }}
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
            @click="
              this.$refs.methods.deleteData(
                `/tarifas/${selected}`,
                'getDataTable'
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data-Edit="setDataEdit"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
    >
    </methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
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
          format: (val) =>
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              currencyDisplay: "code",
            })
              .format(val)
              .replace("EUR", "")
              .trim(),
        },
        {
          name: "tipo_urgencia",
          label: "Tipo de Urgencia",
          field: "tipo_urgencia",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_tarifa",
          label: "Tipo de Tarifa",
          field: "tipo_tarifa",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_ubicacion",
          label: "Tipo de Ubicación",
          field: "tipo_ubicacion",
          align: "left",
          sortable: true,
        },
        {
          name: "region_origen",
          label: "Region Origen",
          field: "region_origen",
          align: "left",
          sortable: true,
        },
        {
          name: "region_destino",
          label: "Region Destino",
          field: "region_destino",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
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
      tipoUrgencia: [
        { label: "NORMAL", value: "N" },
        { label: "EMERGENCIA", value: "E" },
      ],
      tipoTarifa: [
        { label: "BÁSICA", value: "BA" },
        { label: "KGRS.ADICIONALES", value: "KA" },
      ],
      tipoUbicacion: [
        { label: "URBANA", value: "U" },
        { label: "EXTRA-URBANA", value: "E" },
      ],
      tipoCarga: [
        { label: "PAQUETES", value: "PM" },
        { label: "SOBRE-BULTOS", value: "SB" },
      ],
      modalidadPago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
      ],
      pagadoEn: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      regiones: [
        { label: "CENTRAL", value: "CE" },
        { label: "OCCIDENTAL", value: "OC" },
        { label: "ORIENTAL", value: "OR" },
      ],
      pagination: {
        rowsPerPage: 5,
      },
      tarifas: [],
      selected: [],
      rpermisos: [],
      filter: "",
    };
  },
  setup() {
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      deletePopup: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Tarifas", "");
    this.getDataTable();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "tarifas",
      },
    });
  },
  methods: {
    // Metodo para traer el value de los Selects y Columns
    filterDesc(array, value) {
      var find = this[array].findIndex((item) => item.value == value);
      return find >= 0 ? this[array][find].label : null;
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

    // Metodo para Extraer Datos de Tabla
    getDataTable() {
      this.loading = true;
      this.$refs.methods.getData("/tarifas", "setDataTable", "tarifas");
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.form.id = res.id;
      this.form.monto_tarifa = res.monto_tarifa;
      this.form.kgr_hasta = res.kgr_hasta;
      this.form.tiempo_servicio = res.tiempo_servicio;
      this.form.tipo_urgencia = this.filterDesc(
        "tipoUrgencia",
        res.tipo_urgencia
      );
      this.form.tipo_tarifa = this.filterDesc("tipoTarifa", res.tipo_tarifa);
      this.form.tipo_ubicacion = this.filterDesc(
        "tipoUbicacion",
        res.tipo_ubicacion
      );
      this.form.tipo_carga = this.filterDesc("tipoCarga", res.tipo_carga);
      this.form.modalidad_pago = this.filterDesc(
        "modalidadPago",
        res.modalidad_pago
      );
      this.form.pagado_en = this.filterDesc("pagadoEn", res.pagado_en);
      this.form.region_origen = this.filterDesc("regiones", res.region_origen);
      this.form.region_destino = this.filterDesc(
        "regiones",
        res.region_destino
      );
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      this.form.kgr_hasta = this.form.kgr_hasta
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.monto_tarifa = this.form.monto_tarifa
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.tipo_urgencia = this.form.tipo_urgencia
        ? this.form.tipo_urgencia.value
        : null;
      this.form.tipo_tarifa = this.form.tipo_tarifa
        ? this.form.tipo_tarifa.value
        : null;
      this.form.tipo_ubicacion = this.form.tipo_ubicacion
        ? this.form.tipo_ubicacion.value
        : null;
      this.form.tipo_carga = this.form.tipo_carga
        ? this.form.tipo_carga.value
        : null;
      this.form.modalidad_pago = this.form.modalidad_pago
        ? this.form.modalidad_pago.value
        : null;
      this.form.pagado_en = this.form.pagado_en
        ? this.form.pagado_en.value
        : null;
      this.form.region_origen = this.form.region_origen
        ? this.form.region_origen.value
        : null;
      this.form.region_destino = this.form.region_destino
        ? this.form.region_destino.value
        : null;
      if (!this.form.id) {
        this.$refs.methods.createData("/tarifas", this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/tarifas/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
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
