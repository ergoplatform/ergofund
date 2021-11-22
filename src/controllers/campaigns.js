import config from "../config";
import { createClient } from "redis";

export async function getAllCampaigns(offset) {
  const redis = createClient();
  await redis.connect();

  const campaignBoxes = await redis.get('campaignBoxes');

  redis.disconnect();

  return JSON.parse(campaignBoxes);
}
