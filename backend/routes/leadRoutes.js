const express = require("express");
const router = express.Router();
const Lead = require("../models/lead");


router.post("/", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.json(lead);
});


router.get("/", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});


router.put("/:id", async (req, res) => {
  const updatedLead = await Lead.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedLead);
});


router.delete("/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead deleted" });
});

module.exports = router;