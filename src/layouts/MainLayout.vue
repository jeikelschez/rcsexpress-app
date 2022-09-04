<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Encabezado de la pagina -->
    <q-header elevated>      
      <q-toolbar class="bg-indigo-9">
        <!-- Boton para expandir Menu -->
        <q-btn flat dense round @click="this.hideItems(); this.drawerClick()" icon="menu" aria-label="Menu" class="q-mr-sm" />
        <!-- Titulo -->
        <q-toolbar-title class="titleMainLayout">SCEN - Sistema de Control de Encomiendas</q-toolbar-title>
        <q-space></q-space>
        <!-- Boton para acceder a manuales -->
        <q-btn dense color="white" round style="margin-right: 10px" clickable to="/m_bancos" padding="xs">
          <q-icon size="20px" name="question_mark" color="primary"> </q-icon>
        </q-btn>
        <!-- Boton usuario y Logout -->
        <q-btn flat dense>
          <q-avatar size="42px">
            <img :src="url" />
          </q-avatar>
          <q-menu transition-show="flip-right" transition-hide="flip-left" auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable v-ripple @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>{{ $t("Menu.logout") }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Menu lateral izquierdo -->
    <q-drawer v-model="drawer" show-if-above :breakpoint="500" bordered :width="350" auto-close
      :mini="!drawer || miniState" @click="miniState = false" content-class="bg-grey-3">
      <q-list>
        <div>
          <q-list class="rounded-borders">
            <!-- Opcion del Dashboard -->
            <!-- MENUS LEVEL 0 -->
            <div v-for="item in items">
              <div v-if="item.level==0">                
                <!-- LEVEL 0 / Q-ITEMS -->
                <q-item v-if=item.qitem clickable tag="a" :to=item.url exact>
                  <q-item-section avatar>
                    <q-icon size="28px" :name=item.icon />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <!-- LEVEL 0 / Q-EXPANSION-ITEMS -->
                <q-expansion-item v-else expand-separator :icon=item.icon group="somegroup" default-opened :label=item.label
                  v-model=item.model>                  
                  <!-- MENUS LEVEL 1 -->
                  <div v-for="item2 in items">
                    <div v-if="item2.level==1 && item.name==item2.padre">                     
                      <!-- LEVEL 1 / Q-ITEMS -->
                      <div v-if=item2.qitem class="q-pl-lg">
                        <q-item clickable tag="a" :to=item2.url exact>
                          <q-item-section avatar>
                            <q-icon size="28px" :name=item2.icon />
                            <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                              transition-show="scale" transition-hide="scale">
                              <div class="tool">{{ item2.label }}</div>
                            </q-tooltip>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ item2.label }}</q-item-label>
                            <q-item-label caption></q-item-label>
                          </q-item-section>
                        </q-item>
                      </div>                      
                      <!-- LEVEL 1 / Q-EXPANSION-ITEMS -->
                      <q-expansion-item v-else :header-inset-level="0.4" :content-inset-level="0.9" expand-separator group="somegroup2"
                        default-opened :icon=item2.icon :label=item2.label v-model=item2.model>                        
                        <!-- LEVEL 2 / Q-ITEMS -->
                        <div v-for="item3 in items">
                          <div v-if="item3.level==2 && item2.name==item3.padre">
                            <q-item clickable tag="a" :to=item3.url exact>
                              <q-item-section avatar>
                                <q-icon size="28px" :name=item3.icon />
                                <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                                  transition-show="scale" transition-hide="scale">
                                  <div class="tool">{{ item3.label }}</div>
                                </q-tooltip>
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>{{ item3.label }}</q-item-label>
                                <q-item-label caption></q-item-label>
                              </q-item-section>
                            </q-item>
                          </div>
                        </div>                        
                      </q-expansion-item>
                    </div>
                  </div>
                </q-expansion-item>
              </div>              
            </div>
            <!-- AQUI TERMINA DINAMICO -->
          </q-list>
        </div>
      </q-list>
    </q-drawer>

    <!-- Detecta cuando el mouse sale del menu y cierra los items -->
    <keep-alive>
      <router-view @mouseover="this.hideItems(); this.miniState = true" />
    </keep-alive>

    <!-- Contenedor de las paginas -->
    <q-page-container style="padding-bottom: 0px; padding-top: 37px">
    </q-page-container>

    <!-- Pie de Pagina -->
    <q-footer elevated bordered>
      <div class="float-left buttons" style="margin-top: 10px; margin-bottom: 10px; margin-left: 15px">
        <q-btn dense color="white" round class="button" style="margin-right: 15px" clickable to="/empleados"
          padding="xs">
          <q-icon size="25px" name="groups" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Empleados</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense class="button1" color="white" round style="margin-right: 15px" clickable to="/retenciones"
          padding="xs">
          <q-icon size="25px" name="block" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Retenciones</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" round class="button2" style="margin-right: 10px" clickable to="/asignacionguias"
          padding="xs">
          <q-icon size="25px" name="auto_stories" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Asignación Guias</q-tooltip>
          </q-icon>
        </q-btn>
        <strong style="margin-right: 10px" class="button3">|</strong>
        <q-btn dense color="white" round style="margin-right: 15px" clickable class="button4" to="/clientes"
          padding="xs">
          <q-icon size="25px" name="face" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Clientes</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" round style="margin-right: 10px" clickable class="button5" to="/proveedores"
          padding="xs">
          <q-icon size="25px" name="support_agent" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Proveedores</q-tooltip>
          </q-icon>
        </q-btn>
        <strong style="margin-right: 10px" class="button6">|</strong>
        <q-btn dense color="white" round style="margin-right: 15px" clickable class="button7" to="/registrodecostos"
          padding="xs">
          <q-icon size="25px" name="local_shipping" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Costos Transporte</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" round style="margin-right: 10px" clickable class="button8" to="/pruebasentrega"
          padding="xs">
          <q-icon size="25px" name="assignment_turned_in" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Pruebas de Entrega</q-tooltip>
          </q-icon>
        </q-btn>
        <strong style="margin-right: 10px" class="button9">|</strong>
        <q-btn dense color="white" class="button10" round style="margin-right: 15px" clickable
          to="/registroserviciocarga" padding="xs">
          <q-icon size="25px" name="menu_book" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Registro Servicio de Carga</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" class="button11" round style="margin-right: 15px" clickable to="/facturacioncredito"
          padding="xs">
          <q-icon size="25px" name="request_quote" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Facturación</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" round class="button12" style="margin-right: 10px" clickable to="/anulacionguias"
          padding="xs">
          <q-icon size="25px" name="close" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Anulación Guias/Facturas</q-tooltip>
          </q-icon>
        </q-btn>
        <strong style="margin-right: 10px" class="button13">|</strong>
        <q-btn dense color="white" class="button14" round style="margin-right: 15px" clickable to="/notasdebito"
          padding="xs">
          <q-icon size="25px" name="send_and_archive" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Emision Notas Debito</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" round style="margin-right: 15px" clickable class="button15" to="/notascredito"
          padding="xs">
          <q-icon size="25px" name="send" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Emision Notas Credito</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" round style="margin-right: 10px" clickable class="button16" to="/notascredito"
          padding="xs">
          <q-icon size="25px" name="close" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Anulación de Notas</q-tooltip>
          </q-icon>
        </q-btn>
        <strong style="margin-right: 10px" class="button17">|</strong>
        <q-btn dense color="white" class="button18" round style="margin-right: 15px" clickable to="/cuentasporcobrar"
          padding="xs">
          <q-icon size="25px" name="price_check" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Generar Cobranza</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" round class="button19" style="margin-right: 15px" clickable to="/cuentasporpagar"
          padding="xs">
          <q-icon size="25px" name="attach_money" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Ingreso de CXP</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" class="button20" round style="margin-right: 10px" clickable
          to="/controlpagosproveedores" padding="xs">
          <q-icon size="25px" name="insert_chart" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Control Pago Proveedores</q-tooltip>
          </q-icon>
        </q-btn>
        <strong style="margin-right: 10px" class="button21">|</strong>
        <q-btn dense color="white" round class="button22" style="margin-right: 15px" clickable to="/generarcomisiones"
          padding="xs">
          <q-icon size="25px" name="receipt_long" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Comisiones Entrega</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn dense color="white" class="button23" round style="margin-right: 15px" clickable to="/pagocomisiones"
          padding="xs">
          <q-icon size="25px" name="paid" color="primary">
            <q-tooltip transition-show="flip-right" transition-hide="flip-left" class="bg-primary"
              style="max-height: 30px" color="primary" max-height="40px">Pago de Comisiones</q-tooltip>
          </q-icon>
        </q-btn>
      </div>
      <div class="text-caption float-right items-center creditos">
        <p style="font-size: 12px; margin-right: 20px; padding-top: 16px">
          <strong>© 2019. LOS DERECHOS RESERVADOS. RCS EXPRESS</strong>
        </p>
      </div>
      <user-logout ref="component"></user-logout>
      <desactivate-crud ref="desactivateCrud" @desactivar-Opciones-Set="desactivarOpcionesSet"></desactivate-crud>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { defineComponent, defineAsyncComponent } from "vue";
import desactivateCrudVue from "src/components/desactivateCrud.vue";
import userLogoutVue from "src/components/userLogout.vue";

export default {
  components: {
    "desactivate-crud": desactivateCrudVue,
    "user-logout": userLogoutVue,
  },
  data() {
    return {
      items: [
        { name: 'inicio', label: 'Inicio', level: 0, qitem: true, icon: "home", url: "/dashboard", model: false, padre: "" },
        { name: 'operaciones', label: 'Operaciones', level: 0, qitem: false, icon: "dashboard", url: "", model: false, padre: "" },
        { name: 'ventas', label: 'Ventas', level: 0, qitem: false, icon: "sell", url: "", model: false, padre: "" },
        { name: 'administracion', label: 'Administracion', level: 0, qitem: false, icon: "topic", url: "", model: false, padre: "" },
        { name: 'consultas', label: 'Consultas y Reportes', level: 0, qitem: false, icon: "summarize", url: "", model: false, padre: "" },
        { name: 'mantenimiento', label: 'Mantenimiento', level: 0, qitem: false, icon: "settings_applications", url: "", model: false, padre: "" },
        { name: 'relaciondespacho', label: 'Relacion de despacho', level: 1, qitem: false, icon: "auto_stories", url: "", model: false, padre: "operaciones" },
        { name: 'costostransporte', label: 'Costos de transporte', level: 1, qitem: false, icon: "auto_stories", url: "", model: false, padre: "operaciones" },
        { name: 'pruebasentrega', label: 'Pruebas de entrega', level: 1, qitem: true, icon: "auto_stories", url: "/pruebasentrega", model: false, padre: "operaciones" },
        { name: 'operativa', label: 'Operativa', level: 2, qitem: true, icon: "folder_open", url: "/operativa", model: false, padre: "relaciondespacho" },
        { name: 'costos', label: 'Costos', level: 2, qitem: true, icon: "payments", url: "/costos", model: false, padre: "relaciondespacho" },
        { name: 'registrodecostos', label: 'Registro de costos', level: 2, qitem: true, icon: "paid", url: "/registrodecostos", model: false, padre: "costostransporte" },
        { name: 'reportedecostos', label: 'Reporte de costos', level: 2, qitem: true, icon: "price_check", url: "/reportedecostos", model: false, padre: "costostransporte" },
        { name: 'registroserviciocarga', label: 'Registro Del Servicio de carga', level: 1, qitem: true, icon: "local_shipping", url: "/registroserviciocarga", model: false, padre: "ventas" },
        { name: 'facturacioncredito', label: 'Facturación Crédito, Contado u Otros', level: 1, qitem: true, icon: "local_atm", url: "/facturacioncredito", model: false, padre: "ventas" },
        { name: 'anulacionguias', label: 'Anulacion de Guías y Facturas', level: 1, qitem: true, icon: "block", url: "/anulacionguias", model: false, padre: "ventas" },
        { name: 'emitircarta', label: 'Emitir Carta para Clientes', level: 1, qitem: true, icon: "forward_to_inbox", url: "/emitircarta", model: false, padre: "ventas" },
        { name: 'notascontables', label: 'Notas Contables', level: 1, qitem: false, icon: "menu_book", url: "", model: false, padre: "administracion" },
        { name: 'notasdebito', label: 'Notas de Débito', level: 2, qitem: true, icon: "note_alt", url: "/notasdebito", model: false, padre: "notascontables" },
        { name: 'notascredito', label: 'Notas de Crédito', level: 2, qitem: true, icon: "note_alt", url: "/notascredito", model: false, padre: "notascontables" },
        { name: 'anulacionnotascontables', label: 'Anulacion de Notas Contables', level: 2, qitem: true, icon: "report", url: "/anulacionnotascontables", model: false, padre: "notascontables" },
        { name: 'cuentasporcobrar', label: 'Cuentas por Cobrar', level: 1, qitem: true, icon: "request_quote", url: "/cuentasporcobrar", model: false, padre: "administracion" },
        { name: 'cuentasporpagar', label: 'Cuentas por Pagar', level: 1, qitem: false, icon: "price_check", url: "", model: false, padre: "administracion" },
        { name: 'ingresocuentaspagar', label: 'Ingreso de Cuentas por Pagar', level: 2, qitem: true, icon: "keyboard_double_arrow_up", url: "/ingresocuentaspagar", model: false, padre: "cuentasporpagar" },
        { name: 'controlpagosproveedores', label: 'Control de Pagos a Proveedores', level: 2, qitem: true, icon: "supervised_user_circle", url: "/controlpagosproveedores", model: false, padre: "cuentasporpagar" },
        { name: 'controlcomisiones', label: 'Control de Comisiones', level: 1, qitem: false, icon: "list", url: "", model: false, padre: "administracion" },
        { name: 'generarcomisiones', label: 'Generar comisiones en Entrega', level: 2, qitem: true, icon: "payment", url: "/generarcomisiones", model: false, padre: "controlcomisiones" },
        { name: 'pagocomisiones', label: 'Pago de Comisiones', level: 2, qitem: true, icon: "credit_score", url: "/pagocomisiones", model: false, padre: "controlcomisiones" },
        { name: 'retencioncomprador', label: 'Retencion Comprador', level: 1, qitem: true, icon: "pan_tool", url: "/retencioncomprador", model: false, padre: "administracion" },
        { name: 'relacionretencionescomprador', label: 'Relacion Retenciones Comprador', level: 1, qitem: true, icon: "swap_horiz", url: "/relacionretencionescomprador", model: false, padre: "administracion" },
        { name: 'movimientosbancarios', label: 'Movimientos Bancarios', level: 1, qitem: false, icon: "paid", url: "", model: false, padre: "administracion" },
        { name: 'ingresomovimientos', label: 'Ingreso de Movimientos', level: 2, qitem: true, icon: "airplay", url: "/ingresomovimientos", model: false, padre: "movimientosbancarios" },
        { name: 'relacionmovimientos', label: 'Relacion de Movimientos', level: 2, qitem: true, icon: "developer_board", url: "/relacionmovimientos", model: false, padre: "movimientosbancarios" },
        { name: 'estadogananciasperdidas', label: 'Estado de Ganancias y Perdidas', level: 1, qitem: true, icon: "collections_bookmark", url: "/estadogananciasperdidas", model: false, padre: "administracion" },
        { name: 'reporteventas', label: 'Reporte de Ventas', level: 1, qitem: true, icon: "receipt_long", url: "/reporteventas", model: false, padre: "consultas" },
        { name: 'librocompras', label: 'Libro de Compras', level: 1, qitem: true, icon: "auto_stories", url: "/librocompras", model: false, padre: "consultas" },
        { name: 'libroventas', label: 'Libro de Ventas', level: 1, qitem: true, icon: "style", url: "/libroventas", model: false, padre: "consultas" },
        { name: 'pagospendientesproveedores', label: 'Pagos Pendientes a Proveedores', level: 1, qitem: true, icon: "notifications_active", url: "/pagospendientesproveedores", model: false, padre: "consultas" },
        { name: 'pagosrealizadosproveedores', label: 'Pagos Realizados a Proveedores', level: 1, qitem: true, icon: "how_to_reg", url: "/pagosrealizadosproveedores", model: false, padre: "consultas" },
        { name: 'relacionretenciones', label: 'Relacion de Retenciones', level: 1, qitem: true, icon: "app_blocking", url: "/relacionretenciones", model: false, padre: "consultas" },
        { name: 'controlretencionesislr', label: 'Control de Retenciones ISLR', level: 1, qitem: true, icon: "remove_circle_outline", url: "/controlretencionesislr", model: false, padre: "consultas" },
        { name: 'controlretencionesiva', label: 'Control de Retenciones IVA', level: 1, qitem: true, icon: "remove_circle", url: "/controlretencionesiva", model: false, padre: "consultas" },
        { name: 'franqueopostal', label: 'Franqueo Postal Obligatorio', level: 1, qitem: true, icon: "tag", url: "/franqueopostal", model: false, padre: "consultas" },
        { name: 'datosgenerales', label: 'Datos Generales', level: 1, qitem: false, icon: "settings_applications", url: "", model: false, padre: "mantenimiento" },
        { name: 'agencias', label: 'Agencias', level: 2, qitem: true, icon: "corporate_fare", url: "/agencias", model: false, padre: "datosgenerales" },
        { name: 'agentes', label: 'Agentes', level: 2, qitem: true, icon: "people", url: "/agentes", model: false, padre: "datosgenerales" },
        { name: 'paisestadociudad', label: 'Pais, Estado, Ciudad', level: 2, qitem: true, icon: "place", url: "/paisestadociudad", model: false, padre: "datosgenerales" },
        { name: 'zonasagencia', label: 'Zonas por Agencia', level: 2, qitem: true, icon: "map", url: "/zonasagencia", model: false, padre: "datosgenerales" },
        { name: 'unidadestransporte', label: 'Unidades de Transporte', level: 2, qitem: true, icon: "local_shipping", url: "/unidadestransporte", model: false, padre: "datosgenerales" },
        { name: 'ayudantes', label: 'Ayudantes', level: 2, qitem: true, icon: "account_circle", url: "/ayudantes", model: false, padre: "datosgenerales" },
        { name: 'receptores', label: 'Receptores', level: 2, qitem: true, icon: "compare_arrows", url: "/receptores", model: false, padre: "datosgenerales" },
        { name: 'tarifas', label: 'Tarifas', level: 2, qitem: true, icon: "local_atm", url: "/tarifas", model: false, padre: "datosgenerales" },
        { name: 'controlcorrelativo', label: 'Control Correlativo', level: 2, qitem: true, icon: "point_of_sale", url: "/controlcorrelativo", model: false, padre: "datosgenerales" },
        { name: 'variablecontrol', label: 'Variable Control', level: 2, qitem: true, icon: "settings_suggest", url: "/variablecontrol", model: false, padre: "datosgenerales" },
        { name: 'registrosbasicos', label: 'Registros Básicos', level: 1, qitem: false, icon: "widgets", url: "", model: false, padre: "mantenimiento" },
        { name: 'bancos', label: 'Bancos', level: 2, qitem: true, icon: "account_balance", url: "/bancos", model: false, padre: "registrosbasicos" },
        { name: 'cuentasbancarias', label: 'Cuentas Bancarias', level: 2, qitem: true, icon: "account_balance_wallet", url: "/cuentasbancarias", model: false, padre: "registrosbasicos" },
        { name: 'clientes', label: 'Clientes', level: 2, qitem: true, icon: "groups", url: "/clientes", model: false, padre: "registrosbasicos" },
        { name: 'empleados', label: 'Empleados', level: 2, qitem: true, icon: "badge", url: "/empleados", model: false, padre: "registrosbasicos" },
        { name: 'proveedores', label: 'Proveedores', level: 2, qitem: true, icon: "local_shipping", url: "/proveedores", model: false, padre: "registrosbasicos" },
        { name: 'retenciones', label: 'Retenciones', level: 2, qitem: true, icon: "block", url: "/retenciones", model: false, padre: "registrosbasicos" },
        { name: 'conceptosoperacion', label: 'Conceptos por Operación', level: 2, qitem: true, icon: "manage_search", url: "/conceptosoperacion", model: false, padre: "registrosbasicos" },
        { name: 'conceptosfacturacion', label: 'Conceptos por Facturación', level: 2, qitem: true, icon: "sticky_note_2", url: "/conceptosfacturacion", model: false, padre: "registrosbasicos" },
        { name: 'conceptosfpo', label: 'Conceptos FPO', level: 2, qitem: true, icon: "subject", url: "/conceptosfpo", model: false, padre: "registrosbasicos" },
        { name: 'asignacionguias', label: 'Asignación de Guías', level: 2, qitem: true, icon: "menu_book", url: "/asignacionguias", model: false, padre: "registrosbasicos" },
        { name: 'seguridad', label: 'Seguridad', level: 1, qitem: false, icon: "security", url: "", model: false, padre: "mantenimiento" },
        { name: 'roles', label: 'Roles', level: 2, qitem: true, icon: "person_outline", url: "/roles", model: false, padre: "seguridad" },
        { name: 'usuarios', label: 'Usuarios', level: 2, qitem: true, icon: "person", url: "/usuarios", model: false, padre: "seguridad" },
        { name: 'permisologia', label: 'Permisologia', level: 2, qitem: true, icon: "manage_accounts", url: "/permisologia", model: false, padre: "seguridad" },
        { name: 'transferencia', label: 'Transferencia', level: 1, qitem: true, icon: "open_in_new", url: "/transferencia", model: false, padre: "mantenimiento" },
        { name: 'transferenciahidroca', label: 'Transferencia de Hidroca', level: 1, qitem: true, icon: "upload_file", url: "/transferenciahidroca", model: false, padre: "mantenimiento" },
        { name: 'cargamanualguias', label: 'Carga Manual de Guias', level: 1, qitem: true, icon: "upload_file", url: "/cargamanualguias", model: false, padre: "mantenimiento" }
      ],
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      desplegable: false,
      desplegablea: false,
      desplegable2: false,
      desplegable3: false,
      segundo: false,
      tercero: false,
      cuarto: false,
      quinto: false,
      sexto: false,
      septimo: false,
      octavo: false,
      noveno: false,
      decimo: false,
      permisos: [
        "r_bancos",
        "r_agencias",
        "r_ciudades",
        "r_permisos",
        "r_usuarios",
        "r_roles",
        "r_agentes",
        "r_zonas",
        "r_unidades",
        "r_ayudantes",
        "r_receptores",
        "r_tarifas",
        "r_ccorrelativo",
        "r_vcontrol",
        "r_cuentas",
        "r_clientes",
        "r_empleados",
        "r_proveedores",
        "r_retenciones",
        "r_concepto_operacion",
        "r_concepto_facturacion",
        "r_concepto_fpo",
        "r_asignacionguias",
      ],
      decimoprimero: false,
      decimosegundo: false,
      decimotercero: false,
      decimocuarto: false,
      disabledBancos: false,
      disabledAgencias: false,
      disabledPermisos: false,
      disabledRoles: false,
      disabledUsuarios: false,
      disabledCiudades: false,
      disabledBancosSet: true,
      disabledAgenciasSet: true,
      disabledPermisosSet: true,
      disabledRolesSet: true,
      disabledUsuariosSet: true,
      disabledCiudadesSet: true,
      disabledAgentes: false,
      disabledAgentesSet: true,
      disabledZonas: false,
      disabledZonasSet: true,
      disabledUnidades: false,
      disabledUnidadesSet: true,
      disabledAyudantes: false,
      disabledAyudantesSet: true,
      disabledReceptores: false,
      disabledReceptoresSet: true,
      disabledTarifas: false,
      disabledTarifasSet: true,
      disabledCcorrelativo: false,
      disabledCcorrelativoSet: true,
      disabledVcontrol: false,
      disabledVcontrolSet: true,
      disabledCuentas: false,
      disabledCuentasSet: true,
      disabledClientes: false,
      disabledClientesSet: true,
      disabledEmpleados: false,
      disabledEmpleadosSet: true,
      disabledProveedores: false,
      disabledProveedoresSet: true,
      disabledRetenciones: false,
      disabledRetencionesSet: true,
      disabledConceptoOperacion: false,
      disabledConceptoOperacionSet: true,
      disabledConceptoFacturacion: false,
      disabledConceptoFacturacionSet: true,
      disabledConceptoFpo: false,
      disabledConceptoFpoSet: true,
      disabledAsignacionGuias: false,
      disabledAsignacionGuiasSet: true,
      drawer: false,
      miniState: false,
      intervalLogout: null,
      dashboard: this.$t("Menu.dashboard"),
      picture:
        "https://www.thepeakid.com/wp-content/uploads/2016/03/default-profile-picture.jpg",
    };
  },
  setup() {
    const url = ref("https://joshuaproject.net/assets/img/chatbot/default.jpg");
    return {
      url,
    };
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetLogoutTimer);
    }, this);
    this.resetLogoutTimer();
    this.miniState = true;
    this.Authenticator();
    this.refreshTimer();
    this.$refs.desactivateCrud.desactivarOpciones("desactivarOpcionesSet");
  },

  methods: {
    drawerClick() {
      if (this.miniState) {
        this.miniState = false;
        this.drawer = true;
      } else {
        this.miniState = true;
        this.drawer = true;
      }
    },
    desactivarOpcionesSet(permisos) {
      var permisos = permisos;
      for (var e = 0, len = permisos.length; e < len; e++) {
        if (permisos[e].permiso == true) {
          this[permisos[e].pagina] = true;
          this[permisos[e].paginaSet] = false;
        }
        if (e == permisos.length - 1) break;
      }
    },
    Authenticator() {
      if (LocalStorage.getItem("user") != true) {
        this.$router.push("/login");
      }
    },
    logout() {
      this.$refs.component.logoutUser();
    },
    refreshTimer() {
      let _this = this;
      var interval;
      let minutes = 19;
      let currentTime = localStorage.getItem("currentTime");
      let targetTime = localStorage.getItem("targetTime");
      if (targetTime == null && currentTime == null) {
        currentTime = new Date();
        targetTime = new Date(currentTime.getTime() + minutes * 60000);
        localStorage.setItem("currentTime", currentTime);
        localStorage.setItem("targetTime", targetTime);
      } else {
        currentTime = new Date(currentTime);
        targetTime = new Date(targetTime);
      }
      if (!checkComplete()) {
        interval = setInterval(checkComplete, 1000);
      }
      function checkComplete() {
        if (LocalStorage.getItem("user") === true) {
          currentTime = localStorage.getItem("currentTime");
          targetTime = localStorage.getItem("targetTime");
          if (currentTime > targetTime) {
            clearInterval(interval);
            LocalStorage.remove("currentTime");
            LocalStorage.remove("targetTime");
            _this.$refs.component.refreshToken();
            _this.refreshTimer();
          } else {
            currentTime = new Date();
            localStorage.setItem("currentTime", currentTime);
          }
        } else {
          clearInterval(interval);
          LocalStorage.remove("currentTime");
          LocalStorage.remove("targetTime");
          _this.$router.push("/login");
        }
      }

      document.onbeforeunload = function () {
        localStorage.setItem("currentTime", currentTime);
      };
    },
    resetLogoutTimer() {
      clearInterval(this.intervalLogout);
      LocalStorage.remove("currentTimeLogout");
      LocalStorage.remove("targetTimeLogout");
      var currentTime = new Date();
      var targetTime = new Date(currentTime.getTime() + 5 * 60000);
      localStorage.setItem("currentTimeLogout", currentTime);
      localStorage.setItem("targetTimeLogout", targetTime);
      this.logoutTimer();
    },
    logoutTimer() {
      let _this = this;
      let minutes = 5;
      let currentTime = localStorage.getItem("currentTimeLogout");
      let targetTime = localStorage.getItem("targetTimeLogout");
      if (targetTime == null && currentTime == null) {
        currentTime = new Date();
        targetTime = new Date(currentTime.getTime() + minutes * 60000);
        localStorage.setItem("currentTimeLogout", currentTime);
        localStorage.setItem("targetTimeLogout", targetTime);
      } else {
        currentTime = new Date(currentTime);
        targetTime = new Date(targetTime);
      }
      if (!checkComplete()) {
        _this.intervalLogout = setInterval(checkComplete, 1000);
      }
      function checkComplete() {
        if (LocalStorage.getItem("user") === true) {
          currentTime = localStorage.getItem("currentTimeLogout");
          targetTime = localStorage.getItem("targetTimeLogout");
          if (currentTime > targetTime) {
            clearInterval(_this.intervalLogout);
            LocalStorage.remove("currentTimeLogout");
            LocalStorage.remove("targetTimeLogout");
            _this.$refs.component.logoutUser();
          } else {
            currentTime = new Date();
            localStorage.setItem("currentTimeLogout", currentTime);
          }
        } else {
          clearInterval(_this.intervalLogout);
          LocalStorage.remove("currentTimeLogout");
          LocalStorage.remove("targetTimeLogout");
          _this.$router.push("/login");
        }
      }
      document.onbeforeunload = function () {
        localStorage.setItem("currentTime", currentTime);
      };
    },
    hideItems() {
      this.desplegable = "hide";
      this.desplegablea = "hide";
      this.desplegable2 = "hide";
      this.desplegable3 = "hide";
      this.segundo = "hide";
      this.tercero = "hide";
      this.cuarto = "hide";
      this.quinto = "hide";
      this.sexto = "hide";
      this.septimo = "hide";
      this.octavo = "hide";
      this.noveno = "hide";
      this.decimo = "hide";
      this.decimoprimero = "hide";
      this.decimosegundo = "hide";
      this.decimotercero = "hide";
      this.decimocuarto = "hide";

      for (var i = 0; i < this.items.length - 1; i++) {
        this.items[i].model = false
      };      
    },        
  },
};
</script>

<style>
.q-drawer--standard .q-item.q-router-link--active {
  background: #e3f2ff;
  border-radius: 0 10px 10px 0;
}

.q-tooltip {
  background-color: #eee;
  height: 49px;
  margin-left: 3px;
  margin-top: 2px;
  opacity: 0.8;
}

.tool {
  font-weight: bold;
  font-size: 15px;
  margin-top: 7.5px;
  color: #027be3;
}

@media screen and (max-width: 680px) {
  .creditos {
    display: none;
  }
}

@media screen and (max-width: 680px) {
  .buttons {
    text-align: center;
  }
}

@media screen and (max-width: 680px) {
  .float-left {
    float: inherit;
  }
}

@media screen and (max-width: 1265px) {
  .button23 {
    display: none;
  }
}

@media screen and (max-width: 1215px) {
  .button22 {
    display: none;
  }

  .button21 {
    display: none;
  }
}

@media screen and (max-width: 1156px) {
  .button20 {
    display: none;
  }
}

@media screen and (max-width: 1110px) {
  .button19 {
    display: none;
  }
}

@media screen and (max-width: 1065px) {
  .button18 {
    display: none;
  }

  .button17 {
    display: none;
  }
}

@media screen and (max-width: 1000px) {
  .button16 {
    display: none;
  }
}

@media screen and (max-width: 956px) {
  .button15 {
    display: none;
  }
}

@media screen and (max-width: 913px) {
  .button14 {
    display: none;
  }

  .button13 {
    display: none;
  }
}

@media screen and (max-width: 852px) {
  .button12 {
    display: none;
  }
}

@media screen and (max-width: 805px) {
  .button11 {
    display: none;
  }
}

@media screen and (max-width: 803px) {
  .button12 {
    display: none;
  }
}

@media screen and (max-width: 757px) {
  .button10 {
    display: none;
  }

  .button9 {
    display: none;
  }
}

@media screen and (max-width: 697px) {
  .button8 {
    display: none;
  }
}

@media screen and (max-width: 321px) {
  .button6 {
    display: none;
  }

  .button3 {
    display: none;
  }
}

@media screen and (max-width: 298px) {
  .button7 {
    display: none;
  }
}

@media screen and (max-width: 1012px) {
  .titleMainLayout {
    display: none;
  }
}
</style>
