var url = 'https://api.binance.com/api/v3/ticker/price';
var xmlhttp2 = new XMLHttpRequest();
var tickers = ["ETHAUD","BTCAUD","ETHUSDT"]

// Owned
var purchasedtickers = "ETHAUD"
var units = 0.84019
var purchasecost = 1243.77
var totalcost = units*purchasecost



xmlhttp2.onreadystatechange = function () {
	if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
		var b = JSON.parse(xmlhttp2.responseText);
		console.log(b)
		outputCrypto(b);
	}
}

xmlhttp2.open('GET', url, true);
xmlhttp2.send();

function outputCrypto(data) {
	newData = data.filter((x) => tickers.includes(x.symbol))
	console.log(newData.find(x => x.symbol === purchasedtickers).price*units - totalcost)

	newData.map((x,index) => {
		console.log(x)

		function convertToCurrency(price) {
			const formatterEur = new Intl.NumberFormat("en-EN", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2
			});
			return formatterEur.format(price);
		}

		document.getElementById('crypto').innerHTML += x['symbol'] + ' ' + convertToCurrency(x.price);
		console.log(index, newData.length-1)
		document.getElementById('crypto').innerHTML += index === newData.length-1 ? '' : ' | '
	})

}