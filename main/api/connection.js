import mysql from 'mysql'

const config = require('../../config/db.js')

const { host, user, password, database } = config


const connection = mysql.createConnection({
  host, user, password, database
})


export default connection