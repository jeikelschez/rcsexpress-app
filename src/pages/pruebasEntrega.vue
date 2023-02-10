<template>
  <q-page class="pagina q-pa-md">

    <div class="q-pa-sm justify-center" >
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>MANTENIMIENTO - PRUEBAS DE ENTREGA</strong>
          </p>
        </div>
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
              this.selectedCliente = [];
              this.clientesLoading = true;
              this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
              this.getDataTable();
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
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            v-model="selectedAgenciaDestino"
            outlined
            standout
            label="Agencia Destino"
            @update:model-value="
              this.selectedClienteDestino = [];
              this.clientesDestinoLoading = true;
              this.$refs.methods.getData(
                `/clientes`,
                'setData',
                'clientesDestino',
                {
                  headers: {
                    agencia: this.selectedAgenciaDestino.id,
                  },
                }
              );
              this.getDataTable();
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Desde"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_desde"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
            @update:model-value="getDataTable()"
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_hasta"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
            @update:model-value="getDataTable()"
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            rounded
            dense
            input-debounce="0"
            v-model="nro_guia"
            outlined
            standout
            label="NRO. Guia"
            @blur="getDataTable()"
            @keyup.enter="getDataTable()"
          >
          </q-input>
        </div>
      </div>
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -25px"
      >
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="clientesSelected"
            :loading="clientesLoading"
            :disable="clientesLoading"
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
            v-model="selectedCliente"
            outlined
            standout
            label="Cliente Origen"
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
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="clientesDestinoSelected"
            :loading="clientesDestinoLoading"
            :disable="clientesDestinoLoading"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'clientesDestinoSelected',
                  'clientesDestino',
                  'nb_cliente'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="nb_cliente"
            option-value="id"
            v-model="selectedClienteDestino"
            outlined
            standout
            label="Cliente Destino"
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
            <template v-slot:clientesDestinoLoading>
              <q-inner-loading showing color="primary" class="loading" />
            </template>
          </q-select>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="estatusOperativo"
            use-input
            hide-selected
            fill-input
            option-label="label"
            option-value="value"
            input-debounce="0"
            v-model="selectedEstatus"
            outlined
            standout
            label="Estatus"
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
          </q-select>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-6 selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-field
            hide-bottom-space
            borderless
            dense
            style="padding-left: 0px"
            v-model="checkTransito"
          >
            <template v-slot:control>
              <q-checkbox
                size="md"
                v-model="checkTransito"
                true-value="1"
                false-value="0"
                style="font-size: 13px"
                label="TRANSITO"
                @click="getDataTable()"
              />
            </template>
          </q-field>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="this.resetFilters()"
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
            @click="this.sendData()"
            style="margin-right: 15px"
          >
            <q-icon size="25px" name="save" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Guardar Selección</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 5px"
          >
            <q-icon size="25px" name="print" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Imprimir Reporte</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <q-form ref="formData">
      <div class="q-pa-md justify-center" style="margin-top: -25px">
        <q-table
          :rows="guias"
          :columns="columns"
          binary-state-sort
          :separator="separator"
          row-key="id"
          :loading="loading"
          class="tableHeight"
          :rows-per-page-options="[5, 10, 15, 20, 50]"
          @request="getDataTable"
          style="width: 100%; height: 530px; margin-bottom: 30px"
          :grid="$q.screen.xs"
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
            <q-tr
              :props="props"
              v-if="
                ((this.pagination.page - 1) * this.pagination.rowsPerPage -
                  props.rowIndex) *
                  -1 ==
                0
              "
            >
              <q-td colspan="100%" style="font-size: 20px; color: #283593">
                <div class="text-left">
                  <strong> {{ "ORIGEN: " }} </strong>
                  {{
                    this.findIndex(
                      "agencias",
                      this.guias[
                        ((this.pagination.page - 1) *
                          this.pagination.rowsPerPage -
                          props.rowIndex) *
                          -1
                      ].cod_agencia,
                      "nb_agencia"
                    ) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                  }}
                  <strong> {{ "DESTINO: " }} </strong>
                  {{
                    this.findIndex(
                      "agencias",
                      this.guias[
                        ((this.pagination.page - 1) *
                          this.pagination.rowsPerPage -
                          props.rowIndex) *
                          -1
                      ].cod_agencia_dest,
                      "nb_agencia"
                    )
                  }}
                </div>
              </q-td>
            </q-tr>
            <q-tr
              :props="props"
              v-else-if="
                ((this.pagination.page - 1) * this.pagination.rowsPerPage -
                  props.rowIndex) *
                  -1 >
                  0 &&
                this.guias[
                  ((this.pagination.page - 1) * this.pagination.rowsPerPage -
                    props.rowIndex) *
                    -1
                ].cod_agencia +
                  '-' +
                  this.guias[
                    ((this.pagination.page - 1) * this.pagination.rowsPerPage -
                      props.rowIndex) *
                      -1
                  ].cod_agencia_dest !=
                  this.guias[
                    ((this.pagination.page - 1) * this.pagination.rowsPerPage -
                      props.rowIndex) *
                      -1 -
                      1
                  ].cod_agencia +
                    '-' +
                    this.guias[
                      ((this.pagination.page - 1) *
                        this.pagination.rowsPerPage -
                        props.rowIndex) *
                        -1 -
                        1
                    ].cod_agencia_dest
              "
            >
              <q-td colspan="100%" style="font-size: 20px; color: #283593">
                <div class="text-left">
                  <strong> {{ "ORIGEN: " }} </strong>
                  {{
                    this.findIndex(
                      "agencias",
                      this.guias[
                        ((this.pagination.page - 1) *
                          this.pagination.rowsPerPage -
                          props.rowIndex) *
                          -1
                      ].cod_agencia,
                      "nb_agencia"
                    ) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                  }}
                  <strong> {{ "DESTINO: " }} </strong>
                  {{
                    this.findIndex(
                      "agencias",
                      this.guias[
                        ((this.pagination.page - 1) *
                          this.pagination.rowsPerPage -
                          props.rowIndex) *
                          -1
                      ].cod_agencia_dest,
                      "nb_agencia"
                    )
                  }}
                </div>
              </q-td>
            </q-tr>
            <q-tr :props="props">
              <q-td v-for="col in props.cols" :key="col.name" :props="props">
                <div v-if="col.name == 'modalidad_pago'">
                  {{ filterDesc("modalidadPago", props.row.modalidad_pago) }}
                </div>
                <div v-else-if="col.name == 'pagado_en'">
                  {{ filterDesc("pagadoEn", props.row.pagado_en) }}
                </div>
                <div v-else-if="col.name == 'check_pagado'">
                  <q-checkbox
                    size="md"
                    v-model="props.row.check_pagado"
                    true-value="1"
                    false-value="0"
                    :disable="true"
                    style="font-size: 13px"
                  />
                </div>
                <div v-else-if="col.name == 'estatus_operativo'">
                  <q-select
                    dense
                    outlined
                    fill-input
                    input-debounce="0"
                    :options="estatusOperativo"
                    option-label="label"
                    option-value="value"
                    v-model="props.row.estatus_operativo"
                  >
                    <template v-slot:selected-item="scope">
                      {{
                        props.row.estatus_operativo.label
                          ? props.row.estatus_operativo.label
                          : filterDesc(
                              "estatusOperativo",
                              props.row.estatus_operativo
                            )
                      }}
                    </template>
                  </q-select>
                </div>
                <div v-else-if="col.name == 'persona_recibio'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.persona_recibio"
                    lazy-rules
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'persona_recibio',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    style="padding-top: 20px; min-width: 250px"
                  />
                </div>
                <div v-else-if="col.name == 'ci_persona_recibio'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.ci_persona_recibio"
                    lazy-rules
                    style="padding-top: 20px; min-width: 150px"
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'ci_persona_recibio',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                  />
                </div>
                <div v-else-if="col.name == 'fecha_recepcion'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.fecha_recepcion"
                    lazy-rules
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'fecha_recepcion',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    mask="##/##/####"
                    style="padding-top: 20px; min-width: 150px"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="props.row.fecha_recepcion"
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
                <div v-else-if="col.name == 'hora_recepcion'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.hora_recepcion"
                    lazy-rules
                    mask="time"
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'hora_recepcion',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    style="padding-top: 20px; min-width: 150px"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qTimeProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="props.row.hora_recepcion"
                            :format24h="false"
                            @update:model-value="
                              this.$refs.qTimeProxy[0].hide()
                            "
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Cerrar"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div v-else-if="col.name == 'cod_agente_entrega'">
                  <q-select
                    dense
                    outlined
                    fill-input
                    input-debounce="0"
                    :options="this.agentes[props.row.cod_agencia_dest - 1]"
                    option-label="persona_responsable"
                    option-value="id"
                    :loading="agentesLoading"
                    :disable="agentesLoading"
                    v-model="props.row.cod_agente_entrega"
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'cod_agente_entrega',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    style="padding-top: 20px; min-width: 250px"
                  >
                    <template v-slot:selected-item="scope">
                      {{
                        !agentesLoading
                          ? this.findIndexAgentes(
                              "agentes",
                              props.row.cod_agencia_dest - 1,
                              props.row.cod_agente_entrega,
                              "persona_responsable"
                            )
                          : null
                      }}
                    </template>
                    <template v-slot:agentesLoading>
                      <q-inner-loading
                        showing
                        color="primary"
                        class="loading"
                      />
                    </template>
                  </q-select>
                </div>
                <div
                  v-else-if="
                    col.name == 'dias_entrega' &&
                    diffDays(
                      props.row.fecha_emision,
                      props.row.fecha_recepcion
                    ) < 2
                  "
                >
                  {{
                    diffDays(props.row.fecha_emision, props.row.fecha_recepcion)
                  }}
                </div>
                <div v-else-if="col.name == 'dias_entrega'" style="color: red">
                  {{
                    diffDays(props.row.fecha_emision, props.row.fecha_recepcion)
                  }}
                </div>
                <div v-else-if="col.name == 'cod_motivo_retraso'">
                  <q-select
                    dense
                    outlined
                    fill-input
                    input-debounce="0"
                    :options="motivosRetraso"
                    option-label="desc_concepto"
                    option-value="id"
                    v-model="props.row.cod_motivo_retraso"
                    style="min-width: 250px"
                  >
                    <template v-slot:selected-item="scope">
                      {{
                        props.row.cod_motivo_retraso.desc_concepto
                          ? props.row.cod_motivo_retraso.desc_concepto
                          : findIndex(
                              "motivosRetraso",
                              props.row.cod_motivo_retraso,
                              "desc_concepto"
                            )
                      }}
                    </template>
                  </q-select>
                </div>
                <div v-else-if="col.name == 'cod_agencia_transito'">
                  {{
                    this.findIndex(
                      "agencias",
                      props.row.cod_agencia_dest,
                      "nb_agencia"
                    )
                  }}
                </div>
                <div v-else-if="col.name == 'fecha_sale_transito'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.fecha_sale_transito"
                    lazy-rules
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'fecha_sale_transito',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    mask="##/##/####"
                    style="padding-top: 20px; min-width: 150px"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDate2Proxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="props.row.fecha_sale_transito"
                            mask="DD/MM/YYYY"
                            @update:model-value="
                              this.$refs.qDate2Proxy[0].hide()
                            "
                          ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div v-else-if="col.name == 'observacion_entrega'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.observacion_entrega"
                    lazy-rules
                    style="padding-top: 20px; min-width: 350px"
                    :rules="[(val) => this.$refs.rulesVue.isMax(val, 200)]"
                  />
                </div>
                <div v-else>
                  {{ col.value }}
                </div>
              </q-td>
            </q-tr>
          </template>
          <template v-slot:item="props">
          <div
            class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            :style="props.selected ? 'transform: scale(0.95);' : ''"
          >
            <q-card :class="props.selected ? 'bg-grey-2' : ''">
              <q-list dense>
                <q-item-section
              :props="props"
              v-if="
                ((this.pagination.page - 1) * this.pagination.rowsPerPage -
                  props.rowIndex) *
                  -1 ==
                0
              "
            >
              <q-item-section style="font-size: 15px; padding: 15px; color: #283593">
                <div class="text-left">
                  <strong> {{ "ORIGEN: " }} </strong>
                  {{
                    this.findIndex(
                      "agencias",
                      this.guias[
                        ((this.pagination.page - 1) *
                          this.pagination.rowsPerPage -
                          props.rowIndex) *
                          -1
                      ].cod_agencia,
                      "nb_agencia"
                    ) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                  }}
                  <strong> {{ "DESTINO: " }} </strong>
                  {{
                    this.findIndex(
                      "agencias",
                      this.guias[
                        ((this.pagination.page - 1) *
                          this.pagination.rowsPerPage -
                          props.rowIndex) *
                          -1
                      ].cod_agencia_dest,
                      "nb_agencia"
                    )
                  }}
                </div>
              </q-item-section>
                </q-item-section>
                <q-item v-for="col in props.cols" :key="col.name" :props="props">
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>
                  
                <q-item-section side class="itemMovilSide" v-if="col.name === 'modalidad_pago'">
                  {{ filterDesc("modalidadPago", props.row.modalidad_pago) }}  
                </q-item-section>   
                <q-item-section side class="itemMovilSide" v-if="col.name === 'pagado_en'">
                  {{ filterDesc("pagadoEn", props.row.pagado_en) }} 
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'check_pagado'">
                  <q-checkbox
                    size="md"
                    v-model="props.row.check_pagado"
                    true-value="1"
                    false-value="0"
                    :disable="true"
                    style="font-size: 13px"
                  />
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'estatus_operativo'">
                  <q-select
                    dense
                    outlined
                    fill-input
                    input-debounce="0"
                    :options="estatusOperativo"
                    option-label="label"
                    option-value="value"
                    v-model="props.row.estatus_operativo"
                    style="min-width: 150px"
                  >
                    <template v-slot:selected-item="scope">
                      {{
                        props.row.estatus_operativo.label
                          ? props.row.estatus_operativo.label
                          : filterDesc(
                              "estatusOperativo",
                              props.row.estatus_operativo
                            )
                      }}
                    </template>
                  </q-select>
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'persona_recibio'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.persona_recibio"
                    lazy-rules
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'persona_recibio',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    style="min-width: 150px"
                    hide-bottom-space
                  />
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'ci_persona_recibio'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.ci_persona_recibio"
                    lazy-rules
                    style="min-width: 150px"
                    hide-bottom-space
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'ci_persona_recibio',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                  />
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'fecha_recepcion'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.fecha_recepcion"
                    lazy-rules
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'fecha_recepcion',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    mask="##/##/####"
                    style="min-width: 150px"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDateProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="props.row.fecha_recepcion"
                            mask="DD/MM/YYYY"
                            @update:model-value="
                              this.$refs.qDateProxy[0].hide()
                            "
                          ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'hora_recepcion'">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.hora_recepcion"
                    lazy-rules
                    mask="time"
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'hora_recepcion',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    style="min-width: 150px"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qTimeProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time
                            v-model="props.row.hora_recepcion"
                            :format24h="false"
                            @update:model-value="
                              this.$refs.qTimeProxy[0].hide()
                            "
                          >
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Cerrar"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'cod_agente_entrega'">
                  <q-select
                    dense
                    outlined
                    fill-input
                    input-debounce="0"
                    :options="this.agentes[props.row.cod_agencia_dest - 1]"
                    option-label="persona_responsable"
                    option-value="id"
                    :loading="agentesLoading"
                    :disable="agentesLoading"
                    v-model="props.row.cod_agente_entrega"
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'cod_agente_entrega',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    style="min-width: 150px"
                    hide-bottom-space
                  >
                    <template v-slot:selected-item="scope">
                      {{
                        !agentesLoading
                          ? this.findIndexAgentes(
                              "agentes",
                              props.row.cod_agencia_dest - 1,
                              props.row.cod_agente_entrega,
                              "persona_responsable"
                            )
                          : null
                      }}
                    </template>
                    <template v-slot:agentesLoading>
                      <q-inner-loading
                        showing
                        color="primary"
                        class="loading"
                      />
                    </template>
                  </q-select>
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'dias_entrega'" style="color: red">
                  {{
                    diffDays(props.row.fecha_emision, props.row.fecha_recepcion)
                  }}  
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'cod_motivo_retraso'">
                  <q-select
                    dense
                    outlined
                    fill-input
                    input-debounce="0"
                    :options="motivosRetraso"
                    option-label="desc_concepto"
                    option-value="id"
                    v-model="props.row.cod_motivo_retraso"
                    style="min-width: 150px"
                  >
                    <template v-slot:selected-item="scope">
                      {{
                        props.row.cod_motivo_retraso.desc_concepto
                          ? props.row.cod_motivo_retraso.desc_concepto
                          : findIndex(
                              "motivosRetraso",
                              props.row.cod_motivo_retraso,
                              "desc_concepto"
                            )
                      }}
                    </template>
                  </q-select>
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'cod_agencia_transito'">
                  {{
                    this.findIndex(
                      "agencias",
                      props.row.cod_agencia_dest,
                      "nb_agencia"
                    )
                  }}  
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'fecha_sale_transito'" style="text-align: right">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.fecha_sale_transito"
                    lazy-rules
                    :rules="[
                      (val) =>
                        formRules(
                          val,
                          'fecha_sale_transito',
                          ((this.pagination.page - 1) *
                            this.pagination.rowsPerPage -
                            props.rowIndex) *
                            -1
                        ),
                    ]"
                    mask="##/##/####"
                    style="min-width: 150px"
                    hide-bottom-space
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="qDate2Proxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="props.row.fecha_sale_transito"
                            mask="DD/MM/YYYY"
                            @update:model-value="
                              this.$refs.qDate2Proxy[0].hide()
                            "
                          ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input> 
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'fecha_llega_transito'" style="text-align: right">
                  {{props.row.fecha_recepcion}}
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'cliente_orig_desc'" style="text-align: right">
                  {{props.row.cliente_orig_desc}}
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'cliente_dest_desc'" style="text-align: right">
                  {{props.row.cliente_dest_desc}}
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'fecha_emision'" style="text-align: right">
                  {{props.row.fecha_emision}}
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'fecha_envio'" style="text-align: right">
                  {{props.row.fecha_envio}}
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'nro_documento'" style="text-align: right">
                  {{props.row.nro_documento}}
                </q-item-section>
                <q-item-section side class="itemMovilSide" v-if="col.name === 'observacion_entrega'" style="text-align: right">
                  <q-input
                    dense
                    outlined
                    v-model="props.row.observacion_entrega"
                    lazy-rules
                    :rules="[(val) => this.$refs.rulesVue.isMax(val, 200)]"
                  />
                </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </template>
        </q-table>
      </div>
    </q-form>

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
import { api } from "boot/axios";
import rulesVue from "src/components/rules.vue";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
  },
  data() {
    return {
      columns: [
        {
          name: "cliente_orig_desc",
          label: "Cliente Origen",
          field: "cliente_orig_desc",
          align: "left",
        },
        {
          name: "cliente_dest_desc",
          label: "Cliente Destino",
          field: "cliente_dest_desc",
          align: "left",
        },
        {
          name: "fecha_emision",
          label: "Fecha Emisión",
          field: "fecha_emision",
          align: "left",
        },
        {
          name: "fecha_envio",
          label: "Fecha Envío",
          field: "fecha_envio",
          align: "left",
        },
        {
          name: "nro_documento",
          label: "Nro. Guía",
          field: "nro_documento",
          align: "left",
        },
        {
          name: "modalidad_pago",
          label: "Forma Pago",
          field: "modalidad_pago",
          align: "left",
        },
        {
          name: "pagado_en",
          label: "Pagado En",
          field: "pagado_en",
          align: "left",
        },
        {
          name: "check_pagado",
          label: "Check Pagado",
          field: "check_pagado",
          align: "center",
        },
        {
          name: "estatus_operativo",
          label: "Estatus Operativo",
          field: "estatus_operativo",
          align: "left",
        },
        {
          name: "persona_recibio",
          label: "Persona que Recibió",
          field: "persona_recibio",
          align: "left",
        },
        {
          name: "ci_persona_recibio",
          label: "C:I Persona Recibió",
          field: "ci_persona_recibio",
          align: "left",
        },
        {
          name: "fecha_recepcion",
          label: "Fecha Entrega",
          field: "fecha_recepcion",
          align: "left",
        },
        {
          name: "hora_recepcion",
          label: "Hora Entrega",
          field: "hora_recepcion",
          align: "left",
        },
        {
          name: "cod_agente_entrega",
          label: "Agente Entrega",
          field: "cod_agente_entrega",
          align: "left",
        },
        {
          name: "dias_entrega",
          label: "Dias Entrega",
          field: "dias_entrega",
          align: "center",
        },
        {
          name: "cod_motivo_retraso",
          label: "Motivo Retraso",
          field: "cod_motivo_retraso",
          align: "left",
        },
        {
          name: "cod_agencia_transito",
          label: "Agencia Transito",
          field: "cod_agencia_transito",
          align: "left",
        },
        {
          name: "fecha_llega_transito",
          label: "Fecha Llega Transito",
          field: "fecha_llega_transito",
          align: "left",
        },
        {
          name: "fecha_sale_transito",
          label: "Fecha Sale Transito",
          field: "fecha_sale_transito",
          align: "left",
        },
        {
          name: "observacion_entrega",
          label: "Observación de Prueba Entrega",
          field: "observacion_entrega",
          align: "left",
        },
      ],
      estatusOperativo: [
        { label: "EN PROCESO DE ENVÍO", value: "PR" },
        { label: "PENDIENTE POR ENTREGA", value: "PE" },
        { label: "ENTREGA CONFORME", value: "CO" },
        { label: "ENTREGA NO CONFORME", value: "NC" },
      ],
      modalidadPago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
        { label: "PREPAGADA", value: "PP" },
      ],
      pagadoEn: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: "",
      },
      guias: [],
      agencias: [],
      agentes: [],
      agenciasDestino: [],
      clientes: [],
      clientesDestino: [],
      agenciasSelected: [],
      agenciasDestinoSelected: [],
      selectedAgencia: [],
      selectedAgenciaDestino: [],
      clientesSelected: [],
      selectedCliente: [],
      clientesLoading: false,
      clientesDestinoSelected: [],
      selectedClienteDestino: [],
      clientesDestinoLoading: false,
      agentesLoading: true,
      selectedEstatus: [],
      motivosRetraso: [],
      personaRecibioFocus: false,
      checkTransito: "0",
      pagado_en: "0",
      nro_guia: "",
      estatus: "",
      fecha_desde: moment().format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Pruebas de Entrega", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/agentes", "setData", "agentes", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        group_ag: "S",
      },
    });
    this.$refs.methods.getData("/coperacion", "setData", "motivosRetraso", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        tipo: 9,
      },
    });

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "pruebasentrega",
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
    // Metodo para traer el value del select de Agentes
    findIndexAgentes(array, index, value, field) {
      value = value.id ? value.id : value;
      var find = this[array][index].findIndex((item) => item.id == value);
      return find >= 0 ? this[array][index][find][field] : null;
    },
    // Metodo para traer el value de los Selects y Columns
    filterDesc(array, value) {
      var find = this[array].findIndex((item) => item.value == value);
      return find >= 0 ? this[array][find].label : null;
    },
    // Metodo para validar Permisos
    allowOption(option) {
      return (
        this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0
      );
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos Generales
    async setDataInit(res, dataRes) {
      this.loading = true;
      this[dataRes] = res.data ? res.data : res;
      this.getDataTable();
    },
    // Metodo para Setear Datos Generales
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "guias", {
        headers: {
          agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
          cliente_orig: this.selectedCliente.id ? this.selectedCliente.id : "",
          agencia_dest: this.selectedAgenciaDestino.id
            ? this.selectedAgenciaDestino.id
            : "",
          cliente_dest: this.selectedClienteDestino.id
            ? this.selectedClienteDestino.id
            : "",
          desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
          hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
          nro_documento: this.nro_guia ? this.nro_guia : "",
          estatus_oper: this.selectedEstatus.value
            ? this.selectedEstatus.value
            : "",
          transito: this.checkTransito == "1" ? this.checkTransito : "",
          tipo: "GC",
          estatus_admin_ex: "A",
          order_pe: "S",
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
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
    },
    // Metodo para Setear Datos de Tabla
    async sendData() {
      this.$refs.formData.validate().then(async (valid) => {
        try {
          if (!valid) {
            return stopFuction;
          }
          this.loading = true;
          for (var i = 0; i <= this.guias.length - 1; i++) {
            var formPruebaEntrega = {};

            formPruebaEntrega.estatus_operativo = this.guias[i]
              .estatus_operativo.value
              ? this.guias[i].estatus_operativo.value
              : this.guias[i].estatus_operativo;
            formPruebaEntrega.persona_recibio = this.guias[i].persona_recibio;
            formPruebaEntrega.ci_persona_recibio =
              this.guias[i].ci_persona_recibio;
            formPruebaEntrega.fecha_recepcion = this.guias[i].fecha_recepcion
              ? moment(this.guias[i].fecha_recepcion, "DD/MM/YYYY").format(
                  "YYYY-MM-DD"
                )
              : null;
            formPruebaEntrega.hora_recepcion = this.guias[i].hora_recepcion;
            formPruebaEntrega.cod_agente_entrega = this.guias[i]
              .cod_agente_entrega
              ? this.guias[i].cod_agente_entrega.id
                ? this.guias[i].cod_agente_entrega.id
                : this.guias[i].cod_agente_entrega
              : null;
            formPruebaEntrega.cod_motivo_retraso = this.guias[i]
              .cod_motivo_retraso
              ? this.guias[i].cod_motivo_retraso.id
                ? this.guias[i].cod_motivo_retraso.id
                : this.guias[i].cod_motivo_retraso
              : null;
            formPruebaEntrega.fecha_sale_transito = this.guias[i]
              .fecha_sale_transito
              ? moment(this.guias[i].fecha_sale_transito, "DD/MM/YYYY").format(
                  "YYYY-MM-DD"
                ) != 'Invalid date' 
                  ? moment(this.guias[i].fecha_sale_transito, "DD/MM/YYYY").format(
                    "YYYY-MM-DD"
                  ): null
              : null;
            formPruebaEntrega.observacion_entrega =
              this.guias[i].observacion_entrega;

            await api.put(
              `/mmovimientos/${this.guias[i].id}`,
              formPruebaEntrega,
              {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                },
              }
            );
          }
          this.$q.notify({
            message: "Actualización Exitosa...",
            color: "green",
          });
          this.loading = false;
        } catch (stopFuction) {
          // Validaciones de datos requeridos
        }
      });
    },
    // Metodo para armar el nombre del cliente Origen
    buildNbCliente(type, row) {
      if (type == "cod_cliente_org") {
        if (!row.ci_rif_cte_conta_org || row.ci_rif_cte_conta_org == "") {
          return this.findIndex(
            "clientesAll",
            row.cod_cliente_org,
            "nb_cliente"
          );
        } else {
          var find = this.clientesParticularesAll.findIndex(
            (item) =>
              item.cod_agencia == row.cod_agencia &&
              item.cod_cliente == row.cod_cliente_org &&
              item.rif_ci == row.ci_rif_cte_conta_org
          );
          return find >= 0
            ? this.clientesParticularesAll[find]["nb_cliente"]
            : null;
        }
      } else {
        if (!row.ci_rif_cte_conta_dest || row.ci_rif_cte_conta_dest == "") {
          return this.findIndex(
            "clientesAll",
            row.cod_cliente_dest,
            "nb_cliente"
          );
        } else {
          var find = this.clientesParticularesAll.findIndex(
            (item) =>
              item.cod_agencia == row.cod_agencia_dest &&
              item.cod_cliente == row.cod_cliente_dest &&
              item.rif_ci == row.ci_rif_cte_conta_dest
          );
          return find >= 0
            ? this.clientesParticularesAll[find]["nb_cliente"]
            : null;
        }
      }
    },
    formRules(val, row, index) {
      let ret;
      let estatus_operativo = this.guias[index].estatus_operativo.value
        ? this.guias[index].estatus_operativo.value
        : this.guias[index].estatus_operativo;
      if (estatus_operativo == "CO" || estatus_operativo == "NC") {
        switch (row) {
          case "persona_recibio":
            ret =
              this.$refs.rulesVue.isReq(val, "") == ""
                ? "Debe Ingresar la Persona que Recibió"
                : this.$refs.rulesVue.isMax(val, 50, "") == ""
                ? "Maximo 50 Carácteres"
                : null;
            break;
          case "ci_persona_recibio":
            ret =
              this.$refs.rulesVue.isReq(val, "") == ""
                ? "Debe Ingresar la Cédula"
                : this.$refs.rulesVue.isMax(val, 12, "") == ""
                ? "Maximo 12 Carácteres"
                : null;
            break;
          case "fecha_recepcion":
            ret =
              this.$refs.rulesVue.checkDate(val, "") == ""
                ? "Debe Ingresar la Fecha de Recepción"
                : null;
            break;
          case "hora_recepcion":
            ret =
              this.$refs.rulesVue.checkHour(val, "") == ""
                ? "Debe Ingresar la Hora de Recepción"
                : null;
            break;
          case "cod_agente_entrega":
            ret =
              this.$refs.rulesVue.isReqSelect(val, "") == ""
                ? "Debe Ingresar el Agente"
                : null;
            break;
          case "fecha_sale_transito":
            if (this.guias[index].check_transito == 1) {
              ret =
                this.$refs.rulesVue.checkDate(val, "") == ""
                  ? "Debe Ingresar la Fecha de Salida"
                  : null;
            }
            break;
          default:
            break;
        }
        return ret;
      }
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selectedAgencia = [];
      this.selectedAgenciaDestino = [];
      this.selectedCliente = [];
      this.selectedClienteDestino = [];
      this.selectedEstatus = [];
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.checkTransito = "0";
      this.nro_guia = "";
      this.getDataTable();
    },
    // Metodo para restar dos fechas
    diffDays(date1, date2) {
      if (!date1 || !date2) return 0;
      return moment(date2, "DD/MM/YYYY").diff(
        moment(date1, "DD/MM/YYYY"),
        "days"
      );
    },
    // Metodo para imprimir mensajes de error
    errorMessage(message) {
      this.$q.notify({
        message: message,
        color: "red",
      });
    },
  },
};
</script>

<style>
@media screen and (max-width: 1080px) {
  .tableHeight {
    height: 100% !important;
  }
}
</style>