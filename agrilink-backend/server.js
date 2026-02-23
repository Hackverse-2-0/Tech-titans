const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const { Pool } = require("pg");

dotenv.config();

const app = express();
const server = http.createServer(app);


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log(" PostgreSQL Connected"))
  .catch(err => console.log(" DB Error:", err));


app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/ordersRoutes"));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(" User Connected:", socket.id);

 
  socket.on("joinOrderRoom", ({ orderId, username }) => {
    if (!orderId) return;

    const roomName = `order_${orderId}`;
    socket.join(roomName);

    console.log(` ${username} joined room: ${roomName}`);
  });
 
  socket.on("sendMessage", ({ orderId, message }) => {
    if (!orderId || !message) return;

    const roomName = `order_${orderId}`;
    console.log(" Order Message:", message);

    io.to(roomName).emit("receiveMessage", message);
  });

  socket.on("disconnect", () => {
    console.log(" User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running on ${PORT}`);
});