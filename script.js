document.getElementById("convert-button").addEventListener("click", function () {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;

    if (amount && fromCurrency && toCurrency) {
        alert(`Convert ${amount} from ${fromCurrency} to ${toCurrency}`);
    } else {
        alert("Please fill in all fields.");
    }
});
