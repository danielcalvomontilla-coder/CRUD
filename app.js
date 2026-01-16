const express = require('express');
const app = express();
const routes = require('./routes/usersRoutes');
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/usuarios'));
app.use('/usuarios', routes);
app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }));


app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));;





