import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { colors } from './assets/colors.js'

import buffer from 'buffer'
const { Buffer } = buffer

if (!window.Buffer) window.Buffer = Buffer

const { circus } = colors

import App from './App.vue'

import { createVuetify } from 'vuetify'

// Vuetify
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import VueKonva from 'vue-konva'

const pinia = createPinia()
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: 'circus',
    themes: {
      circus
    },
    options: { customProperties: true }
  },
  components,
  directives
})

createApp(App).use(VueKonva).use(pinia).use(vuetify).mount('#app')
