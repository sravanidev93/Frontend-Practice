
document.addEventListener("DOMContentLoaded", () => {
    const CURRENCY_VALUES_API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
    const CURRENCY_LIST_API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
    const FROM_CURRENCY = document.getElementById("fromCurrency");
    const TO_CURRENCY = document.getElementById("toCurrency");
    const CONVERT_BUTTON = document.getElementById("convert");
    const RESULT = document.getElementById("result");
    const AMOUNT = document.getElementById("amount")
    // getCurrencyValues.then((resp)=>{
    //     return resp.json()
    // }).then((data)=>{
    //     console.log(data,data.eur);
    //     currencyValues=data.eur
    // });
    // console.log(currencyValues);
    console.log("hi");
    async function getCurrencyValues() {
        const CURRENCY_VALUES = await fetch(CURRENCY_VALUES_API_URL);
        return CURRENCY_VALUES.json()
    }
    async function getCurrencyList() {
        const CURRENCY_LIST = await fetch(CURRENCY_LIST_API_URL);
        return CURRENCY_LIST.json();
    }
    // function convertCurrency(fromCurrency, toCurrency, amount, CURRENCY_VALUES) {
    //     console.log("i am called")
    //     console.log("11111",fromCurrency, toCurrency, CURRENCY_VALUES, amount)

    //  RESULT.innerText= (parseInt(CURRENCY_VALUES[toCurrency])/CURRENCY_VALUES[fromCurrency])*amount;

    // }
    async function buildCurrencyConvertor() {
        let currencyValues = {};
        let currencyList = {};
        currencyValues = await getCurrencyValues();
        console.log("Currency Values", currencyValues.eur);
        currencyList = await getCurrencyList();
        console.log("Currency List", currencyList);
        for (currency in currencyList) {
            const CURRENCY_NAME = document.createElement("option");
            CURRENCY_NAME.id = `${currency} fromCurrency`;
            CURRENCY_NAME.value = currency;
            CURRENCY_NAME.innerText = currencyList[currency];
            FROM_CURRENCY.appendChild(CURRENCY_NAME);
        }
        for (currency in currencyList) {
            const CURRENCY_NAME = document.createElement("option");
            CURRENCY_NAME.id = `${currency} toCurrency`;
            CURRENCY_NAME.value = currency;
            CURRENCY_NAME.innerText = currencyList[currency];
            TO_CURRENCY.appendChild(CURRENCY_NAME);
        }
        CONVERT_BUTTON.addEventListener("click", () => {
            if (!FROM_CURRENCY.value || !TO_CURRENCY.value || !AMOUNT.value) {
                alert("select all fields before converting amount")
            } else {
                let fromCurrencyInput = FROM_CURRENCY.value;
                let toCurrencyInput = TO_CURRENCY.value;
                let enteredAmount = AMOUNT.value;
                let currencyAmounts = currencyValues.eur;
                console.log(fromCurrencyInput, toCurrencyInput, enteredAmount, currencyAmounts);
                let convertedAmount = (currencyAmounts[toCurrencyInput] / currencyAmounts[fromCurrencyInput]) * enteredAmount;
                RESULT.value = convertedAmount.toFixed(2);

            }
        })
    }
    buildCurrencyConvertor();

})