<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData()">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_cliente"
                  label="Nombre"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    form.nb_cliente = form.nb_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.rif_cedula"
                  label="RIF"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    form.rif_cedula = form.rif_cedula.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 20),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nit"
                  label="NIT"
                  hint=""
                  @update:model-value="form.nit = form.nit.toUpperCase()"
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 20),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_persona_new"
                  label="Tipo Persona"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  :options="tipoPersona"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_cliente"
                  label="Telefono"
                  hint=""
                  class="pcform"
                  mask="(####) ### - ####"
                  @update:model-value="
                    form.tlf_cliente = form.tlf_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.fax"
                  label="Fax"
                  hint=""
                  mask="(####) ### - ####"
                  @update:model-value="form.fax = form.fax.toUpperCase()"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 65),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="form.persona_contacto"
                  label="Persona Contacto"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    form.persona_contacto = form.persona_contacto.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.dir_fiscal"
                  label="Direccion Fiscal"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    form.dir_fiscal = form.dir_fiscal.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 200),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12" style="margin-bottom: 20px">
                <q-checkbox
                  size="lg"
                  v-model="form.cte_decontado"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="¿ES CLIENTE PARTICULAR"
                />
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.razon_social"
                  label="Razon Social"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    form.razon_social = form.razon_social.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.email"
                  label="Email"
                  type="email"
                  hint=""
                  @update:model-value="
                    form.dir_correo = form.dir_correo.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 100),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.flag_activo"
                  label="Estatus"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  :options="estatus"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-select>
              </div>
              <div class="col-md-8 col-xs-12">
                <q-input
                  outlined
                  v-model="form.observacion"
                  label="Observaciones"
                  hint=""
                  @update:model-value="
                    form.observacion = form.observacion.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isMax(val, 300),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
                  </template>
                </q-input>
              </div>
              <q-card
                class="q-pa-md"
                bordered
                style="width: 999px; max-width: 80vw; margin-bottom: 20px"
              >
                <q-card-section>
                  <div class="row">
                    <div
                      class="col-md-12 col-xs-12"
                      style="
                        align-self: center;
                        text-align: left;
                        margin-top: -30px;
                      "
                    >
                      <h4 style="font-size: 20px" class="text-secondary">
                        <strong>UBICACIÓN GEOGRAFICA</strong>
                      </h4>
                    </div>
                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="selectedPais"
                        label="Pais"
                        hint=""
                        class="pcform"
                        :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                        :options="paisesSelected"
                        @filter="
                          (val, update) =>
                            filterArray(
                              val,
                              update,
                              'paisesSelected',
                              'paises',
                              'desc_pais'
                            )
                        "
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        lazy-rules
                        option-label="desc_pais"
                        option-value="id"
                        @update:model-value="
                          this.$refs.methods.getData(
                            'estados',
                            'setData',
                            'estados',
                            {
                              headers: {
                                pais: this.selectedPais.id,
                              },
                            }
                          );
                          this.selectedEstado = [];
                          this.selectedCiudad = [];
                          this.selectedMunicipio = [];
                          this.selectedParroquia = [];
                          this.selectedLocalidad = [];
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
                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="selectedEstado"
                        label="Estado"
                        class="pcform"
                        hint=""
                        :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                        :options="estadosSelected"
                        @filter="
                          (val, update) =>
                            filterArray(
                              val,
                              update,
                              'estadosSelected',
                              'estados',
                              'desc_estado'
                            )
                        "
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        lazy-rules
                        option-label="desc_estado"
                        option-value="id"
                        @update:model-value="
                          this.selectedCiudad = [];
                          this.selectedMunicipio = [];
                          this.selectedParroquia = [];
                          this.selectedLocalidad = [];
                          this.$refs.methods.getData(
                            'municipios',
                            'setData',
                            'municipios',
                            {
                              headers: {
                                estado: this.selectedEstado.id,
                              },
                            }
                          );
                          this.$refs.methods.getData(
                            'localidades',
                            'setData',
                            'localidades',
                            {
                              headers: {
                                estado: this.selectedEstado.id,
                              },
                            }
                          );
                          this.$refs.methods.getData(
                            'ciudades',
                            'setData',
                            'ciudades',
                            {
                              headers: {
                                estado: this.selectedEstado.id,
                              },
                            }
                          );
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
                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="selectedCiudad"
                        label="Ciudad"
                        hint=""
                        :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                        :options="ciudadesSelected"
                        @filter="
                          (val, update) =>
                            filterArray(
                              val,
                              update,
                              'ciudadesSelected',
                              'ciudades',
                              'desc_ciudad'
                            )
                        "
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        lazy-rules
                        option-label="desc_ciudad"
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
                      <q-select
                        outlined
                        v-model="selectedMunicipio"
                        label="Municipio"
                        hint=""
                        class="pcform"
                        :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                        :options="municipiosSelected"
                        @filter="
                          (val, update) =>
                            filterArray(
                              val,
                              update,
                              'municipiosSelected',
                              'municipios',
                              'desc_municipio'
                            )
                        "
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        option-label="desc_municipio"
                        option-value="id"
                        lazy-rules
                        @update:model-value="
                          this.$refs.methods.getData(
                            'parroquias',
                            'setData',
                            'parroquias',
                            {
                              headers: {
                                municipio: this.selectedMunicipio.id,
                              },
                            }
                          );
                          this.selectedParroquia = [];
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
                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="selectedParroquia"
                        label="Parroquia"
                        hint=""
                        class="pcform"
                        :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                        :options="parroquiasSelected"
                        @filter="
                          (val, update) =>
                            filterArray(
                              val,
                              update,
                              'parroquiasSelected',
                              'parroquias',
                              'desc_parroquia'
                            )
                        "
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        option-label="desc_parroquia"
                        option-value="id"
                        lazy-rules
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
                      <q-select
                        outlined
                        v-model="selectedLocalidad"
                        label="Localidad"
                        hint=""
                        :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                        :options="localidadesSelected"
                        @filter="
                          (val, update) =>
                            filterArray(
                              val,
                              update,
                              'localidadesSelected',
                              'localidades',
                              'desc_localidad'
                            )
                        "
                        use-input
                        hide-selected
                        fill-input
                        input-debounce="0"
                        option-label="desc_localidad"
                        option-value="id"
                        lazy-rules
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
                </q-card-section>
              </q-card>
              <q-card
                class="q-pa-md"
                bordered
                style="width: 999px; max-width: 80vw; margin-bottom: 32px"
              >
                <q-card-section>
                  <div class="row">
                    <div
                      class="col-md-12 col-xs-12"
                      style="
                        align-self: center;
                        text-align: left;
                        margin-top: -30px;
                      "
                    >
                      <h4 style="font-size: 20px" class="text-secondary">
                        <strong
                          >INFORMACIÓN RESPECTO A LA EMPRESA DE
                          ENCOMIENDA</strong
                        >
                      </h4>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-select
                        outlined
                        v-model="selectedAgente"
                        label="Agente de Venta"
                        hint=""
                        class="pcform"
                        :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
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
                        option-label="persona_responsable"
                        option-value="id"
                        lazy-rules
                        ><template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              Sin resultados
                            </q-item-section>
                          </q-item>
                        </template>
                        <template v-slot:prepend>
                          <q-icon name="face" />
                        </template>
                      </q-select>
                    </div>
                    <div class="col-md-6 col-xs-12">
                      <q-select
                        outlined
                        v-model="form.modalidad_pago"
                        label="Modalidad de Pago"
                        hint=""
                        :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                        :options="modalidadPago"
                        lazy-rules
                      >
                        <template v-slot:prepend>
                          <q-icon name="payments" />
                        </template>
                      </q-select>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 6px"
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
                class="col-md-5 col-sm-5 col-xs-12 btnmovil"
                icon="close"
                @click="this.resetForm()"
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="q-pa-md row" style="margin-top: 2px">
          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
            style="align-self: center; text-align: center"
          >
            <p style="font-size: 20px" class="text-secondary">
              <strong>MANTENIMIENTO - CLIENTES</strong>
            </p>
          </div>
          <div
            class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6 cardMargin selectMobile"
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
              label="Escoge una Agencia"
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
            class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-6"
            style="align-self: center; text-align: center"
          >
            <q-input
              v-model="this.pagination.filterValue"
              rounded
              dense
              outlined
              standout
              label="Búsqueda avanzada"
              @keydown.enter="getDataTable()"
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
            class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-6"
            style="align-self: center; text-align: center"
          >
            <q-checkbox
              size="md"
              v-model="checkUsuario"
              true-value="S"
              false-value=""
              style="font-size: 13px"
              label="USUARIOS"
              @click="getDataTable()"
            />
          </div>
          <div
            class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 cardMarginButton"
            style="text-align: center; align-self: center; margin-left: -40px"
          >
            <q-btn
              label="Insertar"
              rounded
              color="primary"
              @click="
                dialog = true;
                this.resetForm();
              "
              :disabled="this.allowOption(2)"
              class="q-px-xl q-py-xs"
            ></q-btn>
          </div>
        </div>
        <div class="q-pa-md my-card row" bordered flat style="margin-top: 2px">
          <q-table
            :rows="clientes"
            row-key="id"
            :columns="columns"
            binary-state-sort
            :loading="loading"
            :rows-per-page-options="[5, 10, 15, 20, 50]"
            @request="getDataTable"
            :separator="separator"
            style="width: 100%"
            :grid="$q.screen.xs"
            v-model:pagination="pagination"
          >
            <template v-slot:loading>
              <q-inner-loading showing color="primary" class="loading" />
            </template>
            <template v-slot:body-cell-flag_activo="props">
              <q-td :props="props">
                {{ filterDesc("estatus", props.row.flag_activo) }}
              </q-td>
            </template>
            <template v-slot:body-cell-action="props">
              <q-td :props="props">
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="edit"
                  :disabled="this.allowOption(3)"
                  @click="
                    this.$refs.methods.getData(
                      `/clientes/${props.row.id}`,
                      'setDataEdit',
                      'form'
                    );
                    dialog = true;
                  "
                ></q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="delete"
                  :disabled="this.allowOption(4)"
                  @click="selected = props.row.id"
                  @click.capture="deletePopup = true"
                ></q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="contact_mail"
                  @click="selected = props.row.id"
                  @click.capture="addressDialog = true"
                ></q-btn>
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="group"
                  @click="selected = props.row.id"
                  @click.capture="
                    getUsuarios(props.row.id, props.row.nb_cliente)
                  "
                  :disabled="props.row.clientes_usuarios == 0"
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
                        <q-item-label v-if="col.name === 'flag_activo'">
                          {{ filterDesc("estatus", props.row.flag_activo) }}
                        </q-item-label>
                        <q-btn
                          v-if="col.name === 'action'"
                          dense
                          round
                          flat
                          color="primary"
                          icon="edit"
                          :disabled="this.allowOption(3)"
                          @click="
                            this.$refs.methods.getData(
                              `/clientes/${props.row.id}`,
                              'setDataEdit',
                              'form'
                            );
                            dialog = true;
                          "
                        ></q-btn>
                        <q-btn
                          v-if="col.name === 'action'"
                          dense
                          round
                          flat
                          color="primary"
                          icon="delete"
                          :disabled="this.allowOption(4)"
                          @click="selected = props.row.id"
                          @click.capture="deletePopup = true"
                        ></q-btn>
                        <q-item-label v-if="col.name != 'flag_activo'">
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
      </div>
    </div>

    <q-dialog v-model="addressDialog">
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
                <strong>INVITACIÓN SEGUIMIENTO DE GUÍAS</strong>
              </p>
            </div>
            <div class="col-md-12 col-xs-12">
              <q-input
                v-model="address"
                rounded
                dense
                label="Correo Electrónico"
                :rules="[(val) => this.$refs.rulesVue.isReq(val, '')]"
              >
              </q-input>
            </div>
            <div
              class="col-md-12 col-xs-12"
              style="margin-top: 23px; margin-bottom: 10px; text-align: center"
            >
              <q-btn
                label="Invitar"
                color="primary"
                style="width: 200px"
                @click="sendEmail()"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="usuarioDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <div
          class="row justify-center items-center content-center"
          style="padding: 20px"
        >
          <div class="col-md-10 col-xs-12">
            <p style="font-size: 20px; text-align: left" class="text-secondary">
              <strong>USUARIOS ASOCIADOS AL CLIENTE</strong>
            </p>
            <p style="font-size: 16; text-align: left">
              <strong>{{ this.clientName }}</strong>
            </p>
          </div>
          <div
            class="col-md-2 col-xs-12"
            style="margin-bottom: 20px; text-align: center"
          >
            <q-btn color="primary" rounded icon="close" v-close-popup />
          </div>
          <div class="col-md-12 col-xs-12">
            <q-table
              :rows="usuarios"
              row-key="id"
              :columns="columnsUsuarios"
              binary-state-sort
              :separator="separator"
              v-model:pagination="pagination2"
              :grid="$q.screen.xs"
              :rows-per-page-options="[0]"
              style="width: 100%; height: 350px"
              hide-bottom
            >
              <template v-slot:body-cell-estatus="props">
                <q-td :props="props">
                  {{ props.row.estatus == 1 ? "ACTIVO" : "INACTIVO" }}
                </q-td>
              </template>
              <template v-slot:body-cell-action="props">
                <q-td :props="props">
                  <q-btn
                    dense
                    round
                    flat
                    color="primary"
                    icon="edit"
                    @click="
                      this.editUsuarioDialog = true;
                      setDataUsuario(props.row.id, props.rowIndex);
                    "
                  ></q-btn>
                  <q-btn
                    dense
                    round
                    flat
                    color="primary"
                    icon="delete"
                    @click="selected = props.row.id"
                    @click.capture="deletePopup = true"
                  ></q-btn>
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="editUsuarioDialog">
      <q-card class="q-pa-md" bordered style="max-width: 500px">
        <q-card-section>
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <q-input
                outlined
                v-model="email"
                label="Correo Electrónico"
                hint=""
                :disable="true"
              >
                <template v-slot:prepend>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 col-xs-12">
              <q-input
                outlined
                v-model="password"
                label="Password"
                :rules="[
                  (val) => this.$refs.rulesVue.isMax(val, 100),
                  (val) => this.$refs.rulesVue.isMin(val, 3),
                ]"
                hint=""
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="key" />
                </template>
              </q-input>
            </div>
            <div class="col-md-12 col-xs-12">
              <q-select
                outlined
                v-model="estatusUser"
                label="Estatus"
                hint=""
                :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                :options="estatusUsuario"
                lazy-rules
              >
                <template v-slot:prepend>
                  <q-icon name="rule" />
                </template>
              </q-select>
            </div>
          </div>
          <div
            class="row justify-center items-center content-center"
            style="margin-bottom: 10px"
          >
            <q-btn
              label="Guardar"
              color="primary"
              class="col-md-5 col-sm-5 col-xs-12"
              icon="save"
              @click="sendDataUsuario"
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
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deletePopup">
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
            @click="
              this.$refs.methods.deleteData(
                `/clientes/${selected}`,
                'getDataTable'
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Init="setDataInit"
      @set-Data-Edit="setDataEdit"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Table-All="setDataTableAll"
      @get-Data-Table-All="getDataTableAll"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar, LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
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
          name: "flag_activo",
          label: "Estatus",
          field: "flag_activo",
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
        {
          name: "action",
          label: "Acciones",
          align: "center",
        },
      ],
      columnsUsuarios: [
        {
          name: "email",
          label: "Correo Electrónico",
          field: "email",
          align: "center",
        },
        {
          name: "password",
          label: "Contraseña",
          field: "password",
          align: "center",
        },
        {
          name: "estatus",
          label: "Estatus",
          field: "estatus",
          align: "center",
        },
        {
          name: "action",
          label: "Acción",
          align: "center",
        },
      ],
      form: {
        nb_cliente: "",
        rif_cedula: "",
        nit: "",
        dir_fiscal: "",
        email: "",
        tlf_cliente: "",
        fax: "",
        razon_social: "",
        modalidad_pago: "",
        persona_contacto: "",
        observacion: "",
        cte_decontado: "",
        tipo_persona: "",
        tipo_persona_new: "",
        flag_activo: "",
        cod_agencia: [],
        cod_ciudad: [],
        cod_agente: [],
        cod_municipio: [],
        cod_parroquia: [],
        cod_localidad: [],
      },
      tipoPersona: [
        { label: "JURÍDICA", value: "J" },
        { label: "NATURAL", value: "N" },
      ],
      modalidadPago: [
        { label: "CONTADO", value: "CO" },
        { label: "CREDITO", value: "CR" },
      ],
      estatus: [
        { label: "ACTIVO", value: "A" },
        { label: "INACTIVO", value: "I" },
      ],
      estatusUsuario: [
        { label: "ACTIVO", value: "1" },
        { label: "INACTIVO", value: "0" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "nb_cliente",
        descending: false,
        filter: "nb_cliente,rif_cedula,flag_activo",
        filterValue: "",
        rowsNumber: "",
      },
      pagination2: {
        page: 1,
        rowsPerPage: 0,
        rowsNumber: "",
      },
      agenciasSelected: [],
      paisesSelected: [],
      estadosSelected: [],
      ciudadesSelected: [],
      municipiosSelected: [],
      parroquiasSelected: [],
      localidadesSelected: [],
      agentesSelected: [],
      agencias: [],
      paises: [],
      estados: [],
      ciudades: [],
      municipios: [],
      parroquias: [],
      localidades: [],
      clientes: [],
      clientesAll: [],
      agentes: [],
      selected: [],
      selectedPais: [],
      selectedEstado: [],
      selectedCiudad: [],
      selectedMunicipio: [],
      selectedParroquia: [],
      selectedLocalidad: [],
      selectedAgencia: [],
      selectedAgente: [],
      rpermisos: [],
      pais: "",
      estado: "",
      filter: "",
      address: "",
      checkUsuario: "",
      clientName: "",
      usuarios: [],
      usuario: "",
      email: "",
      password: "",
      estatusUser: "",
      usuarioIndex: "",
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      loading: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      addressDialog: ref(false),
      usuarioDialog: ref(false),
      deletePopup: ref(false),
      editUsuarioDialog: ref(false),
      clienteParticularExistente() {
        $q.notify({
          message: "Solo puede haber un Cliente Particular por Agencia",
          color: "red",
        });
      },
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Clientes", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/paises", "setData", "paises");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "clientes",
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
    findIndex(array, value) {
      var find = this[array].findIndex((item) => item.id == value);
      return find >= 0 ? find : null;
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
    setData(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Setear Datos Iniciales
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      this.getDataTable();
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      this.getDataTableAll();
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/clientes`, "setDataTable", "clientes", {
        headers: {
          agencia: this.selectedAgencia.id,
          page: this.pagination.page,
          limit: this.pagination.rowsPerPage,
          order_by: this.pagination.sortBy,
          order_direction: this.pagination.descending ? "DESC" : "ASC",
          filter: this.pagination.filter,
          filter_value: this.pagination.filterValue,
          usuarios: this.checkUsuario,
        },
      });
      this.$refs.methods.getData(`/agentes`, "setData", "agentes", {
        headers: {
          agencia: this.selectedAgencia.id,
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
      for (var e = 0, len = this.clientes.length; e < len; e++) {
        if (this.clientes[e].cte_decontado === "1") {
          this.clientes[e].cte_decontado = "🏴";
        } else {
          this.clientes[e].cte_decontado = "";
        }
        if (e == this.clientes.length - 1) break;
      }
      this.loading = false;
    },
    // Metodo para Extraer Todos los Datos de Tabla
    getDataTableAll() {
      this.loading = true;
      this.$refs.methods.getData(
        "/clientes",
        "setDataTableAll",
        "clientesAll",
        {
          headers: {
            agencia: this.selectedAgencia.id,
          },
        }
      );
    },
    // Metodo para Setear Todos los Datos de Tabla
    setDataTableAll(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.loading = false;
    },
    // Metodo para Setear Datos Seleccionados
    async setDataEdit(res, dataRes) {
      // Seteo el agente del Cliente
      this.selectedAgente =
        this.agentes[this.findIndex("agentes", res.cod_agente)];

      // Obtengo Estado de la Ciudad
      await api
        .get(`/ciudades/${res.cod_ciudad}`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((ciudad) => {
          this.estado = ciudad.data.cod_estado;
        });

      // Obtengo Pais del Estado
      await api
        .get(`/estados/${this.estado}`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((estado) => {
          this.pais = estado.data.cod_pais;
          // Seteo el Pais del Cliente
          this.selectedPais = this.paises[this.findIndex("paises", this.pais)];
        });

      // Obtengo Estados del Pais
      await api
        .get(`/estados/`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            pais: this.pais,
          },
        })
        .then((estados) => {
          this.estados = estados.data.data;
          // Seteo el Estado del Cliente
          this.selectedEstado =
            this.estados[this.findIndex("estados", this.estado)];
        });

      // Obtengo Ciudades del Estado
      await api
        .get(`/ciudades/`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            estado: this.estado,
          },
        })
        .then((ciudades) => {
          this.ciudades = ciudades.data.data;
          // Seteo la ciudad del Cliente
          this.selectedCiudad =
            this.ciudades[this.findIndex("ciudades", res.cod_ciudad)];
        });

      // Obtengo Ciudades del Estado
      await api
        .get(`/municipios/`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            estado: this.estado,
          },
        })
        .then((municipios) => {
          this.municipios = municipios.data.data;
          // Seteo el Municipio del Cliente si existe
          if (res.cod_municipio) {
            this.selectedMunicipio =
              this.municipios[this.findIndex("municipios", res.cod_municipio)];
            // Obtengo Parroquias del Municipio
            api
              .get(`/parroquias/`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  municipio: res.cod_municipio,
                },
              })
              .then((parroquias) => {
                this.parroquias = parroquias.data.data;
                // Seteo la Parroquia del Cliente si existe
                if (res.cod_parroquia) {
                  this.selectedParroquia =
                    this.parroquias[
                      this.findIndex("parroquias", res.cod_parroquia)
                    ];
                }
              });
          }
        });

      // Obtengo Localidades del Estado
      await api
        .get(`/localidades/`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            estado: this.estado,
          },
        })
        .then((localidades) => {
          this.localidades = localidades.data.data;
          // Seteo la localidad del Cliente si existe
          if (res.cod_localidad) {
            this.selectedLocalidad =
              this.localidades[
                this.findIndex("localidades", res.cod_localidad)
              ];
          }
        });

      this[dataRes].id = res.id;
      this[dataRes].cod_agencia = res.cod_agencia;
      this[dataRes].nb_cliente = res.nb_cliente;
      this[dataRes].rif_cedula = res.rif_cedula;
      this[dataRes].nit = res.nit;
      this[dataRes].dir_fiscal = res.dir_fiscal;
      this[dataRes].email = res.email;
      this[dataRes].tlf_cliente = res.tlf_cliente;
      this[dataRes].fax = res.fax;
      this[dataRes].razon_social = res.razon_social;
      this[dataRes].tipo_persona_new = this.filterDesc(
        "tipoPersona",
        res.tipo_persona_new
      );
      this[dataRes].modalidad_pago = this.filterDesc(
        "modalidadPago",
        res.modalidad_pago
      );
      this[dataRes].persona_contacto = res.persona_contacto;
      this[dataRes].observacion = res.observacion;
      this[dataRes].cte_decontado = res.cte_decontado;
      this[dataRes].flag_activo = this.filterDesc("estatus", res.flag_activo);
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      if (
        this.form.cte_decontado === "1" &&
        this.clientesAll.findIndex((item) => item.cte_decontado == "1") >= 0
      ) {
        this.clienteParticularExistente();
        return;
      }
      this.form.cod_agencia = this.selectedAgencia.id;
      this.form.cod_agente = this.selectedAgente.id;
      this.form.cod_localidad = this.selectedLocalidad.id;
      this.form.cod_municipio = this.selectedMunicipio.id;
      this.form.cod_parroquia = this.selectedParroquia.id;
      this.form.cod_ciudad = this.selectedCiudad.id;
      this.form.modalidad_pago = this.form.modalidad_pago.value;
      this.form.flag_activo = this.form.flag_activo.value;
      this.form.tipo_persona_new = this.form.tipo_persona_new.value;
      this.form.tipo_persona = "J";
      if (!this.form.id) {
        this.$refs.methods.createData(`/clientes`, this.form, "getDataTable");
      } else {
        this.$refs.methods.putData(
          `/clientes/${this.form.id}`,
          this.form,
          "getDataTable"
        );
      }
      this.dialog = false;
      this.resetForm();
    },
    // Metodo para Enviar correo de Invitacion
    sendEmail() {
      // Valido la dirreccion de correo
      var validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!this.address.match(validRegex)) {
        this.$q.notify({
          message: "Debe colocar una dirección de Correo Electrónico valida",
          color: "red",
        });
        return;
      }

      this.addressDialog = false;

      api
        .get(`cusuarios/send-invitation`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            address: this.address,
            client: this.selected,
          },
        })
        .then((res) => {
          this.$q.notify({
            message: "La Invitación ha sido enviada Exitosamente",
            color: "green",
          });
        })
        .catch((err) => {
          this.$q.notify({
            message: "Error al enviar el mensaje: " + err.message,
            color: "red",
          });
        });
    },
    // Metodo para llenar la ventana de usuarios de un cliente
    async getUsuarios(clientId, clientName) {
      await api
        .get(`/cusuarios`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            cliente: clientId,
          },
        })
        .then((res) => {
          this.usuarios = res.data;
        });

      this.clientName = clientName;
      this.usuarioDialog = true;
    },
    // Metodo para Setear Datos de Usuarios
    setDataUsuario(userId, index) {
      api
        .get(`/cusuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.usuarioIndex = index;
          this.usuario = res.data.id;
          this.email = res.data.email;
          this.password = res.data.password;
          this.estatusUser = this.filterDesc(
            "estatusUsuario",
            res.data.estatus
          );
        });
    },
    // Metodo para Editar usuarios de Clientes
    async sendDataUsuario() {
      let formUsuarios = {};
      formUsuarios.cod_cliente = this.selected;
      formUsuarios.email = this.email;
      formUsuarios.password = this.password;
      formUsuarios.estatus = this.estatusUser.value
        ? this.estatusUser.value
        : this.estatusUser == "ACTIVO"
        ? "1"
        : "0";

      await api
        .put(`/cusuarios/${this.usuario}`, formUsuarios, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .catch(() => {
          this.$q.notify({
            message:
              "Error del Sistema. Problemas al actualizar datos del Usuario. Comuníquese con el proveedor del Sistemas...",
            color: "red",
          });
          return;
        });

      this.$q.notify({
        message: "Usuario Actualizado Exitosamente",
        color: "green",
      });

      this.usuarios[this.usuarioIndex].email = this.email;
      this.usuarios[this.usuarioIndex].password = this.password;
      this.usuarios[this.usuarioIndex].estatus = formUsuarios.estatus;
      this.editUsuarioDialog = false;
    },
    // Metodo para Resetear Formulario
    resetForm() {
      delete this.form.id;
      this.form.nb_cliente = "";
      this.form.rif_cedula = "";
      this.form.nit = "";
      this.form.dir_fiscal = "";
      this.form.email = "";
      this.form.tlf_cliente = "";
      this.form.fax = "";
      this.form.razon_social = "";
      this.form.tipo_persona = "";
      this.form.tipo_persona_new = "";
      this.form.modalidad_pago = "";
      this.form.persona_contacto = "";
      this.form.observacion = "";
      this.form.cte_decontado = "";
      this.form.flag_activo = "";
      this.form.cod_agencia = "";
      this.form.cod_agente = "";
      this.form.cod_municipio = "";
      this.form.cod_parroquia = "";
      this.form.cod_localidad = "";
      this.form.cte_decontado = "0";
      this.selectedMunicipio = [];
      this.selectedParroquia = [];
      this.selectedLocalidad = [];
      this.selectedPais = [];
      this.selectedEstado = [];
      this.selectedCiudad = [];
      this.selectedAgente = [];
      this.pais = "";
      this.estado = "";
      this.checkUsuario = "";
    },
  },
};
</script>
