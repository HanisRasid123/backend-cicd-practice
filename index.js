const express = require('express')
const app = express()
const mysql = require('mysql2')

const PORT = 3000

app.use(express.json())

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'book_shop'
})

app.listen(PORT, ()=> {
  console.log(`Server is listening on port ${PORT}...`)
})

app.get("/user", (req, res)=>{
  conn.query("SELECT * FROM users;", (err, rows)=>{
    if (err) {
      res.send({message: "Error querying the database."})
    }
    else {
      res.status(200).send(rows)
    }
  })
})

app.post("/createUser", (req, res)=>{
  const {name, password} = req.body

  if(!name || !password) {
    res.status(418).send({message: 'We need a name to create a user!'})
  }
  else {
    conn.query(`INSERT INTO users (name, password) values ('${name}','${password}')`, (err) => {
      if (err) {
        res.send({message: "Error querying the database"})
      }
    })
    res.status(200).send({message: "Successfully added user to the database"})
  }
})
