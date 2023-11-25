import axios from "axios";

export const adminGetWhiteList = () => {
    return axios.get('/system/v1/whitelist')
}

export const adminUpdateWhiteList = (whiteListData) => {
    return axios.post('/system/v1/whitelist', whiteListData)
};

export const adminDeleteWhiteList = (whiteListData) => {
    return axios.delete('/system/v1/whitelist', whiteListData)
};

