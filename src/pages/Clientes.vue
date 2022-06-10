<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="form">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createDataClientes()">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nb_cliente"
                  label="Nombre"
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
                  v-model="formClientes.rif_cedula"
                  label="RIF"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.rif_cedula =
                      formClientes.rif_cedula.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull20]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.nit"
                  label="NIT"
                  hint=""
                  @update:model-value="
                    formClientes.nit = formClientes.nit.toUpperCase()
                  "
                  :rules="[reglasAllowNull20]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientes.tipo_persona"
                  label="Tipo Persona"
                  hint=""
                  class="pcform"
                  :rules="[reglasInputs]"
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
                  v-model="formClientes.tlf_cliente"
                  label="Telefono"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.tlf_cliente =
                      formClientes.tlf_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.fax"
                  label="Fax"
                  hint=""
                  @update:model-value="
                    formClientes.fax = formClientes.fax.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull65]"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.persona_contacto"
                  label="Persona Contacto"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.persona_contacto =
                      formClientes.persona_contacto.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.dir_fiscal"
                  label="Direccion Fiscal"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.dir_fiscal =
                      formClientes.dir_fiscal.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-3 col-xs-12" style="margin-bottom: 20px">
                <q-checkbox
                  size="lg"
                  v-model="formClientes.cte_decontado"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="¿ES CLIENTE PARTICULAR"
                />
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.razon_social"
                  label="Razon Social"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formClientes.razon_social =
                      formClientes.razon_social.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formClientes.dir_correo"
                  label="Direccion Correo"
                  type="email"
                  hint=""
                  @update:model-value="
                    formClientes.dir_correo =
                      formClientes.dir_correo.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formClientes.flag_activo"
                  label="Estatus"
                  hint=""
                  class="pcform"
                  :rules="[reglasSelect]"
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
                  v-model="formClientes.observacion"
                  label="Observaciones"
                  hint=""
                  @update:model-value="
                    formClientes.observacion =
                      formClientes.observacion.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull100]"
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
                        :rules="[reglasInputs]"
                        :options="paises"
                        lazy-rules
                        option-label="desc_pais"
                        option-value="id"
                        @update:model-value="
                          this.location_input = this.pais.id;
                          getDataLocalidades(
                            `paises`,
                            'estados',
                            'setDataEstados'
                          );
                        "
                      >
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
                        :rules="[reglasInputs]"
                        :options="estados"
                        lazy-rules
                        option-label="desc_estado"
                        option-value="id"
                        @update:model-value="
                          this.location_input = this.estado.id;
                          getDataLocalidades(
                            'estados',
                            'municipios',
                            'setDataMunicipios'
                          );
                          getDataLocalidades(
                            'estados',
                            'localidades',
                            'setDataLocalidades'
                          );
                          getDataLocalidades(
                            'estados',
                            'ciudades',
                            'setDataCiudades'
                          );
                        "
                      >
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
                        :rules="[reglasInputs]"
                        :options="ciudades"
                        lazy-rules
                        option-label="desc_ciudad"
                        option-value="id"
                      >
                        <template v-slot:prepend>
                          <q-icon name="south_america" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="formClientes.cod_municipio"
                        label="Municipio"
                        hint=""
                        class="pcform"
                        :rules="[reglasInputs]"
                        :options="municipios"
                        option-label="desc_municipio"
                        option-value="id"
                        lazy-rules
                        @update:model-value="
                          this.location_input =
                            this.formClientes.cod_municipio.id;
                          getDataLocalidades(
                            'municipios',
                            'parroquias',
                            'setDataParroquias'
                          );
                        "
                      >
                        <template v-slot:prepend>
                          <q-icon name="south_america" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="formClientes.cod_parroquia"
                        label="Parroquia"
                        hint=""
                        class="pcform"
                        :rules="[reglasInputs]"
                        :options="parroquias"
                        option-label="desc_parroquia"
                        option-value="id"
                        lazy-rules
                      >
                        <template v-slot:prepend>
                          <q-icon name="south_america" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="formClientes.cod_localidad"
                        label="Localidad"
                        hint=""
                        :rules="[reglasInputs]"
                        :options="localidades"
                        option-label="desc_localidad"
                        option-value="id"
                        lazy-rules
                      >
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
                        v-model="formClientes.cod_agente"
                        label="Agente de Venta"
                        hint=""
                        class="pcform"
                        :rules="[reglasInputs]"
                        :options="agentes"
                        option-label="persona_responsable"
                        option-value="id"
                        lazy-rules
                      >
                        <template v-slot:prepend>
                          <q-icon name="face" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-6 col-xs-12">
                      <q-select
                        outlined
                        v-model="formClientes.modalidad_pago"
                        label="Modalidad de Pago"
                        hint=""
                        :rules="[reglasInputs]"
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
                label="Añadir Cliente"
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
    <q-dialog v-model="formEdit">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="putDataClientes()">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditClientes.nb_cliente"
                  label="Nombre"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEditClientes.nb_cliente =
                      formEditClientes.nb_cliente.toUpperCase()
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
                  v-model="formEditClientes.rif_cedula"
                  label="RIF"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEditClientes.rif_cedula =
                      formEditClientes.rif_cedula.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull20]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditClientes.nit"
                  label="NIT"
                  hint=""
                  @update:model-value="
                    formEditClientes.nit = formEditClientes.nit.toUpperCase()
                  "
                  :rules="[reglasAllowNull20]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEditClientes.tipo_persona"
                  label="Tipo Persona"
                  hint=""
                  class="pcform"
                  :rules="[reglasInputs]"
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
                  v-model="formEditClientes.tlf_cliente"
                  label="Telefono"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEditClientes.tlf_cliente =
                      formEditClientes.tlf_cliente.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditClientes.fax"
                  label="Fax"
                  hint=""
                  @update:model-value="
                    formEditClientes.fax = formEditClientes.fax.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull65]"
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditClientes.persona_contacto"
                  label="Persona Contacto"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEditClientes.persona_contacto =
                      formEditClientes.persona_contacto.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditClientes.dir_fiscal"
                  label="Direccion Fiscal"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEditClientes.dir_fiscal =
                      formEditClientes.dir_fiscal.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-3 col-xs-12" style="margin-bottom: 20px">
                <q-checkbox
                  size="lg"
                  v-model="formEditClientes.cte_decontado"
                  true-value="1"
                  false-value="0"
                  style="font-size: 13px"
                  label="¿ES CLIENTE PARTICULAR"
                />
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditClientes.razon_social"
                  label="Razon Social"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEditClientes.razon_social =
                      formEditClientes.razon_social.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasNotNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditClientes.dir_correo"
                  label="Direccion Correo"
                  type="email"
                  hint=""
                  @update:model-value="
                    formEditClientes.dir_correo =
                      formEditClientes.dir_correo.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull100]"
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEditClientes.flag_activo"
                  label="Estatus"
                  hint=""
                  class="pcform"
                  :rules="[reglasSelect]"
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
                  v-model="formEditClientes.observacion"
                  label="Observaciones"
                  hint=""
                  @update:model-value="
                    formEditClientes.observacion =
                      formEditClientes.observacion.toUpperCase()
                  "
                  lazy-rules
                  :rules="[reglasAllowNull100]"
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
                        :rules="[reglasInputs]"
                        :options="paises"
                        lazy-rules
                        option-label="desc_pais"
                        option-value="id"
                        @update:model-value="
                          this.location_input = this.pais.id;
                          getDataLocalidades(
                            `paises`,
                            'estados',
                            'setDataEstados'
                          );
                        "
                      >
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
                        hint=""
                        :rules="[reglasInputs]"
                        class="pcform"
                        :options="estados"
                        lazy-rules
                        option-label="desc_estado"
                        option-value="id"
                        @update:model-value="
                          this.location_input = this.estado.id;
                          getDataLocalidades(
                            'estados',
                            'municipios',
                            'setDataMunicipios'
                          );
                          getDataLocalidades(
                            'estados',
                            'localidades',
                            'setDataLocalidades'
                          );
                          getDataLocalidades(
                            'estados',
                            'ciudades',
                            'setDataCiudades'
                          );
                        "
                      >
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
                        :rules="[reglasInputs]"
                        :options="ciudades"
                        lazy-rules
                        option-label="desc_ciudad"
                        option-value="id"
                      >
                        <template v-slot:prepend>
                          <q-icon name="south_america" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="formEditClientes.cod_municipio"
                        label="Municipio"
                        hint=""
                        class="pcform"
                        :rules="[reglasInputs]"
                        :options="municipios"
                        option-label="desc_municipio"
                        option-value="id"
                        lazy-rules
                        @update:model-value="
                          this.location_input =
                            this.formEditClientes.cod_municipio.id;
                          getDataLocalidades(
                            'municipios',
                            'parroquias',
                            'setDataParroquias'
                          );
                        "
                      >
                        <template v-slot:prepend>
                          <q-icon name="south_america" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="formEditClientes.cod_parroquia"
                        label="Parroquia"
                        hint=""
                        class="pcform"
                        :rules="[reglasInputs]"
                        :options="parroquias"
                        option-label="desc_parroquia"
                        option-value="id"
                        lazy-rules
                      >
                        <template v-slot:prepend>
                          <q-icon name="south_america" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-4 col-xs-12">
                      <q-select
                        outlined
                        v-model="formEditClientes.cod_localidad"
                        label="Localidad"
                        hint=""
                        :rules="[reglasInputs]"
                        :options="localidades"
                        option-label="desc_localidad"
                        option-value="id"
                        lazy-rules
                      >
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
                        v-model="formEditClientes.cod_agente"
                        label="Agente de Venta"
                        hint=""
                        class="pcform"
                        :rules="[reglasInputs]"
                        :options="agentes"
                        option-label="persona_responsable"
                        option-value="id"
                        lazy-rules
                      >
                        <template v-slot:prepend>
                          <q-icon name="face" />
                        </template>
                      </q-select>
                    </div>

                    <div class="col-md-6 col-xs-12">
                      <q-select
                        outlined
                        v-model="formEditClientes.modalidad_pago"
                        label="Modalidad de Pago"
                        hint=""
                        :rules="[reglasInputs]"
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
                label="Editar Cliente"
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

    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="row">
          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12"
            style="align-self: center; text-align: center"
          >
            <h4 style="font-size: 27px" class="text-secondary">
              <strong>MANTENIMIENTO - CLIENTES</strong>
            </h4>
          </div>

          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputestadospc"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-select
              rounded
              transition-show="flip-up"
              transition-hide="flip-down"
              :options="agencias"
              option-label="nb_agencia"
              option-value="id"
              v-model="selectedAgencia"
              outlined
              standout
              label="Escoge una Agencia"
              @update:model-value="
                getData(
                  `/agencias/${this.selectedAgencia.id}/clientes`,
                  'setDataClientes',
                  'clientes'
                );
                getData(
                  `/agencias/${this.selectedAgencia.id}/agentes`,
                  'setDataAgentes',
                  'agentes'
                );
              "
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-select>
          </div>

          <div
            class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputestadospc2"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <q-input
              rounded
              outlined
              standout
              v-model="filter"
              type="search"
              label="Búsqueda avanzada"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>

          <div
            class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar Cliente"
              rounded
              color="primary"
              @click="form = true"
              @click.capture="resetForm()"
              :disabled="this.disabledCreate"
              class="q-px-xl q-py-xs insertarestadosmovil"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md" style="margin-top: 20px">
          <div class="q-gutter-y-md">
            <div bordered flat class="my-card row">
              <q-table
                :rows="clientes"
                row-key="id"
                :columns="columnsClientes"
                :separator="separator"
                class="my-sticky-column-table"
                :filter="filter"
                style="width: 100%"
                :grid="$q.screen.xs"
                v-model:pagination="pagination"
              >
                <template v-slot:body-cell-action="props">
                  <q-td :props="props">
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="edit"
                      :disabled="this.disabledEdit"
                      @click="
                        getData(
                          `/clientes/${props.row.id}`,
                          'setDataEdit',
                          'formEditClientes'
                        );
                        formEdit = true;
                      "
                    ></q-btn>
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="delete"
                      :disabled="this.disabledDelete"
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
                              :disabled="this.disabledEdit"
                              @click="
                                getData(
                                  `/clientes/${props.row.id}`,
                                  'setDataEdit',
                                  'formEditClientes'
                                );
                                formEdit = true;
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
                              :disabled="this.disabledDelete"
                              @click="selected = props.row.id"
                              @click.capture="clientesDelete = true"
                            ></q-btn>
                            <q-item-label
                              v-else
                              caption
                              :class="col.classes ? col.classes : ''"
                              >{{ col.value }}</q-item-label
                            >
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
      @desactivar-Crud-Clientes="desactivarCrudClientes"
    ></desactive-crud>
    <methods
      ref="methods"
      @get-data="
        getData(
          `/agencias/${this.selectedAgencia.id}/clientes`,
          'setDataClientes',
          'clientes'
        )
      "
      @set-Data-Clientes="setDataClientes"
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
      columnsClientes: [
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
        {
          name: "action",
          label: "Acciones",
          align: "center",
          sortable: true,
          required: true,
        },
      ],
      formClientes: {
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
      formEditClientes: {
        descripcion: "",
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
        cod_agente: [],
        cod_ciudad: [],
        cod_municipio: [],
        cod_parroquia: [],
        cod_localidad: [],
        id: "",
      },
      pais: "",
      estado: "",
      ciudad: "",
      location_input: "",
      agencias: [],
      paises: [],
      estados: [],
      ciudades: [],
      municipios: [],
      parroquias: [],
      localidades: [],
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
      agenciaRef: "",
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
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
      separator: ref("vertical"),
      form: ref(false),
      formEdit: ref(false),
      clientesDelete: ref(false),
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
    this.$refs.methods.getData("/agencias", "setDataIniciar", "agencias", this.axiosConfig);
    this.$refs.desactivateCrud.desactivarCrud(
      "c_roles",
      "d_roles",
      "u_roles",
      "desactivarCrudClientes"
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
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
      if (val === "") {
        return "Debes Seleccionar Algo";
      }
    },
    reglasNotNull100(val) {
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 99) {
            return "Deben ser Maximo 100 caracteres";
          }
      }
    },
    reglasNotNull20(val) {
        if (val !== null !== "") {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 19) {
            return "Deben ser Maximo 19 caracteres";
          }
      }
    },
    reglasNotNull200(val) {
        if (val !== null !== "") {
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
    desactivarCrudClientes(createItem, deleteItem, updateItem) {
      if (createItem == true) {
        this.disabledCreate = false;
      }
      if (deleteItem == true) {
        this.disabledDelete = false;
      }
      if (updateItem == true) {
        this.disabledEdit = false;
      }
    },

    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
    },
    setDataIniciar(res, dataRes) {
      this[dataRes] = res;
      this.getDataIniciar();
    },
    setDataClientes(res, dataRes) {
      this[dataRes] = res.clientes;
        for (var e = 0, len = this.clientes.length; e < len; e++) {
          if (this.clientes[e].cte_decontado === "1") {
            this.clientes[e].cte_decontado = "🏴"
          }
          if (this.clientes[e].cte_decontado === "0") {
            this.clientes[e].cte_decontado = ""
          }
          if (e == this.clientes.length - 1) break;
        }
    },
    setDataEdit(res, dataRes) {
      this.resetFormEdit();
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
      this[dataRes].cod_ciudad = res.cod_ciudad;
      var cod_agente = res.cod_agente;
      var cod_parroquia = res.cod_parroquia
      var cod_localidad = res.cod_localidad
      api.get(`/municipios/${res.cod_municipio}`, this.axiosConfig)
        .then((res) => {
          this.formEditClientes.cod_municipio = res.data.desc_municipio;
          var cod_municipio = res.data.id;
          var cod_estado = res.data.cod_estado;
          var cod_ciudad = this[dataRes].cod_ciudad;

          api.get(`/estados/${cod_estado}/municipios`, this.axiosConfig)
            .then((res) => {
              this.municipios = res.data.municipios;
            });

          api.get(`/municipios/${cod_municipio}/parroquias`, this.axiosConfig)
            .then((res) => {
              this.parroquias = res.data.parroquias;
            });

          api.get(`/estados/${cod_estado}/localidades`, this.axiosConfig)
            .then((res) => {
              this.localidades = res.data.localidades;
            });

          api.get(`/estados/${cod_estado}/ciudades`, this.axiosConfig)
            .then((res) => {
              this.ciudades = res.data.ciudades;
            });

          api.get(`/ciudades/${cod_ciudad}`, this.axiosConfig).then((res) => {
            this.ciudad = res.data.desc_ciudad;
          });

          api.get(`/estados/${cod_estado}`, this.axiosConfig).then((res) => {
            this.estado = res.data.desc_estado;

            api.get(`/paises/${res.data.cod_pais}/estados`, this.axiosConfig)
              .then((res) => {
                this.estados = res.data.estados;
                this.pais = res.data.desc_pais;
              });
          });

          api.get(`/agentes/${cod_agente}`, this.axiosConfig).then((res) => {
            this.formEditClientes.cod_agente = res.data.persona_responsable;
          });

          api.get(`/parroquias/${cod_parroquia}`, this.axiosConfig).then((res) => {
            this.formEditClientes.cod_parroquia = res.data.desc_parroquia;
          });

          api.get(`/localidades/${cod_localidad}`, this.axiosConfig).then((res) => {
            this.formEditClientes.cod_localidad = res.data.desc_localidad;
          });
        });
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/clientes/${idpost}`, "getData", this.axiosConfig);
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
      this.$refs.methods.createData(`/clientes`, this.formClientes, "getData", this.axiosConfig);
      this.form = false;
    },
    putDataClientes() {
      this.formEditClientes.cod_agencia = this.selectedAgencia.id;
      this.formEditClientes.cod_agente = this.formEditClientes.cod_agente.id;
      this.formEditClientes.cod_localidad = this.formEditClientes.cod_localidad.id;
      this.formEditClientes.cod_municipio = this.formEditClientes.cod_municipio.id;
      this.formEditClientes.cod_parroquia = this.formEditClientes.cod_parroquia.id;
      this.formEditClientes.cod_ciudad = this.ciudad.id;
      this.formEditClientes.modalidad_pago = this.formEditClientes.modalidad_pago.value;
      this.formEditClientes.flag_activo = this.formEditClientes.flag_activo.value;
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
      this.formEditClientes.tipo_persona = this.formEditClientes.tipo_persona.value;
      this.$refs.methods.putData(
        `/clientes/${this.formEditClientes.id}`,
        this.formEditClientes,
        "getData",
        this.axiosConfig
      );
      this.formEdit = false;
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
      this.$refs.methods.getData(`/paises`, `setDataPaises`, `paises`, this.axiosConfig);
      this.$refs.methods.getData(
        `/agencias/${this.agenciaRef}/clientes`,
        "setDataClientes",
        `clientes`, this.axiosConfig
      );
      this.$refs.methods.getData(
        `/agencias/${this.agenciaRef}/agentes`,
        `setDataAgentes`,
        `agentes`, this.axiosConfig
      );
    },

    getDataLocalidades(location, sub_location, update) {
      this.$refs.methods.getData(
        `/${location}/${this.location_input}/${sub_location}`,
        `${update}`,
        `${sub_location}`, this.axiosConfig
      );
    },
    setDataAgentes(res, dataRes) {
      this[dataRes] = res.agentes;
    },
    setDataPaises(res, dataRes) {
      this[dataRes] = res;
    },
    setDataCiudades(res, dataRes) {
      this[dataRes] = res.ciudades;
      this.ciudad = "";
    },
    setDataEstados(res, dataRes) {
      this[dataRes] = res.estados;
      this.estado = "";
      this.ciudad = "";
      this.localidades = [];
      this.municipios = [];
      this.parroquias = [];
      this.ciudades = []
      this.formEditClientes.cod_localidad = "";
      this.formEditClientes.cod_municipio = "";
      this.formEditClientes.cod_parroquia = "";
      this.formClientes.cod_localidad = "";
      this.formClientes.cod_municipio = "";
      this.formClientes.cod_parroquia = "";
    },
    setDataMunicipios(res, dataRes) {
      this[dataRes] = res.municipios;
      this.formEditClientes.cod_parroquia = "";
      this.formEditClientes.cod_municipio = "";
      this.formClientes.cod_parroquia = "";
      this.formClientes.cod_municipio = "";
    },
    setDataParroquias(res, dataRes) {
      this[dataRes] = res.parroquias;
      this.formEditClientes.cod_parroquia = "";
      this.formClientes.cod_parroquia = "";
    },
    setDataLocalidades(res, dataRes) {
      this[dataRes] = res.localidades;
    },
  },
};
</script>
