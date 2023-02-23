import axios from "axios"

export const getProducts = axios.get(
  "https://mf1nrdrfd3.execute-api.sa-east-1.amazonaws.com/",
  {
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
)
