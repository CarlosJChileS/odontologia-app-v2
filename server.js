const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(express.json());

// Ruta para obtener los usuarios (lectura del archivo JSON)
app.get('/api/users', (req, res) => {
    const filePath = path.join(__dirname, 'users.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }
        res.json(JSON.parse(data));
    });
});

// Ruta para agregar un odontólogo (escribir en el archivo JSON)
app.post('/api/users', (req, res) => {
    const { email, password } = req.body;
    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo');
        }

        const users = JSON.parse(data);
        users.push({ email, password, role: 'odontologo' });

        fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Error al escribir el archivo');
            }
            res.status(200).send('Odontólogo agregado exitosamente');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
