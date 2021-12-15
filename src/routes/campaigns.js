import express from 'express';
var router = express.Router();
import { getAllCampaigns } from '../controllers/campaigns'

router.get('/', async function(req, res, next) {
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;
  var allCampaigns = await getAllCampaigns(limit, offset);
  res.json(allCampaigns);
});

export default router;