import axios from "axios";

export const adminGetWithdrawsReq = (status, page, perPage) => {
    const params = {
        offset: perPage * (page - 1),
        size: perPage,
        ...(status && {status})
    }
    return axios.get('/wallet/admin/withdraw', {params})
}
export const adminGetWithdrawReqById = (withdraw_id) => {
    return axios.get("/wallet/admin/withdraw/", {
        params: {
            withdraw_id,
            offset: 0,
            size: 1
        }
    })
}
export const adminSetWithdrawStatus = (id, withdrawState, withdrawExp) => {
    const params = new URLSearchParams();
    if (withdrawState === "accept") {
        params.append('fee', "0");
        params.append('destTransactionRef', withdrawExp);
    } else {
        params.append('statusReason', withdrawExp);
    }
    return axios.post(`/wallet/admin/withdraw/${id}/${withdrawState}`, params, {
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
    })
}