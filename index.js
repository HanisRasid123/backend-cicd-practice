const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')
const config = require('config')

const PORT = 8080

app.use(express.json())
app.use(cors({origin: 'https://testcicd.controlpoint.healthrfid.com'}))

const conn = mysql.createConnection({
  host: config.get('db.host'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.database')
})

app.listen(PORT, ()=> {
  console.log(`Server is listening on port ${PORT}...`)
})

app.get("/products/:id", (req, res)=>{
  conn.query(`SELECT * FROM products where product_id = ${req.params.id};`, (err, product)=>{
    if (err) {
      res.send({message: "Error querying the database."})
    }
    else {
      console.log(product)
      res.status(200).send(product)
    }
  })
})

app.get("/products", (req,res) => {
  conn.query("SELECT * FROM products;", (err, rows) => {
    if (err) {
      res.send({message: "Error querying database."})
    }
    else {
      res.status(200).send(rows)
    }
  })
})

// app.post("/createUser", (req, res)=>{
//   const {name, password} = req.body

//   if(!name || !password) {
//     res.status(418).send({message: 'We need a name to create a user!'})
//   }
//   else {
//     conn.query(`INSERT INTO users (name, password) values ('${name}','${password}')`, (err) => {
//       if (err) {
//         res.send({message: "Error querying the database"})
//       }
//     })
//     res.status(200).send({message: "Successfully added user to the database"})
//   }
// })
