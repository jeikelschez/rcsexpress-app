<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-indigo-9">
        <q-btn flat dense round
          @click="drawerClick"
          icon="menu"
          aria-label="Menu"
          class="q-mr-sm"
        />
        <q-toolbar-title>SCEN - Sistema de Control de Encomiendas</q-toolbar-title>
        <!-- <q-btn flat round dense icon="search" class="q-mr-xs">
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          class="bg-indigo"
          color="primary"
          max-height="30px"
        >Operaciones</q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="shopping_cart" class="q-mr-xs">
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          class="bg-indigo"
          color="primary"
          max-height="30px"
        >Ventas</q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="settings" class="q-mr-xs">
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          class="bg-indigo"
          color="primary"
          max-height="30px"
        >Configuracion</q-tooltip>
        </q-btn>
        <q-btn flat round dense icon="info" class="q-mr-xs">
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          class="bg-indigo"
          color="primary"
          max-height="30px"
        >Informacion</q-tooltip>
        </q-btn> -->
         <q-space ></q-space>
        <q-btn flat dense>
          <q-avatar size="42px">
            <img :src="picture" />
          </q-avatar>
          <q-menu transition-show="flip-right" transition-hide="flip-left">
            <q-list style="min-width: 100px">
              <q-item clickable v-ripple @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>{{ $t('Menu.logout') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-drawer
    v-model="drawer"
      show-if-above
      :breakpoint="500"
      bordered
      :mini="!drawer || miniState"
        @click="miniState = false"
      width="350"
      content-class="bg-grey-3"
    >
      <q-list>

<div>
    <q-list class="rounded-borders">

      <q-expansion-item
        expand-separator
        icon="dashboard"
        label="Operaciones"
      >
        <q-expansion-item
          :header-inset-level="0.40"
          :content-inset-level="0.90"
          expand-separator
          icon="assignment"
          label="Relacion de despacho"
        >
         <q-item clickable tag="a" to="/Operativa" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="folder_open" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Operativa') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Operativa') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" to="/Costos" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="payments" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Costos') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Costos') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        </q-expansion-item>

        <q-expansion-item
          :header-inset-level="0.40"
          :content-inset-level="0.90"
          expand-separator
          icon="directions_bus_filled"
          label="Costos de Transporte"
        >
         <q-item clickable tag="a" to="/Registrodecostos" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="paid" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Registrodecostos') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Registrodecostos') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="a" to="/Reportedecostos" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="price_check" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Reportedecostos') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Reportedecostos') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        </q-expansion-item>
<div class="q-pl-lg">
      <q-item clickable tag="a" to="/Pruebasentrega" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="auto_stories" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Pruebasdeentrega') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Pruebasdeentrega') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
</div>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        icon="sell"
        label="Ventas"
      >
<div class="q-pl-lg">
      <q-item clickable tag="a" to="/Registroserviciocarga" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="local_shipping" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Registroserviciocarga') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Registroserviciocarga') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
</div>

<div class="q-pl-lg">
      <q-item clickable tag="a" to="/Facturacioncredito" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="local_atm" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Facturacioncredito') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Facturacioncredito') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
</div>

<div class="q-pl-lg">
      <q-item clickable tag="a" to="/Anulacionguias" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="block" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Anulacionguias') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Anulacionguias') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
</div>

<div class="q-pl-lg">
      <q-item clickable tag="a" to="/Emitircarta" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="forward_to_inbox" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Emitircarta') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Emitircarta') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
</div>

      </q-expansion-item>

      <q-expansion-item
        expand-separator
        icon="topic"
        label="Administracion"
      >
        <q-expansion-item
          :header-inset-level="0.40"
          :content-inset-level="0.90"
          expand-separator
          icon="menu_book"
          label="Notas Contables"
        >
         <q-item clickable tag="a" to="/Notasdebito" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="note_alt" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Notasdebito') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Notasdebito') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Notascredito" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="note_alt" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Notascredito') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Notascredito') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/AnulacionNotasContables" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="report" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.AnulacionNotasContables') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.AnulacionNotasContables') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        </q-expansion-item>

        <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Cuentasporcobrar" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="request_quote" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Cuentasporcobrar') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Cuentasporcobrar') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

        <q-expansion-item
          :header-inset-level="0.40"
          :content-inset-level="0.90"
          expand-separator
          icon="price_check"
          label="Cuentas por Pagar"
        >
         <q-item clickable tag="a" to="/Ingresocuentaspagar" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="keyboard_double_arrow_up" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Ingresocuentaspagar') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Ingresocuentaspagar') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Controlpagosproveedores" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="supervised_user_circle" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Controlpagosproveedores') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Controlpagosproveedores') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        </q-expansion-item>

        <q-expansion-item
          :header-inset-level="0.40"
          :content-inset-level="0.90"
          expand-separator
          icon="list"
          label="Control de Comisiones"
        >
         <q-item clickable tag="a" to="/Generarcomisiones" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="payment" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Generarcomisiones') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Generarcomisiones') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Pagocomisiones" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="credit_score" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Pagocomisiones') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Pagocomisiones') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        </q-expansion-item>

        <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Retencioncomprador" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="pan_tool" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Retencioncomprador') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Retencioncomprador') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

        <div class="q-pl-lg">
      <q-item clickable tag="a" to="/RelacionRetencionesComprador" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="swap_horiz" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.RelacionRetencionesComprador') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.RelacionRetencionesComprador') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

        <q-expansion-item
          :header-inset-level="0.40"
          :content-inset-level="0.90"
          expand-separator
          icon="paid"
          label="Movimientos Bancarios"
        >
         <q-item clickable tag="a" to="/Ingresomovimientos" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="airplay" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Ingresomovimientos') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Ingresomovimientos') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Relacionmovimientos" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="developer_board" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Relacionmovimientos') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Relacionmovimientos') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        </q-expansion-item>

        <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Estadogananciasperdidas" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="collections_bookmark" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Estadogananciasperdidas') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Estadogananciasperdidas') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      </q-expansion-item>

      <q-expansion-item
        expand-separator
        icon="summarize"
        label="Consultas y Reportes"
      >
      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Reporteventas" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="receipt_long" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Reporteventas') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Reporteventas') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Librocompras" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="auto_stories" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Librocompras') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Librocompras') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Libroventas" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="style" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Libroventas') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Libroventas') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Pagospendientesproveedores" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="notifications_active" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Pagospendientesproveedores') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Pagospendientesproveedores') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Pagosrealizadosproveedores" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="how_to_reg" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Pagosrealizadosproveedores') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Pagosrealizadosproveedores') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Relacionretenciones" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="app_blocking" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Relacionretenciones') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Relacionretenciones') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Controlretencionesislr" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="remove_circle_outline" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Controlretencionesislr') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Controlretencionesislr') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Controlretencionesiva" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="remove_circle" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Controlretencionesiva') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Controlretencionesiva') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/franqueopostal" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="tag" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.franqueopostal') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.franqueopostal') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        </div>

      </q-expansion-item>

      <q-expansion-item
        expand-separator
        icon="settings_applications"
        label="Mantenimiento"
      >
        <q-expansion-item
          :header-inset-level="0.40"
          :content-inset-level="0.90"
          expand-separator
          icon="table_rows"
          label="Datos Generales"
        >
         <q-item clickable tag="a" to="/Agencias" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="corporate_fare" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Agencias') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Agencias') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Agentes" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="people" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Agentes') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Agentes') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Paisestadociudad" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="place" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Paisestadociudad') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Paisestadociudad') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/ZonasAgencia" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="map" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.ZonasAgencia') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.ZonasAgencia') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/UnidadesTransporte" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="local_shipping" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.UnidadesTransporte') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.UnidadesTransporte') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Ayudantes" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="account_circle" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Ayudantes') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Ayudantes') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Receptores" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="compare_arrows" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Receptores') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Receptores') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Tarifas" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="local_atm" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Tarifas') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Tarifas') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
         <q-item clickable tag="a" to="/Controlcorrelativo" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="point_of_sale" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Controlcorrelativo') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Controlcorrelativo') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/VariableControl" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="settings_suggest" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.VariableControl') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.VariableControl') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        </q-expansion-item>

      <q-expansion-item
          :header-inset-level="0.40"
          :content-inset-level="0.90"
          expand-separator
          icon="widgets"
          label="Registros Basicos"
        >
         <q-item clickable tag="a" to="/Bancos" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="account_balance" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Bancos') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Bancos') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/CuentasBancarias" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="account_balance_wallet" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.CuentasBancarias') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.CuentasBancarias') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Clientes" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="groups" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Clientes') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Clientes') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Empleados" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="badge" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Empleados') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Empleados') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Proveedores" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="local_shipping" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Proveedores') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Proveedores') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Retenciones" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="block" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Retenciones') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Retenciones') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/ConceptosOperacion" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="manage_search" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.ConceptosOperacion') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.ConceptosOperacion') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/ConceptosFacturacion" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="sticky_note_2" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.ConceptosFacturacion') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.ConceptosFacturacion') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
         <q-item clickable tag="a" to="/ConceptosFPO" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="subject" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.ConceptosFPO') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.ConceptosFPO') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Asignacionguias" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="menu_book" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Asignacionguias') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Asignacionguias') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        </q-expansion-item>

      <q-expansion-item
          :header-inset-level="0.40"
          :content-inset-level="0.90"
          expand-separator
          icon="security"
          label="Seguridad"
        >
         <q-item clickable tag="a" to="/Roles" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="person_outline" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Roles') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Roles') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Usuarios" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="person" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Usuarios') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Usuarios') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" to="/Permisologia" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="manage_accounts" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Permisologia') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Permisologia') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>

        </q-expansion-item>

      <div class="q-pl-lg">
      <q-item clickable tag="a" to="/Transferencia" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="open_in_new" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.Transferencia') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.Transferencia') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
</div>

<div class="q-pl-lg">
      <q-item clickable tag="a" to="/TransferenciaHidroca" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="upload_file" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.TransferenciaHidroca') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.TransferenciaHidroca') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
</div>

<div class="q-pl-lg">
      <q-item clickable tag="a" to="/CargaManualGuias" exact>
          <q-item-section avatar>
            <q-icon size="28px" name="upload_file" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.CargaManualGuias') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.CargaManualGuias') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
</div>

      </q-expansion-item>

    </q-list>
  </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal elevated bordered>
      <div class="text-caption float-right">
        <q-btn
          size="sm"
          color="primary"
          :label="'© 2019. ' + this.$t('Menu.rights') + ' RCS Express.'"
        />
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      drawer: false,
      miniState: false,
      dashboard: this.$t('Menu.dashboard'),
      picture: 'logo_rc4.bmp',
    };
  },
  mounted() {
    this.miniState = true;
    this.drawer = true;
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
    logout() {
      sessionStorage.removeItem('isAuthenticated');
      this.$router.push('/login');
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
</style>
