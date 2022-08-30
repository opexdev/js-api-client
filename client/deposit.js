import axios from "axios";

export const getDepositAddress = (currency, timestamp = Date.now().toString()) => {
    const params = new URLSearchParams();
    params.append('coin', currency.toUpperCase());
    params.append('timestamp', timestamp);
    return axios.get(`/sapi/v1/capital/deposit/address?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}