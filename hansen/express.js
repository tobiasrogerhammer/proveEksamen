const express = require('express')
const app = express()
const cors = require('cors')
const mysql = require('mysql');
const { response } = require('express');
const port = 3001;

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
    db.query("SELECT * FROM kurs", (err, result) => {
        res.send(JSON.stringify({ data: result }));
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})