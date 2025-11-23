const express = require("express");
const router = express.Router();
const housingController = require("../controllers/housingcontroller");

// Get all housing (with optional type filter via query parameter)
router.get("/", housingController.Index);

// Get housing by ID
router.get("/:id", housingController.GetById);

module.exports = router;