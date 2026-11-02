<template>
  <q-page class="pagina q-pa-md">
    <div class="q-pa-sm justify-center">
      <div
        class="row justify-end q-pa-md col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12"
      >
        <div
          class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12 movilTitle"
          style="align-self: center; text-align: center"
        >
          <p style="font-size: 20px" class="text-secondary">
            <strong>OPERACIONES - CONTROL DE CARGA</strong>
          </p>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            outlined
            standout
            :options="agenciasDestinoSelected"
            @filter="
              (val, update) =>
                filterArray(
                  val,
                  update,
                  'agenciasDestinoSelected',
                  'agencias',
                  'nb_agencia'
                )
            "
            use-input
            fill-input
            multiple
            use-chips
            emit-value
            map-options
            input-debounce="0"
            option-label="nb_agencia"
            option-value="id"
            v-model="selectedAgenciaDestino"
            label="Agencia Destino"
            @update:model-value="getDataTable()"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> Sin resultados </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            outlined
            standout
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
            label="Agencia Origen"
            clearable
            @update:model-value="getDataTable()"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey"> Sin resultados </q-item-section>
              </q-item>
            </template>
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-select>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            mask="##/##/####"
            @keyup.enter="getDataTable()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateDesde"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_desde"
                    mask="DD/MM/YYYY"
                    @update:model-value="
                      this.$refs.qDateDesde.hide();
                      getDataTable();
                    "
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
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
            mask="##/##/####"
            @keyup.enter="getDataTable()"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  ref="qDateHasta"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date
                    v-model="fecha_hasta"
                    mask="DD/MM/YYYY"
                    @update:model-value="
                      this.$refs.qDateHasta.hide();
                      getDataTable();
                    "
                  ></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div
          class="col-md-2 col-xl-2 col-lg-2 col-xs-12 col-sm-12 cardMargin selectMobile2"
          style="align-self: center; text-align: center"
        >
          <q-select
            rounded
            dense
            outlined
            standout
            :options="opcionesEstado"
            emit-value
            map-options
            v-model="selectedEstado"
            label="Estado"
            @update:model-value="getDataTable()"
          />
        </div>
        <div
          class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 cardMargin"
          style="align-self: center; text-align: center"
        >
          <q-checkbox
            dense
            v-model="verCerradas"
            label="Ver cerradas"
            @update:model-value="cambiarVerCerradas()"
          >
            <q-tooltip class="bg-primary"
              >Incluye los controles cerrados que ya tienen costo</q-tooltip
            >
          </q-checkbox>
        </div>
        <div
          class="col-md-1 col-xl-1 col-lg-1 col-xs-12 col-sm-12 cardMargin"
          style="align-self: center; text-align: center"
        >
          <q-btn
            dense
            round
            color="primary"
            padding="sm"
            style="margin-right: 10px"
            @click="resetFilters()"
          >
            <q-icon size="25px" name="filter_alt_off" color="white" />
            <q-tooltip class="bg-primary">Limpiar Filtros</q-tooltip>
          </q-btn>
          <q-btn
            dense
            round
            color="primary"
            padding="sm"
            @click="getDataTable()"
          >
            <q-icon size="25px" name="refresh" color="white" />
            <q-tooltip class="bg-primary">Actualizar</q-tooltip>
          </q-btn>
        </div>
      </div>

      <div class="q-pa-md col-md-12 col-xs-12 justify-center cardMargin">
        <q-table
          :rows="filas"
          :columns="columns"
          :loading="loading"
          dense
          class="tabla-control"
          row-key="id"
          separator="vertical"
          :rows-per-page-options="[20, 50, 0]"
          no-data-label="No hay controles de carga para estos filtros"
          style="width: 100%"
          @row-click="(evt, row) => verDetalle(row.id)"
        >
          <template v-slot:loading>
            <q-inner-loading showing color="primary" class="loading" />
          </template>
          <template v-slot:body-cell-estado="props">
            <q-td :props="props">
              <q-badge :color="colorEstado(estadoVisible(props.row))">
                {{ estadoVisible(props.row) }}
              </q-badge>
            </q-td>
          </template>
          <template v-slot:body-cell-faltantes="props">
            <q-td :props="props">
              <span
                :class="props.row.faltantes ? 'text-negative text-bold' : ''"
                >{{ props.row.faltantes }}</span
              >
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <!-- Detalle del control de carga -->
    <q-dialog v-model="detalleVisible">
      <q-card style="width: 1000px; max-width: 95vw">
        <q-card-section v-if="carga" class="row items-center q-pb-none">
          <div class="text-h6">CC-{{ carga.id }}</div>
          <q-badge
            class="q-ml-md"
            :color="colorEstado(estadoVisible(carga))"
            :label="estadoVisible(carga)"
          />
          <q-badge
            class="q-ml-sm"
            outline
            color="primary"
            :label="carga.via == 'OFICINA' ? 'Oficina' : 'Almacén'"
          />
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section v-if="carga">
          <div class="row q-col-gutter-md">
            <div class="col-md-3 col-xs-6">
              <div class="text-caption text-grey">Fecha</div>
              {{ carga.fecha }}
            </div>
            <div class="col-md-3 col-xs-6">
              <div class="text-caption text-grey">Chofer</div>
              {{ carga.chofer || "—" }}
            </div>
            <div class="col-md-3 col-xs-6">
              <div class="text-caption text-grey">Vehículo</div>
              {{ carga.vehiculo || "—" }}
            </div>
            <div class="col-md-3 col-xs-6">
              <div class="text-caption text-grey">Creado por</div>
              {{ carga.usuario || "—" }}            </div>
          </div>
          <div class="row q-gutter-sm q-mt-sm">
            <q-chip dense icon="description">{{ resumen.guias }} guía(s)</q-chip>
            <q-chip dense icon="inventory_2"
              >{{ resumen.escaneados }} / {{ resumen.bultos }} bulto(s)
              escaneados</q-chip
            >
            <q-chip
              dense
              icon="report_problem"
              :color="resumen.faltantes ? 'red-2' : ''"
              >{{ resumen.faltantes }} faltante(s)</q-chip
            >
            <q-chip dense icon="place"
              >{{ gruposDetalle.length }} destino(s)</q-chip
            >
          </div>
        </q-card-section>
        <q-card-section
          v-if="carga"
          class="q-pt-none"
          style="max-height: 55vh; overflow: auto"
        >
          <div v-if="!gruposDetalle.length" class="text-grey q-pa-md">
            Este control aún no tiene bultos.
          </div>
          <div v-for="g in gruposDetalle" :key="g.destino" class="q-mb-md">
            <div class="text-subtitle1 text-bold text-primary">
              {{ g.destino }}
              <span class="text-caption text-grey q-ml-sm"
                >{{ g.guias.length }} guía(s) · {{ g.escaneados }}/{{
                  g.bultos
                }}
                bultos</span
              >
            </div>
            <q-markup-table dense flat bordered separator="cell">
              <thead>
                <tr>
                  <th class="text-left">Guía</th>
                  <th class="text-right">Bultos</th>
                  <th class="text-left">Faltantes</th>
                  <th class="text-left">Último escaneo</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="gu in g.guias" :key="gu.nro_documento">
                  <td>{{ gu.nro_documento }}</td>
                  <td class="text-right">
                    <span
                      :class="
                        gu.escaneados == gu.total
                          ? 'text-positive text-bold'
                          : 'text-negative text-bold'
                      "
                      >{{ gu.escaneados }} / {{ gu.total }}</span
                    >
                  </td>
                  <td>
                    <span v-if="gu.faltantes.length" class="text-negative">
                      Bulto(s) {{ rangos(gu.faltantes) }}
                    </span>
                    <span v-else class="text-grey">—</span>
                  </td>
                  <td class="text-caption">
                    {{ gu.ultimo || "—" }}
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </div>
        </q-card-section>
        <!-- Piloto: el costo nace primero, así que aquí solo se consulta.
             Cerrar, eliminar y quitar guías vuelven cuando el costo nazca
             del control. -->
        <q-card-actions v-if="carga" align="right">
          <q-btn
            flat
            color="primary"
            icon="file_download"
            label="Exportar Excel"
            @click="exportExcel()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <methods
      ref="methods"
      @set-Data="setData"
      @set-Data-Permisos="setDataPermisos"
    ></methods>
  </q-page>
</template>

<script>
import { ref } from "vue";
import moment from "moment";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";
import methodsVue from "src/components/methods.vue";


export default {
  components: {
    methods: methodsVue,
  },
  data() {
    return {
      columns: [
        {
          name: "id",
          label: "# de Control",
          field: "id",
          align: "left",
          sortable: true,
        },
        { name: "fecha", label: "Fecha", field: "fecha", align: "left" },
        { name: "chofer", label: "Chofer", field: "chofer", align: "left" },
        {
          name: "vehiculo",
          label: "Vehículo",
          field: "vehiculo",
          align: "left",
        },
        {
          name: "via",
          label: "Vía",
          field: (row) => (row.via == "OFICINA" ? "Oficina" : "Almacén"),
          align: "left",
        },
        { name: "estado", label: "Estado", field: "estado", align: "left" },
        {
          name: "destinos",
          label: "Destinos",
          field: "siglas_destino",
          align: "left",
        },
        { name: "guias", label: "Guías", field: "guias", align: "right" },
        {
          name: "bultos",
          label: "Bultos escaneados",
          field: (row) => row.escaneados + " / " + row.bultos,
          align: "right",
        },
        {
          name: "faltantes",
          label: "Faltantes",
          field: "faltantes",
          align: "right",
        },
      ],
      estados: [
        { label: "TODOS", value: "" },
        { label: "ABIERTA", value: "ABIERTA" },
        { label: "EN PROCESO", value: "EN PROCESO" },
        { label: "POR COSTEAR", value: "POR COSTEAR" },
      ],
      // Solo se ofrecen con "Ver cerradas"
      estadosCerrados: [
        { label: "CERRADA COMPLETA", value: "CERRADA COMPLETA" },
        { label: "CERRADA CON FALTANTES", value: "CERRADA CON FALTANTES" },
      ],
      verCerradas: false,
      rpermisos: [],
      cargas: [],
      agencias: [],
      agenciasSelected: [],
      agenciasDestinoSelected: [],
      selectedAgencia: null,
      selectedAgenciaDestino: [],
      selectedEstado: "",
      fecha_desde: moment().subtract(7, "days").format("DD/MM/YYYY"),
      fecha_hasta: moment().format("DD/MM/YYYY"),
      carga: null,
    };
  },
  setup() {
    return {
      loading: ref(false),
      detalleVisible: ref(false),
    };
  },
  computed: {
    opcionesEstado() {
      return this.verCerradas
        ? [...this.estados, ...this.estadosCerrados]
        : this.estados;
    },
    filas() {
      return this.cargas.map((c) => {
        const bultos = c.bultos || [];
        const escaneados = bultos.filter((b) => b.escaneado).length;
        return {
          ...c,
          bultos: bultos.length,
          escaneados,
          faltantes: bultos.length - escaneados,
          guias: new Set(bultos.map((b) => b.nro_documento)).size,
        };
      });
    },
    // Bultos agrupados por destino y por guía (el "cuadrito" digital)
    gruposDetalle() {
      if (!this.carga) return [];
      const destinos = {};
      for (const b of this.carga.bultos || []) {
        const d = b.destino || "SIN DESTINO";
        if (!destinos[d]) destinos[d] = {};
        const g = destinos[d];
        if (!g[b.nro_documento]) {
          g[b.nro_documento] = {
            nro_documento: b.nro_documento,
            cod_movimiento: b.cod_movimiento,
            total: 0,
            escaneados: 0,
            faltantes: [],
            ultimo: null,
          };
        }
        const gu = g[b.nro_documento];
        gu.total++;
        if (b.escaneado) {
          gu.escaneados++;
          gu.ultimo = b.fecha_hora + (b.usuario ? " · " + b.usuario : "");
        } else {
          gu.faltantes.push(b.nro_bulto);
        }
      }
      return Object.keys(destinos)
        .sort()
        .map((d) => {
          const guias = Object.values(destinos[d]).sort((a, b) =>
            a.nro_documento.localeCompare(b.nro_documento)
          );
          return {
            destino: d,
            guias,
            bultos: guias.reduce((s, g) => s + g.total, 0),
            escaneados: guias.reduce((s, g) => s + g.escaneados, 0),
          };
        });
    },
    resumen() {
      const b = (this.carga && this.carga.bultos) || [];
      const esc = b.filter((x) => x.escaneado).length;
      return {
        guias: new Set(b.map((x) => x.nro_documento)).size,
        bultos: b.length,
        escaneados: esc,
        faltantes: b.length - esc,
      };
    },
  },
  mounted() {
    this.$emit("changeTitle", "SCEN - Operaciones - Control de Carga", "");
    this.$refs.methods.getData("/agencias", "setData", "agencias", {
      headers: { order_by: "nb_agencia", order_direction: "ASC" },
    });
    this.$refs.methods.getData("/rpermisos", "setDataPermisos", "rpermisos", {
      headers: {
        rol: LocalStorage.getItem("tokenTraducido").usuario.roles.id,
        menu: "controlcarga",
      },
    });
    this.cargarDesdeFechaMinima();
  },
  methods: {
    // Fecha Desde = la del control pendiente (abierto, en proceso o por
    // costear) más antiguo; si no hay pendientes, hoy
    async cargarDesdeFechaMinima() {
      let desde = moment();
      try {
        const res = await api.get("/controlcarga", this.headers());
        for (const c of Array.isArray(res.data) ? res.data : []) {
          const f = moment(c.fecha, "DD/MM/YYYY", true);
          if (f.isValid() && f.isBefore(desde)) desde = f;
        }
      } catch (e) {}
      this.fecha_desde = desde.format("DD/MM/YYYY");
      this.fecha_hasta = moment().format("DD/MM/YYYY");
      this.getDataTable();
    },
    // Agrupa números de bulto en rangos: [1,2,3,5,7,8] -> "1-3, 5, 7-8"
    rangos(nums) {
      const n = [...nums].map(Number).sort((a, b) => a - b);
      const partes = [];
      for (let i = 0; i < n.length; i++) {
        const ini = n[i];
        while (i + 1 < n.length && n[i + 1] === n[i] + 1) i++;
        partes.push(ini === n[i] ? String(ini) : ini + "-" + n[i]);
      }
      return partes.join(", ");
    },
    // Estado que se muestra: una cerrada sin costo está POR COSTEAR
    estadoVisible(c) {
      if (
        c &&
        ["CERRADA COMPLETA", "CERRADA CON FALTANTES"].includes(c.estado) &&
        !c.cod_costo
      )
        return "POR COSTEAR";
      return c ? c.estado : "";
    },
    // Al desmarcar "Ver cerradas", un estado cerrado elegido deja de aplicar
    cambiarVerCerradas() {
      if (
        !this.verCerradas &&
        this.estadosCerrados.some((e) => e.value == this.selectedEstado)
      )
        this.selectedEstado = "";
      this.getDataTable();
    },
    // Metodo para Resetear Filtros
    resetFilters() {
      this.selectedAgenciaDestino = [];
      this.selectedAgencia = null;
      this.selectedEstado = "";
      this.verCerradas = false;
      this.cargarDesdeFechaMinima();
    },
    headers(extra) {
      return {
        headers: {
          Authorization: `Bearer ${LocalStorage.getItem("token")}`,
          ...(extra || {}),
        },
      };
    },
    // Metodo para filtrar opciones de Selects
    filterArray(val, update, pagina, array, element) {
      update(() => {
        if (val === "") {
          this[pagina] = this[array];
          return;
        }
        const needle = val.toUpperCase();
        this[pagina] = this[array].filter(
          (o) => (o[element] || "").toUpperCase().indexOf(needle) > -1
        );
      });
    },
    // Metodo para validar Permisos
    allowOption(option) {
      return (
        this.rpermisos.findIndex((item) => item.acciones.accion == option) < 0
      );
    },
    setDataPermisos(res, dataRes) {
      this[dataRes] = res;
      if (this.rpermisos.findIndex((item) => item.acciones.accion == 1) < 0)
        this.$router.push("/error403");
    },
    setData(res, dataRes) {
      this[dataRes] = res.data ? res.data : res;
      this[dataRes + "Selected"] = this[dataRes];
      if (dataRes == "agencias") this.agenciasDestinoSelected = this.agencias;
    },
    colorEstado(estado) {
      if (estado == "ABIERTA") return "blue";
      if (estado == "EN PROCESO") return "orange";
      if (estado == "POR COSTEAR") return "purple";
      if (estado == "CERRADA CON FALTANTES") return "red";
      return "green";
    },
    mensajeError(e, def) {
      return (
        (e.response && e.response.data && e.response.data.message) || def
      );
    },
    async getDataTable() {
      const desde = moment(this.fecha_desde, "DD/MM/YYYY", true);
      const hasta = moment(this.fecha_hasta, "DD/MM/YYYY", true);
      if (!desde.isValid() || !hasta.isValid()) return;
      this.loading = true;
      try {
        const extra = {
          desde: desde.format("YYYY-MM-DD"),
          hasta: hasta.format("YYYY-MM-DD"),
        };
        if (this.selectedAgencia && this.selectedAgencia.id)
          extra.agencia = this.selectedAgencia.id;
        if (this.selectedAgenciaDestino && this.selectedAgenciaDestino.length)
          extra.destino = this.selectedAgenciaDestino.join(",");
        if (this.selectedEstado) extra.estado = this.selectedEstado;
        if (this.verCerradas) extra.cerradas = "S";
        const res = await api.get("/controlcarga", this.headers(extra));
        this.cargas = Array.isArray(res.data) ? res.data : [];
      } catch (e) {
        this.$q.notify({
          message: this.mensajeError(e, "Error al buscar los controles de carga"),
          color: "red",
        });
      } finally {
        this.loading = false;
      }
    },
    async verDetalle(id) {
      try {
        const res = await api.get(`/controlcarga/${id}`, this.headers());
        this.carga = res.data;
        this.detalleVisible = true;
      } catch (e) {
        this.$q.notify({
          message: this.mensajeError(e, "Error al cargar el control"),
          color: "red",
        });
      }
    },
    async exportExcel() {
      try {
        const res = await api.get(
          `/excelreports/controlCarga`,
          this.headers({ id: this.carga.id })
        );
        if (!res.data.validDoc) {
          this.$q.notify({ message: "No se pudo generar el Excel", color: "red" });
          return;
        }
        const link = document.createElement("a");
        link.href = `${process.env.apiPath}/excelReports/loadExcel/${res.data.excelPath}`;
        link.setAttribute("download", res.data.excelPath);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        this.$q.notify({
          message: this.mensajeError(e, "Error al exportar"),
          color: "red",
        });
      }
    },
  },
};
</script>

<style>
/* Cabecera de la lista de controles más alta que la del q-table dense */
.tabla-control thead tr th {
  height: 44px;
  font-weight: bold;
}
</style>
