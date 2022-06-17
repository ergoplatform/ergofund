import express from 'express';
var router = express.Router();

// This solves the problems with querying the API from local by modifying the port used by each one. 
// You have to install cors (npm install cors)
const cors = require('cors');
router.use(cors({
    origin: 'http://localhost:3001'
}));

router.get('/', cors(), function(req, res, next) {
  res.send('Hello World');
});

export default router;
