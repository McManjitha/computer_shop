import Axios from "axios";
import { host } from "./host";

export const createCategory = (data) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
    return new Promise((resolve, reject) => {
        Axios.post(host + "category", data, config)
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

export const getCategories = () => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "category")
            .then((response) => {
                if (response.status == 200) {
                    console.log('Category response')
                    console.log(response.data);
                    return resolve(response.data);
                }
            })
            .catch((e) => {
                return reject(e.response.data.message);
            });
    });
};
export const getCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        Axios.get(host + "category/" + id)
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

export const updateCategory = (data) => {
    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };

    return new Promise((resolve, reject) => {
        Axios.patch(host + "category", data, config)
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

export const toggleCategory = (id) => {
    return new Promise((resolve, reject) => {
        Axios.patch(host + "category/" + id)
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

export const deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        Axios.delete(host + "category/" + id)
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
