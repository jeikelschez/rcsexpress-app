<template>
  <q-page class="pagina q-pa-md">
    <q-dialog
      v-model="dialog"
      style="max-width: 100vw"
      class="row justify-center items-center"
    >
      <q-card style="max-width: 100vw">
        <div class="row justify-center items-center" style="padding: 10px">
          <div class="col-md-6 col-xs-12 boxStyle Cards2">
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
                      <strong>Lista de Agencias</strong>
                    </h4>
                  </div>
                  <div
                    class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
                    style="
                      width: 100%;
                      margin-top: 20px;
                      height: 350px;
                      margin-bottom: 15px;
                    "
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
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div
            class="row col-md-1 col-xs-12 buttonsPC"
            style="text-align: center"
          >
            <div class="col-md-12 col-xs-3">
              <q-btn padding="md" color="primary" round icon="chevron_right" />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn padding="md" color="primary" round icon="chevron_left" />
            </div>

            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="close"
                @click="this.dialog = false"
              />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="keyboard_double_arrow_right"
              />
            </div>

            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="keyboard_double_arrow_left"
              />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn padding="md" round color="primary" icon="check" />
            </div>
          </div>
          <div
            class="row col-md-1 col-xs-12 buttonsMenu buttonsMobile"
            style="text-align: center"
          >
            <div class="col-md-12 col-xs-3">
              <q-btn padding="md" color="primary" round icon="expand_less" />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn padding="md" color="primary" round icon="expand_more" />
            </div>
            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="keyboard_double_arrow_up"
              />
            </div>

            <div class="col-md-12 col-xs-3 buttonsCard">
              <q-btn
                padding="md"
                color="primary"
                round
                icon="keyboard_double_arrow_down"
              />
            </div>
            <div
              class="col-md-12 col-xs-6 buttonsCard"
              style="margin-top: 20px"
            >
              <q-btn
                padding="md"
                color="primary"
                round
                icon="close"
                @click="this.dialog = false"
              />
            </div>
            <div
              class="col-md-12 col-xs-6 buttonsCard"
              style="margin-top: 20px"
            >
              <q-btn padding="md" round color="primary" icon="check" />
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
                      <strong>Agencias Seleccionadas</strong>
                    </h4>
                  </div>
                  <div
                    class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 cardMargin selectMobile2"
                    style="align-self: center; text-align: center"
                  >
                    <q-input
                      v-model="guia_desde"
                      rounded
                      dense
                      outlined
                      standout
                      label="Buscar:"
                      @keyup.enter="getDataTable()"
                      mask="##########"
                    >
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
                    style="
                      width: 100%;
                      margin-top: 20px;
                      height: 350px;
                      margin-bottom: 15px;
                    "
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
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <div
      class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
    >
      <div class="col-md-6 col-xs-12 q-pa-sm justify-center">
        <div
          class="row justify-end col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        >
          <div
            class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
            style="align-self: left; text-align: center"
          >
            <div
              class="row align-center justify-center"
              style="margin-bottom: 10px"
            >
              <p
                style="font-size: 25px; text-align: left; margin-bottom: 10px" v-if="this.operativa == true"
                class="text-secondary col-md-10 col-xl-10 col-lg-10 col-xs-12 col-sm-12"
              >
                <strong>RELACIÓN DE DESPACHO POR AGENCIA</strong>
              </p>
              <p
                style="font-size: 25px; text-align: left; margin-bottom: 10px" v-else
                class="text-secondary col-md-10 col-xl-10 col-lg-10 col-xs-12 col-sm-12"
              >
                <strong>RELACIÓN DE DESPACHO POR AGENCIA PARA COSTOS</strong>
              </p>
              <div
                class="col-md-1 col-xl-1 col-lg-1 col-xs-6 col-sm-6"
                style="
                  padding-right: 10px;
                  align-self: center;
                  margin-bottom: 10px;
                "
              >
                <q-btn
                  dense
                  color="primary"
                  padding="sm"
                  @click="this.dialog = true"
                >
                  <q-icon size="25px" name="filter_alt_off" color="white">
                  </q-icon>
                  <q-tooltip
                    class="bg-primary"
                    style="max-height: 30px"
                    transition-show="scale"
                    transition-hide="scale"
                    color="primary"
                    >Limpiar Filtros</q-tooltip
                  >
                </q-btn>
              </div>
              <div
                class="col-md-1 col-xl-1 col-lg-1 col-xs-6 col-sm-6"
                style="align-self: center; margin-bottom: 10px"
              >
                <q-btn
                  dense
                  color="primary"
                  padding="sm"
                  @click="this.resetFilters()"
                >
                  <q-icon size="25px" name="print" color="white"> </q-icon>
                  <q-tooltip
                    class="bg-primary"
                    style="max-height: 30px"
                    transition-show="scale"
                    transition-hide="scale"
                    color="primary"
                    >Limpiar Filtros</q-tooltip
                  >
                </q-btn>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 selectMobile2"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-btn-toggle
                  v-model="selectedPage"
                  spread
                  class="my-custom-toggle"
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="black"
                  :options="pageOptions"
                  @update:model-value="changeReport()"
                >
                </q-btn-toggle>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-12 col-xs-12"
                style="align-self: center; text-align: left"
              >
                <h4
                  style="
                    font-size: 18px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    padding-left: 5px;
                  "
                  class="text-secondary"
                >
                  <strong>AGENCIA</strong>
                </h4>
              </div>
              <div
                class="col-md-12 col-xs-12 selectMobile"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-select
                  rounded
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="reportType"
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
                  option-label="nb_cliente"
                  option-value="id"
                  :disable="disableAgencia"
                  v-model="selectedCliente"
                  outlined
                  standout
                  label="Origen"
                  @update:model-value="getDataTable()"
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
                  <template v-slot:clientesLoading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                </q-select>
              </div>
              <div
                class="col-md-12 col-xs-12"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-select
                  rounded
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="reportType"
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
                  option-label="nb_cliente"
                  option-value="id"
                  :disable="disableAgencia"
                  v-model="selectedCliente"
                  outlined
                  standout
                  label="Destino"
                  @update:model-value="getDataTable()"
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
                  <template v-slot:clientesLoading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-12 col-xs-12"
                style="align-self: center; text-align: left"
              >
                <h4
                  style="
                    font-size: 18px;
                    margin-top: 5px;
                    margin-bottom: 10px;
                    padding-left: 5px;
                  "
                  class="text-secondary"
                >
                  <strong>CLIENTE</strong>
                </h4>
              </div>
              <div
                class="col-md-12 col-xs-12 selectMobile"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-select
                  rounded
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="reportType"
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
                  option-label="nb_cliente"
                  option-value="id"
                  :disable="disableAgencia"
                  v-model="selectedCliente"
                  outlined
                  standout
                  label="Cliente"
                  @update:model-value="getDataTable()"
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
                  <template v-slot:clientesLoading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row" style="margin-bottom: 10px">
              <div
                class="col-md-12 col-xs-12"
                style="align-self: center; text-align: left"
              >
                <h4
                  style="
                    font-size: 18px;
                    margin-top: 10px;
                    margin-bottom: 10px;
                    padding-left: 5px;
                  "
                  class="text-secondary"
                >
                  <strong>DATOS DEL CONDUCTOR</strong>
                </h4>
              </div>
              <div
                class="col-md-6 col-xs-12 selectMobile cardMargin"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-select
                  rounded
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="reportType"
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
                  option-label="nb_cliente"
                  option-value="id"
                  :disable="disableAgencia"
                  v-model="selectedCliente"
                  outlined
                  standout
                  label="Chofer"
                  @update:model-value="getDataTable()"
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
                  <template v-slot:clientesLoading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                </q-select>
              </div>
              <div
                class="col-md-6 col-xs-12 selectMobile"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-select
                  rounded
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="reportType"
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
                  option-label="nb_cliente"
                  option-value="id"
                  :disable="disableAgencia"
                  v-model="selectedCliente"
                  outlined
                  standout
                  label="Vehículo"
                  @update:model-value="getDataTable()"
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
                  <template v-slot:clientesLoading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                </q-select>
              </div>
              <div
                class="col-md-6 col-xs-12 selectMobile cardMargin"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-select
                  rounded
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="reportType"
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
                  option-label="nb_cliente"
                  option-value="id"
                  :disable="disableAgencia"
                  v-model="selectedCliente"
                  outlined
                  standout
                  label="Ayudante"
                  @update:model-value="getDataTable()"
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
                  <template v-slot:clientesLoading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                </q-select>
              </div>
              <div
                class="col-md-6 col-xs-12 selectMobile"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-select
                  rounded
                  dense
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="reportType"
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
                  option-label="nb_cliente"
                  option-value="id"
                  :disable="disableAgencia"
                  v-model="selectedCliente"
                  outlined
                  standout
                  label="Receptor"
                  @update:model-value="getDataTable()"
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
                  <template v-slot:clientesLoading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                </q-select>
              </div>
            </div>
            <div class="row" style="margin-bottom: 10px">
              <div
                class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12"
                style="align-self: center; text-align: center"
              >
                <p
                  style="font-size: 25px; margin-top: 0px; margin-bottom: 15px"
                  class="text-secondary"
                >
                  <strong>Fechas</strong>
                </p>
              </div>
              <div
                class="col-md-4 col-xs-12 cardMargin selectMobile2"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-input
                  outlined
                  label="Fecha Desde:"
                  hint=""
                  rounded
                  style="padding-bottom: 0px"
                  :disable="disabledesde"
                  lazy-rules
                  dense
                  mask="##/##/####"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date mask="DD/MM/YYYY"></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div
                class="col-md-4 col-xs-12 selectMobile2"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-input
                  outlined
                  label="Fecha Hasta:"
                  hint=""
                  rounded
                  :disable="disablehasta"
                  lazy-rules
                  dense
                  style="padding-bottom: 0px"
                  mask="##/##/####"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date mask="DD/MM/YYYY"></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 selectMobile2"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-btn-toggle
                  v-model="selectedReport"
                  spread
                  class="my-custom-toggle"
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="black"
                  :options="reportes"
                  @update:model-value="getDataClientes()"
                >
                </q-btn-toggle>
              </div>
            </div>
            <div class="row">
              <div
                class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 selectMobile2"
                style="
                  align-self: center;
                  text-align: center;
                  margin-bottom: 15px;
                "
              >
                <q-btn-toggle
                  v-model="selectedVenta"
                  spread
                  class="my-custom-toggle"
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="black"
                  :options="ventas"
                  @update:model-value="getDataClientes()"
                >
                </q-btn-toggle>
              </div>
              <div
              class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 selectMobile2"
              style="
                align-self: center;
                text-align: center;
                margin-bottom: 15px;
              "
            >
              <q-btn-toggle
                v-if="this.operativa == false"
                v-model="selectedCosto"
                spread
                class="my-custom-toggle"
                rounded
                unelevated
                toggle-color="primary"
                color="white"
                text-color="black"
                :options="costos"
                @update:model-value="getDataClientes()"
              >
              </q-btn-toggle>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="q-pa-md col-md-6 col-xs-12 q-gutter-y-md justify-center table"
        style="margin-bottom: 20px"
      >
        <webViewer ref="webViewer" @close-pdf="closePdf"></webViewer>
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

    <methods ref="methods"></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import rulesVue from "src/components/rules.vue";
import moment from "moment";
import { api } from "boot/axios";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import webViewerVue from "src/components/webViewer.vue";

export default {
  components: {
    methods: methodsVue,
    webViewer: webViewerVue,
    rulesVue,
  },
  data() {
    return {
      ventas: [
        { label: "VISIBLE", value: "C" },
        { label: "NO VISIBLE", value: "A" },
      ],
      reportes: [
        { label: "GENERAL POR AGENCIA", value: "C" },
        { label: "AGRUPADO POR ZONA", value: "S" },
        { label: "MULTIPLES AGENCIA DESTINO", value: "A" },
      ],
      costos: [
        { label: "CARGA NETA NO VISIBLE", value: "C" },
        { label: "CARGA NETA VISIBLE", value: "S" },
      ],
      pageOptions: [
        { label: "OPERATIVA", value: "O" },
        { label: "COSTOS", value: "C" },
      ],
      selectedTipo: "C",
      selectedPage: "O",
      selectedReport: "C",
      selectedVenta: "A",
      selectedCosto: "S",
      operativa: true,
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      tab: ref("mails"),
      dateInit: moment().format("DD/MM/YYYY"),
      loading: ref(false),
      separator: ref("vertical"),
      deletePopup: ref(false),
      dialog: ref(false),
      pdfView: ref(false),
    };
  },
  mounted() {
    this.printPending();
  },
  methods: {
    closePdf() {
      this.pdfView = false;
    },
    printPending() {
      this.$refs.webViewer.showpdf();
    },
    changeReport() {
      this.operativa = !this.operativa
    }
  },
};
</script>

<style>
.q-field__bottom {
  display: none;
}

@media screen and (min-width: 1024px) {
  .Cards {
    width: 45% !important;
    padding-left: 20px !important;
  }
}

@media screen and (min-width: 1024px) {
  .Cards2 {
    width: 46% !important;
    padding-right: 20px !important;
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
    margin-top: 25px;
    margin-bottom: 25px;
  }
}

@media screen and (min-width: 1080px) {
  .table {
    width: 50%;
    height: 850px;
    margin-top: -30px;
  }
}

@media screen and (max-width: 1080px) {
  .table {
    height: 500px !important;
  }
}
</style>
