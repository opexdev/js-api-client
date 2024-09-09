import axios from "axios";

export const sendWithdrawReq = async (withdrawRequestData) => {
    return axios.post(`/wallet/withdraw`, withdrawRequestData)
}