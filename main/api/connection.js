import mysql from 'mysql'

const config = require('../../config/db.js')

const { host, user, password, database } = config


const connection = mysql.createConnection({
  host, user, password, database
})



export const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, function (error, results) {
      if (error) reject(error)
      console.log(results)
      resolve(results)
    })
  })
}


export default connection