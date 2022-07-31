import axios from "axios";

export const createOrder = async (symbol, side, order, type = "LIMIT") => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('side', side);
    params.append('type', type);
    params.append('timeInForce', "GTC");
    params.append('timestamp', Date.now().toString());
    params.append('quantity', order.reqAmount.toString());
    params.append('price', order.pricePerUnit.toString());
    return axios.post(`/api/v3/order`, null, {
        params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const cancelOrderByOrderID = (symbol, orderId) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('orderId', orderId);
    params.append('timestamp', Date.now().toString());

    return axios.delete(`/api/v3/order?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
    })
}

export const getOpenOrder = (symbol) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('recvWindow', "1");
    params.append('timestamp', Date.now().toString());

    return axios.get(`/api/v3/openOrders?${params.toString()}`, {
        data: params,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getOrdersHistory = (symbol) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('recvWindow', "1");
    params.append('timestamp', Date.now().toString());
    params.append('limit', "25");

    return axios.get(`/api/v3/allOrders?${params.toString()}`, {
        data: params,
    })
}

export const getMyTrades = async (symbol) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('startTime', "");
    params.append('endTime', "");
    params.append('timestamp', Date.now().toString());
    params.append('limit', "25");

   return axios.get(`/api/v3/myTrades?${params.toString()}`, {
        data: params,
    })
}