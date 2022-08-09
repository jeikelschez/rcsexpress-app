<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="create">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="createData" class="q-gutter-md">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_beneficiario"
                  label="Beneficiario"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasAllowNull50]"
                  @update:model-value="
                    form.nb_beneficiario = form.nb_beneficiario.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_proveedor"
                  label="Proveedor"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasNotNull100]"
                  @update:model-value="
                    form.nb_proveedor = form.nb_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.rif_proveedor"
                  label="RIF"
                  hint=""
                  :rules="[reglasNotNull20]"
                  lazy-rules
                  @update:model-value="
                    form.rif_proveedor = form.rif_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nit_proveedor"
                  label="NIT"
                  class="pcform"
                  :rules="[reglasAllowNull20]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    form.nit_proveedor = form.nit_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="123" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.condicion_pago"
                  label="Condición de Pago (Días)"
                  :rules="[reglasAllowNullDias]"
                  type="number"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="free_cancellation" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.direccion_correo"
                  label="Direccion de Correo"
                  :rules="[reglasAllowNull200]"
                  hint=""
                  class="pcform"
                  lazy-rules
                  @update:model-value="
                    form.direccion_correo = form.direccion_correo.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="drafts" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.direccion_fiscal"
                  label="Direccion Fiscal"
                  :rules="[reglasAllowNull200]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    form.direccion_fiscal = form.direccion_fiscal.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.tlf_proveedor"
                  label="Telefono"
                  :rules="[reglasAllowNull100]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.fax_proveedor"
                  label="Fax"
                  :rules="[reglasAllowNull50]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  @update:model-value="
                    form.fax_proveedor = form.fax_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.email_proveedor"
                  label="Email"
                  :rules="[reglasAllowNull50]"
                  hint=""
                  lazy-rules
                  type="email"
                  @update:model-value="
                    form.email_proveedor = form.email_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_servicio"
                  label="Servicio Prestado"
                  class="pcform"
                  input-class="input"
                  hint=""
                  :options="servicio_prestado"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.tipo_persona"
                  label="Tipo de Persona"
                  class="pcform"
                  input-class="input"
                  hint=""
                  :options="tipo_persona"
                  :rules="[reglasSelect]"
                  lazy-rules
                  @update:model-value="
                    this.axiosConfig.headers.tipo_persona =
                      form.tipo_persona.value;
                    this.getData(
                      `/mretenciones`,
                      'setDataRetenciones',
                      'retenciones'
                    );
                    this.form.cod_tipo_retencion = [];
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="form.cod_tipo_retencion"
                  label="Tipo Retención ISLR"
                  hint=""
                  :options="retencionesSelected"
                @filter="(val,update,abort) => 
                filterArray(val,update,abort,'retencionesSelected', 'retenciones', 'nb_tipo_retencion')"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                  :rules="[reglasSelectRetenciones]"
                  option-label="nb_tipo_retencion"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="block" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="form.flag_activo"
                  label="Estatus"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  class="pcform"
                  :options="estatus"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="block" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.observacion"
                  label="Observaciones"
                  hint=""
                  lazy-rules
                  :rules="[reglasAllowNull]"
                  @update:model-value="
                    form.observacion = form.observacion.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Agregar Proveedor"
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

    <q-dialog v-model="edit">
      <q-card class="q-pa-md" bordered style="width: 900px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="putData">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nb_beneficiario"
                  label="Beneficiario"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasAllowNull50]"
                  @update:model-value="
                    formEdit.nb_beneficiario =
                      formEdit.nb_beneficiario.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nb_proveedor"
                  label="Proveedor"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[reglasNotNull100]"
                  @update:model-value="
                    formEdit.nb_proveedor = formEdit.nb_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.rif_proveedor"
                  label="RIF"
                  hint=""
                  :rules="[reglasNotNull20]"
                  lazy-rules
                  @update:model-value="
                    formEdit.rif_proveedor =
                      formEdit.rif_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.nit_proveedor"
                  label="NIT"
                  class="pcform"
                  :rules="[reglasAllowNull20]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    formEdit.nit_proveedor =
                      formEdit.nit_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="123" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.condicion_pago"
                  label="Condición de Pago (Días)"
                  :rules="[reglasAllowNullDias]"
                  type="number"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="free_cancellation" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.direccion_correo"
                  label="Direccion de Correo"
                  class="pcform"
                  :rules="[reglasAllowNull200]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    formEdit.direccion_correo =
                      formEdit.direccion_correo.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="drafts" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.direccion_fiscal"
                  label="Direccion Fiscal"
                  :rules="[reglasAllowNull200]"
                  hint=""
                  lazy-rules
                  @update:model-value="
                    formEdit.direccion_fiscal =
                      formEdit.direccion_fiscal.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.tlf_proveedor"
                  label="Telefono"
                  :rules="[reglasAllowNull100]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  mask="### - ### - ##########"
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.fax_proveedor"
                  label="Fax"
                  :rules="[reglasAllowNull50]"
                  hint=""
                  lazy-rules
                  class="pcform"
                  @update:model-value="
                    formEdit.fax_proveedor =
                      formEdit.fax_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="fax" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.email_proveedor"
                  label="Email"
                  :rules="[reglasAllowNull50]"
                  hint=""
                  lazy-rules
                  type="email"
                  @update:model-value="
                    formEdit.email_proveedor =
                      formEdit.email_proveedor.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.tipo_servicio"
                  label="Servicio Prestado"
                  class="pcform"
                  input-class="input"
                  hint=""
                  :options="servicio_prestado"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="support_agent" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.tipo_persona"
                  label="Tipo de Persona"
                  class="pcform"
                  input-class="input"
                  hint=""
                  :options="tipo_persona"
                  lazy-rules
                  @update:model-value="
                    this.axiosConfig.headers.tipo_persona =
                      formEdit.tipo_persona.value;
                    this.getData(
                      `/mretenciones`,
                      'setDataRetenciones',
                      'retenciones'
                    );
                    this.formEdit.cod_tipo_retencion = [];
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-4 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.cod_tipo_retencion"
                  label="Tipo Retención ISLR"
                  input-class="input"
                  hint=""
                  :options="retencionesSelected"
                @filter="(val,update,abort) => 
                filterArray(val,update,abort,'retencionesSelected', 'retenciones', 'nb_tipo_retencion')"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                  option-label="nb_tipo_retencion"
                  option-value="id"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="block" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-select
                  outlined
                  v-model="formEdit.flag_activo"
                  label="Estatus"
                  input-class="input"
                  :rules="[reglasSelect]"
                  hint=""
                  class="pcform"
                  :options="estatus"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="block" />
                  </template>
                </q-select>
              </div>

              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="formEdit.observacion"
                  label="Observaciones"
                  hint=""
                  lazy-rules
                  :rules="[reglasAllowNull]"
                  @update:model-value="
                    formEdit.observacion = formEdit.observacion.toUpperCase()
                  "
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
                  </template>
                </q-input>
              </div>
            </div>

            <div
              class="full-width row justify-center items-center content-center"
              style="margin-bottom: 10px"
            >
              <q-btn
                label="Editar Proveedor"
                type="submit"
                color="primary"
                class="col-md-5 col-sm-5 col-xs-12"
                icon="person_add"
              />
              <q-btn
                label="Cerrar"
                color="primary"
                flat
                @click="resetForm()"
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
            class="col-md-4 col-xs-12 text-secondary"
            style="align-self: center; text-align: center; margin-right: 16px"
          >
            <h4><strong>MANTENIMIENTO - PROVEEDORES</strong></h4>
          </div>
          <div
            class="col-md-5 col-sm-7 col-xs-6"
            style="align-self: center; margin-right: 20px"
          >
            <q-input
              v-model="filter"
              rounded
              outlined
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
            class="col-md-2 col-sm-4 col-xs-5"
            style="text-align: center; align-self: center"
          >
            <q-btn
              label="Insertar Proveedor"
              rounded
              color="primary"
              @click="create = true"
              @click.capture="resetForm()"
              :disabled="this.disabledCreate"
            ></q-btn>
          </div>
        </div>

        <div class="q-pa-md">
          <div class="q-gutter-y-md">
            <div bordered flat class="row">
              <q-table
                :rows="datos"
                :loading="loading"
                row-key="id"
                :columns="columns"
                :separator="separator"
                class="my-sticky-column-table"
                :filter="filter"
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
                          `/proveedores/${props.row.id}`,
                          'setDataEdit',
                          'formEdit'
                        );
                        edit = true;
                        this.resetFormEdit();
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
                      @click.capture="deletePopup = true"
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
                                  `/proveedores/${props.row.id}`,
                                  'setDataEdit',
                                  'formEdit'
                                );
                                this.resetFormEdit();
                                edit = true;
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
                              @click.capture="deletePopup = true"
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
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <methods
      ref="methods"
      @get-Data="getData('/proveedores', 'setData', 'datos')"
      @set-data="setData"
      @reset-Loading="resetLoading"
      @set-data-retenciones="setDataRetenciones"
      @set-Data-Edit="setDataEdit"
    >
    </methods>
    <desactivate-crud
      ref="desactivateCrud"
      @desactivar-Crud="desactivarCrud"
    >
    </desactivate-crud>
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
  components: {
    "desactivate-crud": desactivateCrudVue,
    methods: methodsVue,
  },
  name: "Bancos",
  data() {
    return {
      columns: [
        {
          name: "nb_proveedor",
          label: "Nombre del Proveedor",
          field: "nb_proveedor",
          align: "left",
          sortable: true,
        },
        {
          name: "condicion_pago",
          label: "Condicion de Pago",
          field: "condicion_pago",
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
          name: "action",
          label: "Acciones",
          align: "center",
          sortable: true,
          required: true,
        },
      ],
      form: {
        nb_proveedor: "",
        nb_beneficiario: "",
        rif_proveedor: "",
        nit_proveedor: "",
        direccion_fiscal: "",
        direccion_correo: "",
        tlf_proveedor: "",
        fax_proveedor: "",
        email_proveedor: "",
        condicion_pago: "",
        observacion: "",
        tipo_servicio: [],
        cod_tipo_retencion: [],
        tipo_persona: [],
        flag_activo: [],
      },
      tipo_persona: [
        { label: "JURÍDICA", value: "J" },
        { label: "NATURAL", value: "N" },
      ],
      servicio_prestado: [
        { label: "TRANSPORTE", value: "TP" },
        { label: "PAPELERIA", value: "PP" },
        { label: "SUMINISTROS DE COMPUTACIÓN", value: "SC" },
        { label: "GENERALES", value: "GE" },
      ],
      estatus: [
        { label: "ACTIVO", value: "A" },
        { label: "INACTIVO", value: "I" },
      ],
      retenciones: [],
      datos: [],
      formEdit: {
        id: "",
        nb_proveedor: "",
        nb_beneficiario: "",
        rif_proveedor: "",
        nit_proveedor: "",
        direccion_fiscal: "",
        direccion_correo: "",
        tlf_proveedor: "",
        fax_proveedor: "",
        email_proveedor: "",
        condicion_pago: "",
        observacion: "",
        tipo_servicio: [],
        cod_tipo_retencion: [],
        tipo_persona: [],
        flag_activo: [],
      },
      selected: [],
      retencionesSelected: [],
      error: "",
      disabledCreate: true,
      disabledEdit: true,
      disabledDelete: true,
      axiosConfig: {
        headers: {
          Authorization: ``,
          tipo_persona: "",
          vigente: "s",
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
      rowsPerPage: 4,
      // rowsNumber: xx if getting data from a server
    });
    return {
      pagination: ref({
        rowsPerPage: 10,
      }),
      separator: ref("vertical"),
      create: ref(false),
      loading: ref(false),
      tablaDeRetenciones: ref(false),
      edit: ref(false),
      medium: ref(false),
      deletePopup: ref(false),
      filter: ref(""),
    };
  },
  mounted() {
    this.getData("/proveedores", "setData", "datos");
    this.$refs.desactivateCrud.desactivarCrud('c_proveedores', 'r_proveedores', 'u_proveedores', 'd_proveedores', 'desactivarCrud')
  },
  methods: {
    filterArray (val, update, abort, pagina, array, element) {
        if (val === '') {
        update(() => {
          this[pagina] = this[array]
        })
        return
    }
    update(() => {
        const needle = val.toUpperCase();
        var notEqual = JSON.parse(JSON.stringify(this[array]));
        for (var i = 0, len = this[array].length; i < len; i++) {
          if (!(this[array][i][element].indexOf(needle) > -1)) {
            delete notEqual[i];
          }
          if (i == this[array].length - 1) {
            this[pagina] = notEqual
            break
          };
        }
      })
    },
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
    reglasSelectRetenciones() {
      if (this.form.cod_tipo_retencion == null) {
        return "Debes Seleccionar Algo";
      }
      if (this.form.cod_tipo_retencion == "") {
        return "Debes Seleccionar Algo";
      }
      if (this.form.cod_tipo_retencion == []) {
        return "Debes Seleccionar Algo";
      }
    },
    reglasSelectRetencionesEdit() {
      if (this.formEdit.cod_tipo_retencion == null) {
        return "Debes Seleccionar Algo";
      }
      if (this.formEdit.cod_tipo_retencion == "") {
        return "Debes Seleccionar Algo";
      }
      if (this.formEdit.cod_tipo_retencion == []) {
        return "Debes Seleccionar Algo";
      }
    },
    reglasNotNull100(val) {
      if ((val !== null) !== "") {
        if (val.length < 3) {
          return "Deben ser minimo 3 caracteres";
        }
        if (val.length > 99) {
          return "Deben ser Maximo 100 caracteres";
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
    reglasNotNull50(val) {
      if ((val !== null) !== "") {
        if (val.length < 3) {
          return "Deben ser minimo 3 caracteres";
        }
        if (val.length > 49) {
          return "Deben ser Maximo 50 caracteres";
        }
      }
    },
    reglasAllowNull(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
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
    reglasAllowNull200(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 199) {
            return "Deben ser Maximo 200 caracteres";
          }
        }
      }
    },
    reglasAllowNull50(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val.length < 3) {
            return "Deben ser minimo 3 caracteres";
          }
          if (val.length > 49) {
            return "Deben ser Maximo 50 caracteres";
          }
        }
      }
    },
    reglasAllowNullDias(val) {
      if (val !== null) {
        if (val.length > 0) {
          if (val > 99) {
            return "Deben ser Maximo 2 caracteres";
          }
        }
      }
    },

    // Desactivar CRUD
    desactivarCrud(createItem, readItem, deleteItem, updateItem) {
      if (readItem == true) {
        if (createItem == true) {
        this.disabledCreate = false
      }
        if (deleteItem == true) {
        this.disabledDelete = false
      }
        if (updateItem == true) {
        this.disabledEdit = false
      }
      } else this.$router.push("/error403");
    },

    // Metodos CRUD
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, this.axiosConfig);
      this.loading = true;
    },
    setData(res, dataRes) {
      this.loading = false
      this[dataRes] = res;
      for (var e = 0, len = this.datos.length; e < len; e++) {
        if (this.datos[e].condicion_pago !== null) {
          this.datos[e].condicion_pago = this.datos[e].condicion_pago + " Dias";
        }
        if (e == this.datos.length - 1) break;
      }
    },
    setDataRetenciones(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    setDataEdit(res, dataRes) {
      if (res.tipo_persona === "J") {
        (this.axiosConfig.headers.tipo_persona = "J");
      } else if (res.tipo_persona === "N") {
        (this.axiosConfig.headers.tipo_persona = "N");
      }
      this.loading = false;
      this.getData(`/mretenciones`, "setDataRetenciones", "retenciones");
      this.formEdit.id = res.id;
      this.formEdit.condicion_pago = res.condicion_pago;
      this.formEdit.nb_proveedor = res.nb_proveedor;
      this.formEdit.nb_beneficiario = res.nb_beneficiario;
      this.formEdit.rif_proveedor = res.rif_proveedor;
      this.formEdit.nit_proveedor = res.nit_proveedor;
      this.formEdit.direccion_fiscal = res.direccion_fiscal;
      this.formEdit.direccion_correo = res.direccion_correo;
      this.formEdit.tlf_proveedor = res.tlf_proveedor;
      this.formEdit.fax_proveedor = res.fax_proveedor;
      this.formEdit.email_proveedor = res.email_proveedor;
      this.formEdit.observacion = res.observacion;
      this.formEdit.tipo_servicio = res.tipo_svc;
      this.formEdit.tipo_persona = res.tipo_desc;
      this.formEdit.flag_activo = res.activo_desc;
      
      if (res.cod_tipo_retencion !== null) {
        this.formEdit.cod_tipo_retencion = res.retenciones.nb_tipo_retencion;
      }
    },
    deleteData(idpost) {
      this.$refs.methods.deleteData(
        `/proveedores/${idpost}`,
        "getData",
        this.axiosConfig
      );
      this.loading = true;
    },
    createData() {
      this.form.tipo_servicio = this.form.tipo_servicio.value;
      this.form.tipo_persona = this.form.tipo_persona.value;
      this.form.flag_activo = this.form.flag_activo.value;
      if (`${this.form.cod_tipo_retencion.id}` !== "undefined") {
        this.form.cod_tipo_retencion = `${this.form.cod_tipo_retencion.id}`;
      }
      if (this.form.cod_tipo_retencion === "") {
        delete this.form.cod_tipo_retencion;
      }
      this.$refs.methods.createData(
        "/proveedores",
        this.form,
        "getData",
        this.axiosConfig
      );
      this.resetForm();
      this.loading = true;
    },
    putData() {
      this.formEdit.tipo_servicio = this.formEdit.tipo_servicio.value;
      if (!this.formEdit.cod_tipo_retencion.id) {
        delete this.formEdit.cod_tipo_retencion;
      } else {
        this.formEdit.cod_tipo_retencion = this.formEdit.cod_tipo_retencion.id;
      }
      this.formEdit.tipo_persona = this.formEdit.tipo_persona.value;
      this.formEdit.flag_activo = this.formEdit.flag_activo.value;
      this.$refs.methods.putData(
        `/proveedores/${this.formEdit.id}`,
        this.formEdit,
        "getData",
        this.axiosConfig
      );
      this.edit = false;
      this.resetFormEdit();
      this.loading = true;
    },

    resetForm() {
      (this.form.nb_proveedor = ""),
        (this.form.nb_beneficiario = ""),
        (this.form.rif_proveedor = ""),
        (this.form.nit_proveedor = ""),
        (this.form.direccion_fiscal = ""),
        (this.form.direccion_correo = ""),
        (this.form.tlf_proveedor = ""),
        (this.form.fax_proveedor = ""),
        (this.form.email_proveedor = ""),
        (this.form.condicion_pago = ""),
        (this.form.observacion = ""),
        (this.form.tipo_servicio = ""),
        (this.form.cod_tipo_retencion = ""),
        (this.retenciones = []),
        (this.form.tipo_persona = ""),
        (this.form.flag_activo = ""),
        (this.create = false);
    },
    resetFormEdit() {
      (this.formEdit.nb_proveedor = ""),
        (this.formEdit.nb_beneficiario = ""),
        (this.formEdit.rif_proveedor = ""),
        (this.formEdit.nit_proveedor = ""),
        (this.formEdit.direccion_fiscal = ""),
        (this.formEdit.direccion_correo = ""),
        (this.formEdit.tlf_proveedor = ""),
        (this.formEdit.fax_proveedor = ""),
        (this.formEdit.email_proveedor = ""),
        (this.formEdit.condicion_pago = ""),
        (this.retenciones = []),
        (this.formEdit.observacion = ""),
        (this.formEdit.tipo_servicio = ""),
        (this.formEdit.cod_tipo_retencion = ""),
        (this.formEdit.tipo_persona = ""),
        (this.formEdit.flag_activo = "");
    },
  },
};
</script>

<style lang="sass">
.my-sticky-column-table
  /* specifying max-width so the example can
    highlight the sticky column on any browser window */


  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #FFFFFF

  td:first-child
    background-color: #FFFFFF

  th:first-child,
  td:first-child
    position: sticky
    left: 0
    z-index: 1
</style>
