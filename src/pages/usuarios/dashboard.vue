<template>
  <q-page class="pagina2 q-pa-md">
    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile2"
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

    <div class="q-pa-md justify-center">
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
        style="width: 100%; height: 540px"
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
                    ((this.pagination.page - 1) * this.pagination.rowsPerPage -
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
                          @update:model-value="this.$refs.qDateProxy[0].hide()"
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
                          @update:model-value="this.$refs.qTimeProxy[0].hide()"
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
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                </q-select>
              </div>
              <div
                v-else-if="
                  col.name == 'dias_entrega' &&
                  diffDays(props.row.fecha_emision, props.row.fecha_recepcion) <
                    2
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
                          @update:model-value="this.$refs.qDate2Proxy[0].hide()"
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
                  <q-item-section
                    style="font-size: 15px; padding: 15px; color: #283593"
                  >
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
                <q-item
                  v-for="col in props.cols"
                  :key="col.name"
                  :props="props"
                >
                  <q-item-section>
                    <q-item-label>{{ col.label }}</q-item-label>
                  </q-item-section>

                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'modalidad_pago'"
                  >
                    {{ filterDesc("modalidadPago", props.row.modalidad_pago) }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'pagado_en'"
                  >
                    {{ filterDesc("pagadoEn", props.row.pagado_en) }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'check_pagado'"
                  >
                    <q-checkbox
                      size="md"
                      v-model="props.row.check_pagado"
                      true-value="1"
                      false-value="0"
                      :disable="true"
                      style="font-size: 13px"
                    />
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'estatus_operativo'"
                  >
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
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'persona_recibio'"
                  >
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
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'ci_persona_recibio'"
                  >
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
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'fecha_recepcion'"
                  >
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
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'hora_recepcion'"
                  >
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
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'cod_agente_entrega'"
                  >
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
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'dias_entrega'"
                    style="color: red"
                  >
                    {{
                      diffDays(
                        props.row.fecha_emision,
                        props.row.fecha_recepcion
                      )
                    }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'cod_motivo_retraso'"
                  >
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
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'cod_agencia_transito'"
                  >
                    {{
                      this.findIndex(
                        "agencias",
                        props.row.cod_agencia_dest,
                        "nb_agencia"
                      )
                    }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'fecha_sale_transito'"
                    style="text-align: right"
                  >
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
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'fecha_llega_transito'"
                    style="text-align: right"
                  >
                    {{ props.row.fecha_recepcion }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'cliente_orig_desc'"
                    style="text-align: right"
                  >
                    {{ props.row.cliente_orig_desc }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'cliente_dest_desc'"
                    style="text-align: right"
                  >
                    {{ props.row.cliente_dest_desc }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'fecha_emision'"
                    style="text-align: right"
                  >
                    {{ props.row.fecha_emision }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'fecha_envio'"
                    style="text-align: right"
                  >
                    {{ props.row.fecha_envio }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'nro_documento'"
                    style="text-align: right"
                  >
                    {{ props.row.nro_documento }}
                  </q-item-section>
                  <q-item-section
                    side
                    class="itemMovilSide"
                    v-if="col.name === 'observacion_entrega'"
                    style="text-align: right"
                  >
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

    <methods
      ref="methods"
      @get-Data-Table="getDataTable"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { api } from "boot/axios";
import rulesVue from "src/components/rules.vue";
import { useQuasar, SessionStorage } from "quasar";
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
    // Verifico que cliente Exista
    api
      .get(`clientes/verify/${SessionStorage.getItem("clientId")}`, {})
      .then((res) => {
        this.$emit("changeTitle", res.data.nb_cliente);
      });
  },
  methods: {
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/mmovimientos`, "setDataTable", "guias", {
        headers: {
          filters: JSON.stringify({
            agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
            cliente_orig: this.selectedCliente.id
              ? this.selectedCliente.id
              : "",
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
          }),
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
        },
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
