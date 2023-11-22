import Axios from "axios";
import { host } from "./host";

export const createAttribute = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post(host + "attribute", data)
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

export const getAttributes = () => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "attribute")
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

export const updateAttribute = (data) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "attribute", data)
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

export const deleteAttribute = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(host + "attribute/" + id)
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
