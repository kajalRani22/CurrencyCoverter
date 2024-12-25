import axios from "axios";


const api = axios.create({
   
    baseURL: "https://v6.exchangerate-api.com/v6/d08ede1a813ef76fa2f1f033"

});

//we need to create a get request
export const currencyConverter = (fromCurrency, toCurrency, amount) => {
    return api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
};
