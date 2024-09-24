import axios from "axios";

export const sendWithdrawReq = async (withdrawRequestData) => {
    return axios.post(`/wallet/withdraw`, withdrawRequestData)
}

export const cancelWithdrawReq = async (withdrawId) => {
    return axios.post(`/wallet/withdraw/${withdrawId}/cancel`)
}