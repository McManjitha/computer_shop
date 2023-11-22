import Axios from "axios";
import { host } from "./host";

export const createProduct = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post(host + "product", data)
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

export const getProducts = () => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "product")
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
export const getProductsByCategory = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "product/category/" + id)
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

export const updateProduct = (data) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "product", data)
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

export const toggleProduct = (id) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "product/" + id)
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

export const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(host + "product/" + id)
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
