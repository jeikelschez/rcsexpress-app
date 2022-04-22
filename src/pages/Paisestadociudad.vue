<template>
  <q-page class="q-pa-md">
    <q-dialog v-model="paisesForm">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="createDataPaises()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formPaises.desc_pais"
                  label="País"
                  hint=""
                  class="pcform"
                  lazy-rules
                  @update:model-value="
                    formPaises.desc_pais = formPaises.desc_pais.toUpperCase()
                  "
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe un Pais',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  :options="tipoDePais"
                  v-model="formPaises.tipo_pais"
                  label="Tipo de País"
                  input-class="input"
                  hint=""
                  :rules="[reglasInputs]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="format_list_bulleted" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar País"
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

    <q-dialog v-model="paisesFormEdit">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="putDataPaises()">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditPaises.desc_pais"
                  label="País"
                  hint=""
                  input-class="input"
                  class="pcform"
                  lazy-rules
                  @update:model-value="
                    formEditPaises.desc_pais =
                      formEditPaises.desc_pais.toUpperCase()
                  "
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe un Pais',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  :options="tipoDePais"
                  v-model="formEditPaises.tipo_pais"
                  label="Tipo de País"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="format_list_bulleted" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Pais"
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

    <q-dialog v-model="estadosForm">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="createDataEstados()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEstados.desc_estado"
                  label="Estado"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEstados.desc_estado =
                      formEstados.desc_estado.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe un Estado',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="formEstados.siglas"
                  label="Siglas de Estado"
                  @update:model-value="
                    formEstados.siglas = formEstados.siglas.toUpperCase()
                  "
                  mask="AAAA"
                  hint=""
                  lazy-rules
                  :rules="reglasSiglas"
                >
                  <template v-slot:prepend>
                    <q-icon name="text_fields" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Estado"
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

    <q-dialog v-model="estadosFormEdit">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="putDataEstados()">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditEstados.desc_estado"
                  label="Estado"
                  hint=""
                  class="pcform"
                  @update:model-value="
                    formEditEstados.desc_estado =
                      formEditEstados.desc_estado.toUpperCase()
                  "
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe un Estado',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditEstados.siglas"
                  label="Siglas"
                  mask="AAAA"
                  hint=""
                  :rules="reglasSiglas"
                  @update:model-value="
                    formEditEstados.siglas =
                      formEditEstados.siglas.toUpperCase()
                  "
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="text_fields" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Estado"
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

    <q-dialog v-model="ciudadesForm">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="createDataCiudades()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formCiudades.desc_ciudad"
                  label="Ciudad"
                  @update:model-value="
                    formCiudades.desc_ciudad =
                      formCiudades.desc_ciudad.toUpperCase()
                  "
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe una Ciudad',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="formCiudades.siglas"
                  label="Siglas de Ciudad"
                  mask="AAAA"
                  @update:model-value="
                    formCiudades.siglas = formCiudades.siglas.toUpperCase()
                  "
                  hint=""
                  lazy-rules
                  :rules="reglasSiglas"
                >
                  <template v-slot:prepend>
                    <q-icon name="text_fields" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="formCiudades.cod_region"
                  label="Región"
                  hint=""
                  :rules="[reglasInputs]"
                  :options="tipoDeRegion"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="formCiudades.check_urbano"
                  label="Zona Horaria"
                  input-class="input"
                  :rules="[reglasInputs]"
                  hint=""
                  :options="tipoDeZona"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="corporate_fare" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Ciudad"
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

    <q-dialog v-model="ciudadesformedit">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="putDataCiudades()">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditCiudades.desc_ciudad"
                  @update:model-value="
                    formEditCiudades.desc_ciudad =
                      formEditCiudades.desc_ciudad.toUpperCase()
                  "
                  label="Estado"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe un Estado',
                  ]"
                >
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditCiudades.siglas"
                  label="Siglas"
                  mask="AAAA"
                  @update:model-value="
                    formEditCiudades.siglas =
                      formEditCiudades.siglas.toUpperCase()
                  "
                  :rules="reglasSiglas"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="text_fields" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select
                  outlined
                  v-model="formEditCiudades.cod_region"
                  label="Región"
                  input-class="input"
                  hint=""
                  :options="tipoDeRegion"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select
                  outlined
                  v-model="formEditCiudades.check_urbano"
                  label="Zona Horaria"
                  input-class="input"
                  :options="tipoDeZona"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="corporate_fare" />
                  </template>
                </q-select>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Ciudad"
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

    <div class="row q-pa-sm">
      <div
        class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-right: 16px"
      >
        <h4>Mantenimiento - País, Estado, Ciudad</h4>
      </div>
      <div
        class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-12"
        style="align-self: center;text-align: center; justify-center margin-right:16px"
      >
        <q-option-group
          v-model="slide"
          :options="controlTypeOptions"
          inline
          size="55px"
          style="font-size: 18px"
        />
      </div>

      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        animated
        :control-type="controlType"
        class="rounded-borders col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 justify-center"
      >
        <q-carousel-slide name="paises"
          class="flex-center col-md-11 col-xl-9 col-lg-9 col-xs-12 col-sm-12"
        >
          <div class="col-md-11 col-xl-9 col-lg-9 col-xs-12 col-sm-12">
            <div class="col-md-11 col-xl-9 col-lg-9 col-xs-12 col-sm-12">
              <div class="row">
                <div
                  class="col-md-8 col-xl-8 col-lg-8 col-xs-11 col-sm-6"
                  style="
                    align-self: center;
                    margin-left: 20px;
                    margin-right: 80px;
                  "
                >
                  <q-input
                    rounded
                    outlined
                    standout
                    v-model="filterPaises"
                    type="search"
                    label="Búsqueda avanzada"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
                <div
                  class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-2"
                  style="text-align: center; align-self: center"
                >
                  <q-btn
                    label="Insertar"
                    rounded
                    color="primary"
                    @click="paisesForm = true"
                    :disabled="this.disabledCreate"
                    @click.capture="resetFormPaises"
                    size="16px"
                    class="q-px-xl q-py-xs insertarmovil"
                  ></q-btn>
                </div>
              </div>

              <div class="q-pa-md" style="margin-top: 20px">
                <div class="q-gutter-y-md">
                  <div bordered flat class="my-card row">
                    <q-table
                      :rows="paises"
                      row-key="id"
                      :columns="columnsPaises"
                      :separator="separator"
                      class="my-sticky-column-table"
                      :filter="filterPaises"
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
                            getDataPaises(`/paises/${props.row.id}`, 'setDataPaisesEdit', 'formEditPaises');
                            paisesFormEdit = true;
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
                            @click.capture="paisesDelete = true"
                          ></q-btn>
                        </q-td>
                      </template>
                      <template v-slot:item="props">
                        <div
                          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                          :style="
                            props.selected ? 'transform: scale(0.95);' : ''
                          "
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
                                      getDataPaises(`/paises/${props.row.id}`, 'setDataPaisesEdit', 'formEditPaises');
                                      paisesFormEdit = true;
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
                                    @click.capture="paisesDelete = true"
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
        </q-carousel-slide>
        <q-carousel-slide name="estados"
          class="flex-center col-md-11 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        >
          <div class="col-xl-12 col-lg-12 col-xs-12 col-sm-12">
            <div class="col-md-11 col-xl-9 col-lg-9 col-xs-12 col-sm-12">
              <div class="row">
                <div
                  class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputestadospc"
                >
                  <q-select
                    rounded
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="paises"
                    option-label="desc_pais"
                    option-value="id"
                    v-model="selectedPais"
                    outlined
                    standout
                    label="Escoge un país"
                    @update:model-value="getDataEstados(`/paises/${this.selectedPais.id}/estados`, 'setDataEstados', 'estados')"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>
                <div
                  class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-6 inputestadospc2"
                >
                  <q-input
                    rounded
                    outlined
                    standout
                    v-model="filterEstados"
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
                    label="Insertar"
                    rounded
                    color="primary"
                    :disabled="this.disabledCreate"
                    @click="estadosForm = true"
                    @click.capture="resetFormCiudades"
                    size="16px"
                    class="q-px-xl q-py-xs insertarestadosmovil"
                  ></q-btn>
                </div>
              </div>

              <div class="q-pa-md" style="margin-top: 20px">
                <div class="q-gutter-y-md">
                  <div bordered flat class="my-card row">
                    <q-table
                      :rows="estados"
                      row-key="id"
                      :columns="columnsEstados"
                      :separator="separator"
                      class="my-sticky-column-table"
                      :filter="filterEstados"
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
                              getDataEstados(`/estados/${props.row.id}`, 'SetDataEstadosEdit', 'formEditEstados');
                              estadosFormEdit = true;
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
                            @click.capture="estadosDelete = true"
                          ></q-btn>
                        </q-td>
                      </template>
                      <template v-slot:item="props">
                        <div
                          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                          :style="
                            props.selected ? 'transform: scale(0.95);' : ''
                          "
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
                                      getDataEstados(`/estados/${props.row.id}`, 'SetDataEstadosEdit', 'formEditEstados');
                                      estadosFormEdit = true;
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
                                    @click.capture="estadosDelete = true"
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
        </q-carousel-slide>
        <q-carousel-slide name="ciudades"
          class="flex-center col-md-11 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        >
          <div class="col-md-11 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
            <div class="col-md-11 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
              <div class="row">
                <div
                  class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-5 inputciudadespc"
                >
                  <q-select
                    rounded
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="paises"
                    option-label="desc_pais"
                    option-value="id"
                    v-model="selectedPais2"
                    outlined
                    standout
                    label="Escoge un país"
                    @update:model-value="getDataEstadosSelect(`/paises/${this.selectedPais2.id}/estados`, 'setDataEstadosSelect', 'estadosCiudades')"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>
                <div
                  class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputciudadespc2"
                >
                  <q-select
                    rounded
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="estadosCiudades"
                    option-label="desc_estado"
                    option-value="id"
                    v-model="selectedEstado"
                    outlined
                    standout
                    label="Escoge un estado"
                    @update:model-value="getDataCiudades(`/estados/${this.selectedEstado.id}/ciudades`, 'setDataCiudades', 'ciudades')"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-select>
                </div>
                <div
                  class="col-md-3 col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputpc"
                >
                  <q-input
                    rounded
                    outlined
                    v-model="filterCiudades"
                    standout
                    type="search"
                    label="Búsqueda avanzada"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </div>
                <div
                  class="col-md-2 col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-5 inputpc"
                  style="text-align: center; align-self: center"
                >
                  <q-btn
                    label="Insertar"
                    rounded
                    color="primary"
                    :disabled="this.disabledCreate"
                    @click="ciudadesForm = true"
                    size="16px"
                    class="q-px-xl q-py-xs"
                  ></q-btn>
                </div>
              </div>

              <div class="q-pa-md" style="margin-top: 20px">
                <div class="q-gutter-y-md">
                  <div bordered flat class="my-card row">
                    <q-table
                      :rows="ciudades"
                      row-key="id"
                      :columns="columnsCiudades"
                      :separator="separator"
                      class="my-sticky-column-table"
                      :filter="filterCiudades"
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
                            getDataCiudades(`/ciudades/${props.row.id}`, 'setDataCiudadesEdit', 'formEditCiudades');
                            ciudadesformedit = true;
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
                            @click.capture="ciudadesDelete = true"
                          ></q-btn>
                        </q-td>
                      </template>
                      <template v-slot:item="props">
                        <div
                          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                          :style="
                            props.selected ? 'transform: scale(0.95);' : ''
                          "
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
                                      getDataCiudades(`/ciudades/${props.row.id}`, 'setDataCiudadesEdit', 'formEditCiudades');
                                      ciudadesformedit = true;
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
                                    @click.capture="ciudadesDelete = true"
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
        </q-carousel-slide>
      </q-carousel>
    </div>

    <q-dialog v-model="paisesDelete">
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
            @click="deleteDataPaises(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="estadosDelete">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estás seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="deleteDataEstados(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="ciudadesDelete">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estás seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="deleteDataCiudades(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <user-logout ref="component"
    @get-Data-Paises="getDataPaises('/paises', 'setData', 'paises')"
    @get-Data-Estados="getDataEstados(`/paises/${this.selectedPais.id}/estados`, 'setDataEstados', 'estados')"
    @get-Data-Ciudades="getDataCiudades(`/estados/${this.selectedEstado.id}/ciudades`, 'setDataCiudades', 'ciudades')"
    @set-Data="setData"
    @set-Data-Estados="setDataEstados"
    @set-Data-Paises-Edit="setDataPaisesEdit"
    @set-Data-Estados-Edit="setDataEstadosEdit"
    @set-Data-Estados-Select="setDataEstadosSelect"
    @set-Data-Ciudades="setDataCiudades"
    @set-Data-Ciudades-Edit="setDataCiudadesEdit"
    @desactivar-Crud-Pais-Estado-Ciudad="desactivarCrudPaisEstadoCiudad"
    ></user-logout>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import userLogoutVue from "src/components/userLogout.vue";

import { LocalStorage } from 'quasar';

export default {
  components: { "user-logout": userLogoutVue },
  name: "Bancos",
  data() {
    return {
      controlType: ref("flat"),
      controlTypeOptions: [
        { value: "paises", label: "Paises" },
        { value: "estados", label: "Estados" },
        { value: "ciudades", label: "Ciudades" },
      ],
      slide: ref("paises"),
      columnsPaises: [
        {
          name: "id",
          label: "Código",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "desc_pais",
          label: "País",
          field: "desc_pais",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_pais_desc",
          label: "Tipo de País",
          field: "tipo_pais_desc",
          align: "left",
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
      columnsEstados: [
        {
          name: "id",
          label: "Código",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "desc_estado",
          label: "Estado",
          field: "desc_estado",
          align: "left",
          sortable: true,
        },
        {
          name: "siglas",
          label: "Siglas",
          field: "siglas",
          align: "left",
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
      columnsCiudades: [
        {
          name: "id",
          label: "Código",
          field: "id",
          align: "left",
          sortable: true,
        },
        {
          name: "desc_ciudad",
          label: "Ciudad",
          field: "desc_ciudad",
          align: "left",
          sortable: true,
        },
        {
          name: "siglas",
          label: "Siglas",
          field: "siglas",
          align: "left",
          sortable: true,
        },
        {
          name: "check_urbano_desc",
          label: "Zona Urbana",
          field: "check_urbano_desc",
          align: "left",
          sortable: true,
        },
        {
          name: "cod_region_desc",
          label: "Región",
          field: "cod_region_desc",
          align: "left",
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
      tipoDePais: [
        { label: "NACIONAL", value: "N" },
        { label: "INTERNACIONAL", value: "I" },
      ],
      tipoDeZona: [
        { label: "URBANO", value: "U" },
        { label: "EXTRA URBANO", value: "E" },
      ],
      tipoDeRegion: [
        { label: "CENTRAL", value: "CE" },
        { label: "OCCIDENTAL", value: "OC" },
        { label: "ORIENTAL", value: "OR" },
      ],
      formPaises: {
        desc_pais: "",
        tipo_pais: "",
      },
      formEstados: {
        desc_estado: "",
        siglas: "",
        cod_pais: "",
      },
      formCiudades: {
        desc_ciudad: "",
        siglas: "",
        check_urbano: "",
        cod_region: "",
        cod_estado: "",
      },
      paises: [],
      estados: [],
      ciudades: [],
      estadosCiudades: [],
      formEditPaises: {
        desc_pais: "",
        tipo_pais: "",
        id: "",
      },
      formEditEstados: {
        desc_estado: "",
        siglas: "",
        id: "",
      },
      formEditCiudades: {
        desc_ciudad: "",
        siglas: "",
        check_urbano: "",
        cod_region: "",
        id: "",
      },
      selected: [],
      selectedPais: [],
      selectedPais2: [],
      selectedEstado: [],
      paisRef: "",
      paisRef2: "",
      estadoRef: "",
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
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
      axiosConfig: {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem('token')}`,
        }
      },
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      reglasSiglas: [
        (val) =>
          (val !== null && val !== "") || "Por favor escribe unas Siglas",
        (val) => val.length < 5 || "Deben ser máximo 4 caracteres",
      ],
      paisesForm: ref(false),
      paisesFormEdit: ref(false),
      estadosForm: ref(false),
      estadosFormEdit: ref(false),
      ciudadesForm: ref(false),
      ciudadesformedit: ref(false),
      errorDelServidor() {
        $q.notify({
          message: this.error,
          color: "red",
        });
      },
      añadidoConExito() {
        $q.notify({
          message: "Agregado exitosamente",
          color: "green",
        });
      },
      editadoConExito() {
        $q.notify({
          message: "Editado exitosamente",
          color: "green",
        });
      },
      eliminadoConExito() {
        $q.notify({
          message: "Eliminado exitosamente",
          color: "green",
        });
      },
      estadosDelete: ref(false),
      ciudadesDelete: ref(false),
      paisesDelete: ref(false),
      filterPaises: ref(""),
      filterEstados: ref(""),
      filterCiudades: ref(""),
    };
  },
  mounted() {
    this.getDataPaises('/paises', 'setData', 'paises');
    this.$refs.component.desactivarCrud('c_ciudades', 'd_ciudades', 'u_ciudades', 'desactivarCrudPaisEstadoCiudad')
  },
  methods: {
    // Reglas
    reglasInputs(val) {
      if (val === null) {
        return "Debes Seleccionar Algo";
      }
    },
    desactivarCrudPaisEstadoCiudad(createItem, deleteItem, updateItem) {
      if (createItem == true) {
        this.disabledCreate = false
      }
      if (deleteItem == true) {
        this.disabledDelete = false
      }
      if (updateItem == true) {
        this.disabledEdit = false
      }
    },
    // Metodos para estados
    getDataPaises(url, call, dataRes) {
      this.$refs.component.getData(url, call, dataRes);
    },
    setData(res, dataRes) {
      this[dataRes] = res
      this.getDataIniciar('/paises', 'setData', 'paises');
    }, 
    setDataPaisesEdit(res, dataRes) {
      this[dataRes].desc_pais = res.desc_pais;
      this[dataRes].tipo_pais = res.tipo_pais_desc;
      this[dataRes].id = res.id;
    },    
    deleteDataPaises(idpost) {
      this.$refs.component.deleteData(`/paises/${idpost}`, 'getDataPaises');
    },
    createDataPaises() {
      this.formPaises.tipo_pais = this.formPaises.tipo_pais.value;
      this.$refs.component.createData('/paises', this.formPaises, 'getDataPaises');
      this.resetFormPaises();
    },
    putDataPaises() {
      this.formEditPaises.tipo_pais = this.formEditPaises.tipo_pais.value;
      this.$refs.component.putData(`/paises/${this.formEditPaises.id}`, this.formEditPaises, 'getDataPaises');
      this.edit = false;
      this.resetFormEditPaises()
    },
    resetFormPaises() {
      (this.formPaises.desc_pais = null),
      (this.formPaises.tipo_pais = null),
      (this.paisesForm = false)
    },
    resetFormEditPaises() {
      (this.formEditPaises.desc_pais = null),
      (this.formEditPaises.tipo_pais = null),
      (this.paisesFormEdit = false)
    },
    // Metodos para estados
    getDataEstados(url, call, dataRes) {
      this.$refs.component.getData(url, call, dataRes);
    },
    setDataEstados(res, dataRes) {
      this[dataRes] = res.estados
    },
    setDataEstadosEdit(res, dataRes) {
      this[dataRes].desc_estado = res.desc_estado;
      this[dataRes].siglas = res.siglas;
      this[dataRes].id = res.id;
    },
    deleteDataEstados(idpost) {
      this.$refs.component.deleteData(`/estados/${idpost}`, 'getDataEstados');
    },
    createDataEstados() {
      this.formEstados.cod_pais = this.selectedPais.id;
      this.$refs.component.createData('/estados', this.formEstados, 'getDataEstados');
      this.resetFormEstados();
    },
    putDataEstados() {
      this.$refs.component.putData(`/estados/${this.formEditEstados.id}`, this.formEditEstados, 'getDataEstados');
      this.resetFormEditEstados()
    },
    resetFormEstados() {
      (this.formEstados.desc_estado = null),
        (this.formEstados.siglas = null),
        (this.estadosForm = false)
    },
    resetFormEditEstados() {
      (this.formEditEstados.desc_estado = null),
        (this.formEditEstados.siglas = null),
        (this.estadosFormEdit = false)
    },
    // Metodos para ciudades
    getDataEstadosSelect(url, call, dataRes) {
      this.$refs.component.getData(url, call, dataRes);
    },
    setDataEstadosSelect(res, dataRes) {
      this[dataRes] = res.estados
      this.selectedEstado = "";
    },
    getDataCiudades(url, call, dataRes) {
      this.$refs.component.getData(url, call, dataRes);
    },
    setDataCiudades(res, dataRes) {
      this[dataRes] = res.ciudades;
    },
    setDataCiudadesEdit(res, dataRes) {
      this[dataRes].desc_ciudad = res.desc_ciudad;
      this[dataRes].siglas = res.siglas;
      this[dataRes].check_urbano = res.check_urbano_desc;
      this[dataRes].cod_region = res.cod_region_desc;
      this[dataRes].id = res.id;
    },
    deleteDataCiudades(idpost) {
      this.$refs.component.deleteData(`/ciudades/${idpost}`, 'getDataCiudades');
    },
    createDataCiudades() {
      this.formCiudades.cod_estado = this.selectedEstado.id,
      this.formCiudades.check_urbano = this.formCiudades.check_urbano.value;
      this.formCiudades.cod_region = this.formCiudades.cod_region.value;
      this.$refs.component.createData(`/ciudades`, this.formCiudades, 'getDataCiudades');
      this.resetFormCiudades();
    },
    putDataCiudades() {
      this.formEditCiudades.check_urbano =
      this.formEditCiudades.check_urbano.value;
      this.formEditCiudades.cod_region = this.formEditCiudades.cod_region.value;
      this.$refs.component.putData(`/ciudades/${this.formEditCiudades.id}`, this.formEditCiudades, 'getDataCiudades');
      this.resetFormEditCiudades()
    },
    resetFormCiudades() {
      (this.formCiudades.desc_ciudad = null),
      (this.formCiudades.siglas = null),
      (this.formCiudades.check_urbano = null),
      (this.formCiudades.cod_region = null),
      (this.ciudadesForm = false)
    },
    resetFormEditCiudades() {
      (this.formEditCiudades.desc_ciudad = null),
      (this.formEditCiudades.siglas = null),
      (this.formEditCiudades.check_urbano = null),
      (this.formEditCiudades.cod_region = null),
      (this.ciudadesformedit = false)
    },
    
    // Metodos para colocar valores iniciales
    getDataIniciar() {
      this.paisRef2 = this.paises[0].id;
      this.selectedPais = this.paises[0].desc_pais;
      this.selectedPais2 = this.paises[0];
      this.paisRef = this.paises[0].id;
      api.get(`/paises/${this.paisRef2}/estados`, this.axiosConfig)
      .then((res) => {
        this.estados = res.data.estados;
        this.selectedEstado = res.data.estados[0];
        this.estadosCiudades = res.data.estados;
        this.estadoRef = res.data.estados[0].id;
        api.get(`/estados/${this.estadoRef}/ciudades`, this.axiosConfig)
        .then((res) => {
        this.ciudades = res.data.ciudades;
        })
      })
    },

  },
};
</script>
