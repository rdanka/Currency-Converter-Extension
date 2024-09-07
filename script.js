import { apiKey } from "./config.js";

const hufInput = document.getElementById('huf');
const usdInput = document.getElementById('usd');
const gbpInput = document.getElementById('gbp');
const eurInput = document.getElementById('eur');

const inputs = [
    { element: hufInput, currency: 'HUF' },
    { element: usdInput, currency: 'USD' },
    { element: gbpInput, currency: 'GBP' },
    { element: eurInput, currency: 'EUR' }
  ];

async function fetchData(value, currency) {
    const url = 'https://api.freecurrencyapi.com/v1/latest';
    const response = await fetch (`${url}?apikey=${apiKey}&currencies=EUR%2CUSD%2CGBP%2CHUF&base_currency=${currency}`);
    const record = await response.json();
    const data = record.data;

    hufInput.value = Number(data['HUF'] * value).toLocaleString('en');
    usdInput.value = Number(data['USD'] * value).toLocaleString('en');
    gbpInput.value = Number(data['GBP'] * value).toLocaleString('en');
    eurInput.value = Number(data['EUR'] * value).toLocaleString('en');
}

inputs.forEach(input => {
    input.element.addEventListener('blur', (event) => fetchData(event.target.value, input.currency));
});

fetchData(1, "EUR");
