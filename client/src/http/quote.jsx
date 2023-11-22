import Axios from "axios";
import { host } from "./host";

export const getQuotes = () => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "quote")
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

export const getQuoteById = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "quote/" + id)
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

export const createQuote = (data) => {
    const config = {
        hedoctorers: {
            "Content-Type": "multipart/form-data",
        },
    };
    return new Promise((resolve, reject) => {
        Axios.post(host + "quote", data, config)
            .then((response) => {
                if (response.status == 200) {
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                console.log(e.request);
                return reject(e.response.data.message);
            });
    });
};

export const updateQuote = (data) => {
    const config = {
        hedoctorers: {
            "Content-Type": "multipart/form-data",
        },
    };
    return new Promise((resolve, reject) => {
        Axios.patch(host + "quote", data, config)
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

export const deleteQuote = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(host + "quote/" + id)
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
