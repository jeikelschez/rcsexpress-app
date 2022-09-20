<template>
  <q-page class="paginaManual q-pa-md">
    <div class="row q-pa-sm justify-center">
      <div class="col-md-12 col-xl-12 col-lg-12 col-xs-12 col-sm-12">
        <div class="row">
          <div
            class="col-md-12 col-xs-12 text-secondary"
            style="align-self: center; text-align: left"
          >
            <h4 style="font-size: 32px">
              <strong>MANUAL DE USO Y CONTROL - BANCOS</strong>
            </h4>
          </div>
          <q-toolbar
            class="bg-primary text-white shadow-2 rounded-borders col-md-12 col-xs-12"
            style="padding: 15px"
          >
            <q-btn
              flat
              round
              dense
              icon="menu"
              class="col-md-1 col-xs-1 hideMenuManual"
              style="margin-right: 20px"
            />

            <q-separator class="hideSeparatorManual" dark vertical inset />

            <q-input
              v-model="filter"
              class="col-md-10 col-xs-10 inputManual"
              rounded
              color="white"
              dark
              dense
              outlined
              standout
              type="search"
              label="¿Necesitas algo? Buscalo"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-toolbar>
        </div>
        <div class="col-md-12 col-xs-12" style="margin-top: 30px" >
          <q-card class="my-card">
            <q-img src="~assets/bancos.png"> </q-img>
          </q-card>
        </div>
        <div class="col-md-12 col-xs-12" style="margin-top: 30px" >
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h3 text-primary" style="margin-top: 15px; margin-bottom: 25px; margin-left: 10px;">
        <q-icon name="add_box" style="margin-right:16px"/>
        <strong>¿COMO AGREGAR UN BANCO?</strong></div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p style="font-size:17px">Para agregar un Banco, los pasos que debes seguir son los siguientes:</p>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-list bordered>
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-8 col-xs-12 textMovil">
        Para agregar un Banco al listado deberas hacer click en el Boton "Insertar Banco".
        </q-item-section>
        <q-item-section class="col-md-4 col-xs-12 imageManualMovil">
          <q-img src="~assets/bancosAdd.jpg" style="width:200px; align-self: center;"> </q-img>
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosAdd.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      <q-list bordered style="margin-top:20px">
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-8 col-xs-12 textMovil">
        Luego se abrira un formulario en el cual podras indicar los datos del Banco que deseas agregar.
        </q-item-section>
        <q-item-section class="col-md-4 col-xs-12 imageManualMovil">
          <q-img src="~assets/bancosAdd2.jpg" style="width:200px; align-self: center;"> </q-img>
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosAdd2.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      <q-list bordered style="margin-top:20px">
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-8 col-xs-12 textMovil">
        Al terminar de colocar los datos del formulario, has click en el boton "Añadir Banco", y el banco sera añadido al listado.
        </q-item-section>
        <q-item-section class="col-md-4 col-xs-12 imageManualMovil">
          <q-img src="~assets/bancosAdd3.jpg" style="width:200px; align-self: center;"> </q-img>
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosAdd3.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="my-card" style="margin-top: 30px">
      <q-card-section>
        <div class="text-h3 text-primary" style="margin-top: 15px; margin-bottom: 25px; margin-left: 10px;">
        <q-icon name="edit_note" style="margin-right:16px"/>
        <strong>¿COMO EDITAR UN BANCO?</strong></div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p style="font-size:17px">Para Editar un Banco, los pasos que debes seguir son los siguientes:</p>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-list bordered>
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-8 col-xs-12 textMovil">
        Para editar un Banco deberas hacer click en el Boton de Editar, del elemento que desees modificar.
        </q-item-section>
        <q-item-section class="col-md-4 col-xs-12 imageManualMovil">
          <q-img src="~assets/bancosEdit.jpg" style="width:200px; align-self: center;"> </q-img>
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosEdit.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      <q-list bordered style="margin-top:20px">
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-8 col-xs-12 textMovil">
        Luego se abrira un formulario en el cual estara la información del Banco, alli podras modificarla.
        </q-item-section>
        <q-item-section class="col-md-4 col-xs-12 imageManualMovil">
          <q-img src="~assets/bancosEdit2.jpg" style="width:200px; align-self: center;"> </q-img>
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosEdit2.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      <q-list bordered style="margin-top:20px">
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-8 col-xs-12 textMovil">
        Al terminar de modificar los datos del formulario, has click en el boton "Editar Banco", y el banco sera actualizado en el listado.
        </q-item-section>
        <q-item-section class="col-md-4 col-xs-12 imageManualMovil">
          <q-img src="~assets/bancosEdit3.jpg" style="width:200px; align-self: center;"> </q-img>
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosEdit3.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="my-card" style="margin-top: 30px">
      <q-card-section>
        <div class="text-h3 text-primary" style="margin-top: 15px; margin-bottom: 25px; margin-left: 10px;">
        <q-icon name="delete" style="margin-right:16px"/>
        <strong>¿COMO ELIMINAR UN BANCO?</strong></div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p style="font-size:17px">Para Eliminar un Banco, los pasos que debes seguir son los siguientes:</p>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-list bordered>
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-8 col-xs-12 textMovil">
        Para Eliminar un Banco deberas hacer click en el Boton de Eliminar, del elemento que desees eliminar.
        </q-item-section>
        <q-item-section class="col-md-4 col-xs-12 imageManualMovil">
          <q-img src="~assets/bancosDelete.jpg" style="width:200px; align-self: center;"> </q-img>
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosDelete.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      <q-list bordered style="margin-top:20px">
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-8 col-xs-12 textMovil">
        Luego se desplegara un aviso preguntandote si estas seguro de eliminar el elemento, selecciona la opcion Aceptar si estas seguro (Esta acción no se puede modificar).
        </q-item-section>
        <q-item-section class="col-md-4 col-xs-12 imageManualMovil">
          <q-img src="~assets/bancosDelete2.jpg" style="width:200px; align-self: center;"> </q-img>
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosDelete2.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      <q-list bordered style="margin-top:20px">
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-8 col-xs-12 textMovil">
        Al aceptar el elemento seleccionado se eliminara automaticamente del listado.
        </q-item-section>
        <q-item-section class="col-md-4 col-xs-12 imageManualMovil">
          <q-img src="~assets/bancosDelete3.jpg" style="width:200px; align-self: center;"> </q-img>
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosDelete3.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      </q-card-section>
    </q-card>
    <q-card flat bordered class="my-card" style="margin-top: 30px">
      <q-card-section>
        <div class="text-h3 text-primary" style="margin-top: 15px; margin-bottom: 25px; margin-left: 10px;">
        <q-icon name="error" style="margin-right:16px"/>
        <strong>POSIBLES ERRORES</strong></div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p style="font-size:17px">Si alguno de los errores a mencionar ocurre, los pasos que debes seguir son los siguientes:</p>
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <q-list bordered>
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-12 col-xs-12 textMovil" style="margin-bottom: 20px">
        <div class="text-h5 text-primary" style="margin-top: 15px; margin-bottom: 25px; margin-left: 10px;">
        <strong>Error "Este elemento tiene otros elementos asociados... Eliminalos primero"</strong></div>
        Si aparece este error significa que el elemento que intentas Eliminar, tiene una o varias Cuentas Bancarias asociadas, deberas eliminarlas primero.
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosError.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      <q-list bordered style="margin-top: 20px">
      <q-item clickable v-ripple class="col-md-12 col-xs-12">
        <q-item-section class="col-md-12 col-xs-12 textMovil" style="margin-bottom: 20px">
        <div class="text-h5 text-primary" style="margin-top: 15px; margin-bottom: 25px; margin-left: 10px;">
        <strong>Error "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema"</strong></div>
        Si aparece este error significa que hubo un problema al solicitar o enviar los datos. Deberas contactar con el Administrador del sistema para identificar al problema.
        </q-item-section>
      </q-item>
      <div class="col-md-12 col-xs-12 imageManualPc" style="padding: 20px" >
          <q-card class="my-card">
            <q-img src="~assets/bancosError.jpg"> </q-img>
          </q-card>
      </div>
      </q-list>
      </q-card-section>
    </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { defineComponent, defineAsyncComponent } from "vue";
import userLogoutVue from "src/components/userLogout.vue";

export default defineComponent({
  name: "Manual",
  components: {
    "user-logout": userLogoutVue,
  },
  data() {
    return {
      drawer: false,
      miniState: false,
      dashboard: this.$t("Menu.dashboard"),
      picture:
        "https://www.thepeakid.com/wp-content/uploads/2016/03/default-profile-picture.jpg",
    };
  },
  setup() {
    return {
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
