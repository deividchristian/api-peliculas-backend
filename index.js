const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- BASES DE DATOS EN MEMORIA ---
let carrito = [];
let idCarritoActual = 1;

let favoritos = [];
let idFavoritoActual = 1;

// ==========================================
//          RUTAS DEL CARRITO
// ==========================================

app.post('/api/carrito', (req, res) => {
    const nuevaPelicula = {
        id: idCarritoActual++,
        movieId: req.body.movieId,
        titulo: req.body.titulo,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        poster: req.body.poster
    };
    carrito.push(nuevaPelicula);
    res.status(201).json(nuevaPelicula);
});

app.get('/api/carrito', (req, res) => {
    res.status(200).json(carrito);
});

app.put('/api/carrito/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = carrito.findIndex(p => p.id === id);
    if (index !== -1) {
        carrito[index].cantidad = req.body.cantidad;
        res.status(200).json(carrito[index]);
    } else {
        res.status(404).json({ mensaje: "Película no encontrada en el carrito" });
    }
});

app.delete('/api/carrito/:id', (req, res) => {
    const id = parseInt(req.params.id);
    carrito = carrito.filter(p => p.id !== id);
    res.status(200).json({ mensaje: "Eliminada del carrito" });
});

// ==========================================
//          RUTAS DE FAVORITOS
// ==========================================

app.post('/api/favoritos', (req, res) => {
    const nuevoFavorito = {
        id: idFavoritoActual++,
        movieId: req.body.movieId,
        titulo: req.body.titulo,
        poster: req.body.poster,
        rating: req.body.rating,
        fecha_guardado: req.body.fecha_guardado || new Date().toISOString()
    };
    if (!favoritos.find(f => f.movieId === nuevoFavorito.movieId)) {
        favoritos.push(nuevoFavorito);
    }
    res.status(201).json(nuevoFavorito);
});

app.get('/api/favoritos', (req, res) => {
    res.status(200).json(favoritos);
});

app.delete('/api/favoritos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    favoritos = favoritos.filter(f => f.id !== id);
    res.status(200).json({ mensaje: "Favorito eliminado" });
});

// --- ARRANCAR SERVIDOR ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`);
});