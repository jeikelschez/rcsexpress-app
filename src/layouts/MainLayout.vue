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
            <q-item clickable tag="a" to="/dashboard" exact>
              <q-item-section avatar>
                <q-icon size="28px" name="home" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ $t("Menu.dashboard") }}</q-item-label>
                <q-item-label caption></q-item-label>
              </q-item-section>
            </q-item>

            <!-- Operaciones -->
            <q-expansion-item expand-separator icon="dashboard" group="somegroup" default-opened label="Operaciones"
              expanded="desplegable" v-model="desplegable">
              <!-- Relacion de Despacho -->
              <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator group="somegroup2"
                default-opened icon="assignment" label="Relacion de despacho" expanded="desplegable2"
                v-model="desplegable2">
                <!-- Items clickeables -->
                <q-item clickable tag="a" to="/operativa" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="folder_open" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Costos") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Costos") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
              </q-expansion-item>

              <!-- Costos de Transporte -->
              <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator group="somegroup2"
                default-opened icon="directions_bus_filled" label="Costos de Transporte" expanded="desplegable3"
                v-model="desplegable3">
                <!-- Items clickeables -->
                <q-item clickable tag="a" to="/registrodecostos" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="paid" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

              <!-- Item Pruebas de Entrega -->
              <div class="q-pl-lg"> <!-- Clase para alinear item -->
                <q-item clickable tag="a" to="/pruebasentrega" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="auto_stories" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

            <!-- Ventas -->
            <q-expansion-item expand-separator icon="sell" label="Ventas" expanded="cuarto" v-model="cuarto"
              group="somegroup" default-opened>
              <!-- Item Pruebas de Entrega -->
              <div class="q-pl-lg"> <!-- Clase para alinear item -->
                <q-item clickable tag="a" to="/registroserviciocarga" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="local_shipping" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

            <!-- Administracion -->
            <q-expansion-item expand-separator icon="topic" expanded="quinto" group="somegroup" default-opened
              v-model="quinto" label="Administracion">
              <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator group="somegroup2"
                default-opened expanded="sexto" v-model="sexto" icon="menu_book" label="Notas Contables">
                <q-item clickable tag="a" to="/notasdebito" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="note_alt" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

              <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator expanded="septimo"
                group="somegroup2" default-opened v-model="septimo" icon="price_check" label="Cuentas por Pagar">
                <q-item clickable tag="a" to="/ingresocuentaspagar" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="keyboard_double_arrow_up" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

              <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator expanded="octavo"
                v-model="octavo" group="somegroup2" default-opened icon="list" label="Control de Comisiones">
                <q-item clickable tag="a" to="/generarcomisiones" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="payment" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                <q-item clickable tag="a" to="/relacionretencionescomprador" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="swap_horiz" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

              <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator expanded="noveno"
                v-model="noveno" group="somegroup2" default-opened icon="paid" label="Movimientos Bancarios">
                <q-item clickable tag="a" to="/ingresomovimientos" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="airplay" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

            <!-- Reportes -->
            <q-expansion-item expand-separator expanded="decimo" v-model="decimo" icon="summarize" group="somegroup"
              default-opened label="Consultas y Reportes">
              <div class="q-pl-lg">
                <q-item clickable tag="a" to="/reporteventas" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="receipt_long" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                <q-item clickable tag="a" to="/pagospendientesproveedores" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="notifications_active" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                <q-item clickable tag="a" to="/pagosrealizadosproveedores" exact>
                  <q-item-section avatar>
                    <q-icon size="28px" name="how_to_reg" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

            <!-- Mantenimiento -->
            <q-expansion-item expand-separator icon="settings_applications" expanded="decimoprimero" group="somegroup"
              default-opened v-model="decimoprimero" label="Mantenimiento">
              <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator
                expanded="decimosegundo" v-model="decimosegundo" group="somegroup2" default-opened icon="table_rows"
                label="Datos Generales">
                <q-item tag="a" exact @click="$router.replace('/agencias')" :clickable="this.disabledAgencias"
                  :disable="this.disabledAgenciasSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="corporate_fare" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Agencias") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Agencias") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/agentes')" :clickable="this.disabledAgentes"
                  :disable="this.disabledAgentesSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="people" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Agentes") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Agentes") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/paisestadociudad')" :clickable="this.disabledCiudades"
                  :disable="this.disabledCiudadesSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="place" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                <q-item tag="a" exact @click="$router.replace('/zonasagencia')" :clickable="this.disabledZonas"
                  :disable="this.disabledZonasSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="map" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.ZonasAgencia") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.ZonasAgencia") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/unidadestransporte')" :clickable="this.disabledUnidades"
                  :disable="this.disabledUnidadesSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="local_shipping" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                <q-item tag="a" exact @click="$router.replace('/ayudantes')" :clickable="this.disabledAyudantes"
                  :disable="this.disabledAyudantesSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="account_circle" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Ayudantes") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Ayudantes") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/receptores')" :clickable="this.disabledReceptores"
                  :disable="this.disabledReceptoresSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="compare_arrows" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Receptores") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Receptores") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/tarifas')" :clickable="this.disabledTarifas"
                  :disable="this.disabledTarifasSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="local_atm" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Tarifas") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Tarifas") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/controlcorrelativo')"
                  :clickable="this.disabledCcorrelativo" :disable="this.disabledCcorrelativoSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="point_of_sale" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                <q-item tag="a" exact @click="$router.replace('/variablecontrol')" :clickable="this.disabledVcontrol"
                  :disable="this.disabledVcontrolSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="settings_suggest" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

              <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator
                expanded="decimotercero" v-model="decimotercero" group="somegroup2" default-opened icon="widgets"
                label="Registros Basicos">
                <q-item tag="a" @click="$router.replace('/bancos')" exact :clickable="this.disabledBancos"
                  :disable="this.disabledBancosSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="account_balance" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Bancos") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Bancos") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/cuentasbancarias')" :clickable="this.disabledCuentas"
                  :disable="this.disabledCuentasSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="account_balance_wallet" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                <q-item tag="a" exact @click="$router.replace('/clientes')" :clickable="this.disabledClientes"
                  :disable="this.disabledClientesSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="groups" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Clientes") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Clientes") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/empleados')" :clickable="this.disabledEmpleados"
                  :disable="this.disabledEmpleadosSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="badge" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Empleados") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Empleados") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/proveedores')" :clickable="this.disabledProveedores"
                  :disable="this.disabledProveedoresSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="local_shipping" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Proveedores") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Proveedores") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/retenciones')" :clickable="this.disabledRetenciones"
                  :disable="this.disabledRetencionesSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="block" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Retenciones") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Retenciones") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/conceptosoperacion')"
                  :clickable="this.disabledConceptoOperacion" :disable="this.disabledConceptoOperacionSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="manage_search" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                <q-item tag="a" exact @click="$router.replace('/conceptosfacturacion')"
                  :clickable="this.disabledConceptoFacturacion" :disable="this.disabledConceptoFacturacionSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="sticky_note_2" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                <q-item tag="a" exact @click="$router.replace('/conceptosfpo')" :clickable="this.disabledConceptoFpo"
                  :disable="this.disabledConceptoFpoSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="subject" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.ConceptosFPO") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.ConceptosFPO") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/asignacionguias')"
                  :clickable="this.disabledAsignacionGuias" :disable="this.disabledAsignacionGuiasSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="menu_book" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

              <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator icon="security"
                expanded="decimocuarto" group="somegroup2" default-opened v-model="decimocuarto" label="Seguridad">
                <q-item tag="a" exact @click="$router.replace('/roles')" :clickable="this.disabledRoles"
                  :disable="this.disabledRolesSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="person_outline" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Roles") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Roles") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/usuarios')" :clickable="this.disabledUsuarios"
                  :disable="this.disabledUsuariosSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="person" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
                      <div class="tool">{{ $t("Menu.Usuarios") }}</div>
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ $t("Menu.Usuarios") }}</q-item-label>
                    <q-item-label caption></q-item-label>
                  </q-item-section>
                </q-item>
                <q-item tag="a" exact @click="$router.replace('/permisologia')" :clickable="this.disabledPermisos"
                  :disable="this.disabledPermisosSet">
                  <q-item-section avatar>
                    <q-icon size="28px" name="manage_accounts" />
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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
                    <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                      transition-show="scale" transition-hide="scale">
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

            <!-- MENUS -->
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
                  expanded="desplegable" v-model="desplegable">

                  <!-- Opcion de Prueba -- EXPANSION ITEM 
                  <div v-for="item in items">
                    <div v-if="item.level==1">
                      <div v-if=item.qitem class="q-pl-lg">
                        <q-item clickable tag="a" :to=item.url exact>
                          <q-item-section avatar>
                            <q-icon size="28px" :name=item.icon />
                            <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                              transition-show="scale" transition-hide="scale">
                              <div class="tool">{{ item.label }}</div>
                            </q-tooltip>
                          </q-item-section>
                          <q-item-section>
                            <q-item-label>{{ item.label }}</q-item-label>
                            <q-item-label caption></q-item-label>
                          </q-item-section>
                        </q-item>
                      </div>
                    </div>                    
                  </div> -->               
                  
                  <!-- Relacion de Despacho -->
                  <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator group="somegroup2"
                    default-opened icon="assignment" label="Relacion de despacho" expanded="desplegable2"
                    v-model="desplegable2">
                    <!-- Items clickeables -->
                    <q-item clickable tag="a" to="/operativa" exact>
                      <q-item-section avatar>
                        <q-icon size="28px" name="folder_open" />
                        <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                          transition-show="scale" transition-hide="scale">
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
                        <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                          transition-show="scale" transition-hide="scale">
                          <div class="tool">{{ $t("Menu.Costos") }}</div>
                        </q-tooltip>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ $t("Menu.Costos") }}</q-item-label>
                        <q-item-label caption></q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-expansion-item>

                  <!-- Costos de Transporte -->
                  <q-expansion-item :header-inset-level="0.4" :content-inset-level="0.9" expand-separator group="somegroup2"
                    default-opened icon="directions_bus_filled" label="Costos de Transporte" expanded="desplegable3"
                    v-model="desplegable3">
                    <!-- Items clickeables -->
                    <q-item clickable tag="a" to="/registrodecostos" exact>
                      <q-item-section avatar>
                        <q-icon size="28px" name="paid" />
                        <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                          transition-show="scale" transition-hide="scale">
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
                        <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                          transition-show="scale" transition-hide="scale">
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

                  <!-- Item Pruebas de Entrega -->
                  <div class="q-pl-lg"> <!-- Clase para alinear item -->
                    <q-item clickable tag="a" to="/pruebasentrega" exact>
                      <q-item-section avatar>
                        <q-icon size="28px" name="auto_stories" />
                        <q-tooltip v-if="miniState" anchor="center right" self="center left" :offset="[10, 10]"
                          transition-show="scale" transition-hide="scale">
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
              </div>              
            </div>

            
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
        { label: 'Inicio', level: 0, qitem: true, icon: "home", url: "/dashboard" },
        { label: 'Operaciones', level: 0, qitem: false, icon: "dashboard", url: "" },
        { label: 'Ventas', level: 0, qitem: false, icon: "sell", url: "" },
        { label: 'Administracion', level: 0, qitem: false, icon: "topic", url: "" },
        { label: 'Consultas y Reportes', level: 0, qitem: false, icon: "summarize", url: "" },
        { label: 'Mantenimiento', level: 0, qitem: false, icon: "settings_applications", url: "" },
        { label: 'Pruebas de entrega', level: 1, qitem: true, icon: "auto_stories", url: "/pruebasentrega" }
      ],
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
