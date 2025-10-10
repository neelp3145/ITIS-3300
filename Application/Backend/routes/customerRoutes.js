const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Customer = require("../models/customerModel");
const Order = require("../models/orderModel");

//validation of Object id 

function validateObjectId(id, res) {
  if (!mongoose.isValidObjectId(id)){
    res.status(400).json({ error: "Invalid ID"});
    return false;
  }
  return true;
}

// GET all /customers

router.get("/", async(req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
});

//POST new customer
router.post("/", async(req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message})
  }
})

//Get single customer and their order if they have
router.get("/:id", async(req, res) => {
  try{
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found"})
    }

    const orders = await Order.find({ customer: req.params.id})
    res.json({ customer, orders });
  } catch (err) {
    res.status(500).json({ error: err.message})
  }
});

//Put update customer

router.put("/:id", async(req, res) => {
  try{
    const updated = await Customermer.findByIdandUpdate(req.params.id, req.body, {
      new: true, 
      runValidators: true
    }); 
    if (!updated) {
      return res.status(400).json({ error: "Customer not found"})
    }
  } catch (err) {
    res.status(400).json({error: err.message});
  }
});

// DELETE customer (and optionally their orders)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Customer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Customer not found" });

    // also remove their orders
    await Order.deleteMany({ customer: req.params.id });
    res.json({ message: "Customer and their orders deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all orders of a specific customer
router.get("/:id/orders", async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST new order for a specific customer
router.post("/:id/orders", async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      customer: req.params.id,
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;