document.getElementById("convert-button").addEventListener("click", function () {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    const resultMessage = document.getElementById("result-message");
    const errorMessage = document.getElementById("error-message");

    resultMessage.style.display = "none";
    errorMessage.style.display = "none";

    if (amount && fromCurrency && toCurrency) {
        resultMessage.textContent = `${amount} ${fromCurrency} = ${(
            amount * 84.0752
        ).toFixed(2)} ${toCurrency}`;
        resultMessage.style.display = "block";
    } else {
        errorMessage.textContent = "An error occurred, please try again later";
        errorMessage.style.display = "block";
    }
});
