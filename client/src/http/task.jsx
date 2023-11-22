import Axios from "axios";
import { host } from "./host";

export const createTask = (data) => {
    return new Promise((resolve, reject) => {
        Axios.post(host + "task", data)
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

export const getTasks = () => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "task")
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

export const updateTask = (data) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "task", data)
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

export const toggleTask = (id) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "task/" + id)
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

export const deleteTask = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(host + "task/" + id)
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
