import axios from "axios";

export const adminGetWithdrawsReq = (status, page, perPage) => {
    const params = {
        offset: perPage * (page - 1),
        size: perPage,
    }
    return axios.post('/wallet/admin/withdraw/search', {
        "status": [status]
    },{
        params
    })
}

export const adminGetWithdrawReqById = (withdraw_id) => {
    return axios.get(`/wallet/admin/withdraw/${withdraw_id}`,)
}

export const adminSetWithdrawStatus = (id, withdrawState, withdrawExp) => {
    const params = new URLSearchParams();
    if (withdrawState === "accept") {
        params.append('destTransactionRef', withdrawExp);
    } else {
        params.append('reason', withdrawExp);
    }
    return axios.post(`/wallet/admin/withdraw/${id}/${withdrawState}`, params, {
        headers: {'Content-Type': "application/x-www-form-urlencoded"},
    })
}