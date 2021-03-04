var btc = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCAUD';
var xmlhttp2 = new XMLHttpRequest();

xmlhttp2.onreadystatechange = function () {
  if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
    var b = JSON.parse(xmlhttp2.responseText);
    outputCrypto(b);
  }
}
xmlhttp2.open('GET', btc, true);
xmlhttp2.send();

function convertToCurrencyAud(price) {
  const formatterEur = new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2
  });
  return formatterEur.format(price);
}

function outputCrypto(data) {
  document.getElementById('cryptobtc').innerHTML = 'BTC ' + convertToCurrencyAud(data.price);
}
