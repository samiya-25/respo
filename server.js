const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root@123456$',
    database: 'forma',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required' });
    }

    console.log(' Received form data:', req.body);

    const sql = 'INSERT INTO contact (name, email) VALUES (?, ?)';
    db.query(sql, [name, email,], (err, result) => {
        if (err) {
            console.error('Insert error:', err.message);
            return res.status(500).json({
                message: 'Database erro',
                error: err.message
            });
        }

        console.log(' Data inserted:', result.insertId);
        res.status(200).json({ message: 'Form submitted successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
