<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="paisesDialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 60vw">
        <q-card-section>
          <q-form @submit="sendDataPaises()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input outlined v-model="formPaises.desc_pais" label="País" hint="" class="pcform" lazy-rules
                  @update:model-value="
                    formPaises.desc_pais = formPaises.desc_pais.toUpperCase()
                  " :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]">
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select outlined :options="tipoDePais" v-model="formPaises.tipo_pais" label="Tipo de País"
                  input-class="input" hint="" :rules="[
                    (val) =>
                      this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                  ]" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="format_list_bulleted" />
                  </template>
                </q-select>
              </div>
            </div>

            <div class="full-width row justify-center items-center content-center" style="margin-bottom: 10px">
              <q-btn label="Enviar" type="submit" color="primary" class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add" />
              <q-btn label="Cerrar" color="primary" flat class="col-md-5 col-sm-5 col-xs-12 btnmovil" icon="close"
                v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="estadosDialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 60vw">
        <q-card-section>
          <q-form @submit="sendDataEstados()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input outlined v-model="formEstados.desc_estado" label="Estado" hint="" class="pcform"
                  @update:model-value="
                    formEstados.desc_estado =
                      formEstados.desc_estado.toUpperCase()
                  " lazy-rules :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracteres'
                      ) || '',
                  ]">
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input outlined v-model="formEstados.siglas" label="Siglas de Estado" @update:model-value="
                  formEstados.siglas = formEstados.siglas.toUpperCase()
                " mask="AAAA" hint="" lazy-rules :rules="[
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        4,
                        'Maximo 4 Caracteres'
                      ) || '',
                  ]">
                  <template v-slot:prepend>
                    <q-icon name="text_fields" />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="full-width row justify-center items-center content-center" style="margin-bottom: 10px">
              <q-btn label="Enviar" type="submit" color="primary" class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add" />
              <q-btn label="Cerrar" color="primary" flat class="col-md-5 col-sm-5 col-xs-12 btnmovil" icon="close"
                v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="ciudadesDialog">
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendDataCiudades()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input outlined v-model="formCiudades.desc_ciudad" label="Ciudad" :rules="[
                  (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                  (val) =>
                    this.$refs.rulesVue.isMin(
                      val,
                      3,
                      'Minimo 3 Caracteres'
                    ) || '',
                ]" @update:model-value="
                    formCiudades.desc_ciudad =
                      formCiudades.desc_ciudad.toUpperCase()
                  " hint="" class="pcform" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="south_america" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-input outlined v-model="formCiudades.siglas" label="Siglas de Ciudad" mask="AAAA"
                  @update:model-value="
                    formCiudades.siglas = formCiudades.siglas.toUpperCase()
                  " hint="" lazy-rules :rules="[
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        4,
                        'Maximo 4 Caracteres'
                      ) || '',
                  ]">
                  <template v-slot:prepend>
                    <q-icon name="text_fields" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-5 col-xs-12">
                <q-select outlined v-model="formCiudades.cod_region" label="Región" hint="" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                ]" :options="tipoDeRegion" class="pcform" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="map" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select outlined v-model="formCiudades.check_urbano" label="Zona Horaria" input-class="input" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                ]" hint="" :options="tipoDeZona" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="corporate_fare" />
                  </template>
                </q-select>
              </div>
            </div>

            <div class="full-width row justify-center items-center content-center" style="margin-bottom: 10px">
              <q-btn label="Enviar" type="submit" color="primary" class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add" />
              <q-btn label="Cerrar" color="primary" flat class="col-md-5 col-sm-5 col-xs-12 btnmovil" icon="close"
                v-close-popup />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <div class="row paddingMobile">
      <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" animated :control-type="controlType"
        class="rounded-borders col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 justify-center paddingMobile">
        <q-carousel-slide name="paises"
          class="flex-center col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 paddingMobile">
          <div class="row q-pa-md paddingMobile">
            <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
              style="align-self: center; text-align: center; font-size: 20px">
              <p><strong>MANTENIMIENTO - PAÍS, ESTADO, CIUDAD</strong></p>
            </div>
            <div class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-12 marginHeaderMobile"
              style="align-self: center; text-align: center; padding-left: 0px">
              <q-option-group v-model="slide" :options="controlTypeOptions" inline size="45px" class="mobileItem"
                style="font-size: 17px" />
            </div>
            <div class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-12 marginHeader marginHeaderMobile">
              <q-input rounded outlined standout v-model="filterPaises" type="search" label="Búsqueda avanzada">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12" style="text-align: center; align-self: center">
              <q-btn label="Insertar" rounded color="primary" @click="paisesDialog = true"
                :disabled="this.allowOption(2)" @click.capture="resetFormPaises" size="16px" class="q-px-xl q-py-xs">
              </q-btn>
            </div>
          </div>

          <div class="q-pa-md">
            <div class="q-gutter-y-md">
              <div bordered flat class="my-card row">
                <q-table :rows="paises" row-key="id" binary-state-sort :loading="loading" :columns="columnsPaises"
                  :separator="separator" :filter="filterPaises" style="width: 100%" :grid="$q.screen.xs"
                  v-model:pagination="pagination">
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" />
                  </template>
                  <template v-slot:body-cell-action="props">
                    <q-td :props="props">
                      <q-btn dense round flat color="primary" icon="edit" :disabled="this.allowOption(3)" @click="
                        getData(
                          `/paises/${props.row.id}`,
                          'setDataPaisesEdit',
                          'formPaises'
                        );
                        paisesDialog = true;
                      "></q-btn>
                      <q-btn dense round flat color="primary" icon="delete" :disabled="this.allowOption(4)"
                        @click="selected = props.row.id" @click.capture="paisesDelete = true"></q-btn>
                    </q-td>
                  </template>
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                      :style="props.selected ? 'transform: scale(0.95);' : ''">
                      <q-card :class="props.selected ? 'bg-grey-2' : ''">
                        <q-list dense>
                          <q-item v-for="col in props.cols" :key="col.name">
                            <q-item-section>
                              <q-item-label>{{ col.label }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-chip v-if="col.name === 'status'" :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}
                              </q-chip>
                              <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="edit"
                                :disabled="this.allowOption(3)" @click="
                                  getData(
                                    `/paises/${props.row.id}`,
                                    'setDataPaisesEdit',
                                    'formPaises'
                                  );
                                  paisesDialog = true;
                                "></q-btn>
                              <q-chip v-if="col.name === 'status'" :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}
                              </q-chip>
                              <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="delete"
                                :disabled="this.allowOption(4)" @click="selected = props.row.id"
                                @click.capture="paisesDelete = true"></q-btn>
                              <q-item-label v-else caption :class="col.classes ? col.classes : ''">{{ col.value }}
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
        </q-carousel-slide>
        <q-carousel-slide name="estados" class="col-md-11 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
          <div class="row q-pa-md paddingMobile">
            <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
              style="align-self: center; text-align: center; font-size: 20px">
              <p><strong>MANTENIMIENTO - PAÍS, ESTADO, CIUDAD</strong></p>
            </div>
            <div class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 marginHeader marginHeaderMobile"
              style="align-self: center; text-align: center; padding-left: 0px">
              <q-option-group v-model="slide" :options="controlTypeOptions" inline size="45px" class="mobileItem"
                style="font-size: 17px" />
            </div>
            <div
              class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 marginHeader marginSelectMobile marginHeaderMobile"
              style="text-align: center; align-self: center">
              <q-select rounded transition-show="flip-up" transition-hide="flip-down" :options="paisesSelected" @filter="
                (val, update, abort) =>
                  filterArray(
                    val,
                    update,
                    abort,
                    'paisesSelected',
                    'paises',
                    'desc_pais'
                  )
              " use-input hide-selected fill-input input-debounce="0" option-label="desc_pais" option-value="id"
                v-model="selectedPais" outlined standout label="Escoge un país" @update:model-value="
                  getData(`/estados`, 'setDataEstados', 'estados', {
                    headers: {
                      pais: this.selectedPais.id,
                      page: 1,
                      limit: 9,
                    },
                  })
                "><template v-slot:no-option>
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
            <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 marginHeader marginHeaderMobile"
              style="text-align: center; align-self: center">
              <q-input rounded outlined standout v-model="filterEstados" type="search" label="Búsqueda avanzada">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12" style="text-align: center; align-self: center">
              <q-btn label="Insertar" rounded color="primary" :disabled="this.allowOption(2)"
                @click="estadosDialog = true" @click.capture="resetFormEstados" size="16px" class="q-px-xl q-py-xs">
              </q-btn>
            </div>
          </div>

          <div class="q-pa-md">
            <div class="q-gutter-y-md">
              <div bordered flat class="my-card row">
                <q-table :rows="estados" row-key="id" binary-state-sort :rows-per-page-options="[5, 10, 15, 20, 50]"
                  @request="onRequestEstados" :columns="columnsEstados" :separator="separator" :filter="filterEstados"
                  style="width: 100%" :loading="loading" :grid="$q.screen.xs" v-model:pagination="paginationEstados">
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" />
                  </template>
                  <template v-slot:body-cell-action="props">
                    <q-td :props="props">
                      <q-btn dense round flat color="primary" icon="edit" :disabled="this.allowOption(3)" @click="
                        getData(
                          `/estados/${props.row.id}`,
                          'SetDataEstadosEdit',
                          'formEstados'
                        );
                        estadosDialog = true;
                      "></q-btn>
                      <q-btn dense round flat color="primary" icon="delete" :disabled="this.allowOption(4)"
                        @click="selected = props.row.id" @click.capture="estadosDelete = true"></q-btn>
                    </q-td>
                  </template>
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                      :style="props.selected ? 'transform: scale(0.95);' : ''">
                      <q-card :class="props.selected ? 'bg-grey-2' : ''">
                        <q-list dense>
                          <q-item v-for="col in props.cols" :key="col.name">
                            <q-item-section>
                              <q-item-label>{{ col.label }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-chip v-if="col.name === 'status'" :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}
                              </q-chip>
                              <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="edit"
                                :disabled="this.allowOption(3)" @click="
                                  getData(
                                    `/estados/${props.row.id}`,
                                    'SetDataEstadosEdit',
                                    'formEstados'
                                  );
                                  estadosDialog = true;
                                "></q-btn>
                              <q-chip v-if="col.name === 'status'" :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}
                              </q-chip>
                              <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="delete"
                                :disabled="this.allowOption(4)" @click="selected = props.row.id"
                                @click.capture="estadosDelete = true"></q-btn>
                              <q-item-label v-else caption :class="col.classes ? col.classes : ''">{{ col.value }}
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
        </q-carousel-slide>
        <q-carousel-slide name="ciudades" class="flex-center col-md-11 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
          <div class="row q-pa-md paddingMobile">
            <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
              style="align-self: center; text-align: center; font-size: 20px">
              <p><strong>MANTENIMIENTO - PAÍS, ESTADO, CIUDAD</strong></p>
            </div>
            <div class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 marginHeader marginHeaderMobile marginHeaderPC"
              style="align-self: center; text-align: center; padding-left: 0px">
              <q-option-group v-model="slide" :options="controlTypeOptions" inline size="45px" class="mobileItem"
                style="font-size: 17px" />
            </div>
            <div class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 marginHeader marginHeaderPC marginHeaderMobile">
              <q-select rounded transition-show="flip-up" transition-hide="flip-down" :options="paisesSelected" @filter="
                (val, update, abort) =>
                  filterArray(
                    val,
                    update,
                    abort,
                    'paisesSelected',
                    'paises',
                    'desc_pais'
                  )
              " use-input hide-selected fill-input input-debounce="0" option-label="desc_pais" option-value="id"
                v-model="selectedPaisCiudades" outlined standout label="Escoge un país" @update:model-value="
                  this.selectedEstado = [];
                  getData(`/estados`, 'setData', 'estadosCiudades', {
                    headers: {
                      pais: this.selectedPaisCiudades.id,
                    },
                  });
                "><template v-slot:no-option>
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
            <div class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 marginHeaderPC marginHeaderMobile">
              <q-select rounded transition-show="flip-up" transition-hide="flip-down" :options="estadosCiudadesSelected"
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
                " use-input hide-selected fill-input input-debounce="0" option-label="desc_estado" option-value="id"
                v-model="selectedEstado" outlined standout label="Escoge un estado" @update:model-value="
                  getData(`/ciudades`, 'setDataCiudades', 'ciudades', {
                    headers: {
                      estado: this.selectedEstado.id,
                      page: 1,
                      limit: 5,
                    },
                  })
                "><template v-slot:no-option>
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
            <div class="col-md-9 col-xl-9 col-lg-9 col-xs-12 col-sm-12 marginHeaderMobile"
              style="text-align: center; align-self: center">
              <q-input rounded outlined standout v-model="filterCiudades" type="search" label="Búsqueda avanzada">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
            <div class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12" style="text-align: center; align-self: center">
              <q-btn label="Insertar" rounded color="primary" :disabled="this.allowOption(2)"
                @click="ciudadesDialog = true" @click.capture="resetFormCiudades" size="16px" class="q-px-xl q-py-xs">
              </q-btn>
            </div>
          </div>

          <div class="q-pa-md">
            <div class="q-gutter-y-md">
              <div bordered flat class="my-card row">
                <q-table :rows="ciudades" binary-state-sort row-key="id" :columns="columnsCiudades"
                  :separator="separator" :rows-per-page-options="[5, 10, 15, 20, 50]" @request="onRequestCiudades"
                  :loading="loading" :filter="filterCiudades" style="width: 100%" :grid="$q.screen.xs"
                  v-model:pagination="paginationCiudades">
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" />
                  </template>
                  <template v-slot:body-cell-action="props">
                    <q-td :props="props">
                      <q-btn dense round flat color="primary" icon="edit" :disabled="this.allowOption(3)" @click="
                        getData(
                          `/ciudades/${props.row.id}`,
                          'setDataCiudadesEdit',
                          'formCiudades'
                        );
                        ciudadesDialog = true;
                      "></q-btn>
                      <q-btn dense round flat color="primary" icon="delete" :disabled="this.allowOption(4)"
                        @click="selected = props.row.id" @click.capture="ciudadesDelete = true"></q-btn>
                    </q-td>
                  </template>
                  <template v-slot:item="props">
                    <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                      :style="props.selected ? 'transform: scale(0.95);' : ''">
                      <q-card :class="props.selected ? 'bg-grey-2' : ''">
                        <q-list dense>
                          <q-item v-for="col in props.cols" :key="col.name">
                            <q-item-section>
                              <q-item-label>{{ col.label }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-chip v-if="col.name === 'status'" :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}
                              </q-chip>
                              <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="edit"
                                :disabled="this.allowOption(3)" @click="
                                  getData(
                                    `/ciudades/${props.row.id}`,
                                    'setDataCiudadesEdit',
                                    'formCiudades'
                                  );
                                  ciudadesDialog = true;
                                "></q-btn>
                              <q-chip v-if="col.name === 'status'" :color="
                                props.row.status == 'Active'
                                  ? 'green'
                                  : props.row.status == 'Disable'
                                  ? 'red'
                                  : 'grey'
                              " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}
                              </q-chip>
                              <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="delete"
                                :disabled="this.allowOption(4)" @click="selected = props.row.id"
                                @click.capture="ciudadesDelete = true"></q-btn>
                              <q-item-label v-else caption :class="col.classes ? col.classes : ''">{{ col.value }}
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
          <q-btn flat label="Aceptar" color="primary" v-close-popup
            @click="deleteData(`/paises/${selected}`, 'getDataPaises')" />
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
          <q-btn flat label="Aceptar" color="primary" v-close-popup
            @click="deleteData(`/estados/${selected}`, 'getDataEstados')" />
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
          <q-btn flat label="Aceptar" color="primary" v-close-popup
            @click="deleteData(`/ciudades/${selected}`, 'getDataCiudades')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods ref="methods" @get-Data-Paises="getData('/paises', 'setDataPaises', 'paises')" @get-Data-Estados="
      getDataEstados(`/estados`, 'setDataEstados', 'estados')
    " @get-Data-Ciudades="
        getDataCiudades(`/ciudades`, 'setDataCiudades', 'ciudades')
      " @on-Request-Estados="onRequestEstados" @on-Request-Ciudades="onRequestCiudades" @set-Data="setData"
      @set-Data-Iniciar="setDataIniciar" @reset-Loading="resetLoading" @set-Data-Paises="setDataPaises"
      @set-Data-Paises-Edit="setDataPaisesEdit" @set-Data-Estados="setDataEstados"
      @set-Data-Estados-Edit="setDataEstadosEdit" @set-Data-Ciudades="setDataCiudades"
      @set-Data-Ciudades-Edit="setDataCiudadesEdit" @set-Data-Permisos="setDataPermisos"></methods>
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
  name: "paisestadociudad",
  data() {
    return {
      controlType: ref("flat"),
      slide: ref("paises"),
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
      rpermisos: [],
      paises: [],
      estados: [],
      ciudades: [],
      estadosCiudades: [],
      selected: [],
      selectedPais: [],
      selectedPaisCiudades: [],
      selectedEstado: [],
      paisesSelected: [],
      estadosCiudadesSelected: [],
      paisRef: "",
      paisCiudadesRef: "",
      estadoRef: "",
      error: "",
      countEstados: 1,
      currentPageEstados: 1,
      countCiudades: 1,
      currentPageCiudades: 1,
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
      rowsPerPage: 5,
      // rowsNumber: xx if getting data from a server
    });
    const paginationEstados = ref({
      descending: "",
      page: 1,
      rowsPerPage: 5,
      rowsNumber: "",
    });
    const paginationCiudades = ref({
      descending: "",
      page: 1,
      rowsPerPage: 5,
      rowsNumber: "",
    });
    return {
      loading: ref(false),
      pagination: ref({
        rowsPerPage: 5,
      }),
      paginationEstados,
      paginationCiudades,
      anulate: ref(false),
      separator: ref("vertical"),
      paisesDialog: ref(false),
      estadosDialog: ref(false),
      ciudadesDialog: ref(false),
      estadosDelete: ref(false),
      ciudadesDelete: ref(false),
      paisesDelete: ref(false),
      filterPaises: ref(""),
      filterEstados: ref(""),
      filterCiudades: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Pais Estado Ciudad", "");
    this.getData("/paises", "setDataIniciar", "paises");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        menu: "paisestadociudad"
      },
    });
  },
  methods: {
    // Metodo para Get luego de Accion en Tabla Estados
    onRequestEstados(res, dataRes) {
      if (this.countEstados == 1) {
        this[dataRes] = res.data;
        this.paginationEstados.rowsNumber = res.total;
      } else {
        let { page, rowsPerPage, sortBy, descending } = res.pagination;
        if (this.currentPageEstados !== page) {
          descending = "";
        }
        const filter = res.filter;
        const startRow = (page - 1) * rowsPerPage;
        const fetchCount =
          rowsPerPage === 0 ? this.paginationEstados.rowsNumber : rowsPerPage;
        var headerOrder_direction = ""
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
            headerOrder_direction = "DESC";
          } else headerOrder_direction = "ASC";
        }

        if (sortBy) this.paginationEstados.sortBy = sortBy;
        this.paginationEstados.page = page;
        this.paginationEstados.rowsPerPage = rowsPerPage;
        this.getData(`/estados`, "setDataEstados", "estados", {
          headers: {
            page: headerPage,
            limit: headerLimit,
            order_direction: headerOrder_direction,
            order_by: headerOrder_by,
            pais: this.selectedPais.id,
          },
        });
      }
      this.countEstados = 0;
    },
    // Metodo para Get luego de Accion en Tabla Ciudades
    onRequestCiudades(res, dataRes) {
      if (this.countCiudades == 1) {
        this[dataRes] = res.data;
        this.paginationCiudades.rowsNumber = res.total;
      } else {
        let { page, rowsPerPage, sortBy, descending } = res.pagination;
        if (this.currentPageCiudades !== page) {
          descending = "";
        }
        const filter = res.filter;
        const startRow = (page - 1) * rowsPerPage;
        const fetchCount =
          rowsPerPage === 0 ? this.paginationCiudades.rowsNumber : rowsPerPage;
        var headerOrder_direction = ""
        var headerPage = page;
        var headerLimit = fetchCount;
        if (sortBy) {
          var headerOrder_by = sortBy;
        } else {
          var headerOrder_by = "";
        }
        if (headerOrder_by == "check_urbano_desc") {
          var headerOrder_by = "check_urbano";
        }
        if (headerOrder_by == "cod_region_desc") {
          var headerOrder_by = "cod_region";
        }
        if (descending !== "") {
          this.paginationCiudades.descending =
            !this.paginationCiudades.descending;
          if (this.paginationCiudades.descending == true) {
            headerOrder_direction = "DESC";
          } else headerOrder_direction = "ASC";
        }

        if (sortBy) this.paginationCiudades.sortBy = sortBy;
        this.paginationCiudades.page = page;
        this.paginationCiudades.rowsPerPage = rowsPerPage;
        this.getData(`/ciudades`, "setDataCiudades", "ciudades", {
          headers: {
            page: headerPage,
            limit: headerLimit,
            order_direction: headerOrder_direction,
            order_by: headerOrder_by,
            estado: this.selectedEstado.id,
          },
        });
      }
      this.countCiudades = 0;
    },
    // Metodo para filtrar Selects
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
    // Metodo para hacer Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para setear Datos
    setData(res, dataRes) {
      this[dataRes] = res.data;
      this.loading = false;
    },
    // Metodo para setear Datos Iniciales
    setDataIniciar(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
      this.paisCiudadesRef = this.paises[0].id;
      this.selectedPais = this.paises[0];
      this.selectedPaisCiudades = this.paises[0];
      this.paisRef = this.paises[0].id;
      api
        .get(`/estados`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            pais: this.paisCiudadesRef,
            page: 1,
            limit: 5,
          },
        })
        .then((res) => {
          this.onRequestEstados(res.data, "estados");
          this.selectedEstado = res.data.data[0];
          this.estadosCiudades = res.data.data;
          this.estadoRef = res.data.data[0].id;
          api
            .get(`/ciudades`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                estado: this.estadoRef,
                page: 1,
                limit: 5,
              },
            })
            .then((res) => {
              this.onRequestCiudades(res.data, "ciudades");
            });
        });
    },
    // Metodo para Resetear Carga
    resetLoading() {
      this.loading = false;
    },
    // Metodo para Eliminar Datos en Tabla
    deleteData(url, callBack) {
      this.$refs.methods.deleteData(url, callBack);
      this.loading = true;
    },
    // Metodo para validar Permisos
    allowOption(option) {
      return this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0;
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // Metodos para Paises

    // Metodo para Setear Paises en Tabla
    setDataPaises(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodo para Setear Datos de Pais Seleccionado
    setDataPaisesEdit(res, dataRes) {
      this[dataRes].desc_pais = res.desc_pais;
      this[dataRes].tipo_pais = res.tipo_pais_desc;
      this[dataRes].id = res.id;
      this.loading = false;
    },
    // Metodo para Editar o Crear Paises
    sendDataPaises() {
      this.formPaises.tipo_pais = this.formPaises.tipo_pais.value;
      if (!this.formPaises.id) {
        this.$refs.methods.createData(
          "/paises",
          this.formPaises,
          "getDataPaises"
        );
        this.resetFormPaises();
        this.loading = true;
        this.paisesDialog = false;
      } else {
        this.$refs.methods.putData(
          `/paises/${this.formPaises.id}`,
          this.formPaises,
          "getDataPaises"
        );
        this.paisesDialog = false;
        this.loading = true;
        this.resetFormPaises();
      }
    },
    // Metodo para Resetear Paises
    resetFormPaises() {
      this.formPaises.desc_pais = null,
        this.formPaises.tipo_pais = null,
        delete this.formPaises.id;
    },

    // Metodos para Estados

    // Metodo para Get de Estados
    getDataEstados(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          pais: this.selectedPais.id,
          page: 1,
          limit: 5,
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Estados en Tabla
    setDataEstados(res, dataRes) {
      this[dataRes] = res.data;
      this.paginationEstados.page = res.currentPage;
      this.currentPageEstados = res.currentPage;
      this.paginationEstados.rowsNumber = res.total;
      this.paginationEstados.rowsPerPage = res.limit;
      this.loading = false;
    },
    // Metodo para Setear Datos de Estado Seleccionado
    setDataEstadosEdit(res, dataRes) {
      this[dataRes].desc_estado = res.desc_estado;
      this[dataRes].siglas = res.siglas;
      this[dataRes].id = res.id;
      this.loading = false;
    },
    // Metodo para Editar o Crear Estados
    sendDataEstados() {
      this.formEstados.cod_pais = this.selectedPais.id;
      if (!this.formEstados.id) {
        this.$refs.methods.createData(
          "/estados",
          this.formEstados,
          "getDataEstados"
        );
        this.resetFormEstados();
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/estados/${this.formEstados.id}`,
          this.formEstados,
          "getDataEstados"
        );
        this.resetFormEstados();
        this.loading = true;
      }
    },
    // Metodo para Resetear Estados
    resetFormEstados() {
      (this.formEstados.desc_estado = ""),
        (this.formEstados.siglas = ""),
        (this.estadosDialog = false);
      delete this.formEstados.id;
    },

    // Metodos para Ciudades

    // Metodo para Get de Estados
    getDataCiudades(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          estado: this.selectedEstado.id,
          page: 1,
          limit: 5,
        },
      });
      this.loading = true;
    },
    // Metodo para Setear Ciudades en Tabla
    setDataCiudades(res, dataRes) {
      this[dataRes] = res.data;
      this.paginationCiudades.page = res.currentPage;
      this.currentPageCiudades = res.currentPage;
      this.paginationCiudades.rowsNumber = res.total;
      this.paginationCiudades.rowsPerPage = res.limit;
      this.loading = false;
    },
    // Metodo para Setear Datos de Ciudad Seleccionada
    setDataCiudadesEdit(res, dataRes) {
      this[dataRes].desc_ciudad = res.desc_ciudad;
      this[dataRes].siglas = res.siglas;
      this[dataRes].check_urbano = res.check_urbano_desc;
      this[dataRes].cod_region = res.cod_region_desc;
      this[dataRes].id = res.id;
      this.loading = false;
    },
    // Metodos para Editar o Crear Ciudades
    sendDataCiudades() {
      (this.formCiudades.cod_estado = this.selectedEstado.id),
        (this.formCiudades.check_urbano = this.formCiudades.check_urbano.value);
      this.formCiudades.cod_region = this.formCiudades.cod_region.value;
      if (!this.formCiudades.id) {
        this.$refs.methods.createData(
          `/ciudades`,
          this.formCiudades,
          "getDataCiudades"
        );
        (this.ciudadesDialog = false), this.resetFormCiudades();
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/ciudades/${this.formCiudades.id}`,
          this.formCiudades,
          "getDataCiudades"
        );
        this.resetFormCiudades();
        this.loading = true;
        this.ciudadesDialog = false;
      }
    },
    // Metodos para Resetear Ciudades
    resetFormCiudades() {
      delete this.formCiudades.id;
      (this.formCiudades.desc_ciudad = ""),
        (this.formCiudades.siglas = ""),
        (this.formCiudades.check_urbano = ""),
        (this.formCiudades.cod_region = "");
    },
  },
};
</script>

<style>
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
  .marginHeader {
    padding-right: 30px;
  }
}

@media screen and (max-width: 1024px) {
  .marginHeaderMobile {
    margin-bottom: 25px;
  }
}

@media screen and (max-width: 600px) {
  .paddingMobile {
    padding-left: 2px;
    padding-right: 2px;
  }
}

@media screen and (min-width: 1024px) {
  .marginHeaderPC {
    margin-bottom: 20px;
  }
}
</style>
