import axios from 'axios';

class Explorer {
    
    constructor(uri) {
        this.backend = axios.create({
            baseURL: uri,
            timeout: 5000,
            headers: {"Content-Type": "application/json"}
        })
    }

    async getTxsByAddress(address) {
        return this.backend.get(
            `/api/v1/addresses/${address}/transactions`
        ).then(res => res.data.items)
    }

}

export default Explorer;