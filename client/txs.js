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


export const getTransactionsHistory = (query) => {
    return axios.post(`/wallet/v2/transaction`, query)
}



export const getBuyAndSellHistory = (user_id, query) => {
    return axios.post(`/market/v1/user/tx/${user_id}/history`, query)
}
export const getDepositHistory = (query) => {
    return axios.post(`/wallet/v1/deposit/history`, query)
}
export const getWithdrawHistory = (query) => {
    return axios.post(`/wallet/withdraw/history`, query)
}


