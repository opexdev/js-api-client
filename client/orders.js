import axios from "axios";

export const createOrder = async (symbol, side, order, type = "LIMIT", timeInForce = "GTC", timestamp = Date.now().toString()) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('side', side);
    params.append('type', type);
    params.append('timeInForce', timeInForce);
    params.append('timestamp', timestamp);
    params.append('quantity', order.reqAmount.toString());
    params.append('price', order.pricePerUnit.toString());
    return axios.post(`/api/v3/order`, null, {
        params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const cancelOrderByOrderID = (symbol, orderId, timestamp = Date.now().toString()) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('orderId', orderId);
    params.append('timestamp', timestamp);

    return axios.delete(`/api/v3/order?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
    })
}

export const getOpenOrder = (symbol, recvWindow = "1", timestamp = Date.now().toString()) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('recvWindow', recvWindow);
    params.append('timestamp', timestamp);

    return axios.get(`/api/v3/openOrders?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getOrdersHistory = (symbol, recvWindow = "1", timestamp = Date.now().toString(), limit = "25") => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('recvWindow', recvWindow);
    params.append('timestamp', timestamp);
    params.append('limit', limit);

    return axios.get(`/api/v3/allOrders?${params.toString()}`, {
        data: params,
    })
}

export const getMyTrades = async (symbol, timestamp = Date.now().toString(), limit = "25") => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('startTime', "");
    params.append('endTime', "");
    params.append('timestamp', timestamp);
    params.append('limit', limit);

   return axios.get(`/api/v3/myTrades?${params.toString()}`, {
        data: params,
    })
}