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
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        100,
                        'Maximo 100 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        20,
                        'Maximo 20 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        200,
                        'Maximo 200 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                  v-model="form.tipo_persona"
                  label="Tipo Persona"
                  hint=""
                  class="pcform"
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
                  :options="tipo_persona"
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
                  @update:model-value="
                    form.tlf_cliente = form.tlf_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        100,
                        'Maximo 100 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                  @update:model-value="form.fax = form.fax.toUpperCase()"
                  lazy-rules
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        65,
                        'Maximo 65 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        100,
                        'Maximo 100 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        100,
                        'Maximo 100 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        100,
                        'Maximo 100 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                  v-model="form.dir_correo"
                  label="Direccion Correo"
                  hint=""
                  @update:model-value="
                    form.dir_correo = form.dir_correo.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        100,
                        'Maximo 100 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                  :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]"
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
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        100,
                        'Maximo 100 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
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
                        v-model="pais"
                        label="Pais"
                        hint=""
                        class="pcform"
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isReqSelect(val, 'Requerido') ||
                            '',
                        ]"
                        :options="paisesSelected"
                        @filter="
                          (val, update, abort) =>
                            filterArray(
                              val,
                              update,
                              abort,
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
                          getDataLocalidades('estados', 'setPaginatedData', {
                            headers: {
                              pais: this.pais.id,
                            },
                          });
                          this.estado = '';
                          this.ciudad = '';
                          this.localidades = [];
                          this.municipios = [];
                          this.parroquias = [];
                          this.ciudades = [];
                          this.form.cod_localidad = [];
                          this.form.cod_municipio = [];
                          this.form.cod_parroquia = [];
                          this.form.cod_localidad = [];
                          this.form.cod_municipio = [];
                          this.form.cod_parroquia = [];
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
                        v-model="estado"
                        label="Estado"
                        class="pcform"
                        hint=""
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isReqSelect(val, 'Requerido') ||
                            '',
                        ]"
                        :options="estadosSelected"
                        @filter="
                          (val, update, abort) =>
                            filterArray(
                              val,
                              update,
                              abort,
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
                          getDataLocalidades('municipios', 'setPaginatedData', {
                            headers: {
                              estado: this.estado.id,
                            },
                          });
                          this.form.cod_parroquia = [];
                          this.parroquias = [];
                          this.form.cod_municipio = [];
                          this.form.cod_parroquia = [];
                          this.form.cod_municipio = [];
                          getDataLocalidades(
                            'localidades',
                            'setPaginatedData',
                            {
                              headers: {
                                estado: this.estado.id,
                              },
                            }
                          );
                          getDataLocalidades('ciudades', 'setPaginatedData', {
                            headers: {
                              estado: this.estado.id,
                            },
                          });
                          this.ciudad = '';
                          this.form.cod_localidad = [];
                          this.form.cod_localidad = [];
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
                        v-model="ciudad"
                        label="Ciudad"
                        hint=""
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isReqSelect(val, 'Requerido') ||
                            '',
                        ]"
                        :options="ciudadesSelected"
                        @filter="
                          (val, update, abort) =>
                            filterArray(
                              val,
                              update,
                              abort,
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
                        v-model="form.cod_municipio"
                        label="Municipio"
                        hint=""
                        class="pcform"
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isReqSelect(val, 'Requerido') ||
                            '',
                        ]"
                        :options="municipiosSelected"
                        @filter="
                          (val, update, abort) =>
                            filterArray(
                              val,
                              update,
                              abort,
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
                          getDataLocalidades('parroquias', 'setPaginatedData', {
                            headers: {
                              municipio: this.form.cod_municipio.id,
                            },
                          });
                          this.form.cod_parroquia = [];
                          this.form.cod_parroquia = [];
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
                        v-model="form.cod_parroquia"
                        label="Parroquia"
                        hint=""
                        class="pcform"
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isReqSelect(val, 'Requerido') ||
                            '',
                        ]"
                        :options="parroquiasSelected"
                        @filter="
                          (val, update, abort) =>
                            filterArray(
                              val,
                              update,
                              abort,
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
                        v-model="form.cod_localidad"
                        label="Localidad"
                        hint=""
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isReqSelect(val, 'Requerido') ||
                            '',
                        ]"
                        :options="localidadesSelected"
                        @filter="
                          (val, update, abort) =>
                            filterArray(
                              val,
                              update,
                              abort,
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
                        v-model="form.cod_agente"
                        label="Agente de Venta"
                        hint=""
                        class="pcform"
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isReqSelect(val, 'Requerido') ||
                            '',
                        ]"
                        :options="agentesSelected"
                        @filter="
                          (val, update, abort) =>
                            filterArray(
                              val,
                              update,
                              abort,
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
                        :rules="[
                          (val) =>
                            this.$refs.rulesVue.isReqSelect(val, 'Requerido') ||
                            '',
                        ]"
                        :options="modalidad_pago"
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
              class="full-width row justify-center items-center content-center"
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
                v-close-popup
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div
      class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 q-pa-sm justify-center"
    >
      <div class="row q-pa-md">
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 27px" class="text-secondary">
            <strong>MANTENIMIENTO - CLIENTES</strong>
          </p>
        </div>

        <div
          class="col-md-5 col-xs-12 col-sm-6 cardMargin selectMovil"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agenciasSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
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
            @update:model-value="
              getDataClientes(`/clientes`, 'setDataTable', 'clientes');
              getData(`/agentes`, 'setPaginatedData', 'agentes');
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
          class="col-md-5 col-xs-12 col-sm-6 cardMarginLast selectMovil"
          style="align-self: center; text-align: center"
        >
          <q-input
            v-model="filter"
            rounded
            dense
            outlined
            standout
            label="Búsqueda avanzada"
            @keydown.enter="
              this.getDataClientes(`/clientes`, 'setDataTable', 'clientes')
            "
          >
            <template v-slot:append>
              <q-icon
                @click="
                  this.getDataClientes(`/clientes`, 'setDataTable', 'clientes')
                "
                class="cursor-pointer"
                name="search"
              />
            </template>
          </q-input>
        </div>

        <div
          class="col-md-2 col-xs-12 col-sm-12"
          style="text-align: center; align-self: center"
        >
          <q-btn
            label="Insertar Cliente"
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

      <div class="q-pa-md q-gutter-y-md">
        <q-table
          :rows="clientes"
          row-key="id"
          :columns="columns"
          binary-state-sort
          :loading="loading"
          :rows-per-page-options="[5, 10, 15, 20, 50]"
          @request="onRequest"
          :separator="separator"
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
                icon="edit"
                :disabled="this.allowOption(3)"
                @click="
                  getData(`/clientes/${props.row.id}`, 'setDataEdit', 'form');
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
                @click.capture="clientesDelete = true"
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
                    <q-item-section side>
                      <q-chip
                        v-if="col.name === 'status'"
                        :color="
                          props.row.status == 'Active'
                            ? 'green'
                            : props.row.status == 'Disable'
                            ? 'red'
                            : 'grey'
                        "
                        text-color="white"
                        dense
                        class="text-weight-bolder"
                        square
                        >{{ col.value }}</q-chip
                      >
                      <q-btn
                        v-else-if="col.name === 'action'"
                        dense
                        round
                        flat
                        color="primary"
                        icon="edit"
                        :disabled="this.allowOption(3)"
                        @click="
                          getData(
                            `/clientes/${props.row.id}`,
                            'setDataEdit',
                            'form'
                          );
                          dialog = true;
                        "
                      ></q-btn>
                      <q-chip
                        v-if="col.name === 'status'"
                        :color="
                          props.row.status == 'Active'
                            ? 'green'
                            : props.row.status == 'Disable'
                            ? 'red'
                            : 'grey'
                        "
                        text-color="white"
                        dense
                        class="text-weight-bolder"
                        square
                        >{{ col.value }}</q-chip
                      >
                      <q-btn
                        v-else-if="col.name === 'action'"
                        dense
                        round
                        flat
                        color="primary"
                        icon="delete"
                        :disabled="this.allowOption(4)"
                        @click="selected = props.row.id"
                        @click.capture="clientesDelete = true"
                      ></q-btn>
                      <q-item-label
                        v-else
                        caption
                        :class="col.classes ? col.classes : ''"
                        >{{ col.value }}
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
      @get-data-Clientes="
        getDataClientes(`/clientes`, 'setDataTable', 'clientes')
      "
      @reset-Loading="resetLoading"
      @set-Data-Table="setDataTable"
      @on-Request="onRequest"
      @set-Data="setData"
      @set-Paginated-Data="setPaginatedData"
      @set-Data-Edit="setDataEdit"
      @set-Data-Init="setDataInit"
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
          required: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
          sortable: true,
          required: true,
        },
      ],
      form: {
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
      pais: "",
      count: 1,
      currentPage: 1,
      estado: "",
      ciudad: "",
      filter: "",
      agencias: [],
      paises: [],
      agenciasSelected: [],
      paisesSelected: [],
      estadosSelected: [],
      ciudadesSelected: [],
      municipiosSelected: [],
      parroquiasSelected: [],
      localidadesSelected: [],
      agentesSelected: [],
      estados: [],
      ciudades: [],
      municipios: [],
      parroquias: [],
      localidades: [],
      orderDirection: "",
      clientes: [],
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
      error: "",
      rpermisos: [],
    };
  },
  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const order = ref(false);
    const pagination = ref({
      descending: "",
      page: 1,
      rowsPerPage: 5,
      rowsNumber: "",
    });
    return {
      pagination,
      anulate: ref(false),
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      clientesDelete: ref(false),
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
    // Metodo para Actualizar Tabla al Seleccionar opcion de la Misma
    onRequest(res) {
      let { page, rowsPerPage, sortBy, descending } = res.pagination;
      if (this.currentPage !== page) descending = "";

      const fetchCount =
        rowsPerPage === 0 ? this.pagination.rowsNumber : rowsPerPage;
      if (!sortBy) sortBy = "";

      var headerSortBy = sortBy;

      if (headerSortBy == "action") {
        descending = "";
        headerSortBy = "";
        sortBy = "";
      }

      if (descending !== "") {
        this.pagination.descending = !this.pagination.descending;
        if (this.pagination.descending == true) {
          this.orderDirection = "DESC";
        } else this.orderDirection = "ASC";
      }

      this.pagination.sortBy = sortBy;
      this.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage;

      this.getData(`/clientes`, "setDataTable", "clientes", {
        headers: {
          agencia: this.selectedAgencia.id,
          page: page,
          limit: fetchCount,
          order_direction: this.orderDirection,
          order_by: headerSortBy,
          filter: "nb_cliente,rif_cedula",
          filter_value: this.filter,
        },
      });
    },
    // Metodo para Setear Datos en Tabla
    setDataTable(res, dataRes) {
      this[dataRes] = res.data;
      this.pagination.page = res.currentPage;
      this.currentPage = res.currentPage;
      this.pagination.rowsNumber = res.total;
      this.pagination.rowsPerPage = res.limit;
      this.loading = false;
      for (var e = 0, len = this.clientes.length; e < len; e++) {
        if (this.clientes[e].cte_decontado === "1") {
          this.clientes[e].cte_decontado = "🏴";
        }
        if (this.clientes[e].cte_decontado === "0") {
          this.clientes[e].cte_decontado = "";
        }
        if (e == this.clientes.length - 1) break;
      }
    },
    // Metodo para Filtrar Selects
    filterArray(val, update, abort, pagina, array, element) {
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
    // Metodo para Resetear Carga
    resetLoading() {
      this.loading = false;
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

    // Metodo para hacer Get de datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para hacer Get de Agentes
    getDataClientes(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          agencia: this.selectedAgencia.id,
          page: 1,
          limit: 5,
          order_direction: this.orderDirection,
          filter: "nb_cliente,rif_cedula",
          filter_value: this.filter,
          order_direction: this.orderDirection,
          order_by: this.pagination.sortBy,
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Datos Iniciales
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      this.$refs.methods.getData(`/paises`, `setData`, `paises`);
      this.$refs.methods.getData(`/clientes`, "setDataTable", `clientes`, {
        headers: {
          agencia: this.agencias[0].id,
          page: 1,
          limit: 5,
        },
      });
      this.$refs.methods.getData(`/agentes`, `setPaginatedData`, `agentes`, {
        headers: {
          agencia: this.agencias[0].id,
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
    },
    // Metodo para Setear Datos Paginados
    setPaginatedData(res, dataRes) {
      this[dataRes] = res.data;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(res, dataRes) {
      this.loading = false;
      this.resetForm();
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
      var cod_agente = res.cod_agente;
      var cod_parroquia = res.cod_parroquia;
      var cod_localidad = res.cod_localidad;
      var cod_municipio = res.cod_municipio;
      var cod_ciudad = res.cod_ciudad;
      api
        .get(`/agentes`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            agencia: this.selectedAgencia.id,
          },
        })
        .then((res) => {
          this.agentes = res.data.data;
          for (var i = 0; i <= this.agentes.length - 1; i++) {
            if (this.agentes[i].id == cod_agente) {
              this.form.cod_agente = this.agentes[i];
              break;
            }
          }
        });
      api
        .get(`/municipios/${cod_municipio}`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          this.form.cod_municipio = res.data.desc_municipio;
          var cod_municipio = res.data.id;
          var cod_estado = res.data.cod_estado;

          api
            .get(`/municipios`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                estado: cod_estado,
              },
            })
            .then((res) => {
              this.municipios = res.data.data;
            });

          api
            .get(`/parroquias`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                municipio: cod_municipio,
              },
            })
            .then((res) => {
              this.parroquias = res.data.data;
              for (var i = 0; i <= this.parroquias.length - 1; i++) {
                if (this.parroquias[i].id == cod_parroquia) {
                  this.form.cod_parroquia = this.parroquias[i];
                  break;
                }
              }
            });

          api
            .get(`/localidades`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                estado: cod_estado,
              },
            })
            .then((res) => {
              this.localidades = res.data.data;
              for (var i = 0; i <= this.localidades.length - 1; i++) {
                if (this.localidades[i].id == cod_localidad) {
                  this.form.cod_localidad = this.localidades[i];
                  break;
                }
              }
            });

          api
            .get(`/ciudades`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                estado: cod_estado,
              },
            })
            .then((res) => {
              this.ciudades = res.data.data;
              for (var i = 0; i <= this.ciudades.length - 1; i++) {
                if (this.ciudades[i].id == cod_ciudad) {
                  this.ciudad = this.ciudades[i];
                  break;
                }
              }
            });

          api
            .get(`/estados/${cod_estado}`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              this.estado = res.data.desc_estado;
              var paisHeader = res.data.cod_pais;
              api
                .get(`/estados`, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    pais: paisHeader,
                  },
                })
                .then((res) => {
                  this.estados = res.data.data;
                  this.pais = res.data.data[0].paises.desc_pais;
                });
            });
        });
    },
    // Metodo para Eliminar Datos
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/clientes/${idpost}`, "getDataClientes");
      this.loading = true;
    },
    // Metodo para Editar y Crear Datos
    sendData() {
      if (this.form.cte_decontado === "1") {
        for (var e = 0, len = this.clientes.length; e < len; e++) {
          if (this.clientes[e].cte_decontado === "🏴") {
            this.clienteParticularExistente();
            return;
          }
          if (e == this.clientes.length - 1) break;
        }
      }
      this.form.cod_agencia = this.selectedAgencia.id;
      this.form.cod_agente = this.form.cod_agente.id;
      this.form.cod_localidad = this.form.cod_localidad.id;
      this.form.cod_municipio = this.form.cod_municipio.id;
      this.form.cod_parroquia = this.form.cod_parroquia.id;
      this.form.cod_ciudad = this.ciudad.id;
      this.form.modalidad_pago = this.form.modalidad_pago.value;
      this.form.flag_activo = this.form.flag_activo.value;
      this.form.tipo_persona = this.form.tipo_persona.value;
      if (!this.form.id) {
        this.$refs.methods.createData(
          `/clientes`,
          this.form,
          "getDataClientes"
        );
        this.dialog = false;
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/clientes/${this.form.id}`,
          this.form,
          "getDataClientes"
        );
        this.dialog = false;
        this.loading = true;
      }
    },
    // Metodo para Resetear Formulario
    resetForm() {
      delete this.form.id;
      this.form.nb_cliente = "";
      this.form.rif_cedula = "";
      this.form.nit = "";
      this.form.dir_correo = "";
      this.form.dir_fiscal = "";
      this.form.email = "";
      this.form.tlf_cliente = "";
      this.form.fax = "";
      this.form.razon_social = "";
      this.form.tipo_persona = "";
      this.form.modalidad_pago = "";
      this.form.persona_contacto = "";
      this.form.observacion = "";
      this.form.cte_decontado = "";
      this.form.tipo_persona_new = "";
      this.form.flag_activo = "";
      this.form.cod_agencia = "";
      this.form.cod_agente = "";
      this.form.cod_municipio = "";
      this.form.cod_parroquia = "";
      this.form.cod_localidad = "";
      this.form.cte_decontado = "0";
      this.municipios = [];
      this.parroquias = [];
      this.localidades = [];
      this.estados = [];
      this.ciudades = [];
      this.pais = [];
      this.estado = [];
      this.ciudad = [];
    },
    // Metodo para Get de Localidades
    getDataLocalidades(sub_location, update, axiosConfig) {
      this.$refs.methods.getData(
        `/${sub_location}`,
        `${update}`,
        `${sub_location}`,
        axiosConfig
      );
    },
  },
};
</script>

<style>
.hide {
  display: none;
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

@media screen and (min-width: 600px) {
  .cardMargin {
    padding-right: 20px !important;
  }
}

@media screen and (min-width: 1024px) {
  .cardMarginLast {
    padding-right: 20px !important;
  }
}

@media screen and (max-width: 1024px) {
  .buttonMargin {
    margin-bottom: 15px !important;
  }
}

@media screen and (max-width: 1024px) {
  .selectMovil {
    margin-bottom: 15px !important;
  }
}
</style>
