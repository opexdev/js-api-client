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

export const adminSetWithdrawStatus = (id, withdrawState, withdrawExp, destNote = null) => {
    let data = {};

    if (withdrawState === "accept") {
        data.destTransactionRef = withdrawExp;
        data.destNote = destNote;
    } else {
        data.reason = withdrawExp;
    }

    return axios.post(`/wallet/admin/withdraw/${id}/${withdrawState}`, data, {
        headers: { 'Content-Type': 'application/json' }
    });
};
