<script setup>
import { reactive } from 'vue'

import { app } from 'electron'
const adodb = require('node-adodb')
if (app.isPackaged) {
  adodb.PATH = './resources/adodb.js'
}

async function connectToDatabase() {
  const connectionString = 'Provider=Microsoft.Jet.OLEDB.4.0;Data Source=NBI_winagend'
  const connection = await adodb.open('ado', connectionString)
  console.log('Connection', connection)
  console.log('Connected to database')
  try {
    const query = 'SELECT * FROM Clients'
    const result = await connection.query(query)
    console.log(result)
  } catch (error) {
    console.error('Error executing query:', error)
  }
}

connectToDatabase()

const versions = reactive({ ...window.electron.process.versions })
</script>

<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
  </ul>
</template>
