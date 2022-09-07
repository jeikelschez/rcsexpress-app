<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="anulate">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 70vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  label="Fecha"
                  hint=""
                  v-model="form.f_val"
                  mask="date"
                  :rules="['date']"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="form.f_val">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.direccion_banco"
                  label="Motivo"
                  hint=""
                  :rules="[reglaInput]"
                  lazy-rules
                  @update:model-value="
                    form.direccion_banco = form.direccion_banco.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="location_on" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.fax_banco"
                  label="Observación"
                  :rules="[reglaInput]"
                  hint=""
                  lazy-rules
                  mask="#### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Anular Guia"
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
        class="row col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 filterTop"
        style="align-self: center; text-align: center; margin-top: 30px"
      >
        <div
          class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 selectmovil"
          style="align-self: center; text-align: center; margin-bottom: 20px"
        >
          <q-select
            rounded
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agencias"
            option-label="nb_agencia"
            option-value="id"
            v-model="selectedAgencia"
            outlined
            standout
            label="Agencia"
            @update:model-value="
              this.axiosConfig.headers.agencia = this.selectedAgencia.id;
              getData(`/mmovimientos`, 'setData', 'datos');
            "
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>

        <q-card
          bordered
          class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 inputGuias"
          style="align-self: center; text-align: center; margin-right: 26px"
        >
          <q-card-section
            class="row col-md-12 col-xs-12 menuFilter"
            style="align-self: center; text-align: center"
          >
            <div class="col-md-6 col-xs-12">
              <q-input
                outlined
                label="Guia Desde:"
                hint=""
                v-model="guia_desde"
                mask="date"
                :rules="['date']"
                class="pcform"
                lazy-rules
                @keydown.enter="
                  this.axiosConfig.headers.desde = this.guia_desde;
                  getData(`/mmovimientos`, 'setData', 'datos');
                "
                @keydown.tab="
                  this.axiosConfig.headers.desde = this.guia_desde;
                  getData(`/mmovimientos`, 'setData', 'datos');
                "
                @blur="
                  this.axiosConfig.headers.desde = this.guia_desde;
                  getData(`/mmovimientos`, 'setData', 'datos');
                "
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="guia_desde">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
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
                label="Guia Hasta:"
                hint=""
                v-model="guia_hasta"
                mask="date"
                :rules="['date']"
                lazy-rules
                @keydown.enter="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/mmovimientos`, 'setData', 'datos');
                "
                @keydown.tab="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/mmovimientos`, 'setData', 'datos');
                "
                @blur="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/mmovimientos`, 'setData', 'datos');
                "
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="guia_hasta">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div
        class="row col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-5 marginCards"
        style="align-self: center; text-align: center"
      >
        <q-card
          bordered
          class="row col-md-12 col-xs-12 col-xl-12 col-lg-12 col-sm-12 espaciadoGuias"
        >
          <q-card-section class="row col-md-12 col-xs-12">
            <div
              class="col-md-12 col-xs-12 col-sm-12"
              style="align-self: center; text-align: center; margin-top: 15px"
            >
              <p
                style="
                  font-size: 20px;
                  align-self: center;
                  text-align: center;
                  margin-bottom: 20px;
                "
                class="text-secondary"
              >
                <strong>TIPO DE GUIA</strong>
              </p>
            </div>

            <div
              class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 justify-center"
              style="align-self: center; text-align: center"
            >
              <div
                class="col-md-3 col-xs-12 col-sm-12 buttonMenuInitial"
                style="align-self: center; text-align: center"
                id="select"
              >
                <q-field
                  hide-bottom-space
                  borderless
                  dense
                  v-model="selectedGuiaCarga"
                >
                  <template v-slot:control>
                    <q-checkbox
                      size="md"
                      v-model="selectedGuiaCarga"
                      true-value="GC"
                      false-value="0"
                      style="font-size: 13px"
                      label="Guia de Carga"
                      @update:model-value="
                        this.axiosConfig.headers.tipo =
                          this.selectedGuiaCarga.value;
                        getData(`/mmovimientos`, 'setData', 'datos');
                      "
                    />
                  </template>
                </q-field>
              </div>

              <div
                class="col-md-3 col-xs-12 col-sm-12 buttonMenu"
                style="align-self: center; text-align: center"
                id="select"
              >
                <q-field
                  class="check"
                  hide-bottom-space
                  borderless
                  dense
                  v-model="selectedGuiaFactura"
                >
                  <template v-slot:control>
                    <q-checkbox
                      size="md"
                      v-model="selectedGuiaFactura"
                      true-value="GF"
                      false-value="0"
                      style="font-size: 13px"
                      label="Guia de Factura"
                      @update:model-value="
                        this.axiosConfig.headers.tipo =
                          this.selectedGuiaFactura.value;
                        getData(`/mmovimientos`, 'setData', 'datos');
                      "
                    />
                  </template>
                </q-field>
              </div>

              <div
                class="col-md-3 col-xs-12 col-sm-12 buttonMenu"
                style="align-self: center; text-align: center"
                id="select"
              >
                <q-field
                  class="check"
                  hide-bottom-space
                  borderless
                  dense
                  v-model="selectedFactura"
                >
                  <template v-slot:control>
                    <q-checkbox
                      size="md"
                      v-model="selectedFactura"
                      true-value="F"
                      false-value="0"
                      style="font-size: 13px"
                      label="Factura"
                      @update:model-value="
                        this.axiosConfig.headers.tipo =
                          this.selectedFactura.value;
                        getData(`/cguias`, 'setData', 'datos');
                      "
                    />
                  </template>
                </q-field>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <div bordered flat class="my-card row">
          <q-table
            :rows="datos"
            binary-state-sort
            row-key="id"
            :loading="loading"
            :columns="columns"
            :separator="separator"
            :filter="filter"
            style="width: 100%"
            v-model:pagination="pagination"
            :rows-per-page-options="[5, 10, 15, 20, 50]"
            @request="onRequest"
            :grid="$q.screen.xs"
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
                  icon="disabled_by_default"
                  :disabled="this.disabledDelete"
                  @click.capture="create = true"
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
                          icon="disabled_by_default"
                          :disabled="this.disabledDelete"
                          @click.capture="create = true"
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
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <desactive-crud
      ref="desactiveCrud"
      @desactivar-Crud="desactivarCrud"
    ></desactive-crud>

    <methods
      ref="methods"
      @get-Data="getData('/cguias', 'setData', 'datos')"
      @get-Data-Guias="getDataGuias('/cguias', 'setData', 'datos')"
      @set-Data="setData"
      @set-Data-Guias="setDataGuias"
      @reset-Loading="resetLoading"
      @on-Request="onRequest"
      @set-Data-Edit="setDataEdit"
      @set-Data-Select="setDataSelect"
    ></methods>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import methodsVue from "src/components/methods.vue";

import { LocalStorage } from "quasar";

import desactivateCrudVue from "src/components/desactivateCrud.vue";

export default {
  components: { "desactive-crud": desactivateCrudVue, methods: methodsVue },
  name: "AsignacionGuias",
  data() {
    return {
      columns: [
        {
          name: "t_de_documento",
          field: "t_de_documento",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nro_control",
          label: "NRO. Control",
          field: "nro_control",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nro_documento",
          label: "NRO. Doc.",
          field: "nro_documento",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cant_asignada",
          label: "Ref.",
          field: "cant_asignada",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_emision",
          label: "Fecha Emision",
          field: "fecha_emision",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_asignacion",
          label: "Cliente",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "monto_total",
          label: "Monto Total",
          field: "monto_total",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cant_disponible",
          label: "Documento Principal",
          field: "cant_disponible",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "estatus_administra",
          label: "Estatus",
          field: "estatus_administra",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tipo_factura",
          label: "Tipo Factura",
          field: "tipo_factura",
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
        control_inicio: "",
        control_final: "",
        cant_asignada: "",
        cant_disponible: "",
        fecha_asignacion: "",
        cod_agencia: "",
        cod_agente: "",
        cod_cliente: "",
        tipo: "",
      },
      formEdit: {
        control_inicio: "",
        control_final: "",
        cant_asignada: "",
        cant_disponible: "",
        fecha_asignacion: "",
        cod_agencia: "",
        cod_agente: "",
        cod_cliente: "",
        tipo: "0",
        id: "",
      },
      datos: [],
      count: 1,
      currentPage: 1,
      agencias: [],
      selected: [],
      refAgencia: "",
      guia_hasta: "",
      guia_desde: "",
      selectedAgencia: [],
      selectedGuiaCarga: "0",
      selectedGuiaFactura: "0",
      selectedFactura: "0",
      selectedCliente: [],
      selectedAgente: [],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
    };
  },
  setup(data) {
    const $q = useQuasar();
    const loading = ref(false);
    const order = ref(false);
    const pagination = ref({
      descending: "",
      page: 1,
      rowsPerPage: 10,
      rowsNumber: "",
    });
    return {
      axiosConfig: {
        headers: {
          Authorization: ``,
          page: 1,
          limit: 10,
          order_by: "",
          order_direction: "",
        },
      },
      pagination,
      separator: ref("vertical"),
      anulate: ref(false),
      loading: ref(false),
      edit: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData(`/mmovimientos`, "onRequest", "datos");
    this.loading = true;
    this.$refs.desactiveCrud.desactivarCrud(
      "c_ciudades",
      "r_ciudades",
      "u_ciudades",
      "d_ciudades",
      "desactivarCrud"
    );
  },
  methods: {
    onRequest(res, dataRes) {
      if (this.count == 1) {
        this[dataRes] = res.data;
        this.pagination.rowsNumber = res.total;
        this.loading = false;
      } else {
        let { page, rowsPerPage, sortBy, descending } = res.pagination;
        if (this.currentPage !== page) {
          descending = "";
        }
        const filter = res.filter;
        const startRow = (page - 1) * rowsPerPage;
        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;

        this.axiosConfig.headers.page = page;
        this.axiosConfig.headers.limit = fetchCount;
        if (sortBy) this.axiosConfig.headers.order_by = sortBy;

        if (descending !== "") {
          this.pagination.descending = !this.pagination.descending;
          if (this.pagination.descending == true) {
            this.axiosConfig.headers.order_direction = "DESC";
          } else this.axiosConfig.headers.order_direction = "ASC";
        }

        if (sortBy) this.pagination.sortBy = sortBy;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;

        this.getData(`/mmovimientos`, "setDataGuias", "datos");
      }
      this.count = 0;
    },
    setDataGuias(res) {
      this.datos = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
    },
    resetLoading() {
      this.loading = false;
    },
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
    // Metodos
    setDataSelect(res, dataRes) {
      this[dataRes] = res;
      this.selectedCliente = [];
      this.selectedAgente = [];
      this.loading = false;
    },
    getDataGuias(url, call, dataRes) {
      this.axiosConfig.headers.agencia = this.selectedAgencia.id;
      this.axiosConfig.headers.cliente = this.selectedCliente.id;
      this.axiosConfig.headers.agente = this.selectedAgente.id;
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    getDataEdit(id) {
      this.$refs.methods.getDataEdit(
        `/cguias/${id}`,
        `setDataEdit`,
        "formEdit",
        this.axiosConfig
      );
    },
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    setDataEdit(res, dataRes) {
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].cant_asignada = res.cant_asignada;
      this[dataRes].cant_disponible = res.cant_disponible;
      this[dataRes].fecha_asignacion = res.fecha_asignacion;
      var cod_agencia = res.cod_agencia;
      var cod_agente = res.cod_agente;
      var cod_cliente = res.cod_cliente;
      api.get(`/agencias/${cod_agencia}`, this.axiosConfig).then((res) => {
        this.formEdit.cod_agencia = res.data;
        this.axiosConfig.headers.agencia = cod_agencia;
        if (cod_cliente) {
          api.get(`/clientes/${cod_cliente}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_cliente = res.data;
          });
          this.getData("/clientes", "setData", "clientesForm");
        }
        if (cod_agente) {
          api.get(`/agentes/${cod_agente}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_agente = res.data;
          });
          this.getData("/agentes", "setData", "agentesForm");
        }
      });
      this[dataRes].tipo = res.tipo_desc;
      this[dataRes].id = res.id;
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/cguias/${idpost}`,
        "getDataGuias",
        this.axiosConfig
      );
      this.loading = true;
    },
    createData() {
      this.form.cod_cliente = this.form.cod_cliente.id;
      this.form.cod_agente = this.form.cod_agente.id;
      (this.form.tipo = this.form.tipo.value),
        (this.form.cod_agencia = this.form.cod_agencia.id),
        this.$refs.methods.createData(
          `/cguias`,
          this.form,
          "getDataGuias",
          this.axiosConfig
        );
      this.resetForm();
      this.loading = true;
    },
    putData() {
      this.formEdit.cod_cliente = this.formEdit.cod_cliente.id;
      this.formEdit.cod_agente = this.formEdit.cod_agente.id;
      (this.formEdit.cod_agencia = this.formEdit.cod_agencia.id),
        (this.formEdit.tipo = this.formEdit.tipo.value),
        this.$refs.methods.putData(
          `/cguias/${this.formEdit.id}`,
          this.formEdit,
          "getDataGuias",
          this.axiosConfig
        );
      this.resetFormEdit();
      this.loading = true;
    },
    resetForm() {
      (this.form.control_inicio = ""),
        (this.form.control_final = ""),
        (this.form.cant_asignada = ""),
        (this.form.cant_disponible = ""),
        (this.form.fecha_asignacion = ""),
        (this.form.cod_agencia = ""),
        (this.form.cod_agente = ""),
        (this.form.cod_cliente = ""),
        (this.form.tipo = ""),
        (this.agentesForm = []),
        (this.clientesForm = []),
        (this.create = false);
    },

    // Metodos para colocar valores iniciales
    getDataIniciar() {
      this.axiosConfig.headers.agencia = this.agencias[0].id;
      this.selectedAgencia = this.agencias[0];
      this.getData("/mmovimientos", "setData", "datos");
    },
  },
};
</script>

<style>
@media screen and (max-width: 1024px) {
  .espaciadoGuias {
    margin-top: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .marginCards {
    margin-top: 30px;
  }
}
@media screen and (max-width: 600px) {
  .marginCards {
    margin-top: 10px;
  }
}
.menuFilter {
  padding-bottom: 1px;
}
.buttonMenu {
  margin-left: 20px;
}
@media screen and (min-width: 1024px) {
  .inputMenuGuias {
    margin-right: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .inputMenuGuias2 {
    margin-right: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .buttonMenuInitial {
    margin-left: 20px;
  }
}
@media screen and (max-width: 1024px) {
  .check {
    padding-top: 0px;
    padding-bottom: 0px;
  }
}
@media screen and (max-width: 1024px) {
  .button-filter {
    margin-top: 13px;
  }
}
@media screen and (max-width: 1024px) {
  .inputMenuGuias {
    margin-top: 14px;
  }
}
@media screen and (max-width: 600px) {
  .selectmovil {
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 1024px) {
  .checkboxGuias {
    margin-top: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 30px;
  }
}
@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 30px;
  }
}
@media screen and (min-width: 600px) {
  .filterTop {
    margin-right: 45px;
  }
}
</style>
