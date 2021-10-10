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
      :mini="!drawer || miniState"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-list>
        <q-item clickable tag="a" to="/dashboard" exact>
          <q-item-section avatar>
            <q-icon size="35px" name="home_work" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.dashboard') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.dashboard') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable tag="a" to="/sales" exact>
          <q-item-section avatar>
            <q-icon size="35px" name="pending_actions" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.sales') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.sales') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable tag="a" to="/operations" exact>
          <q-item-section avatar>
            <q-icon size="35px" name="settings_applications" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.operations') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.operations') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable tag="a" to="/administration" exact>
          <q-item-section avatar>
            <q-icon size="35px" name="add_task" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.administration') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.administration') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable tag="a" to="/reports" exact>
          <q-item-section avatar>
            <q-icon size="35px" name="table_view" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.reports') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.reports') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable tag="a" to="/system" exact>
          <q-item-section avatar>
            <q-icon size="35px" name="system_update" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.system') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.system') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-ripple clickable tag="a" to="/maintenance" exact>
          <q-item-section avatar>
            <q-icon size="35px" name="build" />
            <q-tooltip
              v-if="miniState"
              anchor="center right"
              self="center left"
              :offset="[10, 10]"
              transition-show="scale"
              transition-hide="scale"
            >
              <div class="tool">{{ $t('Menu.maintenance') }}</div>
            </q-tooltip>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ $t('Menu.maintenance') }}</q-item-label>
            <q-item-label caption></q-item-label>
          </q-item-section>
        </q-item>
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
