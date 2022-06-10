<template>
  <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
    <q-card class="my-card">
      <q-img
        src="~assets/principal.jpg"
        srcset="~assets/principal.jpg,
             ~assets/principal.jpg 1.5x,
             ~assets/principal.jpg 2x"
        basic
      >
      </q-img>
    </q-card>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CardWithImage'
})
</script>
