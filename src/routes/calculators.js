const express = require('express');
const router = express.Router();

// Profit Margin Calculator Endpoint
router.get('/profit-margin', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/calculators/profit-margin-calculator.html'));
});

// Add routes for other calculators similarly

module.exports = router;