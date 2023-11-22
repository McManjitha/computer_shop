import Axios from "axios";
import { host } from "./host";

export const createOrder = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post(host + "order", data)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};

export const getOrders = () => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "order")
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};
export const getOrdersByUser = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "order/user/" + id)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};

export const updateOrderStatus = (data) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "order/status", data)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};

export const deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(host + "order/" + id)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};
