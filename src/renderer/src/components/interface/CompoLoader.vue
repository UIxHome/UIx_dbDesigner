<template>
  <div class="loader">
    <div class="loader__box">
      <v-progress-circular class="loader__progress_circular" indeterminate :size="40" :width="5">
      </v-progress-circular>

      <p class="loader__message">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { mainStore } from '@/store'

export default {
  name: 'CompoLoader',
  components: {},
  props: {
    msg: {
      type: String,
      default: 'Chargement en cours...'
    }
  },
  setup() {
    const store = mainStore()
    const storeState = storeToRefs(store)

    const widgetEvent = ref({})
    watch(storeState.widgetEvent, (event) => {
      widgetEvent.value = event
    })

    return {
      store
    }
  },
  data() {}
}
</script>
<style scoped>
.loader {
  text-align: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader__box {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: gainsboro;
  border-radius: 10px;
}

.loader__progress_circular {
  color: #457173;
}

.loader__message {
  margin-left: 2rem;
  color: cadetblue;
}
</style>
