<template>
  <q-page class="pagina q-pa-md">
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
              <q-btn label="Imprimir" color="primary" style="width: 300px" @click="pdfView = true"/>
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
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
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
            option-label="nb_agencia"
            option-value="id"
            v-model="selectedAgencia"
            outlined
            standout
            label="Agencia Origen"
            @update:model-value="
              this.agentes = [];
              this.$refs.methods.getData(`/agentes`, 'setData', 'agentes', {
                headers: {
                  Authorization: ``,
                  agencia: this.selectedAgencia.id,
                },
              });
              getDataTable();
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
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Fecha Desde"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_desde"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
            @keyup.enter="getDataTable()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_desde"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                    @update:model-value="
                      this.$refs.qDateProxy.hide();
                      getDataTable();
                    "
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
            label="Fecha Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_hasta"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
            @keyup.enter="getDataTable()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_hasta"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                    @update:model-value="
                      this.$refs.qDateProxy.hide();
                      getDataTable();
                    "
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
            @click="agregarCosto()"
          >
            <q-icon size="25px" name="add" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Agregar Costos</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
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
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="printOptions = true"
          >
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
          inline-label
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
        >
          <q-tab
            name="tabCostos"
            label="Datos del Costo de Transporte"
            icon="folder"
          />
          <q-tab
            name="tabDetalles"
            label="Detalle de Guias Transportadas"
            icon="folder_copy"
          />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="tabCostos">
            <q-table
              :rows="costos"
              :columns="columns"
              binary-state-sort
              :separator="separator"
              row-key="id"
              :loading="loading"
              selection="single"
              :rows-per-page-options="[0]"
              style="width: 100%; height: 450px"
              :grid="$q.screen.xs"
              hide-bottom
              :visible-columns="visibleColumns"
              v-model:selected="selected"
              v-model:pagination="pagination"
            >
              <template v-slot:loading>
                <q-inner-loading showing color="primary" class="loading" />
              </template>
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th auto-width></q-th>
                  <q-th
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    {{ col.label }}
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body="props" style="margin-bottom: 20px">
                <q-tr :props="props">
                  <q-td>
                    <q-checkbox v-model="props.selected" />
                  </q-td>
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <div v-if="col.name == 'fecha_envio'">
                      <q-input
                        dense
                        outlined
                        v-model="props.row.fecha_envio"
                        lazy-rules
                        :rules="[
                          (val) => this.$refs.rulesVue.isReq(val),
                          (val) => this.$refs.rulesVue.checkDate(val),
                        ]"
                        mask="##/##/####"
                        style="
                          padding-top: 5px;
                          margin-bottom: -15px;
                          min-width: 150px;
                        "
                      >
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy
                              ref="qDateProxy"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              <q-date
                                v-model="props.row.fecha_envio"
                                mask="DD/MM/YYYY"
                                @update:model-value="
                                  this.$refs.qDateProxy[0].hide()
                                "
                              ></q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div v-else-if="col.name == 'tipo_transporte'">
                      <q-btn-toggle
                        v-model="props.row.tipo_transporte"
                        spread
                        class="my-custom-toggle"
                        rounded
                        unelevated
                        toggle-color="primary"
                        color="white"
                        text-color="black"
                        :options="tipo"
                      >
                      </q-btn-toggle>
                    </div>
                    <div v-else-if="col.name == 'cod_agente'">
                      <q-select
                        v-if="props.row.tipo_transporte == 'I'"
                        dense
                        outlined
                        fill-input
                        input-debounce="0"
                        :options="agentes"
                        option-label="persona_responsable"
                        option-value="id"
                        v-model="props.row.cod_agente"
                      >
                        <template v-slot:selected-item="scope">
                          {{
                            props.row.cod_agente.id
                              ? props.row.cod_agente.persona_responsable
                              : this.findIndex(
                                  "agentes",
                                  props.row.cod_agente,
                                  "persona_responsable"
                                )
                          }}
                        </template>
                      </q-select>
                      <q-select
                        v-else
                        dense
                        outlined
                        fill-input
                        input-debounce="0"
                        :options="proveedores"
                        option-label="nb_proveedor"
                        option-value="id"
                        v-model="props.row.cod_proveedor"
                      >
                        <template v-slot:selected-item="scope">
                          {{
                            props.row.cod_proveedor.id
                              ? props.row.cod_proveedor.nb_proveedor
                              : this.findIndex(
                                  "proveedores",
                                  props.row.cod_proveedor,
                                  "nb_proveedor"
                                )
                          }}
                        </template>
                      </q-select>
                    </div>
                    <div v-else-if="col.name == 'cod_transporte'">
                      <q-select
                        dense
                        outlined
                        fill-input
                        input-debounce="0"
                        :options="unidades"
                        option-label="descripcion"
                        option-value="id"
                        v-model="props.row.cod_transporte"
                      >
                        <template v-slot:selected-item="scope">
                          {{
                            props.row.cod_transporte.id
                              ? props.row.cod_transporte.descripcion
                              : this.findIndex(
                                  "unidades",
                                  props.row.cod_transporte,
                                  "descripcion"
                                )
                          }}
                        </template>
                      </q-select>
                    </div>
                    <div v-else-if="col.name == 'cod_ayudante'">
                      <q-select
                        dense
                        outlined
                        fill-input
                        input-debounce="0"
                        :options="ayudantes"
                        option-label="nb_ayudante"
                        option-value="id"
                        style="min-width: 150px"
                        v-model="props.row.cod_ayudante"
                      >
                        <template v-slot:selected-item="scope">
                          {{
                            props.row.cod_ayudante.id
                              ? props.row.cod_ayudante.nb_ayudante
                              : this.findIndex(
                                  "ayudantes",
                                  props.row.cod_ayudante,
                                  "nb_ayudante"
                                )
                          }}
                        </template>
                      </q-select>
                    </div>
                    <div v-else-if="col.name == 'cod_agencia'">
                      <q-select
                        dense
                        outlined
                        fill-input
                        input-debounce="0"
                        :options="agencias"
                        option-label="nb_agencia"
                        option-value="id"
                        style="min-width: 150px"
                        v-model="props.row.cod_agencia"
                      >
                        <template v-slot:selected-item="scope">
                          {{
                            props.row.cod_agencia.id
                              ? props.row.cod_agencia.nb_agencia
                              : this.findIndex(
                                  "agencias",
                                  props.row.cod_agencia,
                                  "nb_agencia"
                                )
                          }}
                        </template>
                      </q-select>
                    </div>
                    <div v-else-if="col.name == 'destino'">
                      <q-input
                        dense
                        outlined
                        v-model="props.row.destino"
                        style="min-width: 250px"
                      >
                      </q-input>
                    </div>
                    <div v-else-if="col.name == 'monto_anticipo'">
                      <q-input
                        dense
                        outlined
                        v-model="props.row.monto_anticipo"
                        v-money="money"
                        input-class="text-right"
                        style="
                          padding-top: 5px;
                          margin-bottom: -15px;
                          min-width: 100px;
                        "
                        :rules="[(val) => this.$refs.rulesVue.isMax(val, 14)]"
                      >
                      </q-input>
                    </div>
                    <div v-else-if="col.name == 'monto_guias'">
                      <q-input
                        dense
                        outlined
                        v-model="props.row.monto_guias"
                        v-money="money"
                        input-class="text-right"
                        style="min-width: 100px"
                      >
                      </q-input>
                    </div>
                    <div v-else-if="col.name == 'monto_costo'">
                      <q-input
                        dense
                        outlined
                        v-model="props.row.monto_costo"
                        v-money="money"
                        input-class="text-right"
                        style="min-width: 100px"
                      >
                      </q-input>
                    </div>
                    <div v-else>
                      {{ col.value }}
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
            <div class="col-md-6 col-xs-12">
              <q-card
                class="q-pa-md col-md-12 col-xs-12"
                bordered
                style="padding: 5px; margin-top: 10px"
              >
                <q-card-section style="padding: 5px; margin-bottom: -22px">
                  <div class="row">
                    <div class="col-md-1 col-xs-12">
                      <q-input
                        outlined
                        v-model="this.cantidad"
                        label="Cantidad"
                        hint=""
                        dense
                        :disable="true"
                        input-class="text-right"
                        class="pcform"
                      >
                      </q-input>
                    </div>
                    <div class="col-md-3 col-xs-12">
                      <q-input
                        outlined
                        v-model="total_costo"
                        label="Costo"
                        class="pcform"
                        dense
                        v-money="money"
                        :disable="true"
                        input-class="text-right"
                      >
                      </q-input>
                    </div>
                    <div class="col-md-2 col-xs-12">
                      <q-input
                        outlined
                        v-model="total_guias"
                        label="Venta"
                        input-class="text-right"
                        :disable="true"
                        dense
                        v-money="money"
                        class="pcform"
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
                        dense
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
                        :disable="true"
                        dense
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
                        :disable="true"
                        dense
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
          <q-tab-panel name="tabDetalles">
            <div class="row justify-center items-center">
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
                          <strong
                            >Busqueda de Guias a Enviar a su Destino</strong
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
                        :rows="costos"
                        dense
                        :columns="columns2"
                        binary-state-sort
                        :virtual-scroll="null"
                        :separator="separator"
                        row-key="action"
                        :loading="loading"
                        class="my-sticky-header-column-table"
                        style="
                          width: 100%;
                          margin-top: 20px;
                          height: 290px;
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
                      <div
                        class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile2"
                        style="align-self: center; text-align: center"
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
                <div class="col-md-12 col-xs-3">
                  <q-btn
                    padding="md"
                    color="primary"
                    round
                    icon="chevron_right"
                  />
                </div>
                <div class="col-md-12 col-xs-3 buttonsCard">
                  <q-btn
                    padding="md"
                    color="primary"
                    round
                    icon="chevron_left"
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
              </div>
              <div
                class="row col-md-1 col-xs-12 buttonsMenu buttonsMobile"
                style="text-align: center"
              >
                <div class="col-md-12 col-xs-3">
                  <q-btn
                    padding="md"
                    color="primary"
                    round
                    icon="expand_less"
                  />
                </div>
                <div class="col-md-12 col-xs-3 buttonsCard">
                  <q-btn
                    padding="md"
                    color="primary"
                    round
                    icon="expand_more"
                  />
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
                        :rows="detalleCostos"
                        dense
                        :columns="columns2"
                        binary-state-sort
                        :virtual-scroll="null"
                        :separator="separator"
                        row-key="action"
                        :loading="loading"
                        class="my-sticky-header-column-table"
                        style="
                          width: 100%;
                          margin-top: 20px;
                          height: 290px;
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
                      <div
                        class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin selectMobile2"
                        style="align-self: center; text-align: center"
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

    <q-dialog v-model="pdfView" @show="this.pdfPrint()">
      <div style="width: 700px; height: 700px">
        <webViewer
          ref="webViewer"
          @close-pdf="this.pdfView = false"
        ></webViewer>
      </div>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Init="setDataInit"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { VMoney } from "v-money";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import rulesVue from "src/components/rules.vue";
import { api } from "boot/axios";
import webViewerVue from "src/components/webViewer.vue";

export default {
  directives: { money: VMoney },
  components: { methods: methodsVue, rulesVue, VMoney, webViewer: webViewerVue},
  data() {
    return {
      columns: [
        {
          name: "fecha_envio",
          label: "Fecha Envio",
          field: "fecha_envio",
          align: "center",
          required: true,
        },
        {
          name: "tipo_transporte",
          label: "Tipo",
          field: "tipo_transporte",
          align: "center",
          required: true,
        },
        {
          name: "cod_agente",
          label: "Transporte",
          field: "cod_agente",
          align: "center",
          required: true,
        },
        {
          name: "cod_proveedor",
          label: "Transporte",
          field: "cod_proveedor",
          align: "center",
        },
        {
          name: "cod_transporte",
          label: "Vehiculo",
          field: "cod_transporte",
          align: "center",
          required: true,
        },
        {
          name: "cod_ayudante",
          label: "Ayudante",
          field: "cod_ayudante",
          align: "center",
          required: true,
        },
        {
          name: "cod_agencia",
          label: "Origen",
          field: "cod_agencia",
          align: "center",
          required: true,
        },
        {
          name: "destino",
          label: "Destino",
          field: "destino",
          align: "center",
          required: true,
        },
        {
          name: "monto_anticipo",
          label: "Anticipo",
          field: "monto_anticipo",
          align: "center",
          required: true,
        },
        {
          name: "monto_guias",
          label: "Venta Sin IVA",
          align: "center",
          required: true,
        },
        {
          name: "monto_costo",
          label: "Monto Costo",
          align: "center",
          required: true,
        },
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: true,
      },
      tipo: [
        { label: "I", value: "I" },
        { label: "E", value: "E" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0,
        rowsNumber: "",
        sortBy: "fecha_envio",
        descending: false,
      },
      visibleColumns: [],
      guia_desde: "",
      selected: [],
      agencias: [],
      agentes: [],
      unidades: [],
      ayudantes: [],
      proveedores: [],
      costos: [],
      detalleCostos: [],
      printOptions: false,
      agenciasSelected: [],
      selectedAgencia: [],
      cantidad: 0,
      total_costo: 0,
      total_guias: 0,
      fecha_desde: moment().format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      tab: ref("tabCostos"),
      separator: ref("vertical"),
      form: ref(false),
      loading: ref(false),
      pdfView: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Registro de Costos", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/agentes", "setData", "agentes", {
      headers: {
        agencia: 1,
        activo: "S",
      },
    });
    this.$refs.methods.getData("/unidades", "setData", "unidades");
    this.$refs.methods.getData("/ayudantes", "setData", "ayudantes");
    this.$refs.methods.getData("/proveedores", "setData", "proveedores", {
      headers: {
        tipo_servicio: "TP",
        activo: "S",
      },
    });

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "registrocostos",
      },
    });
  },
  methods: {
    // Metodo para filtrar opciones de Selects
    filterArray(val, update, pagina, array, element) {
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
    // Metodo para traer el value de los Selects y Columns
    findIndex(array, value, field) {
      var find = this[array].findIndex((item) => item.id == value);
      return find >= 0 ? this[array][find][field] : null;
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos Iniciales
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Setear Datos Generales
    async setDataInit(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.selectedAgencia = this.agencias[0];
      this.getDataTable();
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/costos`, "setDataTable", "costos", {
        headers: {
          agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
          desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
          hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
          order_by: this.pagination.sortBy,
          order_direction: this.pagination.descending ? "DESC" : "ASC",
        },
      });
    },
    // Metodo para Setear Datos de Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
      this.selected[0] = this.costos[0];
      this.calculaTotales();
    },
    // Metodo para Agregar Costos
    agregarCosto() {
      console.log(this.selected);
    },
    // Metodo para Agregar Costos
    calculaTotales() {
      let monto_costo = 0;
      let monto_guias = 0;
      for (var i = 0; i < this.costos.length; i++) {
        let detalle_costo = 0;
        let detalle_guias = 0;
        for (var j = 0; j < this.costos[i].detalles.length; j++) {
          detalle_costo += this.parseFloatN(
            this.costos[i].detalles[j].monto_costo
          );
        }
        for (var k = 0; k < this.costos[i].detallest.length; k++) {
          detalle_guias += this.parseFloatN(
            this.costos[i].detallest[k].movimientos.monto_subtotal
          );
        }
        this.costos[i].monto_costo = detalle_costo.toFixed(2);
        this.costos[i].monto_guias = detalle_guias.toFixed(2);
        monto_costo += detalle_costo;
        monto_guias += detalle_guias;
      }
      this.cantidad = this.costos.length;
      this.total_costo = monto_costo.toFixed(2);
      this.total_guias = monto_guias.toFixed(2);
    },
    // Pasar un numero a numero con dos decimales en formato correcto para efectuar operaciones
    parseFloatN(number) {
      number = Math.round(number * 100) / 100;
      return number;
    },
    pdfPrint() {
      api.get(`/reports/registrocostos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.$refs.webViewer.showpdf(res.data.base64);
        });
    }
  },
};
</script>
