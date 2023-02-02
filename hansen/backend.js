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
    port: '3306',
    user: 'root',
    password: '',
    database: 'kurs'
})

db.connect((err) => {
    if (err) {
        console.log('Error connecting to the database:', err);
    } else {
        console.log('Successfully connected to the database.');
    }
});


app.get("/deltaker", (req, res) => {
    db.query("SELECT * FROM deltaker;", (err, result) => {
        res.send(JSON.stringify({ data: result }));
    });
});

app.delete("/deltaker", (req, res) => {
    const { fornavn } = req.body;
    const sql = `
    DELETE FROM Deltaker
    WHERE Fornavn = ?
    `;
    
    db.query(sql, [fornavn], (err, result) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
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

app.get("/kursholder", (req, res) => {
    db.query("SELECT * FROM kursholder;", (err, result) => {
        res.send(JSON.stringify({ data: result }));
    });
});

app.get("/login", (req, res) => {
    db.query("SELECT * FROM deltaker;", (err, result) => {
        res.send(JSON.stringify({ data: result }));
    });
});

app.get("/kurs", (req, res) => {
    db.query("SELECT * FROM kurs;", (err, result) => {
        res.send(JSON.stringify({ data: result }));
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})