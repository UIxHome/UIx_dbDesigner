<script setup>
const fs = window.require('fs')
import MDBReader from 'mdb-reader'

const listDatabases = [
  'winagend.mdb'//,
  // 'winanad.mdb',
  // 'winanas.mdb',
  // 'WinEtiquettes.mdb',
  // 'wingecom.mdb',
  // 'WinLamelles.mdb',
  // 'winstock.mdb'
]

listDatabases.forEach((dbName) => {
  const buffer = fs.readFileSync(`W://Access/Bd01/${dbName}`)
  const reader = new MDBReader(buffer)

  const listTables = reader.getTableNames() // ['Cats', 'Dogs', 'Cars']
  listTables.forEach((tableName) => {
    const table = reader.getTable(tableName)
    table.getColumnNames() // ['id', 'name', 'color']
    console.log('dbName | ', dbName, ' | tableName | ', tableName, table.getData()) // [{id: 5, name: 'Ashley', color: 'black'}, ...]
  })
})
</script>
