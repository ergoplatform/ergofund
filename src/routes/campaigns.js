import express from 'express';
var router = express.Router();
import { getAllCampaigns } from '../controllers/campaigns'

router.get('/', async function(req, res, next) {
  var allCampaigns = await getAllCampaigns(0);
  res.json(allCampaigns);
});

export default router;