import axios from "axios";

export const getActiveSessions = () => {
    return axios.get(`/auth/realms/opex/user-management/user/sessions`);
}
export const expireAllSessionsExceptCurrent  = () => {
    return axios.post(`/auth/realms/opex/user-management/user/sessions/logout`)
}
export const expireSessionById  = (id) => {
    return axios.post(`/auth/realms/opex/user-management/user/sessions/${id}/logout`)
}