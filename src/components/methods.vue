<template>
</template>
    
<script>
import { LocalStorage } from 'quasar';
import { api } from "boot/axios";
import { useQuasar } from "quasar";

  export default {
    name: "userLogout",
    data: function() {
      return {
    }
  },

    setup() {
    const $q = useQuasar();
    return {
      errorDelServidor() {
        this.$emit('resetLoading')
        $q.notify({
          message: this.error,
          color: "red",
        });
      },
      añadidoConExito() {
        $q.notify({
          message: "Agregado exitosamente",
          color: "green",
        });
      },
      editadoConExito() {
        $q.notify({
          message: "Editado exitosamente",
          color: "green",
        });
      },
      eliminadoConExito() {
        $q.notify({
          message: "Eliminado exitosamente",
          color: "green",
        });
      },
    };
  },

    methods: {
      getData: function(url, llamada, dataRes, header) {
      header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      api.get(url, header)
      .then((res) => {
        this.$emit(llamada, res.data, dataRes)
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
      });
      },
      getDataEdit: function(url, llamada, dataRes, header) {
      header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      api.get(url, header)
      .then((res) => {
        this.$emit(llamada, res.data, dataRes)
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error = "400")) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          }
          this.errorDelServidor();
        });
      },
      deleteData: function(url, llamada, header) {
      header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      api.delete(url, header)
      .then((res) => {
        if ((res.status = 200)) {
            this.$emit(llamada)
            this.eliminadoConExito();
          }
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.status;
          }
          if ((this.error === 400)) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          };
          if ((this.error === 500)) {
            this.error =
              "Este elemento tiene otros elementos asociados... Eliminalos primero";
          };
          this.errorDelServidor();
        });
      },
      createData: function(url, form, llamada, header) {
      header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      api.post(url, form, header)
      .then((res) => {
        if ((res.status = 200)) {
            this.$emit(llamada)
            this.añadidoConExito();
          }
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error === 400)) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          };
          if ((this.error === 409)) {
            this.error =
              "El elemento ya existe en la tabla. Por favor verificalo...";
          };
          this.errorDelServidor();
        });
      },
      putData: function(url, form, llamada, header) {
      header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      api.put(url, form, header)
      .then((res) => {
          if ((res.status = 200)) {
            this.$emit(llamada)
            this.editadoConExito();
          }
        })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.statusCode;
          }
          if ((this.error === 400)) {
            this.error =
              "Hubo un Error en la Carga de los Datos, Contacta con el Administrador del Sistema";
          };
          if ((this.error === 500)) {
            this.error =
              "Este elemento tiene otros elementos asociados... Eliminalos primero";
          };
          if ((this.error === 409)) {
            this.error =
              "El elemento ya existe en la tabla. Por favor verificalo...";
          };
          this.errorDelServidor();
        });
      },
  },
};
</script>