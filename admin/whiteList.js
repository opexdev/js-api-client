import axios from "axios";

export const adminGetWhiteList = () => {
    return axios.get('/admin/system/v1/whitelist')
}

export const adminUpdateWhiteList = (whiteListData) => {
    return axios.post('/admin/system/v1/whitelist', {data:whiteListData})
};

export const adminDeleteWhiteList = (whiteListData) => {
    return axios.delete('/admin/system/v1/whitelist', {data:whiteListData})
};

