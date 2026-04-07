import { useAuth } from "./GlobalContext/AuthContext";
const Api_link = import.meta.env.VITE_API_URL;

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token) => {
    refreshSubscribers.map((cb) => cb(token));
    refreshSubscribers = [];
};

export const useApi = () => {
    const { accessToken, setAccessToken, logout } = useAuth();

    const fetchWithAuth = async (url, options = {}) => {
        const config = {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: "include",
        };

        let response = await fetch(url, config);


        if (response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshRes = await fetch(`${Api_link}/auth/refresh`, {
                        method: "POST",
                        credentials: "include",
                    });

                    if (!refreshRes.ok) throw new Error("Refresh failed");

                    const data = await refreshRes.json();
                    const newToken = data.accessToken;

                    setAccessToken(newToken);
                    onTokenRefreshed(newToken);
                    isRefreshing = false;
                } catch (err) {
                    isRefreshing = false;
                    logout();
                    throw new Error("Session expired. Please log in again.");
                }
            }


            const retryOriginalRequest = new Promise((resolve) => {
                subscribeTokenRefresh((token) => {
                    config.headers.Authorization = `Bearer ${token}`;
                    resolve(fetch(url, config));
                });
            });

            return retryOriginalRequest;
        }

        return response;
    };

    return { fetchWithAuth };
};
