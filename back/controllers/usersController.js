const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = "your_jwt_secret_key";

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, role });

    res.status(201).json({ message: "Usuario registrado con éxito", user });
  } catch (error) {
    res.status(400).json({ error: "Error al registrar el usuario" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Email o contraseña incorrectos" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
    res.json({ token, email: user.email, role: user.role });
  } catch (error) {
    res.status(400).json({ error: "Error al iniciar sesión" });
  }
};
