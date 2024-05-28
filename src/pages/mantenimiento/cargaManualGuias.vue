<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="dialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="this.sendData()">
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
              <div class="col-md-2 col-xs-12">
                <q-input
                  outlined
                  label="Fecha de Factura"
                  hint=""
                  class="pcform"
                  v-model="form.fecha_factura"
                  lazy-rules
                  :rules="[(val) => this.$refs.rulesVue.isReq(val)]"
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
              <div class="col-md-6 col-xs-12">
                <q-input
                  outlined
                  v-model="form.nb_cliente"
                  label="Cliente"
                  hint=""
                  :rules="[(val) => this.$refs.rulesVue.isReq(val)]"
                >
                  <template v-slot:prepend>
                    <q-icon name="pin" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="form.ci_rif"
                  label="CI/RIF"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReq(val)]"
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
                  :options="estadoSelected"
                  class="pcform"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'estadoSelected',
                        'estados',
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
                  label="Estado"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
                  @update:model-value="
                    this.selectedCiudad = [];
                    this.ciudades = [];
                    this.$refs.methods.getData(
                      `/ciudades`,
                      'setData',
                      'ciudades',
                      {
                        headers: {
                          estado: this.selectedEstado.id,
                        },
                      }
                    );
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
              <div class="col-md-3 col-xs-12">
                <q-select
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="ciudadSelected"
                  @filter="
                    (val, update) =>
                      filterArray(
                        val,
                        update,
                        'ciudadSelected',
                        'ciudades',
                        'desc_ciudad'
                      )
                  "
                  use-input
                  hide-selected
                  fill-input
                  class="pcform"
                  input-debounce="0"
                  option-label="desc_ciudad"
                  option-value="id"
                  v-model="selectedCiudad"
                  outlined
                  standout
                  label="Ciudad"
                  :rules="[(val) => this.$refs.rulesVue.isReqSelect(val)]"
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
              <div class="col-md-2 col-xs-12">
                <q-input
                  outlined
                  v-model="form.bultos"
                  label="Bultos"
                  v-money="moneyNotDecimal"
                  :rules="[(val) => this.$refs.rulesVue.isReq(val)]"
                  input-class="text-right"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="pin_drop" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="form.telefono"
                  label="Telefono"
                  hint=""
                  mask="(####) ### - ####"
                  class="pcform"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="phone" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="form.monto"
                  label="Monto Factura"
                  input-class="text-right"
                  v-money="money"
                  hint=""
                  class="pcform"
                  :rules="[(val) => this.$refs.rulesVue.isReq(val)]"
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="email" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="form.peso"
                  label="Peso"
                  class="pcform"
                  input-class="text-right"
                  v-money="money"
                  :rules="[(val) => this.$refs.rulesVue.isReq(val)]"
                  hint=""
                  lazy-rules
                >
                  <template v-slot:prepend>
                    <q-icon name="visibility" />
                  </template>
                </q-input>
              </div>
              <div class="col-md-3 col-xs-12">
                <q-input
                  outlined
                  v-model="form.carga_neta"
                  label="Carga Neta"
                  input-class="text-right"
                  v-money="money"
                  :rules="[(val) => this.$refs.rulesVue.isReq(val)]"
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
                  :rules="[(val) => this.$refs.rulesVue.isReq(val)]"
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
          class="col-md-6 col-xl-8 col-lg-8 col-xs-12 col-sm-12 cardMarginFile selectMobile"
          style="align-self: center; text-align: center"
        >
          <q-file
            rounded
            outlined
            v-model="file"
            ref="txtFile"
            dense
            label="Archivo TXT"
            style="margin-bottom: 10px"
            max-files="1"
            @update:model-value="
              readFile();
              this.datos = [];
            "
            accept=".txt, .TXT"
            @rejected="
              this.$q.notify({
                color: 'red',
                message: `El archivo a cargar debe ser un TXT`,
              })
            "
          >
            <template v-slot:append v-if="!this.allowOption(2)">
              <q-icon
                name="file_upload"
                @click="this.$refs.txtFile.pickFiles()"
              />
            </template>
            <template v-slot:hint> </template>
          </q-file>
        </div>
        <div
          class="col-md-6 col-xl-4 col-lg-4 col-xs-12 col-sm-12 botonesGuias justify-center"
          style="text-align: center; align-self: center"
        >
          <q-btn
            dense
            color="primary"
            :disabled="this.allowOption(2)"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 10px"
            @click="
              this.file = [];
              this.selectedAgencia = [];
              this.resetFilters();
            "
          >
            <q-icon size="25px" name="filter_alt_off" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Limpiar Filtros</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            :disabled="this.allowOption(2)"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 10px"
            @click="this.asignarGuia()"
          >
            <q-icon size="25px" name="assignment_returned" color="white">
            </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Asignar Nro Guías</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            :disabled="this.allowOption(2)"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 10px"
            @click="this.cargarGuias()"
          >
            <q-icon size="25px" name="browser_updated" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Cargar Guías</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="primary"
            :disabled="this.allowOption(2)"
            round
            padding="sm"
            style="margin-right: 25px; margin-bottom: 10px"
            :disable="this.selectedCliente.length == 0 ? true : false"
            @click="
              this.printType = 1;
              this.printGuias();
            "
          >
            <q-icon size="25px" name="print" color="white"> </q-icon>
            <q-tooltip
              class="bg-primary"
              style="max-height: 30px"
              transition-show="scale"
              transition-hide="scale"
              color="primary"
              >Imprimir Guías Preimpreso</q-tooltip
            >
          </q-btn>
          <q-btn
            dense
            color="white"
            :disabled="this.allowOption(2)"
            round
            padding="sm"
            style="margin-bottom: 10px"
            :disable="this.selectedCliente.length == 0 ? true : false"
            @click="
              this.printType = 2;
              this.printGuias();
            "
          >
            <q-icon size="25px" name="print" color="primary"> </q-icon>
            <q-tooltip
              class="bg-primary"
              transition-show="scale"
              style="max-height: 30px"
              transition-hide="scale"
              color="primary"
              >Imprimir Guías Forma Libre
            </q-tooltip>
          </q-btn>
        </div>
      </div>

      <div
        class="row q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
        style="align-self: center; text-align: center; margin-top: -20px"
      >
        <div
          class="col-md-4 col-xl-4 col-lg-4 col-xs-12 col-sm-12 cardMarginFilter selectMobile2"
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
            ref="agencia"
            v-model="selectedAgencia"
            outlined
            standout
            label="Agencia"
            @update:model-value="
              this.selectedCliente = [];
              this.selectedAgente = [];
              this.clientes = [];
              this.agentes = [];
              this.clientesLoading = true;
              this.agentesLoading = true;
              this.$refs.methods.getData(`/agentes`, 'setData', 'agentes', {
                headers: {
                  agencia: this.selectedAgencia.id,
                },
              });
              this.$refs.methods.getData(`/clientes`, 'setData', 'clientes', {
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
              (val, update) =>
                filterArray(
                  val,
                  update,
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
            ref="cliente"
            :loading="clientesLoading"
            :disable="clientesLoading"
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
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:clientesLoading>
              <q-inner-loading showing color="primary" class="loading" />
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
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'agentesSelected',
                  'agentes',
                  'persona_responsable'
                )
            "
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            :loading="agentesLoading"
            :disable="agentesLoading"
            ref="agente"
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
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:clientesLoading>
              <q-inner-loading showing color="primary" class="loading" />
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
        style="width: 100%; height: 550px"
        :grid="$q.screen.xs"
        :rows-per-page-options="[0]"
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" style="padding-top: 60px" />
        </template>
        <template v-slot:body-cell-nro_guia="props">
          <q-td :props="props">
            <q-input
              outlined
              dense
              style="min-width: 120px"
              v-model="props.row.nro_guia"
              :ref="'nro_guia' + props.rowIndex"
              mask="##########"
              :input-style="{ color: props.row.colorGuia }"
              @blur="this.validateGuia(props.row.nro_guia, props.rowIndex)"
              @keyup.enter="
                this.validateGuia(props.row.nro_guia, props.rowIndex)
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
              input-class="text-right"
              v-money="money"
              :ref="'porc_zona' + props.rowIndex"
              style="min-width: 80px"
              v-model="props.row.porc_zona"
              @blur="this.validatePorcZona(props.row, props.rowIndex)"
              @keyup.enter="this.validatePorcZona(props.row, props.rowIndex)"
              :input-style="{ color: props.row.colorZona }"
            >
            </q-input>
          </q-td>
        </template>
        <template v-slot:body-cell-ciudad="props">
          <q-td :props="props" :style="{ color: props.row.colorCiudad }">
            {{ props.row.ciudad }}
          </q-td>
        </template>
        <template v-slot:body-cell-estado="props">
          <q-td :props="props" :style="{ color: props.row.colorEstado }">
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
              @click="this.setDataEdit(props.row)"
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
                      @click="this.setDataEdit(props.row)"
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
      <q-inner-loading :showing="loadingPage">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </div>

    <q-dialog v-model="confirmUploadPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            Desea ingresar los datos mostrados al registro de Ventas de RCS
            Express, C.A. ?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            color="primary"
            @click="this.confirmUpload = false"
            v-close-popup
          />
          <q-btn
            flat
            label="Guardar"
            color="primary"
            v-close-popup
            @click="this.confirmUpload = true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

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
            @click="this.datos.splice(selected, 1)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="guiasPrintDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <div
          class="row justify-center items-center content-center"
          style="padding: 20px"
        >
          <div class="col-md-12 col-xs-12">
            <p style="font-size: 20px; text-align: left" class="text-secondary">
              <strong>IMPRIMIR GUÍAS CARGA</strong>
            </p>
          </div>
          <div class="col-md-12 col-xs-12">
            <q-table
              :rows="guias_print"
              row-key="id"
              selection="multiple"
              v-model:selected="selectedGuiasPrint"
              :columns="columnsPrint"
              binary-state-sort
              :separator="separator"
              :grid="$q.screen.xs"
              :rows-per-page-options="[0]"
              style="width: 100%; height: 350px"
              hide-bottom
            >
            </q-table>
          </div>
        </div>
        <div
          class="row justify-center items-center content-center"
          style="margin-bottom: 20px"
        >
          <q-btn
            label="Imprimir"
            color="primary"
            class="col-md-5 col-sm-5 col-xs-12"
            icon="print"
            @click="this.printData()"
          />
          <q-btn
            label="Cancelar"
            color="primary"
            flat
            class="col-md-5 col-sm-5 col-xs-12 btnmovil"
            icon="close"
            v-close-popup
          />
        </div>
      </q-card>
    </q-dialog>

    <q-dialog v-model="pdfView" @show="this.pdfPrint()">
      <webViewer
        ref="webViewer"
        @close-pdf="this.pdfView = false"
        style="width: 1000px; height: 750px; max-width: 1000px"
      ></webViewer>
    </q-dialog>

    <q-dialog v-model="confirmPopUp" persistent>
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Seguro desea imprimir las Guias sin el Preimpreso?
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Si"
            color="primary"
            @click="this.confirmPrint = true"
            v-close-popup
          />
          <q-btn
            flat
            label="No"
            color="primary"
            v-close-popup
            @click="this.confirmPrint = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
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
import moment from "moment";
import rulesVue from "src/components/rules.vue";
import { VMoney } from "v-money";
import { useQuasar, LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";
import webViewerVue from "src/components/webViewer.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
    VMoney,
    webViewer: webViewerVue,
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
        },
        {
          name: "fecha_factura",
          label: "Fecha Factura",
          field: "fecha_factura",
          align: "left",
        },
        {
          name: "nb_cliente",
          label: "Nombre Cliente",
          field: "nb_cliente",
          align: "left",
        },
        {
          name: "ci_rif",
          label: "CI-RIF",
          field: "ci_rif",
          align: "left",
        },
        {
          name: "direccion",
          label: "Dirección Entrega",
          field: "direccion",
          align: "left",
        },
        {
          name: "estado",
          label: "Estado Entrega",
          field: "estado",
          align: "left",
        },
        {
          name: "ciudad",
          label: "Ciudad Entrega",
          field: "ciudad",
          align: "left",
        },
        {
          name: "bultos",
          label: "Bultos",
          field: "bultos",
          align: "right",
        },
        {
          name: "telefono",
          label: "Teléfono",
          field: "telefono",
          align: "left",
        },
        {
          name: "monto",
          label: "Monto Factura",
          field: "monto",
          align: "right",
          format: (val) =>
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              currencyDisplay: "code",
            })
              .format(val)
              .replace("EUR", "")
              .trim(),
        },
        {
          name: "peso",
          label: "Peso Kgs",
          field: "peso",
          align: "right",
          format: (val) =>
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              currencyDisplay: "code",
            })
              .format(val)
              .replace("EUR", "")
              .trim(),
        },
        {
          name: "carga_neta",
          label: "Carga Neta",
          field: "carga_neta",
          align: "right",
          format: (val) =>
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              currencyDisplay: "code",
            })
              .format(val)
              .replace("EUR", "")
              .trim(),
        },
        {
          name: "porc_zona",
          label: "% Por Zona",
          field: "porc_zona",
          align: "right",
          format: (val) =>
            new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              currencyDisplay: "code",
            })
              .format(val)
              .replace("EUR", "")
              .trim(),
        },
        {
          name: "nro_guia",
          label: "Nro. Guia",
          field: "nro_guia",
          align: "left",
        },
        {
          name: "last_nro_factura",
          label: "Nro. Factura",
          field: "nro_factura",
          align: "left",
        },
        {
          name: "action",
          label: "Acciones",
          align: "center",
        },
      ],
      columnsPrint: [
        {
          name: "nro_documento",
          label: "Nro. Documento",
          field: "nro_documento",
          align: "center",
        },
        {
          name: "dimensiones",
          label: "Facturas Asociadas",
          field: "dimensiones",
          align: "center",
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
      },
      datos: [],
      loadingPage: false,
      confirmUpload: false,
      file: null,
      agencias: [],
      rpermisos: [],
      menus: [],
      clientes: [],
      agentes: [],
      agenciasSelected: [],
      estadoSelected: [],
      ciudadSelected: [],
      agentesSelected: [],
      clientesSelected: [],
      selected: [],
      selectedAgencia: [],
      selectedEstado: [],
      selectedCiudad: [],
      selectedCliente: [],
      selectedAgente: [],
      estados: [],
      ciudades: [],
      content: null,
      clientesLoading: false,
      agentesLoading: false,
      guias_print: [],
      printType: "",
      selectedGuiasPrint: [],
      confirmPrint: false,
    };
  },
  setup() {
    const $q = useQuasar();
    return {
      anulate: ref(false),
      fileSelector: false,
      separator: ref("vertical"),
      dialog: ref(false),
      loading: ref(false),
      deletePopup: ref(false),
      confirmUploadPopUp: ref(false),
      guiasPrintDialog: ref(false),
      pdfView: ref(false),
      confirmPopUp: ref(false),
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
        menu: "cargamanualguias",
      },
    });
    this.$refs.methods.getData("/estados", "setData", "estados", {
      headers: {
        pais: 1,
      },
    });
    this.$refs.methods.getData("/agencias", "setDataInit", "agencias");
  },
  methods: {
    // Metodo para Filtrar Selects
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

    // METODOS DE PAGINA

    // Metodo para Leer Archivos Subidos
    async readFile() {
      this.datos = [];
      this.loadingPage = true;
      const reader = new FileReader();
      reader.onerror = (err) => console.log(err);
      reader.readAsText(this.file, "ISO-8859-1");
      reader.onload = async (res) => {
        try {
          var errorMessage;
          this.content = res.target.result
            .replace(/((\n|\r))"/g, "")
            .replace(/"/g, "");
          var lines = this.content.split("\n");
          for (var i = 0; i < lines.length - 1; i++) {
            var form = {};
            var estadoId = null;
            var columns = lines[i].split("\t");
            form.id = i;
            form.colorCiudad = "black";
            form.colorEstado = "black";
            form.colorGuia = "blue";
            form.nro_factura = columns[0];
            form.fecha_factura = columns[1];
            form.nb_cliente = columns[2];
            form.ci_rif = columns[3];
            form.direccion = columns[4];
            form.ciudad = columns[5];
            form.estado = columns[6];
            form.bultos = this.curReplace(columns[7]);
            form.telefono = columns[8];
            form.monto = this.curReplace(columns[9]);
            if (!columns[10]) {
              errorMessage = "Error al leer el Peso";
              return stopFuction;
            }
            form.peso = this.curReplace(columns[10]);
            form.colorZona = "red";
            if (!columns[11]) {
              errorMessage = "Error al leer la Carga Neta";
              return stopFuction;
            }
            form.carga_neta = this.curReplace(columns[11].replace("\r", ""));
            await api
              .get(`/estados`, {
                headers: {
                  Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                  desc: form.estado,
                  pais: 1,
                },
              })
              .then((res) => {
                if (!res.data.data[0]) {
                  form.colorEstado = "red";
                  form.colorCiudad = "red";
                } else {
                  estadoId = res.data.data[0].id;
                }
              })
              .catch(() => {
                form.colorEstado = "red";
                form.colorCiudad = "red";
              });
            if (estadoId) {
              await api
                .get(`/ciudades`, {
                  headers: {
                    Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                    desc: form.ciudad,
                    estado: estadoId,
                  },
                })
                .then((res) => {
                  if (!res.data.data[0]) form.colorCiudad = "red";
                })
                .catch(() => {
                  form.colorCiudad = "red";
                });
              if (form.colorCiudad == "black") {
                await api
                  .get(`/zonas`, {
                    headers: {
                      Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                      desc: form.ciudad,
                    },
                  })
                  .then((res) => {
                    if (!res.data[0]) form.colorCiudad = "blue";
                  })
                  .catch(() => {
                    form.colorCiudad = "blue";
                  });
              }
            }
            this.datos.push(form);
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
      };
    },
    // Metodo para Actualizar Datos de Tabla
    setDataInit(res, dataRes) {
      this[dataRes] = res.data;
      this.clientesLoading = true;
      this.agentesLoading = true;
      this.selectedAgencia = this.agencias[0];
      this.$refs.methods.getData("/clientes", "setData", "clientes", {
        headers: {
          agencia: this.agencias[0].id,
        },
      });
      this.$refs.methods.getData("/agentes", "setData", "agentes", {
        headers: {
          agencia: this.agencias[0].id,
          activo: "S",
        },
      });
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      eval("this." + dataRes + "Loading = false");
      this[dataRes] = res.data ? res.data : res;
    },
    // Metodo para Setear Datos Seleccionados
    async setDataEdit(dataRes) {
      try {
        this.resetForm();
        this.dialog = true;
        this.loadingPage = true;
        var form = dataRes;
        this.form.id = form.id;
        this.form.nro_factura = form.nro_factura;
        this.form.fecha_factura = form.fecha_factura;
        this.form.nb_cliente = form.nb_cliente;
        this.form.ci_rif = form.ci_rif;
        this.form.direccion = form.direccion;
        this.form.estado = form.estado;
        this.form.ciudad = form.ciudad;
        this.form.bultos = form.bultos;
        this.form.telefono = form.telefono;
        this.form.monto = form.monto * 100;
        this.form.peso = form.peso * 100;
        this.form.carga_neta = form.carga_neta * 100;
        await api
          .get(`/estados`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              desc: form.estado,
            },
          })
          .then((res) => {
            if (res.data.data[0]) this.selectedEstado = res.data.data[0];
          })
          .catch((err) => {
            if (err.response) errorMessage = err.response.data.message;
            return stopFuction;
          });
        if (this.selectedEstado.id) {
          await api
            .get(`/ciudades`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                estado: this.selectedEstado.id,
              },
            })
            .then((res) => {
              this.ciudades = res.data.data;
            })
            .catch((err) => {
              if (err.response) {
                errorMessage = err.response.data.message;
              }
              return stopFuction;
            });

          await api
            .get(`/ciudades`, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
                desc: form.ciudad,
              },
            })
            .then((res) => {
              if (res.data.data[0]) this.selectedCiudad = res.data.data[0];
            })
            .catch((err) => {
              if (err.response) errorMessage = err.response.data.message;
              return stopFuction;
            });
        }
        this.dialog = true;
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
    async sendData() {
      this.datos[this.form.id].colorCiudad = "black";
      this.datos[this.form.id].colorEstado = "black";
      this.datos[this.form.id].nro_factura = this.form.nro_factura;
      this.datos[this.form.id].fecha_factura = this.form.fecha_factura;
      this.datos[this.form.id].nb_cliente = this.form.nb_cliente;
      this.datos[this.form.id].ci_rif = this.form.ci_rif;
      this.datos[this.form.id].direccion = this.form.direccion;
      this.datos[this.form.id].estado = this.selectedEstado.desc_estado;
      this.datos[this.form.id].ciudad = this.selectedCiudad.desc_ciudad;
      this.datos[this.form.id].telefono = this.form.telefono;
      this.datos[this.form.id].bultos = this.curReplace(this.form.bultos);
      this.datos[this.form.id].monto = this.curReplace(this.form.monto);
      this.datos[this.form.id].peso = this.curReplace(this.form.peso);
      this.datos[this.form.id].carga_neta = this.curReplace(
        this.form.carga_neta
      );
      await api
        .get(`/zonas`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            desc: this.selectedCiudad.desc_ciudad,
          },
        })
        .then((res) => {
          if (!res.data[0]) this.datos[this.form.id].colorCiudad = "blue";
        })
        .catch(() => {
          this.datos[this.form.id].colorCiudad = "blue";
        });
      this.validatePorcZona(this.datos[this.form.id], this.form.id);
      this.dialog = false;
    },
    // Metodo para Validacion del Porc Zona al Editarlo en la Tabla
    async validatePorcZona(formRes, index) {
      try {
        var errorMessage;
        var monto_basico = null;
        var kgr_minimos = null;
        var monto_kg_adicional = null;

        var kgs_adicionales = 0;
        var monto_kg_ad = 0;
        var monto_comision = 0;
        var monto_base = 0;
        var form = formRes;

        if (form.bultos) form.bultos = this.curReplace(form.bultos);
        if (form.monto) form.monto = this.curReplace(form.monto);
        if (form.peso) form.peso = this.curReplace(form.peso);
        if (form.carga_neta) form.carga_neta = this.curReplace(form.carga_neta);
        if (form.porc_zona) form.porc_zona = this.curReplace(form.porc_zona);

        if (form.peso < 30) {
          // Buscar tarifa kg adicionales – De aquí sacar monto_kg_adicional
          await api
            .get(`/tarifas`, {
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
          await api
            .get(`/tarifas`, {
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

          if (form.peso > kgr_minimos)
            kgs_adicionales =
              this.parseFloatN(form.peso) - this.parseFloatN(kgr_minimos);

          monto_kg_ad =
            this.parseFloatN(kgs_adicionales) *
            this.parseFloatN(monto_kg_adicional);
          monto_comision =
            (this.parseFloatN(form.monto) *
              this.parseFloatN(this.curReplace(form.porc_zona))) /
            100;
          monto_base =
            this.parseFloatN(monto_basico) + this.parseFloatN(monto_kg_ad);

          if (monto_base > monto_comision && kgs_adicionales > 0) {
            this.datos[index].colorZona = "red";
          } else {
            this.datos[index].colorZona =
              this.curReplace(form.porc_zona) > 0 ? "blue" : "red";
          }
        } else {
          this.datos[index].colorZona =
            this.curReplace(form.porc_zona) > 0 ? "blue" : "red";
        }
      } catch (stopFuction) {
        this.datos[index].colorZona = "red";
        if (errorMessage) {
          this.$q.notify({
            message: errorMessage,
            color: "red",
          });
        }
      }
    },
    // Metodo para asignar consecutivos al nro de guia
    async asignarGuia() {
      try {
        var errorMessage;
        if (this.datos[0].nro_guia == null) {
          errorMessage = "Debe ingresar el Primer Número de Guía";
          return stopFuction;
        } else {
          for (var i = 1; i <= this.datos.length - 1; i++) {
            this.datos[i].nro_guia =
              parseInt(this.datos[i - 1].nro_guia, 0) + 1;
            this.validateGuia(this.datos[i].nro_guia, i);
          }
        }
      } catch (stopFuction) {
        if (errorMessage) {
          this.$q.notify({
            message: errorMessage,
            color: "red",
          });
        }
      }
    },
    // Metodo para cargar las Guias al maestro
    async cargarGuias() {
      // Valida la data
      if (this.file == null || this.file.length == 0) {
        this.$refs.txtFile.$el.focus();
        this.errorMessage(
          "Debe cargar un Archivo antes de transferir los Datos"
        );
        return;
      }
      if (this.selectedAgencia.length == 0) {
        this.$refs.agencia.$el.focus();
        this.errorMessage(
          "Debe ingresar la Agencia antes de transferir los Datos"
        );
        return;
      }
      if (this.selectedCliente.length == 0) {
        this.$refs.cliente.$el.focus();
        this.errorMessage(
          "Debe ingresar el Cliente antes de transferir los Datos"
        );
        return;
      }
      if (this.selectedAgente.length == 0) {
        this.$refs.agente.$el.focus();
        this.errorMessage(
          "Debe ingresar el Agente antes de transferir los Datos"
        );
        return;
      }

      this.loadingPage = true;
      // Valida el Detalle
      for (var i = 0; i <= this.datos.length - 1; i++) {
        if (this.datos[i].colorEstado == "red") {
          this.setDataEdit(this.datos[i]);
          this.errorMessage("Debe Seleccionar el Estado correcto");
          this.loadingPage = false;
          return;
        }
        if (this.datos[i].colorCiudad == "red") {
          this.setDataEdit(this.datos[i]);
          this.errorMessage("Debe Seleccionar la Ciudad correcta");
          this.loadingPage = false;
          return;
        }
        if (this.datos[i].colorCiudad == "blue") {
          this.setDataEdit(this.datos[i]);
          this.errorMessage("La ciudad seleccionada no tiene Zonas asignadas");
          this.loadingPage = false;
          return;
        }
        if (this.curReplace(this.datos[i].peso) == 0.0) {
          this.setDataEdit(this.datos[i]);
          this.errorMessage("Debe ingresar el Peso");
          this.loadingPage = false;
          return;
        }
        if (this.curReplace(this.datos[i].carga_neta) == 0.0) {
          this.setDataEdit(this.datos[i]);
          this.errorMessage("Debe ingresar la Carga Neta");
          this.loadingPage = false;
          return;
        }
        await this.validatePorcZona(this.datos[i], i);
        if (this.datos[i].colorZona == "red") {
          eval("this.$refs.porc_zona" + i + ".$el.focus()");
          this.errorMessage("Debe ingresar un % de Comisión válido");
          this.loadingPage = false;
          return;
        }
        if (!this.datos[i].nro_guia) {
          eval("this.$refs.nro_guia" + i + ".$el.focus()");
          this.errorMessage("Debe ingresar el Número de Guía");
          this.loadingPage = false;
          return;
        }
        await this.validateGuia(this.datos[i].nro_guia, i);
        if (this.datos[i].colorGuia == "red") {
          eval("this.$refs.nro_guia" + i + ".$el.focus()");
          this.errorMessage("Debe ingresar un Número de Guía válido");
          this.loadingPage = false;
          return;
        }
      }

      this.confirmUploadPopUp = true;
      await this.until((_) => this.confirmUpload == true);
      if (!this.confirmUpload) {
        this.loadingPage = false;
        return;
      } else {
        this.confirmUpload = false;
      }

      // Guarda el Detalle
      for (var i = 0; i <= this.datos.length - 1; i++) {
        // Buscamos el id de la ciudad
        var ciudadDest;
        await api
          .get(`/ciudades`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              desc: this.datos[i].ciudad,
            },
          })
          .then((res) => {
            ciudadDest = res.data.data[0].id;
          });

        // Buscamos la Zona y la Agencia Destino
        var agenciaDest;
        var zonaDest;
        await api
          .get(`/zonas`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              desc: this.datos[i].ciudad,
            },
          })
          .then((res) => {
            agenciaDest = res.data[0].cod_agencia;
            zonaDest = res.data[0].id;
          });

        // Buscamos el codigo del cliente particular de agencia destino
        var codParticular;
        await api
          .get(`/clientes`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: agenciaDest,
              particular: "S",
              activo: "S",
            },
          })
          .then((res) => {
            codParticular = res.data.data[0].id;
          });

        // Buscamos si existe el cliente Particular
        var idParticular = null;
        await api
          .get(`/cparticulares`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              agencia: agenciaDest,
              cod_cliente: codParticular,
              rif: this.datos[i].ci_rif.toUpperCase(),
              activo: "S",
            },
          })
          .then((res) => {
            if (res.data.data[0]) idParticular = res.data.data[0].id;
          });

        // Si existe Cliente Particular Actualizamos, si no lo creamos
        var formParticulares = {};
        formParticulares.cod_agencia = agenciaDest;
        formParticulares.cod_ciudad = ciudadDest;
        formParticulares.cod_cliente = codParticular;
        formParticulares.rif_ci = this.datos[i].ci_rif.toUpperCase();
        formParticulares.nb_cliente = this.datos[i].nb_cliente;
        formParticulares.direccion = this.datos[i].direccion;
        if (this.datos[i].telefono)
          formParticulares.telefonos = this.datos[i].telefono;
        formParticulares.estatus = "A";
        if (idParticular) {
          await api
            .put(`/cparticulares/${idParticular}`, formParticulares, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .catch((err) => {
              if (err.response) {
                this.errorMessage(
                  "Error del Sistema. Problemas al Actualizar el cliente Particular. Error: " +
                    err.response.data.message
                );
              }
              this.loadingPage = false;
              return;
            });
        } else {
          await api
            .post(`/cparticulares`, formParticulares, {
              headers: {
                Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              },
            })
            .then((res) => {
              idParticular = res.data.id;
            })
            .catch((err) => {
              if (err.response) {
                this.errorMessage(
                  "Error del Sistema. Problemas al crear el cliente Particular. Error: " +
                    err.response.data.message
                );
              }
              this.loadingPage = false;
              return;
            });
        }

        // Creamos la Guia Carga
        var formGuia = {};

        formGuia.nro_documento = this.datos[i].nro_guia;
        formGuia.fecha_emision = moment().format("YYYY-MM-DD");
        formGuia.fecha_envio = moment().format("YYYY-MM-DD");
        formGuia.t_de_documento = "GC";
        formGuia.tipo_carga = "PM";
        formGuia.nro_piezas = this.curReplace(this.datos[i].bultos);
        formGuia.peso_kgs = this.curReplace(this.datos[i].peso);
        formGuia.carga_neta = this.curReplace(this.datos[i].carga_neta);
        formGuia.porc_comision = this.curReplace(this.datos[i].porc_zona);
        formGuia.modalidad_pago = "CR";
        formGuia.pagado_en = "O";
        formGuia.cod_agencia = this.selectedAgencia.id;
        formGuia.cod_cliente_org = this.selectedCliente
          ? this.selectedCliente.id
          : null;
        formGuia.cod_agencia_dest = agenciaDest;
        formGuia.check_transito = 0;
        formGuia.monto_ref_cte_sin_imp = this.curReplace(this.datos[i].monto);
        formGuia.cod_zona_dest = zonaDest;
        formGuia.cod_agente_venta = this.selectedAgente
          ? this.selectedAgente.id
          : null;
        formGuia.cod_cliente_dest = codParticular;
        formGuia.ci_rif_cte_conta_dest = this.datos[i].ci_rif;
        formGuia.id_clte_part_dest = idParticular;
        formGuia.tipo_servicio = "N";
        formGuia.tipo_ubicacion = "U";
        formGuia.tipo_urgencia = "N";
        formGuia.porc_apl_seguro = 0;
        formGuia.estatus_operativo = "PR";
        formGuia.estatus_administra = "E";
        formGuia.saldo = 0;
        formGuia.cod_proveedor = 11;
        formGuia.dimensiones = this.datos[i].nro_factura;
        formGuia.desc_contenido = this.datos[i].nro_factura;
        formGuia.observacion =
          this.datos[i].nro_guia + "  " + this.datos[i].telefono;

        await api
          .post(`/mmovimientos`, formGuia, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            },
          })
          .catch(() => {
            this.errorMessage(
              "Error del Sistema. Problemas al crear la Guía" +
                this.datos[i].nro_guia +
                ". Comuníquese con el proveedor del Sistemas..."
            );
            this.loadingPage = false;
            return;
          });
      }

      this.file = [];
      this.selectedAgencia = [];
      this.resetFilters();
      this.loadingPage = false;

      this.$q.notify({
        message:
          "Las Guías cargas que no presentaron problemas, fueron guardadas exitosamente en la base de datos SCEN...",
        color: "green",
      });
    },
    // Metodo para Validacion del Nro de Guia al Editarlo en la Tabla
    async validateGuia(nroGuia, index) {
      var find = this.datos.find((item) => item.nro_guia == nroGuia);
      if (find.id != index) {
        this.errorMessage(
          "El número de Guia " + nroGuia + " está repetido en la carga"
        );
        this.datos[index].colorGuia = "red";
        return;
      }

      // Validamos que la guia tenga lote
      /*if (nroGuia) {
        await api
          .get(`/cguias`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              desde_fact: nroGuia,
              hasta_fact: nroGuia,
            },
          })
          .then((res) => {
            if (!res.data.data[0]) {
              this.errorMessage("No existe Lote para esta Guía");
              this.datos[index].colorGuia = "red";
              nroGuia = null;
            }
          });
      }*/

      // Validamos que la guia no haya sido utilizada
      if (nroGuia) {
        await api
          .get(`/mmovimientos`, {
            headers: {
              Authorization: `Bearer ${LocalStorage.getItem("token")}`,
              filters: JSON.stringify({
                nro_documento: nroGuia,
              }),
            },
          })
          .then((res) => {
            if (res.data.data[0]) {
              this.errorMessage("Ya fue cargada la Guía Número " + nroGuia);
              this.datos[index].colorGuia = "red";
            } else {
              this.datos[index].colorGuia = "blue";
            }
          });
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
      this.selectedEstado = [];
      this.selectedCiudad = [];
      this.form.bultos = "";
      this.form.telefono = "";
      this.form.monto = "";
      this.form.peso = "";
      this.form.carga_neta = "";
    },
    // Metodo para Resetear Filtros
    resetFilters() {
      this.selectedCliente = [];
      this.selectedAgente = [];
      this.selectedEstado = [];
      this.selectedCiudad = [];
      this.clientes = [];
      this.agentes = [];
      this.form = [];
      this.datos = [];
    },
    // Metodo para imprimir las Guias
    async printGuias() {
      await api
        .get(`/mmovimientos`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            filters: JSON.stringify({
              desde: moment().format("YYYY-MM-DD"),
              hasta: moment().format("YYYY-MM-DD"),
              tipo: "GC",
              cliente_orig: this.selectedCliente.id,
            }),
          },
        })
        .then((res) => {
          if (res.data.data.length == 0) {
            this.$q.notify({
              message:
                "No existen Guías a imprimir para este Cliente del día en curso",
              color: "red",
            });
            return;
          } else {
            this.guias_print = res.data.data;
            this.selectedGuiasPrint = this.guias_print;
            this.guiasPrintDialog = true;
          }
        });
    },
    // Pasar un numero a numero con dos decimales en formato correcto para efectuar operaciones
    parseFloatN(number) {
      number = Math.round(number * 100) / 100;
      return number;
    },
    // Metodo para convertir a Currency los String
    curReplace(amount) {
      return amount.indexOf(",") < 0
        ? amount
        : amount.replaceAll(".", "").replaceAll(",", ".");
    },
    // Metodo para imprimir mensajes de error
    errorMessage(message) {
      this.$q.notify({
        message: message,
        color: "red",
      });
    },
    // Metodo para que una funcion no avance hasta que se cumpla una condicion
    async until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
      };
      return new Promise(poll);
    },
    async printData() {
      if (this.selectedGuiasPrint.length == 0) {
        this.$q.notify({
          message: "Debe seleccionar al menos una Guía a Imprimir!",
          color: "red",
        });
        return;
      }

      if (this.printType == 2) {
        this.confirmPopUp = true;
        await this.until((_) => this.confirmPrint == true);
        if (!this.confirmPrint) {
          return;
        } else {
          this.confirmPrint = false;
        }
      }

      this.pdfView = true;
    },
    // Metodo para imprimir las Guias
    pdfPrint() {
      let selectedGuiasPrintIds = [];
      for (var i = 0; i <= this.selectedGuiasPrint.length - 1; i++) {
        selectedGuiasPrintIds.push(this.selectedGuiasPrint[i].id);
      }
      api
        .get(`/pdfreports/guiasLote`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            tipo: this.printType,
            data: JSON.stringify(selectedGuiasPrintIds),
          },
        })
        .then((res) => {
          this.$refs.webViewer.showpdf(res.data.pdfPath, 1.5);
        });
    },
    // Metodo para que una funcion no avance hasta que se cumpla una condicion
    async until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else setTimeout((_) => poll(resolve), 400);
      };
      return new Promise(poll);
    },
  },
};
</script>

<style>
@media screen and (max-width: 1024px) {
  .cardMarginFile {
    margin-bottom: 20px;
  }
}
</style>
