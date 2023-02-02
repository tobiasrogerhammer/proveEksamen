const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql');
const { response } = require('express');
const bodyParser = require('body-parser');
const port = 3001;


app.use(bodyParser.json());
app.use(cors({
    origin: "*",
}))

const db = mysql.createConnection({
    host: 'localhost',
    port: '8889',
    user: 'root',
    password: 'root',
    database: 'kurs'
})

db.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
    } else {
        console.log('Successfully connected to the database.');
    }
});

app.get("/kurs", (req, res) => {
    db.query("SELECT * FROM kurs;", (err, result) => {
        res.send(JSON.stringify({ data: result }));
    });
});

app.post("/kurs", (req, res) => {
    const { personID, fornavn, etternavn, adresse, postnummer, poststed } = req.body;
    const sql = `
      INSERT INTO Deltaker (personID, Fornavn, Etternavn, Adresse, Postnummer, Poststed)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [personID, fornavn, etternavn, adresse, postnummer, poststed];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      return res.sendStatus(201);
    });
  });
       
  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})




app.get("/kursholder", (req, res) => {
    db.query("SELECT * FROM kursholder;", (err, result) => {
        res.send(JSON.stringify({ data: result }));
    });
});

app.get("/deltaker", (req, res) => {
    db.query("SELECT * FROM deltaker;", (err, result) => {
        res.send(JSON.stringify({ data: result }));
    });
});

app.get("/login", (req, res) => {
    db.query("SELECT * FROM deltaker;", (err, result) => {
        res.send(JSON.stringify({ data: result }));
    });
});