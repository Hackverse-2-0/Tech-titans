const express = require("express");
const { PrismaClient } = require("@prisma/client");
const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", protect, authorize(["buyer"]), async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await prisma.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const order = await prisma.order.create({
      data: {
        buyerId: req.user.id,
        farmerId: product.farmerId,
        productId: product.id,
        quantity: Number(quantity),
        status: "PENDING",
      },
      include: {
        product: true,
        buyer: true,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/farmer", protect, authorize(["farmer"]), async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { farmerId: req.user.id },
      include: {
        product: true,
        buyer: true,
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (error) {
    console.error("GET FARMER ORDERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


router.put("/:id/accept", protect, authorize(["farmer"]), async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status: "ACCEPTED" },
    });

    res.json(order);
  } catch (error) {
    console.error("ACCEPT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


router.put("/:id/reject", protect, authorize(["farmer"]), async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status: "REJECTED" },
    });

    res.json(order);
  } catch (error) {
    console.error("REJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


router.put("/:id/deliver", protect, authorize(["farmer"]), async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status: "DELIVERED" },
    });

    res.json(order);
  } catch (error) {
    console.error("DELIVER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;