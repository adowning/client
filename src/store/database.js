import lowdb from 'lowdb'
// import FileSync from 'lowdb/adapters/LocalStorage'
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = lowdb(adapter)

db.defaults({
  users: [],
}).write()

export default db
