import axios from "axios";
const api = axios.create(
	{
		baseURL: "http://192.168.94.231:8081",
		timeout: 5000
	}
);

// api.interceptors.request.use(
// );

// api.interceptors.response.use(
// );

export default api;