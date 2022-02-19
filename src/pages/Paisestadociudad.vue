<template>
  <q-page class="q-pa-md">

    <q-dialog v-model="paisesForm">
      <q-card class="q-pa-md" bordered style="width: 999px">
        <q-card-section>
          <q-form @submit="createDatoPaises()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formPaises.desc_pais"
                  label="Pais"
                  hint=""
                  class="pcform"
                  lazy-rules
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
                  label="Tipo de Pais"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Escribe un Tipo de Pais',
                  ]"
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
                label="Agregar Pais"
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
          <q-form @submit="putDatoPaises()">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditPaises.desc_pais"
                  label="Pais"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe un Nombre',
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
                  label="Tipo de Pais"
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
          <q-form @submit="createDatoEstados()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEstados.desc_estado"
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
                  v-model="formEstados.siglas"
                  label="Siglas de Estado"
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe unas Siglas',
                  ]"
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
          <q-form @submit="putDatoEstados()">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditEstados.desc_estado"
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
                  v-model="formEditEstados.siglas"
                  label="Siglas"
                  hint=""
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
                label="Editar Banco"
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
          <q-form @submit="createDatoCiudades()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formCiudades.desc_ciudad"
                  label="Ciudad"
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
                  hint=""
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Escribe unas Siglas',
                  ]"
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
                  label="Region"
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
                  v-model="formCiudades.check_urbano"
                  label="¿Es Zona Urbana?"
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
          <q-form @submit="putDatoCiudades()">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditCiudades.desc_ciudad"
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
                  label="Region"
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
                  label="¿Es Zona Urbana?"
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
                label="Editar Banco"
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
        <h4>Mantenimiento - Pais, Estado, Ciudad</h4>
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
                    @click.capture="resetFormpaises"
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
                      :loading="loadingTable"
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
                            @click="
                              selectedEdit = props.row.id;
                              getDatosEditPaises(selectedEdit);
                              paisesFormEdit = true;
                            "
                          ></q-btn>
                          <q-btn
                            dense
                            round
                            flat
                            color="primary"
                            icon="delete"
                            @click="
                              selected = props.row.id;
                              getDatosPaises();
                            "
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
                                    @click="
                                      selectedEdit = props.row.id;
                                      getDatosEditPaises(selectedEdit);
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
                                    @click="
                                      selected = props.row.id;
                                      getDatosPaises();
                                    "
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
                    label="Escoge un pais"
                    @update:model-value="getDatosEstadosSelect(selectedPais)"
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
                      :loading="loadingTable"
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
                            @click="
                              selectedEdit = props.row.id;
                              getDatosEditEstados(selectedEdit);
                              estadosFormEdit = true;
                            "
                          ></q-btn>
                          <q-btn
                            dense
                            round
                            flat
                            color="primary"
                            icon="delete"
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
                                    @click="
                                      selectedEdit = props.row.id;
                                      getDatosEditEstados(selectedEdit);
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
                    label="Escoge un pais"
                    @update:model-value="getDatosEstadosSelect2(selectedPais2)"
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
                    @update:model-value="getDatosCiudades(selectedEstado)"
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
                      :loading="loadingTable"
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
                            @click="
                              selectedEdit = props.row.id;
                              getDatosEditCiudades(selectedEdit);
                              ciudadesformedit = true;
                            "
                          ></q-btn>
                          <q-btn
                            dense
                            round
                            flat
                            color="primary"
                            icon="delete"
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
                                    @click="
                                      selectedEdit = props.row.id;
                                      getDatosEditCiudades(selectedEdit);
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
            @click.capture="contactoEliminado"
            @click="DeleteDatoPaises(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="estadosDelete">
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
            @click.capture="contactoEliminado"
            @click="deleteDatoEstados(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="ciudadesDelete">
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
            @click="deleteDatoCiudades(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>

import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

export default {
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
          label: "Pais",
          field: "desc_pais",
          align: "left",
          sortable: true,
        },
        {
          name: "tipo_pais",
          label: "Tipo de Pais",
          field: "tipo_pais",
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
          name: "check_urbano",
          label: "Zona Urbana",
          field: "check_urbano",
          align: "left",
          sortable: true,
        },
        {
          name: "cod_region",
          label: "Region",
          field: "cod_region",
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
      tipoDePais: ["Nacional", "Internacional"],
      tipoDeZona: ["Si", "No"],
      tipoDeRegion: ["Central", "Occidental", "Oriental"],
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
    this.getDatosPaises();
    this.getDatosPaisesIniciar();
    this.getDatosPaisesIniciar2();
  },
  methods: {
    // Metodos para paises
    getDatosPaises() {
      api.get("/paises").then((res) => {
        this.paises = res.data;
        this.paises = this.paises.map((paises) => {
          if (paises.tipo_pais === "N") {
            return { ...paises, tipo_pais: "Nacional" };
          }
          return paises;
        });
        this.paises = this.paises.map((paises) => {
          if (paises.tipo_pais === "I") {
            return { ...paises, tipo_pais: "Internacional" };
          }
          return paises;
        });
      });
    },
    getDatosEditPaises(selectedEdit) {
      api.get(`/paises/${selectedEdit}`).then((res) => {
        this.formEditPaises = res.data;
        if (this.formEditPaises.tipo_pais === "N") {
          this.formEditPaises.tipo_pais = "Nacional";
        }
        if (this.formEditPaises.tipo_pais === "I") {
          this.formEditPaises.tipo_pais = "Internacional";
        }
      });
    },
    DeleteDatoPaises(idpost) {
      api.delete(`/paises/${idpost}`)
        .then((res) => {
          if ((res.status = 201)) {
            this.eliminadoConExito();
            this.getDatosPaises();
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    createDatoPaises() {
      if (this.formPaises.tipo_pais === "Nacional") {
        this.formPaises.tipo_pais = "N";
      }
      if (this.formPaises.tipo_pais === "Internacional") {
        this.formPaises.tipo_pais = "I";
      }
      api.post("/paises/", this.formPaises)
        .then((res) => {
          if ((res.status = 201)) {
            this.añadidoConExito();
            this.getDatosPaises();
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
      this.resetFormpaises();
    },
    putDatoPaises() {
      if (this.formEditPaises.tipo_pais === "Nacional") {
        this.formEditPaises.tipo_pais = "N";
      }
      if (this.formEditPaises.tipo_pais === "Internacional") {
        this.formEditPaises.tipo_pais = "I";
      }
      api.put(`/paises/${this.formEditPaises.id}`, this.formEditPaises)
        .then((res) => {
          if ((res.status = 201)) {
            this.editadoConExito();
            this.getDatosPaises();
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
      this.resetFormeditpaises();
    },
    resetFormpaises() {
      (this.formPaises.desc_pais = null),
      (this.formPaises.tipo_pais = null),
      (this.paisesForm = false),
      desc_pais.value.resetValidation();
      tipo_pais.value.resetValidation();
    },
    resetFormeditpaises() {
      (this.formEditPaises.desc_pais = null),
      (this.formEditPaises.tipo_pais = null),
      (this.paisesFormEdit = false),
      desc_pais.value.resetValidation();
      tipo_pais.value.resetValidation();
    },
    // Metodos para estados
    getDatosEstadosSelect(selectedPais) {
      api.get(`/paises/${this.selectedPais.id}/estados`)
        .then((res) => {
          this.estados = res.data.estados;
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    getDatosEditEstados(selectedEdit) {
      api.get(`/estados/${selectedEdit}`).then((res) => {
        this.formEditEstados.desc_estado = res.data.desc_estado;
        this.formEditEstados.siglas = res.data.siglas;
        this.formEditEstados.id = res.data.id;
      });
    },
    deleteDatoEstados(idpost) {
      api.delete(`/estados/${idpost}`)
        .then((res) => {
          if ((res.status = 201)) {
            this.eliminadoConExito();
            api.get(`/paises/${this.selectedPais.id}/estados`).then((res) => {
              this.estados = res.data.estados;
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    createDatoEstados() {
      this.formEstados.cod_pais = `${this.selectedPais.id}`;
      api.post(`/estados`, this.formEstados)
        .then((res) => {
          if ((res.status = 201)) {
            api.get(`/paises/${this.selectedPais.id}/estados`).then((res) => {
              this.estados = res.data.estados;
              this.resetFormEstados();
            });
            this.añadidoConExito();
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });

      this.resetFormpaises();
    },
    putDatoEstados() {
      api.put(`/estados/${this.formEditEstados.id}`, this.formEditEstados)
        .then((res) => {
          if ((res.status = 201)) {
            this.editadoConExito();
            api.get(`/paises/${this.selectedPais.id}/estados`).then((res) => {
              this.estados = res.data.estados;
              this.resetFormEditEstados();
            });
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    resetFormEstados() {
      (this.formEstados.desc_estado = null),
      (this.formEstados.siglas = null),
      (this.estadosForm = false),
      desc_estado.value.resetValidation();
      siglas.value.resetValidation();
    },
    resetFormEditEstados() {
      (this.formEditEstados.desc_estado = null),
      (this.formEditEstados.siglas = null),
      (this.estadosFormEdit = false),
      desc_estado.value.resetValidation();
      siglas.value.resetValidation();
    },
    // Metodos para ciudades
    getDatosEstadosSelect2(selectedPais2) {
      api.get(`/paises/${this.selectedPais2.id}/estados`)
        .then((res) => {
          this.estadosCiudades = res.data.estados;
          this.selectedEstado = "";
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    getDatosCiudades(selectedEstado) {
      api.get(`/estados/${this.selectedEstado.id}/ciudades`)
        .then((res) => {
          this.ciudades = res.data.ciudades;
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.check_urbano === "E") {
              return { ...ciudades, check_urbano: "Extra Urbano" };
            }
            return ciudades;
          });
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.check_urbano === "U") {
              return { ...ciudades, check_urbano: "Urbano" };
            }
            return ciudades;
          });
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.cod_region === "CE") {
              return { ...ciudades, cod_region: "Central" };
            }
            return ciudades;
          });
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.cod_region === "OC") {
              return { ...ciudades, cod_region: "Occidental" };
            }
            return ciudades;
          });
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.cod_region === "OR") {
              return { ...ciudades, cod_region: "Oriental" };
            }
            return ciudades;
          });
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    getDatosEditCiudades(selectedEdit) {
      api.get(`/ciudades/${selectedEdit}`).then((res) => {
        this.formEditCiudades.desc_ciudad = res.data.desc_ciudad;
        this.formEditCiudades.siglas = res.data.siglas;
        this.formEditCiudades.check_urbano = res.data.check_urbano;
        this.formEditCiudades.cod_region = res.data.cod_region;
        this.formEditCiudades.id = res.data.id;
      });
    },
    deleteDatoCiudades(idpost) {
      api.delete(`/ciudades/${idpost}`)
        .then((res) => {
          if ((res.status = 201)) {
            this.eliminadoConExito();
            this.getDatosCiudades();
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    createDatoCiudades() {
      if (this.formCiudades.check_urbano === "Si") {
        this.formCiudades.check_urbano = "U";
      }
      if (this.formCiudades.check_urbano === "No") {
        this.formCiudades.check_urbano = "E";
      }
      if (this.formCiudades.cod_region === "Central") {
        this.formCiudades.cod_region = "CE";
      }
      if (this.formCiudades.cod_region === "Occidental") {
        this.formCiudades.cod_region = "OC";
      }
      if (this.formCiudades.cod_region === "Oriental") {
        this.formCiudades.cod_region = "OR";
      }
      (this.formCiudades.cod_estado = `${this.selectedEstado.id}`),
        api.post(`/ciudades`, this.formCiudades)
          .then((res) => {
            if ((res.status = 201)) {
              this.getDatosCiudades();
              this.añadidoConExito();
              this.resetFormCiudades();
            }
          })
          .catch((err) => {
            if (err.response) {
              this.error = err.response.data.statusCode;
            }
            if ((this.error = "400")) {
              this.error =
                "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
            }
            this.errorDelServidor();
          });
    },
    putDatoCiudades() {
      if (this.formEditCiudades.check_urbano === "Si") {
        this.formEditCiudades.check_urbano = "U";
      }
      if (this.formEditCiudades.check_urbano === "No") {
        this.formEditCiudades.check_urbano = "E";
      }
      if (this.formEditCiudades.cod_region === "Central") {
        this.formEditCiudades.cod_region = "CE";
      }
      if (this.formEditCiudades.cod_region === "Occidental") {
        this.formEditCiudades.cod_region = "OC";
      }
      if (this.formEditCiudades.cod_region === "Oriental") {
        this.formEditCiudades.cod_region = "OR";
      }
      api.put(`/ciudades/${this.formEditCiudades.id}`, this.formEditCiudades)
        .then((res) => {
          if ((res.status = 201)) {
            this.editadoConExito();
            this.getDatosCiudades();
            this.resetFormEditCiudades();
          }
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          console.log(this.formEditEstados);
          this.errorDelServidor();
        });
    },
    resetFormCiudades() {
      (this.formCiudades.desc_ciudad = null),
      (this.formCiudades.siglas = null),
      (this.formCiudades.check_urbano = null),
      (this.formCiudades.cod_region = null),
      (this.ciudadesForm = false),
      desc_ciudad.value.resetValidation();
      siglas.value.resetValidation();
      check_urbano.value.resetValidation();
      cod_region.value.resetValidation();
    },
    resetFormEditCiudades() {
      (this.formEditCiudades.desc_ciudad = null),
      (this.formEditCiudades.siglas = null),
      (this.formEditCiudades.check_urbano = null),
      (this.formEditCiudades.cod_region = null),
      (this.ciudadesformedit = false),
      desc_ciudad.value.resetValidation();
      siglas.value.resetValidation();
      check_urbano.value.resetValidation();
      cod_region.value.resetValidation();
    },
    // Metodos para colocar valores iniciales
    getDatosPaisesIniciar() {
      api
        .get(`/paises`)
        .then((res) => {
          this.paisRef2 = res.data[0].id;
          this.selectedPais = res.data[0].desc_pais;
          this.getDatosEstadosIniciar();
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    getDatosEstadosIniciar() {
      api
        .get(`/paises/${this.paisRef2}/estados`)
        .then((res) => {
          this.estados = res.data.estados;
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    getDatosPaisesIniciar2() {
      api
        .get(`/paises`)
        .then((res) => {
          this.selectedPais2 = res.data[0];
          this.paisRef = res.data[0].id;
          this.getDatosEstadosIniciar2();
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    getDatosEstadosIniciar2() {
      api
        .get(`/paises/${this.paisRef}/estados`)
        .then((res) => {
          this.selectedEstado = res.data.estados[0];
          this.estadosCiudades = res.data.estados;
          this.estadoRef = res.data.estados[0].id;
          this.getDatosCiudadesIniciar();
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
    getDatosCiudadesIniciar() {
      api
        .get(`/estados/${this.estadoRef}/ciudades`)
        .then((res) => {
          this.ciudades = res.data.ciudades;
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.check_urbano === "E") {
              return { ...ciudades, check_urbano: "Extra Urbano" };
            }
            return ciudades;
          });
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.check_urbano === "U") {
              return { ...ciudades, check_urbano: "Urbano" };
            }
            return ciudades;
          });
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.cod_region === "CE") {
              return { ...ciudades, cod_region: "Central" };
            }
            return ciudades;
          });
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.cod_region === "OC") {
              return { ...ciudades, cod_region: "Occidental" };
            }
            return ciudades;
          });
          this.ciudades = this.ciudades.map((ciudades) => {
            if (ciudades.cod_region === "OR") {
              return { ...ciudades, cod_region: "Oriental" };
            }
            return ciudades;
          });
        })
        .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
    },
  },
};
</script>
