<template>
  <q-page class="pagina q-pa-md">
    <q-dialog v-model="zonasDialog">
      <q-card class="q-pa-md" bordered style="width: 999px; max-width: 80vw">
        <q-card-section>
          <q-form @submit="sendData()" class="q-gutter-md">
            <div class="row">
              <div class="col-md-5 col-xs-12">
                <q-input outlined v-model="form.nb_zona" label="Nombre de la Zona" hint="" class="pcform"
                  @update:model-value="
                    form.nb_zona = form.nb_zona.toUpperCase()
                  " lazy-rules :rules="[
                    (val) => this.$refs.rulesVue.isReq(val, 'Requerido'),
                    (val) =>
                      this.$refs.rulesVue.isMax(
                        val,
                        250,
                        'Maximo 250 Caracteres'
                      ),
                    (val) =>
                      this.$refs.rulesVue.isMin(
                        val,
                        3,
                        'Minimo 3 Caracterers'
                      ) || '',
                  ]">
                  <template v-slot:prepend>
                    <q-icon name="drive_file_rename_outline" />
                  </template>
                </q-input>
              </div>

              <div class="col-md-7 col-xs-12">
                <q-select outlined v-model="form.tipo_zona" label="Tipo de Zona" hint="" :rules="[
                  (val) =>
                    this.$refs.rulesVue.isReqSelect(val, 'Requerido') || '',
                ]" :options="tipoDeZona" lazy-rules>
                  <template v-slot:prepend>
                    <q-icon name="domain" />
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

    <div class="row justify-center col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
      <div class="q-pa-md row col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 text-secondary movilTitle"
          style="align-self: center; text-align: center; font-size: 20px">
          <p><strong>MANTENIMIENTO - ZONAS POR AGENCIA</strong></p>
        </div>
        <div class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6 marginHeader marginHeaderMobile"
          style="align-self: center; text-align: center">
          <q-select rounded transition-show="flip-up" transition-hide="flip-down" :options="agenciasSelected" @filter="
            (val, update, abort) =>
              filterArray(
                val,
                update,
                abort,
                'agenciasSelected',
                'agencias',
                'nb_agencia'
              )
          " use-input hide-selected fill-input input-debounce="0" option-label="nb_agencia" option-value="id"
            v-model="selectedAgencia" outlined standout label="Escoge una Agencia"
            @update:model-value="getDataZonas(`/zonas`, 'setData', 'zonas')"><template v-slot:no-option>
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

        <div class="col-md-5 col-xl-5 col-lg-5 col-xs-12 col-sm-6 marginHeaderFilter"
          style="align-self: center; text-align: center">
          <q-input rounded outlined standout v-model="filterRoles" type="search" label="Búsqueda avanzada">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12" style="text-align: center; align-self: center">
          <q-btn label="Insertar" rounded color="primary" :disabled="this.allowOption(2)" @click="zonasDialog = true"
            @click.capture="resetForm()" size="16px" class="q-px-xl q-py-xs insertarestadosmovil"></q-btn>
        </div>
      </div>

      <div class="q-gutter-y-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 q-pa-md">
        <q-table :rows="zonas" binary-state-sort :loading="loading" row-key="id" :columns="columnsZonas"
          :separator="separator" :filter="filterRoles" style="width: 100%" :grid="$q.screen.xs"
          v-model:pagination="pagination">
          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn dense round flat color="primary" icon="edit" :disabled="this.allowOption(3)" @click="
                getData(`/Zonas/${props.row.id}`, 'setDataEdit', 'form');
                zonasDialog = true;
              "></q-btn>
              <q-btn dense round flat color="primary" icon="delete" :disabled="this.allowOption(4)"
                @click="selected = props.row.id" @click.capture="deleteDialog = true"></q-btn>
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
                      " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}</q-chip>
                      <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="edit"
                        :disabled="this.allowOption(3)" @click="
                          getData(
                            `/zonas/${props.row.id}`,
                            'setDataEdit',
                            'form'
                          );
                          zonasDialog = true;
                        "></q-btn>
                      <q-chip v-if="col.name === 'status'" :color="
                        props.row.status == 'Active'
                          ? 'green'
                          : props.row.status == 'Disable'
                          ? 'red'
                          : 'grey'
                      " text-color="white" dense class="text-weight-bolder" square>{{ col.value }}</q-chip>
                      <q-btn v-else-if="col.name === 'action'" dense round flat color="primary" icon="delete"
                        :disabled="this.allowOption(4)" @click="selected = props.row.id"
                        @click.capture="deleteDialog = true"></q-btn>
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

    <q-dialog v-model="deleteDialog">
      <q-card style="width: 700px">
        <q-card-section>
          <div class="text-h5" style="font-size: 18px">
            ¿Estas seguro que quieres eliminar este elemento?
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Aceptar" color="primary" v-close-popup @click="deleteData(selected)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods ref="methods" @get-Data-Zonas="getDataZonas(`/zonas`, 'setData', 'zonas')" @set-Data="setData"
      @reset-Loading="resetLoading" @set-Data-Edit="setDataEdit" @set-Data-Iniciar="setDataIniciar"
      @set-Data-Permisos="setDataPermisos"></methods>

    <rules-vue ref="rulesVue"></rules-vue>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/axios";
import { useQuasar } from "quasar";
import { LocalStorage } from "quasar";
import rulesVue from "src/components/rules.vue";
import methodsVue from "src/components/methods.vue";

export default {
  components: {
    methods: methodsVue,
    rulesVue,
  },
  name: "Zonas",
  data() {
    return {
      columnsZonas: [
        {
          name: "nb_zona",
          label: "Nombre de la Zona",
          field: "nb_zona",
          align: "left",
          sortable: true,
          required: true,
        },
        {
          name: "tipo_desc",
          label: "Tipo de Zona",
          field: "tipo_desc",
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
      form: {
        nb_zona: "",
        tipo_zona: "",
        cod_agencia: [],
      },
      tipoDeZona: [
        { label: "URBANA", value: "U" },
        { label: "EXTRA URBANA", value: "E" },
      ],
      rpermisos: [],
      agencias: [],
      zonas: [],
      selected: [],
      agenciasSelected: [],
      selectedAgencia: [],
      agenciaRef: "",
      error: "",
    };
  },
  setup() {
    const $q = useQuasar();
    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 1,
      control: 0,
      rowsPerPage: 5,
    });
    return {
      pagination: ref({
        rowsPerPage: 5,
      }),
      loading: ref(false),
      separator: ref("vertical"),
      zonasDialog: ref(false),
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
      deleteDialog: ref(false),
      filterRoles: ref(""),
    };
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Mantenimiento - Zonas por Agencia", "");
    this.getData("/agencias", "setDataIniciar", "agencias");

    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem('tokenTraducido').usuario.roles.id,
        menu: "zonasagencia"
      },
    });
  },
  methods: {
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
    // Metodo para validar Permisos
    allowOption(option) {
      return this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0;
    },
    // Metodo para hacer Get de Datos
    getData(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes);
    },
    // Metodo para Get de Zonas
    getDataZonas(url, call, dataRes) {
      this.$refs.methods.getData(url, call, dataRes, {
        headers: {
          agencia: this.selectedAgencia.id,
        },
      });
      this.loading = true;
    },
    // Metodo para Setear los Datos al Iniciar
    setDataIniciar(res, dataRes) {
      this[dataRes] = res.data;
      this.agenciaRef = this.agencias[0].id;
      this.selectedAgencia = this.agencias[0];
      api
        .get(`/zonas`, {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`,
            agencia: this.agenciaRef,
          },
        })
        .then((res) => {
          this.zonas = res.data;
        });
      this.loading = false;
    },
    // Metodo para Setear Datos
    setData(res, dataRes) {
      this[dataRes] = res;
      this.loading = false;
    },
    // Metodo para Setear los datos de Zona Seleccionada
    setDataEdit(res, dataRes) {
      this[dataRes].id = res.id;
      this[dataRes].nb_zona = res.nb_zona;
      this[dataRes].tipo_zona = res.tipo_desc;
      this[dataRes].cod_agencia = this.selectedAgencia;
      this.loading = false;
    },
    // Metodo para Setear Datos Permisos
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },
    // Metodo para Eliminar Zonas
    deleteData(idpost) {
      this.$refs.methods.deleteData(`/zonas/${idpost}`, "getDataZonas");
      this.loading = true;
    },
    // Metodo para Editar o Crear Zonas
    sendData() {
      this.form.cod_agencia = this.selectedAgencia.id;
      this.form.tipo_zona = this.form.tipo_zona.value;
      if (!this.form.id) {
        this.$refs.methods.createData(`/zonas`, this.form, "getDataZonas");
        this.resetForm();
        this.loading = true;
      } else {
        this.$refs.methods.putData(
          `/zonas/${this.form.id}`,
          this.form,
          "getDataZonas"
        );
        this.resetForm();
        this.loading = true;
      }
    },
    // Metodo para Resetear Datos
    resetForm() {
      delete this.form.id;
      this.form.nb_zona = "",
        this.form.tipo_zona = "",
        this.form.cod_agencia = "",
        this.zonasDialog = false;
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

@media screen and (min-width: 600px) {
  .marginHeader {
    padding-right: 20px;
  }
}

@media screen and (min-width: 1024px) {
  .marginHeaderFilter {
    padding-right: 20px;
  }
}

@media screen and (max-width: 600px) {
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
