const apiKey = "228e444e4acafd673e1a2f32";
const countryApiUrl = "https://restcountries.com/v3.1/all?fields=name,currencies,flags";
const exchangeApiUrl = "https://api.exchangerate-api.com/v4/latest/";

// Fetch country data for currencies
fetch(countryApiUrl)
  .then(response => response.json())
  .then(data => {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const currencyOptions = {};

    // Populate currency dropdowns with country data
    data.forEach(country => {
      if (country.currencies) {
        for (let code in country.currencies) {
          const currency = country.currencies[code];
          const currencyName = `${code} - ${currency.name}`;
          const option = new Option(currencyName, code);
          const flag = country.flags?.png || ''; // Get country flag

          currencyOptions[code] = { currencyName, flag };

          if (!fromCurrencySelect.querySelector(`option[value='${code}']`)) {
            fromCurrencySelect.appendChild(option.cloneNode(true));
          }
          if (!toCurrencySelect.querySelector(`option[value='${code}']`)) {
            toCurrencySelect.appendChild(option.cloneNode(true));
          }
        }
      }
    });
  })
  .catch(err => console.error('Error fetching country data:', err));

document.getElementById("convertBtn").addEventListener("click", function () {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (!amount || isNaN(amount) || amount <= 0) {
    document.getElementById("error").textContent = "Please enter a valid amount.";
    document.getElementById("result").textContent = "";
    return;
  }

  document.getElementById("error").textContent = "";
  document.getElementById("result").textContent = "Loading...";

  fetch(`${exchangeApiUrl}${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      const rate = data.rates[toCurrency];
      if (rate) {
        const convertedAmount = (amount * rate).toFixed(2);
        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
      } else {
        document.getElementById("result").textContent = "";
        document.getElementById("error").textContent = "An error occurred, please try again later.";
      }
    })
    .catch(() => {
      document.getElementById("result").textContent = "";
      document.getElementById("error").textContent = "An error occurred, please try again later.";
    });
});
