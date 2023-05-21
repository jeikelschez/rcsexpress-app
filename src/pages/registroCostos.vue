<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="printOptions">
      <q-card style="width: 400px">
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
                dense
                v-model="selectedTipo"
                label="Tipo de Impresion"
                :options="tipoReporte == 1 ? tipoImpresion1 : tipoImpresion2"
              >
              </q-select>
            </div>
            <div
              class="col-md-8 col-xs-12"
              style="margin-top: 23px; margin-bottom: 10px; text-align: center"
            >
              <q-btn
                label="Imprimir"
                color="primary"
                style="width: 200px"
                @click="printReport()"
              />
            </div>
            <div class="col-md-2 col-xs-12" style="margin-top: 5px">
              <q-checkbox
                v-model="selectedNeta"
                label="Neta"
                color="primary"
                left-label
              />
            </div>
            <div
              class="col-md-2 col-xs-12"
              style="margin-top: 5px; padding-left: 10px"
            >
              <q-checkbox
                v-model="selectedDolar"
                label="$"
                color="primary"
                left-label
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="detalleCostosDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <div
          class="row justify-center items-center content-center"
          style="padding: 20px"
        >
          <div class="col-md-10 col-xs-12">
            <p style="font-size: 20px; text-align: left" class="text-secondary">
              <strong>DETALLE COSTOS DE TRANSPORTE</strong>
            </p>
          </div>
          <div
            class="col-md-2 col-xs-12"
            style="margin-bottom: 20px; text-align: center"
          >
            <q-btn
              color="primary"
              rounded
              icon="add"
              @click="
                if (validateDetalle())
                  this.costos[this.selectedCosto].detalles.push({});
              "
            />
          </div>
          <div class="col-md-12 col-xs-12">
            <q-table
              :rows="detalles_costo"
              row-key="id"
              :columns="columnsDetalle"
              binary-state-sort
              :separator="separator"
              v-model:pagination="pagination"
              :grid="$q.screen.xs"
              :rows-per-page-options="[0]"
              style="width: 100%; height: 350px"
              hide-bottom
            >
              <template v-slot:header="props">
                <q-tr :props="props">
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
                  <q-td
                    v-for="col in props.cols"
                    :key="col.name"
                    :props="props"
                  >
                    <div v-if="col.name == 'cod_concepto'">
                      <q-select
                        dense
                        outlined
                        fill-input
                        input-debounce="0"
                        :options="conceptos"
                        option-label="desc_concepto"
                        option-value="id"
                        style="min-width: 250px"
                        v-model="props.row.cod_concepto"
                        @update:model-value="validateConcepto(props.rowIndex)"
                      >
                        <template v-slot:selected-item="scope">
                          {{
                            props.row.cod_concepto.id
                              ? props.row.cod_concepto.desc_concepto
                              : this.findIndex(
                                  "conceptos",
                                  props.row.cod_concepto,
                                  "desc_concepto"
                                )
                          }}
                        </template>
                      </q-select>
                    </div>
                    <div v-else-if="col.name == 'monto_costo'">
                      <q-input
                        dense
                        outlined
                        v-model="props.row.monto_costo"
                        v-money="money"
                        input-class="text-right"
                        style="min-width: 80px"
                        @keyup="this.calculaDetalle('costo', props.rowIndex)"
                      >
                      </q-input>
                    </div>
                    <div v-else-if="col.name == 'monto_dolar'">
                      <q-input
                        dense
                        outlined
                        v-model="props.row.monto_dolar"
                        v-money="money"
                        input-class="text-right"
                        style="min-width: 80px"
                        @keyup="this.calculaDetalle('dolar', props.rowIndex)"
                      >
                      </q-input>
                    </div>
                    <div v-if="col.name == 'action'">
                      <q-btn
                        dense
                        round
                        flat
                        color="primary"
                        icon="cancel_presentation"
                        @click="
                          this.costos[this.selectedCosto].detalles.splice(
                            props.rowIndex,
                            1
                          );
                          this.calculaTotales();
                        "
                        ><q-tooltip
                          class="bg-primary"
                          transition-show="scale"
                          style="max-height: 30px"
                          transition-hide="scale"
                          color="primary"
                          >Eliminar Costo</q-tooltip
                        ></q-btn
                      >
                    </div>
                  </q-td>
                </q-tr>
              </template>
              <template
                v-slot:bottom-row
                v-if="this.costos[this.selectedCosto].detalles.length > 0"
              >
                <q-tr>
                  <q-td>
                    <p style="text-align: right">Total Costo</p>
                  </q-td>
                  <q-td>
                    <q-input
                      outlined
                      v-model="total_detalle_costo"
                      hint=""
                      dense
                      :disable="true"
                      input-class="text-right"
                    >
                    </q-input>
                  </q-td>
                  <q-td>
                    <q-input
                      outlined
                      v-model="total_detalle_dolar"
                      hint=""
                      dense
                      :disable="true"
                      input-class="text-right"
                    >
                    </q-input>
                  </q-td>
                  <q-td></q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
        <div
          class="row justify-center items-center content-center"
          style="margin-bottom: 20px"
        >
          <q-btn
            label="Asignar"
            color="primary"
            class="col-md-5 col-sm-5 col-xs-12"
            icon="save"
            @click="
              if (validateDetalle()) {
                calculaTotales();
                this.detalleCostosDialog = false;
              }
            "
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
      </q-card>
    </q-dialog>

    <q-dialog v-model="detalleGuiasDialog">
      <q-card style="width: 1300px; max-width: 120vw">
        <div
          class="row justify-center items-center content-center"
          style="padding: 10px"
        >
          <div class="col-md-12 col-xs-12" style="margin-bottom: 6px">
            <div class="row justify-center items-center">
              <div class="col-md-6 col-xs-12 boxStyle Cards2">
                <q-card style="margin-top: 10px">
                  <q-card-section>
                    <div class="row">
                      <div
                        class="col-md-12 col-xs-12"
                        style="
                          align-self: center;
                          text-align: left;
                          margin-top: -40px;
                        "
                      >
                        <h4
                          style="font-size: 18px; margin-bottom: 0px"
                          class="text-secondary"
                        >
                          <strong
                            >Busqueda de Guias a Enviar a su Destino</strong
                          >
                        </h4>
                      </div>
                      <div
                        class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-4 cardMargin2"
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
                          v-model="selectedAgenciaGuia"
                          label="Agencia Origen"
                          @update:model-value="getGuiasAsignar()"
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
                        class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-3 cardMargin2"
                      >
                        <q-input
                          v-model="fecha_desde_guias_asignar"
                          dense
                          label="Fecha Desde"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                ref="qDateProxy"
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="fecha_desde_guias_asignar"
                                  mask="DD/MM/YYYY"
                                  style="padding-bottom: 0px"
                                  @update:model-value="
                                    this.$refs.qDateProxy.hide();
                                    getGuiasAsignar();
                                  "
                                ></q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                      <div
                        class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-3 cardMargin2"
                      >
                        <q-input
                          v-model="fecha_hasta_guias_asignar"
                          dense
                          label="Fecha Hasta"
                        >
                          <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                              <q-popup-proxy
                                ref="qDateProxy"
                                transition-show="scale"
                                transition-hide="scale"
                              >
                                <q-date
                                  v-model="fecha_hasta_guias_asignar"
                                  mask="DD/MM/YYYY"
                                  style="padding-bottom: 0px"
                                  @update:model-value="
                                    this.$refs.qDateProxy.hide();
                                    getGuiasAsignar();
                                  "
                                ></q-date>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                      <div
                        class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-2 cardMargin2"
                      >
                        <q-input
                          v-model="buscar_guia_asignar"
                          rounded
                          dense
                          label="Guía"
                          @keyup.enter="
                            find = this.detalles_costo_guias_asignar.findIndex(
                              (item) =>
                                item.nro_documento == this.buscar_guia_asignar
                            );

                            if (find >= 0) {
                              this.selectedGuiasAsignar.push(
                                this.detalles_costo_guias_asignar[find]
                              );
                              this.buscar_guia_asignar = '';
                            }
                          "
                        >
                          <template v-slot:append>
                            <q-icon
                              @click="
                                find =
                                  this.detalles_costo_guias_asignar.findIndex(
                                    (item) =>
                                      item.nro_documento ==
                                      this.buscar_guia_asignar
                                  );

                                if (find >= 0) {
                                  this.selectedGuiasAsignar.push(
                                    this.detalles_costo_guias_asignar[find]
                                  );
                                  this.buscar_guia_asignar = '';
                                }
                              "
                              class="cursor-pointer"
                              name="search"
                            />
                          </template>
                        </q-input>
                      </div>
                      <q-table
                        :rows="detalles_costo_guias_asignar"
                        dense
                        selection="multiple"
                        :columns="columnsDetalleGuiasAsignar"
                        binary-state-sort
                        :separator="separator"
                        :rows-per-page-options="[0]"
                        v-model:selected="selectedGuiasAsignar"
                        row-key="id"
                        :loading="loadingGuias"
                        style="width: 100%; margin-top: 10px; height: 280px"
                        hide-bottom
                      >
                        <template
                          v-slot:bottom-row
                          v-if="this.detalles_costo_guias_asignar.length > 0"
                        >
                          <q-tr>
                            <q-td colspan="3">
                              <p>
                                <strong>{{
                                  "Cant: " +
                                  this.detalles_costo_guias_asignar.length
                                }}</strong>
                              </p>
                            </q-td>
                            <q-td
                              ><strong
                                ><p style="text-align: right">
                                  {{
                                    new Intl.NumberFormat("de-DE", {
                                      style: "currency",
                                      currency: "EUR",
                                      currencyDisplay: "code",
                                    })
                                      .format(this.total_detalle_guias_asignar)
                                      .replace("EUR", "")
                                      .trim()
                                  }}
                                </p></strong
                              >
                            </q-td>
                            <q-td colspan="2"> </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
              <div
                class="row col-md-1 col-xs-12"
                style="
                  text-align: center;
                  margin-left: -40px;
                  margin-right: -40px;
                "
              >
                <div class="col-md-12 col-xs-3" style="margin-bottom: 30px">
                  <q-btn
                    dense
                    color="primary"
                    round
                    padding="sm"
                    icon="close"
                    v-close-popup
                  >
                    <q-tooltip
                      class="bg-primary"
                      style="max-height: 30px"
                      transition-show="scale"
                      transition-hide="scale"
                      color="primary"
                      >Cerrar</q-tooltip
                    >
                  </q-btn>
                </div>
                <div class="col-md-12 col-xs-3 buttonsCard">
                  <q-btn
                    color="primary"
                    round
                    padding="sm"
                    icon="chevron_right"
                    @click="addSelectedGuia()"
                    :disabled="this.loadingGuias"
                  />
                </div>
                <div class="col-md-12 col-xs-3 buttonsCard">
                  <q-btn
                    color="primary"
                    round
                    padding="sm"
                    icon="chevron_left"
                    @click="deleteSelectedGuia()"
                    :disabled="this.loadingGuias"
                  />
                </div>
                <div class="col-md-12 col-xs-3 buttonsCard">
                  <q-btn
                    dense
                    color="primary"
                    round
                    padding="sm"
                    icon="keyboard_double_arrow_right"
                    @click="
                      this.selectedGuiasAsignar =
                        this.detalles_costo_guias_asignar;
                      this.addSelectedGuia();
                    "
                    :disabled="this.loadingGuias"
                  />
                </div>
                <div class="col-md-12 col-xs-3 buttonsCard">
                  <q-btn
                    dense
                    color="primary"
                    round
                    padding="sm"
                    icon="keyboard_double_arrow_left"
                    @click="
                      this.selectedGuias = JSON.parse(
                        JSON.stringify(this.detalles_costo_guias)
                      );
                      this.deleteSelectedGuia();
                    "
                    :disabled="this.loadingGuias"
                  />
                </div>
              </div>
              <div class="col-md-6 col-xs-12 Cards">
                <q-card style="margin-top: 10px">
                  <q-card-section>
                    <div class="row">
                      <div
                        class="col-md-12 col-xs-12"
                        style="
                          align-self: center;
                          text-align: left;
                          margin-top: -40px;
                        "
                      >
                        <h4
                          style="font-size: 18px; margin-bottom: 0px"
                          class="text-secondary"
                        >
                          <strong>Guias a Enviar por el Transporte</strong>
                        </h4>
                      </div>
                      <div
                        class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-3 cardMargin2"
                      >
                        <q-input
                          v-model="fecha_desde_guias"
                          rounded
                          dense
                          label="Fecha Envío"
                          disable
                        >
                        </q-input>
                      </div>
                      <div
                        class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 cardMargin2"
                      >
                        <q-input
                          v-model="transporte_guias"
                          rounded
                          dense
                          label="Transporte"
                          disable
                        >
                        </q-input>
                      </div>
                      <div
                        class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-3"
                      >
                        <q-input
                          v-model="buscar_guia"
                          rounded
                          dense
                          label="Guía"
                          @keyup.enter="
                            find = this.detalles_costo_guias.findIndex(
                              (item) =>
                                item.movimientos.nro_documento ==
                                this.buscar_guia
                            );

                            if (find >= 0) {
                              this.selectedGuias.push(
                                this.detalles_costo_guias[find]
                              );
                              this.buscar_guia = '';
                            }
                          "
                        >
                          <template v-slot:append>
                            <q-icon
                              @click="
                                find = this.detalles_costo_guias.findIndex(
                                  (item) =>
                                    item.movimientos.nro_documento ==
                                    this.buscar_guia
                                );

                                if (find >= 0) {
                                  this.selectedGuias.push(
                                    this.detalles_costo_guias[find]
                                  );
                                  this.buscar_guia = '';
                                }
                              "
                              class="cursor-pointer"
                              name="search"
                            />
                          </template>
                        </q-input>
                      </div>
                      <q-table
                        :rows="detalles_costo_guias"
                        dense
                        selection="multiple"
                        :columns="columnsDetalleGuias"
                        binary-state-sort
                        :separator="separator"
                        :rows-per-page-options="[0]"
                        v-model:selected="selectedGuias"
                        row-key="id"
                        :loading="loadingGuias"
                        style="width: 100%; margin-top: 10px; height: 280px"
                        hide-bottom
                      >
                        <template
                          v-slot:bottom-row
                          v-if="this.detalles_costo_guias.length > 0"
                        >
                          <q-tr>
                            <q-td colspan="3">
                              <p>
                                <strong>{{
                                  "Cant: " + this.detalles_costo_guias.length
                                }}</strong>
                              </p>
                            </q-td>
                            <q-td
                              ><strong
                                ><p style="text-align: right">
                                  {{
                                    new Intl.NumberFormat("de-DE", {
                                      style: "currency",
                                      currency: "EUR",
                                      currencyDisplay: "code",
                                    })
                                      .format(this.total_detalle_guias)
                                      .replace("EUR", "")
                                      .trim()
                                  }}
                                </p></strong
                              >
                            </q-td>
                          </q-tr>
                        </template>
                      </q-table>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
        </div>
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
            @click="addData()"
          >
            <q-icon size="25px" name="add" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Agregar Costo</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
            @click="sendData()"
          >
            <q-icon size="25px" name="save" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Guardar</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
            @click="resetFilters()"
          >
            <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Resetear Filtros</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="
              this.selectedTipo = this.tipoImpresion2[0];
              this.tipoReporte = 2;
              printOptions = true;
            "
            :disabled="this.costos.length > 0 ? false : true"
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
      <q-table
        :rows="costos"
        :columns="columns"
        binary-state-sort
        :separator="separator"
        row-key="id"
        :loading="loading"
        :rows-per-page-options="[0]"
        style="width: 100%; height: 510px"
        :grid="$q.screen.xs"
        hide-bottom
        :visible-columns="visibleColumns"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props" style="margin-bottom: 20px">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name == 'action'">
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="cancel_presentation"
                  @click="
                    selected = props.row.id;
                    selectedIndex = props.rowIndex;
                  "
                  @click.capture="deletePopup = true"
                  ><q-tooltip
                    class="bg-primary"
                    transition-show="scale"
                    style="max-height: 30px"
                    transition-hide="scale"
                    color="primary"
                    >Eliminar Costo</q-tooltip
                  ></q-btn
                >
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="print"
                  @click="
                    this.selectedTipo = this.tipoImpresion1[0];
                    this.tipoReporte = 1;
                    printOptions = true;
                    selected = props.row.id;
                  "
                  :disabled="this.costos.length > 0 ? false : true"
                  ><q-tooltip
                    class="bg-primary"
                    transition-show="scale"
                    style="max-height: 30px"
                    transition-hide="scale"
                    color="primary"
                    >Imprimir</q-tooltip
                  ></q-btn
                >
              </div>
              <div v-if="col.name == 'fecha_envio'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.fecha_envio"
                  :ref="'fecha_envio' + props.rowIndex"
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
                          @update:model-value="this.$refs.qDateProxy[0].hide()"
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
                  @keydown="onLoadDetalleGuias(props.rowIndex)"
                  @click="onLoadDetalleGuias(props.rowIndex)"
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
                  :input-style="{ color: '#060640' }"
                  style="min-width: 100px"
                  @keydown="onLoadDetalle(props.rowIndex)"
                  @click="onLoadDetalle(props.rowIndex)"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'utilidad'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.utilidad"
                  :readonly="true"
                  v-money="money"
                  input-class="text-right"
                  style="min-width: 100px"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'porc_costo'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.porc_costo"
                  :readonly="true"
                  v-money="money_porc"
                  input-class="text-right"
                  style="min-width: 100px"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'porc_utilidad'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.porc_utilidad"
                  :readonly="true"
                  v-money="money_porc"
                  input-class="text-right"
                  style="min-width: 100px"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'observacion_gnral'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.observacion_gnral"
                  style="min-width: 600px"
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
                  v-model="cantidad"
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
              <div class="col-md-3 col-xs-12">
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
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="total_utilidad"
                  label="Utilidad"
                  class="pcform"
                  dense
                  v-money="money"
                  :disable="true"
                  input-class="text-right"
                >
                </q-input>
              </div>
              <div class="col-md-1 col-xs-12">
                <q-input
                  outlined
                  v-model="total_porc_costo"
                  label="% Costo"
                  class="pcform"
                  dense
                  v-money="money_porc"
                  :disable="true"
                  input-class="text-right"
                >
                  <template v-slot:append>
                    <q-icon name="percent" class="cursor-pointer"> </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-1 col-xs-12">
                <q-input
                  outlined
                  v-model="total_porc_utilidad"
                  label="% Utilidad"
                  class="pcform"
                  dense
                  v-money="money_porc"
                  :disable="true"
                  input-class="text-right"
                >
                  <template v-slot:append>
                    <q-icon name="percent" class="cursor-pointer"> </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="deletePopup">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estas seguro que quieres eliminar este Costo?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="deleteCosto()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
import { api } from "boot/axios";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import rulesVue from "src/components/rules.vue";
import webViewerVue from "src/components/webViewer.vue";

export default {
  directives: { money: VMoney },
  components: {
    methods: methodsVue,
    rulesVue,
    VMoney,
    webViewer: webViewerVue,
  },
  data() {
    return {
      columns: [
        {
          name: "action",
          label: "Detalle",
          align: "center",
          required: true,
        },
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
        {
          name: "utilidad",
          label: "Utilidad (Bs.)",
          align: "center",
          required: true,
        },
        {
          name: "porc_costo",
          label: "Costo (%)",
          align: "center",
          required: true,
        },
        {
          name: "porc_utilidad",
          label: "Utilidad (%)",
          align: "center",
          required: true,
        },
        {
          name: "observacion_gnral",
          label: "Observaciones",
          field: "observacion_gnral",
          align: "center",
          required: true,
        },
      ],
      columnsDetalle: [
        {
          name: "cod_concepto",
          label: "Concepto Costo",
          field: "cod_concepto",
          align: "center",
        },
        {
          name: "monto_costo",
          label: "Monto Bs",
          field: "monto_costo",
          align: "center",
        },
        {
          name: "monto_dolar",
          label: "Monto $",
          field: "monto_dolar",
          align: "center",
        },
        {
          name: "action",
          label: "Acción",
          align: "center",
        },
      ],
      columnsDetalleGuias: [
        {
          name: "fecha_emision",
          label: "Emisión",
          field: (row) => row.movimientos.fecha_emision,
          align: "center",
        },
        {
          name: "nro_documento",
          label: "N° Guía",
          field: (row) => row.movimientos.nro_documento,
          align: "center",
        },
        {
          name: "monto_subtotal",
          label: "Sub-Total",
          field: (row) => row.movimientos.monto_subtotal,
          align: "right",
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
      ],
      columnsDetalleGuiasAsignar: [
        {
          name: "nro_documento",
          label: "N° Guía",
          field: "nro_documento",
          align: "center",
        },
        {
          name: "cliente_orig_desc",
          label: "Cliente Origen",
          field: "cliente_orig_desc",
          align: "center",
        },
        {
          name: "monto_subtotal",
          label: "Sub-Total",
          field: "monto_subtotal",
          align: "right",
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
          name: "siglas_dest",
          label: "Dest",
          field: "siglas_dest",
          align: "center",
        },
        {
          name: "fecha_emision",
          label: "Emisión",
          field: "fecha_emision",
          align: "center",
        },
      ],
      tipoImpresion1: [
        {
          label: "DETALLE DE GUIAS ASOCIADAS",
          value: "DE",
        },
        {
          label: "RESUMEN DISTRIBUIDO POR DESTINO",
          value: "RE",
        },
      ],
      tipoImpresion2: [
        {
          label: "GENERAL",
          value: "GE",
        },
        {
          label: "DIARIO",
          value: "DI",
        },
        {
          label: "COMISIONES",
          value: "CO",
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
      money_porc: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "%",
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
      },
      visibleColumns: [],
      guia_desde: "",
      type: 2,
      selected: [],
      selectedIndex: [],
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
      selectedAgenciaGuia: [],
      selectedCosto: null,
      selectedGuias: [],
      selectedGuiasAsignar: [],
      selectedTipo: [],
      tipoReporte: "",
      selectedNeta: false,
      selectedDolar: false,
      conceptos: [],
      cantidad: 0,
      total_costo: 0,
      total_guias: 0,
      total_utilidad: 0,
      total_porc_costo: 0,
      total_porc_utilidad: 0,
      total_detalle_costo: 0,
      total_detalle_dolar: 0,
      total_detalle_guias: 0,
      total_detalle_guias_asignar: 0,
      fecha_desde: moment().format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
      fecha_desde_guias: "",
      fecha_desde_guias_asignar: "",
      fecha_hasta_guias_asignar: "",
      transporte_guias: "",
      detalles_costo_guias: [],
      detalles_costo_guias_asignar: [],
      buscar_guia: "",
      buscar_guia_asignar: "",
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      tab: ref("tabCostos"),
      separator: ref("vertical"),
      form: ref(false),
      loading: ref(false),
      loadingGuias: ref(false),
      deletePopup: ref(false),
      detalleCostosDialog: ref(false),
      detalleGuiasDialog: ref(false),
      disableMonto: ref(true),
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
    this.$refs.methods.getData("/coperacion", "setData", "conceptos", {
      headers: {
        tipo: 5,
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
          order_doc: "S",
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
      this.calculaTotales();
    },
    // Metodo para Agregar Costos
    async addData() {
      await this.pushCosto();
      eval(
        "this.$refs.fecha_envio" + (this.costos.length - 1) + "[0].$el.focus()"
      );
    },
    // Push del Costo
    async pushCosto() {
      var formCosto = {};
      this.costos.push(formCosto);
      this.costos[this.costos.length - 1].fecha_envio =
        moment().format("DD/MM/YYYY");
      this.costos[this.costos.length - 1].tipo_transporte = "I";
      this.costos[this.costos.length - 1].cod_agencia = this.selectedAgencia.id;
      this.costos[this.costos.length - 1].detalles = [];
      this.costos[this.costos.length - 1].detallesg = [];
    },
    // Metodo para Editar o Crear Datos
    async sendData() {
      this.loading = true;
      var formCosto = {};

      for (var i = 0; i < this.costos.length; i++) {
        formCosto.cod_agencia = this.costos[i].cod_agencia.id
          ? this.costos[i].cod_agencia.id
          : this.costos[i].cod_agencia;
        formCosto.fecha_envio = moment(
          this.costos[i].fecha_envio,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
        formCosto.tipo_transporte = this.costos[i].tipo_transporte;
        formCosto.cod_agente = this.costos[i].cod_agente
          ? this.costos[i].cod_agente.id
            ? this.costos[i].cod_agente.id
            : this.costos[i].cod_agente
          : null;
        formCosto.cod_proveedor = this.costos[i].cod_proveedor
          ? this.costos[i].cod_proveedor.id
            ? this.costos[i].cod_proveedor.id
            : this.costos[i].cod_proveedor
          : null;
        formCosto.guia_fact_transporte = this.costos[i].guia_fact_transporte;
        formCosto.destino = this.costos[i].destino;
        formCosto.cod_transporte = this.costos[i].cod_transporte
          ? this.costos[i].cod_transporte.id
            ? this.costos[i].cod_transporte.id
            : this.costos[i].cod_transporte
          : null;
        formCosto.observacion_gnral = this.costos[i].observacion_gnral;
        formCosto.monto_anticipo = this.curReplace(
          this.costos[i].monto_anticipo
        );
        formCosto.cod_ayudante = this.costos[i].cod_ayudante
          ? this.costos[i].cod_ayudante.id
            ? this.costos[i].cod_ayudante.id
            : this.costos[i].cod_ayudante
          : null;

        // Actualizamos datos del movimiento
        if (this.costos[i].id) {
          // Guardamos el detalle
          for (var j = 0; j < this.costos[i].detalles.length; j++) {
            var formDetalle = JSON.parse(
              JSON.stringify(this.costos[i].detalles[j])
            );
            delete formDetalle.monto_dolar;
            formDetalle.cod_concepto = formDetalle.cod_concepto.id
              ? formDetalle.cod_concepto.id
              : formDetalle.cod_concepto;
            formDetalle.monto_costo = this.curReplace(formDetalle.monto_costo);
            if (this.costos[i].detalles[j].id) {
              // Actualizamos el Detalle
              await api
                .put(`/dcostos/${this.costos[i].detalles[j].id}`, formDetalle, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .catch(() => {
                  this.$q.notify({
                    message:
                      "Error del Sistema. Problemas al actualizar el detalle de los Costos. Comuníquese con el proveedor del Sistemas...",
                    color: "red",
                  });
                  return;
                });
            } else {
              formDetalle.cod_costo = this.costos[i].id;
              // Creamos el Detalle
              await api
                .post(`/dcostos`, formDetalle, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .catch(() => {
                  this.$q.notify({
                    message:
                      "Error del Sistema. Problemas al crear el detalle de los Costos. Comuníquese con el proveedor del Sistemas...",
                    color: "red",
                  });
                  return;
                });
            }
          }
          // Actualizamos el costo
          await api
            .put(`/costos/${this.costos[i].id}`, formCosto, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .catch(() => {
              this.$q.notify({
                message:
                  "Error del Sistema. Problemas al actualizar los Costos. Comuníquese con el proveedor del Sistemas...",
                color: "red",
              });
              return;
            });
        } else {
          // Creamos primero el costo
          let idCosto;
          await api
            .post(`/costos`, formCosto, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              idCosto = res.data.id;
            })
            .catch(() => {
              this.$q.notify({
                message:
                  "Error del Sistema. Problemas al Crear el Costo. Comuníquese con el proveedor del Sistemas...",
                color: "red",
              });
              return;
            });

          // Luego Creamos el detalle
          if (this.costos[i].detalles) {
            for (var j = 0; j < this.costos[i].detalles.length; j++) {
              var formDetalle = JSON.parse(
                JSON.stringify(this.costos[i].detalles[j])
              );
              delete formDetalle.monto_dolar;
              formDetalle.cod_concepto = formDetalle.cod_concepto.id
                ? formDetalle.cod_concepto.id
                : formDetalle.cod_concepto;
              formDetalle.monto_costo = this.curReplace(
                formDetalle.monto_costo
              );
              formDetalle.cod_costo = idCosto;

              await api
                .post(`/dcostos`, formDetalle, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  },
                })
                .catch(() => {
                  this.$q.notify({
                    message:
                      "Error del Sistema. Problemas al crear el detalle de los Costos. Comuníquese con el proveedor del Sistemas...",
                    color: "red",
                  });
                  return;
                });
            }
          }
        }
      }
      this.$q.notify({
        message: "Costos Actualizados con exito...",
        color: "green",
      });
      this.getDataTable();
    },
    // Metodo al abrir el detalle del costo
    async onLoadDetalle(index) {
      let monto_dolar = await this.valorDolar(
        index,
        this.costos[index].fecha_envio
      );

      if (monto_dolar == 0) {
        this.$q.notify({
          message: "Este Día no tiene monto de Dolar definido",
          color: "red",
        });
        return;
      }

      this.selectedCosto = index;
      this.detalleCostosDialog = true;
      this.detalles_costo = this.costos[index].detalles;
      this.calculaTotalDetalle(monto_dolar);
    },
    // Metodo al abrir el detalle de Guias del costo
    async onLoadDetalleGuias(index) {
      if (!this.costos[index].id) {
        this.$q.notify({
          message: "Debe guardar el Costo antes de ejecutar esta Opción",
          color: "red",
        });
        return;
      }

      this.loadingGuias = true;
      this.selectedCosto = index;
      this.detalles_costo_guias = this.costos[index].detallesg;
      this.fecha_desde_guias = this.costos[index].fecha_envio;
      this.transporte_guias =
        this.costos[index].tipo_transporte == "I"
          ? this.findIndex(
              "agentes",
              this.costos[index].cod_agente,
              "persona_responsable"
            )
          : this.findIndex(
              "proveedores",
              this.costos[index].cod_proveedor,
              "nb_proveedor"
            );
      this.costos[index].tipo_transporte == "I"
        ? this.findIndex(
            "agentes",
            this.costos[index].cod_agente,
            "persona_responsable"
          )
        : this.findIndex(
            "proveedores",
            this.costos[index].cod_proveedor,
            "nb_proveedor"
          );
      let total_guias = 0;
      for (var i = 0; i < this.detalles_costo_guias.length; i++) {
        total_guias += this.parseFloatN(
          this.detalles_costo_guias[i].movimientos.monto_subtotal
        );
      }
      this.total_detalle_guias = total_guias.toFixed(2);
      this.fecha_desde_guias_asignar = this.costos[index].fecha_envio;
      this.fecha_hasta_guias_asignar = this.costos[index].fecha_envio;

      // Buscamos las guias en Proceso de Envio
      this.getGuiasAsignar();
      this.detalleGuiasDialog = true;
    },
    async getGuiasAsignar() {
      this.loadingGuias = true;
      this.detalles_costo_guias_asignar = [];
      await api
        .get(`/mmovimientos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            agencia: this.selectedAgenciaGuia.id
              ? this.selectedAgenciaGuia.id
              : "",
            agencia_transito: this.selectedAgenciaGuia.id
              ? this.selectedAgenciaGuia.id
              : "",
            desde: moment(this.fecha_desde_guias_asignar, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            ),
            hasta: moment(this.fecha_hasta_guias_asignar, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            ),
            estatus_oper: "PR",
            estatus_admin_ex: "A",
          },
        })
        .then((res) => {
          this.detalles_costo_guias_asignar = res.data.data;
        });

      this.calculaTotalDetalleGuias();
    },
    // Agrega Guias seleccionadas al detalle
    async addSelectedGuia() {
      this.loadingGuias = true;
      for (var i = 0; i < this.selectedGuiasAsignar.length; i++) {
        let formDetalleGuias = {};
        formDetalleGuias.cod_costo = this.costos[this.selectedCosto].id;
        formDetalleGuias.cod_movimiento = this.selectedGuiasAsignar[i].id;
        // Guardo el detalle
        await api
          .post(`/dcostosg`, formDetalleGuias, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            formDetalleGuias.id = res.data.id;
            formDetalleGuias.movimientos = this.selectedGuiasAsignar[i];
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al crear el detalle de Guias de los Costos. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            return;
          });

        // Actualizamos el estatus del movimiento
        let formMovimientos = {};
        formMovimientos.estatus_operativo = "PE";
        await api
          .put(
            `/mmovimientos/${this.selectedGuiasAsignar[i].id}`,
            formMovimientos,
            {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            }
          )
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al actualizar el estatus de la Guia. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            return;
          });

        this.detalles_costo_guias.push(formDetalleGuias);
      }
      this.getGuiasAsignar();
      this.selectedGuias = [];
      this.selectedGuiasAsignar = [];
    },
    // Elimina Guias seleccionadas del detalle
    async deleteSelectedGuia() {
      this.loadingGuias = true;
      for (var i = 0; i < this.selectedGuias.length; i++) {
        // Elimino el detalle de los costos
        await api
          .delete(`/dcostosg/${this.selectedGuias[i].id}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al Eliminar el detalle de Guia de los Costos. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            return;
          });

        // Actualizamos el estatus del movimiento
        let formMovimientos = {};
        formMovimientos.estatus_operativo = "PR";
        await api
          .put(
            `/mmovimientos/${this.selectedGuias[i].cod_movimiento}`,
            formMovimientos,
            {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            }
          )
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al actualizar el estatus de la Guia. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            return;
          });
        var find = this.detalles_costo_guias.findIndex(
          (item) => item.id == this.selectedGuias[i].id
        );
        this.detalles_costo_guias.splice(find, 1);
      }
      this.getGuiasAsignar();
      this.selectedGuias = [];
      this.selectedGuiasAsignar = [];
    },
    // Actualiza los totales de los detalles de Guias
    calculaTotalDetalleGuias() {
      let total_guias = 0;
      let total_guias_asignar = 0;
      for (var i = 0; i < this.detalles_costo_guias.length; i++) {
        total_guias += this.parseFloatN(
          this.detalles_costo_guias[i].movimientos.monto_subtotal
        );
      }
      this.total_detalle_guias = total_guias.toFixed(2);

      for (var i = 0; i < this.detalles_costo_guias_asignar.length; i++) {
        total_guias_asignar += this.parseFloatN(
          this.detalles_costo_guias_asignar[i].monto_subtotal
        );
      }
      this.total_detalle_guias_asignar = total_guias_asignar.toFixed(2);
      this.loadingGuias = false;
      this.calculaTotales();
    },
    // Push del Costo
    async deleteCosto() {
      this.loading = true;
      if (this.selected) {
        if (this.costos[this.selectedIndex].detallesg.length > 0) {
          this.$q.notify({
            message:
              "No es posible eliminar este Costo, pues tiene Guías asociadas. Elimine la asociación e intente nuevamente",
            color: "red",
          });
          this.loading = false;
          return;
        }
        // Eliminamos los detalles si tuviese
        let detalle = [];
        await api
          .get(`/costos/${this.selected}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            detalle = res.data.detalles;
          });

        for (var i = 0; i < detalle.length; i++) {
          await api
            .delete(`/dcostos/${detalle[i].id}`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .catch(() => {
              this.$q.notify({
                message:
                  "Error del Sistema. Problemas al Eliminar el Detalle del Costo. Comuníquese con el proveedor del Sistemas...",
                color: "red",
              });
              this.loading = false;
              return;
            });
        }

        // Eliminamos el Costo
        await api
          .delete(`/costos/${this.selected}`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .then(() => {
            this.$q.notify({
              message: "Costo eliminado con Exito...",
              color: "green",
            });
            this.getDataTable();
          })
          .catch(() => {
            this.$q.notify({
              message:
                "Error del Sistema. Problemas al Eliminar el Costo. Comuníquese con el proveedor del Sistemas...",
              color: "red",
            });
            this.loading = false;
            return;
          });
      } else {
        this.costos.splice(this.selectedIndex, 1);
      }
    },
    // Metodo para Validar detalles de Costo
    validateDetalle() {
      for (
        var i = 0;
        i < this.costos[this.selectedCosto].detalles.length;
        i++
      ) {
        if (
          !this.costos[this.selectedCosto].detalles[i].cod_concepto ||
          this.costos[this.selectedCosto].detalles[i].monto_costo == "0,00"
        ) {
          this.$q.notify({
            message: "Debe completar el Detalle para poder agregar uno nuevo",
            color: "red",
          });
          return false;
        }
      }
      return true;
    },
    // Metodo para validar conceptos repetidos
    validateConcepto(index) {
      for (var i = 0; i < this.detalles_costo.length - 1; i++) {
        let id = this.detalles_costo[i].cod_concepto.id
          ? this.detalles_costo[i].cod_concepto.id
          : this.detalles_costo[i].cod_concepto;
        if (this.detalles_costo[index].cod_concepto.id == id) {
          this.detalles_costo[index].cod_concepto = "";
          this.$q.notify({
            message: "Ya este Detalle de Costo fue insertado",
            color: "red",
          });
          return;
        }
      }
    },
    // Metodo para salvar detalles de Costo
    saveDetalle() {
      for (
        var i = 0;
        i < this.costos[this.selectedCosto].detalles.length;
        i++
      ) {
        if (
          !this.costos[this.selectedCosto].detalles[i].cod_concepto ||
          this.costos[this.selectedCosto].detalles[i].monto_costo == "0,00"
        ) {
          this.$q.notify({
            message: "Debe completar el Detalle para poder agregar uno nuevo",
            color: "red",
          });
          return;
        }
      }
      this.calculaTotales();
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selectedAgencia = this.agencias[0];
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.getDataTable();
    },
    // Metodo para Calcular Totales
    async calculaTotales() {
      let monto_costo = 0;
      let monto_guias = 0;
      let monto_utilidad = 0;
      for (var i = 0; i < this.costos.length; i++) {
        let detalle_costo = 0;
        let detalle_guias = 0;
        for (var j = 0; j < this.costos[i].detalles.length; j++) {
          detalle_costo += this.parseFloatN(
            this.curReplace(this.costos[i].detalles[j].monto_costo)
          );
          if (this.costos[i].dolar) {
            if (this.costos[i].dolar.valor) {
              this.costos[i].detalles[j].monto_dolar = this.parseFloatN(
                this.curReplace(this.costos[i].detalles[j].monto_costo) /
                  this.costos[i].dolar.valor
              ).toFixed(2);
            }
          }
        }
        for (var k = 0; k < this.costos[i].detallesg.length; k++) {
          detalle_guias += this.parseFloatN(
            this.costos[i].detallesg[k].movimientos.monto_subtotal
          );
        }
        this.costos[i].monto_costo = detalle_costo.toFixed(2);
        this.costos[i].monto_guias = detalle_guias.toFixed(2);
        this.costos[i].utilidad = (detalle_guias - detalle_costo).toFixed(2);
        this.costos[i].porc_costo = (
          (detalle_costo / detalle_guias) *
          100
        ).toFixed(2);
        this.costos[i].porc_utilidad = (
          ((detalle_guias - detalle_costo) / detalle_guias) *
          100
        ).toFixed(2);
        monto_costo += detalle_costo;
        monto_guias += detalle_guias;
        monto_utilidad += detalle_guias - detalle_costo;
      }
      this.cantidad = this.costos.length;
      this.total_costo = monto_costo.toFixed(2);
      this.total_guias = monto_guias.toFixed(2);
      this.total_utilidad = monto_utilidad.toFixed(2);
      this.total_porc_costo = ((monto_costo / monto_guias) * 100).toFixed(2);
      this.total_porc_utilidad = (
        ((monto_guias - monto_costo) / monto_guias) *
        100
      ).toFixed(2);
    },
    // Metodo para Calcular Monto Costo y Dolar
    async calculaDetalle(row, index) {
      let monto_dolar = await this.valorDolar(
        this.selectedCosto,
        this.costos[this.selectedCosto].fecha_envio
      );

      if (row == "costo") {
        this.costos[this.selectedCosto].detalles[index].monto_dolar = (
          this.parseFloatN(
            this.curReplace(
              this.costos[this.selectedCosto].detalles[index].monto_costo
            )
          ) / monto_dolar
        ).toFixed(2);
      } else {
        this.costos[this.selectedCosto].detalles[index].monto_costo = (
          this.parseFloatN(
            this.curReplace(
              this.costos[this.selectedCosto].detalles[index].monto_dolar
            )
          ) * monto_dolar
        ).toFixed(2);
      }
      this.calculaTotalDetalle(monto_dolar);
    },
    // Metodo para calcular los totales del Detalle
    calculaTotalDetalle(monto_dolar) {
      let total_costo = 0;
      for (
        var i = 0;
        i < this.costos[this.selectedCosto].detalles.length;
        i++
      ) {
        total_costo += this.parseFloatN(
          this.curReplace(
            this.costos[this.selectedCosto].detalles[i].monto_costo
          )
        );
      }
      this.total_detalle_costo = total_costo.toFixed(2);
      this.total_detalle_dolar = (
        this.parseFloatN(total_costo) / this.parseFloatN(monto_dolar)
      ).toFixed(2);
    },
    // Metodo para extraer el valor del Dolar
    async valorDolar(index, fecha) {
      let monto_dolar = 0;
      if (!this.costos[index].dolar) {
        await api
          .get(`/hdolar/`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              fecha: moment(fecha, "DD/MM/YYYY").format("YYYY-MM-DD"),
            },
          })
          .then((res) => {
            if (res.data.data[0]) monto_dolar = res.data.data[0].valor;
          });
      } else {
        monto_dolar = this.costos[index].dolar.valor;
      }
      return monto_dolar;
    },
    // Metodo para convertir a Currency los String
    curReplace(amount) {
      return amount.indexOf(",") < 0
        ? amount
        : amount.replaceAll(".", "").replaceAll(",", ".");
    },
    // Pasar un numero a numero con dos decimales en formato correcto para efectuar operaciones
    parseFloatN(number) {
      number = Math.round(number * 100) / 100;
      return number;
    },
    printReport() {
      if (this.selectedTipo.value == "DI" && this.fecha_desde != this.fecha_hasta) {
        this.$q.notify({
            message: "Debe seleccionar la misma Fecha Desde y Hasta",
            color: "red",
          });
          return;
      }
      this.pdfView = true;
    },
    pdfPrint() {
      this.printOptions = false;
      api
        .get(`/reports/costosTransporte`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            id: this.selected,
            tipo: this.selectedTipo.value,
            agencia: this.selectedAgencia.nb_agencia,
            desde: this.fecha_desde,
            hasta: this.fecha_hasta,
            neta: this.selectedNeta,
            dolar: this.selectedDolar,
          },
        })
        .then((res) => {
          this.$refs.webViewer.showpdf("", res.data.base64);
        });
    },
  },
};
</script>

<style>
@media screen and (min-width: 1080px) {
  .table {
    height: 500px;
  }
}
@media screen and (max-width: 1080px) {
  .table {
    height: 100%;
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
