const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

const apiKey = "f6ac7bf2b007d067dd45d4d5735f1e92";
const apiURL = "https://coinlayer.com/";

async function fetchCurrencies() {
  const response = await fetch(apiURL + "USD"); // Fetch data based on a base currency
  const data = await response.json();
  const currencyCodes = Object.keys(data.rates);

  currencyCodes.forEach((code) => {
    const option1 = document.createElement("option");
    option1.value = code;
    option1.innerText = code;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = code;
    option2.innerText = code;
    toCurrency.appendChild(option2);
  });
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = amount.value;

  if (from && to && amountValue) {
    const response = await fetch(apiURL + from);
    const data = await response.json();
    const exchangeRate = data.rates[to];
    const convertedAmount = (amountValue * exchangeRate).toFixed(2);
    result.innerText = `${amountValue} ${from} = ${convertedAmount} ${to}`;
  } else {
    result.innerText = "Please fill all fields!";
  }
}

convertBtn.addEventListener("click", convertCurrency);
fetchCurrencies();
