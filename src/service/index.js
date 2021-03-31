import axios from "axios";
import { toast } from "react-toastify";
if (
  window.location.hostname === "localhost" &&
  window.location.port === "8080"
) {
  axios.defaults.baseURL = `http://localhost:8080/training/api/training`;
} else if (window.location.hostname === "localhost") {
  axios.defaults.baseURL = `http://qatraining.mymxportal.com/training-api/api/training`;
} else {
  axios.defaults.baseURL = `${window.location.protocol}//${window.location.host}/training-api/api/training`;
}

const onSuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    toast.error(error.response.data, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("response success", response.config.method);
    if (response.config.method === "post" && response.status === 200) {
      onSuccess("Record created successfully!");
    }
    if (response.config.method === "put" && response.status === 200) {
      onSuccess("Record successfully upated!");
    }
    if (response.config.method === "delete" && response.status === 200) {
      onSuccess("Record successfully deleted!");
    }
    return response;
  },
  (error) => {
    toast.error(error.response && error.response.data, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    return Promise.reject(error.message);
  }
);

export default axios;
