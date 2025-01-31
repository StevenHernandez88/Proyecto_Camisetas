const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./utils/Config');
const logger = require('./utils/logger');

// Importar routers
const clienteRouter = require('./routers/ClienteRouter');
const artistaRouter = require('./routers/ArtistaRouter');
const usuarioRouter = require('./routers/UsuarioRouter');
const estampaRouter = require('./routers/EstampaRouter');
const modeloRouter = require('./routers/ModeloRouter');
const ratingsRouter = require('./routers/RatingsRouter');
const camisetasRouter = require('./routers/CamisetasRouter');
const pedidosRouter = require('./routers/PedidosRouter');
const detallesPedidosRouter = require('./routers/DetallesPedidosRouter');
const categoriaRouter = require('./routers/CategoriaRouter');

const administradorRouter = require('./routers/AdministradorRouter');


app.use(cors({
    origin: '*', 
    methods: '*', 
    allowedHeaders: '*', 
}));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Usar routers
app.use(clienteRouter);
app.use(artistaRouter);
app.use(usuarioRouter);
app.use(estampaRouter);
app.use(modeloRouter);
app.use(ratingsRouter);
app.use(camisetasRouter);
app.use(pedidosRouter);
app.use(detallesPedidosRouter);
app.use(categoriaRouter);


app.use(administradorRouter);

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
});
