import axios from "axios";

export const getSystemConfig = () => {
    return axios.get(`/config/web/v1`)
}