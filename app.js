//default values for data, d suffix stands for default
var dCurrency = "GBP";
var dAmount = 1;
var dVAT = "DE";

const amountInput = document.getElementById("input-lbl");
const outputText = document.getElementById ("output-lbl");
const convertBtn = document.getElementById("btn-convert-currency");
const vatBtn = document.getElementById("btn-VAT");
convertBtn.addEventListener("click", convertCurrency);
vatBtn.addEventListener("click", findVAT);

//allows users to input their home currency and convert an amount into euros
function convertCurrency(){
  dAmount = amountInput.value;
var requestURL = `https://api.exchangerate.host/latest?amount=${dAmount}&base=${dCurrency}&symbols=EUR`;

var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response.rates);
  outputText.textContent = response.rates;
  }
}
//shows the user the VAT rates of a selected country, and shows how much they can expect prices to differ from the european average
function findVAT(){
  var requestURL = `https://api.exchangerate.host/vat_rates?symbols=${dVAT}`;
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response);
}
}