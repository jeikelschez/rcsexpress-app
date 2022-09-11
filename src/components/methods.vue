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
        if (header == undefined) {
        header = {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`
          },
        }
      } else {
        header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      }
      api.get(url, header)
      .then((res) => {
        this.$emit(llamada, res.data, dataRes)
      })
      .catch((err) => {
          if (err.response) {console.log(err.response)
            this.error = err.response.data.message;
          }
          this.errorDelServidor();
          this.$emit('resetLoading')
      });
      },
      getDataEdit: function(url, llamada, dataRes, header) {
        if (header == undefined) {
        header = {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`
          },
        }
      } else {
        header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      }
      api.get(url, header)
      .then((res) => {
        this.$emit(llamada, res.data, dataRes)
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.message;
          }
          this.errorDelServidor();
          this.$emit('resetLoading')
        });
      },
      deleteData: function(url, llamada, header) {
        if (header == undefined) {
        header = {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`
          },
        }
      } else {
        header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      }
      api.delete(url, header)
      .then((res) => {
        if ((res.status = 200)) {
            this.$emit(llamada)
            this.eliminadoConExito();
          }
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.message;
          }
          this.errorDelServidor();
          this.$emit('resetLoading')
        });
      },
      createData: function(url, form, llamada, header) {
      if (header == undefined) {
        header = {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`
          },
        }
      } else {
        header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      }
      api.post(url, form, header)
      .then((res) => {
        if ((res.status = 200)) {
            this.$emit(llamada)
            this.añadidoConExito();
          }
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.message;
          }
          this.errorDelServidor();
          this.$emit('resetLoading')
        });
      },
      login: function(url, form, llamada, header) {
        if (header == undefined) {
        header = {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`
          },
        }
      } else {
        header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      }
      api.post(url, form, header)
      .then((res) => {
        if ((res.status = 200)) {
          this.$emit(llamada, res.data)
        }
      })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.message;
          }
          this.errorDelServidor();
        });
      },
      putData: function(url, form, llamada, header) {
        if (header == undefined) {
        header = {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem("token")}`
          },
        }
      } else {
        header.headers.Authorization = `Bearer ${LocalStorage.getItem("token")}`
      }
      api.put(url, form, header)
      .then((res) => {
          if ((res.status = 200)) {
            this.$emit(llamada)
            this.editadoConExito();
          }
        })
      .catch((err) => {
          if (err.response) {
            this.error = err.response.data.message;
          }
          this.errorDelServidor();
        });
      },
  },
};
</script>