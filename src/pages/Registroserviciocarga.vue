<template>
  <q-page class="pagina q-pa-md" style="padding-buttom: 10px">
    <q-page-sticky
      position="bottom-right"
      class="z-top"
      style="margin-right: 20px; margin-bottom: 20px"
    >
      <q-fab icon="add" direction="up" color="primary">
        <q-fab-action color="primary" icon="person_add" class="z-top" />
        <q-fab-action color="primary" icon="mail" class="z-top" />
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
          <q-form @submit="createDataClientes()">
            <div
              class="row justify-center items-center"
              style="margin-top: 20px"
            >
              <div class="col-md-4 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.id"
                  label="NRO. Guía"
                  hint=""
                  class="pcform pcmovil"
                  dense
                  type="number"
                  hide-bottom-space
                  @keydown.enter="
                  getData(`/mmovimientos/${this.formEdit.id}`, 'setDataEdit', 'formEdit');"
                  @keydown.tab="
                  getData(`/mmovimientos/${this.formEdit.id}`, 'setDataEdit', 'formEdit');"
                  @blur="
                  getData(`/mmovimientos/${this.formEdit.id}`, 'setDataEdit', 'formEdit');"
                  lazy-rules
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
                  v-model="formEdit.t_de_documento"
                  true-value="GF"
                  style="font-size: 13px"
                  label="Guía Factura"
                />
              </div>

              <div class="col-md-2 col-xs-6" style="margin-bottom: 20px">
                <q-checkbox
                  size="lg"
                  v-model="formEdit.t_de_documento"
                  true-value="GC"
                  style="font-size: 13px"
                  label="Guía Carga"
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
                      v-model="form.fecha_envio"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.fecha_envio">
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
                      v-model="form.fecha_aplicacion"
                      mask="date"
                      :rules="['date']"
                      lazy-rules
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="form.fecha_aplicacion">
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
                          :rules="[reglasInputs]"
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
                          :rules="[reglasInputs]"
                          lazy-rules
                        >
                        </q-input>
                      </div>

                      <div class="col-md-6 col-xs-6">
                        <q-checkbox
                          size="lg"
                          v-model="formEdit.tipo_carga"
                          true-value="PM"
                          style="font-size: 13px"
                          label="Paquetes"
                        />
                      </div>

                      <div class="col-md-6 col-xs-6">
                        <q-checkbox
                          size="lg"
                          v-model="formEdit.tipo_carga"
                          true-value="SB"
                          style="font-size: 13px"
                          label="Sobres"
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
                          dense
                          :rules="[reglasInputs]"
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
                          :rules="[reglasInputs]"
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
                          :rules="[reglasInputs]"
                          :options="agencias"
                          lazy-rules
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
                          :rules="[reglasInputs]"
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
                          :rules="[reglasInputs]"
                          :options="agencias"
                          lazy-rules
                          option-label="nb_agencia"
                          option-value="id"
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
                          :rules="[reglasInputs]"
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
                          @click="
                          this.axiosConfig.headers.agencia = this.formEdit.cod_zona_dest.value;
                          getData(`/zonas`, 'setData', 'zonas_destino');
                          "
                          :rules="[reglasInputs]"
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
                  style="padding-top: 15px; padding-bottom: 10px"
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
                        v-model="formEdit.nro_documento"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="Nacional"
                      />
                    </div>

                    <div class="col-md-4 col-xs-6" style="margin-bottom: 6px">
                      <q-checkbox
                        size="lg"
                        v-model="formEdit.nro_documento"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="Internacional"
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
                        <strong>Ubicación</strong>
                      </h4>
                    </div>

                    <div class="col-md-4 col-xs-6" style="margin-bottom: 6px">
                      <q-checkbox
                        size="lg"
                        v-model="formEdit.nro_documento"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="Urbano"
                      />
                    </div>

                    <div class="col-md-4 col-xs-6" style="margin-bottom: 6px">
                      <q-checkbox
                        size="lg"
                        v-model="formEdit.nro_documento"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="Extra-Urbano"
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
                        v-model="formEdit.nro_documento"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="Normal"
                      />
                    </div>

                    <div class="col-md-4 col-xs-6">
                      <q-checkbox
                        size="lg"
                        v-model="formEdit.nro_documento"
                        true-value="1"
                        false-value="0"
                        style="font-size: 13px"
                        label="Emergencia"
                      />
                    </div>
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Recolectado Por:"
                  hint=""
                  class="pcform"
                  dense
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Proveedor del Transporte"
                  hint=""
                  dense
                  class="pcform"
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Dimensiones"
                  dense
                  hint=""
                  class="pcform pcmovil"
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Contenido"
                  dense
                  hint=""
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Carga Neta"
                  hint=""
                  dense
                  class="pcform"
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="COD - Valor Declarado"
                  hint=""
                  dense
                  class="pcform"
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>

              <div class="col-md-2 col-xs-7">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Seguro"
                  hint=""
                  dense
                  class="pcform pcmovil"
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>

              <div class="col-md-1 col-xs-3">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  hint=""
                  dense
                  class="pcform pcmovil"
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="percent" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Agencia Transito"
                  hint=""
                  dense
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
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
                          v-model="formEdit.nro_documento"
                          label="Monto Subtotal"
                          hint=""
                          dense
                          class="pcform"
                          :rules="[reglasInputs]"
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
                          v-model="formEdit.nro_documento"
                          label="Monto Impuesto"
                          hint=""
                          dense
                          :rules="[reglasInputs]"
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
                          v-model="formEdit.nro_documento"
                          label="Monto Base"
                          hint=""
                          dense
                          class="pcform"
                          :rules="[reglasInputs]"
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
                          v-model="formEdit.nro_documento"
                          label="Monto Total"
                          hint=""
                          dense
                          :rules="[reglasInputs]"
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
                  v-model="formEdit.nro_documento"
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
                        <q-date v-model="formEdit.nro_documento">
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
                  v-model="formEdit.nro_documento"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="PASEO POR TRANSITO"
                />
              </div>

              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Estatus Operacional"
                  hint=""
                  class="pcform"
                  dense
                  hide-bottom-space
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-select>
              </div>

              <div class="col-md-3 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Estatus Administrativo"
                  hint=""
                  hide-bottom-space
                  dense
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="Monto Referencia Cliente"
                  dense
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="% X Zona"
                  hint=""
                  dense
                  class="pcform pcmovil"
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>

              <div class="col-md-3 col-xs-6">
                <q-input
                  outlined
                  v-model="formEdit.nro_documento"
                  label="% Desc"
                  hint=""
                  dense
                  @update:model-value="
                    formEdit.nro_documento =
                      formEdit.nro_documento.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                </q-input>
              </div>
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
      @get-data="
        this.axiosConfig.headers.agencia = this.selectedAgencia.id;
        getData(`/clientes`, 'setDataClientes', 'clientes');
      "
      @reset-Loading="resetLoading"
      @set-Data="setData"
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
  name: "Clientes",
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
        nro_documento: 0,
        t_de_documento: "",
        serie_documento: 0,
        fecha_emision: "",
        fecha_envio: "",
        fecha_aplicacion: "",
        nro_piezas: 0,
        peso_kgs: 0,
        tipo_carga: "",
        modalidad_pago: "",
        pagado_en: "",
        cod_agencia: 0,
        cod_cliente_org: 0,
        cod_agencia_dest: 0,
        cod_cliente_dest: 0,
        cod_zona_dest: 0,
        tipo_servicio: "",
        tipo_ubicacion: "",
        tipo_urgencia: "",
        cod_agente_venta: 0,
        cod_proveedor: 0,
        dimensiones: "",
        desc_contenido: "",
        carga_neta: 0,
        valor_declarado_cod: 0,
        valor_declarado_seg: 0,
        porc_apl_seguro: 0,
        cod_agencia_transito: 0,
        monto_subtotal: 0,
        monto_impuesto: 0,
        monto_base: 0,
        monto_total: 0,
        fecha_llega_transito: "",
        check_transito: 0,
        estatus_operativo: "",
        estatus_administra: "",
        monto_ref_cte_sin_imp: 0,
        porc_comision: 0,
        porc_descuento: 0,
      },
      formEdit: {
        nro_documento: 0,
        t_de_documento: "",
        serie_documento: 0,
        fecha_emision: "",
        fecha_envio: "",
        fecha_aplicacion: "",
        nro_piezas: 0,
        peso_kgs: 0,
        tipo_carga: "",
        modalidad_pago: "",
        pagado_en: "",
        cod_agencia: 0,
        cod_cliente_org: 0,
        cod_agencia_dest: 0,
        cod_cliente_dest: 0,
        cod_zona_dest: 0,
        tipo_servicio: "",
        tipo_ubicacion: "",
        tipo_urgencia: "",
        cod_agente_venta: 0,
        cod_proveedor: 0,
        dimensiones: "",
        desc_contenido: "",
        carga_neta: 0,
        valor_declarado_cod: 0,
        valor_declarado_seg: 0,
        porc_apl_seguro: 0,
        cod_agencia_transito: 0,
        monto_subtotal: 0,
        monto_impuesto: 0,
        monto_base: 0,
        monto_total: 0,
        fecha_llega_transito: "",
        check_transito: 0,
        estatus_operativo: "",
        estatus_administra: "",
        monto_ref_cte_sin_imp: 0,
        porc_comision: 0,
        porc_descuento: 0,
        id: ""
      },
      pais: "",
      estado: "",
      ciudad: "",
      location_input: "",
      agencias: [],
      agencias_origen: [],
      clientes_origen: [],
      clientes_destino: [],
      zonas_destino: [],
      conceptos: [],
      selected: [],
      selectedAgencia: [],
      pagado_en: [
        { label: "ORIGEN", value: "O" },
        { label: "DESTINO", value: "D" },
      ],
      modalidad_pago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
        { label: "PREPAGADA", value: "PP" },
      ],
      estatus: [
        { label: "ACTIVO", value: "1" },
        { label: "INACTIVO", value: "0" },
      ],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: ``,
          agencia: "",
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
      clienteParticularExistente() {
        $q.notify({
          message: "Solo puede haber un Cliente Particular por Agencia",
          color: "red",
        });
      },
    };
  },
  mounted() {
    this.$refs.methods.getData(
      "/agencias",
      "setDataIniciar",
      "agencias",
      this.axiosConfig
    );
    this.$refs.desactivateCrud.desactivarCrud(
      "c_roles",
      "r_roles",
      "u_roles",
      "d_roles",
      "desactivarCrud"
    );
  },
  methods: {
    resetLoading() {
      this.loading = false;
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
      this.loading = true;
    },
    setDataIniciar(res, dataRes) {
      this[dataRes] = res;
      this.getDataIniciar();
      this.loading = false;
    },
    setData(res, dataRes) {
      this[dataRes] = res;
      this.axiosConfig.headers.agencia = ""
    },
    setDataEdit(res, dataRes) {
      console.log('activado')
      this[dataRes].t_de_documento = res.t_de_documento;
      this[dataRes].serie_documento = res.serie_documento;
      this[dataRes].fecha_emision = res.fecha_emision;
      this[dataRes].fecha_envio = res.fecha_envio;
      this[dataRes].fecha_aplicacion = res.fecha_aplicacion;
      this[dataRes].nro_piezas = res.nro_piezas;
      this[dataRes].peso_kgs = res.peso_kgs;
      this[dataRes].tipo_carga = res.tipo_carga;
      this[dataRes].modalidad_pago = res.modalidad_pago;
      this[dataRes].pagado_en = res.pagado_en;

      var cod_agencia = res.cod_agencia;

      api.get(`/agencias/${cod_agencia}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_agencia = res.data.nb_agencia;
      });

      getData(`/agencias`, 'setData', 'agencias');


      var cod_cliente_org = res.cod_cliente_org;

      api.get(`/clientes/${cod_cliente_org}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_cliente_org = res.data.nb_cliente;
      });

      this.axiosConfig.headers.agencia = cod_agencia
      
      getData(`/clientes`, 'setData', 'clientes_origen');


      var cod_agencia_dest = res.cod_agencia_dest;

      api.get(`/agencias/${cod_agencia_dest}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_agencia_dest = res.data;
      });


      var cod_cliente_dest = res.cod_cliente_dest;

      api.get(`/clientes/${cod_cliente_dest}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_cliente_dest = res.data;
      });

      this.axiosConfig.headers.agencia = cod_agencia_dest
      
      getData(`/clientes`, 'setData', 'clientes_destino');


      var cod_zona_dest = res.cod_zona_dest;

      api.get(`/zonas/${cod_zona_dest}`, this.axiosConfig).then((res) => {
            this.formEdit.cod_zona_dest = res.data;
      });

      this[dataRes].tipo_servicio = res.tipo_servicio;
      this[dataRes].tipo_ubicacion = res.tipo_ubicacion;
      this[dataRes].tipo_urgencia = res.tipo_urgencia;
      this[dataRes].cod_agente_venta = res.cod_agente_venta;
      this[dataRes].cod_proveedor = res.cod_proveedor;
      this[dataRes].dimensiones = res.dimensiones;
      this[dataRes].desc_contenido = res.desc_contenido;
      this[dataRes].carga_neta = res.carga_neta;
      this[dataRes].valor_declarado_cod = res.valor_declarado_cod;
      this[dataRes].valor_declarado_seg = res.valor_declarado_seg;
      this[dataRes].porc_apl_seguro = res.porc_apl_seguro;
      this[dataRes].cod_agencia_transito = res.cod_agencia_transito;
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
