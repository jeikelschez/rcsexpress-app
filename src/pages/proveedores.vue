<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-input outlined v-model="form.nb_beneficiario" label="Beneficiario" hint="" class="pcform" lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 50, 'Maximo 50 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                  @update:model-value="
                    form.nb_beneficiario = form.nb_beneficiario.toUpperCase()
                  ">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input outlined v-model="form.nb_proveedor" label="Proveedor" hint="" class="pcform" lazy-rules
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
                  ]" @update:model-value="
                    form.nb_proveedor = form.nb_proveedor.toUpperCase()
                  ">
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input outlined v-model="form.rif_proveedor" label="RIF" hint="" :rules="[
                  (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      20,
                      'Maximo 22 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" lazy-rules @update:model-value="
                  form.rif_proveedor = form.rif_proveedor.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.nit_proveedor" label="NIT" class="pcform" :rules="[
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
                ]" hint="" lazy-rules @update:model-value="
                  form.nit_proveedor = form.nit_proveedor.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="123" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.condicion_pago" label="Condición de Pago (Días)"
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 2, 'Maximo 2 Caracteres') || '']"
                  v-money="moneyNotDecimal" input-class="text-right" hint="" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="free_cancellation" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.direccion_correo" label="Direccion de Correo"
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 200, 'Maximo 200 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                  hint="" class="pcform" lazy-rules @update:model-value="
                    form.direccion_correo = form.direccion_correo.toUpperCase()
                  ">
                  <template v-slot:prepend>
                    <q-icon name="drafts" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.direccion_fiscal" label="Direccion Fiscal"
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 200, 'Maximo 200 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                  hint="" lazy-rules @update:model-value="
                    form.direccion_fiscal = form.direccion_fiscal.toUpperCase()
                  ">
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input outlined v-model="form.tlf_proveedor" label="Telefono"
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 100, 'Maximo 100 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                  hint="" lazy-rules class="pcform" mask="### - ### - ##########">
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input outlined v-model="form.fax_proveedor" label="Fax"
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 50, 'Maximo 50 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                  hint="" lazy-rules class="pcform" @update:model-value="
                    form.fax_proveedor = form.fax_proveedor.toUpperCase()
                  ">
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input outlined v-model="form.email_proveedor" label="Email"
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 50, 'Maximo 50 Caracteres'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                  hint="" lazy-rules type="email" @update:model-value="
                    form.email_proveedor = form.email_proveedor.toUpperCase()
                  ">
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select outlined v-model="form.tipo_servicio" label="Servicio Prestado" class="pcform"
                  input-class="input" hint="" :options="servicio_prestado" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select outlined v-model="form.tipo_persona" label="Tipo de Persona" class="pcform"
                  input-class="input" hint="" :options="tipo_persona" :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]" lazy-rules @update:model-value="
                    this.getData(`/mretenciones`, 'setData', 'retenciones', {
                      headers: {
                        vigente: 's',
                        tipo_persona: form.tipo_persona.value,
                      },
                    });
                    this.form.cod_tipo_retencion = [];
                  ">
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select outlined v-model="form.cod_tipo_retencion" label="Tipo Retención ISLR" hint=""
                  :options="retencionesSelected" @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'retencionesSelected',
                        'retenciones',
                        'nb_tipo_retencion'
                      )
                  " use-input hide-selected fill-input input-debounce="0" :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]" option-label="nb_tipo_retencion" option-value="id" lazy-rules><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="block" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select outlined v-model="form.flag_activo" label="Estatus" input-class="input" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                ]" hint="" class="pcform" :options="estatus" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="block" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input outlined v-model="form.observacion" label="Observaciones" hint="" lazy-rules :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" @update:model-value="
                  form.observacion = form.observacion.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
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

    <div class="q-pa-sm justify-center">
      <div class="q-pa-md row justify-end">
        <div class="col-md-4 col-xs-12 text-secondary movilTitle"
          style="align-self: center; text-align: center; font-size: 20px; margin-bottom: 15px;">
          <p><strong>MANTENIMIENTO - PROVEEDORES</strong></p>
        </div>
        <div class="col-md-5 col-sm-7 col-xs-12 cardMargin selectMobile" style="align-self: center">
          <q-input v-model="filter" rounded outlined standout type="search" label="Búsqueda avanzada">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-12" style="text-align: center; align-self: center">
          <q-btn label="Insertar Proveedor" rounded color="primary" @click="
            dialog = true;
            this.resetForm();
          " :disabled="this.allowOption(2)"></q-btn>
        </div>
      </div>

      <div class="q-pa-md q-gutter-y-md">
        <q-table :rows="datos" binary-state-sort :loading="loading" row-key="id" :columns="columns"
          :rows-per-page-options="[5, 10, 15, 20, 50]" @request="onRequest" :separator="separator" :filter="filter"
          style="width: 100%" :grid="$q.screen.xs" v-model:pagination="pagination">
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn dense round flat color="primary" icon="edit" :disabled="this.allowOption(3)" @click="
                getData(
                  `/proveedores/${props.row.id}`,
                  'setDataEdit',
                  'form',
                  {
                    headers: {
                      Authorization: ``,
                      vigente: 's',
                    },
                  }
                );
                dialog = true;
                this.resetForm();
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
                            `/proveedores/${props.row.id}`,
                            'setDataEdit',
                            'form',
                            {
                              headers: {
                                Authorization: ``,
                                vigente: 's',
                              },
                            }
                          );
                          this.resetForm();
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

    <methods ref="methods" @get-Data-Proveedores="
      getDataProveedores('/proveedores', 'setDataTable', 'datos')
    " @set-Data-Table="setDataTable" @on-Request="onRequest" @set-data="setData" @reset-Loading="resetLoading"
      @set-Data-Edit="setDataEdit" @set-Data-Permisos="setDataPermisos">
    </methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
import { VMoney } from "v-money";
import methodsVue from "src/components/methods.vue";

export default {
  directives: { money: VMoney },
  components: {
    methods: methodsVue,
    VMoney,
    rulesVue,
  },
  data() {
    return {
      moneyNotDecimal: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: true,
      },
      columns: [
        {
          name: "nb_proveedor",
          label: "Nombre del Proveedor",
          field: "nb_proveedor",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "condicion_pago",
          label: "Condicion de Pago",
          field: "condicion_pago",
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
        nb_proveedor: "",
        nb_beneficiario: "",
        rif_proveedor: "",
        nit_proveedor: "",
        direccion_fiscal: "",
        direccion_correo: "",
        tlf_proveedor: "",
        fax_proveedor: "",
        email_proveedor: "",
        condicion_pago: "",
        observacion: "",
        tipo_servicio: [],
        cod_tipo_retencion: [],
        tipo_persona: [],
        flag_activo: [],
      },
      tipo_persona: [
        { label: "JURÍDICA", value: "J" },
        { label: "NATURAL", value: "N" },
      ],
      servicio_prestado: [
        { label: "TRANSPORTE", value: "TP" },
        { label: "PAPELERIA", value: "PP" },
        { label: "SUMINISTROS DE COMPUTACIÓN", value: "SC" },
        { label: "GENERALES", value: "GE" },
      ],
      estatus: [
        { label: "ACTIVO", value: "A" },
        { label: "INACTIVO", value: "I" },
      ],
      retenciones: [],
      count: 1,
      currentPage: 1,
      datos: [],
      selected: [],
      retencionesSelected: [],
      rpermisos: [],
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
      separator: ref("vertical"),
      loading: ref(false),
      dialog: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Proveedores", "");
    this.getDataProveedores("/proveedores", "onRequest", "datos");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        menu: "proveedores"
      },
    });
  },
  methods: {
    // Metodo para Actualizar Tabla al seleccionar opcion de la misma
    onRequest(res, dataRes) {
      if (this.count == 1) {
        this[dataRes] = res.data;
        this.pagination.rowsNumber = res.total;
        for (var e = 0, len = this.datos.length; e < len; e++) {
          if (this.datos[e].condicion_pago !== null) {
            this.datos[e].condicion_pago =
              this.datos[e].condicion_pago + " Dias";
          }
          if (e == this.datos.length - 1) break;
        }
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

        var headerOrder_direction = "";
        var headerPage = page;
        var headerLimit = fetchCount;
        if (sortBy) {
          var headerOrder_by = sortBy;
        } else {
          var headerOrder_by = "nro_item";
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
        this.getData(`/proveedores`, "setDataTable", "datos", {
          headers: {
            page: headerPage,
            limit: headerLimit,
            order_direction: headerOrder_direction,
            order_by: headerOrder_by,
          },
        });
      }
      this.count = 0;
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
      for (var e = 0, len = this.datos.length; e < len; e++) {
        if (this.datos[e].condicion_pago !== null) {
          this.datos[e].condicion_pago = this.datos[e].condicion_pago + " Dias";
        }
        if (e == this.datos.length - 1) break;
      }
    },
    // Metodo para Filtrar Array
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

    // Metodo para Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para Get de Proveedores
    getDataProveedores(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          vigente: "s",
          page: 1,
          limit: 5,
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this.loading = false;
      this[dataRes] = res.data;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      if (res.tipo_persona === "J") {
        var tipo_personaHeader = "J";
      } else if (res.tipo_persona === "N") {
        var tipo_personaHeader = "N";
      }
      this.loading = false;
      this.getData(`/mretenciones`, "setData", "retenciones", {
        headers: {
          vigente: "s",
          tipo_persona: tipo_personaHeader,
        },
      });
      this.form.id = res.id;
      this.form.condicion_pago = res.condicion_pago;
      this.form.nb_proveedor = res.nb_proveedor;
      this.form.nb_beneficiario = res.nb_beneficiario;
      this.form.rif_proveedor = res.rif_proveedor;
      this.form.nit_proveedor = res.nit_proveedor;
      this.form.direccion_fiscal = res.direccion_fiscal;
      this.form.direccion_correo = res.direccion_correo;
      this.form.tlf_proveedor = res.tlf_proveedor;
      this.form.fax_proveedor = res.fax_proveedor;
      this.form.email_proveedor = res.email_proveedor;
      this.form.observacion = res.observacion;
      this.form.tipo_servicio = res.tipo_svc;
      this.form.tipo_persona = res.tipo_desc;
      this.form.flag_activo = res.activo_desc;
      this.form.cod_tipo_retencion = res.retenciones;
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/proveedores/${idpost}`,
        "getDataProveedores"
      );
      this.loading = true;
    },
    // Metodo para Crear o Editar Datos
    sendData() {
      this.form.condicion_pago = this.form.condicion_pago
        .replaceAll(".", "")
        .replaceAll(",", ".");
      this.form.tipo_servicio = this.form.tipo_servicio.value;
      this.form.tipo_persona = this.form.tipo_persona.value;
      this.form.flag_activo = this.form.flag_activo.value;
      this.form.cod_tipo_retencion = this.form.cod_tipo_retencion.id;
      if (!this.form.id) {
        this.$refs.methods.createData(
          "/proveedores",
          this.form,
          "getDataProveedores"
        );
        this.resetForm();
        this.loading = true;
        this.dialog = false;
      } else {
        this.$refs.methods.putData(
          `/proveedores/${this.form.id}`,
          this.form,
          "getDataProveedores"
        );
        this.dialog = false;
        this.resetForm();
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.nb_proveedor = "";
      this.form.nb_beneficiario = "";
      this.form.rif_proveedor = "";
      this.form.nit_proveedor = "";
      this.form.direccion_fiscal = "";
      this.form.direccion_correo = "";
      this.form.tlf_proveedor = "";
      this.form.fax_proveedor = "";
      this.form.email_proveedor = "";
      this.form.condicion_pago = "";
      this.form.observacion = "";
      this.form.tipo_servicio = "";
      this.form.cod_tipo_retencion = "";
      this.retenciones = [];
      this.form.tipo_persona = "";
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
    margin-bottom: 15px
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
    margin-bottom: 15px !important;
  }
}

@media screen and (max-width: 600px) {
  .selectMobile {
    margin-bottom: 25px !important;
  }
}
</style>
