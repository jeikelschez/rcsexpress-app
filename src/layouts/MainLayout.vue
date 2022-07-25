<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated>
      <q-toolbar class="bg-indigo-9">
        <q-btn
          flat
          dense
          round
          @click.capture="drawerClick"
          @click="
            desplegable = hide;
            desplegable2 = hide;
            desplegable3 = hide;
            segundo = hide;
            tercero = hide;
            cuarto = hide;
            quinto = hide;
            sexto = hide;
            septimo = hide;
            octavo = hide;
            noveno = hide;
            decimo = hide;
            decimoprimero = hide;
            decimosegundo = hide;
            decimotercero = hide;
            decimocuarto = hide;
          "
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
          to="/m_bancos"
          padding="xs"
        >
          <q-icon size="20px" name="question_mark" color="primary"> </q-icon>
        </q-btn>
        <q-btn flat dense>
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
      auto-close
      :mini="!drawer || miniState"
      @click="miniState = false"
      content-class="bg-grey-3"
    >
      <q-list>
        <div>
          <q-list class="rounded-borders">
            <q-item clickable tag="a" to="/dashboard" exact>
              <q-item-section avatar>
                <q-icon size="28px" name="home" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("Menu.dashboard") }}</q-item-label>
                <q-item-label caption></q-item-label>
              </q-item-section>
            </q-item>
            <q-expansion-item
              expand-separator
              icon="dashboard"
              group="somegroup"
              default-opened
              label="Operaciones"
              expanded="desplegable"
              v-model="desplegable"
            >
              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                group="somegroup2"
                default-opened
                icon="assignment"
                label="Relacion de despacho"
                expanded="desplegable2"
                v-model="desplegable2"
              >
                <q-item clickable tag="a" to="/operativa" exact>
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

                <q-item clickable tag="a" to="/costos" exact>
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
                group="somegroup2"
                default-opened
                icon="directions_bus_filled"
                label="Costos de Transporte"
                expanded="desplegable3"
                v-model="desplegable3"
              >
                <q-item clickable tag="a" to="/registrodecostos" exact>
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

                <q-item clickable tag="a" to="/reportedecostos" exact>
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
                <q-item clickable tag="a" to="/pruebasentrega" exact>
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
              v-model="cuarto"
              group="somegroup"
              default-opened
            >
              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/registroserviciocarga" exact>
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
                <q-item clickable tag="a" to="/facturacioncredito" exact>
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
                <q-item clickable tag="a" to="/anulacionguias" exact>
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
                <q-item clickable tag="a" to="/emitircarta" exact>
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
              group="somegroup"
              default-opened
              v-model="quinto"
              label="Administracion"
            >
              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                group="somegroup2"
                default-opened
                expanded="sexto"
                v-model="sexto"
                icon="menu_book"
                label="Notas Contables"
              >
                <q-item clickable tag="a" to="/notasdebito" exact>
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
                <q-item clickable tag="a" to="/notascredito" exact>
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
                <q-item clickable tag="a" to="/anulacionnotascontables" exact>
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
                <q-item clickable tag="a" to="/cuentasporcobrar" exact>
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
                group="somegroup2"
                default-opened
                v-model="septimo"
                icon="price_check"
                label="Cuentas por Pagar"
              >
                <q-item clickable tag="a" to="/ingresocuentaspagar" exact>
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
                <q-item clickable tag="a" to="/controlpagosproveedores" exact>
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
                v-model="octavo"
                group="somegroup2"
                default-opened
                icon="list"
                label="Control de Comisiones"
              >
                <q-item clickable tag="a" to="/generarcomisiones" exact>
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
                <q-item clickable tag="a" to="/pagocomisiones" exact>
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
                <q-item clickable tag="a" to="/retencioncomprador" exact>
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
                  to="/relacionretencionescomprador"
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
                v-model="noveno"
                group="somegroup2"
                default-opened
                icon="paid"
                label="Movimientos Bancarios"
              >
                <q-item clickable tag="a" to="/ingresomovimientos" exact>
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
                <q-item clickable tag="a" to="/relacionmovimientos" exact>
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
                <q-item clickable tag="a" to="/estadogananciasperdidas" exact>
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
              v-model="decimo"
              icon="summarize"
              group="somegroup"
              default-opened
              label="Consultas y Reportes"
            >
              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/reporteventas" exact>
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
                <q-item clickable tag="a" to="/librocompras" exact>
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
                <q-item clickable tag="a" to="/libroventas" exact>
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
                  to="/pagospendientesproveedores"
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
                  to="/pagosrealizadosproveedores"
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
                <q-item clickable tag="a" to="/relacionretenciones" exact>
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
                <q-item clickable tag="a" to="/controlretencionesislr" exact>
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
                <q-item clickable tag="a" to="/controlretencionesiva" exact>
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
              group="somegroup"
              default-opened
              v-model="decimoprimero"
              label="Mantenimiento"
            >
              <q-expansion-item
                :header-inset-level="0.4"
                :content-inset-level="0.9"
                expand-separator
                expanded="decimosegundo"
                v-model="decimosegundo"
                group="somegroup2"
                default-opened
                icon="table_rows"
                label="Datos Generales"
              >
                <q-item
                  tag="a"
                  exact
                  @click="$router.replace('/agencias')"
                  :clickable="this.disabledAgencias"
                  :disable="this.disabledAgenciasSet"
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
                <q-item clickable tag="a" to="/agentes" exact>
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
                  exact
                  @click="$router.replace('/paisestadociudad')"
                  :clickable="this.disabledCiudades"
                  :disable="this.disabledCiudadesSet"
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
                <q-item clickable tag="a" to="/zonasagencia" exact>
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
                <q-item clickable tag="a" to="/unidadestransporte" exact>
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
                <q-item clickable tag="a" to="/ayudantes" exact>
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
                <q-item clickable tag="a" to="/receptores" exact>
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
                <q-item clickable tag="a" to="/tarifas" exact>
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
                <q-item clickable tag="a" to="/controlcorrelativo" exact>
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
                <q-item clickable tag="a" to="/variablecontrol" exact>
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
                v-model="decimotercero"
                group="somegroup2"
                default-opened
                icon="widgets"
                label="Registros Basicos"
              >
                <q-item
                  tag="a"
                  @click="$router.replace('/bancos')"
                  exact
                  :clickable="this.disabledBancos"
                  :disable="this.disabledBancosSet"
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
                <q-item clickable tag="a" to="/cuentasbancarias" exact>
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
                <q-item clickable tag="a" to="/clientes" exact>
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
                <q-item clickable tag="a" to="/empleados" exact>
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
                <q-item clickable tag="a" to="/proveedores" exact>
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
                <q-item clickable tag="a" to="/retenciones" exact>
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
                <q-item clickable tag="a" to="/conceptosoperacion" exact>
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
                <q-item clickable tag="a" to="/conceptosfacturacion" exact>
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
                <q-item clickable tag="a" to="/conceptosfpo" exact>
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
                <q-item clickable tag="a" to="/asignacionguias" exact>
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
                group="somegroup2"
                default-opened
                v-model="decimocuarto"
                label="Seguridad"
              >
                <q-item
                  tag="a"
                  exact
                  @click="$router.replace('/roles')"
                  :clickable="this.disabledRoles"
                  :disable="this.disabledRolesSet"
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
                  @click="$router.replace('/usuarios')"
                  :clickable="this.disabledUsuarios"
                  :disable="this.disabledUsuariosSet"
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
                  @click="$router.replace('/permisologia')"
                  :clickable="this.disabledPermisos"
                  :disable="this.disabledPermisosSet"
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
                <q-item clickable tag="a" to="/transferencia" exact>
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
                <q-item clickable tag="a" to="/transferenciahidroca" exact>
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
                <q-item clickable tag="a" to="/cargamanualguias" exact>
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
    </q-drawer>

    <keep-alive>
      <router-view
        @mouseover="
          miniState = true;
          desplegable = hide;
          desplegable2 = hide;
          desplegable3 = hide;
          segundo = hide;
          tercero = hide;
          cuarto = hide;
          quinto = hide;
          sexto = hide;
          septimo = hide;
          octavo = hide;
          noveno = hide;
          decimo = hide;
          decimoprimero = hide;
          decimosegundo = hide;
          decimotercero = hide;
          decimocuarto = hide;
        "
      />
    </keep-alive>
    <q-page-container> </q-page-container>

    <q-footer elevated bordered>
      <div class="float-left buttons" style="margin-top: 10px;margin-bottom:10px; margin-left: 15px">
        <q-btn
          dense
          color="white"
          round
          style="margin-right: 15px"
          clickable
          to="/m_bancos"
          padding="xs"
        >
          <q-icon size="25px" name="public" color="primary">
            <q-tooltip
            transition-show="flip-right"
            transition-hide="flip-left"
            class="bg-primary"
            style="max-height: 30px"
            color="primary"
            max-height="40px"
            >Inicio</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn
          dense
          color="white"
          round
          style="margin-right: 15px"
          clickable
          to="/m_bancos"
          padding="xs"
        >
          <q-icon size="25px" name="person" color="primary">
            <q-tooltip
            transition-show="flip-right"
            transition-hide="flip-left"
            class="bg-primary"
            style="max-height: 30px"
            color="primary"
            max-height="40px"
            >Inicio</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn
          dense
          color="white"
          round
          style="margin-right: 15px"
          clickable
          to="/m_bancos"
          padding="xs"
        >
          <q-icon size="25px" name="front_hand" color="primary">
            <q-tooltip
            transition-show="flip-right"
            transition-hide="flip-left"
            class="bg-primary"
            style="max-height: 30px"
            color="primary"
            max-height="40px"
            >Inicio</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn
          dense
          color="white"
          round
          style="margin-right: 15px"
          clickable
          to="/m_bancos"
          padding="xs"
        >
          <q-icon size="25px" name="import_contacts" color="primary">
            <q-tooltip
            transition-show="flip-right"
            transition-hide="flip-left"
            class="bg-primary"
            style="max-height: 30px"
            color="primary"
            max-height="40px"
            >Inicio</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn
          dense
          color="white"
          round
          style="margin-right: 15px"
          clickable
          to="/m_bancos"
          padding="xs"
        >
          <q-icon size="25px" name="notifications" color="primary">
            <q-tooltip
            transition-show="flip-right"
            transition-hide="flip-left"
            class="bg-primary"
            style="max-height: 30px"
            color="primary"
            max-height="40px"
            >Inicio</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn
          dense
          color="white"
          round
          style="margin-right: 15px"
          clickable
          to="/m_bancos"
          padding="xs"
        >
          <q-icon size="25px" name="lock" color="primary">
            <q-tooltip
            transition-show="flip-right"
            transition-hide="flip-left"
            class="bg-primary"
            style="max-height: 30px"
            color="primary"
            max-height="40px"
            >Inicio</q-tooltip>
          </q-icon>
        </q-btn>
        <q-btn
          dense
          color="white"
          round
          style="margin-right: 15px"
          clickable
          to="/m_bancos"
          padding="xs"
        >
          <q-icon size="25px" name="settings" color="primary">
            <q-tooltip
            transition-show="flip-right"
            transition-hide="flip-left"
            class="bg-primary"
            style="max-height: 30px"
            color="primary"
            max-height="40px"
            >Inicio</q-tooltip>
          </q-icon>
        </q-btn>
      </div>
      <div class="text-caption float-right items-center creditos">
        <p style="font-size: 12px; margin-right: 20px; padding-top:16px">
        <strong>© 2019. LOS DERECHOS RESERVADOS. RCS EXPRESS</strong>
        </p>
      </div>
      <desactivate-crud
        ref="desactivateCrud"
        @desactivar-Opciones-Set="desactivarOpcionesSet"
      ></desactivate-crud>
      <user-logout ref="component"></user-logout>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { defineComponent, defineAsyncComponent } from "vue";
import desactivateCrudVue from "src/components/desactivateCrud.vue";
import userLogoutVue from "src/components/userLogout.vue";

export default ({
  name: "PageIndex",
  components: {
    "desactivate-crud": desactivateCrudVue,
    "user-logout": userLogoutVue,
  },
  data() {
    return {
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      desplegable: false,
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
    this.resetLogoutTimer()
    this.miniState = true;
    this.drawer = true;
    this.Authenticator();
    this.refreshTimer();
    this.$refs.desactivateCrud.desactivarOpciones(
      "desactivarOpcionesSet",
      "r_bancos",
      "r_agencias",
      "r_ciudades",
      "r_permisos",
      "r_usuarios",
      "r_roles"
    );
  },
  methods: {
    desactivarOpcionesSet(
      readBancos,
      readAgencias,
      readCiudades,
      readPermisos,
      readUsuarios,
      readRoles
    ) {
      if (readBancos == true) {
        this.disabledBancos = true;
        this.disabledBancosSet = false;
      }
      if (readAgencias == true) {
        this.disabledAgencias = true;
        this.disabledAgenciasSet = false;
      }
      if (readCiudades == true) {
        this.disabledCiudades = true;
        this.disabledCiudadesSet = false;
      }
      if (readPermisos == true) {
        this.disabledPermisos = true;
        this.disabledPermisosSet = false;
      }
      if (readUsuarios == true) {
        this.disabledUsuarios = true;
        this.disabledUsuariosSet = false;
      }
      if (readRoles == true) {
        this.disabledRoles = true;
        this.disabledRolesSet = false;
      }
    },
    drawerClick() {
      if (this.miniState) {
        this.miniState = false;
        this.drawer = true;
      } else {
        this.miniState = true;
        this.drawer = true;
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
      let _this = this
      var interval;
      let minutes = 19.5;
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
          if (currentTime > targetTime) {
            clearInterval(interval);
            LocalStorage.remove("currentTime");
            LocalStorage.remove("targetTime");
            _this.$refs.component.refreshToken()
            _this.refreshTimer()
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
      let _this = this
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
            _this.$refs.component.logoutUser()
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
    float: inherit
  }
}
</style>
