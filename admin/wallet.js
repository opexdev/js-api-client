import axios from "axios";

/*export const getWalletData = (user_id, query) => {
    return axios.post(`/wallet/transaction/`, params)
}*/

export const adminGetWalletData = (params) => {
    return axios.get(`/wallet/admin/wallets`, {
        params: params
    })
}