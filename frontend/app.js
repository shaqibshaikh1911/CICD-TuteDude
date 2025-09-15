const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: "Frontend is working on port 3000",
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Express frontend running on http://0.0.0.0:${port}`);
});