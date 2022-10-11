<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.control_inicio"
                  label="Nro. Factura"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(val, 10, 'Requiere Retorno') ||
                      '',
                  ]"
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="apartment" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="Fecha Factura"
                  :rules="[reglasCorrelativo]"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="Nombre Cliente"
                  class="pcform"
                  :rules="[reglasCorrelativo]"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="CI. Rif"
                  :rules="[reglasCorrelativo]"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="Direccion Entrega"
                  :rules="[reglasCorrelativo]"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_cliente"
                  :readonly="this.disabledCliente"
                  label="Estado Entrega"
                  hint=""
                  class="pcform"
                  :options="clientesSelected"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'clientesSelected',
                        'clientes',
                        'nb_cliente'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="nb_cliente"
                  option-value="id"
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_cliente"
                  :readonly="this.disabledCliente"
                  label="Ciudad Entrega"
                  hint=""
                  :options="clientesSelected"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'clientesSelected',
                        'clientes',
                        'nb_cliente'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  lazy-rules
                  option-label="nb_cliente"
                  option-value="id"
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="row justify-center items-center content-center"
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
                @click="this.resetForm()"
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="q-pa-sm justify-center">
      <div
        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
        style="
          align-self: center;
          text-align: center;
          font-size: 20px;
          margin-top: 20px;
        "
      >
        <p><strong>MANTENIMIENTO - CARGA MANUAL DE GUIAS</strong></p>
      </div>

      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; padding-bottom: 10px"
      >
        <div
          class="col-md-8 col-xl-8 col-lg-8 col-xs-12 col-sm-12 cardMarginFilter selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-file
            rounded
            outlined
            v-model="file"
            ref="txtFile"
            dense
            label="Archivo TXT"
            max-files="1"
            @update:model-value="readFile()"
            accept=".txt, .TXT"
            @rejected="onRejected"
          >
            <template v-slot:append>
              <q-icon
                v-if="file !== null"
                name="close"
                @click.stop.prevent="file = null"
                class="cursor-pointer"
              />
              <q-icon
                name="file_upload"
                @click="this.$refs.txtFile.pickFiles()"
              />
            </template>
            <template v-slot:hint> </template>
          </q-file>
        </div>

        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 botonesGuias"
          style="text-align: right; align-self: center"
        >
          <q-btn
            dense
            color="primary"
            :disabled="this.allowOption(2)"
            round
            @click="
              this.dialog = true;
              this.setDataCreate();
            "
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
          >
            <q-icon size="30px" name="find_in_page" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Agregar Control</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataGuias();
            "
          >
            <q-icon size="30px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataGuias();
            "
          >
            <q-icon size="30px" name="content_paste_search" color="white">
            </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataGuias();
            "
          >
            <q-icon size="30px" name="file_open" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataGuias();
            "
          >
            <q-icon size="30px" name="collections_bookmark" color="white">
            </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataGuias();
            "
          >
            <q-icon size="30px" name="print" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="white"
            round
            padding="sm"
            style="margin-bottom: 6px"
          >
            <q-icon size="30px" name="print" color="primary"> </q-icon>
            <q-tooltip
              class="bg-primary"
              transition-show="scale"
              style="max-height: 30px"
              transition-hide="scale"
              color="primary"
              >Carta para el Cliente</q-tooltip
            >
          </q-btn>
        </div>
      </div>

      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center"
      >
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMarginFilter selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agenciasSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'agenciasSelected',
                  'agencias',
                  'nb_agencia'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="nb_agencia"
            option-value="id"
            v-model="selectedAgencia"
            outlined
            standout
            label="Agencia"
            @update:model-value="
              this.selectedCliente = [];
              this.selectedAgente = [];
              getDataGuias();
              getData(`/agentes`, 'setDataPaginated', 'agentes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
              getData(`/clientes`, 'setDataPaginated', 'clientes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
            "
            ><template v-slot:no-option>
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

        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agentesSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'agentesSelected',
                  'agentes',
                  'persona_responsable'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="persona_responsable"
            option-value="id"
            v-model="selectedAgente"
            outlined
            standout
            label="Cliente Origen"
            @update:model-value="getDataGuias()"
            ><template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon
                @click.stop.prevent="
                  this.selectedAgente = [];
                  getDataGuias();
                "
                class="cursor-pointer"
                name="filter_alt_off"
              />
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>

        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-6 selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="clientesSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'clientesSelected',
                  'clientes',
                  'nb_cliente'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="nb_cliente"
            option-value="id"
            v-model="selectedCliente"
            outlined
            standout
            label="Agente de Venta"
            @update:model-value="getDataGuias()"
            ><template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon
                @click.stop.prevent="
                  this.selectedCliente = [];
                  getDataGuias();
                "
                class="cursor-pointer"
                name="filter_alt_off"
              />
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-y-md" style="padding-top: 6px">
      <q-table
        :rows="datos"
        binary-state-sort
        row-key="id"
        :columns="columns"
        :loading="loading"
        :separator="separator"
        style="width: 100%"
        :grid="$q.screen.xs"
        :rows-per-page-options="[5, 10, 15, 20, 50]"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" style="padding-top: 46px" />
        </template>
        <template v-slot:body-cell-estado_entrega="props">
          <q-td :props="props">
            <q-select
              outlined
              dense
              v-model="props.row.estatus_desc"
              :options="estados"
              @update:model-value="
                this.$refs.methods.getData(
                  `/correlativo/${props.row.id}`,
                  `putDataSelect`,
                  'form'
                );
                this.form.estatus_lote = props.row.estatus_desc.value;
              "
            >
            </q-select>
          </q-td>
        </template>
        <template v-slot:body-cell-ciudad_entrega="props">
          <q-td :props="props">
            <q-select
              outlined
              dense
              v-model="props.row.estatus_desc"
              :options="ciudades"
              @update:model-value="
                this.$refs.methods.getData(
                  `/correlativo/${props.row.id}`,
                  `putDataSelect`,
                  'form'
                );
                this.form.estatus_lote = props.row.estatus_desc.value;
              "
            >
            </q-select>
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
                this.resetForm();
                this.getData(`/cguias/${props.row.id}`, `setDataEdit`, 'form');
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
                    <q-select
                      v-if="col.name === 'estado_entrega'"
                      outlined
                      dense
                      v-model="props.row.estatus_desc"
                      :options="estados"
                      @update:model-value="
                        this.$refs.methods.getData(
                          `/correlativo/${props.row.id}`,
                          `putDataSelect`,
                          'form'
                        );
                        this.form.estatus_lote = props.row.estatus_desc.value;
                      "
                    >
                    </q-select>
                    <q-select
                      v-if="col.name === 'ciudad_entrega'"
                      outlined
                      dense
                      v-model="props.row.estatus_desc"
                      :options="ciudades"
                      @update:model-value="
                        this.$refs.methods.getData(
                          `/correlativo/${props.row.id}`,
                          `putDataSelect`,
                          'form'
                        );
                        this.form.estatus_lote = props.row.estatus_desc.value;
                      "
                    >
                    </q-select>
                    <q-btn
                      v-if="col.name === 'action'"
                      dense
                      round
                      flat
                      color="primary"
                      icon="edit"
                      :disabled="this.allowOption(3)"
                      @click="
                        this.resetForm();
                        this.getData(
                          `/cguias/${props.row.id}`,
                          `setDataEdit`,
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
                        col.name != 'ciudad_entrega' &&
                        col.name != 'estado_entrega'
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

    <q-dialog v-model="information">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            {{ information }}
          </div>
        </q-card-section>
        <q-card-actions align="center">
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
      @get-Data-Guias="getDataGuias"
      @set-Data="setData"
      @set-Data-Edit="setDataEdit"
      @set-Data-Table="setDataTable"
      @reset-Loading="resetLoading"
      @set-Data-Init="setDataInit"
      @set-Data-Paginated="setDataPaginated"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import moment from "moment";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
  },
  name: "AsignacionGuias",
  data() {
    return {
      columns: [
        {
          name: "nro_factura",
          label: "Nro. Factura",
          field: "nro_factura",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_factura",
          label: "Fecha Factura",
          field: "fecha_factura",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nb_cliente",
          label: "Nombre Cliente",
          field: "nb_cliente",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "ci_rif",
          label: "CI-RIF",
          field: "ci_rif",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "direccion",
          label: "Dirección Entrega",
          field: "direccion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "estado",
          label: "Estado Entrega",
          field: "estado",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "ciudad",
          label: "Ciudad Entrega",
          field: "ciudad",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "bultos",
          label: "Bultos",
          field: "bultos",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "telefono",
          label: "Teléfono",
          field: "telefono",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "monto",
          label: "Monto Factura",
          field: "monto",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "peso",
          label: "Peso Kgs",
          field: "peso",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "carga_neta",
          label: "Carga Neta",
          field: "carga_neta",
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
        nro_factura: "",
        control_inicio: "",
        control_final: "",
        cant_asignada: "",
        cant_disponible: "",
        fecha_asignacion: "",
        cod_agencia: "",
        cod_agente: "",
        cod_cliente: "",
        tipo: "20",
      },
      information: false,
      datos: [],
      file: null,
      fileUrl: "",
      agencias: [],
      count: 1,
      rpermisos: [],
      menus: [],
      orderDirection: "",
      currentPage: 1,
      clientes: [],
      agentes: [],
      agenciasSelected: [],
      agentesSelected: [],
      agentesFormSelected: [],
      clientesSelected: [],
      clientesFormSelected: [],
      clientesForm: [],
      agentesForm: [],
      selected: [],
      selectedAgencia: [],
      selectedGuiaCarga: "20",
      selectedGuiaFactura: "",
      selectedCulminado: "",
      guia_desde: "",
      guia_hasta: "",
      selectedCliente: [],
      selectedAgente: [],
      error: "",
      disabledAgencia: true,
      disabledAgente: false,
      disabledCliente: false,
      disabledInputsEdit: false,
      content: null,
    };
  },
  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const order = ref(false);
    const pagination = ref({
      descending: true,
      page: 1,
      rowsPerPage: 5,
      rowsNumber: "",
      order_by: "control_inicio",
    });
    return {
      pagination,
      anulate: ref(false),
      fileSelector: false,
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Mantenimiento - Carga Manual de Guias",
      ""
    );

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "asignacionguias",
      },
    });
  },
  methods: {
    readFile() {
      const reader = new FileReader();
      reader.onerror = (err) => console.log(err);
      reader.readAsText(this.file);
      reader.onload = (res) => {
        this.content = res.target.result;
        var lines = this.content.split("\n");
        for (var i = 0; i < lines.length - 1; i++) {
          this.form = {};
          var columns = lines[i].split("\t");
          this.form.nro_factura = columns[0];
          this.form.fecha_factura = columns[1];
          this.form.fecha_factura = columns[1];
          this.form.nb_cliente = columns[2];
          this.form.ci_rif = columns[3];
          this.form.direccion = columns[4];
          this.form.estado = columns[5];
          this.form.ciudad = columns[6];
          this.form.bultos = columns[7];
          this.form.telefono = columns[8];
          this.form.monto = columns[9];
          this.form.peso = columns[10];
          this.form.carga_neta = columns[11];
          this.datos.push(this.form);
        }
      };
    },
    onRejected() {
      this.$q.notify({
        type: "negative",
        message: `El archivo a cargar debe ser un TXT`,
      });
    },
    // Metodo para Actualizar Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
    },
    // Metodo para Setear Datos al Abrir Modal de Crear
    setDataCreate() {
      moment.locale("es");
      this.form.fecha_asignacion = moment().format("L");
      this.form.cod_agencia = this.selectedAgencia;
      if (this.selectedAgencia.id) {
        this.disabledAgencia = true;
      } else {
        this.disabledAgencia = false;
      }
      if (this.selectedCliente.id) {
        this.form.cod_cliente = this.selectedCliente;
        this.disabledCliente = true;
      } else {
        this.disabledCliente = false;
      }
      if (this.selectedAgente.id) {
        this.form.cod_agente = this.selectedAgente;
        this.disabledAgente = true;
      } else {
        this.disabledAgente = false;
      }
    },
    // Metodo para Filtrar Selects
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
    // Metodo de Permisos
    allowOption(option) {
      return (
        this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0
      );
    },
    // Metodo para Setear Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },
    // Regla particular de Correlativo
    reglasCorrelativo(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if ((val !== null) !== "") {
        if (val - this.form.control_inicio < 0) {
          return "El Ultimo Correlativo debe ser Mayor al Primero";
        }
        if (val.length > 10) {
          return "Deben ser Maximo 10 caracteres";
        }
      }
    },
    // Regla Particular de Correlativo para Filtros
    reglasCorrelativoFilter() {
      if (this.guia_desde == "" || this.guia_desde == null) return true;
      if (this.guia_desde - this.guia_hasta < 0) {
        this.$q.notify({
          message: "El Ultimo Correlativo debe ser Mayor al Primero",
          color: "red",
        });
        return false;
      }
      return true;
    },

    // METODOS DE PAGINA

    // Metodo para hacer Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para hacer Get de Guias
    getDataGuias() {
      var cliente = "";
      var agente = "";
      var sortBy = this.pagination.sortBy;
      var orderDirection = this.orderDirection;
      if (this.selectedCliente.id) cliente = this.selectedCliente.id;
      if (this.selectedAgente.id) agente = this.selectedAgente.id;
      if (!sortBy) sortBy = "control_inicio";
      if (orderDirection == "") orderDirection = "DESC";
      this.$refs.methods.getData(`/cguias`, "setDataTable", "datos", {
        headers: {
          page: 1,
          limit: 5,
          order_by: sortBy,
          order_direction: orderDirection,
          agencia: this.selectedAgencia.id,
          agente: agente,
          cliente: cliente,
          disp: this.selectedCulminado,
          tipo: "20",
          desde: this.guia_desde,
          hasta: this.guia_hasta,
        },
      });
    },
    // Metodo para Setear datos Paginados
    setDataPaginated(res, dataRes) {
      this[dataRes] = res.data;
    },
    // Metodo para Setear Datos No Paginados
    setData(res, dataRes) {
      this[dataRes] = res;
    },
    // Metodo para Setear Datos Iniciales
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      this.pagination.sortBy = "control_inicio";
      this.getData("/clientes", "setDataPaginated", "clientes");
      this.getData("/agentes", "setDataPaginated", "agentes");
      this.getData(`/cguias`, "setDataTable", "datos", {
        headers: {
          agencia: this.selectedAgencia.id,
          page: 1,
          tipo: "20",
          limit: 5,
          order_direction: "DESC",
          order_by: "control_inicio",
        },
      });
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.loading = false;
      this[dataRes].cant_disponible = res.cant_disponible;
      if (this.form.cant_disponible == "0") {
        this.disabledInputsEdit = true;
      }
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].cant_asignada = res.cant_asignada;
      this.form.fecha_asignacion = res.fecha_asignacion
        .split("-")
        .reverse()
        .join("/");
      var cod_agencia = res.cod_agencia;
      var cod_agente = res.cod_agente;
      var cod_cliente = res.cod_cliente;
      if (cod_agencia) {
        for (var i = 0; i <= this.agencias.length - 1; i++) {
          if (this.agencias[i].id == cod_agencia) {
            this.form.cod_agencia = this.agencias[i];
            break;
          }
        }
      }
      if (cod_agente) {
        for (var i = 0; i <= this.agentes.length - 1; i++) {
          if (this.agentes[i].id == cod_agente) {
            this.form.cod_agente = this.agentes[i];
            break;
          }
        }
      }
      if (cod_cliente) {
        for (var i = 0; i <= this.clientes.length - 1; i++) {
          if (this.clientes[i].id == cod_cliente) {
            this.form.cod_cliente = this.clientes[i];
            break;
          }
        }
      }
      this[dataRes].id = res.id;
    },
    // Metodo para Eliminar Datos Seleccionados
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/cguias/${idpost}`, "getDataGuias");
      this.loading = true;
    },
    // Metodo para Editar o Crear Datos
    sendData() {
      this.form.fecha_asignacion = this.form.fecha_asignacion
        .split("/")
        .reverse()
        .join("-");
      this.form.cod_cliente = this.form.cod_cliente.id;
      this.form.cod_agente = this.form.cod_agente.id;
      this.form.cod_agencia = this.form.cod_agencia.id;
      if (!this.form.id) {
        this.$refs.methods.createData(`/cguias`, this.form, "getDataGuias");
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/cguias/${this.form.id}`,
          this.form,
          "getDataGuias"
        );
        this.resetForm();
        this.dialog = false;
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.control_inicio = "";
      this.form.control_final = "";
      this.form.cant_asignada = "";
      this.form.cant_disponible = "";
      this.form.fecha_asignacion = "";
      this.form.cod_agencia = "";
      this.form.cod_agente = "";
      this.form.cod_cliente = "";
    },
  },
};
</script>

<style>
.hide {
  display: none;
}

@media screen and (min-width: 1024px) {
  .inputMenuGuias {
    margin-right: 20px;
  }
}

@media screen and (min-width: 600px) {
  .menuFilter {
    padding-bottom: 1px;
  }
}

@media screen and (max-width: 1024px) {
  .inputMenuGuias {
    margin-top: 14px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1024px) {
  .titleMenu {
    padding-bottom: 1px;
  }
}

@media screen and (max-width: 600px) {
  .titleMenu {
    margin-top: 15px;
  }
}

@media screen and (max-width: 1024px) {
  .checkboxGuias {
    margin-top: 14px;
  }
}

@media screen and (max-width: 1024px) {
  .checkboxGuias {
    margin-left: 10px;
  }
}

@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 7px;
  }
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

@media screen and (max-width: 600px) {
  .cajaMobile {
    padding: 5px !important;
  }
}

@media screen and (max-width: 1024px) {
  .selectMobile {
    margin-bottom: 15px !important;
  }
}

@media screen and (max-width: 600px) {
  .selectMobile2 {
    margin-bottom: 15px;
  }
}

@media screen and (min-width: 1024px) {
  .checkboxCulminado {
    margin-top: -6px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1024px) {
  .checkboxCulminado {
    margin-top: 8px;
    text-align: center;
  }
}
</style>
