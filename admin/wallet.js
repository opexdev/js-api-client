import axios from "axios";

/*export const getWalletData = (user_id, query) => {
    return axios.post(`/wallet/transaction/`, params)
}*/

export const adminGetWalletData = (params) => {
    return axios.get(`/wallet/admin/wallets`, {
        params: params
    })
}

export const adminGetChains = () => {
    return axios.get('/v1/chain')
}



export const adminGetAddressByChain = (chainId) => {
    return axios.get(`/v1/chain/${chainId}/address`)
}

export const adminGetAllBalanceByChain = (chainId, params) => {
    return axios.get(`/v1/balance/${chainId}`, {
        params: params
    })
}

export const adminGetTotalBalance = () => {
    return axios.get(`/v1/balance/total`)
}

export const adminGetTotalBalanceByChain = (chainId) => {
    return axios.get(`/v1/balance/${chainId}/total`)
}
