//default values for data, d suffix stands for default
var dCurrency = "GBP";
var dAmount = 1;
var dVAT = "DE";

const convertBtn = document.getElementById("btn-convert-currency")

convertBtn.addEventListener("click", convertCurrency);


//allows users to input their home currency and convert an amount into euros

function convertCurrency(){
var requestURL = `https://api.exchangerate.host/latest?amount=${dAmount}&base=${dCurrency}&symbols=EUR`;

var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response);
  }
}