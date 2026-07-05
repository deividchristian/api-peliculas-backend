const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON

// Nuestra "Base de datos" en memoria
// Nuestra "Base de datos" en memoria para Favoritos
let favoritos = [];
let idFavoritoActual = 1;

// 1. CREATE: Agregar a favoritos
app.post('/api/favoritos', (req, res) => {
    const nuevoFavorito = {
        id: idFavoritoActual++,
        movieId: req.body.movieId,
        titulo: req.body.titulo,
        poster: req.body.poster,
        rating: req.body.rating,
        fecha_guardado: req.body.fecha_guardado || new Date().toISOString()
    };
    // Evitar duplicados por movieId
    if (!favoritos.find(f => f.movieId === nuevoFavorito.movieId)) {
        favoritos.push(nuevoFavorito);
    }
    res.status(201).json(nuevoFavorito);
});

// 2. READ: Obtener todos los favoritos
app.get('/api/favoritos', (req, res) => {
    res.status(200).json(favoritos);
});

// 3. DELETE: Eliminar de favoritos (usando el id interno)
app.delete('/api/favoritos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    favoritos = favoritos.filter(f => f.id !== id);
    res.status(200).json({ mensaje: "Favorito eliminado" });
});

// Arrancar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API corriendo en el puerto ${PORT}`);
});