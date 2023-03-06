<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="printOptions">
      <q-card style="width: 900px">
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
                <strong>SELECCIONA EL TIPO DE IMPRESION:</strong>
              </p>
            </div>
            <div class="col-md-12 col-xs-12">
              <q-select
                outlined
                v-model="form.nro_documento"
                label="Tipo de Impresion"
                :options="conceptos"
              >
              </q-select>
            </div>
            <div
              class="col-md-12 col-xs-12"
              style="margin-top: 23px; margin-bottom: 10px; text-align: center"
            >
              <q-btn label="Imprimir" color="primary" style="width: 300px" @click="pdfView = true"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="detalleCostosDialog">
      <q-card style="width: 900px">
        <div class="row">
          <q-table
            :rows="detalles_costo"
            row-key="id"
            :columns="columnsDetalle"
            binary-state-sort
            :separator="separator"
            v-model:pagination="pagination"
            :grid="$q.screen.xs"
            :rows-per-page-options="[0]"
            style="width: 100%; height: 310px"
            hide-bottom
          >
          <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props" style="margin-bottom: 20px">
              <q-tr :props="props">
                <q-td v-for="col in props.cols" :key="col.name" :props="props"> 
                  <div v-if="col.name == 'cod_concepto'">
                    <q-select
                      dense
                      outlined
                      fill-input
                      input-debounce="0"
                      :options="conceptos"
                      option-label="desc_concepto"
                      option-value="id"
                      v-model="props.row.cod_concepto"
                    >
                      <template v-slot:selected-item="scope">
                        {{
                          props.row.cod_concepto.id
                            ? props.row.cod_concepto.desc_concepto
                            : this.findIndex(
                                "conceptos",
                                props.row.cod_concepto,
                                "desc_concepto"
                              )
                        }}
                      </template>
                    </q-select>
                  </div>                  
                  <div v-else-if="col.name == 'monto_costo'">
                    <q-input
                      dense
                      outlined
                      v-model="props.row.monto_costo"
                      v-money="money"
                      input-class="text-right"
                      style="min-width: 100px"
                    >
                    </q-input>
                  </div>
                  <div v-else-if="col.name == 'monto_dolar'">
                    <q-input
                      dense
                      outlined
                      v-model="props.row.monto_dolar"
                      v-money="money"
                      input-class="text-right"
                      style="min-width: 100px"
                    >
                    </q-input>
                  </div>
                  <div v-if="col.name == 'action'">                    
                    <q-btn
                      dense
                      round
                      flat
                      color="primary"
                      icon="cancel_presentation"
                      @click="selected = props.row.id"
                      @click.capture="deletePopup = true"
                      ><q-tooltip
                        class="bg-primary"
                        transition-show="scale"
                        style="max-height: 30px"
                        transition-hide="scale"
                        color="primary"
                        >Eliminar Costo</q-tooltip
                      ></q-btn
                    >
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <div
          class="row justify-center items-center content-center"
          style="margin-bottom: 10px"
        >
          <q-btn
            label="Insertar"
            color="primary"
            class="col-md-5 col-sm-5 col-xs-12"
            icon="add"
            @click="addDetalle()"
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
      </q-card>
    </q-dialog>

    <q-dialog v-model="detalleGuiasDialog">
      <q-card style="width: 900px">
        <div class="row">
          <q-table
            :rows="costos"
            row-key="id"
            :columns="columnsDetalle"
            binary-state-sort
            :separator="separator"
            v-model:pagination="pagination"
            :grid="$q.screen.xs"
            :rows-per-page-options="[0]"
            style="width: 100%; height: 310px"
            hide-bottom
          >            
          </q-table>
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
      </q-card>
    </q-dialog>

    <div class="q-pa-sm justify-center" style="margin-top: 10px">
      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -20px"
      >
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>OPERACIONES - REGISTRO DE COSTOS</strong>
          </p>
        </div>
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            label="Agencia Origen"
            @update:model-value="
              this.agentes = [];
              this.$refs.methods.getData(`/agentes`, 'setData', 'agentes', {
                headers: {
                  Authorization: ``,
                  agencia: this.selectedAgencia.id,
                },
              });
              getDataTable();
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
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Fecha Desde"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_desde"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
            @keyup.enter="getDataTable()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_desde"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                    @update:model-value="
                      this.$refs.qDateProxy.hide();
                      getDataTable();
                    "
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-3 col-xl-3 col-lg-3 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-input
            outlined
            label="Fecha Hasta"
            hint=""
            dense
            rounded
            style="padding-bottom: 0px"
            v-model="fecha_hasta"
            lazy-rules
            mask="##/##/####"
            :rules="[(val) => this.$refs.rulesVue.checkDate(val)]"
            @keyup.enter="getDataTable()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateProxy"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_hasta"
                    mask="DD/MM/YYYY"
                    style="padding-bottom: 0px"
                    @update:model-value="
                      this.$refs.qDateProxy.hide();
                      getDataTable();
                    "
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 selectMobile2"
        >
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
            @click="addData()"
          >
            <q-icon size="25px" name="add" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Agregar Costo</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
            @click="sendData()"
          >
            <q-icon size="25px" name="save" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Guardar</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 15px"
            @click="resetFilters()"
          >
            <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Resetear Filtros</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            @click="printOptions = true"
          >
            <q-icon size="25px" name="print" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              transition-show="scale"
              style="max-height: 30px"
              transition-hide="scale"
              color="primary"
              >Imprimir</q-tooltip
            >
          </q-btn>
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-y-md" style="margin-top: -30px">
      <q-table
        :rows="costos"
        :columns="columns"
        binary-state-sort
        :separator="separator"
        row-key="id"
        :loading="loading"
        :rows-per-page-options="[0]"
        style="width: 100%; height: 510px"
        :grid="$q.screen.xs"
        hide-bottom
        :visible-columns="visibleColumns"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" class="loading" />
        </template>
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>
        <template v-slot:body="props" style="margin-bottom: 20px">
          <q-tr :props="props">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name == 'action'">
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="topic"
                  @click="detalleGuiasDialog = true"
                  ><q-tooltip
                    class="bg-primary"
                    transition-show="scale"
                    style="max-height: 30px"
                    transition-hide="scale"
                    color="primary"
                    >Detalle de Costos</q-tooltip
                  ></q-btn
                >
                <q-btn
                  dense
                  round
                  flat
                  color="primary"
                  icon="cancel_presentation"
                  @click="selected = props.row.id"
                  @click.capture="deletePopup = true"
                  ><q-tooltip
                    class="bg-primary"
                    transition-show="scale"
                    style="max-height: 30px"
                    transition-hide="scale"
                    color="primary"
                    >Eliminar Costo</q-tooltip
                  ></q-btn
                >
              </div>
              <div v-if="col.name == 'fecha_envio'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.fecha_envio"
                  :ref="'fecha_envio' + props.rowIndex"
                  lazy-rules
                  :rules="[
                    (val) => this.$refs.rulesVue.isReq(val),
                    (val) => this.$refs.rulesVue.checkDate(val),
                  ]"
                  mask="##/##/####"
                  style="
                    padding-top: 5px; 
                    margin-bottom: -15px;
                    min-width: 150px;
                  "
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="props.row.fecha_envio"
                          mask="DD/MM/YYYY"
                          @update:model-value="this.$refs.qDateProxy[0].hide()"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div v-else-if="col.name == 'tipo_transporte'">
                <q-btn-toggle
                  v-model="props.row.tipo_transporte"
                  spread
                  class="my-custom-toggle"
                  rounded
                  unelevated
                  toggle-color="primary"
                  color="white"
                  text-color="black"
                  :options="tipo"
                >
                </q-btn-toggle>
              </div>
              <div v-else-if="col.name == 'cod_agente'">
                <q-select
                  v-if="props.row.tipo_transporte == 'I'"
                  dense
                  outlined
                  fill-input
                  input-debounce="0"
                  :options="agentes"
                  option-label="persona_responsable"
                  option-value="id"
                  v-model="props.row.cod_agente"
                >
                  <template v-slot:selected-item="scope">
                    {{
                      props.row.cod_agente.id
                        ? props.row.cod_agente.persona_responsable
                        : this.findIndex(
                            "agentes",
                            props.row.cod_agente,
                            "persona_responsable"
                          )
                    }}
                  </template>
                </q-select>
                <q-select
                  v-else
                  dense
                  outlined
                  fill-input
                  input-debounce="0"
                  :options="proveedores"
                  option-label="nb_proveedor"
                  option-value="id"
                  v-model="props.row.cod_proveedor"
                >
                  <template v-slot:selected-item="scope">
                    {{
                      props.row.cod_proveedor.id
                        ? props.row.cod_proveedor.nb_proveedor
                        : this.findIndex(
                            "proveedores",
                            props.row.cod_proveedor,
                            "nb_proveedor"
                          )
                    }}
                  </template>
                </q-select>
              </div>
              <div v-else-if="col.name == 'cod_transporte'">
                <q-select
                  dense
                  outlined
                  fill-input
                  input-debounce="0"
                  :options="unidades"
                  option-label="descripcion"
                  option-value="id"
                  v-model="props.row.cod_transporte"
                >
                  <template v-slot:selected-item="scope">
                    {{
                      props.row.cod_transporte.id
                        ? props.row.cod_transporte.descripcion
                        : this.findIndex(
                            "unidades",
                            props.row.cod_transporte,
                            "descripcion"
                          )
                    }}
                  </template>
                </q-select>
              </div>
              <div v-else-if="col.name == 'cod_ayudante'">
                <q-select
                  dense
                  outlined
                  fill-input
                  input-debounce="0"
                  :options="ayudantes"
                  option-label="nb_ayudante"
                  option-value="id"
                  style="min-width: 150px"
                  v-model="props.row.cod_ayudante"
                >
                  <template v-slot:selected-item="scope">
                    {{
                      props.row.cod_ayudante.id
                        ? props.row.cod_ayudante.nb_ayudante
                        : this.findIndex(
                            "ayudantes",
                            props.row.cod_ayudante,
                            "nb_ayudante"
                          )
                    }}
                  </template>
                </q-select>
              </div>
              <div v-else-if="col.name == 'cod_agencia'">
                <q-select
                  dense
                  outlined
                  fill-input
                  input-debounce="0"
                  :options="agencias"
                  option-label="nb_agencia"
                  option-value="id"
                  style="min-width: 150px"
                  v-model="props.row.cod_agencia"
                >
                  <template v-slot:selected-item="scope">
                    {{
                      props.row.cod_agencia.id
                        ? props.row.cod_agencia.nb_agencia
                        : this.findIndex(
                            "agencias",
                            props.row.cod_agencia,
                            "nb_agencia"
                          )
                    }}
                  </template>
                </q-select>
              </div>
              <div v-else-if="col.name == 'destino'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.destino"
                  style="min-width: 250px"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'monto_anticipo'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.monto_anticipo"
                  v-money="money"
                  input-class="text-right"
                  style="
                    padding-top: 5px;
                    margin-bottom: -15px;
                    min-width: 100px;
                  "
                  :rules="[(val) => this.$refs.rulesVue.isMax(val, 14)]"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'monto_guias'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.monto_guias"
                  :readonly="true"
                  v-money="money"
                  input-class="text-right"
                  style="min-width: 100px"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'monto_costo'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.monto_costo"
                  v-money="money"
                  input-class="text-right"
                  style="min-width: 100px"
                  @keydown="onLoadDetalle(props.rowIndex)"
                  @click="onLoadDetalle(props.rowIndex)"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'utilidad'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.utilidad"
                  :readonly="true"
                  v-money="money"
                  input-class="text-right"
                  style="min-width: 100px"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'porc_costo'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.porc_costo"
                  :readonly="true"
                  v-money="money_porc"
                  input-class="text-right"
                  style="min-width: 100px"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'porc_utilidad'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.porc_utilidad"
                  :readonly="true"
                  v-money="money_porc"
                  input-class="text-right"
                  style="min-width: 100px"
                >
                </q-input>
              </div>
              <div v-else-if="col.name == 'observacion_gnral'">
                <q-input
                  dense
                  outlined
                  v-model="props.row.observacion_gnral"
                  style="min-width: 600px"
                >
                </q-input>
              </div>
              <div v-else>
                {{ col.value }}
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      <div class="col-md-6 col-xs-12">
        <q-card
          class="q-pa-md col-md-12 col-xs-12"
          bordered
          style="padding: 5px; margin-top: 10px"
        >
          <q-card-section style="padding: 5px; margin-bottom: -22px">
            <div class="row">
              <div class="col-md-1 col-xs-12">
                <q-input
                  outlined
                  v-model="this.cantidad"
                  label="Cantidad"
                  hint=""
                  dense
                  :disable="true"
                  input-class="text-right"
                  class="pcform"
                >
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="total_costo"
                  label="Costo"
                  class="pcform"
                  dense
                  v-money="money"
                  :disable="true"
                  input-class="text-right"
                >
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="total_guias"
                  label="Venta"
                  input-class="text-right"
                  :disable="true"
                  dense
                  v-money="money"
                  class="pcform"
                >
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="total_utilidad"
                  label="Utilidad"
                  class="pcform"
                  dense
                  v-money="money"
                  :disable="true"
                  input-class="text-right"
                >
                </q-input>
              </div>
              <div class="col-md-1 col-xs-12">
                <q-input
                  outlined
                  v-model="total_porc_costo"
                  label="% Costo"
                  class="pcform"
                  dense
                  v-money="money_porc"
                  :disable="true"
                  input-class="text-right"
                >
                  <template v-slot:append>
                    <q-icon name="percent" class="cursor-pointer"> </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-1 col-xs-12">
                <q-input
                  outlined
                  v-model="total_porc_utilidad"
                  label="% Utilidad"
                  class="pcform"
                  dense
                  v-money="money_porc"
                  :disable="true"
                  input-class="text-right"
                >
                  <template v-slot:append>
                    <q-icon name="percent" class="cursor-pointer"> </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="deletePopup">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estas seguro que quieres eliminar este Costo?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            v-close-popup
            @click="deleteCosto()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="pdfView" @show="this.pdfPrint()">
      <div style="width: 700px; height: 700px">
        <webViewer
          ref="webViewer"
          @close-pdf="this.pdfView = false"
        ></webViewer>
      </div>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Init="setDataInit"
      @get-Data-Table="getDataTable"
      @set-Data-Table="setDataTable"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { VMoney } from "v-money";
import { api } from "boot/axios";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import rulesVue from "src/components/rules.vue";
import webViewerVue from "src/components/webViewer.vue";

export default {
  directives: { money: VMoney },
  components: { methods: methodsVue, rulesVue, VMoney, webViewer: webViewerVue},
  data() {
    return {
      columns: [
        {
          name: "action",
          label: "Detalle",
          align: "center",
          required: true,
        },
        {
          name: "fecha_envio",
          label: "Fecha Envio",
          field: "fecha_envio",
          align: "center",
          required: true,
        },
        {
          name: "tipo_transporte",
          label: "Tipo",
          field: "tipo_transporte",
          align: "center",
          required: true,
        },
        {
          name: "cod_agente",
          label: "Transporte",
          field: "cod_agente",
          align: "center",
          required: true,
        },
        {
          name: "cod_proveedor",
          label: "Transporte",
          field: "cod_proveedor",
          align: "center",
        },
        {
          name: "cod_transporte",
          label: "Vehiculo",
          field: "cod_transporte",
          align: "center",
          required: true,
        },
        {
          name: "cod_ayudante",
          label: "Ayudante",
          field: "cod_ayudante",
          align: "center",
          required: true,
        },
        {
          name: "cod_agencia",
          label: "Origen",
          field: "cod_agencia",
          align: "center",
          required: true,
        },
        {
          name: "destino",
          label: "Destino",
          field: "destino",
          align: "center",
          required: true,
        },
        {
          name: "monto_anticipo",
          label: "Anticipo",
          field: "monto_anticipo",
          align: "center",
          required: true,
        },
        {
          name: "monto_guias",
          label: "Venta Sin IVA",
          align: "center",
          required: true,
        },
        {
          name: "monto_costo",
          label: "Monto Costo",
          align: "center",
          required: true,
        },
        {
          name: "utilidad",
          label: "Utilidad (Bs.)",
          align: "center",
          required: true,
        },
        {
          name: "porc_costo",
          label: "Costo (%)",
          align: "center",
          required: true,
        },
        {
          name: "porc_utilidad",
          label: "Utilidad (%)",
          align: "center",
          required: true,
        },
        {
          name: "observacion_gnral",
          label: "Observaciones",
          field: "observacion_gnral",
          align: "center",
          required: true,
        },
      ],
      columnsDetalle: [
        {
          name: "cod_concepto",
          label: "Concepto Costo",
          field: "cod_concepto",
          align: "center",
        },
        {
          name: "monto_costo",
          label: "Monto Bs",
          field: "monto_costo",
          align: "center",
        },
        {
          name: "monto_dolar",
          label: "Monto $",
          field: "monto_dolar",
          align: "center",
        },
        {
          name: "action",
          label: "Acción",
          align: "center",
        },
      ],
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: true,
      },
      money_porc: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "%",
        precision: 2,
        masked: true,
      },
      tipo: [
        { label: "I", value: "I" },
        { label: "E", value: "E" },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 0,
        rowsNumber: "",
        sortBy: "fecha_envio",
        descending: false,
      },
      visibleColumns: [],
      guia_desde: "",
      type: 2,
      selected: [],
      agencias: [],
      agentes: [],
      unidades: [],
      ayudantes: [],
      proveedores: [],
      costos: [],
      detalleCostos: [],
      printOptions: false,
      agenciasSelected: [],
      selectedAgencia: [],
      conceptos: [],
      cantidad: 0,
      total_costo: 0,
      total_guias: 0,
      total_utilidad: 0,
      total_porc_costo: 0,
      total_porc_utilidad: 0,
      fecha_desde: moment("2022-05-01").format("DD/MM/YYYY"),
      fecha_hasta: moment("2022-05-15").format("DD/MM/YYYY"),
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      tab: ref("tabCostos"),
      separator: ref("vertical"),
      form: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
      detalleCostosDialog: ref(false),
      detalleGuiasDialog: ref(false),
      disableMonto: ref(true),
      pdfView: ref(false),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Registro de Costos", "");
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
    this.$refs.methods.getData("/agentes", "setData", "agentes", {
      headers: {
        agencia: 1,
        activo: "S",
      },
    });
    this.$refs.methods.getData("/unidades", "setData", "unidades");
    this.$refs.methods.getData("/ayudantes", "setData", "ayudantes");
    this.$refs.methods.getData("/proveedores", "setData", "proveedores", {
      headers: {
        tipo_servicio: "TP",
        activo: "S",
      },
    });
    this.$refs.methods.getData("/coperacion", "setData", "conceptos", {
      headers: {
        tipo: 5,
      },
    });

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "registrocostos",
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
    findIndex(array, value, field) {
      var find = this[array].findIndex((item) => item.id == value);
      return find >= 0 ? this[array][find][field] : null;
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },

    // METODOS DE PAGINA

    // Metodo para Setear Datos Iniciales
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Setear Datos Generales
    async setDataInit(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this.selectedAgencia = this.agencias[0];
      this.getDataTable();
    },
    // Metodo para Extraer Datos de Tabla
    getDataTable(props) {
      this.loading = true;
      if (props) this.pagination = props.pagination;
      this.$refs.methods.getData(`/costos`, "setDataTable", "costos", {
        headers: {
          agencia: this.selectedAgencia.id ? this.selectedAgencia.id : "",
          desde: moment(this.fecha_desde, "DD/MM/YYYY").format("YYYY-MM-DD"),
          hasta: moment(this.fecha_hasta, "DD/MM/YYYY").format("YYYY-MM-DD"),
          order_by: this.pagination.sortBy,
          order_direction: this.pagination.descending ? "DESC" : "ASC",
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
      this.calculaTotales();
    },
    // Metodo para Agregar Costos
    async addData() {
      await this.pushCosto();
      eval(
        "this.$refs.fecha_envio" + (this.costos.length - 1) + "[0].$el.focus()"
      );
    },
    // Push del Costo
    async pushCosto() {
      var formCosto = {};
      this.costos.push(formCosto);
      this.costos[this.costos.length - 1].fecha_envio =
        moment().format("DD/MM/YYYY");
      this.costos[this.costos.length - 1].tipo_transporte = "I";
      this.costos[this.costos.length - 1].cod_agencia = this.selectedAgencia.id;
    },
    // Metodo para Editar o Crear Datos
    async sendData() {
      this.loading = true;
      var formCosto = {};

      for (var i = 0; i < this.costos.length; i++) {
        formCosto.cod_agencia = this.costos[i].cod_agencia.id
          ? this.costos[i].cod_agencia.id
          : this.costos[i].cod_agencia;
        formCosto.fecha_envio = moment(
          this.costos[i].fecha_envio,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
        formCosto.tipo_transporte = this.costos[i].tipo_transporte;
        formCosto.cod_agente = this.costos[i].cod_agente
          ? this.costos[i].cod_agente.id
            ? this.costos[i].cod_agente.id
            : this.costos[i].cod_agente
          : null;
        formCosto.cod_proveedor = this.costos[i].cod_proveedor
          ? this.costos[i].cod_proveedor.id
            ? this.costos[i].cod_proveedor.id
            : this.costos[i].cod_proveedor
          : null;
        formCosto.guia_fact_transporte = this.costos[i].guia_fact_transporte;
        formCosto.destino = this.costos[i].destino;
        formCosto.cod_transporte = this.costos[i].cod_transporte
          ? this.costos[i].cod_transporte.id
            ? this.costos[i].cod_transporte.id
            : this.costos[i].cod_transporte
          : null;
        formCosto.observacion_gnral = this.costos[i].observacion_gnral;
        formCosto.monto_anticipo = this.curReplace(
          this.costos[i].monto_anticipo
        );
        formCosto.cod_ayudante = this.costos[i].cod_ayudante
          ? this.costos[i].cod_ayudante.id
            ? this.costos[i].cod_ayudante.id
            : this.costos[i].cod_ayudante
          : null;

        // Actualizamos datos del movimiento
        if (this.costos[i].id) {
          await api
            .put(`/costos/${this.costos[i].id}`, formCosto, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .catch(() => {
              this.$q.notify({
                message:
                  "Error del Sistema. Problemas al actualizar los Costos. Comuníquese con el proveedor del Sistemas...",
                color: "red",
              });
              return;
            });
        } else {
          await api
            .post(`/costos`, formCosto, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .catch(() => {
              this.$q.notify({
                message:
                  "Error del Sistema. Problemas al Crear el Costo. Comuníquese con el proveedor del Sistemas...",
                color: "red",
              });
              return;
            });
        }
      }
      this.$q.notify({
        message: "Costos Actualizados con exito...",
        color: "green",
      });
      this.getDataTable();
    },
    // Metodo al abrir el detalle del costo
    onLoadDetalle(index) {
      this.detalleCostosDialog = true;
      this.detalles_costo = this.costos[index].detalles;
    },
    // Push del Costo
    async deleteCosto() {
      await api
        .delete(`/costos/${this.selected}`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          },
        })
        .then(() => {
          this.$q.notify({
            message: "Costo eliminado con Exito...",
            color: "green",
          });
          this.getDataTable();
        })
        .catch(() => {
          this.$q.notify({
            message:
              "Error del Sistema. Problemas al Eliminar el Costo. Comuníquese con el proveedor del Sistemas...",
            color: "red",
          });
          return;
        });
    },
    // Metodo para agregar detalles de Costo
    addDetalle() {
      console.log("dfsdf")
    },
    // Metodo para resetaer la data de los filtros
    resetFilters() {
      this.selectedAgencia = this.agencias[0];
      this.fecha_desde = moment().format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.getDataTable();
    },
    // Metodo para Calcular Totales
    calculaTotales() {
      let monto_costo = 0;
      let monto_guias = 0;
      let monto_utilidad = 0;
      for (var i = 0; i < this.costos.length; i++) {
        let detalle_costo = 0;
        let detalle_guias = 0;
        for (var j = 0; j < this.costos[i].detalles.length; j++) {
          detalle_costo += this.parseFloatN(
            this.costos[i].detalles[j].monto_costo
          );
        }
        for (var k = 0; k < this.costos[i].detallest.length; k++) {
          detalle_guias += this.parseFloatN(
            this.costos[i].detallest[k].movimientos.monto_subtotal
          );
        }
        this.costos[i].monto_costo = detalle_costo.toFixed(2);
        this.costos[i].monto_guias = detalle_guias.toFixed(2);
        this.costos[i].utilidad = (detalle_guias - detalle_costo).toFixed(2);
        this.costos[i].porc_costo = (
          (detalle_costo / detalle_guias) *
          100
        ).toFixed(2);
        this.costos[i].porc_utilidad = (
          ((detalle_guias - detalle_costo) / detalle_guias) *
          100
        ).toFixed(2);
        monto_costo += detalle_costo;
        monto_guias += detalle_guias;
        monto_utilidad += detalle_guias - detalle_costo;
      }
      this.cantidad = this.costos.length;
      this.total_costo = monto_costo.toFixed(2);
      this.total_guias = monto_guias.toFixed(2);
      this.total_utilidad = monto_utilidad.toFixed(2);
      this.total_porc_costo = ((monto_costo / monto_guias) * 100).toFixed(2);
      this.total_porc_utilidad = (
        ((monto_guias - monto_costo) / monto_guias) *
        100
      ).toFixed(2);
    },
    // Metodo para convertir a Currency los String
    curReplace(amount) {
      return amount.indexOf(",") < 0
        ? amount
        : amount.replaceAll(".", "").replaceAll(",", ".");
    },
    // Pasar un numero a numero con dos decimales en formato correcto para efectuar operaciones
    parseFloatN(number) {
      number = Math.round(number * 100) / 100;
      return number;
    },
    pdfPrint() {
      api.get(`/reports/registrocostos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            type: '2',
          },
        })
        .then((res) => {
          this.$refs.webViewer.showpdf(res.data.base64);
        });
    }
  },
};
</script>
