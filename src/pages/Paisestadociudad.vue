<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="paisesForm">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 60vw">
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '']"
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
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 60vw">
        <q-card-section>
          <q-form @submit="putDataPaises()">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditPaises.desc_pais"
                  label="País"
                  hint=""
                  class="pcform"
                  lazy-rules
                  @update:model-value="
                    formEditPaises.desc_pais =
                      formEditPaises.desc_pais.toUpperCase()
                  "
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
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
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 60vw">
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 4, 'Maximo 4 Caracteres') || '']"
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
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 60vw">
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
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
                  @update:model-value="
                    formEditEstados.siglas =
                      formEditEstados.siglas.toUpperCase()
                  "
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 4, 'Maximo 4 Caracteres') || '']"
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
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="createDataCiudades()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formCiudades.desc_ciudad"
                  label="Ciudad"
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                  @update:model-value="
                    formCiudades.desc_ciudad =
                      formCiudades.desc_ciudad.toUpperCase()
                  "
                  hint=""
                  class="pcform"
                  lazy-rules
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
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 4, 'Maximo 4 Caracteres') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '']"
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
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '']"
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
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="putDataCiudades()">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formEditCiudades.desc_ciudad"
                  :rules="[(val) => this.$refs.rulesVue.isReq(val, 'Requerido'), (val) => this.$refs.rulesVue.isMin(val, 3, 'Minimo 3 Caracteres') || '']"
                  @update:model-value="
                    formEditCiudades.desc_ciudad =
                      formEditCiudades.desc_ciudad.toUpperCase()
                  "
                  label="Estado"
                  hint=""
                  class="pcform"
                  lazy-rules
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
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 4, 'Maximo 4 Caracteres') || '']"
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
        class="col-md-6 col-xl-6 col-lg-6 col-xs-12 col-sm-12 text-secondary"
        style="align-self: center; text-align: center; margin-right: 16px"
      >
        <h4><strong>MANTENIMIENTO - PAÍS, ESTADO, CIUDAD</strong></h4>
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
        <q-carousel-slide
          name="paises"
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
                      binary-state-sort
                      :loading="loading"
                      :columns="columnsPaises"
                      :separator="separator"
                      :filter="filterPaises"
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
                            :disabled="this.disabledEdit"
                            @click="
                              getData(
                                `/paises/${props.row.id}`,
                                'setDataPaisesEdit',
                                'formEditPaises');
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
                                    >{{ col.value }}
                                  </q-chip>
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
                                        `/paises/${props.row.id}`,
                                        'setDataPaisesEdit',
                                        'formEditPaises');
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
                                    >{{ col.value }}
                                  </q-chip>
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
              </div>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="estados"
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
                    option-label="desc_pais"
                    option-value="id"
                    v-model="selectedPais"
                    outlined
                    standout
                    label="Escoge un país"
                    @update:model-value="
                      getData(`/estados`, 'setDataEstados', 'estados', {
                        headers: {
                          pais: this.selectedPais.id,
                          page: 1,
                          limit: 10,
                        },
                      })
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
                    @click.capture="resetFormEstados"
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
                      binary-state-sort
                      :rows-per-page-options="[5, 10, 15, 20, 50]"
                      @request="onRequestEstados"
                      :columns="columnsEstados"
                      :separator="separator"
                      :filter="filterEstados"
                      style="width: 100%"
                      :loading="loading"
                      :grid="$q.screen.xs"
                      v-model:pagination="paginationEstados"
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
                            :disabled="this.disabledEdit"
                            @click="
                              getData(
                                `/estados/${props.row.id}`,
                                'SetDataEstadosEdit',
                                'formEditEstados');
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
                                    >{{ col.value }}
                                  </q-chip>
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
                                        `/estados/${props.row.id}`,
                                        'SetDataEstadosEdit',
                                        'formEditEstados');
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
                                    >{{ col.value }}
                                  </q-chip>
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
              </div>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="ciudades"
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
                    option-label="desc_pais"
                    option-value="id"
                    v-model="selectedPais2"
                    outlined
                    standout
                    label="Escoge un país"
                    @update:model-value="
                      getData(
                        `/estados`,
                        'setDataEstadosSelect',
                        'estadosCiudades',
                        {
                          headers: {
                            pais: this.selectedPais2.id,
                          },
                        }
                      )
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
                  class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 inputciudadespc2"
                >
                  <q-select
                    rounded
                    transition-show="flip-up"
                    transition-hide="flip-down"
                    :options="estadosCiudadesSelected"
                    @filter="
                      (val, update, abort) =>
                        filterArray(
                          val,
                          update,
                          abort,
                          'estadosCiudadesSelected',
                          'estadosCiudades',
                          'desc_estado'
                        )
                    "
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    option-label="desc_estado"
                    option-value="id"
                    v-model="selectedEstado"
                    outlined
                    standout
                    label="Escoge un estado"
                    @update:model-value="
                      getData(
                        `/ciudades`,
                        'setDataCiudades',
                        'ciudades',
                        {
                          headers: {
                            estado: this.selectedEstado.id,
                            page: 1,
                            limit: 10,
                          },
                        }
                      )
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
                    @click.capture="resetFormCiudades"
                    size="16px"
                    class="q-px-xl q-py-xs"
                  >
                  </q-btn>
                </div>
              </div>

              <div class="q-pa-md" style="margin-top: 20px">
                <div class="q-gutter-y-md">
                  <div bordered flat class="my-card row">
                    <q-table
                      :rows="ciudades"
                      binary-state-sort
                      row-key="id"
                      :columns="columnsCiudades"
                      :separator="separator"
                      :rows-per-page-options="[5, 10, 15, 20, 50]"
                      @request="onRequestCiudades"
                      :loading="loading"
                      :filter="filterCiudades"
                      style="width: 100%"
                      :grid="$q.screen.xs"
                      v-model:pagination="paginationCiudades"
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
                            :disabled="this.disabledEdit"
                            @click="
                              getData(
                                `/ciudades/${props.row.id}`,
                                'setDataCiudadesEdit',
                                'formEditCiudades');
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
                                    >{{ col.value }}
                                  </q-chip>
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
                                        `/ciudades/${props.row.id}`,
                                        'setDataCiudadesEdit',
                                        'formEditCiudades');
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
                                    >{{ col.value }}
                                  </q-chip>
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

    <desactive-crud
      ref="desactiveCrud"
      @desactivar-Crud="desactivarCrud"
    ></desactive-crud>

    <methods
      ref="methods"
      @get-Data-Paises="
        getData('/paises', 'setData', 'paises')
      "
      @get-Data-Estados="
        getDataEstados(`/estados`, 'setDataEstados', 'estados')
      "
      @get-Data-Ciudades="
        getDataCiudades(`/ciudades`, 'setDataCiudades', 'ciudades')
      "
      @on-Request-Estados="onRequestEstados"
      @on-Request-Ciudades="onRequestCiudades"
      @set-Data="setData"
      @set-Data-Iniciar="setDataIniciar"
      @reset-Loading="resetLoading"
      @set-Data-Estados="setDataEstados"
      @set-Data-Paises-Edit="setDataPaisesEdit"
      @set-Data-Estados-Edit="setDataEstadosEdit"
      @set-Data-Estados-Select="setDataEstadosSelect"
      @set-Data-Ciudades="setDataCiudades"
      @set-Data-Ciudades-Edit="setDataCiudadesEdit"
    ></methods>
    <rules-vue
      ref="rulesVue"
    ></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";

import { api } from "boot/axios";

import { useQuasar } from "quasar";

import rulesVue from "src/components/rules.vue";

import methodsVue from "src/components/methods.vue";

import { LocalStorage } from "quasar";

import desactivateCrudVue from "src/components/desactivateCrud.vue";

export default {
  components: {
    "desactive-crud": desactivateCrudVue,
    methods: methodsVue, rulesVue
  },
  name: "Bancos",
  data() {
    return {
      controlType: ref("flat"),
      controlTypeOptions: [
        {
          value: "paises",
          label: "Paises",
        },
        {
          value: "estados",
          label: "Estados",
        },
        {
          value: "ciudades",
          label: "Ciudades",
        },
      ],
      slide: ref("paises"),
      columnsPaises: [
        {
          name: "desc_pais",
          label: "País",
          field: "desc_pais",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tipo_pais_desc",
          label: "Tipo de País",
          field: "tipo_pais_desc",
          align: "left",
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
      columnsEstados: [
        {
          name: "desc_estado",
          label: "Estado",
          field: "desc_estado",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "siglas",
          label: "Siglas",
          field: "siglas",
          align: "left",
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
      columnsCiudades: [
        {
          name: "desc_ciudad",
          label: "Ciudad",
          field: "desc_ciudad",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "siglas",
          label: "Siglas",
          field: "siglas",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "cod_region_desc",
          label: "Región",
          field: "cod_region_desc",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "check_urbano_desc",
          label: "Zona Urbana",
          field: "check_urbano_desc",
          align: "left",
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
      tipoDePais: [
        {
          label: "NACIONAL",
          value: "N",
        },
        {
          label: "INTERNACIONAL",
          value: "I",
        },
      ],
      tipoDeZona: [
        {
          label: "URBANO",
          value: "U",
        },
        {
          label: "EXTRA URBANO",
          value: "E",
        },
      ],
      tipoDeRegion: [
        {
          label: "CENTRAL",
          value: "CE",
        },
        {
          label: "OCCIDENTAL",
          value: "OC",
        },
        {
          label: "ORIENTAL",
          value: "OR",
        },
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
      paisesSelected: [],
      estadosCiudadesSelected: [],
      paisRef: "",
      paisRef2: "",
      estadoRef: "",
      error: "",
      countEstados: 1,
      currentPageEstados: 1,
      countCiudades: 1,
      currentPageCiudades: 1,
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
    };
  },
  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const order = ref(false);
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      control: 0,
      rowsPerPage: 10,
      // rowsNumber: xx if getting data from a server
    });
    const paginationEstados = ref({
      descending: "",
      page: 1,
      rowsPerPage: 10,
      rowsNumber: "",
    });
    const paginationCiudades = ref({
      descending: "",
      page: 1,
      rowsPerPage: 10,
      rowsNumber: "",
    });
    return {
      loading: ref(false),
      pagination: ref({
        rowsPerPage: 10,
      }),
      paginationEstados,
      paginationCiudades,
      anulate: ref(false),
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
    this.getData("/paises", "setDataIniciar", "paises");
    this.$refs.desactiveCrud.desactivarCrud(
      "c_ciudades",
      "r_ciudades",
      "u_ciudades",
      "d_ciudades",
      "desactivarCrud"
    );
  },
  methods: {
    onRequestEstados(res, dataRes) {
      if (this.countEstados == 1) {
        this[dataRes] = res.data;
        this.paginationEstados.rowsNumber = res.total;
      } else {
        let { page, rowsPerPage, sortBy, descending } = res.pagination;
        if (this.currentPage !== page) {
          descending = "";
        }
        const filter = res.filter;
        const startRow = (page - 1) * rowsPerPage;
        const fetchCount =
          rowsPerPage === 0 ? this.paginationEstados.rowsNumber : rowsPerPage;

        var headerPage = page;
        var headerLimit = fetchCount;
        if (sortBy) {
          var headerOrder_by = sortBy;
        } else {
          var headerOrder_by = "";
        }

        if (descending !== "") {
          this.paginationEstados.descending =
            !this.paginationEstados.descending;
          if (this.paginationEstados.descending == true) {
            this.headerOrder_direction = "DESC";
          } else this.headerOrder_direction = "ASC";
        }

        if (sortBy) this.paginationEstados.sortBy = sortBy;
        this.paginationEstados.page = page;
        this.paginationEstados.rowsPerPage = rowsPerPage;
        this.getData(`/estados`, "setDataEstados", "estados", {
          headers: {
            page: headerPage,
            limit: headerLimit,
            order_direction: this.headerOrder_direction,
            order_by: headerOrder_by,
            pais: this.selectedPais.id,
          },
        });
      }
      this.countEstados = 0;
    },
    onRequestCiudades(res, dataRes) {
      if (this.countCiudades == 1) {
        this[dataRes] = res.data;
        this.paginationCiudades.rowsNumber = res.total;
      } else {
        let { page, rowsPerPage, sortBy, descending } = res.pagination;
        if (this.currentPage !== page) {
          descending = "";
        }
        const filter = res.filter;
        const startRow = (page - 1) * rowsPerPage;
        const fetchCount =
          rowsPerPage === 0 ? this.paginationCiudades.rowsNumber : rowsPerPage;

        var headerPage = page;
        var headerLimit = fetchCount;
        if (sortBy) {
          var headerOrder_by = sortBy;
        } else {
          var headerOrder_by = "";
        }

        if (descending !== "") {
          this.paginationCiudades.descending =
            !this.paginationCiudades.descending;
          if (this.paginationCiudades.descending == true) {
            this.headerOrder_direction = "DESC";
          } else this.headerOrder_direction = "ASC";
        }

        if (sortBy) this.paginationCiudades.sortBy = sortBy;
        this.paginationCiudades.page = page;
        this.paginationCiudades.rowsPerPage = rowsPerPage;
        this.getData(`/ciudades`, "setDataCiudades", "ciudades", {
          headers: {
            page: headerPage,
            limit: headerLimit,
            order_direction: this.headerOrder_direction,
            order_by: headerOrder_by,
            estado: this.selectedEstado.id,
          },
        });
      }
      this.countCiudades = 0;
    },
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
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    setData(res, dataRes) {
      this[dataRes] = res
      this.loading = false
    },
    setDataIniciar(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
      this.paisRef2 = this.paises[0].id;
      this.selectedPais = this.paises[0];
      this.selectedPais2 = this.paises[0];
      this.paisRef = this.paises[0].id;
      api.get(`/estados`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            pais: this.paisRef2,
            page: 1,
            limit: 10,
          },
        })
        .then((res) => {
          this.onRequestEstados(res.data, "estados");
          this.selectedEstado = res.data.data[0];
          this.estadosCiudades = res.data.data;
          this.estadoRef = res.data.data[0].id;
          api.get(`/ciudades`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                estado: this.estadoRef,
                page: 1,
                limit: 10,
              },
            })
            .then((res) => {
              this.onRequestCiudades(res.data, "ciudades");
            });
        });
    },
    resetLoading() {
      this.loading = false;
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
    // Metodos para Paises
    setDataPaisesEdit(res, dataRes) {
      this[dataRes].desc_pais = res.desc_pais;
      this[dataRes].tipo_pais = res.tipo_pais_desc;
      this[dataRes].id = res.id;
      this.loading = false;
    },
    deleteDataPaises(idpost) {
      this.$refs.methods.deleteData(`/paises/${idpost}`, "getDataPaises");
      this.loading = true;
    },
    createDataPaises() {
      this.formPaises.tipo_pais = this.formPaises.tipo_pais.value;
      this.$refs.methods.createData(
        "/paises",
        this.formPaises,
        "getDataPaises");
      this.resetFormPaises();
      this.loading = true;
    },
    putDataPaises() {
      this.formEditPaises.tipo_pais = this.formEditPaises.tipo_pais.value;
      this.$refs.methods.putData(
        `/paises/${this.formEditPaises.id}`,
        this.formEditPaises,
        "getDataPaises");
      this.edit = false;
      this.loading = true;
      this.resetFormEditPaises();
    },
    resetFormPaises() {
      (this.formPaises.desc_pais = null),
        (this.formPaises.tipo_pais = null),
        (this.paisesForm = false);
    },
    resetFormEditPaises() {
      (this.formEditPaises.desc_pais = null),
        (this.formEditPaises.tipo_pais = null),
        (this.paisesFormEdit = false);
    },
    // Metodos para estados
    getDataEstados(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          pais: this.selectedPais.id,
          page: 1,
          limit: 10,
        },
      });
      this.loading = true;
    },
    setDataEstados(res, dataRes) {
      this[dataRes] = res.data;
      this.paginationEstados.page = res.currentPage;
      this.currentPageEstados = res.currentPage;
      this.paginationEstados.rowsNumber = res.total;
      this.paginationEstados.rowsPerPage = res.limit;
      this.loading = false;
    },
    setDataEstadosEdit(res, dataRes) {
      this[dataRes].desc_estado = res.desc_estado;
      this[dataRes].siglas = res.siglas;
      this[dataRes].id = res.id;
      this.loading = false;
    },
    deleteDataEstados(idpost) {
      this.$refs.methods.deleteData(`/estados/${idpost}`, "getDataEstados");
      this.loading = true;
    },
    createDataEstados() {
      this.formEstados.cod_pais = this.selectedPais.id;
      this.$refs.methods.createData(
        "/estados",
        this.formEstados,
        "getDataEstados");
      this.resetFormEstados();
      this.loading = true;
    },
    putDataEstados() {
      this.$refs.methods.putData(
        `/estados/${this.formEditEstados.id}`,
        this.formEditEstados,
        "getDataEstados");
      this.resetFormEditEstados();
      this.loading = true;
    },
    resetFormEstados() {
      (this.formEstados.desc_estado = ""),
        (this.formEstados.siglas = ""),
        (this.estadosForm = false);
    },
    resetFormEditEstados() {
      (this.formEditEstados.desc_estado = ""),
        (this.formEditEstados.siglas = ""),
        (this.estadosFormEdit = false);
    },
    // Metodos para ciudades
    setDataEstadosSelect(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedEstado = "";
    },
    getDataCiudades(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          estado: this.selectedEstado.id,
          page: 1,
          limit: 10,
        },
      });
      this.loading = true;
    },
    setDataCiudades(res, dataRes) {
      console.log(res);
      this[dataRes] = res.data;
      this.paginationCiudades.page = res.currentPage;
      this.currentPageCiudades = res.currentPage;
      this.paginationCiudades.rowsNumber = res.total;
      this.paginationCiudades.rowsPerPage = res.limit;
      this.loading = false;
    },
    setDataCiudadesEdit(res, dataRes) {
      this[dataRes].desc_ciudad = res.desc_ciudad;
      this[dataRes].siglas = res.siglas;
      this[dataRes].check_urbano = res.check_urbano_desc;
      this[dataRes].cod_region = res.cod_region_desc;
      this[dataRes].id = res.id;
      this.loading = false;
    },
    deleteDataCiudades(idpost) {
      this.$refs.methods.deleteData(`/ciudades/${idpost}`, "getDataCiudades");
      this.loading = true;
    },
    createDataCiudades() {
      (this.formCiudades.cod_estado = this.selectedEstado.id),
        (this.formCiudades.check_urbano = this.formCiudades.check_urbano.value);
      this.formCiudades.cod_region = this.formCiudades.cod_region.value;
      this.$refs.methods.createData(
        `/ciudades`,
        this.formCiudades,
        "getDataCiudades");
      this.resetFormCiudades();
      this.loading = true;
    },
    putDataCiudades() {
      this.formEditCiudades.check_urbano =
        this.formEditCiudades.check_urbano.value;
      this.formEditCiudades.cod_region = this.formEditCiudades.cod_region.value;
      this.$refs.methods.putData(
        `/ciudades/${this.formEditCiudades.id}`,
        this.formEditCiudades,
        "getDataCiudades");
      this.resetFormEditCiudades();
      this.loading = true;
    },
    resetFormCiudades() {
      (this.formCiudades.desc_ciudad = ""),
        (this.formCiudades.siglas = ""),
        (this.formCiudades.check_urbano = ""),
        (this.formCiudades.cod_region = ""),
        (this.ciudadesForm = false);
    },
    resetFormEditCiudades() {
      (this.formEditCiudades.desc_ciudad = ""),
        (this.formEditCiudades.siglas = ""),
        (this.formEditCiudades.check_urbano = ""),
        (this.formEditCiudades.cod_region = ""),
        (this.ciudadesformedit = false);
    },
  },
};
</script>
