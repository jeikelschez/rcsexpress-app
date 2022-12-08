<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="max-width: 100vw">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Envio"
                  hint=""
                  class="pcform"
                  v-model="form.fecha_asignacion"
                  lazy-rules
                  mask="##/##/####"
                  :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
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
                          @update:model-value="this.$refs.qDateProxy.hide()"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="Transporte"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    reglasUltimoCorrelativo,
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    this.form.cant_asignada = 0;
                    this.form.cant_disponible = 0;
                    if (
                      this.form.control_final - this.form.control_inicio + 1 >
                      0
                    ) {
                      this.form.cant_asignada =
                        this.form.control_final - this.form.control_inicio + 1;
                      this.form.cant_disponible = this.form.cant_asignada;
                    }
                  "
                  type="number"
                  class="pcform"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.cant_asignada"
                  label="Responsable Transporte"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="assignment" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.cant_disponible"
                  label="Nro. Fact. Flete"
                  hint=""
                  class="pcform"
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="assignment_turned_in" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.cant_disponible"
                  label="Monto Anticipo"
                  hint=""
                  lazy-rules
                  class="pcform"
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="assignment_turned_in" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  upper-case
                  outlined
                  v-model="form.cant_disponible"
                  label="Flete sin IVA/Viáticos (Bs.)"
                  hint=""
                  lazy-rules
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="assignment_turned_in" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_agencia"
                  label="Vehiculo"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  :options="agenciasSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
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
                    this.$refs.methods.getData(
                      `/agentes`,
                      'setData',
                      'agentes',
                      {
                        headers: {
                          agencia: form.cod_agencia.id,
                        },
                      }
                    );
                    this.$refs.methods.getData(
                      `/clientes`,
                      'setData',
                      'clientes',
                      {
                        headers: {
                          agencia: form.cod_agencia.id,
                        },
                      }
                    );
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
              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_agente"
                  label="Ayudante"
                  class="pcform"
                  hint=""
                  :options="agentesSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
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
              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_cliente"
                  label="Origen"
                  hint=""
                  :options="clientesSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'clientesSelected',
                        'clientes',
                        'nb_cliente'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  class="pcform"
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
              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_cliente"
                  label="Destino"
                  hint=""
                  :options="clientesSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
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
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="Venta sin IVA (Bs.)"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    reglasUltimoCorrelativo,
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    this.form.cant_asignada = 0;
                    this.form.cant_disponible = 0;
                    if (
                      this.form.control_final - this.form.control_inicio + 1 >
                      0
                    ) {
                      this.form.cant_asignada =
                        this.form.control_final - this.form.control_inicio + 1;
                      this.form.cant_disponible = this.form.cant_asignada;
                    }
                  "
                  type="number"
                  class="pcform"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="Utilidad Operativa (Bs.)"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    reglasUltimoCorrelativo,
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    this.form.cant_asignada = 0;
                    this.form.cant_disponible = 0;
                    if (
                      this.form.control_final - this.form.control_inicio + 1 >
                      0
                    ) {
                      this.form.cant_asignada =
                        this.form.control_final - this.form.control_inicio + 1;
                      this.form.cant_disponible = this.form.cant_asignada;
                    }
                  "
                  type="number"
                  class="pcform"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-2 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="% Costo"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    reglasUltimoCorrelativo,
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    this.form.cant_asignada = 0;
                    this.form.cant_disponible = 0;
                    if (
                      this.form.control_final - this.form.control_inicio + 1 >
                      0
                    ) {
                      this.form.cant_asignada =
                        this.form.control_final - this.form.control_inicio + 1;
                      this.form.cant_disponible = this.form.cant_asignada;
                    }
                  "
                  type="number"
                  class="pcform"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-2 col-xs-12">
                <q-input
                  outlined
                  v-model="form.control_final"
                  label="% Utilidad"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    reglasUltimoCorrelativo,
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    this.form.cant_asignada = 0;
                    this.form.cant_disponible = 0;
                    if (
                      this.form.control_final - this.form.control_inicio + 1 >
                      0
                    ) {
                      this.form.cant_asignada =
                        this.form.control_final - this.form.control_inicio + 1;
                      this.form.cant_disponible = this.form.cant_asignada;
                    }
                  "
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
                  label="Descripcion"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 10),
                    reglasUltimoCorrelativo,
                  ]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    this.form.cant_asignada = 0;
                    this.form.cant_disponible = 0;
                    if (
                      this.form.control_final - this.form.control_inicio + 1 >
                      0
                    ) {
                      this.form.cant_asignada =
                        this.form.control_final - this.form.control_inicio + 1;
                      this.form.cant_disponible = this.form.cant_asignada;
                    }
                  "
                  type="number"
                >
                  <template v-slot:prepend>
                    <q-icon name="account_circle" />
                  </template>
                </q-input>
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

    <q-dialog v-model="printOptions">
      <q-card style="width: 900px">
        <q-card-section>
          <div class="row justify-center items-center">
            <div
              class="col-md-12 col-xs-12"
              style="margin-bottom: 6px; margin-top: 10px"
            >
              <p
                style="font-size: 17px; text-align: center"
                class="text-secondary"
              >
                <strong>SELECCIONA EL TIPO DE IMPRESION:</strong>
              </p>
            </div>
            <div class="col-md-12 col-xs-12">
              <q-select
                outlined
                v-model="form.nro_documento"
                label="Tipo de Impresion"
                :options="print"
              >
              </q-select>
            </div>
            <div
              class="col-md-12 col-xs-12"
              style="margin-top: 23px; margin-bottom: 10px; text-align: center"
            >
              <q-btn label="Imprimir" color="primary" style="width: 300px" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="q-pa-sm justify-center" style="margin-top: 10px">
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -20px"
      >
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>OPERACIONES - REGISTRO DE COSTOS</strong>
          </p>
        </div>
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            v-model="guia_desde"
            rounded
            dense
            outlined
            standout
            label="Agencia"
            @keyup.enter="getDataTable()"
            mask="##########"
          >
          </q-select>
        </div>
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Fecha Desde:"
            hint=""
            rounded
            style="padding-bottom: 0px"
            dense
            v-model="form.fecha_llega_transito"
            mask="##/##/####"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="form.fecha_llega_transito"
                    mask="DD/MM/YYYY"
                    @update:model-value="this.$refs.qDateProxy.hide()"
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Fecha Hasta:"
            style="padding-bottom: 0px"
            hint=""
            rounded
            dense
            v-model="form.fecha_llega_transito"
            mask="##/##/####"
            lazy-rules
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="form.fecha_llega_transito"
                    mask="DD/MM/YYYY"
                    @update:model-value="this.$refs.qDateProxy.hide()"
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile2"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
          >
            <q-icon size="25px" name="add" color="white"> </q-icon>
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
            style="margin-right: 15px"
            @click="
              selectedAgencia = [];
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataTable();
            "
          >
            <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>
          <q-btn dense color="primary" round padding="sm" @click="printOptions = true">
            <q-icon size="25px" name="print" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              transition-show="scale"
              style="max-height: 30px"
              transition-hide="scale"
              color="primary"
              >Imprimir</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-y-md" style="margin-top: -30px">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="mails" label="Datos del Costo de Transporte" />
          <q-tab name="alarms" label="Detalle de Guias Transportadas" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <q-table
              :rows="clientes"
              dense
              :columns="columnsClientes"
              binary-state-sort
              :virtual-scroll="null"
              :separator="separator"
              row-key="action"
              :loading="loading"
              class="my-sticky-header-column-table"
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
                    icon="save"
                    :disabled="this.disabledDelete"
                    @click="selected = props.row.id"
                    @click.capture="permisosDelete = true"
                  ></q-btn>
                  <q-btn
                    dense
                    round
                    flat
                    color="primary"
                    icon="edit"
                    @click="this.dialog = true"
                  ></q-btn>
                </q-td>
              </template>
            </q-table>

            <div
              class="col-md-6 col-xs-12 lastboxStyle"
              style="margin-bottom: 5px"
            >
              <q-card
                class="q-pa-md col-md-12 col-xs-12"
                bordered
                style="padding: 5px; margin-top: 20px"
              >
                <q-card-section
                  style="
                    padding-bottom: 0px;
                    padding-left: 10px;
                    padding-right: 10px;
                  "
                >
                  <div class="row">
                    <div
                      class="col-md-12 col-xs-12"
                      style="
                        align-self: center;
                        text-align: left;
                        margin-top: -30px;
                      "
                    >
                      <h4
                        style="font-size: 16px; margin-bottom: 5px"
                        class="text-secondary"
                      >
                        <strong>Resumen</strong>
                      </h4>
                    </div>
                    <div class="col-md-1 col-xs-12">
                      <q-input
                        outlined
                        v-model="form.monto_subtotal"
                        label="Cant."
                        hint=""
                        dense
                        :disable="true"
                        input-class="text-right"
                        style="padding-bottom: 10px"
                        class="pcform"
                        :rules="[
                          (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                        ]"
                        lazy-rules
                      >
                      </q-input>
                    </div>
                    <div class="col-md-3 col-xs-12">
                      <q-input
                        outlined
                        v-model="form.monto_impuesto"
                        label="Costo"
                        hint=""
                        class="pcform"
                        :rules="[
                          (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                        ]"
                        dense
                        :disable="true"
                        input-class="text-right"
                        style="padding-bottom: 10px"
                        lazy-rules
                      >
                      </q-input>
                    </div>
                    <div class="col-md-2 col-xs-12">
                      <q-input
                        outlined
                        v-model="form.monto_base"
                        label="Venta"
                        input-class="text-right"
                        hint=""
                        :disable="true"
                        :rules="[
                          (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                        ]"
                        dense
                        style="padding-bottom: 10px"
                        class="pcform"
                        lazy-rules
                      >
                      </q-input>
                    </div>
                    <div class="col-md-2 col-xs-12">
                      <q-input
                        outlined
                        v-model="form.monto_total"
                        label="Utilidad"
                        class="pcform"
                        input-class="text-right"
                        hint=""
                        :disable="true"
                        :rules="[
                          (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                        ]"
                        dense
                        style="padding-bottom: 10px"
                        lazy-rules
                      >
                      </q-input>
                    </div>
                    <div class="col-md-2 col-xs-12">
                      <q-input
                        outlined
                        v-model="form.monto_total"
                        label="Costo"
                        class="pcform"
                        input-class="text-right"
                        hint=""
                        :disable="true"
                        :rules="[
                          (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                        ]"
                        dense
                        style="padding-bottom: 10px"
                        lazy-rules
                      >
                        <template v-slot:append>
                          <q-icon name="percent" class="cursor-pointer">
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-md-2 col-xs-12">
                      <q-input
                        outlined
                        v-model="form.monto_total"
                        label="Utilidad"
                        input-class="text-right"
                        hint=""
                        :disable="true"
                        :rules="[
                          (val) => this.$refs.rulesVue.isMax(val, 15, ''),
                        ]"
                        dense
                        style="padding-bottom: 10px"
                        lazy-rules
                      >
                        <template v-slot:append>
                          <q-icon name="percent" class="cursor-pointer">
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="row justify-center items-center">
              <div class="col-md-6 col-xs-12 boxStyle Cards2"
              >
                <q-card
                  class="q-pa-md col-md-4 col-xs-12"
                  bordered
                  style="padding: 10px"
                >
                  <q-card-section
                    style="
                      padding-bottom: 5px;
                      padding-left: 10px;
                      padding-right: 10px;
                    "
                  >
                    <div class="row">
                      <div
                        class="col-md-12 col-xs-12"
                        style="
                          align-self: center;
                          text-align: left;
                          margin-top: -30px;
                        "
                      >
                        <h4
                          style="font-size: 19px; margin-bottom: 20px"
                          class="text-secondary"
                        >
                          <strong
                            >Busqueda de Guias a Enviar a su
                            Destino</strong
                          >
                        </h4>
                      </div>
                      <div
                        class="col-md-7 col-xl-7 col-lg-7 col-xs-12 col-sm-7 cardMargin selectMobile2"
                        style="
                          align-self: center;
                          text-align: center;
                          margin-bottom: 10px;
                        "
                      >
                        <q-select
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Guia Desde"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                        </q-select>
                      </div>
                      <div
                        class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-5 cardMargin selectMobile2"
                        style="
                          align-self: center;
                          text-align: center;
                          margin-bottom: 10px;
                        "
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Guia Desde"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                          <template v-slot:append>
                            <q-icon
                              @click="getDataTable()"
                              class="cursor-pointer"
                              name="search"
                            />
                          </template>
                        </q-input>
                      </div>
                      <div
                        class="col-md-7 col-xl-7 col-lg-7 col-xs-12 col-sm-7 cardMargin selectMobile2"
                        style="align-self: center; text-align: center"
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Guia Desde"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                          <template v-slot:append>
                            <q-icon
                              @click="getDataTable()"
                              class="cursor-pointer"
                              name="search"
                            />
                          </template>
                        </q-input>
                      </div>
                      <div
                        class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-5 cardMargin selectMobile2"
                        style="align-self: center; text-align: center"
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Guia Desde"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                          <template v-slot:append>
                            <q-icon
                              @click="getDataTable()"
                              class="cursor-pointer"
                              name="search"
                            />
                          </template>
                        </q-input>
                      </div>
                      <q-table
                        :rows="clientes"
                        dense
                        :columns="columnsClientes"
                        binary-state-sort
                        :virtual-scroll="null"
                        :separator="separator"
                        row-key="action"
                        :loading="loading"
                        class="my-sticky-header-column-table"
                        :filter="filter"
                        style="width: 100%; margin-top: 20px; height: 290px; margin-bottom: 15px;"
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
                              icon="save"
                              :disabled="this.disabledDelete"
                              @click="selected = props.row.id"
                              @click.capture="permisosDelete = true"
                            ></q-btn>
                            <q-btn
                              dense
                              round
                              flat
                              color="primary"
                              icon="edit"
                              @click="this.dialog = true"
                            ></q-btn>
                          </q-td>
                        </template>
                      </q-table>
                      <div
                        class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile2"
                        style="
                          align-self: center;
                          text-align: center;
                        "
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Cantidad:"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                        </q-input>
                      </div>
                      <div
                        class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6"
                        style="align-self: center; text-align: center"
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Totales:"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                        </q-input>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div
                class="row col-md-1 col-xs-12 buttonsPC"
                style="text-align: center"
              >
                <div
                  class="col-md-12 col-xs-3"
                >
                  <q-btn padding="md" color="primary" round icon="chevron_right"/>
                </div>
                <div
                  class="col-md-12 col-xs-3 buttonsCard"
                >
                  <q-btn padding="md" color="primary" round icon="chevron_left"/>
                </div>
                <div
                  class="col-md-12 col-xs-3 buttonsCard"
                >
                  <q-btn padding="md" color="primary" round icon="keyboard_double_arrow_right"/>
                </div>

                <div
                  class="col-md-12 col-xs-3 buttonsCard"
                >
                  <q-btn padding="md" color="primary" round icon="keyboard_double_arrow_left"/>
                </div>
              </div>
              <div
                class="row col-md-1 col-xs-12 buttonsMenu buttonsMobile"
                style="text-align: center"
              >
                <div
                  class="col-md-12 col-xs-3"
                >
                  <q-btn padding="md" color="primary" round icon="expand_less"/>
                </div>
                <div
                  class="col-md-12 col-xs-3 buttonsCard"
                >
                  <q-btn padding="md" color="primary" round icon="expand_more"/>
                </div>
                <div
                  class="col-md-12 col-xs-3 buttonsCard"
                >
                  <q-btn padding="md" color="primary" round icon="keyboard_double_arrow_up"/>
                </div>

                <div
                  class="col-md-12 col-xs-3 buttonsCard"
                >
                  <q-btn padding="md" color="primary" round icon="keyboard_double_arrow_down"/>
                </div>
              </div>
              <div class="col-md-6 col-xs-12 Cards">
                <q-card
                  class="q-pa-md col-md-4 col-xs-12"
                  bordered
                  style="padding: 10px"
                >
                  <q-card-section
                    style="
                      padding-bottom: 5px;
                      padding-left: 10px;
                      padding-right: 10px;
                    "
                  >
                    <div class="row">
                      <div
                        class="col-md-12 col-xs-12"
                        style="
                          align-self: center;
                          text-align: left;
                          margin-top: -30px;
                        "
                      >
                        <h4
                          style="font-size: 19px; margin-bottom: 20px"
                          class="text-secondary"
                        >
                          <strong>Guias a Enviar por el Transporte</strong>
                        </h4>
                      </div>
                      <div
                        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
                        style="
                          align-self: center;
                          text-align: center;
                          margin-bottom: 10px;
                        "
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Transporte"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                        </q-input>
                      </div>
                      <div
                        class="col-md-7 col-xl-7 col-lg-7 col-xs-12 col-sm-7 cardMargin selectMobile2"
                        style="align-self: center; text-align: center"
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Guia Carga"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                          <template v-slot:append>
                            <q-icon
                              @click="getDataTable()"
                              class="cursor-pointer"
                              name="search"
                            />
                          </template>
                        </q-input>
                      </div>
                      <div
                        class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-5 cardMargin selectMobile2"
                        style="align-self: center; text-align: center"
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="F. Envio"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                          <template v-slot:append>
                            <q-icon
                              @click="getDataTable()"
                              class="cursor-pointer"
                              name="search"
                            />
                          </template>
                        </q-input>
                      </div>
                      <q-table
                        :rows="clientes"
                        dense
                        :columns="columnsClientes"
                        binary-state-sort
                        :virtual-scroll="null"
                        :separator="separator"
                        row-key="action"
                        :loading="loading"
                        class="my-sticky-header-column-table"
                        :filter="filter"
                        style="width: 100%; margin-top: 20px; height: 290px; margin-bottom: 15px;"
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
                              icon="save"
                              :disabled="this.disabledDelete"
                              @click="selected = props.row.id"
                              @click.capture="permisosDelete = true"
                            ></q-btn>
                            <q-btn
                              dense
                              round
                              flat
                              color="primary"
                              icon="edit"
                              @click="this.dialog = true"
                            ></q-btn>
                          </q-td>
                        </template>
                      </q-table>
                      <div
                        class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile2"
                        style="
                          align-self: center;
                          text-align: center;
                        "
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Cantidad:"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                        </q-input>
                      </div>
                      <div
                        class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6"
                        style="align-self: center; text-align: center"
                      >
                        <q-input
                          v-model="guia_desde"
                          rounded
                          dense
                          outlined
                          standout
                          label="Totales:"
                          @keyup.enter="getDataTable()"
                          mask="##########"
                        >
                        </q-input>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
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
            @click="
              this.$refs.methods.deleteData(
                `/cguias/${selected}`,
                'getDataTable'
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="pdfView" @show="this.printPending()">
      <div style="width: 100%; max-width: 80vw">
        <webViewer ref="webViewer" @close-pdf="closePdf"></webViewer>
      </div>
    </q-dialog>

    <methods
      ref="methods"
      @get-data="
        this.axiosConfig.headers.agencia = this.selectedAgencia.id;
        getData(`/clientes`, 'setDataClientes', 'clientes');
      "
      @reset-Loading="resetLoading"
      @set-Data-Clientes="setDataClientes"
      @set-Data-Edit="setDataEdit"
      @set-Data-Iniciar="setDataIniciar"
      @set-Data-Localidades="setDataLocalidades"
      @set-Data-Municipios="setDataMunicipios"
      @set-Data-Parroquias="setDataParroquias"
      @set-Data-Estados="setDataEstados"
      @set-Data-Ciudades="setDataCiudades"
      @set-Data-Paises="setDataPaises"
      @set-Data-Agentes="setDataAgentes"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: { methods: methodsVue },
  name: "Clientes",
  data() {
    return {
      columnsClientes: [
        {
          name: "action",
          label: "Guardar",
          field: "action",
          align: "center",
          required: true,
          sortable: true,
        },
        {
          name: "fecha_entrega_input",
          label: "Fecha Envio",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "check",
          label: "Transporte",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "nb_cliente",
          label: "Responsable Transporte",
          field: "nb_cliente",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "Nro. Fact. Flete",
          field: "rif_cedula",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "Monto Anticipo",
          field: "rif_cedula",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "Flete sin IVA/Viáticos (Bs.)",
          field: "rif_cedula",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "estatus_select",
          label: "Vehiculo",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "estatus_select",
          label: "Ayudante",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "estatus_select",
          label: "Origen",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "estatus_select",
          label: "Destino",
          align: "center",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "Venta sin IVA (Bs.)",
          field: "rif_cedula",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "Utilidad Operativa (Bs.)",
          field: "rif_cedula",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "% Costo",
          field: "rif_cedula",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "% Utilidad",
          field: "rif_cedula",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "observacion_input",
          label: "Observaciones",
          align: "center",
          sortable: true,
          required: true,
        },
      ],
      columnsConceptos: [
        {
          name: "id",
          label: "Codigo",
          field: "id",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nb_cliente",
          label: "Nombre",
          field: "nb_cliente",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "rif_cedula",
          label: "RIF",
          field: "rif_cedula",
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
          name: "cte_decontado",
          label: "Cliente Particular",
          field: "cte_decontado",
          align: "center",
          sortable: true,
        },
      ],
      formClientes: {
        nb_cliente: "",
        rif_cedula: "",
        nit: "",
        dir_correo: "",
        dir_fiscal: "",
        email: "",
        tlf_cliente: "",
        fax: "",
        razon_social: "",
        tipo_persona: "",
        modalidad_pago: "",
        persona_contacto: "",
        observacion: "",
        cte_decontado: "",
        tipo_persona_new: "",
        flag_activo: "",
        cod_agencia: [],
        cod_ciudad: [],
        cod_agente: [],
        cod_municipio: [],
        cod_parroquia: [],
        cod_localidad: [],
      },
      formEditClientes: {
        descripcion: "",
        nb_cliente: "",
        rif_cedula: "",
        nit: "",
        dir_correo: "",
        dir_fiscal: "",
        email: "",
        tlf_cliente: "",
        fax: "",
        razon_social: "",
        tipo_persona: "",
        modalidad_pago: "",
        persona_contacto: "",
        observacion: "",
        cte_decontado: "",
        tipo_persona_new: "",
        flag_activo: "",
        cod_agencia: [],
        cod_agente: [],
        cod_ciudad: [],
        cod_municipio: [],
        cod_parroquia: [],
        cod_localidad: [],
        id: "",
      },
      pais: "",
      estado: "",
      ciudad: "",
      location_input: "",
      agencias: [],
      clientes: [],
      estados: [],
      ciudades: [],
      municipios: [],
      parroquias: [],
      localidades: [],
      conceptos: [],
      agentes: [],
      selected: [],
      selectedAgencia: [],
      tipo_persona: [
        { label: "JURÍDICA", value: "J" },
        { label: "NATURAL", value: "N" },
      ],
      modalidad_pago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
      ],
      estatus: [
        { label: "ACTIVO", value: "1" },
        { label: "INACTIVO", value: "0" },
      ],
      print: [
        { label: "DETALLE", value: "1" },
        { label: "GENERAL", value: "0" },
        { label: "RESUMEN", value: "0" },
        { label: "DIARIO", value: "0" },
      ],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: `
          `,
          agencia: "",
          pais: "",
          estado: "",
          municipio: "",
        },
      },
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      control: 0,
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      tab: ref("mails"),
      pagination: ref({
        rowsPerPage: 8,
      }),
      paginationConceptos: ref({
        rowsPerPage: 4,
      }),
      separator: ref("cell"),
      form: ref(false),
      loading: ref(false),
      printOptions: ref(false),
      dialog: ref(false),
      clientesDelete: ref(false),
      conceptosBox: ref(false),
      filter: ref(""),
      clienteParticularExistente() {
        $q.notify({
          message: "Solo puede haber un Cliente Particular por Agencia",
          color: "red",
        });
      },
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Registro de Costos", "");
    this.$refs.methods.getData(
      "/clientes",
      "setDataIniciar",
      "clientes",
      this.axiosConfig
    );
  },
  methods: {
    closePdf() {
      this.pdfView = false;
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
    // Reglas
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasNotNull100(val) {
      if ((val !== null) !== "") {
        if (val.length < 3) {
          return "Deben ser minimo 3 caracteres";
        }
        if (val.length > 99) {
          return "Deben ser Maximo 100 caracteres";
        }
      }
    },
    reglasNotNull20(val) {
      if ((val !== null) !== "") {
        if (val.length < 3) {
          return "Deben ser minimo 3 caracteres";
        }
        if (val.length > 19) {
          return "Deben ser Maximo 19 caracteres";
        }
      }
    },
    reglasNotNull200(val) {
      if ((val !== null) !== "") {
        if (val.length < 3) {
          return "Deben ser minimo 3 caracteres";
        }
        if (val.length > 199) {
          return "Deben ser Maximo 200 caracteres";
        }
      }
    },
    reglasAllowNull20(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 19) {
            return "Deben ser Maximo 20 caracteres";
          }
        }
      }
    },
    reglasAllowNull100(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 99) {
            return "Deben ser Maximo 100 caracteres";
          }
        }
      }
    },
    reglasAllowNull65(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 64) {
            return "Deben ser Maximo 65 caracteres";
          }
        }
      }
    },
    desactivarCrudClientes(createItem, deleteItem, updateItem) {
      if (createItem == true) {
        this.disabledCreate = false;
      }
      if (deleteItem == true) {
        this.disabledDelete = false;
      }
      if (updateItem == true) {
        this.disabledEdit = false;
      }
    },

    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setDataIniciar(res, dataRes) {
      this[dataRes] = res.data;
      this.getDataIniciar();
      this.loading = false;
    },
    setDataClientes(res, dataRes) {
      this[dataRes] = res;
      for (var e = 0, len = this.clientes.length; e < len; e++) {
        if (this.clientes[e].cte_decontado === "1") {
          this.clientes[e].cte_decontado = "🏴";
        }
        if (this.clientes[e].cte_decontado === "0") {
          this.clientes[e].cte_decontado = "";
        }
        if (e == this.clientes.length - 1) break;
      }
      this.loading = false;
    },
    setDataEdit(res, dataRes) {
      this.resetFormEdit();
      this[dataRes].id = res.id;
      this[dataRes].descripcion = res.descripcion;
      this[dataRes].nb_cliente = res.nb_cliente;
      this[dataRes].rif_cedula = res.rif_cedula;
      this[dataRes].nit = res.nit;
      this[dataRes].dir_correo = res.dir_correo;
      this[dataRes].dir_fiscal = res.dir_fiscal;
      this[dataRes].tlf_cliente = res.tlf_cliente;
      this[dataRes].fax = res.fax;
      this[dataRes].razon_social = res.razon_social;
      this[dataRes].tipo_persona = res.tipo_desc;
      this[dataRes].modalidad_pago = res.modalidad_desc;
      this[dataRes].persona_contacto = res.persona_contacto;
      this[dataRes].cte_decontado = res.cte_decontado;
      this[dataRes].flag_activo = res.activo_desc;
      this[dataRes].cod_agencia = res.cod_agencia;
      this[dataRes].cod_ciudad = res.cod_ciudad;
      var cod_agente = res.cod_agente;
      var cod_parroquia = res.cod_parroquia;
      var cod_localidad = res.cod_localidad;
      api
        .get(`/municipios/${res.cod_municipio}`, this.axiosConfig)
        .then((res) => {
          this.formEditClientes.cod_municipio = res.data.desc_municipio;
          var cod_municipio = res.data.id;
          var cod_estado = res.data.cod_estado;
          var cod_ciudad = this[dataRes].cod_ciudad;

          this.axiosConfig.headers.estado = cod_estado;
          api.get(`/municipios`, this.axiosConfig).then((res) => {
            this.municipios = res.data;
          });

          this.axiosConfig.headers.municipio = cod_municipio;
          api.get(`/parroquias`, this.axiosConfig).then((res) => {
            this.parroquias = res.data;
          });

          api.get(`/localidades`, this.axiosConfig).then((res) => {
            this.localidades = res.data;
          });

          api.get(`/ciudades`, this.axiosConfig).then((res) => {
            this.ciudades = res.data;
          });

          api.get(`/ciudades/${cod_ciudad}`, this.axiosConfig).then((res) => {
            this.ciudad = res.data.desc_ciudad;
          });

          api.get(`/estados/${cod_estado}`, this.axiosConfig).then((res) => {
            this.estado = res.data.desc_estado;
            this.axiosConfig.headers.pais = res.data.cod_pais;
            api.get(`/estados`, this.axiosConfig).then((res) => {
              this.estados = res.data;
              this.pais = res.data[0].paises.desc_pais;
            });
          });

          api.get(`/agentes/${cod_agente}`, this.axiosConfig).then((res) => {
            this.formEditClientes.cod_agente = res.data.persona_responsable;
          });

          api
            .get(`/parroquias/${cod_parroquia}`, this.axiosConfig)
            .then((res) => {
              this.formEditClientes.cod_parroquia = res.data.desc_parroquia;
            });

          api
            .get(`/localidades/${cod_localidad}`, this.axiosConfig)
            .then((res) => {
              this.formEditClientes.cod_localidad = res.data.desc_localidad;
            });
        });
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/clientes/${idpost}`,
        "getData",
        this.axiosConfig
      );
      this.loading = true;
    },
    createDataClientes() {
      this.formClientes.cod_agencia = this.selectedAgencia.id;
      this.formClientes.cod_agente = this.formClientes.cod_agente.id;
      this.formClientes.cod_localidad = this.formClientes.cod_localidad.id;
      this.formClientes.cod_municipio = this.formClientes.cod_municipio.id;
      this.formClientes.cod_parroquia = this.formClientes.cod_parroquia.id;
      this.formClientes.cod_ciudad = this.ciudad.id;
      this.formClientes.modalidad_pago = this.formClientes.modalidad_pago.value;
      this.formClientes.flag_activo = this.formClientes.flag_activo.value;
      if (this.formClientes.cte_decontado === "1") {
        for (var e = 0, len = this.clientes.length; e < len; e++) {
          if (this.clientes[e].cte_decontado === "🏴") {
            this.clienteParticularExistente();
            this.form = false;
            this.resetForm();
            return;
          }
          if (e == this.clientes.length - 1) break;
        }
      }
      this.formClientes.tipo_persona = this.formClientes.tipo_persona.value;
      this.$refs.methods.createData(
        `/clientes`,
        this.formClientes,
        "getData",
        this.axiosConfig
      );
      this.form = false;
      this.loading = true;
    },
    putDataClientes() {
      this.formEditClientes.cod_agencia = this.selectedAgencia.id;
      this.formEditClientes.cod_agente = this.formEditClientes.cod_agente.id;
      this.formEditClientes.cod_localidad =
        this.formEditClientes.cod_localidad.id;
      this.formEditClientes.cod_municipio =
        this.formEditClientes.cod_municipio.id;
      this.formEditClientes.cod_parroquia =
        this.formEditClientes.cod_parroquia.id;
      this.formEditClientes.cod_ciudad = this.ciudad.id;
      this.formEditClientes.modalidad_pago =
        this.formEditClientes.modalidad_pago.value;
      this.formEditClientes.flag_activo =
        this.formEditClientes.flag_activo.value;
      if (this.formEditClientes.cte_decontado === "1") {
        for (var e = 0, len = this.clientes.length; e < len; e++) {
          if (this.clientes[e].cte_decontado === "🏴") {
            if (this.formEditClientes.id !== this.clientes[e].id) {
              this.clienteParticularExistente();
              this.formEdit = false;
              this.resetFormEdit();
              return;
            }
          }
          if (e == this.clientes.length - 1) break;
        }
      }
      this.formEditClientes.tipo_persona =
        this.formEditClientes.tipo_persona.value;
      this.$refs.methods.putData(
        `/clientes/${this.formEditClientes.id}`,
        this.formEditClientes,
        "getData",
        this.axiosConfig
      );
      this.formEdit = false;
      this.loading = true;
    },
    resetFormEdit() {
      (this.formEditClientes.nb_cliente = ""),
        (this.formEditClientes.rif_cedula = ""),
        (this.formEditClientes.nit = ""),
        (this.formEditClientes.dir_correo = ""),
        (this.formEditClientes.dir_fiscal = ""),
        (this.formEditClientes.email = ""),
        (this.formEditClientes.tlf_cliente = ""),
        (this.formEditClientes.fax = ""),
        (this.formEditClientes.razon_social = ""),
        (this.formEditClientes.tipo_persona = ""),
        (this.formEditClientes.modalidad_pago = ""),
        (this.formEditClientes.persona_contacto = ""),
        (this.formEditClientes.observacion = ""),
        (this.formEditClientes.cte_decontado = ""),
        (this.formEditClientes.tipo_persona_new = ""),
        (this.formEditClientes.flag_activo = ""),
        (this.formEditClientes.cod_agencia = ""),
        (this.formEditClientes.cod_agente = ""),
        (this.formEditClientes.cod_municipio = ""),
        (this.formEditClientes.cod_parroquia = ""),
        (this.formEditClientes.cod_localidad = ""),
        (this.pais = ""),
        (this.estado = ""),
        (this.ciudad = "");
    },
    resetForm() {
      (this.formClientes.nb_cliente = ""),
        (this.formClientes.rif_cedula = ""),
        (this.formClientes.nit = ""),
        (this.formClientes.dir_correo = ""),
        (this.formClientes.dir_fiscal = ""),
        (this.formClientes.email = ""),
        (this.formClientes.tlf_cliente = ""),
        (this.formClientes.fax = ""),
        (this.formClientes.razon_social = ""),
        (this.formClientes.tipo_persona = ""),
        (this.formClientes.modalidad_pago = ""),
        (this.formClientes.persona_contacto = ""),
        (this.formClientes.observacion = ""),
        (this.formClientes.cte_decontado = ""),
        (this.formClientes.tipo_persona_new = ""),
        (this.formClientes.flag_activo = ""),
        (this.formClientes.cod_agencia = ""),
        (this.formClientes.cod_agente = ""),
        (this.formClientes.cod_municipio = ""),
        (this.formClientes.cod_parroquia = ""),
        (this.formClientes.cod_localidad = ""),
        (this.formClientes.cte_decontado = "0"),
        (this.pais = ""),
        (this.estado = ""),
        (this.ciudad = "");
    },
    // Metodos para colocar valores iniciales
    getDataIniciar() {
      this.agenciaRef = this.agencias[0].id;
      this.selectedAgencia = this.agencias[0];
      this.$refs.methods.getData(
        `/paises`,
        `setDataPaises`,
        `paises`,
        this.axiosConfig
      );
      this.axiosConfig.headers.agencia = this.agenciaRef;
      this.$refs.methods.getData(
        `/clientes`,
        "setDataClientes",
        `clientes`,
        this.axiosConfig
      );
      this.$refs.methods.getData(
        `/agentes`,
        `setDataAgentes`,
        `agentes`,
        this.axiosConfig
      );
    },

    getDataLocalidades(sub_location, update) {
      this.$refs.methods.getData(
        `/${sub_location}`,
        `${update}`,
        `${sub_location}`,
        this.axiosConfig
      );
    },
    setDataAgentes(res, dataRes) {
      this[dataRes] = res;
    },
    setDataPaises(res, dataRes) {
      this[dataRes] = res;
    },
    setDataCiudades(res, dataRes) {
      this[dataRes] = res;
      this.ciudad = "";
      this.formEditClientes.cod_localidad = "";
      this.formClientes.cod_localidad = "";
    },
    setDataEstados(res, dataRes) {
      this[dataRes] = res;
      this.estado = "";
      this.ciudad = "";
      this.localidades = [];
      this.municipios = [];
      this.parroquias = [];
      this.ciudades = [];
      this.formEditClientes.cod_localidad = "";
      this.formEditClientes.cod_municipio = "";
      this.formEditClientes.cod_parroquia = "";
      this.formClientes.cod_localidad = "";
      this.formClientes.cod_municipio = "";
      this.formClientes.cod_parroquia = "";
    },
    setDataMunicipios(res, dataRes) {
      this[dataRes] = res;
      this.formEditClientes.cod_parroquia = "";
      this.formEditClientes.cod_municipio = "";
      this.formClientes.cod_parroquia = "";
      this.formClientes.cod_municipio = "";
    },
    setDataParroquias(res, dataRes) {
      this[dataRes] = res;
      this.formEditClientes.cod_parroquia = "";
      this.formClientes.cod_parroquia = "";
    },
    setDataLocalidades(res, dataRes) {
      this[dataRes] = res;
    },
  },
};
</script>

<style lang="sass">
.my-sticky-header-column-table

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #fff !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>

<style>
.hide {
  display: none;
}

@media screen and (min-width: 1024px) {
  .Cards {
    width: 45% !important; padding-left: 20px !important
  }
}

@media screen and (min-width: 1024px) {
  .Cards2 {
    width: 46% !important; padding-right: 20px !important
  }
}

@media screen and (min-width: 1024px) {
  .buttonsMobile {
    display: none;
  }
}

@media screen and (max-width: 1024px) {
  .buttonsPC {
    display: none;
  }
}

@media screen and (min-width: 1024px) {
  .buttonsCard {
    margin-top: 25px;
  }
}

@media screen and (max-width: 1024px) {
  .buttonsMenu {
    margin-top: 25px; margin-bottom: 25px
  }
}

@media screen and (min-width: 600px) and (max-width: 1024px) {
  .titleMenu {
    padding-bottom: 1px;
  }
}

@media screen and (min-width: 1024px) {
  .buttonsDiv {
    padding-left: 50px;
  }
}

@media screen and (max-width: 600px) {
  .titleMenu {
    margin-top: 15px;
  }
}

@media screen and (max-width: 1024px) {
  .titleCard {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media screen and (min-width: 600px) {
  .SelectClienteAgencia {
    padding-right: 10px;
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

@media screen and (min-width: 1024px) {
  .cardMargin {
    padding-right: 20px !important;
  }
}

.selectMobile {
  margin-bottom: 15px !important;
}

@media screen and (min-width: 600px) and (max-width: 600px) {
  .marginSelect {
    padding-right: 15px;
  }
}
</style>
