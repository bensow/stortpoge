var symbolList = ["MQG.AX", "^GSPC", "^AXJO"]
var nameList = ["MQG.AX", "S&P500", "ASX200"]
let symLen = symbolList.length

const urlList = [];
for (let i = 0; i < symLen; i++) {
    urlList[i] = "https://query1.finance.yahoo.com/v8/finance/chart/" + symbolList[i]
}

console.log(urlList)

let text = " ";
var num = 0;
const priceList = [];
const currencyList = [];
const previousPrice = [];
const dayChange = [];

async function getMarketPrice() {
    for (let i = 0; i < symLen; i++) {
        const response = await fetch(urlList[i]);
        const data = await response.json();

        priceList[i] = data.chart.result[0].meta.regularMarketPrice;
        currencyList[i] = data.chart.result[0].meta.currency;
        previousPrice[i] = data.chart.result[0].meta.previousClose;
        dayChange[i] = (priceList[i] - previousPrice[i]) * 100 / previousPrice[i]
        num = dayChange[i]
        num = num.toFixed(2)
        dayChange[i] = num + "%"

        console.log(dayChange)
        text = text + nameList[i] + " " + currencyList[i] + "$" + priceList[i] + " (" + dayChange[i] + ")" + " | "
    }
    text = text.substring(0, text.length - 3);
    document.getElementById('crypto').innerHTML = text
}

getMarketPrice();
