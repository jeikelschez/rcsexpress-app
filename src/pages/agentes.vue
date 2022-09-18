<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="formDialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 90vw">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.nb_agente" label="Nombre de Agente" class="pcform" hint=""
                  @update:model-value="
                    form.nb_agente = form.nb_agente.toUpperCase()
                  " lazy-rules :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Valor Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        25,
                        'Maximo 25 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.fax_agente" label="Fax" hint="" mask="#### - ##########"
                  @update:model-value="
                    form.fax_agente = form.fax_agente.toUpperCase()
                  " lazy-rules :rules="[
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
                  ]">
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.persona_responsable" label="Persona Responsable" class="pcform" hint=""
                  @update:model-value="
                    form.persona_responsable =
                      form.persona_responsable.toUpperCase()
                  " lazy-rules :rules="[
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
                  ]">
                  <template v-slot:prepend>
                    <q-icon name="contact_phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select outlined v-model="form.flag_activo" label="Activo" hint="" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Valor Requerido') ||
                    '',
                ]" :options="estatus" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="rule" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input outlined v-model="form.dir_agente" label="Dirección" hint="" @update:model-value="
                  form.dir_agente = form.dir_agente.toUpperCase()
                " lazy-rules :rules="[
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
                ]">
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input outlined v-model="form.email_web" label="Email" hint="" type="email" @update:model-value="
                  form.email_web = form.email_web.toUpperCase()
                " lazy-rules :rules="[
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
                ]">
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw; margin-bottom: 20px">
                <q-card-section>
                  <div class="row">
                    <div class="col-md-12 col-xs-12" style="
                        align-self: center;
                        text-align: left;
                        margin-top: -30px;
                      ">
                      <h4 style="font-size: 20px" class="text-secondary">
                        <strong>IDENTIFICACIÓN Y COMISIONES</strong>
                      </h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-input outlined v-model="form.rif_ci_agente" label="RIF/CI" hint="" class="pcform"
                        @update:model-value="
                          form.rif_ci_agente = form.rif_ci_agente.toUpperCase()
                        " lazy-rules :rules="[
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
                        ]">
                        <template v-slot:prepend>
                          <q-icon name="account_box" />
                        </template>
                      </q-input>
                    </div>

                    <div class="col-md-6 col-xs-12">
                      <q-select outlined v-model="form.tipo_agente" label="Tipo de Agente" hint="" :rules="[
                        (val) =>
                          this.$refs.rulesVue.isReqSelect(
                            val,
                            'Valor Requerido'
                          ) || '',
                      ]" :options="tipoDeAgente" lazy-rules>
                        <template v-slot:prepend>
                          <q-icon name="face" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-4 col-xs-12">
                      <q-input outlined v-model="form.porc_comision_venta" label="% Comisión por Venta" v-money="money"
                        input-class="text-right" hint="" class="pcform" @update:model-value="
                          form.porc_comision_venta =
                            form.porc_comision_venta.toUpperCase()
                        " lazy-rules>
                        <template v-slot:prepend>
                          <q-icon name="percent" />
                        </template>
                      </q-input>
                    </div>

                    <div class="col-md-4 col-xs-12">
                      <q-input outlined class="pcform" v-model="form.porc_comision_entrega"
                        label="% Comisión por Entrega" v-money="money" input-class="text-right" hint=""
                        @update:model-value="
                          form.porc_comision_entrega =
                            form.porc_comision_entrega.toUpperCase()
                        " lazy-rules>
                        <template v-slot:prepend>
                          <q-icon name="percent" />
                        </template>
                      </q-input>
                    </div>

                    <div class="col-md-4 col-xs-12">
                      <q-input outlined v-model="form.porc_comision_seguro" label="% Comisión por Seguro"
                        v-money="money" input-class="text-right" hint="" @update:model-value="
                          form.porc_comision_seguro =
                            form.porc_comision_seguro.toUpperCase()
                        " lazy-rules>
                        <template v-slot:prepend>
                          <q-icon name="percent" />
                        </template>
                      </q-input>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
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

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="q-pa-md row" style="margin-top: 2px">
          <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
            style="align-self: center; text-align: center; font-size: 20px">
            <p><strong>MANTENIMIENTO - AGENTES</strong></p>
          </div>
          <div class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6 cardMargin selectMobile"
            style="align-self: center; text-align: center">
            <q-select rounded transition-show="flip-up" transition-hide="flip-down" :options="agenciasSelected" @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'agenciasSelected',
                  'agencias',
                  'nb_agencia'
                )
            " use-input hide-selected fill-input input-debounce="0" option-label="nb_agencia" option-value="id"
              v-model="selectedAgencia" outlined standout label="Escoge una Agencia" @update:model-value="
                getDataTable(`/agentes`, 'setDataTable', 'agentes')
              ">
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    Sin resultados
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>

          <div class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6 cardMarginFilter"
            style="align-self: center; text-align: center">
            <q-input rounded outlined standout v-model="filter" type="search" label="Búsqueda avanzada">
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12" style="text-align: center; align-self: center">
            <q-btn label="Insertar" rounded color="primary" :disabled="this.allowOption(2)" @click="formDialog = true"
              @click.capture="resetForm()" size="16px" class="q-px-xl q-py-xs insertarestadosmovil"></q-btn>
          </div>
        </div>

        <div class="q-pa-md my-card row" bordered flat style="margin-top: 2px">
          <q-table :rows="agentes" binary-state-sort row-key="id" :columns="columns" :separator="separator"
            :rows-per-page-options="[5, 10, 15, 20, 50]" @request="onRequest" :filter="filter" style="width: 100%"
            :loading="loading" :grid="$q.screen.xs" v-model:pagination="pagination">
            <template v-slot:loading>
              <q-inner-loading showing color="primary" />
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn dense round flat color="primary" icon="edit" :disabled="this.allowOption(3)" @click="
                  getData(`/agentes/${props.row.id}`, 'setDataEdit', 'form');
                  formDialog = true;
                "></q-btn>
                <q-btn dense round flat color="primary" icon="delete" :disabled="this.allowOption(4)"
                  @click="selected = props.row.id" @click.capture="agentesDelete = true"></q-btn>
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
                              `/agentes/${props.row.id}`,
                              'setDataEdit',
                              'form'
                            );
                            formDialog = true;
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
                          @click.capture="agentesDelete = true"></q-btn>
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
    </div>

    <q-dialog v-model="agentesDelete">
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

    <methods ref="methods" @get-Data-Table="getDataTable(`/agentes`, 'setDataTable', 'agentes')"
      @set-Data-Table="setDataTable" @on-Request="onRequest" @reset-Loading="resetLoading" @set-Data-Edit="setDataEdit"
      @set-Data-Init="setDataInit" @set-Data-Permisos="setDataPermisos"></methods>
    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import { VMoney } from "v-money";
import methodsVue from "src/components/methods.vue";

export default {
  directives: { money: VMoney },
  components: {
    methods: methodsVue,
    VMoney,
    rulesVue,
  },
  name: "Agentes",
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
          name: "nb_agente",
          label: "Nombre",
          field: "nb_agente",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "persona_responsable",
          label: "Persona Responsable",
          field: "persona_responsable",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tipo_desc",
          label: "Tipo de Agente",
          field: "tipo_desc",
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
        nb_agente: "",
        persona_responsable: "",
        dir_agente: "",
        tlf_agente: "",
        fax_agente: "",
        email_web: "",
        tipo_agente: "",
        flag_activo: "",
        rif_ci_agente: "",
        porc_comision_venta: "",
        porc_comision_entrega: "",
        porc_comision_seguro: "",
        cod_agencia: [],
      },
      estatus: [
        { label: "ACTIVO", value: "1" },
        { label: "INACTIVO", value: "0" },
      ],
      tipoDeAgente: [
        { label: "RESPONSABLE DE AGENCIA", value: "RP" },
        { label: "COURIERS", value: "CR" },
      ],
      count: 1,
      currentPage: 1,
      agencias: [],
      agenciasSelected: [],
      rpermisos: [],
      agentes: [],
      selected: [],
      selectedAgencia: [],
      error: "",
    };
  },
  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const order = ref(false);
    const pagination = ref({
      descending: "",
      page: 1,
      rowsPerPage: 5,
      rowsNumber: "",
    });
    return {
      pagination,
      anulate: ref(false),
      loading: ref(false),
      separator: ref("vertical"),
      formDialog: ref(false),
      agentesDelete: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Agentes", "");
    this.getData("/agencias", "setDataInit", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        menu: "agentes"
      },
    });
  },
  methods: {
    // Metodo para hacer Get de Datos cuando se utilizan controles de Tabla
    onRequest(res, dataRes) {
      if (this.count == 1) {
        this[dataRes] = res.data;
        this.pagination.rowsNumber = res.total;
      } else {
        let { page, rowsPerPage, sortBy, descending } = res.pagination;
        if (this.currentPage !== page) {
          descending = "";
        }
        const filter = res.filter;
        const startRow = (page - 1) * rowsPerPage;
        const fetchCount =
          rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;

        var headerPage = page;
        var headerOrder_direction = "";
        var headerLimit = fetchCount;
        if (sortBy) {
          var headerOrder_by = sortBy;
        } else {
          var headerOrder_by = "";
        }

        if (headerOrder_by == "tipo_desc") {
          var headerOrder_by = "tipo_agente";
        }
        if (headerOrder_by == "activo_desc") {
          var headerOrder_by = "flag_activo";
        }

        if (descending !== "") {
          this.pagination.descending = !this.pagination.descending;
          if (this.pagination.descending == true) {
            headerOrder_direction = "DESC";
          } else headerOrder_direction = "ASC";
        }

        if (sortBy) this.pagination.sortBy = sortBy;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.getData(`/agentes`, "setDataTable", "agentes", {
          headers: {
            agencia: this.selectedAgencia.id,
            page: headerPage,
            limit: headerLimit,
            order_direction: headerOrder_direction,
            order_by: headerOrder_by,
          },
        });
      }
      this.count = 0;
    },
    // Metodo para filtrar opciones de Selects
    filterArray(val, update, abort, pagina, array, element) {
      if (val === "") {
        update(() => {
          this[pagina] = this[array];
        });
        return;
      }
      update(() => {
        const needle = val.toUpperCase();
        var notEqual = [];
        for (var i = 0; i <= this[array].length - 1; i++) {
          if (this[array][i][element].indexOf(needle) > -1) {
            notEqual.push(this[array][i]);
          }
          if (i == this[array].length - 1) {
            this[pagina] = notEqual;
            break;
          }
        }
      });
    },
    // Metodo para desactivar Icono de Carga
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

    // Metodo para Setear Datos al iniciar
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];

      this.$refs.methods.getData("/agentes", "onRequest", "agentes", {
        headers: {
          agencia: this.agencias[0].id,
          page: 1,
          limit: 5,
        },
      });
      this.loading = false;
    },
    // Metodo para Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para Get de Agentes
    getDataTable(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          agencia: this.selectedAgencia.id,
          page: 1,
          limit: 5,
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Datos en Tabla al hacer Get
    setDataTable(res, dataRes) {
      this[dataRes] = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
    },
    // Metodo para Setear Datos de un Agente Existente
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this.filterSelect(
        "estatus",
        "value",
        res.flag_activo,
        "form",
        "flag_activo"
      );
      this[dataRes].nb_agente = res.nb_agente;
      this[dataRes].persona_responsable = res.persona_responsable;
      this[dataRes].dir_agente = res.dir_agente;
      this[dataRes].tlf_agente = res.tlf_agente;
      this[dataRes].fax_agente = res.fax_agente;
      this[dataRes].email_web = res.email_web;
      this[dataRes].rif_ci_agente = res.rif_ci_agente;
      this[dataRes].porc_comision_venta = res.porc_comision_venta;
      this[dataRes].porc_comision_seguro = res.porc_comision_seguro;
      this[dataRes].porc_comision_entrega = res.porc_comision_entrega;
      this.filterSelect(
        "tipoDeAgente",
        "value",
        res.tipo_agente,
        "form",
        "tipo_agente"
      );
      this[dataRes].cod_agencia = res.cod_agencia;
      this.loading = false;
    },
    // Metodo para Eliminar Agente
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/agentes/${idpost}`, "getDataTable");
      this.loading = true;
    },
    // Metodo para Actualizar o Crear Agente
    sendData() {
      this.form.porc_comision_venta = this.form.porc_comision_venta
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.porc_comision_entrega = this.form.porc_comision_entrega
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.porc_comision_seguro = this.form.porc_comision_seguro
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.cod_agencia = this.selectedAgencia.id;
      this.form.tipo_agente = this.form.tipo_agente.value;
      this.form.flag_activo = this.form.flag_activo.value;
      if (!this.form.id) {
        this.$refs.methods.createData(`/agentes`, this.form, "getDataTable");
        this.loading = true;
        this.resetForm();
      } else {
        this.$refs.methods.putData(
          `/agentes/${this.form.id}`,
          this.form,
          "getDataTable"
        );
        this.loading = true;
        this.resetForm();
      }
    },
    // Metodo para resetear Datos de Agente Creado o Seleccionado
    resetForm() {
      delete this.form.id;
      this.form.nb_agente = "";
      this.form.persona_responsable = "";
      this.form.dir_agente = "";
      this.form.tlf_agente = "";
      this.form.email_web = "";
      this.form.tipo_agente = "";
      this.form.fax_agente = "";
      this.form.rif_ci_agente = "";
      this.form.porc_comision_venta = "";
      this.form.flag_activo = "";
      this.form.porc_comision_entrega = "";
      this.form.porc_comision_seguro = "";
      this.form.cod_agencia = null;
      this.formDialog = false;
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
    margin-bottom: 15px !important;
  }
}
</style>
