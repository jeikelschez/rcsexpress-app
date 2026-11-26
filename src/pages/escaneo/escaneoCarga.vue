<template>
  <q-page class="q-pa-sm" style="max-width: 640px; margin: 0 auto">
    <!-- Aviso grande arriba tras cada escaneo; se oculta solo (o al tocarlo) -->
    <transition name="aviso">
      <div
        v-if="aviso"
        :key="aviso.n"
        class="aviso-scan text-white row items-center no-wrap"
        :class="'aviso-' + aviso.tipo"
        @click="ocultarAviso"
      >
        <q-icon :name="aviso.icon" size="44px" class="q-mr-md" />
        <div class="col" style="min-width: 0">
          <div class="text-h6 text-weight-bold" style="line-height: 1.2">
            {{ aviso.titulo }}
          </div>
          <div class="text-body2 ellipsis-2-lines">{{ aviso.detalle }}</div>
        </div>
      </div>
    </transition>

    <!-- ====== Sin carga activa: crear una ====== -->
    <template v-if="!carga">
      <q-card flat bordered>
        <q-card-section class="q-pb-sm">
          <div class="text-subtitle1 text-weight-medium">Nueva carga</div>
        </q-card-section>
        <q-card-section class="q-gutter-sm q-pt-none">
          <q-select
            v-model="selVehiculo"
            :options="unidadesOpt"
            :option-label="(v) => (v ? v.placas : '')"
            option-value="id"
            label="Vehículo"
            outlined
            dense
            use-input
            hide-selected
            fill-input
            clearable
            input-debounce="200"
            @filter="
              (val, update) =>
                filtrar(val, update, 'unidades', 'unidadesOpt', 'unidad_desc')
            "
          >
            <template v-slot:prepend><q-icon name="search" /></template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>{{ scope.opt.unidad_desc }}</q-item-section>
              </q-item>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">Sin resultados</q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-select
            v-model="selChofer"
            :options="agentesOpt"
            :option-label="(v) => (v ? v.persona_responsable : '')"
            option-value="id"
            label="Chofer"
            outlined
            dense
            use-input
            hide-selected
            fill-input
            clearable
            input-debounce="200"
            @filter="
              (val, update) =>
                filtrar(val, update, 'agentes', 'agentesOpt', 'agente_desc')
            "
          >
            <template v-slot:prepend><q-icon name="search" /></template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>{{ scope.opt.agente_desc }}</q-item-section>
              </q-item>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">Sin resultados</q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            color="primary"
            icon="add"
            label="Iniciar carga"
            :loading="cargando"
            :disable="!selVehiculo || !selChofer"
            @click="iniciarCarga"
          />
        </q-card-actions>
      </q-card>

      <!-- Cargas abiertas para re-entrar -->
      <q-card v-if="cargasAbiertas.length" flat bordered class="q-mt-md">
        <q-card-section class="q-pb-none">
          <div class="text-subtitle1 text-weight-medium">Cargas abiertas</div>
          <div class="text-caption text-grey-7">
            Retomá una carga que dejaste a medias.
          </div>
        </q-card-section>
        <q-list separator>
          <q-item
            v-for="cc in cargasAbiertas"
            :key="cc.id"
            clickable
            @click="cargarCarga(cc.id)"
          >
            <q-item-section avatar style="min-width: 34px">
              <q-icon
                :name="origen(cc).icon"
                :color="origen(cc).color"
                size="sm"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-weight-medium">CC-{{ cc.id }}</q-item-label>
              <q-item-label caption>
                {{ cc.vehiculo || "—" }} · {{ cc.chofer || "—" }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge
                :color="cc.estado === 'ABIERTA' ? 'blue' : 'orange'"
                :label="cc.estado"
              />
              <div class="text-caption text-grey-6 q-mt-xs">
                {{ (cc.bultos && cc.bultos.length) || 0 }} bultos
              </div>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                round
                dense
                icon="delete_outline"
                color="negative"
                :disable="!esMia(cc)"
                @click.stop="confirmarEliminarLista(cc)"
              >
                <q-tooltip>
                  {{
                    esMia(cc)
                      ? "Eliminar carga"
                      : "Solo quien la creó puede eliminarla"
                  }}
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </template>

    <!-- ====== Carga activa ====== -->
    <template v-else>
      <q-card flat bordered class="q-mb-sm">
        <q-card-section class="row items-center no-wrap q-pb-xs">
          <q-btn
            flat
            round
            dense
            icon="arrow_back"
            class="q-mr-sm"
            @click="volver"
          >
            <q-tooltip>Volver</q-tooltip>
          </q-btn>
          <div class="col" style="min-width: 0">
            <div class="text-h6">CC-{{ carga.id }}</div>
            <div class="text-caption text-grey-7 ellipsis">
              {{ carga.vehiculo || "—" }} · {{ carga.chofer || "—" }}
              <q-tooltip>
                {{ carga.vehiculo || "—" }} · {{ carga.chofer || "—" }}
              </q-tooltip>
            </div>
          </div>
          <q-badge
            :color="estadoColor"
            :label="carga.estado"
            class="q-pa-sm q-ml-sm"
          />
          <q-btn flat round dense icon="more_vert" class="q-ml-xs">
            <q-menu anchor="bottom right" self="top right">
              <q-list style="min-width: 200px">
                <q-item clickable v-close-popup @click="agregarEsperada">
                  <q-item-section avatar>
                    <q-icon name="playlist_add" color="primary" />
                  </q-item-section>
                  <q-item-section>Agregar guía esperada</q-item-section>
                </q-item>
                <q-separator />
                <q-item
                  :clickable="esMia(carga)"
                  :disable="!esMia(carga)"
                  v-close-popup
                  @click="confirmarDescartar"
                >
                  <q-item-section avatar>
                    <q-icon name="delete_outline" color="negative" />
                  </q-item-section>
                  <q-item-section class="text-negative">
                    Descartar carga
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-card-section>
        <q-separator />
        <q-card-section class="row text-center q-py-sm">
          <div class="col">
            <div class="text-h6 text-positive">{{ totalEscaneados }}</div>
            <div class="text-caption text-grey-7">Escaneados</div>
          </div>
          <div class="col">
            <div
              class="text-h6"
              :class="faltantes > 0 ? 'text-warning' : 'text-grey-5'"
            >
              {{ faltantes }}
            </div>
            <div class="text-caption text-grey-7">Faltantes</div>
          </div>
          <div class="col">
            <div class="text-h6">{{ totalBultos }}</div>
            <div class="text-caption text-grey-7">Bultos</div>
          </div>
          <div class="col">
            <div class="text-h6 text-primary">{{ totalDestinos }}</div>
            <div class="text-caption text-grey-7">Destinos</div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Lector -->
      <q-card flat bordered class="q-mb-sm">
        <q-card-section class="q-pt-sm">
          <!-- El borde se pinta del color del último resultado mientras dura el aviso -->
          <div class="reader-marco" :class="aviso ? 'marco-' + aviso.tipo : ''">
            <div class="reader-ventana">
              <div
                id="reader"
                style="width: 100%; border-radius: 6px; overflow: hidden"
              ></div>
            </div>
            <!-- Zoom y linterna: solo si el teléfono los soporta (Android
                 casi siempre; en iPhone normalmente no aparecen) -->
            <div v-if="scanning && (zoomMax > 1 || torchOk)" class="camara-ctrl">
              <q-btn
                v-if="zoomMax > 1"
                round
                unelevated
                color="black"
                text-color="white"
                class="camara-btn"
                :label="zoom > 1 ? '1×' : '2×'"
                @click="toggleZoom"
              />
              <q-btn
                v-if="torchOk"
                round
                unelevated
                :color="torch ? 'yellow-7' : 'black'"
                :text-color="torch ? 'black' : 'white'"
                class="camara-btn q-ml-sm"
                :icon="torch ? 'flashlight_off' : 'flashlight_on'"
                @click="toggleTorch"
              />
            </div>
          </div>
          <q-banner
            v-if="camaraError"
            dense
            class="bg-orange-1 text-orange-9 q-mt-sm"
          >
            <template v-slot:avatar>
              <q-icon name="warning" color="orange" />
            </template>
            {{ camaraError }}
            <template v-slot:action>
              <q-btn
                flat
                dense
                color="orange-9"
                icon="refresh"
                label="Reintentar"
                @click="startCamera"
              />
            </template>
          </q-banner>

          <!-- Resultado del último escaneo -->
          <transition name="fugaz">
            <q-banner
              v-if="ultimo"
              dense
              class="q-mt-sm text-white"
              :class="ultimoClass"
            >
              <template v-slot:avatar>
                <q-icon :name="ultimoIcon" color="white" />
              </template>
              <div class="text-weight-bold">{{ ultimo.titulo }}</div>
              <div class="text-caption">{{ ultimo.detalle }}</div>
            </q-banner>
          </transition>
        </q-card-section>

        <!-- Entrada manual (respaldo, oculta por defecto) -->
        <q-card-section class="q-pt-none">
          <div v-if="!manualVisible" class="text-center">
            <q-btn
              flat
              dense
              no-caps
              color="grey-7"
              icon="keyboard"
              label="Ingresar código manualmente"
              @click="manualVisible = true"
            />
          </div>
          <template v-else>
            <q-input
              v-model="manualCodigo"
              label="Guía (ej. 440515731) o guía-bulto"
              inputmode="decimal"
              outlined
              dense
              autofocus
              @keyup.enter="registrarManual"
            >
              <template v-slot:append>
                <!-- Ayuda: hover en PC, toque en el teléfono -->
                <q-icon
                  name="help_outline"
                  size="20px"
                  color="grey-6"
                  class="cursor-pointer"
                  @click="ayudaManual = !ayudaManual"
                >
                  <q-tooltip
                    v-model="ayudaManual"
                    anchor="top end"
                    self="bottom end"
                    max-width="260px"
                    class="text-body2"
                  >
                    Solo el nº de guía marca todos sus bultos.<br />
                    Guía-bulto (ej. 440515731-03 o 440515731.3) marca uno.
                  </q-tooltip>
                </q-icon>
                <q-btn
                  flat
                  dense
                  icon="keyboard_return"
                  @click="registrarManual"
                />
              </template>
            </q-input>
          </template>
        </q-card-section>
      </q-card>

      <!-- Bultos por destino -->
      <q-card flat bordered>
        <q-card-section class="q-pb-xs">
          <div class="text-subtitle1 text-weight-medium">Bultos escaneados</div>
        </q-card-section>
        <q-card-section v-if="bultos.length === 0" class="text-grey-6 text-center">
          Todavía no escaneaste bultos.
        </q-card-section>
        <template v-else>
          <q-list>
            <template v-for="(guias, dest) in grupos" :key="dest">
              <q-item-label header class="text-weight-bold text-primary">
                {{ dest }} · {{ contarEsc(guias) }}
              </q-item-label>
              <!-- Una fila por guía: su check marca/desmarca todo el lote -->
              <q-expansion-item
                v-for="gu in guias"
                :key="gu.nro"
                dense
                dense-toggle
                expand-separator
              >
                <template v-slot:header>
                  <q-item-section avatar @click.stop>
                    <q-checkbox
                      :model-value="checkGuia(gu)"
                      :toggle-indeterminate="false"
                      color="positive"
                      @update:model-value="toggleGuia(gu)"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label class="text-mono">Guía {{ gu.nro }}</q-item-label>
                    <q-item-label caption>
                      {{ gu.esc }} de {{ gu.total }} bulto(s)
                    </q-item-label>
                  </q-item-section>
                </template>
              <q-item
                v-for="b in gu.bultos"
                :key="b.id"
                dense
                clickable
                class="q-pl-lg"
                @click="verDetalle(b)"
              >
                <q-item-section avatar @click.stop>
                  <q-checkbox
                    :model-value="!!b.escaneado"
                    color="positive"
                    @update:model-value="toggleBulto(b)"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-mono">{{ b.codigo }}</q-item-label>
                  <q-item-label caption>{{ b.fecha_hora }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="info_outline" color="grey-6" />
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    flat
                    round
                    dense
                    icon="delete_outline"
                    color="negative"
                    :disable="!esMia(carga)"
                    @click.stop="confirmarEliminarBulto(b)"
                  >
                    <q-tooltip>
                      {{
                        esMia(carga)
                          ? "Eliminar bulto"
                          : "Solo quien creó la carga puede quitar bultos"
                      }}
                    </q-tooltip>
                  </q-btn>
                </q-item-section>
              </q-item>
              </q-expansion-item>
            </template>
          </q-list>
        </template>
      </q-card>

      <!-- Espacio para que el FAB no tape el último bulto -->
      <div style="height: 76px"></div>

      <!-- Acción final flotante: cerrar carga -->
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
          fab
          :color="cierreColor"
          :icon="cierreIcon"
          :loading="cargando"
          :disable="totalEscaneados === 0"
          @click="confirmarCierre"
        >
          <q-tooltip>
            {{
              cierreCompleta
                ? "Cerrar carga (completa)"
                : "Cerrar carga (faltan " + faltantes + " bulto(s))"
            }}
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </template>
  </q-page>
</template>

<script>
import { LocalStorage } from "quasar";
import { api } from "boot/axios";

export default {
  name: "escaneoCarga",
  data() {
    return {
      token: "",
      codAgencia: null,
      usuario: "",
      carga: null,
      bultos: [],
      cargasAbiertas: [],
      unidades: [],
      unidadesOpt: [],
      agentes: [],
      agentesOpt: [],
      selVehiculo: null,
      selChofer: null,
      cargando: false,
      scanning: false,
      scanner: null,
      camaraError: "",
      manualCodigo: "",
      manualVisible: false,
      ultimo: null,
      ultimoStatus: "",
      piezas: {},
      ayudaManual: false,
      lastDecoded: { codigo: "", ts: 0 },
      aviso: null,
      zoom: 1,
      zoomMax: 1,
      torch: false,
      torchOk: false,
    };
  },
  computed: {
    // Destino -> guías -> bultos. El total de una guía es su set esperado
    // (vía oficina) o sus piezas (vía almacén, donde solo están los escaneados)
    grupos() {
      const conSet = this.carga && (this.carga.via === "OFICINA" || this.carga.cod_costo);
      const g = {};
      const porGuia = {};
      for (const b of this.bultos) {
        const d = b.destino || "SIN DESTINO";
        const k = d + "|" + b.nro_documento;
        if (!g[d]) g[d] = [];
        if (!porGuia[k]) {
          porGuia[k] = {
            nro: String(b.nro_documento),
            movId: b.cod_movimiento,
            bultos: [],
            esc: 0,
            total: 0,
          };
          g[d].push(porGuia[k]);
        }
        porGuia[k].bultos.push(b);
        if (b.escaneado) porGuia[k].esc += 1;
      }
      Object.values(porGuia).forEach((gu) => {
        gu.bultos.sort((a, b) => (a.nro_bulto || 0) - (b.nro_bulto || 0));
        const p = this.piezas[gu.movId];
        gu.total = conSet ? gu.bultos.length : Math.max(p || 0, gu.bultos.length);
      });
      return g;
    },
    totalBultos() {
      return this.bultos.length;
    },
    totalEscaneados() {
      return this.bultos.filter((b) => b.escaneado).length;
    },
    totalDestinos() {
      return Object.keys(this.grupos).length;
    },
    // Bultos pendientes por escanear (set esperado de oficina sin marcar).
    faltantes() {
      return this.totalBultos - this.totalEscaneados;
    },
    // La carga está completa cuando todos los bultos están escaneados.
    cierreCompleta() {
      return this.totalBultos > 0 && this.faltantes === 0;
    },
    // Color del botón de cierre: gris si no se escaneó nada (deshabilitado),
    // verde si está completa, naranja si faltan.
    cierreColor() {
      if (this.totalEscaneados === 0) return "grey-5";
      return this.cierreCompleta ? "positive" : "warning";
    },
    cierreIcon() {
      return this.cierreCompleta ? "done_all" : "report_problem";
    },
    estadoColor() {
      if (!this.carga) return "grey";
      if (this.carga.estado === "ABIERTA") return "blue";
      if (this.carga.estado === "EN PROCESO") return "orange";
      if (this.carga.estado === "CERRADA CON FALTANTES") return "red";
      return "green";
    },
    ultimoClass() {
      if (this.ultimoStatus === "OK") return "bg-positive";
      if (this.ultimoStatus === "RECHAZADO") return "bg-warning";
      if (this.ultimoStatus === "SOBRANTE") return "bg-negative";
      if (this.ultimoStatus === "DUPLICADO") return "bg-blue-7";
      return "bg-negative";
    },
    ultimoIcon() {
      if (this.ultimoStatus === "OK") return "check_circle";
      if (this.ultimoStatus === "RECHAZADO") return "error";
      if (this.ultimoStatus === "SOBRANTE") return "report_problem";
      if (this.ultimoStatus === "DUPLICADO") return "info";
      if (this.ultimoStatus === "EN_OTRA_CARGA") return "block";
      return "cancel";
    },
  },
  mounted() {
    this.token = LocalStorage.getItem("token");
    try {
      const tt = LocalStorage.getItem("tokenTraducido");
      if (tt && tt.usuario) {
        this.codAgencia = tt.usuario.cod_agencia;
        this.usuario = tt.usuario.nombre;
      }
    } catch (e) {}
    // Al recargar dentro de una carga se parte de la lista; la carga se
    // reabre abajo desde ccActual y vuelve a agregar su paso al historial
    if (this.$route.query.cc) this.$router.replace({ path: "/escaneo" });
    this.cargarListas();
    this.cargarAbiertas();
    // Reanudar una carga abierta si quedó registrada en este dispositivo
    const actual = LocalStorage.getItem("ccActual");
    if (actual) this.cargarCarga(actual);
  },
  watch: {
    // El resultado OK (verde) es fugaz; los errores quedan hasta el próximo
    // escaneo para que el almacenista alcance a leerlos
    ultimo(v) {
      clearTimeout(this._ultimoTimer);
      if (v && this.ultimoStatus === "OK") {
        this._ultimoTimer = setTimeout(() => {
          this.ultimo = null;
        }, 3000);
      }
    },
    // "Atrás" del teléfono dentro de una carga vuelve a la lista de cargas
    "$route.query.cc"(cc) {
      if (!cc && this.carga) this.cerrarVistaCarga();
    },
  },
  beforeUnmount() {
    clearTimeout(this._avisoTimer);
    clearTimeout(this._ultimoTimer);
    this.detenerDetectorNativo();
    this.stopCamera();
  },
  methods: {
    headers() {
      return { headers: { Authorization: `Bearer ${this.token}` } };
    },
    // Solo el operador que creó la carga puede eliminarla
    esMia(cc) {
      return !!(cc && cc.usuario && this.usuario && cc.usuario === this.usuario);
    },
    // Distintivo de origen de la carga: Oficina (top-down) / Mía / Otro
    origen(cc) {
      if (cc && cc.via === "OFICINA") {
        return { color: "indigo", icon: "business", tooltip: "Carga de oficina" };
      }
      if (this.esMia(cc)) {
        return { color: "teal", icon: "person", tooltip: "Carga tuya" };
      }
      return {
        color: "grey-6",
        icon: "group",
        tooltip:
          cc && cc.usuario ? "Carga de " + cc.usuario : "Carga de otro operador",
      };
    },
    async cargarListas() {
      try {
        const u = await api.get("/unidades", this.headers());
        this.unidades = Array.isArray(u.data) ? u.data : u.data.data || [];
        this.unidadesOpt = this.unidades;
      } catch (e) {}
      try {
        const a = await api.get("/agentes", {
          headers: {
            Authorization: `Bearer ${this.token}`,
            agencia: 1,
            activo: "S",
            order_by: "persona_responsable",
            order_direction: "ASC",
          },
        });
        this.agentes = a.data && a.data.data ? a.data.data : a.data || [];
        this.agentesOpt = this.agentes;
      } catch (e) {}
    },
    filtrar(val, update, src, dst, field) {
      if (val === "") {
        update(() => {
          this[dst] = this[src];
        });
        return;
      }
      update(() => {
        const needle = val.toUpperCase();
        this[dst] = this[src].filter(
          (o) => (o[field] || "").toUpperCase().indexOf(needle) > -1
        );
      });
    },
    async iniciarCarga() {
      this.cargando = true;
      try {
        const res = await api.post(
          "/controlcarga",
          {
            cod_agencia: this.codAgencia,
            cod_unidad: this.selVehiculo ? this.selVehiculo.id : null,
            cod_agente: this.selChofer ? this.selChofer.id : null,
            via: "ALMACEN",
          },
          this.headers()
        );
        this.carga = res.data;
        this.bultos = [];
        LocalStorage.set("ccActual", this.carga.id);
        this.marcarHistorial();
        this.autoEscaneo();
      } catch (e) {
        this.notificarError(e);
      } finally {
        this.cargando = false;
      }
    },
    async cargarCarga(id) {
      try {
        const res = await api.get(`/controlcarga/${id}`, this.headers());
        this.carga = res.data;
        this.bultos = res.data.bultos || [];
        this.piezas = res.data.piezas || {};
        LocalStorage.set("ccActual", this.carga.id);
        this.marcarHistorial();
        this.autoEscaneo();
      } catch (e) {
        // Si no existe (p.ej. se borró), limpiar referencia
        LocalStorage.remove("ccActual");
      }
    },
    // Inicia la cámara automáticamente al entrar a una carga
    autoEscaneo() {
      if (this.scanning) return;
      this.$nextTick(() => {
        this.startCamera();
      });
    },
    async cargarAbiertas() {
      try {
        const res = await api.get("/controlcarga", {
          headers: {
            Authorization: `Bearer ${this.token}`,
            agencia: this.codAgencia,
          },
        });
        const arr = Array.isArray(res.data) ? res.data : [];
        this.cargasAbiertas = arr.filter(
          (c) => c.estado === "ABIERTA" || c.estado === "EN PROCESO"
        );
      } catch (e) {
        this.cargasAbiertas = [];
      }
    },
    confirmarEliminarLista(cc) {
      const n = (cc.bultos && cc.bultos.length) || 0;
      const msg =
        n > 0
          ? `Se eliminará la carga CC-${cc.id} y sus ${n} bulto(s). Esta acción no se puede deshacer.`
          : `¿Eliminar la carga CC-${cc.id}?`;
      this.$q
        .dialog({
          title: "Eliminar carga",
          message: msg,
          cancel: true,
          persistent: true,
          ok: { label: "Eliminar", color: "negative" },
        })
        .onOk(() => this.eliminarCargaLista(cc));
    },
    async eliminarCargaLista(cc) {
      try {
        await api.delete(`/controlcarga/${cc.id}`, this.headers());
        if (LocalStorage.getItem("ccActual") == cc.id) {
          LocalStorage.remove("ccActual");
        }
        this.$q.notify({ color: "grey-8", message: `Carga CC-${cc.id} eliminada` });
        this.cargarAbiertas();
      } catch (e) {
        this.notificarError(e);
      }
    },
    // Cada carga abierta es un paso en el historial (?cc=N) para que el
    // botón "atrás" del teléfono vuelva a la lista en vez de salir
    marcarHistorial() {
      if (String(this.$route.query.cc || "") !== String(this.carga.id)) {
        this.$router.push({ path: "/escaneo", query: { cc: String(this.carga.id) } });
      }
    },
    volver() {
      // Con paso en el historial, volver = "atrás"; el watch cierra la vista
      if (this.$route.query.cc) this.$router.back();
      else this.cerrarVistaCarga();
    },
    async cerrarVistaCarga() {
      // Detener y limpiar la cámara ANTES de desmontar #reader; si no se espera,
      // html5-qrcode deja nodos (video/canvas) dentro del div y Vue falla al
      // desmontarlo (Cannot read properties of null 'parentNode').
      await this.stopCamera();
      this.carga = null;
      this.bultos = [];
      this.ultimo = null;
      LocalStorage.remove("ccActual");
      this.cargarAbiertas();
    },
    toggleCamara() {
      if (this.scanning) this.stopCamera();
      else this.startCamera();
    },
    async startCamera() {
      this.camaraError = "";
      if (!window.Html5Qrcode) {
        this.camaraError = "Librería de escaneo no cargada.";
        return;
      }
      try {
        // La librería solo abre la cámara y lee el QR de RCS; el Code128 de
        // Hidroca lo lee iniciarDetectorNativo a resolución completa.
        const F = window.Html5QrcodeSupportedFormats;
        this.scanner = new window.Html5Qrcode("reader", {
          formatsToSupport: [F.QR_CODE],
          experimentalFeatures: { useBarCodeDetectorIfSupported: true },
          verbose: false,
        });
        // Resolución alta: el Code128 de Hidroca tiene ~290 barras en 4-5 cm
        // y a menos resolución no se distinguen
        await this.scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            videoConstraints: {
              facingMode: "environment",
              width: { ideal: 1920 },
              height: { ideal: 1080 },
              advanced: [{ focusMode: "continuous" }],
            },
          },
          (decodedText) => this.onScan(decodedText),
          () => {}
        );
        this.scanning = true;
        this.leerCapacidades();
        this.iniciarDetectorNativo();
      } catch (e) {
        this.scanner = null;
        this.camaraError =
          "No se pudo abrir la cámara. En el teléfono requiere HTTPS; usá la entrada manual por ahora.";
      }
    },
    // La librería reduce cada cuadro al tamaño en pantalla (~400px) antes de
    // leerlo, y así el Code128 de Hidroca (~280 barras) no entra. Por eso se
    // lee además directo del video, a resolución completa: con el lector
    // nativo donde existe (Chrome en Android) y si no encuentra nada, con
    // ZXing en WebAssembly (sirve también en iPhone).
    async iniciarDetectorNativo() {
      this.detenerDetectorNativo();
      // Si la cámara se apaga y prende mientras carga, solo sigue el último ciclo
      const gen = this._detectorGen;
      const detector = await this.crearDetectorNativo();
      const zxing = await this.cargarZxing();
      if (!detector && !zxing) return;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      const leer = async () => {
        if (!this.scanning || gen !== this._detectorGen) return;
        const video = document.querySelector("#reader video");
        if (video && video.readyState >= 2 && video.videoWidth) {
          let texto = null;
          if (detector) {
            try {
              const codes = await detector.detect(video);
              if (codes.length) texto = codes[0].rawValue;
            } catch (e) {}
          }
          if (!texto && zxing) {
            try {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              ctx.drawImage(video, 0, 0);
              const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const res = await zxing(img, {
                formats: ["Code128", "QRCode"],
                tryHarder: true,
                maxNumberOfSymbols: 1,
              });
              if (res.length && res[0].isValid) texto = res[0].text;
            } catch (e) {}
          }
          if (texto && this.scanning) this.onScan(texto);
        }
        this._detectorTimer = setTimeout(leer, 100);
      };
      leer();
    },
    async crearDetectorNativo() {
      if (!("BarcodeDetector" in window)) return null;
      try {
        const soportados = await window.BarcodeDetector.getSupportedFormats();
        const formats = ["qr_code", "code_128"].filter((f) =>
          soportados.includes(f)
        );
        return formats.length ? new window.BarcodeDetector({ formats }) : null;
      } catch (e) {
        return null;
      }
    },
    // El .wasm se sirve desde public/js (copiado de node_modules/zxing-wasm,
    // misma versión exacta del package.json) para no depender de un CDN
    async cargarZxing() {
      try {
        const { prepareZXingModule, readBarcodes } = await import(
          "zxing-wasm/reader"
        );
        await prepareZXingModule({
          overrides: {
            locateFile: (path, prefix) =>
              path.endsWith(".wasm")
                ? new URL("js/zxing_reader.wasm", document.baseURI).href
                : prefix + path,
          },
          fireImmediately: true,
        });
        return readBarcodes;
      } catch (e) {
        return null;
      }
    },
    detenerDetectorNativo() {
      clearTimeout(this._detectorTimer);
      this._detectorTimer = null;
      this._detectorGen = (this._detectorGen || 0) + 1;
    },
    async stopCamera() {
      this.detenerDetectorNativo();
      if (this.scanner) {
        try {
          await this.scanner.stop();
          await this.scanner.clear();
        } catch (e) {}
        this.scanner = null;
      }
      this.scanning = false;
      this.zoom = 1;
      this.zoomMax = 1;
      this.torch = false;
      this.torchOk = false;
    },
    // Qué permite la cámara de este teléfono (zoom / linterna)
    leerCapacidades() {
      try {
        const caps = this.scanner.getRunningTrackCapabilities() || {};
        this.zoomMax = caps.zoom && caps.zoom.max ? caps.zoom.max : 1;
        this.torchOk = !!caps.torch;
      } catch (e) {}
    },
    // 2× acerca la imagen sin acercar el teléfono (el enfoque de cerca falla)
    async toggleZoom() {
      const z = this.zoom > 1 ? 1 : Math.min(2, this.zoomMax);
      try {
        await this.scanner.applyVideoConstraints({ advanced: [{ zoom: z }] });
        this.zoom = z;
      } catch (e) {}
    },
    async toggleTorch() {
      try {
        await this.scanner.applyVideoConstraints({
          advanced: [{ torch: !this.torch }],
        });
        this.torch = !this.torch;
      } catch (e) {}
    },
    onScan(decodedText) {
      const now = Date.now();
      // Anti-rebote: ignorar el mismo código leído en menos de 2.5s
      if (
        decodedText === this.lastDecoded.codigo &&
        now - this.lastDecoded.ts < 2500
      ) {
        return;
      }
      this.lastDecoded = { codigo: decodedText, ts: now };
      this.registrarCodigo(decodedText);
    },
    contarEsc(guias) {
      const esc = guias.reduce((s, g) => s + g.esc, 0);
      const tot = guias.reduce((s, g) => s + g.total, 0);
      return esc === tot ? String(tot) : `${esc}/${tot}`;
    },
    // Check de la guía: lleno (todos), vacío (ninguno), parcial (null)
    checkGuia(gu) {
      if (gu.esc === 0) return false;
      return gu.esc >= gu.total ? true : null;
    },
    toggleGuia(gu) {
      const marcar = gu.esc < gu.total;
      const bultos = gu.bultos.slice();
      if (marcar) {
        // Faltan bultos: el check cambia ya y el API marca los que faltan
        // (mismas validaciones del escaneo); si algo se rechaza, se resincroniza
        bultos.forEach((b) => (b.escaneado = true));
        this.encolar(async () => {
          const d = await this.registrarGuiaCompleta(gu.nro, true);
          if (!d || d.rechazados.length) await this.recargarBultos();
        });
        return;
      }
      this.$q
        .dialog({
          title: `Guía ${gu.nro}`,
          message: `¿Desmarcar los ${gu.esc} bulto(s) de esta guía?`,
          cancel: true,
          persistent: true,
          ok: { label: "Desmarcar", color: "warning" },
        })
        .onOk(() => {
          bultos.forEach((b) => this.aplicarDesmarcado(b));
          this.encolar(async () => {
            try {
              await api.put(
                `/controlcarga/${this.carga.id}/guia-desmarcar`,
                { nroGuia: gu.nro },
                this.headers()
              );
            } catch (e) {
              await this.recargarBultos();
              throw e;
            }
          });
        });
    },
    toggleBulto(b) {
      if (!b.escaneado) {
        b.escaneado = true;
        this.encolar(async () => {
          const st = await this.registrarCodigo(b.codigo, true);
          if (st !== "OK" && st !== "DUPLICADO") b.escaneado = false;
        });
        return;
      }
      const copia = { ...b };
      this.aplicarDesmarcado(b);
      this.encolar(async () => {
        try {
          await api.put(
            `/controlcarga/${this.carga.id}/bulto/${b.id}/desmarcar`,
            {},
            this.headers()
          );
        } catch (e) {
          // Revertir: volver a ponerlo como estaba
          const idx = this.bultos.findIndex((x) => x.id === copia.id);
          if (idx >= 0) this.bultos.splice(idx, 1, copia);
          else this.bultos.push(copia);
          this.ajustarEstado();
          throw e;
        }
      });
    },
    // Desmarcado local inmediato: vía oficina vuelve a pendiente; vía
    // almacén el bulto sale de la lista (solo existe si se escaneó)
    aplicarDesmarcado(b) {
      const conSet = this.carga.via === "OFICINA" || this.carga.cod_costo;
      if (conSet) {
        b.escaneado = false;
        b.fecha_hora = null;
      } else {
        this.bultos = this.bultos.filter((x) => x.id !== b.id);
      }
      this.ajustarEstado();
    },
    ajustarEstado() {
      const hay = this.bultos.some((x) => x.escaneado);
      if (!hay && this.carga.estado === "EN PROCESO") this.carga.estado = "ABIERTA";
      if (hay && this.carga.estado === "ABIERTA") this.carga.estado = "EN PROCESO";
    },
    // Las peticiones de los checks van en fila (una tras otra) para que
    // varios toques seguidos no choquen en el servidor; la pantalla no espera
    encolar(fn) {
      this._cola = (this._cola || Promise.resolve())
        .then(fn)
        .catch((e) => this.notificarError(e));
      return this._cola;
    },
    // Refresca bultos y estado sin reiniciar la cámara
    async recargarBultos() {
      const res = await api.get(`/controlcarga/${this.carga.id}`, this.headers());
      this.carga = res.data;
      this.bultos = res.data.bultos || [];
      this.piezas = res.data.piezas || {};
    },
    registrarManual() {
      // El "RCS-" es opcional; "440515731 3", "440515731.3" o "440515731,3"
      // valen como "440515731-3" (el teclado numérico del teléfono no trae guion)
      const c = (this.manualCodigo || "")
        .trim()
        .toUpperCase()
        .replace(/^RCS-?/, "")
        .replace(/[\s.,]+/g, "-");
      if (!c) return;
      this.manualCodigo = "";
      // Solo el número de guía: ofrecer marcar todos sus bultos.
      // (Las etiquetas de Hidroca son de 46 dígitos y van por el flujo normal)
      if (/^\d{1,12}$/.test(c)) this.confirmarGuiaCompleta(c);
      else this.registrarCodigo(c);
    },
    async confirmarGuiaCompleta(nro) {
      if (!this.carga) return;
      let g;
      try {
        const res = await api.get(
          `/controlcarga/resolver/${encodeURIComponent(nro)}`,
          this.headers()
        );
        g = res.data.guia;
      } catch (e) {
        this.notificarError(e);
        return;
      }
      if (!g) {
        this.ultimoStatus = "RECHAZADO";
        this.ultimo = {
          titulo: "No registrado",
          detalle: `La guía ${nro} no existe en el sistema`,
        };
        this.senal("error", "cancel", this.ultimo);
        return;
      }
      const tot = g.total_piezas || 0;
      if (!tot) {
        this.$q.notify({
          color: "negative",
          message: `La guía ${nro} no tiene número de piezas cargado`,
        });
        return;
      }
      const ya = this.bultos.filter(
        (x) => x.escaneado && String(x.nro_documento) === String(nro)
      ).length;
      if (ya >= tot) {
        this.ultimoStatus = "DUPLICADO";
        this.ultimo = {
          titulo: "Ya escaneada",
          detalle: `Los ${tot} bulto(s) de la guía ${nro} ya están verificados`,
        };
        this.senal("dup", "replay", this.ultimo);
        return;
      }
      const fila = (k, v) =>
        `<div style="margin:2px 0"><b>${k}:</b> ${v || "—"}</div>`;
      const message =
        fila("Destino", g.destino) +
        fila("Destinatario", g.destinatario) +
        fila("Bultos", tot + (ya ? ` (${ya} ya verificado(s))` : "")) +
        `<div class="q-mt-sm">¿Marcar ${ya ? "los que faltan" : "los " + tot + " bultos"} como verificados?</div>`;
      this.$q
        .dialog({
          title: `Guía ${nro}`,
          message,
          html: true,
          cancel: true,
          persistent: true,
          ok: { label: `Marcar ${tot - ya}`, color: "positive" },
        })
        .onOk(() => this.registrarGuiaCompleta(nro));
    },
    async registrarGuiaCompleta(nro, deCheck = false) {
      try {
        const res = await api.post(
          `/controlcarga/${this.carga.id}/guia-completa`,
          { nroGuia: nro },
          this.headers()
        );
        const d = res.data;
        if (d.guia && d.guia.total_piezas)
          this.piezas = { ...this.piezas, [d.guia.cod_movimiento]: d.guia.total_piezas };
        d.ok.forEach((b) => {
          const idx = this.bultos.findIndex((x) => x.id === b.id);
          if (idx >= 0) this.bultos.splice(idx, 1, b);
          else this.bultos.push(b);
        });
        const destino = d.guia && d.guia.destino ? " · " + d.guia.destino : "";
        if (d.ok.length && this.carga.estado === "ABIERTA")
          this.carga.estado = "EN PROCESO";
        if (d.rechazados.length === 0) {
          if (deCheck) this.pitidoOk();
          else {
            this.ultimoStatus = "OK";
            this.ultimo = {
              titulo: `OK · ${d.ok.length} bulto(s)${destino}`,
              detalle:
                `Guía ${nro}` +
                (d.duplicados ? ` · ${d.duplicados} ya estaban escaneados` : ""),
            };
            this.senal("ok", "check_circle", this.ultimo);
          }
        } else {
          const r = d.rechazados[0];
          this.ultimoStatus = r.status;
          this.ultimo = {
            titulo: d.ok.length
              ? `${d.ok.length} OK · ${d.rechazados.length} no registrado(s)`
              : "No registrado",
            detalle: r.motivo || `Guía ${nro}`,
          };
          this.senal("error", "report_problem", this.ultimo);
        }
        if (
          this.carga.via === "OFICINA" &&
          d.ok.length &&
          this.cierreCompleta
        )
          this.confirmarCierre();
        return d;
      } catch (e) {
        this.ultimoStatus = "ERROR";
        this.ultimo = { titulo: "No registrado", detalle: this.mensajeError(e) };
        this.senal("error", "wifi_off", this.ultimo);
        return null;
      }
    },
    agregarEsperada() {
      this.$q
        .dialog({
          title: "Agregar guía esperada",
          message: "Número de guía a precargar (se expanden sus bultos):",
          prompt: { model: "", type: "number" },
          cancel: true,
          persistent: true,
        })
        .onOk(async (nroGuia) => {
          const g = (nroGuia || "").toString().trim();
          if (!g) return;
          try {
            const res = await api.post(
              `/controlcarga/${this.carga.id}/esperado`,
              { nroGuia: g },
              this.headers()
            );
            const d = res.data;
            this.$q.notify({
              color: "green",
              message: `Guía ${g}: ${d.creados} bulto(s) esperado(s) agregados`,
            });
            this.cargarCarga(this.carga.id);
          } catch (e) {
            this.notificarError(e);
          }
        });
    },
    async verDetalle(bulto) {
      try {
        const res = await api.get(
          `/controlcarga/resolver/${encodeURIComponent(bulto.codigo)}`,
          this.headers()
        );
        const d = res.data;
        const g = d.guia;
        let msg;
        if (g) {
          const nn = d.nroBulto != null ? String(d.nroBulto) : "—";
          const tot = g.total_piezas ? " / " + g.total_piezas : "";
          const fila = (k, v) =>
            `<div style="margin:2px 0"><b>${k}:</b> ${v || "—"}</div>`;
          msg =
            fila("Guía", g.nro_documento) +
            fila("Bulto", nn + tot) +
            fila("Destino", g.destino) +
            fila("Zona", g.zona) +
            fila("Remitente", g.remitente) +
            fila("Destinatario", g.destinatario);
        } else {
          msg = `No se encontró la guía <b>${d.nroGuia}</b> en el sistema (bulto sobrante).`;
        }
        this.$q.dialog({ title: bulto.codigo, message: msg, html: true });
      } catch (e) {
        this.notificarError(e);
      }
    },
    confirmarEliminarBulto(b) {
      this.$q
        .dialog({
          title: "Eliminar bulto",
          message: `¿Quitar el bulto ${b.codigo} de esta carga?`,
          cancel: true,
          persistent: true,
          ok: { label: "Eliminar", color: "negative" },
        })
        .onOk(() => this.eliminarBulto(b));
    },
    async eliminarBulto(b) {
      try {
        await api.delete(
          `/controlcarga/${this.carga.id}/bulto/${b.id}`,
          this.headers()
        );
        this.bultos = this.bultos.filter((x) => x.id !== b.id);
        if (this.bultos.length === 0 && this.carga.estado === "EN PROCESO") {
          this.carga.estado = "ABIERTA";
        }
        this.$q.notify({ color: "grey-8", message: "Bulto eliminado" });
      } catch (e) {
        this.notificarError(e);
      }
    },
    // Pitido + vibración de OK sin aviso (lo usan los checks)
    pitidoOk() {
      this.beep("ok");
      this.vibrar("ok");
    },
    // deCheck: viene de tocar un check (OK solo pita, sin aviso)
    async registrarCodigo(codigo, deCheck = false) {
      if (!this.carga) return;
      try {
        const res = await api.post(
          `/controlcarga/${this.carga.id}/bulto`,
          { codigo },
          this.headers()
        );
        const data = res.data;
        this.ultimoStatus = data.status;
        if (data.status === "DUPLICADO") {
          if (deCheck) {
            this.pitidoOk();
            return data.status;
          }
          this.ultimo = {
            titulo: "Ya escaneado",
            detalle: data.bulto.codigo,
          };
          this.senal("dup", "replay", this.ultimo);
        } else if (data.status === "RECHAZADO") {
          // No se registra: guía inexistente o bulto fuera de rango
          this.ultimo = {
            titulo: "No registrado",
            detalle: data.motivo || "Código no válido",
          };
          this.senal("error", "cancel", this.ultimo);
        } else if (data.status === "EN_OTRA_CARGA") {
          // El bulto ya está escaneado en otra carga: no se permite doble carga
          this.ultimo = {
            titulo: "En otra carga",
            detalle: data.motivo || "El bulto ya está cargado en otra CC",
          };
          this.senal("error", "block", this.ultimo);
        } else if (data.status === "SOBRANTE") {
          // Vía oficina: el bulto no pertenece al set esperado de esta carga
          this.ultimo = {
            titulo: "Sobrante",
            detalle: data.motivo || "No pertenece a esta carga",
          };
          this.senal("error", "report_problem", this.ultimo);
        } else {
          // OK: si ya existía (esperado), lo actualizo; si no, lo agrego
          const idx = this.bultos.findIndex((x) => x.id === data.bulto.id);
          if (idx >= 0) this.bultos.splice(idx, 1, data.bulto);
          else this.bultos.push(data.bulto);
          const g = data.guia;
          if (g && g.total_piezas)
            this.piezas = { ...this.piezas, [g.cod_movimiento]: g.total_piezas };
          this.ultimo = {
            titulo: "OK · " + (g ? g.destino || "" : ""),
            detalle:
              data.bulto.codigo +
              (g && g.destinatario ? " · " + g.destinatario : ""),
          };
          // Aviso: cuántos bultos de esta guía van, para saber si falta alguno
          const nro = data.bulto.nro_documento;
          const van = this.bultos.filter(
            (x) => x.escaneado && x.nro_documento === nro
          ).length;
          const tot = g && g.total_piezas ? " de " + g.total_piezas : "";
          // Desde un check basta el pitido: el check marcado ya es el aviso
          if (deCheck) this.pitidoOk();
          else
            this.senal("ok", "check_circle", {
              titulo: `Bulto ${van}${tot}` + (g && g.destino ? " · " + g.destino : ""),
              detalle: "Guía " + nro,
            });
          if (this.carga.estado === "ABIERTA")
            this.carga.estado = "EN PROCESO";
          // Vía oficina: al escanear el último bulto esperado se sugiere cerrar
          // (no se cierra solo: el operador confirma que el camión ya sale)
          if (this.carga.via === "OFICINA" && idx >= 0 && this.cierreCompleta)
            this.confirmarCierre();
        }
        return data.status;
      } catch (e) {
        // En pleno escaneo el error va al aviso grande: si no, el almacenista
        // cree que el bulto quedó registrado
        this.ultimoStatus = "ERROR";
        this.ultimo = { titulo: "No registrado", detalle: this.mensajeError(e) };
        this.senal("error", "wifi_off", this.ultimo);
        return "ERROR";
      }
    },
    // Respuesta de cada escaneo: pitido + vibración + aviso grande arriba
    senal(tipo, icon, { titulo, detalle }) {
      this.beep(tipo);
      this.vibrar(tipo);
      clearTimeout(this._avisoTimer);
      this.aviso = { tipo, icon, titulo, detalle, n: Date.now() };
      const ms = { ok: 1500, dup: 2000, error: 3500 }[tipo];
      this._avisoTimer = setTimeout(this.ocultarAviso, ms);
    },
    ocultarAviso() {
      clearTimeout(this._avisoTimer);
      this.aviso = null;
    },
    // ok: un toque corto · dup: dos toques · error: uno largo.
    // En iPhone el navegador no permite vibrar: queda solo sonido y aviso.
    vibrar(tipo) {
      try {
        if (!navigator.vibrate) return;
        const p = { ok: [80], dup: [80, 90, 80], error: [450] }[tipo];
        navigator.vibrate(p);
      } catch (e) {}
    },
    confirmarCierre() {
      // El estado se detecta solo: si quedan bultos sin escanear, se cierra
      // CON FALTANTES; si están todos, COMPLETA.
      const estado = this.cierreCompleta
        ? "CERRADA COMPLETA"
        : "CERRADA CON FALTANTES";
      const message = this.cierreCompleta
        ? `Los ${this.totalBultos} bulto(s) están escaneados. Se cerrará como <b>COMPLETA</b>.`
        : `Faltan <b>${this.faltantes}</b> de ${this.totalBultos} bulto(s) por escanear. Se cerrará como <b>CON FALTANTES</b>.`;
      this.$q
        .dialog({
          title: "Cerrar carga",
          message,
          html: true,
          cancel: true,
          persistent: true,
          ok: {
            label: "Cerrar",
            color: this.cierreCompleta ? "positive" : "warning",
          },
        })
        .onOk(() => this.cerrarCarga(estado));
    },
    async cerrarCarga(estado) {
      this.cargando = true;
      try {
        await this.stopCamera();
        await api.put(
          `/controlcarga/${this.carga.id}/cerrar`,
          { estado },
          this.headers()
        );
        this.$q.notify({ color: "green", message: "Carga cerrada" });
        LocalStorage.remove("ccActual");
        this.resetCarga();
      } catch (e) {
        this.notificarError(e);
      } finally {
        this.cargando = false;
      }
    },
    confirmarDescartar() {
      const msg =
        this.totalBultos > 0
          ? `Se eliminará la carga CC-${this.carga.id} y sus ${this.totalBultos} bulto(s) escaneado(s). Esta acción no se puede deshacer.`
          : "Esta carga no tiene bultos. ¿Querés eliminarla?";
      this.$q
        .dialog({
          title: "Descartar carga",
          message: msg,
          cancel: true,
          persistent: true,
          ok: { label: "Eliminar", color: "negative" },
        })
        .onOk(() => this.descartarCarga());
    },
    async descartarCarga() {
      this.cargando = true;
      try {
        await this.stopCamera();
        await api.delete(`/controlcarga/${this.carga.id}`, this.headers());
        this.$q.notify({ color: "grey-8", message: "Carga descartada" });
        this.resetCarga();
      } catch (e) {
        this.notificarError(e);
      } finally {
        this.cargando = false;
      }
    },
    resetCarga() {
      LocalStorage.remove("ccActual");
      // Quitar el paso de la carga del historial (el watch ya no hace nada)
      if (this.$route.query.cc) this.$router.back();
      this.carga = null;
      this.bultos = [];
      this.ultimo = null;
      this.selVehiculo = null;
      this.selChofer = null;
      this.cargarAbiertas();
    },
    // Señal auditiva según el resultado del escaneo:
    //  - "ok"    : un pitido agudo y corto (bulto aceptado)
    //  - "dup"   : doble pitido medio (ya estaba escaneado)
    //  - "error" : un zumbido grave y largo (no existe / no pertenece)
    beep(tipo) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        // Un único AudioContext reutilizable (crear uno por escaneo agota el
        // límite del navegador).
        if (!this._audioCtx) this._audioCtx = new AC();
        const ctx = this._audioCtx;
        if (ctx.state === "suspended") ctx.resume();

        let seq;
        if (tipo === "ok") {
          seq = [{ f: 1046, d: 0.12, w: "sine" }];
        } else if (tipo === "dup") {
          seq = [
            { f: 620, d: 0.09, w: "sine" },
            { f: 620, d: 0.09, w: "sine", delay: 0.14 },
          ];
        } else {
          // error / no existe / sobrante
          seq = [{ f: 196, d: 0.45, w: "square" }];
        }

        seq.forEach((t) => {
          const start = ctx.currentTime + (t.delay || 0);
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = t.w || "sine";
          o.frequency.value = t.f;
          // Rampas suaves para evitar chasquidos.
          g.gain.setValueAtTime(0.0001, start);
          // Volumen alto: en el almacén hay ruido
          g.gain.exponentialRampToValueAtTime(t.w === "square" ? 0.5 : 0.8, start + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, start + t.d);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(start);
          o.stop(start + t.d + 0.02);
        });
      } catch (e) {}
    },
    mensajeError(e) {
      return e && e.response && e.response.data && e.response.data.message
        ? e.response.data.message
        : "Error de conexión";
    },
    notificarError(e) {
      this.$q.notify({ color: "red", position: "top", message: this.mensajeError(e) });
    },
  },
};
</script>

<style scoped>
.fugaz-enter-active,
.fugaz-leave-active {
  transition: opacity 0.4s ease;
}
.fugaz-enter-from,
.fugaz-leave-to {
  opacity: 0;
}
.aviso-scan {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 6000;
  padding: 14px 18px;
  padding-top: calc(14px + env(safe-area-inset-top));
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}
.aviso-ok {
  background: #21ba45;
}
.aviso-dup {
  background: #1976d2;
}
.aviso-error {
  background: #c10015;
}
.aviso-enter-active,
.aviso-leave-active {
  transition: transform 0.18s ease, opacity 0.18s ease;
}
.aviso-enter-from,
.aviso-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
/* En el teléfono vertical la cámara entrega imagen vertical y empujaba el
   resto de la pantalla: se muestra por una ventana de 40% del alto,
   centrada. No se toca el tamaño del video, porque la librería calcula
   lo que lee a partir de él. */
.reader-ventana {
  max-height: 40vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 6px;
}
.reader-ventana > #reader {
  flex: 0 0 auto;
}
.camara-ctrl {
  position: absolute;
  right: 10px;
  bottom: 10px;
  z-index: 2;
}
.camara-btn {
  opacity: 0.8;
}
.reader-marco {
  position: relative;
  border: 5px solid transparent;
  border-radius: 10px;
  transition: border-color 0.15s;
}
.marco-ok {
  border-color: #21ba45;
}
.marco-dup {
  border-color: #1976d2;
}
.marco-error {
  border-color: #c10015;
}
.text-mono {
  font-family: ui-monospace, Consolas, monospace;
  font-size: 0.82rem;
}
</style>
