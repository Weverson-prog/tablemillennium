import axios from "axios";

const api = axios.create({
    baseURL: "http://179.124.195.83:6017/api/MILLENIUM!PRD.PRODUCAO.PRODUTOFASES",
});

api.defaults.headers.common["WTS-LicenceType"] = "omni";
api.defaults.headers.common["Content-Type"] = "application/json";
api.defaults.auth = {
    password: "79Kkmw2",
    username: "integracao"
}


export default api;
