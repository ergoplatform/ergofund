import axios from "axios";
import config, { scanner } from "../config";

class Scanner {

    constructor(uri) {
        this.backend = axios.create({
            baseURL: uri,
            timeout: 5000,
            headers: {"Content-Type": "applications/json"}
        })

        this.controlBoxScanId = 1;  // TODO: read this id from storage
    }

    async registerControlBox() {
        return this.backend.post(
            '/scan/register', {
                'scanName': 'ControlBox NFT',
                'trackingRule': {
                    'predicate': 'containsAsset',
                    'assetId': '72c3fbce3243d491d81eb564cdab1662b1f8d4c7e312b88870cec79b7cfd4321'
                }
            }
        ).then(res => res.data)  // TODO: save the scanId in storage
    }

    async getControlBox() {
        return this.backend.get(
            `/scan/unspentBoxes/${this.controlBoxScanId}`
        ).then(res => res.data)
    }
}

// TODO: register campaign boxes in scanner if it is not already registered
// TODO: get campaigns from scanner
// TODO: store campaigns in the database

// FOR TEST PURPOSE:
(async() => {
    var scanner = new Scanner(config.scanner.baseUri);
    const controlBox = await scanner.getControlBox();
    console.log(controlBox);
})();