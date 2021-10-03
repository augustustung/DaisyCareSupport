import axios from './axios'

const userGetAllAdminOnline = (userId, token) => {
    return axios.get(`/api/get-all-channel-online?userId=${userId}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).catch(e => {
        return e.response.status
    })
}

const adminGetAllConversation = (adminId, token) => {
    return axios.get(`/api/get-all-user-inbox?adminId=${adminId}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).catch(e => {
        return e.response.status
    })
}

const getDetailConversation = (id, token, role) => {
    return axios.get(`/api/get-detail-inbox?id=${id}&role=${role}`, {
        headers: { Authorization: `Bearer ${token}`}
    }).catch(e => {
        return e.response.status
    })
}

const sendMessage = (data) => {
    return axios.post(`/api/send-message`,data, {
        headers: { Authorization: `Bearer ${data.token}`}
    }).catch(e => {
        return e.response.status
    })
}

const getToken = (data) => {
    return axios.post('/refresh-token', data , {
        headers: { Authorization: `Bearer ${data.token}`}
    }).catch(e => {
        return e.response.status
    })
}

export {
    userGetAllAdminOnline,
    getDetailConversation,
    sendMessage,
    getToken,
    adminGetAllConversation
}