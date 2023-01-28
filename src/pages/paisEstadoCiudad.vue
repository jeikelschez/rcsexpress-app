<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="paisesDialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 60vw">
        <q-card-section>
          <q-form @submit="sendDataPaises()" class="q-gutter-md">
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
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
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
                  :options="tipoPais"
                  v-model="formPaises.tipo_pais"
                  label="Tipo de País"
                  input-class="input"
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="format_list_bulleted" />
                  </template>
                </q-select>
              </div>
            </div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
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

    <q-dialog v-model="estadosDialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 60vw">
        <q-card-section>
          <q-form @submit="sendDataEstados()" class="q-gutter-md">
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
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
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
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 4)]"
                >
                  <template v-slot:prepend>
                    <q-icon name="text_fields" />
                  </template>
                </q-input>
              </div>
            </div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
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

    <q-dialog v-model="ciudadesDialog">
      <q-card class="q-pa-md" bordered style="max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendDataCiudades()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input
                  outlined
                  v-model="formCiudades.desc_ciudad"
                  label="Ciudad"
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.isMax(val, 50),
                    (val) => this.$refs.rulesVue.isMin(val, 3),
                  ]"
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
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 4)]"
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
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  :options="regiones"
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
                  label="Check Urbano"
                  input-class="input"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  hint=""
                  :options="checkUrbano"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="corporate_fare" />
                  </template>
                </q-select>
              </div>
            </div>
            <div
              class="row justify-center items-center content-center"
              style="margin-bottom: 10px"
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

    <div class="row">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        animated
        :control-type="controlType"
        class="rounded-borders col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 justify-center paddingMobile"
      >
        <q-carousel-slide
          name="paises"
          class="flex-center col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 paddingMobile"
        >
          <div class="row paddingMobile">
            <div
              class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
              style="align-self: center; text-align: center"
            >
              <p style="font-size: 20px" class="text-secondary">
                <strong>MANTENIMIENTO - PAÍS, ESTADO, CIUDAD</strong>
              </p>
            </div>
            <div
              class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-12"
              style="align-self: center; text-align: center; padding-left: 0px"
            >
              <q-option-group
                v-model="slide"
                :options="controlTypeOptions"
                inline
                size="45px"
                class="mobileItem"
                style="font-size: 17px"
              />
            </div>
            <div class="q-pa-md col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-12">
              <q-input
                v-model="filterPaises"
                rounded
                dense
                outlined
                standout
                label="Búsqueda avanzada"
                @keydown.enter="getDataPaises()"
              >
                <template v-slot:append>
                  <q-icon
                    @click="getDataPaises()"
                    class="cursor-pointer"
                    name="search"
                  />
                </template>
              </q-input>
            </div>
            <div
              class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMarginButton"
              style="text-align: center; align-self: center"
            >
              <q-btn
                label="Insertar"
                rounded
                color="primary"
                @click="paisesDialog = true"
                :disabled="this.allowOption(2)"
                @click.capture="resetFormPaises"
                class="q-px-xl q-py-xs"
              >
              </q-btn>
            </div>
          </div>
          <div class="q-pa-md">
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
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                  <template v-slot:body-cell-tipo_pais="props">
                    <q-td :props="props">
                      {{ filterDesc("tipoPais", props.row.tipo_pais) }}
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
                            `/paises/${props.row.id}`,
                            'setDataPaisesEdit',
                            'formPaises'
                          );
                          paisesDialog = true;
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
                        @click.capture="paisesDelete = true"
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
                              <q-item-label v-if="col.name === 'tipo_pais'">
                                {{
                                  filterDesc("tipoPais", props.row.tipo_pais)
                                }}
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
                                    `/paises/${props.row.id}`,
                                    'setDataPaisesEdit',
                                    'formPaises'
                                  );
                                  paisesDialog = true;
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
                                @click.capture="paisesDelete = true"
                              ></q-btn>
                              <q-item-label v-if="col.name != 'tipo_pais'">
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
        </q-carousel-slide>
        <q-carousel-slide
          name="estados"
          class="col-md-11 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        >
          <div class="row q-pa-md paddingMobile">
            <div
              class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
              style="align-self: center; text-align: center"
            >
              <p style="font-size: 20px" class="text-secondary">
                <strong>MANTENIMIENTO - PAÍS, ESTADO, CIUDAD</strong>
              </p>
            </div>
            <div
              class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile"
              style="align-self: center; text-align: center; padding-left: 0px"
            >
              <q-option-group
                v-model="slide"
                :options="controlTypeOptions"
                inline
                size="45px"
                class="mobileItem"
                style="font-size: 17px"
              />
            </div>
            <div
              class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 cardMargin selectMobile"
              style="text-align: center; align-self: center"
            >
              <q-select
                rounded
                transition-show="flip-up"
                transition-hide="flip-down"
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
                option-label="desc_pais"
                dense
                option-value="id"
                v-model="selectedPais"
                outlined
                standout
                label="Escoge un país"
                @update:model-value="getDataEstados()"
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
              class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12"
              style="text-align: center; align-self: center"
            >
              <q-input
                v-model="this.paginationEstados.filterValue"
                rounded
                dense
                outlined
                standout
                label="Búsqueda avanzada"
                @keydown.enter="getDataEstados()"
              >
                <template v-slot:append>
                  <q-icon
                    @click="getDataEstados()"
                    class="cursor-pointer"
                    name="search"
                  />
                </template>
              </q-input>
            </div>
            <div
              class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMarginButton"
              style="text-align: center; align-self: center"
            >
              <q-btn
                label="Insertar"
                rounded
                color="primary"
                :disabled="this.allowOption(2)"
                @click="estadosDialog = true"
                @click.capture="resetFormEstados"
                class="q-px-xl q-py-xs"
              >
              </q-btn>
            </div>
          </div>
          <div
            class="q-pa-md my-card row"
            bordered
            flat
            style="margin-top: 2px"
          >
            <q-table
              :rows="estados"
              row-key="id"
              binary-state-sort
              :rows-per-page-options="[5, 10, 15, 20, 50]"
              @request="getDataEstados"
              :columns="columnsEstados"
              :separator="separator"
              style="width: 100%"
              :loading="loading"
              :grid="$q.screen.xs"
              v-model:pagination="paginationEstados"
            >
              <template v-slot:loading>
                <q-inner-loading showing color="primary" class="loading" />
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
                        `/estados/${props.row.id}`,
                        'setDataEstadosEdit',
                        'formEstados'
                      );
                      estadosDialog = true;
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
                    @click.capture="estadosDelete = true"
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
                                `/estados/${props.row.id}`,
                                'setDataEstadosEdit',
                                'formEstados'
                              );
                              estadosDialog = true;
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
                            @click.capture="estadosDelete = true"
                          ></q-btn>
                          <q-item-label>
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
        </q-carousel-slide>
        <q-carousel-slide
          name="ciudades"
          class="flex-center col-md-11 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        >
          <div class="row justify-end q-pa-md paddingMobile">
            <div
              class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
              style="align-self: center; text-align: center"
            >
              <p style="font-size: 20px" class="text-secondary">
                <strong>MANTENIMIENTO - PAÍS, ESTADO, CIUDAD</strong>
              </p>
            </div>
            <div
              class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile"
              style="align-self: center; text-align: center; padding-left: 0px"
            >
              <q-option-group
                v-model="slide"
                :options="controlTypeOptions"
                inline
                size="45px"
                class="mobileItem"
                style="font-size: 17px"
              />
            </div>
            <div
              class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile"
            >
              <q-select
                rounded
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="paisesSelected"
                dense
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
                option-label="desc_pais"
                option-value="id"
                v-model="selectedPais"
                outlined
                standout
                label="Escoge un país"
                @update:model-value="
                  this.selectedEstado = [];
                  getDataEstados();
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
              class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile"
            >
              <q-select
                rounded
                transition-show="flip-up"
                transition-hide="flip-down"
                :options="estadosCiudadesSelected"
                @filter="
                  (val, update) =>
                    filterArray(
                      val,
                      update,
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
                dense
                outlined
                standout
                label="Escoge un estado"
                @update:model-value="getDataCiudades()"
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
              class="col-md-6 col-sm-7 col-xs-12 cardMargin selectMobile"
              style="align-self: center"
            >
              <q-input
                v-model="this.paginationCiudades.filterValue"
                rounded
                dense
                outlined
                standout
                label="Búsqueda avanzada"
                @keydown.enter="getDataCiudades()"
              >
                <template v-slot:append>
                  <q-icon
                    @click="getDataCiudades()"
                    class="cursor-pointer"
                    name="search"
                  />
                </template>
              </q-input>
            </div>
            <div
              class="col-md-2 col-sm-3 col-xs-12"
              style="text-align: center; align-self: center"
            >
              <q-btn
                label="Insertar"
                rounded
                color="primary"
                :disabled="this.allowOption(2)"
                @click="ciudadesDialog = true"
                @click.capture="resetFormCiudades"
                class="q-px-xl q-py-xs"
              >
              </q-btn>
            </div>
          </div>

          <div class="q-pa-md">
            <div class="q-gutter-y-md">
              <div bordered flat class="my-card row">
                <q-table
                  :rows="ciudades"
                  binary-state-sort
                  row-key="id"
                  :columns="columnsCiudades"
                  :separator="separator"
                  :rows-per-page-options="[5, 10, 15, 20, 50]"
                  @request="getDataCiudades"
                  :loading="loading"
                  style="width: 100%"
                  :grid="$q.screen.xs"
                  v-model:pagination="paginationCiudades"
                >
                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" class="loading" />
                  </template>
                  <template v-slot:body-cell-cod_region="props">
                    <q-td :props="props">
                      {{ filterDesc("regiones", props.row.cod_region) }}
                    </q-td>
                  </template>
                  <template v-slot:body-cell-check_urbano="props">
                    <q-td :props="props">
                      {{ filterDesc("checkUrbano", props.row.check_urbano) }}
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
                            `/ciudades/${props.row.id}`,
                            'setDataCiudadesEdit',
                            'formCiudades'
                          );
                          ciudadesDialog = true;
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
                        @click.capture="ciudadesDelete = true"
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
                              <q-item-label v-if="col.name === 'cod_region'">
                                {{
                                  filterDesc("regiones", props.row.cod_region)
                                }}
                              </q-item-label>
                              <q-item-label v-if="col.name === 'check_urbano'">
                                {{
                                  filterDesc(
                                    "checkUrbano",
                                    props.row.check_urbano
                                  )
                                }}
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
                                    `/ciudades/${props.row.id}`,
                                    'setDataCiudadesEdit',
                                    'formCiudades'
                                  );
                                  ciudadesDialog = true;
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
                                @click.capture="ciudadesDelete = true"
                              ></q-btn>
                              <q-item-label
                                v-if="
                                  col.name != 'cod_region' &&
                                  col.name != 'check_urbano'
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
            @click="
              this.$refs.methods.deleteData(
                `/paises/${selected}`,
                'getDataPaises'
              )
            "
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
            @click="
              this.$refs.methods.deleteData(
                `/estados/${selected}`,
                'getDataEstados'
              )
            "
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
            @click="
              this.$refs.methods.deleteData(
                `/ciudades/${selected}`,
                'getDataCiudades'
              )
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @get-Data-Paises="getDataPaises"
      @set-Data-Paises="setDataPaises"
      @set-Data-Paises-Edit="setDataPaisesEdit"
      @get-Data-Estados="getDataEstados"
      @set-Data-Estados="setDataEstados"
      @set-Data-Estados-Edit="setDataEstadosEdit"
      @get-Data-Ciudades="getDataCiudades"
      @set-Data-Ciudades="setDataCiudades"
      @set-Data-Ciudades-Edit="setDataCiudadesEdit"
      @set-Data-Permisos="setDataPermisos"
    ></methods>
    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
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
        },
        {
          name: "tipo_pais",
          label: "Tipo de País",
          field: "tipo_pais",
          align: "left",
          sortable: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
        },
      ],
      columnsEstados: [
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
        },
      ],
      columnsCiudades: [
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
          name: "cod_region",
          label: "Región",
          field: "cod_region",
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
          name: "action",
          label: "Acciones",
          align: "center",
        },
      ],
      tipoPais: [
        {
          label: "NACIONAL",
          value: "N",
        },
        {
          label: "INTERNACIONAL",
          value: "I",
        },
      ],
      checkUrbano: [
        {
          label: "URBANO",
          value: "U",
        },
        {
          label: "EXTRA URBANO",
          value: "E",
        },
      ],
      regiones: [
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
      pagination: {
        rowsPerPage: 5,
      },
      paginationEstados: {
        page: 1,
        rowsPerPage: 10,
        sortBy: "desc_estado",
        descending: false,
        filter: "desc_estado,siglas",
        filterValue: "",
        rowsNumber: "",
      },
      paginationCiudades: {
        page: 1,
        rowsPerPage: 8,
        sortBy: "desc_ciudad",
        descending: false,
        filter: "desc_ciudad,siglas",
        filterValue: "",
        rowsNumber: "",
      },
      rpermisos: [],
      paises: [],
      estados: [],
      orderDirectionEstados: "",
      orderDirectionPaises: "",
      orderDirectionCiudades: "",
      ciudades: [],
      estadosCiudades: [],
      selected: [],
      selectedPais: [],
      selectedEstado: [],
      paisesSelected: [],
      estadosCiudadesSelected: [],
      filterPaises: "",
    };
  },
  setup() {
    return {
      loading: ref(false),
      anulate: ref(false),
      separator: ref("vertical"),
      paisesDialog: ref(false),
      estadosDialog: ref(false),
      ciudadesDialog: ref(false),
      paisesDelete: ref(false),
      estadosDelete: ref(false),
      ciudadesDelete: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Pais Estado Ciudad", "");
    this.getDataPaises();

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "paisestadociudad",
      },
    });
  },
  methods: {
    // Metodo para filtrar Selects
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

    // Metodos para Paises
    // Metodo para Extraer Datos de Tabla
    getDataPaises() {
      this.loading = true;
      this.$refs.methods.getData("/paises", "setDataPaises", "paises");
    },
    // Metodo para setear Datos Iniciales
    setDataPaises(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.selectedPais = this.paises[0];
      this.getDataEstados();
      this.loading = false;
    },
    // Metodo para Setear Datos de Pais Seleccionado
    setDataPaisesEdit(res, dataRes) {
      this[dataRes].desc_pais = res.desc_pais;
      this[dataRes].tipo_pais = this.filterDesc("tipoPais", res.tipo_pais);
      this[dataRes].id = res.id;
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
      } else {
        this.$refs.methods.putData(
          `/paises/${this.formPaises.id}`,
          this.formPaises,
          "getDataPaises"
        );
      }
      this.resetFormPaises();
      this.paisesDialog = false;
    },
    // Metodo para Resetear Paises
    resetFormPaises() {
      this.formPaises.desc_pais = null;
      this.formPaises.tipo_pais = null;
      this.paisesDialog = false;
      delete this.formPaises.id;
    },

    // Metodos para Estados
    // Metodo para Extraer Datos de Tabla
    getDataEstados(props) {
      this.loading = true;
      if (props) this.paginationEstados = props.pagination;
      this.$refs.methods.getData(`/estados`, "setDataEstados", "estados", {
        headers: {
          pais: this.selectedPais.id,
          page: this.paginationEstados.page,
          limit: this.paginationEstados.rowsPerPage,
          order_by: this.paginationEstados.sortBy,
          order_direction: this.paginationEstados.descending ? "DESC" : "ASC",
          filter: this.paginationEstados.filter,
          filter_value: this.paginationEstados.filterValue,
        },
      });
      this.$refs.methods.getData("/estados", "setData", "estadosCiudades", {
        headers: {
          pais: this.selectedPais.id,
        },
      });
    },
    // Metodo para Setear Datos en Tabla
    setDataEstados(res, dataRes) {
      this.ciudades = [];
      this[dataRes] = res.data ? res.data : res;
      this.selectedEstado = this.estados[0];
      this.paginationEstados.page = res.currentPage;
      this.currentPageEstados = res.currentPage;
      this.paginationEstados.rowsNumber = res.total;
      this.paginationEstados.rowsPerPage = res.limit;
      if (res.data.length > 0) this.getDataCiudades();
      this.loading = false;
    },
    // Metodo para Setear Datos de Estado Seleccionado
    setDataEstadosEdit(res, dataRes) {
      this[dataRes].desc_estado = res.desc_estado;
      this[dataRes].siglas = res.siglas;
      this[dataRes].id = res.id;
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
      } else {
        this.$refs.methods.putData(
          `/estados/${this.formEstados.id}`,
          this.formEstados,
          "getDataEstados"
        );
      }
      this.resetFormEstados();
      this.estadosDialog = false;
    },
    // Metodo para Resetear Estados
    resetFormEstados() {
      this.formEstados.desc_estado = "";
      this.formEstados.siglas = "";
      this.estadosDialog = false;
      delete this.formEstados.id;
    },

    // Metodos para Ciudades
    // Metodo para Extraer Datos de Tabla
    getDataCiudades(props) {
      this.loading = true;
      if (props) this.paginationCiudades = props.pagination;
      this.$refs.methods.getData(`/ciudades`, "setDataCiudades", "ciudades", {
        headers: {
          estado: this.selectedEstado.id,
          page: this.paginationCiudades.page,
          limit: this.paginationCiudades.rowsPerPage,
          order_by: this.paginationCiudades.sortBy,
          order_direction: this.paginationCiudades.descending ? "DESC" : "ASC",
          filter: this.paginationCiudades.filter,
          filter_value: this.paginationCiudades.filterValue,
        },
      });
    },
    // Metodo para Setear Datos en Tabla
    setDataCiudades(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.paginationCiudades.page = res.currentPage;
      this.currentPageCiudades = res.currentPage;
      this.paginationCiudades.rowsNumber = res.total;
      this.paginationCiudades.rowsPerPage = res.limit;
      this.loading = false;
    },
    // Metodo para Setear Datos de Ciudad Seleccionada
    setDataCiudadesEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].desc_ciudad = res.desc_ciudad;
      this[dataRes].siglas = res.siglas;
      this[dataRes].cod_region = this.filterDesc("regiones", res.cod_region);
      this[dataRes].check_urbano = this.filterDesc(
        "checkUrbano",
        res.check_urbano
      );
      console.log(this.formCiudades.check_urbano);
    },
    // Metodos para Editar o Crear Ciudades
    sendDataCiudades() {
      this.formCiudades.cod_estado = this.selectedEstado.id;
      this.formCiudades.check_urbano = this.formCiudades.check_urbano.value;
      this.formCiudades.cod_region = this.formCiudades.cod_region.value;
      if (!this.formCiudades.id) {
        this.$refs.methods.createData(
          `/ciudades`,
          this.formCiudades,
          "getDataCiudades"
        );
      } else {
        this.$refs.methods.putData(
          `/ciudades/${this.formCiudades.id}`,
          this.formCiudades,
          "getDataCiudades"
        );
      }
      this.ciudadesDialog = false;
      this.resetFormCiudades();
    },
    // Metodos para Resetear Ciudades
    resetFormCiudades() {
      delete this.formCiudades.id;
      this.formCiudades.desc_ciudad = "";
      this.formCiudades.siglas = "";
      this.formCiudades.check_urbano = "";
      this.formCiudades.cod_region = "";
      this.ciudadesDialog = false;
    },
  },
};
</script>
