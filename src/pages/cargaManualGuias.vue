<template>
  <q-page class="pagina q-pa-md">
    <q-inner-loading :showing="loadingPage">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData()">
            <div class="row">
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nro_factura"
                  label="Nro. Factura"
                  hint=""
                  class="pcform"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isReq(val)]"
                >
                  <template v-slot:prepend>
                    <q-icon name="badge" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  label="Fecha de Factura"
                  hint=""
                  class="pcform"
                  v-model="form.fecha_factura"
                  lazy-rules
                  mask="##/##/####"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date
                          v-model="form.fecha_factura"
                          mask="DD/MM/YYYY"
                          @update:model-value="this.$refs.qDateProxy.hide()"
                        ></q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_cliente"
                  label="Cliente"
                  hint=""
                  @update:model-value="form.nit = form.nit.toUpperCase()"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.ci_rif"
                  label="CI/RIF"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="group" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="estados_selected"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'estados_selected',
                        'estadosForm',
                        'nb_agencia'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  class="pcform"
                  option-label="nb_agencia"
                  option-value="id"
                  v-model="form.estado"
                  outlined
                  standout
                  label="Estado Entrega"
                  @update:model-value="
                    this.selectedCliente = [];
                    this.clientes = [];
                    getData(`/agentes`, 'setData', 'agentes', {
                      headers: {
                        agencia: this.selectedAgencia.id,
                      },
                    });
                  "
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-select
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="ciudades_selected"
                  @filter="
                    (val, update, abort) =>
                      filterArray(
                        val,
                        update,
                        abort,
                        'ciudad_selected',
                        'ciudadesForm',
                        'nb_agencia'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  option-label="nb_agencia"
                  option-value="id"
                  v-model="form.ciudad"
                  outlined
                  standout
                  label="Ciudad Entrega"
                  ><template v-slot:no-option>
                    <q-item>
                      <q-item-section class="text-grey">
                        Sin resultados
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.bultos"
                  label="Bultos"
                  v-money="moneyNotDecimal"
                  hint=""
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.telefono"
                  label="Telefono"
                  hint=""
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.monto"
                  label="Monto Factura"
                  v-money="money"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.peso"
                  label="Peso"
                  class="pcform"
                  v-money="moneyNotDecimal"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.carga_neta"
                  label="Carga Neta"
                  v-money="money"
                  class="pcform"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-4 col-xs-12">
                <q-input
                  outlined
                  v-model="form.porc_comision"
                  v-money="money"
                  label="% Comision"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-12 col-xs-12">
                <q-input
                  outlined
                  v-model="form.direccion"
                  label="Direccion Entrega"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
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

    <q-page-sticky
      position="bottom-right"
      class="z-top"
      style="margin-right: 20px; margin-bottom: 20px"
    >
      <q-btn round color="primary" icon="save" @click="saveData()" />
    </q-page-sticky>

    <div class="q-pa-sm justify-center">
      <div
        class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
        style="
          align-self: center;
          text-align: center;
          font-size: 20px;
          margin-top: 20px;
        "
      >
        <p><strong>MANTENIMIENTO - CARGA MANUAL DE GUIAS</strong></p>
      </div>

      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; padding-bottom: 10px"
      >
        <div
          class="col-md-5 col-xl-8 col-lg-8 col-xs-12 col-sm-12 cardMarginFilter selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-file
            rounded
            outlined
            v-model="file"
            ref="txtFile"
            dense
            label="Archivo TXT"
            max-files="1"
            @update:model-value="
              readFile();
              this.datos = [];
            "
            accept=".txt, .TXT"
            @rejected="onRejected"
          >
            <template v-slot:append>
              <q-icon
                v-if="file !== null"
                name="close"
                @click.stop.prevent="file = null"
                class="cursor-pointer"
              />
              <q-icon
                name="file_upload"
                @click="this.$refs.txtFile.pickFiles()"
              />
            </template>
            <template v-slot:hint> </template>
          </q-file>
        </div>

        <div
          class="col-md-6 col-xl-4 col-lg-4 col-xs-12 col-sm-12 botonesGuias"
          style="text-align: right; align-self: center"
        >
          <q-btn
            dense
            color="primary"
            :disabled="this.allowOption(2)"
            round
            @click=""
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
          >
            <q-icon size="25px" name="find_in_page" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Agregar Control</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedAgencia = [];
              selectedCliente = [];
              selectedAgente = [];
              file = [];
              clientes = [];
              agentes = [];
              form = [];
              datos = [];
            "
          >
            <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataGuias();
            "
          >
            <q-icon size="25px" name="content_paste_search" color="white">
            </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataGuias();
            "
          >
            <q-icon size="25px" name="file_open" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedAgencia = [];
              getDataGuias();
            "
          >
            <q-icon size="25px" name="collections_bookmark" color="white">
            </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="primary"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 6px"
            @click="
              selectedCliente = [];
              selectedAgente = [];
              selectedGuiaCarga = '';
              selectedGuiaFactura = '';
              selectedCulminado = '';
              guia_desde = '';
              guia_hasta = '';
              getDataGuias();
            "
          >
            <q-icon size="25px" name="print" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Eliminar Filtros</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            color="white"
            round
            padding="sm"
            style="margin-bottom: 6px"
          >
            <q-icon size="25px" name="print" color="primary"> </q-icon>
            <q-tooltip
              class="bg-primary"
              transition-show="scale"
              style="max-height: 30px"
              transition-hide="scale"
              color="primary"
              >Carta para el Cliente</q-tooltip
            >
          </q-btn>
        </div>
      </div>

      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center"
      >
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMarginFilter selectMobile"
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
            label="Agencia"
            @update:model-value="
              this.selectedCliente = [];
              this.selectedAgente = [];
              this.clientes = [];
              this.agentes = [];
              getData(`/agentes`, 'setData', 'agentes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
              getData(`/clientes`, 'setData', 'clientes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
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
            <template v-slot:append>
              <q-icon
                @click.stop.prevent="
                  this.selectedAgencia = [];
                  this.selectedCliente = [];
                  this.selectedAgente = [];
                  this.clientes = [];
                  this.agentes = [];
                "
                class="cursor-pointer"
                name="filter_alt_off"
              />
            </template>
          </q-select>
        </div>

        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-6 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="clientesSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'clientesSelected',
                  'clientes',
                  'nb_cliente'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="nb_cliente"
            option-value="id"
            v-model="selectedCliente"
            outlined
            standout
            label="Cliente Origen"
            ><template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon
                @click.stop.prevent="this.selectedCliente = []"
                class="cursor-pointer"
                name="filter_alt_off"
              />
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>

        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-6 selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            transition-show="flip-up"
            transition-hide="flip-down"
            :options="agentesSelected"
            @filter="
              (val, update, abort) =>
                filterArray(
                  val,
                  update,
                  abort,
                  'agentesSelected',
                  'agentes',
                  'nb_agente'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            option-label="persona_responsable"
            option-value="id"
            v-model="selectedAgente"
            outlined
            standout
            label="Agente de Venta"
            ><template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  Sin resultados
                </q-item-section>
              </q-item>
            </template>
            <template v-slot:append>
              <q-icon
                @click.stop.prevent="this.selectedAgente = []"
                class="cursor-pointer"
                name="filter_alt_off"
              />
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>
      </div>
    </div>

    <div class="q-pa-md q-gutter-y-md" style="padding-top: 6px">
      <q-table
        :rows="datos"
        binary-state-sort
        row-key="id"
        :columns="columns"
        :loading="loading"
        :separator="separator"
        style="width: 100%"
        :grid="$q.screen.xs"
        :rows-per-page-options="[5, 10, 15, 20, 50]"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" style="padding-top: 46px" />
        </template>
        <template v-slot:body-cell-nro_guia="props">
          <q-td :props="props">
            <q-input
              outlined
              dense
              style="min-width: 120px"
              v-model="props.row.nro_guia"
              @update:model-value="
                this.$refs.methods.getData(
                  `/correlativo/${props.row.id}`,
                  `putDataSelect`,
                  'form'
                )
              "
            >
            </q-input>
          </q-td>
        </template>
        <template v-slot:body-cell-porc_zona="props">
          <q-td :props="props">
            <q-input
              outlined
              dense
              v-model="props.row.porc_zona"
              :input-style="{ color: 'blue' }"
              v-if="props.row.porc_zona_status == true"
            >
            </q-input>
            <q-input
              outlined
              dense
              v-model="props.row.porc_zona"
              :input-style="{ color: 'red' }"
              v-else-if="props.row.porc_zona_status == false"
            >
            </q-input>
            <q-input outlined dense v-model="props.row.porc_zona" v-else>
            </q-input>
          </q-td>
        </template>
        <template v-slot:body-cell-ciudad="props">
          <q-td
            :props="props"
            style="color: blue"
            v-if="props.row.ciudadExist == true && !props.row.zonaExist"
          >
            {{ props.row.ciudad }}
          </q-td>
          <q-td :props="props" v-else-if="props.row.zonaExist == true">
            {{ props.row.ciudad }}
          </q-td>
          <q-td :props="props" style="color: red" v-else>
            {{ props.row.ciudad }}
          </q-td>
        </template>
        <template v-slot:body-cell-estado="props">
          <q-td :props="props" style="color: red" v-if="!props.row.estadoExist">
            {{ props.row.estado }}
          </q-td>
          <q-td :props="props" v-else>
            {{ props.row.estado }}
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
                this.resetForm();
                this.setDataEdit(props.row);
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
                    <q-input
                      v-if="col.name === 'porc_zona'"
                      outlined
                      dense
                      v-model="props.row.porc_zona"
                      @update:model-value="
                        this.$refs.methods.getData(
                          `/correlativo/${props.row.id}`,
                          `putDataSelect`,
                          'form'
                        )
                      "
                    >
                    </q-input>
                    <q-input
                      v-if="col.name === 'nro_guia'"
                      outlined
                      dense
                      v-model="props.row.nro_guia"
                      @update:model-value="
                        this.$refs.methods.getData(
                          `/correlativo/${props.row.id}`,
                          `putDataSelect`,
                          'form'
                        )
                      "
                    >
                    </q-input>
                    <q-btn
                      v-if="col.name === 'action'"
                      dense
                      round
                      flat
                      color="primary"
                      icon="edit"
                      :disabled="this.allowOption(3)"
                      @click="
                        this.resetForm();
                        this.setDataEdit(props.row);
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
                    <q-item-label
                      v-if="col.name != 'nro_guia' && col.name != 'porc_zona'"
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

    <q-dialog v-model="deletePopup">
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
            @click="deleteData(selected)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="information">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            {{ information }}
          </div>
        </q-card-section>
        <q-card-actions align="center">
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
      @set-Data="setData"
      @set-Data-Edit="setDataEdit"
      @reset-Loading="resetLoading"
      @set-Data-Init="setDataInit"
      @set-Data-Permisos="setDataPermisos"
    ></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import rulesVue from "src/components/rules.vue";
import moment from "moment";
import { VMoney } from "v-money";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
    VMoney,
  },
  directives: { money: VMoney },

  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 2,
        masked: true,
      },
      moneyNotDecimal: {
        decimal: ",",
        thousands: ".",
        prefix: "",
        suffix: "",
        precision: 0,
        masked: true,
      },
      columns: [
        {
          name: "nro_factura",
          label: "Nro. Factura",
          field: "nro_factura",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "fecha_factura",
          label: "Fecha Factura",
          field: "fecha_factura",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nb_cliente",
          label: "Nombre Cliente",
          field: "nb_cliente",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "ci_rif",
          label: "CI-RIF",
          field: "ci_rif",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "direccion",
          label: "Dirección Entrega",
          field: "direccion",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "estado",
          label: "Estado Entrega",
          field: "estado",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "ciudad",
          label: "Ciudad Entrega",
          field: "ciudad",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "bultos",
          label: "Bultos",
          field: "bultos",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "telefono",
          label: "Teléfono",
          field: "telefono",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "monto",
          label: "Monto Factura",
          field: "monto",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "peso",
          label: "Peso Kgs",
          field: "peso",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "carga_neta",
          label: "Carga Neta",
          field: "carga_neta",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "porc_zona",
          label: "% Por Zona",
          field: "porc_zona",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "nro_guia",
          label: "Nro. Guia",
          field: "nro_guia",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "last_nro_factura",
          label: "Nro. Factura",
          field: "nro_factura",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
          required: false,
        },
      ],
      form: {
        id: "",
        nro_factura: "",
        fecha_factura: "",
        nb_cliente: "",
        ci_rif: "",
        direccion: "",
        estado: [],
        ciudad: [],
        bultos: "",
        telefono: "",
        monto: "",
        peso: "",
        carga_neta: "",
        porc_comision: "",
        nro_guia: "",
      },
      pagination: {
        page: 1,
        rowsPerPage: 5,
        sortBy: "ci_rif",
        descending: false,
      },
      datos: [],
      loadingPage: false,
      file: null,
      validate: null,
      agencias: [],
      rpermisos: [],
      menus: [],
      clientes: [],
      agentes: [],
      agenciasSelected: [],
      agentesSelected: [],
      clientesSelected: [],
      selected: [],
      selectedAgencia: [],
      selectedCliente: [],
      selectedAgente: [],
      estadosForm: [],
      ciudadesForm: [],
      error: "",
      content: null,
    };
  },
  setup() {
    const $q = useQuasar();
    const loading = ref(false);
    const order = ref(false);
    return {
      anulate: ref(false),
      fileSelector: false,
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
    };
  },
  mounted() {
    this.$emit(
      "changeTitle",
      "SCEN - Mantenimiento - Carga Manual de Guias",
      ""
    );
    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "asignacionguias",
      },
    });
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
  },
  methods: {
    // Metodo para Interpretar Archivos Subidos
    readFile() {
      this.loadingPage = true;
      const reader = new FileReader();
      reader.onerror = (err) => console.log(err);
      reader.readAsText(this.file);
      reader.onload = async (res) => {
        this.content = res.target.result;
        var lines = this.content.split("\n");
        for (var i = 0; i < lines.length - 1; i++) {
          var form = {};
          var estadoID = null;
          var columns = lines[i].split("\t");
          form.nro_factura = columns[0];
          form.fecha_factura = columns[1];
          form.nb_cliente = columns[2];
          form.ci_rif = columns[3];
          form.direccion = columns[4];
          form.ciudad = columns[5];
          form.estado = columns[6];
          form.bultos = columns[7];
          form.telefono = columns[8];
          form.monto = columns[9];
          form.peso = columns[10];
          form.carga_neta = columns[11];
          form.id = i;
          await api
            .get(`/estados`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                desc: form.estado,
                pais: 1,
              },
            })
            .then((res) => {
              if (res.data.data[0]) {
                form.estadoExist = true;
                estadoID = res.data.data[0].id;
              } else {
                form.estadoExist = false;
              }
            })
            .catch((err) => {
              if (err.response) {
                form.estadoExist = false;
              }
            });
          if (estadoID) {
            await api
              .get(`/ciudades`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  desc: form.ciudad,
                  estado: estadoID,
                },
              })
              .then((res) => {
                if (res.data.data[0]) {
                  form.ciudadExist = true;
                } else {
                  form.ciudadExist = false;
                }
              })
              .catch((err) => {
                if (err.response) {
                  form.ciudadExist = false;
                }
              });
            if (form.ciudadExist) {
              await api
                .get(`/zonas`, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    desc: form.ciudad,
                  },
                })
                .then((res) => {
                  if (res.data[0]) {
                    form.zonaExist = true;
                  }
                });
            }
          }
          this.datos.push(form);
        }
        this.loadingPage = false;
      };
    },
    // Metodo para Manejar Errores al Subir Archivos
    onRejected() {
      this.$q.notify({
        type: "negative",
        message: `El archivo a cargar debe ser un TXT`,
      });
    },
    // Metodo para Actualizar Datos de Tabla
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.selectedAgencia = this.agencias[0];
      this.$refs.methods.getData("/clientes", "setData", "clientes", {
        headers: {
          agencia: this.agencias[0].id,
        },
      });
      this.$refs.methods.getData("/agentes", "setData", "agentes", {
        headers: {
          agencia: this.agencias[0].id,
        },
      });
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
    // Metodo de Permisos
    allowOption(option) {
      return (
        this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0
      );
    },
    // Metodo para Setear Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },
    // Pasar un numero a numero con dos decimales en formato correcto para efectuar operaciones
    parseFloatN(number) {
      number = Math.round(number * 100) / 100;
      return number;
    },

    // METODOS DE PAGINA

    // Metodo para hacer Get de Datos
    getData(url, call, dataRes, axiosConfig) {
      this.$refs.methods.getData(url, call, dataRes, axiosConfig);
    },
    // Metodo para hacer Get de Guias
    getDataGuias() {
      var cliente = "";
      var agente = "";
      var sortBy = this.pagination.sortBy;
      var orderDirection = this.orderDirection;
      if (this.selectedCliente.id) cliente = this.selectedCliente.id;
      if (this.selectedAgente.id) agente = this.selectedAgente.id;
      if (!sortBy) sortBy = "control_inicio";
      if (orderDirection == "") orderDirection = "DESC";
      this.$refs.methods.getData(`/cguias`, "setDataTable", "datos", {
        headers: {
          page: 1,
          limit: 5,
          order_by: sortBy,
          order_direction: orderDirection,
          agencia: this.selectedAgencia.id,
          agente: agente,
          cliente: cliente,
          disp: this.selectedCulminado,
          tipo: "20",
          desde: this.guia_desde,
          hasta: this.guia_hasta,
        },
      });
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Setear Datos Seleccionados
    setDataEdit(dataRes) {
      var form = dataRes;
      (this.form.id = form.id),
        (this.form.nro_factura = form.nro_factura),
        (this.form.fecha_factura = form.fecha_factura),
        (this.form.nb_cliente = form.nb_cliente),
        (this.form.ci_rif = form.ci_rif),
        (this.form.direccion = form.direccion),
        (this.form.estado = form.estado),
        (this.form.ciudad = form.ciudad),
        (this.form.bultos = form.bultos),
        (this.form.telefono = form.telefono),
        (this.form.monto = form.monto),
        (this.form.peso = form.peso),
        (this.form.carga_neta = form.carga_neta),
        (this.form.porc_comision = form.porc_comision),
        (this.form.nro_guia = form.nro_guia);
      // this.getData(`/agentes`, 'setData', 'estadosForm', {
      //   headers: {
      //     agencia: this.selectedAgencia.id,
      //   },
      // });
      // this.getData(`/agentes`, 'setData', 'ciudadesForm', {
      //   headers: {
      //     agencia: this.selectedAgencia.id,
      //   },
      // });
    },
    // Metodo para Eliminar Datos Seleccionados
    deleteData(idpost) {
      this.datos.splice(idpost, 1);
    },
    // Metodo para Editar o Crear Datos
    async sendData() {
      try {
        this.loadingPage = true;
        var errorMessage;
        var monto_basico;
        var kgs_adicionales;
        var kgr_minimos;
        var monto_kg_ad;
        var monto_kg_adicional;
        var monto_comision;
        var monto_base;
        var form;
        var datos;
        datos = JSON.parse(JSON.stringify(this.datos));
        form = JSON.parse(JSON.stringify(this.form));
        form.bultos = form.bultos.replaceAll(".", "").replaceAll(",", ".");
        form.monto = form.monto.replaceAll(".", "").replaceAll(",", ".");
        form.peso = form.peso.replaceAll(".", "").replaceAll(",", ".");
        form.carga_neta = form.carga_neta
          .replaceAll(".", "")
          .replaceAll(",", ".");
        form.porc_comision = form.porc_comision
          .replaceAll(".", "")
          .replaceAll(",", ".");

        if (form.peso < 30) {
          // Buscar tarifa kg adicionales – De aquí sacar monto_kg_adicional
          await api.get(`/tarifas`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                tipo_tarifa: "BA",
                tipo_urgencia: "N",
                tipo_ubicacion: "U",
                tipo_carga: "PM",
              },
            })
            .then((res) => {
              if (!res.data[0]) {
                errorMessage = `Problemas al ubicar la tarifa básica. Revisar mantenimiento de tarifas`;
                return stopFuction;
              }
              if (
                res.data[0].monto_tarifa == null ||
                res.data[0].monto_tarifa == "" ||
                res.data[0].monto_tarifa == 0
              ) {
                errorMessage = `Problemas al ubicar el monto de la tarifa básica. Revisar mantenimiento de tarifas`;
                return stopFuction;
              }
              if (
                res.data[0].kgr_hasta == null ||
                res.data[0].kgr_hasta == "" ||
                res.data[0].kgr_hasta == 0
              ) {
                errorMessage = `Problemas al ubicar los Kgs. minimos de la tarifa básica. Revisar mantenimiento de tarifas`;
                return error;
              }
              monto_basico = res.data[0].monto_tarifa;
              kgr_minimos = res.data[0].kgr_hasta;
            })
            .catch((err) => {
              if (err.response) {
                errorMessage = err.response.data.message;
              }
              return stopFuction;
            });
          // Buscar tarifa kg adicionales – De aquí sacar monto_kg_adicional
          await api.get(`/tarifas`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                tipo_tarifa: "KA",
                tipo_urgencia: "N",
                tipo_ubicacion: "U",
                modalidad_pago: "CO",
                pagado_en: "O",
                region_origen: "CE",
                region_destino: "OR",
                mix_region: "S",
              },
            })
            .then((res) => {
              if (!res.data[0]) {
                errorMessage = `Problemas al ubicar la tarifa de Kgs. Adicionales. Revisar mantenimiento de tarifas`;
                return stopFuction;
              }
              if (
                res.data[0].kgr_hasta == null ||
                res.data[0].kgr_hasta == "" ||
                res.data[0].kgr_hasta == 0
              ) {
                errorMessage = `Problemas al ubicar los Kgs. Adicionales de la tarifa. Revisar mantenimiento de tarifas`;
                return error;
              }
              monto_kg_adicional = res.data[0].monto_tarifa;
            })
            .catch((err) => {
              if (err.response) {
                errorMessage = err.response.data.message;
              }
              return stopFuction;
            });
        }
        console.log("monto_basico " + monto_basico);
        console.log("kgs_adicionales " + kgs_adicionales);
        console.log("kgr_minimos " + kgr_minimos);
        console.log("monto_kg_ad " + monto_kg_ad);
        console.log("monto_kg_adicional " + monto_kg_adicional);
        console.log("monto_comision " + monto_comision);
        console.log("monto_base " + monto_base);
        if (datos[form.id].peso > kgr_minimos) {
          kgs_adicionales =
            this.parseFloatN(datos[form.id].peso) -
            this.parseFloatN(kgr_minimos);
        } else {
          kgs_adicionales = 0;
        }

        monto_kg_ad =
          this.parseFloatN(kgs_adicionales) *
          this.parseFloatN(monto_kg_adicional);

        monto_comision =
          (this.parseFloatN(datos[form.id].monto) *
            this.parseFloatN(datos[form.id].porc_zona)) /
          100;

        monto_base =
          this.parseFloatN(monto_basico) + this.parseFloatN(monto_kg_ad);

        if (monto_base > monto_comision) {
          if (kgs_adicionales == 0) {
            datos[form.id].porc_zona_status = true;
          } else {
            datos[form.id].porc_zona_status = false;
          }
        }
        console.log("RESULTADOS");
        console.log("monto_basico " + monto_basico);
        console.log("kgs_adicionales " + kgs_adicionales);
        console.log("kgr_minimos " + kgr_minimos);
        console.log("monto_kg_ad " + monto_kg_ad);
        console.log("monto_kg_adicional " + monto_kg_adicional);
        console.log("monto_comision " + monto_comision);
        console.log("monto_base " + monto_base);
        this.loadingPage = false;
        this.datos[form.id] = form;
        this.dialog = false;
      } catch (stopFuction) {
        console.log(stopFuction);
        this.loadingPage = false;
        if (errorMessage) {
          this.$q.notify({
            message: errorMessage,
            color: "red",
          });
        }
      }
    },
    async saveData() {
      try {
        this.loadingPage = true;
        var errorMessage;
        var datos;
        datos = JSON.parse(JSON.stringify(this.datos));
        if (datos[0]) {
          for (var i = 0; i <= datos.length - 1; i++) {
            datos[i].bultos = datos[i].bultos
              .replaceAll(".", "")
              .replaceAll(",", ".");
            datos[i].monto = datos[i].monto
              .replaceAll(".", "")
              .replaceAll(",", ".");
            datos[i].peso = datos[i].peso
              .replaceAll(".", "")
              .replaceAll(",", ".");
            datos[i].carga_neta = datos[i].carga_neta
              .replaceAll(".", "")
              .replaceAll(",", ".");
            datos[i].porc_comision = datos[i].porc_comision
              .replaceAll(".", "")
              .replaceAll(",", ".");
            if (this.$refs.rulesVue.isReq(datos[i].porc_zona, false)) {
              errorMessage = `Error. El % Porc por Zona es Requerido en factura NRO ${datos[i].nro_factura}`;
              return stopFuction;
            }
            if (this.$refs.rulesVue.isReq(datos[i].nro_guia, false)) {
              errorMessage = `Error en Nro de Guia de factura NRO ${datos[i].nro_factura}`;
              return stopFuction;
            }
          }
        } else {
          errorMessage = `Error. No hay un Documento Cargado`;
          return stopFuction;
        }
        this.loadingPage = false;
      } catch (stopFuction) {
        this.loadingPage = false;
        if (errorMessage) {
          this.$q.notify({
            message: errorMessage,
            color: "red",
          });
        }
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      this.form.id = "";
      this.form.nro_factura = "";
      this.form.fecha_factura = "";
      this.form.nb_cliente = "";
      this.form.ci_rif = "";
      this.form.direccion = "";
      this.form.estado = [];
      this.form.ciudad = [];
      this.form.bultos = "";
      this.form.telefono = "";
      this.form.monto = "";
      this.form.peso = "";
      this.form.carga_neta = "";
      this.form.porc_comision = "";
      this.form.nro_guia = "";
    },
  },
};
</script>

<style>
.hide {
  display: none;
}

@media screen and (min-width: 1024px) {
  .inputMenuGuias {
    margin-right: 20px;
  }
}

@media screen and (min-width: 600px) {
  .menuFilter {
    padding-bottom: 1px;
  }
}

@media screen and (max-width: 1024px) {
  .inputMenuGuias {
    margin-top: 14px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1024px) {
  .titleMenu {
    padding-bottom: 1px;
  }
}

@media screen and (max-width: 600px) {
  .titleMenu {
    margin-top: 15px;
  }
}

@media screen and (max-width: 1024px) {
  .checkboxGuias {
    margin-top: 14px;
  }
}

@media screen and (max-width: 1024px) {
  .checkboxGuias {
    margin-left: 10px;
  }
}

@media screen and (max-width: 1024px) {
  .botonesGuias {
    margin-top: 7px;
  }
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
  .cardMarginFilter {
    padding-right: 20px !important;
  }
}

@media screen and (max-width: 600px) {
  .cajaMobile {
    padding: 5px !important;
  }
}

@media screen and (max-width: 1024px) {
  .selectMobile {
    margin-bottom: 15px !important;
  }
}

@media screen and (max-width: 600px) {
  .selectMobile2 {
    margin-bottom: 15px;
  }
}

@media screen and (min-width: 1024px) {
  .checkboxCulminado {
    margin-top: -6px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1024px) {
  .checkboxCulminado {
    margin-top: 8px;
    text-align: center;
  }
}
</style>
