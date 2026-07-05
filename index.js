const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON

// Nuestra "Base de datos" en memoria
let carrito = [];
let idActual = 1;

// 1. CREATE: Agregar una película al carrito
app.post('/api/carrito', (req, res) => {
    const nuevaPelicula = {
        id: idActual++,
        movieId: req.body.movieId,
        titulo: req.body.titulo,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        poster: req.body.poster
    };
    carrito.push(nuevaPelicula);
    res.status(201).json(nuevaPelicula);
});

// 2. READ: Obtener todo el carrito
app.get('/api/carrito', (req, res) => {
    res.status(200).json(carrito);
});

// 3. UPDATE: Actualizar la cantidad de una película
app.put('/api/carrito/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = carrito.findIndex(p => p.id === id);
    
    if (index !== -1) {
        carrito[index].cantidad = req.body.cantidad;
        res.status(200).json(carrito[index]);
    } else {
        res.status(404).json({ mensaje: "Película no encontrada" });
    }
});

// 4. DELETE: Eliminar una película del carrito
app.delete('/api/carrito/:id', (req, res) => {
    const id = parseInt(req.params.id);
    carrito = carrito.filter(p => p.id !== id);
    res.status(200).json({ mensaje: "Eliminada correctamente" });
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`);
});