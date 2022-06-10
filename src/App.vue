<template>
  <router-view />
</template>
<script>
import { computed, defineComponent } from 'vue'
import userLogout from './components/userLogout.vue'

export default defineComponent({
  name: 'app',
  components: {
    userLogout
  }
})
</script>
