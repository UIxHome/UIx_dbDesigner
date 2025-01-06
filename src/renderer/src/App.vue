<script setup>
import konva from './components/konva.vue'
// const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <v-layout>
    <v-app-bar ref="dropBar" density="compact" color="toolbar" class="primary--text" dark>
      <v-icon class="ml-4" size="x-large" color="white"> mdi-test-tube </v-icon>
      <v-toolbar-title class="primary-text-1">TITLE</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-tooltip:bottom="'Réinitialiser'"
        size="x-small"
        icon="mdi-close"
        variant="tonal"
        class="mx-2"
      >
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer color="toolbar" permanent fixed expand-on-hover rail>
      <v-list>
        <v-list-item class="px-2"> LOGO </v-list-item>
      </v-list>

      <v-divider></v-divider>
    </v-navigation-drawer>
    <konva></konva>
  </v-layout>
</template>
