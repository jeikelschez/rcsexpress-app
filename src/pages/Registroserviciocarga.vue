<template>
  <q-page class="pagina q-pa-md" style="padding-buttom: 10px">
    <q-page-sticky
      position="bottom-right"
      class="z-top"
      style="margin-right: 20px; margin-bottom: 20px"
    >
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action color="primary" icon="save" class="z-top" @click="putData()">
          <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Guardar Guia</q-tooltip
            >
        </q-fab-action>
        <q-fab-action color="primary" icon="print" class="z-top">
          <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Imprimir Guia</q-tooltip
            >
        </q-fab-action>
        <q-fab-action color="primary" icon="close" class="z-top">
          <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Reversar Guia</q-tooltip
            >
        </q-fab-action>
        <q-fab-action color="primary" icon="money" class="z-top">
          <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Tarifear</q-tooltip
            >
        </q-fab-action>
      </q-fab>
    </q-page-sticky>

    <q-dialog v-model="conceptosBox">
      <div class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
          <q-table
            :rows="clientes"
            row-key="id"
            :columns="columnsConceptos"
            :separator="separator"
            class="my-sticky-column-table"
            :filter="filter"
            style="width: 100%"
            :grid="$q.screen.xs"
            v-model:pagination="paginationConceptos"
          >
          </q-table>
        </div>

        <div
          class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
          style="margin-top: 20px"
        >
          <div
            class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
            style="align-self: center; text-align: center"
          >
            <q-card
              bordered
              class="row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
              style="align-self: center; text-align: center"
            >
              <q-card-section
                class="row col-md-12 col-xs-12"
                style="align-self: center; text-align: center; margin-top: 15px"
              >
                <div class="col-md-3 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.desc_ciudad"
                    label="Valor COD"
                    type="number"
                    dense
                    class="inputMenuGuias"
                    hint=""
                    lazy-rules
                  >
                    <template v-slot:prepend>
                      <q-icon name="south_america" />
                    </template>
                  </q-input>
                </div>

                <div class="col-md-3 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.desc_ciudad"
                    label="Valor Seguro"
                    dense
                    class="inputMenuGuias"
                    lazy-rules
                    hint=""
                  >
                    <template v-slot:prepend>
                      <q-icon name="south_america" />
                    </template>
                  </q-input>
                </div>

                <div class="col-md-3 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.desc_ciudad"
                    label="Porcentaje"
                    class="inputMenuGuias"
                    lazy-rules
                    dense
                    hint=""
                  >
                    <template v-slot:prepend>
                      <q-icon name="south_america" />
                    </template>
                  </q-input>
                </div>

                <div class="col-md-3 col-xs-12">
                  <q-input
                    outlined
                    dense
                    v-model="form.desc_ciudad"
                    label="Sub Total:"
                    class="inputMenuGuias"
                    lazy-rules
                    hint=""
                  >
                    <template v-slot:prepend>
                      <q-icon name="south_america" />
                    </template>
                  </q-input>
                </div>

                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    dense
                    v-model="form.desc_ciudad"
                    label="Monto Base:"
                    class="inputMenuGuias"
                    lazy-rules
                    hint=""
                  >
                    <template v-slot:prepend>
                      <q-icon name="south_america" />
                    </template>
                  </q-input>
                </div>

                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    dense
                    v-model="form.desc_ciudad"
                    label="Impuesto:"
                    class="inputMenuGuias"
                    lazy-rules
                    hint=""
                  >
                    <template v-slot:prepend>
                      <q-icon name="south_america" />
                    </template>
                  </q-input>
                </div>

                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    dense
                    v-model="form.desc_ciudad"
                    label="Total"
                    class="inputMenuGuias"
                    lazy-rules
                    hint=""
                  >
                    <template v-slot:prepend>
                      <q-icon name="south_america" />
                    </template>
                  </q-input>
                </div>

                <div class="col-md-12 col-xs-12">
                  <q-input
                    outlined
                    v-model="form.desc_ciudad"
                    label="Monto Ref. Cliente sin IVA"
                    class="inputMenuGuias"
                    lazy-rules
                    dense
                    hint=""
                  >
                    <template v-slot:prepend>
                      <q-icon name="south_america" />
                    </template>
                  </q-input>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-dialog>

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="row">
          <q-form>
            <div
              class="row justify-center items-center"
              style="margin-top: 20px"
            >
              <div class="col-md-4 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="NRO. Guía"
                  hint=""
                  class="pcform pcmovil"
                  dense
                  type="number"
                  hide-bottom-space
                  @keydown.enter="
                  this.showTextLoading();
                  this.axiosConfig.headers.nro_documento = this.formEdit.nro_documento;
                  getData(`/mmovimientos/${this.formEdit.nro_documento}`, 'setDataEdit', 'formEdit');"
                >
                </q-input>
              </div>

              <div class="col-md-4 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="NRO. Factura"
                  hint=""
                  class="pcform"
                  hide-bottom-space
                  dense
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-2 col-xs-6" style="margin-bottom: 20px">
                <q-checkbox
                  size="lg"
                  v-model="checkbox.guia_factura"
                  true-value="GF"
                  false-value="0"
                  style="font-size: 13px"
                  label="Guía Factura"
                  @update:model-value="if (this.checkbox.guia_factura == 'GF') {this.checkbox.guia_carga = '0'};"
                />
              </div>

              <div class="col-md-2 col-xs-6" style="margin-bottom: 20px">
                <q-checkbox
                  size="lg"
                  v-model="checkbox.guia_carga"
                  true-value="GC"
                  false-value="0"
                  style="font-size: 13px"
                  label="Guía Carga"
                  @update:model-value="if (this.checkbox.guia_carga == 'GC') {this.checkbox.guia_factura = '0'};"
                />
              </div>

              <div class="col-md-4 col-xs-12" style="margin-bottom: 20px">
                <q-card
                  class="q-pa-md col-md-4 col-xs-12 cardMenus"
                  bordered
                  style="padding: 5px"
                >
                  <q-card-section style="padding-bottom: 0px">
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
                          <strong>Fechas</strong>
                        </h4>
                      </div>
                      <div class="col-md-6 col-xs-6">
                        <q-input
                      outlined
                      label="Emision"
                      hint=""
                      v-model="formEdit.fecha_emision"
                      mask="date"
                      :rules="['date']"
                      class="pcform pcmovil"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formEdit.fecha_emision">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                      </div>

                      <div class="col-md-6 col-xs-6">
                        <q-input
                      outlined
                      label="Envio"
                      hint=""
                      v-model="formEdit.fecha_envio"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formEdit.fecha_envio">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                      </div>

                      <div class="col-md-12 col-xs-12">
                        <q-input
                      outlined
                      label="Aplicación"
                      hint=""
                      v-model="formEdit.fecha_aplicacion"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="formEdit.fecha_aplicacion">
                          <div class="row items-center justify-end">
                             <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-md-4 col-xs-12" style="margin-bottom: 20px">
                <q-card
                  class="q-pa-md col-md-4 col-xs-12 cardMenus"
                  bordered
                  style="padding: 5px"
                >
                  <q-card-section style="padding-bottom: 7px">
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
                          <strong>Información de Carga</strong>
                        </h4>
                      </div>
                      <div class="col-md-6 col-xs-6">
                        <q-input
                          outlined
                          dense
                          v-model="formEdit.nro_piezas"
                          label="NRO. Piezas"
                          hint=""
                          type="number"
                          hide-buttom-space
                          class="pcform pcmovil"
                          lazy-rules
                        >
                        </q-input>
                      </div>

                      <div class="col-md-6 col-xs-6">
                        <q-input
                          outlined
                          v-model="formEdit.peso_kgs"
                          label="Peso KGS"
                          hint=""
                          type="number"
                          dense
                          hide-buttom-space
                          lazy-rules
                        >
                        </q-input>
                      </div>

                      <div class="col-md-6 col-xs-6">
                        <q-checkbox
                          size="lg"
                          v-model="checkbox.paquetes"
                          true-value="PM"
                          false-value="0"
                          style="font-size: 13px"
                          label="Paquetes"
                          @update:model-value="if (this.checkbox.paquetes == 'PM') {this.checkbox.sobres = '0'};"
                        />
                      </div>

                      <div class="col-md-6 col-xs-6">
                        <q-checkbox
                          size="lg"
                          v-model="checkbox.sobres"
                          true-value="SB"
                          false-value="0"
                          style="font-size: 13px"
                          label="Sobres"
                          @update:model-value="if (this.checkbox.sobres == 'SB') {this.checkbox.paquetes = '0'};"
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-md-4 col-xs-12" style="margin-bottom: 25px">
                <q-card
                  class="q-pa-md col-md-4 col-xs-12"
                  bordered
                  style="padding: 5px"
                >
                  <q-card-section style="padding-bottom: 0px">
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
                          <strong>Información de Carga</strong>
                        </h4>
                      </div>
                      <div class="col-md-12 col-xs-12">
                        <q-select
                          outlined
                          v-model="formEdit.modalidad_pago"
                          label="Modalidad Pago"
                          hint=""
                          dense=""
                          :options="modalidad_pago"
                          lazy-rules
                        >
                        </q-select>
                      </div>

                      <div class="col-md-12 col-xs-12">
                        <q-select
                          outlined
                          v-model="formEdit.pagado_en"
                          label="Pagado En"
                          hint=""
                          dense
                          :options="pagado_en"
                          lazy-rules
                        >
                        </q-select>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div
                class="col-md-3 col-xs-12"
                style="margin-bottom: 25px; padding: 5px"
              >
                <q-card
                  class="q-pa-md col-md-4 col-xs-12 cardMenus"
                  bordered
                  style="padding: 5px"
                >
                  <q-card-section style="padding-bottom: 0px">
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
                          <strong>Origen</strong>
                        </h4>
                      </div>
                      <div class="col-md-12 col-xs-6">
                        <q-select
                          outlined
                          v-model="formEdit.cod_agencia"
                          label="Agencia"
                          dense
                          class="pcmovil"
                          hint=""
                          :options="agencias"
                          lazy-rules
                          @update:model-value="
                          this.axiosConfig.headers.agencia = this.formEdit.cod_agencia.id;
                          this.getData(`/clientes`, 'setData', 'clientes_origen');
                          this.formEdit.cod_cliente_org = '';
                          "
                          option-label="nb_agencia"
                          option-value="id"
                        >
                        </q-select>
                      </div>
                      <div class="col-md-12 col-xs-6">
                        <q-select
                          outlined
                          v-model="formEdit.cod_cliente_org"
                          label="Cliente"
                          hint=""
                          dense
                          :options="clientes_origen"
                          option-label="nb_cliente"
                          option-value="id"
                          lazy-rules
                        >
                        </q-select>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-md-4 col-xs-12" style="margin-bottom: 25px">
                <q-card
                  class="q-pa-md col-md-4 col-xs-12 cardMenus"
                  bordered
                  style="padding: 5px"
                >
                  <q-card-section style="padding-bottom: 0px">
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
                          <strong>Destino</strong>
                        </h4>
                      </div>
                      <div class="col-md-6 col-xs-6">
                        <q-select
                          outlined
                          v-model="formEdit.cod_agencia_dest"
                          label="Agencia"
                          hint=""
                          dense
                          class="pcform pcmovil"
                          :options="agencias"
                          lazy-rules
                          option-label="nb_agencia"
                          option-value="id"
                          @update:model-value="
                          this.axiosConfig.headers.agencia = this.formEdit.cod_agencia_dest.id;
                          this.getData(`/clientes`, 'setData', 'clientes_destino');
                          this.getData(`/zonas`, 'setData', 'zonas_destino');
                          this.formEdit.cod_cliente_dest = '';
                          this.formEdit.cod_zona_dest = '';
                          "
                        >
                        </q-select>
                      </div>
                      <div class="col-md-6 col-xs-6">
                        <q-select
                          outlined
                          v-model="formEdit.cod_cliente_dest"
                          label="Cliente"
                          dense
                          hint=""
                          :options="clientes_destino"
                          lazy-rules
                          option-label="nb_cliente"
                          option-value="id"
                        >
                        </q-select>
                      </div>
                      <div class="col-md-10 col-xs-10">
                        <q-select
                          outlined
                          v-model="formEdit.cod_zona_dest"
                          label="Zona"
                          dense
                          hint=""
                          @popup-show="
                          this.axiosConfig.headers.agencia = this.formEdit.cod_agencia_dest.id;
                          this.getData(`/zonas`, 'setData', 'zonas_destino');
                          "
                          behavior="dialog"
                          :options="zonas_destino"
                          lazy-rules
                          hide-bottom-space
                          option-label="nb_zona"
                          option-value="id"
                        >
                        </q-select>
                      </div>
                      
                      <div class="col-md-2 col-xs-2 items-start">
                        <q-btn
                          dense
                          color="primary"
                          round
                          @click="pushToWindow('/zonasagencia')"
                          padding="sm"
                          style="margin-left: 15px"
                        >
                          <q-icon size="25px" name="settings" color="white">
                          </q-icon>
                          <q-tooltip
                            class="bg-primary"
                            style="max-height: 30px"
                            transition-show="scale"
                            transition-hide="scale"
                            color="primary"
                            >Modificar Zonas</q-tooltip
                          >
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-md-5 col-xs-12" style="margin-bottom: 20px">
                <q-card
                  class="q-pa-md col-md-12 col-xs-12"
                  bordered
                  style="padding-top: 15px; padding-bottom: 10px; padding-left: 6px; padding-right: 0px"
                >
                  <q-card-section
                    class="row col-md-12 col-xs-12"
                    style="padding-bottom: 0px; padding-top: 0px"
                  >
                    <div
                      class="col-md-4 col-xs-12 items-center"
                      style="align-self: center; text-align: left"
                    >
                      <h4
                        style="
                          font-size: 16px;
                          margin-top: 0px;
                          margin-bottom: 0px;
                        "
                        class="text-secondary"
                      >
                        <strong>Servicio</strong>
                      </h4>
                    </div>

                    <div class="col-md-4 col-xs-6" style="margin-bottom: 6px">
                      <q-checkbox
                        size="lg"
                        v-model="checkbox.nacional"
                        true-value="N"
                        false-value="0"
                        style="font-size: 13px"
                        label="Nacional"
                        @update:model-value="if (this.checkbox.nacional == 'N') {this.checkbox.internacional = '0'};"
                      />
                    </div>

                    <div class="col-md-4 col-xs-6" style="margin-bottom: 6px">
                      <q-checkbox
                        size="lg"
                        v-model="checkbox.internacional"
                        true-value="I"
                        false-value="0"
                        style="font-size: 13px"
                        label="Internacional"
                        @update:model-value="if (this.checkbox.internacional == 'I') {this.checkbox.nacional = '0'};"
                      />
                    </div>

                    <div
                      class="col-md-2 col-xs-12 items-center"
                      style="align-self: center; text-align: left"
                    >
                      <h4
                        style="
                          font-size: 16px;
                          margin-top: 0px;
                          margin-bottom: 0px;
                        "
                        class="text-secondary"
                      >
                        <strong>Ubicación</strong>
                      </h4>
                    </div>

                    <div class="col-md-3 col-xs-4 checkboxForaneo" style="margin-bottom: 6px">
                      <q-checkbox
                        size="lg"
                        v-model="checkbox.foraneo"
                        true-value="F"
                        false-value="0"
                        style="font-size: 13px"
                        label="Foraneo"
                        @update:model-value="if (this.checkbox.foraneo == 'F') {
                          this.checkbox.urbano = '0';
                          this.checkbox.extra_urbano = '0';
                        };"
                      />
                    </div>

                    <div class="col-md-3 col-xs-4 checkboxForaneo" style="margin-bottom: 6px">
                      <q-checkbox
                        size="lg"
                        v-model="checkbox.urbano"
                        true-value="U"
                        false-value="0"
                        style="font-size: 13px"
                        label="Urbano"
                        @update:model-value="if (this.checkbox.urbano == 'U') {
                          this.checkbox.foraneo = '0';
                          this.checkbox.extra_urbano = '0';
                        };"
                      />
                    </div>

                    <div class="col-md-4 col-xs-4" style="margin-bottom: 6px">
                      <q-checkbox
                        size="lg"
                        v-model="checkbox.extra_urbano"
                        true-value="E"
                        false-value="0"
                        style="font-size: 13px"
                        label="Extra-Urbano"
                        @update:model-value="if (this.checkbox.extra_urbano == 'E') {
                          this.checkbox.foraneo = '0';
                          this.checkbox.urbano = '0';
                        };"
                      />
                    </div>

                    <div
                      class="col-md-4 col-xs-12 items-center"
                      style="align-self: center; text-align: left"
                    >
                      <h4
                        style="
                          font-size: 16px;
                          margin-top: 0px;
                          margin-bottom: 0px;
                        "
                        class="text-secondary"
                      >
                        <strong>Urgencia</strong>
                      </h4>
                    </div>

                    <div class="col-md-4 col-xs-6">
                      <q-checkbox
                        size="lg"
                        v-model="checkbox.normal"
                        true-value="N"
                        false-value="0"
                        style="font-size: 13px"
                        label="Normal"
                        @update:model-value="if (this.checkbox.normal == 'N') {
                          this.checkbox.emergencia = '0';
                        };"
                      />
                    </div>

                    <div class="col-md-4 col-xs-6">
                      <q-checkbox
                        size="lg"
                        v-model="checkbox.emergencia"
                        true-value="E"
                        false-value="0"
                        style="font-size: 13px"
                        label="Emergencia"
                        @update:model-value="if (this.checkbox.emergencia == 'E') {
                          this.checkbox.normal = '0';
                        };"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.cod_agente_venta"
                  label="Recolectado Por:"
                  hint=""
                  class="pcform"
                  :options="agentes"
                  dense
                  lazy-rules
                  option-label="nb_agente"
                  option-value="id"
                >
                </q-select>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.cod_proveedor"
                  label="Proveedor del Transporte"
                  hint=""
                  dense
                  :options="proveedores"
                  option-label="nb_proveedor"
                  option-value="id"
                  class="pcform"
                  lazy-rules
                >
                </q-select>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.dimensiones"
                  label="Dimensiones"
                  dense
                  hint=""
                  class="pcform pcmovil"
                  @update:model-value="
                    formEdit.dimensiones =
                      formEdit.dimensiones.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.desc_contenido"
                  label="Contenido"
                  dense
                  hint=""
                  @update:model-value="
                    formEdit.desc_contenido =
                      formEdit.desc_contenido.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.carga_neta"
                  label="Carga Neta"
                  hint=""
                  dense
                  class="pcform"
                  @update:model-value="
                    formEdit.carga_neta =
                      formEdit.carga_neta.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.valor_declarado_cod"
                  label="COD - Valor Declarado"
                  hint=""
                  dense
                  class="pcform"
                  @update:model-value="
                    formEdit.valor_declarado_cod =
                      formEdit.valor_declarado_cod.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-2 col-xs-7">
                <q-input
                  outlined
                  v-model="formEdit.valor_declarado_seg"
                  label="Seguro"
                  hint=""
                  dense
                  class="pcform pcmovil"
                  @update:model-value="
                    formEdit.valor_declarado_seg =
                      formEdit.valor_declarado_seg.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-1 col-xs-3">
                <q-input
                  outlined
                  v-model="formEdit.porc_apl_seguro"
                  hint=""
                  dense
                  class="pcform pcmovil"
                  @update:model-value="
                    formEdit.porc_apl_seguro =
                      formEdit.porc_apl_seguro.toUpperCase()
                  "
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.cod_agencia_transito"
                  label="Agencia Transito"
                  hint=""
                  :options="agencias"
                  option-label="nb_agencia"
                  option-value="id"
                  dense
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-12 col-xs-12" style="margin-bottom: 20px">
                <q-card
                  class="q-pa-md col-md-12 col-xs-12"
                  bordered
                  style="padding: 5px"
                >
                  <q-card-section style="padding-bottom: 0px">
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
                          <strong>Totales</strong>
                        </h4>
                      </div>
                      <div class="col-md-6 col-xs-12">
                        <q-input
                          outlined
                          v-model="formEdit.monto_subtotal"
                          label="Monto Subtotal"
                          hint=""
                          dense
                          class="pcform"
                          lazy-rules
                        >
                          <template v-slot:prepend>
                            <q-icon name="face" />
                          </template>
                        </q-input>
                      </div>

                      <div class="col-md-6 col-xs-12">
                        <q-input
                          outlined
                          v-model="formEdit.monto_impuesto"
                          label="Monto Impuesto"
                          hint=""
                          dense
                          lazy-rules
                        >
                          <template v-slot:prepend>
                            <q-icon name="face" />
                          </template>
                        </q-input>
                      </div>

                      <div class="col-md-6 col-xs-12">
                        <q-input
                          outlined
                          v-model="formEdit.monto_base"
                          label="Monto Base"
                          hint=""
                          dense
                          class="pcform"
                          lazy-rules
                        >
                          <template v-slot:prepend>
                            <q-icon name="face" />
                          </template>
                        </q-input>
                      </div>

                      <div class="col-md-6 col-xs-12">
                        <q-input
                          outlined
                          v-model="formEdit.monto_total"
                          label="Monto Total"
                          hint=""
                          dense
                          lazy-rules
                        >
                          <template v-slot:prepend>
                            <q-icon name="face" />
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Fecha Llegada Transito"
                  hint=""
                  v-model="formEdit.fecha_llega_transito"
                  mask="date"
                  dense
                  :rules="['date']"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="formEdit.fecha_llega_transito">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div
                class="col-md-2 col-xs-12"
                style="margin-bottom: 20px; padding-right: 10px"
              >
                <q-checkbox
                  size="lg"
                  v-model="formEdit.check_transito"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="PASEO POR TRANSITO"
                />
              </div>

              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.estatus_operativo"
                  label="Estatus Operacional"
                  hint=""
                  class="pcform"
                  :options="estatus_operativo"
                  dense
                  hide-bottom-space
                  lazy-rules
                >
                </q-select>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.estatus_administra"
                  label="Estatus Administrativo"
                  hint=""
                  :options="estatus_administrativo"
                  hide-bottom-space
                  dense
                  lazy-rules
                >
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.monto_ref_cte_sin_imp"
                  label="Monto Referencia Cliente"
                  dense
                  hint=""
                  class="pcform"
                  type="number"
                  @update:model-value="
                    formEdit.monto_ref_cte_sin_imp =
                      formEdit.monto_ref_cte_sin_imp.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.porc_comision"
                  label="% X Zona"
                  hint=""
                  dense
                  class="pcform pcmovil"
                  @update:model-value="
                    formEdit.porc_comision =
                      formEdit.porc_comision.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.porc_descuento"
                  label="% Desc"
                  hint=""
                  dense
                  @update:model-value="
                    formEdit.porc_descuento =
                      formEdit.porc_descuento.toUpperCase()
                  "
                  lazy-rules
                >
                </q-input>
              </div>
              <q-inner-loading :showing="visible">
              <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>
            </div>
          </q-form>
        </div>
      </div>
    </div>

    <q-dialog v-model="clientesDelete">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estas seguro que quieres eliminar este elemento?
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
      ref="desactivateCrud"
      @desactivar-Crud="desactivarCrud"
    ></desactive-crud>
    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Edit="setDataEdit"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import { LocalStorage } from "quasar";

import methodsVue from "src/components/methods.vue";

import desactivateCrudVue from "src/components/desactivateCrud.vue";

export default {
  components: { "desactive-crud": desactivateCrudVue, methods: methodsVue },
  name: "registroServicioCarga",
  data() {
    return {
      columnsConceptos: [
        {
          name: "id",
          label: "Codigo",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "nb_cliente",
          label: "Nombre",
          field: "nb_cliente",
          align: "left",
          sortable: true,
        },
        {
          name: "rif_cedula",
          label: "RIF",
          field: "rif_cedula",
          align: "left",
          sortable: true,
        },
        {
          name: "activo_desc",
          label: "Estatus",
          field: "activo_desc",
          align: "left",
          sortable: true,
        },
        {
          name: "cte_decontado",
          label: "Cliente Particular",
          field: "cte_decontado",
          align: "center",
          sortable: true,
        },
      ],
      form: {
        nro_documento: "",
        t_de_documento: "",
        serie_documento: "",
        fecha_emision: "",
        fecha_envio: "",
        fecha_aplicacion: "",
        nro_piezas: "",
        peso_kgs: "",
        tipo_carga: "",
        modalidad_pago: "",
        pagado_en: "",
        cod_agencia: "",
        cod_cliente_org: "",
        cod_agencia_dest: "",
        cod_cliente_dest: "",
        cod_zona_dest: "",
        tipo_servicio: "",
        tipo_ubicacion: "",
        tipo_urgencia: "",
        cod_agente_venta: "",
        cod_proveedor: "",
        dimensiones: "",
        desc_contenido: "",
        carga_neta: "",
        valor_declarado_cod: "",
        valor_declarado_seg: "",
        porc_apl_seguro: "",
        cod_agencia_transito: "",
        monto_subtotal: "",
        monto_impuesto: "",
        monto_base: "",
        monto_total: "",
        fecha_llega_transito: "",
        check_transito: "",
        estatus_operativo: "",
        estatus_administra: "",
        monto_ref_cte_sin_imp: "",
        porc_comision: "",
        porc_descuento: "",
      },
      formEdit: {
        nro_documento: "",
        t_de_documento: "",
        serie_documento: "",
        fecha_emision: "",
        fecha_envio: "",
        fecha_aplicacion: "",
        nro_piezas: "",
        peso_kgs: "",
        tipo_carga: "",
        modalidad_pago: "",
        pagado_en: "",
        cod_agencia: "",
        cod_cliente_org: "",
        cod_agencia_dest: "",
        cod_cliente_dest: "",
        cod_zona_dest: "",
        tipo_servicio: "",
        tipo_ubicacion: "",
        tipo_urgencia: "",
        cod_agente_venta: "",
        cod_proveedor: "",
        dimensiones: "",
        desc_contenido: "",
        carga_neta: "",
        valor_declarado_cod: "",
        valor_declarado_seg: "",
        porc_apl_seguro: "",
        cod_agencia_transito: "",
        monto_subtotal: "",
        monto_impuesto: "",
        monto_base: "",
        monto_total: "",
        fecha_llega_transito: "",
        check_transito: "",
        estatus_operativo: "",
        estatus_administra: "",
        monto_ref_cte_sin_imp: "",
        porc_comision: "",
        porc_descuento: "",
        id: ""
      },
      checkbox: {
        guia_factura: "0",
        guia_carga: "0",
        paquetes: "0",
        sobres: "0",
        nacional: "0",
        internacional: "0",
        foraneo: "0",
        urbano: "0",
        extra_urbano: "0",
        normal: "0",
        emergencia: "0",
      },
      agencias: [],
      agencias_origen: [],
      clientes_origen: [],
      clientes_destino: [],
      zonas_destino: [],
      agentes: [],
      proveedores: [],
      estatus_operativo: [
        { label: "EN PROCESO DE ENVIÓ", value: "PR" },
        { label: "PENDIENTE POR ENTREGAR", value: "PE" },
        { label: "ENTREGA CONFORME", value: "CO" },
        { label: "ENTREGA NO CONFORME", value: "NC" },
      ],
      estatus_administrativo: [
        { label: "EN ELABORACIÓN", value: "E" },
        { label: "PENDIENTE POR FACTURAR", value: "F" },
        { label: "CON FACTURA GENERADA", value: "G" },
        { label: "ANULADA", value: "A" },
      ],
      pagado_en: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      modalidad_pago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
        { label: "PREPAGADA", value: "PP" },
      ],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: ``,
          nro_documento: ``,
          agencia: ``,
        },
      },
    };
  },
  setup() {
    const visible = ref(false)
    const showSimulatedReturnData = ref(false)
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
      visible,
      showSimulatedReturnData,
      showTextLoading () {
        visible.value = true
        showSimulatedReturnData.value = false

        setTimeout(() => {
          visible.value = false
          showSimulatedReturnData.value = true
        }, 8000)
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      paginationConceptos: ref({
        rowsPerPage: 4,
      }),
      separator: ref("vertical"),
      loading: ref(false),
      clientesDelete: ref(false),
      conceptosBox: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.$refs.desactivateCrud.desactivarCrud(
      "c_roles",
      "r_roles",
      "u_roles",
      "d_roles",
      "desactivarCrud"
    );
  },
  methods: {
    // Reglas
    reglasSelect(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasNotNull11(val) {
      if ((val !== null) !== "") {
        if (val.length < 3) {
          return "Deben ser minimo 3 caracteres";
        }
        if (val.length > 99999999999) {
          return "Deben ser Maximo 11 caracteres";
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
    pushToWindow(pagina) {
      let route = this.$router.resolve({ path: pagina });
      window.open(route.href);
    },
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    setData(res, dataRes) {
      this[dataRes] = res;
      this.axiosConfig.headers.agencia = ""
      this.axiosConfig.headers.nro_documento = ""
    },
    setDataEdit(res, dataRes) {
      this.resetFormEdit()
      console.log(res)
      this.axiosConfig.headers.agencia = ""
      this.axiosConfig.headers.nro_documento = ""

      if (res.t_de_documento == "GF") {
        this.checkbox.guia_factura = "GF"
      }
      if (res.t_de_documento == 'GC') {
        this.checkbox.guia_carga = "GC"
      }

      this[dataRes].serie_documento = res.serie_documento;
      this[dataRes].fecha_emision = res.fecha_emision;
      this[dataRes].fecha_envio = res.fecha_envio;
      this[dataRes].fecha_aplicacion = res.fecha_aplicacion;
      this[dataRes].nro_piezas = res.nro_piezas;
      this[dataRes].peso_kgs = res.peso_kgs;

      if (res.tipo_carga == "PM") {
        this.checkbox.paquetes = "PM"
      }
      if (res.tipo_carga == "SB") {
        this.checkbox.sobres = "SB"
      }

      this[dataRes].modalidad_pago = res.modalidad_pago;
      this[dataRes].pagado_en = res.pagado_en;

      this.$refs.methods.getData(`/agencias`, 'setData', 'agencias', this.axiosConfig);

      var cod_agencia = res.cod_agencia;
      if (cod_agencia) {
        api.get(`/agencias/${cod_agencia}`, this.axiosConfig).then((res) => {
          this.formEdit.cod_agencia = res.data.nb_agencia;
        });

        this.$refs.methods.getData(`/clientes`, 'setData', 'clientes_origen', this.axiosConfig);
      }

      var cod_cliente_org = res.cod_cliente_org;
      if (cod_cliente_org) {
        api.get(`/clientes/${cod_cliente_org}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_cliente_org = res.data.nb_cliente;
        });
      }

      var cod_agencia_dest = res.cod_agencia_dest
      if (cod_agencia_dest) {
        api.get(`/agencias/${cod_agencia_dest}`, this.axiosConfig).then((res) => {
          this.formEdit.cod_agencia_dest = res.data;
        });

        this.axiosConfig.headers.agencia = cod_agencia_dest
      
        this.$refs.methods.getData(`/clientes`, 'setData', 'clientes_destino', this.axiosConfig);
        this.$refs.methods.getData(`/zonas`, 'setData', 'zonas_destino', this.axiosConfig);
      }

      var cod_cliente_dest = res.cod_cliente_dest;
      if (cod_cliente_dest) {
        api.get(`/clientes/${cod_cliente_dest}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_cliente_dest = res.data;
        });
      }

      var cod_zona_dest = res.cod_zona_dest;
      if (cod_zona_dest) {
        api.get(`/zonas/${cod_zona_dest}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_zona_dest = res.data;
      });
      };

      if (res.tipo_servicio == "N") {
        this.checkbox.nacional = "N"
      };
      if (res.tipo_servicio == "I") {
        this.checkbox.internacional = "I"
      };
      if (res.tipo_ubicacion == "U") {
        this.checkbox.urbano = "U"
      };
      if (res.tipo_ubicacion == "E") {
        this.checkbox.extra_urbano = "E"
      };
      if (res.tipo_ubicacion == "F") {
        this.checkbox.foraneo = "F"
      };
      if (res.tipo_urgencia == "N") {
        this.checkbox.normal = "N"
      };
      if (res.tipo_urgencia == "E") {
        this.checkbox.emergencia = "E"
      };

      var cod_agente_venta = res.cod_agente_venta;
      if (cod_agente_venta) {
        api.get(`/agentes/${cod_agente_venta}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_agente_venta = res.data.nb_agente;
        });
      }

      var cod_proveedor = res.cod_proveedor;
      if (cod_proveedor) {
        api.get(`/proveedores/${cod_proveedor}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_proveedor = res.data.nb_proveedor;
        });
      }

      this[dataRes].dimensiones = res.dimensiones;
      this[dataRes].desc_contenido = res.desc_contenido;
      this[dataRes].carga_neta = res.carga_neta;
      this[dataRes].valor_declarado_cod = res.valor_declarado_cod;
      this[dataRes].valor_declarado_seg = res.valor_declarado_seg;
      this[dataRes].porc_apl_seguro = res.porc_apl_seguro;

      var cod_agencia_transito = res.cod_agencia_transito;
      if (cod_agencia_transito) {
        api.get(`/agencias/${cod_agencia_transito}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_agencia_transito = res.data.nb_agencia;
        });
      }

      this[dataRes].monto_subtotal = res.monto_subtotal;
      this[dataRes].monto_impuesto = res.monto_impuesto;
      this[dataRes].monto_base = res.monto_base;
      this[dataRes].monto_total = res.monto_total;
      this[dataRes].fecha_llega_transito = res.fecha_llega_transito;
      this[dataRes].check_transito = res.check_transito;
      this[dataRes].estatus_operativo = res.estatus_operativo;
      this[dataRes].monto_ref_cte_sin_imp = res.monto_ref_cte_sin_imp;
      this[dataRes].estatus_administra = res.estatus_administra;
      this[dataRes].porc_comision = res.porc_comision;
      this[dataRes].porc_descuento = res.porc_descuento;
      this.hideTextLoading()
    },
    putData() {
      if (this.checkbox.guia_factura == "GF") {
        this.formEdit.t_de_documento = "GF"
      }
      if (this.checkbox.guia_carga == "GC") {
        this.formEdit.t_de_documento = "GC"
      }
      if (this.checkbox.paquetes == "PM") {
        this.formEdit.tipo_carga = "PM"
      }
      if (this.checkbox.sobres == "SB") {
        this.formEdit.tipo_carga
      }
      if (this.checkbox.nacional == "N") {
        this.formEdit.tipo_servicio = "N"
      };
      if (this.checkbox.internacional == "I") {
        this.formEdit.tipo_servicio = "I"
      };
      if (this.checkbox.urbano == "U") {
        this.formEdit.tipo_ubicacion = "U"
      };
      if (this.checkbox.extra_urbano == "E") {
        this.formEdit.tipo_ubicacion = "E"
      };
      if (this.checkbox.foraneo == "F") {
        this.formEdit.tipo_ubicacion = "F"
      };
      if (this.checkbox.normal == "N") {
        this.formEdit.tipo_urgencia = "N"
      };
      if (this.checkbox.emergencia == "E") {
        this.formEdit.tipo_urgencia = "E"
      };
      if (this.formEdit.modalidad_pago) {
        this.formEdit.modalidad_pago = this.formEdit.modalidad_pago.value
      };
      if (this.formEdit.pagado_en.value) {
        this.formEdit.pagado_en = this.formEdit.pagado_en.value
      };
      if (this.formEdit.cod_agencia.id) {
        this.formEdit.cod_agencia = this.formEdit.cod_agencia.id
      } else {this.formEdit.cod_agencia = ""};
      if (this.formEdit.cod_cliente_org.id) {
        this.formEdit.cod_cliente_org = this.formEdit.cod_cliente_org.id
      } else {this.formEdit.cod_cliente_org = ""};
      if (this.formEdit.cod_agencia_dest.id) {
        this.formEdit.cod_agencia_dest = this.formEdit.cod_agencia_dest.id
      } else {this.formEdit.cod_agencia_dest = ""};
      if (this.formEdit.cod_cliente_dest.id) {
        this.formEdit.cod_cliente_dest = this.formEdit.cod_cliente_dest.id
      } else {this.formEdit.cod_cliente_dest = ""};
      if (this.formEdit.cod_zona_dest.id) {
        this.formEdit.cod_zona_dest = this.formEdit.cod_zona_dest.id
      } else {this.formEdit.cod_zona_dest = ""};
      if (this.formEdit.cod_agente_venta.id) {
        this.formEdit.cod_agente_venta = this.formEdit.cod_agente_venta.id
      } else {this.formEdit.cod_agente_venta = ""};
      if (this.formEdit.cod_proveedor.id) {
        this.formEdit.cod_proveedor = this.formEdit.cod_proveedor.id
      } else {this.formEdit.cod_proveedor = ""};
      if (this.formEdit.cod_agencia_transito.id) {
        this.formEdit.cod_agencia_transito = this.formEdit.cod_agencia_transito.id
      } else {this.formEdit.cod_agencia_transito = ""};
      if (this.formEdit.estatus_operativo) {
        this.formEdit.estatus_operativo = this.formEdit.estatus_operativo.value
      };
      if (this.formEdit.estatus_administra) {
        this.formEdit.estatus_administra = this.formEdit.estatus_administra.value
      };
      this.$refs.methods.putData(
        `/mmovimientos/${this.formEdit.id}`,
        this.formEdit,
        "getData",
        this.axiosConfig
      );
      this.resetFormEdit()
    },
    resetFormEdit() {
        (this.formEdit.t_de_documento = ""),
        (this.formEdit.serie_documento = ""),
        (this.formEdit.fecha_emision = ""),
        (this.formEdit.fecha_envio = ""),
        (this.formEdit.fecha_aplicacion = ""),
        (this.formEdit.nro_piezas = ""),
        (this.formEdit.peso_kgs = ""),
        (this.formEdit.tipo_carga = ""),
        (this.formEdit.modalidad_pago = ""),
        (this.formEdit.pagado_en = ""),
        (this.formEdit.cod_agencia = ""),
        (this.formEdit.cod_cliente_org = ""),
        (this.formEdit.cod_agencia_dest = ""),
        (this.formEdit.cod_cliente_dest = ""),
        (this.formEdit.cod_zona_dest = ""),
        (this.formEdit.tipo_servicio = ""),
        (this.formEdit.tipo_ubicacion = ""),
        (this.formEdit.tipo_urgencia = ""),
        (this.formEdit.cod_agente_venta = ""),
        (this.formEdit.cod_proveedor = ""),
        (this.formEdit.dimensiones = ""),
        (this.formEdit.desc_contenido = ""),
        (this.formEdit.carga_neta = ""),
        (this.formEdit.valor_declarado_cod = ""),
        (this.formEdit.valor_declarado_seg = ""),
        (this.formEdit.porc_apl_seguro = ""),
        (this.formEdit.cod_agencia_transito = ""),
        (this.formEdit.monto_subtotal = ""),
        (this.formEdit.monto_impuesto = ""),
        (this.formEdit.monto_base = ""),
        (this.formEdit.monto_total = ""),
        (this.formEdit.fecha_llega_transito = ""),
        (this.formEdit.check_transito = ""),
        (this.formEdit.estatus_operativo = ""),
        (this.formEdit.estatus_administra = ""),
        (this.formEdit.monto_ref_cte_sin_imp = ""),
        (this.formEdit.porc_comision = ""),
        (this.formEdit.porc_descuento = ""),
        (this.checkbox.guia_factura = "0"),
        (this.checkbox.guia_carga = "0"),
        (this.checkbox.paquetes = "0"),
        (this.checkbox.sobres = "0"),
        (this.checkbox.nacional = "0"),
        (this.checkbox.internacional = "0"),
        (this.checkbox.foraneo = "0"),
        (this.checkbox.urbano = "0"),
        (this.checkbox.extra_urbano = "0"),
        (this.checkbox.normal = "0"),
        (this.checkbox.emergencia = "0"),
        (this.formEdit.id = ""),
        (this.agencias = []),
        (this.agencias_origen = []),
        (this.clientes_origen = []),
        (this.clientes_destino = []),
        (this.zonas_destino = []),
        (this.conceptos = [])
    },
  },
};
</script>

<style>
@media screen and (min-width: 1024px) {
  .inputMenuGuias {
    margin-right: 20px;
  }
}
@media screen and (min-width: 1024px) {
  .cardForm {
    margin-right: 70px;
  }
}
@media screen and (min-width: 1024px) {
  .checkboxForaneo {
    padding-left: 6px;
  }
}
@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 30px;
  }
}
@media screen and (max-width: 600px) {
  .selectmovil {
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 600px) {
  .selectmovil2 {
    margin-bottom: 20px;
  }
}
@media screen and (min-width: 600px) {
  .btnCard {
    margin-right: 25px;
    align-self: center;
    text-align: center;
  }
}
@media screen and (max-width: 600px) {
  .btnCard {
    margin-left: 25px;
  }
}
@media screen and (min-width: 1024px) {
  .cardMenus {
    width: 96%;
  }
}
@media screen and (min-width: 600px) {
  .selectmovil {
    margin-right: 20px;
  }
}
@media screen and (min-width: 600px) {
  .selectmovil2 {
    margin-right: 35px;
  }
}
@media screen and (min-width: 1200px) {
  .separationMobile {
    margin-left: 10px;
  }
}
@media screen and (max-width: 1024px) {
  .espaciadoGuias {
    margin-top: 20px;
  }
}
@media screen and (max-width: 600px) {
  .titleMenu {
    margin-top: 15px;
  }
}
@media screen and (max-width: 1024px) {
  .inputMovil {
    margin-top: 25px;
  }
}
</style>
