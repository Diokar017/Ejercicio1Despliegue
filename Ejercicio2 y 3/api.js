const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo:27017/nombreDB', { useNewUrlParser: true, useUnifiedTopology: true });

const NombreSchema = new mongoose.Schema({
    nombre: String
});

const NombreModel = mongoose.model('Nombre', NombreSchema);

app.post('/guardarNombre', async (req, res) => {
    const nombre = req.body.nombre; 
    const nuevoNombre = new NombreModel({ nombre });
    await nuevoNombre.save();
    res.send('Nombre guardado');
});

app.get('/obtenerNombre', async (req, res) => {
    const nombres = await NombreModel.find();
    res.json(nombres);
});

app.listen(3000, () => {
    console.log('API corriendo en el puerto 3000');
});