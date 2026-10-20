<template>
  <q-page class="q-pa-sm" style="max-width: 640px; margin: 0 auto">
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
          <div
            id="reader"
            style="width: 100%; border-radius: 8px; overflow: hidden"
          ></div>
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
            <div class="text-caption text-grey-7 q-mb-xs">
              Entrada manual (si la cámara no está disponible)
            </div>
            <q-input
              v-model="manualCodigo"
              label="Código (ej. RCS-440515731-03)"
              outlined
              dense
              autofocus
              @keyup.enter="registrarManual"
            >
              <template v-slot:append>
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
            <template v-for="(items, dest) in grupos" :key="dest">
              <q-item-label header class="text-weight-bold text-primary">
                {{ dest }} · {{ items.length }}
              </q-item-label>
              <q-item
                v-for="b in items"
                :key="b.id"
                dense
                clickable
                @click="verDetalle(b)"
              >
                <q-item-section avatar>
                  <q-icon
                    :name="b.escaneado ? 'check_circle' : 'radio_button_unchecked'"
                    :color="b.escaneado ? 'positive' : 'grey-5'"
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
      lastDecoded: { codigo: "", ts: 0 },
    };
  },
  computed: {
    grupos() {
      const g = {};
      for (const b of this.bultos) {
        const d = b.destino || "SIN DESTINO";
        if (!g[d]) g[d] = [];
        g[d].push(b);
      }
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
    this.cargarListas();
    this.cargarAbiertas();
    // Reanudar una carga abierta si quedó registrada en este dispositivo
    const actual = LocalStorage.getItem("ccActual");
    if (actual) this.cargarCarga(actual);
  },
  beforeUnmount() {
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
        const vehiculo = this.selVehiculo ? this.selVehiculo.placas : null;
        const chofer = this.selChofer
          ? this.selChofer.persona_responsable
          : null;
        const res = await api.post(
          "/controlcarga",
          {
            cod_agencia: this.codAgencia,
            vehiculo,
            chofer,
            via: "ALMACEN",
          },
          this.headers()
        );
        this.carga = res.data;
        this.bultos = [];
        LocalStorage.set("ccActual", this.carga.id);
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
        LocalStorage.set("ccActual", this.carga.id);
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
    async volver() {
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
        this.scanner = new window.Html5Qrcode("reader");
        await this.scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 240, height: 240 } },
          (decodedText) => this.onScan(decodedText),
          () => {}
        );
        this.scanning = true;
      } catch (e) {
        this.scanner = null;
        this.camaraError =
          "No se pudo abrir la cámara. En el teléfono requiere HTTPS; usá la entrada manual por ahora.";
      }
    },
    async stopCamera() {
      if (this.scanner) {
        try {
          await this.scanner.stop();
          await this.scanner.clear();
        } catch (e) {}
        this.scanner = null;
      }
      this.scanning = false;
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
    registrarManual() {
      const c = (this.manualCodigo || "").trim();
      if (!c) return;
      this.registrarCodigo(c);
      this.manualCodigo = "";
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
    async registrarCodigo(codigo) {
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
          this.ultimo = {
            titulo: "Ya escaneado",
            detalle: data.bulto.codigo,
          };
          this.beep("dup");
        } else if (data.status === "RECHAZADO") {
          // No se registra: guía inexistente o bulto fuera de rango
          this.ultimo = {
            titulo: "No registrado",
            detalle: data.motivo || "Código no válido",
          };
          this.beep("error");
        } else if (data.status === "EN_OTRA_CARGA") {
          // El bulto ya está escaneado en otra carga: no se permite doble carga
          this.ultimo = {
            titulo: "En otra carga",
            detalle: data.motivo || "El bulto ya está cargado en otra CC",
          };
          this.beep("error");
        } else if (data.status === "SOBRANTE") {
          // Vía oficina: el bulto no pertenece al set esperado de esta carga
          this.ultimo = {
            titulo: "Sobrante",
            detalle: data.motivo || "No pertenece a esta carga",
          };
          this.beep("error");
        } else {
          // OK: si ya existía (esperado), lo actualizo; si no, lo agrego
          const idx = this.bultos.findIndex((x) => x.id === data.bulto.id);
          if (idx >= 0) this.bultos.splice(idx, 1, data.bulto);
          else this.bultos.push(data.bulto);
          const g = data.guia;
          this.ultimo = {
            titulo: "OK · " + (g ? g.destino || "" : ""),
            detalle:
              data.bulto.codigo +
              (g && g.destinatario ? " · " + g.destinatario : ""),
          };
          this.beep("ok");
          if (this.carga.estado === "ABIERTA")
            this.carga.estado = "EN PROCESO";
        }
      } catch (e) {
        this.notificarError(e);
      }
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
          g.gain.exponentialRampToValueAtTime(0.25, start + 0.01);
          g.gain.exponentialRampToValueAtTime(0.0001, start + t.d);
          o.connect(g);
          g.connect(ctx.destination);
          o.start(start);
          o.stop(start + t.d + 0.02);
        });
      } catch (e) {}
    },
    notificarError(e) {
      const msg =
        e && e.response && e.response.data && e.response.data.message
          ? e.response.data.message
          : "Error de conexión";
      this.$q.notify({ color: "red", message: msg });
    },
  },
};
</script>

<style scoped>
.text-mono {
  font-family: ui-monospace, Consolas, monospace;
  font-size: 0.82rem;
}
</style>
