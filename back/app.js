const Express = require("express");
const Cors = require("cors");
const db = require("./data/db");
const EventoController = require("./controllers/eventosController");
const UserController = require("./controllers/usersController");
const { authenticateToken, authenticateAdmin } = require("./config/auth");

const app = Express();
const PORT = process.env.PORT || 3001;

app.use(Express.json());
app.use(Cors());

app.get("/eventos", EventoController.getAllEventos);
app.get("/eventos/search", EventoController.searchEventosByName); 
app.get("/eventos/:id", EventoController.getEventoById);
app.post("/eventos", authenticateAdmin, EventoController.createEvento);
app.put("/eventos/:id", authenticateAdmin, EventoController.updateEvento);
app.delete("/eventos/:id", authenticateAdmin, EventoController.deleteEvento);

app.post("/register", UserController.register);
app.post("/login", UserController.login);

app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Acceso a ruta protegida", user: req.user });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

db.sync({ force: true }).then(() => {
  require("./seeders/eventosSeeder")(); 
});
