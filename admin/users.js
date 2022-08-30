import axios from "axios";

const clientIdEnv = window.env.REACT_APP_CLIENT_ID
const clientSecretEnv = window.env.REACT_APP_CLIENT_SECRET

export const adminGetImpersonateLoginToken = (userId, clientId = clientIdEnv, clientSecret = clientSecretEnv) => {
    const params = {
        userId,
        clientId,
        clientSecret
    }
    return axios.post('/admin/auth/v1/user/impersonate', params)
}

export const adminGetUsersList = (page, perPage) => {
    return axios.get('/admin/auth/v1/user', {
        params: {
            offset: perPage * (page - 1),
            size: perPage
        }
    })
}

export const adminGetUsersListByGroup = (group , page, perPage) => {
    return axios.get(`/admin/auth/v1/group/${group}/members`, {
        params: {
            offset: perPage * (page - 1),
            size: perPage
        }
    })
}

export const adminGetUserInfo = (id) => {
    return axios.get('/admin/auth/v1/user/' + id)
}

export const adminGetUserAttributedImages = (url) => {
    return axios.get(`/storage/admin/download${url}`, {
            responseType: "arraybuffer"
        }
    )
}

export const adminSetUserGroup = (userId, group) => {
    return axios.post(`/admin/auth/v1/user/${userId}/join-kyc?kycGroup=${group}`)
}

export const adminSetUserKycStatus = (userId, status, reason = null) => {
    const url = status === "kyc-accepted" ? `/admin/auth/v1/user/${userId}/kyc/accept` : status === "kyc-rejected" ? `/admin/auth/v1/user/${userId}/kyc/reject?reason=${reason}` : status === "kyc-blocked" ? `/admin/auth/v1/user/${userId}/kyc/block?reason=${reason}` : null
    return axios.post(url)
}