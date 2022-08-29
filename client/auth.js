import axios from "axios";

const clientIdEnv = window.env.REACT_APP_CLIENT_ID
const clientSecretEnv = window.env.REACT_APP_CLIENT_SECRET

export const userRegister = (user, panelToken) => {
    return axios.post('/auth/realms/opex/user-management/user', user, {
        headers: {
            "Authorization": "Bearer " + panelToken
        }
    })
}

export const login = (credential, agent, clientId = clientIdEnv, clientSecret = clientSecretEnv, grantType = 'password') => {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('username', credential.username);
    params.append('password', credential.password);
    params.append('otp', credential.otp);
    params.append('agent', agent);
    params.append('grant_type', grantType);
    params.append('client_secret', clientSecret);
    return axios.post('/auth/realms/opex/protocol/openid-connect/token', params)
};

export const logout = () => {
    return axios.post(`/auth/realms/opex/user-management/user/logout`)
}

export const getTokenByRefreshToken = (refreshToken, clientId = clientIdEnv, clientSecret = clientSecretEnv) => {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);
    return axios.post('/auth/realms/opex/protocol/openid-connect/token', params);
}

export const getPanelToken = async (clientId = clientIdEnv, clientSecret = clientSecretEnv, grantType = 'client_credentials') => {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', grantType);
    return axios.post('/auth/realms/opex/protocol/openid-connect/token', params)
}

export const getCaptchaImage = () => {
    return axios.post(`/captcha/session`, null, {
        headers: {
            'Accept': 'image/jpeg'
        },
        responseType: "arraybuffer"
    })
};

export const requestForForgetPassword = (email, captcha) => {
    return axios.post(`/auth/realms/opex/user-management/user/request-forgot?email=${email}&captcha=${captcha}`, null)
}

export const forgotPassword = (key, password, passwordConfirmation) => {
    const payload = {
        password,
        passwordConfirmation
    }
    return axios.put(`/auth/realms/opex/user-management/user/forgot?key=${key}`, payload)
}

export const requestForActivateOTP = () => {
    return axios.get(`/auth/realms/opex/user-management/user/security/otp`)
}

export const sendInitialCodeToActivateOTP = (secret, initialCode) => {
    const payload = {
        "secret": secret,
        "initialCode": initialCode
    }
    return axios.post(`/auth/realms/opex/user-management/user/security/otp`, payload)
}

export const requestForDeActiveOTP = () => {
    return axios.delete(`/auth/realms/opex/user-management/user/security/otp`)
}

export const requestForChangePassword = (payload) => {
    return axios.put(`/auth/realms/opex/user-management/user/security/password`, payload)
}

export const setUserProfileAttributes = (profile) => {
    return axios.post('/auth/realms/opex/user-profile', profile)
}

export const sendFileToUserStorage = (userId, file) => {
    const data = new FormData();
    data.append('file', file);
    return axios.post(`/storage/${userId}`, data)
}
export const setKycFileToUserAttributes = (Path) => {
    return axios.post('/auth/realms/opex/user-profile/kyc', Path)
}

export const parseToken = (data) => {
    return {
        accessToken: data.access_token,
        accessTokenExpires: Date.now() + data.expires_in * 1000,
        refreshToken: data.refresh_token,
        refreshTokenExpires: Date.now() + data.refresh_expires_in * 1000,
    }
}

export const getKycStatus = () => {
    return axios.get('/auth/realms/opex/user-profile/kyc/status');
}

export const getUserAccount = () => {
    const params = new URLSearchParams();
    params.append('timestamp', Date.now().toString());
    return axios.get(`/api/v3/account?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
}

export const parseWalletsResponse = (res) => {
    let wallets = {}
    res.balances?.forEach((wallet) => {
        wallets[wallet.asset.toUpperCase()] = {
            free: parseFloat(wallet.free.toFixed(6)),
            locked: parseFloat(wallet.locked.toFixed(6)),
            withdraw: parseFloat(wallet.withdraw.toFixed(6)),
        }
    })
    delete res.balances;
    return {
        ...res,
        wallets: wallets,
    };
}

export const getUserAssets = (quoteAsset, calculateEvaluation = "true") => {
    const params = new URLSearchParams();
    params.append('quoteAsset', quoteAsset);
    params.append('calculateEvaluation', calculateEvaluation);
    return axios.get(`/api/v1/asset/getUserAsset?${params.toString()}`, {
        data: params,
    })
}
export const getUserAssetsEstimatedValue = (quoteAsset) => {
    const params = new URLSearchParams();
    params.append('quoteAsset', quoteAsset);
    return axios.get(`/api/v1/asset/estimatedValue?${params.toString()}`, {
        data: params,
    })
}


export const getUserAttributes = () => {
    return axios.get(`/auth/realms/opex/user-profile`);
}

export const checkUserOtpConfigs = async (username, clientId = clientIdEnv, clientSecret = clientSecretEnv) => {
    const {data: {access_token}} = await getPanelToken(clientId, clientSecret);
    const params = new URLSearchParams();
    params.append('username', username);
    return axios.get(`/auth/realms/opex/user-management/user/security/check?${params.toString()}`, {
        data: params,
        headers: {
            'Authorization': `Bearer ${access_token}`,
        },
    })
}