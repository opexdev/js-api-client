import axios from "axios";

export const getLastPrices = () => {
    return axios.get(`/api/v3/ticker/price`)
}

export const getLastTrades = (symbol) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('limit', "25");
    return axios.get(`/api/v3/trades?${params.toString()}`, {
        data: params,
    })
}

export const getOrderBook = (symbol) => {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('limit', "20");
    return axios.get(`/api/v3/depth?${params.toString()}`, {
        data: params,
    })
}
export const getOverview = (symbol, period) => {
    const params = new URLSearchParams();
    if (symbol) params.append('symbol', symbol);
    return axios.get(`/api/v3/ticker/${period}?${params.toString()}`, {
        data: params,
    })
}

export const getMarketStats = (interval) => {
    const params = new URLSearchParams();
    params.append('interval', interval);
    params.append('limit', "10");
    return axios.get(`/api/v1/landing/marketStats?${params.toString()}`, {
        data: params,
    })
}
export const getExchangeInfo = (interval) => {
    const params = new URLSearchParams();
    params.append('interval', interval);
    return axios.get(`/api/v1/landing/marketStats?${params.toString()}`, {
        data: params,
    })
}
export const getGlobalPrices = (usdSymbol) => {
    const params = new URLSearchParams();
    params.append('usdSymbol', usdSymbol);
    return axios.get(`/api/v1/landing/globalPrices?${params.toString()}`, {
        data: params,
    })
}

export const getChartData = (activePairSymbol, type, interval, limit) => {
    const url = type === "Global" ? "/binance/api/v3/klines" : "/api/v3/klines";
    const symbol = type === "Global" ? removeTestCoin(activePairSymbol) : activePairSymbol;

    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('interval', interval);
    params.append('limit', limit);

    return axios.get(`${url}?${params.toString()}`)
}

export const parseCandleData = (candles) => {
    return candles.map((d) => {
        return {
            time: d[0] / 1000,
            open: parseFloat(d[1]),
            high: parseFloat(d[2]),
            low: parseFloat(d[3]),
            close: parseFloat(d[4]),
            value: parseFloat(d[5]) * 10000000,
            color: parseFloat(d[4]) > parseFloat(d[1]) ? "#18a979" : "#d73e36",
        };
    });
}

export const removeTestCoin = (pair) => {
    return pair.replace("TBTC", "BTC")
        .replace("TETH", "ETH")
        .replace("IRT", "USDT")
        .replace("TUSDT", "USDT")
        .replace("TBUSD", "BUSD")
        .replace("TBNB", "BNB")
}