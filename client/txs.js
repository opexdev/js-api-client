import axios from "axios";

export const getDepositTxs = (currency, timestamp = Date.now().toString()) => {
    const params = new URLSearchParams();
    params.append('coin', currency.toUpperCase());
    params.append('timestamp', timestamp);
    return axios.get(`/sapi/v1/capital/deposit/hisrec?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getWithdrawTxs = (currency, timestamp = Date.now().toString()) => {
    const params = new URLSearchParams();
    params.append('coin', currency.toUpperCase());
    params.append('timestamp', timestamp);
    return axios.get(`/sapi/v1/capital/withdraw/history?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getTransactionHistory = (user_id, query) => {
    return axios.post(`/wallet/transaction/${user_id}`, query)
}


