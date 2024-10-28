const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

const apiURL =
  "https://v6.exchangerate-api.com/v6/e6ded1434c9a60942bb29024/latest/USD";

async function fetchCurrencies() {
  try {
    const response = await fetch(apiURL); // Fetch data from the provided API URL
    const data = await response.json();
    const currencyCodes = Object.keys(data.conversion_rates); // Update to access conversion_rates

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
  } catch (error) {
    console.error("Error fetching data:", error);
    result.innerText = "Error fetching exchange rates.";
  }
}

async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = amount.value;

  if (from && to && amountValue) {
    try {
      const response = await fetch(apiURL);
      const data = await response.json();
      const exchangeRate = data.conversion_rates[to]; // Access conversion_rates

      if (typeof exchangeRate !== "number") {
        console.error("Exchange rate is not a number:", exchangeRate);
        result.innerText = "Invalid currency selected.";
        return;
      }

      const convertedAmount = (amountValue * exchangeRate).toFixed(2);
      result.innerText = { amountValue };
      {
        from;
      }
      {
        convertedAmount;
      }
      {
        to;
      } // Use backticks for template literals
    } catch (error) {
      console.error("Error fetching data:", error);
      result.innerText = "Error fetching conversion rate.";
    }
  } else {
    result.innerText = "Please fill all fields!";
  }
}

convertBtn.addEventListener("click", convertCurrency);
fetchCurrencies();
