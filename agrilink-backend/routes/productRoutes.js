const express = require("express");
const { PrismaClient } = require("@prisma/client");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const prisma = new PrismaClient();
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        farmer: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


router.post(
  "/",
  protect,
  authorize(["farmer"]),
  async (req, res) => {
    try {
      const { title, description, price, imageUrl } = req.body;

      const product = await prisma.product.create({
        data: {
          title,
          description,
          price: parseFloat(price),
          imageUrl: imageUrl || null,
          farmerId: req.user.id
        }
      });

      res.status(201).json(product);
    } catch (error) {
      console.error("CREATE PRODUCT ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/:id",
  protect,
  authorize(["farmer"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, price, imageUrl } = req.body;

      const product = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          price: parseFloat(price),
          imageUrl
        }
      });

      res.json(product);
    } catch (error) {
      console.error("UPDATE PRODUCT ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  }
);


router.delete(
  "/:id",
  protect,
  authorize(["farmer"]),
  async (req, res) => {
    try {
      const { id } = req.params;

      await prisma.product.delete({
        where: { id: Number(id) }
      });

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("DELETE PRODUCT ERROR:", error);
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;