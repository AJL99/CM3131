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

//this is quite messy but the only way I could figure it out
request.onload = function() {
  var response = request.response;
  console.log(response); //is grabs the response from the API after you input your number
  let convertedNumber = JSON.stringify(response.rates); //this turns the amount of money into a string, but that string is messy and has waste that I want to remove
  let currencyToChop = convertedNumber.length; //due to number having different length depending on the inputed number, you need to know the exact length of the string so that you can change the substring command to always remove only the last character
  let outputNumber = convertedNumber.substring(7, currencyToChop-1); //this removed the first 7 characters from the string as the first 7 characters will always be the same amount of junk, it then removes the curly bracket at the end
  outputText.textContent = outputNumber; //finally the amount in euros is shown with non of the junk
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