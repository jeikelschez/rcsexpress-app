<template>
    <q-page class="pagina q-pa-md">
      <q-dialog v-model="form">
        <q-card class="q-pa-md" bordered style="width: 1400px; max-width: 200vw">
          <q-card-section>
            <q-form @submit="createDataClientes()">
              <div class="row">
                <div class="col-md-6 col-xs-12">
                  <q-input
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Cliente Origen"
                    hint=""
                    class="pcform"
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </div>
  
                <div class="col-md-6 col-xs-12">
                  <q-input
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Cliente Destino"
                    hint=""
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </div>
  
                <div class="col-md-6 col-xs-12">
                  <q-input
                    outlined
                    label="Fecha Emision"
                    hint=""
                    v-model="form.f_val"
                    mask="date"
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
                          <q-date v-model="form.f_val">
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
  
                <div class="col-md-6 col-xs-12">
                  <q-input
                    outlined
                    label="Fecha Envio"
                    hint=""
                    v-model="form.f_val"
                    mask="date"
                    :rules="['date']"
                    lazy-rules
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date v-model="form.f_val">
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
  
                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="NRO. Guía"
                    hint=""
                    class="pcform"
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </div>
  
                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Forma de Pago"
                    hint=""
                    class="pcform"
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </div>
  
                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Pagado En"
                    hint=""
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </div>
  
                <div class="col-md-5 col-xs-12">
                  <q-select
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Estatus"
                    hint=""
                    class="pcform"
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-select>
                </div>
  
                <div class="col-md-5 col-xs-12">
                  <q-input
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Persona que Recibió"
                    hint=""
                    class="pcform"
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </div>
  
                <div class="col-md-2 col-xs-12" style="margin-bottom: 20px">
                  <q-checkbox
                    size="lg"
                    v-model="formClientes.cte_decontado"
                    true-value="1"
                    false-value="0"
                    style="font-size: 13px"
                    label="Check Pagado"
                  />
                </div>
  
                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Identificación"
                    hint=""
                    class="pcform"
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </div>
  
                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    label="Fecha Entrega"
                    hint=""
                    v-model="form.f_val"
                    mask="date"
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
                          <q-date v-model="form.f_val">
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
  
                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    label="Hora Entrega"
                    hint=""
                    v-model="form.f_val"
                    mask="time"
                    :rules="['time']"
                    lazy-rules
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="form.f_val">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
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
  
                <div class="col-md-4 col-xs-12 inputMovil">
                  <q-select
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Agente Entrega"
                    hint=""
                    hide-bottom-space
                    class="pcform"
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-select>
                </div>
  
                <div class="col-md-3 col-xs-12 inputMovil">
                  <q-input
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Dias de Entrega"
                    hint=""
                    hide-bottom-space
                    class="pcform"
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </div>
  
                <div class="col-md-4 col-xs-10 inputMovil">
                  <q-select
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Motivo de Retraso en Entrega"
                    hint=""
                    class="pcform"
                    hide-bottom-space
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-select>
                </div>
  
                <div
                  class="col-md-1 col-xs-1 inputMovilBtn"
                  style="text-align: center; align-self: center"
                >
                  <q-btn
                    dense
                    color="primary"
                    round
                    href="/conceptosoperacion"
                    target="_blank"
                    padding="sm"
                  >
                    <q-icon size="25px" name="book" color="white"> </q-icon>
                    <q-tooltip
                      class="bg-primary"
                      style="max-height: 30px"
                      transition-show="scale"
                      transition-hide="scale"
                      color="primary"
                      >Ver Mas</q-tooltip
                    >
                  </q-btn>
                </div>
  
                <div class="col-md-4 col-xs-12">
                  <q-select
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Agencia Transito"
                    hint=""
                    class="pcform"
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-select>
                </div>
  
                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    label="Fecha Llegada Transito"
                    hint=""
                    v-model="form.f_val"
                    mask="time"
                    class="pcform"
                    :rules="['time']"
                    lazy-rules
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="form.f_val">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
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
  
                <div class="col-md-4 col-xs-12">
                  <q-input
                    outlined
                    label="Fecha Salida Transito"
                    hint=""
                    v-model="form.f_val"
                    mask="time"
                    :rules="['time']"
                    lazy-rules
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="form.f_val">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
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
  
                <div class="col-md-12 col-xs-12">
                  <q-input
                    outlined
                    v-model="formClientes.nb_cliente"
                    label="Observaciones de Prueba de Entrega"
                    hint=""
                    @update:model-value="
                      formClientes.nb_cliente =
                        formClientes.nb_cliente.toUpperCase()
                    "
                    lazy-rules
                    :rules="[reglasNotNull100]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="badge" />
                    </template>
                  </q-input>
                </div>
              </div>
  
              <div
                class="row justify-center items-center content-center"
                style="margin-bottom: 6px"
              >
                <q-btn
                  label="Añadir Prueba de Entrega"
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
  
      <div class="q-pa-sm justify-center">
        <div
          class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        >
          <div class="col-md-3 col-xl-2 col-lg-2 col-xs-12 col-sm-12 movilTitle"
            style="align-self: center; text-align: center"
          >
            <p style="font-size: 20px" class="text-secondary">
              <strong>MANTENIMIENTO - EMITIR CARTA A CLIENTES</strong>
            </p>
          </div>
          <div class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
              label="Agencia"
              @update:model-value="
                this.selectedCliente = [];
                this.selectedAgente = [];
                getDataTable();
                this.$refs.methods.getData(`/agentes`, 'setData', 'agentes', {
                  headers: {
                    agencia: this.selectedAgencia.id,
                  },
                });
                this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
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
          <div class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
              label="Cliente"
              @update:model-value="
                this.selectedCliente = [];
                this.selectedAgente = [];
                getDataTable();
                this.$refs.methods.getData(`/agentes`, 'setData', 'agentes', {
                  headers: {
                    agencia: this.selectedAgencia.id,
                  },
                });
                this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
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
          <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center"
          >
            <q-input
              rounded
              dense
              v-model="selectedAgencia"
              outlined
              standout
              label="Contacto"
              >
            </q-input>
          </div>
          <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin"
            style="align-self: center; text-align: center"
          >
            <q-input
              rounded
              dense
              v-model="selectedAgencia"
              outlined
              standout
              label="Cargo"
              >
            </q-input>
          </div>
        </div>
        <div
          class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
          style="align-self: center; text-align: center; margin-top: -10px"
        >     
          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center"
          >
            <q-input
                      outlined
                      label="Desde"
                      hint=""
                      dense
                      rounded
                      style="padding-bottom:0px"
                      v-model="form.fecha_asignacion"
                      lazy-rules
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
                              style="padding-bottom:0px"
                              @update:model-value="this.$refs.qDateProxy.hide()"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
            </q-input>
          </div>
          <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile2"
            style="align-self: center; text-align: center"
          >
            <q-input
                      outlined
                      label="Hasta"
                      hint=""
                      dense
                      rounded
                      style="padding-bottom:0px"
                      v-model="form.fecha_asignacion"
                      lazy-rules
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
                              style="padding-bottom:0px"
                              @update:model-value="this.$refs.qDateProxy.hide()"
                            ></q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
            </q-input>
          </div>
          <div class="col-md-1 col-xl-1 col-lg-1 col-xs-3 col-sm-3 selectMobile2"
            style="align-self: center; text-align: center; margin-right:15px"
          >
            <q-field
              hide-bottom-space
              borderless
              @update:model-value="
                this.axiosConfig.headers.tipo_guia_carga =
                  this.selectedGuiaCarga.value;
                getData(`/cguias`, 'setData', 'datos');
              "
              dense
              style="padding-left:0px"
              v-model="selectedGuiaCarga"
            >
              <template v-slot:control>
                <q-checkbox
                  size="md"
                  v-model="selectedGuiaCarga"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="Clientes"
                />
              </template>
            </q-field>
          </div>
          <div class="col-md-1 col-xl-1 col-lg-1 col-xs-3 col-sm-3 selectMobile2"
            style="align-self: center; text-align: center; margin-right:30px"
          >
            <q-field
              hide-bottom-space
              borderless
              @update:model-value="
                this.axiosConfig.headers.tipo_guia_carga =
                  this.selectedGuiaCarga.value;
                getData(`/cguias`, 'setData', 'datos');
              "
              dense
              style="padding-left:0px"
              v-model="selectedGuiaCarga"
            >
              <template v-slot:control>
                <q-checkbox
                  size="md"
                  v-model="selectedGuiaCarga"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px;"
                  label="Particulares"
                />
              </template>
            </q-field>
          </div>
          <div class="col-md-1 col-xl-1 col-lg-1 col-xs-3 col-sm-3 selectMobile2"
            style="align-self: center; text-align: center"
          >
            <q-field
              hide-bottom-space
              borderless
              @update:model-value="
                this.axiosConfig.headers.tipo_guia_carga =
                  this.selectedGuiaCarga.value;
                getData(`/cguias`, 'setData', 'datos');
              "
              dense
              v-model="selectedGuiaCarga"
            >
              <template v-slot:control>
                <q-checkbox
                  size="md"
                  v-model="selectedGuiaCarga"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="Monto"
                />
              </template>
            </q-field>
          </div>
          <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 buttonsDiv"
          style="align-self: center; text-align: center"
          >
            <q-btn
              dense
              color="primary"
              round
              @click="
                this.dialog = true;
                this.form.cod_agencia = findIndex(
                  'agencias',
                  this.selectedAgencia.id,
                  'nb_agencia'
                );
                this.form.cod_agente = findIndex(
                  'agentes',
                  this.selectedAgente.id,
                  'persona_responsable'
                );
                this.form.cod_cliente = findIndex(
                  'clientes',
                  this.selectedCliente.id,
                  'nb_cliente'
                );
                this.form.fecha_asignacion = this.dateInit;
              "
              padding="sm"
              style="margin-right: 25px"
            >
              <q-icon size="25px" name="print" color="white"> </q-icon>
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
          </div>
        </div>
      </div>
  
      <div class="q-pa-md q-gutter-y-md" style="margin-top: -30px">
      <q-table
        :rows="guias"
        binary-state-sort
        row-key="id"
        :columns="columns"
        :loading="loading"
        :separator="separator"
        style="width: 100%"
        :grid="$q.screen.xs"
        :rows-per-page-options="[5, 10, 15, 20, 50]"
        @request="getDataTable"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:body-cell-cod_agencia="props">
          <q-td :props="props">
            {{ findIndex("agencias", props.row.cod_agencia, "nb_agencia") }}
          </q-td>
        </template>
        <template v-slot:body-cell-cod_agente="props">
          <q-td :props="props">
            {{
              findIndex("agentes", props.row.cod_agente, "persona_responsable")
            }}
          </q-td>
        </template>
        <template v-slot:body-cell-cod_cliente="props">
          <q-td :props="props">
            {{ findIndex("clientes", props.row.cod_cliente, "nb_cliente") }}
          </q-td>
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              dense
              round
              flat
              color="primary"
              icon="delete"
              :disabled="this.allowOption(4)"
              @click="selected = props.row.id"
              @click.capture="deleteData(props.row)"
            ></q-btn>
            <q-btn
              dense
              round
              flat
              color="primary"
              icon="sim_card_download"
              :disabled="props.row.cant_disponible > 0 ? false : true"
              @click="selected = props.row.id"
              @click.capture="this.pdfView = true"
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
                    <q-item-label v-if="col.name === 'cod_agencia'">
                      {{
                        findIndex(
                          "agencias",
                          props.row.cod_agencia,
                          "nb_agencia"
                        )
                      }}
                    </q-item-label>
                    <q-item-label v-if="col.name === 'cod_agente'">
                      {{
                        findIndex(
                          "agentes",
                          props.row.cod_agente,
                          "persona_responsable"
                        )
                      }}
                    </q-item-label>
                    <q-item-label v-if="col.name === 'cod_cliente'">
                      {{
                        findIndex(
                          "clientes",
                          props.row.cod_cliente,
                          "nb_cliente"
                        )
                      }}
                    </q-item-label>
                    <q-btn
                      v-if="col.name === 'action'"
                      dense
                      round
                      flat
                      color="primary"
                      icon="delete"
                      :disabled="this.allowOption(4)"
                      @click="selected = props.row.id"
                      @click.capture="deleteData(props.row)"
                    ></q-btn>
                    <q-btn
                      v-if="col.name === 'action'"
                      dense
                      round
                      flat
                      color="primary"
                      icon="sim_card_download"
                      :disabled="props.row.cant_disponible > 0 ? false : true"
                      @click="selected = props.row.id"
                      @click.capture="this.pdfView = true"
                    ></q-btn>
                    <q-item-label
                      v-if="
                        col.name != 'cod_agencia' &&
                        col.name != 'cod_agente' &&
                        col.name != 'cod_cliente'
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
  
      <methods
      ref="methods"
      @set-Data="setData"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Table-All="setDataTableAll"
      @get-Data-Table-All="getDataTableAll"
      @set-Data-Permisos="setDataPermisos"
    ></methods>
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
    name: "AsignacionGuias",
    data() {
      return {
        columns: [
          {
            name: "control_inicio",
            label: "NRO. Control",
            field: "control_inicio",
            align: "left",
            sortable: true,
          },
          {
            name: "control_final",
            label: "NRO. Factura",
            field: "control_final",
            align: "left",
            sortable: true,
          },
          {
            name: "cant_asignada",
            label: "Fecha",
            field: "cant_asignada",
            align: "right",
            sortable: true,
          },
          {
            name: "cant_disponible",
            label: "Monto",
            field: "cant_disponible",
            align: "right",
            sortable: true,
          },
          {
            name: "cod_agencia",
            label: "Descripcion",
            field: "cod_agencia",
            align: "left",
            sortable: true,
          },
          {
            name: "cod_agente",
            label: "Observacion Adicional",
            field: "cod_agente",
            align: "left",
            sortable: true,
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
        pagination: {
          page: 1,
          rowsPerPage: 5,
          sortBy: "control_inicio",
          descending: true,
          filter: "",
          filterValue: "",
          rowsNumber: "",
        },
        guias: [],
        guiasAll: [],
        agencias: [],
        rpermisos: [],
        menus: [],
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
        disabledAgencia: true,
        disabledAgente: false,
        disabledCliente: false,
        disabledInputsEdit: false,
        base64: "",
      };
    },
    setup() {
      const $q = useQuasar();
      moment.locale("es");
      return {
        dateInit: moment().format("L"),
        loading: ref(false),
        separator: ref("vertical"),
        deletePopup: ref(false),
        dialog: ref(false),
        pdfView: ref(false),
      };
    },
    mounted() {
      this.$emit("changeTitle", "SCEN - Mantenimiento - Emitir Carta de Cliente", "");
      this.$refs.methods.getData("/agencias", "setData", "agencias");
      this.getDataTable();
  
      this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
        headers: {
          rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
          menu: "asignacionguias",
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
      filterDesc(array, value) {
        var find = this[array].findIndex((item) => item.value == value);
        return find >= 0 ? this[array][find].label : null;
      },
      // Metodo para traer el value de los Selects y Columns
      findIndex(array, value, field) {
        var find = this[array].findIndex((item) => item.id == value);
        return find >= 0 ? this[array][find][field] : null;
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
      // Regla particular del Primer Correlativo
      reglasPrimerCorrelativo(val) {
        if (this.guiasAll.findIndex((item) => item.control_inicio == val) >= 0)
          return "El lote de guía ya se encuentra cargado desde este número!";
      },
      // Regla particular de Correlativo
      reglasUltimoCorrelativo(val) {
        if (val - this.form.control_inicio < 0)
          return "El Ultimo Correlativo debe ser Mayor al Primero";
      },
  
      // METODOS DE PAGINA
  
      // Metodo para Setear Datos Iniciales
      setData(res, dataRes) {
        this[dataRes] = res.data ? res.data : res;
      },
      // Metodo para Extraer Datos de Tabla
      getDataTable(props) {
        this.loading = true;
        this.getDataTableAll();
        if (props) this.pagination = props.pagination;
        this.$refs.methods.getData(`/cguias`, "setDataTable", "guias", {
          headers: {
            agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
            agente: this.selectedAgente.id ? this.selectedAgente.id : "",
            cliente: this.selectedCliente.id ? this.selectedCliente.id : "",
            desde: this.guia_desde,
            hasta: this.guia_hasta,
            disp: this.selectedCulminado,
            tipo: 20,
            page: this.pagination.page,
            limit: this.pagination.rowsPerPage,
            order_by: this.pagination.sortBy,
            order_direction: this.pagination.descending ? "DESC" : "ASC",
            filter: this.pagination.filter,
            filter_value: this.pagination.filterValue,
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
      // Metodo para Extraer Todos los Datos de Tabla
      getDataTableAll() {
        this.loading = true;
        this.$refs.methods.getData("/cguias", "setDataTableAll", "guiasAll", {
          headers: {
            tipo: 20,
          },
        });
      },
      // Metodo para Setear Todos los Datos de Tabla
      setDataTableAll(res, dataRes) {
        this[dataRes] = res.data ? res.data : res;
        this.loading = false;
      },
      // Metodo para Crear Datos
      sendData() {
        this.form.fecha_asignacion = this.form.fecha_asignacion
          .split("/")
          .reverse()
          .join("-");
        this.form.cod_cliente = this.form.cod_cliente.id;
        this.form.cod_agente = this.form.cod_agente.id;
        this.form.cod_agencia = this.form.cod_agencia.id;
  
        this.$refs.methods.createData(`/cguias`, this.form, "getDataTable");
        this.dialog = false;
        this.resetForm();
      },
      // Metodo para Eliminar Datos Seleccionados
      deleteData(row) {
        if (
          row.cant_disponible != 0 &&
          row.cant_disponible != row.cant_asignada
        ) {
          this.$q.notify({
            message:
              "El Lote no puede ser Eliminado, debido a que se está usando actualmente!",
            color: "red",
          });
        } else {
          this.deletePopup = true;
        }
      },
      // Imprimir Guias pendientes
      printPending () {
        api.get(`/mmovimientos/generatePDF`).then((res) => {
          this.$refs.webViewer.showpdf(res.data.base64);
        });
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
      margin-top: 10px; margin-bottom: 10px
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
  