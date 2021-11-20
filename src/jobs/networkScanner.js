import axios from "axios";
import config from "../config";

class Scanner {

    static controlBoxScanName = 'Control Box';
    static tokensaleBoxScanName = 'Tokensale Box';
    static campaignBoxesScanName = 'Tokensale Box';

    constructor(uri) {
        this.backend = axios.create({
            baseURL: uri,
            timeout: 5000,
            headers: {"Content-Type": "applications/json"}
        })

        this.controlBoxScanId = 1;  // TODO: read this id from storage
        this.tokensaleBoxScanId = 33;  // TODO: read this id from storage
        this.campaignBoxesScanId = 34;  // TODO: read this id from storage
    }

    async listAllScans() {
        return this.backend.get(
            '/scan/listAll'
        ).then(res => res.data)
    }

    /**
     * Registers the control box to be scanned by the scanner
     * The control box is distinguished by an NFT with the following ID:
     *     72c3fbce3243d491d81eb564cdab1662b1f8d4c7e312b88870cec79b7cfd4321 
     */
    async registerControlBox() {
        return this.backend.post(
            '/scan/register', {
                'scanName': controlBoxScanName,
                'trackingRule': {
                    'predicate': 'containsAsset',
                    'assetId': '72c3fbce3243d491d81eb564cdab1662b1f8d4c7e312b88870cec79b7cfd4321'
                }
            }
        ).then(res => res.data)  // TODO: save the scanId in storage
    }

    /**
     * Registers the tokensale box to be scanned by the scanner
     * The tokensale box is distinguished by an NFT with the following ID:
     *     15b0ae41c24230069ff96dacbac0932850ac0c2a0924daf72a39e88cbcf3acd5
     */
    async registerTokensaleBox() {
        return this.backend.post(
            '/scan/register', {
                'scanName': tokensaleBoxScanName,
                'trackingRule': {
                    'predicate': 'containsAsset',
                    'assetId': '15b0ae41c24230069ff96dacbac0932850ac0c2a0924daf72a39e88cbcf3acd5'
                }
            }
        ).then(res => res.data)  // TODO: save the scanId in storage
    }

    /**
     * Registers the campaign boxes to be scanned by the scanner
     * The campaign boxes contain a specific token with the following ID:
     *     05b66b97e5802f6447b67fe30cb4055e14d6b17bb14f5f563d65c9622c43a659
     * can not be spent (address = 4MQyMKvMbnCJG3aJ)
     */
    async registerCampaignBoxes() {
        return this.backend.post(
            '/scan/register', {
                'scanName': campaignBoxesScanName,
                'trackingRule': {
                    'predicate': 'containsAsset',
                    'assetId': '05b66b97e5802f6447b67fe30cb4055e14d6b17bb14f5f563d65c9622c43a659'
                }  // TODO: validate additional conditions like the value and the registers
            }
        ).then(res => res.data)  // TODO: save the scanId in storage
    }

    async getControlBox() {
        return this.backend.get(
            `/scan/unspentBoxes/${this.controlBoxScanId}`
        ).then(res => res.data)
    }

    async getTokensaleBox() {
        return this.backend.get(
            `/scan/unspentBoxes/${this.tokensaleBoxScanId}`
        ).then(res => res.data)
    }

    async getCampaignBoxes() {
        return this.backend.get(
            `/scan/unspentBoxes/${this.campaignBoxesScanId}`
        ).then(res => res.data)
    }
}

(async() => {
    var scanner = new Scanner(config.scanner.baseUri);

    const allScans = await scanner.listAllScans();

    // tell the scanner to search for control box if it is already not searching
    const controlBoxScans = allScans.filter(scan => scan.scanName == Scanner.controlBoxScanName)
    if (controlBoxScans.length == 0) {
        scanner.registerControlBox();
    }

    // tell the scanner to search for campaign boxes if it is already not searching
    const campaignBoxesScans = allScans.filter(scan => scan.scanName == Scanner.campaignBoxesScanName)
    if (campaignBoxesScans.length == 0) {
        scanner.registerCampaignBoxes();
    }

    const campaignBoxes = await scanner.getCampaignBoxes();
    console.log(campaignBoxes);

    // TODO: store campaigns in the database
})();