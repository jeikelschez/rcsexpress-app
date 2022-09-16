<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="agenciasDialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-select outlined v-model="selectedPais" label="País" class="pcform" input-class="input" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                ]" hint="" :options="paisesSelected" @filter="
                  (val, update, abort) =>
                    filterArray(
                      val,
                      update,
                      abort,
                      'paisesSelected',
                      'paises',
                      'desc_pais'
                    )
                " use-input hide-selected fill-input input-debounce="0" option-label="desc_pais" option-value="id"
                  lazy-rules @update:model-value="
                    (this.selectedEstado = []),
                      (this.selectedCiudad = []),
                      (this.estados = []);
                    (this.ciudades = []),
                      getData(`/estados`, 'setData', 'estados', {
                        headers: {
                          pais: this.selectedPais.id,
                        },
                      });
                  ">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="public" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select outlined v-model="selectedEstado" label="Estado" input-class="input" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                ]" hint="" class="pcform" :options="estadosSelected" @filter="
                  (val, update, abort) =>
                    filterArray(
                      val,
                      update,
                      abort,
                      'estadosSelected',
                      'estados',
                      'desc_estado'
                    )
                " use-input hide-selected fill-input input-debounce="0" option-label="desc_estado" option-value="id"
                  lazy-rules @update:model-value="
                    this.selectedCiudad = [];
                    this.ciudades = [];
                    getData(`/ciudades`, 'setData', 'ciudades', {
                      headers: {
                        estado: this.selectedEstado.id,
                      },
                    });
                  ">
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="public" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select outlined v-model="selectedCiudad" label="Ciudad" input-class="input" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                ]" hint="" :options="ciudadesSelected" @filter="
                  (val, update, abort) =>
                    filterArray(
                      val,
                      update,
                      abort,
                      'ciudadesSelected',
                      'ciudades',
                      'desc_ciudad'
                    )
                " use-input hide-selected fill-input input-debounce="0" option-label="desc_ciudad" option-value="id"
                  lazy-rules>
                  <template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="public" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input upper-case outlined v-model="form.nb_agencia" label="Agencia" class="pcform" hint="" lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]" @update:model-value="
                    form.nb_agencia = form.nb_agencia.toUpperCase()
                  ">
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input outlined v-model="form.persona_contacto" label="Nombre" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      200,
                      'Maximo 200 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" hint="" lazy-rules @update:model-value="
                  form.persona_contacto = form.persona_contacto.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input outlined v-model="form.dir_agencia" label="Dirección" class="pcform" hint="" lazy-rules :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      200,
                      'Maximo 200 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" @update:model-value="
                  form.dir_agencia = form.dir_agencia.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input outlined v-model="form.rif_agencia" label="Rif" hint="" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      200,
                      'Maximo 200 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" lazy-rules @update:model-value="
                  form.rif_agencia = form.rif_agencia.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input outlined v-model="form.nit_agencia" label="NIT Agencia" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      200,
                      'Maximo 200 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" hint="" class="pcform" lazy-rules @update:model-value="
                  form.nit_agencia = form.nit_agencia.toUpperCase()
                ">
                  <template v-slot:prepend>
                    <q-icon name="list" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input outlined v-model="form.fax_agencia" label="Fax" class="pcform" hint="" lazy-rules :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      200,
                      'Maximo 200 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" mask="####-#####">
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input outlined v-model="form.tlf_agencia" label="Teléfono" hint="" lazy-rules :rules="[
                  (val) =>
                    this.$refs.rulesVue.isMax(
                      val,
                      200,
                      'Maximo 200 Caracteres'
                    ),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" mask="(###) ### - ####">
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select outlined v-model="form.estatus" label="Estatus" hint="" class="pcform" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                ]" :options="estatus" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="done_all" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input outlined v-model="form.email_agencia" label="Correo Electrónico" hint="" type="email"
                  lazy-rules @update:model-value="
                    form.email_agencia = form.email_agencia.toUpperCase()
                  ">
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
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

    <div class="q-pa-sm justify-center">
      <div class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
          style="align-self: center; text-align: center; font-size: 20px">
          <p><strong>MANTENIMIENTO - AGENCIAS</strong></p>
        </div>
        <div class="col-md-5 col-sm-7 col-xs-12 cardMargin selectMobile" style="align-self: center">
          <q-input v-model="filter" rounded outlined standout type="search" label="Búsqueda avanzada">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="col-md-2 col-sm-3 col-xs-12" style="text-align: center; align-self: center">
          <q-btn label="Insertar Agencia" rounded color="primary" :disabled="this.allowOption(2)"
            @click="agenciasDialog = true" @click.capture="this.resetForm()"></q-btn>
        </div>
      </div>

      <div class="q-pa-md">
        <div class="q-gutter-y-md">
          <div bordered flat class="row">
            <q-table :rows="datos" :loading="loading" binary-state-sort row-key="id" :columns="columns"
              :separator="separator" :filter="filter" :rows-per-page-options="[5, 10, 15, 20, 50]" @request="onRequest"
              style="width: 100%" :grid="$q.screen.xs" v-model:pagination="pagination">
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn dense round flat color="primary" icon="edit" @click.capture="resetForm"
                    :disabled="this.allowOption(3)" @click="
                      getData(
                        `/agencias/${props.row.id}`,
                        'setDataEdit',
                        'form'
                      );
                      agenciasDialog = true;
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
                            :disabled="this.allowOption(3)" @click.capture="resetForm" @click="
                              getData(
                                `/agencias/${props.row.id}`,
                                'setDataEdit',
                                'form'
                              );
                              agenciasDialog = true;
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
    getData('/agencias', 'setDataTable', 'datos', {
      headers: {
        page: 1,
        limit: 9,
      },
    })" @set-Data="setData" @set-Data-Paises="setDataPaises" @reset-Loading="resetLoading" @set-Data-Edit="setDataEdit"
      @on-Request="onRequest" @set-Data-Table="setDataTable" @set-Data-Permisos="setDataPermisos"></methods>
    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar, LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
import methodsVue from "src/components/methods.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
  },
  name: "Agencias",
  data() {
    return {
      columns: [
        {
          name: "Ciudades",
          label: "Ciudad",
          field: (row) => row.ciudades.desc_ciudad,
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nb_agencia",
          label: "Agencia",
          field: "nb_agencia",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tlf_agencia",
          label: "Teléfono",
          field: "tlf_agencia",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "activo_desc",
          label: "Estatus",
          field: "activo_desc",
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
        cod_ciudad: "",
        nb_agencia: "",
        persona_contacto: "",
        dir_agencia: "",
        fax_agencia: "",
        email_agencia: "",
        tlf_agencia: "",
        rif_agencia: "",
        nit_agencia: "",
        estatus: "",
      },
      formEdit: {
        id: "",
        cod_ciudad: "",
        nb_agencia: "",
        persona_contacto: "",
        dir_agencia: "",
        fax_agencia: "",
        email_agencia: "",
        tlf_agencia: "",
        rif_agencia: "",
        nit_agencia: "",
        estatus: "",
      },
      estatus: [
        { label: "ACTIVA", value: "A" },
        { label: "INACTIVA", value: "I" },
      ],
      paises: [],
      estados: [],
      count: 1,
      currentPage: 1,
      ciudades: [],
      datos: [],
      rpermisos: [],
      paisesSelected: [],
      estadosSelected: [],
      ciudadesSelected: [],
      selectedPais: [],
      selectedEstado: [],
      selectedCiudad: []
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
      loading: ref(false),
      separator: ref("vertical"),
      agenciasDialog: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Agencias", "");
    this.getData("/agencias", "onRequest", "datos", {
      headers: {
        page: 1,
        limit: 5,
      },
    });
    this.getData("/paises", "setDataPaises", "paises");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        menu: "agencias"
      },
    });
  },
  methods: {
    // Metodo para Get de Tabla
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
        if (descending !== "") {
          this.pagination.descending = !this.pagination.descending;
          if (this.pagination.descending == true) {
            headerOrder_direction = "DESC";
          } else headerOrder_direction = "ASC";
        }

        if (headerOrder_by == "Ciudades") var headerOrder_by = "";
        if (headerOrder_by == "activo_desc") var headerOrder_by = "estatus";

        if (sortBy) this.pagination.sortBy = sortBy;
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        var headerCod_movimiento = this.formEdit.id;
        this.getData(`/agencias`, "setDataTable", "datos", {
          headers: {
            page: headerPage,
            limit: headerLimit,
            order_direction: headerOrder_direction,
            cod_movimiento: headerCod_movimiento,
            order_by: headerOrder_by,
          },
        });
      }
      this.count = 0;
    },
    // Metodo para Filtrar Datos de Selects
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

    // METODOS DE PAGINA

    // Metodo para Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
    },
    // Metodo para Setear Paises
    setDataPaises(res, dataRes) {
      this[dataRes] = res;
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res.data;
      this.loading = false;
    },
    // Metodo para Setear Datos de Agencia Seleccionada
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nb_agencia = res.nb_agencia;
      this[dataRes].persona_contacto = res.persona_contacto;
      this[dataRes].dir_agencia = res.dir_agencia;
      this[dataRes].fax_agencia = res.fax_agencia;
      this[dataRes].email_agencia = res.email_agencia;
      this[dataRes].tlf_agencia = res.tlf_agencia;
      this[dataRes].rif_agencia = res.rif_agencia;
      this[dataRes].nit_agencia = res.nit_agencia;
      this[dataRes].estatus = res.activo_desc;
      this.selectedCiudad = res.ciudades;
      this.ciudadEdit = res.ciudades.id;
      api
        .get(`/ciudades`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            estado: this.selectedCiudad.cod_estado,
          },
        })
        .then((res) => {
          this.ciudades = res.data.data;
          this.selectedEstado = res.data.data[0].estados;
          api
            .get(`/estados`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                pais: this.selectedEstado.cod_pais,
              },
            })
            .then((res) => {
              this.estados = res.data.data;
              this.selectedPais = res.data.data[0].paises.desc_pais;
            });
        });
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },
    // Metodo para Eliminar Agencia
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/agencias/${idpost}`, "getData");
      this.loading = true;
    },
    // Metodo para Editar o Crear Agencia
    sendData() {
      this.form.cod_ciudad = this.selectedCiudad.id;
      this.form.estatus = this.form.estatus.value;
      if (!this.form.id) {
        this.$refs.methods.createData("/agencias", this.form, "getData");
        this.loading = true;
        this.agenciasDialog = false;
        this.resetForm();
      } else {
        this.$refs.methods.putData(
          `/agencias/${this.form.id}`,
          this.form,
          "getData"
        );
        this.loading = true;
        this.agenciasDialog = false;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.selectedPais = [];
      this.selectedEstado = [];
      this.selectedCiudad = [];
      this.estados = [];
      this.ciudades = [];
      this.form.persona_contacto = "";
      this.form.nb_agencia = "";
      this.form.dir_agencia = "";
      this.form.fax_agencia = "";
      this.form.email_agencia = "";
      this.form.tlf_agencia = "";
      this.form.rif_agencia = "";
      this.form.nit_agencia = "";
      this.form.estatus = "";
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
    margin-bottom: 20px !important;
  }
}

@media screen and (max-width: 600px) {
  .selectMobile {
    margin-bottom: 20px !important;
  }
}
</style>
