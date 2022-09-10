<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="createData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.control_inicio"
                  label="Primer Correlativo"
                  class="pcform"
                  hint=""
                  lazy-rules
                  :rules="[reglasNotNull10]"
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
                  label="Ultimo Correlativo"
                  :rules="[reglasSegundoCorrelativo]"
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
                  label="Fecha de Asignación"
                  hint=""
                  class="pcform"
                  v-model="form.fecha_asignacion"
                  lazy-rules
                  mask="##/##/####"
                  :rules="[dateValidation]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.fecha_asignacion"
                          mask="DD/MM/YYYY"
                                  @update:model-value="this.$refs.qDateProxy.hide()
                                   "
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_agencia"
                  label="Agencia"
                  hint=""
                  :readonly="this.disabledAgencia"
                  :rules="[reglasSelect]"
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
                  lazy-rules
                  option-label="nb_agencia"
                  option-value="id"
                  @update:model-value="
                    this.axiosConfig.headers.agencia = this.form.cod_agencia.id;
                    getData('/clientes', 'setData', 'clientes');
                    getData('/agentes', 'setData', 'agentes');
                    this.form.cod_cliente = '';
                    this.form.cod_agente = '';
                  "
                >
                  <template v-slot:no-option>
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
                  v-model="form.cod_agente"
                  :readonly="this.disabledAgente"
                  label="Agente"
                  class="pcform"
                  hint=""
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
                  lazy-rules
                  option-label="persona_responsable"
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
                  label="Cliente"
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
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Control"
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

    <q-dialog v-model="edit">
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="putData()">
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="formEdit.control_inicio"
                  label="Primer Correlativo"
                  class="pcform"
                  :readonly="this.disabledInputsEdit"
                  hint=""
                  lazy-rules
                  :rules="[reglasNotNull10]"
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
                  v-model="formEdit.control_final"
                  label="Ultimo Correlativo"
                  :rules="[reglasSegundoCorrelativoEdit]"
                  hint=""
                  :readonly="this.disabledInputsEdit"
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
                  label="Fecha de Asignación"
                  hint=""
                  v-model="formEdit.fecha_asignacion"
                  lazy-rules
                  class="pcform"
                  mask="##/##/####"
                  :readonly="this.disabledInputsEdit"
                  :rules="[dateValidation]"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="formEdit.fecha_asignacion"
                          mask="DD/MM/YYYY"
                                  @update:model-value="this.$refs.qDateProxy.hide()
                                   "
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.cod_agencia"
                  label="Agencia"
                  :readonly="this.disabledInputsEdit"
                  hint=""
                  :rules="[reglasSelect]"
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
                  lazy-rules
                  option-label="nb_agencia"
                  option-value="id"
                  @update:model-value="
                    this.axiosConfig.headers.agencia = this.formEdit.cod_agencia.id;
                    getData('/clientes', 'setData', 'clientes');
                    getData('/agentes', 'setData', 'agentes');
                    this.formEdit.cod_cliente = '';
                    this.formEdit.cod_agente = '';
                  "
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
                  v-model="formEdit.cod_agente"
                  label="Agente"
                  :readonly="this.disabledInputsEdit"
                  hint=""
                  class="pcform"
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
                  lazy-rules
                  option-label="persona_responsable"
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
                  v-model="formEdit.cod_cliente"
                  label="Cliente"
                  hint=""
                  :readonly="this.disabledInputsEdit"
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
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Control"
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
        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary"
        style="align-self: center; text-align: center"
      >
        <h4><strong>MANTENIMIENTO - ASIGNACIÓN DE GUIAS</strong></h4>
      </div>

      <div
        class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-bottom: 20px"
      >
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-4"
          style="align-self: center; text-align: center; padding-right: 20px"
        >
          <q-select
            rounded
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
              this.axiosConfig.headers.agencia = this.selectedAgencia.id;
              this.axiosConfig.headers.agente = '';
              this.axiosConfig.headers.cliente = '';
              this.axiosConfig.headers.order_by = 'control_inicio';
              this.axiosConfig.headers.order_direction = 'DESC';
              getData(`/cguias`, 'setDataTable', 'datos');
              this.axiosConfig.headers.order_by = '';
              this.axiosConfig.headers.order_direction = '';
              getData(`/agentes`, 'setDataSelect', 'agentes');
              getData(`/clientes`, 'setDataSelect', 'clientes');
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
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-4"
          style="align-self: center; text-align: center; padding-right: 20px"
        >
          <q-select
            rounded
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
            label="Agente"
            @update:model-value="
              this.axiosConfig.headers.agente = this.selectedAgente.id;
              this.axiosConfig.headers.order_by = 'control_inicio';
              this.axiosConfig.headers.order_direction = 'DESC';
              getData(`/cguias`, 'setDataTable', 'datos');
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
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-4"
          style="align-self: center; text-align: center; padding-right: 20px"
        >
          <q-select
            rounded
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
            label="Cliente"
            @update:model-value="
              this.axiosConfig.headers.cliente = this.selectedCliente.id;
              this.axiosConfig.headers.order_by = 'control_inicio';
              this.axiosConfig.headers.order_direction = 'DESC';
              getData(`/cguias`, 'setDataTable', 'datos');
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
      </div>

      <div
        class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center"
      >
        <q-card
          bordered
          class="row col-md-8 col-xl-8 col-lg-8 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center"
        >
          <q-card-section
            class="row col-md-12 col-xs-12 menuFilter"
            style="align-self: center; text-align: center"
          >
            <div class="col-md-5 col-xs-12">
              <q-input
                outlined
                v-model="guia_desde"
                label="Guia Desde:"
                type="number"
                class="pcform"
                @keydown.enter="
                  this.axiosConfig.headers.desde = this.guia_desde;
                  getData(`/cguias`, 'setDataTable', 'datos');
                  if (this.guia_hasta !== '') {
                    this.reglasCorrelativoFilter();
                  }
                "
                @keydown.tab="
                  this.axiosConfig.headers.desde = this.guia_desde;
                  getData(`/cguias`, 'setDataTable', 'datos');
                  if (this.guia_hasta !== '') {
                    this.reglasCorrelativoFilter();
                  }
                "
                @blur="
                  this.axiosConfig.headers.desde = this.guia_desde;
                  getData(`/cguias`, 'setDataTable', 'datos');
                  if (this.guia_hasta !== '') {
                    this.reglasCorrelativoFilter();
                  }
                "
                hide-bottom-space
                hint=""
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="south_america" />
                </template>
              </q-input>
            </div>

            <div class="col-md-5 col-xs-7">
              <q-input
                outlined
                v-model="guia_hasta"
                @keydown.enter="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/cguias`, 'setDataTable', 'datos');
                  this.reglasCorrelativoFilter();
                "
                @keydown.tab="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/cguias`, 'setDataTable', 'datos');
                  this.reglasCorrelativoFilter();
                "
                @blur="
                  this.axiosConfig.headers.hasta = this.guia_hasta;
                  getData(`/cguias`, 'setDataTable', 'datos');
                  this.reglasCorrelativoFilter();
                "
                label="Guia Hasta:"
                type="number"
                class="inputMenuGuias"
                hide-bottom-space
                lazy-rules
                hint=""
              >
                <template v-slot:prepend>
                  <q-icon name="south_america" />
                </template>
              </q-input>
            </div>

            <div class="col-md-2 col-xs-4 checkboxGuias">
              <q-field
                hide-bottom-space
                borderless
                dense
                v-model="selectedCulminado"
              >
                <template v-slot:control>
                  <q-checkbox
                    size="md"
                    v-model="selectedCulminado"
                    true-value="0"
                    false-value=""
                    style="
                      font-size: 13px;
                      margin-left: 10px;
                      margin-right: 10px;
                    "
                    label="Culminado"
                    @update:model-value="
                      this.axiosConfig.headers.disp = this.selectedCulminado;
                      getData(`/cguias`, 'setDataTable', 'datos');
                    "
                  />
                </template>
              </q-field>
            </div>
          </q-card-section>
        </q-card>

        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 botonesGuias"
          style="text-align: center; align-self: center"
        >
          <q-btn
            dense
            color="primary"
            :disabled="this.disabledCreate"
            round
            @click="
              this.create = true;
              this.setDataCreate();
            "
            padding="sm"
            style="margin-right: 25px"
          >
            <q-icon size="40px" name="add" color="white"> </q-icon>
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
            :disabled="this.disabledDelete"
            style="margin-right: 25px"
            @click="
              selectedAgencia = null;
              selectedCliente = null;
              selectedAgente = null;
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              this.axiosConfig.headers.agencia = '';
              this.axiosConfig.headers.cliente = '';
              this.axiosConfig.headers.agente = '';
              this.axiosConfig.headers.disp = '';
              this.axiosConfig.headers.desde = '';
              this.axiosConfig.headers.hasta = '';
              this.guia_desde = '';
              this.guia_hasta = '';
              this.axiosConfig.headers.order_by = 'control_inicio';
              this.axiosConfig.headers.order_direction = 'DESC';
              this.clientes = [];
              this.agentes = [];
              this.disabledAgencia = false;
              this.disabledCliente = false;
              this.disabledAgente = false;
              getData(`/cguias`, 'setDataTable', 'datos');
            "
          >
            <q-icon size="40px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn dense color="primary" round padding="sm">
            <q-icon size="40px" name="sticky_note_2" color="white"> </q-icon>
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
    </div>

    <div class="q-pa-md" style="margin-top: 20px">
      <div class="q-gutter-y-md">
        <div bordered flat class="my-card row">
          <q-table
            :rows="datos"
            binary-state-sort
            row-key="id"
            :columns="columns"
            :loading="loading"
            :separator="separator"
            :filter="filter"
            style="width: 100%"
            :grid="$q.screen.xs"
            :rows-per-page-options="[5, 10, 15, 20, 50]"
            @request="onRequest"
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
                  :disabled="this.disabledEdit"
                  @click="
                    this.resetFormEdit();
                    getDataEdit(`${props.row.id}`);
                    edit = true;
                  "
                ></q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="delete"
                  :disabled="this.disabledDelete"
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
                          :disabled="this.disabledEdit"
                          @click="
                            this.resetFormEdit();
                            getDataEdit(`${props.row.id}`);
                            edit = true;
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
                          :disabled="this.disabledDelete"
                          @click="selected = props.row.id"
                          @click.capture="deletePopup = true"
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
      @get-Data="getData('/cguias', 'setDataTable', 'datos')"
      @get-Data-Guias="getDataGuias('/cguias', 'setDataTable', 'datos')"
      @set-Data="setData"
      @set-Data-Table="setDataTable"
      @on-Request="onRequest"
      @reset-Loading="resetLoading"
      @set-Data-Iniciar="setDataIniciar"
      @set-Data-Edit="setDataEdit"
      @set-Data-Select="setDataSelect"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { date } from "quasar";

import moment from "moment";

import { Notify } from "quasar";

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
          name: "control_inicio",
          label: "Primer Correlativo",
          field: "control_inicio",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "control_final",
          label: "Segundo Correlativo",
          field: "control_final",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cant_asignada",
          label: "Asignado",
          field: "cant_asignada",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cant_disponible",
          label: "Disponible",
          field: "cant_disponible",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_asignacion",
          label: "Fecha de Asignación",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_asignacion",
          label: "Fecha de Asignación",
          field: "fecha_asignacion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cant_disponible",
          label: "Pendiente",
          field: "cant_disponible",
          align: "left",
          sortable: true,
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
        tipo: "20",
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
        tipo: "20",
        id: "",
      },
      datos: [],
      agencias: [],
      count: 1,
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
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      disabledAgencia: true,
      disabledAgente: false,
      disabledCliente: false,
      disabledInputsEdit: false,
    };
  },
  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const order = ref(false);
    const pagination = ref({
      descending: true,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: "",
      order_by: "control_inicio",
    });
    return {
      axiosConfig: {
        headers: {
          Authorization: ``,
          page: "",
          limit: "",
          order_by: "",
          order_direction: "",
          agencia: "",
          agente: "",
          cliente: "",
          disp: "",
          tipo: "20",
          desde: "",
          hasta: "",
        },
      },
      pagination,
      anulate: ref(false),
      separator: ref("vertical"),
      create: ref(false),
      edit: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
      correlativoMayor() {
        $q.notify({
          message: "El Ultimo Correlativo debe ser Mayor al Primero",
          color: "red",
        });
      },
    };
  },
  mounted() {
    this.getData("/agencias", "setDataIniciar", "agencias");
    this.loading = true;
    this.$refs.desactiveCrud.desactivarCrud(
      "c_asignacionguias",
      "r_asignacionguias",
      "u_asignacionguias",
      "d_asignacionguias",
      "desactivarCrud"
    );
  },
  methods: {
    onRequest(res, dataRes) {
      if (this.count == 1) {
        console.log(res)
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

        this.getData(`/cguias`, "setDataTable", "datos");
      }
      this.count = 0;
    },
    setDataTable(res, dataRes) {
      this[dataRes] = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
    },
    setDataCreate() {
      moment.locale("es");
      this.form.fecha_asignacion = moment().format("L");
      this.form.cod_agencia = this.selectedAgencia;
      if (this.selectedAgencia.id) {
        this.disabledAgencia = true;
      }
      if (this.selectedCliente.id) {
        this.form.cod_cliente = this.selectedCliente;
        this.disabledCliente = true;
      }
      if (this.selectedAgente.id) {
        this.form.cod_agente = this.selectedAgente;
        this.disabledAgente = true;
      }
    },
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
    resetLoading() {
      this.loading = false;
    },
    // Reglas
    reglasNotNull10(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if (val.length > 10) {
        return "Deben ser Maximo 10 caracteres";
      }
    },
    reglasSegundoCorrelativo(val) {
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
    reglasSegundoCorrelativoEdit(val) {
      if (val === null) {
        return "Debes Escribir Algo";
      }
      if (val === "") {
        return "Debes Escribir Algo";
      }
      if ((val !== null) !== "") {
        if (val - this.formEdit.control_inicio < 0) {
          return "El Ultimo Correlativo debe ser Mayor al Primero";
        }
        if (val.length > 10) {
          return "Deben ser Maximo 10 caracteres";
        }
      }
    },
    reglasCorrelativoFilter() {
      if (this.guia_hasta - this.guia_desde < 0) {
        this.correlativoMayor();
      }
    },
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
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
    },
    getDataGuias(url, call, dataRes) {
      this.axiosConfig.headers.agencia = this.selectedAgencia.id;
      this.axiosConfig.headers.cliente = this.selectedCliente.id;
      this.axiosConfig.headers.agente = this.selectedAgente.id;
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      if (url == "/cguias") {
        this.loading = true;
      }
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
    },
    setDataIniciar(res, dataRes) {
      this[dataRes] = res.data;
      this.axiosConfig.headers.agencia = this.agencias[0].id;
      this.selectedAgencia = this.agencias[0];
      this.getData("/clientes", "setData", "clientes");
      this.getData("/agentes", "setData", "agentes");
      (this.axiosConfig.headers.page = 1),
      (this.axiosConfig.headers.limit = 10),
      (this.axiosConfig.headers.order_by = "control_inicio"),
      (this.axiosConfig.headers.order_direction = "DESC"),
      this.getData(`/cguias`, "onRequest", "datos");
    },
    setDataEdit(res, dataRes) {
      this.loading = false;
      this[dataRes].cant_disponible = res.cant_disponible;
      if (this.formEdit.cant_disponible == "0") {
        this.disabledInputsEdit = true;
      }
      this[dataRes].control_inicio = res.control_inicio;
      this[dataRes].control_final = res.control_final;
      this[dataRes].cant_asignada = res.cant_asignada;
      this.formEdit.fecha_asignacion = res.fecha_asignacion
        .split("-")
        .reverse()
        .join("/");
      var cod_agencia = res.cod_agencia;
      var cod_agente = res.cod_agente;
      var cod_cliente = res.cod_cliente;
      if (cod_agencia) {
        for (var i = 0; i <= this.agencias.length - 1; i++) {
          if (this.agencias[i].id == cod_agencia) {
            this.formEdit.cod_agencia = this.agencias[i];
            break;
          }
        }
      }
      if (cod_agente) {
        for (var i = 0; i <= this.agentes.length - 1; i++) {
          if (this.agentes[i].id == cod_agente) {
            this.formEdit.cod_agente = this.agentes[i];
            break;
          }
        }
      }
      if (cod_cliente) {
        for (var i = 0; i <= this.clientes.length - 1; i++) {
          if (this.clientes[i].id == cod_cliente) {
            this.formEdit.cod_cliente = this.clientes[i];
            break;
          }
        }
      }
      this[dataRes].id = res.id;
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/cguias/${idpost}`,
        "getData",
        this.axiosConfig
      );
      this.loading = true;
    },
    createData() {
      this.form.fecha_asignacion = this.form.fecha_asignacion
        .split("/")
        .reverse()
        .join("-");
      this.form.cod_cliente = this.form.cod_cliente.id;
      this.form.cod_agente = this.form.cod_agente.id;
      (this.form.cod_agencia = this.form.cod_agencia.id),
        (this.axiosConfig.headers.agencia = this.selectedAgencia.id);
      if (this.selectedAgente.id) {
        this.axiosConfig.headers.agente = this.selectedAgente.id;
      }
      if (this.selectedCliente.id) {
        this.axiosConfig.headers.cliente = this.selectedCliente.id;
      }
      this.$refs.methods.createData(
        `/cguias`,
        this.form,
        "getData",
        this.axiosConfig
      );
      this.resetForm();
      this.loading = true;
    },
    putData() {
      this.formEdit.fecha_asignacion = this.formEdit.fecha_asignacion
        .split("/")
        .reverse()
        .join("-");
      (this.formEdit.cod_agencia = this.formEdit.cod_agencia.id),
        (this.formEdit.cod_cliente = this.formEdit.cod_cliente.id);
      this.formEdit.cod_agente = this.formEdit.cod_agente.id;
      this.axiosConfig.headers.agencia = this.selectedAgencia.id;
      if (this.selectedAgente.id) {
        this.axiosConfig.headers.agente = this.selectedAgente.id;
      }
      if (this.selectedCliente.id) {
        this.axiosConfig.headers.cliente = this.selectedCliente.id;
      }
      this.$refs.methods.putData(
        `/cguias/${this.formEdit.id}`,
        this.formEdit,
        "getData",
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
        (this.create = false);
      this.disabledAgencia = false;
      this.disabledAgente = false;
      this.disabledCliente = false;
    },
    resetFormEdit() {
      (this.disabledInputsEdit = false),
        (this.formEdit.control_inicio = ""),
        (this.formEdit.control_final = ""),
        (this.formEdit.cant_asignada = ""),
        (this.formEdit.cant_disponible = ""),
        (this.formEdit.fecha_asignacion = ""),
        (this.formEdit.cod_agencia = ""),
        (this.formEdit.cod_agente = ""),
        (this.formEdit.cod_cliente = ""),
        (this.agentesForm = []),
        (this.clientesForm = []),
        (this.edit = false);
    },

    dateValidation(val) {
      var fecha = val.split("/")
      var year =  fecha[2]
      var month = fecha[1]
      var day = fecha[0]
      if (month == "" && day == "" && year == "") {
        console.log(month)
        console.log(day)
        console.log(year)
        this.$q.notify({
          message: "Fecha Invalida",
          color: "red",
        });
        return "";
      }
      fecha = month+ "/" + day + "/" + year
      if (date.isValid(fecha) == false) {
        console.log(fecha)
        this.$q.notify({
          message: "Fecha Invalida",
          color: "red",
        });
        return "";
      }
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
  .button-filter {
    margin-top: 13px;
  }
}
.menuFilter {
  padding-bottom: 1px;
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
    margin-top: 30px;
  }
}
@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 30px;
  }
}
</style>
