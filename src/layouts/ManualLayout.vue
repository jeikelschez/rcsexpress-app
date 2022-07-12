<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-indigo-9" style="margin-left: 10px">
        <q-btn
          flat
          dense
          round
          @click.capture="drawerClick"
          @click="this.close()"
          icon="menu"
          aria-label="Menu"
          class="q-mr-sm"
        />
        <q-toolbar-title
          >SCEN - Sistema de Control de Encomiendas</q-toolbar-title
        >
        <q-space></q-space>
        <q-btn
          dense
          color="white"
          round
          style="margin-right: 10px"
          clickable
          to="/dashboard"
          padding="xs"
        >
          <q-icon size="23px" name="home" color="primary"> </q-icon>
        </q-btn>
        <q-btn flat dense style="margin-right: 10px">
          <q-avatar size="42px">
            <img :src="url" />
          </q-avatar>
          <q-menu
            transition-show="flip-right"
            transition-hide="flip-left"
            auto-close
          >
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

    <q-drawer
      v-model="drawer"
      show-if-above
      :breakpoint="500"
      bordered
      :width="350"
      content-class="bg-grey-3"
    >
      <q-list style="margin-top: 166px; margin-bottom: 40px">
        <div>
          <q-list class="rounded-borders">
            <q-item clickable tag="a" to="/m_manual" exact>
              <q-item-section avatar>
                <q-icon size="28px" name="menu_book" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("Guia de Uso de Manual") }}</q-item-label>
                <q-item-label caption></q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable tag="a" to="/m_dashboard" exact>
              <q-item-section avatar>
                <q-icon size="28px" name="home" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("Inicio") }}</q-item-label>
                <q-item-label caption></q-item-label>
              </q-item-section>
            </q-item>
            <q-expansion-item
              expand-separator
              icon="dashboard"
              label="Operaciones"
              expanded="desplegable"
              v-model="this.paginas.desplegable"
            >
              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                icon="assignment"
                label="Relacion de despacho"
                expanded="desplegable2"
                v-model="this.paginas.desplegable2"
              >
                <q-item clickable tag="a" to="/m_operativa" exact>
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
                      <div class="tool">{{ $t("Menu.Operativa") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Operativa") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable tag="a" to="/m_costos" exact>
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
                      <div class="tool">{{ $t("Menu.Costos") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Costos") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>

              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                icon="directions_bus_filled"
                label="Costos de Transporte"
                expanded="desplegable3"
                v-model="this.paginas.desplegable3"
              >
                <q-item clickable tag="a" to="/m_registrodecostos" exact>
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
                      <div class="tool">{{ $t("Menu.registrodecostos") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Registrodecostos")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable tag="a" to="/m_reportedecostos" exact>
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
                      <div class="tool">{{ $t("Menu.Reportedecostos") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Reportedecostos")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>
              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_pruebasentrega" exact>
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
                      <div class="tool">{{ $t("Menu.Pruebasdeentrega") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Pruebasdeentrega")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              icon="sell"
              label="Ventas"
              expanded="cuarto"
              v-model="this.paginas.cuarto"
            >
              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_registroserviciocarga" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Registroserviciocarga") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Registroserviciocarga")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_facturacioncredito" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Facturacioncredito") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Facturacioncredito")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_anulacionguias" exact>
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
                      <div class="tool">{{ $t("Menu.Anulacionguias") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Anulacionguias") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_emitircarta" exact>
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
                      <div class="tool">{{ $t("Menu.Emitircarta") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Emitircarta") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              icon="topic"
              expanded="quinto"
              v-model="this.paginas.quinto"
              label="Administracion"
            >
              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                expanded="sexto"
                v-model="this.paginas.sexto"
                icon="menu_book"
                label="Notas Contables"
              >
                <q-item clickable tag="a" to="/m_notasdebito" exact>
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
                      <div class="tool">{{ $t("Menu.Notasdebito") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Notasdebito") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_notascredito" exact>
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
                      <div class="tool">{{ $t("Menu.Notascredito") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Notascredito") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_anulacionnotascontables" exact>
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
                      <div class="tool">
                        {{ $t("Menu.AnulacionNotasContables") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.AnulacionNotasContables")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_cuentasporcobrar" exact>
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
                      <div class="tool">{{ $t("Menu.Cuentasporcobrar") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Cuentasporcobrar")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                expanded="septimo"
                v-model="this.paginas.septimo"
                icon="price_check"
                label="Cuentas por Pagar"
              >
                <q-item clickable tag="a" to="/m_ingresocuentaspagar" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Ingresocuentaspagar") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Ingresocuentaspagar")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_controlpagosproveedores" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Controlpagosproveedores") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Controlpagosproveedores")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>

              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                expanded="octavo"
                v-model="this.paginas.octavo"
                icon="list"
                label="Control de Comisiones"
              >
                <q-item clickable tag="a" to="/m_generarcomisiones" exact>
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
                      <div class="tool">{{ $t("Menu.Generarcomisiones") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Generarcomisiones")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_pagocomisiones" exact>
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
                      <div class="tool">{{ $t("Menu.Pagocomisiones") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Pagocomisiones") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_retencioncomprador" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Retencioncomprador") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Retencioncomprador")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item
                  clickable
                  tag="a"
                  to="/m_relacionretencionescomprador"
                  exact
                >
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
                      <div class="tool">
                        {{ $t("Menu.RelacionRetencionesComprador") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.RelacionRetencionesComprador")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                expanded="noveno"
                v-model="this.paginas.noveno"
                icon="paid"
                label="Movimientos Bancarios"
              >
                <q-item clickable tag="a" to="/m_ingresomovimientos" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Ingresomovimientos") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Ingresomovimientos")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_relacionmovimientos" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Relacionmovimientos") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Relacionmovimientos")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_estadogananciasperdidas" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Estadogananciasperdidas") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Estadogananciasperdidas")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              expanded="decimo"
              v-model="this.paginas.decimo"
              icon="summarize"
              label="Consultas y Reportes"
            >
              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_reporteventas" exact>
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
                      <div class="tool">{{ $t("Menu.Reporteventas") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Reporteventas") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_librocompras" exact>
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
                      <div class="tool">{{ $t("Menu.Librocompras") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Librocompras") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_libroventas" exact>
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
                      <div class="tool">{{ $t("Menu.Libroventas") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Libroventas") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item
                  clickable
                  tag="a"
                  to="/m_pagospendientesproveedores"
                  exact
                >
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
                      <div class="tool">
                        {{ $t("Menu.Pagospendientesproveedores") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Pagospendientesproveedores")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item
                  clickable
                  tag="a"
                  to="/m_pagosrealizadosproveedores"
                  exact
                >
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
                      <div class="tool">
                        {{ $t("Menu.Pagosrealizadosproveedores") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Pagosrealizadosproveedores")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_relacionretenciones" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Relacionretenciones") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Relacionretenciones")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_controlretencionesislr" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Controlretencionesislr") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Controlretencionesislr")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_controlretencionesiva" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Controlretencionesiva") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Controlretencionesiva")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_franqueopostal" exact>
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
                      <div class="tool">{{ $t("Menu.franqueopostal") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.franqueopostal") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-expansion-item>

            <q-expansion-item
              expand-separator
              icon="settings_applications"
              expanded="decimoprimero"
              v-model="this.paginas.decimoprimero"
              label="Mantenimiento"
            >
              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                expanded="decimosegundo"
                v-model="this.paginas.decimosegundo"
                icon="table_rows"
                label="Datos Generales"
              >
                <q-item
                  tag="a"
                  clickable
                  to="/m_agencias"
                >
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
                      <div class="tool">{{ $t("Menu.Agencias") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Agencias") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_agentes" exact>
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
                      <div class="tool">{{ $t("Menu.Agentes") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Agentes") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  tag="a"
                  clickable
                  to="/m_paisestadociudad"
                >
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
                      <div class="tool">{{ $t("Menu.Paisestadociudad") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Paisestadociudad")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_zonasagencia" exact>
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
                      <div class="tool">{{ $t("Menu.ZonasAgencia") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.ZonasAgencia") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_unidadestransporte" exact>
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
                      <div class="tool">
                        {{ $t("Menu.UnidadesTransporte") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.UnidadesTransporte")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_ayudantes" exact>
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
                      <div class="tool">{{ $t("Menu.Ayudantes") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Ayudantes") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_receptores" exact>
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
                      <div class="tool">{{ $t("Menu.Receptores") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Receptores") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_tarifas" exact>
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
                      <div class="tool">{{ $t("Menu.Tarifas") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Tarifas") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_controlcorrelativo" exact>
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
                      <div class="tool">
                        {{ $t("Menu.Controlcorrelativo") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Controlcorrelativo")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_variablecontrol" exact>
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
                      <div class="tool">{{ $t("Menu.VariableControl") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.VariableControl")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>

              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                expanded="decimotercero"
                v-model="this.paginas.decimotercero"
                icon="widgets"
                label="Registros Basicos"
              >
                <q-item
                  tag="a"
                  clickable
                  to="/m_bancos"
                  exact
                >
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
                      <div class="tool">{{ $t("Menu.Bancos") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Bancos") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_cuentasbancarias" exact>
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
                      <div class="tool">{{ $t("Menu.CuentasBancarias") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.CuentasBancarias")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_clientes" exact>
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
                      <div class="tool">{{ $t("Menu.Clientes") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Clientes") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_empleados" exact>
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
                      <div class="tool">{{ $t("Menu.Empleados") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Empleados") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_proveedores" exact>
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
                      <div class="tool">{{ $t("Menu.Proveedores") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Proveedores") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_retenciones" exact>
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
                      <div class="tool">{{ $t("Menu.Retenciones") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Retenciones") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_conceptosoperacion" exact>
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
                      <div class="tool">
                        {{ $t("Menu.ConceptosOperacion") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.ConceptosOperacion")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_conceptosfacturacion" exact>
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
                      <div class="tool">
                        {{ $t("Menu.ConceptosFacturacion") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.ConceptosFacturacion")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_conceptosfpo" exact>
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
                      <div class="tool">{{ $t("Menu.ConceptosFPO") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.ConceptosFPO") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable tag="a" to="/m_asignacionguias" exact>
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
                      <div class="tool">{{ $t("Menu.Asignacionguias") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.Asignacionguias")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>

              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                icon="security"
                expanded="decimocuarto"
                v-model="this.paginas.decimocuarto"
                label="Seguridad"
              >
                <q-item
                  tag="a"
                  exact
                  clickable
                  to="/m_roles"
                >
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
                      <div class="tool">{{ $t("Menu.Roles") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Roles") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  tag="a"
                  exact
                  clickable
                  to="/m_usuarios"
                >
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
                      <div class="tool">{{ $t("Menu.Usuarios") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Usuarios") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item
                  tag="a"
                  exact
                  clickable
                  to="/m_permisologia"
                >
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
                      <div class="tool">{{ $t("Menu.Permisologia") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Permisologia") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_transferencia" exact>
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
                      <div class="tool">{{ $t("Menu.Transferencia") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Transferencia") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_transferenciahidroca" exact>
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
                      <div class="tool">
                        {{ $t("Menu.TransferenciaHidroca") }}
                      </div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.TransferenciaHidroca")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>

              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/m_cargamanualguias" exact>
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
                      <div class="tool">{{ $t("Menu.CargaManualGuias") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{
                      $t("Menu.CargaManualGuias")
                    }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </q-expansion-item>
          </q-list>
        </div>
      </q-list>
      <q-img
        class="absolute-top"
        src="https://img.wallpapersafari.com/desktop/1920/1080/40/75/AOrQHx.jpg"
        style="height: 160px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-btn
            size="56px"
            class="q-mb-sm"
            dense
            color="white"
            round
            padding="md"
          >
            <q-icon size="40px" name="menu_book" color="primary"></q-icon>
          </q-btn>
          <div class="text-weight-bold" style="margin-top: 8px">
            MANUAL DE USO Y CONTROL
          </div>
          <div>Selecciona una pagina y obten información</div>
        </div>
      </q-img>
    </q-drawer>

    <keep-alive>
    <router-view @mouseover="this.close()"></router-view>
          </keep-alive>
    <q-page-container>
    </q-page-container>
    <user-logout ref="component"></user-logout>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { defineComponent, defineAsyncComponent } from "vue";
import desactivateCrudVue from "src/components/desactivateCrud.vue";
import userLogoutVue from "src/components/userLogout.vue";

export default defineComponent({
  name: "Manual",
  components: {
    "desactivate-crud": desactivateCrudVue,
    "user-logout": userLogoutVue,
  },
  data() {
    return {
      paginas: {
      desplegable,
      desplegable2,
      desplegable3,
      segundo,
      tercero,
      cuarto,
      quinto,
      sexto,
      septimo,
      octavo,
      noveno,
      decimo,
      decimoprimero,
      decimosegundo,
      decimotercero,
      decimocuarto,
      },
      drawer: false,
      miniState: false,
      dashboard: this.$t("Menu.dashboard"),
      picture:
        "https://www.thepeakid.com/wp-content/uploads/2016/03/default-profile-picture.jpg",
    };
  },
  setup() {
    const url = ref("https://joshuaproject.net/assets/img/chatbot/default.jpg");
    return {
      url,
      desplegable: ref(false),
      desplegable: ref(false),
      desplegable2: ref(false),
      desplegable3: ref(false),
      segundo: ref(false),
      tercero: ref(false),
      cuarto: ref(false),
      quinto: ref(false),
      sexto: ref(false),
      septimo: ref(false),
      octavo: ref(false),
      noveno: ref(false),
      decimo: ref(false),
      decimoprimero: ref(false),
      decimosegundo: ref(false),
      decimotercero: ref(false),
      decimocuarto: ref(false),
      filter: ref(""),
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
    
    close() {
      this.paginas.desplegable = hide;
      this.paginas.desplegable2 = hide;
      this.paginas.desplegable3 = hide;
      this.paginas.segundo = hide;
      this.paginas.tercero = hide;
      this.paginas.cuarto = hide;
      this.paginas.quinto = hide;
      this.paginas.sexto = hide;
      this.paginas.septimo = hide;
      this.paginas.octavo = hide;
      this.paginas.noveno = hide;
      this.paginas.decimo = hide;
      this.paginas.decimoprimero = hide;
      this.paginas.decimosegundo = hide;
      this.paginas.decimotercero = hide;
      this.paginas.decimocuarto = hide;
    },
    logout() {
      this.$refs.component.logoutUser();
    },
  },
});
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
