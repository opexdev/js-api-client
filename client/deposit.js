import axios from "axios";

export const getDepositAddress = (currency, network, timestamp = Date.now().toString()) => {
    const params = new URLSearchParams();
    params.append('coin', currency.toUpperCase());
    params.append('network', network);
    params.append('timestamp', timestamp);
    return axios.get(`/sapi/v1/capital/deposit/address?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}