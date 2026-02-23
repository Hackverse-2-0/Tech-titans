const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get("/:farmerId", async (req, res) => {
  try {
    const farmerId = req.params.farmerId;

   
    const totalEarnings = await pool.query(
      "SELECT COALESCE(SUM(total_amount),0) FROM orders WHERE farmer_id=$1",
      [farmerId]
    );

   
    const totalOrders = await pool.query(
      "SELECT COUNT(*) FROM orders WHERE farmer_id=$1",
      [farmerId]
    );

    
    const monthlyEarnings = await pool.query(`
      SELECT 
        TO_CHAR(created_at,'Mon') as month,
        SUM(total_amount) as earnings
      FROM orders
      WHERE farmer_id=$1
      GROUP BY month
      ORDER BY MIN(created_at)
    `,[farmerId]);

    
    const cropSales = await pool.query(`
      SELECT p.name as crop,
      SUM(o.quantity) as sales
      FROM orders o
      JOIN products p ON o.product_id = p.id
      WHERE p.farmer_id=$1
      GROUP BY p.name
    `,[farmerId]);

    
    const topCrop = cropSales.rows.length > 0
      ? cropSales.rows.sort((a,b)=>b.sales-a.sales)[0].crop
      : "N/A";

    res.json({
      totalEarnings: totalEarnings.rows[0].coalesce,
      totalOrders: totalOrders.rows[0].count,
      monthlyEarnings: monthlyEarnings.rows,
      cropSales: cropSales.rows,
      topCrop
    });

  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;